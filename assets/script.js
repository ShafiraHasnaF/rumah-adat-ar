document.addEventListener("DOMContentLoaded", () => {
    splashScreen();

    //btn filter di homepage
    const btnFilterPulau = document.querySelectorAll(".filter-btn");
    btnFilterPulau.forEach(button => {
        button.addEventListener("click", () => {
            btnFilterPulau.forEach(btn => {
                btn.classList.remove(
                    "bg-white",
                    "text-[#4E2012]",
                    "rounded-t-2xl",
                    "px-6"
                );
                btn.classList.add(
                    "text-white",
                    "border-b-4",
                    "border-white"
                );
            });
            button.classList.remove(
                "text-white",
                "border-b-4",
                "border-white"
            );
            button.classList.add(
                "bg-white",
                "text-[#4E2012]",
                "rounded-t-2xl",
                "px-6"
            );
        });
    });
})

function splashScreen() {
    const splashScreen = document.getElementById("splash-screen");
    const guidepage = document.getElementById("guidepage");
    setTimeout(() => {
        splashScreen.classList.remove("opacity-100");
        splashScreen.classList.add("opacity-0");
        setTimeout(() => {
            splashScreen.style.display = "none";
            guidepage.classList.remove("opacity-0");
            guidepage.classList.add("opacity-100");
        }, 500);
    }, 3000);
}