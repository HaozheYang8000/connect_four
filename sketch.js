let board = [[0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0],
            ];
let wonPosition = [[], [], [], []];
let gameState = "setup";
let counter = 0;
let winState = -1;
let DEPTH = 6;
// user: yellow/1 computer: red/2
let menuSound = [];
let matchSounds = [];
let theme1, theme2;
let match1, match2, match3;
let tieSound;
let winSound;
let loseSound;
let chosenSound;

function preload() {
    tieSound = loadSound("assets/draw.mp3");
    winSound = loadSound("assets/win.mp3");
    loseSound = loadSound("assets/defeat.mp3");

    theme1 = loadSound("assets/theme1.mp3");
    theme2 = loadSound("assets/theme2.mp3");

    match1 = loadSound("assets/match1.mp3");
    match2 = loadSound("assets/match2.mp3");
    match3 = loadSound("assets/match3.mp3");
}

function setup() {
    myCanvas = createCanvas(760, 660);
    menuSound.push(theme1);
    menuSound.push(theme2);
    matchSounds.push(match1);
    matchSounds.push(match2);
    matchSounds.push(match3);

    textAlign(CENTER, CENTER);
}

////////////////////////// BELOW CODE IS DRAWING /////////////////////////////////////

function displayInitialBoard() {
    background("blue");
    textSize(24);
    fill("white");
    text("Press any key to start the connect four game", width/2, height/2);
}

function displayBoard() {
    background("blue");
    noStroke();
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            if (board[i][j] === 0) fill("white");
            if (board[i][j] === 1) fill("yellow");
            if (board[i][j] === 2) fill("red");
            circle(j*100+50+30, i*100+50+30, 80);
        }
    }
}

function displayWinBoard() {
    chosenSound.stop();
    if (winState === -1) winState = 0;
    background("blue");
    noStroke();
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            let found = false;
            for (let k = 0; k < 4; k++) {
                if (wonPosition[k][0] === i && wonPosition[k][1] === j) {
                    found = true;
                    if (winState === 1) fill("white");
                    else if (board[i][j] === 1) fill("yellow");
                    else if (board[i][j] === 2) fill("red");
                    circle(j*100+50+30, i*100+50+30, 80);
                    break;
                }
            }
            if (!found) {
                if (board[i][j] === 0) fill("white");
                if (board[i][j] === 1) fill("yellow");
                if (board[i][j] === 2) fill("red");
                circle(j*100+50+30, i*100+50+30, 80);
            }
        }
    }
    counter++;
    // flash 8 times
    if (counter%15 === 0) winState = Math.abs(1-winState);
}

function displayTieBoard() {
    chosenSound.stop();
    counter++;
}

function someoneWon() {
    let value = board[wonPosition[0][0]][wonPosition[0][1]];
    background("blue");
    fill("white");
    textSize(24);
    if (value === 1) {
        text("Congratulations! You Won!", width/2, height/2);
        chosenSound = winSound;
    } else {
        text("This Algorithm created by Haozhe Yang is too powerful!", width/2, height/2);
        chosenSound = loseSound;
    }
    chosenSound.play();
}

function noneWon() {
    background("blue");
    fill("white");
    textSize(24);
    text("Oooops. Tie Game!", width/2, height/2);

    chosenSound = tieSound;
    chosenSound.play();
}

function draw() {
    if (gameState === "setup") {
        text("choose the level of difficulty:");
        displayInitialBoard();
    } else if (gameState === "play") {
        displayBoard();
        mousePosition();
        let boardFull = true;
        for (let i = 0; i < 7; i++) {
            if (board[0][i] === 0) boardFull = false;
        }
        if (boardFull) gameState = "tie";

        if (!chosenSound.isPlaying()) {
            chosenSound = random(matchSounds);
            chosenSound.play();
        }
    } else if (gameState === "end") {
        displayWinBoard();
        if (counter === 240) {
            someoneWon();
            noLoop();
        }
    } else if (gameState === "tie") {
        displayTieBoard();
        if (counter === 120) {
            noneWon();
            noloop();
        }
    }
}

