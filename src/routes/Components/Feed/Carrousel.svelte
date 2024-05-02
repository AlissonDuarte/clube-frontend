<script>
  import { API_URL_BASE } from '../../../app.js'

  export let cards = [];
  // Função para rolar para o próximo slide
  function nextSlide() {
    const carousel = document.querySelector('.carousel');
    const scrollAmount = carousel.clientWidth / 4; // Largura do carousel dividida por 4
    carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }

  // Função para rolar para o slide anterior
  function prevSlide() {
    const carousel = document.querySelector('.carousel');
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

<div class="relative">
  <div class="carousel w-full overflow-hidden whitespace-nowrap relative">
    {#each cards as card}
      <div class="carousel-item relative inline-block w-1/4 whitespace-normal p-2">
        <a href="/pagina-de-destino">
        <div class="card-content h-40 overflow-y-auto bg-white shadow-md p-4">
          <h2 class="card-title text-xl font-semibold text-gray-800 mb-2">{card.Name}</h2>
          <p class="card-text text-sm text-gray-600">{card.Description}</p>
        </div>
        {#if card.ID}
          {#await handlePictures(card) then clubImage}
            <img src={clubImage} alt="Imagem" class="w-full shadow-md" style="height: 300px;" /> <!-- Defina a altura desejada -->
          {/await}
        {/if}
      </a>
      </div>
    {/each}
  </div>

  <button on:click={prevSlide} class="absolute top-1/2 left-6 transform -translate-y-1/2 btn btn-circle bg-gray-800 text-white opacity-75 hover:opacity-100 focus:outline-none">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
    </svg>
</button>

<button on:click={nextSlide} class="absolute top-1/2 right-4 transform -translate-y-1/2 btn btn-circle bg-gray-800 text-white opacity-75 hover:opacity-100 focus:outline-none">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
    </svg>
</button>

</div>


<style>
  /* Estilos do carousel podem ser ajustados conforme necessário */
  .carousel {
    display: flex;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
    width: calc(100% - 2rem); /* Largura do carousel ajustada para levar em consideração o padding dos botões */
    margin: 0 auto; /* Centraliza o carousel na página */
  }

  .carousel::-webkit-scrollbar {
    display: none;
  }

  .carousel-item {
    flex: 0 0 auto;
    scroll-snap-align: start;
    width: calc(30% - 0.5rem); /* Largura de cada item do carousel, ajustada para mostrar 4 itens */
    margin-right: 0.5rem; /* Espaçamento entre os itens */
  }
</style>
