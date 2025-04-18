// LESIONS (cloning)   --- doplnovat --- 

function cloneAndUpdateIds(sourceId, destId) {
    let sourceElement = document.getElementById(sourceId);
    let clonedElement = sourceElement.cloneNode(true);
    clonedElement.id = destId;

    let sourceNumber = sourceId.match(/\d+/); // Extracts number from sourceId (e.g., "1" from "Lesion1")
    let destNumber = destId.match(/\d+/); // Extracts number from destId (e.g., "2" from "Lesion2")

    let elements = clonedElement.querySelectorAll("*");
    
    elements.forEach(element => {
        if (element.id) {
            element.id = element.id.replace(`Lesion${sourceNumber}`, `Lesion${destNumber}`);
            element.id = element.id.replace(`Chb${sourceNumber}`, `Chb${destNumber}`);
            if (element.id.endsWith(`${destNumber}no`)) {
                element.textContent = `${destNumber}`;
            }
        }
    });

    sourceElement.parentNode.appendChild(clonedElement);
}

cloneAndUpdateIds("BrainLesion1", "BrainLesion2");
cloneAndUpdateIds("BrainLesion1selectLocation", "BrainLesion2selectLocation");
cloneAndUpdateIds("BrainLesion1selectSignal", "BrainLesion2selectSignal");

cloneAndUpdateIds("BrainLesion1", "BrainLesion3");
cloneAndUpdateIds("BrainLesion1selectLocation", "BrainLesion3selectLocation");
cloneAndUpdateIds("BrainLesion1selectSignal", "BrainLesion3selectSignal");



//button change color

function updateBackgroundColor(index, buttonElement, color1 = "transparent", color2 = "#D4A29C") {
  buttonElement.style.backgroundColor = index === 0 ? color1 : color2;
}

//button texts

var textsStrana = ["jakého?", "PRAVÉHO", "LEVÉHO"];

var textsWML = ["0", "ojedinělé", "sporadické", "vícečetné", "splývající"];
var textsGCA = ["0", "1", "2", "3"];
var textsMTA = ["0", "1", "2", "3", "4"];
var textsventricles = ["0", "↑", "↑↑", "↑↑↑"];
var newLesionV = document.getElementById("newLesionV");
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
var selectElementWMLLocation = document.getElementById("WMLLocation");
var buttonElementGCA = document.getElementById("GCAButton");
var buttonElementMTA = document.getElementById("MTAButton");
var buttonElementventricles = document.getElementById("ventriclesButton");
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
var indexMTA = 0; function cycleMTAText(event) {  indexMTA = cycleText(event, textsMTA, indexMTA, buttonElementMTA, updateBackgroundColor);  updateTexts();}
var indexventricles = 0;function cycleventriclesText(event) {  indexventricles = cycleText(event, textsventricles, indexventricles, buttonElementventricles, updateBackgroundColor);}
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


//hiding WML

document.getElementById('WMLLocation').addEventListener('focus', function() {
  var inputRect = this.getBoundingClientRect();
  var dropdown = document.getElementById('WMLselectLocation');
  dropdown.style.left = inputRect.left + 'px'; dropdown.style.top = inputRect.bottom + 2 + 'px'; dropdown.classList.remove('hidden');
});

document.addEventListener('click', function(e) {
  var dropdown = document.getElementById('WMLselectLocation');
  if (!document.getElementById('WMLLocation').contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.add('hidden');
  }
});


buttonElementWML.addEventListener("mousedown", function() {
    if(this.innerText === '0') {
       selectElementWMLLocation.classList.add('hidden'); 
    } else {
       selectElementWMLLocation.classList.remove('hidden');
    }
});

	

// Brainlesions hide

// new LESIONS

document.getElementById('BrainNewLesions').addEventListener('click', function() {
  var lesionIds = ['BrainLesion1', 'BrainLesion2', 'BrainLesion3'];

  for (var i = 0; i < lesionIds.length; i++) {
    var element = document.getElementById(lesionIds[i]);
    if (element.classList.contains('hidden')) {
      element.classList.remove('hidden');
      break; 
    }
  }
  updateBrainButtonColor();
});

