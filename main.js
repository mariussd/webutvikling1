documentationButton = document.getElementById("showDoc");
mainHeader = document.getElementById("mainHeader");

documentationButton.addEventListener("click", showDocumentation);
mainHeader.addEventListener("mouseover", changeColor);
mainHeader.addEventListener("mouseleave", changeColorBack);

function showDocumentation() {
    console.log("Jadda");
}

function changeColor() {
    mainHeader.style.color = "blue";
}

function changeColorBack() {
    mainHeader.style.color = "black";
}
