
// BUTTONS texts

function updateBackgroundColor(index, buttonElement, color1 = "transparent", color2 = "#D4A29C") {
  buttonElement.style.backgroundColor = index === 0 ? color1 : color2;
}

var textsCervixTuType = ["není", "exofytický", "infiltrativní", "endocervikální"];
var buttonElementCervixTuType = document.getElementById("CervixTuTypeButton");
var indexCervixTuType = 0;function cycleCervixTuTypeText(event) {  indexCervixTuType = cycleText(event, textsCervixTuType, indexCervixTuType, buttonElementCervixTuType);}
function cycleCervixTuTypeText(event) {  indexCervixTuType = cycleText(event, textsCervixTuType, indexCervixTuType, buttonElementCervixTuType, updateBackgroundColor);  updateTexts();}

var textsCervixTuInvasion = ["invaze <3mm", "invaze 3-5mm", "inv >5mm, vel <2cm", "velikost 2-4cm", "velikost >4cm"];
var buttonElementCervixTuInvasion = document.getElementById("CervixTuInvasionButton");
var indexCervixTuInvasion = 0;function cycleCervixTuInvasionText(event) {  indexCervixTuInvasion = cycleText(event, textsCervixTuInvasion, indexCervixTuInvasion, buttonElementCervixTuInvasion);}
function cycleCervixTuInvasionText(event) {  indexCervixTuInvasion = cycleText(event, textsCervixTuInvasion, indexCervixTuInvasion, buttonElementCervixTuInvasion, updateBackgroundColor);  updateTexts();}


// Lymph node location

document.getElementById('CervixLNRegLocation').addEventListener('focus', function() {
  document.getElementById('CervixLNRegSelectLocation').classList.remove('hidden');
});
document.addEventListener('click', function(e) {
  const CervixLNRegLocationElement = document.getElementById('CervixLNRegLocation');
  const CervixLNRegSelectLocationElement = document.getElementById('CervixLNRegSelectLocation');
  if (!CervixLNRegLocationElement.contains(e.target) && !CervixLNRegSelectLocationElement.contains(e.target)) {
	CervixLNRegSelectLocationElement.classList.add('hidden');
  }
});

// LN
var textsCervixLNReg = ["nesuspektní", "suspektní"];
var buttonElementCervixLNReg = document.getElementById("CervixLNRegButton");
var indexCervixLNReg = 0;function cycleCervixLNRegText(event) {  indexCervixLNReg = cycleText(event, textsCervixLNReg, indexCervixLNReg, buttonElementCervixLNReg);}
function cycleCervixLNRegText(event) {  indexCervixLNReg = cycleText(event, textsCervixLNReg, indexCervixLNReg, buttonElementCervixLNReg, updateBackgroundColor);  

let CervixLNRegValue = buttonElementCervixLNReg.innerText.trim(); 
    let CervixLNRegLocationElement = document.getElementById('CervixLNRegLocation');

    if (CervixLNRegValue === "suspektní") {
        CervixLNRegLocationElement.classList.remove('hidden');
    } else if (CervixLNRegValue === "nesuspektní") {
        CervixLNRegLocationElement.classList.add('hidden');
    }
updateTexts();}





// COPY

var copyFINAL = document.getElementById('copyFINAL');
var CervixTuFinalText = document.getElementById('CervixTuFinalText');

copyFINAL.addEventListener('click', function() {
	
    navigator.clipboard.writeText(CervixTuFinalText.value)
    .then(() => {
        CervixTuFinalText.classList.add('highlight');

        setTimeout(function() {
            CervixTuFinalText.classList.remove('highlight');
        }, 100);
    })
    .catch(err => {
    });
});



var copyPOP = document.getElementById('copyPOP');
var CervixTuPOPText = document.getElementById('CervixTuPOPText');

copyPOP.addEventListener('click', function() {
    navigator.clipboard.writeText(CervixTuPOPText.value)
    .then(() => {
        CervixTuPOPText.classList.add('highlight');

        setTimeout(function() {
            CervixTuPOPText.classList.remove('highlight');
        }, 100);
    })
    .catch(err => {
    });
});



var copyRES = document.getElementById('copyRES');
var CervixTuRESText = document.getElementById('CervixTuRESText');

copyRES.addEventListener('click', function() {
    navigator.clipboard.writeText(CervixTuRESText.value)
    .then(() => {
        CervixTuRESText.classList.add('highlight');

        setTimeout(function() {
            CervixTuRESText.classList.remove('highlight');
        }, 100);
    })
    .catch(err => {
    });
});
