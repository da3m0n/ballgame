const UTILS = new Utils();
const ADMINDETAILS = "admin";
const DETAILS = "users"; 

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
    draw(ctx) {

        for(let i = 0; i < balls.length; i++) {
            const ball = balls[i];
            ball.show();
        }

        this.game.drawText();
        // console.log('Game() draw', balls);
        // background('red');
        // console.log('in GamePlayingState->draw()...iterate over ball[] and draw each');
        
    }
    update(deltaTime){
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

        canvas = document.getElementById('defaultCanvas0');

        canvas.addEventListener('mousedown', (e) => {
            let rect = canvas.getBoundingClientRect();
            console.log(e.clientX - rect.left);
        })

    }

    startGame() {

        console.log('Game() starting game...');
        this.gameState = new GamePlayingState(this);
        

        for (let i = 0; i < 10; i++) {
            let ballRadius = 10 + UTILS.random(10, 40);
            let x = UTILS.random(ballRadius, this.width - ballRadius);
            let y = UTILS.random(ballRadius, this.height- ballRadius);
            balls.push(new Ball(x, y, ballRadius, 5, 'blue'));
        }
    }

    drawText() {
        ctx.fillStyle = '#ffeb3b';
        ctx.font = '16px Arial';
        ctx.fillText(
            "Total Time:",
            10,
            20
        );
        ctx.fillText(
            "Score:",
            10,
            38
        );
        // ctx.fillText(
        //     score,
        //     50,
        //     20
        // );

        

    }

    draw(ctx){
        this.gameState.draw(ctx);
    }

    update(deltaTime) {
        console.log('Game() update');
        this.gameState.update(deltaTime);
    }
}


function adminDetails() {
    var adminLabel = document.getElementById("adminLabel");
    fb_readAdmin(ADMINDETAILS, users.uid, users, function (admin) {
        if (readStatus = "complete") {
            adminLabel.innerHTML = "Admin: " + users.name;
            adminLabel.appendChild(document.createTextNode("Admin:" + users.name));
            pages.show("admin");
        }
   });
}

function back(){    
    var adminLabel = document.getElementById("adminLabel");
    while(adminLabel.firstChild){
      adminLabel.firstChild.remove();    
    }
    pages.show('game');
  }
  
/*****************************************************
 Written by Mr Ben, Term 1 2022
 Program to show two divs on buttonpress
 v1 Basic code to display a canvas
 /*****************************************************/
let canvas
let ctx
let game; 
let lastTime = 0;
const GAME_WIDTH = 800;
const GAME_HEIGHT = 300;

function setup() {
    cnv = createCanvas(50, 50);
    pages = new Pages();

    canvas = document.getElementById('defaultCanvas0');
    ctx = canvas.getContext('2d');
    game = new Game(GAME_WIDTH, GAME_HEIGHT, ctx);
}

function draw() {
    let deltaTime = time() - lastTime;
    // lastTime = 
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    game.draw(ctx);    
    game.update();    
}

