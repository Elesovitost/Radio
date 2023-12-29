// checkbox clickable by right mouse

const checkboxes = document.querySelectorAll('.CHB input[type="checkbox"]');
checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        updateTexts();
    });
    checkbox.parentElement.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        checkbox.checked = !checkbox.checked;
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

// AUTOCOMPLETE OFF

window.onload = function() {
  var inputs = document.getElementsByTagName('input');
  for(var i = 0; i < inputs.length; i++) {
    inputs[i].setAttribute('autocomplete', 'off');
  }

  var textareas = document.getElementsByTagName('textarea');
  for(var i = 0; i < textareas.length; i++) {
    textareas[i].setAttribute('autocomplete', 'off');
  }
};

//BUTTONS ANIMATIONS
	var buttonsLEZE = document.querySelectorAll('.myButton20');
    	buttonsLEZE.forEach(function(button) {
      button.addEventListener('click', function() {
        this.classList.add('animate-rotate');
        setTimeout(() => this.classList.remove('animate-rotate'), 500);
		this.classList.toggle('clicked');
      });
    });

//button cycling

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

var textsStrana = ["jakého?", "PRAVÉHO", "LEVÉHO"];

var textsWML = ["0", "ojedinělé", "sporadické", "vícečetné", "splývající"];
var textsGCA = ["0", "1", "2", "3"];
var textsventricles = ["0", "↑", "↑↑", "↑↑↑"];
var newLesion1 = document.getElementById("newLesion1");
var newLesion2 = document.getElementById("newLesion2");
var newLesionV = document.getElementById("newLesionV");
var textsLesion1enhancement = ["?", "0", "↑", "↑↑", "↑↑↑"];
var textsLesion2enhancement = ["?", "0", "↑", "↑↑", "↑↑↑"];
var textsMMKR = ["0", "ložisko", "konflikt"];
var textsMMKL = ["0", "ložisko", "konflikt"];

var textsMastoidR = ["0", "↑", "↑↑"];
var textsMastoidL = ["0", "↑", "↑↑"];
var textsFrontalR = ["0", "cysta", "polyp", "hyper↑", "hyper↑↑", "tekutina"];
var textsFrontalL = ["0", "cysta", "polyp", "hyper↑", "hyper↑↑", "tekutina"];
var textsMaxillarR = ["0", "cysta", "polyp", "hyper↑", "hyper↑↑", "tekutina"];
var textsMaxillarL = ["0", "cysta", "polyp", "hyper↑", "hyper↑↑", "tekutina"];
var textsEthmoidR = ["0", "cysta", "polyp", "hyper↑", "hyper↑↑", "tekutina"];
var textsEthmoidL = ["0", "cysta", "polyp", "hyper↑", "hyper↑↑", "tekutina"];
var textsSphenoidR = ["0", "cysta", "polyp", "hyper↑", "hyper↑↑", "tekutina"];
var textsSphenoidL = ["0", "cysta", "polyp", "hyper↑", "hyper↑↑", "tekutina"];
var textsOrbitR = ["0", "čočka", "enukl"];
var textsOrbitL = ["0", "čočka", "enukl"];



var buttonElementStrana = document.getElementById("StranaButton");

var buttonElementWML = document.getElementById("WMLButton");
var selectElementWMLkde = document.getElementById("WMLkde");
var buttonElementGCA = document.getElementById("GCAButton");
var buttonElementventricles = document.getElementById("ventriclesButton");
var buttonElementLesion1enhancement = document.getElementById("Lesion1enhancementButton");
var buttonElementLesion2enhancement = document.getElementById("Lesion2enhancementButton");
var buttonElementMMKR = document.getElementById("MMKRButton");
var buttonElementMMKL = document.getElementById("MMKLButton");

var buttonElementMastoidR = document.getElementById("MastoidRButton");
var buttonElementMastoidL = document.getElementById("MastoidLButton");
var buttonElementFrontalR = document.getElementById("FrontalRButton");
var buttonElementFrontalL = document.getElementById("FrontalLButton");
var buttonElementMaxillarR = document.getElementById("MaxillarRButton");
var buttonElementMaxillarL = document.getElementById("MaxillarLButton");
var buttonElementEthmoidR = document.getElementById("EthmoidRButton");
var buttonElementEthmoidL = document.getElementById("EthmoidLButton");
var buttonElementSphenoidR = document.getElementById("SphenoidRButton");
var buttonElementSphenoidL = document.getElementById("SphenoidLButton");
var buttonElementOrbitR = document.getElementById("OrbitRButton");
var buttonElementOrbitL = document.getElementById("OrbitLButton");


var indexStrana = 0;function cycleStranaText(event) {  indexStrana = cycleText(event, textsStrana, indexStrana, buttonElementStrana, updateBackgroundColor);}

