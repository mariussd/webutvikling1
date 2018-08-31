let documentationButton = document.getElementById("showDoc");
let documentationText = document.getElementById("documentation-text");
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

let circleX = canvasCoordinates.width * 0.5;
let circleY = canvasCoordinates.height * 0.5;
let circleRadius = 0;
let circleColor = "cyan";

let changingColor = "";

// these can be changed
const colors = ["blue", "green", "red"];

// all the squares are stored here
let canvasElements = [];

// event listeners
documentationButton.addEventListener("click", showDocumentation);
randomiseButton.addEventListener("click", function() {
    winnerP.innerHTML = "Fight to determine the best color.";
    draw();
});
fightButton.addEventListener("click", fight);

// event listeners for changing the color of the header
mainHeader.addEventListener("mouseover", function() {
    mainHeader.style.color = "blue";
});
mainHeader.addEventListener("mouseleave", function() {
    mainHeader.style.color = "white";
});

// event listener for the canvas
canvas.addEventListener("click", function(event) {
    // handler for checking if the click hit one of the boxes
    canvasElements.forEach(function(element) {
        if (element.isClicked(event.pageX, event.pageY)) {
            if (changingColor === "remove") {
                canvasElements.splice(canvasElements.indexOf(element), 1);
                drawArt();
            } else if (changingColor === "circle") {
                ctx.beginPath();
                ctx.arc(
                    event.pageX - canvasCoordinates.x,
                    event.pageY - canvasCoordinates.y,
                    50,
                    0,
                    2 * Math.PI
                );
                ctx.fillStyle = "pink";
                ctx.fill();
            } else if (checkCircleHit(event.pageX, event.pageY)) {
                // taken from https://www.paulirish.com/2009/random-hex-color-code-snippets/
                circleColor =
                    "#" + Math.floor(Math.random() * 16777215).toString(16);
                circleX -= Math.random() * 10;
                circleY += Math.random() * 10;
                drawArt();
            } else {
                element.changeColor();
            }
        }
    });
});

// event listener for space bar (jQuery)
$(window).keypress(function(e) {
    if (e.which === 32) {
        draw();
    }
});

// event listener for radio buttons (jQuery)
$("input[type=radio][name=colorpicker]").change(function() {
    changingColor = this.value;
});

// draws the squares in the canvasElements array
function drawArt() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvasCoordinates.width, canvasCoordinates.height);

    canvasElements.forEach(function(element) {
        ctx.fillStyle = element.color;
        ctx.fillRect(element.x, element.y, element.width, element.height);
    });

    ctx.beginPath();
    ctx.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI);
    ctx.fillStyle = circleColor;
    ctx.fill();
}

function checkCircleHit(x, y) {
    let a = x - (circleX + canvasCoordinates.x);
    let b = y - (circleY + canvasCoordinates.y);
    let c = Math.sqrt(a * a + b * b);
    if (c <= circleRadius) {
        return true;
    }
    return false;
}

function Square(x, y, width, height, color) {
    this.color = color;
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;

    this.changeColor = function() {
        this.color = changingColor != "" ? changingColor : this.color;

        // draws the array again
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
    let colors_count = [0, 0, 0];
    let totalSquares = 0;

    canvasElements.forEach(function(element) {
        totalSquares++;
        if (element.color === colors[2]) {
            colors_count[2]++;
        } else if (element.color === colors[1]) {
            colors_count[1]++;
        } else {
            colors_count[0]++;
        }
    });

    let winningColor = "";

    // this is hard coded in, but I have no intention of adding
    // more colors.
    if (
        colors_count[0] > colors_count[1] &&
        colors_count[0] > colors_count[2]
    ) {
        winningColor = colors[0];
    } else if (
        colors_count[1] > colors_count[0] &&
        colors_count[1] > colors_count[2]
    ) {
        winningColor = colors[1];
    } else if (
        colors_count[2] > colors_count[0] &&
        colors_count[2] > colors_count[1]
    ) {
        winningColor = colors[2];
    }

    canvasElements.forEach(function(element) {
        let roll = Math.random();

        if (element.color !== winningColor) {
            if (roll >= 0.6666) {
                element.color = colors[0];
            } else if (roll < 0.6666 && roll >= 0.3333) {
                element.color = colors[2];
            } else {
                element.color = colors[1];
            }
        }
    });

    colors_count.forEach(function(element) {
        if (element === totalSquares) {
            finished = true;
        }
    });

    drawArt();

    if (finished) {
        winnerP.innerHTML = "The winner is " + winningColor + "!";
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
    if (documentationText.style.display === "none") {
        documentationText.style.display = "block";
        documentationButton.innerHTML = "Hide documentation";
    } else {
        documentationText.style.display = "none";
        documentationButton.innerHTML = "Show documentation";
    }
}

function draw() {
    if (canvasElements.length !== 0) {
        canvasElements = [];
    }

    let spaceBetween = 0; // space between the squares
    let startingX = 0; // the starting x within the canvas
    let startingY = 0; // the starting y within the canvas
    let standardWidth = 20; // standard width of the squares
    circleRadius = Math.random() * 60 + 10;

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
