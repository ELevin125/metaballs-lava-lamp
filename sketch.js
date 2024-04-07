let lamp;
let color_1;
let color_2;
function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    // createCanvas(400, 800);
    noStroke();
	color_1 = color(64);
	color_2 = color(0);
	lamp = new Lamp();
}

function draw() {
	setGradient(0, 0, width, height, color_1, color_2);
	// displayFrameRate();

	lamp.update();
}

function displayFrameRate() {
	let currentFrameRate = frameRate();
	fill(0);
	textSize(16);
	text("Frame Rate: " + currentFrameRate.toFixed(2), 10, 30);
}
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