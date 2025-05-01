// PkNapln, PkPatelCHr, PkPatelCHrLat, PkFemurCHrMed, PkFemurCHrLat, PkWiberg, PkPkPlica, PkLuxace, MkFemurKondylEdem,MkFemurKondylOCD, MkFemurCHr, MkMen,MkTibieCHr, MkTibieKondylOCD, MkTibieKondylEdem

// předělat organizace slov v závěru: nejdřív RUPTURA, pak čeho.



var obecnetext = document.getElementById("obecnetext");
var PKtext = document.getElementById("PKtext");
var MKtext = document.getElementById("MKtext");
var LKtext = document.getElementById("LKtext");
var MRKneePOPText = document.getElementById("MRKneePOPText");
var MRKneeRESText = document.getElementById("MRKneeRESText");
var FINALText = document.getElementById("FINALText");

function updateTexts() {
	
let Nadpis = "";
var indikace = document.getElementById("indikace").value;

var PkPlicaP = ""; var PkPlicaR = ""; var checkboxplica = document.getElementById('checkboxplica');
var PkJumperP = ""; var PkJumperR = ""; var checkboxjumper = document.getElementById('checkboxjumper');
var PkOsgoodP = ""; var PkOsgoodR = ""; var checkboxOsgood = document.getElementById('checkboxOsgood');
var PkBipartitaP = ""; var PkBipartitaR = ""; var checkboxBipartita = document.getElementById('checkboxBipartita');
var VolnaTeliskaP = ""; var VolnaTeliskaR = ""; var checkboxVolnaTeliska = document.getElementById('checkboxVolnaTeliska');

const StranaText = buttonElementStrana.innerText;
	
const PkNaplnText = buttonElementPkNapln.innerText;
const PkWibergText = buttonElementPkWiberg.innerText;
var checkboxLuxacePatella = document.getElementById('checkboxLuxacePatella');

const MkMenText = buttonElementMkMen.innerText; var MkMenLeze = document.getElementById("MkMenLeze").value; var MkMenLokace = document.getElementById("MkMenLokace").value;
const MkMenMEText = buttonElementMkMenME.innerText; 

const LkMenText = buttonElementLkMen.innerText; var LkMenLeze = document.getElementById("LkMenLeze").value; var LkMenLokace = document.getElementById("LkMenLokace").value;
var checkboxLkMenCyst = document.getElementById('checkboxLkMenCyst'); LkMenCystP = ""; LkMenCystR = "";
const LkMenMEText = buttonElementLkMenME.innerText; 

const LCMText = buttonElementLCM.innerText;
const LCLText = buttonElementLCL.innerText;

const OstBakerText = buttonElementOstBaker.innerText;


//STRANA + výměna kompartmentů a kolat vazů a chrupavek FP

    const flexContainer = document.querySelector('.flex-container');
    const kommed = document.getElementById('kommed');
    const komlat = document.getElementById('komlat');
    
    if (StranaText === "jakého?") {
        Nadpis = "MR kolene";
    } else if (StranaText === "PRAVÉHO") {
        Nadpis = "MR pravého kolene";
        flexContainer.insertBefore(komlat, kommed);
    } else if (StranaText === "LEVÉHO") {
        Nadpis = "MR levého kolene";
        flexContainer.insertBefore(kommed, komlat);
    }


    const vazyContainer = document.getElementById('vazy'); 
    const lcmTable = document.getElementById('LCMtable');
    const lclTable = document.getElementById('LCLtable');

    if (StranaText === "PRAVÉHO") {
		vazyContainer.insertBefore(lclTable, vazyContainer.firstChild); 
        vazyContainer.appendChild(lcmTable); 
    } else if (StranaText === "LEVÉHO") {
		vazyContainer.insertBefore(lcmTable, vazyContainer.firstChild); 
        vazyContainer.appendChild(lclTable); 
    }



function findLabelByText(parent, text) {
    const labels = parent.querySelectorAll('label');
    for (let i = 0; i < labels.length; i++) {
        if (labels[i].innerText === text) {
            return labels[i];
        }
    }
    return null;
}

function switchMLPositions(isRightSide) {
    const rows = document.querySelectorAll('#FPjointML tr');
    
    rows.forEach(row => {
        const mCheckboxLabel = findLabelByText(row, "M");
        const lCheckboxLabel = findLabelByText(row, "L");

        if (mCheckboxLabel && lCheckboxLabel) {
            if (isRightSide) {
                lCheckboxLabel.parentNode.insertBefore(mCheckboxLabel, lCheckboxLabel.nextSibling);
            } else {
                mCheckboxLabel.parentNode.insertBefore(lCheckboxLabel, mCheckboxLabel.nextSibling);
            }
        }
    });
}

if (StranaText === "PRAVÉHO") {
    switchMLPositions(true); 
} else if (StranaText === "LEVÉHO") {
    switchMLPositions(false); 
}




// obecné

if (PkNaplnText === "0") {
 PkNaplnP = "Bez zvýšené tekutiny."; 
 PkNaplnR = ""; 
} else if (PkNaplnText === "↑") {
 PkNaplnP = "Mírně zvýšené množství kloubní tekutiny.";
 PkNaplnR = "Mírně zvýšená kloubní náplň.";
} else if (PkNaplnText === "↑↑") {
 PkNaplnP = "Zvýšené množství kloubní tekutiny.";
 PkNaplnR = "Zvýšená kloubní náplň.";
} else if (PkNaplnText === "↑↑↑") {
 PkNaplnP = "Výrazně zvýšené množství kloubní tekutiny.";
 PkNaplnR = "Výrazné zvýšená kloubní náplň.";
}

 if (checkboxVolnaTeliska.checked) {
        VolnaTeliskaP = "Volná tělíska v kloubní dutině. ";
        VolnaTeliskaR = "Volná tělíska v kloubní dutině. ";
    } else {
        VolnaTeliskaP = "";
        VolnaTeliskaR = "";
    }
	
	
 if (checkboxSynovitis.checked) {
        SynovitisP = "Rozšířená prominentní synovie. ";
        SynovitisR = "Synoviální hypertrofie. ";
    } else {
        SynovitisP = "";
        SynovitisR = "";
    }

// Baker
if (OstBakerText === "0") {
 OstBakerP = ""; 
 OstBakerR = ""; 
} else if (OstBakerText === "↑") {
 OstBakerP = "Drobná pseudocysta mediodorzálně v typické lokalizaci.";
 OstBakerR = "Drobná Bakerova pseudocysta. ";
} else if (OstBakerText === "↑↑") {
 OstBakerP = "Pseudocysta mediodorzálně v typické lokalizaci.";
 OstBakerR = "Bakerova pseudocysta.";
} else if (OstBakerText === "↑↑↑") {
 OstBakerP = "Výrazná pseudocysta mediodorzálně v typické lokalizaci.";
 OstBakerR = "Výrazná Bakerova pseudocysta.";
}


// přední kompartment


var PkCartText = "";
var PkCartRes = "";

// First word determination
var PkPatelCartM = document.getElementById("PkPatelCartM").checked;
var PkPatelCartL = document.getElementById("PkPatelCartL").checked;
var PkTrochCartM = document.getElementById("PkTrochCartM").checked;
var PkTrochCartL = document.getElementById("PkTrochCartL").checked;

// Second word determination
var descriptions = [];
var PkCartFissureOne = document.getElementById("PkCartFissureOne").checked;
var PkCartFissureMore = document.getElementById("PkCartFissureMore").checked;
var PkCartDefectOne = document.getElementById("PkCartDefectOne").checked;
var PkCartDefectMore = document.getElementById("PkCartDefectMore").checked;
var PkEdemaSub = document.getElementById("PkEdemaSub").checked;
var PkEdemaCont = document.getElementById("PkEdemaCont").checked;
var PkEdemaDif = document.getElementById("PkEdemaDif").checked;

var PkCartDescr = "";
var PkCartLoc = "";
var PkCartLesion = "";
var PkCartCP = "";

// Location determination
if (PkPatelCartM && PkPatelCartL && PkTrochCartM && PkTrochCartL) {
	PkCartLoc = "FP skloubení ";
} else if (PkPatelCartM && PkTrochCartM) {
	PkCartLoc = "mediálního FP skloubení ";
} else if (PkPatelCartL && PkTrochCartL) {
	PkCartLoc = "laterálního FP skloubení ";
} else if (PkPatelCartM && PkPatelCartL) {
	PkCartLoc = "patelly ";
} else if (PkTrochCartM && PkTrochCartL) {
	PkCartLoc = "trochley femuru ";
} else if (PkPatelCartM) {
	PkCartLoc = "mediální facety patelly ";
} else if (PkPatelCartL) {
	PkCartLoc = "laterální facety patelly ";
} else if (PkTrochCartM) {
	PkCartLoc = "mediální trochley femuru ";
} else if (PkTrochCartL) {
	PkCartLoc = "laterální trochley femuru ";
} else {
	PkCartLoc = "FP skloubení ";
}

// Lesion determination
	var lesionChecks = [
{ checked: PkCartFissureOne, text: "s fisurou" },
{ checked: PkCartFissureMore, text: "s fisurami" },
{ checked: PkCartDefectOne, text: "s defektem" },
{ checked: PkCartDefectMore, text: "s defekty" },
{ checked: PkEdemaSub, text: "se subchondrálním edémem" },
{ checked: PkEdemaCont, text: "s postkontuzním edémem" },
{ checked: PkEdemaDif, text: "s difuzním edémem" }
];

var checkedLesions = lesionChecks.filter(item => item.checked);
PkCartLesion = checkedLesions.map(item => item.text).join(' a ');

// Chondropathie determination
updateButtonTexts({
	'PkCartCHP': ['0', 'I', 'II', 'III', 'IV'],
});

var buttonPkCartCHP = document.getElementById("PkCartCHP").innerText;

// Chondropathie determination
if (buttonPkCartCHP === "IV") {
	PkCartDescr = "Defektní / chybějící chrupavka ";
	PkCartCP = "Destrukce chrupavek ";
} else if (buttonPkCartCHP === "III") {
	PkCartDescr = "Výrazné snížení chrupavky ";
	PkCartCP = "Pokročilá chondropatie ";
} else if (buttonPkCartCHP === "II") {
	PkCartDescr = "Nepravidelné snížení chrupavky ";
	PkCartCP = "Chondropatie ";
} else if (buttonPkCartCHP === "I") {
	PkCartDescr = "Nepravidelné lehké snížení chrupavky ";
	PkCartCP = "Mírná chondropatie ";
} else if (buttonPkCartCHP === "0" && (PkCartFissureOne || PkCartFissureMore || PkCartDefectOne || PkCartDefectMore)) {
	PkCartDescr = "Chrupavka ";
	PkCartCP = "Chrupavka ";
} else if (PkCartFissureOne || PkCartFissureMore || PkCartDefectOne || PkCartDefectMore) {
	PkCartDescr = "Chrupavka ";
	PkCartCP = "Chrupavka ";
} else {
	PkCartDescr = "";
	PkCartCP = "";
}


PkCartText = PkCartDescr + PkCartLoc + PkCartLesion;
PkCartRes = PkCartCP + PkCartLoc + PkCartLesion;

PkCartText = PkCartText.trim();
PkCartRes = PkCartRes.trim();

if (PkCartDescr || PkCartLoc || PkCartLesion) {
    PkCartText += ". ";
}

if (PkCartCP || PkCartLoc || PkCartLesion) {
    PkCartRes += ". ";
}

if ((!PkPatelCartM && !PkPatelCartL && !PkTrochCartM && !PkTrochCartL) && (!PkCartDescr) && (!PkCartLesion) ) {
		PkCartLoc = "";
		PkCartText = "FP chrupavky nesníženy bez patrné léze. ";
		PkCartRes = "";
	}


 if (checkboxFParthrosis.checked) {
        PkFParthrosisP = "Marginální osteofyty femoropatelárně. ";
        PkFParthrosisR = "FP artróza. ";
    } else {
        PkFParthrosisP = "";
        PkFParthrosisR = "";
    }


// Wiberg
if (PkWibergText === "0") {
PkWibergP = "Bez zvýšené tekutiny. "; 
PkWibergR = "";
} else if (PkWibergText === "I") {
 PkWibergP = "";
 PkWibergR = "";
} else if (PkWibergText === "II") {
 PkWibergP = "Patella Wiberg II. ";
 PkWibergR = "";
} else if (PkWibergText === "III") {
 PkWibergP = "Patella Wiberg III. ";
 PkWibergR = "Dyplázie patelly.";
} else if (PkWibergText === "IV") {
 PkWibergP = "Patella Wiberg IV. ";
 PkWibergR = "Dyplázie patelly.";
}

 if (checkboxLuxacePatella.checked) {
        PkLuxaceP = "Ložiska edému kostní dřeně mediální hrany patelly a ventrolaterálního kondylu femuru. Vysoká SI v oblasti rozšířeného mediálního retinakula. ";
        PkLuxaceR = "St.p. laterální luxaci patelly a odpovídajícím postkontuzním edémem a porušením mediálního retinakula. ";
    } else {
        PkLuxaceP = "";
        PkLuxaceR = "";
    }


 if (checkboxplica.checked) {
        PkPlicaP = "Zesílená mediální plica v kontaktu s chrupavkou patelly. ";
        PkPlicaR = "Susp. plica syndrom. ";
    } else {
        PkPlicaP = "";
        PkPlicaR = "";
    }
	
 if (checkboxjumper.checked) {
        PkJumperP = "Zvýšená SI prox. úponu patelární šlachy a okolních měkkých tkání. ";
        PkJumperR = "Edém prox. úponu patelární šlachy a okolí obrazu skokanského kolena. ";
    } else {
        PkJumperP = "";
        PkJumperR = "";
    }	

 if (checkboxOsgood.checked) {
        PkOsgoodP = "Fragmentace tibiální tuberozity, zvýšená SI edém patelární šlachy a okolí. ";
        PkOsgoodR = "M. Osgood-Schlatter. ";
    } else {
        PkOsgoodP = "";
        PkOsgoodR = "";
    }

 if (checkboxBipartita.checked) {
        PkBipartitaP = "Oddělena horní laterální hrana patelly. ";
        PkBipartitaR = "Patella bipartita. ";
    } else {
        PkBipartitaP = "";
        PkBipartitaR = "";
    }		

const FPjointOther = document.getElementById("FPjointOther").value;

let codeForMkFem = `
// mediální kompartment new

var MkFemCondFrS = document.getElementById("MkFemCondFrS").checked;
var MkFemCondFrL = document.getElementById("MkFemCondFrL").checked;
var MkFemCondFisOne = document.getElementById("MkFemCondFisOne").checked;
var MkFemCondFisMore = document.getElementById("MkFemCondFisMore").checked;
var MkFemCondDefOne = document.getElementById("MkFemCondDefOne").checked;
var MkFemCondDefMore = document.getElementById("MkFemCondDefMore").checked;
var MkFemCondEdemaSub = document.getElementById("MkFemCondEdemaSub").checked;
var MkFemCondEdemaCont = document.getElementById("MkFemCondEdemaCont").checked;
var MkFemCondEdemaDif = document.getElementById("MkFemCondEdemaDif").checked;
var MkFemCondOCDII = document.getElementById("MkFemOCDII").checked;
var MkFemCondOCDIII = document.getElementById("MkFemOCDIII").checked;
var MkFemCondOCDIV = document.getElementById("MkFemCondOCDIV").checked;

var descriptionsMkFemCondText = [];
var descriptionsMkFemCondRES = [];

updateButtonTexts({
	'MkFemCondCHP': ['0', 'I', 'II', 'III', 'IV'],
});

var buttonMkFemCondCHP = document.getElementById("MkFemCondCHP").innerText;

if (buttonMkFemCondCHP === "IV") {
	descriptionsMkFemCondText.push("s defektní / chybějící chrupavkou");
	descriptionsMkFemCondRES.push("s destrukcí chrupavky");
} else if (buttonMkFemCondCHP === "III") {
	descriptionsMkFemCondText.push("s výrazně sníženou chrupavkou");
	descriptionsMkFemCondRES.push("s pokročilou chondropatií");
} else if (buttonMkFemCondCHP === "II") {
	descriptionsMkFemCondText.push("s nepravidelným snížením chrupavky");
	descriptionsMkFemCondRES.push("s chondropatií");
} else if (buttonMkFemCondCHP === "I") {
	descriptionsMkFemCondText.push("s lehkým snížením chrupavky");
	descriptionsMkFemCondRES.push("s mírnou chondropatií");
}

if (MkFemCondFrS) {
	descriptionsMkFemCondText.push("s T2W hyposignální linií subchondrálně s perifokálním edémem");
	descriptionsMkFemCondRES.push("se subchondrální frakturou");
}
if (MkFemCondFrL) {
	descriptionsMkFemCondText.push("s porušením kortikalis v zátěžové zóně při jejím prolomení");
	descriptionsMkFemCondRES.push("s osteochondrální frakturou");
}

if (MkFemCondOCDII) {
	descriptionsMkFemCondText.push("s osteochondrální lézí, která není zcela ohraničena");
	descriptionsMkFemCondRES.push("s osteochondrální lézí bez ohraničení");
}
if (MkFemCondOCDIII) {
	descriptionsMkFemCondText.push("s osteochondrální lézí, která je zcela ohraničena, ale fragment in situ");
	descriptionsMkFemCondRES.push("s ohraničenou osteochondrální lézí bez fragmentace");
}
if (MkFemCondOCDIV) {
	descriptionsMkFemCondText.push("s osteochondrálním defektem po uvolnění fragmentu");
	descriptionsMkFemCondRES.push("s osteochondrálním defektem po uvolnění fragmentu");
}

if (MkFemCondFisOne) {
	descriptionsMkFemCondText.push("s fisurou chrupavky");
	descriptionsMkFemCondRES.push("s fisurou chrupavky");
}
if (MkFemCondFisMore) {
	descriptionsMkFemCondText.push("s fisurami chrupavky");
	descriptionsMkFemCondRES.push("s fisurami chrupavky");
}

if (MkFemCondDefOne) {
	descriptionsMkFemCondText.push("s defektem chrupavky");
	descriptionsMkFemCondRES.push("s defektem chrupavky");
}
if (MkFemCondDefMore) {
	descriptionsMkFemCondText.push("s defektem chrupavky");
	descriptionsMkFemCondRES.push("s defektem chrupavky");
}

if (MkFemCondEdemaSub) {
	descriptionsMkFemCondText.push("se subchondrálním edémem");
	descriptionsMkFemCondRES.push("se subchondrálním edémem");
}

if (MkFemCondEdemaCont) {
        descriptionsMkFemCondText.push("s fokálním okrskem edému");
        descriptionsMkFemCondRES.push("s postkontuzním edémem");
}

if (MkFemCondEdemaDif) {
	descriptionsMkFemCondText.push("s difuzním edémem kostní dřeně");
	descriptionsMkFemCondRES.push("s difuzním edémem kostní dřeně");
}


var MkFemCondText = '';
if (descriptionsMkFemCondText.length > 1) {
	MkFemCondText = "Mediální kondyl femuru " + descriptionsMkFemCondText.slice(0, -1).join(", ") + " a " + descriptionsMkFemCondText.slice(-1) + ". ";
} else {
	MkFemCondText = descriptionsMkFemCondText.length ? "Mediální kondyl femuru " + descriptionsMkFemCondText[0] + ". " : "";
}

var MkFemCondRES = '';
if (descriptionsMkFemCondText.length > 1) {
	MkFemCondRES = "Mediální kondyl femuru " + descriptionsMkFemCondRES.slice(0, -1).join(", ") + " a " + descriptionsMkFemCondRES.slice(-1) + ". ";
} else {
	MkFemCondRES = descriptionsMkFemCondRES.length ? "Mediální kondyl femuru " + descriptionsMkFemCondRES[0] + ". " : "";
}


`;

let codeForMkTib = codeForMkFem.replace(/MkFem/g, 'MkTib').replace(/kondyl femuru/g, 'plato tibie');
let codeForLkFem = codeForMkFem.replace(/MkFem/g, 'LkFem').replace(/Mediální/g, 'Laterální');
let codeForLkTib = codeForMkFem.replace(/MkFem/g, 'LkTib').replace(/kondyl femuru/g, 'plato tibie').replace(/Mediální/g, 'Laterální');
eval(codeForMkFem);
eval(codeForMkTib);
eval(codeForLkFem);
eval(codeForLkTib);


// Mk chondropatie

var isMkFemChpChecked = buttonMkFemCondCHP !== "0"; // any chondropathy checked
var isMkFemOtherConditionsNotChecked = !MkFemCondFrS && !MkFemCondFrL && !MkFemCondOCDII && !MkFemCondOCDIII && !MkFemCondOCDIV && !MkFemCondEdemaCont && !MkFemCondEdemaDif; // fracture / OCD not checked
var isMkTibChpChecked = buttonMkTibCondCHP !== "0";
var isMkTibOtherConditionsNotChecked = !MkTibCondFrS && !MkTibCondFrL && !MkTibCondOCDII && !MkTibCondOCDIII && !MkTibCondOCDIV && !MkTibCondEdemaCont && !MkTibCondEdemaDif;
var isMkAnySubEdema = MkFemCondEdemaSub && MkTibCondEdemaSub;
var isMkFissureDefect = MkFemCondFisOne || MkFemCondFisMore || MkFemCondDefOne || MkFemCondDefMore || MkTibCondFisOne || MkTibCondFisMore || MkTibCondDefOne || MkTibCondDefMore;

if ((isMkFemChpChecked && isMkFemOtherConditionsNotChecked) && (isMkTibChpChecked && isMkTibOtherConditionsNotChecked)) {
    if (buttonMkFemCondCHP === "IV" || buttonMkTibCondCHP === "IV") {
        MkFemCondRES = "Mediální kompartment s destrukcí chrupavek"; MkTibCondRES = "";
    } else if (buttonMkFemCondCHP === "III" || buttonMkTibCondCHP === "III") {
        MkFemCondRES = "Mediální kompartment s pokročilou chondropatií"; MkTibCondRES = "";
    } else if (buttonMkFemCondCHP === "II" || buttonMkTibCondCHP === "II") {
        MkFemCondRES = "Mediální kompartment s chondropatií"; MkTibCondRES = "";
    } else if (buttonMkFemCondCHP === "I" || buttonMkTibCondCHP === "I") {
        MkFemCondRES = "Mediální kompartment s mírnou chondropatií"; MkTibCondRES = "";
    }
    
    if (isMkAnySubEdema) {
        MkFemCondRES += " a subchondrálním edémem";
    } else if (MkFemCondEdemaSub) {
		MkFemCondRES += " a subchondrálním edémem kondylu femuru";
	} else if (MkTibCondEdemaSub) {
		MkFemCondRES += " a subchondrálním edémem plata tibie";	
	}
		
    MkFemCondRES += ". ";
}

if (!isMkFemChpChecked && isMkFemOtherConditionsNotChecked && !isMkTibChpChecked && isMkTibOtherConditionsNotChecked && !isMkFissureDefect) {
	MkFemCondText = "Chrupavky mediálního kompartmentu bez výraznější patologie. "; MkTibCondT = "";
}

// edem kostní dřeně



// Lk chondropatie

var isLkFemChpChecked = buttonLkFemCondCHP !== "0"; // any chondropathy checked
var isLkFemOtherConditionsNotChecked = !LkFemCondFrS && !LkFemCondFrL && !LkFemCondOCDII && !LkFemCondOCDIII && !LkFemCondOCDIV && !LkFemCondEdemaCont && !LkFemCondEdemaDif; // fracture / OCD not checked
var isLkTibChpChecked = buttonLkTibCondCHP !== "0";
var isLkTibOtherConditionsNotChecked = !LkTibCondFrS && !LkTibCondFrL && !LkTibCondOCDII && !LkTibCondOCDIII && !LkTibCondOCDIV && !LkTibCondEdemaCont && !LkTibCondEdemaDif;
var isLkAnySubEdema = LkFemCondEdemaSub && LkTibCondEdemaSub;
var isLkFissureDefect = LkFemCondFisOne || LkFemCondFisMore || LkFemCondDefOne || LkFemCondDefMore || LkTibCondFisOne || LkTibCondFisMore || LkTibCondDefOne || LkTibCondDefMore;

if ((isLkFemChpChecked && isLkFemOtherConditionsNotChecked) && (isLkTibChpChecked && isLkTibOtherConditionsNotChecked)) {
    if (buttonLkFemCondCHP === "IV" || buttonLkTibCondCHP === "IV") {
        LkFemCondRES = "Laterální kompartment s destrukcí chrupavek"; LkTibCondRES = "";
    } else if (buttonLkFemCondCHP === "III" || buttonLkTibCondCHP === "III") {
        LkFemCondRES = "Laterální kompartment s pokročilou chondropatií"; LkTibCondRES = "";
    } else if (buttonLkFemCondCHP === "II" || buttonLkTibCondCHP === "II") {
        LkFemCondRES = "Laterální kompartment s chondropatií"; LkTibCondRES = "";
    } else if (buttonLkFemCondCHP === "I" || buttonLkTibCondCHP === "I") {
        LkFemCondRES = "Laterální kompartment s mírnou chondropatií"; LkTibCondRES = "";
    }
	
    if (isLkAnySubEdema) {
        LkFemCondRES += " a subchondrálním edémem";
    } else if (LkFemCondEdemaSub) {
		LkFemCondRES += " a subchondrálním edémem kondylu femuru";
	} else if (LkTibCondEdemaSub) {
		LkFemCondRES += " a subchondrálním edémem plata tibie";	
	}

    LkFemCondRES += ". ";
}

if (!isLkFemChpChecked && isLkFemOtherConditionsNotChecked && !isLkTibChpChecked && isLkTibOtherConditionsNotChecked && !isLkFissureDefect) {
	LkFemCondText = "Chrupavky laterálního kompartmentu bez výraznější patologie. "; LkTibCondT = "";
}

// Mk meniskus

if (MkMenLeze === "") {
MkMenLezeP = "s vysokou SI v PD FS "; 
MkMenLezeR = "s rupturou"; 
} else if (MkMenLeze === "hor") {
 MkMenLezeP = "s horizontální linií vysoké SI ";
 MkMenLezeR = "s horizontální rupturou ";
} else if (MkMenLeze === "rad") {
 MkMenLezeP = "s radiální linií vysoké SI ";
 MkMenLezeR = "s radiální rupturou ";
} else if (MkMenLeze === "long") {
 MkMenLezeP = "s longitudinální linií vysoké SI ";
 MkMenLezeR = "s longitudinální rupturou ";
} else if (MkMenLeze === "koml") {
 MkMenLezeP = "s tvarovou defigurací, porušením kontinuity, vícečetnými liniemi či okrsky tekutiny ";
 MkMenLezeR = "s komplexní rupturou ";
} else if (MkMenLeze === "BH") {
 MkMenLezeP = "s odtržením vnitřní části a dislokací protilehle ";
 MkMenLezeR = "s komplexní rupturou typu ucho od koše ";
} else if (MkMenLeze === "PB") {
 MkMenLezeP = "s odtržením a dislokací své části ";
 MkMenLezeR = "s komplexní rupturou typu papouščí zobák ";
} else if (MkMenLeze === "destr") {
 MkMenLezeP = "s výraznou defigurací a destrukcí";
 MkMenLezeR = "je z větší části destruován";
}

if (MkMenLokace === "") {
MkMenLokaceP = ""; 
MkMenLokaceR = ""; 
} else if (MkMenLokace === "ZU") {
 MkMenLokaceP = "v zadním úponu";
 MkMenLokaceR = "v zadním úponu";
} else if (MkMenLokace === "ZR") {
 MkMenLokaceP = "v zadním rohu";
 MkMenLokaceR = "v zadním rohu";
} else if (MkMenLokace === "ZP") {
 MkMenLokaceP = "v zadní polovině";
 MkMenLokaceR = "v zadní polovině";
} else if (MkMenLokace === "TE") {
 MkMenLokaceP = "ve střední části";
 MkMenLokaceR = "ve střední části";
} else if (MkMenLokace === "PP") {
 MkMenLokaceP = "v přední polovině";
 MkMenLokaceR = "v přední polovině";
} else if (MkMenLokace === "PR") {
 MkMenLokaceP = "v předním rohu";
 MkMenLokaceR = "v předním rohu";
} else if (MkMenLokace === "PU") {
 MkMenLokaceP = "v předním úponu";
 MkMenLokaceR = "v předním úponu";
}

if (checkboxMkMenCyst.checked) {
        MkMenCystP = " Parameniskální cysta. ";
        MkMenCystR = " a s parameniskální cystou";
    } else {
        MkMenCystP = "";
        MkMenCystR = "";
    }

if (MkMenMEText === "bez operace") {
MkMenMETextP = ""; 
MkMenMETextR = ""; 
} else if (MkMenMEText === "ME subtot.") {
 MkMenMETextP = " redukovaného objemu po menisektomii, ";
 MkMenMETextR = " redukovaný po menisektomii, ";
} else if (MkMenMEText === "ME zadní") {
 MkMenMETextP = " redukovaného objemu zadního rohu po parc. menisektomii, ";
 MkMenMETextR = " po parc. menisektomii zadního rohu, ";
} else if (MkMenMEText === "ME přední") {
 MkMenMETextP = " redukovaného objemu předního rohu po parc. menisektomii, ";
 MkMenMETextR = " po parc. menisektomii předního rohu, ";
}

if (MkMenText === "Meniskus OK" && MkMenMEText === "bez operace") {
 MkMenP = "Mediální meniskus má normální tvar, velikost a uložení."; 
 MkMenR = ""; 
} else if (MkMenText === "Meniskus OK" && MkMenMEText !== "bez operace") {
 MkMenP = "Mediální meniskus" + MkMenMETextP + ".";
 MkMenR = "Mediální meniskus" + MkMenMETextR + ".";
} else if (MkMenText === "degenerace") {
 MkMenP = "Mediální meniskus" + MkMenMETextP + " " + MkMenLezeP + " " + MkMenLokaceP + " bez kontaktu s artikulární plochou." + MkMenCystP;
 MkMenR = "";
} else if (MkMenText === "ruptura") {
 if (MkMenLeze === "BH" || MkMenLeze === "PB" || MkMenLeze === "destr") {
    MkMenP = "Mediální meniskus " + MkMenMETextP + MkMenLezeP + "." + MkMenCystP;
    MkMenR = "Mediální meniskus " + MkMenMETextR + MkMenLezeR + MkMenCystR + ".";
 } else {
    MkMenP = "Mediální meniskus " + MkMenMETextP + MkMenLezeP + " " + MkMenLokaceP + " v kontaktu s artikulární plochou." + MkMenCystP;
    MkMenR = "Mediální meniskus " + MkMenMETextR + MkMenLezeR + " " + MkMenLokaceR + MkMenCystR + ".";
 }
}



// laterální kompartment


if (LkMenLeze === "") {
LkMenLezeP = "s vysokou SI v PD FS "; 
LkMenLezeR = "s rupturou"; 
} else if (LkMenLeze === "hor") {
 LkMenLezeP = "s horizontální linií vysoké SI ";
 LkMenLezeR = "s horizontální rupturou ";
} else if (LkMenLeze === "rad") {
 LkMenLezeP = "s radiální linií vysoké SI ";
 LkMenLezeR = "s radiální rupturou ";
} else if (LkMenLeze === "long") {
 LkMenLezeP = "s longitudinální linií vysoké SI ";
 LkMenLezeR = "s longitudinální rupturou ";
} else if (LkMenLeze === "koml") {
 LkMenLezeP = "s tvarovou defigurací, porušením kontinuity, vícečetnými liniemi či okrsky tekutiny ";
 LkMenLezeR = "s komplexní rupturou ";
} else if (LkMenLeze === "BH") {
 LkMenLezeP = "s odtržením vnitřní části a dislokací protilehle ";
 LkMenLezeR = "s komplexní rupturou typu ucho od koše ";
} else if (LkMenLeze === "PB") {
 LkMenLezeP = "s odtržením a dislokací své části ";
 LkMenLezeR = "s komplexní rupturou typu papouščí zobák ";
} else if (LkMenLeze === "destr") {
 LkMenLezeP = "s výraznou defigurací / destrukcí";
 LkMenLezeR = "je z větší části destruován";
}

if (LkMenLokace === "") {
LkMenLokaceP = ""; 
LkMenLokaceR = ""; 
} else if (LkMenLokace === "ZU") {
 LkMenLokaceP = "v zadním úponu";
 LkMenLokaceR = "v zadním úponu";
} else if (LkMenLokace === "ZR") {
 LkMenLokaceP = "v zadním rohu";
 LkMenLokaceR = "v zadním rohu";
} else if (LkMenLokace === "ZP") {
 LkMenLokaceP = "v zadní polovině";
 LkMenLokaceR = "v zadní polovině";
} else if (LkMenLokace === "TE") {
 LkMenLokaceP = "ve střední části";
 LkMenLokaceR = "ve střední části";
} else if (LkMenLokace === "PP") {
 LkMenLokaceP = "v přední polovině";
 LkMenLokaceR = "v přední polovině";
} else if (LkMenLokace === "PR") {
 LkMenLokaceP = "v předním rohu";
 LkMenLokaceR = "v předním rohu";
} else if (LkMenLokace === "PU") {
 LkMenLokaceP = "v předním úponu";
 LkMenLokaceR = "v předním úponu";
}

if (checkboxLkMenCyst.checked) {
        LkMenCystP = " Parameniskální cysta. ";
        LkMenCystR = " a s parameniskální cystou";
    } else {
        LkMenCystP = "";
        LkMenCystR = "";
    }

if (LkMenMEText === "bez operace") {
LkMenMETextP = ""; 
LkMenMETextR = ""; 
} else if (LkMenMEText === "ME subtot.") {
 LkMenMETextP = " redukovaného objemu po menisektomii, ";
 LkMenMETextR = " redukovaný po menisektomii, ";
} else if (LkMenMEText === "ME zadní") {
 LkMenMETextP = " redukovaného objemu zadního rohu po parc. menisektomii, ";
 LkMenMETextR = " po parc. menisektomii zadního rohu, ";
} else if (LkMenMEText === "ME přední") {
 LkMenMETextP = " redukovaného objemu předního rohu po parc. menisektomii, ";
 LkMenMETextR = " po parc. menisektomii předního rohu, ";
}

if (LkMenText === "Meniskus OK" && LkMenMEText === "bez operace") {
 LkMenP = "Laterální meniskus má normální tvar, velikost a uložení."; 
 LkMenR = ""; 
} else if (LkMenText === "Meniskus OK" && LkMenMEText !== "bez operace") {
 LkMenP = "Laterální meniskus" + LkMenMETextP + ".";
 LkMenR = "Laterální meniskus" + LkMenMETextR + ".";
} else if (LkMenText === "degenerace") {
 LkMenP = "Laterální meniskus" + LkMenMETextP + " " + LkMenLezeP + " " + LkMenLokaceP + " bez kontaktu s artikulární plochou." + LkMenCystP;
 LkMenR = "";
} else if (LkMenText === "ruptura") {
 if (LkMenLeze === "BH" || LkMenLeze === "PB" || LkMenLeze === "destr") {
    LkMenP = "Laterální meniskus " + LkMenMETextP + LkMenLezeP + "." + LkMenCystP;
    LkMenR = "Laterální meniskus " + LkMenMETextR + LkMenLezeR + LkMenCystR + ".";
 } else {
    LkMenP = "Laterální meniskus " + LkMenMETextP + LkMenLezeP + " " + LkMenLokaceP + " v kontaktu s artikulární plochou." + LkMenCystP;
    LkMenR = "Laterální meniskus " + LkMenMETextR + LkMenLezeR + " " + LkMenLokaceR + LkMenCystR + ".";
 }
}

// artróza

var MkFemCondArt = document.getElementById("MkFemCondArt").checked;
var MkTibCondArt = document.getElementById("MkTibCondArt").checked;
var LkFemCondArt = document.getElementById("LkFemCondArt").checked;
var LkTibCondArt = document.getElementById("LkTibCondArt").checked;

GonarthrosisMkP = ""; GonarthrosisLkP = ""; GonarthrosisR = "";

if (MkFemCondArt || MkTibCondArt) {
  GonarthrosisMkP = "Marginální osteofyty. ";
  GonarthrosisR = "Gonartróza s převahou mediálně. ";
}
if (LkFemCondArt || LkTibCondArt) {
  GonarthrosisLkP = "Marginální osteofyty. ";
  GonarthrosisR = "Gonartróza s převahou laterálně. ";
}
if ((MkFemCondArt || MkTibCondArt) && (LkFemCondArt || LkTibCondArt)) {
  GonarthrosisR = "Gonartróza. ";
}
	

// vazy

if (LCMText === "LCM") {
 LCMP = "Mediální kolaterální vaz je nízkého signálu bez porušení kontinuity, bez edému okolí."; 
 LCMR = ""; 
} else if (LCMText === "ruptura I") {
 LCMP = "Mediální kolaterální vaz má zachovalou kontinuitu, přítomen edém okolí.";
 LCMR = "Mediální kolaterální vaz s distenzí / low-grade parc. lézí.";
} else if (LCMText === "ruptura II") {
 LCMP = "Mediální kolaterální vaz je nehomogenní, s vyšší SI, kontinuita parc. zachována, přítomen edém okolí.";
 LCMR = "Mediální kolaterální vaz s parciální rupturou.";
} else if (LCMText === "ruptura III") {
 LCMP = "Mediální kolaterální vaz má přerušenou kontinuitu, přítomen edém okolí.";
 LCMR = "Mediální kolaterální vaz s high-grade rupturou.";
} 



if (LCLText === "LCL") {
 LCLP = "Laterální kolaterální vaz je nízkého signálu bez porušení kontinuity, bez edému okolí."; 
 LCLR = ""; 
} else if (LCLText === "ruptura I") {
 LCLP = "Laterální kolaterální vaz má zachovalou kontinuitu, přítomen edém okolí.";
 LCLR = "Laterální kolaterální vaz s distenzí / low-grade parc. lézí.";
} else if (LCLText === "ruptura II") {
 LCLP = "Laterální kolaterální vaz je nehomogenní, s vyšší SI, kontinuita parc. zachována, přítomen edém okolí.";
 LCLR = "Laterální kolaterální vaz s parciální rupturou. ";
} else if (LCLText === "ruptura III") {
 LCLP = "Laterální kolaterální vaz má přerušenou kontinuitu, přítomen edém okolí.";
 LCLR = "Laterální kolaterální vaz s high-grade rupturou.";
} 

// LCA
let LigLCAText = "Přední zkřížený vaz je nízkého signálu, strmého průběhu, bez porušení kontinuity. ";
let LigLCARes = "";

const LigLCAI = document.getElementById("LigLCAI").checked;
const LigLCAII = document.getElementById("LigLCAII").checked;
const LigLCAIII = document.getElementById("LigLCAIII").checked;
const LigLCAEdema = document.getElementById("LigLCAEdema").checked;
const LigLCAPlasticOk = document.getElementById("LigLCAPlasticOk").checked;
const LigLCAPlasticPr = document.getElementById("LigLCAPlasticPr").checked;
const LigLCAPlasticR = document.getElementById("LigLCAPlasticR").checked;
const LigLCADegen = document.getElementById("LigLCADegen").checked;
const LigLCACyst = document.getElementById("LigLCACyst").checked;
const LigLCAOther = document.getElementById("LigLCAOther").value;

if (LigLCAIII) {
	LigLCAText = "Přední zkřížený vaz má výrazně až totálně porušenou kontinuitu, rozvlákněn. ";
	LigLCARes = "Přední zkřížený vaz s high-grade rupturou ";
}
if (LigLCAII) {
	LigLCAText = "Přední zkřížený vaz má částečně porušenou kontinuitu, vysokou SI, část zachována. ";
	LigLCARes = "Přední zkřížený vaz s parciální rupturou ";
}
if (LigLCAI) {
	LigLCAText = "Přední zkřížený vaz má zachovalou kontinuitu, ale rozšířen či s vyšší SI, event. nezachován strmý průběh. ";
	LigLCARes = "Přední zkřížený vaz v.s. s distenzí / low-grade parc. lézí ";
}
if (LigLCAEdema) {
	LigLCAText += "Vysoká SI v PD FS v kostní dřeni laterálního kondylu femuru a dorzálních aspektů tibie. ";
	LigLCARes += "a s odpovídajícím postkontuzním edémem femuru a tibie. ";
}
if (LigLCAPlasticOk) {
	LigLCAText = "Náhrada předního zkříženého vazu je nízké SI, bez porušení kontinuity. ";
	LigLCARes = "St.p. plastice LCA bez zn. re-ruptury ";
}
if (LigLCAPlasticPr) {
	LigLCAText = "Náhrada předního zkříženého vazu je vyšší SI, část vláken se jeví porušena. ";
	LigLCARes = "St.p. plastice LCA se susp. parciální lézí ";
}
if (LigLCAPlasticR) {
	LigLCAText = "Náhrada předního zkříženého vazu je nehomogenní, rozvlákněna, s výrazně až úplně porušenou kontinuitou. ";
	LigLCARes = "St.p. plastice LCA s re-rupturou ";
}
if (LigLCADegen) {
	LigLCAText = "Přední zkřížený vaz vykazuje zvýšenou SI v T2W, je rozšířen, bez zjevné poruchy kontinuity. ";
	LigLCARes = "Přední zkřížený vaz s mukoidní degenerací. ";
}
if (LigLCACyst) {
	LigLCAText = "Přední zkřížený vaz s cystickou lézí, je rozšířen, bez zjevné poruchy kontinuity. ";
	LigLCARes = "Přední zkřížený vaz s gangliovou cystou. ";
}
if (LigLCACyst && LigLCADegen) {
	LigLCAText = "Přední zkřížený vaz s je rozšířen, s výrazněji zvýšenou SI intraligamentózně, bez zjevné poruchy kontinuitou. ";
	LigLCARes = "Přední zkřížený vaz s mukoidní degenerací nebo gangliovou cystou. ";
}
if (LigLCAOther !== "") {
	LigLCAText += LigLCAOther;
}

if (LigLCAText !== "") {
        LigLCAText += ". ";
    }
if (LigLCARes !== "") {
        LigLCARes += ". ";
    }

// LCP
let LigLCPText = "Zadní zkřížený vaz je nízkého signálu, bez porušení kontinuity. ";
let LigLCPRes = "";

const LigLCPI = document.getElementById("LigLCPI").checked;
const LigLCPII = document.getElementById("LigLCPII").checked;
const LigLCPIII = document.getElementById("LigLCPIII").checked;
const LigLCPEdema = document.getElementById("LigLCPEdema").checked;
const LigLCPDegen = document.getElementById("LigLCPDegen").checked;
const LigLCPCyst = document.getElementById("LigLCPCyst").checked;
const LigLCPOther = document.getElementById("LigLCPOther").value;

if (LigLCPIII) {
	LigLCPText = "Zadní zkřížený vaz má výrazně až totálně porušenou kontinuitu, rozvlákněn, s vysokou SI. ";
	LigLCPRes = "Zadní zkřížený vaz s high-grade rupturou ";
}
if (LigLCPII) {
	LigLCPText = "Zadní zkřížený vaz má částečně zachovalou kontinuitu, vysokou SI, část vláken porušena. ";
	LigLCPRes = "Zadní zkřížený vaz s parciální rupturou ";
}
if (LigLCPI) {
	LigLCPText = "Zadní zkřížený vaz má zachovalou kontinuitu, vyšší SI, rozšířen. ";
	LigLCPRes = "Zadní zkřížený vaz v.s. s low-grade parc. lézí ";
}
if (LigLCPEdema) {
	LigLCPText += "Vysoká SI v PD FS v kostní dřeni ventrálních kondylů femuru i plat tibie. ";
	LigLCPRes += "a s odpovídajím ventrálním postkontuzním edémem femuru a tibie. ";
}

if (LigLCPDegen) {
	LigLCPText = "Zadní zkřížený vaz vykazuje zvýšenou SI v T2W, je rozšířen, bez zjevné poruchy kontinuity. ";
	LigLCPRes = "Zadní zkřížený vaz s mukoidní degenerací. ";
}
if (LigLCPCyst) {
	LigLCPText = "Zadní zkřížený vaz s cystickou lézí, je rozšířen, bez zjevné poruchy kontinuity. ";
	LigLCPRes = "Zadní zkřížený vaz s gangliovou cystou. ";
}
if (LigLCPCyst && LigLCPDegen) {
	LigLCPText = "Zadní zkřížený vaz s je rozšířen, s výrazněji zvýšenou SI intraligamentózně, bez zjevné poruchy kontinuitou. ";
	LigLCPRes = "Zadní zkřížený vaz s mukoidní degenerací nebo gangliovou cystou. ";
}
if (LigLCPOther !== "") {
	LigLCPText += LigLCPOther;
}

if (LigLCPText !== "") {
        LigLCPText += ". ";
    }
if (LigLCPRes !== "") {
        LigLCPRes += ". ";
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
  if (text.length === 0) return ""; // prázdný text nech tak
  text = text[0].toUpperCase() + text.slice(1); // první písmeno velké
  if (!/[.!?]$/.test(text)) {  // pokud text nekončí . ! nebo ?
    text += ".";
  }
  return text;
}

const dalsiPopis = capitalizeAndDot(document.getElementById('dalsiPopis').value);
const dalsiZaver = capitalizeAndDot(document.getElementById('dalsiZaver').value);


// TEXTY


MRKneeNAMEText.value = Nadpis;

MRKneeINDText.value = indikace;

MRKneeSEKVText.value = "Koleno vyšetřeno v PDW FS, T1W, T2W.";


MRKneePOPText.value = 
PkNaplnP + " " + OstBakerP + " " + SynovitisP + " " + VolnaTeliskaP + "\n" + 
PkLuxaceP + " " + PkCartText + " " + PkFParthrosisP + " " + PkWibergP + " " + PkBipartitaP + " " + PkPlicaP + " " + PkJumperP + " " + PkOsgoodP + " " + FPjointOther + "\n" +
MkMenP + " " + MkFemCondText + " " + MkTibCondText + " " + GonarthrosisMkP + "\n" +
LkMenP + " " + LkFemCondText + " " + LkTibCondText + " " + GonarthrosisLkP + "\n" +
LigLCAText + "\n" + 
LigLCPText + "\n" +
LCMP + "\n" + 
LCLP + "\n" + 
dalsiPopis + "\n\n";

MRKneePOPText.value = MRKneePOPText.value.trim(); 
MRKneePOPText.value = MRKneePOPText.value.replace(/^\s+/gm, '');  // odstraní mezery na začátku řádek
MRKneePOPText.value = MRKneePOPText.value.replace(/^\s*[\r\n]/gm, '');  // odstraní prázdné řádky
MRKneePOPText.value = MRKneePOPText.value.split(/\r?\n/).filter(item => item.trim() !== '').join('\n');  // prázdné řádky
MRKneePOPText.value = MRKneePOPText.value.replace(/ ,/g, ',');  // smazat mezeru před čárkou
MRKneePOPText.value = MRKneePOPText.value.replace(/ \./g, '.'); // smazat mezeru před tečkou
MRKneePOPText.value = MRKneePOPText.value.replace(/\.{2,}/g, '.'); // více teček = jedna tečka
MRKneePOPText.value = MRKneePOPText.value.replace(/\,{2,}/g, ','); // více čárek = jedna čárka
MRKneePOPText.value = MRKneePOPText.value.replace(/,\./g, '.'); // odstraní čárku před tečkou
MRKneePOPText.value = MRKneePOPText.value.replace(/  +/g, ' '); // dvojmezery

function mergeMedialSentences() {
    const pattern = /Mediální kondyl femuru ([^.]+)\. Mediální plato tibie \1\./g;
    const replacement = "Mediální kondyl femuru i plato tibie $1.";
    MRKneePOPText.value = MRKneePOPText.value.replace(pattern, replacement);
}
mergeMedialSentences();

function mergeLateralSentences() {
    const pattern = /Laterální kondyl femuru ([^.]+)\. Laterální plato tibie \1\./g;
    const replacement = "Laterální kondyl femuru i plato tibie $1.";
    MRKneePOPText.value = MRKneePOPText.value.replace(pattern, replacement);
}
mergeLateralSentences();

MRKneeRESText.value = 
MkMenR + " " + MkFemCondRES + MkTibCondRES + "\n" +
LkMenR + " " + LkFemCondRES + LkTibCondRES + "\n" +
LigLCARes + "\n" + 
LigLCPRes + "\n" +
LCMR + "\n" + 
LCLR + "\n" +
PkCartRes + " " + PkLuxaceR + " " + PkWibergR + " " + PkBipartitaR + " " + PkPlicaR + " " + PkJumperR + " " + PkOsgoodR + "\n" +
PkNaplnR + " " + OstBakerR + " " + SynovitisR + " " + VolnaTeliskaR + "\n" +
GonarthrosisR + " " + PkFParthrosisR + "\n" +
dalsiZaver
; 

MRKneeRESText.value = MRKneeRESText.value.trim(); 
MRKneeRESText.value = MRKneeRESText.value.replace(/^\s+/gm, '');  // odstraní mezery na začátku řádek
MRKneeRESText.value = MRKneeRESText.value.replace(/^\s*[\r\n]/gm, '');  // odstraní prázdné řádky
MRKneeRESText.value = MRKneeRESText.value.split(/\r?\n/).filter(item => item.trim() !== '').join('\n');  // prázdné řádky
MRKneeRESText.value = MRKneeRESText.value.replace(/ ,/g, ',');  // smazat mezeru před čárkou
MRKneeRESText.value = MRKneeRESText.value.replace(/\s+\./g, '.'); // smazat mezeru před tečkou
MRKneeRESText.value = MRKneeRESText.value.replace(/\.{2,}/g, '.'); // více teček = jedna tečka
MRKneeRESText.value = MRKneeRESText.value.replace(/\,{2,}/g, ','); // více čárek = jedna čárka
MRKneeRESText.value = MRKneeRESText.value.replace(/,\./g, '.'); // odstraní čárku před tečkou
MRKneeRESText.value = MRKneeRESText.value.replace(/  +/g, ' '); // dvojmezery

if (MRKneeRESText.value.trim() === "") {
        MRKneeRESText.value = "Bez patrné signifikantní patologie.";
    }



document.getElementById("indikace").addEventListener("input", updateTexts);
}
updateTexts();	

