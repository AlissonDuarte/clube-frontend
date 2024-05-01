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

  let clubImage = "";
  let hasClubImage = false;

  async function handlePictures(clubID) {
    const userJWT = localStorage.getItem("userJWT");

    const response = await fetch(`${API_URL_BASE}/club/${clubID}/images`, {
      method: 'GET',
      headers :{
        'Authorization': 'Bearer ' + userJWT,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok){
      hasClubImage = true
    }

    const clubImageBlob = await response.blob();
    clubImage = clubImageBlob ? URL.createObjectURL(clubImageBlob): 'placeholder_user.jpg'
    console.log("clubImage", clubImage)
  }
</script>


<div class="relative">
  <div class="carousel w-full overflow-hidden whitespace-nowrap relative">
    {#each cards as card}
      <div class="carousel-item relative inline-block w-1/4 whitespace-normal p-2">
        <div class="card-content h-40 overflow-y-auto bg-white shadow-md p-4">
          <h2 class="card-title text-xl font-semibold text-gray-800 mb-2">{card.Name}</h2>
          <p class="card-text text-sm text-gray-600">{card.Description}</p>
        </div>
        {#if card.ID}
            <img src={handlePictures(card.ID)} alt="Imagem" class="w-full shadow-md" style="height: 300px;" /> <!-- Defina a altura desejada -->
        {/if}
      </div>
    {/each}
  </div>

  <div class="absolute top-1/2 transform -translate-y-1/2 left-5">
    <button on:click={prevSlide} class="btn btn-circle bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-700">❮</button>
  </div>

  <div class="absolute top-1/2 transform -translate-y-1/2 right-5">
    <button on:click={nextSlide} class="btn btn-circle bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-700">❯</button>
  </div>
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
