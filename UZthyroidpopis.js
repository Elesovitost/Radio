//let codeForUZThyroidLesion1 = `
// highlight
document.addEventListener("DOMContentLoaded", function() {
    var cellsLesion1 = document.querySelectorAll("#UZThyroidLesion1long td");

    cellsLesion1.forEach(function(cell) {
        cell.addEventListener("mousedown", function(event) {
            if (event.button === 2) { // Right-click
                event.preventDefault();
            }

            var columnCellsLesion1 = getColumnCellsLesion1(cell);

            if (event.button === 0) { // Left-click
                columnCellsLesion1.forEach(function(c) { c.style.border = ""; });
                cell.style.border = "1px solid red";
            } else if (event.button === 2) { // Right-click
                cell.style.border = ""; // Remove border on right-click
            }
            
            updateButtonsBasedOnTableLesion1(); // Update button texts based on table cell selections
			updateTexts(); 
        });

        cell.addEventListener("contextmenu", function(event) {
            event.preventDefault(); // Prevent the context menu
        });
    });

    function getColumnCellsLesion1(clickedCell) {
        var column = clickedCell.cellIndex; // Get the index of the cell's column
        var table = clickedCell.closest("table");
        return [...table.querySelectorAll('tr td:nth-child(' + (column + 1) + ')')];

    }
});

function updateButtonsBasedOnTableLesion1() {
    var table = document.getElementById("UZThyroidLesion1long");
    var rows = table.querySelectorAll("tr");

    // Reset all buttons to their default text initially
    resetButtonsToDefaultLesion1();

    rows.forEach(row => {
        var cellsLesion1 = row.querySelectorAll("td");
        cellsLesion1.forEach((cell, index) => {
            if (cell.style.border === "1px solid red") {
                updateButtonBasedOnCell(cell, index);
            }
        });
    });
}

function resetButtonsToDefaultLesion1() {
    // Reset each button to its original text and ensure the default background is applied
    var compButton = document.getElementById("UZThyroidLesion1Comp");
    compButton.innerText = originalButtonTexts["UZThyroidLesion1Comp"];
    applyBackgroundStyleLesion1(compButton, compButton.innerText);
    
    var echoButton = document.getElementById("UZThyroidLesion1Echo");
    echoButton.innerText = originalButtonTexts["UZThyroidLesion1Echo"];
    applyBackgroundStyleLesion1(echoButton, echoButton.innerText);
    
    var shapeButton = document.getElementById("UZThyroidLesion1Shape");
    shapeButton.innerText = originalButtonTexts["UZThyroidLesion1Shape"];
    applyBackgroundStyleLesion1(shapeButton, shapeButton.innerText);
    
    var marginButton = document.getElementById("UZThyroidLesion1Margin");
    marginButton.innerText = originalButtonTexts["UZThyroidLesion1Margin"];
    applyBackgroundStyleLesion1(marginButton, marginButton.innerText);
    
    var fociButton = document.getElementById("UZThyroidLesion1Foci");
    fociButton.innerText = originalButtonTexts["UZThyroidLesion1Foci"];
    applyBackgroundStyleLesion1(fociButton, fociButton.innerText);
}


function applyBackgroundStyleLesion1(button, newText) {
    const isDifferentFromOriginal = newText !== originalButtonTexts[button.id];
    button.classList.toggle('red-background', isDifferentFromOriginal);
}


function updateButtonBasedOnCell(cell, columnIndex) {
    var imgSrc = cell.querySelector('img') ? cell.querySelector('img').src : "";
    var buttonText = "";
    var buttonId = "";
    switch(columnIndex) {
        case 0: buttonText = getCompTextFromImgSrc(imgSrc); buttonId = "UZThyroidLesion1Comp"; break;
        case 1: buttonText = getEchoTextFromImgSrc(imgSrc); buttonId = "UZThyroidLesion1Echo"; break;
        case 2: buttonText = getShapeTextFromImgSrc(imgSrc); buttonId = "UZThyroidLesion1Shape"; break;
        case 3: buttonText = getMarginTextFromImgSrc(imgSrc); buttonId = "UZThyroidLesion1Margin"; break;
        case 4: buttonText = getFociTextFromImgSrc(imgSrc); buttonId = "UZThyroidLesion1Foci"; break;
    }

    var button = document.getElementById(buttonId);
    if (button) {
        button.innerText = buttonText;
        // Apply the red-background styling if the newText is different from the original
        applyBackgroundStyleLesion1(button, buttonText);
    }
}

function getCompTextFromImgSrc(imgSrc) {
    if (imgSrc.includes("UZThyrCompCystic.png")) return "cystická";
    if (imgSrc.includes("UZThyrCompSpongi.png")) return "spongiformní";
    if (imgSrc.includes("UZThyrCompMixed.png")) return "cysticko-solidní";
    if (imgSrc.includes("UZThyrCompSolid.png")) return "solidní";
    return "kompozice?"; // Default text if none match
}

function getEchoTextFromImgSrc(imgSrc) {
    if (imgSrc.includes("UZThyrEchoAnecho.png")) return "anecho";
    if (imgSrc.includes("UZThyrEchoHyper.png")) return "hyper (izo)";
    if (imgSrc.includes("UZThyrEchoHypo.png")) return "hypo";
    if (imgSrc.includes("UZThyrEchoVeryhypo.png")) return "velmi hypo";
    return "echogenita?"; // Default text if none match
}

