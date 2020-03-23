'use strict';
console.log('Chaos Game');
let rulesEl = document.querySelector('.rule-list');

let points = [];
let current;
let percent = 0.5;
let previous;

function drawGame() {
  strokeWeight(1);
  stroke(255, 0, 255, 200);
  let next = random(points);
  current.x = lerp(current.x, next.x, percent);
  current.y = lerp(current.y, next.y, percent);
  point(current.x, current.y);
}

const gameRules = {
  1: {
    name: 'Triangle',
    n: 3,
    percent: 0.5,
    drawGame: drawGame
  },
  2: {
    name: 'Square',
    n: 4,
    percent: 2 / 3,
    drawGame: drawGame
  },
  3: {
    name: 'Pentagon',
    n: 5,
    percent: 0.5,
    drawGame: drawGame
  },
  4: {
    name: 'Full Square',
    n: 4,
    percent: 0.5,
    drawGame: drawGame
  },
  5: {
    name: 'sierpinski1',
    n: 9,
    percent: 0.5,
    drawGame: function() {
      points = [
        { x: width, y: 0 },
        { x: 0, y: height },
        { x: width, y: height }
      ];
      drawGame();
    }
  },
  6: {
    name: 'chaos',
    n: 5,
    percent: 0.5,
    drawGame: function() {
      strokeWeight(1);
      stroke(255, 0, 255, 200);
      let next = random(points);
      if (next !== previous) {
        current.x = lerp(current.x, next.x, percent);
        current.y = lerp(current.y, next.y, percent);
        point(current.x, current.y);
      }
      previous = next;
    }
  },
  7: {
    name: 'Full Triangle',
    n: 3,
    percent: 0.5,
    drawGame: function() {
      points = [
        { x: width / 2, y: 0 },
        { x: 0, y: height },
        { x: width, y: height }
      ];
      drawGame();
    }
  }
};

let currRule = Math.floor(Math.random() * 7 + 1);

function setup() {
  createCanvas(windowWidth, windowHeight);
  points = [];
  let game = gameRules[currRule];
  let n = game.n;
  // let n = 15;
  percent = game.percent;

  for (let i = 0; i < n; i++) {
    let angle = (i * TWO_PI) / n;
    let v = p5.Vector.fromAngle(angle);
    v.mult(275);
    v.add(width / 2, height / 2);
    points.push(v);
  }

  renderRules();
  reset();
}

function reset() {
  current = createVector(random(width), random(height));
  background(0);
  // stroke(255)
  // strokeWeight(6)
  // for (let p of points) {
  //     point(p.x, p.y)
  // }
}

function draw() {
  for (let i = 0; i < 100; i++) {
    gameRules[currRule].drawGame();

    // strokeWeight(1)
    // stroke(255, 0, 255, 200)
    // let next = random(points)
    // if (next !== previous) {
    // current.x = lerp(current.x, next.x, percent)
    // current.y = lerp(current.y, next.y, percent)
    // point(current.x, current.y)
    // }
    // previous = next;
  }
}

function renderRules() {
  let htmlStr = '';
  let games = Object.values(gameRules);
  for (var i = 0; i < games.length; i++) {
    htmlStr += `<li onclick="setRule(${i + 1})">${games[
      i
    ].name.toUpperCase()}</li>`;
  }
  rulesEl.innerHTML = htmlStr;
}

function setRule(gameNum) {
  currRule = gameNum;
  setup();
}

// --------------------- V1 ----------------------------------------
// let ax, ay, bx, by, cx, cy;

// let points = []

// let x, y;

// function setup() {
//     createCanvas(windowWidth, windowHeight)

//     seedInitialPoints();
// };

// function seedInitialPoints() {
//     ax = width / 2;
//     ay = 0;

//     bx = 0
//     by = height

//     cx = width
//     cy = height

//     x = random(width)
//     y = random(width)

//     background(0)
//     stroke(255)
//     strokeWeight(8)
//     point(ax, ay)
//     point(bx, by)
//     point(cx, cy)

// };

// function draw() {
//     for (let i = 0; i < 100; i++) {
//         strokeWeight(2)
//         let r = floor(random(3))

//         if (r == 0) {
//             stroke(0, 255, 255)
//             x = lerp(x, ax, 0.5)
//             y = lerp(y, ay, 0.5)
//         } else if (r == 1) {
//             stroke(255, 0, 255)
//             x = lerp(x, bx, 0.5)
//             y = lerp(y, by, 0.5)
//         } else if (r == 2) {
//             stroke(255, 255, 0)
//             x = lerp(x, cx, 0.5)
//             y = lerp(y, cy, 0.5)
//         }
//         point(x, y)
//     }
// };
