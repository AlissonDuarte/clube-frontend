<script>
  import { onMount } from 'svelte';
  import { API_URL_BASE } from '../../../app.js';
  import Comment from '../Modals/Comment.svelte'
  export let post;
  let showComments = false;
  let userImage = "";
  let hasUserImage = false;
  let postImage = "";
  let hasPostImage = false;

  async function handlePictures(postUserId, postImageId) {
    const userJWT = localStorage.getItem('userJWT');

    // Busca a imagem do usuário
    const userResponse = await fetch(`${API_URL_BASE}/user/${postUserId}/images/user`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + userJWT,
        'Content-Type': 'application/json'
      }
    });

    if (userResponse.ok) {
      hasUserImage = true;
    }
    const userImageBlob = await userResponse.blob();
    userImage = userImageBlob ? URL.createObjectURL(userImageBlob) : 'placeholder_user.jpg'; // Usando placeholder se não houver imagem

    // Busca a imagem do post
    const postResponse = await fetch(`${API_URL_BASE}/user/${postUserId}/images/posts/${postImageId}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + userJWT,
        'Content-Type': 'application/json'
      }
    });
    if (postResponse.ok) {
      hasPostImage = true;
    }

    const postImageBlob = await postResponse.blob();
    postImage = postImageBlob ? URL.createObjectURL(postImageBlob) : 'placeholder_post.jpg'; // Usando placeholder se não houver imagem
  }

  function toggleComments() {
    showComments = !showComments;
  }

  function closeComments() {
    showComments = false;
  }

  function hasTags(tags) {
    return tags && tags.length > 0;
  }

  onMount(() => {
    const postUserId = post.User.ID; // Acessando o ID do usuário do post
    const postImageId = post.ImageID; // Acessando o ID da imagem do post
    handlePictures(postUserId, postImageId);
  });
</script>

<div class="max-w-lg">
  <div class="bg-gray-800 rounded-lg overflow-hidden shadow-lg mb-8"> <!-- Aumento do raio de borda -->
    <!-- Cabeçalho -->
    <div class="bg-gray-700 rounded-t-lg overflow-hidden shadow-lg p-4 flex items-center"> <!-- Aumento do raio de borda -->
      <!-- Avatar do usuário -->
      <img class="w-12 h-12 rounded-full mr-4 border-2 border-gray-600" src={userImage} alt="Avatar"> <!-- Alteração na cor da borda -->
      <div>
        <p class="text-white font-semibold text-lg">{post.User.Name}</p>
        <p class="text-gray-300">{post.User.Username}</p> <!-- Alteração na cor do texto -->
      </div>
    </div>
    
    <!-- Conteúdo do post -->
    <div class="bg-gray-600 rounded-b-lg overflow-hidden shadow-lg flex"> <!-- Aumento do raio de borda -->
      <!-- Divisão da imagem -->
      <div class="w-1/3">
        <!-- Imagem do post -->
        <img class="w-full h-full object-cover rounded-lg" src={postImage} alt="postImage"> <!-- Aumento do raio de borda -->
      </div>
      <!-- Divisão do texto, tags, etc. -->
      <div class="w-2/3 p-4">
        <div class="font-bold text-xl text-white mb-2 h-15 overflow-y-auto"> <!-- Defina uma altura fixa -->
          {post.Title}
        </div>
        <p class="text-gray-300 text-base mb-4 h-40 overflow-y-auto"> <!-- Defina uma altura fixa -->
          {post.Content}
        </p>
        <!-- Adicionando uma barra divisória -->
        <hr class="border-t border-gray-500 mb-4"> 
        <!-- Tags, botões de ação, etc. podem ser adicionados aqui +-->
        <!-- Seção de comentários -->
        <div class="text-gray-300 mt-4">
          <div class="flex items-center justify-between">
            <p class="text-sm font-semibold text-white">comments ({post.CommentCount})</p> 
            <!-- Ícone para expandir -->
            <button class="text-sm text-blue-500 hover:underline flex items-center" on:click={toggleComments}>  
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
              {#if showComments} less {/if}
              {#if !showComments} more {/if}
            </button>
          </div>
          {#if showComments}
            <Comment postID={post.ID} on:close={closeComments} />
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
