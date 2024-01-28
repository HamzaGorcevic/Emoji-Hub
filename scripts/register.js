function simpleHash(input) {
    let hash = 0;

    for (let i = 0; i < input.length; i++) {
        const char = input.charCodeAt(i);
        hash = (hash << 2) - hash + char;
    }

    return hash;
}

function register() {
    var regUsername = document.getElementById("regUsername").value;
    var regPassword = document.getElementById("regPassword").value;

    if (regUsername.trim() === "") {
        document.getElementById("usernameError").innerText =
            "Username is required";
        return;
    } else {
        document.getElementById("usernameError").innerText = "";
    }

    if (regPassword.trim() === "") {
        document.getElementById("passwordError").innerText =
            "Password is required";
        return;
    } else {
        document.getElementById("passwordError").innerText = "";
    }

    if (localStorage.getItem(regUsername)) {
        document.getElementById("usernameError").innerText =
            "User already exists";
    } else {
        document.getElementById("usernameError").innerText = "";
    }

    if (regPassword.length < 5) {
        document.getElementById("passwordError").innerText =
            "Password must be above 5 characters";
        return;
    } else {
        document.getElementById("passwordError").innerText = "";
    }

    var passwordRegex = /^(?=.*[A-Z])(?=.*\d).{5,}$/;
    if (!passwordRegex.test(regPassword)) {
        document.getElementById("passwordError").innerText =
            "Password must be at least 5 characters long, contain at least one uppercase letter, and at least one digit.";
        return;
    } else {
        document.getElementById("passwordError").innerText = "";
    }

    // Store user information in local storage

    let objToPush = JSON.stringify({
        user: regUsername,
        password: simpleHash(regPassword),
        score: 0,
        mylist: [],
    });
    localStorage.setItem(regUsername, objToPush);
    window.location.href = "login.html";

    // U slucaju da dobijem api na koji mogu da postavim

    // const apiUrl = "https://emojihubusers.wiremockapi.cloud/users";
    const apiUrl =
        "https://api.restful-api.dev/objects/ff8081818d2cb651018d4719403822de";
    postData(apiUrl, {
        name: regUsername,
        data: {
            username: regUsername,
            password: JSON.stringify(simpleHash(regPassword)),
        },
    })
        .then((res) => {
            res.json();
        })
        .then((response) => {
            console.log(response);
        });
}

async function postData(url = "", data = {}) {
    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(data),
        });

        return response;
    } catch (error) {
        console.error("Error during POST request:", error);
        throw error;
    }
}
