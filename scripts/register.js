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

    // Check if the user is already registered
    if (localStorage.getItem(regUsername)) {
        alert("User already exists");
    } else {
        // Store user information in local storage
        let objToPush = JSON.stringify({
            username: regUsername,
            password: simpleHash(regPassword),
            score: 0,
            myList: [],
        });
        localStorage.setItem(regUsername, objToPush);
        window.location.href = "login.html";
    }
}
