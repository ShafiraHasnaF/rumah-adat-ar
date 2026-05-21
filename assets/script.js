document.addEventListener("DOMContentLoaded", () => {
    splashScreen();

    // data rudat
    const dataRumah = [
        { nama: "Tongkonan", pulau: "Sulawesi", region: "Sulawesi Selatan" },
        { nama: "Baduy", pulau: "Jawa", region: "Jawa Barat" },
        { nama: "Krong Bade", pulau: "Sumatra", region: "Aceh" },
        { nama: "Worat-Worat", pulau: "Maluku", region: "Maluku" },
        { nama: "Lakatuil", pulau: "Nusa Tenggara", region: "Alor" }
    ];
    let activeFilter = "Semua"; let searchQuery = "";

    //btn filter di homepage
    const btnFilterPulau = document.querySelectorAll(".filter-btn");
    btnFilterPulau.forEach(button => {
        button.addEventListener("click", () => {
            // filteraktif
            activeFilter = button.textContent.trim();

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

            filterDanSearch();
        });
    });

    // searc
    const searchInput = document.querySelector("input[type='text']");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchQuery = e.target.value;
            filterDanSearch();
        });
    }

    // filter searc
    function filterDanSearch() {
        const cards = document.querySelectorAll(".grid > div");
        const cardArray = Array.from(cards);
        cardArray.forEach((card, index) => {
            if (index < dataRumah.length) {
                const data = dataRumah[index];
                const matchFilter = activeFilter === "Semua" || data.pulau === activeFilter;
                const matchSearch = data.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    data.region.toLowerCase().includes(searchQuery.toLowerCase());

                if (matchFilter && matchSearch) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }
            }
        });
    }

    //kamera ar
    const params = new URLSearchParams(window.location.search);
    const selectedHouse = params.get("house");
    console.log("rudat dipilih dr url:", selectedHouse);

    const popup = document.getElementById("popup");
    const popupTitle = document.getElementById("popup-title");
    const popupRegion = document.getElementById("popup-region");
    const detailBtn = document.getElementById("detail-btn");
    const rmhAdat = [
        {
            id: "#tongkonan-target",
            name: "tongkonan",
            title: "Rumah Adat Tongkonan",
            region: "Asal : Sulawesi Selatan",
            url: "/section/rumahadat/tongkonan.html"
        },
        {
            id: "#baduy-target",
            name: "baduy",
            title: "Rumah Adat Baduy",
            region: "Asal : Jawa Barat",
            url: "/section/rumahadat/baduy.html"
        },
        {
            id: "#krongbade-target",
            name: "krongbade",
            title: "Rumah Adat Krongbade",
            region: "Asal : Aceh",
            url: "/section/rumahadat/krongbade.html"
        },
        {
            id: "#woratworat-target",
            name: "woratworat",
            title: "Rumah Adat Woratworat",
            region: "Asal : Maluku",
            url: "/section/rumahadat/woratworat.html"
        },
        {
            id: "#lakatuil-target",
            name: "lakatuil",
            title: "Rumah Adat Lakatuil",
            region: "Asal : Alor",
            url: "/section/rumahadat/lakatuil.html"
        },
    ];

    rmhAdat.forEach((house) => {
        const target = document.querySelector(house.id);
        if (!target) {
            console.log(`null: ${house.id}`);
            return;
        }
        target.addEventListener("targetFound", () => {
            console.log(`${house.title} detected, rudat yg dipilih: ${selectedHouse}`);
            if (selectedHouse && selectedHouse !== house.name) {
                console.log("rumah tdk match");
                popup.classList.add("show");
                popupTitle.textContent = "Bukan rumah ini!";
                popupRegion.textContent = `Ini adalah ${house.title}`;
                detailBtn.onclick = () => {
                    console.log(`ttp lihat detail ${house.name}`);
                    window.location.href = `${house.url}`;
                };
                detailBtn.innerHTML = `<i class="fa-solid fa-book-open mr-2"></i> Lihat Detail Ini`;
                return;
            }

            console.log("popup muncul");
            popup.classList.add("show");
            popupTitle.textContent = house.title;
            popupRegion.textContent = house.region;
            detailBtn.innerHTML = `<i class="fa-solid fa-book-open mr-2"></i> Lihat Filosofi`;
            detailBtn.onclick = () => {
                console.log(`klik detail ${house.name}`);
                window.location.href = `${house.url}`;
            };
        });
        target.addEventListener("targetLost", () => {
            console.log(`${house.title} hilang`);
            popup.classList.remove("show");
        });
    });

    // suara dikte
    const voiceBtn = document.getElementById("voice-btn");
    if (voiceBtn) {
        // const audioSrc = voiceBtn.dataset.audio;
        // const audio = new Audio(audioSrc);
        const audioSrc = voiceBtn.dataset.audio;
        console.log(audioSrc);
        const audio = new Audio(audioSrc);
        audio.addEventListener("error", () => {
            console.log("audio gagal load");
        });
        let isPlaying = false;
        voiceBtn.addEventListener("click", () => {
            if (!isPlaying) {
                audio.play();
                isPlaying = true;
                voiceBtn.innerHTML = `<i class="fa-solid fa-volume-xmark text-3xl"></i>`;
                console.log("audio play");
            }
            else {
                audio.pause();
                audio.currentTime = 0;
                isPlaying = false;
                voiceBtn.innerHTML = `<i class="fa-solid fa-volume-up text-3xl"></i>`;
                console.log("audio stop");
            }
        });
        audio.addEventListener("ended", () => {
            isPlaying = false;
            voiceBtn.innerHTML = `<i class="fa-solid fa-volume-up text-3xl"></i>`;
        });
    }
})

function splashScreen() {
    const splashScreen = document.getElementById("splash-screen");
    const guidepage = document.getElementById("guidepage");

    if (!splashScreen) {
        console.log("splash-screen tidak ditemukan");
        return;
    }
    if (!guidepage) {
        console.log("guidepage tidak ditemukan");
        return;
    }
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