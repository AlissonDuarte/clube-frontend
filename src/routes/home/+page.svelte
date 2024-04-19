<script>

	import { API_URL_BASE } from "../../app.js";

</script>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Book Social</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>

    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #F0F8FF;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            min-height: 100vh; 
            justify-content: center; 
            align-items: center; 
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            text-align: center;
        }
        .logo {
            font-size: 2rem;
            color: #333;
            margin-bottom: 20px;
        }
        .headline {
            font-size: 1.5rem;
            color: #555;
            margin-bottom: 20px;
        }
        .cta-buttons {
            position: absolute;
            top: 20px;
            right: 20px;
        }
        .cta-button {
            padding: 10px 20px;
            font-size: 1rem;
            color: white;
            background-color: #007bff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            margin-left: 10px; 
        }
        .cta-button:hover {
            background-color: #0056b3;
        }
        .features {
            display: flex;
            justify-content: center;
            margin-top: 40px;
        }
        .feature {
            flex: 0 1 33%;
            padding: 20px;
        }
        .feature-icon {
            font-size: 2rem;
            color: #007bff;
            margin-bottom: 10px;
        }
        .feature-heading {
            font-size: 1.2rem;
            color: #333;
            margin-bottom: 10px;
        }
        .feature-description {
            color: #555;
        }
        footer {
            background-color: #ddd;
            padding: 20px 0;
            text-align: center;
            margin-top: auto;
            width: 100%;
        }
        footer p {
            color: #555;
            margin: 0;
        }
        img {
            max-width: 40%;
            height: auto;
            margin-top: 20px;
        } 
        .modal-body {
            font-family: Arial, sans-serif;
            background-color: #e8e3e3;
        }
        .modal-container {
            width: 300px;
            margin-left: auto; 
            margin-right: auto;
            margin-top: 100px;
            text-align: center;
        }
        .modal-container input[type="text"], 
        .modal-container input[type="password"], 
        .modal-container input[type="email"], 
        .modal-container input[type="date"] {
            width: 100%;
            padding: 10px;
            margin-top: 10px;
        }
        .modal-container input[type="submit"] {
            width: 100%;
            padding: 10px;
            margin-top: 10px;
            background-color: #007bff;
            color: white;
            border: none;
            cursor: pointer;
        }
        .modal-container label {
            display: block;
            text-align: left;
            margin-top: 10px;
        }
        .modal-container .gender {
            display: block;
            text-align: left;
            margin-top: 10px;
            margin-left: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="logo">Book Social</h1>
        <p class="headline">Connect with fellow book lovers.</p>
        <div class="cta-buttons">
            <button class="cta-button" data-bs-toggle="modal" data-bs-target="#signupModal">Sign Up</button>
            <button class="cta-button" data-bs-toggle="modal" data-bs-target="#signinModal">Sign In</button>
        </div>
        <img src="landing_background.png" alt="Books" width="300vh">


        <div class="features">
            <div class="feature">
                <div class="feature-icon">📚</div>
                <div class="feature-heading">Discover</div>
                <div class="feature-description">Explore a vast library of books from various genres.</div>
            </div>
            <div class="feature">
                <div class="feature-icon">💬</div>
                <div class="feature-heading">Discuss</div>
                <div class="feature-description">Engage in discussions with other users about your favorite books.</div>
            </div>
            <div class="feature">
                <div class="feature-icon">👥</div>
                <div class="feature-heading">Connect</div>
                <div class="feature-description">Connect with friends, authors, and fellow book enthusiasts.</div>
            </div>
        </div>
    </div>

    <footer>
        <p>&copy; 2024 Book Social. All rights reserved.</p>
    </footer>

    <!-- Modal Signup -->
    <div class="modal fade" id="signupModal" tabindex="-1" aria-labelledby="signupModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="signupModalLabel">Sign Up</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <!-- INICIO -->

                
                <!-- FIM -->
                <div class="modal-body">
                    <!-- Form de Sign Up -->
                    <form id="signupForm">
                        <input type="text" name="name" placeholder="Name" class="form-control mb-3">
                        <input type="text" name="username" placeholder="Username" class="form-control mb-3">
                        <input type="email" name="email" placeholder="Email" class="form-control mb-3">
                        <input type="text" name="phone" placeholder="Phone" class="form-control mb-3">
                        <input type="password" name="passwd" placeholder="Password" class="form-control mb-3">
                        <input type="password" name="confirm_password" placeholder="Confirm Password" class="form-control mb-3">
                        <label for="birth_date" class="form-label">Birth Date:</label>
                        <input type="date" name="birth_date" class="form-control mb-3">
                        <label for="gender" class="form-label">Gender:</label>
                        <select name="gender" class="form-select mb-3">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <button type="submit" class="btn btn-primary">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- Fim Modal Signup -->

    <!-- Modal Signin -->
    <div class="modal fade" id="signinModal" tabindex="-1" aria-labelledby="signinModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="signinModalLabel">Sign Up</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <!-- Form de Sign Up -->
                    <form id="signinForm">
                        <input type="email" name="email" placeholder="Email" class="form-control mb-3">
                        <input type="password" name="passwd" placeholder="Password" class="form-control mb-3">
                        <button type="submit" class="btn btn-primary">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- Fim Modal Signin -->
    
    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        import {userStoreId} from "../user/userStore.js"
        document.getElementById("signupForm").addEventListener("submit", function(event) {
            event.preventDefault();
            const formData = {};
            const inputs = this.querySelectorAll("input, select");

            inputs.forEach(input => {
                formData[input.name] = input.value;
            });

            var jsonBody = JSON.stringify(formData);

            fetch(`${API_URL_BASE}` + "/users", {
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

            fetch(`${API_URL_BASE}` + "/login", {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: jsonBody
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => {
                        throw new Error(data.message);
                    });
                }
                return response.json(); 
            })
            .then(data => {
                // recebe o id do usuário aqui e redireciona para pagina dele
                console.log("Dados retornados:", data);
                storeUserID.set(data.data.userID)
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
</html>
