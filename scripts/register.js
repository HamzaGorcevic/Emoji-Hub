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
        user: regUsername,
        password: simpleHash(regPassword),
        score: 0,
        mylist: [],
    });
    localStorage.setItem(regUsername, objToPush);
    const apiUrl = "./database.json";

    postData(apiUrl, {
        username: regUsername,
        password: JSON.stringify(simpleHash(regPassword)),
    }).then((res) => {
        console.log("response", res);
    });
}

async function postData(url = "", data = {}) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error during POST request:", error);
        throw error;
    }
}

async function postData(url = "", data = {}) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error during POST request:", error);
        throw error;
    }
}
