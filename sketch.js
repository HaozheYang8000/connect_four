let board = [[0, 0, 0, 0, 0, 0, 0],
                         [0, 0, 0, 0, 0, 0, 0],
                         [0, 0, 0, 0, 0, 0, 0],
                         [0, 0, 0, 0, 0, 0, 0],
                         [0, 0, 0, 0, 0, 0, 0],
                         [0, 0, 0, 0, 0, 0, 0],
                        ];
let wonPosition = [[], [], [], []];
let gameState = "play";
let counter = 0;
let winState = -1;
// user: yellow/1 computer: red/2

function setup() {
    createCanvas(760, 660);
}

function display_board() {
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

function display_win_board() {
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

function mouse_position() {
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

function someone_won() {
    let value = board[wonPosition[0][0]][wonPosition[0][1]];
    background("blue");
    fill("white");
    textAlign(CENTER);
    textSize(24);
    if (value === 1) {
        text("Congratulations! You Won!", width/2, height/2);
    } else {
        text("This Algorithm created by Haozhe Yang is too powerful!", width/2, height/2);
    }
}

function none_won() {
    background("blue");
    fill("white");
    textAlign(CENTER);
    textSize(24);
    text("Oooops. Tie Game!", width/2, height/2);
}

function check_win() {
    // horizontal
    console.log("checking who is winning\n");
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === board[i][j+1] && board[i][j+1] === board[i][j+2]
                && board[i][j+2] === board[i][j+3] && board[i][j] !== 0) {
                    wonPosition = [[i, j], [i, j+1], [i, j+2], [i, j+3]];
                    gameState = "end";
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
                    gameState = "end";
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
                    gameState = "end";
                    return true;
            }
            // top-right to bottom-left
            if (board[i][j+3] === board[i+1][j+2] && board[i+1][j+2] === board[i+2][j+1]
                && board[i+2][j+1] === board[i+3][j] && board[i][j+3] !== 0) {
                    wonPosition = [[i, j+3], [i+1, j+2], [i+2, j+1], [i+3, j]];
                    gameState = "end";
                    return true;
            }
        }
    }
}

function check_win2(boardInLocalScope) {
    // horizontal
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 4; j++) {
            if (boardInLocalScope[i][j] === boardInLocalScope[i][j+1] && boardInLocalScope[i][j+1] === boardInLocalScope[i][j+2]
                && boardInLocalScope[i][j+2] === boardInLocalScope[i][j+3] && boardInLocalScope[i][j] !== 0) {
                    wonPosition = [[i, j], [i, j+1], [i, j+2], [i, j+3]];
                    return true;
            }
        }
    }

    // vertical
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 7; j++) {
            if (boardInLocalScope[i][j] === boardInLocalScope[i+1][j] && boardInLocalScope[i+1][j] === boardInLocalScope[i+2][j]
                && boardInLocalScope[i+2][j] === boardInLocalScope[i+3][j] && boardInLocalScope[i][j] !== 0) {
                    wonPosition = [[i, j], [i+1, j], [i+2, j], [i+3, j]];
                    return true;
            }
        }
    }

    // diagonal
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            // top-left to bottom-right
            if (boardInLocalScope[i][j] === boardInLocalScope[i+1][j+1] && boardInLocalScope[i+1][j+1] === boardInLocalScope[i+2][j+2]
                && boardInLocalScope[i+2][j+2] === boardInLocalScope[i+3][j+3] && boardInLocalScope[i][j] !== 0) {
                    wonPosition = [[i, j], [i+1, j+1], [i+2, j+2], [i+3, j+3]];
                    return true;
            }
            // top-right to bottom-left
            if (boardInLocalScope[i][j] === boardInLocalScope[i+1][j-1] && boardInLocalScope[i+1][j-1] === boardInLocalScope[i+2][j-2]
                && boardInLocalScope[i+2][j-2] === boardInLocalScope[i+3][j-3] && boardInLocalScope[i][j] !== 0) {
                    wonPosition = [[i, j], [i+1, j-1], [i+2, j-2], [i+3, j-3]];
                    return true;
            }
        }
    }
    return false;
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
        if (!check_win()) computer_move();
    }
}

function computer_move() {
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
    //         check_win();
    //         break;
    //     }
    // }

    // actual ai
    computer_ai_move();
}

function draw() {
    if (gameState === "play") {
        display_board();
        mouse_position();
        let boardFull = true;
        for (let i = 0; i < 7; i++) {
            if (board[0][i] == 0) boardFull = false;
        }
        if (boardFull) gameState = "tie";
    } else if (gameState === "end") {
        display_win_board();
        if (counter === 240) gameState = "";
    } else if (gameState === "tie") {
        none_won();
        noLoop();
    } else {
        someone_won();
        noLoop();
    }
}

//////////////////////////////////////// BELOW CODE IS THE AI ////////////////////////////////////////////////

function allMove(tmpboard, v)
{
    for (let i = 0; i < 7; i++) {
        if (tmpboard[0][i] === 0) v.push(i);
    }
}

function one_max(boardInLocalScope, currentMinscore) {
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
        if (check_win2(tmpboard)) sc = 100000;
        maxscore = Math.max(sc, maxscore);
        if (maxscore > currentMinscore) return 0.5;
    }

    if (v.length !== 0) return maxscore;
    else return 0;
}

function one_min(boardInLocalScope, currentMaxscore) {
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
        if (check_win2(tmpboard)) sc = -100000;
        minscore = Math.min(minscore, sc);
        if (minscore < currentMaxscore) return 1;
    }

    if (v.length !== 0) return minscore;
    else return 0;
}

function multi_max(boardInLocalScope, currentMinscore, depth) {
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
        if (depth === 2) sc = one_min(tmpboard, maxscore);
        if (depth > 2) sc = multi_min(tmpboard, maxscore, depth-1);
        if (check_win2(tmpboard)) sc = 100000;
        
        if (sc === 0.5) continue;
        maxscore = sc;
        if (maxscore > currentMinscore) return 0.5;
    }

    if (v.length !== 0) return maxscore;
    else return 0;
}

function multi_min(boardInLocalScope, currentMaxscore, depth) {
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
    let sc = 0; 
        let sc = 0; 
    let sc = 0; 
        let sc = 0; 
        if (depth === 2) sc = one_max(tmpboard, minscore);
        if (depth > 2) sc = multi_max(tmpboard, minscore, depth-1);
        if (check_win2(tmpboard)) sc = -100000;

        if (sc === 0.5) continue;
        minscore = sc;
        if (minscore < currentMaxscore) return 0.5;
    }

    if (v.length !== 0) return minscore;
    else return 0;
}

function computer_ai_move() {
    // the real computer AI
    // search depth of DEPTH
    console.log("computer is thinking:\n");
    let DEPTH = 6;
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

        let sc = multi_min(tmpboard, maxscore, DEPTH-1);
        if (check_win2(tmpboard)) sc = 100000;
        if (sc === 0.5) continue;
        if (sc !== maxscore) {
            maxscore = sc;
            w = [];
        }
        w.push(i);
    }

    let SZ = w.length;
    let col = w[Math.floor(Math.random()*SZ)];
    // move piece
    for (let j = 5; j >= 0; j--) {
        if (board[j][col] === 0) {
            board[j][col] = 2;
            break;
        }
    }
    check_win();
}

///////////////////////////////////// BELOW CODE IS FOR CALCULATING SCORES //////////////////////////////

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