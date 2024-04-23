<!-- UserFeed.svelte -->
<script>
  import { onMount } from 'svelte';
  import { API_URL_BASE } from '../../../app.js';
  export let post;

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
      hasUserImage = true
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
      hasPostImage = true
    }

    const postImageBlob = await postResponse.blob();
    postImage = postImageBlob ? URL.createObjectURL(postImageBlob) : 'placeholder_post.jpg'; // Usando placeholder se não houver imagem
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

<!-- Aqui está o código HTML do componente UserFeed.svelte -->
<div class="max-w-lg">
  <div class="bg-grey rounded overflow-hidden shadow-lg mb-8">
    <!-- Cabeçalho -->
    <div class="bg-white rounded-t overflow-hidden shadow-lg p-4 flex items-center">
      <!-- Avatar do usuário -->
      <img class="w-12 h-12 rounded-full mr-4" src={userImage} alt="Avatar">
      <div>
        <p class="text-gray-900 font-semibold">{post.User.Name}</p>
        <p class="text-gray-600">{post.User.Username}</p>
      </div>
    </div>
    <!-- Conteúdo do post -->
    <div class="bg-white rounded-b overflow-hidden shadow-lg flex">
      <!-- Divisão da imagem -->
      <div class="w-1/3" style="width: full; height: full;"> <!-- Adicionando estilos inline -->
        <!-- Imagem do post -->
          <img class="w-full h-full object-cover" src={postImage} alt="postImage">
      </div>
      <!-- Divisão do texto, tags, etc. -->
      <div class="w-2/3 p-4">
        <div class="font-bold text-xl mb-2">
          {post.Title}
        </div>
        <p class="text-gray-700 text-base">
          {post.Content}
        </p>
      </div>
    </div>
  </div>
</div>
