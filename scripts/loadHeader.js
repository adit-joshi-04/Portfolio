window.onload = function() {
    const headerContainer = document.getElementById("header-container");

    // Check if the header is already cached
    let cachedHeader = sessionStorage.getItem("cachedHeader");

    if (cachedHeader) {
        // If cached, insert it directly
        headerContainer.innerHTML = cachedHeader;
        setRandomLogo(); // Call function to set logo after inserting header
    } else {
        // Fetch the header only if not cached
        fetch("header.html")
            .then(response => response.text())
            .then(data => {
                headerContainer.innerHTML = data;

                // Cache the header in sessionStorage
                sessionStorage.setItem("cachedHeader", data);

                // Set the random logo after loading header
                setRandomLogo();
            })
            .catch(error => console.error("Error loading header:", error));
    }
};

// Function to randomly select and set the logo image
function setRandomLogo() {
    const logo = document.getElementById("logo");
    if (!logo) return; // Ensure logo element exists before proceeding

    const logoImages = [
        "data/logo/logo1.png",
        "data/logo/logo2.png",
        "data/logo/logo3.png",
        "data/logo/logo4.png"
    ];

    // Select a random image from the array
    const randomLogo = logoImages[Math.floor(Math.random() * logoImages.length)];

    // Preload the selected image before applying it
    const img = new Image();
    img.src = randomLogo;
    img.onload = () => {
        logo.src = randomLogo;
    };
}