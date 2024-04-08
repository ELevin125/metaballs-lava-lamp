let LAMP;
let gradColor_1;
let gradColor_2;
function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    // createCanvas(400, 800);
    noStroke();
	gradColor_1 = color(64);
	gradColor_2 = color(0);
	LAMP = new Lamp();
}

function draw() {
	setGradient(0, 0, width, height, gradColor_1, gradColor_2);
	// displayFrameRate();

	LAMP.update();
}

function displayFrameRate() {
	let currentFrameRate = frameRate();
	fill(0);
	textSize(16);
	text("Frame Rate: " + currentFrameRate.toFixed(2), 10, 30);
}

// draws a gradient by lerping between the two provided colours
function setGradient(x, y, w, h, c1, c2) {
	push();
	noFill();
	strokeWeight(1)
	for (let i = y; i <= y + h; i++) {
		let inter = map(i, y, y + h, 0, 1);
		let c = lerpColor(c1, c2, inter);
		stroke(c);
		line(x, i, x + w, i);
	}

	pop()
  }