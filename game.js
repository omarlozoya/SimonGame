//Declared Variables
gamePattern = [];
userClickedPattern = [];
buttonColours = ["red", "blue", "green", "yellow"];
level = 0;
gameStarted = false;

// JQuery command that checks when a keyboard key is presssed. Will start the game.
$(document).keypress(function (e) {
    if (!gameStarted) {
        gameStarted = true;
        $('h1[class=level-title]').text('Level ' + level); 
        nextSequence();
    } else  {
        // do nothing
    }
});

// Moves the game forward with the next sequence
function nextSequence() {
    userClickedPattern = [];
    level++;
    $('h1[class=level-title]').text('Level ' + level); 
    var randomNumber = Math.floor(Math.random()*4) + 0;
    var randomChosenColour = buttonColours[randomNumber];
    playSound(randomChosenColour);
    gamePattern.push(randomChosenColour);
    $(document.getElementById(randomChosenColour)).fadeIn(100).fadeOut(100).fadeIn(100);
}

// JQuery command which checks if any of the buttons have been clicked on screen
$('div[type=button]').on('click', (event) => {
    if (gameStarted) {
        var userChosenColour = event.target.id;
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(event.target);
        checkAnswer(userClickedPattern.length - 1);
    } else {
        // game has not started
    }
});

// Will fetch and play the appropriate sound. Is called in JQuery click event, nextsequence function and check answer function.
function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

// Will animate the appropriate button. Is called in the clicked JQuery command.
function animatePress(currentColour) {
    $(currentColour).addClass('pressed');
    setTimeout(() => {
        $(currentColour).removeClass('pressed');
    }, 100);
}

// Will check the users input to make sure it is correct. The game will continue if correct, end if incorrect.
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000); 
        }
    } else {
        playSound('wrong');
        $('body').addClass('game-over');
        setTimeout(() => {
            $('body').removeClass('game-over');
        }, 200);
        $('h1[class=level-title]').text('Game Over, Press Any Key to Restart');
        startOver();
    }
}

// Called when the user loses the game and restarts the game.
function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}