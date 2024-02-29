// BUTTONS texts


function updateBackgroundColor(index, buttonElement, color1 = "transparent", color2 = "#D4A29C") {
  buttonElement.style.backgroundColor = index === 0 ? color1 : color2;
}

var textsRectTuType = ["není", "infiltrativní", "exofytický"];
var buttonElementRectTuType = document.getElementById("RectTuTypeButton");
var indexRectTuType = 0;function cycleRectTuTypeText(event) {  indexRectTuType = cycleText(event, textsRectTuType, indexRectTuType, buttonElementRectTuType);}
function cycleRectTuTypeText(event) {  indexRectTuType = cycleText(event, textsRectTuType, indexRectTuType, buttonElementRectTuType, updateBackgroundColor);  updateTexts();}

var textsRectTuInvasion = ["T1/T2 - pouze stěna", "T3a - invaze < 1 mm", "T3b - invaze 1-5 mm", "T3c - invaze 5-15 mm", "T3d - invaze > 15 mm", "T4a - invaze perit. rec.", "T4b - invaze orgánu"];
var buttonElementRectTuInvasion = document.getElementById("RectTuInvasionButton");
var indexRectTuInvasion = 0;function cycleRectTuInvasionText(event) {  indexRectTuInvasion = cycleText(event, textsRectTuInvasion, indexRectTuInvasion, buttonElementRectTuInvasion);}
function cycleRectTuInvasionText(event) {  indexRectTuInvasion = cycleText(event, textsRectTuInvasion, indexRectTuInvasion, buttonElementRectTuInvasion, updateBackgroundColor);  updateTexts();}

var textsRectTuLNReg = ["nesuspektní", "suspektní"];
var buttonElementRectTuLNReg = document.getElementById("RectTuLNRegButton");
var indexRectTuLNReg = 0;function cycleRectTuLNRegText(event) {  indexRectTuLNReg = cycleText(event, textsRectTuLNReg, indexRectTuLNReg, buttonElementRectTuLNReg);}
function cycleRectTuLNRegText(event) {  indexRectTuLNReg = cycleText(event, textsRectTuLNReg, indexRectTuLNReg, buttonElementRectTuLNReg, updateBackgroundColor);  updateTexts();}

var textsRectTuLNNonReg = ["nesuspektní", "suspektní"];
var buttonElementRectTuLNNonReg = document.getElementById("RectTuLNNonRegButton");
var indexRectTuLNNonReg = 0;function cycleRectTuLNNonRegText(event) {  indexRectTuLNNonReg = cycleText(event, textsRectTuLNNonReg, indexRectTuLNNonReg, buttonElementRectTuLNNonReg);}
function cycleRectTuLNNonRegText(event) {  indexRectTuLNNonReg = cycleText(event, textsRectTuLNNonReg, indexRectTuLNNonReg, buttonElementRectTuLNNonReg, updateBackgroundColor);  updateTexts();}



// LN
var textsRectTuLNReg = ["nesuspektní", "suspektní"];
var buttonElementRectTuLNReg = document.getElementById("RectTuLNRegButton");
var indexRectTuLNReg = 0;function cycleRectTuLNRegText(event) {  indexRectTuLNReg = cycleText(event, textsRectTuLNReg, indexRectTuLNReg, buttonElementRectTuLNReg);}
function cycleRectTuLNRegText(event) {  indexRectTuLNReg = cycleText(event, textsRectTuLNReg, indexRectTuLNReg, buttonElementRectTuLNReg, updateBackgroundColor);  

let RectTuLNRegValue = buttonElementRectTuLNReg.innerText.trim(); 
    let RectTuLNRegLocationElement = document.getElementById('RectTuLNRegLocation');

    if (RectTuLNRegValue === "suspektní") {
        RectTuLNRegLocationElement.classList.remove('hidden');
    } else if (RectTuLNRegValue === "nesuspektní") {
        RectTuLNRegLocationElement.classList.add('hidden');
    }
updateTexts();}

var textsRectTuLNNonReg = ["nesuspektní", "suspektní"];
var buttonElementRectTuLNNonReg = document.getElementById("RectTuLNNonRegButton");
var indexRectTuLNNonReg = 0;function cycleRectTuLNNonRegText(event) {  indexRectTuLNNonReg = cycleText(event, textsRectTuLNNonReg, indexRectTuLNNonReg, buttonElementRectTuLNNonReg);}
function cycleRectTuLNNonRegText(event) {  indexRectTuLNNonReg = cycleText(event, textsRectTuLNNonReg, indexRectTuLNNonReg, buttonElementRectTuLNNonReg, updateBackgroundColor);  

let RectTuLNNonRegValue = buttonElementRectTuLNNonReg.innerText.trim(); 
    let RectTuLNNonRegNumElement = document.getElementById('RectTuLNNonRegNum');

    if (RectTuLNNonRegValue === "suspektní") {
        RectTuLNNonRegNumElement.classList.remove('hidden');
    } else if (RectTuLNNonRegValue === "nesuspektní") {
        RectTuLNNonRegNumElement.classList.add('hidden');
    }
updateTexts();}


// Lymph node location

document.getElementById('RectTuLNRegLocation').addEventListener('focus', function() {
  document.getElementById('RectTuLNRegSelectLocation').classList.remove('hidden');
});
document.addEventListener('click', function(e) {
  const RectTuLNRegLocationElement = document.getElementById('RectTuLNRegLocation');
  const RectTuLNRegSelectLocationElement = document.getElementById('RectTuLNRegSelectLocation');
  if (!RectTuLNRegLocationElement.contains(e.target) && !RectTuLNRegSelectLocationElement.contains(e.target)) {
	RectTuLNRegSelectLocationElement.classList.add('hidden');
  }
});




// COPY

var copyFINAL = document.getElementById('copyFINAL');
var RectTuFinalText = document.getElementById('RectTuFinalText');

copyFINAL.addEventListener('click', function() {
	
    navigator.clipboard.writeText(RectTuFinalText.value)
    .then(() => {
        RectTuFinalText.classList.add('highlight');

        setTimeout(function() {
            RectTuFinalText.classList.remove('highlight');
        }, 100);
    })
    .catch(err => {
    });
});



var copyPOP = document.getElementById('copyPOP');
var RectTuPOPText = document.getElementById('RectTuPOPText');

copyPOP.addEventListener('click', function() {
    navigator.clipboard.writeText(RectTuPOPText.value)
    .then(() => {
        RectTuPOPText.classList.add('highlight');

        setTimeout(function() {
            RectTuPOPText.classList.remove('highlight');
        }, 100);
    })
    .catch(err => {
    });
});



var copyRES = document.getElementById('copyRES');
var RectTuRESText = document.getElementById('RectTuRESText');

copyRES.addEventListener('click', function() {
    navigator.clipboard.writeText(RectTuRESText.value)
    .then(() => {
        RectTuRESText.classList.add('highlight');

        setTimeout(function() {
            RectTuRESText.classList.remove('highlight');
        }, 100);
    })
    .catch(err => {
    });
});