let documentationButton = document.getElementById("showDoc");
let mainHeader = document.getElementById("mainHeader");
let canvas = document.getElementById("mainCanvas");
let ctx = canvas.getContext("2d");

documentationButton.addEventListener("click", showDocumentation);
mainHeader.addEventListener("mouseover", changeColor);
mainHeader.addEventListener("mouseleave", changeColorBack);

function drawArt() {
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, 150, 75);
}

function showDocumentation() {
    console.log("Jadda");
}

function changeColor() {
    mainHeader.style.color = "blue";
}

function changeColorBack() {
    mainHeader.style.color = "black";
}

drawArt();
