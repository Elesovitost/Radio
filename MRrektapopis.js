
function updateBackgroundColor(index, buttonElement, color1 = "transparent", color2 = "#D4A29C") {
  buttonElement.style.backgroundColor = index === 0 ? color1 : color2;
}

var textsRectTuType = ["není", "infiltrativní", "exofytický"];
var buttonElementRectTuType = document.getElementById("RectTuTypeButton");
var indexRectTuType = 0;function cycleRectTuTypeText(event) {  indexRectTuType = cycleText(event, textsRectTuType, indexRectTuType, buttonElementRectTuType);}
function cycleRectTuTypeText(event) {  indexRectTuType = cycleText(event, textsRectTuType, indexRectTuType, buttonElementRectTuType, updateBackgroundColor);  updateTexts();}

var textsRectTuInvasion = ["T1/T2 - pouze stěna", "T3a - invaze < 1 mm", "T3b - invaze 1-5 mm", "T3c - invaze 5-15 mm", "T3d - invaze > 15 mm", "T4a - invaze perit. rec.", "T4b - invaze orgánu"];
var buttonElementRectTuInvasion = document.getElementById("RectTuInvasionButton");
var indexRectTuInvasion = 0;function cycleRectTuInvasionText(event) {  indexRectTuInvasion = cycleText(event, textsRectTuInvasion, indexRectTuInvasion, buttonElementRectTuInvasion);}
function cycleRectTuInvasionText(event) {  indexRectTuInvasion = cycleText(event, textsRectTuInvasion, indexRectTuInvasion, buttonElementRectTuInvasion, updateBackgroundColor);  updateTexts();}

var textsRectTuLNReg = ["nesuspektní", "suspektní"];
var buttonElementRectTuLNReg = document.getElementById("RectTuLNRegButton");
var indexRectTuLNReg = 0;function cycleRectTuLNRegText(event) {  indexRectTuLNReg = cycleText(event, textsRectTuLNReg, indexRectTuLNReg, buttonElementRectTuLNReg);}
function cycleRectTuLNRegText(event) {  indexRectTuLNReg = cycleText(event, textsRectTuLNReg, indexRectTuLNReg, buttonElementRectTuLNReg, updateBackgroundColor);  updateTexts();}

var textsRectTuLNNonReg = ["nesuspektní", "suspektní"];
var buttonElementRectTuLNNonReg = document.getElementById("RectTuLNNonRegButton");
var indexRectTuLNNonReg = 0;function cycleRectTuLNNonRegText(event) {  indexRectTuLNNonReg = cycleText(event, textsRectTuLNNonReg, indexRectTuLNNonReg, buttonElementRectTuLNNonReg);}
function cycleRectTuLNNonRegText(event) {  indexRectTuLNNonReg = cycleText(event, textsRectTuLNNonReg, indexRectTuLNNonReg, buttonElementRectTuLNNonReg, updateBackgroundColor);  updateTexts();}



// LN
var textsRectTuLNReg = ["nesuspektní", "suspektní"];
var buttonElementRectTuLNReg = document.getElementById("RectTuLNRegButton");
var indexRectTuLNReg = 0;function cycleRectTuLNRegText(event) {  indexRectTuLNReg = cycleText(event, textsRectTuLNReg, indexRectTuLNReg, buttonElementRectTuLNReg);}
function cycleRectTuLNRegText(event) {  indexRectTuLNReg = cycleText(event, textsRectTuLNReg, indexRectTuLNReg, buttonElementRectTuLNReg, updateBackgroundColor);  

let RectTuLNRegValue = buttonElementRectTuLNReg.innerText.trim(); 
    let RectTuLNRegLocationElement = document.getElementById('RectTuLNRegLocation');

    if (RectTuLNRegValue === "suspektní") {
        RectTuLNRegLocationElement.classList.remove('hidden');
    } else if (RectTuLNRegValue === "nesuspektní") {
        RectTuLNRegLocationElement.classList.add('hidden');
    }
updateTexts();}

