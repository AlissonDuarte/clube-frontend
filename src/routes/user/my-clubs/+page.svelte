<script>
  import Carrousel from "../../Components/Feed/Carrousel.svelte";
  import Header from "../../Components/Headers/Header.svelte";
  import Menu from "../../Components/SideBars/Menu.svelte";
  import CreateClubForm from "../../Components/Feed/CreateClubForm.svelte";
  import { API_URL_BASE } from '../../../app.js';
  import { onMount } from "svelte";

  let clubs = [];
  let showGroupForm = false;

  async function fetchClubs() {
    const userJWT = localStorage.getItem("userJWT");
    const userID = localStorage.getItem("userID");
    const response = await fetch(`${API_URL_BASE}/clubs/${userID}/all`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + userJWT,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch clubs');
    }

    return await response.json();
  }

  async function loadPosts() {
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const newClubs = await fetchClubs();
      clubs = [...clubs, ...newClubs];
      console.log("clubs", clubs);
    } catch (error) {
      console.log("Error fetching more clubs: ", error);
    }
  }

  function closeForm() {
    showGroupForm = false;
  }

  onMount(() => {
    loadPosts();
    console.log(clubs);
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

    <div class="w-1/2 px-4 relative">
      <div class="absolute top-0 right-0">
        <button on:click={() => showGroupForm = true} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
          Create Group
        </button>
      </div>
      <!-- Passando os dados para o componente Carrousel -->
      <div class="mt-20">
        <p class="text-lg font-semibold text-gray-100 dark:text-white mb-4">My Clubs</p>
        <Carrousel cards={clubs} />
      </div>
      <div class="mt-20">
        <p class="text-lg font-semibold text-gray-100 dark:text-white mb-4">Hot Clubs</p>
        <Carrousel cards={clubs} />
      </div>
      <div class="mt-20">
        <p class="text-lg font-semibold text-gray-100 dark:text-white mb-4">Suggestions</p>
        <Carrousel cards={clubs} />
      </div>
    </div>

    <div class="w-1/4 pr-4 flex flex-col items-center">
      <!-- Conteúdo das notificações -->
      <h2 class="text-lg text-white font-semibold mt-4">Suggestions</h2>
      <!-- Adicione itens de notificação aqui -->
    </div>
  </div>
</body>

{#if showGroupForm}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <!-- Fundo embaçado -->
    <div class="absolute inset-0 backdrop-filter backdrop-blur-lg"></div>
    <!-- Modal -->
    <div class="flex items-center justify-center w-4/5">
      <div class="bg-gray-800 p-6 rounded-lg shadow-md z-50 w-2/5">
        <!-- Conteúdo da modal -->
        <div class="w-full">
          <CreateClubForm on:close={closeForm}/>
        </div>
      </div>
    </div>
  </div>
{/if}
