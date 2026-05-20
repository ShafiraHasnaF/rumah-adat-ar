document.addEventListener("DOMContentLoaded", () => {
    splashScreen();
})

function splashScreen() {
    const splashScreen = document.getElementById("splash-screen");
    const homepage = document.getElementById("homepage");
    setTimeout(() => {
        splashScreen.classList.remove("opacity-100");
        splashScreen.classList.add("opacity-0");
        setTimeout(() => {
            splashScreen.style.display = "none";
            homepage.classList.remove("opacity-0");
            homepage.classList.add("opacity-100");
        }, 500);
    }, 3000);
}