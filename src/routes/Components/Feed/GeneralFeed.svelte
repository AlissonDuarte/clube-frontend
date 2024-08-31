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
    const postUserId = post.user.id; // Acessando o ID do usuário do post
    const postImageId = post.imageID; // Acessando o ID da imagem do post
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
        <p class="text-white font-semibold text-lg">{post.user.name}</p>
        <p class="text-gray-300">{post.user.username}</p> <!-- Alteração na cor do texto -->
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
          {post.title}
        </div>
        <p class="text-gray-300 text-base mb-4 h-40 overflow-y-auto"> <!-- Defina uma altura fixa -->
          {post.content}
        </p>
        <!-- Adicionando uma barra divisória -->
        <hr class="border-t border-gray-500 mb-4"> 
        <!-- Tags, botões de ação, etc. podem ser adicionados aqui +-->
        <!-- Seção de comentários -->
        <div class="text-gray-300 mt-4">
          <button
            type="button"
            class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            on:click={toggleComments}
          >
            Comments ({post.commentCount})
          </button>
          
          {#if showComments}
            <div class="mt-4">
              <!-- Exibir comentários -->
              <Comment postID={post.id} on:close={closeComments} />
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
