<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { API_URL_BASE } from '../../../app.js';
  import FloatSpinner from '../Feed/FloatSpinner.svelte';

  export let postID;
  let comments = [];
  let isLoading = true;

  async function handleComments(postID) {
    const userJWT = localStorage.getItem('userJWT');

    try {
      const commentsResponse = await fetch(`${API_URL_BASE}/post/${postID}/comments`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + userJWT,
          'Content-Type': 'application/json'
        }
      });

      if (!commentsResponse.ok) {
        throw new Error('Failed to fetch comments');
      }

      const commentsData = await commentsResponse.json();

      if (!Array.isArray(commentsData)) {
        throw new TypeError('Comments data is not an array');
      }

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

  const newComment = () => {
    dispatch('newComment');
  };

  onMount(() => {
    handleComments(postID);
  });
</script>

{#if isLoading}
  <FloatSpinner size="12" color="text-blue-500" />
{:else}
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg overflow-hidden shadow-xl max-w-2xl w-full relative">
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
              <div>
                <p class="text-gray-700 font-semibold">{comment.user.username}</p>
                <p class="text-gray-500 text-sm">{comment.created_at}</p>
                <p class="text-gray-600 mt-2">{comment.content}</p>
              </div>
            </div>
          {/each}
        {/if}
      </div>
      <button 
        on:click={newComment} 
        class="absolute bottom-4 right-4 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
        aria-label="Add a comment"
      >
        <!-- Ícone SVG de adição -->
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v14m7-7H5"></path>
        </svg>
      </button>
    </div>
  </div>
{/if}
