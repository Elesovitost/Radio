
function updateTexts() {

// LESION1

// Prostate segments

let prostateSegmentLesion1 = "";

const segmentsLesion1 = [];
const positionsLesion1 = []; 
const sidesLesion1 = [];

clickedOrderLesion1.forEach(id => {
    const text = document.querySelector('#' + id);

    const idPartsLesion1 = id.split('-'); 

    let segmentNameLesion1 = idPartsLesion1[0];
    if (!segmentsLesion1.includes(segmentNameLesion1)) {
        segmentsLesion1.push(segmentNameLesion1);
    }
    
    let sideLesion1 = idPartsLesion1[1] === "L" ? "vlevo" : "vpravo";
    if (!sidesLesion1.includes(sideLesion1)) {
        sidesLesion1.push(sideLesion1);
    }

    let positionLesion1 = ""; 
    switch (idPartsLesion1[2]) {
        case "B":
            positionLesion1 = "baze prostaty"; 
            break;
        case "M":
            positionLesion1 = "střední etáže prostaty"; 
            break;
        case "A":
            positionLesion1 = "apexu prostaty"; 
            break;
    }
    if (!positionsLesion1.includes(positionLesion1)) {
        positionsLesion1.push(positionLesion1);
    }
});

if (positionsLesion1.includes("baze prostaty") && positionsLesion1.includes("střední etáže prostaty")) {
    positionsLesion1[positionsLesion1.indexOf("baze prostaty")] = "baze";
}
if (positionsLesion1.includes("střední etáže prostaty") && positionsLesion1.includes("apexu prostaty")) {
    positionsLesion1[positionsLesion1.indexOf("střední etáže prostaty")] = "střední etáže";
}
if (positionsLesion1.length === 3) {
    positionsLesion1.length = 0;  // clear the array
    positionsLesion1.push("všech etáží prostaty");
}

let segmentStrLesion1 = segmentsLesion1.length > 1 
    ? " v segmentech " + segmentsLesion1.slice(0, -1).join(", ") + " a " + segmentsLesion1.slice(-1)
    : segmentsLesion1.length > 0 ? " v segmentu " + segmentsLesion1[0] : "";

let positionStrLesion1 = positionsLesion1.length > 1 
    ? " na rozhraní " + positionsLesion1.slice(0, -1).join(", ") + " a " + positionsLesion1.slice(-1)
    : positionsLesion1.length > 0 ? " v úrovni " + positionsLesion1[0] : "";

let sideStrLesion1 = sidesLesion1.length > 1
    ? "na rozhraní obou laloků"
    : sidesLesion1.length > 0 ? sidesLesion1[0] : "";

if (sideStrLesion1 || positionStrLesion1 || segmentStrLesion1) {
    prostateSegmentLesion1 = sideStrLesion1 + positionStrLesion1 + segmentStrLesion1;
} else {
    prostateSegmentLesion1 = "";
}

document.getElementById('ProstateLesion1Location').value = segmentsLesion1.join(', ');


// Number

let buttonIDLesion1 = document.getElementById('ProstateLesion1No').id;
let matchLesion1 = buttonIDLesion1.match(/(\d)[^\d]{2}$/);
if (matchLesion1) {
	var ProstateLesion1Number = "Ložisko č. " + matchLesion1[1] + ": ";  
}

// T2
const ProstateLesion1T2Text = buttonElementProstateLesion1T2.innerText;

if (ProstateLesion1T2Text === "T2 score 1") {
 ProstateLesion1T2P = "bez snížení SI na T2, "; 
 ProstateLesion1T2R = ""; 
} else if (ProstateLesion1T2Text === "T2 score 2") {
 ProstateLesion1T2P = "dobře ohraničený uzel homogenně nízké SI na T2, ";
 ProstateLesion1T2R = "";
} else if (ProstateLesion1T2Text === "T2 score 3") {
 ProstateLesion1T2P = "místy neohraničený okrsek nehomogenně nízké SI na T2, ";
 ProstateLesion1T2R = "";
} else if (ProstateLesion1T2Text === "T2 score 4") {
 ProstateLesion1T2P = "neohraničený okrsek nehomogenně nízké SI na T2, ";
 ProstateLesion1T2R = "";
} else if (ProstateLesion1T2Text === "T2 score 5") {
 ProstateLesion1T2P = "neohraničený okrsek nehomogenně nízké SI na T2, ";
 ProstateLesion1T2R = "";
}

// DWI
var ProstateLesion1DWIText = buttonElementProstateLesion1DWI.innerText;

if (ProstateLesion1DWIText === "DWI score 1") {
    ProstateLesion1DWIP = "bez vyšší SI na DWI a bez snížení SI na ADC, "; 
    ProstateLesion1DWIR = ""; 
} else if (ProstateLesion1DWIText === "DWI score 2") {
    ProstateLesion1DWIP = "mírně vyšší SI na DWI bez výraznějšího snížení SI na ADC, "; 
    ProstateLesion1DWIR = ""; 
} else if (ProstateLesion1DWIText === "DWI score 3") {
    ProstateLesion1DWIP = "nápadně vyšší SI na DWI nebo nápadně nižší SI na ADC, ";
    ProstateLesion1DWIR = "";
} else if (ProstateLesion1DWIText === "DWI score 4") {
    ProstateLesion1DWIP = "nápadně vyšší SI na DWI a současně nápadně nižší SI na ADC, ";
    ProstateLesion1DWIR = "";
} else if (ProstateLesion1DWIText === "DWI score 5") {
    ProstateLesion1DWIP = "nápadně vyšší SI na DWI a současně nápadně nižší SI na ADC, ";
    ProstateLesion1DWIR = "";
}

// C+
var ProstateLesion1CText = buttonElementProstateLesion1C.innerText;

if (ProstateLesion1CText === "kontrast -") {
    ProstateLesion1CP = ""; 
    ProstateLesion1CR = ""; 
} else if (ProstateLesion1CText === "kontrast +") {
    ProstateLesion1CP = "s časným postkontrastním sycením, "; 
    ProstateLesion1CR = ""; 
}

// PSMA
var ProstateLesion1PSMAText = buttonElementProstateLesion1PSMA.innerText;

if (document.getElementById('ChbProstatePSMA').checked) {
        if (ProstateLesion1PSMAText === "PSMA 0") {
            ProstateLesion1PSMAP = "s akumulací RF pod úrovní krevního poolu, "; 
            ProstateLesion1PSMAR = ", bez zvýšené PSMA exprese (score 0)"; 
        } else if (ProstateLesion1PSMAText === "PSMA 1") {
            ProstateLesion1PSMAP = "s akumulací RF nad úrovní krevního poolu, ale nižší než játra, "; 
            ProstateLesion1PSMAR = ", s mírně zvýšenou PSMA expresí (score 1)"; 
        } else if (ProstateLesion1PSMAText === "PSMA 2") {
            ProstateLesion1PSMAP = "s akumulací RF nad úrovní jater, ale nižší než parotid, ";
            ProstateLesion1PSMAR = ", se středně vysokou PSMA expresí (score 2)";
        } else if (ProstateLesion1PSMAText === "PSMA 3") {
            ProstateLesion1PSMAP = "s akumulací RF nad úrovní parotid, ";
            ProstateLesion1PSMAR = ", s vysokou PSMA expresí (score 3)";
        } 
    } else {
        ProstateLesion1PSMAP = "";
        ProstateLesion1PSMAR = "";
    }

// size
var ProstateLesion1SizeValue = document.getElementById("ProstateLesion1Size").value;
document.getElementById("ProstateLesion1Size").addEventListener('input', updateTexts);
var ProstateLesion1SizeP = "";

if (ProstateLesion1SizeValue === "") {
    ProstateLesion1SizeP = "";
} else if (ProstateLesion1SizeValue !== "") {
    ProstateLesion1SizeP = "diametru " + ProstateLesion1SizeValue + " mm,";
}

// invaze
var ProstateLesion1InvasionText = buttonElementProstateLesion1Invasion.innerText;

if (ProstateLesion1InvasionText === "bez invaze") {
    ProstateLesion1InvasionP = ""; 
    ProstateLesion1InvasionR = "";  
} else if (ProstateLesion1InvasionText === "přes kapsulu") {
    ProstateLesion1InvasionP = "s invazí přes kapsulu, "; 
    ProstateLesion1InvasionR = ", s invazí přes kapsulu"; 
} else if (ProstateLesion1InvasionText === "semen. váčků") {
    ProstateLesion1InvasionP = "s infiltrací semenných váčků, "; 
    ProstateLesion1InvasionR = ", s infiltrací semenných váčků"; 
} else if (ProstateLesion1InvasionText === "okolních struktur") {
    ProstateLesion1InvasionP = "s infiltrací okolních struktur, "; 
    ProstateLesion1InvasionR = ", s infiltrací okolních struktur"; 
}


// PIRADS auto
var ProstateLesion1SizeRaw = document.getElementById("ProstateLesion1Size").value;
var ProstateLesion1SizeValue = ProstateLesion1SizeRaw === "" ? "" : parseFloat(ProstateLesion1SizeRaw);

    var firstSegmentLesion1 = segmentsLesion1[0];

    // Check the segments
if (firstSegmentLesion1 && (firstSegmentLesion1.includes("TZa") || firstSegmentLesion1.includes("TZp"))) {
	if (ProstateLesion1T2Text === "T2 score 1") {
		buttonElementProstateLesion1PIRADS.innerText = "PI-RADS 1";
	} else if (ProstateLesion1T2Text === "T2 score 2") {
		if (["DWI score 1", "DWI score 2", "DWI score 3"].includes(ProstateLesion1DWIText)) {
			buttonElementProstateLesion1PIRADS.innerText = "PI-RADS 2";
		} else if (["DWI score 4", "DWI score 5"].includes(ProstateLesion1DWIText)) {
			buttonElementProstateLesion1PIRADS.innerText = "PI-RADS 3";
		}
	} else if (ProstateLesion1T2Text === "T2 score 3") {
		if (["DWI score 1", "DWI score 2", "DWI score 3", "DWI score 4"].includes(ProstateLesion1DWIText)) {
			buttonElementProstateLesion1PIRADS.innerText = "PI-RADS 3";
		} else if (ProstateLesion1DWIText === "DWI score 5") {
			buttonElementProstateLesion1PIRADS.innerText = "PI-RADS 4";
		}
	} else if ((ProstateLesion1T2Text === "T2 score 4" || ProstateLesion1T2Text === "T2 score 5") && (ProstateLesion1SizeValue === "" || ProstateLesion1SizeValue < 15)) {
		buttonElementProstateLesion1PIRADS.innerText = "PI-RADS 4";
	} else if ((ProstateLesion1T2Text === "T2 score 4" || ProstateLesion1T2Text === "T2 score 5") && ProstateLesion1SizeValue >= 15) {
		buttonElementProstateLesion1PIRADS.innerText = "PI-RADS 5";
	}
} else if (firstSegmentLesion1 && (firstSegmentLesion1.includes("PZa") || firstSegmentLesion1.includes("PZpl") || firstSegmentLesion1.includes("PZpm"))) {
	switch (ProstateLesion1DWIText) {
		case "DWI score 1":
			buttonElementProstateLesion1PIRADS.innerText = "PI-RADS 1";
			break;
		case "DWI score 2":
			buttonElementProstateLesion1PIRADS.innerText = "PI-RADS 2";
			break;
		case "DWI score 3":
			if (ProstateLesion1CText === "kontrast -") {
				buttonElementProstateLesion1PIRADS.innerText = "PI-RADS 3";
			} else if (ProstateLesion1CText === "kontrast +") {
				buttonElementProstateLesion1PIRADS.innerText = "PI-RADS 4";
			}
			break;
		case "DWI score 4":
		  if (ProstateLesion1SizeValue < 15) {
			buttonElementProstateLesion1PIRADS.innerText = "PI-RADS 4";
		  } else if (ProstateLesion1SizeValue >= 15) {
			buttonElementProstateLesion1PIRADS.innerText = "PI-RADS 5";
		  } 
		  break;
	}
} else if (firstSegmentLesion1 && (firstSegmentLesion1.includes("CZ") || firstSegmentLesion1.includes("AFS"))) {
    const highestScore = Math.max(
        parseInt(ProstateLesion1DWIText.replace('DWI score ', '')),
        parseInt(ProstateLesion1T2Text.replace('T2 score ', ''))
    );

    switch (highestScore) {
        case 1:
            buttonElementProstateLesion1PIRADS.innerText = "PI-RADS 1";
            break;
        case 2:
            buttonElementProstateLesion1PIRADS.innerText = "PI-RADS 2";
            break;
        case 3:
            buttonElementProstateLesion1PIRADS.innerText = "PI-RADS 3";
            break;
        case 4:
            buttonElementProstateLesion1PIRADS.innerText = "PI-RADS 4";
            break;
        case 5:
            buttonElementProstateLesion1PIRADS.innerText = "PI-RADS 5";
            break;
        default:
            console.error('Unexpected score for lesion in CZ or AFS');
            break;
    }
}


//PIRADS manual
var ProstateLesion1PIRADSText = buttonElementProstateLesion1PIRADS.innerText;

if (prostateSegmentLesion1 === "") {
    ProstateLesion1PIRADSText = "";
} else {
    ProstateLesion1PIRADSText += "";
}

// Lesion Finals
const prostateTableLesion1 = document.querySelector('#ProstateLesion1');
var ProstateLesion1P = ""; var ProstateLesion1R = "";
if (!prostateTableLesion1.classList.contains('hidden') && prostateSegmentLesion1 !== "") {
    const isPeripheral = segmentsLesion1.length > 0 && segmentsLesion1[0].charAt(0) === 'P';
    ProstateLesion1P = ProstateLesion1Number + " " + prostateSegmentLesion1 + " " + ProstateLesion1SizeP + " " + (isPeripheral ? "" : ProstateLesion1T2P) + " " + ProstateLesion1DWIP + " " + ProstateLesion1CP + " " + ProstateLesion1InvasionP + " " + ProstateLesion1PSMAP + ".";
    ProstateLesion1R = ProstateLesion1Number + ProstateLesion1PIRADSText + " - " + prostateSegmentLesion1 + " " + ProstateLesion1InvasionR + " " + ProstateLesion1PSMAR + ".";
}

//LESION2

// Prostate segments

let prostateSegmentLesion2 = "";

const segmentsLesion2 = [];
const positionsLesion2 = []; 
const sidesLesion2 = [];

clickedOrderLesion2.forEach(id => {
    const text = document.querySelector('#' + id);

    const idPartsLesion2 = id.split('-'); 

    let segmentNameLesion2 = idPartsLesion2[0];
    if (!segmentsLesion2.includes(segmentNameLesion2)) {
        segmentsLesion2.push(segmentNameLesion2);
    }
    
    let sideLesion2 = idPartsLesion2[1] === "L" ? "vlevo" : "vpravo";
    if (!sidesLesion2.includes(sideLesion2)) {
        sidesLesion2.push(sideLesion2);
    }

    let positionLesion2 = ""; 
    switch (idPartsLesion2[2]) {
        case "B":
            positionLesion2 = "baze prostaty"; 
            break;
        case "M":
            positionLesion2 = "střední etáže prostaty"; 
            break;
        case "A":
            positionLesion2 = "apexu prostaty"; 
            break;
    }
    if (!positionsLesion2.includes(positionLesion2)) {
        positionsLesion2.push(positionLesion2);
    }
});

if (positionsLesion2.includes("baze prostaty") && positionsLesion2.includes("střední etáže prostaty")) {
    positionsLesion2[positionsLesion2.indexOf("baze prostaty")] = "baze";
}
if (positionsLesion2.includes("střední etáže prostaty") && positionsLesion2.includes("apexu prostaty")) {
    positionsLesion2[positionsLesion2.indexOf("střední etáže prostaty")] = "střední etáže";
}
if (positionsLesion2.length === 3) {
    positionsLesion2.length = 0;  // clear the array
    positionsLesion2.push("všech etáží prostaty");
}

let segmentStrLesion2 = segmentsLesion2.length > 1 
    ? " v segmentech " + segmentsLesion2.slice(0, -1).join(", ") + " a " + segmentsLesion2.slice(-1)
    : segmentsLesion2.length > 0 ? " v segmentu " + segmentsLesion2[0] : "";

let positionStrLesion2 = positionsLesion2.length > 1 
    ? " na rozhraní " + positionsLesion2.slice(0, -1).join(", ") + " a " + positionsLesion2.slice(-1)
    : positionsLesion2.length > 0 ? " v úrovni " + positionsLesion2[0] : "";

let sideStrLesion2 = sidesLesion2.length > 1
    ? "na rozhraní obou laloků"
    : sidesLesion2.length > 0 ? sidesLesion2[0] : "";

if (sideStrLesion2 || positionStrLesion2 || segmentStrLesion2) {
    prostateSegmentLesion2 = sideStrLesion2 + positionStrLesion2 + segmentStrLesion2;
} else {
    prostateSegmentLesion2 = "";
}

document.getElementById('ProstateLesion2Location').value = segmentsLesion2.join(', ');

// Number

let buttonIDLesion2 = document.getElementById('ProstateLesion2No').id;
let matchLesion2 = buttonIDLesion2.match(/(\d)[^\d]{2}$/);
if (matchLesion2) {
	var ProstateLesion2Number = "Ložisko č. " + matchLesion2[1] + ": ";  
}


// T2
const ProstateLesion2T2Text = buttonElementProstateLesion2T2.innerText;

if (ProstateLesion2T2Text === "T2 score 1") {
 ProstateLesion2T2P = "bez snížení SI na T2, "; 
 ProstateLesion2T2R = ""; 
} else if (ProstateLesion2T2Text === "T2 score 2") {
 ProstateLesion2T2P = "dobře ohraničený uzel homogenně nízké SI na T2, ";
 ProstateLesion2T2R = "";
} else if (ProstateLesion2T2Text === "T2 score 3") {
 ProstateLesion2T2P = "místy neohraničený okrsek nehomogenně nízké SI na T2, ";
 ProstateLesion2T2R = "";
} else if (ProstateLesion2T2Text === "T2 score 4") {
 ProstateLesion2T2P = "neohraničený okrsek nehomogenně nízké SI na T2, ";
 ProstateLesion2T2R = "";
} else if (ProstateLesion2T2Text === "T2 score 5") {
 ProstateLesion2T2P = "neohraničený okrsek nehomogenně nízké SI na T2, ";
 ProstateLesion2T2R = "";
}

// DWI
var ProstateLesion2DWIText = buttonElementProstateLesion2DWI.innerText;

if (ProstateLesion2DWIText === "DWI score 1") {
    ProstateLesion2DWIP = "bez vyšší SI na DWI a bez snížení SI na ADC, "; 
    ProstateLesion2DWIR = ""; 
} else if (ProstateLesion2DWIText === "DWI score 2") {
    ProstateLesion2DWIP = "mírně vyšší SI na DWI bez výraznějšího snížení SI na ADC, "; 
    ProstateLesion2DWIR = ""; 
} else if (ProstateLesion2DWIText === "DWI score 3") {
    ProstateLesion2DWIP = "nápadně vyšší SI na DWI nebo nápadně nižší SI na ADC, ";
    ProstateLesion2DWIR = "";
} else if (ProstateLesion2DWIText === "DWI score 4") {
    ProstateLesion2DWIP = "nápadně vyšší SI na DWI a současně nápadně nižší SI na ADC, ";
    ProstateLesion2DWIR = "";
} else if (ProstateLesion2DWIText === "DWI score 5") {
    ProstateLesion2DWIP = "nápadně vyšší SI na DWI a současně nápadně nižší SI na ADC, ";
    ProstateLesion2DWIR = "";
}

// C+
var ProstateLesion2CText = buttonElementProstateLesion2C.innerText;

if (ProstateLesion2CText === "kontrast -") {
    ProstateLesion2CP = ""; 
    ProstateLesion2CR = ""; 
} else if (ProstateLesion2CText === "kontrast +") {
    ProstateLesion2CP = "s časným postkontrastním sycením, "; 
    ProstateLesion2CR = ""; 
}

// size
var ProstateLesion2SizeValue = document.getElementById("ProstateLesion2Size").value;
document.getElementById("ProstateLesion2Size").addEventListener('input', updateTexts);
var ProstateLesion2SizeP = "";

if (ProstateLesion2SizeValue === "") {
    ProstateLesion2SizeP = "";
} else if (ProstateLesion2SizeValue !== "") {
    ProstateLesion2SizeP = "diametru " + ProstateLesion2SizeValue + " mm,";
}

// invaze
var ProstateLesion2InvasionText = buttonElementProstateLesion2Invasion.innerText;

if (ProstateLesion2InvasionText === "bez invaze") {
    ProstateLesion2InvasionP = ""; 
    ProstateLesion2InvasionR = ""; 
} else if (ProstateLesion2InvasionText === "invaze kapsuly") {
    ProstateLesion2InvasionP = "s invazí kapsuly, "; 
    ProstateLesion2InvasionR = ", s invazí kapsuly"; 
} else if (ProstateLesion2InvasionText === "přes kapsulu") {
    ProstateLesion2InvasionP = "s invazí přes kapsulu, "; 
    ProstateLesion2InvasionR = ", s invazí přes kapsulu"; 
} else if (ProstateLesion2InvasionText === "semen. váčků") {
    ProstateLesion2InvasionP = "s infiltrací semenných váčků, "; 
    ProstateLesion2InvasionR = ", s infiltrací semenných váčků"; 
} else if (ProstateLesion2InvasionText === "okolních struktur") {
    ProstateLesion2InvasionP = "s infiltrací okolních struktur, "; 
    ProstateLesion2InvasionR = ", s infiltrací okolních struktur"; 
}

// PSMA
var ProstateLesion2PSMAText = buttonElementProstateLesion2PSMA.innerText;

if (document.getElementById('ChbProstatePSMA').checked) {
        if (ProstateLesion2PSMAText === "PSMA 0") {
            ProstateLesion2PSMAP = "s akumulací RF pod úrovní krevního poolu, "; 
            ProstateLesion2PSMAR = ", bez zvýšené PSMA exprese (score 0)"; 
        } else if (ProstateLesion2PSMAText === "PSMA 1") {
            ProstateLesion2PSMAP = "s akumulací RF nad úrovní krevního poolu, ale nižší než játra, "; 
            ProstateLesion2PSMAR = ", s mírně zvýšenou PSMA expresí (score 1)"; 
        } else if (ProstateLesion2PSMAText === "PSMA 2") {
            ProstateLesion2PSMAP = "s akumulací RF nad úrovní jater, ale nižší než parotid, ";
            ProstateLesion2PSMAR = ", se středně vysokou PSMA expresí (score 2)";
        } else if (ProstateLesion2PSMAText === "PSMA 3") {
            ProstateLesion2PSMAP = "s akumulací RF nad úrovní parotid, ";
            ProstateLesion2PSMAR = ", s vysokou PSMA expresí (score 3)";
        } 
    } else {
        ProstateLesion2PSMAP = "";
        ProstateLesion2PSMAR = "";
    }

// PIRADS auto
var ProstateLesion2SizeRaw = document.getElementById("ProstateLesion2Size").value;
var ProstateLesion2SizeValue = ProstateLesion2SizeRaw === "" ? "" : parseFloat(ProstateLesion2SizeRaw);

    var firstSegmentLesion2 = segmentsLesion2[0];

    // Check the segments
if (firstSegmentLesion2 && (firstSegmentLesion2.includes("TZa") || firstSegmentLesion2.includes("TZp"))) {
	if (ProstateLesion2T2Text === "T2 score 1") {
		buttonElementProstateLesion2PIRADS.innerText = "PI-RADS 1";
	} else if (ProstateLesion2T2Text === "T2 score 2") {
		if (["DWI score 1", "DWI score 2", "DWI score 3"].includes(ProstateLesion2DWIText)) {
			buttonElementProstateLesion2PIRADS.innerText = "PI-RADS 2";
		} else if (["DWI score 4", "DWI score 5"].includes(ProstateLesion2DWIText)) {
			buttonElementProstateLesion2PIRADS.innerText = "PI-RADS 3";
		}
	} else if (ProstateLesion2T2Text === "T2 score 3") {
		if (["DWI score 1", "DWI score 2", "DWI score 3", "DWI score 4"].includes(ProstateLesion2DWIText)) {
			buttonElementProstateLesion2PIRADS.innerText = "PI-RADS 3";
		} else if (ProstateLesion2DWIText === "DWI score 5") {
			buttonElementProstateLesion2PIRADS.innerText = "PI-RADS 4";
		}
	} else if ((ProstateLesion2T2Text === "T2 score 4" || ProstateLesion2T2Text === "T2 score 5") && (ProstateLesion2SizeValue === "" || ProstateLesion2SizeValue < 15)) {
		buttonElementProstateLesion2PIRADS.innerText = "PI-RADS 4";
	} else if ((ProstateLesion2T2Text === "T2 score 4" || ProstateLesion2T2Text === "T2 score 5") && ProstateLesion2SizeValue >= 15) {
		buttonElementProstateLesion2PIRADS.innerText = "PI-RADS 5";
	}
} else if (firstSegmentLesion2 && (firstSegmentLesion2.includes("PZa") || firstSegmentLesion2.includes("PZpl") || firstSegmentLesion2.includes("PZpm"))) {
	switch (ProstateLesion2DWIText) {
		case "DWI score 1":
			buttonElementProstateLesion2PIRADS.innerText = "PI-RADS 1";
			break;
		case "DWI score 2":
			buttonElementProstateLesion2PIRADS.innerText = "PI-RADS 2";
			break;
		case "DWI score 3":
			if (ProstateLesion2CText === "kontrast -") {
				buttonElementProstateLesion2PIRADS.innerText = "PI-RADS 3";
			} else if (ProstateLesion2CText === "kontrast +") {
				buttonElementProstateLesion2PIRADS.innerText = "PI-RADS 4";
			}
			break;
		case "DWI score 4":
		  if (ProstateLesion2SizeValue < 15) {
			buttonElementProstateLesion2PIRADS.innerText = "PI-RADS 4";
		  } else if (ProstateLesion2SizeValue >= 15) {
			buttonElementProstateLesion2PIRADS.innerText = "PI-RADS 5";
		  } 
		  break;
	}
} else if (firstSegmentLesion2 && (firstSegmentLesion2.includes("CZ") || firstSegmentLesion2.includes("AFS"))) {
    const highestScore = Math.max(
        parseInt(ProstateLesion2DWIText.replace('DWI score ', '')),
        parseInt(ProstateLesion2T2Text.replace('T2 score ', ''))
    );

    switch (highestScore) {
        case 1:
            buttonElementProstateLesion2PIRADS.innerText = "PI-RADS 1";
            break;
        case 2:
            buttonElementProstateLesion2PIRADS.innerText = "PI-RADS 2";
            break;
        case 3:
            buttonElementProstateLesion2PIRADS.innerText = "PI-RADS 3";
            break;
        case 4:
            buttonElementProstateLesion2PIRADS.innerText = "PI-RADS 4";
            break;
        case 5:
            buttonElementProstateLesion2PIRADS.innerText = "PI-RADS 5";
            break;
        default:
            console.error('Unexpected score for lesion in CZ or AFS');
            break;
    }
}

//PIRADS manual
var ProstateLesion2PIRADSText = buttonElementProstateLesion2PIRADS.innerText;

if (prostateSegmentLesion2 === "") {
    ProstateLesion2PIRADSText = "";
} else {
    ProstateLesion2PIRADSText += "";
}

// Lesion2 Finals
const prostateTableLesion2 = document.querySelector('#ProstateLesion2');
var ProstateLesion2P = ""; var ProstateLesion2R = "";
if (!prostateTableLesion2.classList.contains('hidden') && prostateSegmentLesion2 !== "") {
    const isPeripheral = segmentsLesion2.length > 0 && segmentsLesion2[0].charAt(0) === 'P';
    ProstateLesion2P = ProstateLesion2Number + " " + prostateSegmentLesion2 + " " + ProstateLesion2SizeP + " " + (isPeripheral ? "" : ProstateLesion2T2P) + " " + ProstateLesion2DWIP + " " + ProstateLesion2CP + " " + ProstateLesion2InvasionP + " " + ProstateLesion2PSMAP + ".";
    ProstateLesion2R = ProstateLesion2Number + ProstateLesion2PIRADSText + " - " + prostateSegmentLesion2 + " " + ProstateLesion2InvasionR + " " + ProstateLesion2PSMAR + ".";
}


//LESION3

// Prostate segments

let prostateSegmentLesion3 = "";

const segmentsLesion3 = [];
const positionsLesion3 = []; 
const sidesLesion3 = [];

clickedOrderLesion3.forEach(id => {
    const text = document.querySelector('#' + id);

    const idPartsLesion3 = id.split('-'); 

    let segmentNameLesion3 = idPartsLesion3[0];
    if (!segmentsLesion3.includes(segmentNameLesion3)) {
        segmentsLesion3.push(segmentNameLesion3);
    }
    
    let sideLesion3 = idPartsLesion3[1] === "L" ? "vlevo" : "vpravo";
    if (!sidesLesion3.includes(sideLesion3)) {
        sidesLesion3.push(sideLesion3);
    }

    let positionLesion3 = ""; 
    switch (idPartsLesion3[2]) {
        case "B":
            positionLesion3 = "baze prostaty"; 
            break;
        case "M":
            positionLesion3 = "střední etáže prostaty"; 
            break;
        case "A":
            positionLesion3 = "apexu prostaty"; 
            break;
    }
    if (!positionsLesion3.includes(positionLesion3)) {
        positionsLesion3.push(positionLesion3);
    }
});

if (positionsLesion3.includes("baze prostaty") && positionsLesion3.includes("střední etáže prostaty")) {
    positionsLesion3[positionsLesion3.indexOf("baze prostaty")] = "baze";
}
if (positionsLesion3.includes("střední etáže prostaty") && positionsLesion3.includes("apexu prostaty")) {
    positionsLesion3[positionsLesion3.indexOf("střední etáže prostaty")] = "střední etáže";
}
if (positionsLesion3.length === 3) {
    positionsLesion3.length = 0;  // clear the array
    positionsLesion3.push("všech etáží prostaty");
}

let segmentStrLesion3 = segmentsLesion3.length > 1 
    ? " v segmentech " + segmentsLesion3.slice(0, -1).join(", ") + " a " + segmentsLesion3.slice(-1)
    : segmentsLesion3.length > 0 ? " v segmentu " + segmentsLesion3[0] : "";

let positionStrLesion3 = positionsLesion3.length > 1 
    ? " na rozhraní " + positionsLesion3.slice(0, -1).join(", ") + " a " + positionsLesion3.slice(-1)
    : positionsLesion3.length > 0 ? " v úrovni " + positionsLesion3[0] : "";

let sideStrLesion3 = sidesLesion3.length > 1
    ? "na rozhraní obou laloků"
    : sidesLesion3.length > 0 ? sidesLesion3[0] : "";

if (sideStrLesion3 || positionStrLesion3 || segmentStrLesion3) {
    prostateSegmentLesion3 = sideStrLesion3 + positionStrLesion3 + segmentStrLesion3;
} else {
    prostateSegmentLesion3 = "";
}

document.getElementById('ProstateLesion3Location').value = segmentsLesion3.join(', ');

// Number

let buttonIDLesion3 = document.getElementById('ProstateLesion3No').id;
let matchLesion3 = buttonIDLesion3.match(/(\d)[^\d]{2}$/);
if (matchLesion3) {
	var ProstateLesion3Number = "Ložisko č. " + matchLesion3[1] + ": ";  
}


// T2
const ProstateLesion3T2Text = buttonElementProstateLesion3T2.innerText;

if (ProstateLesion3T2Text === "T2 score 1") {
 ProstateLesion3T2P = "bez snížení SI na T2, "; 
 ProstateLesion3T2R = ""; 
} else if (ProstateLesion3T2Text === "T2 score 2") {
 ProstateLesion3T2P = "dobře ohraničený uzel homogenně nízké SI na T2, ";
 ProstateLesion3T2R = "";
} else if (ProstateLesion3T2Text === "T2 score 3") {
 ProstateLesion3T2P = "místy neohraničený okrsek nehomogenně nízké SI na T2, ";
 ProstateLesion3T2R = "";
} else if (ProstateLesion3T2Text === "T2 score 4") {
 ProstateLesion3T2P = "neohraničený okrsek nehomogenně nízké SI na T2, ";
 ProstateLesion3T2R = "";
} else if (ProstateLesion3T2Text === "T2 score 5") {
 ProstateLesion3T2P = "neohraničený okrsek nehomogenně nízké SI na T2, ";
 ProstateLesion3T2R = "";
}

// DWI
var ProstateLesion3DWIText = buttonElementProstateLesion3DWI.innerText;

if (ProstateLesion3DWIText === "DWI score 1") {
    ProstateLesion3DWIP = "bez vyšší SI na DWI a bez snížení SI na ADC, "; 
    ProstateLesion3DWIR = ""; 
} else if (ProstateLesion3DWIText === "DWI score 2") {
    ProstateLesion3DWIP = "mírně vyšší SI na DWI bez výraznějšího snížení SI na ADC, "; 
    ProstateLesion3DWIR = ""; 
} else if (ProstateLesion3DWIText === "DWI score 3") {
    ProstateLesion3DWIP = "nápadně vyšší SI na DWI nebo nápadně nižší SI na ADC, ";
    ProstateLesion3DWIR = "";
} else if (ProstateLesion3DWIText === "DWI score 4") {
    ProstateLesion3DWIP = "nápadně vyšší SI na DWI a současně nápadně nižší SI na ADC, ";
    ProstateLesion3DWIR = "";
} else if (ProstateLesion3DWIText === "DWI score 5") {
    ProstateLesion3DWIP = "nápadně vyšší SI na DWI a současně nápadně nižší SI na ADC, ";
    ProstateLesion3DWIR = "";
}

// C+
var ProstateLesion3CText = buttonElementProstateLesion3C.innerText;

if (ProstateLesion3CText === "kontrast -") {
    ProstateLesion3CP = ""; 
    ProstateLesion3CR = ""; 
} else if (ProstateLesion3CText === "kontrast +") {
    ProstateLesion3CP = "s časným postkontrastním sycením, "; 
    ProstateLesion3CR = ""; 
}


// size
var ProstateLesion3SizeValue = document.getElementById("ProstateLesion3Size").value;
document.getElementById("ProstateLesion3Size").addEventListener('input', updateTexts);
var ProstateLesion3SizeP = "";

if (ProstateLesion3SizeValue === "") {
    ProstateLesion3SizeP = "";
} else if (ProstateLesion3SizeValue !== "") {
    ProstateLesion3SizeP = "diametru " + ProstateLesion3SizeValue + " mm,";
}

// invaze
var ProstateLesion3InvasionText = buttonElementProstateLesion3Invasion.innerText;

if (ProstateLesion3InvasionText === "bez invaze") {
    ProstateLesion3InvasionP = ""; 
    ProstateLesion3InvasionR = ""; 
} else if (ProstateLesion3InvasionText === "invaze kapsuly") {
    ProstateLesion3InvasionP = "s invazí kapsuly, "; 
    ProstateLesion3InvasionR = ", s invazí kapsuly"; 
} else if (ProstateLesion3InvasionText === "přes kapsulu") {
    ProstateLesion3InvasionP = "s invazí přes kapsulu, "; 
    ProstateLesion3InvasionR = ", s invazí přes kapsulu"; 
} else if (ProstateLesion3InvasionText === "semen. váčků") {
    ProstateLesion3InvasionP = "s infiltrací semenných váčků, "; 
    ProstateLesion3InvasionR = ", s infiltrací semenných váčků"; 
} else if (ProstateLesion3InvasionText === "okolních struktur") {
    ProstateLesion3InvasionP = "s infiltrací okolních struktur, "; 
    ProstateLesion3InvasionR = ", s infiltrací okolních struktur"; 
}

// PSMA
var ProstateLesion3PSMAText = buttonElementProstateLesion3PSMA.innerText;

if (document.getElementById('ChbProstatePSMA').checked) {
        if (ProstateLesion3PSMAText === "PSMA 0") {
            ProstateLesion3PSMAP = "s akumulací RF pod úrovní krevního poolu, "; 
            ProstateLesion3PSMAR = ", bez zvýšené PSMA exprese (score 0)"; 
        } else if (ProstateLesion3PSMAText === "PSMA 1") {
            ProstateLesion3PSMAP = "s akumulací RF nad úrovní krevního poolu, ale nižší než játra, "; 
            ProstateLesion3PSMAR = ", s mírně zvýšenou PSMA expresí (score 1)"; 
        } else if (ProstateLesion3PSMAText === "PSMA 2") {
            ProstateLesion3PSMAP = "s akumulací RF nad úrovní jater, ale nižší než parotid, ";
            ProstateLesion3PSMAR = ", se středně vysokou PSMA expresí (score 2)";
        } else if (ProstateLesion3PSMAText === "PSMA 3") {
            ProstateLesion3PSMAP = "s akumulací RF nad úrovní parotid, ";
            ProstateLesion3PSMAR = ", s vysokou PSMA expresí (score 3)";
        } 
    } else {
        ProstateLesion3PSMAP = "";
        ProstateLesion3PSMAR = "";
    }

// PIRADS auto
var ProstateLesion3SizeRaw = document.getElementById("ProstateLesion3Size").value;
var ProstateLesion3SizeValue = ProstateLesion3SizeRaw === "" ? "" : parseFloat(ProstateLesion3SizeRaw);

    var firstSegmentLesion3 = segmentsLesion3[0];

    // Check the segments
if (firstSegmentLesion3 && (firstSegmentLesion3.includes("TZa") || firstSegmentLesion3.includes("TZp"))) {
	if (ProstateLesion3T2Text === "T2 score 1") {
		buttonElementProstateLesion3PIRADS.innerText = "PI-RADS 1";
	} else if (ProstateLesion3T2Text === "T2 score 2") {
		if (["DWI score 1", "DWI score 2", "DWI score 3"].includes(ProstateLesion3DWIText)) {
			buttonElementProstateLesion3PIRADS.innerText = "PI-RADS 2";
		} else if (["DWI score 4", "DWI score 5"].includes(ProstateLesion3DWIText)) {
			buttonElementProstateLesion3PIRADS.innerText = "PI-RADS 3";
		}
	} else if (ProstateLesion3T2Text === "T2 score 3") {
		if (["DWI score 1", "DWI score 2", "DWI score 3", "DWI score 4"].includes(ProstateLesion3DWIText)) {
			buttonElementProstateLesion3PIRADS.innerText = "PI-RADS 3";
		} else if (ProstateLesion3DWIText === "DWI score 5") {
			buttonElementProstateLesion3PIRADS.innerText = "PI-RADS 4";
		}
	} else if ((ProstateLesion3T2Text === "T2 score 4" || ProstateLesion3T2Text === "T2 score 5") && (ProstateLesion3SizeValue === "" || ProstateLesion3SizeValue < 15)) {
		buttonElementProstateLesion3PIRADS.innerText = "PI-RADS 4";
	} else if ((ProstateLesion3T2Text === "T2 score 4" || ProstateLesion3T2Text === "T2 score 5") && ProstateLesion3SizeValue >= 15) {
		buttonElementProstateLesion3PIRADS.innerText = "PI-RADS 5";
	}
} else if (firstSegmentLesion3 && (firstSegmentLesion3.includes("PZa") || firstSegmentLesion3.includes("PZpl") || firstSegmentLesion3.includes("PZpm"))) {
	switch (ProstateLesion3DWIText) {
		case "DWI score 1":
			buttonElementProstateLesion3PIRADS.innerText = "PI-RADS 1";
			break;
		case "DWI score 2":
			buttonElementProstateLesion3PIRADS.innerText = "PI-RADS 2";
			break;
		case "DWI score 3":
			if (ProstateLesion3CText === "kontrast -") {
				buttonElementProstateLesion3PIRADS.innerText = "PI-RADS 3";
			} else if (ProstateLesion3CText === "kontrast +") {
				buttonElementProstateLesion3PIRADS.innerText = "PI-RADS 4";
			}
			break;
		case "DWI score 4":
		  if (ProstateLesion3SizeValue < 15) {
			buttonElementProstateLesion3PIRADS.innerText = "PI-RADS 4";
		  } else if (ProstateLesion3SizeValue >= 15) {
			buttonElementProstateLesion3PIRADS.innerText = "PI-RADS 5";
		  } 
		  break;
	}
} else if (firstSegmentLesion3 && (firstSegmentLesion3.includes("CZ") || firstSegmentLesion3.includes("AFS"))) {
    const highestScore = Math.max(
        parseInt(ProstateLesion3DWIText.replace('DWI score ', '')),
        parseInt(ProstateLesion3T2Text.replace('T2 score ', ''))
    );

    switch (highestScore) {
        case 1:
            buttonElementProstateLesion3PIRADS.innerText = "PI-RADS 1";
            break;
        case 2:
            buttonElementProstateLesion3PIRADS.innerText = "PI-RADS 2";
            break;
        case 3:
            buttonElementProstateLesion3PIRADS.innerText = "PI-RADS 3";
            break;
        case 4:
            buttonElementProstateLesion3PIRADS.innerText = "PI-RADS 4";
            break;
        case 5:
            buttonElementProstateLesion3PIRADS.innerText = "PI-RADS 5";
            break;
        default:
            console.error('Unexpected score for lesion in CZ or AFS');
            break;
    }
}

//PIRADS manual
var ProstateLesion3PIRADSText = buttonElementProstateLesion3PIRADS.innerText;

if (prostateSegmentLesion3 === "") {
    ProstateLesion3PIRADSText = "";
} else {
    ProstateLesion3PIRADSText += "";
}

// Lesion3 Finals
const prostateTableLesion3 = document.querySelector('#ProstateLesion3');
var ProstateLesion3P = ""; var ProstateLesion3R = "";
if (!prostateTableLesion3.classList.contains('hidden') && prostateSegmentLesion3 !== "") {
    const isPeripheral = segmentsLesion3.length > 0 && segmentsLesion3[0].charAt(0) === 'P';
    ProstateLesion3P = ProstateLesion3Number + " " + prostateSegmentLesion3 + " " + ProstateLesion3SizeP + " " + (isPeripheral ? "" : ProstateLesion3T2P) + " " + ProstateLesion3DWIP + " " + ProstateLesion3CP + " " + ProstateLesion3InvasionP + " " + ProstateLesion3PSMAP + ".";
    ProstateLesion3R = ProstateLesion3Number + ProstateLesion3PIRADSText + " - " + prostateSegmentLesion3 + " " + ProstateLesion3InvasionR + " " + ProstateLesion3PSMAR + ".";
}


// NON LESION


// size
var ProstateSizeValue = document.getElementById("ProstateSize").value;
    var ProstateSizeP = "";
    var matches = ProstateSizeValue.match(/(\d+)/g); // Extract all groups of digits from the string
    
    if (!ProstateSizeValue) {
        ProstateSizeP = "";
    } else if (matches && matches.length === 3) { // If there are exactly 3 groups of numbers
        var a = parseFloat(matches[0]);
        var b = parseFloat(matches[1]);
        var c = parseFloat(matches[2]);
        var ProstateVolume = (a * b * c) / 2000;
        var roundedVolume = Math.round(ProstateVolume / 10) * 10;  // Round to nearest ten
        var ProstateSizeR = getProstateVolumeR(roundedVolume);
        ProstateSizeP = "Prostata rozměrů cca " + ProstateSizeValue + " mm, což představuje objem cca " + roundedVolume + " ml. ";
    } else {
        ProstateSizeP = "Prostata rozměrů cca " + ProstateSizeValue + " mm. ";
    }

function getProstateVolumeR(volume) {
    if (volume < 30) {
        return "";
    } else if (volume >= 30 && volume < 40) {
        return "Hraniční velikost prostaty";
    } else if (volume >= 40 && volume < 70) {
        return "Zvětšená prostata";
    } else {
        return "Výrazně zvětšená prostata";
    }
}

// hyperplasia
const ProstateHyperplasiaText = buttonElementProstateHyperplasia.innerText;

if (ProstateHyperplasiaText === "není") {
 ProstateHyperplasiaP = "";
 ProstateHyperplasiaR = "";
} else if (ProstateHyperplasiaText === "mírná") {
 ProstateHyperplasiaP = "Mírné zbytnění nodulárně prostavěné přechodové zóny prostaty. "; 
 ProstateHyperplasiaR = "Mírná benigní hyperplázie prostaty. "; 
} else if (ProstateHyperplasiaText === "střední") {
 ProstateHyperplasiaP = "Zbytnění nodulárně prostavěné přechodové zóny a tak útlak periferní zóny prostaty. ";
 ProstateHyperplasiaR = "Středně pokročilá hyperplázie prostaty. ";
} else if (ProstateHyperplasiaText === "pokročilá") {
 ProstateHyperplasiaP = "Pokročilé zbytnění nodulárně prostavěné přechodové zóny a proto výrazný útlak periferní zóny prostaty. ";
 ProstateHyperplasiaR = "Velmi pokročilá hyperplázie prostaty. ";
}

// seminal vesicles
const ProstateSemVesText = buttonElementProstateSemVes.innerText;

if (ProstateSemVesText === "normální") {
 ProstateSemVesP = "Normální náplň semenných váčků. ";
 ProstateSemVesR = "";
} else if (ProstateSemVesText === "malá náplň") {
 ProstateSemVesP = "Chabá náplň semenných váčků, jejich hodnotitelnost je tak výrazně limitována. "; 
 ProstateSemVesR = ""; 
} else if (ProstateSemVesText === "bez náplně") {
 ProstateSemVesP = "Není náplň semenných váčků, které tak nejsou hodnotitelné. ";
 ProstateSemVesR = "";
} 



// Lymph nodes Reg

var locationsLNReg = [
        "při externí ilice vpravo",
        "při externí ilice vlevo",
        "při interní ilice vpravo",
        "při interní ilice vlevo",
		"presakrální vpravo",
        "presakrální vlevo",
        "další pánevní vpravo",
        "další pánevní vlevo"
    ];
    
    var inputsLNReg = [
        document.getElementById("ProstateLNExtR"),
        document.getElementById("ProstateLNExtL"),
        document.getElementById("ProstateLNIntR"),
        document.getElementById("ProstateLNIntL"),
		document.getElementById("ProstateLNSacralR"),
        document.getElementById("ProstateLNSacralL"),
        document.getElementById("ProstateLNPelvR"),
        document.getElementById("ProstateLNPelvL")
    ];
    
    var ProstateLNRegP = "Suspektní regionální uzliny jsou přítomny: ";
    var totalNodesReg = 0;
    var nodesArrayReg = [];
    
    for (var i = 0; i < inputsLNReg.length; i++) {
        if (inputsLNReg[i].value && parseInt(inputsLNReg[i].value) > 0) {
            nodesArrayReg.push(inputsLNReg[i].value + " " + locationsLNReg[i]);
            totalNodesReg += parseInt(inputsLNReg[i].value);
        }
    }

const ProstateLNRegText = buttonElementProstateLNReg.innerText;

if (nodesArrayReg.length === 0) {
    ProstateLNRegP = "Nejsou patrné suspektní regionální lymfatické uzliny. ";
    ProstateLNRegR = "Bez suspektních regionálních lymfatických uzlin. ";
} else {
    // Handling the comma and 'a' separators
    ProstateLNRegP += nodesArrayReg.slice(0, -2).join(", ") + 
                   (nodesArrayReg.length > 2 ? ", " : "") + 
                   nodesArrayReg.slice(-2).join(" a ") + ". ";
    
    if (totalNodesReg === 1) {
        ProstateLNRegR = totalNodesReg + " suspektní regionální uzlina.";
    } else if (totalNodesReg >= 2 && totalNodesReg <= 4) {
        ProstateLNRegR = totalNodesReg + " suspektní regionální uzliny.";
    } else {
        ProstateLNRegR = totalNodesReg + " suspektních regionálních uzlin.";
    }
}


// Lymph nodes NonNonReg

var locationsLNNonReg = [
		"paraaortálně",
        "při společné ilice vpravo",
		"při společné ilice vlevo",
        "inguinálně vpravo",
        "inguinálně vlevo",
        "další non-regionální"
    ];
    
    var inputsLNNonReg = [
		document.getElementById("ProstateLNAo"),
		document.getElementById("ProstateLNComR"),
        document.getElementById("ProstateLNComL"),
        document.getElementById("ProstateLNIngR"),
        document.getElementById("ProstateLNIngL"),
        document.getElementById("ProstateLNFar")
    ];
    
    var ProstateLNNonRegP = "Suspektní non-regionální uzliny jsou přítomny: ";
    var totalNodesNonReg = 0;
    var nodesArrayNonReg = [];
    
    for (var i = 0; i < inputsLNNonReg.length; i++) {
        if (inputsLNNonReg[i].value && parseInt(inputsLNNonReg[i].value) > 0) {
            nodesArrayNonReg.push(inputsLNNonReg[i].value + " " + locationsLNNonReg[i]);
            totalNodesNonReg += parseInt(inputsLNNonReg[i].value);
        }
    }

const ProstateLNNonRegText = buttonElementProstateLNNonReg.innerText;

if (nodesArrayNonReg.length === 0) {
    ProstateLNNonRegP = "Nejsou patrné suspektní non-regionální lymfatické uzliny. ";
    ProstateLNNonRegR = "Bez suspektních non-regionálních lymfatických uzlin. ";
} else {
    // Handling the comma and 'a' separators
    ProstateLNNonRegP += nodesArrayNonReg.slice(0, -2).join(", ") + 
                   (nodesArrayNonReg.length > 2 ? ", " : "") + 
                   nodesArrayNonReg.slice(-2).join(" a ") + ". ";
    
    if (totalNodesNonReg === 1) {
        ProstateLNNonRegR = totalNodesNonReg + " suspektní non-regionální uzlina.";
    } else if (totalNodesNonReg >= 2 && totalNodesNonReg <= 4) {
        ProstateLNNonRegR = totalNodesNonReg + " suspektní non-regionální uzliny.";
    } else {
        ProstateLNNonRegR = totalNodesNonReg + " suspektních non-regionálních uzlin.";
    }
}


// normal exam
let ProstateOkP = "", ProstateOkR = "";

const lesionsP = [ProstateLesion1P, ProstateLesion2P, ProstateLesion3P];
const lesionsR = [ProstateLesion1R, ProstateLesion2R, ProstateLesion3R];

ProstateOkP = lesionsP.every(lesion => lesion === "") ? "Bez patrných ložisek abnormálního SI. " : "";
ProstateOkR = lesionsR.every(lesion => lesion === "") ? "Bez známek přítomnosti patologických ložisek prostaty. PI-RADS 1." : "";

// RECID

var ProstateRecidP = "";
var ProstateRecidR = "";

var ChbProstateRecidR = document.getElementById("ChbProstateRecidR").checked;
var ChbProstateRecidL = document.getElementById("ChbProstateRecidL").checked;

if (ChbProstateRecidR && ChbProstateRecidL) {
  ProstateRecidP = "Ložiska v lůžku prostaty bilat. ";
  ProstateRecidR = "Ložiska recidivy v lůžku prostaty bilat. ";
  ProstateOkP = "Prostata po radikálním odstranění. ";
  ProstateOkR = "St.p. RAPE. "
  ProstateSemVesP = "";
} else {
  if (ChbProstateRecidR) {
    ProstateRecidP = "Ložisko v lůžku prostaty vpravo. ";
    ProstateRecidR = "Ložisko recidivy v lůžku prostaty vpravo. ";
	ProstateOkP = "Prostata po radikálním odstranění. ";
	ProstateOkR = "St.p. RAPE. "
	ProstateSemVesP = "";
  }
  if (ChbProstateRecidL) {
    ProstateRecidP = "Ložisko v lůžku prostaty vlevo. ";
    ProstateRecidR = "Ložisko recidivy v lůžku prostaty vlevo. ";
	ProstateOkP = "Prostata po radikálním odstranění. ";
	ProstateOkR = "St.p. RAPE. "
	ProstateSemVesP = "";
  }
}

//Meta

let ProstateSkeletonMetaP = "", ProstateSkeletonMetaR = "", ProstateOtherMetaR = "", ProstateMetaR = "";

if (document.getElementById('ChbProstateSkeletonMeta').checked) {
	ProstateSkeletonMetaP = "Přítomna meta skeletu. ";
	ProstateMetaR += "Přítomna meta skeletu. ";
} else {
	ProstateSkeletonMetaP = "Bez patrných ložisek skeletu. ";
}		

if (document.getElementById('ChbProstateOtherMeta').checked) {
	ProstateMetaR += "Přítomna orgánová meta. ";
} 

if (!document.getElementById('ChbProstateSkeletonMeta').checked && !document.getElementById('ChbProstateOtherMeta').checked && totalNodesReg === 0) {
	ProstateMetaR += "Bez známek přítomnosti vzdálených meta ložisek. ";
}



//TNM
let ProstateTstageR = "", ProstateNstageR = "", ProstateMstageR = ""; ProstateTMN = "";

if (ProstateLesion1R === "" && ProstateLesion2R === "" && ProstateLesion3R === "" ) {
    ProstateTstageR = "T0";
} else if (ProstateLesion1InvasionText === "okolních struktur" || ProstateLesion2InvasionText === "okolních struktur" || ProstateLesion3InvasionText === "okolních struktur") {
    ProstateTstageR = "T4";
} else if (ProstateLesion1InvasionText === "semen. váčků" || ProstateLesion2InvasionText === "semen. váčků" || ProstateLesion3InvasionText === "semen. váčků") {
    ProstateTstageR = "T3b";
} else if (ProstateLesion1InvasionText === "přes kapsulu" || ProstateLesion2InvasionText === "přes kapsulu" || ProstateLesion3InvasionText === "přes kapsulu") {
    ProstateTstageR = "T3a";
} else if (ProstateLesion1InvasionText === "invaze kapsuly" || ProstateLesion2InvasionText === "invaze kapsuly" || ProstateLesion3InvasionText === "invaze kapsuly" ||
           ProstateLesion1InvasionText === "bez invaze" || ProstateLesion2InvasionText === "bez invaze" || ProstateLesion3InvasionText === "bez invaze") {
    ProstateTstageR = "T2";
}


if (totalNodesReg === 0) {
    ProstateNstageR = "N0";
} else if (totalNodesReg > 1) {
    ProstateNstageR = "N2";
} else if (totalNodesReg > 0) {
    ProstateNstageR = "N1";
}


if (totalNodesNonReg > 0) {
    ProstateMstageR = "M1a ";
}

if (document.getElementById('ChbProstateSkeletonMeta').checked) {
	ProstateMstageR += "M1b ";
} 	
if (document.getElementById('ChbProstateOtherMeta').checked) {
	ProstateMstageR += "M1c ";
} 
if (!document.getElementById('ChbProstateSkeletonMeta').checked && !document.getElementById('ChbProstateOtherMeta').checked && totalNodesNonReg === 0) {
	ProstateMstageR = "M0";
}



//miTNM
let ProstatemiTstageR = "", ProstatemiNstageR = "", ProstatemiMstageR = ""; ProstatemiTMN = "";

if (document.getElementById("ChbProstateRecidR").checked || document.getElementById("ChbProstateRecidL").checked) {
    ProstatemiTstageR = "miTr";
} else if  (ProstateLesion1R === "" && ProstateLesion2R === "" && ProstateLesion3R === "") {
    ProstatemiTstageR = "miT0";
} else if (ProstateLesion1InvasionText === "okolních struktur" || ProstateLesion2InvasionText === "okolních struktur" || ProstateLesion3InvasionText === "okolních struktur") {
    ProstatemiTstageR = "miT4";
} else if (ProstateLesion1InvasionText === "semen. váčků" || ProstateLesion2InvasionText === "semen. váčků" || ProstateLesion3InvasionText === "semen. váčků") {
    ProstatemiTstageR = "miT3b";
} else if (ProstateLesion1InvasionText === "přes kapsulu" || ProstateLesion2InvasionText === "přes kapsulu" || ProstateLesion3InvasionText === "přes kapsulu") {
    ProstatemiTstageR = "miT3a";
} else if (ProstateLesion1InvasionText === "invaze kapsuly" || ProstateLesion2InvasionText === "invaze kapsuly" || ProstateLesion3InvasionText === "invaze kapsuly") {
    ProstatemiTstageR = "miT2";
} else if (ProstateLesion1InvasionText === "bez invaze" || ProstateLesion2InvasionText === "bez invaze" || ProstateLesion3InvasionText === "bez invaze") {
    ProstatemiTstageR = "miT2";
} 

if (totalNodesReg === 0) {
    ProstatemiNstageR = "miN0";
} else if (totalNodesReg > 1) {
    ProstatemiNstageR = "miN2";
} else if (totalNodesReg > 0) {
    ProstatemiNstageR = "miN1";
}


if (totalNodesNonReg > 0) {
    ProstatemiMstageR += "miM1a ";
}

if (document.getElementById('ChbProstateSkeletonMeta').checked) {
	ProstatemiMstageR += "miM1b ";
} 	
if (document.getElementById('ChbProstateOtherMeta').checked) {
	ProstatemiMstageR += "miM1c ";
} 
if (!document.getElementById('ChbProstateSkeletonMeta').checked && !document.getElementById('ChbProstateOtherMeta').checked && totalNodesNonReg === 0) {
	ProstatemiMstageR = "miM0";
}


// TMN or miTNM 
if (document.getElementById('ChbProstatePSMA').checked) {
	ProstateTMN = ""; 
	ProstatemiTMN = "Dnešní molekulární zobrazení (mi) odpovídá stagingu " + ProstatemiTstageR + " " + ProstatemiNstageR + " " + ProstatemiMstageR + ".";
} else {
	ProstateTMN = "TNM stage: " + ProstateTstageR + " " + ProstateNstageR + " " + ProstateMstageR;
	ProstatemiTMN = "";
}
	
	
	
// POPIS
ProstateTuNAMEText.value = "MR prostaty"; if (document.getElementById('ChbProstatePSMA').checked) {ProstateTuNAMEText.value = "PSMA-PET/MR prostaty";}

ProstateTuINDText.value = document.getElementById("indikace").addEventListener("input", updateTexts);

ProstateTuPOPText.value = 
ProstateOkP + "\n" +
ProstateRecidP + "\n" +
ProstateLesion1P + "\n" +
ProstateLesion2P + "\n" +
ProstateLesion3P + "\n" +
ProstateSizeP + ProstateHyperplasiaP + ProstateSemVesP + "\n" +
ProstateLNRegP + ProstateLNNonRegP + "\n" +
ProstateSkeletonMetaP
;

	//ProstateTuPOPText.value = ProstateTuPOPText.value.replace(/^\s+/gm, '');  // odstraní mezery na začátku řádek
	ProstateTuPOPText.value = ProstateTuPOPText.value.replace(/ {2,}/g, ' ');  // více mezer = jedna mezera
	//ProstateTuPOPText.value = ProstateTuPOPText.value.replace(/^[.,\s]+/gm, '');  // odstraní tečku a čárku pokud jsou první na řádce
	ProstateTuPOPText.value = ProstateTuPOPText.value.replace(/ \./g, '.'); // mezera tečka = bez mezery tečka
	ProstateTuPOPText.value = ProstateTuPOPText.value.replace(/\.{2,}/g, '.'); // více teček = jedna tečka
	ProstateTuPOPText.value = ProstateTuPOPText.value.replace(/^\s*[\r\n]/gm, ''); // smaže prázdné řádky
	ProstateTuPOPText.value = ProstateTuPOPText.value.replace(/\,\./g, '.'); // čarka tečka = tečka


//RESUME
ProstateTuRESText.value = 
ProstateOkR + "\n" +
ProstateRecidR + "\n" +
ProstateLesion1R + "\n" +
ProstateLesion2R + "\n" +
ProstateLesion3R + "\n" +
ProstateLNRegR + " " + ProstateLNNonRegR + " " + ProstateMetaR +  "\n" +
ProstateTMN + ProstatemiTMN
;

	ProstateTuRESText.value = ProstateTuRESText.value.replace(/^\s+/gm, '');  // odstraní mezery na začátku řádek
	ProstateTuRESText.value = ProstateTuRESText.value.replace(/ {2,}/g, ' ');  // více mezer = jedna mezera
	ProstateTuRESText.value = ProstateTuRESText.value.replace(/^[.,\s]+/gm, '');  // odstraní tečku a čárku pokud jsou první na řádce
	ProstateTuRESText.value = ProstateTuRESText.value.replace(/ \./g, '.'); // mezera tečka = bez mezery tečka
	ProstateTuRESText.value = ProstateTuRESText.value.replace(/\.{2,}/g, '.'); // více teček = jedna tečka
	ProstateTuRESText.value = ProstateTuRESText.value.replace(/ :/g, ':');  // odstraní mezeru před dvojtečkou
	ProstateTuRESText.value = ProstateTuRESText.value.replace(/ \, /g, ', '); // mezera čárka na čárka


// FINAL

ProstateFinalText.value = 
"Staging ca prostaty" + "\n\n" +
ProstateTuPOPText.value + "\n" +
"Závěr:" + "\n" +
ProstateTuRESText.value;



}
updateTexts();	

