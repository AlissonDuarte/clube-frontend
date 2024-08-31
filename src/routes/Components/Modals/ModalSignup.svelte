<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let name = '';
  let username = '';
  let email = '';
  let phone = '';
  let passwd = '';
  let confirm_password = '';
  let birth_date = '';
  let gender = 'm';

  function handleSubmit(event) {
    event.preventDefault();
    dispatch('signup', {
      name, username, email, phone, passwd, confirm_password, birth_date, gender
    });
  }
</script>

<div class="modal fade" id="signupModal" tabindex="-1" aria-labelledby="signupModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content bg-gray-900 text-white">
      <div class="modal-header bg-gray-900">
        <h5 class="modal-title" id="signupModalLabel">Sign Up</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body bg-gray-900">
        <form on:submit={handleSubmit}>
          <input type="text" bind:value={name} placeholder="Name" class="form-control mb-3 bg-gray-700 text-white rounded px-4 py-2">
          <input type="text" bind:value={username} placeholder="Username" class="form-control mb-3 bg-gray-700 text-white rounded px-4 py-2">
          <input type="email" bind:value={email} placeholder="Email" class="form-control mb-3 bg-gray-700 text-white rounded px-4 py-2">
          <input type="text" bind:value={phone} placeholder="Phone" class="form-control mb-3 bg-gray-700 text-white rounded px-4 py-2">
          <input type="password" bind:value={passwd} placeholder="Password" class="form-control mb-3 bg-gray-700 text-white rounded px-4 py-2">
          <input type="password" bind:value={confirm_password} placeholder="Confirm Password" class="form-control mb-3 bg-gray-700 text-white rounded px-4 py-2">
          <label for="birth_date" class="form-label">Birth Date:</label>
          <input type="date" bind:value={birth_date} class="form-control mb-3 bg-gray-700 text-white rounded px-4 py-2">
          <label for="gender" class="form-label">Gender:</label>
          <select bind:value={gender} class="form-select mb-3 bg-gray-700 text-white rounded px-4 py-2">
            <option value="m">Male</option>
            <option value="f">Female</option>
            <option value="o">Other</option>
          </select>
          <button type="submit" class="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign Up</button>
        </form>
      </div>
    </div>
  </div>
</div>

<style>
  /* Adicione estilos específicos para o ModalSignup.svelte aqui */
</style>
