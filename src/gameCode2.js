const UTILS = new Utils();

class Pages {
    constructor() {
        this.pages = {
            game: {
                divs: [defaultCanvas0, document.getElementById("gamePage")],
                initialize: function (divs) {
                    let elmnt = document.getElementById("gamePanel")
                    console.log(elmnt.offsetHeight)
                    cnv.resize(elmnt.offsetWidth, elmnt.offsetHeight);
                    cnv.position(elmnt.offsetLeft, elmnt.offsetTop);
                }
            },
            admin: {divs: [document.getElementById("adminPage")]},
            landing: {divs: [document.getElementById("landingPage")]}
        };
    }

    show(page) {
        this.show_(page);
    }

    show_(page) {
        for (let p in this.pages) {
            let pageInfo = this.pages[p];
            pageInfo.divs.forEach(function (div) {
                div.style.display = "none";
            });
        }
        // console.log("page", page);
        let pageInfo = this.pages[page];

        pageInfo.divs.forEach(function (div) {
            div.style.display = "block";
        });

        if (pageInfo.initialize) {
            pageInfo.initialize(pageInfo.divs)
        }
    }
}

let pages = null;
let balls = [];

class GamePendingState {
    constructor(game) {
        this.game = game;
    }

    draw(ctx){}
    update(){}
}

class GamePlayingState {
    constructor(game) {
        this.game = game;
    }
    draw(ctx){
        console.log('Game() draw');
        background('red');
        // console.log('in GamePlayingState->draw()...iterate over ball[] and draw each');
        ctx.fillStyle = 'black';
        ctx.font = '12px Arial';
        ctx.fillText(
            "Score:",
            520,
            120
        );
        // ctx.fillText(
        //     score,
        //     50,
        //     20
        // );

        ctx.fillText(
            "Total Time:",
            32,
            34
        );

    }
    update(){
        // console.log('in GamePlayingState->update()...update ball movement here and collisions here');
    }
}

class GameOverState {
    constructor(game) {
        this.game = game;
    }
    draw(ctx){}
    update(){}
}

class Game {
    constructor(width, height, ctx) {
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        let me = this;
        this.gameState = new GamePendingState(this);
        // this.startGame();

        canvas.addEventListener('mousedown', (e) => {
            console.log(e.clientX, e.clientY);
        })

    }

    startGame() {

        console.log('Game() starting game...');
        this.gameState = new GamePlayingState(this);
        this.balls  =[];

        for (let i = 0; i < 10; i++) {
            let ballRadius = 10 + UTILS.random(10, 40);
            let x = UTILS.random(ballRadius, this.width - ballRadius);
            let y = UTILS.random(ballRadius, this.height- ballRadius);
            // this.balls.push(new Ball(x, y, ballRadius, 5, 'blue'));
        }
    }

    draw(ctx){
        this.gameState.draw(ctx);
    }

    update() {
        // console.log('Game() update');
        this.gameState.update();
    }
}

/*****************************************************
 Written by Mr Ben, Term 1 2022
 Program to show two divs on buttonpress
 v1 Basic code to display a canvas
 /*****************************************************/
function setup() {
    cnv = createCanvas(50, 50);
    pages = new Pages();
}

// let canvas = document.getElementById('defaultCanvas0');
// let ctx = canvas.getContext('2d');
const GAME_WIDTH = 800;
const GAME_HEIGHT = 300;

// canvas.width = GAME_WIDTH;
// canvas.height = GAME_HEIGHT;
let game = new Game(GAME_WIDTH, GAME_HEIGHT, ctx);

function draw() {
    background('green');
//     console.log('game()');
    // game.update();
    // game.draw(ctx);
}

