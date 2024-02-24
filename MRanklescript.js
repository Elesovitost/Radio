// strana

function updateBackgroundColor(index, buttonElement, color1 = "transparent", color2 = "#D4A29C") {
  buttonElement.style.backgroundColor = index === 0 ? color1 : color2;
}

var textsStrana = ["jakého?", "PRAVÉHO", "LEVÉHO"];
var buttonElementStrana = document.getElementById("StranaButton");
var indexStrana = 0;function cycleStranaText(event) {  indexStrana = cycleText(event, textsStrana, indexStrana, buttonElementStrana, updateBackgroundColor);}

function cycleStranaText(event) {  indexStrana = cycleText(event, textsStrana, indexStrana, buttonElementStrana);  updateTexts();}