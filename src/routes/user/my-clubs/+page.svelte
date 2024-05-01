<script>
    import Carrousel from "../../Components/Feed/Carrousel.svelte";
    import Header from "../../Components/Headers/Header.svelte";
    import Menu from "../../Components/SideBars/Menu.svelte";
    import { API_URL_BASE } from '../../../app.js'
    import { onMount } from "svelte";

    let cards = [
    {
      imageSrc: 'https://via.placeholder.com/50',
      title: 'Título do Card 1',
      content: 'Conteúdo do Card 1'
    },
    {
      imageSrc: 'https://via.placeholder.com/50',
      title: 'Título do Card 2',
      content: 'Conteúdo do Card 2'
    },
    {
      imageSrc: 'https://via.placeholder.com/50',
      title: 'Título do Card 3',
      content: 'Conteúdo do Card 3'
    },
    {
      imageSrc: 'https://via.placeholder.com/50',
      title: 'Título do Card 4',
      content: 'Conteúdo do Card4'
    },
    {
      imageSrc: 'https://via.placeholder.com/50',
      title: 'Título do Card 1',
      content: 'Conteúdo do Card 1'
    },
    {
      imageSrc: 'https://via.placeholder.com/50',
      title: 'Título do Card 2',
      content: 'Conteúdo do Card 2'
    },
    {
      imageSrc: 'https://via.placeholder.com/150',
      title: 'Título do Card 3',
      content: 'Conteúdo do Card 3'
    },
    {
      imageSrc: 'https://via.placeholder.com/150',
      title: 'Título do Card 4a',
      content: 'Conteúdo do Carad4'
    },
    {
      imageSrc: 'https://via.placeholder.com/150',
      title: 'Título do Card 1',
      content: 'Conteúdo do Cardaaaa 1'
    },
    {
      imageSrc: 'https://via.placeholder.com/150',
      title: 'Título do Card 2',
      content: 'Conteúdo do Card 2vvvv'
    },
    {
      imageSrc: 'https://via.placeholder.com/150',
      title: 'Título do Card 3',
      content: 'Conteúdo do Card bbbb3'
    },
    {
      imageSrc: 'https://via.placeholder.com/150',
      title: 'Título do Card 4',
      content: 'Conteúdo do Caradfadsd4Conteúdo do Caradfadsd4Conteúdo do Caradfadsd4Conteúdo do Caradfadsd4Conteúdo do Caradfadsd4Conteúdo do Caradfadsd4Conteúdo do Caradfadsd4Conteúdo do Caradfadsd4Conteúdo do Caradfadsd4Conteúdo do Caradfadsd4Conteúdo do Caradfadsd4   '
    },
    // Adicione mais cards conforme necessário
  ];
  

  let clubs = []

  async function fetchClubs() {
    var userJWT = localStorage.getItem("userJWT");
    var userID = localStorage.getItem("userID");
    const response = await fetch(`${API_URL_BASE}/clubs/${userID}/all`,{
      method: 'GET',
      headers : {
        'Authorization': 'Bearer ' + userJWT,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch clubs');
    }

    return await response.json()
  }

  async function loadPosts(){
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const newClubs = await fetchClubs();
      clubs = [...clubs, ...newClubs];
      console.log("clubs", clubs)
    } catch(error) {
      console.log("Error fetching more clubs: ", error)
    }
  }
  onMount(() => {
    loadPosts()
    console.log(clubs)
  })

</script>

<header>
    <Header />
</header>


<body class="bg-gray-50">

    <div class="flex justify-between my-5 py-4">
        <div class="w-1/4">
            <Menu />
        </div>
        
        <div class="w-1/2 px-4">
            <!-- Passando os dados para o componente Carrousel -->
            <Carrousel cards={clubs} />
          </div>

        <div class="w-1/4 p-4">
            <!-- Conteúdo das notificações -->
            <h2 class="text-lg text-black font-semibold mb-4">Suggestions</h2>
            <!-- Adicione itens de notificação aqui -->
        </div>
    </div>
</body>