var textsRectTuLNNonReg = ["nesuspektní", "suspektní"];
var buttonElementRectTuLNNonReg = document.getElementById("RectTuLNNonRegButton");
var indexRectTuLNNonReg = 0;function cycleRectTuLNNonRegText(event) {  indexRectTuLNNonReg = cycleText(event, textsRectTuLNNonReg, indexRectTuLNNonReg, buttonElementRectTuLNNonReg);}
function cycleRectTuLNNonRegText(event) {  indexRectTuLNNonReg = cycleText(event, textsRectTuLNNonReg, indexRectTuLNNonReg, buttonElementRectTuLNNonReg, updateBackgroundColor);  

let RectTuLNNonRegValue = buttonElementRectTuLNNonReg.innerText.trim(); 
    let RectTuLNNonRegNumElement = document.getElementById('RectTuLNNonRegNum');

    if (RectTuLNNonRegValue === "suspektní") {
        RectTuLNNonRegNumElement.classList.remove('hidden');
    } else if (RectTuLNNonRegValue === "nesuspektní") {
        RectTuLNNonRegNumElement.classList.add('hidden');
    }
updateTexts();}


// Lymph node location

document.getElementById('RectTuLNRegLocation').addEventListener('focus', function() {
  document.getElementById('RectTuLNRegSelectLocation').classList.remove('hidden');
});
document.addEventListener('click', function(e) {
  const RectTuLNRegLocationElement = document.getElementById('RectTuLNRegLocation');
  const RectTuLNRegSelectLocationElement = document.getElementById('RectTuLNRegSelectLocation');
  if (!RectTuLNRegLocationElement.contains(e.target) && !RectTuLNRegSelectLocationElement.contains(e.target)) {
	RectTuLNRegSelectLocationElement.classList.add('hidden');
  }
});




// COPY

var copyFINAL = document.getElementById('copyFINAL');
var RectTuFinalText = document.getElementById('RectTuFinalText');

copyFINAL.addEventListener('click', function() {
	
    navigator.clipboard.writeText(RectTuFinalText.value)
    .then(() => {
        RectTuFinalText.classList.add('highlight');

        setTimeout(function() {
            RectTuFinalText.classList.remove('highlight');
        }, 100);
    })
    .catch(err => {
    });
});



var copyPOP = document.getElementById('copyPOP');
var RectTuPOPText = document.getElementById('RectTuPOPText');

copyPOP.addEventListener('click', function() {
    navigator.clipboard.writeText(RectTuPOPText.value)
    .then(() => {
        RectTuPOPText.classList.add('highlight');

        setTimeout(function() {
            RectTuPOPText.classList.remove('highlight');
        }, 100);
    })
    .catch(err => {
    });
});



var copyRES = document.getElementById('copyRES');
var RectTuRESText = document.getElementById('RectTuRESText');

copyRES.addEventListener('click', function() {
    navigator.clipboard.writeText(RectTuRESText.value)
    .then(() => {
        RectTuRESText.classList.add('highlight');

        setTimeout(function() {
            RectTuRESText.classList.remove('highlight');
        }, 100);
    })
    .catch(err => {
    });
});

