class Ground {
    constructor(x, y, color, height, width, ctx) {
        this.y = y;
        this.x = x;
        this.color = color;
        this.height = height;
        this.width = width;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