var indexWML = 0;function cycleWMLText(event) {  indexWML = cycleText(event, textsWML, indexWML, buttonElementWML, updateBackgroundColor);}
var indexGCA = 0;function cycleGCAText(event) {  indexGCA = cycleText(event, textsGCA, indexGCA, buttonElementGCA, updateBackgroundColor);}
var indexventricles = 0;function cycleventriclesText(event) {  indexventricles = cycleText(event, textsventricles, indexventricles, buttonElementventricles, updateBackgroundColor);}
var indexLesion1enhancement = 0;function cycleLesion1enhancementText(event) {  indexLesion1enhancement = cycleText(event, textsLesion1enhancement, indexLesion1enhancement, buttonElementLesion1enhancement, updateBackgroundColor);}
var indexLesion2enhancement = 0;function cycleLesion2enhancementText(event) {  indexLesion2enhancement = cycleText(event, textsLesion2enhancement, indexLesion2enhancement, buttonElementLesion2enhancement, updateBackgroundColor);}
var indexMMKR = 0;function cycleMMKRText(event) {  indexMMKR = cycleText(event, textsMMKR, indexMMKR, buttonElementMMKR, updateBackgroundColor);}
var indexMMKL = 0;function cycleMMKLText(event) {  indexMMKL = cycleText(event, textsMMKL, indexMMKL, buttonElementMMKL, updateBackgroundColor);}

var indexMastoidR = 0;function cycleMastoidRText(event) {    indexMastoidR = cycleText(event, textsMastoidR, indexMastoidR, buttonElementMastoidR, updateBackgroundColor);    updateTexts();}
var indexMastoidL = 0;function cycleMastoidLText(event) {    indexMastoidL = cycleText(event, textsMastoidL, indexMastoidL, buttonElementMastoidL, updateBackgroundColor);    updateTexts();}
var indexFrontalR = 0;function cycleFrontalRText(event) {    indexFrontalR = cycleText(event, textsFrontalR, indexFrontalR, buttonElementFrontalR, updateBackgroundColor);    updateTexts();}
var indexFrontalL = 0;function cycleFrontalLText(event) {    indexFrontalL = cycleText(event, textsFrontalL, indexFrontalL, buttonElementFrontalL, updateBackgroundColor);    updateTexts();}
var indexMaxillarR = 0;function cycleMaxillarRText(event) {    indexMaxillarR = cycleText(event, textsMaxillarR, indexMaxillarR, buttonElementMaxillarR, updateBackgroundColor);    updateTexts();}
var indexMaxillarL = 0;function cycleMaxillarLText(event) {    indexMaxillarL = cycleText(event, textsMaxillarL, indexMaxillarL, buttonElementMaxillarL, updateBackgroundColor);    updateTexts();}
var indexEthmoidR = 0;function cycleEthmoidRText(event) {    indexEthmoidR = cycleText(event, textsEthmoidR, indexEthmoidR, buttonElementEthmoidR, updateBackgroundColor);    updateTexts();}
var indexEthmoidL = 0;function cycleEthmoidLText(event) {    indexEthmoidL = cycleText(event, textsEthmoidL, indexEthmoidL, buttonElementEthmoidL, updateBackgroundColor);    updateTexts();}
var indexSphenoidR = 0;function cycleSphenoidRText(event) {    indexSphenoidR = cycleText(event, textsSphenoidR, indexSphenoidR, buttonElementSphenoidR, updateBackgroundColor);    updateTexts();}
var indexSphenoidL = 0;function cycleSphenoidLText(event) {    indexSphenoidL = cycleText(event, textsSphenoidL, indexSphenoidL, buttonElementSphenoidL, updateBackgroundColor);    updateTexts();}
var indexOrbitR = 0;function cycleOrbitRText(event) {    indexOrbitR = cycleText(event, textsOrbitR, indexOrbitR, buttonElementOrbitR, updateBackgroundColor);    updateTexts();}
var indexOrbitL = 0;function cycleOrbitLText(event) {    indexOrbitL = cycleText(event, textsOrbitL, indexOrbitL, buttonElementOrbitL, updateBackgroundColor);    updateTexts();}



function updateTextAndCycleText(event, texts, index, buttonElement, cycleFunc) {  cycleFunc(event);  updateTexts();}

function cycleStranaText(event) {  indexStrana = cycleText(event, textsStrana, indexStrana, buttonElementStrana);  updateTexts();}

