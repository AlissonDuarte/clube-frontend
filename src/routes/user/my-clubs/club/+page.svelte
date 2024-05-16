<script>
import {onMount} from 'svelte';
import Menu from "../../../Components/SideBars/Menu.svelte";
import Header from "../../../Components/Headers/Header.svelte";
import GeneralFeed from "../../../Components/Feed/GeneralFeed.svelte";
import Spinner from '../../../Components/Feed/Spinner.svelte';
import { API_URL_BASE } from '../../../../app.js'

let loading = false;
let posts = [];
let page = 1; // Definir a página inicial
let pageSize = 2; // Tamanho padrão da página

async function fetchPosts() {
    var userJWT = localStorage.getItem('userJWT');
    var userID = localStorage.getItem('userID');

    const response = await fetch(`${API_URL_BASE}/club/${userID}/feed`, {
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

<body>
    <div class="flex justify-between my-5 py-4">
      <div class="w-1/4">
        <Menu />
      </div>
  
      <div class="w-full flex justify-center items-center relative flex-col space-y-8">
        {#each posts as post}
          <!-- Passando as propriedades User e ImageID para o componente GeneralFeed -->
          <GeneralFeed {post} class="mb-8" />
        {/each}
  
        <div id="load-more-trigger"></div>
  
        {#if loading}
          <div class="loading-animation fixed bottom-0 left-0 right-0 bg-white z-10 p-2 text-center">
            <Spinner />
          </div>
        {/if}
      </div>
  
      <div class="w-1/4 p-4">
        <h2 class="text-lg text-white font-semibold mb-4">Suggestions</h2>
      </div>
    </div>
</body>
  