function updateTexts() {

var indikace = document.getElementById("indikace").value;

var RectTuRESText = document.getElementById("RectTuRESText");
var FINALText = document.getElementById("FINALText");

const RectTuTypeText = buttonElementRectTuType.textContent;
var RectTuStartDistance = document.getElementById("RectTuStartDistance").value; document.getElementById("RectTuStartDistance").addEventListener('input', updateTexts);
var RectTuTotDistance = document.getElementById("RectTuTotDistance").value; document.getElementById("RectTuTotDistance").addEventListener('input', updateTexts);
var RectTuSpreadFrom = document.getElementById("RectTuSpreadFrom").value; document.getElementById("RectTuSpreadFrom").addEventListener('input', updateTexts);
var RectTuSpreadTo = document.getElementById("RectTuSpreadTo").value; document.getElementById("RectTuSpreadTo").addEventListener('input', updateTexts);

const RectTuInvasionText = buttonElementRectTuInvasion.textContent;
var RectTuInvasionFrom = document.getElementById("RectTuInvasionFrom").value; document.getElementById("RectTuInvasionFrom").addEventListener('input', updateTexts);
var RectTuInvasionTo = document.getElementById("RectTuInvasionTo").value; document.getElementById("RectTuInvasionTo").addEventListener('input', updateTexts);
var ChbRectTuMRFInvasion = document.getElementById('ChbRectTuMRFInvasion');
var ChbRectTuAngioInvasion = document.getElementById('ChbRectTuAngioInvasion');

const RectTuLNRegText = buttonElementRectTuLNReg.textContent;

const RectTuLNNonRegText = buttonElementRectTuLNNonReg.textContent;
var RectTuLNNonRegNum = document.getElementById("RectTuLNNonRegNum").value;

// tumor type

if (RectTuTypeText === "není") {
 RectTuTypeP = "";
 RectTuTypeR = "";
 TumorDescription = "V T2W není v rozsahu vyšetření přítomno abnormální zvýšení signálu stěny rekta.";
} else if (RectTuTypeText === "infiltrativní") {
 RectTuTypeP = "difuzní infiltrativní"; 
 RectTuTypeR = ""; 
} else if (RectTuTypeText === "exofytický") {
 RectTuTypeP = "exofytické";
 RectTuTypeR = "";
}

// tumor spread
if (RectTuSpreadFrom !== "" && RectTuSpreadTo !== "" && RectTuSpreadFrom !== RectTuSpreadTo) {
    RectTuSpread = "v rozsahu (po směru hodinových ručiček) cca " + RectTuSpreadFrom + " až " + RectTuSpreadTo + ". ";
} else if (RectTuSpreadFrom !== "" && RectTuSpreadFrom === RectTuSpreadTo) {
    RectTuSpread = "v cirkulárním rozsahu. ";
} else {
    RectTuSpread = "";
}

// tumor start
if (RectTuStartDistance !== "" ) {RectTuStartP = "Infiltrace stěny rekta začíná přibližně " + RectTuStartDistance + " cm od anorektálního úhlu ";} else {RectTuStartP = "";}
// tumor legth
if (RectTuTotDistance !== "" ) {
  RectTuTotDistanceP = "a postihuje úsek délky cca " + RectTuTotDistance + " cm"; 
  const calculatedLength = parseFloat(RectTuStartDistance) + parseFloat(RectTuTotDistance);
  TNMLength = "přibližně v rozsahu " + RectTuStartDistance + " - " + calculatedLength + " cm od anorektálního úhlu. "; 
} else {RectTuTotDistanceP = ""; TNMLength = "";}

// Tstage
if (RectTuTypeText === "není") {
 RectTuInvasionP = ""; 
 RectTuInvasionTSTAGE = "T0";
 RectTuInvasionR = ""; 
} else if (RectTuInvasionText === "T1/T2 - pouze stěna") {
 RectTuInvasionP = "Signálové zvýšení stěny rekta přesvědčivě nepřechází na okolní mezorektální tuk (T1/T2). "; 
 RectTuInvasionTSTAGE = "T1/T2";
 RectTuInvasionR = ""; 
} else if (RectTuInvasionText === "T3a - invaze < 1 mm") {
 RectTuInvasionP = "Tumor infiltruje mezorektální tuk do hloubky < 1 mm. ";
 RectTuInvasionTSTAGE = "T3a";
 RectTuInvasionR = "";
} else if (RectTuInvasionText === "T3b - invaze 1-5 mm") {
 RectTuInvasionP = "Tumor infiltruje mezorektální tuk do hloubky max. 5 mm. ";
 RectTuInvasionTSTAGE = "T3b ";
 RectTuInvasionR = "";
} else if (RectTuInvasionText === "T3c - invaze 5-15 mm") {
 RectTuInvasionP = "Tumor infiltruje mezorektální tuk do hloubky max. 15 mm. ";
 RectTuInvasionTSTAGE = "T3c";
 RectTuInvasionR = "";
} else if (RectTuInvasionText === "T3d - invaze > 15 mm") {
 RectTuInvasionP = "Tumor infiltruje mezorektální tuk do hloubky více jak 15 mm. ";
 RectTuInvasionTSTAGE = "T3d";
 RectTuInvasionR = "";
} else if (RectTuInvasionText === "T4a - invaze perit. rec.") {
 RectTuInvasionP = "Tumor infiltruje peritoneální recesus. ";
 RectTuInvasionTSTAGE = "T4a";
 RectTuInvasionR = "";
} else if (RectTuInvasionText === "T4b - invaze orgánu") {
 RectTuInvasionP = "Tumor infiltruje okolní orgány. ";
 RectTuInvasionTSTAGE = "T4b";
 RectTuInvasionR = "";
}

//tu invasion
if (RectTuInvasionFrom !== "" && RectTuInvasionTo !== "") {RectTuInvasionSegment = "V rozsahu cca " + RectTuInvasionFrom + " až " + RectTuInvasionTo + " "; RectTuInvasionP = RectTuInvasionP.replace("Tumor", "tumor");} else {RectTuInvasionSegment = ""; }

//MRF
 if (document.getElementById('ChbRectTuMRFInvasion').checked) {
    RectTuMRF = "Tumor či patol. uzlina (depozitum) zasahuje do vzdálenosti <= 1 mm od mezorektální fascie. ";
	TNMMRF = "MRF+";
  } else {
    RectTuMRF = "Bez známek invaze mezorektální fascie. ";
	TNMMRF = "MRF-";
  }

//vaskularní invaze
 if (document.getElementById('ChbRectTuAngioInvasion').checked) {
    RectTuAngioInvasion = "Je patrný susp. průnik nádorové hmoty do cévy. ";
	TNMENVI = "ENVI+";
  } else {
    RectTuAngioInvasion = "Není patrna zřetelná vaskulární invaze. ";
	TNMENVI = "";
  }


//NStage

// Lymph nodes Reg

var locationsLNReg = [
        "při interní ilice vpravo",
        "při interní ilice vlevo",
		"obturátorové vpravo",
        "obturátorové vlevo",
        "vysoké mezorektální vpravo",
        "vysoké mezorektální vlevo",
		"mezorektální vpravo",
        "mezorektální vlevo"
    ];
    
    var inputsLNReg = [
        document.getElementById("RectTuLNIntR"),
        document.getElementById("RectTuLNIntL"),
		document.getElementById("RectTuLNObturR"),
        document.getElementById("RectTuLNObturL"),
		document.getElementById("RectTuLNHiMesoRectalR"),
        document.getElementById("RectTuLNHiMesoRectalL"),
        document.getElementById("RectTuLNMesoRectalR"),
        document.getElementById("RectTuLNMesoRectalL")
    ];
    
    var RectTuLNRegP = "Suspektní regionální uzliny jsou přítomny: ";
    var totalNodesReg = 0;
    var nodesArrayReg = [];
    
    for (var i = 0; i < inputsLNReg.length; i++) {
        if (inputsLNReg[i].value && parseInt(inputsLNReg[i].value) > 0) {
            nodesArrayReg.push(inputsLNReg[i].value + " " + locationsLNReg[i]);
            totalNodesReg += parseInt(inputsLNReg[i].value);
        }
    }
	
//	RectTuLNRegLocation = "Celkem: " + totalNodesReg;


if (nodesArrayReg.length === 0) {
    RectTuLNRegP = "Nejsou patrné suspektní regionální lymfatické uzliny. ";
    RectTuLNRegR = "Bez suspektních regionálních lymfatických uzlin. ";
} else {
    RectTuLNRegP += nodesArrayReg.slice(0, -2).join(", ") + 
                   (nodesArrayReg.length > 2 ? ", " : "") + 
                   nodesArrayReg.slice(-2).join(" a ") + ". ";
    
    if (totalNodesReg === 1) {
        RectTuLNRegR = totalNodesReg + " suspektní regionální uzlina.";
    } else if (totalNodesReg >= 2 && totalNodesReg <= 4) {
        RectTuLNRegR = totalNodesReg + " suspektní regionální uzliny.";
    } else {
        RectTuLNRegR = totalNodesReg + " suspektních regionálních uzlin.";
    }
}


if (RectTuLNNonRegText === "nesuspektní") {
    RectTuLNNonRegP = "Bez suspektních non-regionálních lymfatických uzlin.";
} else if (RectTuLNNonRegText === "suspektní" && (RectTuLNNonRegNum === "" || RectTuLNNonRegNum === "0")) {
    RectTuLNNonRegP = "Suspektní regionální lymfatické uzliny.";
} else if (RectTuLNNonRegText === "suspektní" && RectTuLNNonRegNum === "1") {
    RectTuLNNonRegP = "Je přítomna " + RectTuLNNonRegNum + " suspektní non-regionální uzlina dle MR.";
} else if (RectTuLNNonRegText === "suspektní" && RectTuLNNonRegNum >= 2 && RectTuLNNonRegNum <= 4) {
    RectTuLNNonRegP = "Jsou přítomny " + RectTuLNNonRegNum + " suspektní non-regionální uzliny dle MR.";
} else if (RectTuLNNonRegText === "suspektní" && RectTuLNNonRegNum >= 5) {
    RectTuLNNonRegP = "Je přítomno " + RectTuLNNonRegNum + " suspektních non-regionálních uzlin dle MR.";
} 


// TNM Lokalizace
if (RectTuStartDistance === "") {
    TMNLoc = "";
} else if (RectTuStartDistance <= 4) {
    TMNLoc = "Tumor dolního rekta ";
} else if (RectTuStartDistance >= 5 && RectTuStartDistance <= 9) {
    TMNLoc = "Tumor středního rekta ";
} else if (RectTuStartDistance >= 10) {
    TMNLoc = "Tumor horního rekta ";
}

//TNM
var RectTuLNRegNSTAGE = "N0";
var RectTuMstageR = "M0";


if (totalNodesReg === 0) {
    RectTuLNRegNSTAGE = "N0";
} else if (totalNodesReg === 1) {
    RectTuLNRegNSTAGE = "N1a";
} else if (totalNodesReg >= 2 && totalNodesReg <= 3) {
    RectTuLNRegNSTAGE = "N1b";
} else if (totalNodesReg >= 4 && totalNodesReg <= 6) {
    RectTuLNRegNSTAGE = "N2a";
} else if (totalNodesReg > 6) {
    RectTuLNRegNSTAGE = "N2b";
}

if (RectTuLNNonRegText === "suspektní") {
    RectTuMstageR = "M1a";
}

if (document.getElementById('ChbRectTuMeta').checked) {
	RectTuMstageR = "M1b";
}

if (document.getElementById('ChbRectTuPerit').checked) {
	RectTuMstageR = "M1c";
}

// RECID

var ChbRectNoRecid = document.getElementById("ChbRectNoRecid").checked;

if (ChbRectNoRecid) {
  TMNLoc = "Bez známek recidivy tumoru";
}

// POPIS

RectTuNAMEText.value = "MR rekta"; 

RectTuINDText.value  = indikace; document.getElementById("indikace").addEventListener("input", updateTexts);

if (RectTuTypeText !== "není") {
	TumorDescription = "V T2W je přítomno " + RectTuTypeP + " zvýšení signálu stěny rekta " + RectTuSpread + ". " + RectTuStartP + RectTuTotDistanceP + ". " + "\n" +
	RectTuInvasionSegment + RectTuInvasionP + RectTuAngioInvasion + RectTuMRF;
}

RectTuPOPText.value = 
TumorDescription + "\n" +
RectTuLNRegP + " " + RectTuLNNonRegP
;

	//RectTuPOPText.value = RectTuPOPText.value.replace(/^\s+/gm, '');  // odstraní mezery na začátku řádek
	RectTuPOPText.value = RectTuPOPText.value.replace(/ {2,}/g, ' ');  // více mezer = jedna mezera
	//RectTuPOPText.value = RectTuPOPText.value.replace(/^[.,\s]+/gm, '');  // odstraní tečku a čárku pokud jsou první na řádce
	RectTuPOPText.value = RectTuPOPText.value.replace(/ \./g, '.'); // mezera tečka = bez mezery tečka
	RectTuPOPText.value = RectTuPOPText.value.replace(/\.{2,}/g, '.'); // více teček = jedna tečka

//RESUME
RectTuRESText.value = TMNLoc + TNMLength + ". " + "\n" + 
RectTuLNRegR + "\n" + 
RectTuLNNonRegP + "\n" + 
"TNM stage: " + RectTuInvasionTSTAGE + " " + TNMMRF + " " + TNMENVI + " " + RectTuLNRegNSTAGE + " " + RectTuMstageR + ".";

;

	RectTuRESText.value = RectTuRESText.value.replace(/^\s+/gm, '');  // odstraní mezery na začátku řádek
	RectTuRESText.value = RectTuRESText.value.replace(/ {2,}/g, ' ');  // více mezer = jedna mezera
	RectTuRESText.value = RectTuRESText.value.replace(/^[.,\s]+/gm, '');  // odstraní tečku a čárku pokud jsou první na řádce
	RectTuRESText.value = RectTuRESText.value.replace(/ \./g, '.'); // mezera tečka = bez mezery tečka
	RectTuRESText.value = RectTuRESText.value.replace(/\.{2,}/g, '.'); // více teček = jedna tečka
	RectTuRESText.value = RectTuRESText.value.replace(/ :/g, ':');  // odstraní mezeru před dvojtečkou


// FINAL

RectTuFinalText.value = 
"MR staging ca rektosigmatu" + "\n\n" +
RectTuPOPText.value + "\n\n" +
"Závěr:" + "\n" +
RectTuRESText.value;


}
updateTexts();	
