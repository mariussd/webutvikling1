let documentationButton = document.getElementById("showDoc");
let mainHeader = document.getElementById("mainHeader");
let canvas = document.getElementById("mainCanvas");
let ctx = canvas.getContext("2d");

let canvasElements = [];

documentationButton.addEventListener("click", showDocumentation);
mainHeader.addEventListener("mouseover", changeColor);
mainHeader.addEventListener("mouseleave", changeColorBack);

function drawArt() {
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, 150, 75);
}

function Square(x, y, width, height) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
}

function addElement(element) {
    canvasElements.push(element);
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

function main() {
    drawArt();
}
