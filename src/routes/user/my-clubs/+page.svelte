<script>
    import Carrousel from "../../Components/Feed/Carrousel.svelte";
    import Header from "../../Components/Headers/Header.svelte";
    import Menu from "../../Components/SideBars/Menu.svelte";
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
            <Carrousel cards={cards} />
          </div>

        <div class="w-1/4 p-4">
            <!-- Conteúdo das notificações -->
            <h2 class="text-lg text-black font-semibold mb-4">Suggestions</h2>
            <!-- Adicione itens de notificação aqui -->
        </div>
    </div>
</body>

