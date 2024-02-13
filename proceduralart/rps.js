// @ts-check
/// <reference path="../node_modules/@types/p5/global.d.ts" />
let canvas;
let divWidth;
let colSizes = [10, 50, 100, 150, 200, 500]
let colSizeIdx = 2
let ncols = colSizes[colSizeIdx];
let nrows = ncols;
let asp;
let tileWidth = 5;
let tileHeight = tileWidth;
let rand = 3;
let thresh = 4;
let fps = 5;
let grid;
let newGrid;
let rock = 1;
let paper = 2;
let scissors = 3;
let textX = 30;
let textY = 30;
let values = {
  'rock' : rock,
  'paper' : paper,
  'scissors' : scissors
}
let colors = {
  'rock' : '#f0f921',
  'paper' : '#cb4779',
  'scissors' : '#100887'
}
let pen = 'rock';

function setup() {
  console.log('Starting...')
  canvas = remakeCanvas()
  canvas.parent('rps')
  frameRate(fps);
  noStroke();
  textSize(25);
  resetSketch();
  // Set HTML labels
  setLabel('thresh-label', thresh)
  setLabel('rand-label', rand)
  setLabel('grid-label', ncols)
}

function draw() {
  background(colors['scissors'])
  newGrid = make2DArray(nrows, ncols, undefined);
  for (let i = 0; i < nrows; i++) {
    for (let j = 0; j < ncols; j++) {
      // Count neighbors
      let neighbors = []
      neighbors.push(grid[(nrows+i-1) % nrows][(ncols+j-1) % ncols])
      neighbors.push(grid[(nrows+i-1) % nrows][j])
      neighbors.push(grid[(nrows+i-1) % nrows][(j+1) % ncols])
      neighbors.push(grid[i][(ncols+j-1) % ncols])
      neighbors.push(grid[i][(j+1) % ncols])
      neighbors.push(grid[(i+1) % nrows][(ncols+j-1) % ncols])
      neighbors.push(grid[(i+1) % nrows][j])
      neighbors.push(grid[(i+1) % nrows][(j+1) % ncols])
      let nrock = neighbors.filter(x => x === rock).length
      let npaper = neighbors.filter(x => x === paper).length
      let nscissors = neighbors.filter(x => x === scissors).length
      // Update pixel based on neighbors
      if (grid[i][j] === rock) {
        if (npaper + random(-1*rand, rand) > thresh) {
          newGrid[i][j] = paper
        } else {
          newGrid[i][j] = rock
        }
      } else if (grid[i][j] === paper) {
        if (nscissors + random(-1*rand, rand) > thresh) {
          newGrid[i][j] = scissors
        } else {
          newGrid[i][j] = paper
        }
      } else if (grid[i][j] === scissors) {
        if (nrock + random(-1*rand, rand) > thresh) {
          newGrid[i][j] = rock
        } else {
          newGrid[i][j] = scissors
        }
      }
    }
  }
  // Update & draw grid
  for (let i = 0; i < nrows; i++) {
    for (let j = 0; j < ncols; j++) {
      // Update grid
      grid[i][j] = newGrid[i][j]
      // Draw grid
      if (grid[i][j] === rock) {
        fill(colors['rock']);
      } else if (grid[i][j] === paper) {
        fill(colors['paper']);
      } else if (grid[i][j] === scissors) {
        fill(colors['scissors']);
      }
      rect(j * tileWidth, i * tileHeight, tileWidth, tileHeight);
    }
  }
}

function remakeCanvas() {
  print('ncols = ' + ncols)
  print('nrows = ' + nrows)
  let canvasDiv = document.getElementById('rps')
  if (canvasDiv) {
    divWidth = canvasDiv.offsetWidth;
    console.log('divWidth =' + divWidth)
  }
  let canvas = createCanvas(divWidth, divWidth);
  tileWidth = floor(divWidth / ncols) + 1
  tileHeight = tileWidth
  return canvas
}

function resetSketch() {
  grid = make2DArray(nrows, ncols, undefined);
  // Draw initial grid
  for (let i = 0; i < nrows; i++) {
    for (let j = 0; j < ncols; j++) {
      // Randomize inital value and set color accordingly
      if (random() < 1 / 3) {
        grid[i][j] = rock
        fill(colors['rock']);
      } else if (random() < 2 / 3) {
        grid[i][j] = paper
        fill(colors['paper']);
      } else {
        grid[i][j] = scissors
        fill(colors['scissors']);
      }
      rect(j * tileWidth, i * tileHeight, tileWidth, tileHeight);
    }
  }
}

