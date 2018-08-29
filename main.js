let documentationButton = document.getElementById("showDoc");
let mainHeader = document.getElementById("mainHeader");
let canvas = document.getElementById("mainCanvas");
let canvasCoordinates = canvas.getBoundingClientRect();
let ctx = canvas.getContext("2d");

const colors = ["blue", "green", "red"];

let canvasElements = [];

documentationButton.addEventListener("click", showDocumentation);
mainHeader.addEventListener("mouseover", function() {
    mainHeader.style.color = "blue";
});
mainHeader.addEventListener("mouseleave", function() {
    mainHeader.style.color = "black";
});
canvas.addEventListener("click", function(event) {
    console.log("hey");
    canvasElements.forEach(function(element) {
        if (element.isClicked(event.clientX, event.clientY)) {
            console.log("JA????");
            element.changeColor();
        }
    });
});

function drawArt() {
    canvasElements.forEach(function(element) {
        ctx.fillStyle = element.color;
        ctx.fillRect(element.x, element.y, element.width, element.height);
    });
}

function checkClickHit(event) {}

function Square(x, y, width, height, color) {
    this.color = color;
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;

    this.changeColor = function() {
        const previousColor = this.color;

        while (previousColor === this.color) {
            this.color = colors[parseInt(Math.random() * colors.length)];
        }

        drawArt();
    };

    this.isClicked = function(x, y) {
        globalX = Math.round(canvasCoordinates.x) + this.x;
        globalY = Math.round(canvasCoordinates.y) + this.y;

        if (
            x >= globalX &&
            x <= globalX + this.width &&
            y >= globalY &&
            y <= globalY + this.width
        ) {
            return true;
        }
        return false;
    };
}

function addElement(element) {
    canvasElements.push(element);
}

function showDocumentation() {
    console.log("Jadda");
}

function main() {
    let squareCount = 10;

    let spaceBetween = 10;
    let startingX = 10;
    let startingY = 10;
    let standardWidth = 20;

    for (i = 0; i < squareCount; i++) {
        addElement(
            new Square(
                startingX + standardWidth * i + spaceBetween * i,
                startingY,
                standardWidth,
                standardWidth,
                colors[parseInt(Math.random() * colors.length)]
            )
        );
    }

    // s1 = new Square(10, 10, 20, 20, "red");
    // s3 = new Square(40, 10, 20, 20, "green");
    // s2 = new Square(70, 10, 20, 20, "blue");
    // addElement(s1);
    // addElement(s2);
    // addElement(s3);

    console.log(canvasElements);
    drawArt();
}

main();
