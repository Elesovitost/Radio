function updateTexts() {

// indikace
var indikace = document.getElementById("indikace").value;
document.getElementById("indikace").addEventListener("input", updateTexts);

// POPIS	
MRHipsNAMEText.value = "MR kyčelních kloubů";

MRHipsINDText.value = indikace;

MRHipsSEKVText.value = "Kyčle vyšetřeny v T1W, TIRM, T2W, 3D a MPR rekonstrukce.";

MRHipsPOPText.value = "Postavení v obou kyčelních kloubech je normální, symetrické, hlavice i jamky mají normální tvar, strukturu i signál.\n" + 
	"Kloubní chrupavka bez defektů, labrum zachovalé, bez zřetelných signálových změn.\n" + 
	"Signál dřeně odpovídá věku, kortikalis je neporušená.\n" +
	"Okolní svalové struktury jsou bez patologických změn, svaly i šlachy a jejich úpony mají normální průběh, jsou bez patrné infiltrace či prosáknutí.\n" + 
	"Struktura podkoží je přiměřená.\n" + 
	"Přehledné lymfatické uzliny nejsou ani zvětšeny ani zmnoženy."

MRHipsRESText.value = "Přiměřený nález na kyčelních kloubech.";

}
updateTexts();	