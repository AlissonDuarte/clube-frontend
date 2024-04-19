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

<!-- Renderização do cabeçalho -->
<header>
  <Header />
</header>

<!-- Corpo da página -->
<body class="bg-gray-50">
  <!-- Layout da página -->
  <div class="flex justify-between my-5 py-4">
    <!-- Menu Lateral -->
    <div class="w-1/4">
      <!-- Conteúdo do menu lateral -->
      <Menu />
    </div>

    <!-- Feed -->
    <div class="w-full flex justify-center items-center relative">
      <!-- Conteúdo do feed -->
      <UserFeed posts={posts} />

      <!-- Elemento de referência para scroll infinito -->
      <div id="load-more-trigger" class="absolute bottom-0"></div>

      <!-- Mostrar animação de carregamento enquanto os novos posts estão sendo buscados -->
      {#if loading}
        <div class="loading-animation fixed bottom-0 left-0 right-0 bg-white z-10 p-2 text-center"> 
          <Spinner/>
        </div>
      {/if}
    </div>

    <!-- Notificações -->
    <div class="w-1/4 p-4">
      <!-- Conteúdo das notificações -->
      <h2 class="text-lg text-black font-semibold mb-4">Suggestions</h2>
      <!-- Adicione itens de notificação aqui -->
    </div>
  </div>
</body>

