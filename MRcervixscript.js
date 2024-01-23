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
