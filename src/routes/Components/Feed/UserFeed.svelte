<script>
    export let posts = [];
  
    function hasTags(tags) {
      return tags && tags.length > 0;
    }
  </script>
  
  <div class="max-w-lg">
    {#each posts as post}
    <div class="bg-grey rounded overflow-hidden shadow-lg mb-8">
      <!-- Cabeçalho -->
      <div class="bg-white rounded-t overflow-hidden shadow-lg p-4 flex items-center">
        <img class="w-12 h-12 rounded-full mr-4" src="https://via.placeholder.com/50" alt="Avatar">
        <div>
          <p class="text-gray-900 font-semibold">{post.author}</p>
          <p class="text-gray-600">{post.username}</p>
        </div>
      </div>
      <!-- Conteúdo do post -->
      <div class="bg-white rounded-b overflow-hidden shadow-lg flex">
        <!-- Divisão da imagem -->
        <div class="w-1/3">
          <img class="w-full h-full" src="https://via.placeholder.com/300x400" alt="Sunset in the mountains">
        </div>
        <!-- Divisão do texto, tags, etc. -->
        <div class="w-2/3 p-4">
          <div class="font-bold text-xl mb-2">
            {post.description}
          </div>
          <p class="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
          </p>
          {#if hasTags(post.tags)} <!-- Verifica se há tags -->
          <div class="flex flex-wrap">
            {#each post.tags as tag}
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{tag}</span>
            {/each}
          </div>
          {/if}
        </div>
      </div>
    </div>
    {/each}
  </div>
  