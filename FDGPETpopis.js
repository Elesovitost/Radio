// DODĚLAT
// hlasivky aktivita
// minule ložisko (stac. a nově)
// u patol. uzlin procent. rozdíl nemá smysl, když je to v krátké ose. Řešit tlačítkem?

function updateTexts() {

var indikace = document.getElementById("indikace").value;


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


// universal SUV

function formatSUV(variableName) {
    var elementValue = document.getElementById(variableName).value;

    if (elementValue && elementValue.trim() !== "") {
        elementValue = elementValue.trim().replace('.', ',');
        return "s SUVmax=" + elementValue;
    }

    return "";
}


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

function formatLymphNodeSize(variableName) {
  var elementValue = document.getElementById(variableName).value;
  if (elementValue !== "") {
    if (/^\d+$/.test(elementValue)) { 
      return "diametru " + elementValue + " mm v krátké ose";
    } else { 
      return "rozměru " + elementValue + " mm";
    }
  }
  return "";
}


//Date
let DateCompare = document.getElementById("DateCompare").value; 
let date = new Date(DateCompare); let day = String(date.getDate()).padStart(2, '0'); let month = String(date.getMonth() + 1).padStart(2, '0'); let year = date.getFullYear(); let DateComparison = day + "." + month + "." + year + " ";

// checking if the current date is not chosen
let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);  

    let timeDifference = Math.abs(currentDate - date);
    let dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (dayDifference <= 7) {
        alert("pozor, datum současné");
    }


// universal comparison

function generateComparisonText(prevSUV, prevSize, date) {
    if (prevSUV.trim() !== "" || prevSize.trim() !== "") {
		return " (minule " + prevSize + " " + prevSUV + ")";   
    } else {
        return "";
    }
}



// RES SUVmax Comparison

