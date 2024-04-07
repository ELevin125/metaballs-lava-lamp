class Lamp {
    constructor(blurIntensity=30, blobThreshold=170, boundingRectGrowth=80) {
        this.fluid = new LampFluid(blurIntensity, blobThreshold, boundingRectGrowth);
        this.x = width / 2;
        this.y = height * 0.95

        this.fillBlobs(15)
        this.mask = createGraphics(width, height)
        this.mask.push();
        this.mask.background(0)
        this.mask.translate(this.x, this.y)
        this.mask.fill(255)
        this.mask.beginShape()
        this.mask.vertex(-150, -300)
        this.mask.vertex(-100, -200)
        this.mask.vertex(100, -200)
        this.mask.vertex(150, -300)
        this.mask.vertex(110, -760)
        this.mask.vertex(-110, -760)
        this.mask.endShape(CLOSE)
        this.mask.pop();
    }


    update() {
        this.drawGlass();
        this.fluid.update();


        this.fluid.draw(this.mask);

        this.drawBody();
    }

    drawGlass() {
        push();
        translate(this.x, this.y)

        fill(60)
        beginShape()
        vertex(-150, -300)
        vertex(-100, -200)
        vertex(100, -200)
        vertex(150, -300)
        vertex(110, -760)
        vertex(-110, -760)
        endShape(CLOSE)
        pop();
    }

    drawBody() {
        push();

        translate(this.x, this.y)
        fill(150)
        
        beginShape()
        vertex(110, -760)
        vertex(-110, -760)
        vertex(-100, -870)
        vertex(100, -870)
        endShape(CLOSE)
        ellipse(0, -870, 200, 30)

        beginShape()
        vertex(-100, 0)
        vertex(-70, -150)
        vertex(-100, -200)
        vertex(100, -200)
        vertex(70, -150)
        vertex(100, 0)
        endShape(CLOSE)
        ellipse(0, 0, 200, 30)
        pop();
    }

    fillBlobs(blobCount) {
        for (let i = 0; i < blobCount; i++) {
            this.fluid.addBlob(this.x + floor(random(-100, 100)), 
                               this.y - 200 + floor(random(-400, 0)), 
                               floor(random(50, 100)));
        }
    }
}