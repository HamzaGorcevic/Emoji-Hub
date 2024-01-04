let loginUser = document.querySelector(".loginUser");
let registerUser = document.querySelector(".registerUser");
let menuH = document.querySelector(".menu");
let myLi = document.querySelector(".myLi");
let loggedInUser = localStorage.getItem("loggedInUser");
if (loggedInUser) {
    var logout = document.createElement("li");
    let logoutA = document.createElement("a");
    logoutA.innerHTML = "Log out";
    logout.appendChild(logoutA);
    loginUser.style.display = "none";
    registerUser.style.display = "none";
    menuH.append(logout);
} else {
    myLi.style.display = "none";
}
logout.addEventListener("click", () => {
    window.location.href = "login.html";
    localStorage.removeItem("loggedInUser");
});
