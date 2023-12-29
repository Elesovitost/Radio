function updateTexts() {


// indikace
var indikace = document.getElementById("indikace").value;
document.getElementById("indikace").addEventListener("input", updateTexts);

// POPIS	
MRThoracicNAMEText.value = "MR hrudní páteře";

MRThoracicINDText.value = indikace;

MRThoracicSEKVText.value = "Th páteř vyšetřena v sag T1W, T2W, STIR, tra T2W, (event. tra T1W dle potřeby). ";

MRThoracicPOPText.value = "Hrudní kyfóza je přiměřená.\n" + 
	"Těla obratlová mají normální tvar, výšku a signál.\n" + 
	"Disky bez výraznějších protruzí.\n" + 
	"Páteřní kanál volný. Foramina relativně volná.\n" + 
	"Mícha štíhlá, hladkých kontur, norm. signálu."

MRThoracicRESText.value = "Přiměřený nález na hrudní páteři.";

}
updateTexts();	