/////////////////////////////////// BELOW CODE IS IN GAME FUNCTIONS //////////////////////


function mousePosition() {
    // put a purple circle around the place that will be yours when you click
    for (let i = 30; i <= 730; i+=100) {
        if (mouseX > i+20 && mouseX < i+80 && mouseY > 30 && mouseY < 630) {
            let circleX = (i-30)/100;
            for (let j = 5; j >= 0; j--) {
                if (board[j][(i-30)/100] === 0) {
                    let circleY = j;
                    fill("purple");
                    circle(circleX*100+50+30, circleY*100+50+30, 100);
                    fill("white");
                    circle(circleX*100+50+30, circleY*100+50+30, 80);
                    break;
                }
            }
        }
    }
}

function checkWin() {
    // horizontal
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === board[i][j+1] && board[i][j+1] === board[i][j+2]
                && board[i][j+2] === board[i][j+3] && board[i][j] !== 0) {
                    wonPosition = [[i, j], [i, j+1], [i, j+2], [i, j+3]];
                    return true;
            }
        }
    }

    // vertical
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 7; j++) {
            if (board[i][j] === board[i+1][j] && board[i+1][j] === board[i+2][j]
                && board[i+2][j] === board[i+3][j] && board[i][j] !== 0) {
                    wonPosition = [[i, j], [i+1, j], [i+2, j], [i+3, j]];
                    return true;
            }
        }
    }

    // diagonal
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            // top-left to bottom-right
            if (board[i][j] === board[i+1][j+1] && board[i+1][j+1] === board[i+2][j+2]
                && board[i+2][j+2] === board[i+3][j+3] && board[i][j] !== 0) {
                    wonPosition = [[i, j], [i+1, j+1], [i+2, j+2], [i+3, j+3]];
                    return true;
            }
            // top-right to bottom-left
            if (board[i][j+3] === board[i+1][j+2] && board[i+1][j+2] === board[i+2][j+1]
                && board[i+2][j+1] === board[i+3][j] && board[i][j+3] !== 0) {
                    wonPosition = [[i, j+3], [i+1, j+2], [i+2, j+1], [i+3, j]];
                    return true;
            }
        }
    }
}

function mousePressed() {
    if (gameState !== "play") return;
    let moved = false;
    for (let i = 30; i <= 730; i+=100) {
        if (mouseX > i+20 && mouseX < i+80 && mouseY > 30 && mouseY < 630) {
            let circleX = (i-30)/100;
            for (let j = 5; j >= 0; j--) {
                if (board[j][(i-30)/100] === 0) {
                    let circleY = j;
                    board[circleY][circleX] = 1;
                    moved = true;
                    break;
                }
            }
        }
    }
    if (moved) {
        if (!checkWin()) computerMove();
        else gameState = "end";
    }
}

function computerMove() {
    // // test call computer move
    // for (let i = 6-1; i >= 0; i--) {
    //     let moved = false;
    //     for (let j = 0; j < 7; j++) {
    //         if (!board[i][j]) {
    //             board[i][j] = 2;
    //             moved = true;
    //             break;
    //         }
    //     }
    //     if (moved) {
    //         checkWin();
    //         break;
    //     }
    // }

    // actual ai
    computerAIMove();
}

function keyPressed() {
    if (gameState === "setup") {
        gameState = "play";
        chosenSound = random(matchSounds);
        chosenSound.play();
    }
}

//////////////////////////////////////// BELOW CODE IS THE AI ////////////////////////////////////////////////

function allMove(tmpboard, v)
{
    for (let i = 0; i < 7; i++) {
        if (tmpboard[0][i] === 0) v.push(i);
    }
}

