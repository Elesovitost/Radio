function updateTexts() {


//strana
const StranaText = buttonElementStrana.innerText;

if (StranaText === "jakého?") {
 Nadpis = "MR hlezna"; 
} else if (StranaText === "PRAVÉHO") {
 Nadpis = "MR pravého hlezna";
} else if (StranaText === "LEVÉHO") {
 Nadpis = "MR levého hlezna";
} 

// indikace
var indikace = document.getElementById("indikace").value;
document.getElementById("indikace").addEventListener("input", updateTexts);

// POPIS
	
MRAnkleNAMEText.value = Nadpis;

MRAnkleINDText.value = indikace;

MRAnkleSEKVText.value = "Hlezno vyšetřeno v PDW FS, T1W, T2W.";

MRAnklePOPText.value = "Bez známek zmnožené nitrokloubní tekutiny.\n" + 
	"Kontury kortikalis jsou neporušené, kostní dřeň normálního signálu bez známek edému.\n" +
	"Chrupavka bez zjevných defektů.\n" +
	"Vazy mediálního kotníku neporušené.\n" +
	"Vazy laterálního kotníku neporušené.\n" +
	"Šlachy nízké SI, bez tekutiny v okolí.\n" +
	"Měkké tkáně bez hrubých patol. odchylek."

MRAnkleRESText.value = "Přiměřený nález v oblasti hlezenního kloubu";

}
updateTexts();	