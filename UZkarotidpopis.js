function updateTexts() {
	
var indikace = document.getElementById("indikace").value;
document.getElementById("indikace").addEventListener("input", updateTexts);



// POPIS

UZkarotidNAMEText.value = "UZ břicha";

UZkarotidINDText.value = indikace; document.getElementById("indikace").addEventListener("input", updateTexts);

UZkarotidPOPText.value = 

;

UZkarotidRESText.value = 

;


UZkarotidPOPText.value = UZkarotidPOPText.value.replace(/^\s*[\r\n]/gm, '');  // odstraní prázdné řádky

UZkarotidRESText.value = UZkarotidRESText.value.replace(/^\./gm, ''); // odstraní tečku na začátku řádek
UZkarotidRESText.value = UZkarotidRESText.value.replace(/^\s+/gm, '');  // odstraní mezery na začátku řádek
UZkarotidRESText.value = UZkarotidRESText.value.replace(/^\s*[\r\n]/gm, '');  // odstraní prázdné řádky
UZkarotidRESText.value = UZkarotidRESText.value.split(/\r?\n/).filter(item => item.trim() !== '').join('\n');  // prázdné řádky
UZkarotidRESText.value = UZkarotidRESText.value.replace(/ ,/g, ',');  // smazat mezeru před čárkou
UZkarotidRESText.value = UZkarotidRESText.value.replace(/ \./g, '.'); // smazat mezeru před tečkou
UZkarotidRESText.value = UZkarotidRESText.value.replace(/\.{2,}/g, '.'); // více teček = jedna tečka
UZkarotidRESText.value = UZkarotidRESText.value.replace(/\,{2,}/g, ','); // více čárek = jedna čárka
UZkarotidRESText.value = UZkarotidRESText.value.replace(/,\./g, '.'); // odstraní čárku před tečkou
UZkarotidRESText.value = UZkarotidRESText.value.replace(/  +/g, ' '); // dvojmezery



}
updateTexts();

