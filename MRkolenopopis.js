// PkNapln, PkPatelCHr, PkPatelCHrLat, PkFemurCHrMed, PkFemurCHrLat, PkWiberg, PkPkPlica, PkLuxace, MkFemurKondylEdem,MkFemurKondylOCD, MkFemurCHr, MkMen,MkTibieCHr, MkTibieKondylOCD, MkTibieKondylEdem

// předělat organizace slov v závěru: nejdřív RUPTURA, pak čeho.



var obecnetext = document.getElementById("obecnetext");
var PKtext = document.getElementById("PKtext");
var MKtext = document.getElementById("MKtext");
var LKtext = document.getElementById("LKtext");
var POPtext = document.getElementById("POPtext");
var RESText = document.getElementById("RESText");
var FINALText = document.getElementById("FINALText");



function updateTexts() {
	

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


//strana

if (StranaText === "jakého?") {
 Nadpis = "MR kolene"; 
} else if (StranaText === "PRAVÉHO") {
 Nadpis = "MR pravého kolene";
} else if (StranaText === "LEVÉHO") {
 Nadpis = "MR levého kolene";
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
 OstBakerR = "";
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
var PkCartCHPII = document.getElementById("PkCartCHPII").checked;
var PkCartCHPIII = document.getElementById("PkCartCHPIII").checked;
var PkCartCHPIV = document.getElementById("PkCartCHPIV").checked;

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
if (PkCartCHPIV) {
	PkCartDescr = "Prakticky chybějící chrupavka ";
	PkCartCP = "Pokročilá chondropatie ";
} else if (PkCartCHPIII) {
	PkCartDescr = "Výrazné snížení chrupavky ";
	PkCartCP = "Chondropatie ";
} else if (PkCartCHPII) {
	PkCartDescr = "Nepravidelné mírné snížení chrupavky ";
	PkCartCP = "Mírná chondropatie ";
} else if (PkCartFissureOne || PkCartFissureMore || PkCartDefectOne || PkCartDefectMore) {
	PkCartDescr = "Chrupavka ";
	PkCartCP = "Mírná chondropatie ";
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


let codeForMkFem = `
// mediální kompartment new

var MkFemCondFrS = document.getElementById("MkFemCondFrS").checked;
var MkFemCondFrL = document.getElementById("MkFemCondFrL").checked;
var MkFemCondCHPIV = document.getElementById("MkFemCondCHPIV").checked;
var MkFemCondCHPIII = document.getElementById("MkFemCondCHPIII").checked;
var MkFemCondCHPII = document.getElementById("MkFemCondCHPII").checked;
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

if (MkFemCondCHPIV) {
	descriptionsMkFemCondText.push("s prakticky chybějící chrupavkou");
	descriptionsMkFemCondRES.push("s pokročilou chondropatií");
}
if (MkFemCondCHPIII) {
	descriptionsMkFemCondText.push("s výrazným nepravidelným snížením chrupavky");
	descriptionsMkFemCondRES.push("s chondropatií");
}
if (MkFemCondCHPII) {
	descriptionsMkFemCondText.push("s mírným snížením chrupavky");
	descriptionsMkFemCondRES.push("s mírnou chondropatií");
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

var isMkFemChpChecked = MkFemCondCHPII || MkFemCondCHPIII || MkFemCondCHPIV; // any chondropathy checked
var isMkFemOtherConditionsNotChecked = !MkFemCondFrS && !MkFemCondFrL && !MkFemCondOCDII && !MkFemCondOCDIII && !MkFemCondOCDIV && !MkFemCondEdemaCont && !MkFemCondEdemaDif; // fracture / OCD not checked
var isMkTibChpChecked = MkTibCondCHPII || MkTibCondCHPIII || MkTibCondCHPIV;
var isMkTibOtherConditionsNotChecked = !MkTibCondFrS && !MkTibCondFrL && !MkTibCondOCDII && !MkTibCondOCDIII && !MkTibCondOCDIV && !MkTibCondEdemaCont && !MkTibCondEdemaDif;
var isMkAnySubEdema = MkFemCondEdemaSub && MkTibCondEdemaSub;

if ((isMkFemChpChecked && isMkFemOtherConditionsNotChecked) && (isMkTibChpChecked && isMkTibOtherConditionsNotChecked)) {
    if (MkFemCondCHPIV || MkTibCondCHPIV) {
        MkFemCondRES = "Mediální kompartment s pokročilou chondropatií"; MkTibCondRES = "";
    } else if (MkFemCondCHPIII || MkTibCondCHPIII) {
        MkFemCondRES = "Mediální kompartment s chondropatií"; MkTibCondRES = "";
    } else if (MkFemCondCHPII || MkTibCondCHPII) {
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



// Lk chondropatie

var isLkFemChpChecked = LkFemCondCHPII || LkFemCondCHPIII || LkFemCondCHPIV;
var isLkFemOtherConditionsNotChecked = !LkFemCondFrS && !LkFemCondFrL && !LkFemCondOCDII && !LkFemCondOCDIII && !LkFemCondOCDIV && !LkFemCondEdemaCont && !LkFemCondEdemaDif;
var isLkTibChpChecked = LkTibCondCHPII || LkTibCondCHPIII || LkTibCondCHPIV;
var isLkTibOtherConditionsNotChecked = !LkTibCondFrS && !LkTibCondFrL && !LkTibCondOCDII && !LkTibCondOCDIII && !LkTibCondOCDIV && !LkTibCondEdemaCont && !LkTibCondEdemaDif;
var isLkAnySubEdema = LkFemCondEdemaSub || LkTibCondEdemaSub;

if ((isLkFemChpChecked && isLkFemOtherConditionsNotChecked) && (isLkTibChpChecked && isLkTibOtherConditionsNotChecked)) {
    if (LkFemCondCHPIV || LkTibCondCHPIV) {
        LkFemCondRES = "Laterální kompartment s pokročilou chondropatií"; LkTibCondRES = "";
    } else if (LkFemCondCHPIII || LkTibCondCHPIII) {
        LkFemCondRES = "Laterální kompartment s chondropatií"; LkTibCondRES = "";
    } else if (LkFemCondCHPII || LkTibCondCHPII) {
        LkFemCondRES = "Laterální kompartment s mírnou chondropatií"; LkTibCondRES = "";
    }
	
    if (isLkAnySubEdema) {
        LkFemCondRES += " a subchondrálním edémem";
    } else if (LkFemCondEdemaSub) {
		LkFemCondRES += " a subchondrálním edémem kondylu femuru";
	} else if (MkTibCondEdemaSub) {
		LkFemCondRES += " a subchondrálním edémem plata tibie";	
	}

    LkFemCondRES += ". ";
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
 MkMenLezeP = "s tvarovou defigurací a liniemi vysoké SI ";
 MkMenLezeR = "s komplexní rupturou ";
} else if (MkMenLeze === "BH") {
 MkMenLezeP = "s odtržením vnitřní části a dislokací protilehle ";
 MkMenLezeR = "s komplexní rupturou typu ucho od koše ";
} else if (MkMenLeze === "PB") {
 MkMenLezeP = "s odtržením a dislokací své části ";
 MkMenLezeR = "s komplexní rupturou typu papouščí zobák ";
} else if (MkMenLeze === "destr") {
 MkMenLezeP = "s výraznou defigurací / destrukcí";
 MkMenLezeR = "je z větší části destruován";
}

if (MkMenLokace === "") {
MkMenLokaceP = ""; 
MkMenLokaceR = ""; 
} else if (MkMenLokace === "ZU") {
 MkMenLokaceP = "zadního úponu";
 MkMenLokaceR = "zadního úponu";
} else if (MkMenLokace === "ZR") {
 MkMenLokaceP = "zadního rohu";
 MkMenLokaceR = "zadního rohu";
} else if (MkMenLokace === "ZP") {
 MkMenLokaceP = "zadní poloviny";
 MkMenLokaceR = "v zadní polovině";
} else if (MkMenLokace === "TE") {
 MkMenLokaceP = "střední části";
 MkMenLokaceR = "střední části";
} else if (MkMenLokace === "PP") {
 MkMenLokaceP = "přední poloviny";
 MkMenLokaceR = "v přední polovině";
} else if (MkMenLokace === "PR") {
 MkMenLokaceP = "předního rohu";
 MkMenLokaceR = "předního rohu";
} else if (MkMenLokace === "PU") {
 MkMenLokaceP = "předního úponu";
 MkMenLokaceR = "předního úponu";
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
 LkMenLezeP = "s vícečetnými liniemi vysoké SI ";
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
 LkMenLokaceP = "zadního úponu";
 LkMenLokaceR = "zadního úponu";
} else if (LkMenLokace === "ZR") {
 LkMenLokaceP = "zadního rohu";
 LkMenLokaceR = "zadního rohu";
} else if (LkMenLokace === "ZP") {
 LkMenLokaceP = "zadní poloviny";
 LkMenLokaceR = "v zadní polovině";
} else if (LkMenLokace === "TE") {
 LkMenLokaceP = "střední části";
 LkMenLokaceR = "střední části";
} else if (LkMenLokace === "PP") {
 LkMenLokaceP = "přední poloviny";
 LkMenLokaceR = "v přední polovině";
} else if (LkMenLokace === "PR") {
 LkMenLokaceP = "předního rohu";
 LkMenLokaceR = "předního rohu";
} else if (LkMenLokace === "PU") {
 LkMenLokaceP = "předního úponu";
 LkMenLokaceR = "předního úponu";
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
 LCMR = "Mediální kolaterální vaz s distenzí.";
} else if (LCMText === "ruptura II") {
 LCMP = "Mediální kolaterální vaz je nehomogenní, s vyšší SI, kontinuita parc. zachována, přítomen edém okolí.";
 LCMR = "Mediální kolaterální vaz s parciální rupturou II.st.";
} else if (LCMText === "ruptura III") {
 LCMP = "Mediální kolaterální vaz má přerušenou kontinuitu, přítomen edém okolí.";
 LCMR = "Mediální kolaterální vaz s rupturou III.st.";
} 



if (LCLText === "LCL") {
 LCLP = "Laterální kolaterální vaz je nízkého signálu bez porušení kontinuity, bez edému okolí."; 
 LCLR = ""; 
} else if (LCLText === "ruptura I") {
 LCLP = "Laterální kolaterální vaz má zachovalou kontinuitu, přítomen edém okolí.";
 LCLR = "Laterální kolaterální vaz s distenzí.";
} else if (LCLText === "ruptura II") {
 LCLP = "Laterální kolaterální vaz je nehomogenní, s vyšší SI, kontinuita parc. zachována, přítomen edém okolí.";
 LCLR = "Laterální kolaterální vaz s parciální rupturou II.st.";
} else if (LCLText === "ruptura III") {
 LCLP = "Laterální kolaterální vaz má přerušenou kontinuitu, přítomen edém okolí.";
 LCLR = "Laterální kolaterální vaz s rupturou III.st.";
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
	LigLCAText = "Přední zkřížený vaz má výrazně až totálně porušenou kontinuitu, rozvlákněn, s vysokou SI. ";
	LigLCARes = "Přední zkřížený vaz s high-grade rupturou ";
}
if (LigLCAII) {
	LigLCAText = "Přední zkřížený vaz má částečně zachovalou kontinuitu, vysokou SI, část vláken porušena. ";
	LigLCARes = "Přední zkřížený vaz s parciální rupturou ";
}
if (LigLCAI) {
	LigLCAText = "Přední zkřížený vaz má zachovalou kontinuitu, vyšší SI, ne zcela strmý průběh. ";
	LigLCARes = "Přední zkřížený vaz v.s. s low-grade parc. lézí ";
}
if (LigLCAEdema) {
	LigLCAText += "Vysoká SI v PD FS v kostní dřeni laterálního kondylu femuru a dorzálních aspektů tibie. ";
	LigLCARes += "a s odpovídajím postkontuzním edémem femuru a tibie. ";
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




POPText.value = 
PkNaplnP + " " + OstBakerP + " " + SynovitisP + " " + VolnaTeliskaP + "\n" + 
PkLuxaceP + " " + PkCartText + " " + PkFParthrosisP + " " + PkWibergP + " " + PkBipartitaP + " " + PkPlicaP + " " + PkJumperP + " " + PkOsgoodP + " " + "\n" +
MkMenP + " " + MkFemCondText + " " + MkTibCondText + " " + GonarthrosisMkP + "\n" +
LkMenP + " " + LkFemCondText + " " + LkTibCondText + " " + GonarthrosisLkP + "\n" +
LigLCAText + "\n" + 
LigLCPText + "\n" +
LCMP + "\n" + 
LCLP + "\n\n";

POPText.value = POPText.value.trim(); 
POPText.value = POPText.value.replace(/^\s+/gm, '');  // odstraní mezery na začátku řádek
POPText.value = POPText.value.replace(/^\s*[\r\n]/gm, '');  // odstraní prázdné řádky
POPText.value = POPText.value.split(/\r?\n/).filter(item => item.trim() !== '').join('\n');  // prázdné řádky
POPText.value = POPText.value.replace(/ ,/g, ',');  // smazat mezeru před čárkou
POPText.value = POPText.value.replace(/ \./g, '.'); // smazat mezeru před tečkou
POPText.value = POPText.value.replace(/\.{2,}/g, '.'); // více teček = jedna tečka
POPText.value = POPText.value.replace(/\,{2,}/g, ','); // více čárek = jedna čárka
POPText.value = POPText.value.replace(/,\./g, '.'); // odstraní čárku před tečkou
POPText.value = POPText.value.replace(/  +/g, ' '); // dvojmezery

RESText.value = 
"Závěr: " + "\n" +
MkMenR + " " + MkFemCondRES + MkTibCondRES + "\n" +
LkMenR + " " + LkFemCondRES + LkTibCondRES + "\n" +
LigLCARes + "\n" + 
LigLCPRes + "\n" +
LCMR + "\n" + 
LCLR + "\n" +
PkCartRes + " " + PkLuxaceR + " " + PkWibergR + " " + PkBipartitaR + " " + PkPlicaR + " " + PkJumperR + " " + PkOsgoodR + "\n" +
PkNaplnR + " " + OstBakerR + " " + SynovitisR + " " + VolnaTeliskaR + "\n" +
GonarthrosisR + " " + PkFParthrosisR; 

RESText.value = RESText.value.trim(); 
RESText.value = RESText.value.replace(/^\s+/gm, '');  // odstraní mezery na začátku řádek
RESText.value = RESText.value.replace(/^\s*[\r\n]/gm, '');  // odstraní prázdné řádky
RESText.value = RESText.value.split(/\r?\n/).filter(item => item.trim() !== '').join('\n');  // prázdné řádky
RESText.value = RESText.value.replace(/ ,/g, ',');  // smazat mezeru před čárkou
RESText.value = RESText.value.replace(/\s+\./g, '.'); // smazat mezeru před tečkou
RESText.value = RESText.value.replace(/\.{2,}/g, '.'); // více teček = jedna tečka
RESText.value = RESText.value.replace(/\,{2,}/g, ','); // více čárek = jedna čárka
RESText.value = RESText.value.replace(/,\./g, '.'); // odstraní čárku před tečkou
RESText.value = RESText.value.replace(/  +/g, ' '); // dvojmezery

FINALText.value =
Nadpis + "\n\n" +
"Indikace: " + indikace + "\n\n" + 
"Sekvence: Koleno vyšetřeno v cor, tra, sag PDW FS, cor T1W, sag T2W." + "\n\n" +
POPText.value + "\n\n" + 
RESText.value;

document.getElementById("indikace").addEventListener("input", updateTexts);
}
updateTexts();	

function updateTextAndCycleText(event, texts, index, buttonElement, cycleFunc) {  cycleFunc(event);  updateTexts();}

function cycleStranaText(event) {  indexStrana = cycleText(event, textsStrana, indexStrana, buttonElementStrana);  updateTexts();}

function cyclePkNaplnText(event) {  indexPkNapln = cycleText(event, textsPkNapln, indexPkNapln, buttonElementPkNapln, updateBackgroundColor);  updateTexts();}
function cyclePkWibergText(event) {  indexPkWiberg = cycleText(event, textsPkWiberg, indexPkWiberg, buttonElementPkWiberg, updateBackgroundColor);  updateTexts();}

function cycleMkFemurCHrText(event) {  indexMkFemurCHr = cycleText(event, textsMkFemurCHr, indexMkFemurCHr, buttonElementMkFemurCHr, updateBackgroundColor);  updateTexts();}
function cycleMkMenText(event) {  indexMkMen = cycleText(event, textsMkMen, indexMkMen, buttonElementMkMen, updateBackgroundColor);  updateTexts();}
function cycleMkMenMEText(event) {  indexMkMenME = cycleText(event, textsMkMenME, indexMkMenME, buttonElementMkMenME, updateBackgroundColor);  updateTexts();}
function cycleMkTibieCHrText(event) {  indexMkTibieCHr = cycleText(event, textsMkTibieCHr, indexMkTibieCHr, buttonElementMkTibieCHr, updateBackgroundColor);  updateTexts();}

function cycleLkFemurCHrText(event) {  indexLkFemurCHr = cycleText(event, textsLkFemurCHr, indexLkFemurCHr, buttonElementLkFemurCHr, updateBackgroundColor);  updateTexts();}
function cycleLkMenText(event) {  indexLkMen = cycleText(event, textsLkMen, indexLkMen, buttonElementLkMen, updateBackgroundColor);  updateTexts();}
function cycleLkMenMEText(event) {  indexLkMenME = cycleText(event, textsLkMenME, indexLkMenME, buttonElementLkMenME, updateBackgroundColor);  updateTexts();}
function cycleLkTibieCHrText(event) {  indexLkTibieCHr = cycleText(event, textsLkTibieCHr, indexLkTibieCHr, buttonElementLkTibieCHr, updateBackgroundColor);  updateTexts();}

function cycleLCMText(event) {  indexLCM = cycleText(event, textsLCM, indexLCM, buttonElementLCM, updateBackgroundColor);  updateTexts();}
function cycleLCLText(event) {  indexLCL = cycleText(event, textsLCL, indexLCL, buttonElementLCL, updateBackgroundColor);  updateTexts();}

function cycleOstBakerText(event) {  indexOstBaker = cycleText(event, textsOstBaker, indexOstBaker, buttonElementOstBaker, updateBackgroundColor);  updateTexts();}