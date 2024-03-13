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

cloneAndUpdateIds("BreastLesion1", "BreastLesion2");
cloneAndUpdateIds("BreastLesion1selectLocation", "BreastLesion2selectLocation");
cloneAndUpdateIds("BreastLesion1selectSignal", "BreastLesion2selectSignal");

cloneAndUpdateIds("BreastLesion1", "BreastLesion3");
cloneAndUpdateIds("BreastLesion1selectLocation", "BreastLesion3selectLocation");
cloneAndUpdateIds("BreastLesion1selectSignal", "BreastLesion3selectSignal");


// Breastlesions hide

// new LESIONS

document.getElementById('BreastNewLesions').addEventListener('click', function() {
  var lesionIds = ['BreastLesion1', 'BreastLesion2', 'BreastLesion3'];

  for (var i = 0; i < lesionIds.length; i++) {
    var element = document.getElementById(lesionIds[i]);
    if (element.classList.contains('hidden')) {
      element.classList.remove('hidden');
      break; 
    }
  }
  updateBreastButtonColor();
});

document.getElementById('BreastNewLesions').addEventListener('contextmenu', function(event) {
  event.preventDefault();
  var lesionIds = ['BreastLesion3', 'BreastLesion2', 'BreastLesion1'];

  for (var i = 0; i < lesionIds.length; i++) {
    var element = document.getElementById(lesionIds[i]);
    if (!element.classList.contains('hidden')) {
      element.classList.add('hidden');
      break; 
    }
  }
  updateBreastButtonColor();
});


function updateBreastButtonColor() {
    var Breastlesions = ['BreastLesion1', 'BreastLesion2', 'BreastLesion3'];
    var Breastbutton = document.getElementById('BreastNewLesions');
    var isHidden = Breastlesions.every(function(id) {
        return document.getElementById(id).classList.contains('hidden');
    });

    if (isHidden) {
        Breastbutton.classList.remove('toggleColorRed');
    } else {
        Breastbutton.classList.add('toggleColorRed');
    }
}


document.getElementById('BreastLesion1no').addEventListener('click', function() {
  var element = document.getElementById('BreastLesion1');
  element.classList.add('hidden'); 
  updateTexts();
  updateBreastButtonColor();
});

document.getElementById('BreastLesion2no').addEventListener('click', function() {
  var element = document.getElementById('BreastLesion2');
  element.classList.add('hidden');
  updateTexts();
  updateBreastButtonColor();
});

document.getElementById('BreastLesion3no').addEventListener('click', function() {
  var element = document.getElementById('BreastLesion3');
  element.classList.add('hidden');
  updateTexts();
  updateBreastButtonColor();
});


// LESION1


document.getElementById('BreastLesion1no').addEventListener('click', function() {
  var element = document.getElementById('BreastLesion1');
  element.classList.add('hidden');
  updateTexts();
});

document.getElementById('BreastLesion1number').addEventListener('change', function() {
  let selectedValue = this.value;
  let BreastLesion1LoclargestElement = document.getElementById('BreastLesion1Loclargest');

  if (selectedValue !== "") {
    BreastLesion1LoclargestElement.classList.remove('hidden');
  } else {
    BreastLesion1LoclargestElement.classList.add('hidden');
  }
});

document.getElementById('BreastLesion1Location').addEventListener('focus', function() {
  var dropdown = document.getElementById('BreastLesion1selectLocation');
  var rect = this.getBoundingClientRect();
  dropdown.style.left = rect.left + 'px'; dropdown.style.top = rect.bottom + 2 + 'px'; dropdown.classList.remove('hidden');
});

document.addEventListener('click', function(e) {
  var dropdown = document.getElementById('BreastLesion1selectLocation');
  if (!document.getElementById('BreastLesion1Location').contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.add('hidden');
  }
});

document.getElementById('BreastLesion1Signal').addEventListener('focus', function() {
  var dropdown = document.getElementById('BreastLesion1selectSignal');
  var rect = this.getBoundingClientRect();
  dropdown.style.left = rect.left + 'px'; dropdown.style.top = rect.bottom + 2 + 'px'; dropdown.classList.remove('hidden');
});

document.addEventListener('click', function(e) {
  var dropdown = document.getElementById('BreastLesion1selectSignal');
  if (!document.getElementById('BreastLesion1Signal').contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.add('hidden');
  }
});




