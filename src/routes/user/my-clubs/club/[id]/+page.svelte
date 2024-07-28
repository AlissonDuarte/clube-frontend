<script>
import {onMount} from 'svelte';
import Menu from "../../../../Components/SideBars/Menu.svelte";
import Header from "../../../../Components/Headers/Header.svelte";
import GeneralFeed from "../../../../Components/Feed/GeneralFeed.svelte";
import Spinner from '../../../../Components/Feed/Spinner.svelte';
import PostForm from '../../../../Components/Feed/PostForm.svelte';
import { API_URL_BASE } from '../../../../../app.js'

let loading = false;
let posts = [];
let page = 1; // Definir a página inicial
let pageSize = 2; // Tamanho padrão da página

function getIdFromUrl() {
    if (typeof window !== 'undefined') {
        const url = window.location.pathname;
        const parts = url.split('/');
        return parts[parts.length - 1];
    } else {
        return null;
    }
}
let clubID = getIdFromUrl()
var clubName = ''

let endpointUrl = `club/${clubID}/post`

async function fetchPosts() {
    var userJWT = localStorage.getItem('userJWT');

    const response = await fetch(`${API_URL_BASE}/club/${clubID}/feed?page=${page}&pageSize=${pageSize}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + userJWT,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    return await response.json();
}

async function getClubInfo() {
  var userJWT = localStorage.getItem('userJWT');

  try {
    console.log("iniciando")
    const clubInfo = await fetch(`${API_URL_BASE}/club/${clubID}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + userJWT,
        'Content-Type': 'application/json'
      }
    });
    if (!clubInfo.ok) {
      clubName = 'Ops, error to find club name x.x';
      return;
    }

    const clubInfoData = await clubInfo.json()
    clubName = clubInfoData.Name

  } catch(error) {
    clubName = 'Ops, error to find club name x.x';
    console.log("Error: ", error)
    return;
  }
}

async function fetchMorePosts() {
    loading = true;
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const newPostsData = await fetchPosts();
      posts = [...posts, ...newPostsData];
      page++; // Incrementar a página para a próxima chamada
    } catch (error) {
      console.error('Error fetching more posts:', error);
    } finally {
      loading = false;
    }
  }
onMount(() => {
    fetchMorePosts();
    getClubInfo();

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !loading) {
        fetchMorePosts();
      }
    });

    const referenceElement = document.getElementById('load-more-trigger');
    if (referenceElement) {
      observer.observe(referenceElement);
    }

    return () => {
      observer.disconnect();
    };
  }); 
</script>

<header>
  
    <Header />
</header>
<div class="bg-blue-800 text-white text-3xl font-bold mb-8 p-4 rounded-lg shadow-lg">
  {clubName}
</div>

<body>
  <div class="w-full max-w-xl mx-auto absolute left-1/2 transform -translate-x-1/2 z-50">
    <PostForm endpointUrl={endpointUrl}/>
  </div>
  
    <div class="flex justify-between my-5 py-4">
      <div class="w-1/4">
        <Menu />
      </div>
  
      <div class="mt-96 w-full flex justify-center items-center relative flex-col space-y-8">
        {#each posts as post}
          <!-- Passando as propriedades User e ImageID para o componente GeneralFeed -->
          <GeneralFeed {post} class="mb-8" />
        {/each}
  
        <div id="load-more-trigger"></div>
  
        {#if loading}
          <div class="loading-animation fixed bottom-0 left-0 right-0 bg-gray-900 z-10 p-2 text-center">
            <Spinner />
          </div>
        {/if}
      </div>
  
      <div class="w-1/4 p-4">
        <h2 class="text-lg text-white font-semibold mb-4">Suggestions</h2>
      </div>
    </div>
</body>
  