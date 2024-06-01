<script>
    import { createEventDispatcher } from 'svelte';
  
    const dispatch = createEventDispatcher();
  
    let email = '';
    let passwd = '';
  
    function handleSubmit(event) {
      event.preventDefault();
      dispatch('signin', { email, passwd });
    }
  </script>
  
  <div class="modal fade" id="signinModal" tabindex="-1" aria-labelledby="signinModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content bg-gray-900 text-white">
        <div class="modal-header bg-gray-900">
          <h5 class="modal-title" id="signinModalLabel">Sign In</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body bg-gray-900">
          <form on:submit={handleSubmit}>
            <input type="email" bind:value={email} placeholder="Email" class="form-control mb-3 bg-gray-700 text-white rounded px-4 py-2">
            <input type="password" bind:value={passwd} placeholder="Password" class="form-control mb-3 bg-gray-700 text-white rounded px-4 py-2">
            <button type="submit" class="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  
  <style>
    /* Adicione estilos específicos para o ModalSignin.svelte aqui */
  </style>
  