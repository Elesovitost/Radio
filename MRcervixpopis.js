function updateTexts() {

var CervixTuRESText = document.getElementById("CervixTuRESText");
var FINALText = document.getElementById("FINALText");

const CervixTuTypeText = buttonElementCervixTuType.innerText;
const CervixTuInvasionText = buttonElementCervixTuInvasion.innerText;




//size
var CervixTuSizeValue = document.getElementById("CervixTuSize").value;
var CervixTuSizeP = "";

if (!CervixTuSizeValue) {
	CervixTuSizeP = "";
} else {
	CervixTuSizeP = ", celkových rozměrů cca " + CervixTuSizeValue + " mm. ";
}



//pochva
if (document.getElementById('ChbCervixVagUpperInvasion').checked && document.getElementById('ChbCervixVagLowerInvasion').checked) {
    CervixVagInvasionP = "Nádorová infiltrace se šíří do stěny pochvy a zasahuje až do její dolní třetiny. ";
	CervixVagInvX = "++";
	CervixVagInvasionR = "až do dolní třetiny pochvy";
} else if (document.getElementById('ChbCervixVagUpperInvasion').checked) {
    CervixVagInvasionP = "Nádorová infiltrace se šíří do stěny pochvy, ale nezasahuje do její dolní třetiny. ";
	CervixVagInvX = "+";
	CervixVagInvasionR = "do horní třetiny pochvy";
} else if (document.getElementById('ChbCervixVagLowerInvasion').checked) {
    CervixVagInvasionP = "Nádorová infiltrace se šíří do stěny pochvy a zasahuje až do její dolní třetiny. ";
	CervixVagInvX = "++";
	CervixVagInvasionR = "až do dolní třetiny pochvy";
} else {
    CervixVagInvasionP = "Bez přesvědčivého šíření nádorové infiltrace do stěny pochvy. ";
	CervixVagInvX = "";
	CervixVagInvasionR = "";
}

//parametria
if (document.getElementById('ChbCervixParamRInvasion').checked && document.getElementById('ChbCervixParamLInvasion').checked) {
    CervixParamRInvasionP = "Nádorová infiltrace pokračuje do pravostranných i levostranných parametrií. ";
	CervixParamRInvasionR = "do pravostranných i levostranných parametrií";
} else if (document.getElementById('ChbCervixParamRInvasion').checked) {
    CervixParamRInvasionP = "Nádorová infiltrace pokračuje do pravostranných parametrií. ";
	CervixParamRInvasionR = "do pravostranných parametrií";
} else if (document.getElementById('ChbCervixParamLInvasion').checked) {
    CervixParamRInvasionP = "Nádorová infiltrace pokračuje do levostranných parametrií. ";
	CervixParamRInvasionR = "do levostranných parametrií";
} else {
    CervixParamRInvasionP = "Parametria bilat. bez přesvědčivé nádorové infiltrace. ";
	CervixParamRInvasionR = "";
}



//wall
if (document.getElementById('ChbCervixWallInvasion').checked) {
    CervixWallInvasionP = "Nádorovou infiltrací je susp. postižena pánevní stěna. ";
	CervixWallInvasionR = "susp. do pánevní stěny";
} else {
    CervixWallInvasionP = "Bez jasných známek nádorové infiltrace pánevní stěny. ";
	CervixWallInvasionR = "";
}

//bladder
if (document.getElementById('ChbCervixBladderInvasion').checked) {
    CervixBladderInvasionP = "Susp. šíření nádorové infiltrace do stěny močového měchýře. ";
	CervixBladderInvasionR = "susp. do stěny močového měchýře";
} else {
    CervixBladderInvasionP = "Přiměřený nález na močovém měchýři. ";
	CervixBladderInvasionR = "";
}

//rectum
if (document.getElementById('ChbCervixRectumInvasion').checked) {
    CervixRectumInvasionP = "Susp. šíření nádorové infiltrace do stěny rekta. ";
	CervixRectumInvasionR = "susp. do stěny rekta. ";
} else {
    CervixRectumInvasionP = "Normální obraz stěny rekta. ";
	CervixRectumInvasionR = "";
}

// spreading Resume

let checkedItemsR = [];
if (CervixParamRInvasionR !== "") {
    checkedItemsR.push(CervixParamRInvasionR);
}
if (CervixVagInvasionR !== "") {
    checkedItemsR.push(CervixVagInvasionR);
}
if (CervixWallInvasionR !== "") {
    checkedItemsR.push(CervixWallInvasionR);
}
if (CervixBladderInvasionR !== "") {
    checkedItemsR.push(CervixBladderInvasionR);
}
if (CervixRectumInvasionR !== "") {
    checkedItemsR.push(CervixRectumInvasionR);
}

let formattedTextR = "";

if (checkedItemsR.length === 0) {
    CervixTuSpreadR = "Nádor děložního čípku bez šíření mimo dělohu. ";
} else if (checkedItemsR.length === 1) {
    formattedTextR = checkedItemsR[0];
    CervixTuSpreadR = "Nádor děložního čípku se šíří " + formattedTextR + ". ";
} else if (checkedItemsR.length === 2) {
    formattedTextR = checkedItemsR.join(" a ");
    CervixTuSpreadR = "Nádor děložního čípku se šíří " + formattedTextR + ". ";
} else {
    let lastItem = checkedItemsR.pop();  
    formattedTextR = checkedItemsR.join(", ") + " a " + lastItem;
    CervixTuSpreadR = "Nádor děložního čípku se šíří " + formattedTextR + ". ";
}


//hydronephrosis

if (document.getElementById('ChbCervixHydronephR').checked && document.getElementById('ChbCervixHydronephL').checked) {
    CervixHydronephroP = "Dilatace dutého systému obou ledvin. ";
	CervixHydronephroR = "Hydronefróza bilat. ";
} else if (document.getElementById('ChbCervixHydronephR').checked) {
    CervixHydronephroP = "Dilatace dutého systému pravé ledviny. ";
	CervixHydronephroR = "Hydronefróza vpravo. ";
} else if (document.getElementById('ChbCervixHydronephL').checked) {
    CervixHydronephroP = "Dilatace dutého systému levé ledviny. ";
	CervixHydronephroR = "Hydronefróza vlevo. ";
} else {
    CervixHydronephroP = "Bez dilatace dutého systému ledvin. ";
	CervixHydronephroR = "";
}


// Lymph nodes Reg

var locationsLNReg = [
		"paraaortálně pod odstupem renálních tepen",
		"při společné ilice vpravo",
		"při společné ilice vpravo",
        "při externí ilice vpravo",
        "při externí ilice vlevo",
        "při interní ilice vpravo",
        "při interní ilice vlevo",
        "další pánevní vpravo",
        "další pánevní vlevo"
    ];
    
    var inputsLNReg = [
        document.getElementById("CervixLNAo"),
		document.getElementById("CervixLNComR"),
        document.getElementById("CervixLNComL"),
		document.getElementById("CervixLNExtR"),
        document.getElementById("CervixLNExtL"),
        document.getElementById("CervixLNIntR"),
        document.getElementById("CervixLNIntL"),
        document.getElementById("CervixLNPelvR"),
        document.getElementById("CervixLNPelvL")
    ];
    
    var CervixLNRegP = "Suspektní regionální uzliny jsou přítomny: ";
    var totalNodesReg = 0;
    var nodesArrayReg = [];
    
    for (var i = 0; i < inputsLNReg.length; i++) {
        if (inputsLNReg[i].value && parseInt(inputsLNReg[i].value) > 0) {
            nodesArrayReg.push(inputsLNReg[i].value + " " + locationsLNReg[i]);
            totalNodesReg += parseInt(inputsLNReg[i].value);
        }
    }

const CervixLNRegText = buttonElementCervixLNReg.innerText;

if (nodesArrayReg.length === 0) {
    CervixLNRegP = "Bez suspektních regionálních uzlin. ";
    CervixLNRegR = "";
} else if (CervixLNRegText === "nesuspektní") {
    CervixLNRegP = "";
    CervixLNRegR = "";
} else {
    // Handling the comma and 'a' separators
    CervixLNRegP += nodesArrayReg.slice(0, -2).join(", ") + 
                   (nodesArrayReg.length > 2 ? ", " : "") + 
                   nodesArrayReg.slice(-2).join(" a ") + ". ";
    
    if (totalNodesReg === 1) {
        CervixLNRegR = totalNodesReg + " suspektní regionální uzlina.";
    } else if (totalNodesReg >= 2 && totalNodesReg <= 4) {
        CervixLNRegR = totalNodesReg + " suspektní regionální uzliny.";
    } else {
        CervixLNRegR = totalNodesReg + " suspektních regionálních uzlin.";
    }
}

// non reg LN
if (document.getElementById('ChbCervixLNNonReg').checked) {
    CervixLNNonRegP = "Suspektní non-regionální uzliny. ";
	CervixLNNonRegR = "Suspektní non-regionální uzliny. ";
} else {
    CervixLNNonRegP = "";
	CervixLNNonRegR = "";
}

// meta
if (document.getElementById('ChbCervixMeta').checked) {
    CervixMetaP = "Přítomna vzdálená meta ložiska. ";
	CervixMetaR = "Přítomna vzdálená meta ložiska. ";
} else {
    CervixMetaP = "";
	CervixMetaR = "";
}


// Tstage
if (document.getElementById('ChbCervixRectumInvasion').checked || document.getElementById('ChbCervixBladderInvasion').checked) {
	CervixTuTNMT = "T4";
} else if (document.getElementById('ChbCervixWallInvasion').checked || document.getElementById('ChbCervixHydronephR').checked || document.getElementById('ChbCervixHydronephL').checked) {
	CervixTuTNMT = "T3b";
} else if (CervixVagInvX === "++") {
	CervixTuTNMT = "T3a";
} else if (document.getElementById('ChbCervixParamRInvasion').checked || document.getElementById('ChbCervixParamLInvasion').checked) {
	CervixTuTNMT = "T2b";
} else if (CervixVagInvX === "+" && CervixTuInvasionText === "velikost >4cm") {
	CervixTuTNMT = "T2a";
} else if (CervixVagInvX === "+" && CervixTuInvasionText === "velikost 2-4cm") {
	CervixTuTNMT = "T2a";
} else if (CervixTuInvasionText === "velikost >4cm") {
	CervixTuInvasionP = "V oblasti krčku dělohy na T2 infiltrativní zvýšení SI v největším diametru ≥ 4cm, vykazující restrikci difuze. ";
	CervixTuTNMT = "T1b2";
} else if (CervixTuInvasionText === "velikost 2-4cm") {
	CervixTuInvasionP = "V oblasti krčku dělohy na T2 infiltrativní zvýšení SI v největším diametru 2cm a více, ale méně než 4 cm, vykazující restrikci difuze. ";
	CervixTuTNMT = "T1b";
} else if (CervixTuInvasionText === "inv >5mm, vel <2cm") {
	CervixTuInvasionP = "V oblasti endocervixu až stromatu krčku dělohy na T2 infiltrativní zvýšení SI do hloubky přes 5 mm, ale v největším rozměru diametru do 2 cm, vykazující restrikci difuze. ";
	CervixTuTNMT = "T1b";
} else if (CervixTuInvasionText === "invaze 3-5mm") {
	CervixTuInvasionP = "V oblasti endocervixu až stromatu krčku dělohy na T2 infiltrativní zvýšení SI do hloubky 3 až 5 mm, vykazující restrikci difuze. ";
	CervixTuTNMT = "T1b";
} else if (CervixTuInvasionText === "invaze <3mm") {
	CervixTuInvasionP = "V oblasti endocervixu až stromatu krčku dělohy na T2 infiltrativní zvýšení SI do hloubky max 3 mm, vykazující restrikci difuze. "; 
	CervixTuTNMT = "T1b";
}


// FIGO
if (CervixMetaP !== "" || CervixLNNonRegP !== "") {
    CervixTuFIGO = "IVB";
} else if (document.getElementById('ChbCervixRectumInvasion').checked || document.getElementById('ChbCervixBladderInvasion').checked) {
    CervixTuFIGO = "IVA";
} else if (CervixLNRegP.includes("paraaortálně")) {
    CervixTuFIGO = "IIIC2";
} else if (nodesArrayReg.length !== 0 && !CervixLNRegP.includes("paraaortálně")) {
    CervixTuFIGO = "IIIC1";
} else if (document.getElementById('ChbCervixWallInvasion').checked || document.getElementById('ChbCervixHydronephR').checked || document.getElementById('ChbCervixHydronephL').checked) {
    CervixTuFIGO = "IIIB";
} else if (CervixVagInvX === "++") {
    CervixTuFIGO = "IIIA";
} else if (document.getElementById('ChbCervixParamRInvasion').checked || document.getElementById('ChbCervixParamLInvasion').checked) {
    CervixTuFIGO = "IIB";
} else if (CervixVagInvX === "+" && CervixTuInvasionText === "velikost >4cm") {
    CervixTuFIGO = "IIA2";
} else if (CervixVagInvX === "+" && CervixTuInvasionText === "velikost 2-4cm") {
    CervixTuFIGO = "IIA1";
} else if (CervixTuInvasionText === "velikost >4cm") {
	CervixTuFIGO = "IB3";
} else if (CervixTuInvasionText === "velikost 2-4cm") {
	CervixTuFIGO = "IB2";
} else if (CervixTuInvasionText === "inv >5mm, vel <2cm") {
	CervixTuFIGO = "IB1";
} else if (CervixTuInvasionText === "invaze 3-5mm") {
	CervixTuFIGO = "IA2";
} else if (CervixTuInvasionText === "invaze <3mm") {
	CervixTuFIGO = "IA1";
}

// TNM - N

if (nodesArrayReg.length !== 0 && CervixLNRegP.includes("paraaortálně")) {
	CervixTuTNMN = "N2";
} else if (nodesArrayReg.length !== 0 && !CervixLNRegP.includes("paraaortálně")) { 
	CervixTuTNMN = "N1";
} else CervixTuTNMN = "N0";

// TNM - M

if (document.getElementById('ChbCervixLNNonReg').checked || document.getElementById('ChbCervixMeta').checked) {
	CervixTuTNMM = "M1";
} else CervixTuTNMM = "M0";


// tumor yes or no

if (CervixTuTypeText === "není") {
 CervixTuInvasionP = "V oblasti endocervixu až stromatu krčku dělohy na T2 bez přesvědčivého infiltrativního zvýšení SI, bez známek restrikce difuze. ";
} 



CervixTuFIGOR = "FIGO klasifikace stage " + CervixTuFIGO + ", TNM klasifikace stage " + CervixTuTNMT + " " + CervixTuTNMN + " " + CervixTuTNMM + ".";





// POPIS
CervixTuNAMEText.value = "MR dělohy"; 

CervixTuINDText.value = document.getElementById("indikace").addEventListener("input", updateTexts);


CervixTuPOPText.value = 
CervixTuInvasionP + CervixTuSizeP + CervixVagInvasionP + CervixParamRInvasionP + CervixWallInvasionP + CervixBladderInvasionP + CervixRectumInvasionP + CervixHydronephroP + "\n" +
CervixLNRegP + CervixLNNonRegP + "\n" +
CervixMetaP
;

	// CervixTuPOPText.value = CervixTuPOPText.value.replace(/^\s+/gm, '');  // odstraní mezery na začátku řádek
	CervixTuPOPText.value = CervixTuPOPText.value.replace(/ {2,}/g, ' ');  // více mezer = jedna mezera
	//CervixTuPOPText.value = CervixTuPOPText.value.replace(/^[.,\s]+/gm, '');  // odstraní tečku a čárku pokud jsou první na řádce
	CervixTuPOPText.value = CervixTuPOPText.value.replace(/ \./g, '.'); // mezera tečka = bez mezery tečka
	CervixTuPOPText.value = CervixTuPOPText.value.replace(/\.{2,}/g, '.'); // více teček = jedna tečka
	CervixTuPOPText.value = CervixTuPOPText.value.replace(/\.\,/g, ','); // čarka tečka = tečka
	CervixTuPOPText.value = CervixTuPOPText.value.replace(/\.\s*,\s*/g, ', '); // tečka mezera čárka = čárka
	CervixTuPOPText.value = CervixTuPOPText.value.replace(/^\s*[\r\n]+|[\r\n]+\s*$/gm, ''); // Remove empty rows 


//RESUME
CervixTuRESText.value = 
CervixTuSpreadR + CervixHydronephroR + "\n" +
CervixLNRegR + CervixLNNonRegR + "\n" +
CervixMetaR + "\n" +
CervixTuFIGOR
;

	CervixTuRESText.value = CervixTuRESText.value.replace(/^\s+/gm, '');  // odstraní mezery na začátku řádek
	CervixTuRESText.value = CervixTuRESText.value.replace(/ {2,}/g, ' ');  // více mezer = jedna mezera
	CervixTuRESText.value = CervixTuRESText.value.replace(/^[.,\s]+/gm, '');  // odstraní tečku a čárku pokud jsou první na řádce
	CervixTuRESText.value = CervixTuRESText.value.replace(/ \./g, '.'); // mezera tečka = bez mezery tečka
	CervixTuRESText.value = CervixTuRESText.value.replace(/\.{2,}/g, '.'); // více teček = jedna tečka
	CervixTuRESText.value = CervixTuRESText.value.replace(/ :/g, ':');  // odstraní mezeru před dvojtečkou
	


if (CervixTuTypeText === "není") {
	CervixTuRESText.value = "Bez přesvědčivého nádoru děložního čípku. "
}

// FINAL

CervixTuFinalText.value = 
"MR staging ca cervixu" + "\n\n" +
CervixTuPOPText.value + "\n\n" +
"Závěr:" + "\n" +
CervixTuRESText.value
;


}
updateTexts();	
