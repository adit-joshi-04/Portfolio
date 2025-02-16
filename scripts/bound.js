document.addEventListener("DOMContentLoaded", function () {
    const spreads = document.getElementById("spreads");
    const navLeft = document.getElementById("nav-l");
    const navRight = document.getElementById("nav-r");

    if (!spreads || !navLeft || !navRight) {
        console.error("One or more elements are missing!");
        return; // Stop execution if elements aren't found
    }

    const spreadsImages = [
        "data/bound/1.png",
        "data/bound/2.png",
        "data/bound/3.png",
        "data/bound/4.png",
        "data/bound/5.png",
        "data/bound/6.png",
        "data/bound/7.png"
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