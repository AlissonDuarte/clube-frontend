<script>
  import { onMount } from 'svelte';
  import Menu from "../../Components/SideBars/Menu.svelte";
  import Header from "../../Components/Headers/Header.svelte";
  import UserFeed from "../../Components/Feed/UserFeed.svelte";
  import Spinner from '../../Components/Feed/Spinner.svelte';
  
  let loading = false;

  
  async function loadMorePosts() {
    loading = true;
    await fetchMorePosts();
    loading = false;
  }

  
  onMount(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !loading) {
        loadMorePosts();
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

  
  async function fetchMorePosts() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    // nesta funcao deve estar a logica para carregar mais dados do post
    posts = [...posts, ...posts];
  }

  
  let posts = [
    {
      id: 1,
      author: 'Svelte User',
      username: '@svelteuser',
      avatar: 'landing_background.png',
      description: 'Message 2',
      tags:['svelte', 'javascript', 'tailwind']
    },
    {
      id: 1,
      author: 'Svelte User',
      username: '@svelteuser',
      avatar: 'landing_background.png',
      description: 'Message 2',
      tags:['svelte', 'javascript', 'tailwind']
    },
    {
      id: 1,
      author: 'Svelte User',
      username: '@svelteuser',
      avatar: 'landing_background.png',
      description: 'Message 2',
      tags:['svelte', 'javascript', 'tailwind']
    },
    {
      id: 1,
      author: 'Svelte User',
      username: '@svelteuser',
      avatar: 'landing_background.png',
      description: 'Message 2',
      tags:['svelte', 'javascript', 'tailwind']
    },
  ];
</script>


<header>
  <Header />
</header>


<body class="bg-gray-50">
  
  <div class="flex justify-between my-5 py-4">
    
    <div class="w-1/4">
      <Menu />
    </div>

    
    <div class="w-full flex justify-center items-center relative">
      
      <UserFeed posts={posts} />

      
      <div id="load-more-trigger" class="absolute bottom-0"></div>

      
      {#if loading}
        <div class="loading-animation fixed bottom-0 left-0 right-0 bg-white z-10 p-2 text-center"> 
          <Spinner/>
        </div>
      {/if}
    </div>

    <div class="w-1/4 p-4">
      <h2 class="text-lg text-black font-semibold mb-4">Suggestions</h2>
    </div>
  </div>
</body>

