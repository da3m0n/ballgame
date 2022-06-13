let gameStartTime;
let gameOn = false;
let score = 0;
// let canvas = document.getElementById();

const DETAILS = "users";

class Pages {
    constructor() {
        this.pages = {
            game: {
                divs: [defaultCanvas0, document.getElementById("gamePage")],
                initialize: function (divs) {
                    let elmnt = document.getElementById("gamePanel")
                    // console.log(elmnt.offsetHeight)
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

// let cnv = undefined;
/*****************************************************
 Written by Mr Ben, Term 1 2022
 Program to show two divs on buttonpress
 v1 Basic code to display a canvas
 /*****************************************************/
function setup() {
    cnv = createCanvas(50, 50);
    pages = new Pages();
}

/*****************************************************/
// This function is called every frame
/*****************************************************/
function draw() {
    background("green");
    if (gameOn) {
        //Run your game! insert game code here
        // Dummy game - your score is the length of time the game has been running...
        score = (Date.now() - gameStartTime) / 1000
        pScore.innerHTML = "Time: " + score;
        textSize(1 + score);
        // ball click score
        // bScore.innerHTML = "Ball Score: 0";
        // text('Stop the game to record your score!', 10, 50+score);
        for (let i = 0; i < balls.length; i++) {
            balls[i].show();
            balls[i].move();
        }

    }
}

/*****************************************************/
// This function is called to start the game
/*****************************************************/

// https://stackoverflow.com/questions/1484506/random-color-generator
function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function game_start() {
    gameOn = true;
    // Dummy game, record the start time
    gameStartTime = Date.now();
    // Load the last score from Firebase and display it
    // pLastScore.innerHTML = "Last Score: loading...";
    console.log('game start', users);
    fb_readRec(DETAILS, users.uid, users, show_score);

    let width = cnv.width;
    let height = cnv.height;

    for (let i = 0; i < 4; i++) {
        let ballRadius = 20 + random(50);
        let x = random(width - 2 * ballRadius) + ballRadius;
        let y = random(height - 2 * ballRadius) + ballRadius;

        // balls.push(new Ball(x, y, ballRadius, 1, getRandomColor()));

    }

    function getMousePos(canvasEl, e) {
        let rect = canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        console.log("Coordinate x: " + x,
            "Coordinate y: " + y);
        return {x: x, y: y};
    }

    let score2 = 0;
    let defCnv = document.getElementById('defaultCanvas0');
    defCnv.addEventListener('mousedown', (e) => {
        // Going through the array in reverse as going through it normally resulted in
        // situations when multiple balls were deleted in a single click
        let mousePos = getMousePos(defCnv, e);
        let bScoreEl = document.getElementById('bScore');
        let scoreEl = document.createTextNode('0');

        for (let i = balls.length - 1; i >= 0; i--) {
            let ball = balls[i];
            console.log('ball', ball);
            if (pointInCircle(ball.posX, ball.posY, mousePos.x, mousePos.y, ball.radius)) {

                score2 += ball.getBallScore();
                bScoreEl.innerHTML = 'Score: ' + score2;
                balls.splice(i, 1);
                break;
            }
        }

        if(balls.length === 0) {
            game_stop();
        }
    })
    function show_score() {
        if (users.score) {
            pLastScore.innerHTML = "Last Time: " + users.score;
        }
    }

}

function pointInCircle(x, y, cx, cy, radius) {
    let distanceSquared = (x - cx) * (x - cx) + (y - cy) * (y - cy);
    return distanceSquared <= radius * radius;
}

/*****************************************************/
// This function is called to stop the game
// When the game stops the score is saved to the database
/*****************************************************/
function game_stop() {
    gameOn = false;
    users.score = score;
    // users.uid = "7VOWiteu3DVMu9SEqUJNwV50mfl1"
    pLastScore.innerHTML = "Last Time: " + users.score;
    // console.log("game_stop: ",DETAILS, users.uid, users)
    balls = [];
    console.log('users id', users.uid, users);
// TODO: users.UID is undefiuned

    fb_writeRec(DETAILS, users.uid, users)
}

function adminDetails() {

    let adminLabel = document.getElementById("adminLabel");

    fb_readRec(DETAILS, users.uid, users, function (user) {
        if (user.admin) {
            gamePage.style.display = "none";
            defaultCanvas0.style.display = "none";
            adminPage.style.display = "block";
            // adminLabel.innerHTML = "Admin: " + user.name;
            adminLabel.appendChild(document.createTextNode("Admin:" + user.name));
        }
    });
}

function back() {
    console.log('back pressed');
    gamePage.style.display = "block";
    defaultCanvas0.style.display = "block";
    adminPage.style.display = "none";

    let adminLabel = document.getElementById("adminLabel");
    while (adminLabel.firstChild) {
        adminLabel.firstChild.remove();
    }
}

function adminLogin() {
    pages.show("admin");
}

class Ball {
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
