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

    let maxTitleLength = 128;
    let maxContentLength = 512;
    let titleLength = 0;
    let contentLength = 0;

    function showError(message) {
      alertMessage = message;
      isVisible = true;
      setTimeout(() => {
        isVisible = false;
      }, 5000);
    }

    function updateTitleLength(event) {
      titleLength = event.target.value.length;
    }
   
    function updateContentLength(event) {
    contentLength = event.target.value.length;
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
      } else {
        console.log("aqui?")
        showError('A image must be provided')
        return
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

        const status_code = response.status
        if (status_code != 200){
          const errorMessage = await response.text();
          showError("Error to create post: " + errorMessage);
          return
        }
      } catch (error){
        showError("Error to create post: " + error.message);
        return
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
    
    .progress-bar {
    transition: width 0.3s ease;
  }

  </style>
  
  <div class="max-w-2xl w-full bg-gray-800 p-6 rounded-lg shadow-md mt-0">
    <form on:submit={handleSubmit}>
      <div>
        <label for="title" class="block text-sm text-white mb-1"></label>
        <input 
            type="text" 
            id="title" 
            class="block p-3 w-full text-sm text-gray-100 bg-gray-700 rounded-lg border border-gray-600 focus:ring-blue-500 focus:border-blue-500" 
            placeholder="Title" 
            maxlength="128"
            bind:value={postObject.Title} 
            on:input={updateTitleLength} 
            required>
            <div class="mt-2 h-2 bg-gray-200 rounded-full">
              <div 
                class={`h-full rounded-full progress-bar ${titleLength > maxTitleLength * 0.8 ? titleLength > maxTitleLength * 0.9 ? 'bg-red-500' : 'bg-yellow-500' : 'bg-green-500'}`} 
                style="width: {Math.min((titleLength / maxTitleLength) * 100, 100)}%">
              </div>
            </div>
            <div class="text-right text-sm text-gray-400">
              {maxTitleLength - titleLength} characters remaining
            </div>
          </div>
      
      <div class="mb-4">
        <label for="message" class="block mb-2 text-sm font-medium text-gray-300"></label>
        <textarea 
            id="message" 
            rows="4" 
            class="block p-3 w-full text-sm text-gray-100 bg-gray-700 rounded-lg border border-gray-600 focus:ring-blue-500 focus:border-blue-500" 
            placeholder="Write your thoughts here..."
            maxlength="512"
            bind:value={postObject.Content} required></textarea>

          <div class="mt-2 h-2 bg-gray-200 rounded-full">
            <div 
              class={`h-full rounded-full progress-bar ${contentLength > maxContentLength * 0.8 ? contentLength > maxContentLength * 0.9 ? 'bg-red-500' : 'bg-yellow-500' : 'bg-green-500'}`} 
              style="width: {Math.min((contentLength / maxContentLength) * 100, 100)}%">
            </div>
          </div>
          <div class="text-right text-sm text-gray-400">
            {maxContentLength - contentLength} characters remaining
          </div>
        </div>
      <div class="flex items-center">
        <label for="fileUpload" class="flex items-center cursor-pointer text-blue-400 hover:text-blue-600">
          <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M4 3a1 1 0 000 2h12a1 1 0 100-2H4zm4 4a1 1 0 000 2h4a1 1 0 100-2H8z" clip-rule="evenodd"></path>
            <path fill-rule="evenodd" d="M4 9a1 1 0 000 2h8a1 1 0 100-2H4zm4 4a1 1 0 000 2h4a1 1 0 100-2H8z" clip-rule="evenodd"></path>
            <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 011 1v11a1 1 0 01-1 1H4a1 1 0 01-1-1V5zm10 9a1 1 0 100 2H6a1 1 0 100-2h7zM5 11a1 1 0 100 2h6a1 1 0 100-2H5zm2-4a1 1 0 100 2h4a1 1 0 100-2H7z" clip-rule="evenodd"></path>
          </svg>
          *Image
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
  