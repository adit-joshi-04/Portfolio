document.addEventListener("DOMContentLoaded", function () {
    const spreads = document.getElementById("spreads");
    const navLeft = document.getElementById("nav-l");
    const navRight = document.getElementById("nav-r");

    if (!spreads || !navLeft || !navRight) {
        console.error("One or more elements are missing!");
        return; // Stop execution if elements aren't found
    }

    const spreadsImages = [
        "data/frank/Spread.png",
        "data/frank/Spread2.jpg",
        "data/frank/Spread3.jpg",
        "data/frank/Spread4.jpg",
        "data/frank/Spread5.jpg",
        "data/frank/Spread6.jpg",
        "data/frank/Spread7.jpg",
        "data/frank/Spread8.jpg",
        "data/frank/Spread9.jpg",
        "data/frank/Spread10.jpg",
        "data/frank/Spread11.jpg",
        "data/frank/Spread12.jpg",
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