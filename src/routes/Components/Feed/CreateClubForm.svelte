<script>
  import { createEventDispatcher } from 'svelte';
  import Alert from './../Alerts/Alert.svelte';
  import { API_URL_BASE } from "../../../app";

  const dispatch = createEventDispatcher();

  let alertMessage = '';
  let isVisible = false;
  let postClubObject = {
    Title: "",
    Content: "",
    Max: 1
  };
  let file = null;
  let jwt = "";

  function showError(message) {
    alertMessage = message;
    isVisible = true;
    setTimeout(() => {
      isVisible = false;
    }, 5000);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const storageUserID = localStorage.getItem("userID");
    const userJWT = localStorage.getItem("userJWT");

    jwt = "Bearer " + userJWT;

    const formdata = new FormData();
  
    formdata.append('name', postClubObject.Title);
    formdata.append('description', postClubObject.Content);
    formdata.append("owner", storageUserID);

    if (file) {
      formdata.append('file', file);
    }

    try {
      const response = await fetch(`${API_URL_BASE}/clubs`, {
        method: 'POST',
        headers: {
          "Authorization": jwt,
          "Accept": "application/json"
        },
        body: formdata
      });

      const data = await response.json();
      const status_code = response.status;
      if (status_code != 200) {
        showError("Error to create club: " + response.text);
      }
    } catch (error) {
      showError("Error to create club: " + error.message);
    }
  }

  function handleFileChange(event) {
    file = event.target.files[0];
  }

  function resetForm() {
    postClubObject = {
      Title: "",
      Content: "",
      Max: 1
    };
    file = null;
    isVisible = false;
    // Dispatch the close event
    dispatch('close');
  }
</script>

<style>
  textarea {
    resize: none;
  }
</style>

<div class="max-w-2xl w-full bg-gray-800 p-6 rounded-lg shadow-md mb-4">
  <form on:submit={handleSubmit}>
    <div>
      <label for="title" class="block text-sm text-white mb-1"></label>
      <input type="text" id="title" class="block p-3 w-full text-sm text-gray-100 bg-gray-700 rounded-lg border border-gray-600 focus:ring-blue-500 focus:border-blue-500" placeholder="Title" bind:value={postClubObject.Title} required>
    </div>
    <div class="mb-4">
      <label for="number-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
      <input type="number" id="number-input" placeholder="Max members limit" min="1" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" bind:value={postClubObject.Max} required />

      <label for="message" class="block mb-2 text-sm font-medium text-gray-300"></label>
      <textarea id="message" rows="4" class="block p-3 w-full text-sm text-gray-100 bg-gray-700 rounded-lg border border-gray-600 focus:ring-blue-500 focus:border-blue-500" placeholder="Provide a brief description of the purpose of this club." bind:value={postClubObject.Content} required></textarea>
    </div>
    <div class="mb-4 flex items-center">
      <label for="fileUpload" class="flex items-center cursor-pointer text-blue-400 hover:text-blue-600">
        <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M4 3a1 1 0 000 2h12a1 1 0 100-2H4zm4 4a1 1 0 000 2h4a1 1 0 100-2H8z" clip-rule="evenodd"></path>
          <path fill-rule="evenodd" d="M4 9a1 1 0 000 2h8a1 1 0 100-2H4zm4 4a1 1 0 000 2h4a1 1 0 100-2H8z" clip-rule="evenodd"></path>
          <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 011 1v11a1 1 0 01-1 1H4a1 1 0 01-1-1V5zm10 9a1 1 0 100 2H6a1 1 0 100-2h7zM5 11a1 1 0 100 2h6a1 1 0 100-2H5zm2-4a1 1 0 100 2h4a1 1 0 100-2H7z" clip-rule="evenodd"></path>
        </svg>
        *File
      </label>
      <input id="fileUpload" type="file" class="hidden" on:change={handleFileChange}>
    </div>
    <div class="flex justify-end">
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mr-2">Create</button>
      <button type="button" class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50" on:click={resetForm}>Cancel</button>
    </div>
  </form>
</div>

{#if isVisible}
  <Alert {alertMessage} {isVisible}/>
{/if}