function oneMax(boardInLocalScope, currentMinscore) {
    // at the final calculate, leaf of the search tree
    let tmpboard = [[], [], [], [], [], []];
    for (let i = 0; i < 6; i++) for (let j = 0; j < 7; j++) tmpboard[i].push(boardInLocalScope[i][j]);
    let v = [];
    allMove(tmpboard, v);

    let maxscore = -100000;
    for (let i of v) {
        tmpboard = [[], [], [], [], [], []];
        for (let k = 0; k < 6; k++) for (let j = 0; j < 7; j++) tmpboard[k].push(boardInLocalScope[k][j]);
        for (let j = 5; j >= 0; j--) {
            if (tmpboard[j][i] === 0) {
                tmpboard[j][i] = 2;
                break;
            }
        }

        let sc = score(tmpboard);
        if (checkWin(tmpboard)) sc = 100000;
        maxscore = Math.max(sc, maxscore);
        if (maxscore > currentMinscore) return 0.5;
    }

    if (v.length !== 0) return maxscore;
    else return 0;
}

function oneMin(boardInLocalScope, currentMaxscore) {
    // at the final calculate, leaf of the search tree
    let tmpboard = [[], [], [], [], [], []];
    for (let i = 0; i < 6; i++) for (let j = 0; j < 7; j++) tmpboard[i].push(boardInLocalScope[i][j]);
    let v = [];
    allMove(tmpboard, v);

    let minscore = 100000;
    for (let i of v) {
        tmpboard = [[], [], [], [], [], []];
        for (let k = 0; k < 6; k++) for (let j = 0; j < 7; j++) tmpboard[k].push(boardInLocalScope[k][j]);
        for (let j = 5; j >= 0; j--) {
            if (tmpboard[j][i] === 0) {
                tmpboard[j][i] = 1;
                break;
            }
        }

        let sc = score(tmpboard);
        if (checkWin(tmpboard)) sc = -100000;
        minscore = Math.min(minscore, sc);
        if (minscore < currentMaxscore) return 1;
    }

    if (v.length !== 0) return minscore;
    else return 0;
}

function multiMax(boardInLocalScope, currentMinscore, depth) {
    // at the middle calculate, find all scores of its children node then find the max score
    let tmpboard = [[], [], [], [], [], []];
    for (let i = 0; i < 6; i++) for (let j = 0; j < 7; j++) tmpboard[i].push(boardInLocalScope[i][j]);
    let v = [];
    allMove(tmpboard, v);

    let maxscore = -100000;
    for (let i of v) {
        tmpboard = [[], [], [], [], [], []];
        for (let k = 0; k < 6; k++) for (let j = 0; j < 7; j++) tmpboard[k].push(boardInLocalScope[k][j]);
        for (let j = 5; j >= 0; j--) {
            if (tmpboard[j][i] === 0) {
                tmpboard[j][i] = 2;
                break;
            }
        }

        let sc = 0;
        if (depth === 2) sc = oneMin(tmpboard, maxscore);
        if (depth > 2) sc = multiMin(tmpboard, maxscore, depth-1);
        if (checkWin(tmpboard)) sc = 100000;
        
        if (sc === 0.5) continue;
        maxscore = sc;
        if (maxscore > currentMinscore) return 0.5;
    }

    if (v.length !== 0) return maxscore;
    else return 0;
}

function multiMin(boardInLocalScope, currentMaxscore, depth) {
    // at the middle calculate, find all scores of its children node then find the min score
    let tmpboard = [[], [], [], [], [], []];
    for (let i = 0; i < 6; i++) for (let j = 0; j < 7; j++) tmpboard[i].push(boardInLocalScope[i][j]);
    let v = [];
    allMove(tmpboard, v);

    let minscore = 100000;
    for (let i of v) {
        tmpboard = [[], [], [], [], [], []];
        for (let k = 0; k < 6; k++) for (let j = 0; j < 7; j++) tmpboard[k].push(boardInLocalScope[k][j]);
        for (let j = 5; j >= 0; j--) {
            if (tmpboard[j][i] === 0) {
                tmpboard[j][i] = 1;
                break;
            }
        }

        let sc = 0;
        if (depth === 2) sc = oneMax(tmpboard, minscore);
        if (depth > 2) sc = multiMax(tmpboard, minscore, depth-1);
        if (checkWin(tmpboard)) sc = -100000;

        if (sc === 0.5) continue;
        minscore = sc;
        if (minscore < currentMaxscore) return 0.5;
    }

    if (v.length !== 0) return minscore;
    else return 0;
}

