<script>
    import { createEventDispatcher } from 'svelte';
    let comment = '';
    const maxLength = 500;
    const dispatch = createEventDispatcher();
  
    const handleSubmit = () => {
      if (comment.trim()) {
        dispatch('submit', comment); // Envia o comentário para o componente pai
        comment = ''; // Limpa o campo após o envio
      }
    };
  
    const handleClose = () => {
      dispatch('close'); // Envia um evento para fechar o formulário
    };
  
    // Função para limitar o comprimento do comentário
    $: comment = comment.substring(0, maxLength);
  
    // Calcula a cor do contador baseado na quantidade de caracteres restantes
    $: remainingChars = maxLength - comment.length;
    $: counterColor = remainingChars <= 50 ? (remainingChars <= 20 ? 'text-red-500' : 'text-yellow-500') : 'text-gray-500';
  </script>
  
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full">
      <div class="bg-gray-700 p-4 flex justify-between items-center">
        <h2 class="text-white text-lg font-semibold">New Comment</h2>
        <button on:click={handleClose} class="text-white">&times;</button>
      </div>
      <div class="p-4">
        <textarea
          bind:value={comment}
          placeholder="Write your comment here..."
          class="w-full h-32 p-2 border border-gray-300 rounded-md resize-none"
          maxLength={maxLength}
        ></textarea>
        <div class="flex justify-between items-center mt-2">
          <p class={`text-sm font-medium ${counterColor}`}>
            {remainingChars} characters remaining
          </p>
        </div>
      </div>
      <div class="p-4 flex justify-end">
        <button
          on:click={handleSubmit}
          class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Share
        </button>
      </div>
    </div>
  </div>
  
  <style>
    textarea:focus {
      outline: none;
      border-color: #3b82f6;
    }
  </style>
  