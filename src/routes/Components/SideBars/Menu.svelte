<script>
  import { onMount } from 'svelte';

  onMount(() => {
    // código de inicialização, se necessário
  });
  // Defina seus itens de menu aqui
  const menuItems = [
    { id: 1, href: '/user/feed', icon: 'fas fa-newspaper mr-2', label: 'Feed' },
    { id: 2, href: '#followers', icon: 'fas fa-users mr-2', label: 'Followers' },
    { id: 3, href: '#following', icon: 'fas fa-user-friends mr-2', label: 'Following' },
    { id: 4, href: '#my-books', icon: 'fas fa-book mr-2', label: 'My Books' },
    { id: 5, href: '/user/my-clubs', icon: 'fas fa-users mr-2', label: 'My Clubs' },
    { id: 6, href: '#blacklist', icon: 'fas fa-stop-circle mr-2', label: 'BlackList' },
    { id: 7, href: '/user/profile', icon: 'fas fa-user-circle mr-2', label: 'Profile' }
  ];
</script>

<svelte:head>
  <!-- Outros meta tags e links -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap">
</svelte:head>

<div class="flex h-screen">
  <!-- Sidebar -->
  <div class="bg-gray-50 p-4 text-black">
    <h1 class="text-lg font-bold mb-4">Menu</h1>
    <ul>
      {#each menuItems as { id, href, icon, label }}
        <li>
          <a href={href} class="block py-3 px-4 hover:bg-gray-800 hover:text-white rounded text-lg font-roboto">
            <i class={icon}></i> {label}
          </a>
        </li>
      {/each}
    </ul>
  </div>
</div>