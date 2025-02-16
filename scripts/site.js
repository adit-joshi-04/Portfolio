// window.onload = function() {
//   const logos = [
//       "data/logo/logo1.png",
//       "data/logo/logo2.png",
//       "data/logo/logo3.png",
//       // "data/logo/logo4.png"
//   ];

//   // Select a random logo
//   const randomLogo = logos[Math.floor(Math.random() * logos.length)];

//   // Set the src of the image
//   document.getElementById("logo").src = randomLogo;
// };

// document.addEventListener("DOMContentLoaded", function() {
//   // Get the logo element by its ID
//   const logo = document.getElementById('logo');
  
//   // Add a click event listener to the logo
//   logo.addEventListener('click', function() {
//       // Redirect to the homepage when the logo is clicked
//       window.location.href = 'index.html';  // Adjust the link if necessary
//   });
// });

// window.onload = function() {
//   // Load the header HTML into the page
//   const headerContainer = document.getElementById('header-container');
  
//   fetch('header.html')
//       .then(response => response.text())
//       .then(data => {
//           headerContainer.innerHTML = data;
          
//           // Now that the header is loaded, we can set the logo image randomly
//           const logo = document.getElementById('logo');
          
//           // Array of logo image paths
//           const logoImages = [
//               'data/logo/logo1.png',
//               'data/logo/logo2.png',
//               'data/logo/logo3.png',
//               'data/logo/logo4.png'
//           ];
          
//           // Select a random image from the array
//           const randomLogo = logoImages[Math.floor(Math.random() * logoImages.length)];
          
//           // Set the selected image as the logo source
//           logo.src = randomLogo;
//       })
//       .catch(error => console.error('Error loading header:', error));
// };



let xScale = 0.02;
let yScale = 0.015;
let timeScale = 0.05; // Speed of noise change

let gap; // Grid spacing, dynamically calculated
let followStrength = 0.03;

let dots = []; // Array of dots

// Store linked dots using relative coordinates
let linkDots = [
  { xRel: 160 / 1920, yRel: 309 / 1080, link: "babel.html", label: "Babel - Packaging Design", image: "data/images/babel.gif" },
  { xRel: 1350 / 1920, yRel: 310 / 1080, link: "sound.html", label: "Sound Narrative - Sound Art", image: "data/images/sound.gif" },
  { xRel: 800 / 1920, yRel: 370 / 1080, link: "cargo.html", label: "Cargo - Publication Design", image: "data/images/cargo.gif" },
  { xRel: 1200 / 1920, yRel: 500 / 1080, link: "https://google.com", label: "Rafu - Photo Essay", image: "data/images/rafu.gif" },
  { xRel: 1250 / 1920, yRel: 900 / 1080, link: "bound.html", label: "Bound by Freedom - Writing", image: "data/images/bound.gif" },
  { xRel: 425 / 1920, yRel: 450 / 1080, link: "https://google.com", label: "thequickbrownfoxjumpsoverthelazydog - Publication Design", image: "data/images/frank.gif" },
  { xRel: 650 / 1920, yRel: 700 / 1080, link: "https://google.com", label: "Sparsh Vani - Coding & Typography", image: "data/images/frank.gif" },
  { xRel: 250 / 1920, yRel: 930 / 1080, link: "frank.html", label: "Interview with Frank Blokland - Publication Design", image: "data/images/frank.gif" },
  { xRel: 1750 / 1920, yRel: 1000 / 1080, link: "https://google.com", label: "Arvena - Type Design", image: "data/images/frank.gif" },
  { xRel: 1800 / 1920, yRel: 400 / 1080, link: "https://google.com", label: "Man's First Flight - Website", image: "data/images/frank.gif" }
];

var projectData;
var cols;
var rows;

var project;
var type;
var description;

let images = {};

function preload () {

    linkDots.forEach(dot => {
      if (dot.image) {
        images[dot.label] = loadImage(
          dot.image,
        );
      }
    });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  cursor('none');
  textFont('Helvetica Bold');

  updateDots();
}

