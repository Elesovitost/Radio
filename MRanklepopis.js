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

var AnkleLFTA = document.getElementById("ChbAnkleLFTA").innerText;
var AnkleLFC = document.getElementById("ChbAnkleLFC").innerText;
var AnkleLFTP = document.getElementById("ChbAnkleLFTP").innerText;

updateButtonTexts({
			'ChbAnkleLFTA': ['OK', 'I', 'II', 'III'],
			'ChbAnkleLFC': ['OK', 'I', 'II', 'III'],
			'ChbAnkleLFTP': ['OK', 'I', 'II', 'III'],
			'ChbAnkleLDsup': ['OK', 'I', 'II', 'III'],
			'ChbAnkleLDdeep': ['OK', 'I', 'II', 'III']
        });

var AnkleLLText = ""; var AnkleMLText = "";
var AnkleLLRes = ""; var AnkleMLRes = "";

var AnkleLLDescText = []; var AnkleLLDescRes = [];

if (AnkleLFTA === "I") {
    AnkleLLDescText.push("LFTA rozšířen s vyšší SI"); AnkleLLDescRes.push("LFTA s distenzí");
} else if (AnkleLFTA === "II") {
    AnkleLLDescText.push("LFTA s parc. porušením kontinuity, rozšířen, s vyšší SI"); AnkleLLDescRes.push("LFTA s low-grade parciální rupturou");
}  else if (AnkleLFTA === "III") {
    AnkleLLDescText.push("LFTA s porušenou kontinuitou"); AnkleLLDescRes.push("LFTA s hight-grade rupturou");
}

if (AnkleLFC === "I") {
    AnkleLLDescText.push("LFC rozšířen s vyšší SI"); AnkleLLDescRes.push("LFC s distenzí");
} else if (AnkleLFC === "II") {
    AnkleLLDescText.push("LFC s parc. porušením kontinuity, rozšířen, s vyšší SI"); AnkleLLDescRes.push("LFC s low-grade parciální rupturou");
}  else if (AnkleLFC === "III") {
    AnkleLLDescText.push("LFC není patrný"); AnkleLLDescRes.push("LFC v.s. s rupturou");
}

if (AnkleLFTP === "I") {
    AnkleLLDescText.push("LFTP rozšířen s vyšší SI"); AnkleLLDescRes.push("LFTP s distenzí");
} else if (AnkleLFTP === "II") {
    AnkleLLDescText.push("LFTP s parc. porušením kontinuity, rozšířen, s vyšší SI"); AnkleLLDescRes.push("LFTP s low-grade parciální rupturou");
}  else if (AnkleLFTP === "III") {
    AnkleLLDescText.push("LFTP není patrný"); AnkleLLDescRes.push("LFTP v.s. s rupturou");
}

if (AnkleLLDescText.length) {
  AnkleLLText = "Vazy laterálního kotníku: " + AnkleLLDescText.join(". ") + ". ";
}
if (AnkleLLDescRes.length) {
  AnkleLLRes = AnkleLLDescRes.join(". ") + ". ";
}


// POPIS
	
MRAnkleNAMEText.value = Nadpis;

MRAnkleINDText.value = indikace;

MRAnkleSEKVText.value = "Hlezno vyšetřeno v PDW FS, T1W, T2W.";

MRAnklePOPText.value = 
	"Bez známek zmnožené nitrokloubní tekutiny.\n" + 
	"Kontury kortikalis jsou neporušené, kostní dřeň normálního signálu bez známek edému.\n" +
	"Chrupavka bez zjevných defektů.\n" +
	"Vazy mediálního kotníku neporušené.\n" +
	AnkleLLText + "\n" +
	"Šlachy nízké SI, bez tekutiny v okolí.\n" +
	"Měkké tkáně bez hrubých patol. odchylek."
;

MRAnkleRESText.value = 
	"Přiměřený nález v oblasti hlezenního kloubu" + "\n" +
	AnkleLLRes
;

}
updateTexts();	