document.getElementById('BrainNewLesions').addEventListener('contextmenu', function(event) {
  event.preventDefault();
  var lesionIds = ['BrainLesion3', 'BrainLesion2', 'BrainLesion1'];

  for (var i = 0; i < lesionIds.length; i++) {
    var element = document.getElementById(lesionIds[i]);
    if (!element.classList.contains('hidden')) {
      element.classList.add('hidden');
      break; 
    }
  }
  updateBrainButtonColor();
});


function updateBrainButtonColor() {
    var Brainlesions = ['BrainLesion1', 'BrainLesion2', 'BrainLesion3'];
    var Brainbutton = document.getElementById('BrainNewLesions');
    var isHidden = Brainlesions.every(function(id) {
        return document.getElementById(id).classList.contains('hidden');
    });

    if (isHidden) {
        Brainbutton.classList.remove('toggleColorRed');
    } else {
        Brainbutton.classList.add('toggleColorRed');
    }
}


document.getElementById('BrainLesion1no').addEventListener('click', function() {
  var element = document.getElementById('BrainLesion1');
  element.classList.add('hidden'); 
  updateTexts();
  updateBrainButtonColor();
});

document.getElementById('BrainLesion2no').addEventListener('click', function() {
  var element = document.getElementById('BrainLesion2');
  element.classList.add('hidden');
  updateTexts();
  updateBrainButtonColor();
});

document.getElementById('BrainLesion3no').addEventListener('click', function() {
  var element = document.getElementById('BrainLesion3');
  element.classList.add('hidden');
  updateTexts();
  updateBrainButtonColor();
});


// LESION1


document.getElementById('BrainLesion1no').addEventListener('click', function() {
  var element = document.getElementById('BrainLesion1');
  element.classList.add('hidden');
  updateTexts();
});

document.getElementById('BrainLesion1number').addEventListener('change', function() {
  let selectedValue = this.value;
  let BrainLesion1LoclargestElement = document.getElementById('BrainLesion1Loclargest');

  if (selectedValue !== "") {
    BrainLesion1LoclargestElement.classList.remove('hidden');
  } else {
    BrainLesion1LoclargestElement.classList.add('hidden');
  }
});

document.getElementById('BrainLesion1Location').addEventListener('focus', function() {
  var dropdown = document.getElementById('BrainLesion1selectLocation');
  var rect = this.getBoundingClientRect();
  dropdown.style.left = rect.left + 'px'; dropdown.style.top = rect.bottom + 2 + 'px'; dropdown.classList.remove('hidden');
});

document.addEventListener('click', function(e) {
  var dropdown = document.getElementById('BrainLesion1selectLocation');
  if (!document.getElementById('BrainLesion1Location').contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.add('hidden');
  }
});

document.getElementById('BrainLesion1Signal').addEventListener('focus', function() {
  var dropdown = document.getElementById('BrainLesion1selectSignal');
  var rect = this.getBoundingClientRect();
  dropdown.style.left = rect.left + 'px'; dropdown.style.top = rect.bottom + 2 + 'px'; dropdown.classList.remove('hidden');
});

document.addEventListener('click', function(e) {
  var dropdown = document.getElementById('BrainLesion1selectSignal');
  if (!document.getElementById('BrainLesion1Signal').contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.add('hidden');
  }
});

document.getElementById('BrainLesion1Decision').addEventListener('change', function() {
  var BrainLesion1RESDecision = document.getElementById('BrainLesion1Decision').value;
  if (BrainLesion1RESDecision.includes("meta") || BrainLesion1RESDecision.includes("tumor")) {
    document.getElementById('BrainLesion1BTRADS').classList.remove('hidden');
  } else {
    document.getElementById('BrainLesion1BTRADS').classList.add('hidden');
  }
});