function getShapeTextFromImgSrc(imgSrc) {
    if (imgSrc.includes("UZThyrShapeWide.png")) return "široký";
    if (imgSrc.includes("UZThyrShapeTall.png")) return "vysoký";
    return "tvar?"; // Default text if none match
}

function getMarginTextFromImgSrc(imgSrc) {
    if (imgSrc.includes("UZThyrMargSmooth.png")) return "jemný";
    if (imgSrc.includes("UZThyrMargIll.png")) return "smazaný";
    if (imgSrc.includes("UZThyrMargIrr.png")) return "nepravidelný";
    if (imgSrc.includes("UZThyrMargExtra.png")) return "mimo žlázu";
    return "okraj?"; // Default text if none match
}

function getFociTextFromImgSrc(imgSrc) {
    if (imgSrc.includes("UZThyrCalcNone.png")) return "bez kalcifikací";
    if (imgSrc.includes("UZThyrCalcMacro.png")) return "makrokalcifikace";
    if (imgSrc.includes("UZThyrCalcRim.png")) return "kalcif. stěna";
    if (imgSrc.includes("UZThyrCalcMicro.png")) return "mikrokalcifikace";
    return "kalcifikace?"; // Default text if none match
}

//`; let codeForUZThyroidLesion2 = codeForUZThyroidLesion1.replace(/Lesion1/g, 'Lesion2'); eval(codeForUZThyroidLesion1); eval(codeForUZThyroidLesion2);



// new LESIONS

document.getElementById('UZThyroidNewLesions').addEventListener('click', function() {
  var lesionIds = ['UZThyroidLesion1'];
//var lesionIds = ['UZThyroidLesion1', 'UZThyroidLesion2'];
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
  var lesionIds = ['UZThyroidLesion1'];
//var lesionIds = ['UZThyroidLesion2', 'UZThyroidLesion1'];
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
    var UZThyroidlesions = ['UZThyroidLesion1', 'UZThyroidLesion2'];
//  var UZThyroidlesions = ['UZThyroidLesion1'];
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


//tooltip

    var ChbLesionExt = document.getElementById("ChbLesionExt");
	if (ChbLesionExt) {         ChbLesionExt.addEventListener('change', updateTexts);    }
    var UZThyroidLesion1short = document.getElementById("UZThyroidLesion1short");
    var UZThyroidLesion1long = document.getElementById("UZThyroidLesion1long");

    if (ChbLesionExt.checked) {
        UZThyroidLesion1short.classList.add("hidden");
        UZThyroidLesion1long.classList.remove("hidden");
    } else {
        UZThyroidLesion1short.classList.remove("hidden");
        UZThyroidLesion1long.classList.add("hidden");
    }


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
//let codeForUZThyroidLesion1 = `

ButtonCycleInnerTexts["UZThyroidLesion1Side"] = ["strana?", "vpravo", "vlevo"];
var UZThyroidLesion1Side = document.getElementById("UZThyroidLesion1Side").innerText;

ButtonCycleInnerTexts["UZThyroidLesion1Comp"] = ["kompozice?", "cystická", "spongiformní", "cysticko-solidní", "solidní"];
var UZThyroidLesion1Comp = document.getElementById("UZThyroidLesion1Comp").innerText;

ButtonCycleInnerTexts["UZThyroidLesion1Echo"] = ["echogenita?", "anecho", "hyper (izo)", "hypo", "velmi hypo"];
var UZThyroidLesion1Echo = document.getElementById("UZThyroidLesion1Echo").innerText;

ButtonCycleInnerTexts["UZThyroidLesion1Shape"] = ["tvar?", "široký", "vysoký"];
var UZThyroidLesion1Shape = document.getElementById("UZThyroidLesion1Shape").innerText;

ButtonCycleInnerTexts["UZThyroidLesion1Margin"] = ["okraj?", "jemný", "smazaný", "nepravidelný", "mimo žlázu"];
var UZThyroidLesion1Margin = document.getElementById("UZThyroidLesion1Margin").innerText;

ButtonCycleInnerTexts["UZThyroidLesion1Foci"] = ["kalcifikace?", "bez kalcifikací", "makrokalcifikace", "kalcif. stěna", "mikrokalcifikace"];
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
	
//`; let codeForUZThyroidLesion2 = codeForUZThyroidLesion1.replace(/Lesion1/g, 'Lesion2'); eval(codeForUZThyroidLesion1); eval(codeForUZThyroidLesion2);



// POPIS

UZThyroidNAMEText.value = "UZ štítné žlázy";

UZThyroidINDText.value = indikace; document.getElementById("indikace").addEventListener("input", updateTexts);

UZThyroidPOPText.value = 
POPUZThyroidVolume + "\n" +
POPUZThyroidParenchyma + "\n" +
POPUZThyroidLesion1
;

UZThyroidRESText.value = 
RESUZThyroidVolume + RESUZThyroidParenchyma + "\n" +
RESUZThyroidLesion1Final
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

