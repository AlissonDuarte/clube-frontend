<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LitLink</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    
</head>
<body class="bg-gray-900 text-white flex flex-col justify-center items-center">
    <div class="container text-center">
        <h1 class="logo text-4xl mb-4">LitLink</h1>
        <p class="headline text-lg mb-4">Connect with fellow book lovers.</p>
        <div class="cta-buttons">
            <button class="cta-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" data-bs-toggle="modal" data-bs-target="#signupModal">Sign Up</button>
            <button class="cta-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" data-bs-toggle="modal" data-bs-target="#signinModal">Sign In</button>
        </div>
        <img src="landing_background.png" alt="Books" class="mx-auto max-w-80 mt-20">
        <div class="features flex justify-center mt-8">
            <div class="feature flex flex-col items-center mr-4">
                <div class="feature-icon text-4xl mb-2">📚</div>
                <div class="feature-heading text-lg mb-2">Discover</div>
                <div class="feature-description">Explore a vast library of books from various genres.</div>
            </div>
            <div class="feature flex flex-col items-center mx-4">
                <div class="feature-icon text-4xl mb-2">💬</div>
                <div class="feature-heading text-lg mb-2">Discuss</div>
                <div class="feature-description">Engage in discussions with other users about your favorite books.</div>
            </div>
            <div class="feature flex flex-col items-center ml-4">
                <div class="feature-icon text-4xl mb-2">👥</div>
                <div class="feature-heading text-lg mb-2">Connect</div>
                <div class="feature-description">Connect with friends, authors, and fellow book enthusiasts.</div>
            </div>
        </div>
    </div>


    <!-- Modal Signup -->
    <div class="modal fade" id="signupModal" tabindex="-1" aria-labelledby="signupModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content bg-gray-900 text-white">
                <div class="modal-header bg-gray-900">
                    <h5 class="modal-title" id="signupModalLabel">Sign Up</h5>
                    <button type="button" class="bg-red-900 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-red-950 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">X</button>
                </div>

                <div class="modal-body bg-gray-900" >
                    <!-- Form de Sign Up -->
                    <form id="signupForm">
                        <input type="text" name="name" placeholder="Name" class="form-control mb-3 bg-gray-700 text-black rounded px-4 py-2">
                        <input type="text" name="username" placeholder="Username" class="form-control mb-3 bg-gray-700 text-black rounded px-4 py-2">
                        <input type="email" name="email" placeholder="Email" class="form-control mb-3 bg-gray-700 text-black rounded px-4 py-2">
                        <input type="text" name="phone" placeholder="Phone" class="form-control mb-3 bg-gray-700 text-black rounded px-4 py-2">
                        <input type="password" name="passwd" placeholder="Password" class="form-control mb-3 bg-gray-700 text-black rounded px-4 py-2">
                        <input type="password" name="confirm_password" placeholder="Confirm Password" class="form-control mb-3 bg-gray-700 text-black rounded px-4 py-2">
                        <label for="birth_date" class="form-label text-left">Birth Date:</label>
                        <input type="date" name="birth_date" class="form-control mb-3 bg-gray-700 text-black rounded px-4 py-2">
                        <label for="gender" class="form-label text-left">Gender:</label>
                        <select name="gender" class="form-select mb-3 bg-gray-700 text-black rounded px-4 py-2">
                            <option value="m">Male</option>
                            <option value="f">Female</option>
                            <option value="o">Other</option>
                        </select>
                        <button type="submit" class="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- Fim Modal Signup -->

    <!-- Modal Signin -->
    <div class="modal fade" id="signinModal" tabindex="-1" aria-labelledby="signinModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content bg-gray-900 text-white">
                <div class="modal-header bg-gray-900">
                    <h5 class="modal-title" id="signinModalLabel">Sign In</h5>
                    <button type="button" class="bg-red-900 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-red-950 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">X</button>
                </div>

                <div class="modal-body bg-gray-900">
                    <!-- Form de Sign In -->
                    <form id="signinForm">
                        <input type="email" name="email" placeholder="Email" class="form-control mb-3 bg-gray-700 text-black rounded px-4 py-2">
                        <input type="password" name="passwd" placeholder="Password" class="form-control mb-3 bg-gray-700 text-black rounded px-4 py-2">
                        <button type="submit" class="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- Fim Modal Signin -->
    
    <!-- Bootstrap JS -->
    <script>
        // // cadastrar header
        document.getElementById("signupForm").addEventListener("submit", function(event) {
            event.preventDefault();
            const formData = {};
            const inputs = this.querySelectorAll("input, select");

            inputs.forEach(input => {
                formData[input.name] = input.value;
            });

            var jsonBody = JSON.stringify(formData);

            fetch("http://localhost:3000/users", {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: jsonBody
            })
            .then(response => {
            
                if (!response.ok) {
                    throw new Error("Erro ao cadastrar usuário.");
                }
                return response.json();
            })
            .then(data => {
                if (data.code) {
                    window.location.reload();
                    // window.location.href = "/outra-pagina";
                } else {
                    alert("Erroaaaa: " + data.error);
                }
            })
            .catch(error => {
                console.error("Erro ao enviar requisição:", error);
                alert("Erro ao cadastrar usuário.");
            });
        });
        document.getElementById("signinForm").addEventListener("submit", function(event) {
            event.preventDefault();
            const formData = {};
            const inputs = this.querySelectorAll("input, select");

            inputs.forEach(input => {
                formData[input.name] = input.value;
            });

            var jsonBody = JSON.stringify(formData);

            fetch("http://localhost:3000/user/login", {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: jsonBody
            })
            .then(response => {
                console.log(response)
                if (!response.ok) {
                    return response.json().then(data => {
                        throw new Error(data.message);
                    });
                }
                return response.json(); 
            })
            .then(data => { 
                // recebe o id do usuário aqui e redireciona para pagina dele
                const loggedInUserID = data.data.userID;
                const userJWT = data.data.userJWT
                localStorage.setItem("userJWT", userJWT)
                localStorage.setItem("userID", loggedInUserID)
                window.location.href = "/user/profile";

            })
            .catch(error => {

                // forma de mostrar o erro na tela
                // criar componente dinamico para mostrar erro
                //utilizar todos os recursos disponiveis
                alert(error);
            });
        });

    </script>
</body>
<footer class="fixed bottom-0 left-0 bg-gray-800 py-4 text-center w-full">
    <p>&copy; 2024 LitLink. All rights reserved.</p>
</footer>


</html>
