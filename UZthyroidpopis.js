

// new LESIONS

document.getElementById('UZThyroidNewLesions').addEventListener('click', function() {
  var lesionIds = ['UZThyroidLesion1', 'UZThyroidLesion2', 'UZThyroidLesion3'];

  for (var i = 0; i < lesionIds.length; i++) {
    var element = document.getElementById(lesionIds[i]);
    if (element.classList.contains('hidden')) {
      element.classList.remove('hidden');
      break; 
    }
  }
  updateUZThyroidButtonColor();
});

document.getElementById('UZThyroidNewLesions').addEventListener('contextmenu', function(event) {
  event.preventDefault();
  var lesionIds = ['UZThyroidLesion3', 'UZThyroidLesion2', 'UZThyroidLesion1'];

  for (var i = 0; i < lesionIds.length; i++) {
    var element = document.getElementById(lesionIds[i]);
    if (!element.classList.contains('hidden')) {
      element.classList.add('hidden');
      break; 
    }
  }
  updateUZThyroidButtonColor();
});


function updateUZThyroidButtonColor() {
    var UZThyroidlesions = ['UZThyroidLesion1', 'UZThyroidLesion2', 'UZThyroidLesion3'];
    var UZThyroidbutton = document.getElementById('UZThyroidNewLesions');
    var isHidden = UZThyroidlesions.every(function(id) {
        return document.getElementById(id).classList.contains('hidden');
    });

    if (isHidden) {
        UZThyroidbutton.classList.remove('toggleColorRed');
    } else {
        UZThyroidbutton.classList.add('toggleColorRed');
    }
}


document.getElementById('UZThyroidLesion1no').addEventListener('click', function() {
  var element = document.getElementById('UZThyroidLesion1');
  element.classList.add('hidden'); 
  updateTexts();
  updateUZThyroidButtonColor();
});

document.getElementById('UZThyroidLesion2no').addEventListener('click', function() {
  var element = document.getElementById('UZThyroidLesion2');
  element.classList.add('hidden');
  updateTexts();
  updateUZThyroidButtonColor();
});

document.getElementById('UZThyroidLesion3no').addEventListener('click', function() {
  var element = document.getElementById('UZThyroidLesion3');
  element.classList.add('hidden');
  updateTexts();
  updateUZThyroidButtonColor();
});


//Lesion size words

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

//find largest
function findLargestNumber(inputString) {
    if (!inputString || typeof inputString !== 'string') {
        return null;
    }

    const numbers = inputString.match(/\d+(\.\d+)?/g);
    return numbers ? Math.max(...numbers.map(Number)) : null;
}




// UPDATETEXTS

