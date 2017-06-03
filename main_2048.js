/**
 * Created by Administrator on 17-2-10.
 */

//未解决问题：1.随机数的产生更巧妙的方法 2.增加分数时有动画 3.gameover更好的提示
var bord = new Array;
var score = 0;
var hasConflicted = [];
$(document).ready(function () {
    newgame();
});

function newgame() {
    //初始化棋盘格
    init();
    //在两个随机格子上生成数字
    generateOneNumber();
    generateOneNumber();
}
function init() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = $('#grid-cell' + '-' + i + '-' + j);
            gridCell.css('top', getPosTop(i, j));
            gridCell.css('left', getPosLeft(i, j));

        }
    }
    for (var i = 0; i < 4; i++) {
        bord[i] = [];
        hasConflicted[i] = [];
        for (var j = 0; j < 4; j++) {
            bord[i][j] = 0;
            hasConflicted[i][j] = false;
        }

    }
    updateBordView();
    score = 0;
}
function updateBordView() {
    $('.number-cell').remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $('#grid-container')
                .append('<div class="number-cell" id="number-cel-' + i + '-' + j + '"></div>')
            var theNumberCell = $('#number-cel-' + i + '-' + j);

            if (bord[i][j] == 0) {
                theNumberCell.css('width', '0px');
                theNumberCell.css('height', '0px');
                theNumberCell.css('top', getPosTop(i, j) + 50);
                theNumberCell.css('left', getPosLeft(i, j) + 50);
            }
            else {
                theNumberCell.css('width', '100px');
                theNumberCell.css('height', '100px');
                theNumberCell.css('top', getPosTop(i, j));
                theNumberCell.css('left', getPosLeft(i, j));
                theNumberCell.css('background-color', getNumberBckgroundColor(bord[i][j]));
                theNumberCell.css('color', getNumberColor(bord[i][j]));
                theNumberCell.text(bord[i][j]);
            }
            hasConflicted[i][j] = false;
        }
    }
}
function generateOneNumber() {
    if (nospace(bord)) {
        return false;
    }

    //随机一个位置
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));
    var time = 0;
    while (time < 50) {
        if (bord[randx][randy] == 0)
            break;
        var randx = parseInt(Math.floor(Math.random() * 4));
        var randy = parseInt(Math.floor(Math.random() * 4));
        time++;
    }
    if (time == 50) {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if(bord[i][j]=0){
                    randx=i;
                    randy=j;
                }
            }
        }
    }
    //随机一个数字
    var randNumber = Math.random() < 0.5 ? 2 : 4;
    //在选中的位置显示数字
    bord[randx][randy] = randNumber;
    showNumber(randx, randy, randNumber);
    return true;
}
$(document).keydown(function (event) {
    switch (event.keyCode) {
        //left
        case 37 :
            if (moveleft()) {
                setTimeout('generateOneNumber()', '210');
                setTimeout('isgameOver()', '300');
            }
            break;
        //up
        case 38 :
            if (moveup()) {
                setTimeout('generateOneNumber()', '210');
                setTimeout('isgameOver()', '300');
            }
            break;
        //right
        case 39 :
            if (moveright()) {
                setTimeout('generateOneNumber()', '210');
                setTimeout('isgameOver()', '300');
            }
            break;
        //down
        case 40 :
            if (movedown()) {
                setTimeout('generateOneNumber()', '210');
                setTimeout('isgameOver()', '300');
            }
            break;
        default :
            break;
    }
});
function isgameOver() {
    if (nospace(bord) && nomove(bord)) {
        gameOver();
    }
}
function gameOver() {
    alert("you lost！");
}
function moveleft() {
    if (!canmoveleft(bord)) {
        return false;
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (bord[i][j] != 0) {
                for (var k = 0; k < j; k++) {
                    if (bord[i][k] == 0 && noBlockHorizontal(i, k, j, bord)) {
                        //move
                        showMove(i, j, i, k);
                        bord[i][k] = bord[i][j];
                        bord[i][j] = 0;
                        continue;
                    }
                    else if (bord[i][k] == bord[i][j] && noBlockHorizontal(i, k, j, bord)
                        && !hasConflicted[i][k]) {
                        //move
                        showMove(i, j, i, k);
                        //add
                        bord[i][k] += bord[i][j];
                        bord[i][j] = 0;
                        score += bord[i][k];
                        updataScore(score);
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout('updateBordView()', '200');
    return true;
}
function moveright() {
    if (!canmoveright(bord)) {
        return false;
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (bord[i][j] != 0) {
                for (var k = 3; k > j; k--) {
                    if (bord[i][k] == 0 && noBlockHorizontal(i, j, k, bord)) {
                        //move
                        showMove(i, j, i, k);
                        bord[i][k] = bord[i][j];
                        bord[i][j] = 0;
                        continue;
                    }
                    else if (bord[i][k] == bord[i][j] && noBlockHorizontal(i, j, k, bord)
                        && !hasConflicted[i][k]) {
                        //move
                        showMove(i, j, i, k);
                        //add
                        bord[i][k] += bord[i][j];
                        bord[i][j] = 0;
                        score += bord[i][k];
                        updataScore(score);
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout('updateBordView()', '200');
    return true;
}
function moveup() {
    if (!canmoveup(bord)) {
        return false;
    }
    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            if (bord[i][j] != 0) {
                for (var k = 0; k < i; k++) {
                    if (bord[k][j] == 0 && noBlockVertical(j, k, i, bord)) {
                        //move
                        showMove(i, j, k, j);
                        bord[k][j] = bord[i][j];
                        bord[i][j] = 0;
                        score += bord[k][j];
                        continue;
                    }
                    else if (bord[k][j] == bord[i][j] && noBlockVertical(j, k, i, bord)
                        & !hasConflicted[k][j]) {
                        //move
                        showMove(i, j, k, j);
                        //add
                        bord[k][j] += bord[i][j];
                        bord[i][j] = 0;
                        score += bord[k][j];
                        updataScore(score);
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout('updateBordView()', '200');
    return true;
}
function movedown() {
    if (!canmovedown(bord)) {
        return false;
    }
    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            if (bord[i][j] != 0) {
                for (var k = 3; k > i; k--) {
                    if (bord[k][j] == 0 && noBlockVertical(j, i, k, bord)) {
                        //move
                        showMove(i, j, k, j);
                        bord[k][j] = bord[i][j];
                        bord[i][j] = 0;
                        continue;
                    }
                    else if (bord[k][j] == bord[i][j] && noBlockVertical(j, i, k, bord)
                        && !hasConflicted[k][j]) {
                        //move
                        showMove(i, j, k, j);
                        //add
                        bord[k][j] += bord[i][j];
                        bord[i][j] = 0;
                        score += bord[k][j];
                        updataScore(score);
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout('updateBordView()', '200');
    return true;
}






