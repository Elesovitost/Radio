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



// Tstage
if (CervixTuInvasionText === "invaze <3mm") {
 CervixTuInvasionP = "V oblasti endocervixu až stromatu krčku dělohy na T2 infiltrativní zvýšení SI do hloubky < 3 mm, vykazující restrikci difuze. "; 
 CervixTuFIGO = "IA1";
 CervixTuTNMT = "T1b";
 CervixTuInvasionR = ""; 
} else if (CervixTuInvasionText === "invaze 3-5mm") {
 CervixTuInvasionP = "V oblasti endocervixu až stromatu krčku dělohy na T2 infiltrativní zvýšení SI do hloubky 3 mm a více, ale méně než 5 mm, vykazující restrikci difuze. ";
 CervixTuFIGO = "IA2";
 CervixTuTNMT = "T1b";
 CervixTuInvasionR = "";
} else if (CervixTuInvasionText === "invaze >5mm, vel. <2cm") {
 CervixTuInvasionP = "V oblasti endocervixu až stromatu krčku dělohy na T2 infiltrativní zvýšení SI do hloubky 5 mm a více, v největším rozměru celkové velikosti do 2 cm, vykazující restrikci difuze. ";
 CervixTuFIGO = "IB1";
 CervixTuTNMT = "T1b";
 CervixTuInvasionR = "";
} else if (CervixTuInvasionText === "velikost 2-4cm") {
 CervixTuInvasionP = "V oblasti krčku dělohy na T2 infiltrativní zvýšení SI v největším rozměru 2cm a více, ale méně než 4 cm, vykazující restrikci difuze. ";
 CervixTuFIGO = "IB2";
 CervixTuTNMT = "T1b";
 CervixTuInvasionR = "";
} else if (CervixTuInvasionText === "velikost >4cm") {
 CervixTuInvasionP = "V oblasti krčku dělohy na T2 infiltrativní zvýšení SI v největším rozměru ≥ 4cm, vykazující restrikci difuze. ";
 CervixTuFIGO = "IB3";
 CervixTuTNMT = "T1b2";
 CervixTuInvasionR = "";
}

// tumor type

if (CervixTuTypeText === "není") {
 CervixTuInvasionP = "V oblasti endocervixu až stromatu krčku dělohy na T2 bez přesvědčivého infiltrativního zvýšení SI, bez známek restrikce difuze. ";
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


//FIGO / TNM

if (CervixMetaP !== "" || CervixLNNonRegP !== "") {
    CervixTuFIGO = "IVB";
	CervixTuTNMT = "T1b";
} else if (document.getElementById('ChbCervixRectumInvasion').checked || document.getElementById('ChbCervixBladderInvasion').checked) {
    CervixTuFIGO = "IVA";
	CervixTuTNMT = "T4";
} else if (CervixLNRegP.includes("paraaortálně")) {
    CervixTuFIGO = "IIIC2";
	CervixTuTNMN = "N1";
} else if (nodesArrayReg.length !== 0 && !CervixLNRegP.includes("paraaortálně")) {
    CervixTuFIGO = "IIIC1";
	CervixTuTNMN = "N1";
} else if (document.getElementById('ChbCervixWallInvasion').checked || document.getElementById('ChbCervixHydronephR').checked || document.getElementById('ChbCervixHydronephL').checked) {
    CervixTuFIGO = "IIIB";
	CervixTuTNMT = "T3b";
} else if (CervixVagInvX === "++") {
    CervixTuFIGO = "IIIA";
	CervixTuTNMT = "T3a";
} else if (document.getElementById('ChbCervixParamRInvasion').checked || document.getElementById('ChbCervixParamLInvasion').checked) {
    CervixTuFIGO = "IIB";
	CervixTuTNMT = "T2b";
} else if (CervixVagInvX === "+" && CervixTuFIGO === "IB3") {
    CervixTuFIGO = "IIA2";
	CervixTuTNMT = "T2a";
} else if (CervixVagInvX === "+" && CervixTuFIGO === "IB2") {
    CervixTuFIGO = "IIA1";
	CervixTuTNMT = "T2a";
}

// TNM - N

if (nodesArrayReg.length !== 0) {
	CervixTuTNMN = "N1";
} else CervixTuTNMN = "N0";

// TNM - M

if (document.getElementById('ChbCervixLNNonReg').checked || document.getElementById('ChbCervixMeta').checked) {
	CervixTuTNMM = "M1";
} else CervixTuTNMM = "M0";


CervixTuFIGOR = "FIGO klasifikace stage " + CervixTuFIGO + ", TNM klasifikace stage " + CervixTuTNMT + CervixTuTNMN + CervixTuTNMM + ".";

//TNM



// POPIS
CervixTuPOPText.value = 
"Cervix:" + "\n" +
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
