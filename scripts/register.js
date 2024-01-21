function simpleHash(input) {
    let hash = 0;

    for (let i = 0; i < input.length; i++) {
        const char = input.charCodeAt(i);
        console.log(char);
        hash = (hash << 2) - hash + char;
    }

    return hash;
}

// Example usage
const inputString = "hamza";
const hashedValue = simpleHash(inputString);
console.log(105 << 2);
console.log(hashedValue);

function register() {
    var regUsername = document.getElementById("regUsername").value;
    var regPassword = document.getElementById("regPassword").value;

    if (regUsername.trim() === "") {
        document.getElementById("usernameError").innerText =
            "Username is required";
        return;
    }
    if (regPassword.trim() === "") {
        document.getElementById("passwordError").innerText =
            "Password is required";
        return;
    }
    if (localStorage.getItem(regUsername)) {
        document.getElementById("usernameError").innerText =
            "User already exists";
    }
    if (regPassword.length < 5) {
        document.getElementById("passwordError").innerHTML =
            "Password must be above 5 characters";
        return;
    }
    var passwordRegex = /^(?=.*[A-Z])(?=.*\d).{5,}$/;
    if (!passwordRegex.test(regPassword)) {
        document.getElementById("passwordError").innerText =
            "Password must be at least 5 characters long, contain at least one uppercase letter, and at least one digit.";
        return;
    }

    // Store user information in local storage
    let objToPush = JSON.stringify({
        username: regUsername,
        password: simpleHash(regPassword),
        score: 0,
        mylist: [],
    });
    localStorage.setItem(regUsername, objToPush);
    window.location.href = "login.html";
}