function compareSUVs(currentSUV, previousSUV) {
    if (!currentSUV || !previousSUV || currentSUV.trim() === "" || previousSUV.trim() === "") {
        return "";
    }

    var current = parseFloat(currentSUV.replace('s SUVmax=', '').replace(',', '.').trim());
    var prev = parseFloat(previousSUV.replace('s SUVmax=', '').replace(',', '.').trim());

    if (prev === 0) { 
        return "Cannot calculate percentage change due to zero previous value.";
    }
// this part checks current and last SUVLiver and corrects the result
	var SUVLiver = document.getElementById("SUVLiver").value;
	var SUVLiverPrevious = document.getElementById("SUVLiverPrevious").value;
	if (SUVLiverPrevious && SUVLiverPrevious.trim() !== "") {
    var liverCorrectionFactor = parseFloat(SUVLiver) / parseFloat(SUVLiverPrevious);
    prev = prev * liverCorrectionFactor;
	}
//	-------------------

    var change = ((current - prev) / prev) * 100;

    if (change <= -50) {
        return "ve výrazné metabolické regresi";
    } else if (change > -50 && change <= -20) {
        return "v parciální metabolické regresi";
    } else if (change > -20 && change < 20) {
        return "metabolicky přibližně stacionární";
    } else if (change >= 20 && change < 50) {
        return "v parciální metabolické progresi";
    } else if (change >= 50) {
        return "ve výrazné metabolické progresi";
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
    var showPercentage = document.getElementById('ChbRECIST').checked;
    var percentageString = showPercentage ? " (cca o " + roundedChange + "%)" : "";

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

function combineComparisonResults(sizeRes, suvRes, number) {
    if (!sizeRes && !suvRes) {
        return "";
    }

    var prefix = (number && number.trim() !== "") ? "jsou " : "je ";

    if (!sizeRes) {
        return prefix + suvRes;
    }

    if (!suvRes) {
        return prefix + sizeRes;
    }

    // No need for separate handling for stationary results
    return prefix + sizeRes + " a " + suvRes;
}



// obecne texts

 var ObecneTexts = "";

 if (document.getElementById('ChbFat').checked) {
    ObecneTexts += 'Zvýšená akumulace RF v oblasti metabolicky aktivního tuku krku a trupu symetricky bilat. ';
  }
  if (document.getElementById('ChbParavasR').checked) {
    ObecneTexts += 'Zvýšená akumulace RF v průběhu lymfatik PHK po parc. extravazaci RF při aplikaci. ';
  }
  if (document.getElementById('ChbParavasL').checked) {
    ObecneTexts += 'Zvýšená akumulace RF v průběhu lymfatik LHK po parc. extravazaci RF při aplikaci. ';
  }
  if (document.getElementById('ChbFull').checked) {
    ObecneTexts += 'Vysoká akumulace RF v kosterním svalstvu pravděpodobně při nedodržení lačnění. ';
  }


if (ObecneTexts.trim() === "") {
    ObecneNativeText = "Neložisková akumulace radiofarmaka ve svalech, v gastrointestinální traktu a urotraktu je přítomna na podkladě fyziologických procesů či jako zcela nespecifický nález. ";
} else {
    ObecneNativeText = "Jinak je neložisková akumulace radiofarmaka ve svalech, v gastrointestinální traktu a urotraktu přítomna na podkladě fyziologických procesů či jako zcela nespecifický nález. ";
}

const PETTypeText = buttonElementPETType.innerText;
var elementParotid = document.getElementById('suvmax-parotid-container');

if (PETTypeText === "FDG") {
    nazev = "FDG-PET/CT(MR) trupu"; 
    elementParotid.classList.add('hidden');
}
else if (PETTypeText === "PSMA") {
    ObecneNativeText = "Nativní text pro PSMA."; 
    nazev = "PSMA-PET/CT(MR) trupu"; 
    elementParotid.classList.remove('hidden');
}
else if (PETTypeText === "DOTATOC") {
    ObecneNativeText = "Nativní text pro DOTATOC."; 
    nazev = "DOTATOC-PET/CT(MR) trupu"; 
    elementParotid.classList.add('hidden');
}


// NECK	
// neck lesions (clones)

let codeForNeckLesion1 = `
  var NeckLesionsLocationTexts = {
    "Nasopharynx": "nazofaryngu",
    "TongueApex": "apexu jazyka",
    "GlSubmand": "submandibulární žlázy",
    "Palate": "patra",
    "TongueBody": "těla jazyka",
    "GlParot": "parotické žlázy",
    "Oropharynx": "orofaryngu",
    "TongueRadix": "kořene jazyka",
    "Thyroid": "štítné žlázy",
    "Tonsils": "patrové tonsily",
    "LarynxSupra": "supraglotické části hrtanu",
    "Hypopharynx": "hypofaryngu",
    "LarynxGlot": "glotické části hrtanu",
    "LarynxInfra": "infraglotické části hrtanu",
  };

  var NeckLesion1Locationtext = "";
  for (var key in NeckLesionsLocationTexts) {
    var right = document.getElementById('Chb1' + key + 'R').checked;
    var left = document.getElementById('Chb1' + key + 'L').checked;
    if (right && left) {
      NeckLesion1Locationtext += NeckLesionsLocationTexts[key] + " bilat., ";
    } else {
      if (right) { NeckLesion1Locationtext += NeckLesionsLocationTexts[key] + " vpravo, "; }
      if (left) { NeckLesion1Locationtext += NeckLesionsLocationTexts[key] + " vlevo, "; }
    }
  }
  
  NeckLesion1Locationtext = NeckLesion1Locationtext.trim();
  if (NeckLesion1Locationtext.endsWith(',')) {
    NeckLesion1Locationtext = NeckLesion1Locationtext.substring(0, NeckLesion1Locationtext.length - 1);
  }

  document.getElementById('NeckLesion1Location').value = NeckLesion1Locationtext;

// neck lesion1 popis

	var NeckLesion1Button = document.getElementById("NeckLesion1");
    var NeckLesion1number = document.getElementById("NeckLesion1number").value;
    var NeckLesion1type = document.getElementById("NeckLesion1type").value.split("|");
    var NeckLesion1Location = document.getElementById("NeckLesion1Location").value;
	var NeckLesion1AddLocation = document.getElementById("NeckLesion1AddLocation").value;
    var NeckLesion1Loclargest = document.getElementById("NeckLesion1Loclargest").value;
    var NeckLesion1Activity = document.getElementById("NeckLesion1Activity").value;
	var NeckLesion1RESActivity = document.getElementById("NeckLesion1Activity"); var selectedOption = NeckLesion1RESActivity.options[NeckLesion1RESActivity.selectedIndex]; var NeckLesion1RESActivity = selectedOption.dataset.valuez1 ? selectedOption.dataset.valuez1 : '';
    var NeckLesion1RESAltActivity = document.getElementById("NeckLesion1Activity"); var selectedOption = NeckLesion1RESAltActivity.options[NeckLesion1RESAltActivity.selectedIndex]; var NeckLesion1RESAltActivity = selectedOption.dataset.valuez2 ? selectedOption.dataset.valuez2 : '';
	var NeckLesion1SUV = formatSUV("NeckLesion1SUV");
    var NeckLesion1Size = formatLesionSize("NeckLesion1Size");
	var NeckLesion1RESDecision = document.getElementById("NeckLesion1Decision").value; 
	var NeckLesion1AllLocations = "";
	var NeckLesion1SUVPrev = formatSUV("NeckLesion1SUVPrev");  
	var NeckLesion1PrevSize = formatLesionSize("NeckLesion1PrevSize");
	
	var NeckLesion1ComparisonText = generateComparisonText(NeckLesion1SUVPrev, NeckLesion1PrevSize, DateComparison);
	var NeckLesion1ComparisonSUVRes = compareSUVs(NeckLesion1SUV, NeckLesion1SUVPrev);
	var NeckLesion1ComparisonSizeRes = compareSizes(NeckLesion1Size, NeckLesion1PrevSize);
	var NeckLesion1CombinedResult = combineComparisonResults(NeckLesion1ComparisonSizeRes, NeckLesion1ComparisonSUVRes, NeckLesion1number);
    
    var POPNeckLesion1 = "";
	var RESNeckLesion1 = "";
	
	if (NeckLesion1Loclargest !== "") {
		NeckLesion1Loclargest = ". Největší " + NeckLesion1Loclargest + " ";
	}
	
	NeckLesion1AllLocations = NeckLesion1Location + " " + NeckLesion1AddLocation;
	
	if (NeckLesion1Loclargest === "") { 
		NeckLesion1Size = NeckLesion1Size.replace('diametru ', 'diametru až '); 
		NeckLesion1Size = NeckLesion1Size.replace('rozměru ', 'rozměru až '); 
	}
    
	
	if (NeckLesion1number === "") {
		NeckLesion1type = NeckLesion1type[0];
	} else {
		NeckLesion1type = NeckLesion1type[1];
	} 	

let processedSentencePOPNeckLesion1 = processSentence(NeckLesion1number + " " + NeckLesion1type);	
window.POPNeckLesion1 = processedSentencePOPNeckLesion1 + " " + NeckLesion1AllLocations + " " + NeckLesion1Activity + " " + NeckLesion1Loclargest + " " + NeckLesion1Size + " " + NeckLesion1SUV + " " + NeckLesion1ComparisonText + ".";

let processedSentenceRESNeckLesion1 = processSentence(NeckLesion1number + " " + NeckLesion1RESAltActivity + " " + NeckLesion1type);
window.RESNeckLesion1 = processedSentenceRESNeckLesion1 + " " + NeckLesion1AllLocations + " " + NeckLesion1CombinedResult + " " + NeckLesion1RESDecision + ".";


if (NeckLesion1RESDecision.includes("meta") && NeckLesion1type.includes("ožisk")) {window.RESNeckLesion1 = window.RESNeckLesion1.replace(/ložisk/g, "meta ložisk").replace(/Ložisk/g, "Meta ložisk").replace(": charakteru meta", ".");}


`;

let codeForNeckLesion2 = codeForNeckLesion1.replace(/Lesion1/g, 'Lesion2').replace(/Chb1/g, 'Chb2');
let codeForNeckLesion3 = codeForNeckLesion1.replace(/Lesion1/g, 'Lesion3').replace(/Chb1/g, 'Chb3');
eval(codeForNeckLesion1);
eval(codeForNeckLesion2);
eval(codeForNeckLesion3);

if (NeckLesion1Button.classList.contains('hidden')) {window.POPNeckLesion1 = ""; window.RESNeckLesion1 = "";}
if (NeckLesion2Button.classList.contains('hidden')) {window.POPNeckLesion2 = ""; window.RESNeckLesion2 = "";}
if (NeckLesion3Button.classList.contains('hidden')) {window.POPNeckLesion3 = ""; window.RESNeckLesion3 = "";}

// neck lymph nodes 

var NeckLymphNode1selectLocationtext = "";

var ChbNeckAllR = document.getElementById("ChbNeckAllR").checked;
var ChbNeckAllL = document.getElementById("ChbNeckAllL").checked;
var ChbNeck1AR = document.getElementById("ChbNeck1AR").checked;
var ChbNeck1AL = document.getElementById("ChbNeck1AL").checked;
var ChbNeck1BR = document.getElementById("ChbNeck1BR").checked;
var ChbNeck1BL = document.getElementById("ChbNeck1BL").checked;
var ChbNeck2AR = document.getElementById("ChbNeck2AR").checked;
var ChbNeck2AL = document.getElementById("ChbNeck2AL").checked;
var ChbNeck2BR = document.getElementById("ChbNeck2BR").checked;
var ChbNeck2BL = document.getElementById("ChbNeck2BL").checked;
var ChbNeck3R = document.getElementById("ChbNeck3R").checked;
var ChbNeck3L = document.getElementById("ChbNeck3L").checked;
var ChbNeck4R = document.getElementById("ChbNeck4R").checked;
var ChbNeck4L = document.getElementById("ChbNeck4L").checked;
var ChbNeck5R = document.getElementById("ChbNeck5R").checked;
var ChbNeck5L = document.getElementById("ChbNeck5L").checked;
var ChbNeck6R = document.getElementById("ChbNeck6R").checked;
var ChbNeck6L = document.getElementById("ChbNeck6L").checked;

var descriptions = [];

if (ChbNeckAllR || ChbNeckAllL) {
    if (ChbNeckAllR && ChbNeckAllL) descriptions.push("na krku bilat.");
    else {
        if (ChbNeckAllR) descriptions.push("na pravé polovině krku");
        if (ChbNeckAllL) descriptions.push("na levé polovině krku");
    }
    NeckLymphNode1selectLocationtext = descriptions.join(', ');
} else {

if (ChbNeck1AR && ChbNeck1AL) descriptions.push("Ia bilat.");
else {
    if (ChbNeck1AR) descriptions.push("Ia vpravo");
    if (ChbNeck1AL) descriptions.push("Ia vlevo");
}

if (ChbNeck1BR && ChbNeck1BL) descriptions.push("Ib bilat.");
else {
    if (ChbNeck1BR) descriptions.push("Ib vpravo");
    if (ChbNeck1BL) descriptions.push("Ib vlevo");
}

if (ChbNeck2AR && ChbNeck2AL) descriptions.push("IIa bilat.");
else {
    if (ChbNeck2AR) descriptions.push("IIa vpravo");
    if (ChbNeck2AL) descriptions.push("IIa vlevo");
}

if (ChbNeck2BR && ChbNeck2BL) descriptions.push("IIb bilat.");
else {
    if (ChbNeck2BR) descriptions.push("IIb vpravo");
    if (ChbNeck2BL) descriptions.push("IIb vlevo");
}

if (ChbNeck3R && ChbNeck3L) descriptions.push("III bilat.");
else {
    if (ChbNeck3R) descriptions.push("III vpravo");
    if (ChbNeck3L) descriptions.push("III vlevo");
}

if (ChbNeck4R && ChbNeck4L) descriptions.push("IV bilat.");
else {
    if (ChbNeck4R) descriptions.push("IV vpravo");
    if (ChbNeck4L) descriptions.push("IV vlevo");
}

if (ChbNeck5R && ChbNeck5L) descriptions.push("V bilat.");
else {
    if (ChbNeck5R) descriptions.push("V vpravo");
    if (ChbNeck5L) descriptions.push("V vlevo");
}

if (ChbNeck6R && ChbNeck6L) descriptions.push("VI bilat.");
else {
    if (ChbNeck6R) descriptions.push("VI vpravo");
    if (ChbNeck6L) descriptions.push("VI vlevo");
}

if (descriptions.length === 1) {
    NeckLymphNode1selectLocationtext = "v krčním regiu " + descriptions[0];
} else if (descriptions.length === 2) {
    NeckLymphNode1selectLocationtext = "v krčních regiích " + descriptions.join(' a ');
} else if (descriptions.length > 2) {
    var lastDescription = descriptions.pop();
    var secondLastDescription = descriptions.pop();
    NeckLymphNode1selectLocationtext = "v krčních regiích " + descriptions.join(', ') + ', ' + secondLastDescription + ' a ' + lastDescription;
} else {
    NeckLymphNode1selectLocationtext = descriptions.join(', ');
}

}

document.getElementById('NeckLymphNode1Location').value = NeckLymphNode1selectLocationtext;




// neck lymph node popis

	var NeckLymphNode1Button = document.getElementById("NeckLymphNode1");
    var NeckLymphNode1number = document.getElementById("NeckLymphNode1number").value;
    var NeckLymphNode1type = document.getElementById("NeckLymphNode1type").value.split("|");
    var NeckLymphNode1Location = document.getElementById("NeckLymphNode1Location").value;
	var NeckLymphNode1AddLocation = document.getElementById("NeckLymphNode1AddLocation").value;
    var NeckLymphNode1Loclargest = document.getElementById("NeckLymphNode1Loclargest").value;
    var NeckLymphNode1Activity = document.getElementById("NeckLymphNode1Activity").value;
	var NeckLymphNode1RESActivity = document.getElementById("NeckLymphNode1Activity"); var selectedOption = NeckLymphNode1RESActivity.options[NeckLymphNode1RESActivity.selectedIndex]; var NeckLymphNode1RESActivity = selectedOption.dataset.valuez1 ? selectedOption.dataset.valuez1 : '';
	var NeckLymphNode1RESAltActivity = document.getElementById("NeckLymphNode1Activity"); var selectedOption = NeckLymphNode1RESAltActivity.options[NeckLymphNode1RESAltActivity.selectedIndex]; var NeckLymphNode1RESAltActivity = selectedOption.dataset.valuez2 ? selectedOption.dataset.valuez2 : '';
    var NeckLymphNode1SUV = formatSUV("NeckLymphNode1SUV");
    var NeckLymphNode1Size = formatLymphNodeSize("NeckLymphNode1Size");
	var NeckLymphNode1RESDecision = document.getElementById("NeckLymphNode1Decision"); var selectedOption = NeckLymphNode1RESDecision.options[NeckLymphNode1RESDecision.selectedIndex]; var NeckLymphNode1RESDecision = selectedOption.dataset.valuez1 ? selectedOption.dataset.valuez1 : '';
	var NeckLymphNode1AllLocations = "";
	var NeckLymphNode1SUVPrev = formatSUV("NeckLymphNode1SUVPrev");  
	var NeckLymphNode1PrevSize = formatLymphNodeSize("NeckLymphNode1PrevSize");
	var NeckLymphNode1ComparisonText = generateComparisonText(NeckLymphNode1SUVPrev, NeckLymphNode1PrevSize, DateComparison);
	var NeckLymphNode1ComparisonSUVRes = compareSUVs(NeckLymphNode1SUV, NeckLymphNode1SUVPrev);
	var NeckLymphNode1ComparisonSizeRes = compareSizes(NeckLymphNode1Size, NeckLymphNode1PrevSize);
	var NeckLymphNode1CombinedResult = combineComparisonResults(NeckLymphNode1ComparisonSizeRes, NeckLymphNode1ComparisonSUVRes, NeckLymphNode1number);

    var POPNeckLymphNode1 = "";
	var RESNeckLymphNode1 = "";
	
	if (NeckLymphNode1Loclargest !== "") {
		NeckLymphNode1Loclargest = ". Největší " + NeckLymphNode1Loclargest + " ";
	}
	    
	NeckLymphNode1AllLocations = NeckLymphNode1Location + " " + NeckLymphNode1AddLocation;
	
	if (NeckLymphNode1Loclargest === "") { 
		NeckLymphNode1Size = NeckLymphNode1Size.replace('diametru ', 'diametru až '); 
		NeckLymphNode1Size = NeckLymphNode1Size.replace('rozměru ', 'rozměru až '); 
	}
	
	if (NeckLymphNode1number === "") {
		NeckLymphNode1type = NeckLymphNode1type[0];
	} else {
		NeckLymphNode1type = NeckLymphNode1type[1];
	}

let processedSentencePOPNeckLymphNode1 = processSentence(NeckLymphNode1number + " " + NeckLymphNode1type);	
POPNeckLymphNode1 = processedSentencePOPNeckLymphNode1 + " " + NeckLymphNode1AllLocations + " " + NeckLymphNode1Activity + " " + NeckLymphNode1Loclargest + " " + NeckLymphNode1Size + " " + NeckLymphNode1SUV + " " + NeckLymphNode1ComparisonText + ".";

let processedSentenceRESNeckLymphNode1 = processSentence(NeckLymphNode1number + " " + NeckLymphNode1RESAltActivity + " " + NeckLymphNode1type);
RESNeckLymphNode1 = processedSentenceRESNeckLymphNode1 + " " + NeckLymphNode1AllLocations + " " + NeckLymphNode1CombinedResult + " " + NeckLymphNode1RESDecision + ".";

    
if (NeckLymphNode1Button.classList.contains('hidden')) {POPNeckLymphNode1 = ""; RESNeckLymphNode1 = "";}


// neck native or not

if (
  POPNeckLymphNode1.includes('střední') || POPNeckLymphNode1.includes('zvýšenou') || POPNeckLymphNode1.includes('vysokou') || 
  window.POPNeckLesion1.includes('střední') || window.POPNeckLesion1.includes('zvýšenou') || window.POPNeckLesion1.includes('vysokou') || 
  window.POPNeckLesion2.includes('střední') || window.POPNeckLesion2.includes('zvýšenou') || window.POPNeckLesion2.includes('vysokou') || 
  window.POPNeckLesion3.includes('střední') || window.POPNeckLesion3.includes('zvýšenou') || window.POPNeckLesion3.includes('vysokou')
) {
  POPNeckNative = "";
} else {
  POPNeckNative = "Není přítomen patologický hyperakumulující fokus, ložisko či lymfadenopatie. ";
}


// neck others 

// siny

var HeadMaxSinusText = "";
var HeadMaxSinusRes = "";

  var ChbHeadMaxSinusCystR = document.getElementById("ChbHeadMaxSinusCystR").checked;
  var ChbHeadMaxSinusCystL = document.getElementById("ChbHeadMaxSinusCystL").checked;
  var ChbHeadMaxSinusFullR = document.getElementById("ChbHeadMaxSinusFullR").checked;
  var ChbHeadMaxSinusFullL = document.getElementById("ChbHeadMaxSinusFullL").checked;
  var ChbHeadMaxSinusFluidR = document.getElementById("ChbHeadMaxSinusFluidR").checked;
  var ChbHeadMaxSinusFluidL = document.getElementById("ChbHeadMaxSinusFluidL").checked;
  var HeadMaxSinusOther = document.getElementById("HeadMaxSinusOther").value.trim();

var descriptionsHeadMax = [];

if (ChbHeadMaxSinusCystR && ChbHeadMaxSinusCystL) {
    descriptionsHeadMax.push("retenční cysty / polypy bilat.");
} else {
    if (ChbHeadMaxSinusCystR) descriptionsHeadMax.push("retenční cysta / polyp vpravo");
    if (ChbHeadMaxSinusCystL) descriptionsHeadMax.push("retenční cysta / polyp vpravo");
}

if (ChbHeadMaxSinusFullR && ChbHeadMaxSinusFullL) {
    descriptionsHeadMax.push("nevzdušnost bilat. pravědpodobně při chronickém zánětu");
} else {
    if (ChbHeadMaxSinusFullR) descriptionsHeadMax.push("nevzdušnost vpravo pravědpodobně při chronickém zánětu");
    if (ChbHeadMaxSinusFullL) descriptionsHeadMax.push("nevzdušnost vlevo pravědpodobně při chronickém zánětu");
}

if (ChbHeadMaxSinusFluidR && ChbHeadMaxSinusFluidL) {
    descriptionsHeadMax.push("tekutina bilat.");
} else {
    if (ChbHeadMaxSinusFluidR) descriptionsHeadMax.push("tekutina vpravo");
    if (ChbHeadMaxSinusFluidL) descriptionsHeadMax.push("tekutina vlevo");
}

if (HeadMaxSinusOther) descriptionsHeadMax.push(HeadMaxSinusOther);

if (descriptionsHeadMax.length) {
  HeadMaxSinusText = "Maxilární siny: " + descriptionsHeadMax.join(", ") + ". ";
}

// Tonsils

var HeadTonsilsText = "";
var HeadTonsilsRes = "";

var ChbHeadTonsilsAsymR = document.getElementById("ChbHeadTonsilsAsymR").checked;
var ChbHeadTonsilsAsymL = document.getElementById("ChbHeadTonsilsAsymL").checked;
var ChbHeadAllTonsils = document.getElementById("ChbHeadAllTonsils").checked;
var HeadTonsilsOther = document.getElementById("HeadTonsilsOther").value.trim();

var descriptionsHeadTonsils = [];

if (ChbHeadTonsilsAsymR && ChbHeadTonsilsAsymL) {
    descriptionsHeadTonsils.push("symetricky vysoká akumulace RF v obou patrových tonsilách");
    HeadTonsilsRes = "Metabolická aktivita v obou patrových tonsilách je symetrická. "
} else {
    if (ChbHeadTonsilsAsymR) {
        descriptionsHeadTonsils.push("asymetricky zvýšená akumulace RF v pravé patrové tonsile");
        HeadTonsilsRes = "Asymetricky zvýšená metabolická aktivita v pravé patrové tonsile event. k dovyšetření. "
    }
    if (ChbHeadTonsilsAsymL) {
        descriptionsHeadTonsils.push("asymetricky zvýšená akumulace RF v levé patrové tonsile");
        HeadTonsilsRes = "Asymetricky zvýšená metabolická aktivita v levé patrové tonsile event. k dovyšetření. "
    }
} 

if (ChbHeadAllTonsils) {
    descriptionsHeadTonsils.push("s difuzně vysokou metabolickou aktivitou");
} 

if (HeadTonsilsOther) descriptionsHeadTonsils.push(HeadTonsilsOther);

if (descriptionsHeadTonsils.length) {
  HeadTonsilsText = "Waldeyerův okruh: " + descriptionsHeadTonsils.join(", ") + ". ";
}


// parotidy

var NeckParotidText = "";
  var NeckParotidRes = "";

  var ParotidavidLesionR = document.getElementById("ChbParotidRavidLesion").checked;
  var ParotidavidLesionL = document.getElementById("ChbParotidLavidLesion").checked;
  var ParotidresectionR = document.getElementById("ChbParotidRresection").checked;
  var ParotidresectionL = document.getElementById("ChbParotidLresection").checked;
  var NeckParotidOther = document.getElementById("NeckParotidOther").value.trim();


  if (ParotidavidLesionR || ParotidavidLesionL || ParotidresectionR || ParotidresectionL || NeckParotidOther) {
    NeckParotidText += "Parotické žlázy: ";
  }


  if (ParotidavidLesionR && ParotidavidLesionL) NeckParotidText += "noduly se zvýšenou akumulací RF oboustranně, pravděpodobně benigní etiologie, ";
  else {
    if (ParotidavidLesionR) NeckParotidText += "nodul se zvýšenou akumulací RF vpravo, pravděpodobně benigní etiologie, ";
    if (ParotidavidLesionL) NeckParotidText += "nodul se zvýšenou akumulací RF vlevo, pravděpodobně benigní etiologie, ";
  }

  if (ParotidresectionR && ParotidresectionL) NeckParotidText += "chybí po bilat. resekci, ";
  else {
    if (ParotidresectionR) NeckParotidText += "chybí pravá po resekci, ";
    if (ParotidresectionL) NeckParotidText += "chybí levá po resekci, ";
  }

  if (NeckParotidOther) {
    NeckParotidText += NeckParotidOther + ", ";
  }

  if (NeckParotidText.endsWith(", ")) {
    NeckParotidText = NeckParotidText.slice(0, -2) + ". ";
  }

// thyroid

var NeckThyroidText = ""; var NeckThyroidRes = "";

  var ThyroidenlargementR = document.getElementById("ChbThyroidRenlarge").checked;
  var ThyroidenlargementL = document.getElementById("ChbThyroidLenlarge").checked;
  var ThyroidavidLesionR = document.getElementById("ChbThyroidRavidLesion").checked;
  var ThyroidavidLesionL = document.getElementById("ChbThyroidLavidLesion").checked;
  var ThyroidnonAvidLesionR = document.getElementById("ChbThyroidRnonavidLesion").checked;
  var ThyroidnonAvidLesionL = document.getElementById("ChbThyroidLnonavidLesion").checked;
  var ThyroidresectionR = document.getElementById("ChbThyroidRresection").checked;
  var ThyroidresectionL = document.getElementById("ChbThyroidLresection").checked;
  var Thyroiddiffuse = document.getElementById("ChbThyroidaviddiffuse").checked;
  var NeckThyroidOther = document.getElementById("NeckThyroidOther").value.trim();

    if (ThyroidenlargementR || ThyroidenlargementL || ThyroidavidLesionR || ThyroidavidLesionL || ThyroidnonAvidLesionR || ThyroidnonAvidLesionL || ThyroidresectionR || ThyroidresectionL || Thyroiddiffuse || NeckThyroidOther) {
    NeckThyroidText += "Thyroidea: ";
  }

  if (ThyroidenlargementR && ThyroidenlargementL) NeckThyroidText += "zvětšená, ";
  else {
    if (ThyroidenlargementR) NeckThyroidText += "zvětšený pravý lalok, ";
    if (ThyroidenlargementL) NeckThyroidText += "zvětšený levý lalok, ";
  }

if (ThyroidavidLesionR && ThyroidavidLesionL) {NeckThyroidText += "noduly se zvýšenou akumulací RF v obou lalocích, "; NeckThyroidRes += "Oba laloky štítné žlázy s metabolicky aktivními noduly k dovyšetření. ";
} else {
    if (ThyroidavidLesionR) {NeckThyroidText += "nodul se zvýšenou akumulací RF v pravém laloku, "; NeckThyroidRes += "Pravý lalok štítné žlázy s metabolicky aktivním nodulem k dovyšetření. "; }
    if (ThyroidavidLesionL) {NeckThyroidText += "nodul se zvýšenou akumulací RF v levém laloku, "; NeckThyroidRes += "Levý lalok štítné žlázy s metabolicky aktivním nodulem k dovyšetření. "; }
}


  if (ThyroidnonAvidLesionR && ThyroidnonAvidLesionL) NeckThyroidText += "noduly bez zvýšené akumulace RF v obou lalocích, ";
  else {
    if (ThyroidnonAvidLesionR) NeckThyroidText += "nodul bez zvýšené akumulace RF v pravém laloku, ";
    if (ThyroidnonAvidLesionL) NeckThyroidText += "nodul bez zvýšené akumulace RF v levém laloku, ";
  }

  if (ThyroidresectionR && ThyroidresectionL) NeckThyroidText += "chybí po TTE, ";
  else {
    if (ThyroidresectionR) NeckThyroidText += "st.p. hemithyroidektomii vpravo, ";
    if (ThyroidresectionL) NeckThyroidText += "st.p. hemithyroidektomii vlevo, ";
  }

  if (Thyroiddiffuse) {
    NeckThyroidText += "difuzně zvýšená akumulace RF, ";
    NeckThyroidRes += "Štítná žláza s difuzně zvýšenou metabolickou aktivitou při thyreopatii. ";
  }

  if (NeckThyroidOther) {
    NeckThyroidText += NeckThyroidOther + ", ";
  }

  if (NeckThyroidText.endsWith(", ")) {
    NeckThyroidText = NeckThyroidText.slice(0, -2) + ".";
  }

// zakrok

var NeckTreatmentText = "";
  var NeckTreatmentRes = "";

  var NeckRradiation = document.getElementById("ChbNeckRradiation").checked;
  var NeckLradiation = document.getElementById("ChbNeckLradiation").checked;
  var NeckRsurgery = document.getElementById("ChbNeckRsurgery").checked;
  var NeckLsurgery = document.getElementById("ChbNeckLsurgery").checked;
  var NeckTreatmentOther = document.getElementById("NeckTreatmentOther").value.trim();

	if (NeckRradiation && NeckRsurgery && NeckLradiation && NeckLsurgery) {
	  NeckTreatmentText += "Pooperační a poradiační změny měkkých tkání na krku oboustranně. ";
	} else {
	  if (NeckRradiation && NeckRsurgery) NeckTreatmentText += "Pooperační a poradiační změny měkkých tkání na krku vpravo. ";
	  if (NeckLradiation && NeckLsurgery) NeckTreatmentText += "Pooperační a poradiační změny měkkých tkání na krku vlevo. ";
	  if (NeckRradiation && NeckLradiation && !NeckRsurgery && !NeckLsurgery) NeckTreatmentText += "Poradiační změny měkkých tkání na krku oboustranně. ";
	  else {
		if (NeckRradiation && !NeckRsurgery) NeckTreatmentText += "Poradiační změny měkkých tkání na krku vpravo. ";
		if (NeckLradiation && !NeckLsurgery) NeckTreatmentText += "Poradiační změny měkkých tkání na krku vlevo. ";
	  }
	  if (NeckRsurgery && NeckLsurgery && !NeckRradiation && !NeckLradiation) NeckTreatmentText += "Pooperační změny měkkých tkání na krku oboustranně. ";
	  else {
		if (NeckRsurgery && !NeckRradiation) NeckTreatmentText += "Pooperační změny měkkých tkání na krku vpravo. ";
		if (NeckLsurgery && !NeckLradiation) NeckTreatmentText += "Pooperační změny měkkých tkání na krku vlevo. ";
	  }
	}	

  if (NeckTreatmentOther) {
    NeckTreatmentText += NeckTreatmentOther + ". ";
  }

//Neck Others by priority
var NeckOther1Priority = ""; var NeckOther1NoPriority = ""; var NeckOther1ResPriority = "";
var NeckOther1Pop = document.getElementById("NeckOther1Pop").value;
var NeckOther1Res = document.getElementById("NeckOther1Res").value;
if (NeckOther1Pop !== "" && NeckOther1Res ==="") {NeckOther1Priority = ""; NeckOther1NoPriority = NeckOther1Pop + ". "; NeckOther1ResPriority = "";
	} else if (NeckOther1Pop !== "" && NeckOther1Res !=="") {NeckOther1Priority = NeckOther1Pop  + ". "; NeckOther1NoPriority = ""; NeckOther1ResPriority = NeckOther1Res  + ". ";}



// THORAX

// Thorax lesions

let codeForThoraxLesion1 = `	
var ThoraxLesion1Locationtext = "";

  // Plíce
  if (document.getElementById('Chb1LungsR').checked && document.getElementById('Chb1LungsL').checked) {
    ThoraxLesion1Locationtext += "obou plic";
  } else {
    if (document.getElementById('Chb1LungsR').checked) ThoraxLesion1Locationtext += "pravé plíce";
    if (document.getElementById('Chb1LungsL').checked) ThoraxLesion1Locationtext += "levé plíce";
  }


// Right side
var rightLungLobes = [];
if (document.getElementById('Chb1LobeUpperR').checked) rightLungLobes.push("horního laloku");
if (document.getElementById('Chb1LobeMiddleR').checked) rightLungLobes.push("středního laloku");
if (document.getElementById('Chb1LobeLowerR').checked) rightLungLobes.push("dolního laloku");
if (rightLungLobes.length > 0) {
  ThoraxLesion1Locationtext += (ThoraxLesion1Locationtext ? ", " : "") + rightLungLobes.join(' a ') + " pravé plíce";
}

// Left side
var leftLungLobes = [];
if (document.getElementById('Chb1LobeUpperL').checked) leftLungLobes.push("horního laloku");
if (document.getElementById('Chb1LobeMiddleL').checked) leftLungLobes.push("linguly");
if (document.getElementById('Chb1LobeLowerL').checked) leftLungLobes.push("dolního laloku");
if (leftLungLobes.length > 0) {
  ThoraxLesion1Locationtext += (ThoraxLesion1Locationtext ? ", " : "") + leftLungLobes.join(' a ') + " levé plíce";
}



// S1 - S10
var rightLungSegments = [];
var leftLungSegments = [];

for (var i = 1; i <= 10; i++) {
  if (document.getElementById('Chb1LungS' + i + 'R').checked) {
    rightLungSegments.push("S" + i);
  }
  if (document.getElementById('Chb1LungS' + i + 'L').checked) {
    if (i === 1 ) {
      leftLungSegments.push("S1+2");
    } else {
      leftLungSegments.push("S" + i);
    }
  }
}

if (rightLungSegments.length > 0) {
  ThoraxLesion1Locationtext += (ThoraxLesion1Locationtext ? ", " : "") + rightLungSegments.join(', ') + " pravé plíce";
}
if (leftLungSegments.length > 0) {
  ThoraxLesion1Locationtext += (ThoraxLesion1Locationtext ? ", " : "") + leftLungSegments.join(', ') + " levé plíce";
}


// Central and Peripheral locations
  if (document.getElementById('Chb1CentralLocation').checked) ThoraxLesion1Locationtext += (ThoraxLesion1Locationtext ? " " : "") + "centrálně";
  if (document.getElementById('Chb1PeripheralLocation').checked) ThoraxLesion1Locationtext += (ThoraxLesion1Locationtext ? " " : "") + "periferně";

// Pleura
  if (document.getElementById('Chb1PleuraR').checked && document.getElementById('Chb1PleuraL').checked) {
    ThoraxLesion1Locationtext += (ThoraxLesion1Locationtext ? ", " : "") + "pleurálně oboustranně";
  } else {
    if (document.getElementById('Chb1PleuraR').checked) ThoraxLesion1Locationtext += (ThoraxLesion1Locationtext ? ", " : "") + "pleurálně vpravo";
    if (document.getElementById('Chb1PleuraL').checked) ThoraxLesion1Locationtext += (ThoraxLesion1Locationtext ? ", " : "") + "pleurálně vlevo";
  }

// Hrudní stěna
  if (document.getElementById('Chb1ChestWallR').checked && document.getElementById('Chb1ChestWallL').checked) {
    ThoraxLesion1Locationtext += (ThoraxLesion1Locationtext ? ", " : "") + "hrudní stěny oboustranně";
  } else {
    if (document.getElementById('Chb1ChestWallR').checked) ThoraxLesion1Locationtext += (ThoraxLesion1Locationtext ? ", " : "") + "hrudní stěny vpravo";
    if (document.getElementById('Chb1ChestWallL').checked) ThoraxLesion1Locationtext += (ThoraxLesion1Locationtext ? ", " : "") + "hrudní stěny vlevo";
  }

  // PRSY  
function addBreastLocationText(side, location) {
  return (ThoraxLesion1Locationtext ? ", " : "") + location + " " + side;
}

if (document.getElementById('Chb1MammaULQR').checked && document.getElementById('Chb1MammaUMQR').checked) {
  ThoraxLesion1Locationtext += addBreastLocationText('pravého prsu', 'na rozhraní HZK a HVK');
} else if (document.getElementById('Chb1MammaLMQR').checked && document.getElementById('Chb1MammaLLQR').checked) {
  ThoraxLesion1Locationtext += addBreastLocationText('pravého prsu', 'na rozhraní DVK a DZK');
} else if (document.getElementById('Chb1MammaUMQR').checked && document.getElementById('Chb1MammaLMQR').checked) {
  ThoraxLesion1Locationtext += addBreastLocationText('pravého prsu', 'na rozhraní HVK a DVK');
} else if (document.getElementById('Chb1MammaULQR').checked && document.getElementById('Chb1MammaLLQR').checked) {
  ThoraxLesion1Locationtext += addBreastLocationText('pravého prsu', 'na rozhraní HZK a DZK');
} else if (document.getElementById('Chb1MammaULQR').checked) {
  ThoraxLesion1Locationtext += addBreastLocationText('pravého prsu', 'HZK');
} else if (document.getElementById('Chb1MammaUMQR').checked) {
  ThoraxLesion1Locationtext += addBreastLocationText('pravého prsu', 'HVK');
} else if (document.getElementById('Chb1MammaLMQR').checked) {
  ThoraxLesion1Locationtext += addBreastLocationText('pravého prsu', 'DVK');
} else if (document.getElementById('Chb1MammaLLQR').checked) {
  ThoraxLesion1Locationtext += addBreastLocationText('pravého prsu', 'DZK');
}

if (document.getElementById('Chb1MammaULQL').checked && document.getElementById('Chb1MammaUMQL').checked) {
  ThoraxLesion1Locationtext += addBreastLocationText('levého prsu', 'na rozhraní HZK a HVK');
} else if (document.getElementById('Chb1MammaLMQL').checked && document.getElementById('Chb1MammaLLQL').checked) {
  ThoraxLesion1Locationtext += addBreastLocationText('levého prsu', 'na rozhraní DVK a DZK');
} else if (document.getElementById('Chb1MammaUMQL').checked && document.getElementById('Chb1MammaLMQL').checked) {
  ThoraxLesion1Locationtext += addBreastLocationText('levého prsu', 'na rozhraní HVK a DVK');
} else if (document.getElementById('Chb1MammaULQL').checked && document.getElementById('Chb1MammaLLQL').checked) {
  ThoraxLesion1Locationtext += addBreastLocationText('levého prsu', 'na rozhraní HZK a DZK');
} else if (document.getElementById('Chb1MammaULQL').checked) {
  ThoraxLesion1Locationtext += addBreastLocationText('levého prsu', 'HZK');
} else if (document.getElementById('Chb1MammaUMQL').checked) {
  ThoraxLesion1Locationtext += addBreastLocationText('levého prsu', 'HVK');
} else if (document.getElementById('Chb1MammaLMQL').checked) {
  ThoraxLesion1Locationtext += addBreastLocationText('levého prsu', 'DVK');
} else if (document.getElementById('Chb1MammaLLQL').checked) {
  ThoraxLesion1Locationtext += addBreastLocationText('levého prsu', 'DZK');
}

// oesophagus

var OesophagusParts = [];
if (document.getElementById('Chb1OesophagusUpper').checked) OesophagusParts.push("horní třetiny");
if (document.getElementById('Chb1OesophagusMiddle').checked) OesophagusParts.push("střední třetiny");
if (document.getElementById('Chb1OesophagusLower').checked) OesophagusParts.push("dolní třetiny");
if (OesophagusParts.length > 0) {
  ThoraxLesion1Locationtext += (ThoraxLesion1Locationtext ? ", " : "") + OesophagusParts.join(' a ') + " jícnu";
}

// Thymus
  if (document.getElementById('Chb1ThymusR').checked && document.getElementById('Chb1ThymusL').checked) {
    ThoraxLesion1Locationtext += (ThoraxLesion1Locationtext ? ", " : "") + "thymu centrálně";
  } else {
    if (document.getElementById('Chb1ThymusR').checked) ThoraxLesion1Locationtext += (ThoraxLesion1Locationtext ? ", " : "") + "thymu vpravo";
    if (document.getElementById('Chb1ThymusL').checked) ThoraxLesion1Locationtext += (ThoraxLesion1Locationtext ? ", " : "") + "thymu vlevo";
  }
  
// Parkardiálně
  if (document.getElementById('Chb1ParacardialR').checked && document.getElementById('Chb1ParacardialL').checked) {
    ThoraxLesion1Locationtext += (ThoraxLesion1Locationtext ? ", " : "") + "v parakardiálním tuku oboustranně";
  } else {
    if (document.getElementById('Chb1ParacardialR').checked) ThoraxLesion1Locationtext += (ThoraxLesion1Locationtext ? ", " : "") + "v parakardiálním tuku vpravo";
    if (document.getElementById('Chb1ParacardialL').checked) ThoraxLesion1Locationtext += (ThoraxLesion1Locationtext ? ", " : "") + "v parakardiálním tuku vlevo";
  }

document.getElementById('ThoraxLesion1Location').value = ThoraxLesion1Locationtext;


// Thorax lesion1 popis

	var ThoraxLesion1Button = document.getElementById("ThoraxLesion1");
    var ThoraxLesion1number = document.getElementById("ThoraxLesion1number").value;
    var ThoraxLesion1type = document.getElementById("ThoraxLesion1type").value.split("|");
    var ThoraxLesion1Location = document.getElementById("ThoraxLesion1Location").value;
	var ThoraxLesion1AddLocation = document.getElementById("ThoraxLesion1AddLocation").value;
    var ThoraxLesion1Loclargest = document.getElementById("ThoraxLesion1Loclargest").value;
    var ThoraxLesion1Activity = document.getElementById("ThoraxLesion1Activity").value;
	var ThoraxLesion1RESActivity = document.getElementById("ThoraxLesion1Activity"); var selectedOption = ThoraxLesion1RESActivity.options[ThoraxLesion1RESActivity.selectedIndex]; var ThoraxLesion1RESActivity = selectedOption.dataset.valuez1 ? selectedOption.dataset.valuez1 : '';
	var ThoraxLesion1RESAltActivity = document.getElementById("ThoraxLesion1Activity"); var selectedOption = ThoraxLesion1RESAltActivity.options[ThoraxLesion1RESAltActivity.selectedIndex]; var ThoraxLesion1RESAltActivity = selectedOption.dataset.valuez2 ? selectedOption.dataset.valuez2 : '';
    var ThoraxLesion1SUV = formatSUV("ThoraxLesion1SUV");
    var ThoraxLesion1Size = formatLesionSize("ThoraxLesion1Size");
	var ThoraxLesion1RESDecision = document.getElementById("ThoraxLesion1Decision").value; 
	var ThoraxLesion1AllLocations = "";
	var ThoraxLesion1SUVPrev = formatSUV("ThoraxLesion1SUVPrev");  
	var ThoraxLesion1PrevSize = formatLesionSize("ThoraxLesion1PrevSize");

	var ThoraxLesion1ComparisonText = generateComparisonText(ThoraxLesion1SUVPrev, ThoraxLesion1PrevSize, DateComparison);
	var ThoraxLesion1ComparisonSUVRes = compareSUVs(ThoraxLesion1SUV, ThoraxLesion1SUVPrev);
	var ThoraxLesion1ComparisonSizeRes = compareSizes(ThoraxLesion1Size, ThoraxLesion1PrevSize);
	var ThoraxLesion1CombinedResult = combineComparisonResults(ThoraxLesion1ComparisonSizeRes, ThoraxLesion1ComparisonSUVRes, ThoraxLesion1number);
	    
    var POPThoraxLesion1 = "";
	var RESThoraxLesion1 = "";
	
	if (ThoraxLesion1Loclargest !== "") {
		ThoraxLesion1Loclargest = ". Největší " + ThoraxLesion1Loclargest + " ";
	}
	
	ThoraxLesion1AllLocations = ThoraxLesion1Location + " " + ThoraxLesion1AddLocation;
	
	if (ThoraxLesion1Loclargest === "") { 
		ThoraxLesion1Size = ThoraxLesion1Size.replace('diametru ', 'diametru až '); 
		ThoraxLesion1Size = ThoraxLesion1Size.replace('rozměru ', 'rozměru až '); 
	}
    
	
	if (ThoraxLesion1number === "") {
		ThoraxLesion1type = ThoraxLesion1type[0];
	} else {
		ThoraxLesion1type = ThoraxLesion1type[1];
	} 	

let processedSentencePOPThoraxLesion1 = processSentence(ThoraxLesion1number + " " + ThoraxLesion1type);	
window.POPThoraxLesion1 = processedSentencePOPThoraxLesion1 + " " + ThoraxLesion1AllLocations + " " + ThoraxLesion1Activity + " " + ThoraxLesion1Loclargest + " " + ThoraxLesion1Size + " " + ThoraxLesion1SUV + " " + ThoraxLesion1ComparisonText + ".";

let processedSentenceRESThoraxLesion1 = processSentence(ThoraxLesion1number + " " + ThoraxLesion1RESAltActivity + " " + ThoraxLesion1type);
window.RESThoraxLesion1 = processedSentenceRESThoraxLesion1 + " " + ThoraxLesion1AllLocations + " " + ThoraxLesion1CombinedResult + " " + ThoraxLesion1RESDecision + ".";


if (ThoraxLesion1RESDecision.includes("meta") && ThoraxLesion1type.includes("ožisk")) {window.RESThoraxLesion1 = window.RESThoraxLesion1.replace(/ložisk/g, "meta ložisk").replace(/Ložisk/g, "Meta ložisk").replace(": charakteru meta", ".");}


`;

let codeForThoraxLesion2 = codeForThoraxLesion1.replace(/Lesion1/g, 'Lesion2').replace(/Chb1/g, 'Chb2');
let codeForThoraxLesion3 = codeForThoraxLesion1.replace(/Lesion1/g, 'Lesion3').replace(/Chb1/g, 'Chb3');
eval(codeForThoraxLesion1);
eval(codeForThoraxLesion2);
eval(codeForThoraxLesion3);

if (ThoraxLesion1Button.classList.contains('hidden')) {window.POPThoraxLesion1 = ""; window.RESThoraxLesion1 = "";}
if (ThoraxLesion2Button.classList.contains('hidden')) {window.POPThoraxLesion2 = ""; window.RESThoraxLesion2 = "";}
if (ThoraxLesion3Button.classList.contains('hidden')) {window.POPThoraxLesion3 = ""; window.RESThoraxLesion3 = "";}

// Thorax lymph nodes

var ThoraxLymphNode1Locationtext = "";

	var segments = [];
	var ChbMed_segments = [];

for(var i = 1; i <= 10; i++) {
    if(i === 3) {
        if(document.getElementById('ChbMed3A') && document.getElementById('ChbMed3A').checked) {
            ChbMed_segments.push('3A');
        }
        if(document.getElementById('ChbMed3P') && document.getElementById('ChbMed3P').checked) {
            ChbMed_segments.push('3P');
        }
    } else {
        if(document.getElementById('ChbMed' + i + 'R') && document.getElementById('ChbMed' + i + 'R').checked) {
            ChbMed_segments.push(i + 'R');
        }
        if(document.getElementById('ChbMed' + i + 'L') && document.getElementById('ChbMed' + i + 'L').checked) {
            ChbMed_segments.push(i + 'L');
        }
        if(!document.getElementById('ChbMed' + i + 'R') && !document.getElementById('ChbMed' + i + 'L') && document.getElementById('ChbMed' + i) && document.getElementById('ChbMed' + i).checked) {
            ChbMed_segments.push(i.toString());
        }
    }
}

if (ChbMed_segments.length > 1) {
    segments.push("v regiích " + ChbMed_segments.join(', '));
} else if (ChbMed_segments.length > 0) {
    segments.push("v regiu " + ChbMed_segments.join(', '));
}


    if(document.getElementById('ChbMediastinum').checked) {
        segments.push('mediastina');
    }

    var hilyR = document.getElementById('ChbMedHilaR').checked;
    var hilyL = document.getElementById('ChbMedHilaL').checked;
    if(hilyR && hilyL) {
        segments.push('v obou plicních hilech');
    } else if(hilyR) {
        segments.push('v pravém plicním hilu');
    } else if(hilyL) {
        segments.push('v levém plicním hilu');
    }

    var axilsR = document.getElementById('ChbAxilsR').checked;
    var axilsL = document.getElementById('ChbAxilsL').checked;
    if(axilsR && axilsL) {
        segments.push('v obou axilách');
    } else if(axilsR) {
        segments.push('pravé axily');
    } else if(axilsL) {
        segments.push('levé axily');
    }

    var parasternalR = document.getElementById('ChbParasternalR').checked;
    var parasternalL = document.getElementById('ChbParasternalL').checked;
    if(parasternalR && parasternalL) {
        segments.push('parasternálně bilat.');
    } else if(parasternalR) {
        segments.push('parasternálně vpravo');
    } else if(parasternalL) {
        segments.push('parasternálně vlevo');
    }

    var paracardiumR = document.getElementById('ChbParacardiumR').checked;
    var paracardiumL = document.getElementById('ChbParacardiumL').checked;
    if(paracardiumR && paracardiumL) {
        segments.push('v parakardiálním tuku bilat.');
    } else if(paracardiumR) {
        segments.push('v parakardiálním tuku vpravo');
    } else if(paracardiumL) {
        segments.push('v parakardiálním tuku vlevo');
    }

if (segments.length === 2) {
    ThoraxLymphNode1Locationtext = segments.join(' a ');
} else if (segments.length > 2) {
    var lastSegment = segments.pop();
    var secondLastSegment = segments.pop();
    ThoraxLymphNode1Locationtext = segments.join(', ') + ', ' + secondLastSegment + ' a ' + lastSegment;
} else {
    ThoraxLymphNode1Locationtext = segments.join(', ');
}

  document.getElementById('ThoraxLymphNode1Location').value = ThoraxLymphNode1Locationtext;



// Thorax lymph node popis

	var ThoraxLymphNode1Button = document.getElementById("ThoraxLymphNode1");
    var ThoraxLymphNode1number = document.getElementById("ThoraxLymphNode1number").value;
    var ThoraxLymphNode1type = document.getElementById("ThoraxLymphNode1type").value.split("|");
    var ThoraxLymphNode1Location = document.getElementById("ThoraxLymphNode1Location").value;
	var ThoraxLymphNode1AddLocation = document.getElementById("ThoraxLymphNode1AddLocation").value;
    var ThoraxLymphNode1Loclargest = document.getElementById("ThoraxLymphNode1Loclargest").value;
    var ThoraxLymphNode1Activity = document.getElementById("ThoraxLymphNode1Activity").value;
	var ThoraxLymphNode1RESActivity = document.getElementById("ThoraxLymphNode1Activity"); var selectedOption = ThoraxLymphNode1RESActivity.options[ThoraxLymphNode1RESActivity.selectedIndex]; var ThoraxLymphNode1RESActivity = selectedOption.dataset.valuez1 ? selectedOption.dataset.valuez1 : '';
	var ThoraxLymphNode1RESAltActivity = document.getElementById("ThoraxLymphNode1Activity"); var selectedOption = ThoraxLymphNode1RESAltActivity.options[ThoraxLymphNode1RESAltActivity.selectedIndex]; var ThoraxLymphNode1RESAltActivity = selectedOption.dataset.valuez2 ? selectedOption.dataset.valuez2 : '';
    var ThoraxLymphNode1SUV = formatSUV("ThoraxLymphNode1SUV");
    var ThoraxLymphNode1Size = formatLymphNodeSize("ThoraxLymphNode1Size");
	var ThoraxLymphNode1RESDecision = document.getElementById("ThoraxLymphNode1Decision"); var selectedOption = ThoraxLymphNode1RESDecision.options[ThoraxLymphNode1RESDecision.selectedIndex]; var ThoraxLymphNode1RESDecision = selectedOption.dataset.valuez1 ? selectedOption.dataset.valuez1 : '';
	var ThoraxLymphNode1AllLocations = "";
	var ThoraxLymphNode1SUVPrev = formatSUV("ThoraxLymphNode1SUVPrev");  
	var ThoraxLymphNode1PrevSize = formatLymphNodeSize("ThoraxLymphNode1PrevSize");
	var ThoraxLymphNode1ComparisonText = generateComparisonText(ThoraxLymphNode1SUVPrev, ThoraxLymphNode1PrevSize, DateComparison);
	var ThoraxLymphNode1ComparisonSUVRes = compareSUVs(ThoraxLymphNode1SUV, ThoraxLymphNode1SUVPrev);
	var ThoraxLymphNode1ComparisonSizeRes = compareSizes(ThoraxLymphNode1Size, ThoraxLymphNode1PrevSize);
	var ThoraxLymphNode1CombinedResult = combineComparisonResults(ThoraxLymphNode1ComparisonSizeRes, ThoraxLymphNode1ComparisonSUVRes, ThoraxLymphNode1number);

    var POPThoraxLymphNode1 = "";
	var RESThoraxLymphNode1 = "";
	
	if (ThoraxLymphNode1Loclargest !== "") {
		ThoraxLymphNode1Loclargest = ". Největší " + ThoraxLymphNode1Loclargest + " ";
	}
	    
	ThoraxLymphNode1AllLocations = ThoraxLymphNode1Location + " " + ThoraxLymphNode1AddLocation;
	
	if (ThoraxLymphNode1Loclargest === "") { 
		ThoraxLymphNode1Size = ThoraxLymphNode1Size.replace('diametru ', 'diametru až '); 
		ThoraxLymphNode1Size = ThoraxLymphNode1Size.replace('rozměru ', 'rozměru až '); 
	}
	
	if (ThoraxLymphNode1number === "") {
		ThoraxLymphNode1type = ThoraxLymphNode1type[0];
	} else {
		ThoraxLymphNode1type = ThoraxLymphNode1type[1];
	}

let processedSentencePOPThoraxLymphNode1 = processSentence(ThoraxLymphNode1number + " " + ThoraxLymphNode1type);	
POPThoraxLymphNode1 = processedSentencePOPThoraxLymphNode1 + " " + ThoraxLymphNode1AllLocations + " " + ThoraxLymphNode1Activity + " " + ThoraxLymphNode1Loclargest + " " + ThoraxLymphNode1Size + " " + ThoraxLymphNode1SUV + " " + ThoraxLymphNode1ComparisonText + ".";

let processedSentenceRESThoraxLymphNode1 = processSentence(ThoraxLymphNode1number + " " + ThoraxLymphNode1RESAltActivity + " " + ThoraxLymphNode1type);
RESThoraxLymphNode1 = processedSentenceRESThoraxLymphNode1 + " " + ThoraxLymphNode1AllLocations + " " + ThoraxLymphNode1CombinedResult + " " + ThoraxLymphNode1RESDecision + ".";

    
if (ThoraxLymphNode1Button.classList.contains('hidden')) {POPThoraxLymphNode1 = ""; RESThoraxLymphNode1 = "";}


// THORAX OTHERS
// devices


var ThoraxDevicesText = "";
var ThoraxDevicesRes = "";

  var ThoraxDevicesPortR = document.getElementById("ChbDevicesPortR").checked;
  var ThoraxDevicesPortL = document.getElementById("ChbDevicesPortL").checked;
  var ThoraxDevicesPICCR = document.getElementById("ChbDevicesPICCR").checked;
  var ThoraxDevicesPICCL = document.getElementById("ChbDevicesPICCL").checked;
  var ThoraxDevicesCardiacStimR = document.getElementById("ChbDevicesCardiacStimR").checked;
  var ThoraxDevicesCardiacStimL = document.getElementById("ChbDevicesCardiacStimL").checked;
  var ThoraxDevicesMalposition = document.getElementById("ChbDevicesMalposition").checked;
  var ThoraxDevicesOther = document.getElementById("ThoraxDevicesOther").value.trim();


    if (ThoraxDevicesPortR) ThoraxDevicesText += "Portkater zprava. ";
    if (ThoraxDevicesPortL) ThoraxDevicesText += "Portkater zleva. ";

    if (ThoraxDevicesPICCR) ThoraxDevicesText += "PICC zprava. ";
    if (ThoraxDevicesPICCL) ThoraxDevicesText += "PICC zleva. ";
	
	if (ThoraxDevicesCardiacStimR) ThoraxDevicesText += "KS zprava. ";
    if (ThoraxDevicesCardiacStimL) ThoraxDevicesText += "KS zleva. ";
	
	if (ThoraxDevicesMalposition) ThoraxDevicesText += "Malpozice katetru. ";

  if (ThoraxDevicesOther) {
    ThoraxDevicesText += ThoraxDevicesOther + ". ";
  }

// oesophagus
var ThoraxOesophText = "";
var ThoraxOesophRes = "";

var ThoraxOesophHernia = document.getElementById("ChbOesophHernia").checked;
var ThoraxOesophActDist = document.getElementById("ChbOesophActDist").checked;
var ThoraxOesophActDiff = document.getElementById("ChbOesophActDiff").checked;
var ThoraxOesophAnastomosis = document.getElementById("ChbOesophAnastomosis").checked;
var ThoraxOesophOther = document.getElementById("ThoraxOesophOther").value.trim();

if (ThoraxOesophHernia) ThoraxOesophText += "Hiátová hernie. ";
if (ThoraxOesophActDist) ThoraxOesophText += "Zvýšená akumulace RF v dist. jícnu pravděpodobně při refluxu. ";
if (ThoraxOesophActDiff) ThoraxOesophText += "Difuzně zvýšená akumulace RF v jícnu v rámci zánětlivých změn. ";
if (ThoraxOesophAnastomosis) ThoraxOesophText += "St.p. resekci dist. jícnu s anastomózou v hrudníku. ";

if (ThoraxOesophOther) {
  ThoraxOesophText += ThoraxOesophOther + ". ";
}

// mamma
var ThoraxMammaText = "";

var ThoraxMammaMER = document.getElementById("ChbMammaMER").checked; var ThoraxMammaMEL = document.getElementById("ChbMammaMEL").checked;
var ThoraxMammaKVER = document.getElementById("ChbMammaKVER").checked; var ThoraxMammaKVEL = document.getElementById("ChbMammaKVEL").checked;
var ThoraxMammaSegR = document.getElementById("ChbMammaSegR").checked; var ThoraxMammaSegL = document.getElementById("ChbMammaSegL").checked;
var ThoraxMammaReplaceR = document.getElementById("ChbMammaReplaceR").checked; var ThoraxMammaReplaceL = document.getElementById("ChbMammaReplaceL").checked;
var ThoraxMammaOther = document.getElementById("ThoraxMammaOther").value.trim();

if (ThoraxMammaMER && ThoraxMammaMEL) ThoraxMammaText += "St.p. oboustranné mastektomii. ";
  else {
	if (ThoraxMammaMER) ThoraxMammaText += "St.p. pravostranné mastektomii. ";
	if (ThoraxMammaMEL) ThoraxMammaText += "St.p. levostranné mastektomii. ";
  }

if (ThoraxMammaKVER && ThoraxMammaKVEL) ThoraxMammaText += "St.p. oboustranné kvadrantektomii. ";
  else {  
	if (ThoraxMammaKVER) ThoraxMammaText += "St.p. pravostranné kvadrantektomii. ";
	if (ThoraxMammaKVEL) ThoraxMammaText += "St.p. levostranné kvadrantektomii. ";
  }

if (ThoraxMammaSegR && ThoraxMammaSegL) ThoraxMammaText += "St.p. oboustranné segmentektomii. ";
  else {
	if (ThoraxMammaSegR) ThoraxMammaText += "St.p. pravostranné segmentektomii. ";
	if (ThoraxMammaSegL) ThoraxMammaText += "St.p. levostranné segmentektomii. ";
  }

if (ThoraxMammaReplaceR && ThoraxMammaReplaceL) ThoraxMammaText += "St.p. náhradě obou prsů. ";
  else {
if (ThoraxMammaReplaceR) ThoraxMammaText += "St.p. náhradě pravého prsu. ";
if (ThoraxMammaReplaceL) ThoraxMammaText += "St.p. náhradě levého prsu. ";
  }
  
if (ThoraxMammaOther) {
  ThoraxMammaText += ThoraxMammaOther + ". ";
}

// thorax parenchyma and surgery

var ThoraxParenchymaText = "";
var ThoraxParenchymaRes = "";

var ThoraxPulmonectomyR = document.getElementById("ChbPulmonectomyR").checked;
var ThoraxPulmonectomyL = document.getElementById("ChbPulmonectomyL").checked;
var ThoraxULobectomyR = document.getElementById("ChbULobectomyR").checked;
var ThoraxULobectomyL = document.getElementById("ChbULobectomyL").checked;
var ThoraxMLobectomyR = document.getElementById("ChbMLobectomyR").checked; 
var ThoraxLLobectomyR = document.getElementById("ChbLLobectomyR").checked;
var ThoraxLLobectomyL = document.getElementById("ChbLLobectomyL").checked;
var ThoraxUResectionR = document.getElementById("ChbUResectionR").checked;
var ThoraxUResectionL = document.getElementById("ChbUResectionL").checked;
var ThoraxMResectionR = document.getElementById("ChbMResectionR").checked; 
var ThoraxLResectionR = document.getElementById("ChbLResectionR").checked;
var ThoraxLResectionL = document.getElementById("ChbLResectionL").checked;
var ThoraxLobectomyOther = document.getElementById("ThoraxLobectomyOther").value.trim(); 

var ThoraxParenchymaNodulesR = document.getElementById("ChbThoraxParenchymaNodulesR").checked;
var ThoraxParenchymaNodulesL = document.getElementById("ChbThoraxParenchymaNodulesL").checked;
var ThoraxParenchymaNodulesMore = document.getElementById("ChbThoraxParenchymaNodulesMore").checked;
var ThoraxParenchymaRTR = document.getElementById("ChbThoraxParenchymaRTR").checked;
var ThoraxParenchymaRTL = document.getElementById("ChbThoraxParenchymaRTL").checked;
var ThoraxParenchymaHypoventR = document.getElementById("ChbThoraxParenchymaHypoventR").checked;
var ThoraxParenchymaHypoventL = document.getElementById("ChbThoraxParenchymaHypoventL").checked;
var ThoraxParenchymaFibrSub = document.getElementById("ChbThoraxParenchymaFibrSub").checked;
var ThoraxParenchymaFibr = document.getElementById("ChbThoraxParenchymaFibr").checked;
var ThoraxParenchymaFibrAdv = document.getElementById("ChbThoraxParenchymaFibrAdv").checked;
var ThoraxParenchymaEmphysMild = document.getElementById("ChbThoraxParenchymaEmphysMild").checked;
var ThoraxParenchymaEmphysParasept = document.getElementById("ChbThoraxParenchymaEmphysParasept").checked;
var ThoraxParenchymaEmphysPanlob = document.getElementById("ChbThoraxParenchymaEmphysPanlob").checked;
var ThoraxParenchymaOther = document.getElementById("ThoraxParenchymaOther").value.trim();

if (ThoraxPulmonectomyR || ThoraxPulmonectomyL || ThoraxULobectomyR || ThoraxULobectomyL || ThoraxMLobectomyR || ThoraxLLobectomyR || ThoraxLLobectomyL || ThoraxUResectionR || ThoraxUResectionL || ThoraxMResectionR || ThoraxLResectionR || ThoraxLResectionL || 
	ThoraxParenchymaNodulesR || ThoraxParenchymaNodulesL || ThoraxParenchymaRTR || ThoraxParenchymaRTL || ThoraxParenchymaHypoventR || ThoraxParenchymaHypoventL || ThoraxParenchymaFibrSub || ThoraxParenchymaFibr || ThoraxParenchymaFibrAdv || ThoraxParenchymaEmphysMild || 
	ThoraxParenchymaEmphysParasept || ThoraxParenchymaEmphysPanlob || ThoraxParenchymaOther) {
    if (ThoraxLesion1Locationtext.includes("plíce")) {
        ThoraxParenchymaText += "Dále: ";
    } else {
        ThoraxParenchymaText += "Plíce: ";
    }
}

if (ThoraxPulmonectomyR) ThoraxParenchymaText += "st.p. pravostranné pneumonektomii, ";
if (ThoraxPulmonectomyL) ThoraxParenchymaText += "st.p. levostranné pneumonektomii, ";

if (ThoraxULobectomyR && ThoraxMLobectomyR) ThoraxParenchymaText += "st.p. pravostranné horní a střední bilobektomii, ";
  else if (ThoraxMLobectomyR && ThoraxLLobectomyR) ThoraxParenchymaText += "st.p. pravostranné střední a dolní bilobektomii, ";
  else {
	  if (ThoraxULobectomyR) ThoraxParenchymaText += "st.p. pravostranné horní lobektomii, ";
	  if (ThoraxMLobectomyR) ThoraxParenchymaText += "st.p. pravostranné střední lobektomii, "; 
	  if (ThoraxLLobectomyR) ThoraxParenchymaText += "st.p. pravostranné dolní lobektomii, ";
	}
  
if (ThoraxULobectomyL) ThoraxParenchymaText += "st.p. levostranné horní lobektomii, ";
if (ThoraxLLobectomyL) ThoraxParenchymaText += "st.p. levostranné dolní lobektomii, ";

var resectionsR = [];
var resectionsL = [];

if (ThoraxUResectionR) resectionsR.push("v pravém horním laloku");
if (ThoraxMResectionR) resectionsR.push("v pravém středním laloku");
if (ThoraxLResectionR) resectionsR.push("v pravém dolním laloku");
if (ThoraxUResectionL) resectionsL.push("v levém horním laloku");
if (ThoraxLResectionL) resectionsL.push("v levém dolním laloku");

function combineResections(resections) {
    if (resections.length === 0) return "";
    if (resections.length === 1) return resections[0];
    let last = resections.pop();
    return resections.join(", ") + " a " + last;
}

var finalTextR = combineResections(resectionsR);
var finalTextL = combineResections(resectionsL);

var finalText = "st.p. neanatomické resekci ";
if (finalTextR && finalTextL) {
    ThoraxParenchymaText += finalText + finalTextR + " a " + finalTextL + ", ";
} else if (finalTextR || finalTextL) {
    ThoraxParenchymaText += finalText + (finalTextR || finalTextL) + ", ";
}

if (ThoraxLobectomyOther) {
    ThoraxParenchymaText += ThoraxLobectomyOther + ", ";
}

if (ThoraxParenchymaNodulesR && ThoraxParenchymaNodulesL) {
    ThoraxParenchymaText += ThoraxParenchymaNodulesMore ? "drobné nespecifické noduly bez zvýšené akumulace RF bilat, " : "drobný nespecifický nodul bez zvýšené akumulace RF bilat, ";
} else {
    if (ThoraxParenchymaNodulesR) {
        ThoraxParenchymaText += ThoraxParenchymaNodulesMore ? "drobné nespecifické noduly bez zvýšené akumulace RF vpravo, " : "drobný nespecifický nodul bez zvýšené akumulace RF vpravo, ";
    }
    if (ThoraxParenchymaNodulesL) {
        ThoraxParenchymaText += ThoraxParenchymaNodulesMore ? "drobné nespecifické noduly bez zvýšené akumulace RF vlevo, " : "drobný nespecifický nodul bez zvýšené akumulace RF vlevo, ";
    }
}

if (ThoraxParenchymaRTR && ThoraxParenchymaRTL) ThoraxParenchymaText += "poradiační změny v parenchymu bilat, ";
  else {
if (ThoraxParenchymaRTR) ThoraxParenchymaText += "poradiační změny v parenchymu vpravo, ";
if (ThoraxParenchymaRTL) ThoraxParenchymaText += "poradiační změny v parenchymu vlevo, ";
  }
  
if (ThoraxParenchymaHypoventR && ThoraxParenchymaHypoventL) ThoraxParenchymaText += "hypoventilační změny bilat, ";
  else {  
if (ThoraxParenchymaHypoventR) ThoraxParenchymaText += "hypoventilační změny vpravo, ";
if (ThoraxParenchymaHypoventL) ThoraxParenchymaText += "hypoventilační změny vlevo, ";
  }
  
if (ThoraxParenchymaFibrSub) ThoraxParenchymaText += "fibrózní změny subpleurálně bilat, ";
if (ThoraxParenchymaFibr) ThoraxParenchymaText += "fibrózní změny bilat, ";
if (ThoraxParenchymaFibrAdv) ThoraxParenchymaText += "pokročilá fibróza s honeycombingem bilat, ";

if (ThoraxParenchymaEmphysMild) ThoraxParenchymaText += "mírný emfyzém bilat, ";
if (ThoraxParenchymaEmphysParasept) ThoraxParenchymaText += "paraseptální emfyzém bilat, ";
if (ThoraxParenchymaEmphysPanlob) ThoraxParenchymaText += "panlobulární pokročilý emfyzém bilat, ";

if (ThoraxParenchymaOther) {
    ThoraxParenchymaText += ThoraxParenchymaOther + ", ";
}

if (ThoraxParenchymaText.endsWith(", ")) {
    ThoraxParenchymaText = ThoraxParenchymaText.substring(0, ThoraxParenchymaText.length - 2) + ".";
}

// Thymus
var ThoraxThymusText = "";
var ThoraxThymusRes = "";

var ThoraxThymusEnlarge = document.getElementById("ChbThymusEnlarge").checked;
var ThoraxThymusAct = document.getElementById("ChbThoraxThymusAct").checked;
var ThoraxThymusOther = document.getElementById("ThoraxThymusOther").value.trim();

var descriptionsThymus = [];

if (ThoraxThymusEnlarge) descriptionsThymus.push("difuzně rozšířen");
if (ThoraxThymusAct)  descriptionsThymus.push("se zvýšenou akumulací RF");
if (ThoraxThymusOther) descriptionsThymus.push(ThoraxThymusOther);

if (descriptionsThymus.length && (ThoraxThymusAct || ThoraxThymusEnlarge)) {
	ThoraxThymusText = "Thymus " + descriptionsThymus.join(" ") + ". ";
	ThoraxThymusRes = "Thymus " + descriptionsThymus.join(" ") + " pravděpodobně při reaktivaci. ";
	} else if (descriptionsThymus.length) {
		ThoraxThymusText = "Thymus " + descriptionsThymus.join(" ") + ". ";
	}
	


// active mediastinal lymph nodes 
var ThoraxLymphNodePlusText = "";

var ThoraxLymphNodePlusHila = document.getElementById("ChbThoraxLymphNodePlusHila").checked;
var ThoraxLymphNodePlusMed = document.getElementById("ChbThoraxLymphNodePlusMed").checked;

if (ThoraxLymphNodePlusHila && ThoraxLymphNodePlusMed) ThoraxLymphNodePlusText += "Nespecificky zvýšená akumulace RF v nezvětšených mediastinálních a hilových uzlinách. ";
  else {
if (ThoraxLymphNodePlusMed) ThoraxLymphNodePlusText += "Nespecificky zvýšená akumulace RF v nezvětšených mediastinálních uzlinách. ";
if (ThoraxLymphNodePlusHila) ThoraxLymphNodePlusText += "Nespecificky zvýšená akumulace RF v nezvětšených hilových uzlinách. ";
  }


//embolisation
var ThoraxEmbolisationText = "";
var ThoraxEmbolisationRes = "";

var ThoraxEmbolisationMildR = document.getElementById("ChbThoraxEmbolisationMildR").checked;
var ThoraxEmbolisationMildL = document.getElementById("ChbThoraxEmbolisationMildL").checked;
var ThoraxEmbolisationSevereR = document.getElementById("ChbThoraxEmbolisationSevereR").checked;
var ThoraxEmbolisationSevereL = document.getElementById("ChbThoraxEmbolisationSevereL").checked;
var ThoraxEmbolisationOther = document.getElementById("ThoraxEmbolisationOther").value.trim(); 

if (ThoraxEmbolisationMildR || ThoraxEmbolisationMildL || ThoraxEmbolisationSevereR || ThoraxEmbolisationSevereL) {
    ThoraxEmbolisationRes += "CAVE! Plicní embolizace. ";
}

if (ThoraxEmbolisationMildR && ThoraxEmbolisationMildL) ThoraxEmbolisationText += "Nevýrazné emboly ve větvích obou plicních tepen. ";
  else {
if (ThoraxEmbolisationMildR) ThoraxEmbolisationText += "Nevýrazné emboly ve větvích pravé plicní tepny. ";
if (ThoraxEmbolisationMildL) ThoraxEmbolisationText += "Nevýrazné emboly ve větvích pravé levé tepny. ";
  }

if (ThoraxEmbolisationSevereR && ThoraxEmbolisationSevereL) ThoraxEmbolisationText += "Nevýrazné emboly v obou větvích plicnice. ";
  else {
if (ThoraxEmbolisationSevereR) ThoraxEmbolisationText += "Výrazné emboly v pravé větvi plicnice. ";
if (ThoraxEmbolisationSevereL) ThoraxEmbolisationText += "Výrazné emboly v levé větvi plicnice. ";
  }

if (ThoraxEmbolisationOther) {
    ThoraxEmbolisationText += ThoraxEmbolisationOther + ". ";
}

// thorax fluid
var ThoraxFluidFTR = document.getElementById("ThoraxFluidFTR").value; var ThoraxFluidFTRNumber = parseFloat(ThoraxFluidFTR.trim());
var ThoraxFluidFTL = document.getElementById("ThoraxFluidFTL").value; var ThoraxFluidFTLNumber = parseFloat(ThoraxFluidFTL.trim());
var ThoraxFluidFP = document.getElementById("ThoraxFluidFP").value; var ThoraxFluidFPNumber = parseFloat(ThoraxFluidFP.trim());


if (ThoraxFluidFTR.trim() === "") {ThoraxFluidFTRRes = "";} else if (ThoraxFluidFTRNumber < 20) {ThoraxFluidFTRRes = "Drobný fluidothorax vpravo. ";} else if (ThoraxFluidFTRNumber <= 40) {ThoraxFluidFTRRes = "Fluidothorax vpravo. ";} else {ThoraxFluidFTRRes = "Výrazný fluidothorax vpravo. ";}
if (ThoraxFluidFTL.trim() === "") {ThoraxFluidFTLRes = "";} else if (ThoraxFluidFTLNumber < 20) {ThoraxFluidFTLRes = "Drobný fluidothorax vlevo. ";} else if (ThoraxFluidFTLNumber <= 40) {ThoraxFluidFTLRes = "Fluidothorax vlevo. ";} else {ThoraxFluidFTLRes = "Výrazný fluidothorax vlevo. ";}
if (ThoraxFluidFP.trim() === "") {ThoraxFluidFPRes = "";} else if (ThoraxFluidFPNumber < 10) {ThoraxFluidFPRes = "Drobný perikardiální výpotek. ";} else if (ThoraxFluidFPNumber <= 20) {ThoraxFluidFPRes = "Perikardiální výpotek. ";} else {ThoraxFluidFPRes = "Výrazný perikardiální výpotek.";}


if (ThoraxFluidFTR.trim() !== "") {
    ThoraxFluidFTRText = "Fluidothorax vpravo šíře cca " + ThoraxFluidFTR + " mm. ";
  } else {
    ThoraxFluidFTRText = "";
  }
  if (ThoraxFluidFTL.trim() !== "") {
    ThoraxFluidFTLText = "Fluidothorax vlevo šíře cca " + ThoraxFluidFTL + " mm. ";
  } else {
    ThoraxFluidFTLText = "";
  }
  if (ThoraxFluidFP.trim() !== "") {
    ThoraxFluidFPText = "Perikardiální výpotek šíře cca " + ThoraxFluidFP + " mm. ";
  } else {
    ThoraxFluidFPText = "";
  }

const combinedFTRight = ThoraxFluidFTRRes.replace('vpravo.', '').trim();
const combinedFTLeft = ThoraxFluidFTLRes.replace('vlevo.', '').trim();

if (combinedFTRight && combinedFTRight === combinedFTLeft) {
    ThoraxFluidFTRRes = combinedFTRight + " bilat. ";
    ThoraxFluidFTLRes = "";
}

if (ThoraxFluidFTR === "" && ThoraxFluidFTL === "" && ThoraxFluidFP === "") {
    ThoraxFluidText = "Bez výpotků.";
} else {
    ThoraxFluidText = ThoraxFluidFTRText + ThoraxFluidFTLText + ThoraxFluidFPText;
} 

// Thorax native or not

if (POPThoraxLymphNode1.includes('střední') || POPThoraxLymphNode1.includes('zvýšenou') || POPThoraxLymphNode1.includes('vysokou') || 
	window.POPThoraxLesion1.includes('střední') || window.POPThoraxLesion1.includes('zvýšenou') || window.POPThoraxLesion1.includes('vysokou') || 
	window.POPThoraxLesion2.includes('střední') || window.POPThoraxLesion2.includes('zvýšenou') || window.POPThoraxLesion2.includes('vysokou') || 
	window.POPThoraxLesion3.includes('střední') || window.POPThoraxLesion3.includes('zvýšenou') || window.POPThoraxLesion3.includes('vysokou')
	)  
	{ POPThoraxNative = "";
	} else {POPThoraxNative = "Není přítomen patologický hyperakumulující fokus, ložisko či lymfadenopatie. ";
}

// Thorax Adekvatní vlevo...vpravo apod. + OTHERS

var ThoraxOther1Priority = ""; var ThoraxOther1NoPriority = ""; var ThoraxOther1ResPriority = "";
var ThoraxOther1Pop = document.getElementById("ThoraxOther1Pop").value;
var ThoraxOther1Res = document.getElementById("ThoraxOther1Res").value;
if (ThoraxOther1Pop !== "" && ThoraxOther1Res ==="") {ThoraxOther1Priority = ""; ThoraxOther1NoPriority = ThoraxOther1Pop + ". "; ThoraxOther1ResPriority = "";
	} else if (ThoraxOther1Pop !== "" && ThoraxOther1Res !=="") {ThoraxOther1Priority = ThoraxOther1Pop  + ". "; ThoraxOther1NoPriority = ""; ThoraxOther1ResPriority = ThoraxOther1Res  + ". ";}


if (ThoraxParenchymaText.includes('fibróz') || ThoraxParenchymaText.includes('emfyz') || ((ThoraxFluidFTR > 0 && ThoraxFluidFTL > 0))) {
    POPThoraxLungOk = "";
} else if ((window.POPThoraxLesion1.includes('bilat') || window.POPThoraxLesion2.includes('bilat') || window.POPThoraxLesion3.includes('bilat') || ThoraxOther1Priority.includes('bilat')) || 
		   (window.POPThoraxLesion1.includes('obou') || window.POPThoraxLesion2.includes('obou') || window.POPThoraxLesion3.includes('obou') || ThoraxOther1Priority.includes('obou')) || 
		   (window.POPThoraxLesion1.includes('prav') || window.POPThoraxLesion2.includes('prav') || window.POPThoraxLesion3.includes('prav')) && 
		   (window.POPThoraxLesion1.includes('lev') || window.POPThoraxLesion2.includes('lev') || window.POPThoraxLesion3.includes('lev'))) {
    POPThoraxLungOk = "";
} else if ((ThoraxParenchymaText.includes('prav') && !ThoraxParenchymaText.includes('lev')) || ThoraxFluidFTR > 0 || 
			window.POPThoraxLesion1.includes('prav') || window.POPThoraxLesion2.includes('prav') || window.POPThoraxLesion3.includes('prav') || ThoraxOther1Priority.includes('prav')) {
    POPThoraxLungOk = "Vlevo adekvátní plicní objem a vzdušnost. ";
} else if ((ThoraxParenchymaText.includes('lev') && !ThoraxParenchymaText.includes('prav')) || ThoraxFluidFTL > 0 || 
			window.POPThoraxLesion1.includes('lev') || window.POPThoraxLesion2.includes('lev') || window.POPThoraxLesion3.includes('lev') || ThoraxOther1Priority.includes('lev')) {
    POPThoraxLungOk = "Vpravo adekvátní plicní objem a vzdušnost. ";
} else if (ThoraxParenchymaText === "" && ThoraxFluidFTR === "" && ThoraxFluidFTL === "" && ThoraxOther1Priority === "") {
    POPThoraxLungOk = "Adekvátní plicní objem a vzdušnost. ";
} else {
    POPThoraxLungOk = "Jinak adekvátní plicní objem a vzdušnost. ";
}




// ABDOMEN

// Abdomen Lesion1

let codeForAbdomenLesion1 = `
// Liver

var AbdomenLesion1Locationtext = "";

var LiverSegments = [];
var LiverLobeR = document.getElementById('Chb1LiverLobeR').checked;
var LiverLobeL = document.getElementById('Chb1LiverLobeL').checked;
var LiverWhole = document.getElementById('Chb1AbdomenSelectLiver').checked;

if (LiverLobeR) LiverSegments.push("pravého laloku");
if (LiverLobeL) LiverSegments.push("levého laloku");

// Check and add specific liver segments
for (let i = 1; i <= 8; i++) {
    let checkboxLiverElem = document.getElementById('Chb1LiverSeg' + i);
    if (checkboxLiverElem && checkboxLiverElem.checked) { 
        LiverSegments.push("S" + i);
    }
}

var seg4A = document.getElementById('Chb1LiverSeg4A').checked;
var seg4B = document.getElementById('Chb1LiverSeg4B').checked;
if (seg4A) LiverSegments.push("S4A");
if (seg4B) LiverSegments.push("S4B");

if (LiverWhole && LiverSegments.length === 0) {
    AbdomenLesion1Locationtext = " jater";
} else if (!LiverWhole || LiverSegments.length > 0) {
    if (LiverSegments.length > 0) {
        AbdomenLesion1Locationtext += LiverSegments.join(", ") + " jater";
    }
}

	
	
// Colon	
	
    let ColonParts = [
        { id: "Chb1ColonTermIleum", name: "terminálního ilea" },
        { id: "Chb1ColonCaecum", name: "céka" },
        { id: "Chb1ColonAsc", name: "c. ascendens" },
        { id: "Chb1ColonTrans", name: "c. transverzum" },
        { id: "Chb1ColonDesc", name: "c. descendens" },
        { id: "Chb1ColonSigmoid", name: "sigmoidea" },
        { id: "Chb1ColonRectum", name: "rekta" },
        { id: "Chb1ColonAnus", name: "anu" },
        { id: "Chb1ColonAppendix", name: "appendixu" }
    ];

    let combinedParts = {
        "terminálního ilea-céka": "ileocéka",
        "céka-c. ascendens": "cékoascendens",
        "c. ascendens-c. transverzum": "hepatální flexury tračníku",
        "c. transverzum-c. descendens": "lienální flexury tračníku",
        "sigmoidea-rekta": "rektosigmatu",
        "rekta-anu": "anorekta"
    };

    let ColonSelected = [];
    for (let part of ColonParts) {
        let checkboxColonElem = document.getElementById(part.id);
        if (checkboxColonElem && checkboxColonElem.checked) {
            ColonSelected.push(part.name);
        }
    }

    for (let i = 0; i < ColonSelected.length - 1; i++) {
        let combinedName = combinedParts[ColonSelected[i] + "-" + ColonSelected[i + 1]];
        if (combinedName) {
            ColonSelected[i] = combinedName;
            ColonSelected.splice(i + 1, 1);
            i--;
        }
    }

	if (ColonSelected.length > 0) {
        if (AbdomenLesion1Locationtext !== "") {
            AbdomenLesion1Locationtext += ", ";
		}
    
		AbdomenLesion1Locationtext += ColonSelected.join(", ");
	}

// Stomach

    let stomachParts = [
        { id: "Chb1StomachCardia", name: "kardie" },
        { id: "Chb1StomachFundus", name: "fundu" },
        { id: "Chb1StomachBody", name: "těla" },
        { id: "Chb1StomachPylorus", name: "pyloru" }
    ];

    let selectedStomach = [];
    for (let part of stomachParts) {
        let checkboxStomachElem = document.getElementById(part.id);
        if (checkboxStomachElem && checkboxStomachElem.checked) {
            selectedStomach.push(part.name);
        }
    }

    if (selectedStomach.length > 0) {
        if (AbdomenLesion1Locationtext !== "") {
            AbdomenLesion1Locationtext += ", ";
        }

        if (selectedStomach.length >= 2) {
            let last = selectedStomach.pop();
            AbdomenLesion1Locationtext += selectedStomach.join(", ") + " a " + last + " žaludku";
        } else {
            AbdomenLesion1Locationtext += selectedStomach.join(", ") + " žaludku";
        }
    }

// Pancreas
let pancreasParts = [
    { id: "Chb1PancreasHead", name: "hlavy" },
    { id: "Chb1PancreasBody", name: "těla" },
    { id: "Chb1PancreasTail", name: "kaudy" }
];

let selectedPancreas = [];
let PancreasWhole = document.getElementById('Chb1AbdomenSelectPancreas').checked;

for (let part of pancreasParts) {
    let checkboxPancreasElem = document.getElementById(part.id);
    if (checkboxPancreasElem && checkboxPancreasElem.checked) {
        selectedPancreas.push(part.name);
    }
}

if (PancreasWhole && selectedPancreas.length === 0) {
    if (AbdomenLesion1Locationtext !== "") {
        AbdomenLesion1Locationtext += ", ";
    }
    AbdomenLesion1Locationtext += "pankreatu";
} else if (selectedPancreas.length > 0) {
    if (AbdomenLesion1Locationtext !== "") {
        AbdomenLesion1Locationtext += ", ";
    }
    if (selectedPancreas.length >= 2) {
        let last = selectedPancreas.pop();
        AbdomenLesion1Locationtext += selectedPancreas.join(", ") + " a " + last + " pankreatu";
    } else {
        AbdomenLesion1Locationtext += selectedPancreas.join(", ") + " pankreatu";
    }
}



// Adrenals
	let adrenals = [];
    if (document.getElementById('Chb1AdrenalR').checked) {
        adrenals.push("pravé nadledviny");
    }
    if (document.getElementById('Chb1AdrenalL').checked) {
        adrenals.push("levé nadledviny");
    }

    if (adrenals.length === 2) {
        AbdomenLesion1Locationtext += "obou nadledvin";
    } else {
        AbdomenLesion1Locationtext += adrenals.join(", ");
    }
	
	
// Kidneys
	let kidneys = [];
    if (document.getElementById('Chb1KidneyR').checked) {
        kidneys.push("pravé ledviny");
    }
    if (document.getElementById('Chb1KidneyL').checked) {
        kidneys.push("levé ledviny");
    }

    if (kidneys.length === 2) {
        AbdomenLesion1Locationtext += " obou ledvin";
    } else {
        AbdomenLesion1Locationtext += kidneys.join(", ");
    }

// Uterus
    let uterusParts = [
        { id: "Chb1UterusCervix", name: "cervixu" },
        { id: "Chb1UterusBody", name: "těla" },
        { id: "Chb1UterusFundus", name: "fundu" }
    ];

    let selectedUterus = [];
    for (let part of uterusParts) {
        let checkboxUterusElem = document.getElementById(part.id);
        if (checkboxUterusElem && checkboxUterusElem.checked) {
            selectedUterus.push(part.name);
        }
    }

    if (selectedUterus.length > 0) {
        if (AbdomenLesion1Locationtext !== "") {
            AbdomenLesion1Locationtext += ", ";
        }
		
        if (selectedUterus.length >= 2) {
            let last = selectedUterus.pop();
            AbdomenLesion1Locationtext += selectedUterus.join(", ") + " a " + last + " dělohy";
        } else {
            AbdomenLesion1Locationtext += selectedUterus.join(", ") + " dělohy";
        }
    }

// Ovaries
	let ovaries = [];
    if (document.getElementById('Chb1OvaryR').checked) {
        ovaries.push("pravého ovaria");
    }
    if (document.getElementById('Chb1OvaryL').checked) {
        ovaries.push("levého ovaria");
    }

    if (ovaries.length === 2) {
        AbdomenLesion1Locationtext += "obou ovarií";
    } else {
        AbdomenLesion1Locationtext += ovaries.join(", ");
    }

// prostata
let prostate = [];
    if (document.getElementById('Chb1ProstateR').checked) {
        prostate.push("pravého laloku prostaty");
    }
    if (document.getElementById('Chb1ProstateL').checked) {
        prostate.push("levého laloku prostaty");
    }

    if (prostate.length === 2) {
        AbdomenLesion1Locationtext += "prostaty";
    } else {
        AbdomenLesion1Locationtext += prostate.join(", ");
    }

// Peritoneum
let peritoneumParts = [
    { id: "Chb1PeritAbdomen", name: "břišní dutiny" },
    { id: "Chb1PeritPelvis", name: "pánve" },
    { id: "Chb1PeritOmentum", name: "omenta" }
];

let selectedPeritoneum = [];
let PeritoneumWhole = document.getElementById('Chb1AbdomenSelectPeritoneum').checked;

for (let part of peritoneumParts) {
    let checkboxPeritoneumElem = document.getElementById(part.id);
    if (checkboxPeritoneumElem && checkboxPeritoneumElem.checked) {
        selectedPeritoneum.push(part.name);
    }
}

if (PeritoneumWhole && selectedPeritoneum.length === 0) {
    // Only PeritoneumWhole is checked
    if (AbdomenLesion1Locationtext !== "") {
        AbdomenLesion1Locationtext += ", ";
    }
    AbdomenLesion1Locationtext += "peritonea";
} else if (selectedPeritoneum.length > 0) {
    if (AbdomenLesion1Locationtext !== "") {
        AbdomenLesion1Locationtext += ", ";
    }
    if (selectedPeritoneum.length == 1 && selectedPeritoneum[0] == "omenta") {
        AbdomenLesion1Locationtext += selectedPeritoneum[0];
    } else if (selectedPeritoneum.length >= 2) {
        let last = selectedPeritoneum.pop();
        AbdomenLesion1Locationtext += "peritonea " + selectedPeritoneum.join(", ") + " a " + last;
    } else {
        AbdomenLesion1Locationtext += "peritonea " + selectedPeritoneum.join(", ");
    }
}


// Others 
    let otherParts = [
        { id: "Chb1OthersSpleen", name: "sleziny" },
        { id: "Chb1OthersGallbladder", name: "žlučníku" },
        { id: "Chb1OthersDuodenum", name: "duodena" },
        { id: "Chb1OthersJejunum", name: "jejuna" },
        { id: "Chb1OthersIleum", name: "ilea" },
		{ id: "Chb1OthersBladder", name: "močového měchýře" }
    ];

    let selectedOthers = [];
    for (let part of otherParts) {
        let checkboxOtherElem = document.getElementById(part.id);
        if (checkboxOtherElem && checkboxOtherElem.checked) {
            selectedOthers.push(part.name);
        }
    }

    let testes = [];
    if (document.getElementById('Chb1OthersTestesR').checked) {
        testes.push("pravého varlete");
    }
    if (document.getElementById('Chb1OthersTestesL').checked) {
        testes.push("levého varlete");
    }

    if (testes.length === 2) {
        selectedOthers.push(testes.join(" a "));
    } else {
        selectedOthers = selectedOthers.concat(testes);
    }

    if (selectedOthers.length > 2) {
        let last = selectedOthers.pop();
        AbdomenLesion1Locationtext += selectedOthers.join(", ") + " a " + last;
    } else {
        AbdomenLesion1Locationtext += selectedOthers.join(", ");
    }

document.getElementById('AbdomenLesion1Location').value = AbdomenLesion1Locationtext;

// Abdomen lesion1 popis

	var AbdomenLesion1Button = document.getElementById("AbdomenLesion1");
    var AbdomenLesion1number = document.getElementById("AbdomenLesion1number").value;
    var AbdomenLesion1type = document.getElementById("AbdomenLesion1type").value.split("|");
    var AbdomenLesion1Location = document.getElementById("AbdomenLesion1Location").value;
	var AbdomenLesion1AddLocation = document.getElementById("AbdomenLesion1AddLocation").value;
    var AbdomenLesion1Loclargest = document.getElementById("AbdomenLesion1Loclargest").value;
    var AbdomenLesion1Activity = document.getElementById("AbdomenLesion1Activity").value;
	var AbdomenLesion1RESActivity = document.getElementById("AbdomenLesion1Activity"); var selectedOption = AbdomenLesion1RESActivity.options[AbdomenLesion1RESActivity.selectedIndex]; var AbdomenLesion1RESActivity = selectedOption.dataset.valuez1 ? selectedOption.dataset.valuez1 : '';
    var AbdomenLesion1RESAltActivity = document.getElementById("AbdomenLesion1Activity"); var selectedOption = AbdomenLesion1RESAltActivity.options[AbdomenLesion1RESAltActivity.selectedIndex]; var AbdomenLesion1RESAltActivity = selectedOption.dataset.valuez2 ? selectedOption.dataset.valuez2 : '';
	var AbdomenLesion1SUV = formatSUV("AbdomenLesion1SUV");
    var AbdomenLesion1Size = formatLesionSize("AbdomenLesion1Size");
	var AbdomenLesion1RESDecision = document.getElementById("AbdomenLesion1Decision").value; 
	var AbdomenLesion1AllLocations = "";
	var AbdomenLesion1SUVPrev = formatSUV("AbdomenLesion1SUVPrev");  
	var AbdomenLesion1PrevSize = formatLesionSize("AbdomenLesion1PrevSize");
	var AbdomenLesion1ComparisonText = generateComparisonText(AbdomenLesion1SUVPrev, AbdomenLesion1PrevSize, DateComparison);
	var AbdomenLesion1ComparisonSUVRes = compareSUVs(AbdomenLesion1SUV, AbdomenLesion1SUVPrev);
	var AbdomenLesion1ComparisonSizeRes = compareSizes(AbdomenLesion1Size, AbdomenLesion1PrevSize);
	var AbdomenLesion1CombinedResult = combineComparisonResults(AbdomenLesion1ComparisonSizeRes, AbdomenLesion1ComparisonSUVRes, AbdomenLesion1number);
  
    var POPAbdomenLesion1 = "";
	var RESAbdomenLesion1 = "";
	
	if (AbdomenLesion1Loclargest !== "") {
		AbdomenLesion1Loclargest = ". Největší " + AbdomenLesion1Loclargest + " ";
	}
	
	AbdomenLesion1AllLocations = AbdomenLesion1Location + " " + AbdomenLesion1AddLocation;
	
	if (AbdomenLesion1Loclargest === "") { 
		AbdomenLesion1Size = AbdomenLesion1Size.replace('diametru ', 'diametru až '); 
		AbdomenLesion1Size = AbdomenLesion1Size.replace('rozměru ', 'rozměru až '); 
	}
    
	
	if (AbdomenLesion1number === "") {
		AbdomenLesion1type = AbdomenLesion1type[0];
	} else {
		AbdomenLesion1type = AbdomenLesion1type[1];
	} 	

let processedSentencePOPAbdomenLesion1 = processSentence(AbdomenLesion1number + " " + AbdomenLesion1type);	
window.POPAbdomenLesion1 = processedSentencePOPAbdomenLesion1 + " " + AbdomenLesion1AllLocations + " " + AbdomenLesion1Activity + " " + AbdomenLesion1Loclargest + " " + AbdomenLesion1Size + " " + AbdomenLesion1SUV + " " + AbdomenLesion1ComparisonText + ".";

let processedSentenceRESAbdomenLesion1 = processSentence(AbdomenLesion1number + " " + AbdomenLesion1RESAltActivity + " " + AbdomenLesion1type);
window.RESAbdomenLesion1 = processedSentenceRESAbdomenLesion1 + " " + AbdomenLesion1AllLocations + " " + AbdomenLesion1CombinedResult + " " + AbdomenLesion1RESDecision + ".";


if (AbdomenLesion1RESDecision.includes("meta") && AbdomenLesion1type.includes("ožisk")) {window.RESAbdomenLesion1 = window.RESAbdomenLesion1.replace(/ložisk/g, "meta ložisk").replace(/Ložisk/g, "Meta ložisk").replace(": charakteru meta", ".");}


`;

let codeForAbdomenLesion2 = codeForAbdomenLesion1.replace(/Lesion1/g, 'Lesion2').replace(/Chb1/g, 'Chb2');
let codeForAbdomenLesion3 = codeForAbdomenLesion1.replace(/Lesion1/g, 'Lesion3').replace(/Chb1/g, 'Chb3');
eval(codeForAbdomenLesion1);
eval(codeForAbdomenLesion2);
eval(codeForAbdomenLesion3);

if (AbdomenLesion1Button.classList.contains('hidden')) {window.POPAbdomenLesion1 = ""; window.RESAbdomenLesion1 = "";}
if (AbdomenLesion2Button.classList.contains('hidden')) {window.POPAbdomenLesion2 = ""; window.RESAbdomenLesion2 = "";}
if (AbdomenLesion3Button.classList.contains('hidden')) {window.POPAbdomenLesion3 = ""; window.RESAbdomenLesion3 = "";}


// ABDOMEN LN

var AbdomenLymphNode1LocationText = "";

var ChbAbdomenSubphrenic = document.getElementById("ChbAbdomenSubphrenic").checked;
var ChbAbdomenRetrocruralR = document.getElementById("ChbAbdomenRetrocruralR").checked;
var ChbAbdomenRetrocruralL = document.getElementById("ChbAbdomenRetrocruralL").checked;
var ChbAbdomenPeriportal = document.getElementById("ChbAbdomenPeriportal").checked;
var ChbAbdomenMesenterial = document.getElementById("ChbAbdomenMesenterial").checked;
var ChbAbdomenParaaortalR = document.getElementById("ChbAbdomenParaaortalR").checked;
var ChbAbdomenParaaortalL = document.getElementById("ChbAbdomenParaaortalL").checked;
var ChbAbdomenParaAICR = document.getElementById("ChbAbdomenParaAICR").checked;
var ChbAbdomenParaAICL = document.getElementById("ChbAbdomenParaAICL").checked;
var ChbAbdomenParaAIER = document.getElementById("ChbAbdomenParaAIER").checked;
var ChbAbdomenParaAIEL = document.getElementById("ChbAbdomenParaAIEL").checked;
var ChbAbdomenParaAIIR = document.getElementById("ChbAbdomenParaAIIR").checked;
var ChbAbdomenParaAIIL = document.getElementById("ChbAbdomenParaAIIL").checked;
var ChbAbdomenInguinsR = document.getElementById("ChbAbdomenInguinsR").checked;
var ChbAbdomenInguinsL = document.getElementById("ChbAbdomenInguinsL").checked;

var descriptions = [];

if (ChbAbdomenSubphrenic) descriptions.push("subfrenicky");
if (ChbAbdomenPeriportal) descriptions.push("periportálně");
if (ChbAbdomenMesenterial) descriptions.push("v mesenteriu");

if (ChbAbdomenParaaortalR && ChbAbdomenParaaortalL) {
    descriptions.push("paraortálně bilat.");
} else {
    if (ChbAbdomenParaaortalR) descriptions.push("paraaortálně vpravo");
    if (ChbAbdomenParaaortalL) descriptions.push("paraaortálně vlevo");
}

if (ChbAbdomenRetrocruralR && ChbAbdomenRetrocruralL) {
    descriptions.push("retrokrurálně bilat.");
} else {
    if (ChbAbdomenRetrocruralR) descriptions.push("retrokrurálně vpravo");
    if (ChbAbdomenRetrocruralL) descriptions.push("retrokrurálně vlevo");
}

if (ChbAbdomenParaAICR && ChbAbdomenParaAICL) {
    descriptions.push("při společných ilikách bilat.");
} else {
    if (ChbAbdomenParaAICR) descriptions.push("při společné ilice vpravo");
    if (ChbAbdomenParaAICL) descriptions.push("při společné ilice vlevo");
}

if (ChbAbdomenParaAIER && ChbAbdomenParaAIEL) {
    descriptions.push("při zevních ilikách bilat.");
} else {
    if (ChbAbdomenParaAIER) descriptions.push("při zevní ilice vpravo");
    if (ChbAbdomenParaAIEL) descriptions.push("při zevní ilice vpravo");
}

if (ChbAbdomenParaAIIR && ChbAbdomenParaAIIL) {
    descriptions.push("při vnitřních ilikách bilat.");
} else {
    if (ChbAbdomenParaAIIR) descriptions.push("při vnitřní ilice vpravo");
    if (ChbAbdomenParaAIIL) descriptions.push("při vnitřní ilice vpravo");
}

if (ChbAbdomenInguinsR && ChbAbdomenInguinsL) {
    descriptions.push("inguinální bilat.");
} else {
    if (ChbAbdomenInguinsR) descriptions.push("inguinálně vpravo");
    if (ChbAbdomenInguinsL) descriptions.push("inguinálně vlevo");
}

if (descriptions.length === 2) {
    AbdomenLymphNode1LocationText = descriptions.join(' a ');
} else if (descriptions.length > 2) {
    var lastDescription = descriptions.pop();
    var secondLastDescription = descriptions.pop();
    AbdomenLymphNode1LocationText = descriptions.join(', ') + ', ' + secondLastDescription + ' a ' + lastDescription;
} else {
    AbdomenLymphNode1LocationText = descriptions.join(', ');
}


document.getElementById('AbdomenLymphNode1Location').value = AbdomenLymphNode1LocationText;


// Abdomen lymph node popis

	var AbdomenLymphNode1Button = document.getElementById("AbdomenLymphNode1");
    var AbdomenLymphNode1number = document.getElementById("AbdomenLymphNode1number").value;
    var AbdomenLymphNode1type = document.getElementById("AbdomenLymphNode1type").value.split("|");
    var AbdomenLymphNode1Location = document.getElementById("AbdomenLymphNode1Location").value;
	var AbdomenLymphNode1AddLocation = document.getElementById("AbdomenLymphNode1AddLocation").value;
    var AbdomenLymphNode1Loclargest = document.getElementById("AbdomenLymphNode1Loclargest").value;
    var AbdomenLymphNode1Activity = document.getElementById("AbdomenLymphNode1Activity").value;
	var AbdomenLymphNode1RESActivity = document.getElementById("AbdomenLymphNode1Activity"); var selectedOption = AbdomenLymphNode1RESActivity.options[AbdomenLymphNode1RESActivity.selectedIndex]; var AbdomenLymphNode1RESActivity = selectedOption.dataset.valuez1 ? selectedOption.dataset.valuez1 : '';
    var AbdomenLymphNode1RESAltActivity = document.getElementById("AbdomenLymphNode1Activity"); var selectedOption = AbdomenLymphNode1RESAltActivity.options[AbdomenLymphNode1RESAltActivity.selectedIndex]; var AbdomenLymphNode1RESAltActivity = selectedOption.dataset.valuez2 ? selectedOption.dataset.valuez2 : '';
	var AbdomenLymphNode1SUV = formatSUV("AbdomenLymphNode1SUV");
    var AbdomenLymphNode1Size = formatLymphNodeSize("AbdomenLymphNode1Size");
	var AbdomenLymphNode1RESDecision = document.getElementById("AbdomenLymphNode1Decision"); var selectedOption = AbdomenLymphNode1RESDecision.options[AbdomenLymphNode1RESDecision.selectedIndex]; var AbdomenLymphNode1RESDecision = selectedOption.dataset.valuez1 ? selectedOption.dataset.valuez1 : '';
	var AbdomenLymphNode1AllLocations = "";
	var AbdomenLymphNode1SUVPrev = formatSUV("AbdomenLymphNode1SUVPrev");  
	var AbdomenLymphNode1PrevSize = formatLymphNodeSize("AbdomenLymphNode1PrevSize");
	var AbdomenLymphNode1ComparisonText = generateComparisonText(AbdomenLymphNode1SUVPrev, AbdomenLymphNode1PrevSize, DateComparison);
	var AbdomenLymphNode1ComparisonSUVRes = compareSUVs(AbdomenLymphNode1SUV, AbdomenLymphNode1SUVPrev);
	var AbdomenLymphNode1ComparisonSizeRes = compareSizes(AbdomenLymphNode1Size, AbdomenLymphNode1PrevSize);
	var AbdomenLymphNode1CombinedResult = combineComparisonResults(AbdomenLymphNode1ComparisonSizeRes, AbdomenLymphNode1ComparisonSUVRes, AbdomenLymphNode1number);
  
    var POPAbdomenLymphNode1 = "";
	var RESAbdomenLymphNode1 = "";
	
	if (AbdomenLymphNode1Loclargest !== "") {
		AbdomenLymphNode1Loclargest = ". Největší " + AbdomenLymphNode1Loclargest + " ";
	}
	    
	AbdomenLymphNode1AllLocations = AbdomenLymphNode1Location + " " + AbdomenLymphNode1AddLocation;
	
	if (AbdomenLymphNode1Loclargest === "") { 
		AbdomenLymphNode1Size = AbdomenLymphNode1Size.replace('diametru ', 'diametru až '); 
		AbdomenLymphNode1Size = AbdomenLymphNode1Size.replace('rozměru ', 'rozměru až '); 
	}
	
	if (AbdomenLymphNode1number === "") {
		AbdomenLymphNode1type = AbdomenLymphNode1type[0];
	} else {
		AbdomenLymphNode1type = AbdomenLymphNode1type[1];
	}

let processedSentencePOPAbdomenLymphNode1 = processSentence(AbdomenLymphNode1number + " " + AbdomenLymphNode1type);	
POPAbdomenLymphNode1 = processedSentencePOPAbdomenLymphNode1 + " " + AbdomenLymphNode1AllLocations + " " + AbdomenLymphNode1Activity + " " + AbdomenLymphNode1Loclargest + " " + AbdomenLymphNode1Size + " " + AbdomenLymphNode1SUV + " " + AbdomenLymphNode1ComparisonText + ".";

let processedSentenceRESAbdomenLymphNode1 = processSentence(AbdomenLymphNode1number + " " + AbdomenLymphNode1RESAltActivity + " " + AbdomenLymphNode1type);
RESAbdomenLymphNode1 = processedSentenceRESAbdomenLymphNode1 + " " + AbdomenLymphNode1AllLocations + " " + AbdomenLymphNode1CombinedResult + " " + AbdomenLymphNode1RESDecision + ".";


// ABDOMEN OTHERS

// Liver
var AbdomenLiverText = "";

var ChbLiverSteatosis = document.getElementById("ChbLiverSteatosis").checked;
var ChbLiverCyst = document.getElementById("ChbLiverCyst").checked;
var ChbLiverCysts = document.getElementById("ChbLiverCysts").checked;
var ChbLiverHemangioma = document.getElementById("ChbLiverHemangioma").checked;
var ChbLiverHemangiomas = document.getElementById("ChbLiverHemangiomas").checked;
var ChbLiverResectionR = document.getElementById("ChbLiverResectionR").checked;
var ChbLiverResectionL = document.getElementById("ChbLiverResectionL").checked;
var ChbLiverRFAR = document.getElementById("ChbLiverRFAR").checked;
var ChbLiverRFAL = document.getElementById("ChbLiverRFAL").checked;
var ChbLiverBileductDilation = document.getElementById("ChbLiverBileductDilation").checked;
var AbdomenLiverOther = document.getElementById("AbdomenLiverOther").value.trim();

var descriptions = [];

if (ChbLiverSteatosis) descriptions.push("steatotická");
if (ChbLiverCyst) descriptions.push("s fotopenickou cystou");
if (ChbLiverCysts) descriptions.push("s vícečetnými fotopenickými cystami");
if (ChbLiverHemangioma) descriptions.push("s ložiskem bez zvýšené metabolické aktivity charakteru hemangiomu");
if (ChbLiverHemangiomas) descriptions.push("s ložisky bez zvýšené metabolické aktivity charakteru hemangiomů");

if (ChbLiverResectionR && ChbLiverResectionL) {
    descriptions.push("po resekci v obou lalocích");
} else {
    if (ChbLiverResectionR) descriptions.push("po resekci v pravém laloku");
    if (ChbLiverResectionL) descriptions.push("po resekci v levém laloku");
}

if (ChbLiverRFAR && ChbLiverRFAL) {
    descriptions.push("po RFA v obou lalocích");
} else {
    if (ChbLiverRFAR) descriptions.push("po RFA v pravém laloku");
    if (ChbLiverRFAL) descriptions.push("po RFA v levém laloku");
}

if (ChbLiverBileductDilation) descriptions.push("s dilatací žlučových cest");
if (AbdomenLiverOther) descriptions.push(AbdomenLiverOther);

if (descriptions.length) {
  AbdomenLiverText = "Játra " + descriptions.join(", ") + ". ";
}

// Gallbladder

var AbodomenGallbladderText = "";

var ChbGallbladderEctomy = document.getElementById("ChbGallbladderEctomy").checked;
var ChbGallbladderStone = document.getElementById("ChbGallbladderStone").checked;
var ChbGallbladderStones = document.getElementById("ChbGallbladderStones").checked;
var ChbGallbladderSludge = document.getElementById("ChbGallbladderSludge").checked;
var ChbGallbladderItis = document.getElementById("ChbGallbladderItis").checked;
var GallbladderOther = document.getElementById("GallbladderOther").value.trim();

var descriptionsGallbladder = [];

if (ChbGallbladderEctomy) descriptionsGallbladder.push("chybí po CHCE");
if (ChbGallbladderStone) descriptionsGallbladder.push("s konkrementem");
if (ChbGallbladderStones) descriptionsGallbladder.push("s vícečetnými konkrementy");
if (ChbGallbladderSludge) descriptionsGallbladder.push("s drobnými konkrementy či sludge");
if (ChbGallbladderItis) descriptionsGallbladder.push("s rozšířenou stěnou se zvýšenou akumulací RF");
if (GallbladderOther) descriptionsGallbladder.push(GallbladderOther);

if (descriptionsGallbladder.length) {
	AbodomenGallbladderText = "Žlučník " + descriptionsGallbladder.join(", ") + ". ";
	}

// Spleen
var AbdomenSpleenText = "";

var ChbSpleenEnlarged = document.getElementById("ChbSpleenEnlarged").checked;
var ChbSpleenActivity = document.getElementById("ChbSpleenActivity").checked;
var ChbSpleenEctomy = document.getElementById("ChbSpleenEctomy").checked;
var ChbSpleenCyst = document.getElementById("ChbSpleenCyst").checked;
var ChbSpleenCysts = document.getElementById("ChbSpleenCysts").checked;
var ChbSpleenInfarct = document.getElementById("ChbSpleenInfarct").checked;
var ChbSpleenRegenerate = document.getElementById("ChbSpleenRegenerate").checked;
var AbdomenSpleenOther = document.getElementById("AbdomenSpleenOther").value.trim();

var spleenDescriptions = [];

if (ChbSpleenEnlarged) spleenDescriptions.push("zvětšena");
if (ChbSpleenActivity) spleenDescriptions.push("s difuzně vysokou akumulací RF");
if (ChbSpleenEctomy) spleenDescriptions.push("chybí po splenektomii");
if (ChbSpleenCyst) spleenDescriptions.push("s fotopenickou cystou");
if (ChbSpleenCysts) spleenDescriptions.push("s fotopenickými cystami");
if (ChbSpleenInfarct) spleenDescriptions.push("s klínovitým defektem po infarktu");
if (ChbSpleenRegenerate) spleenDescriptions.push("přítomny regeneráty");
if (AbdomenSpleenOther) spleenDescriptions.push(AbdomenSpleenOther);

if (spleenDescriptions.length) {
  AbdomenSpleenText = "Slezina " + spleenDescriptions.join(", ") + ". ";
}

// Stomach
var AbdomenStomachText = "";

var ChbStomachGastrectomyTot = document.getElementById("ChbStomachGastrectomyTot").checked;
var ChbStomachGastrectomyPart = document.getElementById("ChbStomachGastrectomyPart").checked;
var ChbStomachActivity = document.getElementById("ChbStomachActivity").checked;
var ChbStomachPEG = document.getElementById("ChbStomachPEG").checked;
var AbdomenStomachOther = document.getElementById("AbdomenStomachOther").value.trim();

var stomachDescriptions = [];

if (ChbStomachGastrectomyTot) stomachDescriptions.push("chybí po totální gastrectomii, anastomóza klidná");
if (ChbStomachGastrectomyPart) stomachDescriptions.push("po parciální gastrectomii, anastomóza klidná");
if (ChbStomachActivity) stomachDescriptions.push("s nespecificky difuzně vysokou akumulací RF");
if (ChbStomachPEG) stomachDescriptions.push("s PEG");
if (AbdomenStomachOther) stomachDescriptions.push(AbdomenStomachOther);

if (stomachDescriptions.length) {
  AbdomenStomachText = "Žaludek " + stomachDescriptions.join(", ") + ". ";
}

// Pancreas
var AbdomenPancreasText = "";

var ChbSPancreasEnlarged = document.getElementById("ChbSPancreasEnlarged").checked;
var ChbPancreasActivity = document.getElementById("ChbPancreasActivity").checked;
var ChbPancreasCyst = document.getElementById("ChbPancreasCyst").checked;
var ChbPancreasCystS = document.getElementById("ChbPancreasCystS").checked;
var ChbPancreasEctomy = document.getElementById("ChbPancreasEctomy").checked;
var ChbSpleenHemiEctomyR = document.getElementById("ChbSpleenHemiEctomyR").checked;
var ChbSpleenHemiEctomyL = document.getElementById("ChbSpleenHemiEctomyL").checked;
var AbdomenPancreasOther = document.getElementById("AbdomenPancreasOther").value.trim();

var pancreasDescriptions = [];

if (ChbSPancreasEnlarged) pancreasDescriptions.push("atrofický");
if (ChbPancreasActivity) pancreasDescriptions.push("s dilatovaným Wirsungem");
if (ChbPancreasCyst) pancreasDescriptions.push("s fotopenickou (pseudo)cystou");
if (ChbPancreasCystS) pancreasDescriptions.push("s fotopenickými (pseudo)cystami");
if (ChbPancreasEctomy) pancreasDescriptions.push("chybí po totální pankreatektomii");
if (ChbSpleenHemiEctomyR) pancreasDescriptions.push("redukován po hemiduodenopankreatektomii");
if (ChbSpleenHemiEctomyL) pancreasDescriptions.push("redukován po hemipankreatektomii těla a kaudy");
if (AbdomenPancreasOther) pancreasDescriptions.push(AbdomenPancreasOther);

if (pancreasDescriptions.length) {
  AbdomenPancreasText = "Pankreas " + pancreasDescriptions.join(", ") + ". ";
}

// Adrenal
var AbdomenAdrenalText = "";

var ChbAdrenalAdenomaR = document.getElementById("ChbAdrenalAdenomaR").checked;
var ChbAdrenalAdenomaL = document.getElementById("ChbAdrenalAdenomaL").checked;
var ChbAdrenalHyperplasiaR = document.getElementById("ChbAdrenalHyperplasiaR").checked;
var ChbAdrenalHyperplasiaL = document.getElementById("ChbAdrenalHyperplasiaL").checked;
var ChbAdrenalMyelolipomaR = document.getElementById("ChbAdrenalMyelolipomaR").checked;
var ChbAdrenalMyelolipomaL = document.getElementById("ChbAdrenalMyelolipomaL").checked;
var ChbAdrenalActivityR = document.getElementById("ChbAdrenalActivityR").checked;
var ChbAdrenalActivityL = document.getElementById("ChbAdrenalActivityL").checked;
var ChbStomachGastrectomyPart = document.getElementById("ChbStomachGastrectomyPart").checked;
var ChbStomachActivity = document.getElementById("ChbStomachActivity").checked;
var ChbAdrenalEctomyR = document.getElementById("ChbAdrenalEctomyR").checked;
var ChbAdrenalEctomyL = document.getElementById("ChbAdrenalEctomyL").checked;
var AbdomenAdrenalOther = document.getElementById("AbdomenAdrenalOther").value.trim();

var descriptionsAdrenal = [];

if (ChbAdrenalAdenomaR && ChbAdrenalAdenomaL) {
    descriptionsAdrenal.push("bilat. s ložisky bez zvýšené akumulace RF obrazu adenomů");
} else {
    if (ChbAdrenalAdenomaR) descriptionsAdrenal.push("pravá s ložiskem bez zvýšené akumulace RF obrazu adenomu");
    if (ChbAdrenalAdenomaL) descriptionsAdrenal.push("levá s ložiskem bez zvýšené akumulace RF obrazu adenomu");
} 

if (ChbAdrenalHyperplasiaR && ChbAdrenalHyperplasiaL) {
    descriptionsAdrenal.push("bilat. rozšířeny bez výrazněji zvýšené akumulace RF obrazu hyperplázie");
} else {
    if (ChbAdrenalHyperplasiaR) descriptionsAdrenal.push("pravá rozšířena bez zvýšené akumulace RF obrazu hyperplázie");
    if (ChbAdrenalHyperplasiaL) descriptionsAdrenal.push("levá rozšířena bez zvýšené akumulace RF obrazu hyperplázie");
}

if (ChbAdrenalMyelolipomaR && ChbAdrenalMyelolipomaL) {
    descriptionsAdrenal.push("bilat. s ložisky s podílem tuku a bez zvýšené akumulace RF obrazu myelolipomů");
} else {
    if (ChbAdrenalMyelolipomaR) descriptionsAdrenal.push("pravá s ložiskem s podílem tuku a bez zvýšené akumulace RF obrazu myelolipomu");
    if (ChbAdrenalMyelolipomaL) descriptionsAdrenal.push("levá s ložiskem s podílem tuku a bez zvýšené akumulace RF obrazu myelolipomu");
}

if (ChbAdrenalActivityR && ChbAdrenalActivityL) {
    descriptionsAdrenal.push("se zvýšenou akumulací RF bilat. bez ložiskových změn pravděpodobně při aktivaci");
} else {
    if (ChbAdrenalActivityR) descriptionsAdrenal.push("pravá se zvýšenou akumulací RF bez ložiskových změn pravděpodobně při aktivaci");
    if (ChbAdrenalActivityL) descriptionsAdrenal.push("levá se zvýšenou akumulací RF bez ložiskových změn pravděpodobně při aktivaci");
}

if (ChbAdrenalEctomyR && ChbAdrenalEctomyL) {
    descriptionsAdrenal.push("chybí bilat. po adrenalektomii");
} else {
    if (ChbAdrenalEctomyR) descriptionsAdrenal.push("pravá chybí po adrenalektomii");
    if (ChbAdrenalEctomyL) descriptionsAdrenal.push("levá chybí po adrenalektomii");
}
if (AbdomenAdrenalOther) descriptionsAdrenal.push(AbdomenAdrenalOther);

if (descriptionsAdrenal.length) {
  AbdomenAdrenalText = "Nadledviny: " + descriptionsAdrenal.join(", ") + ". ";
}


// Kidneys
var AbdomenKidneysText = "";

var ChbKidneysHydrIR = document.getElementById("ChbKidneysHydrIR").checked;
var ChbKidneysHydrIL = document.getElementById("ChbKidneysHydrIL").checked;
var ChbKidneysHydrIIR = document.getElementById("ChbKidneysHydrIIR").checked;
var ChbKidneysHydrIIL = document.getElementById("ChbKidneysHydrIIL").checked;
var ChbKidneysHydrIIIR = document.getElementById("ChbKidneysHydrIIIR").checked;
var ChbKidneysHydrIIIL = document.getElementById("ChbKidneysHydrIIIL").checked;
var ChbKidneysLithR = document.getElementById("ChbKidneysLithR").checked;
var ChbKidneysLithL = document.getElementById("ChbKidneysLithL").checked;
var ChbKidneysCystR = document.getElementById("ChbKidneysCystR").checked;
var ChbKidneysCystL = document.getElementById("ChbKidneysCystL").checked;
var ChbKidneysCystsR = document.getElementById("ChbKidneysCystsR").checked;
var ChbKidneysCystsL = document.getElementById("ChbKidneysCystsL").checked;
var ChbKidneysAMLR = document.getElementById("ChbKidneysAMLR").checked;
var ChbKidneysAMLL = document.getElementById("ChbKidneysAMLL").checked;
var ChbKidneysScarR = document.getElementById("ChbKidneysScarR").checked;
var ChbKidneysScarL = document.getElementById("ChbKidneysScarL").checked;
var ChbKidneysStentR = document.getElementById("ChbKidneysStentR").checked;
var ChbKidneysStentL = document.getElementById("ChbKidneysStentL").checked;
var ChbKidneysStomyR = document.getElementById("ChbKidneysStomyR").checked;
var ChbKidneysStomyL = document.getElementById("ChbKidneysStomyL").checked;
var ChbKidneysParcResectionR = document.getElementById("ChbKidneysParcResectionR").checked;
var ChbKidneysParcResectionL = document.getElementById("ChbKidneysParcResectionL").checked;
var ChbKidneysEctomyR = document.getElementById("ChbKidneysEctomyR").checked;
var ChbKidneysEctomyL = document.getElementById("ChbKidneysEctomyL").checked;
var AbdomenKidneysOther = document.getElementById("AbdomenKidneysOther").value.trim();

var descriptionsKidneys = [];

function addBilateralDescription(rCheck, lCheck, bilateralDesc, rDesc, lDesc) {
    if (rCheck && lCheck) {
        descriptionsKidneys.push(bilateralDesc);
    } else {
        if (rCheck) descriptionsKidneys.push(rDesc);
        if (lCheck) descriptionsKidneys.push(lDesc);
    }
}

addBilateralDescription(ChbKidneysHydrIR, ChbKidneysHydrIL, "hydronefróza I.st. bilat.", "hydronefróza I.st. vpravo", "hydronefróza I.st. vlevo");
addBilateralDescription(ChbKidneysHydrIIR, ChbKidneysHydrIIL, "hydronefróza II.st. bilat.", "hydronefróza II.st. vpravo", "hydronefróza II.st. vlevo");
addBilateralDescription(ChbKidneysHydrIIIR, ChbKidneysHydrIIIL, "hydronefróza III.st. bilat.", "hydronefróza III.st. vpravo", "hydronefróza III.st. vlevo");
addBilateralDescription(ChbKidneysLithR, ChbKidneysLithL, "kalikolitiáza bilat.", "kalikolitiáza vpravo", "kalikolitiáza vlevo");
addBilateralDescription(ChbKidneysCystR, ChbKidneysCystL, "fotopenická cysta bilat.", "fotopenická cysta vpravo", "fotopenická cysta vlevo");
addBilateralDescription(ChbKidneysCystsR, ChbKidneysCystsL, "fotopenické cysty bilat.", "fotopenické cysty vpravo", "fotopenické cysty vlevo");
addBilateralDescription(ChbKidneysAMLR, ChbKidneysAMLL, "bilat. ložiska s tuk. denzitami bez zvýšené akumulace RF obrazu AML", "vpravo ložisko s tuk. denzitami bez zvýšené akumulace RF obrazu AML", "vlevo ložisko s tuk. denzitami bez zvýšené akumulace RF obrazu AML");
addBilateralDescription(ChbKidneysScarR, ChbKidneysScarL, "jizevnaté změny parenchymu bilat.", "jizevnaté změny parenchymu vpravo", "jizevnaté změny parenchymu vlevo");
addBilateralDescription(ChbKidneysStentR, ChbKidneysStentL, "double pig-tail katetr pánvička - ureter bilat.", "double pig-tail katetr pánvička - ureter vpravo", "double pig-tail katetr pánvička - ureter vlevo");
addBilateralDescription(ChbKidneysStomyR, ChbKidneysStomyL, "nefrostomie bilat.", "nefrostomie vpravo", "nefrostomie vlevo");
addBilateralDescription(ChbKidneysParcResectionR, ChbKidneysParcResectionL, "obě po parc. resekci", "pravá po parc. resekci", "levá po parc. resekci");
addBilateralDescription(ChbKidneysEctomyR, ChbKidneysEctomyL, "obě chybí po totální nefrektomii", "pravá chybí po totální nefrektomii", "levá chybí po totální nefrektomii");
if (AbdomenKidneysOther) descriptionsKidneys.push(AbdomenKidneysOther);

if (descriptionsKidneys.length) {
  AbdomenKidneysText = "Ledviny: " + descriptionsKidneys.join(", ") + ". ";
}

// Colon
var AbdomenColonText = "";


var ChbColonRectalRes = document.getElementById("ChbColonRectalRes").checked;
var ChbColonRectalAmp = document.getElementById("ChbColonRectalAmp").checked;
var ChbColonHemicolectomyR = document.getElementById("ChbColonHemicolectomyR").checked;
var ChbColonHemicolectomyL = document.getElementById("ChbColonHemicolectomyL").checked;
var ChbColonAnast = document.getElementById("ChbColonAnast").checked;
var ChbColonStomiaR = document.getElementById("ChbColonStomiaR").checked;
var ChbColonStomiaL = document.getElementById("ChbColonStomiaL").checked;
var ChbColonInfiltrate = document.getElementById("ChbColonInfiltrate").checked;
var AbdomenColonOther = document.getElementById("AbdomenColonOther").value.trim();

var descriptionsColon = [];

if (ChbColonRectalRes) {descriptionsColon.push("st.p. resekci rektosigmatu");} 
if (ChbColonRectalAmp) {descriptionsColon.push("st.p. amputaci rekta");}
if (ChbColonHemicolectomyR && ChbColonHemicolectomyL) {descriptionsColon.push("st.p. subtotální kolektomii");
} else {if (ChbColonHemicolectomyR) {descriptionsColon.push("st.p. pravostranné hemikolektomii");}
		if (ChbColonHemicolectomyL) {descriptionsColon.push("st.p. levostranné hemikolektomii");}
}
if (ChbColonAnast) {descriptionsColon.push("anastomóza klidná");} 
if (ChbColonStomiaR) {descriptionsColon.push("stomie v pravém hypogastriu");}
if (ChbColonStomiaL) {descriptionsColon.push("stomie v levém hypogastriu");}
if (ChbColonInfiltrate) {descriptionsColon.push("presakrální infiltrát bez fokálně zvýšené akumulace RF");}
if (AbdomenColonOther) descriptionsColon.push(AbdomenColonOther);

if (descriptionsColon.length) {AbdomenColonText = "Tračník: " + descriptionsColon.join(", ") + ". ";
}

// Bladder
var AbdomenBladderText = "";

var ChbBladderEctomy = document.getElementById("ChbBladderEctomy").checked;
var ChbBladderStomia = document.getElementById("ChbBladderStomia").checked;
var ChbBladderDiverticulum = document.getElementById("ChbBladderDiverticulum").checked;
var ChbBladderDiverticulums = document.getElementById("ChbBladderDiverticulums").checked;
var ChbBladderCatether = document.getElementById("ChbBladderCatether").checked;
var AbdomenBladderOther = document.getElementById("AbdomenBladderOther").value.trim();

var descriptionsBladder = [];

if (ChbBladderEctomy) {descriptionsBladder.push("chybí po cystektomii");}
if (ChbBladderStomia) {descriptionsBladder.push("ureteroileocystostomie v pravém hypogastriu");}
if (ChbBladderDiverticulum) {descriptionsBladder.push("s divertiklem");}
if (ChbBladderDiverticulums) {descriptionsBladder.push("s vícečetnými divertikly");}
if (ChbBladderCatether) {descriptionsBladder.push("se zavedeným katetrem");}
if (AbdomenBladderOther) descriptionsBladder.push(AbdomenBladderOther);

if (descriptionsBladder.length) {AbdomenBladderText = "Močový měchýř " + descriptionsBladder.join(", ") + ". ";}

// Uterus
var AbdomenUterusText = "";

var ChbUterusEctomy = document.getElementById("ChbUterusEctomy").checked;
var ChbUterusMyoma = document.getElementById("ChbUterusMyoma").checked;
var ChbUterusMyomas = document.getElementById("ChbUterusMyomas").checked;
var ChbUterusActivity = document.getElementById("ChbUterusActivity").checked;
var AbdomenUterusOther = document.getElementById("AbdomenUterusOther").value.trim();

var descriptionsUterus = [];

if (ChbUterusEctomy) {descriptionsUterus.push("chybí po hysterektomii");}
if (ChbUterusMyoma) {descriptionsUterus.push("s ložiskem bez zvýšené akumulace RF obrazu myomu");}
if (ChbUterusMyomas) {descriptionsUterus.push("s vícečetnými ložisky bez zvýšené akumulace RF obrazu myomů");}
if (ChbUterusActivity) {descriptionsUterus.push("se zvýšenou aktivitou sliznice pravděp. v rámci cyklu");}
if (AbdomenUterusOther) descriptionsUterus.push(AbdomenUterusOther);

if (descriptionsUterus.length) {AbdomenUterusText = "Děloha " + descriptionsUterus.join(", ") + ". ";}

// Ovaries
var AbdomenOvariesText = "";

var ChbOvariesCystR = document.getElementById("ChbOvariesCystR").checked;
var ChbOvariesCystL = document.getElementById("ChbOvariesCystL").checked;
var ChbOvariesActivityR = document.getElementById("ChbOvariesActivityR").checked;
var ChbOvariesActivityL = document.getElementById("ChbOvariesActivityL").checked;
var AbdomenOvariesOther = document.getElementById("AbdomenOvariesOther").value.trim();

var descriptionsOvaries = [];

if (ChbOvariesCystR && ChbOvariesCystL) {
    descriptionsOvaries.push("obě s fotopenickými cystami");
} else {
	if (ChbOvariesCystR) {descriptionsOvaries.push("pravé s fotopenickou cystou");}
	if (ChbOvariesCystL) {descriptionsOvaries.push("levé s fotopenickou cystou");}
}

if (ChbOvariesActivityR && ChbOvariesActivityL) {
    descriptionsOvaries.push("obě se zvýšenou aktivitou pravděp. v rámci cyklu");
} else {
    if (ChbOvariesActivityR) {descriptionsOvaries.push("pravé se zvýšenou aktivitou pravděp. v rámci cyklu");}
    if (ChbOvariesActivityL) {descriptionsOvaries.push("levé se zvýšenou aktivitou pravděp. v rámci cyklu");}
}

if (AbdomenOvariesOther) descriptionsOvaries.push(AbdomenOvariesOther);

if (descriptionsOvaries.length) {AbdomenOvariesText = "Ovária: " + descriptionsOvaries.join(", ") + ". ";}

// Prostate
var AbdomenProstateText = ""; AbdomenProstateRes = [];

var ChbProstateEctomy = document.getElementById("ChbProstateEctomy").checked;
var ChbProstateTURP = document.getElementById("ChbProstateTURP").checked;
var ChbProstateEnlarged = document.getElementById("ChbProstateEnlarged").checked;
var ChbProstateLesionR = document.getElementById("ChbProstateLesionR").checked;
var ChbProstateLesionL = document.getElementById("ChbProstateLesionL").checked;
var AbdomenProstateOther = document.getElementById("AbdomenProstateOther").value.trim();

var descriptionsProstate = [];

if (ChbProstateEctomy) {descriptionsProstate.push("chybí po radikální prostatektomii");}
if (ChbProstateTURP) {descriptionsProstate.push("s centrálním defektem po transuretrální resekci");}
if (ChbProstateEnlarged) {descriptionsProstate.push("je zvětšena");}

if (ChbProstateLesionR && ChbProstateLesionL) {
    descriptionsProstate.push("s okrsky zvýšené akumulace RF bilat."); AbdomenProstateRes.push("Prostata s okrsky zvýšené metabolické aktivity bilat. k dovyšetření. ");
} else {
    if (ChbProstateLesionR) {descriptionsProstate.push("s okrskem zvýšené akumulace RF vpravo"); AbdomenProstateRes.push("Prostata s okrskem zvýšené metabolické aktivity vpravo k dovyšetření. ");}
    if (ChbProstateLesionL) {descriptionsProstate.push("s okrskem zvýšené akumulace RF vlevo"); AbdomenProstateRes.push("Prostata s okrskem zvýšené metabolické aktivity vlevo k dovyšetření. ");}
}

if (AbdomenProstateOther) descriptionsProstate.push(AbdomenProstateOther);

if (descriptionsProstate.length) {AbdomenProstateText = "Prostata " + descriptionsProstate.join(", ") + ". ";}

//Testes
var AbdomenTestesText = "";

var ChbTestesEctomyR = document.getElementById("ChbTestesEctomyR").checked;
var ChbTestesEctomyL = document.getElementById("ChbTestesEctomyL").checked;
var ChbTestesHydroceleR = document.getElementById("ChbTestesHydroceleR").checked;
var ChbTestesHydroceleL = document.getElementById("ChbTestesHydroceleL").checked;
var AbdomenTestesOther = document.getElementById("AbdomenTestesOther").value.trim();

var descriptionsTestes = [];

if (ChbTestesEctomyR && ChbTestesEctomyL) {
    descriptionsTestes.push("chybí obě po orchiektomii");
} else {
    if (ChbTestesEctomyR) {descriptionsTestes.push("chybí pravé po orchiektomii");}
    if (ChbTestesEctomyL) {descriptionsTestes.push("chybí levé po orchiektomii");}
}

if (ChbTestesHydroceleR && ChbTestesHydroceleL) {
    descriptionsTestes.push("hydrokéla bilat.");
} else {
    if (ChbTestesHydroceleR) {descriptionsTestes.push("hydrokéla vpravo");}
    if (ChbTestesHydroceleL) {descriptionsTestes.push("hydrokéla vlevo");}
}

if (AbdomenTestesOther) descriptionsTestes.push(AbdomenTestesOther);

if (descriptionsTestes.length) {AbdomenTestesText = "Testes: " + descriptionsTestes.join(", ") + ". ";}

// Abd. wall
var AbdomenWallText = "";

var ChbAbdomenWallPlus = document.getElementById("ChbAbdomenWallPlus").checked;
var ChbAbdomenWallMinus = document.getElementById("ChbAbdomenWallMinus").checked;
var ChbAbdomenWallHerniaS = document.getElementById("ChbAbdomenWallHerniaS").checked;
var ChbAbdomenWallHerniaL = document.getElementById("ChbAbdomenWallHerniaL").checked;
var ChbAbdomenWallHerniaSupraS = document.getElementById("ChbAbdomenWallHerniaSupraS").checked;
var ChbAbdomenWallHerniaSupraL = document.getElementById("ChbAbdomenWallHerniaSupraL").checked;
var ChbAbdomenWallHerniaUmbS = document.getElementById("ChbAbdomenWallHerniaUmbS").checked;
var ChbAbdomenWallHerniaUmbL = document.getElementById("ChbAbdomenWallHerniaUmbL").checked;
var ChbAbdomenWallHerniaIngR = document.getElementById("ChbAbdomenWallHerniaIngR").checked;
var ChbAbdomenWallHerniaIngL = document.getElementById("ChbAbdomenWallHerniaIngL").checked;
var AbdomenWallOther = document.getElementById("AbdomenWallOther").value.trim();

var descriptionsWall = [];

if (ChbAbdomenWallPlus) {descriptionsWall.push("s přetrvávající zvýšenou akumulací RF v jizvě");}
if (ChbAbdomenWallMinus) {descriptionsWall.push("s jizvou bez zvýšené akumulace RF");}
if (ChbAbdomenWallHerniaS) {descriptionsWall.push("s drobnou herniací v jizvě");}
if (ChbAbdomenWallHerniaL) {descriptionsWall.push("s herniací v jizvě s obsahem střevních kliček");}
if (ChbAbdomenWallHerniaSupraS) {descriptionsWall.push("s drobná herniací supraumbilikálně");}
if (ChbAbdomenWallHerniaSupraL) {descriptionsWall.push("s herniací supraumbilikálně s obsahem střevních kliček");}
if (ChbAbdomenWallHerniaUmbS) {descriptionsWall.push("s drobnou umbilikální hernií");}
if (ChbAbdomenWallHerniaUmbL) {descriptionsWall.push("s umbilikální hernií s obsahem střevní kličky");}
if (ChbAbdomenWallHerniaIngR && ChbAbdomenWallHerniaIngL) {descriptionsWall.push("s inguinální herniací bilat.");}
else {
    if (ChbAbdomenWallHerniaIngR) {descriptionsWall.push("s inguinální herniací vpravo");}
    if (ChbAbdomenWallHerniaIngL) {descriptionsWall.push("s inguinální herniací vlevo");}
}

if (AbdomenWallOther) descriptionsWall.push(AbdomenWallOther);

if (descriptionsWall.length > 1) {
  AbdomenWallText = "Břišní stěna " + descriptionsWall.slice(0, -1).join(", ") + " a " + descriptionsWall.slice(-1) + ". ";
} else {
  AbdomenWallText = descriptionsWall.length ? "Břišní stěna " + descriptionsWall[0] + ". " : "";
}


//Ascites
var AbdomenFluidText = "";
var AbdomenFluidRes = "";

var ChbAbdomenFluidS = document.getElementById("ChbAbdomenFluidS").checked;
var ChbAbdomenFluidM = document.getElementById("ChbAbdomenFluidM").checked;
var ChbAbdomenFluidL = document.getElementById("ChbAbdomenFluidL").checked;
var ChbAbdomenFluidXL = document.getElementById("ChbAbdomenFluidXL").checked;

AbdomenFluidText = "Bez tekutiny v dutině břišní. ";

function uncheckOthers(clickedCheckboxId) {
    const checkboxes = ["ChbAbdomenFluidS", "ChbAbdomenFluidM", "ChbAbdomenFluidL", "ChbAbdomenFluidXL"];
    checkboxes.forEach(function(id) {
        if (id !== clickedCheckboxId) {
            document.getElementById(id).checked = false;
        }
    });
}
["ChbAbdomenFluidS", "ChbAbdomenFluidM", "ChbAbdomenFluidL", "ChbAbdomenFluidXL"].forEach(function(id) {
    document.getElementById(id).addEventListener("click", function() {
        uncheckOthers(id);
    });
});


if (ChbAbdomenFluidS) {AbdomenFluidText = "Malé množství tekutiny v malé pánvi.";AbdomenFluidRes = "Malé množství tekutiny v malé pánvi. ";}
if (ChbAbdomenFluidM) {AbdomenFluidText = "Tekutina pod játry a v malé pánvi.";AbdomenFluidRes = "Nevýrazný ascites. ";}
if (ChbAbdomenFluidL) {AbdomenFluidText = "Tekutina okolo jater, sleziny, mezikličkově a v pánvi.";AbdomenFluidRes = "Ascites. ";}
if (ChbAbdomenFluidXL) {AbdomenFluidText = "Velké množství tekutiny intraperitoneálně.";AbdomenFluidRes = "Výrazný ascites. ";}



//Abdomen Organs Combine

AbdomenOrgansText = AbdomenLiverText + " " + AbodomenGallbladderText + " " + AbdomenSpleenText + " " + AbdomenStomachText + " " + AbdomenPancreasText + " " + AbdomenAdrenalText + " " + AbdomenKidneysText + " " + AbdomenColonText + " " + AbdomenBladderText + " " + 
					AbdomenUterusText + " " + AbdomenOvariesText + " " + AbdomenProstateText;


// Abdomen native or not

if (POPAbdomenLymphNode1.includes('střední') || POPAbdomenLymphNode1.includes('zvýšenou') || POPAbdomenLymphNode1.includes('vysokou') || 
	window.POPAbdomenLesion1.includes('střední') || window.POPAbdomenLesion1.includes('zvýšenou') || window.POPAbdomenLesion1.includes('vysokou') || 
	window.POPAbdomenLesion2.includes('střední') || window.POPAbdomenLesion2.includes('zvýšenou') || window.POPAbdomenLesion2.includes('vysokou') || 
	window.POPAbdomenLesion3.includes('střední') || window.POPAbdomenLesion3.includes('zvýšenou') || window.POPAbdomenLesion3.includes('vysokou')
	)  
	{ POPAbdomenNative = "";
	} else {POPAbdomenNative = "Není přítomen patologický hyperakumulující fokus, ložisko či lymfadenopatie. ";
}

// Abdomen Other Organs Ok or Not

//Others by priority
var AbdomenOther1Priority = ""; var AbdomenOther1NoPriority = ""; var AbdomenOther1ResPriority = "";
var AbdomenOther1Pop = document.getElementById("AbdomenOther1Pop").value;
var AbdomenOther1Res = document.getElementById("AbdomenOther1Res").value;
if (AbdomenOther1Pop !== "" && AbdomenOther1Res ==="") {AbdomenOther1Priority = ""; AbdomenOther1NoPriority = AbdomenOther1Pop + ". "; AbdomenOther1ResPriority = "";
	} else if (AbdomenOther1Pop !== "" && AbdomenOther1Res !=="") {AbdomenOther1Priority = AbdomenOther1Pop  + ". "; AbdomenOther1NoPriority = ""; AbdomenOther1ResPriority = AbdomenOther1Res  + ". ";}


if (AbdomenOrgansText.trim() === "" && AbdomenOther1Priority === "") {
    POPAbdomenOrgansOk = "Orgány dutiny břišní jsou bez výraznější patologie. ";
} else if (((AbdomenOrgansText.split(',').length - 1) < 5) || AbdomenOther1Priority !== "") {
    POPAbdomenOrgansOk = "Jinak jsou orgány dutiny břišní bez výraznější patologie. ";
} else {
	POPAbdomenOrgansOk = "";
}



// SKELETON

// Skeleton Lesion1
let codeForSkeletonLesion1 = `
var SkeletonLesion1Locationtext = "";

    if (document.getElementById('Chb1SkeletCalvaR').checked && document.getElementById('Chb1SkeletCalvaL').checked) {
        SkeletonLesion1Locationtext += "kalvy bilat.";
    } else if (document.getElementById('Chb1SkeletCalvaR').checked) {
        SkeletonLesion1Locationtext += "kalvy vpravo";
    } else if (document.getElementById('Chb1SkeletCalvaL').checked) {
        SkeletonLesion1Locationtext += "kalvy vlevo";
    }

    var vertebra = [];
    if (document.getElementById('Chb1SkeletVertebraC').checked) vertebra.push("C");
    if (document.getElementById('Chb1SkeletVertebraT').checked) vertebra.push("T");
    if (document.getElementById('Chb1SkeletVertebraL').checked) vertebra.push("L");
    if (vertebra.length > 0) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "obratlů " + vertebra.join(", ") + " páteře";
    }

    if (document.getElementById('Chb1SkeletClavicleR').checked && document.getElementById('Chb1SkeletClavicleL').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "klavikuly bilat.";
    } else if (document.getElementById('Chb1SkeletClavicleR').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "klavikuly vpravo";
    } else if (document.getElementById('Chb1SkeletClavicleL').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "klavikuly vlevo";
    }

    if (document.getElementById('Chb1SkeletScapulaR').checked && document.getElementById('Chb1SkeletScapulaL').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "scapuly bilat.";
    } else if (document.getElementById('Chb1SkeletScapulaR').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "scapuly vpravo";
    } else if (document.getElementById('Chb1SkeletScapulaL').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "scapuly vlevo";
    }

    if (document.getElementById('Chb1SkeletSternum').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "sterna";
    }


    if (document.getElementById('Chb1SkeletHumerusR').checked && document.getElementById('Chb1SkeletHumerusL').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "prox. humeru bilat.";
    } else if (document.getElementById('Chb1SkeletHumerusR').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "prox. humeru vpravo";
    } else if (document.getElementById('Chb1SkeletHumerusL').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "prox. humeru vlevo";
    }

    if (document.getElementById('Chb1SkeletRibsR').checked && document.getElementById('Chb1SkeletRibsL').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "žeber bilat.";
    } else if (document.getElementById('Chb1SkeletRibsR').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "žeber vpravo";
    } else if (document.getElementById('Chb1SkeletRibsL').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "žeber vlevo";
    }

    if (document.getElementById('Chb1SkeletSacrumR').checked && document.getElementById('Chb1SkeletSacrumL').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "sakra bilat.";
    } else if (document.getElementById('Chb1SkeletSacrumR').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "sakra vpravo";
    } else if (document.getElementById('Chb1SkeletSacrumL').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "sakra vlevo";
    }

    if (document.getElementById('Chb1SkeletIliumR').checked && document.getElementById('Chb1SkeletIliumL').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "kyčelní kosti bilat.";
    } else if (document.getElementById('Chb1SkeletIliumR').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "kyčelní kosti vpravo";
    } else if (document.getElementById('Chb1SkeletIliumL').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "kyčelní kosti vlevo";
    }

    if (document.getElementById('Chb1SkeletPubisR').checked && document.getElementById('Chb1SkeletPubisL').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "stydké kosti bilat.";
    } else if (document.getElementById('Chb1SkeletPubisR').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "stydké kosti vpravo";
    } else if (document.getElementById('Chb1SkeletPubisL').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "stydké kosti vlevo";
    }

    if (document.getElementById('Chb1SkeletIschiumR').checked && document.getElementById('Chb1SkeletIschiumL').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "sedací kosti bilat.";
    } else if (document.getElementById('Chb1SkeletIschiumR').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "sedací kosti vpravo";
    } else if (document.getElementById('Chb1SkeletIschiumL').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "sedací kosti vlevo";
    }

    if (document.getElementById('Chb1SkeletFemurR').checked && document.getElementById('Chb1SkeletFemurL').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "prox. femurů bilat.";
    } else if (document.getElementById('Chb1SkeletFemurR').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "prox. femuru vpravo";
    } else if (document.getElementById('Chb1SkeletFemurL').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "prox. femuru vlevo";
    }

var arr = SkeletonLesion1Locationtext.split(", ");
    if (arr.length > 1) {
        SkeletonLesion1Locationtext = arr.slice(0, arr.length - 1).join(", ") + " a " + arr[arr.length - 1];
    }

    document.getElementById('SkeletonLesion1Location').value = SkeletonLesion1Locationtext;


// Skeleton lesion1 popis

	var SkeletonLesion1Button = document.getElementById("SkeletonLesion1");
    var SkeletonLesion1number = document.getElementById("SkeletonLesion1number").value;
    var SkeletonLesion1type = document.getElementById("SkeletonLesion1type").value.split("|");
    var SkeletonLesion1Location = document.getElementById("SkeletonLesion1Location").value;
	var SkeletonLesion1AddLocation = document.getElementById("SkeletonLesion1AddLocation").value;
    var SkeletonLesion1Loclargest = document.getElementById("SkeletonLesion1Loclargest").value;
    var SkeletonLesion1Activity = document.getElementById("SkeletonLesion1Activity").value;
	var SkeletonLesion1RESActivity = document.getElementById("SkeletonLesion1Activity"); var selectedOption = SkeletonLesion1RESActivity.options[SkeletonLesion1RESActivity.selectedIndex]; var SkeletonLesion1RESActivity = selectedOption.dataset.valuez1 ? selectedOption.dataset.valuez1 : '';
    var SkeletonLesion1RESAltActivity = document.getElementById("SkeletonLesion1Activity"); var selectedOption = SkeletonLesion1RESAltActivity.options[SkeletonLesion1RESAltActivity.selectedIndex]; var SkeletonLesion1RESAltActivity = selectedOption.dataset.valuez2 ? selectedOption.dataset.valuez2 : '';
	var SkeletonLesion1SUV = formatSUV("SkeletonLesion1SUV");
    var SkeletonLesion1Size = formatLesionSize("SkeletonLesion1Size");
	var SkeletonLesion1RESDecision = document.getElementById("SkeletonLesion1Decision").value; 
	var SkeletonLesion1AllLocations = "";
	var SkeletonLesion1SUVPrev = formatSUV("SkeletonLesion1SUVPrev");  
	var SkeletonLesion1PrevSize = formatLesionSize("SkeletonLesion1PrevSize");
	var SkeletonLesion1ComparisonText = generateComparisonText(SkeletonLesion1SUVPrev, SkeletonLesion1PrevSize, DateComparison);
	var SkeletonLesion1ComparisonSUVRes = compareSUVs(SkeletonLesion1SUV, SkeletonLesion1SUVPrev);
	var SkeletonLesion1ComparisonSizeRes = compareSizes(SkeletonLesion1Size, SkeletonLesion1PrevSize);
	var SkeletonLesion1CombinedResult = combineComparisonResults(SkeletonLesion1ComparisonSizeRes, SkeletonLesion1ComparisonSUVRes, SkeletonLesion1number);
    
    var POPSkeletonLesion1 = "";
	var RESSkeletonLesion1 = "";
	
	if (SkeletonLesion1Loclargest !== "") {
		SkeletonLesion1Loclargest = ". Největší " + SkeletonLesion1Loclargest + " ";
	}
	
	SkeletonLesion1AllLocations = SkeletonLesion1Location + " " + SkeletonLesion1AddLocation;
	
	if (SkeletonLesion1Loclargest === "") { 
		SkeletonLesion1Size = SkeletonLesion1Size.replace('diametru ', 'diametru až '); 
		SkeletonLesion1Size = SkeletonLesion1Size.replace('rozměru ', 'rozměru až '); 
	}
    
	
	if (SkeletonLesion1number === "") {
		SkeletonLesion1type = SkeletonLesion1type[0];
	} else {
		SkeletonLesion1type = SkeletonLesion1type[1];
	} 	

let processedSentencePOPSkeletonLesion1 = processSentence(SkeletonLesion1number + " " + SkeletonLesion1type);	
window.POPSkeletonLesion1 = processedSentencePOPSkeletonLesion1 + " " + SkeletonLesion1AllLocations + " " + SkeletonLesion1Activity + " " + SkeletonLesion1Loclargest + " " + SkeletonLesion1Size + " " + SkeletonLesion1SUV + " " + SkeletonLesion1ComparisonText + ".";

let processedSentenceRESSkeletonLesion1 = processSentence(SkeletonLesion1number + " " + SkeletonLesion1RESAltActivity + " " + SkeletonLesion1type);
window.RESSkeletonLesion1 = processedSentenceRESSkeletonLesion1 + " " + SkeletonLesion1AllLocations + " " + SkeletonLesion1CombinedResult + " " + SkeletonLesion1RESDecision + ".";


if (SkeletonLesion1RESDecision.includes("meta") && SkeletonLesion1type.includes("ožisk")) {window.RESSkeletonLesion1 = window.RESSkeletonLesion1.replace(/ložisk/g, "meta ložisk").replace(/Ložisk/g, "Meta ložisk").replace(": charakteru meta", ".");}

`;

let codeForSkeletonLesion2 = codeForSkeletonLesion1.replace(/Lesion1/g, 'Lesion2').replace(/Chb1/g, 'Chb2');
let codeForSkeletonLesion3 = codeForSkeletonLesion1.replace(/Lesion1/g, 'Lesion3').replace(/Chb1/g, 'Chb3');
eval(codeForSkeletonLesion1);
eval(codeForSkeletonLesion2);
eval(codeForSkeletonLesion3);

if (SkeletonLesion1Button.classList.contains('hidden')) {window.POPSkeletonLesion1 = ""; window.RESSkeletonLesion1 = "";}
if (SkeletonLesion2Button.classList.contains('hidden')) {window.POPSkeletonLesion2 = ""; window.RESSkeletonLesion2 = "";}
if (SkeletonLesion3Button.classList.contains('hidden')) {window.POPSkeletonLesion3 = ""; window.RESSkeletonLesion3 = "";}

// Skeleton OTHERS

// surgery
var SkeletonSurgeryText = "";

var ChbSkeletSurgSternum = document.getElementById("ChbSkeletSurgSternum").checked;
var ChbSkeletSurgVertC = document.getElementById("ChbSkeletSurgVertC").checked; var ChbSkeletSurgVertT = document.getElementById("ChbSkeletSurgVertT").checked; var ChbSkeletSurgVertL = document.getElementById("ChbSkeletSurgVertL").checked;
var SkeletSurgVertLoc = document.getElementById("SkeletSurgVertLoc").value.trim();
var ChbSkeletSurgTEPR = document.getElementById("ChbSkeletSurgTEPR").checked; var ChbSkeletSurgTEPL = document.getElementById("ChbSkeletSurgTEPL").checked;
var SkeletSurgOther = document.getElementById("SkeletSurgOther").value.trim();

if (ChbSkeletSurgSternum) SkeletonSurgeryText += "Cerkláž sterna. ";

if (ChbSkeletSurgVertC) SkeletonSurgeryText += "Přední stabilizace ";
if (ChbSkeletSurgVertT) SkeletonSurgeryText += "Zadní stabilizace ";
if (ChbSkeletSurgVertL) SkeletonSurgeryText += "Zadní stabilizace ";

if (SkeletSurgVertLoc) SkeletonSurgeryText += SkeletSurgVertLoc + ". ";

if (ChbSkeletSurgTEPR && ChbSkeletSurgTEPL) {SkeletonSurgeryText += "TEP obou kyčlí. ";
} else {
    if (ChbSkeletSurgTEPR) SkeletonSurgeryText += "TEP pravé kyčle. ";
    if (ChbSkeletSurgTEPL) SkeletonSurgeryText += "TEP levé kyčle. ";
}

if (SkeletSurgOther) SkeletonSurgeryText += SkeletSurgOther + ". ";

// activity
var SkeletonActivityText = ""; var SkeletonActivityRes = "";

var ChbSkeletonActivityPlus = document.getElementById("ChbSkeletonActivityPlus").checked;
var ChbSkeletonActivityMinus = document.getElementById("ChbSkeletonActivityMinus").checked;
var ChbSkeletonEnostosis = document.getElementById("ChbSkeletonEnostosis").checked;
var ChbSkeletonEnostosisM = document.getElementById("ChbSkeletonEnostosisM").checked;
var SkeletonActivityOther = document.getElementById("SkeletonActivityOther").value.trim();

if (ChbSkeletonActivityPlus) SkeletonActivityText += "Difuzně zvýšená metabolická aktivita v kostní dřeni. ";
if (ChbSkeletonActivityMinus) SkeletonActivityText += "Lokální absence akumulace RF v kostní dřeni ozářené oblasti. ";  
if (ChbSkeletonEnostosis) SkeletonActivityText += "Drobná enostóza bez zvýšené akumulace RF. ";  
if (ChbSkeletonEnostosisM) SkeletonActivityText += "Drobné enostózy bez zvýšené akumulace RF. ";
if (SkeletonActivityOther) SkeletonActivityText += SkeletonActivityOther + ". ";

// trauma
var SkeletonTraumaText = ""; var SkeletonTraumaRecentText = ""; var SkeletonTraumaOlderText = ""; var SkeletonTraumaRecentRes = "";

var ChbSkeletTraumaRecent = document.getElementById("ChbSkeletTraumaRecent").checked;
var SkeletTraumaRecentOther = document.getElementById("SkeletTraumaRecentOther").value.trim();
var ChbSkeletTraumaOlder = document.getElementById("ChbSkeletTraumaOlder").checked;
var SkeletTraumaOlderOther = document.getElementById("SkeletTraumaOlderOther").value.trim();

if (ChbSkeletTraumaRecent) SkeletonTraumaRecentText += "Zvýšená akumulace RF je přítomna v oblasti recentních traumatických změn: "; 
if (SkeletTraumaRecentOther) SkeletonTraumaRecentText += SkeletTraumaRecentOther + ". ";

if (ChbSkeletTraumaOlder) SkeletonTraumaOlderText += "Starší potraumatické změny: ";
if (SkeletTraumaOlderOther) SkeletonTraumaOlderText += SkeletTraumaOlderOther + ". ";

if (ChbSkeletTraumaRecent && SkeletTraumaRecentOther !== "") {SkeletonTraumaRecentRes = "Zvýšená metabolická aktivita " + SkeletTraumaRecentOther + " na podkladu recentních traumatických změn. ";}

SkeletonTraumaText = SkeletonTraumaRecentText + SkeletonTraumaOlderText;

// degener
var SkeletonDegenerText = "";

var ChbSkeletDegenerVertC = document.getElementById("ChbSkeletDegenerVertC").checked;
var ChbSkeletDegenerVertT = document.getElementById("ChbSkeletDegenerVertT").checked;
var ChbSkeletDegenerVertL = document.getElementById("ChbSkeletDegenerVertL").checked;
var ChbSkeletDegenerShoulderR = document.getElementById("ChbSkeletDegenerShoulderR").checked;
var ChbSkeletDegenerShoulderL = document.getElementById("ChbSkeletDegenerShoulderL").checked;
var ChbSkeletDegenerHipR = document.getElementById("ChbSkeletDegenerHipR").checked;
var ChbSkeletDegenerHipL = document.getElementById("ChbSkeletDegenerHipL").checked;
var SkeletDegenerOther = document.getElementById("SkeletDegenerOther").value.trim();

var descriptionsSkeleton = [];

if (ChbSkeletDegenerVertC && ChbSkeletDegenerVertT && ChbSkeletDegenerVertL) {
  descriptionsSkeleton.push("celé páteře");
  } else {
    if (ChbSkeletDegenerVertC) descriptionsSkeleton.push("C páteře");
    if (ChbSkeletDegenerVertT) descriptionsSkeleton.push("T páteře");
    if (ChbSkeletDegenerVertL) descriptionsSkeleton.push("L páteře");
  }

if (ChbSkeletDegenerShoulderR && ChbSkeletDegenerShoulderL) {
  descriptionsSkeleton.push("obou ramenních kloubů");
  } else {
    if (ChbSkeletDegenerShoulderR) descriptionsSkeleton.push("pravého ramenního kloubu");
    if (ChbSkeletDegenerShoulderL) descriptionsSkeleton.push("levého ramenního kloubu");
  }

if (ChbSkeletDegenerHipR && ChbSkeletDegenerHipL) {
  descriptionsSkeleton.push("obou kyčelních kloubů");
  } else {
    if (ChbSkeletDegenerHipR) descriptionsSkeleton.push("pravého kyčelního kloubu");
    if (ChbSkeletDegenerHipL) descriptionsSkeleton.push("levého kyčelního kloubu");
  }

if (SkeletDegenerOther) descriptionsSkeleton.push(SkeletDegenerOther);

if (descriptionsSkeleton.length > 1) {
  SkeletonDegenerText = "Degenerativní změny " + descriptionsSkeleton.slice(0, -1).join(", ") + " a " + descriptionsSkeleton.slice(-1) + ". ";
} else {
  SkeletonDegenerText = descriptionsSkeleton.length ? "Degenerativní změny " + descriptionsSkeleton[0] + ". " : "";
}

// Joints activity

var SkeletonJointsText = ""; var SkeletonJointsRes = "";

var ChbSkeletJointsSCR = document.getElementById("ChbSkeletJointsSCR").checked;
var ChbSkeletJointsSCL = document.getElementById("ChbSkeletJointsSCL").checked;
var ChbSkeletJointsACR = document.getElementById("ChbSkeletJointsACR").checked;
var ChbSkeletJointsACL = document.getElementById("ChbSkeletJointsACL").checked;
var ChbSkeletJointsShoulderR = document.getElementById("ChbSkeletJointsShoulderR").checked;
var ChbSkeletJointsShoulderL = document.getElementById("ChbSkeletJointsShoulderL").checked;
var ChbSkeletJointsVertC = document.getElementById("ChbSkeletJointsVertC").checked;
var ChbSkeletJointsVertT = document.getElementById("ChbSkeletJointsVertT").checked;
var ChbSkeletJointsVertL = document.getElementById("ChbSkeletJointsVertL").checked;
var ChbSkeletJointsHipR = document.getElementById("ChbSkeletJointsHipR").checked;
var ChbSkeletJointsHipL = document.getElementById("ChbSkeletJointsHipL").checked;
var ChbSkeletJointsIschR = document.getElementById("ChbSkeletJointsIschR").checked;
var ChbSkeletJointsIschL = document.getElementById("ChbSkeletJointsIschL").checked;
var ChbSkeletJointsSymR = document.getElementById("ChbSkeletJointsSymR").checked;
var ChbSkeletJointsPolyMyaR = document.getElementById("ChbSkeletJointsPolyMyaR").checked;
var SkeletJointsOther = document.getElementById("SkeletJointsOther").value.trim();

var descriptionsJoints = [];

if (ChbSkeletJointsSCR && ChbSkeletJointsSCL) {
  descriptionsJoints.push("obou sternoklavikulárních kloubů");
} else {
  if (ChbSkeletJointsSCR) descriptionsJoints.push("pravého sternoklavikulárního kloubu");
  if (ChbSkeletJointsSCL) descriptionsJoints.push("levého sternoklavikulárního kloubu");
}

if (ChbSkeletJointsACR && ChbSkeletJointsACL) {
  descriptionsJoints.push("obou akromioklavikulárních kloubů");
} else {
  if (ChbSkeletJointsACR) descriptionsJoints.push("pravého akromioklavikulárního kloubu");
  if (ChbSkeletJointsACL) descriptionsJoints.push("levého akromioklavikulárního kloubu");
}

if (ChbSkeletJointsShoulderR && ChbSkeletJointsShoulderL) {
  descriptionsJoints.push("obou ramenních kloubů");
} else {
  if (ChbSkeletJointsShoulderR) descriptionsJoints.push("pravého ramenního kloubu");
  if (ChbSkeletJointsShoulderL) descriptionsJoints.push("levého ramenního kloubu");
}

if (ChbSkeletJointsVertC && ChbSkeletJointsVertT && ChbSkeletJointsVertL) {
  descriptionsJoints.push("interspinózních prostor C, T i L páteře");
} else {
  if (ChbSkeletJointsVertC) descriptionsJoints.push("krční interspinózně  ");
  if (ChbSkeletJointsVertT) descriptionsJoints.push("hrudní interspinózně");
  if (ChbSkeletJointsVertL) descriptionsJoints.push("bederní interspinózně");
}

if (ChbSkeletJointsHipR && ChbSkeletJointsHipL) {
  descriptionsJoints.push("obou kyčelních kloubů");
} else {
  if (ChbSkeletJointsHipR) descriptionsJoints.push("pravého kyčelního kloubu");
  if (ChbSkeletJointsHipL) descriptionsJoints.push("levého kyčelního kloubu");
}

if (ChbSkeletJointsIschR && ChbSkeletJointsIschL) {
  descriptionsJoints.push("obou sedacích kostí");
} else {
  if (ChbSkeletJointsIschR) descriptionsJoints.push("pravé sedací kosti");
  if (ChbSkeletJointsIschL) descriptionsJoints.push("levé sedací kosti");
}

if (ChbSkeletJointsSymR) descriptionsJoints.push("symfýzy");

if (SkeletJointsOther) descriptionsJoints.push(SkeletJointsOther);

if (descriptionsJoints.length > 1) {
  SkeletonJointsText = "Zvýšená akumulace RF v oblastech " + descriptionsJoints.slice(0, -1).join(", ") + " a " + descriptionsJoints.slice(-1) + " v rámci zánětlivých změn. ";
} else {
  SkeletonJointsText = descriptionsJoints.length ? "Zvýšená akumulace RF v oblasti " + descriptionsJoints[0] + " v rámci zánětlivých změn. " : "";
}

if (ChbSkeletJointsPolyMyaR) {SkeletonJointsText = "Zvýšená akumulace RF v oblastech, ramenních, SC, AC, kyčelních kloubech, při symfýze, velkých trochanterech, interpsinózně."; 
								SkeletonJointsRes = "Zvýšená metabolická aktivita v mnohočetných kloubních lokalizacích a při šlachových úponech v rámci burzitis, entezitis a synovitis: v.s. v rámci polymyalgia rheumatica.";}


// Skeleton native or not

if (window.POPSkeletonLesion1.includes('střední') || window.POPSkeletonLesion1.includes('zvýšenou') || window.POPSkeletonLesion1.includes('vysokou') || 
	window.POPSkeletonLesion2.includes('střední') || window.POPSkeletonLesion2.includes('zvýšenou') || window.POPSkeletonLesion2.includes('vysokou') || 
	window.POPSkeletonLesion3.includes('střední') || window.POPSkeletonLesion3.includes('zvýšenou') || window.POPSkeletonLesion3.includes('vysokou')
	)  
	{ POPSkeletonNative = "";
	} else {POPSkeletonNative = "Není přítomen patologický hyperakumulující fokus či ložisko. ";
}

//Others by priority
var SkeletonOther1Priority = ""; var SkeletonOther1NoPriority = ""; var SkeletonOther1ResPriority = "";
var SkeletonOther1Pop = document.getElementById("SkeletonOther1Pop").value;
var SkeletonOther1Res = document.getElementById("SkeletonOther1Res").value;
if (SkeletonOther1Pop !== "" && SkeletonOther1Res ==="") {SkeletonOther1Priority = ""; SkeletonOther1NoPriority = SkeletonOther1Pop + ". "; SkeletonOther1ResPriority = "";
	} else if (SkeletonOther1Pop !== "" && SkeletonOther1Res !=="") {SkeletonOther1Priority = SkeletonOther1Pop  + ". "; SkeletonOther1NoPriority = ""; SkeletonOther1ResPriority = SkeletonOther1Res  + ". ";}


//Latest examination comparison
if (DateCompare === "") {ExamCompareText = ""; POPExamCompareText = "";} else {ExamCompareText = "Oproti vyšetření z " + DateComparison + ":"; POPExamCompareText = "Srovnáno s vyšetřením z " + DateComparison + ". ";}


//SUVLiver
var SUVLiver = document.getElementById('SUVLiver').value; SUVLiver = SUVLiver.trim().replace('.', ',');
var SUVLiverPrevious = document.getElementById("SUVLiverPrevious").value; SUVLiverPrevious = SUVLiverPrevious.trim().replace('.', ',');
var SUVLiverText = "";
if (SUVLiver === "" && SUVLiverPrevious === "") {
    SUVLiverText = "";
} else if (SUVLiver !== "" && SUVLiverPrevious === "") {
    SUVLiverText = "Jaterní parenchym s SUVmax=" + SUVLiver + ". ";
} else if (SUVLiver !== "" && SUVLiverPrevious !== "") {
    SUVLiverText = "Jaterní parenchym s SUVmax=" + SUVLiver + " (minule " + DateComparison + " byla hodnota " + SUVLiverPrevious + "), tedy v závěru bude zohledněna korekce.";
}

//SUVParotid
var SUVParotid = document.getElementById('SUVParotid').value;
SUVParotid = SUVParotid.trim().replace('.', ',');
var SUVParotidText = "";

if (SUVParotid === "") {
    SUVParotidText = "";
} else {
    SUVParotidText = "Parotické žlázy s SUVmax=" + SUVParotid + ". ";
}

	
// POPIS

PETCTNAMEText.value = nazev;

PETCTINDText.value = indikace; document.getElementById("indikace").addEventListener("input", updateTexts);

var POPText = document.getElementById("POPText"); 
	
POPText.value = 
POPExamCompareText + "\n" +
"Hlava/krk: " + POPNeckNative + " " + window.POPNeckLesion1 + " " + window.POPNeckLesion2 + " " + window.POPNeckLesion3 + " " + POPNeckLymphNode1 + " " + NeckOther1Priority + " " + 
	HeadTonsilsText + " " + NeckParotidText + " " + NeckThyroidText + " " + NeckTreatmentText + " " + HeadMaxSinusText + " " + NeckOther1NoPriority + "\n" +
"Hrudník: " + POPThoraxNative + " " + window.POPThoraxLesion1 + " " + window.POPThoraxLesion2 + " " + window.POPThoraxLesion3 + " " + ThoraxLymphNodePlusText + " " + POPThoraxLymphNode1 + " " + ThoraxOther1Priority + " " + ThoraxParenchymaText + " " + POPThoraxLungOk + " " + ThoraxFluidText + " " + ThoraxOesophText + " " + ThoraxMammaText + " " + ThoraxThymusText + " " + ThoraxDevicesText + " " + ThoraxEmbolisationText + " " + ThoraxOther1NoPriority + "\n" +
"Břicho: " + POPAbdomenNative + " " + window.POPAbdomenLesion1 + " " + window.POPAbdomenLesion2 + " " + window.POPAbdomenLesion3 + " " + POPAbdomenLymphNode1 + " " + AbdomenOther1Priority + " " + AbdomenOrgansText + " " + POPAbdomenOrgansOk + " " + AbdomenOther1NoPriority + " " + AbdomenFluidText + " " + AbdomenTestesText + " " + AbdomenWallText + "\n" + 
"Skelet a měkké tkáně: " + POPSkeletonNative + " " + window.POPSkeletonLesion1 + " " + window.POPSkeletonLesion2 + " " + window.POPSkeletonLesion3 + " " + SkeletonOther1Priority + " " + SkeletonActivityText + " " + SkeletonJointsText + " " + SkeletonTraumaText + " " + SkeletonSurgeryText + " " + SkeletonDegenerText + " " + SkeletonOther1NoPriority + "\n" +			
ObecneTexts + " " + ObecneNativeText + " " + SUVLiverText + " " + SUVParotidText;


	POPText.value = POPText.value.replace(/^\s+/gm, '');  // odstraní mezery na začátku řádek
	POPText.value = POPText.value.replace(/ {2,}/g, ' ');  // více mezer = jedna mezera
	POPText.value = POPText.value.replace(/^[.,\s]+/gm, '');  // odstraní tečku a čárku pokud jsou první na řádce
	POPText.value = POPText.value.replace(/ \./g, '.'); // mezera tečka = bez mezery tečka
	POPText.value = POPText.value.replace(/\.{2,}/g, '.'); // více teček = jedna tečka
	POPText.value = POPText.value.replace(/\s\)/g, ')');   // mezera závorka = jen závorka




// ZÁVĚR

//bez známek přítomnosti ano / ne - změnit bude čekovat spíš jestli neoplazie
if ( POPNeckNative === "" || POPThoraxNative === "" || POPAbdomenNative === "" || POPSkeletonNative === "") {RESTextNative = "";} else {RESTextNative = "Bez známek přítomnosti FDG-avidní neoplázie. ";}

// bez nových ložisek
var ChbNoNew = document.getElementById("ChbNoNew").checked;
var RESTextNoNew = "";
if (ChbNoNew) {RESTextNoNew = "Bez nových hypermetabolických patologických ložisek.";
} 

var RESText = document.getElementById("RESText"); 

RESText.value = 
RESTextNative + "\n" + 
ExamCompareText + "\n" + 
window.RESNeckLesion1 + " " + window.RESNeckLesion2 + " " + window.RESNeckLesion3 + "\n" +
RESNeckLymphNode1 + "\n" +
NeckOther1ResPriority + "\n" +
window.RESThoraxLesion1 + " " + window.RESThoraxLesion2 + " " + window.RESThoraxLesion3 + "\n" +
RESThoraxLymphNode1 + "\n" +
ThoraxOther1ResPriority + "\n" +
ThoraxFluidFTRRes + ThoraxFluidFTLRes + ThoraxFluidFPRes + ThoraxEmbolisationRes + ThoraxThymusRes + "\n" +
window.RESAbdomenLesion1 + " " + window.RESAbdomenLesion2 + " " + window.RESAbdomenLesion3 + " " + 
RESAbdomenLymphNode1 + "\n" +
AbdomenOther1ResPriority + "\n" +
AbdomenProstateRes + "\n" +
AbdomenFluidRes + "\n" +
window.RESSkeletonLesion1 + " " + window.RESSkeletonLesion2 + " " + window.RESSkeletonLesion3 + "\n" +
SkeletonTraumaRecentRes + "\n" +
SkeletonOther1ResPriority + "\n" +
SkeletonJointsRes + "\n" +
NeckThyroidRes + HeadTonsilsRes + "\n" +
RESTextNoNew
;


	RESText.value = RESText.value.replace(/^\s+/gm, '');  // odstraní mezery na začátku řádek
	RESText.value = RESText.value.replace(/ {2,}/g, ' ');  // více mezer = jedna mezera
	RESText.value = RESText.value.replace(/^[.,\s]+/gm, '');  // odstraní tečku a čárku pokud jsou první na řádce
	RESText.value = RESText.value.replace(/ \./g, '.'); // mezera tečka = bez mezery tečka
	RESText.value = RESText.value.replace(/\.{2,}/g, '.'); // více teček = jedna tečka
	RESText.value = RESText.value.replace(/ :/g, ':');  // odstraní mezeru před dvojtečkou
	


}

updateTexts();

