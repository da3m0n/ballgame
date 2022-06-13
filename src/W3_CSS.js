

/*****************************************************/
// Button functions
/*****************************************************/

function _button_login (){
    fb_initialise();
    fb_login();

    // landingPage.style.display = "none";
    // gamePage.style.display = "block";
    // let elmnt = document.getElementById("gamePanel")
    // console.log(elmnt.offsetHeight)
    // cnv.resize(elmnt.offsetWidth, elmnt.offsetHeight);
    // cnv.position(elmnt.offsetLeft,elmnt.offsetTop);

}

function adminLogin (){
    //fb_initialise();
    //fb_login();
    adminDetails();
    // let elmnt = document.getElementById("gamePanel")
    // console.log(elmnt.offsetHeight)
    // cnv.resize(elmnt.offsetWidth, elmnt.offsetHeight);
    // cnv.position(elmnt.offsetLeft,elmnt.offsetTop);

}

function _button_startGame (){
    // game.
    game.startGame();
    // if (gameOn){
    //     // The game is running - stop it
    //     startGameButton.innerHTML="Start the game!";
    //     game_stop();
    // }else{
    //     // The game is not running - start it
    //     startGameButton.innerHTML="Stop game.";
    //     console.log(users);
    //     // pLastScore.innerHTML = "Last Score: " + users.score;
    //     game_start();
    // }
}
/*****************************************************/
//   END OF CODE
/*****************************************************/