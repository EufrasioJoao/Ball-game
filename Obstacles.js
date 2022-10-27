class Obstacles {
    constructor(lose, WIDTH, velocity, ground, player, ctx) {
        this._obstacles = [];
        this.colors = ["blue", "green", "yellow", "orange", "pink", "tomato"];
        this.timeToInsert = 0;
    }

    // method to insert a obstacle
    insert() {
        this._obstacles.push({
            x: WIDTH,
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
            height: 50 + Math.floor(Math.random() * 130),
            width: 50,
        });

        this.timeToInsert = 30 + Math.floor(Math.random() * 21);
    }

    // method to update the obstacle position
    update() {
        if (this.timeToInsert === 0) {
            this.insert();
        } else this.timeToInsert--;

        for (
            let index = 0, size = this._obstacles.length;
            index < size;
            index++
        ) {
            if (this._obstacles.length != 0) {
                let obs = this._obstacles[index];

                if (this._obstacles.length != 0) {
                    if (obs.x) obs.x -= velocity;
                }

                if (
                    player.x < obs.x + obs.width &&
                    player.x + player.width >= obs.x &&
                    player.y + player.height >= ground.y - obs.height
                ) {
                    lose();
                    this._obstacles = [];
                }

                //removing the element if its own x is less than the canvas x
                if (obs.x + 100 <= -obs.x) {
                    this._obstacles.splice(index, 1);
                    size--;
                    index--;
                }
            }
        }
    }

    // method to draw the player
    draw() {
        for (let index = 0; index < this._obstacles.length; index++) {
            let obs = this._obstacles[index];

            ctx.fillStyle = obs.color;
            ctx.fillRect(obs.x, ground.y - obs.height, obs.width, obs.height);
        }
    }
}
