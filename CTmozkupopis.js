function updateTexts() {

// indikace
var indikace = document.getElementById("indikace").value;
document.getElementById("indikace").addEventListener("input", updateTexts);

// POPIS	
CTmozkuNAMEText.value = "CT mozku";

CTmozkuINDText.value = indikace;

CTmozkuSEKVText.value = "";

CTmozkuPOPText.value = 
	"Střední čáry jsou zachovány, bez známek expanzivního procesu.\n" +
	"Komorový systém přiměřené šíře, symetrický.\n" +
	"Subarachnoidální prostory a sulci přiměřené šíře.\n" +
	"Parenchym mozku bez patrného patologického ložiska, krvácení ani známek čerstvého ischemického inzultu.\n" +
	"Skelet intaktní.\n" +
	"Vedlejší dutiny a mastoidní sklípky volné.";

CTmozkuRESText.value = "Přiměřený nativní nález na mozku.";

}
updateTexts();