function computerAIMove() {
    // the real computer AI
    // search depth of DEPTH
    console.log("computer is thinking:\n");
    let tmpboard = [[], [], [], [], [], []];
    for (let i = 0; i < 6; i++) for (let j = 0; j < 7; j++) tmpboard[i].push(board[i][j]);
    let v = [];
    allMove(tmpboard, v);
    let w = [];

    let maxscore = -100000;
    for (let i of v) {
        tmpboard = [[], [], [], [], [], []];
        for (let k = 0; k < 6; k++) for (let j = 0; j < 7; j++) tmpboard[k].push(board[k][j]);
        for (let j = 5; j >= 0; j--) {
            if (tmpboard[j][i] === 0) {
                tmpboard[j][i] = 2;
                break;
            }
        }

        let sc = multiMin(tmpboard, maxscore, DEPTH-1);
        if (checkWin(tmpboard)) sc = 100000;
        if (sc === 0.5) continue;
        if (sc !== maxscore) {
            maxscore = sc;
            w = [];
        }
        w.push(i);
    }

    // if all scores are the same then change the depth one less
    if (w.length === v.length && DEPTH > 3) {
        DEPTH--;
        computerAIMove();
        DEPTH++;
        return;
    }

    // return a random move
    let SZ = w.length;
    let col = w[Math.floor(Math.random()*SZ)];
    // move piece
    for (let j = 5; j >= 0; j--) {
        if (board[j][col] === 0) {
            board[j][col] = 2;
            break;
        }
    }
    if (checkWin()) gameState = "end";
}

///////////////////////////////////// BELOW CODE IS FOR CALCULATING SCORES  //////////////////////////////

function score(boardInLocalScope) {
    let overallPoints = 0;
    let verticalPoints = 0;
    let horizontalPoints = 0;
    let diagonalPoints1 = 0;    // top left bottom right
    let diagonalPoints2 = 0;    // top right bottom left

    for (let col = 0; col < 7; col++) {
        verticalPoints += findScoreInOneLine(boardInLocalScope, col, 0, 0, 1);
    }

    for (let row = 0; row < 6; row++) {
        horizontalPoints += findScoreInOneLine(boardInLocalScope, 0, row, 1, 0);
    }

    for (let row = 0; row < 6; row++) {
        diagonalPoints1 += findScoreInOneLine(boardInLocalScope, 0, row, 1, 1);
    } for (let col = 0; col < 7; col++) {
        diagonalPoints1 += findScoreInOneLine(boardInLocalScope, col, 0, 1, 1);
    }

    for (let row = 0; row < 6; row++) {
        diagonalPoints2 += findScoreInOneLine(boardInLocalScope, 6, row, -1, 1);
    } for (let col = 0; col < 7; col++) {
        diagonalPoints2 += findScoreInOneLine(boardInLocalScope, col, 0, -1, 1);
    }

    overallPoints = verticalPoints + horizontalPoints + diagonalPoints1 + diagonalPoints2;
    return overallPoints;
}

function findScoreInOneLine(boardInLocalScope, col, row, dcol, drow) {
    let connectedNumber = 0;
    let connectedColor = 0;

    let humanPoints = 0;
    let computerPoints = 0;

    while (col >= 0 && col <= 6 && row >= 0 && row <= 5) {
        if (boardInLocalScope[row][col] === connectedColor) connectedNumber++;
        else {
            if (connectedColor === 1) humanPoints += Math.pow(10, connectedNumber);
            if (connectedColor === 2) computerPoints += Math.pow(10, connectedNumber);
            connectedNumber = 1;
            connectedColor = boardInLocalScope[row][col];
        }

        row += drow;
        col += dcol;
    }
    if (connectedColor === 1) humanPoints += Math.pow(10, connectedNumber);
    if (connectedColor === 2) computerPoints += Math.pow(10, connectedNumber);

    return computerPoints-humanPoints;
}