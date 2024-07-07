function updateTexts() {


//strana
const StranaText = buttonElementStrana.innerText;
const imageElement = document.getElementById('MRankleimage');

if (StranaText === "jakého?") {
 Nadpis = "MR hlezna"; 
 imageElement.style.display = "none";
} else if (StranaText === "PRAVÉHO") {
 Nadpis = "MR pravého hlezna";
 imageElement.style.display = "block"; imageElement.style.transform = "none"; 
} else if (StranaText === "LEVÉHO") {
 Nadpis = "MR levého hlezna";
 imageElement.style.display = "block"; imageElement.style.transform = "scaleX(-1)";
}

// indikace
var indikace = document.getElementById("indikace").value;
document.getElementById("indikace").addEventListener("input", updateTexts);

// VAZY

updateButtonTexts({
			'ChbAnkleLFTA': ['OK', 'I', 'II', 'III'],
			'ChbAnkleLFC': ['OK', 'I', 'II', 'III'],
			'ChbAnkleLFTP': ['OK', 'I', 'II', 'III']
        });

var ChbAnkleLFTA = document.getElementById('ChbAnkleLFTA').innerText;
var ChbAnkleLFC = document.getElementById('ChbAnkleLFC').innerText;
var ChbAnkleLFTP = document.getElementById('ChbAnkleLFTP').innerText;

var AnkleLLText = "";  var AnkleLLRes = ""; 
var AnkleLLDescText = []; var AnkleLLDescRes = [];

if (ChbAnkleLFTA === "I") {
    AnkleLLDescText.push("LFTA rozšířen s vyšší SI"); AnkleLLDescRes.push("LFTA s distenzí");
} else if (ChbAnkleLFTA === "II") {
    AnkleLLDescText.push("LFTA s parc. porušením kontinuity, rozšířen, s vyšší SI"); AnkleLLDescRes.push("LFTA s low-grade parciální rupturou");
}  else if (ChbAnkleLFTA === "III") {
    AnkleLLDescText.push("LFTA s porušenou kontinuitou"); AnkleLLDescRes.push("LFTA s high-grade rupturou");
}

if (ChbAnkleLFC === "I") {
    AnkleLLDescText.push("LFC rozšířen s vyšší SI"); AnkleLLDescRes.push("LFC s distenzí");
} else if (ChbAnkleLFC === "II") {
    AnkleLLDescText.push("LFC s parc. porušením kontinuity, rozšířen, s vyšší SI"); AnkleLLDescRes.push("LFC s low-grade parciální rupturou");
}  else if (ChbAnkleLFC === "III") {
    AnkleLLDescText.push("LFC není patrný"); AnkleLLDescRes.push("LFC v.s. s rupturou");
}

if (ChbAnkleLFTP === "I") {
    AnkleLLDescText.push("LFTP rozšířen s vyšší SI"); AnkleLLDescRes.push("LFTP s distenzí");
} else if (ChbAnkleLFTP === "II") {
    AnkleLLDescText.push("LFTP s parc. porušením kontinuity, rozšířen, s vyšší SI"); AnkleLLDescRes.push("LFTP s low-grade parciální rupturou");
}  else if (ChbAnkleLFTP === "III") {
    AnkleLLDescText.push("LFTP není patrný"); AnkleLLDescRes.push("LFTP v.s. s rupturou");
}

if (AnkleLLDescText.length) {
  AnkleLLText = "Vazy laterálního kotníku: " + AnkleLLDescText.join(". ") + ". ";
} else {
  AnkleLLText = "Vazy laterálního kotníku bez patrné patologie. ";
}

if (AnkleLLDescRes.length) {
  AnkleLLRes = AnkleLLDescRes.join(". ") + ". ";
} 



updateButtonTexts({
			'ChbAnkleLDsup': ['OK', 'I', 'II', 'III'],
			'ChbAnkleLDdeep': ['OK', 'I', 'II', 'III']
        });

var ChbAnkleLDsup = document.getElementById('ChbAnkleLDsup').innerText;
var ChbAnkleLDdeep = document.getElementById('ChbAnkleLDdeep').innerText;

var AnkleMLText = ""; var AnkleMLRes = "";
var AnkleMLDescText = []; var AnkleMLDescRes = [];

if (ChbAnkleLDsup === "I") {
    AnkleMLDescText.push("Povrchová porce lig. delt. rozšířena s vyšší SI"); AnkleMLDescRes.push("Povrchová porce lig. deltoideum s distenzí");
} else if (ChbAnkleLDsup === "II") {
    AnkleMLDescText.push("Povrchová porce lig. delt. s parc. porušením kontinuity, rozšířena, s vyšší SI"); AnkleMLDescRes.push("Povrchová porce lig. deltoideum s low-grade parciální rupturou");
}  else if (ChbAnkleLDsup === "III") {
    AnkleMLDescText.push("Povrchová porce lig. delt. s porušenou kontinuitou"); AnkleMLDescRes.push("Povrchová porce lig. deltoideum s high-grade rupturou");
}

if (ChbAnkleLDdeep === "I") {
    AnkleMLDescText.push("Hluboká porce lig. delt. rozšířena s vyšší SI"); AnkleMLDescRes.push("Hluboká porce lig. deltoideum s distenzí");
} else if (ChbAnkleLDdeep === "II") {
    AnkleMLDescText.push("Hluboká porce lig. delt. s parc. porušením kontinuity, rozšířena, s vyšší SI"); AnkleMLDescRes.push("Hluboká porce lig. deltoideum s low-grade parciální rupturou");
}  else if (ChbAnkleLDdeep === "III") {
    AnkleMLDescText.push("Hluboká porce lig. delt. přerušena, rozvlákněna"); AnkleMLDescRes.push("Hluboká porce lig. deltoideum v.s. s rupturou");
}

if (AnkleMLDescText.length) {
  AnkleMLText = "Vazy mediálního kotníku: " + AnkleMLDescText.join(". ") + ". ";
} else {
  AnkleMLText = "Vazy mediálního kotníku bez patrné patologie. ";
}

if (AnkleMLDescRes.length) {
  AnkleMLRes = AnkleMLDescRes.join(". ") + ". ";
}


// MED šlachy

updateButtonTexts({
			'ChbAnkleTP': ['OK', 'synovitis', 'tendinóza', 'parc. rpt', 'ruptura'],
			'ChbAnkleFDL': ['OK', 'synovitis', 'tendinóza', 'parc. rpt', 'ruptura'],
			'ChbAnkleFHL': ['OK', 'synovitis', 'tendinóza', 'parc. rpt', 'ruptura']
        });

var ChbAnkleTP = document.getElementById('ChbAnkleTP').innerText;
var ChbAnkleFDL = document.getElementById('ChbAnkleFDL').innerText;
var ChbAnkleFHL = document.getElementById('ChbAnkleFHL').innerText;

var AnkleMCText = ""; var AnkleMCRes = "";
var AnkleMCDescText = []; var AnkleMCDescRes = [];

if (ChbAnkleTP === "synovitis") {
    AnkleMCDescText.push("Šlacha musc. tib. post. s tekutinou v okolí"); AnkleMCDescRes.push("Tenosynovitis m. tibialis posterior");
} else if (ChbAnkleTP === "tendinóza") {
    AnkleMCDescText.push("Šlacha musc. tib. post. s vyšší SI"); AnkleMCDescRes.push("Tendinóza m. tibialis posterior");
}  else if (ChbAnkleTP === "parc. rpt") {
    AnkleMCDescText.push("Šlacha musc. tib. post. s porušenou kontinuitou"); AnkleMCDescRes.push("Šlacha m. tibialis posterior s parciální rupturou");
}  else if (ChbAnkleTP === "ruptura") {
    AnkleMCDescText.push("Šlacha musc. tib. post. s výrazně až totálně porušenou kontinuitou"); AnkleMCDescRes.push("Šlacha m. tibialis posterior s totální rupturou");
}

if (ChbAnkleFDL === "synovitis") {
    AnkleMCDescText.push("Šlacha musc. flex.digit. long.  s tekutinou v okolí"); AnkleMCDescRes.push("Tenosynovitis m. flexor digitorum longus");
} else if (ChbAnkleFDL === "tendinóza") {
    AnkleMCDescText.push("Šlacha musc. flex.digit. long.  s vyšší SI"); AnkleMCDescRes.push("Tendinóza m. flexor digitorum longus");
}  else if (ChbAnkleFDL === "parc. rpt") {
    AnkleMCDescText.push("Šlacha musc. flex.digit. long.  s porušenou kontinuitou"); AnkleMCDescRes.push("Šlacha m. flexor digitorum longus s parciální rupturou");
}  else if (ChbAnkleFDL === "ruptura") {
    AnkleMCDescText.push("Šlacha musc. flex.digit. long.  s výrazně až totálně porušenou kontinuitou"); AnkleMCDescRes.push("Šlacha m. flexor digitorum longus s totální rupturou");
}

if (ChbAnkleFHL === "synovitis") {
    AnkleMCDescText.push("Šlacha musc. flex. hal. long.  s tekutinou v okolí"); AnkleMCDescRes.push("Tenosynovitis m. flexor hallucis longus");
} else if (ChbAnkleFHL === "tendinóza") {
    AnkleMCDescText.push("Šlacha musc. flex. hal. long.  s vyšší SI"); AnkleMCDescRes.push("Tendinóza m. flexor hallucis longus");
}  else if (ChbAnkleFHL === "parc. rpt") {
    AnkleMCDescText.push("Šlacha musc. flex. hal. long.  s porušenou kontinuitou"); AnkleMCDescRes.push("Šlacha m. flexor hallucis longus s parciální rupturou");
}  else if (ChbAnkleFHL === "ruptura") {
    AnkleMCDescText.push("Šlacha musc. flex. hal. long.  s výrazně až totálně porušenou kontinuitou"); AnkleMCDescRes.push("Šlacha m. flexor hallucis longus s totální rupturou");
}

if (AnkleMCDescText.length) {
  AnkleMCText = AnkleMCDescText.join(". ") + ". ";
}
if (AnkleMCDescRes.length) {
  AnkleMCRes = AnkleMCDescRes.join(". ") + ". ";
}

// ANT šlachy

updateButtonTexts({
			'ChbAnkleET': ['OK', 'synovitis', 'tendinóza', 'parc. rpt', 'ruptura'],
			'ChbAnkleEDL': ['OK', 'synovitis', 'tendinóza', 'parc. rpt', 'ruptura'],
			'ChbAnkleEHL': ['OK', 'synovitis', 'tendinóza', 'parc. rpt', 'ruptura']
        });

var ChbAnkleET = document.getElementById('ChbAnkleET').innerText;
var ChbAnkleEDL = document.getElementById('ChbAnkleEDL').innerText;
var ChbAnkleEHL = document.getElementById('ChbAnkleEHL').innerText;

var AnkleACText = ""; var AnkleACRes = "";
var AnkleACDescText = []; var AnkleACDescRes = [];

if (ChbAnkleET === "synovitis") {
    AnkleACDescText.push("Šlacha musc. ext. tibialis  s tekutinou v okolí"); AnkleACDescRes.push("Tenosynovitis m. extensor tibialis");
} else if (ChbAnkleET === "tendinóza") {
    AnkleACDescText.push("Šlacha musc. ext. tibialis  s vyšší SI"); AnkleACDescRes.push("Tendinóza m. extensor tibialis");
}  else if (ChbAnkleET === "parc. rpt") {
    AnkleACDescText.push("Šlacha musc. ext. tibialis  s porušenou kontinuitou"); AnkleACDescRes.push("Šlacha m. extensor tibialis s parciální rupturou");
}  else if (ChbAnkleET === "ruptura") {
    AnkleACDescText.push("Šlacha musc. ext. tibialis  s výrazně až totálně porušenou kontinuitou"); AnkleACDescRes.push("Šlacha m. extensor tibialis s totální rupturou");
}

if (ChbAnkleEHL === "synovitis") {
    AnkleACDescText.push("Šlacha musc. ext. hal. long.  s tekutinou v okolí"); AnkleACDescRes.push("Tenosynovitis m. extensor hallucis longus");
} else if (ChbAnkleEHL === "tendinóza") {
    AnkleACDescText.push("Šlacha musc. ext. hal. long.  s vyšší SI"); AnkleACDescRes.push("Tendinóza m. extensor hallucis longus");
}  else if (ChbAnkleEHL === "parc. rpt") {
    AnkleACDescText.push("Šlacha musc. ext. hal. long.  s porušenou kontinuitou"); AnkleACDescRes.push("Šlacha m. extensor hallucis longus s parciální rupturou");
}  else if (ChbAnkleEHL === "ruptura") {
    AnkleACDescText.push("Šlacha musc. ext. hal. long.  s výrazně až totálně porušenou kontinuitou"); AnkleACDescRes.push("Šlacha m. extensor hallucis longus s totální rupturou");
}

if (ChbAnkleEDL === "synovitis") {
    AnkleACDescText.push("Šlacha musc. ext. dig. long.  s tekutinou v okolí"); AnkleACDescRes.push("Tenosynovitis m. extensor digitorum longus");
} else if (ChbAnkleEDL === "tendinóza") {
    AnkleACDescText.push("Šlacha musc. ext. dig. long.  s vyšší SI"); AnkleACDescRes.push("Tendinóza m. extensor digitorum longus");
}  else if (ChbAnkleEDL === "parc. rpt") {
    AnkleACDescText.push("Šlacha musc. ext. dig. long.  s porušenou kontinuitou"); AnkleACDescRes.push("Šlacha m. extensor digitorum longus s parciální rupturou");
}  else if (ChbAnkleEDL === "ruptura") {
    AnkleACDescText.push("Šlacha musc. ext. dig. long.  s výrazně až totálně porušenou kontinuitou"); AnkleACDescRes.push("Šlacha m. extensor digitorum longus s totální rupturou");
}

if (AnkleACDescText.length) {
  AnkleACText = AnkleACDescText.join(". ") + ". ";
}
if (AnkleACDescRes.length) {
  AnkleACRes = AnkleACDescRes.join(". ") + ". ";
}

// LAT šlachy

updateButtonTexts({
			'ChbAnklePL': ['OK', 'synovitis', 'tendinóza', 'parc. rpt', 'ruptura'],
			'ChbAnklePB': ['OK', 'synovitis', 'tendinóza', 'parc. rpt', 'ruptura']
        });

var ChbAnklePL = document.getElementById('ChbAnklePL').innerText;
var ChbAnklePB = document.getElementById('ChbAnklePB').innerText;

var AnkleLCText = ""; var AnkleLCRes = "";
var AnkleLCDescText = []; var AnkleLCDescRes = [];

if (ChbAnklePL === "synovitis") {
    AnkleLCDescText.push("Šlacha musc. peron. longus  s tekutinou v okolí"); AnkleLCDescRes.push("Tenosynovitis m. peroneus longus");
} else if (ChbAnklePL === "tendinóza") {
    AnkleLCDescText.push("Šlacha musc. peron. longus  s vyšší SI"); AnkleLCDescRes.push("Tendinóza m. peroneus longus");
}  else if (ChbAnklePL === "parc. rpt") {
    AnkleLCDescText.push("Šlacha musc. peron. longus  s porušenou kontinuitou"); AnkleLCDescRes.push("Šlacha m. peroneus longus s parciální rupturou");
}  else if (ChbAnklePL === "ruptura") {
    AnkleLCDescText.push("Šlacha musc. peron. longus  s výrazně až totálně porušenou kontinuitou"); AnkleLCDescRes.push("Šlacha m. peroneus longus s totální rupturou");
}

if (ChbAnklePB === "synovitis") {
    AnkleLCDescText.push("Šlacha musc. peron. brevis  se tekutinou v okolí"); AnkleLCDescRes.push("Tenosynovitis m. peroneus brevis");
} else if (ChbAnklePB === "tendinóza") {
    AnkleLCDescText.push("Šlacha musc. peron. brevis  s vyšší SI"); AnkleLCDescRes.push("Tendinóza m. peroneus brevis");
}  else if (ChbAnklePB === "parc. rpt") {
    AnkleLCDescText.push("Šlacha musc. peron. brevis  s porušenou kontinuitou"); AnkleLCDescRes.push("Šlacha m. peroneus brevis s parciální rupturou");
}  else if (ChbAnklePB === "ruptura") {
    AnkleLCDescText.push("Šlacha musc. peron. brevis  s výrazně až totálně porušenou kontinuitou"); AnkleLCDescRes.push("Šlacha m. peroneus brevis s totální rupturou");
}

if (AnkleLCDescText.length) {
  AnkleLCText = AnkleLCDescText.join(". ") + ". ";
}
if (AnkleLCDescRes.length) {
  AnkleLCRes = AnkleLCDescRes.join(". ") + ". ";
} 

// šlachy ok?
AnkleTendonsText = AnkleMCText + AnkleLCText + AnkleACText;
AnkleTendonsRes = AnkleMCRes + AnkleLCRes + AnkleACRes;


if (AnkleTendonsText.trim() === "") {
  AnkleTendonsText = "Šlachy bez patrné patologie.";
}

// POPIS
	
MRAnkleNAMEText.value = Nadpis;

MRAnkleINDText.value = indikace;

MRAnkleSEKVText.value = "Hlezno vyšetřeno v PDW FS, T1W, T2W.";

MRAnklePOPText.value = 
	"Bez známek zmnožené nitrokloubní tekutiny.\n" + 
	"Kontury kortikalis jsou neporušené, kostní dřeň normálního signálu bez známek edému.\n" +
	"Chrupavka bez zjevných defektů.\n" +
	AnkleMLText + "\n" +
	AnkleLLText + "\n" +
	AnkleTendonsText + "\n" +
	"Měkké tkáně bez hrubých patol. odchylek."
;

MRAnkleRESText.value = 
	AnkleMLRes + "\n" +
	AnkleLLRes + "\n" +
	AnkleTendonsRes
;

}
updateTexts();	