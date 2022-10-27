// game variables
var canvas,
    ctx,
    HEIGHT,
    WIDTH,
    ground,
    player,
    obstacles,
    currentState,
    velocity = 8;

var states = {
    play: 0,
    playing: 1,
    lost: 2,
};
function lose() {
    currentState = states.lost;
}

// game functions
function main() {
    // setting up everithing for the game
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;

    if (WIDTH >= 500) {
        WIDTH = 500;
        HEIGHT = 500;
    }

    // creating a canvas element
    canvas = document.createElement("canvas");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    canvas.style.border = "2px solid #000";

    // setting up the context
    ctx = canvas.getContext("2d");

    // adding canvas to the body
    document.body.appendChild(canvas);

    // adding events to the game
    document.addEventListener("mousedown", click);
    document.addEventListener("keydown", (e) => {
        if ((e.key = "ArrowUp")) {
            click();
        } else if ((e.key = " ")) click();
    });

    // setting up game objects
    ground = new Ground(
        0,
        HEIGHT - 50,
        "#ffe78f",
        50,
        WIDTH,
        currentState,
        ctx
    );
    player = new Player(50, 0, "#fa7e7e", 50, 50, ground, ctx);
    obstacles = new Obstacles(lose, WIDTH, velocity, ground, player, ctx);

    // calling the function that runs the game
    currentState = states.play;
    running();
}

//function  that runs the game
function running() {
    // updating and displayng objects
    update();
    draw();

    requestAnimationFrame(running);
}

function click() {
    if (currentState === states.playing) {
        player.jump();
    } else if (currentState === states.play) {
        currentState = states.playing;
    } else if (currentState === states.lost) {
        currentState = states.play;
    }
}

function update() {
    if (currentState == states.playing) {
        obstacles.update();
    }
    player.update();
}

function draw() {
    // drawing the background
    ctx.fillStyle = "#50beff";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // drawing the objects
    if (currentState === states.play) {
        ctx.fillStyle = "green";
        ctx.fillRect(WIDTH / 2 - 50, HEIGHT / 2 - 50, 100, 100);
    }
    if (currentState === states.lost) {
        ctx.fillStyle = "red";
        ctx.fillRect(WIDTH / 2 - 50, HEIGHT / 2 - 50, 100, 100);
    }
    if (currentState === states.playing) {
        obstacles.draw();
    }
    if (currentState === states.lost) {
        ctx.fillStyle = "red";
        ctx.fillRect(WIDTH / 2 - 50, HEIGHT / 2 - 50, 100, 100);
    }

    ground.draw();
    player.draw();
}

main();
