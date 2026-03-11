let img;
let imgResized;
let canvas;
let startTime;
let pieceSize = 50;
let shuffled = false;

let mySound; // sonido

function preload() {
  img = loadImage('10.jpg');
  soundFormats('mp3');
  mySound = loadSound('archivoaudio1.mp3'); 
}

function setup() {
  adjustCanvas();
  frameRate(30);
  startTime = millis();

  if (!mySound.isPlaying()) {
    mySound.setLoop(true);
    mySound.play();
  }
}
///draw
function draw() {
  let t = millis() - startTime;

  background(255);

  if (t < 6000) {
    imgResized.loadPixels();
    for (let y = 0; y < imgResized.height; y++) {
      let offset = sin(y * 0.05 + t * 0.002) * 5;
      copy(imgResized, 0, y, imgResized.width, 1, offset, y, imgResized.width, 1);
    }

  } else if (t < 20000) {
    imgResized.loadPixels();
    let progress = map(t, 6000, 20000, 0, 1);
    let spacing = lerp(2, 30, progress);

    for (let y = 0; y < imgResized.height; y += spacing) {
      for (let x = 0; x < imgResized.width; x += spacing) {
        let index = (int(x) + int(y) * imgResized.width) * 4;
        let r = imgResized.pixels[index];
        let g = imgResized.pixels[index + 1];
        let b = imgResized.pixels[index + 2];
        let gray = (r + g + b) / 3;
        let alpha = map(progress, 0, 1, 255, 80);
        fill(gray, alpha);
        noStroke();
        ellipse(x, y, spacing * 0.2, spacing * 0.2);
      }
    }

    let glitchAmount = map(t, 6000, 20000, 2, 30);
    for (let y = 0; y < imgResized.height; y++) {
      let xOffset = floor(random(-glitchAmount, glitchAmount));
      copy(imgResized, 0, y, imgResized.width, 1, xOffset, y, imgResized.width, 1);
    }

  } else if (t < 26000) {
    imgResized.loadPixels();
    let gridSize = 2;
    for (let y = 0; y < imgResized.height; y += gridSize) {
      for (let x = 0; x < imgResized.width; x += gridSize) {
        let index = (int(x) + int(y) * imgResized.width) * 4;
        let r = imgResized.pixels[index];
        let g = imgResized.pixels[index + 1];
        let b = imgResized.pixels[index + 2];
        let displacement = sin(millis() * 0.005 + x * y * 0.01) * 20;
        fill(r, g, b);
        noStroke();
        rect(x + displacement, y + displacement, gridSize, gridSize);
      }
    }

  } else if (t < 30000) {
    let progress = map(t, 26000, 30000, 0, 1);
    let displacementFactor = lerp(5, 30, progress);
    imgResized.loadPixels();

    for (let y = 0; y < imgResized.height; y++) {
      for (let x = 0; x < imgResized.width; x++) {
        let index = (x + y * imgResized.width) * 4;
        let r = imgResized.pixels[index];
        let g = imgResized.pixels[index + 1];
        let b = imgResized.pixels[index + 2];
        let offsetX = sin(millis() * 0.002 + y * 0.1) * displacementFactor;
        let offsetY = cos(millis() * 0.002 + x * 0.1) * displacementFactor;
        let newX = constrain(x + offsetX, 0, imgResized.width - 1);
        let newY = constrain(y + offsetY, 0, imgResized.height - 1);
        let newIndex = (int(newX) + int(newY) * imgResized.width) * 4;
        imgResized.pixels[newIndex] = r;
        imgResized.pixels[newIndex + 1] = g;
        imgResized.pixels[newIndex + 2] = b;
      }
    }

    imgResized.updatePixels();
    image(imgResized, 0, 0);

  } else if (t < 36000) {
    let tinyPieceSize = pieceSize / 8;
    let piecesTiny = [];
    let shuffledPiecesTiny = [];

    let totalPiecesXtiny = floor(width / tinyPieceSize);
    let totalPiecesYtiny = floor(height / tinyPieceSize);

    for (let y = 0; y < totalPiecesYtiny; y++) {
      for (let x = 0; x < totalPiecesXtiny; x++) {
        let sx = x * tinyPieceSize;
        let sy = y * tinyPieceSize;
        let px = x * tinyPieceSize;
        let py = y * tinyPieceSize;
        piecesTiny.push({ sx, sy, x: px, y: py });
      }
    }

    shuffledPiecesTiny = shuffle([...piecesTiny]);

    for (let i = 0; i < piecesTiny.length; i++) {
      let p = piecesTiny[i];
      let s = shuffledPiecesTiny[i];
      let jitterX = random(-3, 3);
      let jitterY = random(-3, 3);

      image(
        imgResized, s.x + jitterX, s.y + jitterY, tinyPieceSize, tinyPieceSize,
        p.sx, p.sy, tinyPieceSize, tinyPieceSize
      );
    }

  } else if (t < 41000) {
      // 666666
    background(0);

    let pulse = sin(t * 0.1) * 8 + random(-3, 3);
    let circleSize = 10 + pulse; 
    let offsetX = random(-2, 2);
    let offsetY = random(-2, 2);

    fill(255);
    noStroke();
    ellipse(width / 2 + offsetX, height / 2 + offsetY, circleSize, circleSize);

  } else if (t < 47000) {
    
    background(0);
    // looop
    startTime = millis();
  }
}

function adjustCanvas() {
  let aspectRatio = img.width / img.height;
  let w = windowWidth;
  let h = windowHeight;

  if (w / h > aspectRatio) {
    h = windowHeight;
    w = h * aspectRatio;
  } else {
    w = windowWidth;
    h = w / aspectRatio;
  }

  canvas = createCanvas(w, h);
  canvas.parent(document.body);

  imgResized = img.get();
  imgResized.resize(width, height);
}

function windowResized() {
  adjustCanvas();
}