//LESION2

document.getElementById('BreastLesion2no').addEventListener('click', function() {
  var element = document.getElementById('BreastLesion2');
  element.classList.add('hidden');
  updateTexts();
});

document.getElementById('BreastLesion2number').addEventListener('change', function() {
  let selectedValue = this.value;
  let BreastLesion2LoclargestElement = document.getElementById('BreastLesion2Loclargest');

  if (selectedValue !== "") {
    BreastLesion2LoclargestElement.classList.remove('hidden');
  } else {
    BreastLesion2LoclargestElement.classList.add('hidden');
  }
});

document.getElementById('BreastLesion2Location').addEventListener('focus', function() {
  var dropdown = document.getElementById('BreastLesion2selectLocation');
  var rect = this.getBoundingClientRect();
  dropdown.style.left = rect.left + 'px'; dropdown.style.top = rect.bottom + 2 + 'px'; dropdown.classList.remove('hidden');
});

document.addEventListener('click', function(e) {
  var dropdown = document.getElementById('BreastLesion2selectLocation');
  if (!document.getElementById('BreastLesion2Location').contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.add('hidden');
  }
});

document.getElementById('BreastLesion2Signal').addEventListener('focus', function() {
  var dropdown = document.getElementById('BreastLesion2selectSignal');
  var rect = this.getBoundingClientRect();
  dropdown.style.left = rect.left + 'px'; dropdown.style.top = rect.bottom + 2 + 'px'; dropdown.classList.remove('hidden');
});

document.addEventListener('click', function(e) {
  var dropdown = document.getElementById('BreastLesion2selectSignal');
  if (!document.getElementById('BreastLesion2Signal').contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.add('hidden');
  }
});


//LESION3

document.getElementById('BreastLesion3no').addEventListener('click', function() {
  var element = document.getElementById('BreastLesion3');
  element.classList.add('hidden');
  updateTexts();
});

document.getElementById('BreastLesion3number').addEventListener('change', function() {
  let selectedValue = this.value;
  let BreastLesion3LoclargestElement = document.getElementById('BreastLesion3Loclargest');

  if (selectedValue !== "") {
    BreastLesion3LoclargestElement.classList.remove('hidden');
  } else {
    BreastLesion3LoclargestElement.classList.add('hidden');
  }
});

document.getElementById('BreastLesion3Location').addEventListener('focus', function() {
  var dropdown = document.getElementById('BreastLesion3selectLocation');
  var rect = this.getBoundingClientRect();
  dropdown.style.left = rect.left + 'px'; dropdown.style.top = rect.bottom + 2 + 'px'; dropdown.classList.remove('hidden');
});

document.addEventListener('click', function(e) {
  var dropdown = document.getElementById('BreastLesion3selectLocation');
  if (!document.getElementById('BreastLesion3Location').contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.add('hidden');
  }
});

document.getElementById('BreastLesion3Signal').addEventListener('focus', function() {
  var dropdown = document.getElementById('BreastLesion3selectSignal');
  var rect = this.getBoundingClientRect();
  dropdown.style.left = rect.left + 'px'; dropdown.style.top = rect.bottom + 2 + 'px'; dropdown.classList.remove('hidden');
});

document.addEventListener('click', function(e) {
  var dropdown = document.getElementById('BreastLesion3selectSignal');
  if (!document.getElementById('BreastLesion3Signal').contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.add('hidden');
  }
});


//LesionV unhiding

document.getElementById('BreastNewOther1').addEventListener('click', function() {
  var element = document.getElementById('BreastOther1');
  element.classList.remove('hidden');  this.classList.add('toggleColorRed');
  updateTexts();
});

document.getElementById('BreastNewOther1').addEventListener('contextmenu', function(event) {
  event.preventDefault(); 
  var element = document.getElementById('BreastOther1');
  element.classList.add('hidden');  this.classList.remove('toggleColorRed');
  updateTexts();
});

document.getElementById('BreastOther1no').addEventListener('click', function() {
  var element = document.getElementById('BreastOther1');
  element.classList.add('hidden');
  var button = document.getElementById('BreastNewOther1');
  button.classList.remove('toggleColorRed');
  updateTexts();
});



// UPDATETEXTS


