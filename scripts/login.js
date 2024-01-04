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

    // Check if the user is registered and the password is correct
    if (
        JSON.parse(localStorage.getItem(loginUsername)).password ==
        simpleHash(loginPassword)
    ) {
        localStorage.setItem("loggedInUser", loginUsername);
        window.location.href = "index.html";
        console.log("logged in");
    } else {
        console.log("logged in");
        document.getElementById("loginStatus").innerText =
            "Login failed. Please try again.";
    }
}
