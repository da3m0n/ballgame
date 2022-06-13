
class Ball2 {
    constructor(posX, posY, radius, vel, color) {
        this.radius = radius;
        this.posX = posX;
        this.posY = posY;
        this.vel = vel;
        this.color = color;
        this.ballXSpeed = 1; //radius/10  * random(-5, 5);
        this.ballYSpeed = 1; //radius/15 * random(-5, 5);
    };

    show() {
        stroke(255);
        strokeWeight(1);
        fill(this.color);
        ellipse(this.posX, this.posY, this.radius, this.radius);
    }

    move() {
        this.posX += this.ballXSpeed;
        this.posY += this.ballYSpeed;
        // console.log(this.posX, width)
        if (this.posX + (this.radius / 2) >= width) {
            this.ballXSpeed = this.ballXSpeed * -1;
        }

        if (this.posX - (this.radius / 2) < 0) {
            this.ballXSpeed = this.ballXSpeed * -1;
        }

        if (this.posY + (this.radius / 2) >= height) {
            this.ballYSpeed = this.ballYSpeed * -1;
        }

        if (this.posY - (this.radius / 2) < 0) {
            this.ballYSpeed = this.ballYSpeed * -1;
        }
    }

    getBallScore() {
        return Math.ceil(this.radius / 10) * 10;
    }

}