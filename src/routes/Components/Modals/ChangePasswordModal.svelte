<script>
    import { API_URL_BASE } from "../../../app";


  export let showModal = false
  let changePassword = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    userID: 0
  } 


  let jwt = '';

  function closeModal(){
    showModal = false;
  }



  async function handleSubmit() {
    const storageUserID = localStorage.getItem('userID');

    if (storageUserID) {
      changePassword.userID = storageUserID
    }

    const userJWT = localStorage.getItem('userJWT');
    jwt = "Bearer " + userJWT;

    try {
      fetch(`${API_URL_BASE}/user/${changePassword.userID}/change_password`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": jwt
        },
        body: JSON.stringify(changePassword)

      }).then(response => {

        if (!response.ok) {
          throw new Error("Error to send data");
        }

        return response.json();

      }).then(data => {
        if (data.code) {
          window.location.reload();
        }
         else {
          alert("Error: " + data.error);
         }
      })

    } catch (error) {
      console.log("Error to send data: ", error);
    }
  }

</script>
<div>
  {#if showModal}
    <div class="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div class="relative w-auto max-w-md mx-auto my-6">
        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div class="relative p-6 flex-auto">

            <h3 class="text-lg font-semibold">
                  Change Password
            </h3>

            <div class="mt-4">
              <input type="password" placeholder="Current Password" bind:value={changePassword.currentPassword} class="border border-gray-300 px-3 py-2 rounded-md w-full mb-4" />
              <input type="password" placeholder="New Password" bind:value={changePassword.newPassword} class="border border-gray-300 px-3 py-2 rounded-md w-full mb-4" />
              <input type="password" placeholder="Confirm New Password" bind:value={changePassword.confirmPassword} class="border border-gray-300 px-3 py-2 rounded-md w-full mb-4" />
            </div>

            <div class="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b space-x-4">
              <button class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900" on:click={closeModal}>Cancel</button>
              <button class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" on:click={handleSubmit}>Change Password</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  {/if}
</div>
