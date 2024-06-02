<script>
    import Alert from './../Alerts/Alert.svelte'
    import { API_URL_BASE } from "../../../app";

    export let endpointUrl;

    let alertMessage = '';
    let isVisible = false
    let postObject = {
        Title: "",
        Content: "",
    };
    let file = null;
    let jwt = ""

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
    
      formdata.append('title', postObject.Title);
      formdata.append('content', postObject.Content);
      formdata.append("userID", storageUserID);

      if (file) {
        formdata.append('file', file)
      }

      try{
        
        const response = await fetch(`${API_URL_BASE}/${endpointUrl}`, {
            method: 'POST',
            headers: {

                "Authorization": jwt,
                "Accept": "application/json"
            },
            body: formdata
        });

        const data = await response.json()
        const status_code = response.status
        if (status_code != 200){
          showError("Error to create post: " + response.text);
        }
      } catch (error){
        showError("Error to create post: " + error.message);
      }
    }
  
    function handleFileChange(event) {
      file = event.target.files[0];
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
        <input type="text" id="title" class="block p-3 w-full text-sm text-gray-100 bg-gray-700 rounded-lg border border-gray-600 focus:ring-blue-500 focus:border-blue-500" placeholder="Title" bind:value={postObject.Title} required>
      </div>
      <div class="mb-4">
        <label for="message" class="block mb-2 text-sm font-medium text-gray-300"></label>
        <textarea 
                    id="message" 
                    rows="4" 
                    class="block p-3 w-full text-sm text-gray-100 bg-gray-700 rounded-lg border border-gray-600 focus:ring-blue-500 focus:border-blue-500" 
                    placeholder="Write your thoughts here..." 
                    bind:value={postObject.Content} required></textarea>

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
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Create</button>
      </div>
    </form>
  </div>

  {#if isVisible}
    <Alert {alertMessage} {isVisible}/>
  {/if}
  