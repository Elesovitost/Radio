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
var textsKoedam = ["0", "1", "2", "3"];
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
var buttonElementKoedam = document.getElementById("KoedamButton");
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
var indexKoedam = 0; function cycleKoedamText(event) {  indexKoedam = cycleText(event, textsKoedam, indexKoedam, buttonElementKoedam, updateBackgroundColor);  updateTexts();}
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

	

// Nadpis



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

document.getElementById('BrainLesion1Decision').addEventListener('change', function () {
  const select = document.getElementById('BrainLesion1Decision');
  const selectedText = select.options[select.selectedIndex].text.toLowerCase();

  if (
    selectedText.includes("meta") ||
    selectedText.includes("tumor") ||
    selectedText.includes("po rt")
  ) {
    document.getElementById('BrainLesion1BTRADS').classList.remove('hidden');
  } else {
    document.getElementById('BrainLesion1BTRADS').classList.add('hidden');
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

document.getElementById('BrainLesion2Decision').addEventListener('change', function () {
  const select = document.getElementById('BrainLesion2Decision');
  const selectedText = select.options[select.selectedIndex].text.toLowerCase();

  if (
    selectedText.includes("meta") ||
    selectedText.includes("tumor") ||
    selectedText.includes("po rt")
  ) {
    document.getElementById('BrainLesion2BTRADS').classList.remove('hidden');
  } else {
    document.getElementById('BrainLesion2BTRADS').classList.add('hidden');
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

document.getElementById('BrainLesion3Decision').addEventListener('change', function () {
  const select = document.getElementById('BrainLesion3Decision');
  const selectedText = select.options[select.selectedIndex].text.toLowerCase();

  if (
    selectedText.includes("meta") ||
    selectedText.includes("tumor") ||
    selectedText.includes("po rt")
  ) {
    document.getElementById('BrainLesion3BTRADS').classList.remove('hidden');
  } else {
    document.getElementById('BrainLesion3BTRADS').classList.add('hidden');
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
function adjustFDOPAActivityValues() {
  const PETselect = document.getElementById("PETselect").value;

  if (PETselect === "FDOPA") {
    aktivitaOptions.forEach((option) => {
      if (option.text === "nízká") {
        option.value = "s akumulací RF pod úrovní kontralaterálního striata";
      } else if (option.text === "intermed.") {
        option.value = "s akumulací RF na úrovni kontralaterálního striata";
      } else if (option.text === "zvýšená") {
        option.value = "s akumulací RF nad úrovní kontralaterálního striata";
      }
    });
  }
}

adjustFDOPAActivityValues();
  
var aktivitaOptions = [
    { text: "není", value: "bez akumulace RF", valuez1: "bez patrné utilizace FDOPA", valuez2: "ametabolické"},
    { text: "nízká", value: "s nízkou akumulací RF", valuez1: "s nízkou utilizací FDOPA", valuez2: "nízce metabolicky aktivní "},
    { text: "intermed.", value: "se střední akumulací RF", valuez1: "se střední utilizací FDOPA", valuez2: "středně metabolicky aktivní "},
    { text: "zvýšená", value: "se zvýšenou akumulací RF", valuez1: "se zvýšenou utilizací FDOPA", valuez2: "mírně hypermetabolické "},
    { text: "vysoká", value: "s vysokou akumulací RF", valuez1: "s vysokou utilizací FDOPA", valuez2: "hypermetabolické "},
	{ text: "enormní", value: "s velmi vysokou akumulací RF", valuez1: "s vysokou utilizací FDOPA", valuez2: "výrazně hypermetabolické "}
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
	{ text: "meningeom", value:": charakteru meningeomu", valuez1: ": charakteru infiltrace neoplazií"},
	{ text: "kavernom", value:": charakteru kavernomu", valuez1: ": charakteru kavernomu"},
	{ text: "DVA", value:": charakteru DVA", valuez1: ": charakteru DVA"},
	{ text: " ", value: "", valueRPH: "", separator: true },
    { text: "arach.cysta", value: ": charakteru arach.c.", valuez1: ": nespecifický nález"},
    { text: "pseudocysta", value: ": charakteru pseudoc.", valuez1: ": suspektní z infiltrace neoplazií"},
	{ text: "resekce", value: ": po resekci", valuez1: ": po resekci"},
	{ text: " ", value: "", valueRPH: "", separator: true },
	{ text: "ischemie akut.", value:": charakteru (sub)akutní ischemie", valuez1: ": charakteru ischemie"},
	{ text: "ischemie chron.", value:": charakteru chron. ischemie", valuez1: ": charakteru ischemie"},
	{ text: "po RT", value: ": charakteru poradiační nekrózy", valuez1: ""},
];

function populateHodnoceniOptions() {
    var selectElements = document.querySelectorAll("select[id$='Decision']");

    selectElements.forEach(function (selectElement) {
        hodnoceniOptions.forEach(function (option) {
            var optionElement = document.createElement("option");
            optionElement.textContent = option.text;

            if (option.separator) {
                optionElement.disabled = true;
                optionElement.value = ""; 
                optionElement.style.fontStyle = "italic";
                optionElement.style.color = "#888";
            } else {
                optionElement.value = option.value;
                optionElement.dataset.valueRPH = option.valueRPH;
            }

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

(function () {
  function initBTRADS(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;

    const container = input.parentElement;
    const originalPlaceholder = input.placeholder;
    const lesionId = inputId.replace('BTGRADE', ''); // např. “BrainLesion1”
    const globalVarName = lesionId + '_BTRADS';

    function clearButtons() {
      container.querySelectorAll('.btrads-btn').forEach(btn => btn.remove());
    }

    function finish(result) {
      clearButtons();
      input.value = result;
      input.placeholder = originalPlaceholder;
      window[globalVarName] = result;
      const event = new Event('btradsChanged');
      input.dispatchEvent(event);
      updateTexts();
    }

    function showQuestion(text, answers) {
      clearButtons();
      input.value = '';
      input.placeholder = text;
      answers.forEach(ans => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = ans;
        btn.className = 'btrads-btn';
        container.appendChild(btn);
        btn.addEventListener('click', () => onAnswer(text, ans));
      });
    }

    function onAnswer(question, answer) {
      switch (question) {
        case 'Máte k dispozici vhodné předchozí vyšetření?':
          if (answer === 'Ne') finish('BT-0: Výchozí vyšetření bez srovnání.');
          else askImaging();
          break;

        case 'Nález na zobrazovacích studiích?':
          if (answer === 'Zlepšení') askMedication();
          else if (answer === 'Beze změny') finish('BT-2: Nález je stabilní bez zjevné progrese.');
          else if (answer === 'Zhoršení') askTimeSinceRT();
          break;

        case 'Léčba?':
          if (answer === 'Žádná') finish('BT-1a: Zlepšení bez aktivní léčby – pravděpodobná regrese.');
          else finish('BT-1b: Zlepšení při léčbě – možné vlivem medikace.');
          break;

        case 'Čas od radioterapie (RT)?':
          if (answer === '< 90 dní') finish('BT-3a: Zhoršení krátce po radioterapii – spíše léčebná odpověď.');
          else askWhatIsWorse();
          break;

        case 'Co je horší – FLAIR nebo ENH nebo obojí?':
          if (answer === 'FLAIR nebo ENH') finish('BT-3b: Nejednoznačný obraz – zhoršení jednoho parametru.');
          else if (answer === 'FLAIR a ENH') askPercentIncrease();
          break;

        case 'Jak velké zhoršení?':
          if (answer === '< 25 %') finish('BT-3b: Nejednoznačný obraz s mírnou progresí – smíšený typ.');
          else askProgressive();
          break;

        case 'Je to progresivní (horší ve více než 2 studiích)?':
          if (answer === 'Ano') finish('BT-4: Vysoce suspektní pro progresi nádoru.');
          else finish('BT-3c: První výskyt zhoršení – spíše nádorová aktivita.');
          break;
      }
    }

    function askSuitablePrior() {
      showQuestion('Máte k dispozici vhodné předchozí vyšetření?', ['Ne', 'Ano']);
    }
    function askImaging() {
      showQuestion('Nález na zobrazovacích studiích?', ['Zlepšení', 'Beze změny', 'Zhoršení']);
    }
    function askMedication() {
      showQuestion('Léčba?', ['Žádná', 'Avastin', 'Zvyšování steroidů']);
    }
    function askTimeSinceRT() {
      showQuestion('Čas od radioterapie (RT)?', ['< 90 dní', '> 90 dní']);
    }
    function askWhatIsWorse() {
      showQuestion(
        'Co je horší – FLAIR nebo ENH nebo obojí?',
        ['FLAIR nebo ENH', 'FLAIR a ENH']
      );
    }
    function askPercentIncrease() {
      showQuestion('Jak velké zhoršení?', ['< 25 %', '> 25 %']);
    }
    function askProgressive() {
      showQuestion(
        'Je to progresivní (horší ve více než 2 studiích)?',
        ['Ano', 'Ne']
      );
    }

    input.addEventListener('click', askSuitablePrior);
  }

  ['1', '2', '3'].forEach(n => initBTRADS(`BrainLesion${n}BTGRADE`));
})();


// dodělat +sekvence, ostatní, více ložisek, ischemii, RS zvlášť

var obecnetext = document.getElementById("obecnetext");
var WMtext = document.getElementById("WMtext");
var MKtext = document.getElementById("MKtext");
var LKtext = document.getElementById("LKtext");



function updateTexts() {

const PETselect = document.getElementById("PETselect").value;

var indikace = document.getElementById("indikace").value;

const WMLText = buttonElementWML.innerText;
var WMLLocationText = document.getElementById("WMLLocation").value;
var RSP = ""; var RSR = ""; var checkboxRS = document.getElementById('checkboxRS');
var checkboxNoEnh = document.getElementById('checkboxNoEnh');

const GCAText = buttonElementGCA.innerText;
const MTAText = document.getElementById("MTAButton").innerText;
const KoedamText = document.getElementById("KoedamButton").innerText;
var lobaratrophy = document.getElementById("lobaratrophy").value; 
const ventriclesText = buttonElementventricles.innerText;

const MMKRText = buttonElementMMKR.innerText;
const MMKLText = buttonElementMMKL.innerText;

var LesionVP = document.getElementById("LesionVP").value;
var LesionVR = document.getElementById("LesionVR").value;

var Pituitary = document.getElementById("Pituitary").value; 
var Pineal = document.getElementById("Pineal").value; 

const MastoidRText = buttonElementMastoidR.innerText;
const MastoidLText = buttonElementMastoidL.innerText;
const FrontalRText = buttonElementFrontalR.innerText;
const FrontalLText = buttonElementFrontalL.innerText;
const MaxillarRText = buttonElementMaxillarR.innerText;
const MaxillarLText = buttonElementMaxillarL.innerText;
const EthmoidRText = buttonElementEthmoidR.innerText;
const EthmoidLText = buttonElementEthmoidL.innerText;
const SphenoidRText = buttonElementSphenoidR.innerText;
const SphenoidLText = buttonElementSphenoidL.innerText;
const OrbitRText = buttonElementOrbitR.innerText;
const OrbitLText = buttonElementOrbitL.innerText;

//Date
let DateCompare = document.getElementById("DateCompare").value; 
let date = new Date(DateCompare); let day = String(date.getDate()).padStart(2, '0'); let month = String(date.getMonth() + 1).padStart(2, '0'); let year = date.getFullYear(); let DateComparison = day + "." + month + "." + year + " ";

// checking if the current date is not chosen else popup
function showDatePopup() {
    var popup = document.getElementById('popupMessageDate');
    var dateInput = document.getElementById('DateCompare');

    var inputRect = dateInput.getBoundingClientRect();
    var topPosition = inputRect.bottom + window.scrollY + 5; // Position below the input
    var leftPosition = inputRect.left + window.scrollX;

    popup.textContent = "Pozor, datum současné"; 
    popup.style.top = topPosition + 'px';
    popup.style.left = leftPosition + 'px';
    popup.style.display = 'block';

    setTimeout(() => {
        popup.style.display = 'none';
    }, 2000); // Hide after 1 second
}

document.getElementById('DateCompare').addEventListener('change', function() {
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    let selectedDate = new Date(this.value);
    let timeDifference = Math.abs(currentDate - selectedDate);
    let dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (dayDifference <= 7) {
        showDatePopup();
    }
});

// universal comparison

function generateComparisonText(prevSize, date) {
    if (prevSize.includes(" 0 ")) {
        return " (nově)";
    } else if (prevSize.trim() !== "") {
        return " (minule " + prevSize + ")";
    } else {
        return "";
    }
}



// RES Size Comparison

function getMaxDimension(sizeString) {
    var numbers = sizeString.match(/\d+,\d+|\d+/g).map(s => parseFloat(s.replace(',', '.')));
    return Math.max(...numbers);
}

function compareSizes(currentSize, prevSize) {
    if (!currentSize || !prevSize || currentSize.trim() === "" || prevSize.trim() === "") {
        return "";
    }

    var currentMax = getMaxDimension(currentSize);
    var prevMax = getMaxDimension(prevSize);

    var change = ((currentMax - prevMax) / prevMax) * 100;
    var roundedChange = Math.round(change / 5) * 5;  // Round to nearest five

    // Check the checkbox state
	var showPercentage = document.getElementById('ChbRECIST').checked;
    var percentageString = showPercentage ? " (cca o " + roundedChange + "%)" : "";

    var result = "";
    if (prevMax === 0) { 
        result = "nově";
    } else if (change <= -50) {
        result = "ve výrazné rozměrové regresi";
    } else if (change > -50 && change <= -20) {
        result = "v parciální rozměrové regresi";
    } else if (change > -20 && change < 20) {
        result = "rozměrově přibližně stacionární";
    } else if (change >= 20 && change < 50) {
        result = "v parciální rozměrové progresi";
    } else if (change >= 50) {
        result = "ve výrazné rozměrové progresi";
    }

    return result + percentageString;  // Append the percentage string if needed
}


// combine results

function combineComparisonResults(sizeRes, number) {
    if (!sizeRes) {
        return "";
    }

    var prefix = (number && number.trim() !== "") ? "jsou " : "je ";

    // No need for separate handling for stationary results
    return prefix + sizeRes;
}



//nadpis

const Nadpis = "MR mozku";

 
// WML

if (WMLText === "0") {
 WMLP = "Bez lézí v bílé hmotě."; 
 WMLR = ""; 
} else if (WMLText === "ojedinělé") {
 WMLP = "Ojedinělé tečkovité T2W+ FLAIR+ léze v bílé hmotě ";
 WMLR = "Ojedinělé nespecifické tečkovité léze v bílé hmotě ";
} else if (WMLText === "sporadické") {
 WMLP = "Sporadické drobné T2W+ FLAIR+ léze v bílé hmotě ";
 WMLR = "Sporadické nespecifické drobné léze v bílé hmotě ";
} else if (WMLText === "vícečetné") {
 WMLP = "Vícečetné T2W+ FLAIR+ léze v bílé hmotě ";
 WMLR = "Vícečetné léze v bílé hmotě ";
} else if (WMLText === "splývající") {
 WMLP = "Mnohočetné splývající T2W+ FLAIR+ léze v bílé hmotě ";
 WMLR = "Mnohočetné splývající léze v bílé hmotě ";
}


var WMLLocationP = ""; var WMLLocationR = "";
var results = []; var checkedCount = 0; var checkedCountR = 0; var checkedCountL = 0;

const WMLCheckboxes = Array.from(checkboxes).filter(checkbox => checkbox.id.startsWith('ChbWML'));
WMLCheckboxes.forEach(function(checkbox) {
    if (checkbox.checked) {
        checkedCount++;
        if (checkbox.id.endsWith('R')) {
            checkedCountR++;
        }
        if (checkbox.id.endsWith('L')) {
            checkedCountL++;
        }
    }
});

if (document.getElementById('ChbWMLSupratentR').checked && document.getElementById('ChbWMLSupratentL').checked) {
    results.push("supratentoriálně bilat.");
} else {
    if (document.getElementById('ChbWMLSupratentR').checked) results.push("supratentoriálně vpravo");
    if (document.getElementById('ChbWMLSupratentL').checked) results.push("supratentoriálně vlevo");
}

if (document.getElementById('ChbWMLFrontalR').checked && document.getElementById('ChbWMLFrontalL').checked) {
    results.push("frontálně bilat.");
} else {
    if (document.getElementById('ChbWMLFrontalR').checked) results.push("frontálně vpravo");
    if (document.getElementById('ChbWMLFrontalL').checked) results.push("frontálně vlevo");
}

if (document.getElementById('ChbWMLPeriventrikular').checked) {results.push("periventrikulárně");}

if (document.getElementById('ChbWMLParietalR').checked && document.getElementById('ChbWMLParietalL').checked) {
    results.push("parietálně bilat.");
} else {
    if (document.getElementById('ChbWMLParietalR').checked) results.push("parietálně vpravo");
    if (document.getElementById('ChbWMLParietalL').checked) results.push("parietálně vlevo");
}

if (document.getElementById('ChbWMLJuxtakortikalni').checked) {results.push("juxtakortikálně");} 

if (document.getElementById('ChbWMLTemporalR').checked && document.getElementById('ChbWMLTemporalL').checked) {
    results.push("temporálně bilat.");
} else {
    if (document.getElementById('ChbWMLTemporalR').checked) results.push("temporálně vpravo");
    if (document.getElementById('ChbWMLTemporalL').checked) results.push("temporálně vlevo");
}

if (document.getElementById('ChbWMLOccipitalR').checked && document.getElementById('ChbWMLOccipitalL').checked) {
    results.push("okcipitálně bilat.");
} else {
    if (document.getElementById('ChbWMLOccipitalR').checked) results.push("okcipitálně vpravo");
    if (document.getElementById('ChbWMLOccipitalL').checked) results.push("okcipitálně vlevo");
}

if (document.getElementById('ChbWMLCorpusCallosum').checked) {results.push("v corpus callosum");}

if (document.getElementById('ChbWMLCentrumOvaleR').checked && document.getElementById('ChbWMLCentrumOvaleL').checked) {
    results.push("v centrum ovale bilat.");
} else {
    if (document.getElementById('ChbWMLCentrumOvaleR').checked) results.push("v centrum ovale vpravo");
    if (document.getElementById('ChbWMLCentrumOvaleL').checked) results.push("v centrum ovale vlevo");
}

if (document.getElementById('ChbWMLInfratentR').checked && document.getElementById('ChbWMLInfratentL').checked) {
    results.push("infratentoriálně bilat.");
} else {
    if (document.getElementById('ChbWMLInfratentR').checked) results.push("infratentoriálně vpravo");
    if (document.getElementById('ChbWMLInfratentL').checked) results.push("infratentoriálně vlevo");
}

if (document.getElementById('ChbWMLCerebelR').checked && document.getElementById('ChbWMLCerebelL').checked) {
    results.push("cerebelárně bilat.");
} else {
    if (document.getElementById('ChbWMLCerebelR').checked) results.push("cerebelárně vpravo");
    if (document.getElementById('ChbWMLCerebelL').checked) results.push("cerebelárně vlevo");
}

if (document.getElementById('ChbWMLMesenR').checked && document.getElementById('ChbWMLMesenL').checked) {
    results.push("v mesencephalu");
} else {
    if (document.getElementById('ChbWMLMesenR').checked) results.push("v mesencephalu vpravo");
    if (document.getElementById('ChbWMLMesenL').checked) results.push("v mesencephalu vlevo");
}

if (document.getElementById('ChbWMLPonsR').checked && document.getElementById('ChbWMLPonsL').checked) {
    results.push("v pontu");
} else {
    if (document.getElementById('ChbWMLPonsR').checked) results.push("v pontu vpravo");
    if (document.getElementById('ChbWMLPonsL').checked) results.push("v pontu vlevo");
}

if (document.getElementById('ChbWMLObloR').checked && document.getElementById('ChbWMLObloL').checked) {
    results.push("v prodloužené míše");
} else {
    if (document.getElementById('ChbWMLObloR').checked) results.push("v prodloužené míše vpravo");
    if (document.getElementById('ChbWMLObloL').checked) results.push("v prodloužené míše vlevo");
}


if (results.length > 1) {
    var last = results.pop();
    WMLLocationP = results.join(", ") + " a " + last;
} else if (results.length === 1) {
    WMLLocationP = results[0];
} else {
    WMLLocationP = "";
}

WMLLocationR = WMLLocationP;


if (WMLText === "ojedinělé") {
  WMLP = WMLP.replace("T2W", "gliové T2W");
  WMLR = ""; WMLLocationR = ""; 
}
if (WMLText === "sporadické") {
  WMLR = WMLR.replace("léze", "gliové léze");
}

if (checkboxRS.checked) {
    WMLLocationR += ". Distribucí a charakterem jsou léze suspektní z demyelinizace. ";
} else if (!checkboxRS.checked && (WMLText === "vícečetné" || WMLText === "splývající")) {
    WMLLocationR += " v.s. v rámci 'small vessel disease'.";
} else if (WMLLocationText !== "" && WMLText === "0") {
 WMLLocationP = ""; 
 WMLLocationR = "";
} 

if (WMLR || WMLLocationR) {
  WMLLocationR += ". ";
}



// KORTEX 

if (GCAText === "0") {
GCAP = "Subarachnoidální prostory oboustranně šířkou přiměřené k věku. "; 
GCAR = "";
} else if (GCAText === "1") {
 GCAP = "Mírné rozšíření sulků mozkových hemisfér. ";
 GCAR = "GCA skóre 1 - mírná atrofie mozku. ";
} else if (GCAText === "2") {
 GCAP = "Rozšíření sulků a ztenčení gyrů mozkových hemisfér. ";
 GCAR = "GCA skóre 2 - střední celková atrofie mozku. ";
} else if (GCAText === "3") {
 GCAP = " Výrazné zúžení gyrů a rozšíření sulků mozkových hemisfér. ";
 GCAR = "GCA skóre 3 - pokročilá celková atrofie mozku. ";
}


var MTAP = "";
var MTAR = "";

switch (MTAText) {
  case "0":
    MTAP = "";
    MTAR = "";
    break;
  case "1":
    MTAP = "Mírné rozšíření choroidální fisury, bez signifikantní atrofie hipokampu. ";
    MTAR = "MTA skóre 1 – nález může odpovídat věku. ";
    break;
  case "2":
    MTAP = "Rozšíření choroidální fisury a temporálního rohu, mírná atrofie hipokampu. ";
    MTAR = "MTA skóre 2 – suspektní nález, zejména u mladších pacientů. ";
    break;
  case "3":
    MTAP = "Zřetelná atrofie hipokampu s rozšířením temporálního rohu a fisury. ";
    MTAR = "MTA skóre 3 – mediotemporální atrofie středního stupně. ";
    break;
  case "4":
    MTAP = "Těžká atrofie hipokampu a mediotemporální struktury s výraznou dilatací. ";
    MTAR = "MTA skóre 4 – těžká mediotemporální atrofie, typická pro Alzheimerovu chorobu. ";
    break;
}

var KoedamP = "";
var KoedamR = "";

switch (KoedamText) {
  case "0":
    KoedamP = "";
    KoedamR = "";
    break;
  case "1":
    KoedamP = "Mírné rozšíření sulcus cinguli posterior a precuneu, bez zřetelné ztráty gyrálního objemu. ";
    KoedamR = "Koedam skóre 1 – lehká parietální atrofie, nález může odpovídat věku. ";
    break;
  case "2":
    KoedamP = "Výraznější rozšíření sulcus cinguli posterior a precuneu, patrná ztráta gyrálního objemu parietálně. ";
    KoedamR = "Koedam skóre 2 – střední parietální atrofie, suspektní pro neurodegenerativního postižení. ";
    break;
  case "3":
    KoedamP = "Těžká parietální atrofie s hlubokými sulky a výraznou ztrátou gyrálního objemu v precuneu a parietální kůře. ";
    KoedamR = "Koedam skóre 3 – těžká parietální atrofie, svědčí pro neurodegenerativní změny. ";
    break;
}


var lobaratrophyP = ""; 
var lobaratrophyR = ""; 

if (lobaratrophy === "") {
lobaratrophyP = ""; 
lobaratrophyR = ""; 
} else if (lobaratrophy === "frontálně") {
 lobaratrophyP = "Nápadnější atrofizace frontálních laloků. ";
 lobaratrophyR = "Nápadnější atrofizace frontálních laloků. ";
} else if (lobaratrophy === "frontoparietálně") {
 lobaratrophyP = "Nápadnější atrofizace frontálních a parietálních laloků. ";
 lobaratrophyR = "Nápadnější atrofizace frontálních a parietálních laloků. ";
} else if (lobaratrophy === "frontotemporálně") {
 lobaratrophyP = "Nápadnější atrofizace frontálních a temporálních laloků. ";
 lobaratrophyR = "Nápadnější atrofizace frontálních a temporálních laloků. ";
} else if (lobaratrophy === "temporálně") {
 lobaratrophyP = "Nápadnější atrofizace temporálních laloků. ";
 lobaratrophyR = "Nápadnější atrofizace temporálních laloků. ";
} else if (lobaratrophy === "okcipitálně") {
 lobaratrophyP = "Nápadnější atrofizace okcipitálních laloků. ";
 lobaratrophyR = "Nápadnější atrofizace okcipitálních laloků. ";
} 


// KOMORY

if (ventriclesText === "0") {
ventriclesP = "Komorový systém není dilatován. "; 
ventriclesR = "";
} else if (ventriclesText === "↑") {
 ventriclesP = "Mírná dilatace komorového systému. ";
 ventriclesR = "";
} else if (ventriclesText === "↑↑") {
 ventriclesP = "Středně pokročilá dilatace komorového systému. ";
 ventriclesR = "Dilatace komorového systému. ";
} else if (ventriclesText === "↑↑↑") {
 ventriclesP = "Výrazná dilatace komorového systému. ";
 ventriclesR = "Výrazná dilatace komorového systému. ";
}

// HYPOFÝZA, EPIFÝZA

var PituitaryP = ""; 
var PituitaryR = ""; 

if (Pituitary === "") {
PituitaryP = "Nezvětšená hypofýza uložena v nerozšířeném tureckém sedle. "; 
PituitaryR = ""; 
} else if (Pituitary === "partial empty") {
 PituitaryP = "Turecké sedlo je z velké části vyplněno signálem likvoru, na jeho dně je zmenšená hypofýza. ";
 PituitaryR = "Partial empty sella.";
} else if (Pituitary === "empty sella") {
 PituitaryP = "Turecké sedlo je z velké části vyplněno signálem likvoru, na jeho dně je výrazně zmenšená hypofýza, kraniokaudálně pod 2 mm. ";
 PituitaryR = "Empty sella. ";
} else if (Pituitary === "Rathke cyst") {
 PituitaryP = "Na rozhraní adeno a neurohypofýzy je ohraničená kolekce tekutiny. ";
 PituitaryR = "Cysta Rathkeho výchlipky. ";
} else if (Pituitary === "Ložisko") {
 PituitaryP = "Turecké sedlo obsahuje ložisko. ";
 PituitaryR = "Ložisko tureckého sedla. ";
} 

var PinealP = ""; 
var PinealR = ""; 

if (Pineal === "") {
PinealP = ""; 
PinealR = ""; 
} else if (Pineal === "cysta") {
 PinealP = "Epifýza s dobře ohraničeným ložiskem T2W+ FLAIR+. ";
 PinealR = "Pineální cysta. ";
} 


// LESION1
let codeForBrainLesion1 = `

var BrainLesion1Button = document.getElementById("BrainLesion1");
var BrainLesion1number = document.getElementById("BrainLesion1number").value;
var BrainLesion1type = document.getElementById("BrainLesion1type").value.split("|");
var BrainLesion1Location = document.getElementById("BrainLesion1Location").value;
var BrainLesion1AddLocation = document.getElementById("BrainLesion1AddLocation").value;
var BrainLesion1Loclargest = document.getElementById("BrainLesion1Loclargest").value;
var BrainLesion1Activity = document.getElementById("BrainLesion1Activity").value; var BrainLesion1ActivityCopy = document.getElementById("BrainLesion1Activity").value;
var BrainLesion1RESActivityFDG = document.getElementById("BrainLesion1Activity"); var selectedOption = BrainLesion1RESActivityFDG.options[BrainLesion1RESActivityFDG.selectedIndex]; var BrainLesion1RESActivityFDG = selectedOption.dataset.valuez2 ? selectedOption.dataset.valuez2 : '';
var BrainLesion1RESActivityFDOPA = document.getElementById("BrainLesion1Activity"); var selectedOption = BrainLesion1RESActivityFDOPA.options[BrainLesion1RESActivityFDOPA.selectedIndex]; var BrainLesion1RESActivityFDOPA = selectedOption.dataset.valuez1 ? selectedOption.dataset.valuez1 : '';
var BrainLesion1Size = formatLesionSize("BrainLesion1Size");
var BrainLesion1RESDecision = document.getElementById("BrainLesion1Decision").value; 
var BrainLesion1AllLocations = "";
var BrainLesion1SignalIntensity = "";
var BrainLesion1PrevSize = formatLesionSize("BrainLesion1PrevSize");

var BrainLesion1BTGRADE = document.getElementById("BrainLesion1BTGRADE").value;

var BrainLesion1ComparisonText = generateComparisonText(BrainLesion1PrevSize, DateComparison);
var BrainLesion1ComparisonSizeRes = compareSizes(BrainLesion1Size, BrainLesion1PrevSize);
var BrainLesion1CombinedResult = combineComparisonResults( BrainLesion1ComparisonSizeRes,  BrainLesion1number);

//location
var BrainLesion1Location = "";
var locationRight = [];
var locationLeft = [];
var bilateralLocations = [];

function addLocation(id, locationName, sideArray, bilateralArray) {
	var rightCheckbox = document.getElementById(id + "R");
	var leftCheckbox = document.getElementById(id + "L");
	if (rightCheckbox && leftCheckbox && rightCheckbox.checked && leftCheckbox.checked) {
		bilateralArray.push(locationName + " bilat.");
	} else {
		if (rightCheckbox && rightCheckbox.checked) sideArray.push(locationName + " vpravo");
		if (leftCheckbox && leftCheckbox.checked) sideArray.push(locationName + " vlevo");
	}
}

var locationIds = ["Chb1Frontal", "Chb1Parietal", "Chb1Temporal", "Chb1Insule", "Chb1Occipital", "Chb1BasalGanglia", "Chb1Cerebellar", "Chb1Thalamus", "Chb1Mesenceph", "Chb1Pons", "Chb1Oblongata", "Chb1PosteriorFosa"];
var locationNames = ["frontálně", "parietálně", "temporálně", "inzulárně", "okcipitálně", "v bazálních gangliích", "v mozečku", "v thalamu", "v mesencephalu", "v pontu", "v oblongatě", "v zadní jámě"];

for (var i = 0; i < locationIds.length; i++) {
	addLocation(locationIds[i], locationNames[i], locationRight, locationLeft, bilateralLocations);
}

function formatLocationString(locationsArray) {
	if (locationsArray.length === 0) return "";

	if (locationsArray.length === 1) {
		return locationsArray[0];
	}

	if (locationsArray.length === 2) {
		return locationsArray.join(" a ");
	}

	var lastLocation = locationsArray.pop();
	return locationsArray.join(", ") + " a " + lastLocation;
}

if (BrainLesion1number === "") {
	var combinedRight = combineSameSideLocations(locationRight, "vpravo");
	var combinedLeft = combineSameSideLocations(locationLeft, "vlevo");
	BrainLesion1Location = formatLocationString(combinedRight.concat(combinedLeft));
} else {
	BrainLesion1Location = formatLocationString(bilateralLocations.concat(locationRight, locationLeft));
}


function combineSameSideLocations(locationsArray, side) {
    var combinedLocations = [];
    
    var frontoParietal = locationsArray.includes("frontálně " + side) && locationsArray.includes("parietálně " + side);
    var frontoTemporal = locationsArray.includes("frontálně " + side) && locationsArray.includes("temporálně " + side);
    var parietoOccipital = locationsArray.includes("parietálně " + side) && locationsArray.includes("okcipitálně " + side);
    var temporoParietal = locationsArray.includes("temporálně " + side) && locationsArray.includes("parietálně " + side);
    var frontoTemporoParietal = locationsArray.includes("frontálně " + side) && locationsArray.includes("parietálně " + side) && locationsArray.includes("temporálně " + side);

    if (frontoTemporoParietal) {
        combinedLocations.push("frontotemporoparietálně " + side);
        locationsArray = locationsArray.filter(location => !["frontálně " + side, "parietálně " + side, "temporálně " + side].includes(location));
    } else {
        if (frontoParietal) {
            combinedLocations.push("frontoparietálně " + side);
            locationsArray = locationsArray.filter(location => !["frontálně " + side, "parietálně " + side].includes(location));
        }
        if (frontoTemporal) {
            combinedLocations.push("frontotemporálně " + side);
            locationsArray = locationsArray.filter(location => !["frontálně " + side, "temporálně " + side].includes(location));
        }
        if (parietoOccipital) {
            combinedLocations.push("parietookcipitálně " + side);
            locationsArray = locationsArray.filter(location => !["parietálně " + side, "okcipitálně " + side].includes(location));
        }
        if (temporoParietal) {
            combinedLocations.push("temporoparietálně " + side);
            locationsArray = locationsArray.filter(location => !["temporálně " + side, "parietálně " + side].includes(location));
        }
    }

    return combinedLocations.concat(locationsArray);
}

var BrainLesion1LocationInput = document.getElementById("BrainLesion1Location"); if (BrainLesion1LocationInput) {BrainLesion1LocationInput.value = BrainLesion1Location.trim();}
//end location 



var BrainLesion1descriptions = [];

// T1
if (document.getElementById('Chb1SignalT1hyper').checked) BrainLesion1descriptions.push("T1+");
if (document.getElementById('Chb1SignalT1iso').checked) BrainLesion1descriptions.push("T1izo");
if (document.getElementById('Chb1SignalT1hypo').checked) BrainLesion1descriptions.push("T1-");

// T2
if (document.getElementById('Chb1SignalT2hyper').checked) BrainLesion1descriptions.push("T2+");
if (document.getElementById('Chb1SignalT2iso').checked) BrainLesion1descriptions.push("T2izo");
if (document.getElementById('Chb1SignalT2hypo').checked) BrainLesion1descriptions.push("T2-");

// FLAIR
if (document.getElementById('Chb1SignalFLAIRhyper').checked) BrainLesion1descriptions.push("FLAIR+");
if (document.getElementById('Chb1SignalFLAIRiso').checked) BrainLesion1descriptions.push("FLAIRizo");
if (document.getElementById('Chb1SignalFLAIRhypo').checked) BrainLesion1descriptions.push("FLAIR-");

// DWI
if (document.getElementById('Chb1SignalDWIhyper').checked) BrainLesion1descriptions.push("DWI+");
if (document.getElementById('Chb1SignalDWIhypo').checked) BrainLesion1descriptions.push("DWI-");

// SWI
if (document.getElementById('Chb1SignalSWIhyper').checked) BrainLesion1descriptions.push("se suscept. artefakty");

// T1C+
if (document.getElementById('Chb1SignalT1Chyper').checked) BrainLesion1descriptions.push("T1C++");
if (document.getElementById('Chb1SignalT1Ciso').checked) BrainLesion1descriptions.push("T1C+");
if (document.getElementById('Chb1SignalT1Chypo').checked) BrainLesion1descriptions.push("T1C0");



// Remove empty strings
BrainLesion1descriptions = BrainLesion1descriptions.filter(Boolean);

// Joining BrainLesion1descriptions with proper grammar
var descriptionText;
if (BrainLesion1descriptions.length > 1) {
	var lastDescription = BrainLesion1descriptions.pop();
	descriptionText = BrainLesion1descriptions.join(", ") + ", " + lastDescription;
} else {
	descriptionText = BrainLesion1descriptions.join("");
}

BrainLesion1Signal.value = BrainLesion1descriptions.length > 0 ? descriptionText.trim() : "";
BrainLesion1POPSignal = BrainLesion1Signal.value;
BrainLesion1POPSignal = BrainLesion1POPSignal.replace("DWI+", "se zvýšenou restrikcí difuze"); BrainLesion1POPSignal = BrainLesion1POPSignal.replace("DWI-", "bez zvýšené restrikce difuze");
BrainLesion1POPSignal = BrainLesion1POPSignal.replace("T1C++", "s výrazným postkontrastním sycením"); BrainLesion1POPSignal = BrainLesion1POPSignal.replace("T1C+", "s mírným postkontrastním sycením"); BrainLesion1POPSignal = BrainLesion1POPSignal.replace("T1C0", "bez sycení postkontrastně");

var POPBrainLesion1 = "";
var RESBrainLesion1 = "";

if (BrainLesion1Loclargest !== "") {
	BrainLesion1Loclargest = BrainLesion1ActivityCopy + ". Největší " + BrainLesion1Loclargest + " ";
	BrainLesion1Activity = "";
}

var BrainLesion1additional = "";

if (document.getElementById('Chb1Intraaxial').checked && !document.getElementById('Chb1Extraaxial').checked) {
    BrainLesion1Location += " intraaxiálně";
} else if (document.getElementById('Chb1Extraaxial').checked && !document.getElementById('Chb1Intraaxial').checked) {
    BrainLesion1Location += " extraaxiálně";
}

if (document.getElementById('Chb1edema').checked && !document.getElementById('Chb1gliosis').checked) {
    BrainLesion1additional += ", s perifokální vysokou SI v T2W (vazogenní dém)";
} else if (document.getElementById('Chb1gliosis').checked && !document.getElementById('Chb1edema').checked) {
    BrainLesion1additional += ", s perifokální vysokou SI v T2W (glióza)";
} else if (document.getElementById('Chb1edema').checked && document.getElementById('Chb1gliosis').checked) {
    BrainLesion1additional += ", s perifokální vysokou SI v T2W (vazogenní edém / glióza)";
}


BrainLesion1AllLocations = BrainLesion1Location + " " + BrainLesion1AddLocation;

if (BrainLesion1number === "") {
	BrainLesion1type = BrainLesion1type[0];
} else if (BrainLesion1number !== "" && BrainLesion1Loclargest !== "") {
	BrainLesion1type = BrainLesion1type[1];
} else if (BrainLesion1number !== "" && BrainLesion1Loclargest === "") {
	BrainLesion1type = BrainLesion1type[1];
	BrainLesion1Size = BrainLesion1Size.replace('diametru ', 'diametru až '); 
	BrainLesion1Size = BrainLesion1Size.replace('rozměru ', 'rozměru až '); 
} 	

let processedSentencePOPBrainLesion1 = processSentence(BrainLesion1number + " " + BrainLesion1type);	
POPBrainLesion1 = processedSentencePOPBrainLesion1 + " " + BrainLesion1AllLocations + " " + BrainLesion1Loclargest + " " + BrainLesion1Size + " " +  BrainLesion1POPSignal + " " + BrainLesion1SignalIntensity + " " + BrainLesion1Activity + " " + BrainLesion1additional + " " + BrainLesion1ComparisonText + ".";

let processedSentenceRESBrainLesionFDG = processSentence(BrainLesion1number + " " + BrainLesion1RESActivityFDG + " " + BrainLesion1type);
let processedSentenceRESBrainLesionFDOPA = processSentence(BrainLesion1number + " " + BrainLesion1type + " " + BrainLesion1RESActivityFDOPA);

RESBrainLesion1 = (PETselect === "FDOPA" ? processedSentenceRESBrainLesionFDOPA : processedSentenceRESBrainLesionFDG) + " " + BrainLesion1AllLocations + " " + BrainLesion1CombinedResult + " " + BrainLesion1RESDecision + ".";

if (BrainLesion1BTGRADE !== "") {
    RESBrainLesion1 += " " + BrainLesion1BTGRADE + ".";
}


if (BrainLesion1RESDecision.includes("meta") && BrainLesion1type.includes("ožisk")) {
RESBrainLesion1 = RESBrainLesion1
.replace(/ložisk/g, "meta ložisk")
.replace(/Ložisk/g, "Meta ložisk")
.replace(": charakteru meta", ".");
}

if (BrainLesion1RESDecision.includes("tumor") && BrainLesion1type.includes("ožisk")) {
RESBrainLesion1 = RESBrainLesion1
.replace(/ložisk/g, "tumorózní ložisk")
.replace(/Ložisk/g, "Tumorózní ložisk")
.replace(": charakteru tumoru", ".");
}

if (BrainLesion1RESDecision.includes("akutní ischemie") && BrainLesion1type.includes("ožisk")) {
RESBrainLesion1 = RESBrainLesion1
.replace(/ožisko/g, "ožisko (sub)akutní ischemie")
.replace(/ožiska/g, "ožiska (sub)akutní ischemie")
.replace(": charakteru (sub)akutní ischemie", ".");
}

if (BrainLesion1RESDecision.includes("chron. ischemie") && BrainLesion1type.includes("ožisk")) {
RESBrainLesion1 = RESBrainLesion1
.replace(/ožisko/g, "ožisko starší ischemie")
.replace(/ožiska/g, "ožiska starší ischemie")
.replace(": charakteru chron. ischemie", ".");
}

if (BrainLesion1RESDecision.includes("chron. ischemie") && BrainLesion1type.includes("krs")) {
RESBrainLesion1 = RESBrainLesion1
.replace(/krsek/g, "krsek starší ischemie")
.replace(/krsky/g, "krsky starší ischemie")
.replace(": charakteru chron. ischemie", ".");
}

if (BrainLesion1RESDecision.includes("tumor") && BrainLesion1type.includes("xpanze")) {
RESBrainLesion1 = RESBrainLesion1
.replace(/expanze/g, "tumorózní expanze")
.replace(/Expanze/g, "Tumorózní expanze")
.replace(": charakteru tumoru", ".");
}

if (BrainLesion1RESDecision.includes("arach") && BrainLesion1type.includes("cyst")) {
RESBrainLesion1 = RESBrainLesion1
.replace(/cyst/g, "arachnoidální cyst")
.replace(/Cyst/g, "Arachnoidální cyst")
.replace(": charakteru arach.c.", ".");
}

if (BrainLesion1RESDecision.includes("pseudo") && BrainLesion1type.includes("cyst")) {
RESBrainLesion1 = RESBrainLesion1
.replace(/cyst/g, "postmalat. pseudocyst")
.replace(/Cyst/g, "Postmalat. pseudocyst")
.replace(": charakteru pseudoc.", ".");
}

if (BrainLesion1RESDecision.includes("resekc") && BrainLesion1type.includes("efekt")) {
RESBrainLesion1 = RESBrainLesion1
.replace(/defekt/g, "pooperační defekt")
.replace(/Defekt/g, "Pooperační defekt")
.replace(": po resekci", "");
}

if (BrainLesion1RESDecision.includes("ischemie") && BrainLesion1type.includes("efekt")) {
RESBrainLesion1 = RESBrainLesion1
.replace(/Defekt/g, "Postischemický kortikosubkortikální defekt")
.replace(/defekty/g, "postischemické kortikosubkortikální defekty")
.replace(": charakteru ischemie", ".");
}

if (BrainLesion1RESDecision.includes("DVA") && BrainLesion1type.toLowerCase().includes("struktur")) {
RESBrainLesion1 = RESBrainLesion1
.replace(/Pruhovitá struktura/gi, "DVA (venózní angiom)")
.replace(/pruhovité struktury/gi, "DVA (venózní angiomy)")
.replace(": charakteru DVA", "");
}


if (BrainLesion1CombinedResult.includes("je nově") || BrainLesion1CombinedResult.includes("jsou nově")) { RESBrainLesion1 = "Nově " + RESBrainLesion1.charAt(0).toLowerCase() + RESBrainLesion1.substring(1) ; RESBrainLesion1 = RESBrainLesion1.replace(" je nově", "").replace(" jsou nově", "");}

if (BrainLesion1.classList.contains('hidden')) {POPBrainLesion1 = ""; RESBrainLesion1 = "";}


`;

let codeForBrainLesion2 = codeForBrainLesion1.replace(/Lesion1/g, 'Lesion2').replace(/Chb1/g, 'Chb2');
let codeForBrainLesion3 = codeForBrainLesion1.replace(/Lesion1/g, 'Lesion3').replace(/Chb1/g, 'Chb3');
eval(codeForBrainLesion1);
eval(codeForBrainLesion2);
eval(codeForBrainLesion3);


//MMK

switch (MMKRText) {
    case "0": switch (MMKLText) {
        case "0": MMKP = "Struktury v MMK a vnitřních zvukovodech bez patrné patologie."; MMKR = ""; break;
        case "ložisko": MMKP = MMKR = "Ložisko v oblasti levého MMK / vnitřního zvukovodu."; break;
        case "konflikt": MMKP = "Cévní klička AICA zasahuje vlevo hluboko do vnitřního zvukovodu."; MMKR = "Suspekce na neurovaskulární konflikt vlevo."; break;
    } break;
    case "ložisko": switch (MMKLText) {
        case "0": MMKP = MMKR = "Ložisko v oblasti pravého MMK / vnitřního zvukovodu."; break;
        case "ložisko": MMKP = MMKR = "Ložisko v oblasti obou MMK / vnitřního zvukovodu."; break;
        case "konflikt": MMKP = "Ložisko v oblasti pravého MMK / vnitřního zvukovodu. Cévní klička AICA zasahuje vlevo hluboko do vnitřního zvukovodu."; MMKR = "Ložisko v oblasti pravého MMK / vnitřního zvukovodu. Suspekce na neurovaskulární konflikt vlevo."; break;
    } break;
    case "konflikt": switch (MMKLText) {
        case "0": MMKP = "Cévní klička AICA zasahuje vpravo hluboko do vnitřního zvukovodu."; MMKR = "Suspekce na neurovaskulární konflikt vpravo."; break;
        case "ložisko": MMKP = "Cévní klička AICA zasahuje vpravo hluboko do vnitřního zvukovodu. Ložisko v oblasti levého MMK / vnitřního zvukovodu."; MMKR = "Suspekce na neurovaskulární konflikt vpravo. Ložisko v oblasti levého MMK / vnitřního zvukovodu."; break;
        case "konflikt": MMKP = "Cévní kličky AICA zasahují bilat. hluboko do vnitřních zvukovodů."; MMKR = "Suspekce na neurovaskulární konflikt bilat."; break;
    } break;
}

// OSTATNÍ

if (OrbitRText === "0" && OrbitLText === "0") {
    OrbitsP = "Orbity bez patologie. "; 
} else if (OrbitRText === "čočka" && OrbitLText === "čočka") {
    OrbitsP = "Náhrada čoček bilat. ";
} else if (OrbitRText === "čočka" && OrbitLText === "0") {
    OrbitsP = "Náhrada čočky vpravo. ";
} else if (OrbitRText === "0" && OrbitLText === "čočka") {
    OrbitsP = "Náhrada čočky vlevo. ";
} else if (OrbitRText === "enukl" && OrbitLText === "enukl") {
    OrbitsP = "St.p. enukleaci bulbů bilat. ";
} else if (OrbitRText === "enukl" && OrbitLText === "0") {
    OrbitsP = "St.p. enukleaci bulbu vpravo. ";
} else if (OrbitRText === "0" && OrbitLText === "enukl") {
    OrbitsP = "St.p. enukleaci bulbu vlevo. ";
} else if (OrbitRText === "čočka" && OrbitLText === "enukl") {
    OrbitsP = "Náhrada čočky vpravo a st.p. enukleaci bulbu vlevo. ";
} else if (OrbitRText === "enukl" && OrbitLText === "čočka") {
    OrbitsP = "St.p. enukleaci bulbu vpravo a náhrada čočky vlevo. ";
}

if (MastoidRText === "0" && MastoidLText === "0") {
MastoidyP = "Mastoideální sklípky vzdušné. "; 
MastoidyR = "";
} else if (MastoidRText === "↑" && MastoidLText === "0") {
 MastoidyP = "Mastoideální sklípky vpravo mírně parc. nevzdušné. ";
 MastoidyR = "";
} else if (MastoidRText === "0" && MastoidLText === "↑") {
 MastoidyP = "Mastoideální sklípky vlevo mírně parc. nevzdušné. ";
 MastoidyR = "";
} else if (MastoidRText === "↑" && MastoidLText === "↑") {
 MastoidyP = "Mastoideální sklípky bilat. mírně parc. nevzdušné. ";
 MastoidyR = "";
} else if (MastoidRText === "↑↑" && MastoidLText === "0") {
 MastoidyP = "Mastoideální sklípky vpravo nevzdušné s tekutinou. ";
 MastoidyR = "Mastoideální sklípky vpravo nevzdušné s tekutinou. ";
} else if (MastoidRText === "0" && MastoidLText === "↑↑") {
 MastoidyP = "Mastoideální sklípky vlevo nevzdušné s tekutinou. ";
 MastoidyR = "Mastoideální sklípky vlevo nevzdušné s tekutinou. ";
} else if ((MastoidRText === "↑" && MastoidLText === "↑↑") || (MastoidRText === "↑↑" && MastoidLText === "↑") || (MastoidRText === "↑↑" && MastoidLText === "↑↑")) {
 MastoidyP = "Mastoideální sklípky bilat. parciálně nevzdušné s tekutinou. ";
 MastoidyR = "Mastoideální sklípky bilat. parciálně nevzdušné s tekutinou. ";
} 




//SINY  není ideální, kombinuje podle počtu slov, takže někde je "v" a někde ne. Taky spojuje vše pomocí "a" a neumí kombinovat nesousedící.

const conditions = {
  "cysta": ["Cystická léze", "Retenční cysta"],
  "polyp": ["Polypózní léze", "Polyp"],
  "hyper↑": ["Mírná hyperplázie sliznic", "Mírná hyperplázie sliznic"],
  "hyper↑↑": ["Výrazná hyperplázie sliznic", "Výrazná hyperplázie sliznic"],
  "tekutina": ["Hladina tekutiny", "Známky akutní sinusitis"],
};

let FrontalP = ''; let FrontalR = '';
let MaxillarP = ''; let MaxillarR = '';
let EthmoidP = ''; let EthmoidR = '';
let SphenoidP = ''; let SphenoidR = '';

if (
    FrontalRText === '0' && FrontalLText === '0' && 
    MaxillarRText === '0' && MaxillarLText === '0' && 
    EthmoidRText === '0' && EthmoidLText === '0' && 
    SphenoidRText === '0' && SphenoidLText === '0'
) {
    var SinusP = "Dutiny vzdušné. ";
    var SinusR = "";
} else {

if (FrontalRText === FrontalLText && FrontalRText !== '0') {
  FrontalP = conditions[FrontalRText][0] + ' v obou frontálních sinech. ';
  FrontalR = conditions[FrontalRText][1] + ' v obou frontálních sinech. ';
} else {
  if (FrontalRText !== '0') {
    FrontalP += conditions[FrontalRText][0] + ' v pravém frontálním sinu. ';
    FrontalR += conditions[FrontalRText][1] + ' v pravém frontálním sinu. ';
  }
  if (FrontalLText !== '0') {
    FrontalP += conditions[FrontalLText][0] + ' v levém frontálním sinu. ';
    FrontalR += conditions[FrontalLText][1] + ' v levém frontálním sinu. ';
  }
}

if (MaxillarRText === MaxillarLText && MaxillarRText !== '0') {
  MaxillarP = conditions[MaxillarRText][0] + ' v obou maxilárních sinech. ';
  MaxillarR = conditions[MaxillarRText][1] + ' v obou maxilárních sinech. ';
} else {
  if (MaxillarRText !== '0') {
    MaxillarP += conditions[MaxillarRText][0] + ' v pravém maxilárním sinu. ';
    MaxillarR += conditions[MaxillarRText][1] + ' v pravém maxilárním sinu. ';
  }
  if (MaxillarLText !== '0') {
    MaxillarP += conditions[MaxillarLText][0] + ' v levém maxilárním sinu. ';
    MaxillarR += conditions[MaxillarLText][1] + ' v levém maxilárním sinu. ';
  }
}

if (EthmoidRText === EthmoidLText && EthmoidRText !== '0') {
  EthmoidP = conditions[EthmoidRText][0] + ' v obou ethmoidálních sinech. ';
  EthmoidR = conditions[EthmoidRText][1] + ' v obou ethmoidálních sinech. ';
} else {
  if (EthmoidRText !== '0') {
    EthmoidP += conditions[EthmoidRText][0] + ' v pravém ethmoidálním sinu. ';
    EthmoidR += conditions[EthmoidRText][1] + ' v pravém ethmoidálním sinu. ';
  }
  if (EthmoidLText !== '0') {
    EthmoidP += conditions[EthmoidLText][0] + ' v levém ethmoidálním sinu. ';
    EthmoidR += conditions[EthmoidLText][1] + ' v levém ethmoidálním sinu. ';
  }
}

if (SphenoidRText === SphenoidLText && SphenoidRText !== '0') {
  SphenoidP = conditions[SphenoidRText][0] + ' v obou sphenoidálních sinech. ';
  SphenoidR = conditions[SphenoidRText][1] + ' v obou sphenoidálních sinech. ';
} else {
  if (SphenoidRText !== '0') {
    SphenoidP += conditions[SphenoidRText][0] + ' v pravém sphenoidálním sinu. ';
    SphenoidR += conditions[SphenoidRText][1] + ' v pravém sphenoidálním sinu. ';
  }
  if (SphenoidLText !== '0') {
    SphenoidP += conditions[SphenoidLText][0] + ' v levém sphenoidálním sinu. ';
    SphenoidR += conditions[SphenoidLText][1] + ' v levém sphenoidálním sinu. ';
  }
}

function combineStrings(strArray) {
  let combinedStr = "";

  for(let i = 0; i < strArray.length; i++) {
    if(strArray[i].trim() === "") {
      continue;
    }

    if(i > 0 && strArray[i].split(" ").slice(0, 3).join(" ") === strArray[i - 1].split(" ").slice(0, 3).join(" ")) {
      combinedStr = combinedStr.replace(/\. $/, '') + " a " + strArray[i].split(" ").slice(3).join(" ");
    } else {
      combinedStr += strArray[i];
    }
  }

  return combinedStr;
}

var SinusP = combineStrings([FrontalP, MaxillarP, EthmoidP, SphenoidP]);
var SinusR = combineStrings([FrontalR, MaxillarR, EthmoidR, SphenoidR]);
}

// další

function toggleDalsiSection() {
  const checkbox = document.getElementById('dalsiShow');
  const fields = document.getElementById('dalsiFields');
  fields.style.display = checkbox.checked ? 'flex' : 'none';
}
window.addEventListener('load', function() {
  const checkbox = document.getElementById('dalsiShow');
  if (checkbox) {
    checkbox.addEventListener('change', toggleDalsiSection);
  }
});


function capitalizeAndDot(text) {
  text = text.trim();
  if (text.length === 0) return ""; 
  text = text[0].toUpperCase() + text.slice(1); 
  if (!/[.!?]$/.test(text)) {  
    text += ".";
  }
  return text;
}

const dalsiPopis = capitalizeAndDot(document.getElementById('dalsiPopis').value);
const dalsiZaver = capitalizeAndDot(document.getElementById('dalsiZaver').value);

// bez ložiskových změn
POPNoLesions = "";

if (POPBrainLesion1 === "" && POPBrainLesion2 === "" && LesionVP === "" && WMLText === "0") {
    POPNoLesions = "Bez patologických ložiskových změn. ";
} else if (POPBrainLesion1 === "" && POPBrainLesion2 === "" && LesionVP === "" && WMLText !== "0") {
    POPNoLesions = "Jinak bez ložiskových změn. ";
}

if (checkboxNoEnh.checked) {
    POPNoLesions += "Bez ložiskového sycení. ";
}

if (!POPBrainLesion1.includes("restrikcí") && !POPBrainLesion2.includes("restrikcí") && !POPBrainLesion3.includes("restrikcí") && !LesionVP.includes("restrikcí")) {
    POPNoLesions += "Bez zvýšené restrikce difuze. ";
}


//FMM 

const FMMdiv = document.getElementById("FMMdiv");

if (PETselect === "FMM") {
FMMdiv.classList.remove("hidden");
} else {
FMMdiv.classList.add("hidden");
}

POP_FMM_result = ""; RES_FMM_result = ""; 
var FMMstatus = document.getElementById("FMMstatus").value;

if (FMMstatus === "negativní") {
  POP_FMM_result = "Na tomografických řezech nacházíme fyziologickou distribuci radiofarmaka s maximem akumulace v šedé kůře mozkové, bez oblastí patologického snížení akumulace. V žádné z kritických hodnocených oblastí frontální kůry, předního a zadního cingula a precuneu, temporo-parietální kůry včetně insuly, laterální temporální kůry a striata nenacházíme patologicky zvýšenou akumulaci radiofarmaka. ";
  RES_FMM_result = "Beta-amyloidové plaky nebyly nalezeny. Nález není konzistentní s diagnózou Alzheimerovy choroby.";
} else if (FMMstatus === "pozitivní bez striata") {
  POP_FMM_result = "Na tomografických řezech nacházíme v amyloidové fázi zvýšenou akumulaci radiofarmaka v šedé kůře mozkové, která přesahuje svojí intenzitou fyziologickou akumulaci v bílé hmotě mozkové - v některých kritických hodnocených oblastech, ale ne ve striatu. ";
  RES_FMM_result = "Pozitivní nález z hlediska přítomnosti beta-amyloidu v šedé kůře mozkové (bez  striata) je konzistentní s vaší suspekcí na Alzheimerovu chorobu.";
} else if (FMMstatus === "pozitivní včetně striata") {
  POP_FMM_result = "Na tomografických řezech nacházíme v amyloidové fázi výrazně zvýšenou akumulaci radiofarmaka v šedé kůře mozkové, která přesahuje svojí intenzitou fyziologickou akumulaci v bílé hmotě mozkové - v kritických hodnocených oblastech, tj. ve frontální kůře, předním a zadním cingulu a precuneu, v temporo-parietální kůře včetně insuly, v laterální temporální kůře i ve striatu nacházíme patologicky zvýšenou akumulaci radiofarmaka.";
  RES_FMM_result = "Pozitivní nález z hlediska přítomnosti beta-amyloidu v šedé kůře mozkové včetně striata je konzistentní s vaší suspekcí na Alzheimerovu chorobu.";
}

//Latest examination comparison
if (DateCompare === "") {ExamCompareText = ""; POPExamCompareText = "";} else {ExamCompareText = "Oproti vyšetření z " + DateComparison + ":"; POPExamCompareText = "Srovnáno s vyšetřením z " + DateComparison + ". ";}



//POPIS

const MRbrainNAMEText = document.getElementById("MRbrainNAMEText");

if (PETselect === "FDOPA") {
  MRbrainNAMEText.value = "F-DOPA PET / MR mozku";
} else if (PETselect === "FMM") {
  MRbrainNAMEText.value = "FMM PET / MR mozku";
} else {
  MRbrainNAMEText.value = "MR mozku";
}

MRbrainINDText.value = indikace;

MRbrainSEKVText.value = "Mozek v T2W, FLAIR, DWI+ADC, T1W, (event. dle potřeby T2-SPACE, T2-FLASH, SWI, FS, C+). ";

MRbrainPOPText.value = 
POP_FMM_result + "\n\n" +
POPExamCompareText + "\n" +
POPBrainLesion1 + "\n" +
POPBrainLesion2 + "\n" +
POPBrainLesion3 + "\n" +
LesionVP + "\n" +
WMLP + WMLLocationP + RSP + "." + "\n" +
POPNoLesions + "\n" +
GCAP + " " + MTAP + " " + KoedamP + " " + lobaratrophyP + "\n" +
ventriclesP + "\n" +
MMKP + "\n" +
PituitaryP + PinealP + "\n" +
OrbitsP + MastoidyP + SinusP + "\n" +
dalsiPopis
;

MRbrainPOPText.value = MRbrainPOPText.value.trim(); 
MRbrainPOPText.value = MRbrainPOPText.value.replace(/^\s+/gm, '');  // odstraní mezery na začátku řádek
MRbrainPOPText.value = MRbrainPOPText.value.replace(/^\s*[\r\n]/gm, '');  // odstraní prázdné řádky
MRbrainPOPText.value = MRbrainPOPText.value.split(/\r?\n/).filter(item => item.trim() !== '').join('\n');  // prázdné řádky
MRbrainPOPText.value = MRbrainPOPText.value.replace(/  +/g, ' '); // dvojmezery
MRbrainPOPText.value = MRbrainPOPText.value.replace(/ ,/g, ',');  // smazat mezeru před čárkou
MRbrainPOPText.value = MRbrainPOPText.value.replace(/ \./g, '.'); // smazat mezeru před tečkou
MRbrainPOPText.value = MRbrainPOPText.value.replace(/\.{2,}/g, '.'); // více teček = jedna tečka
MRbrainPOPText.value = MRbrainPOPText.value.replace(/\,{2,}/g, ','); // více čárek = jedna čárka
MRbrainPOPText.value = MRbrainPOPText.value.replace(/,\./g, '.'); // odstraní čárku před tečkou
MRbrainPOPText.value = MRbrainPOPText.value.replace(/  +/g, ' '); // dvojmezery
MRbrainPOPText.value = MRbrainPOPText.value.replace(/^\./gm, ''); // odstraní tečku na začátku řádek
MRbrainPOPText.value = MRbrainPOPText.value.replace(/^\s+/gm, '');  // odstraní mezery na začátku řádek

MRbrainRESText.value = 
RES_FMM_result + "\n\n" +
ExamCompareText + "\n" +
RESBrainLesion1 + "\n" +
RESBrainLesion2 + "\n" +
RESBrainLesion3 + "\n" +
LesionVR + "\n" +
WMLR + WMLLocationR + "\n" + 
GCAR + " " + MTAR + " " + KoedamR + " " + lobaratrophyR + "\n" +
ventriclesR + "\n" +
MMKR + "\n" +
PituitaryR + PinealR + "\n" +
MastoidyR + SinusR + "\n" +
dalsiZaver
; 

MRbrainRESText.value = MRbrainRESText.value.trim(); 
MRbrainRESText.value = MRbrainRESText.value.replace(/^\s+/gm, '');  // odstraní mezery na začátku řádek
MRbrainRESText.value = MRbrainRESText.value.replace(/^\s*[\r\n]/gm, '');  // odstraní prázdné řádky
MRbrainRESText.value = MRbrainRESText.value.split(/\r?\n/).filter(item => item.trim() !== '').join('\n');  // prázdné řádky
MRbrainRESText.value = MRbrainRESText.value.replace(/ ,/g, ',');  // smazat mezeru před čárkou
MRbrainRESText.value = MRbrainRESText.value.replace(/\s+\./g, '.');// smazat mezery před tečkou
MRbrainRESText.value = MRbrainRESText.value.replace(/\.{2,}/g, '.'); // více teček = jedna tečka
MRbrainRESText.value = MRbrainRESText.value.replace(/\,{2,}/g, ','); // více čárek = jedna čárka
MRbrainRESText.value = MRbrainRESText.value.replace(/,\./g, '.'); // odstraní čárku před tečkou
MRbrainRESText.value = MRbrainRESText.value.replace(/  +/g, ' '); // dvojmezery

FINALText.value =
MRbrainNAMEText.value + "\n\n" +
"Sekvence: " + MRbrainSEKVText.value + "\n\n" + 
"Indikace: " + MRbrainINDText.value + "\n\n" + 
MRbrainPOPText.value + "\n\n" + 
"Závěr: " + "\n" + MRbrainRESText.value;

FINALText.value = FINALText.value.replace(/  +/g, ' '); // dvojmezery
FINALText.value = FINALText.value.replace(/ \./g, '.'); // smazat mezeru před tečkou


if (MRbrainRESText.value.trim() === "") {
        MRbrainRESText.value = "Bez patrné patologie.";
    }



document.getElementById("indikace").addEventListener("input", updateTexts);

document.getElementById("LesionVP").addEventListener("input", updateTexts);
document.getElementById("LesionVR").addEventListener("input", updateTexts);

}
updateTexts();	