document.getElementById('BrainLesion1BTGRADE').addEventListener('focus', function() {
  var dropdown = document.getElementById('BrainLesion1selectBTGRADE');
  var rect = this.getBoundingClientRect();
  dropdown.style.left = rect.left + 'px'; dropdown.style.top = rect.bottom + 2 + 'px'; dropdown.classList.remove('hidden');
});

document.addEventListener('click', function(e) {
	var dropdown = document.getElementById('BrainLesion1selectBTGRADE');
	var input = document.getElementById('BrainLesion1BTGRADE');
	if (input && !input.contains(e.target) && !dropdown.contains(e.target)) {
	  dropdown.classList.add('hidden');
	}
});


//LESION2

document.getElementById('BrainLesion2no').addEventListener('click', function() {
  var element = document.getElementById('BrainLesion2');
  element.classList.add('hidden');
  updateTexts();
});

document.getElementById('BrainLesion2number').addEventListener('change', function() {
  let selectedValue = this.value;
  let BrainLesion2LoclargestElement = document.getElementById('BrainLesion2Loclargest');

  if (selectedValue !== "") {
    BrainLesion2LoclargestElement.classList.remove('hidden');
  } else {
    BrainLesion2LoclargestElement.classList.add('hidden');
  }
});

document.getElementById('BrainLesion2Location').addEventListener('focus', function() {
  var dropdown = document.getElementById('BrainLesion2selectLocation');
  var rect = this.getBoundingClientRect();
  dropdown.style.left = rect.left + 'px'; dropdown.style.top = rect.bottom + 2 + 'px'; dropdown.classList.remove('hidden');
});

document.addEventListener('click', function(e) {
  var dropdown = document.getElementById('BrainLesion2selectLocation');
  if (!document.getElementById('BrainLesion2Location').contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.add('hidden');
  }
});

document.getElementById('BrainLesion2Signal').addEventListener('focus', function() {
  var dropdown = document.getElementById('BrainLesion2selectSignal');
  var rect = this.getBoundingClientRect();
  dropdown.style.left = rect.left + 'px'; dropdown.style.top = rect.bottom + 2 + 'px'; dropdown.classList.remove('hidden');
});

document.addEventListener('click', function(e) {
  var dropdown = document.getElementById('BrainLesion2selectSignal');
  if (!document.getElementById('BrainLesion2Signal').contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.add('hidden');
  }
});


//LESION3

document.getElementById('BrainLesion3no').addEventListener('click', function() {
  var element = document.getElementById('BrainLesion3');
  element.classList.add('hidden');
  updateTexts();
});

document.getElementById('BrainLesion3number').addEventListener('change', function() {
  let selectedValue = this.value;
  let BrainLesion3LoclargestElement = document.getElementById('BrainLesion3Loclargest');

  if (selectedValue !== "") {
    BrainLesion3LoclargestElement.classList.remove('hidden');
  } else {
    BrainLesion3LoclargestElement.classList.add('hidden');
  }
});

document.getElementById('BrainLesion3Location').addEventListener('focus', function() {
  var dropdown = document.getElementById('BrainLesion3selectLocation');
  var rect = this.getBoundingClientRect();
  dropdown.style.left = rect.left + 'px'; dropdown.style.top = rect.bottom + 2 + 'px'; dropdown.classList.remove('hidden');
});

document.addEventListener('click', function(e) {
  var dropdown = document.getElementById('BrainLesion3selectLocation');
  if (!document.getElementById('BrainLesion3Location').contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.add('hidden');
  }
});

document.getElementById('BrainLesion3Signal').addEventListener('focus', function() {
  var dropdown = document.getElementById('BrainLesion3selectSignal');
  var rect = this.getBoundingClientRect();
  dropdown.style.left = rect.left + 'px'; dropdown.style.top = rect.bottom + 2 + 'px'; dropdown.classList.remove('hidden');
});

