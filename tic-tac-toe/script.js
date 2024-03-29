// VARIABLES

var human = 'x'; // turn = 0
var computer = 'o'; // turn = 1
var compMove;
var turn = 0; // toggles btw 0 and 1 for switching turns

var boardCheck; // function to check value in each cell
var a1; // value within each cell
var a2;
var a3;
var b1;
var b2;
var b3;
var c1;
var c2;
var c3;

var checkWin; // function that checks the board for winning combo
var xWin = false; // true if X wins
var oWin = false; // true if O wins
var winAlert; // function that declares winner and restarts game

var newGame;
var clearBoard;


// PLACES AN X OR O IN THE BOX WHEN CLICKED. TOGGLES.
var newGame = function () {
    $('td').one('click', function (event) {
        if (turn == 0) {
            $(this).text(human);
            boardCheck();
            checkWin();
            turn == 1;
            compMove();
            boardCheck();
            checkWin();
        }
    });
};


// INITIALIZES GAME - keep after var newGame
$(document).ready(function () {
    newGame();
});

// COMP MOVE AI DETECTS IF THERE ARE TWO IN A ROW NEXT TO AN EMPTY CELL AND PLACES MOVE THERE
var compMove = function () {
    if (a1 == "" && ((a3 == "x" && a2 == "x") || (c3 == "x" && b2 == "x") || (c1 == "x" && b1 == "x"))) {
        $('#a1').text("o");
        turn = 0;
    } else {
      if (a2 == "" && ((a1 == "x" && a3 == "x") || (c2 == "x" && b2 == "x"))) {
        $('#a2').text("o");
        turn = 0;
        }
        else{
        if (a3 == "" && ((a1 == "x" && a2 == "x") || (c1 == "x" && b2 == "x") || (c3 == "x" && b3 == "x"))) {
            $('#a3').text("o");
            turn = 0;
        }
            else{
            if (c3 == "" && ((c1 == "x" && c2 == "x") || (a1 == "x" && b2 == "x") || (a3 == "x" && b3 == "x"))) {
                $('#c3').text("o");
                turn = 0;
        }
                else{
                if (c1 == "" && ((c3 == "x" && c2 == "x") || (a3 == "x" && b2 == "x") || (a1 == "x" && b1 == "x"))) {
                    $('#c1').text("o");
                    turn = 0;
        }
                    else{
                    if (c2 == "" && ((c3 == "x" && c1 == "x") || (a2 == "x" && b2 == "x"))) {
                        $('#c2').text("o");
                        turn = 0;
        }
                        else{
                        if (b1 == "" && ((b3 == "x" && b2 == "x") || (a1 == "x" && c1 == "x"))) {
                            $('#b1').text("o");
                            turn = 0;
        }
                            else{
                            if (b3 == "" && ((a3 == "x" && c3 == "x") || (b2 == "x" && b1 == "x"))) {
                                $('#b3').text("o");
                                turn = 0;
        }
                                else{
                                if (b2 == "" && ((a3 == "x" && c1 == "x") || (c3 == "x" && a1 == "x") || (b3 == "x" && b1 == "x") || (c2 == "x" && a2 == "x"))) {
                                    $('#b2').text("o");
                                    turn = 0;
        }
                                   else{ // IF NO OPP TO BLOCK A WIN, THEN PLAY IN ONE OF THESE SQUARES
                                    if (b2 == "") {
                                        $('#b2').text("o");
                                        turn = 0;

                                    }
                                        else{
                                        if (a1 == "") {
                                            $('#a1').text("o");
                                            turn = 0;

                                    }
                                            else{
                                            if (c3 == "") {
                                            $('#c3').text("o");
                                            turn = 0;

                                    }
                                                else {
                                                if (c2 == "") {
                                            $('#c2').text("o");
                                            turn = 0;

                                    }
                                                    else{
                                                    if (b1 == "") {
                                            $('#b1').text("o");
                                            turn = 0;

                                    }
                                                    }
                                                }
                                            }


                                        }
                                   }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};


// CREATES A FUNCTION TO DETECT WHAT IS IN EACH BOX AFTER EACH MOVE
boardCheck = function () {
    a1 = $('#a1').html();
    a2 = $('#a2').html();
    a3 = $('#a3').html();
    b1 = $('#b1').html();
    b2 = $('#b2').html();
    b3 = $('#b3').html();
    c1 = $('#c1').html();
    c2 = $('#c2').html();
    c3 = $('#c3').html();
};

// CREATES A FUNCTION TO DETECT A WIN OR A TIE
checkWin = function () { // CHECKS IF X WON
    if ((a1 == a2 && a1 == a3 && (a1 == "x")) || //first row
    (b1 == b2 && b1 == b3 && (b1 == "x")) || //second row
    (c1 == c2 && c1 == c3 && (c1 == "x")) || //third row
    (a1 == b1 && a1 == c1 && (a1 == "x")) || //first column
    (a2 == b2 && a2 == c2 && (a2 == "x")) || //second column
    (a3 == b3 && a3 == c3 && (a3 == "x")) || //third column
    (a1 == b2 && a1 == c3 && (a1 == "x")) || //diagonal 1
    (a3 == b2 && a3 == c1 && (a3 == "x")) //diagonal 2
    ) {
        xWin = true;
        winAlert();

    } else { // CHECKS IF O WON
        if ((a1 == a2 && a1 == a3 && (a1 == "o")) || //first row
        (b1 == b2 && b1 == b3 && (b1 == "o")) || //second row
        (c1 == c2 && c1 == c3 && (c1 == "o")) || //third row
        (a1 == b1 && a1 == c1 && (a1 == "o")) || //first column
        (a2 == b2 && a2 == c2 && (a2 == "o")) || //second column
        (a3 == b3 && a3 == c3 && (a3 == "o")) || //third column
        (a1 == b2 && a1 == c3 && (a1 == "o")) || //diagonal 1
        (a3 == b2 && a3 == c1 && (a3 == "o")) //diagonal 2
        ) {
            oWin = true;
            winAlert();

        } else { // CHECKS FOR TIE GAME IF ALL CELLS ARE FILLED
            if (((a1 == "x") || (a1 == "o")) && ((b1 == "x") || (b1 == "o")) && ((c1 == "x") || (c1 == "o")) && ((a2 == "x") || (a2 == "o")) && ((b2 == "x") || (b2 == "o")) && ((c2 == "x") || (c2 == "o")) && ((a3 == "x") || (a3 == "o")) && ((b3 == "x") || (b3 == "o")) && ((c3 == "x") || (c3 == "o"))) {
                alert("It's a tie!");
            }
        }
    }
};


// DECLARES WHO WON
var winAlert = function () {
    if (xWin == true) {
        alert("You won!");
        clearBoard(); // THIS DOESN'T WORK
    } else {
        if (oWin == true) {
            alert("Sorry, you lose!");
            clearBoard(); // THIS DOESN'T WORK
        }
    }
};


// NEWGAME BUTTON CLEARS THE BOARD, RESTARTS GAME, AND RESETS THE WINS
var clearBoard = $('#restart').click(function (event) {
    a1 = $('#a1').text("");
    b1 = $('#b1').text("");
    c1 = $('#c1').text("");
    a2 = $('#a2').text("");
    b2 = $('#b2').text("");
    c2 = $('#c2').text("");
    a3 = $('#a3').text("");
    b3 = $('#b3').text("");
    c3 = $('#c3').text("");
    xWin = false;
    oWin = false;
    newGame();
    location.reload(); // WITHOUT THIS, THERE'S A BUG WHICH PLACES MULTIPLE 0'S ON ALL GAMES AFTER THE FIRST
});

// STILL NEED TO FIX:
// * Alert for tie game or xWin appears twice
// * X's can replace O's
// * Missed opportunities for O to win
// * Almost never let's human win
// * Clean up logic for compMove
