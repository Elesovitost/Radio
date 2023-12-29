// BUTTONS CYCLING

function cycleText(event, texts, index, buttonElement, callback) {
    event.preventDefault(); // Add this line to prevent the default action (context menu in this case)

    if (event.button === 0) {
        if (index === texts.length - 1) {
            index = texts.length - 1;
        } else {
            index = (index + 1) % texts.length;
        }
    } else if (event.button === 2) {
        if (index === 0) {
            index = 0;
        } else {
            index = (index - 1 + texts.length) % texts.length;
        }
    }

    buttonElement.innerText = texts[index];
    buttonElement.value = texts[index];
    if (callback) callback(index, buttonElement);
    return index;
}


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


// Chb clickable by right mouse

const ChbesFromCHB = document.querySelectorAll('.CHB input[type="checkbox"]');
const Chb1 = document.querySelector('#Chb1');
const allChbes = [...ChbesFromCHB];

if (Chb1) {
    allChbes.push(Chb1);
}

allChbes.forEach(function(Chb) {
    Chb.parentElement.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        Chb.checked = !Chb.checked;
        updateTexts(); 
    });
});

// buttons clickable by right mouse

var buttons = document.getElementsByTagName("button");

for (var i = 0; i < buttons.length; i++) {
    // Add 'contextmenu' event to each button
    buttons[i].addEventListener("contextmenu", function(e){
        // Prevent the default context menu from showing up
        e.preventDefault();
    });
}


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



// NUMBERS MOUSE WHEELING

window.addEventListener('load', function() {
    var numberInputs = document.getElementsByClassName("numbers");
    for (var i = 0; i < numberInputs.length; i++) {
        numberInputs[i].addEventListener('wheel', function(e) {
            if (this.value === "") {
                this.value = 0;
            }
            e.preventDefault(); // Prevents the browser from scrolling while changing the number
            if (e.deltaY < 0) {
                this.stepUp(); 
            } else {
                this.stepDown(); 
            }
            var event = new Event('input');
            this.dispatchEvent(event);
        });
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