document.addEventListener('click', function(e) {
  var dropdown = document.getElementById('BrainLesion3selectSignal');
  if (!document.getElementById('BrainLesion3Signal').contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.add('hidden');
  }
});


// compare older

function toggleElements() {
    var dateInput = document.getElementById('DateCompare');
	var BrainLesion1Previous = document.getElementById('BrainLesion1Previous'); var BrainLesion2Previous = document.getElementById('BrainLesion2Previous'); var BrainLesion3Previous = document.getElementById('BrainLesion3Previous'); 

    if (dateInput.value !== '') {
	  BrainLesion1Previous.classList.remove('hidden'); BrainLesion2Previous.classList.remove('hidden'); BrainLesion3Previous.classList.remove('hidden');
 } else {
	  BrainLesion1Previous.classList.add('hidden'); BrainLesion2Previous.classList.add('hidden'); BrainLesion3Previous.classList.add('hidden');
	 }
  }


//LesionV unhiding

document.getElementById('BrainNewOther1').addEventListener('click', function() {
  var element = document.getElementById('BrainOther1');
  element.classList.remove('hidden');  this.classList.add('toggleColorRed');
  updateTexts();
});

document.getElementById('BrainNewOther1').addEventListener('contextmenu', function(event) {
  event.preventDefault(); 
  var element = document.getElementById('BrainOther1');
  element.classList.add('hidden');  this.classList.remove('toggleColorRed');
  updateTexts();
});

document.getElementById('BrainOther1no').addEventListener('click', function() {
  var element = document.getElementById('BrainOther1');
  element.classList.add('hidden');
  var button = document.getElementById('BrainNewOther1');
  button.classList.remove('toggleColorRed');
  updateTexts();
});



// universal size

function formatLesionSize(variableName) {
  var elementValue = document.getElementById(variableName).value;
  if (elementValue !== "") {
    if (/^\d+$/.test(elementValue)) { 
      return "diametru " + elementValue + " mm";
    } else { 
      return "rozměru " + elementValue + " mm";
    }
  }
  return "";
}


// Lesion aktivita   
  
var aktivitaOptions = [
    { text: "není", value: "bez akumulace RF", valuez1: "bez PSMA exprese", valuez2: "ametabolické"},
    { text: "nízká", value: "s nízkou akumulací RF", valuez1: "s nízkou PSMA expresí", valuez2: "nízce metabolicky aktivní "},
    { text: "intermed.", value: "se střední akumulací RF", valuez1: "se střední PSMA expresí", valuez2: "středně metabolicky aktivní "},
    { text: "zvýšená", value: "se zvýšenou akumulací RF", valuez1: "se zvýšenou PSMA expresí", valuez2: "mírně hypermetabolické "},
    { text: "vysoká", value: "s vysokou akumulací RF", valuez1: "s vysokou PSMA expresí", valuez2: "hypermetabolické "},
	{ text: "enormní", value: "s velmi vysokou akumulací RF", valuez1: "s vysokou PSMA expresí", valuez2: "výrazně hypermetabolické "}
];

function populateAktivitaOptions() {
    var selectElements = document.querySelectorAll("select[id$='Activity']");

    selectElements.forEach(function (selectElement) {
        aktivitaOptions.forEach(function (option) {
            var optionElement = document.createElement("option");
            optionElement.value = option.value;
            optionElement.textContent = option.text;
            optionElement.dataset.valuez1 = option.valuez1;
			optionElement.dataset.valuez2 = option.valuez2;
            selectElement.appendChild(optionElement);
        });
    });
}

populateAktivitaOptions();



// Lesion hodnoceni

