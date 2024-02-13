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

    // Check if sourceElement has a next sibling, and use insertBefore to place the clone after sourceElement
    let parent = sourceElement.parentNode;
    let nextSibling = sourceElement.nextElementSibling;
    if (nextSibling) {
        parent.insertBefore(clonedElement, nextSibling);
    } else {
        parent.appendChild(clonedElement); // Fallback if sourceElement is the last child
    }
}

cloneAndUpdateIds("BrainLesion1", "BrainLesion2");
cloneAndUpdateIds("BrainLesion1selectLocation", "BrainLesion2selectLocation");
cloneAndUpdateIds("BrainLesion1selectSignal", "BrainLesion2selectSignal");

cloneAndUpdateIds("BrainLesion1", "BrainLesion3");
cloneAndUpdateIds("BrainLesion1selectLocation", "BrainLesion3selectLocation");
cloneAndUpdateIds("BrainLesion1selectSignal", "BrainLesion3selectSignal");

// GRAMMAR

function processSentence(sentence) {
	sentence = sentence.trim();
    const words = sentence.split(/\s+/);
    const containsExactWord = (word) => words.includes(word);

    if (containsExactWord("fokusy") || 
		containsExactWord("noduly") || 
		containsExactWord("ložisko") || 
		containsExactWord("infiltráty") || 
		containsExactWord("tumory") || 
		containsExactWord("pakety")) {
        // No changes needed
    }

    if (containsExactWord("fokus") || 
		containsExactWord("nodul") || 
		containsExactWord("infiltrát") || 
		containsExactWord("tumor") || 
		containsExactWord("paket")) {
        sentence = sentence.replace(/metabolické/g, "metabolický").replace(/četné /g, "četný ");
    }

    if (containsExactWord("masa") || 
		containsExactWord("expanze") || 
		containsExactWord("infiltrace") || 
		containsExactWord("konsolidace") || 
		containsExactWord("opacita") || 
		containsExactWord("ložiska") || 
		containsExactWord("struktura") ||
		containsExactWord("uzlina")) {
        sentence = sentence.replace(/metabolické/g, "metabolická").replace(/četné /g, "četná ");
    }

    if (containsExactWord("masy") || 
		containsExactWord("expanzePL") || 
		containsExactWord("infiltracePL") || 
		containsExactWord("konsolidacePL") || 
		containsExactWord("opacity") || 
		containsExactWord("struktury") ||
		containsExactWord("uzliny")) {
        sentence = sentence.replace(/expanzePL/g, "expanze").replace(/infiltracePL/g, "infiltrace").replace(/dva/g, "dvě");
    }
	
	if (containsExactWord("ložiska")) 
		{
        sentence = sentence.replace(/dva/g, "dvě");
    }

    sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);

    return sentence;
}


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
var selectElementWMLkde = document.getElementById("WMLkde");
var buttonElementGCA = document.getElementById("GCAButton");
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

	

// Brainlesions hide

// LESION1

document.getElementById('BrainNewLesion1').addEventListener('click', function() {
  var element = document.getElementById('BrainLesion1');
  element.classList.toggle('hidden'); this.classList.toggle('toggleColorRed');
  updateTexts();
});

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




//LESION2

document.getElementById('BrainNewLesion2').addEventListener('click', function() {
  var element = document.getElementById('BrainLesion2');
  element.classList.toggle('hidden'); this.classList.toggle('toggleColorRed');
  updateTexts();
});

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

document.getElementById('BrainNewLesion3').addEventListener('click', function() {
  var element = document.getElementById('BrainLesion3');
  element.classList.toggle('hidden'); this.classList.toggle('toggleColorRed');
  updateTexts();
});

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

newLesionV.addEventListener("click", function() {
    LesionVcontent.classList.toggle("hidden"); this.classList.toggle('toggleColorRed');
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
    { text: "---", value: ": benigního vzhledu", valuez1: ": benigního vzhledu"},
    { text: "-", value: ": nemá charakter viabilní neoplázie", valuez1: ": v.s. zánětlivá aktivace"},
    { text: "+/-", value: ": nespecifický nález", valuez1: ": nespecifický nález"},
    { text: "+", value: ": suspektní z viabilní neoplázie", valuez1: ": suspektní z infiltrace neoplazií"},
    { text: "+++", value:": charakteru viabilní neoplázie", valuez1: ": charakteru infiltrace neoplazií"},
	{ text: "M1", value:": charakteru meta", valuez1: ": infiltrace neoplazií"}
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



// TABLES others OVERLAY

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('others')) {
        var tableId = event.target.id + 'table';
        var table = document.getElementById(tableId);
        
        var overlayTables = document.querySelectorAll('.overlay');
        overlayTables.forEach(function(otherTable) {
            if (otherTable.id !== tableId) {
                otherTable.classList.add('hidden');
                otherTable.classList.remove('overlay');
            }
        });
        
        table.classList.toggle('overlay');
        table.classList.toggle('hidden');
    }
});

document.addEventListener('click', function(event) {
    var overlayTables = document.querySelectorAll('.overlay');
    overlayTables.forEach(function(table) {
        if (!table.contains(event.target) && !event.target.classList.contains('others')) {
            table.classList.add('hidden');
            table.classList.remove('overlay');
        }
    });
});

//input textareas resizable

var InputTextAreas = document.querySelectorAll('.inputothers, .inputOtherFinding');
InputTextAreas.forEach(function(InputTextArea) {
    InputTextArea.addEventListener('input', function() {
        // Reset the height to ensure correct calculation
        this.style.height = '22px';
        // Set the height to the scrollHeight to fit the content
        this.style.height = (this.scrollHeight) + 'px';
    });
});


// button tables overlay change color

function isAnyCheckboxChecked(tableId) {
    var checkboxes = document.querySelectorAll('#' + tableId + ' input[type="checkbox"]');
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            return true;
        }
    }
    return false;
}

function updateButtonColor(buttonId, tableId) {
    var button = document.getElementById(buttonId);
    if (isAnyCheckboxChecked(tableId)) {
        button.style.backgroundColor = '#D4A29C';
    } else {
        button.style.backgroundColor = ''; 
    }
}

document.addEventListener('change', function(event) {
    if (event.target.type === 'checkbox') {
        var table = event.target.closest('[id$="table"]');
        if (table) {
            var buttonId = table.id.replace('table', '');
            updateButtonColor(buttonId, table.id);
        }
    }
});

// button tables overlay unchecked

function uncheckAllCheckboxes(tableId) {
    var checkboxes = document.querySelectorAll('#' + tableId + ' input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
    });
}

document.addEventListener('contextmenu', function(event) {
    if (event.target.classList.contains('others')) {
        event.preventDefault(); // Prevent the default right-click context menu

        var tableId = event.target.id + 'table';
        uncheckAllCheckboxes(tableId);

        var buttonId = tableId.replace('table', '');
        updateButtonColor(buttonId, tableId);
		updateTexts();
    }
});