function updateTexts() {

var indikace = document.getElementById("indikace").value;


// LESION1
let codeForBreastLesion1 = `

var BreastLesion1Button = document.getElementById("BreastLesion1");
var BreastLesion1number = document.getElementById("BreastLesion1number").value;
var BreastLesion1type = document.getElementById("BreastLesion1type").value.split("|");
var BreastLesion1Location = document.getElementById("BreastLesion1Location").value;
var BreastLesion1AddLocation = document.getElementById("BreastLesion1AddLocation").value;
var BreastLesion1Loclargest = document.getElementById("BreastLesion1Loclargest").value;
var BreastLesion1Activity = document.getElementById("BreastLesion1Activity").value; var BreastLesion1ActivityCopy = document.getElementById("BreastLesion1Activity").value;
var BreastLesion1RESActivityFDG = document.getElementById("BreastLesion1Activity"); var selectedOption = BreastLesion1RESActivityFDG.options[BreastLesion1RESActivityFDG.selectedIndex]; var BreastLesion1RESActivityFDG = selectedOption.dataset.valuez2 ? selectedOption.dataset.valuez2 : '';
var BreastLesion1Size = formatLesionSize("BreastLesion1Size");
var BreastLesion1RESDecision = document.getElementById("BreastLesion1Decision").value; 
var BreastLesion1AllLocations = "";
var BreastLesion1SignalIntensity = "";
var BreastLesion1PrevSize = formatLesionSize("BreastLesion1PrevSize");

var BreastLesion1ComparisonText = generateComparisonText(BreastLesion1PrevSize, DateComparison);
var BreastLesion1ComparisonSizeRes = compareSizes(BreastLesion1Size, BreastLesion1PrevSize);
var BreastLesion1CombinedResult = combineComparisonResults( BreastLesion1ComparisonSizeRes,  BreastLesion1number);

//location
var BreastLesion1Location = "";
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

if (BreastLesion1number === "") {
	var combinedRight = combineSameSideLocations(locationRight, "vpravo");
	var combinedLeft = combineSameSideLocations(locationLeft, "vlevo");
	BreastLesion1Location = formatLocationString(combinedRight.concat(combinedLeft));
} else {
	BreastLesion1Location = formatLocationString(bilateralLocations.concat(locationRight, locationLeft));
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

var BreastLesion1LocationInput = document.getElementById("BreastLesion1Location"); if (BreastLesion1LocationInput) {BreastLesion1LocationInput.value = BreastLesion1Location.trim();}
//end location 



var BreastLesion1descriptions = [];

// T1
if (document.getElementById('Chb1SignalT1hyper').checked) BreastLesion1descriptions.push("T1+");
if (document.getElementById('Chb1SignalT1iso').checked) BreastLesion1descriptions.push("T1izo");
if (document.getElementById('Chb1SignalT1hypo').checked) BreastLesion1descriptions.push("T1-");

// T2
if (document.getElementById('Chb1SignalT2hyper').checked) BreastLesion1descriptions.push("T2+");
if (document.getElementById('Chb1SignalT2iso').checked) BreastLesion1descriptions.push("T2izo");
if (document.getElementById('Chb1SignalT2hypo').checked) BreastLesion1descriptions.push("T2-");

// FLAIR
if (document.getElementById('Chb1SignalFLAIRhyper').checked) BreastLesion1descriptions.push("FLAIR+");
if (document.getElementById('Chb1SignalFLAIRiso').checked) BreastLesion1descriptions.push("FLAIRizo");
if (document.getElementById('Chb1SignalFLAIRhypo').checked) BreastLesion1descriptions.push("FLAIR-");

// DWI
if (document.getElementById('Chb1SignalDWIhyper').checked) BreastLesion1descriptions.push("DWI+");
if (document.getElementById('Chb1SignalDWIhypo').checked) BreastLesion1descriptions.push("DWI-");

// SWI
if (document.getElementById('Chb1SignalSWIhyper').checked) BreastLesion1descriptions.push("se suscept. artefakty");

// T1C+
if (document.getElementById('Chb1SignalT1Chyper').checked) BreastLesion1descriptions.push("T1C++");
if (document.getElementById('Chb1SignalT1Ciso').checked) BreastLesion1descriptions.push("T1C+");
if (document.getElementById('Chb1SignalT1Chypo').checked) BreastLesion1descriptions.push("T1C0");



// Remove empty strings
BreastLesion1descriptions = BreastLesion1descriptions.filter(Boolean);

// Joining BreastLesion1descriptions with proper grammar
var descriptionText;
if (BreastLesion1descriptions.length > 1) {
	var lastDescription = BreastLesion1descriptions.pop();
	descriptionText = BreastLesion1descriptions.join(", ") + ", " + lastDescription;
} else {
	descriptionText = BreastLesion1descriptions.join("");
}

BreastLesion1Signal.value = BreastLesion1descriptions.length > 0 ? descriptionText.trim() : "";
BreastLesion1POPSignal = BreastLesion1Signal.value;
BreastLesion1POPSignal = BreastLesion1POPSignal.replace("DWI+", "se zvýšenou restrikcí difuze"); BreastLesion1POPSignal = BreastLesion1POPSignal.replace("DWI-", "bez zvýšené restrikce difuze");
BreastLesion1POPSignal = BreastLesion1POPSignal.replace("T1C++", "s výrazným postkontrastním sycením"); BreastLesion1POPSignal = BreastLesion1POPSignal.replace("T1C+", "s mírným postkontrastním sycením"); BreastLesion1POPSignal = BreastLesion1POPSignal.replace("T1C0", "bez sycení postkontrastně");

var POPBreastLesion1 = "";
var RESBreastLesion1 = "";

if (BreastLesion1Loclargest !== "") {
	BreastLesion1Loclargest = BreastLesion1ActivityCopy + ". Největší " + BreastLesion1Loclargest + " ";
	BreastLesion1Activity = "";
}

BreastLesion1AllLocations = BreastLesion1Location + " " + BreastLesion1AddLocation;


if (BreastLesion1number === "") {
	BreastLesion1type = BreastLesion1type[0];
} else if (BreastLesion1number !== "" && BreastLesion1Loclargest !== "") {
	BreastLesion1type = BreastLesion1type[1];
} else if (BreastLesion1number !== "" && BreastLesion1Loclargest === "") {
	BreastLesion1type = BreastLesion1type[1];
	BreastLesion1Size = BreastLesion1Size.replace('diametru ', 'diametru až '); 
	BreastLesion1Size = BreastLesion1Size.replace('rozměru ', 'rozměru až '); 
} 	

let processedSentencePOPBreastLesion1 = processSentence(BreastLesion1number + " " + BreastLesion1type);	
POPBreastLesion1 = processedSentencePOPBreastLesion1 + " " + BreastLesion1AllLocations + " " + BreastLesion1POPSignal + " " + BreastLesion1Loclargest + " " + BreastLesion1Size + " " + BreastLesion1SignalIntensity + " " + BreastLesion1Activity + " " + BreastLesion1ComparisonText + ".";

let processedSentenceRESBreastLesionFDG = processSentence(BreastLesion1number + " " + BreastLesion1RESActivityFDG + " " + BreastLesion1type);

RESBreastLesion1 = processedSentenceRESBreastLesionFDG + " " + BreastLesion1AllLocations + " " + BreastLesion1CombinedResult + " " + BreastLesion1RESDecision + ".";

if (BreastLesion1RESDecision.includes("meta") && BreastLesion1type.includes("ožisk")) {RESBreastLesion1 = RESBreastLesion1.replace(/ložisk/g, "meta ložisk").replace(/Ložisk/g, "Meta ložisk").replace(": charakteru meta", ".");}

if (BreastLesion1.classList.contains('hidden')) {POPBreastLesion1 = ""; RESBreastLesion1 = "";}

`;

let codeForBreastLesion2 = codeForBreastLesion1.replace(/Lesion1/g, 'Lesion2').replace(/Chb1/g, 'Chb2');
let codeForBreastLesion3 = codeForBreastLesion1.replace(/Lesion1/g, 'Lesion3').replace(/Chb1/g, 'Chb3');
eval(codeForBreastLesion1);
eval(codeForBreastLesion2);
eval(codeForBreastLesion3);


//POPIS
	
MRBreastNAMEText.value = "MR prsů";
MRBreastSEKVText.value = "";
MRBreastPOPText.value = "";
MRBreastRESText.value = "";

}
updateTexts();	