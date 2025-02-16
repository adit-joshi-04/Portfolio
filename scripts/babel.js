document.addEventListener("DOMContentLoaded", function () {
    const renders = document.getElementById("renders");
    const navLeft = document.getElementById("nav-l");
    const navRight = document.getElementById("nav-r");

    if (!renders || !navLeft || !navRight) {
        console.error("One or more elements are missing!");
        return; // Stop execution if elements aren't found
    }

    const rendersImages = [
        "data/babel/renders/1.png",
        "data/babel/renders/2.png",
        "data/babel/renders/3.png",
        "data/babel/renders/4.png",
        "data/babel/renders/5.png",
        "data/babel/renders/6.png",
        // "data/babel/renders/7.png"
    ];

    let currentIndex = 0;

    function updateImage() {
        renders.src = rendersImages[currentIndex];
    }

    navRight.addEventListener("click", function () {
        currentIndex = (currentIndex + 1) % rendersImages.length;
        updateImage();
    });

    navLeft.addEventListener("click", function () {
        currentIndex = (currentIndex - 1 + rendersImages.length) % rendersImages.length;
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