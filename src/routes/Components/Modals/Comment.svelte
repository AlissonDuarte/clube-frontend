<script>
    import { createEventDispatcher } from 'svelte';
  
    export let comments = [];
  
    const dispatch = createEventDispatcher();
  
    const closeModal = () => {
      dispatch('close');
    }
  </script>
  
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg overflow-hidden shadow-xl max-w-2xl w-full">
      <div class="bg-gray-700 p-4 flex justify-between items-center">
        <h2 class="text-white text-lg font-semibold">Comments</h2>
        <button on:click={closeModal} class="text-white">&times;</button>
      </div>
      <div class="p-4 space-y-4 max-h-96 overflow-y-auto">
        {#each comments as comment}
          <div class="bg-gray-100 p-4 rounded-lg flex items-start space-x-4">
            <!-- <img class="w-12 h-12 rounded-full" src={comment.user.image} alt="User Avatar"> -->
            <img class="w-12 h-12 rounded-full" src="https://via.placeholder.com/150" alt="User Avatar">
            <div>
              <!-- <p class="text-gray-700 font-semibold">{comment.user.name}</p>
              <p class="text-gray-500 text-sm">{comment.date}</p>
              <p class="text-gray-600 mt-2">{comment.comment}</p> -->
              <p class="text-gray-700 font-semibold">Deus rei</p>
              <p class="text-gray-500 text-sm">2024-07-22</p>
              <p class="text-gray-600 mt-2">comentario comentario comentario comentario comentario comentario comentario comentario </p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
  