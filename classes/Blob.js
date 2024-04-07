class Blob {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;

        this.velocityX = random(-1, 1);
        this.velocityY = random(-1, 1);
        this.maxSpeed = 1.5;
    }

    move() {
        this.x = floor(this.x + this.velocityX);
        this.y = floor(this.y + this.velocityY);

        if (this.x < width / 2 - 100 + this.radius / 2 || this.x > width / 2 + 100 - this.radius / 2) {
            this.x = ceil(this.x - this.velocityX); // makes sure they are not stuck on the wall
            this.velocityX *= -random(1.2, 0.8);
        }

        if (this.y < height - 20 -800 || this.y > height - 20 -200) {
            this.y = ceil(this.y - this.velocityY); // makes sure they are not stuck on the wall
            this.velocityY *= -random(1.2, 0.8);
        }

        this.velocityX += random(-0.2, 0.2);
        this.velocityY += random(-0.2, 0.2);

        // Limit the speed of the entities
        this.velocityX = constrain(this.velocityX, -this.maxSpeed, this.maxSpeed);
        this.velocityY = constrain(this.velocityY, -this.maxSpeed, this.maxSpeed);
    }

}