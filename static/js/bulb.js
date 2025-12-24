function turnOn() {

    document.getElementById("BulbOff").style.display = "none";
    document.getElementById("BulbOn").style.display = "inline";
    document.getElementById("BtnOff").style.backgroundColor = "lightgray";
    document.getElementById("BtnOn").style.backgroundColor = "gray";

}

function turnOff() {

    document.getElementById("BulbOff").style.display = "inline";
    document.getElementById("BulbOn").style.display = "none";
    document.getElementById("BtnOff").style.backgroundColor = "gray";
    document.getElementById("BtnOn").style.backgroundColor = "lightgray";

}