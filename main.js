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

function addElement(color, width, height, top, left) {
    canvasElements.push({
        color: color,
        width: width,
        height: height,
        top: top,
        left: left
    });
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
