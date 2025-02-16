document.addEventListener("DOMContentLoaded", function () {
    const spreads = document.getElementById("spreads");
    const navLeft = document.getElementById("nav-l");
    const navRight = document.getElementById("nav-r");

    if (!spreads || !navLeft || !navRight) {
        console.error("One or more elements are missing!");
        return; // Stop execution if elements aren't found
    }

    const spreadsImages = [
        "data/cargo/1.png",
        "data/cargo/2.jpg",
        "data/cargo/3.jpg",
        "data/cargo/4.jpg",
        "data/cargo/5.jpg",
        "data/cargo/6.jpg",
        "data/cargo/7.jpg",
        "data/cargo/8.jpg",
        "data/cargo/9.jpg",
        "data/cargo/10.jpg",
        "data/cargo/11.jpg",
        "data/cargo/12.jpg",
        "data/cargo/13.png"
    ];

    let currentIndex = 0;

    function updateImage() {
        spreads.src = spreadsImages[currentIndex];
    }

    navRight.addEventListener("click", function () {
        currentIndex = (currentIndex + 1) % spreadsImages.length;
        updateImage();
    });

    navLeft.addEventListener("click", function () {
        currentIndex = (currentIndex - 1 + spreadsImages.length) % spreadsImages.length;
        updateImage();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight") {
            navRight.click();
        } else if (event.key === "ArrowLeft") {
            navLeft.click();
        }
    });

    updateImage(); // Set initial image
});