function cloneAndUpdateIds(sourceId, destId) {
    let sourceElement = document.getElementById(sourceId);
    let clonedElement = sourceElement.cloneNode(true); 
    clonedElement.id = destId; 
    let elements = clonedElement.querySelectorAll("*");
    elements.forEach(element => {
        if (element.id) {
            element.id = element.id.replace("ThyroidR", "ThyroidL");
        }
    });
    sourceElement.parentNode.appendChild(clonedElement);
}


function updateTexts() {
	
var indikace = document.getElementById("indikace").value;
document.getElementById("indikace").addEventListener("input", updateTexts);


//let codeforR = `
//ThyroidR 

var UZThyroidRVol = document.getElementById('UZThyroidRVol').value;

ButtonCycleInnerTexts["UZThyroidParenchyma"] = ["normální", "hypoechogenní", "nehomogenní"];
var UZThyroidParenchyma = document.getElementById("UZThyroidParenchyma").innerText;

ButtonCycleInnerTexts["UZThyroidNodules"] = ["0", "1", "++", "+++"];
var UZThyroidNodules = document.getElementById("UZThyroidNodules").innerText;


ButtonCycleInnerTexts["UZThyroidNodComp"] = ["cystická", "spongiformní", "cysticko-solidní", "solidní"];
var UZThyroidNodComp = document.getElementById("UZThyroidNodComp").innerText;

ButtonCycleInnerTexts["UZThyroidNodEcho"] = ["anecho", "hyper (izo)", "hypo", "velmi hypo"];
var UZThyroidNodEcho = document.getElementById("UZThyroidNodEcho").innerText;

ButtonCycleInnerTexts["UZThyroidNodShape"] = ["široký", "vysoký"];
var UZThyroidNodShape = document.getElementById("UZThyroidNodShape").innerText;

ButtonCycleInnerTexts["UZThyroidNodMargin"] = ["jemný", "rozmazaný", "nepravidelný", "i mimo žlázu"];
var UZThyroidNodMargin = document.getElementById("UZThyroidNodMargin").innerText;

ButtonCycleInnerTexts["UZThyroidNodFoci"] = ["nejsou", "makro", "stěna", "mikro"];
var UZThyroidNodFoci = document.getElementById("UZThyroidNodFoci").innerText;

//`;

// let codeforL = codeforR.replace(/ThyroidR/g, 'ThyroidL').replace(/prav/g, 'lev').replace(/Prav/g, 'Lev'); eval(codeforR); eval(codeforL);

// POPIS

UZThyroidNAMEText.value = "UZ štítné žlázy";

UZThyroidINDText.value = indikace; document.getElementById("indikace").addEventListener("input", updateTexts);

UZThyroidPOPText.value = 
""
;

UZThyroidRESText.value = 
""
;


UZThyroidPOPText.value = UZThyroidPOPText.value.replace(/^\s*[\r\n]/gm, '');  // odstraní prázdné řádky

UZThyroidRESText.value = UZThyroidRESText.value.replace(/^\./gm, ''); // odstraní tečku na začátku řádek
UZThyroidRESText.value = UZThyroidRESText.value.replace(/^\s+/gm, '');  // odstraní mezery na začátku řádek
UZThyroidRESText.value = UZThyroidRESText.value.replace(/^\s*[\r\n]/gm, '');  // odstraní prázdné řádky
UZThyroidRESText.value = UZThyroidRESText.value.split(/\r?\n/).filter(item => item.trim() !== '').join('\n');  // prázdné řádky
UZThyroidRESText.value = UZThyroidRESText.value.replace(/ ,/g, ',');  // smazat mezeru před čárkou
UZThyroidRESText.value = UZThyroidRESText.value.replace(/ \./g, '.'); // smazat mezeru před tečkou
UZThyroidRESText.value = UZThyroidRESText.value.replace(/\.{2,}/g, '.'); // více teček = jedna tečka
UZThyroidRESText.value = UZThyroidRESText.value.replace(/\,{2,}/g, ','); // více čárek = jedna čárka
UZThyroidRESText.value = UZThyroidRESText.value.replace(/,\./g, '.'); // odstraní čárku před tečkou
UZThyroidRESText.value = UZThyroidRESText.value.replace(/  +/g, ' '); // dvojmezery


// pravá and levá to bilat. 
function updateBilateralSentences() {
    let text = UZThyroidRESText.value;
    let sentences = text.split('.').map(s => s.trim()).filter(s => s.length > 0);
    let uniqueSentences = {};

    sentences.forEach(sentence => {
        if (sentence.startsWith("Vpravo")) {
            let baseSentence = sentence.replace("Vpravo", "").trim();
            if (uniqueSentences[baseSentence]) {
                uniqueSentences[baseSentence] = "Bilat.";
            } else {
                uniqueSentences[baseSentence] = "Vpravo";
            }
        } else if (sentence.startsWith("Vlevo")) {
            let baseSentence = sentence.replace("Vlevo", "").trim();
            if (uniqueSentences[baseSentence]) {
                uniqueSentences[baseSentence] = "Bilat.";
            } else {
                uniqueSentences[baseSentence] = "Vlevo";
            }
        }

        else if (sentence.startsWith("Pravá")) {
            let baseSentence = sentence.replace("Pravá", "").trim();
            if (uniqueSentences[baseSentence]) {
                uniqueSentences[baseSentence] = "Obě";
            } else {
                uniqueSentences[baseSentence] = "Pravá";
            }
        } else if (sentence.startsWith("Levá")) {
            let baseSentence = sentence.replace("Levá", "").trim();
            if (uniqueSentences[baseSentence]) {
                uniqueSentences[baseSentence] = "Obě";
            } else {
                uniqueSentences[baseSentence] = "Levá";
            }
        } else {
            uniqueSentences[sentence] = "";
        }
    });

    let updatedText = Object.entries(uniqueSentences).map(([sentence, prefix]) => {
        if (prefix) {
            return prefix + " " + sentence;
        }
        return sentence;
    }).join('. ') + '.';
    UZThyroidRESText.value = updatedText;
	
	
}

updateBilateralSentences();



}
updateTexts();

