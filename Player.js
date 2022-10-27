class Player {
    constructor(x, y, color, height, width, ground, currentState, ctx) {
        this.y = y;
        this.x = x;
        this.color = color;
        this.height = height;
        this.width = width;
        this.gravity = 1.5;
        this.velocity = 0;
        this.jumpSthreng = 20;
        this.maxJumps = 3;
        this.totalJumps = 0;
    }

    // method to draw the player
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    // method to update the player position
    update() {
        //imposing gravity on the player
        this.velocity += this.gravity;
        this.y += this.velocity;

        if (this.y >= ground.y - this.height && currentState != 2) {
            this.y = ground.y - this.height;

            // if it touches the ground it can jump again
            this.totalJumps = 0;
            this.velocity = 0;
        }
        if (currentState == 2) {
            this.velocity = 10;
        }
    }

    // method to make the player jump
    jump() {
        // logic to jump only 3 times in the air
        if (this.totalJumps < this.maxJumps) {
            this.velocity = -this.jumpSthreng;
            this.totalJumps++;
        }
    }
}
