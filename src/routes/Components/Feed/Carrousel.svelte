<script>
  import { API_URL_BASE } from '../../../app.js';

  export let cards = [];
  
  // Função para rolar para o próximo slide
  function nextSlide(event) {
    const carousel = event.target.closest('.carousel-container').querySelector('.carousel');
    const scrollAmount = carousel.clientWidth / 4; // Largura do carousel dividida por 4
    carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }

  // Função para rolar para o slide anterior
  function prevSlide(event) {
    const carousel = event.target.closest('.carousel-container').querySelector('.carousel');
    const scrollAmount = carousel.clientWidth / 4; // Largura do carousel dividida por 4
    carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  }

  async function handlePictures(card) {
    const userJWT = localStorage.getItem("userJWT");
    const response = await fetch(`${API_URL_BASE}/club/${card.ID}/images`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + userJWT,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch image for club ID ' + card.ID);
    }

    const clubImageBlob = await response.blob();
    return URL.createObjectURL(clubImageBlob);
  }
</script>

<div class="relative carousel-container">
  <div class="carousel w-full overflow-hidden whitespace-nowrap relative">
    {#each cards as card}
    <div class="carousel-item relative inline-block p-4 transition-transform transform hover:scale-105">
      <div class="card-content bg-gray-800 p-4 rounded-lg h-96 w-64 mx-auto">
        <h2 class="card-title text-xl font-semibold text-gray-200 mb-3">{card.Name}</h2>
        <a href="my-clubs/club/{card.ID}" class="block rounded-lg overflow-hidden shadow-md h-60 w-full">
          {#if card.ID}
            {#await handlePictures(card) then clubImage}
              <img src={clubImage} alt="Imagem" class="w-full h-full object-cover rounded-lg border-0" />
            {/await}
          {/if}
        </a>
      </div>
    </div>
    {/each}
  </div>

  <button on:click={prevSlide} class="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 opacity-75 hover:opacity-100 focus:outline-none shadow-lg">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
    </svg>
  </button>

  <button on:click={nextSlide} class="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 opacity-75 hover:opacity-100 focus:outline-none shadow-lg">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
    </svg>
  </button>
</div>

<style>
  .carousel {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .carousel::-webkit-scrollbar {
    display: none;
  }

  .carousel-item {
    flex: 0 0 auto;
    scroll-snap-align: start;
    width: auto;
    margin-right: 1.0rem; /* Aumenta o espaço entre os itens */
    transition: transform 0.3s ease-in-out; /* Adiciona transição para a transformação */
  }

  .carousel-item:hover {
    transform: scale(1.05); /* Aumenta o tamanho do item ao passar o mouse */
  }

  .carousel-item img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Ajusta a imagem para cobrir a div sem cortar */
    background-color: transparent; /* Remove o fundo branco */
    border: 0; /* Remove a borda cinza */
  }

  .card-title {
    white-space: normal; /* Permite quebra de linha */
    overflow: visible; /* Garante que o texto não seja ocultado */
    display: -webkit-box;
    -webkit-line-clamp: 2; /* Limita a exibição do texto a 2 linhas */
    -webkit-box-orient: vertical;
  }

  .card-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
