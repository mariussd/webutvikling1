let documentationButton = document.getElementById("showDoc");
let randomiseButton = document.getElementById("randomise");
let fightButton = document.getElementById("fight");
let redButton = document.getElementById("redb");
let greenButton = document.getElementById("greenb");
let blueButton = document.getElementById("blueb");
let removeButton = document.getElementById("removeB");
let mainHeader = document.getElementById("mainHeader");
let canvas = document.getElementById("mainCanvas");
let winnerP = document.getElementById("winner");

let canvasCoordinates = canvas.getBoundingClientRect();
let ctx = canvas.getContext("2d");

let changingColor = "";

$('input[type=radio][name=colorpicker]').change(function() {
    changingColor = this.value;
});

const colors = ["blue", "green", "red"];

let canvasElements = [];
let fights = 0;

documentationButton.addEventListener("click", showDocumentation);
randomiseButton.addEventListener("click", function() {
    winnerP.innerHTML = "Fight to determine the best color.";
    draw();
} );
fightButton.addEventListener("click", fight);
mainHeader.addEventListener("mouseover", function() {
    mainHeader.style.color = "blue";
});



// event listener for changing the color of the header
mainHeader.addEventListener("mouseleave", function() {
    mainHeader.style.color = "black";
});

// event listener for the canvas
canvas.addEventListener("click", function(event) {
    // handler for checking if the click hit one of the boxes
    canvasElements.forEach(function(element) {
        if (element.isClicked(event.clientX, event.clientY)) {
            if (changingColor === "remove") {
                canvasElements.splice(canvasElements.indexOf(element), 1);
                drawArt();
            } else {
                element.changeColor();
            }
        }
    });
});

// event listener with jQuery
$(window).keypress(function(e) {
    if (e.which === 32) {
        draw();
    }
});

function drawArt() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvasCoordinates.width, canvasCoordinates.height);

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
        this.color = changingColor != "" ? changingColor: this.color;

        // draws the whole array again
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

function fight() {
    let finished = false;
    let colors = [0, 0, 0];
    let totalSquares = 0;

    canvasElements.forEach(function(element) {
        totalSquares++;
        if (element.color === "red") {
            colors[0]++;
        } else if (element.color === "green") {
            colors[1]++;
        } else {
            colors[2]++;
        }
    });

    let winningColor = "";

    // this is hard coded in, but I have no intention of adding
    // more colors.
    if (colors[0] > colors[1] && colors[0] > colors[2]) {
        winningColor = "red";
    } else if (colors[1] > colors[0] && colors[1] > colors[2]) {
        winningColor = "green";
    } else if (colors[2] > colors[0] && colors[2] > colors[1]) {
        winningColor = "blue";
    }

    canvasElements.forEach(function(element) {
        let roll = Math.random();

        if (element.color !== winningColor) {
            if (roll >= 0.6666) {
                element.color = "blue";
            } else if (roll < 0.6666 && roll >= 0.3333) {
                element.color = "red";
            } else {
                element.color = "green";
            }
        }
    });

    colors.forEach(function(element) {
        if (element === totalSquares) {
            finished = true;
        }
    })

    drawArt();

    if (finished) {
        winnerP.innerHTML = "The winner is " + winningColor + "!"
        return;
    } else {
        winnerP.innerHTML = "Fight to determine the best color.";
        setTimeout(() => fight(), 200);
    }
}


function addElement(element) {
    canvasElements.push(element);
}

function showDocumentation() {
    console.log("Jadda");
}

function draw() {
    if (canvasElements.length !== 0) {
        canvasElements = [];
    }

    let spaceBetween = 0; // space between the squares
    let startingX = 0; // the starting x within the canvas
    let startingY = 0; // the starting y within the canvas
    let standardWidth = 20; // standard width of the squares

    let squareCountX = Math.round(
        (canvasCoordinates.x + canvas.width) / standardWidth
    );
    let squareCountY = Math.round(
        (canvasCoordinates.y + canvas.height) / standardWidth
    );

    for (i = 0; i < squareCountY; i++) {
        for (j = 0; j < squareCountX; j++) {
            addElement(
                new Square(
                    startingX + standardWidth * j + spaceBetween * j,
                    startingY + standardWidth * i + spaceBetween * i,
                    standardWidth,
                    standardWidth,
                    colors[parseInt(Math.random() * colors.length)]
                )
            );
        }
    }

    drawArt();
}

draw();