function cycleWMLText(event) {  indexWML = cycleText(event, textsWML, indexWML, buttonElementWML, updateBackgroundColor);  updateTexts();}
function cycleGCAText(event) {  indexGCA = cycleText(event, textsGCA, indexGCA, buttonElementGCA, updateBackgroundColor);  updateTexts();}
function cycleventriclesText(event) {  indexventricles = cycleText(event, textsventricles, indexventricles, buttonElementventricles, updateBackgroundColor);  updateTexts();}
function cycleLesion1enhancementText(event) {  indexLesion1enhancement = cycleText(event, textsLesion1enhancement, indexLesion1enhancement, buttonElementLesion1enhancement, updateBackgroundColor);  updateTexts();}
function cycleLesion2enhancementText(event) {  indexLesion2enhancement = cycleText(event, textsLesion2enhancement, indexLesion2enhancement, buttonElementLesion2enhancement, updateBackgroundColor);  updateTexts();}
function cycleMMKRText(event) {  indexMMKR = cycleText(event, textsMMKR, indexMMKR, buttonElementMMKR, updateBackgroundColor);  updateTexts();}
function cycleMMKLText(event) {  indexMMKL = cycleText(event, textsMMKL, indexMMKL, buttonElementMMKL, updateBackgroundColor);  updateTexts();}

function cycleMastoidRText(event) {    indexMastoidR = cycleText(event, textsMastoidR, indexMastoidR, buttonElementMastoidR, updateBackgroundColor);    updateTexts();}
function cycleMastoidLText(event) {    indexMastoidL = cycleText(event, textsMastoidL, indexMastoidL, buttonElementMastoidL, updateBackgroundColor);    updateTexts();}
function cycleFrontalRText(event) {    indexFrontalR = cycleText(event, textsFrontalR, indexFrontalR, buttonElementFrontalR, updateBackgroundColor);    updateTexts();}
function cycleFrontalLText(event) {    indexFrontalL = cycleText(event, textsFrontalL, indexFrontalL, buttonElementFrontalL, updateBackgroundColor);    updateTexts();}
function cycleMaxillarRText(event) {    indexMaxillarR = cycleText(event, textsMaxillarR, indexMaxillarR, buttonElementMaxillarR, updateBackgroundColor);    updateTexts();}
function cycleMaxillarLText(event) {    indexMaxillarL = cycleText(event, textsMaxillarL, indexMaxillarL, buttonElementMaxillarL, updateBackgroundColor);    updateTexts();}
function cycleEthmoidRText(event) {    indexEthmoidR = cycleText(event, textsEthmoidR, indexEthmoidR, buttonElementEthmoidR, updateBackgroundColor);    updateTexts();}
function cycleEthmoidLText(event) {    indexEthmoidL = cycleText(event, textsEthmoidL, indexEthmoidL, buttonElementEthmoidL, updateBackgroundColor);    updateTexts();}
function cycleSphenoidRText(event) {    indexSphenoidR = cycleText(event, textsSphenoidR, indexSphenoidR, buttonElementSphenoidR, updateBackgroundColor);    updateTexts();}
function cycleSphenoidLText(event) {    indexSphenoidL = cycleText(event, textsSphenoidL, indexSphenoidL, buttonElementSphenoidL, updateBackgroundColor);    updateTexts();}
function cycleOrbitRText(event) {    indexOrbitR = cycleText(event, textsOrbitR, indexOrbitR, buttonElementOrbitR, updateBackgroundColor);    updateTexts();}
function cycleOrbitLText(event) {    indexOrbitL = cycleText(event, textsOrbitL, indexOrbitL, buttonElementOrbitL, updateBackgroundColor);    updateTexts();}


//hiding 
document.getElementById('WMLkde').addEventListener('focus', function() {
  document.getElementById('WMLLokace').classList.remove('hidden');
});
document.addEventListener('click', function(e) {
  const WMLkdeElement = document.getElementById('WMLkde');
  const WMLLokaceElement = document.getElementById('WMLLokace');
  if (!WMLkdeElement.contains(e.target) && !WMLLokaceElement.contains(e.target)) {
	WMLLokaceElement.classList.add('hidden');
  }
});


buttonElementWML.addEventListener("mousedown", function() {
    if(this.innerText === '0') {
       selectElementWMLkde.classList.add('hidden'); 
    } else {
       selectElementWMLkde.classList.remove('hidden');
    }
});

newLesion1.addEventListener("click", function() {
    Lozisko1content.classList.toggle("hidden");
    });
	
newLesion2.addEventListener("click", function() {
    Lozisko2content.classList.toggle("hidden");
    });
	
newLesionV.addEventListener("click", function() {
    LesionVcontent.classList.toggle("hidden");
    });

// COPY

var copyfinal = document.getElementById('copyfinal');
var FINALText = document.getElementById('FINALText');

copyfinal.addEventListener('click', function() {
    navigator.clipboard.writeText(FINALText.value)
    .then(() => {
        FINALText.classList.add('highlight');

        setTimeout(function() {
            FINALText.classList.remove('highlight');
        }, 100);
    })
    .catch(err => {
    });
});



