function updateTexts() {


// indikace
var indikace = document.getElementById("indikace").value;
document.getElementById("indikace").addEventListener("input", updateTexts);

// POPIS
	
MRSISNAMEText.value = "MR SI skloubení";

MRSISINDText.value = indikace;

MRSISSEKVText.value = "SIS vyšetřeny v cor a tra TIRM a T1W. ";

MRSISPOPText.value = "Štěrbiny obou SI skloubení jsou symetrické, hladké, přiměřené šířky, bez známek změněného signálu v přilehlém sakru či ilických kostech pánve."

MRSISRESText.value = "Přiměřený nález na SI skloubeních, bez známek sakroiliitis.";

}
updateTexts();	