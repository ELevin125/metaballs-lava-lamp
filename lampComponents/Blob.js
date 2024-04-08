class Blob {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;

        this._velocityX = random(-1, 1);
        this._velocityY = random(-1, 1);
        this._maxSpeed = 1.5;
    }

    move() {
        this.x = floor(this.x + this._velocityX);
        this.y = floor(this.y + this._velocityY);

        if (this.x < width / 2 - 100 + this.radius / 2 || this.x > width / 2 + 100 - this.radius / 2) {
            this.x = ceil(this.x - this._velocityX); // makes sure they are not stuck on the wall
            this._velocityX *= -random(1.2, 0.8);
        }

        if (this.y < height - 20 -800 || this.y > height - 20 -200) {
            this.y = ceil(this.y - this._velocityY); // makes sure they are not stuck on the wall
            this._velocityY *= -random(1.2, 0.8);
        }

        this._velocityX += random(-0.2, 0.2);
        this._velocityY += random(-0.2, 0.2);

        // Limit the speed of the entities
        this._velocityX = constrain(this._velocityX, -this._maxSpeed, this._maxSpeed);
        this._velocityY = constrain(this._velocityY, -this._maxSpeed, this._maxSpeed);
    }

}