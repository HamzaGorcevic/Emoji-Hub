function simpleHash(input) {
    let hash = 0;

    for (let i = 0; i < input.length; i++) {
        const char = input.charCodeAt(i);
        hash = (hash << 2) - hash + char;
    }

    return hash;
}

function login() {
    var loginUsername = document.getElementById("loginUsername").value;
    var loginPassword = document.getElementById("loginPassword").value;
    if (loginPassword.trim() === "") {
        document.getElementById("passwordError").innerText =
            "Password is required";
    }
    if (loginUsername.trim() === "") {
        document.getElementById("usernameError").innerText =
            "Username is required";
        return;
    }

    // Check if the user is registered and the password is correct
    if (JSON.parse(localStorage.getItem(loginUsername))) {
        if (
            JSON.parse(localStorage.getItem(loginUsername)).password ==
            simpleHash(loginPassword)
        ) {
            localStorage.setItem("loggedInUser", loginUsername);
            window.location.href = "index.html";
            console.log("logged in");
        } else {
            document.getElementById("passwordError").innerText =
                "Please input correct password";
        }
    } else {
        document.getElementById("usernameError").innerText =
            "User doesn't exists";
    }
}
