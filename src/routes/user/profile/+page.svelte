<script lang ="js">
    import Menu from "../../Components/SideBars/Menu.svelte";
    import Header from "../../Components/Headers/Header.svelte";
    import ChangePasswordModal from "../../Components/Modals/ChangePasswordModal.svelte";
    import { onMount } from 'svelte';    
    import { API_URL_BASE } from '../../../app.js'
    
    
    let showModal = false;
    function openModal(){
    showModal = true;
    }

    let user = {
        Username: "",
        Name: "",
        Email: "",
        Phone: "",
        Bio: "",
        birth_date:"",
        Gender: "",
        Passwd: "",
    };

    let jwt = '';
    let userID = '';
    let image = {buffer: new ArrayBuffer(0), name: "", previewUrl: ""};
    let userImageUrl = ''
    // const authorizedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

    async function handleImageSelection(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);

        reader.onload = () => {
            const buffer = reader.result;
            const bufferUint8 = new Uint8Array(buffer)

            const blob = new Blob([bufferUint8], {type:file.type});
            const urlCreator = window.URL || window.webkitURL;
            const imageUrl = urlCreator.createObjectURL(blob);
            image = {buffer, name:file.name, previewUrl: imageUrl}

        }
    }

 
    async function fetchData() {
        const storageUserID = localStorage.getItem('userID');
        if (storageUserID){
            userID = storageUserID
        }

        const userJWT = localStorage.getItem('userJWT');
        jwt = "Bearer " + userJWT;

        try {
            const response = await fetch(`${API_URL_BASE}/user/${userID}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": jwt
                }
            });

            const data = await response.json();

            user.Name = data.Name;
            user.Username = data.Username;
            user.Email = data.Email;
            user.Phone = data.Phone;
            user.Bio = data.Bio;
            user.birth_date = data.BirthDate;
            user.Gender = data.Gender;
        } catch (error) {
            console.error('Error fetching user data:', error);
            // Handle error (e.g., show a message to the user)
        }
        const pictureResponse = await fetch(`${API_URL_BASE}/user/${userID}` + '/images/user', {
            method: 'GET',
            headers : {
                "Authorization": jwt
            }
        });
        const picture = await pictureResponse.blob();
        userImageUrl = URL.createObjectURL(picture);

    }

    async function saveChanges() {
        try {
            await fetch(`${API_URL_BASE}/user/${userID}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": jwt
                },
                body: JSON.stringify(user)
            });
        } catch (error) {
            console.error('Error saving changes:', error);
        }
    }
    async function changePicture() {
        if (image.buffer.byteLength > 0) {
        const blob = new Blob([image.buffer], { type: 'image/png' });
        const formData = new FormData();
        formData.append('file', blob, 'file.png');
        fetch(`${API_URL_BASE}/user/${userID}` + '/images/user', {
            method: 'POST',
            body: formData,
            headers: {
                "Authorization": jwt
            }
        })
            .then(response => response.json())
            .then(data => console.log(data));
        }
    }
    onMount(() => {
        fetchData();
    });
</script>

<header>
    <Header />
</header>

<body>

    <div class="flex justify-between my-5 py-4">
        <div class="w-1/4">
            <Menu />
        </div>

        <div class="w-1/2 px-4">
            <div class="relative rounded-lg overflow-hidden border-t border-white">
                <div class="h-52 w-52 flex justify-center items-center">
                    <label for="file_input" class="cursor-pointer">
                        {#if image.previewUrl.length > 0}
                            <img src={image.previewUrl} alt="Preview da imagem" class="rounded-full h-52 w-52">
                        {:else if userImageUrl.length > 0}
                            <img src={userImageUrl} alt="" class="rounded-full h-52 w-52">
                        {:else}
                            <img src="https://via.placeholder.com/150" alt="Foto de perfil" class="rounded-full h-52 w-52">
                        {/if}
                        <input 
                        id="file_input" 
                        type="file" 
                        class="hidden" 
                        on:change={handleImageSelection}>
                    </label>
                    <!-- criar um botão de upload somente para foto de perfil -->
                </div>

                <div class="p-4">
                    <button id="save_button" class="bg-gray-200 text-gray-800 px-4 py-2 my-4 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out mt-4" on:click={changePicture}>Change Picture</button>

                    <form>
                        <div class="mb-4">
                            <label for="username" class="block text-sm text-white mb-1">Username</label>
                            <input type="text" id="username" class="w-3/4 px-2 py-1 border rounded" placeholder="Username" bind:value={user.Username}>
                        </div>
                        <div class="mb-4">
                            <label for="name" class="block text-sm text-white mb-1">Name</label>
                            <input type="text" id="name" class="w-3/4 px-2 py-1 border rounded" placeholder="Name" bind:value={user.Name}>
                        </div>
                        <div class="mb-4">
                            <label for="email" class="block text-sm text-white mb-1">Email</label>
                            <input type="email" id="email" class="w-3/4 px-2 py-1 border rounded" placeholder="Email" bind:value={user.Email}>
                        </div>
                        <div class="mb-4">
                            <label for="phone" class="block text-sm text-white mb-1">Phone</label>
                            <input type="tel" id="phone" class="w-3/4 px-2 py-1 border rounded" placeholder="Phone" bind:value={user.Phone}>
                        </div>
                        <div class="mb-4">
                            <label for="bio" class="block text-sm text-white mb-1">Bio</label>
                            <textarea id="bio" class="w-3/4 px-2 py-1 border rounded" rows="4" placeholder="Bio" bind:value={user.Bio}></textarea>
                        </div>

                        <div class="mb-4">
                            <label for="gender" class="block text-sm text-white mb-1">Gender</label>
                            <select id="gender" class="w-3/4 px-2 py-1 border rounded" bind:value={user.Gender}>
                                <option value="">Select gender</option>
                                <option value="m">Male</option>
                                <option value="f">Female</option>
                                <option value="o">Other</option>
                            </select>
                        </div>
                        <div class="mb-4">
                            <label for="birthDate" class="block text-sm text-white mb-1">Birth Date</label>
                            <input type="date" id="birthDate" class="w-3/4 px-2 py-1 border rounded" bind:value={user.birth_date}>
                        </div>

                        
                        <div>
                            <button id="save_button" class="bg-blue-500 text-white px-4 py-2 rounded mt-4 mr-10" on:click={saveChanges}>Save</button>

                            <button on:click={openModal} class="text-blue-500 cursor-pointer">Change Password</button>
                            <ChangePasswordModal {showModal} />
                          </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="w-1/4 p-4">
            <!-- Conteúdo das notificações -->
            <h2 class="text-lg text-white font-semibold mb-4">Suggestions</h2>
            <!-- Adicione itens de notificação aqui -->
        </div>
    </div>
</body>