function updateTexts() {
	
var indikace = document.getElementById("indikace").value;
document.getElementById("indikace").addEventListener("input", updateTexts);


//ThyroidVol

var UZThyroidRVol = document.getElementById('UZThyroidRVol').value;
var UZThyroidLVol = document.getElementById('UZThyroidLVol').value;

var POPUZThyroidVolSentences = [];
var RESUZThyroidVolSentences = [];

function parseVolume(vol) {
    return vol === "" ? null : parseFloat(vol);
}

UZThyroidRVol = parseVolume(UZThyroidRVol);
UZThyroidLVol = parseVolume(UZThyroidLVol);

if (UZThyroidRVol === null) {
    POPUZThyroidVolSentences.push("Pravý lalok normální velikosti");
    RESUZThyroidVolSentences.push("s nezvětšeným pravým lalokem");
} else if (UZThyroidRVol === 0) {
    POPUZThyroidVolSentences.push("Pravý lalok není patrný");
    RESUZThyroidVolSentences.push("po resekci pravého laloku");
} else {
    POPUZThyroidVolSentences.push(`Pravý lalok objemu ${UZThyroidRVol} ml`);
    if (UZThyroidRVol < 5) {
        RESUZThyroidVolSentences.push("s nezvětšeným pravým lalokem");
    } else if (UZThyroidRVol >= 5 && UZThyroidRVol < 8) {
        RESUZThyroidVolSentences.push("s mírně zvětšeným pravým lalokem");
    } else if (UZThyroidRVol >= 8) {
        RESUZThyroidVolSentences.push("se zvětšeným pravým lalokem");
    }
}

if (UZThyroidLVol === null) {
    POPUZThyroidVolSentences.push("Levý lalok normální velikosti");
    RESUZThyroidVolSentences.push("s nezvětšeným levým lalokem");
} else if (UZThyroidLVol === 0) {
    POPUZThyroidVolSentences.push("Levý lalok není patrný");
    RESUZThyroidVolSentences.push("po resekci levého laloku");
} else {
    POPUZThyroidVolSentences.push(`Levý lalok objemu ${UZThyroidLVol} ml`);
    if (UZThyroidLVol < 5) {
        RESUZThyroidVolSentences.push("s nezvětšeným levým lalokem");
    } else if (UZThyroidLVol >= 5 && UZThyroidLVol < 8) {
        RESUZThyroidVolSentences.push("s mírně zvětšeným levým lalokem");
    } else if (UZThyroidLVol >= 8) {
        RESUZThyroidVolSentences.push("se zvětšeným levým lalokem");
    }
}

// Additional overall conditions (Preferred conditions)
if (UZThyroidRVol === null && UZThyroidLVol === null) {
    RESUZThyroidVolSentences = ["nezvětšena"];
} else if (UZThyroidRVol < 5 && UZThyroidLVol < 5) {
    RESUZThyroidVolSentences = ["nezvětšena"];
} else if (UZThyroidRVol >= 5 && UZThyroidRVol < 8 && UZThyroidLVol >= 5 && UZThyroidLVol < 8) {
    RESUZThyroidVolSentences = ["mírně zvětšena"];
} else if ((UZThyroidRVol >= 5 && UZThyroidLVol >= 8) || (UZThyroidRVol >= 8 && UZThyroidLVol >= 5)) {
    RESUZThyroidVolSentences = ["zvětšena"];
} else {
}

POPUZThyroidVolume = POPUZThyroidVolSentences.join(". ") + ".";

if (RESUZThyroidVolSentences.length > 1) {
    RESUZThyroidVolume = "Štítná žláza " + RESUZThyroidVolSentences.slice(0, -1).join(", ") + ", " + RESUZThyroidVolSentences.slice(-1) + ", ";
} else {
    RESUZThyroidVolume = "Štítná žláza " + (RESUZThyroidVolSentences.length ? RESUZThyroidVolSentences[0] + ", " : "");
}




// Thyroid Parenchyma nad nodules

ButtonCycleInnerTexts["UZThyroidParenchyma"] = ["normální", "hypoechogenní", "nehomogenní"];
var UZThyroidParenchyma = document.getElementById("UZThyroidParenchyma").innerText;

ButtonCycleInnerTexts["UZThyroidNodules"] = ["0", "+", "++", "+++"];
var UZThyroidNodules = document.getElementById("UZThyroidNodules").innerText;

var POPUZThyroidParenchymaSentences = [];
var RESUZThyroidParenchymaSentences = [];

if (UZThyroidParenchyma === "normální") {
    POPUZThyroidParenchymaSentences.push("přiměřené echogenity a echotextury");
	RESUZThyroidParenchymaSentences.push("s přiměřeným vzhledem parenchymu");
} else if (UZThyroidParenchyma === "hypoechogenní") {
    POPUZThyroidParenchymaSentences.push("hypoechogenní");
	RESUZThyroidParenchymaSentences.push("s nehomogenním parenchymem");
} else if (UZThyroidParenchyma === "nehomogenní") {
    POPUZThyroidParenchymaSentences.push("hrubé echotextury");
	RESUZThyroidParenchymaSentences.push("s nehomogenním parenchymem");
} 

if (UZThyroidNodules === "0") {
    POPUZThyroidParenchymaSentences.push("bez patrných ložisek / uzlů");
	RESUZThyroidParenchymaSentences.push("bez ložisek");
} else if (UZThyroidNodules === "+") {
    POPUZThyroidParenchymaSentences.push("přítomny sporadické drobné uzly");
	RESUZThyroidParenchymaSentences.push("se sporadickými drobnými uzly");
} else if (UZThyroidNodules === "++") {
    POPUZThyroidParenchymaSentences.push("přítomny vícečetné uzly");
	RESUZThyroidParenchymaSentences.push("s vícečetnými uzly");
} else if (UZThyroidNodules === "+++") {
    POPUZThyroidParenchymaSentences.push("uzlovitá přestavba");
	RESUZThyroidParenchymaSentences.push("s mnohočetnými uzly");
} 

POPUZThyroidParenchyma = "Parenchym " + POPUZThyroidParenchymaSentences.join(", ") + ".";

if (RESUZThyroidParenchymaSentences.length > 1) {
  RESUZThyroidParenchyma = RESUZThyroidParenchymaSentences.slice(0, -1).join(", ") + ", " + RESUZThyroidParenchymaSentences.slice(-1) + ".";
} else {
  RESUZThyroidParenchyma = RESUZThyroidParenchymaSentences.length ? RESUZThyroidParenchymaSentences[0] + "." : "";
}

// Lesion1
let codeForUZThyroidLesion1 = `

ButtonCycleInnerTexts["UZThyroidLesion1Side"] = ["strana", "vpravo", "vlevo"];
var UZThyroidLesion1Side = document.getElementById("UZThyroidLesion1Side").innerText;

ButtonCycleInnerTexts["UZThyroidLesion1Comp"] = ["kompozice", "cystická", "spongiformní", "cysticko-solidní", "solidní"];
var UZThyroidLesion1Comp = document.getElementById("UZThyroidLesion1Comp").innerText;

ButtonCycleInnerTexts["UZThyroidLesion1Echo"] = ["echogenita", "anecho", "hyper (izo)", "hypo", "velmi hypo"];
var UZThyroidLesion1Echo = document.getElementById("UZThyroidLesion1Echo").innerText;

ButtonCycleInnerTexts["UZThyroidLesion1Shape"] = ["tvar", "široký", "vysoký"];
var UZThyroidLesion1Shape = document.getElementById("UZThyroidLesion1Shape").innerText;

ButtonCycleInnerTexts["UZThyroidLesion1Margin"] = ["okraj", "jemný", "smazaný", "nepravidelný", "mimo žlázu"];
var UZThyroidLesion1Margin = document.getElementById("UZThyroidLesion1Margin").innerText;

ButtonCycleInnerTexts["UZThyroidLesion1Foci"] = ["kalcifikace", "bez kalcifikací", "makrokalcifikace", "kalcif. stěna", "mikrokalcifikace"];
var UZThyroidLesion1Foci = document.getElementById("UZThyroidLesion1Foci").innerText;


var UZThyroidLesion1formattedSize = formatLesionSize("UZThyroidLesion1Size");
var UZThyroidLesion1Size = document.getElementById('UZThyroidLesion1Size').value;
var UZThyroidLesion1LargestDiameter = findLargestNumber(UZThyroidLesion1Size);


var POPUZThyroidLesion1Sentences = []; var RESUZThyroidLesion1score = 0;
RESUZThyroidLesion1 = "";

if (UZThyroidLesion1Side === "vpravo") {
    POPUZThyroidLesion1Sentences.push("Vpravo uzel " + UZThyroidLesion1formattedSize);
	RESUZThyroidLesion1 = "Uzel v pravém laloku ";
} else if (UZThyroidLesion1Side === "vlevo") {
    POPUZThyroidLesion1Sentences.push("Vlevo uzel " + UZThyroidLesion1formattedSize);
	RESUZThyroidLesion1 = "Uzel v levém laloku ";
} 

if (UZThyroidLesion1Comp === "cystická") {
    POPUZThyroidLesion1Sentences.push("kompozice cystické");
} else if (UZThyroidLesion1Comp === "spongiformní") {
    POPUZThyroidLesion1Sentences.push("kompozice spongiformní");
} else if (UZThyroidLesion1Comp === "cysticko-solidní") {
    POPUZThyroidLesion1Sentences.push("kompozice cysticko-solidní");
	RESUZThyroidLesion1score += 2;
}  else if (UZThyroidLesion1Comp === "solidní") {
    POPUZThyroidLesion1Sentences.push("kompozice solidní");
	RESUZThyroidLesion1score += 3;
}

if (UZThyroidLesion1Echo === "anecho") {
    POPUZThyroidLesion1Sentences.push("anechogenní");
} else if (UZThyroidLesion1Echo === "hyper (izo)") {
    POPUZThyroidLesion1Sentences.push("hyperechogenní nebo izoechogenní");
	RESUZThyroidLesion1score += 1;
} else if (UZThyroidLesion1Echo === "hypo") {
    POPUZThyroidLesion1Sentences.push("hypoechogenní");
	RESUZThyroidLesion1score += 2;
}  else if (UZThyroidLesion1Echo === "velmi hypo") {
    POPUZThyroidLesion1Sentences.push("velmi hypoechogenní");
	RESUZThyroidLesion1score += 3;
} 

if (UZThyroidLesion1Shape === "široký") {
    POPUZThyroidLesion1Sentences.push("tvarem širší horizontálně");
} else if (UZThyroidLesion1Shape === "vysoký") {
    POPUZThyroidLesion1Sentences.push("tvarem širší vertikálně");
	RESUZThyroidLesion1score += 3;
} 

if (UZThyroidLesion1Margin === "jemný") {
    POPUZThyroidLesion1Sentences.push("jemného tenkého okraje");
} else if (UZThyroidLesion1Margin === "smazaný") {
    POPUZThyroidLesion1Sentences.push("okraje částečně smazaného");
} else if (UZThyroidLesion1Margin === "nepravidelný") {
    POPUZThyroidLesion1Sentences.push("okraje neprovidelného nebo lobulárního");
	RESUZThyroidLesion1score += 2;
}  else if (UZThyroidLesion1Margin === "mimo žlázu") {
    POPUZThyroidLesion1Sentences.push("zasahující extra-thyroidálně");
	RESUZThyroidLesion1score += 3;
} 

if (UZThyroidLesion1Foci === "bez kalcifikací") {
    POPUZThyroidLesion1Sentences.push("bez echogenit / kalcifikací");
} else if (UZThyroidLesion1Foci === "makrokalcifikace") {
    POPUZThyroidLesion1Sentences.push("s makrokalcifikacemi");
	RESUZThyroidLesion1score += 1;
} else if (UZThyroidLesion1Foci === "kalcif. stěna") {
    POPUZThyroidLesion1Sentences.push("s patrnými kalcifkacemi periferie (stěny)");
	RESUZThyroidLesion1score += 2;
}  else if (UZThyroidLesion1Foci === "mikrokalcifikace") {
    POPUZThyroidLesion1Sentences.push("s bodovými drobnými echogenními foci (mikrokalcifikacemi)");
	RESUZThyroidLesion1score += 3;
} 

POPUZThyroidLesion1 = POPUZThyroidLesion1Sentences.join(", ") + ".";

//TR

RESUZThyroidLesion1TR = "";

if (POPUZThyroidLesion1Sentences.length > 0 && (RESUZThyroidLesion1score === 0 || RESUZThyroidLesion1score === 1)) {
    RESUZThyroidLesion1 += "benigního vzhledu";
	RESUZThyroidLesion1TR = "1";
} else if (RESUZThyroidLesion1score === 2) {
    RESUZThyroidLesion1 += "je nesuspektní";
	RESUZThyroidLesion1TR = "2";
} else if (RESUZThyroidLesion1score === 3) {
    RESUZThyroidLesion1 += "je mírně suspektní";
	RESUZThyroidLesion1TR = "3";
    // Check for diameter size
    if (UZThyroidLesion1LargestDiameter < 25) {
        RESUZThyroidLesion1 += ", k follow-up";
    } else {
        RESUZThyroidLesion1 += ", vzhledem k velikosti vhodný k bioptickému ověření";
    }
} else if (RESUZThyroidLesion1score >= 4 && RESUZThyroidLesion1score <= 6) { // Simplified condition for scores 4-6
    RESUZThyroidLesion1 += "je středně suspektní";
    RESUZThyroidLesion1TR = "4";
    if (UZThyroidLesion1LargestDiameter < 15) {
        RESUZThyroidLesion1 += ", k follow-up";
    } else {
        RESUZThyroidLesion1 += ", vzhledem k velikosti vhodný k bioptickému ověření";
    }
} else if (RESUZThyroidLesion1score >= 7) {
    RESUZThyroidLesion1 += "je vysoce suspektní";
    RESUZThyroidLesion1TR = "5";
    if (UZThyroidLesion1LargestDiameter < 10) {
        RESUZThyroidLesion1 += ", k follow-up";
    } else {
        RESUZThyroidLesion1 += ", vzhledem k velikosti vhodný k bioptickému ověření";
    }
}

if (POPUZThyroidLesion1Sentences.length > 0) {
RESUZThyroidLesion1Final = RESUZThyroidLesion1 + ". (TI-RADS score: TR" + RESUZThyroidLesion1TR + ").";
} else
RESUZThyroidLesion1Final = "";
	
`;

let codeForUZThyroidLesion2 = codeForUZThyroidLesion1.replace(/Lesion1/g, 'Lesion2');
let codeForUZThyroidLesion3 = codeForUZThyroidLesion1.replace(/Lesion1/g, 'Lesion3');
eval(codeForUZThyroidLesion1);
eval(codeForUZThyroidLesion2);
eval(codeForUZThyroidLesion3);



// POPIS

UZThyroidNAMEText.value = "UZ štítné žlázy";

UZThyroidINDText.value = indikace; document.getElementById("indikace").addEventListener("input", updateTexts);

UZThyroidPOPText.value = 
POPUZThyroidVolume + "\n" +
POPUZThyroidParenchyma + "\n" +
POPUZThyroidLesion1 + "\n" +
POPUZThyroidLesion2 + "\n" +
POPUZThyroidLesion3 
;

UZThyroidRESText.value = 
RESUZThyroidVolume + RESUZThyroidParenchyma + "\n" +
RESUZThyroidLesion1Final + "\n" +
RESUZThyroidLesion2Final + "\n" +
RESUZThyroidLesion3Final 
;


UZThyroidPOPText.value = UZThyroidPOPText.value.replace(/^\s*[\r\n]/gm, '');  // odstraní prázdné řádky
UZThyroidPOPText.value = UZThyroidPOPText.value.replace(/^\./gm, ''); // odstraní tečku na začátku řádek

UZThyroidRESText.value = UZThyroidRESText.value.replace(/^\s*[\r\n]/gm, '');  // odstraní prázdné řádky
UZThyroidRESText.value = UZThyroidRESText.value.replace(/^\./gm, ''); // odstraní tečku na začátku řádek
//UZThyroidRESText.value = UZThyroidRESText.value.replace(/^\s+/gm, '');  // odstraní mezery na začátku řádek
//UZThyroidRESText.value = UZThyroidRESText.value.replace(/^\s*[\r\n]/gm, '');  // odstraní prázdné řádky
//UZThyroidRESText.value = UZThyroidRESText.value.split(/\r?\n/).filter(item => item.trim() !== '').join('\n');  // prázdné řádky
//UZThyroidRESText.value = UZThyroidRESText.value.replace(/ ,/g, ',');  // smazat mezeru před čárkou
//UZThyroidRESText.value = UZThyroidRESText.value.replace(/ \./g, '.'); // smazat mezeru před tečkou
//UZThyroidRESText.value = UZThyroidRESText.value.replace(/\.{2,}/g, '.'); // více teček = jedna tečka
//UZThyroidRESText.value = UZThyroidRESText.value.replace(/\,{2,}/g, ','); // více čárek = jedna čárka
//UZThyroidRESText.value = UZThyroidRESText.value.replace(/,\./g, '.'); // odstraní čárku před tečkou
//UZThyroidRESText.value = UZThyroidRESText.value.replace(/  +/g, ' '); // dvojmezery



}
updateTexts();

