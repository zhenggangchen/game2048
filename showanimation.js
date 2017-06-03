/**
 * Created by Administrator on 17-2-10.
 */

function showNumber(i, j, number) {
    var numberCell = $('#number-cel-' + i + '-' + j);
    numberCell.css('background-color', getNumberBckgroundColor(number));
    numberCell.css('color', getNumberColor(number));
    numberCell.text(number);

    numberCell.animate({
        width:"100px",
        height:"100px",
        top:getPosTop(i,j),
        left:getPosLeft(i,j)
    },50);
}

function showMove(fromx,fromy,tox,toy){
    var numberCell = $('#number-cel-' + fromx + '-' + fromy);
    numberCell.animate({
        top:getPosTop(tox,toy),
        left:getPosLeft(tox,toy)
    },200);
}
function updataScore(score){
    $('#score').text(score);
}





