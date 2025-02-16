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

    fetch("data/sound/patches/pulsing_sound_web.pd")
                .then(response => response.arrayBuffer())
                .then(data => {
                    patch = Pd.loadPatch(data);
                    console.log("Patch loaded!");
                    
                    // Automatically start DSP when the page loads
                    Pd.start();
                    console.log("DSP Started Automatically");
                });

            // Send Toggle ON
            document.getElementById("toggleOn").addEventListener("click", () => {
                Pd.send("toggle1", [1]);
                console.log("Toggle ON sent to PD");
            });

            // Send Toggle OFF
            document.getElementById("toggleOff").addEventListener("click", () => {
                Pd.send("toggle1", [0]);
                console.log("Toggle OFF sent to PD");
            });
    
});