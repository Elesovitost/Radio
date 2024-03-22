// LESIONS (cloning)   --- doplnovat --- 

function cloneAndUpdateIds(sourceId, destId) {
    let sourceElement = document.getElementById(sourceId);
    let clonedElement = sourceElement.cloneNode(true);
    clonedElement.id = destId;

    let sourceNumber = sourceId.match(/\d+/)[0]; // Ensure the number is correctly extracted
    let destNumber = destId.match(/\d+/)[0];

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
    { text: "-", value: ": spíše benigního vzhledu", valuez1: ": v.s. zánětlivá aktivace"},
    { text: "+/-", value: ": nespecifický nález", valuez1: ": nespecifický nález"},
    { text: "+", value: ": suspektní z viabilní neoplázie", valuez1: ": suspektní z infiltrace neoplazií"},
    { text: "+++", value:": charakteru viabilní neoplázie", valuez1: ": charakteru infiltrace neoplazií"}
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



// universal comparison

function generateComparisonText(prevSize, date) {
    if (prevSize.trim() !== "") {
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

    if (prevMax === 0) { // To avoid division by zero
        return "Cannot calculate percentage change due to zero previous size.";
    }

    var change = ((currentMax - prevMax) / prevMax) * 100;
    var roundedChange = Math.round(change / 5) * 5;  // Round to nearest five

    // Check the checkbox state
    var percentageString =  " (cca o " + roundedChange + "%)" ;

    var result = "";
    if (change <= -50) {
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

//new
document.getElementById('BreastLesion1type').addEventListener('change', function() {
  var selectedValue = this.value;   var shapeButton = document.getElementById('BreastLesion1_Shape');  var marginButton = document.getElementById('BreastLesion1_Margin'); var charButton = document.getElementById('BreastLesion1_Character');
  if (selectedValue === 'ložisko| ložiska') {	shapeButton.classList.remove('hidden');	marginButton.classList.remove('hidden');   charButton.classList.add('hidden'); charButton.innerText = "vzhled";
  }  else if (selectedValue === 'neložiskové sycení| neložisková sycení') { shapeButton.classList.add('hidden'); marginButton.classList.add('hidden'); charButton.classList.remove('hidden');   shapeButton.innerText = "tvar"; marginButton.innerText = "okraj";
  }  else { shapeButton.classList.add('hidden'); marginButton.classList.add('hidden'); charButton.classList.add('hidden'); shapeButton.innerText = "tvar"; marginButton.innerText = "okraj"; charButton.innerText = "vzhled";
  }
  updateTexts();
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

document.getElementById('BreastLesion2type').addEventListener('change', function() {
  var selectedValue = this.value;   var shapeButton = document.getElementById('BreastLesion2_Shape');  var marginButton = document.getElementById('BreastLesion2_Margin'); var charButton = document.getElementById('BreastLesion2_Character');
  if (selectedValue === 'ložisko| ložiska') {	shapeButton.classList.remove('hidden');	marginButton.classList.remove('hidden');   charButton.classList.add('hidden'); charButton.innerText = "vzhled";
  }  else if (selectedValue === 'neložiskové sycení| neložisková sycení') { shapeButton.classList.add('hidden'); marginButton.classList.add('hidden'); charButton.classList.remove('hidden');   shapeButton.innerText = "tvar"; marginButton.innerText = "okraj";
  }  else { shapeButton.classList.add('hidden'); marginButton.classList.add('hidden'); charButton.classList.add('hidden'); shapeButton.innerText = "tvar"; marginButton.innerText = "okraj"; charButton.innerText = "vzhled";
  }
  updateTexts();
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

var BreastLesionVP = document.getElementById("BreastLesionVP").value;
var BreastLesionVR = document.getElementById("BreastLesionVR").value;

let codeForBreastLesion1 = `
// LESION1

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

document.querySelectorAll('#BreastLesion1selectLocation .CHB input[type="checkbox"]').forEach(function(chb) {
    chb.addEventListener('change', updateTexts);
});

  var BreastLesion1quadrantP = [];
  var BreastLesion1quadrantL = [];

  // Mapping for checkbox IDs to their descriptions
  const quadrantMappingLesion1 = {
    'HZK': 'v horním zevním kvadrantu',
    'HVK': 'v horním vnitřním kvadrantu',
    'DZK': 'v dolním zevním kvadrantu',
    'DVK': 'v dolním vnitřním kvadrantu',
    'C': 'centrálně'
  };

  const checkboxesLesion1 = document.querySelectorAll('#BreastLesion1selectLocation .CHB input[type="checkbox"]:checked');

  checkboxesLesion1.forEach((checkbox) => {
    const idParts = checkbox.id.split('_');
    const side = idParts[1];
    const quadrant = idParts[2];
    const quadrantText = quadrantMappingLesion1[quadrant];

    if (side === 'R') {
      BreastLesion1quadrantP.push(quadrantText);
    } else if (side === 'L') {
      BreastLesion1quadrantL.push(quadrantText);
    }
  });

  function combineQuadrants(quadrants) {
    if (quadrants.length > 3) {
      return "ve všech kvadrantech";
    } else if (quadrants.includes('v horním zevním kvadrantu') && quadrants.includes('v horním vnitřním kvadrantu')) {
      quadrants = quadrants.filter(q => !['v horním zevním kvadrantu', 'v horním vnitřním kvadrantu'].includes(q));
      quadrants.push("v horních kvadrantech");
    } else if (quadrants.includes('v dolním zevním kvadrantu') && quadrants.includes('v dolním vnitřním kvadrantu')) {
      quadrants = quadrants.filter(q => !['v dolním zevním kvadrantu', 'v dolním vnitřním kvadrantu'].includes(q));
      quadrants.push("v dolních kvadrantech");
    } else if (quadrants.includes('v horním zevním kvadrantu') && quadrants.includes('v dolním zevním kvadrantu')) {
      quadrants = quadrants.filter(q => !['v horním zevním kvadrantu', 'v dolním zevním kvadrantu'].includes(q));
      quadrants.push("v zevních kvadrantech");
    } else if (quadrants.includes('v horním vnitřním kvadrantu') && quadrants.includes('v dolním vnitřním kvadrantu')) {
      quadrants = quadrants.filter(q => !['v horním vnitřním kvadrantu', 'v dolním vnitřním kvadrantu'].includes(q));
      quadrants.push("ve vnitřních kvadrantech");
    }

    return quadrants.join(", ").replace(/, ([^,]*)$/, ' a $1');
  }

  var BreastLesion1Location = '';

  if (BreastLesion1quadrantP.length > 0 && BreastLesion1quadrantL.length > 0) {
    BreastLesion1Location = "nelze v jednom ložisku míchat oba prsy";
  } else if (BreastLesion1quadrantP.length > 0) {
    BreastLesion1Location = "pravého prsu " + combineQuadrants(BreastLesion1quadrantP);
  } else if (BreastLesion1quadrantL.length > 0) {
    BreastLesion1Location = "levého prsu " + combineQuadrants(BreastLesion1quadrantL);
  }

  document.getElementById("BreastLesion1Location").value = BreastLesion1Location;

// shape, margin, character

ButtonCycleInnerTexts["BreastLesion1_Shape"] = ["tvar", "kulatý", "oválný", "lobulární", "nepravidelný"];
var BreastLesion1_Shape = document.getElementById("BreastLesion1_Shape").innerText;

ButtonCycleInnerTexts["BreastLesion1_Margin"] = ["okraj", "hladký", "nepravidelný", "spikulace",];
var BreastLesion1_Margin = document.getElementById("BreastLesion1_Margin").innerText;

ButtonCycleInnerTexts["BreastLesion1_Character"] = ["vzhled", "lineární", "duktální", "segmentální", "nahloučený"];
var BreastLesion1_Character = document.getElementById("BreastLesion1_Character").innerText;

let BreastLesion1Appear = "";
BreastLesion1Appeardescription = [];

if (BreastLesion1_Shape === "tvar") {
    BreastLesion1Appeardescription.push("");
} else if (BreastLesion1_Shape === "kulatý") {
    BreastLesion1Appeardescription.push("kulatého tvaru");
} else if (BreastLesion1_Shape === "oválný") {
    BreastLesion1Appeardescription.push("oválného tvaru");
} else if (BreastLesion1_Shape === "lobulární") {
    BreastLesion1Appeardescription.push("lobulárního tvaru");
} else if (BreastLesion1_Shape === "nepravidelný") {
    BreastLesion1Appeardescription.push("nepravidelného tvaru");
}

if (BreastLesion1_Margin === "okraj") {
    BreastLesion1Appeardescription.push("");
} else if (BreastLesion1_Margin === "hladký") {
    BreastLesion1Appeardescription.push("hladkého okraje");
} else if (BreastLesion1_Margin === "nepravidelný") {
    BreastLesion1Appeardescription.push("nepravidelného okraje");
} else if (BreastLesion1_Margin === "spikulace") {
    BreastLesion1Appeardescription.push("se spukulacemi okraje");
}

if (BreastLesion1_Character === "lineární") {
    BreastLesion1Appeardescription.push("lineární distribuce");
} else if (BreastLesion1_Character === "duktální") {
    BreastLesion1Appeardescription.push("duktální distribuce");
} else if (BreastLesion1_Character === "segmentální") {
    BreastLesion1Appeardescription.push("segmentálního charakteru");
} else if (BreastLesion1_Character === "nahloučený") {
    BreastLesion1Appeardescription.push("vzhledu nahloučení");
}

if (BreastLesion1Appeardescription.length === 0) {
    BreastLesion1Appear = "";
} else if (BreastLesion1Appeardescription.length === 1) {
    BreastLesion1Appear = BreastLesion1Appeardescription[0] + ", ";
} else {
    BreastLesion1Appear = BreastLesion1Appeardescription.join(", ") + ", ";
}


//MR desc

var BreastLesion1descriptions = [];

// T1
ButtonCycleInnerTexts["BreastLesion1_T1"] = ["0", "-", "+/-", "+"];
var BreastLesion1_T1 = document.getElementById("BreastLesion1_T1").innerText;

if (BreastLesion1_T1 === "-") {
    BreastLesion1descriptions.push("T1-");
} else if (BreastLesion1_T1 === "+/-") {
    BreastLesion1descriptions.push("T1izo");
} else if (BreastLesion1_T1 === "+") {
    BreastLesion1descriptions.push("T1+");
}

// T2 FS
ButtonCycleInnerTexts["BreastLesion1_T2FS"] = ["0", "-", "+/-", "+"];
var BreastLesion1_T2FS = document.getElementById("BreastLesion1_T2FS").innerText;

if (BreastLesion1_T2FS === "-") {
    BreastLesion1descriptions.push("T2FS-");
} else if (BreastLesion1_T2FS === "+/-") {
    BreastLesion1descriptions.push("T2FSizo");
} else if (BreastLesion1_T2FS === "+") {
    BreastLesion1descriptions.push("T2FS+");
}

// T1 C+
ButtonCycleInnerTexts["BreastLesion1_T1C"] = ["0", "+", "++",];
var BreastLesion1_T1C = document.getElementById("BreastLesion1_T1C").innerText;

if (BreastLesion1_T1C === "+") {
    BreastLesion1descriptions.push("T1C+");
} else if (BreastLesion1_T1C === "++") {
    BreastLesion1descriptions.push("T1C++");
} 

// T1 C+ character
ButtonCycleInnerTexts["BreastLesion1_T1Cchar"] = ["homogenní", "heterogenní", "okrajové", "bez sycení sept", "sycení sept", "centrální"];
var BreastLesion1_T1Cchar = document.getElementById("BreastLesion1_T1Cchar").innerText;

// T1 C+ kinetics
ButtonCycleInnerTexts["BreastLesion1_T1Ckin"] = ["typ 1", "typ 2", "typ 3"];
var BreastLesion1_T1Ckin = document.getElementById("BreastLesion1_T1Ckin").innerText;

if (BreastLesion1_T1C !== "0") {
    if (BreastLesion1_T1Cchar === "homogenní") {
        BreastLesion1descriptions.push("homogenním");
    } else if (BreastLesion1_T1Cchar === "heterogenní") {
        BreastLesion1descriptions.push("heterogenním");
    } else if (BreastLesion1_T1Cchar === "okrajové") {
        BreastLesion1descriptions.push("okrajovým");
    } else if (BreastLesion1_T1Cchar === "bez sycení sept") {
        BreastLesion1descriptions.push("bez sycení sept");
    } else if (BreastLesion1_T1Cchar === "sycení sept") {
        BreastLesion1descriptions.push("se sycením sept");
    } else if (BreastLesion1_T1Cchar === "centrální") {
        BreastLesion1descriptions.push("centrálním");
    }

    if (BreastLesion1_T1Ckin === "typ 1") {
        BreastLesion1descriptions.push("s křivkou typu 1 - kontinuální růst");
    } else if (BreastLesion1_T1Ckin === "typ 2") {
        BreastLesion1descriptions.push("s křivkou typu 2 - plató");
    } else if (BreastLesion1_T1Ckin === "typ 3") {
        BreastLesion1descriptions.push("s křivkou typu 3 - washout");
    }
}


if (BreastLesion1_T1C !== "0") {
    document.getElementById("BreastLesion1_idtr1").classList.remove("hidden");
	document.getElementById("BreastLesion1_idtr2").classList.remove("hidden");
} else {
    document.getElementById("BreastLesion1_idtr1").classList.add("hidden");
	document.getElementById("BreastLesion1_idtr2").classList.add("hidden");
}


// Remove empty strings
BreastLesion1descriptions = BreastLesion1descriptions.filter(Boolean);

var descriptionText;
if (BreastLesion1descriptions.length > 1) {
	var lastDescription = BreastLesion1descriptions.pop();
	descriptionText = BreastLesion1descriptions.join(", ") + ", " + lastDescription;
} else {
	descriptionText = BreastLesion1descriptions.join("");
}

BreastLesion1Signal.value = BreastLesion1descriptions.length > 0 ? descriptionText.trim() : "";
BreastLesion1POPSignal = BreastLesion1Signal.value;
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
POPBreastLesion1 = processedSentencePOPBreastLesion1 + " " + BreastLesion1AllLocations + " " + BreastLesion1Appear + " " + BreastLesion1POPSignal + " " + BreastLesion1Loclargest + " " + BreastLesion1Size + " " + BreastLesion1SignalIntensity + " " + BreastLesion1Activity + " " + BreastLesion1ComparisonText + ".";

let processedSentenceRESBreastLesion1 = processSentence(BreastLesion1number + " " + BreastLesion1RESActivityFDG + " " + BreastLesion1type);
RESBreastLesion1 = processedSentenceRESBreastLesion1 + " " + BreastLesion1AllLocations + " " + BreastLesion1CombinedResult + " " + BreastLesion1RESDecision + ".";

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

MRBreastPOPText.value = 
POPBreastLesion1 + "\n" + 
POPBreastLesion2 + "\n" + 
POPBreastLesion3 + "\n" +
BreastLesionVP ;

MRBreastPOPText.value = MRBreastPOPText.value.trim(); 
MRBreastPOPText.value = MRBreastPOPText.value.replace(/  +/g, ' '); // dvojmezery
MRBreastPOPText.value = MRBreastPOPText.value.replace(/ ,/g, ',');  // smazat mezeru před čárkou
MRBreastPOPText.value = MRBreastPOPText.value.replace(/\,{2,}/g, ','); // více čárek = jedna čárka
MRBreastPOPText.value = MRBreastPOPText.value.replace(/ \./g, '.'); // smazat mezeru před tečkou
MRBreastPOPText.value = MRBreastPOPText.value.replace(/,\./g, '.'); // odstraní čárku před tečkou


MRBreastRESText.value = 
RESBreastLesion1 + "\n" + 
RESBreastLesion2 + "\n" + 
RESBreastLesion3 + "\n" +
BreastLesionVR ;

document.getElementById("indikace").addEventListener("input", updateTexts);

document.getElementById("BreastLesionVP").addEventListener("input", updateTexts);
document.getElementById("BreastLesionVR").addEventListener("input", updateTexts);

}
updateTexts();	