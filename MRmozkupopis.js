// dodělat +sekvence, ostatní, více ložisek, ischemii, RS zvlášť



var obecnetext = document.getElementById("obecnetext");
var WMtext = document.getElementById("WMtext");
var MKtext = document.getElementById("MKtext");
var LKtext = document.getElementById("LKtext");



function updateTexts() {
	

var indikace = document.getElementById("indikace").value;

const WMLText = buttonElementWML.innerText;
var WMLLocationText = document.getElementById("WMLLocation").value;
var RSP = ""; var RSR = ""; var checkboxRS = document.getElementById('checkboxRS');

const GCAText = buttonElementGCA.innerText;
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
    results.push("Temporálně bilat.");
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
    results.push("v centrum Ovale bilat.");
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

if (checkedCount > 2 && checkedCountR > 0 && checkedCountL > 0) {
    WMLLocationR = "supratentoriálně bilat.";
} else if (checkedCountR > 1) {
    WMLLocationR = "supratentoriálně vpravo";
} else if (checkedCountL > 1) {
    WMLLocationR = "supratentoriálně vlevo";
} else {
    WMLLocationR = WMLLocationP;
}

document.getElementById('WMLLocation').value = WMLLocationR;


if (checkboxRS.checked) {
    RSP = "";
    RSR = ". Distribucí a charakterem jsou léze suspektní z demyelinizace. ";
} else if (!checkboxRS.checked && (WMLText === "vícečetné" || WMLText === "splývající")) {
    RSP = "";
    RSR = " v.s. v rámci 'small vessel disease'.";
} else if (WMLLocationText === "" && WMLText === "0") {
    RSP = "";
    RSR = "";
} else if (WMLLocationText !== "" && WMLText === "0") {
 WMLLocationP = ""; 
 WMLLocationR = "";
} else {
    RSP = "";
    RSR = ".";
}


// KORTEX 

if (GCAText === "0") {
GCAP = "Subarachnoidální prostory oboustranně šířkou přiměřené k věku. "; 
GCAR = "";
} else if (GCAText === "1") {
 GCAP = "Lehké povšechné zúžení gyrů a rozšíření sulků mozkových hemisfér. ";
 GCAR = "Mírná celková atrofie mozku (GCA grade 1). ";
} else if (GCAText === "2") {
 GCAP = "Středně pokročilé povšechné zúžení gyrů a rozšíření sulků mozkových hemisfér. ";
 GCAR = "Středně pokročilá celková atrofie mozku (GCA grade 2). ";
} else if (GCAText === "3") {
 GCAP = " Výrazné zúžení gyrů a rozšíření sulků mozkových hemisfér. ";
 GCAR = "Pokročilá celková atrofie mozku (GCA grade 3). ";
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
PituitaryP = "Hypofýza normální velikosti uložena v nezvětšeném tureckém sedle. "; 
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
var BrainLesion1Size = formatLesionSize("BrainLesion1Size");
var BrainLesion1RESDecision = document.getElementById("BrainLesion1Decision").value; 
var BrainLesion1AllLocations = "";
var BrainLesion1SignalIntensity = "";
var BrainLesion1PrevSize = formatLesionSize("BrainLesion1PrevSize");

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
POPBrainLesion1 = processedSentencePOPBrainLesion1 + " " + BrainLesion1AllLocations + " " + BrainLesion1POPSignal + " " + BrainLesion1Loclargest + " " + BrainLesion1Size + " " + BrainLesion1SignalIntensity + " " + BrainLesion1Activity + " " + BrainLesion1ComparisonText + ".";

let processedSentenceRESBrainLesionFDG = processSentence(BrainLesion1number + " " + BrainLesion1RESActivityFDG + " " + BrainLesion1type);

RESBrainLesion1 = processedSentenceRESBrainLesionFDG + " " + BrainLesion1AllLocations + " " + BrainLesion1CombinedResult + " " + BrainLesion1RESDecision + ".";

if (BrainLesion1RESDecision.includes("meta") && BrainLesion1type.includes("ožisk")) {RESBrainLesion1 = RESBrainLesion1.replace(/ložisk/g, "meta ložisk").replace(/Ložisk/g, "Meta ložisk").replace(": charakteru meta", ".");}
if (BrainLesion1RESDecision.includes("tumor") && BrainLesion1type.includes("ožisk")) {RESBrainLesion1 = RESBrainLesion1.replace(/ložisk/g, "tumorózní ložisk").replace(/Ložisk/g, "Tumorózní ložisk").replace(": charakteru tumoru", ".");}
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

// bez ložiskových změn
POPNoLesions = "";
if (POPBrainLesion1 === "" && POPBrainLesion2 === "" && LesionVP === "" && WMLText === "0") {POPNoLesions = "Bez ložiskových změn. ";
} else if (POPBrainLesion1 === "" && POPBrainLesion2 === "" && LesionVP === "" && WMLText !== "0") {POPNoLesions = "Jinak bez ložiskových změn. ";
} else {POPNoLesions = "";
}

//bez restrikce


//Latest examination comparison
if (DateCompare === "") {ExamCompareText = ""; POPExamCompareText = "";} else {ExamCompareText = "Oproti vyšetření z " + DateComparison + ":"; POPExamCompareText = "Srovnáno s vyšetřením z " + DateComparison + ". ";}



//POPIS

MRbrainNAMEText.value = "MR mozku";

MRbrainINDText.value = indikace;

MRbrainSEKVText.value = "Mozek v T2W, FLAIR, DWI+ADC, T1W, (event. dle potřeby T2-SPACE, T2-FLASH, SWI, FS, C+). ";

MRbrainPOPText.value = 
POPExamCompareText + "\n" +
POPBrainLesion1 + "\n" +
POPBrainLesion2 + "\n" +
LesionVP + "\n" +
WMLP + WMLLocationP + RSP + "." + "\n" +
POPNoLesions + "\n" +
GCAP + " " + lobaratrophyP + "\n" +
ventriclesP + "\n" +
MMKP + "\n" +
PituitaryP + PinealP + "\n" +
OrbitsP + MastoidyP + SinusP
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
ExamCompareText + "\n" +
RESBrainLesion1 + "\n" +
RESBrainLesion2 + "\n" +
LesionVR + "\n" +
WMLR + WMLLocationR + RSR + "\n" + 
GCAR + lobaratrophyR + "\n" +
ventriclesR + "\n" +
MMKR + "\n" +
PituitaryR + PinealR + "\n" +
MastoidyR + SinusR 
; 

MRbrainRESText.value = MRbrainRESText.value.trim(); 
MRbrainRESText.value = MRbrainRESText.value.replace(/^\s+/gm, '');  // odstraní mezery na začátku řádek
MRbrainRESText.value = MRbrainRESText.value.replace(/^\s*[\r\n]/gm, '');  // odstraní prázdné řádky
MRbrainRESText.value = MRbrainRESText.value.split(/\r?\n/).filter(item => item.trim() !== '').join('\n');  // prázdné řádky
MRbrainRESText.value = MRbrainRESText.value.replace(/ ,/g, ',');  // smazat mezeru před čárkou
MRbrainRESText.value = MRbrainRESText.value.replace(/ \./g, '.'); // smazat mezeru před tečkou
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