var hodnoceniOptions = [
    { text: "tumor", value: ": charakteru tumoru", valuez1: ": benigního vzhledu"},
    { text: "meta", value: ": charakteru meta", valuez1: ": v.s. zánětlivá aktivace"},
    { text: "arach.cysta", value: ": charakteru arach.c.", valuez1: ": nespecifický nález"},
    { text: "pseudocysta", value: ": charakteru pseudoc.", valuez1: ": suspektní z infiltrace neoplazií"},
	{ text: "resekce", value: ": po resekci", valuez1: ": po resekci"},
    { text: "meningeom", value:": charakteru meningeomu", valuez1: ": charakteru infiltrace neoplazií"},
	{ text: "ischemie", value:": charakteru ischemie", valuez1: ": charakteru ischemie"}
];

function populateHodnoceniOptions() {
    var selectElements = document.querySelectorAll("select[id$='Decision']");

    selectElements.forEach(function (selectElement) {
        hodnoceniOptions.forEach(function (option) {
            var optionElement = document.createElement("option");
            optionElement.value = option.value;
            optionElement.textContent = option.text;
            optionElement.dataset.valuez1 = option.valuez1;
            selectElement.appendChild(optionElement);
        });
    });
}
populateHodnoceniOptions();


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


//BTRADS

    const inputField = document.getElementById('BrainLesion1BTGRADE');

    inputField.addEventListener('click', resetBrainLesion1DecisionTree);

    function resetBrainLesion1DecisionTree() {
        inputField.value = '';
        document.querySelectorAll('#BrainLesion1selectBTGRADE tr').forEach(row => {
            row.style.display = 'none';
        });
        document.getElementById('step1').style.display = 'table-row';
    }

    function step1Handler(value) {
        document.getElementById('step1').style.display = 'none';
        if (value === 'No') {
            inputField.value = 'BT-RADS 0: Baseline, no significant findings';
        } else {
            document.getElementById('step2').style.display = 'table-row';
        }
    }

    function step2Handler(value) {
        document.getElementById('step2').style.display = 'none';
        if (value === 'Improved') {
            document.getElementById('step3').style.display = 'table-row';
        } else if (value === 'Unchanged') {
            inputField.value = 'BT-RADS 2: Stable';
        } else if (value === 'Worse') {
            document.getElementById('step5').style.display = 'table-row';
        }
    }

    function step3Handler(value) {
        document.getElementById('step3').style.display = 'none';
        if (value === 'None') {
            inputField.value = 'BT-RADS 1a: Improved';
        } else if (value === 'Avastin') {
            document.getElementById('step4').style.display = 'table-row';
        } else if (value === 'Increasing steroids') {
            inputField.value = 'BT-RADS 1b: Possible medication effect';
        }
    }

    function step4Handler(value) {
        document.getElementById('step4').style.display = 'none';
        if (value === 'Sustained improvement') {
            inputField.value = 'BT-RADS 1a: Improved';
        } else if (value === 'First study on Avastin') {
            inputField.value = 'BT-RADS 1b: Possible medication effect';
        }
    }

    function step5Handler(value) {
        document.getElementById('step5').style.display = 'none';
        if (value === '< 90 days') {
            inputField.value = 'BT-RADS 3a: Favor treatment (early post-XRT)';
        } else {
            document.getElementById('step6').style.display = 'table-row';
        }
    }

    function step6Handler(value) {
        document.getElementById('step6').style.display = 'none';
        if (value === 'FLAIR and ENH') {
            document.getElementById('step7').style.display = 'table-row';
        } else if (value === 'FLAIR or ENH') {
            inputField.value = 'BT-RADS 3b: Indeterminate';
        }
    }

    function step7Handler(value) {
        document.getElementById('step7').style.display = 'none';
        if (value === '> 25% increase') {
            inputField.value = 'BT-RADS 4: Highly suspicious';
        } else if (value === '< 25% increase') {
            document.getElementById('step8').style.display = 'table-row';
        }
    }

    function step8Handler(value) {
        document.getElementById('step8').style.display = 'none';
        if (value === 'Yes') {
            inputField.value = 'BT-RADS 4: Highly suspicious';
        } else if (value === 'No') {
            inputField.value = 'BT-RADS 3c: Favor tumor';
        }
    }