function draw() {
  background(255);

  let cursorOverDot = false;
  let activeDot = null;

  // Check for hovered dot first
  for (let dot of dots) {
    dot.update();

    if (dot.hovered && dot.link) {
      cursorOverDot = true;
      activeDot = dot;
    }
  }

  // If there's an active dot, draw the image FIRST (so it's behind)
  if (cursorOverDot && activeDot && activeDot.image instanceof p5.Image) {
    activeDot.showImage();
  }

  // Now draw the dots ON TOP of the image
  for (let dot of dots) {
    dot.display();
  }

  // Finally, show the text ON TOP
  if (cursorOverDot && activeDot) {
    activeDot.showText();
  }

  // Update cursor
  cursor(cursorOverDot ? 'cursor' : 'none');
}

function mousePressed() {
  for (let dot of dots) {
    if (dot.hovered && dot.link) {
      window.location.href = dot.link;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  updateDots();
}

function updateDots() {
  dots = [];
  gap = windowWidth * 0.04; // Adjust gap based on window width

  for (let x = gap / 2; x < width; x += gap) {
    for (let y = gap / 2; y < height; y += gap) {
      let foundLink = linkDots.find(dot => 
        abs(dot.xRel * width - x) < gap / 2 && abs(dot.yRel * height - y) < gap / 2
      );

      let link = foundLink ? foundLink.link : null;
      let label = foundLink ? foundLink.label : "";
      let image = foundLink && images[foundLink.label] ? images[foundLink.label] : null;
      let dotColor = foundLink ? color(0, 0, 0) : color(0, 0, 0);

      dots.push(new Dot(x, y, dotColor, link, label, image));
    }
  }
}

class Dot {
  constructor(x, y, dotColor, link, label, image) {
    this.originalX = x;
    this.originalY = y;
    this.x = x;
    this.y = y;
    this.dotColor = dotColor;
    this.link = link;
    this.label = label;
    this.image = image;
    this.noiseSize = 5;
    this.hoverSize = 22;
    this.smoothFactor = 0.1;
    this.hovered = false;
    this.baseSize = 2;
    this.diameter = this.noiseSize;
  }

  update() {
    let noiseValue = noise(this.originalX * xScale, this.originalY * yScale, frameCount * timeScale);
    this.baseSize = noiseValue * gap * 0.12;

    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < gap / 2) {
      this.hovered = true;
      this.dotColor = color(255, 0, 0);
      this.diameter = lerp(this.diameter, this.hoverSize, this.smoothFactor);
      this.x = lerp(this.x, mouseX, followStrength);
      this.y = lerp(this.y, mouseY, followStrength);
    } else {
      this.hovered = false;
      this.diameter = lerp(this.diameter, this.baseSize, this.smoothFactor);
      this.x = lerp(this.x, this.originalX, 0.1);
      this.y = lerp(this.y, this.originalY, 0.1);
    }
  }

  display() {
    if (this.link) {
      stroke(0);
      noFill();
      circle(this.x, this.y, this.diameter + 10);
    } else {
      fill(this.dotColor);
      noStroke();
      circle(this.x, this.y, this.diameter);
    }
  }

  showText() {
    let padding = 5;
    let textW = textWidth(this.label) + padding * 2;
    let textH = 25; // Fixed height for better spacing
    let margin = 10; // Prevents touching the screen edges

    fill(255);
    stroke(0);
    
    // Determine if dot is near the right edge
    let isNearRightEdge = this.x > width * 0.85; // Adjust threshold if needed

    if (isNearRightEdge) {
        rect(this.x - textW - margin, this.y - 20, textW, textH);
    } else {
        rect(this.x + 30, this.y - 20, textW, textH);
    }

    fill(0);
    noStroke();
    textSize(16);
    textAlign(LEFT, CENTER);

    if (isNearRightEdge) {
        text(this.label, this.x - textW - margin + padding, this.y - 7);
    } else {
        text(this.label, this.x + 35, this.y - 7);
    }
}

  showImage() {
    let imgWidth = this.image.width;
    let imgHeight = this.image.height;
  
    let scale = max(width / imgWidth, height / imgHeight); // Scale up while maintaining aspect ratio
  
    let displayWidth = imgWidth * scale;
    let displayHeight = imgHeight * scale;
  
    let offsetX = (width - displayWidth) / 2; // Center horizontally
    let offsetY = (height - displayHeight) / 2; // Center vertically
  
    image(this.image, offsetX, offsetY, displayWidth, displayHeight);
  }

}