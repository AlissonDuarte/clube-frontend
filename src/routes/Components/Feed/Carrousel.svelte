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
      <h2 class="card-title text-xl font-semibold text-gray-200 mb-3">{card.Name}</h2>
      <a href="/pagina-de-destino" class="block rounded-lg overflow-hidden bg-white shadow-md h-64"> <!-- Definindo a altura para 64 unidades -->
          <div class="card-content p-4 h-full flex flex-col justify-between"> <!-- Usando flexbox para garantir que o conteúdo preencha o espaço disponível -->
              <div class="overflow-y-auto mb-2 h-10">
              </div>
              {#if card.ID}
                  {#await handlePictures(card) then clubImage}
                      <img src={clubImage} alt="Imagem" class="w-full h-60 object-cover" /> <!-- Use object-cover para manter a proporção da imagem -->
                  {/await}
              {/if}
          </div>
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
    overflow-y: scroll;
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
