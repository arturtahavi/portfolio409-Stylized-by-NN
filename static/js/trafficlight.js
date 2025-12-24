
let colors = ['Red', 'Yellow', 'Green'];
let index = 0;

setInterval(changeColor, 2000);
function changeColor(){
    turnOn(colors[index])
    index = (index + 1) % colors.length;
}

function turnOn(color){
    document.getElementById('tlRed').style.backgroundColor = "silver";
    document.getElementById('tlYellow').style.backgroundColor = "silver";
    document.getElementById('tlGreen').style.backgroundColor = "silver";

    document.getElementById('tl' + color).style.backgroundColor = color;

}