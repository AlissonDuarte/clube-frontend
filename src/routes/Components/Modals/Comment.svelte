<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { API_URL_BASE } from '../../../app.js';
  import FloatSpinner from '../Feed/FloatSpinner.svelte';
  import NewComment from './NewComment.svelte';

  export let postID;
  let comments = [];
  let isLoading = true;
  let showNewForm = false;

  async function handleComments(postID) {
    try {
      const userJWT = localStorage.getItem('userJWT');

      // Fetch comments
      const commentsResponse = await fetch(`${API_URL_BASE}/post/${postID}/comments`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + userJWT,
          'Content-Type': 'application/json'
        }
      });

      if (commentsResponse.ok) {
        const commentsData = await commentsResponse.json();

        if (Array.isArray(commentsData)) {
          // Process comments data
          for (let comment of commentsData) {
            const userResponse = await fetch(`${API_URL_BASE}/user/${comment.user.id}/images/user`, {
              method: 'GET',
              headers: {
                'Authorization': 'Bearer ' + userJWT,
                'Content-Type': 'application/json'
              }
            });

            if (userResponse.ok) {
              const userImageBlob = await userResponse.blob();
              comment.user.profile_picture_url = URL.createObjectURL(userImageBlob);
            } else {
              comment.user.profile_picture_url = 'placeholder_user.jpg';
            }
          }
          comments = commentsData;
        } else {
          console.error('Comments data is not an array:', commentsData);
        }
      } else {
        console.error('Failed to fetch comments');
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      isLoading = false;
    }
  }

  const dispatch = createEventDispatcher();

  const closeModal = () => {
    dispatch('close');
  };

  const toggleNewForm = () => {
    showNewForm = !showNewForm;
  };

  const handleNewComment = (event) => {
    const newComment = event.detail;
    // Process the new comment (e.g., send it to the server or add it to the list)
    console.log('New comment:', newComment);
    showNewForm = false;
  };

  onMount(() => {
    handleComments(postID);
  });
</script>

{#if isLoading}
  <FloatSpinner size="12" color="text-blue-500" />
{:else}
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg overflow-hidden shadow-xl max-w-2xl w-full">
      <div class="bg-gray-700 p-4 flex justify-between items-center">
        <h2 class="text-white text-lg font-semibold">Comments</h2>
        <button on:click={closeModal} class="text-white">&times;</button>
      </div>
      <div class="p-4 space-y-4 max-h-96 overflow-y-auto">
        {#if comments.length === 0}
          <div class="text-center text-gray-700">
            <p class="text-lg font-semibold">There are no comments yet.</p>
            <p class="text-gray-500 mt-2">Be the first to leave a comment!</p>
          </div>
        {:else}
          {#each comments as comment}
            <div class="bg-gray-100 p-4 rounded-lg flex items-start space-x-4">
              <img class="w-12 h-12 rounded-full" src={comment.user.profile_picture_url} alt="User Avatar">
              <div class="flex-grow">
                <p class="text-gray-700 font-semibold">{comment.user.username}</p>
                <p class="text-gray-500 text-sm">{comment.created_at}</p>
                <p class="text-gray-600 mt-2">{comment.content}</p>
              </div>
              <div class="flex space-x-2">
                <button class="text-blue-500 hover:text-blue-700">
                  <!-- Ícone SVG para editar o comentário -->
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-1.036L7.5 18.036l-4.036 1L5 14.5l9.732-9.732zm0 0l1.768-1.768a2 2 0 012.828 0l1.768 1.768a2 2 0 010 2.828l-1.768 1.768m-2.036-1.036L7.5 18.036l-4.036 1L5 14.5l9.732-9.732z"></path>
                  </svg>
                </button>
                <button class="text-red-500 hover:text-red-700">
                  <!-- Ícone SVG para deletar o comentário -->
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-1.5 12.5A2 2 0 0115.5 22h-7a2 2 0 01-2-2.5L5 7m5 4v5m4-5v5M7 7h10M10 4h4m-4 0a1 1 0 00-1 1v2h6V5a1 1 0 00-1-1m-4 0h4"></path>
                  </svg>
                </button>
              </div>
            </div>
          {/each}
        {/if}
      </div>
      <div class="p-4 flex justify-center">
        <button on:click={toggleNewForm} class="text-blue-500 hover:text-blue-700 flex items-center">
          <!-- Ícone SVG para adicionar um novo comentário -->
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
        </button>
      </div>
      {#if showNewForm}
        <NewComment postID={postID} on:submit={handleNewComment} on:close={() => (showNewForm = false)} />
      {/if}
    </div>
  </div>
{/if}