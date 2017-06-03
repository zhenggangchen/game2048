/**
 * Created by Administrator on 17-2-10.
 */
function getPosTop(i, j) {
    return i * 120 + 20;
}
function getPosLeft(i, j) {
    return j * 120 + 20;
}

function getNumberBckgroundColor(number) {
    switch (number) {
        case 2 :
            return "#eee4da"
            break;
        case 4 :
            return "#ede0c8"
            break;
        case 8 :
            return "#f2b179"
            break;
        case 16 :
            return "#f59563"
            break;
        case 32:
            return "#f67c5f"
            break;
        case 64:
            return "#f65e3b"
            break;
        case 128:
            return "#edcf72"
            break;
        case 256:
            return "#edcc61"
            break;
        case 512:
            return "#9c0"
            break;
        case 1024:
            return "#33b5e5"
            break;
        case 2048:
            return "#09c"
            break;
        case 4096:
            return "#a6c"
            break;
        case 8192:
            return "#93e"
            break;
        //case 16384:return "#ee4da" break;
    }
    return "black";
}


function getNumberColor(number) {
    if (number <= 4) {
        return "#776e65";
    }
    return "white";
}
function nospace(bord) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (bord[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}
function canmoveleft(bord) {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (bord[i][j] != 0) {
                if (bord[i][j - 1] == 0 || bord[i][j - 1] == bord[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}
function canmoveright(bord) {
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (bord[i][j] != 0) {
                if (bord[i][j + 1] == 0 || bord[i][j + 1] == bord[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}
function canmoveup(bord) {
    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            if (bord[i][j] != 0) {
                if (bord[i - 1][j] == 0 || bord[i - 1][j] == bord[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}
function canmovedown(bord) {
    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            if (bord[i][j] != 0) {
                if (bord[i + 1][j] == 0 || bord[i + 1][j] == bord[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}
function nomove(bord) {
    if (canmoveleft(bord) ||
        canmoveright(bord) ||
        canmoveup(bord) ||
        canmovedown(bord)) {
        return false;
    }
    return true;
}

//未完成
/*function noBlockVertical(col,row1, row2,  bord) {
 for (var i = row1 - 1; i >= row2; i--) {
 if (bord[i][col] != 0) {
 return false;
 }
 }
 return true;
 }*/
//
function noBlockVertical(col, row1, row2, board) {
    for (var i = row1 + 1; i < row2; i++)
        if (board[i][col] != 0)
            return false;
    return true;
}
//判断水平方向两个块之间有没有障碍物，左和右调换以下j和k的位置
function noBlockHorizontal(row, col1, col2, bord) {
    for (var i = col1 + 1; i < col2; i++) {
        if (bord[row][i] != 0) {
            return false;
        }
    }
    return true;
}





