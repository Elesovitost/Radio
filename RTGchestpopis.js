function updateTexts() {
	
var indikace = document.getElementById("indikace").value;
document.getElementById("indikace").addEventListener("input", updateTexts);


//Liver

var POPRTGchestLiverSentences = [];
var RESRTGchestLiverSentences = [];


ButtonCycleInnerTexts["BTCLiverSize"] = ["zmenšena", "normální", "mírně zvětšena", "výrazně zvětšena"];
var BTCLiverSize = document.getElementById("BTCLiverSize").innerText;

if (BTCLiverSize === "normální") {
    POPRTGchestLiverSentences.push("normální velikosti");
} else if (BTCLiverSize === "mírně zvětšena") {
    POPRTGchestLiverSentences.push("zasahují kaudálně pod dolní okraj pravé ledviny");
    RESRTGchestLiverSentences.push("Mírná hepatomegalie");
} else if (BTCLiverSize === "výrazně zvětšena") {
    POPRTGchestLiverSentences.push("výrazně zvětšena, zaoblena");
    RESRTGchestLiverSentences.push("Hepatomegalie");
} else if (BTCLiverSize === "zmenšena") {
    POPRTGchestLiverSentences.push("drobná");
}

ButtonCycleInnerTexts["BTCLiverParenchyma"] = ["normální", "mírná steatóza", "výrazná steatóza", "cirhóza"];
var BTCLiverParenchyma = document.getElementById("BTCLiverParenchyma").innerText;

if (BTCLiverParenchyma === "normální") {
    POPRTGchestLiverSentences.push("s přiměřenou echogenitou parenchymu");
} else if (BTCLiverParenchyma === "mírná steatóza") {
    POPRTGchestLiverSentences.push("se zvýšenou echogenitou parenchymu");
    RESRTGchestLiverSentences.push("Mírná jaterní steatóza");
} else if (BTCLiverParenchyma === "výrazná steatóza") {
    POPRTGchestLiverSentences.push("s vysokou echogenitou parenchymu");
    RESRTGchestLiverSentences.push("Jaterní steatóza");
} else if (BTCLiverParenchyma === "cirhóza") {
    POPRTGchestLiverSentences.push("s hrubou echotexturou parenchymu a zvlněným okrajem");
    RESRTGchestLiverSentences.push("Obraz jaterní cirhózy");
}


//Liver malign

ButtonCycleInnerTexts["BTCLiverMalign"] = ["0", "1", "++"];
var BTCLiverMalign = document.getElementById("BTCLiverMalign").innerText;
var LiverMalignSizemm = formatLesionSize('LiverMalignSize');
var LiverMalignSize = document.getElementById('LiverMalignSize');

if (BTCLiverMalign === "0") {
	LiverMalignSize.classList.add('hidden');
} else if (BTCLiverMalign === "1") {
	LiverMalignSize.classList.remove('hidden');
    POPRTGchestLiverSentences.push("s hypoechogenním ložiskem " + LiverMalignSizemm);
    RESRTGchestLiverSentences.push("Ložisko jater obrazu malignity");
} else if (BTCLiverMalign === "++") {
	LiverMalignSize.classList.remove('hidden');
    POPRTGchestLiverSentences.push("s vícečetnými hypechogenními ložisky, největší " + LiverMalignSizemm);
    RESRTGchestLiverSentences.push("Vícečetná ložiska jater obrazu meta postižení");
}


ButtonCycleInnerTexts["BTCLiverCyst"] = ["0", "1", "++", "+++"];
var BTCLiverCyst = document.getElementById("BTCLiverCyst").innerText;

if (BTCLiverCyst === "1") {
    POPRTGchestLiverSentences.push("s anechogenním ložiskem");
    RESRTGchestLiverSentences.push("Cysta jater");
} else if (BTCLiverCyst === "++") {
    POPRTGchestLiverSentences.push("s vícečetnými anechogenními ložisky");
    RESRTGchestLiverSentences.push("Vícečetné cysty jater");
} else if (BTCLiverCyst === "+++") {
    POPRTGchestLiverSentences.push("s mnohočetnými anechogenními ložisky");
    RESRTGchestLiverSentences.push("Polycystóza jater");
}

ButtonCycleInnerTexts["BTCLiverHema"] = ["0", "1", "++"];
var BTCLiverHema = document.getElementById("BTCLiverHema").innerText;

if (BTCLiverHema === "1") {
    POPRTGchestLiverSentences.push("s hyperechogenním ložiskem");
    RESRTGchestLiverSentences.push("Hemangiom jater");
} else if (BTCLiverHema === "++") {
    POPRTGchestLiverSentences.push("s vícečetnými hyperechogenními ložisky");
    RESRTGchestLiverSentences.push("Vícečetné hemangiomy jater");
}

POPRTGchestLiver = POPRTGchestLiverSentences.join(", ") + ".";
RESRTGchestLiver = RESRTGchestLiverSentences.length > 0 ? RESRTGchestLiverSentences.join(". ") + "." : "";


// POPIS

RTGchestNAMEText.value = "UZ břicha";

RTGchestINDText.value = indikace; document.getElementById("indikace").addEventListener("input", updateTexts);

RTGchestPOPText.value = 
""
;

RTGchestRESText.value = 
""
;



RTGchestPOPText.value = RTGchestPOPText.value.replace(/^\s*[\r\n]/gm, '');  // odstraní prázdné řádky

RTGchestRESText.value = RTGchestRESText.value.replace(/^\./gm, ''); // odstraní tečku na začátku řádek
RTGchestRESText.value = RTGchestRESText.value.replace(/^\s+/gm, '');  // odstraní mezery na začátku řádek
RTGchestRESText.value = RTGchestRESText.value.replace(/^\s*[\r\n]/gm, '');  // odstraní prázdné řádky
RTGchestRESText.value = RTGchestRESText.value.split(/\r?\n/).filter(item => item.trim() !== '').join('\n');  // prázdné řádky
RTGchestRESText.value = RTGchestRESText.value.replace(/ ,/g, ',');  // smazat mezeru před čárkou
RTGchestRESText.value = RTGchestRESText.value.replace(/ \./g, '.'); // smazat mezeru před tečkou
RTGchestRESText.value = RTGchestRESText.value.replace(/\.{2,}/g, '.'); // více teček = jedna tečka
RTGchestRESText.value = RTGchestRESText.value.replace(/\,{2,}/g, ','); // více čárek = jedna čárka
RTGchestRESText.value = RTGchestRESText.value.replace(/,\./g, '.'); // odstraní čárku před tečkou
RTGchestRESText.value = RTGchestRESText.value.replace(/  +/g, ' '); // dvojmezery

if (!RTGchestRESText.value.trim() || !RTGchestRESText.value.replace(/[\n\r\s]+/g, '').length) {
    RTGchestRESText.value = "Bez patrné patologie.";
}


}
updateTexts();


