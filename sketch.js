let img
let wid
let hig 
// ASCII characters from darkest to brightest
let ascii = ['@', '%', '#', '*', '+', '-', ':', '.']
// 2d array that will store ascii-converted pixel data 
let newimg = []

// preload image for performance
function preload() {
  img = loadImage('/cat1.jpeg')
  // pixelDensity(1)
}

function setup() {
  // resize to reduce load on pixel data extraction
  img.resize(200, 0)
  background(255)
  wid = img.width
  hig = img.height
  // resize back up for ascii character clarity 
  createCanvas(wid * 5, hig * 5);
  // load source image pixels, iterate by rows/cols, extract pixel data 
  img.loadPixels();
  for (let i = 0; i < hig; i++) {
    let row = []
    for (let j = 0; j < wid; j++) {
      // p5 uses a 1d array for images, stored RGBA
      // index location for the pixel we're observing is our current location
      // on the row, plus however many rows we're down (times number of pixels in that row)
      // multiplied by 4 (4 data points [RGBA] for each pixel)
      let index = (j + i * wid)*4
      r = img.pixels[index]
      g = img.pixels[index + 1]
      b = img.pixels[index + 2]
      row.push(rgbAvgToAscii(r, g, b))
    }
    newimg.push(row)
  }
  img.updatePixels()
  background(255)
  // scale text size to size of image, assigns alignment so things can easily be mapped by pixel location
  let txtsiz = (height / newimg.length)
  textSize(txtsiz)
  textAlign(LEFT);
  textAlign(TOP);
  // draws ascii character to screen, multiplying index by size of character for proper spacing
  for (let i = 0; i < newimg.length; i++) {
    for (let j = 0; j < newimg[i].length; j++) {
      text(newimg[i][j], j*txtsiz, i*txtsiz)
    }
  }
}

function draw() {
}

function rgbAvgToAscii(r, g, b) {
  // This weights the values based on luminosity, scales it to 255, and accesses 
  // the ascii character stored at that index (0-9)
  let avg = (r * 0.2126 + g * 0.7152 + b * 0.0722)/255
  let adjustedAvg = ceil(avg * 10)
  return ascii[adjustedAvg]
}