function make2DArray(nRows, nCols, fill = undefined) {
  let arr = new Array(nRows);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(nCols).fill(fill);
  }
  return arr;
}

function mouseClicked() {
  fill(colors[pen])
  let j = int(mouseX / tileWidth)
  let i = int(mouseY / tileHeight)
  print('i = ' + i)
  print('j = ' + j)
  grid[i][j] = values[pen]
  newGrid[i][j] = values[pen]
  rect(j * tileWidth, i * tileHeight, tileWidth, tileHeight);
}

function setLabel(id, variable) {
  let label = document.getElementById(id)
  if (label) {
    label.innerHTML = str(variable)
  }
}

function decThresh() {
  thresh = (thresh - 1 + 9) % 9
  fill(255)
  stroke(0)
  text('Threshold = ' + thresh, textX, textY)
  noStroke()
  setLabel('thresh-label', thresh)
}

function incThresh() {
  thresh = (thresh + 1) % 9
  fill(255)
  stroke(0)
  text('Threshold = ' + thresh, textX, textY)
  noStroke()
  setLabel('thresh-label', thresh)
}

function decRand() {
  rand = (rand - 1 + 9) % 9
  fill(255)
  stroke(0)
  text('Randomness = ' + rand, textX, textY)
  noStroke()
  setLabel('rand-label', rand)
}

function incRand() {
  rand = (rand + 1) % 9
  fill(255)
  stroke(0)
  text('Randomness = ' + rand, textX, textY)
  noStroke()
  setLabel('rand-label', rand)
}

function decGrid() {
  colSizeIdx = (colSizeIdx - 1 + colSizes.length) % colSizes.length
  ncols = colSizes[colSizeIdx];
  nrows = ncols;
  setLabel('grid-label', ncols)
  canvas = remakeCanvas();
  canvas.parent('rps')
  resetSketch();
}

function incGrid() {
  colSizeIdx = (colSizeIdx + 1) % colSizes.length;
  ncols = colSizes[colSizeIdx];
  nrows = ncols;
  setLabel('grid-label', ncols)
  canvas = remakeCanvas();
  canvas.parent('rps')
  resetSketch();
}

function preset1() {
  thresh = 4
  rand = 3
  setLabel('thresh-label', thresh)
  setLabel('rand-label', rand)
  print('Set to preset 1:')
  print('Threshold = ' + thresh)
  print('Randomness = ' + rand)
}

function preset2() {
  thresh = 1
  rand = 0
  setLabel('thresh-label', thresh)
  setLabel('rand-label', rand)
  print('Set to preset 2:')
  print('Threshold = ' + thresh)
  print('Randomness = ' + rand)
}

function preset3() {
  thresh = 0
  rand = 0
  setLabel('thresh-label', thresh)
  setLabel('rand-label', rand)
  print('Set to preset 3:')
  print('Threshold = ' + thresh)
  print('Randomness = ' + rand)
}

function keyPressed() {
    // Set spacebar to toggle play/pause of drawing loop
    if (key === ' ') {
      if (isLooping()) {
        noLoop();
        console.log('STOPPED. Press SPACE to resume.')
      } else {
        loop();
        console.log('RESUMED. Press SPACE to stop.')
      }
    }
    else if (keyCode === ENTER) {
      resetSketch();
    }
    else if (key === 'r') {
      pen = 'rock'
    }
    else if (key === 'p') {
      pen = 'paper'
    }
    else if (key === 'c') {
      pen = 'scissors'
    }
    else if (key === 'w') {
      incThresh()
    }
    else if (key === 's') {
      decThresh()
    }
    else if (key === 'd') {
      incRand()
    }
    else if (key === 'a') {
      decRand()
    }
    else if (key === '1') {
      preset1()
    }
    else if (key === '2') {
      preset2()
    }
    else if (key === '3') {
      preset3()
    }
    else if (key === '8') {
      thresh = 8
      rand = 8
      print('Set to preset 8:')
      print('Threshold = ' + thresh)
      print('Randomness = ' + rand)
    }
    else if (key === '0') {
      thresh = 0
      rand = 0
      print('Set to preset 0:')
      print('Threshold = ' + thresh)
      print('Randomness = ' + rand)
    }
    else if (key === 'y') {
      colors = {
        'rock' : '#f0f921',
        'paper' : '#cb4779',
        'scissors' : '#100887'
      }
    }
    else if (key === 'g') {
      colors = {
        'rock' : '#00ff00',
        'paper' : '#ff0000',
        'scissors' : '#0000ff'
      }
    }
  }

