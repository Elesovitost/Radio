function cloneAndUpdateIds(sourceId, destId) {
    let sourceElement = document.getElementById(sourceId);
    let clonedElement = sourceElement.cloneNode(true); 
    clonedElement.id = destId; 
    let elements = clonedElement.querySelectorAll("*");
    elements.forEach(element => {
        if (element.id) {
            element.id = element.id.replace("CarotR", "CarotL").replace("VertR", "VertL");
        }
    });
    sourceElement.parentNode.appendChild(clonedElement);
}


function updateTexts() {
	
var indikace = document.getElementById("indikace").value;
document.getElementById("indikace").addEventListener("input", updateTexts);


let codeforR = `
//CarotR 
var UZCarotRCCA = document.getElementById('UZCarotRCCA').value;
var UZCarotRICA = document.getElementById('UZCarotRICA').value;
var UZCarotRRI = document.getElementById('UZCarotRRI').value;
var UZCarotRASmm = document.getElementById('UZCarotRASmm').value; var UZCarotRASmmhide = document.getElementById('UZCarotRASmm');

var POPUSCarotRSentences = [];
var RESUSCarotRSentences = [];

ButtonCycleInnerTexts["UZCarotRASno"] = ["0", "+", "++", "+++", "circ", "okluze"];
var UZCarotRASno = document.getElementById("UZCarotRASno").innerText;
var UZCarotRASmater = document.getElementById('UZCarotRASmater');

if (UZCarotRASno === "0") {
	UZCarotRASmater.classList.add('hidden');  UZCarotRASmmhide.classList.add('hidden'); 
    POPUSCarotRSentences.push("nejsou přítomny");
	RESUSCarotRno =  "";
} else if (UZCarotRASno === "+") {
	UZCarotRASmater.classList.remove('hidden');  UZCarotRASmmhide.classList.remove('hidden'); 
    POPUSCarotRSentences.push("ojedinělé drobné");
	RESUSCarotRno =  "ojedinělých drobných";
} else if (UZCarotRASno === "++") {
    POPUSCarotRSentences.push("vícečetné");
	RESUSCarotRno =  "vícečetných";
} else if (UZCarotRASno === "+++") {
    POPUSCarotRSentences.push("mnohočetné");
	RESUSCarotRno =  "mnohočetných";
} else if (UZCarotRASno === "circ") {
    POPUSCarotRSentences.push("cirkulární");
	RESUSCarotRno =  "cirkulárních";
}  else if (UZCarotRASno === "okluze") {
    POPUSCarotRSentences.push("okludující");
	RESUSCarotRno =  "okludujících";
} 

if (UZCarotRASno !== "0") {
    ButtonCycleInnerTexts["UZCarotRASmater"] = ["kalcif.", "smíšené", "měkké", "exulc."];
    var UZCarotRASmaterText = document.getElementById("UZCarotRASmater").innerText;

    if (UZCarotRASmaterText === "kalcif.") {
        POPUSCarotRSentences.push("kalcifikované");
		RESUSCarotRmater =  "kalcifikovaných plátů. ";
    } else if (UZCarotRASmaterText === "smíšené") {
        POPUSCarotRSentences.push("smíšené");
		RESUSCarotRmater =  "smíšených plátů. ";
    } else if (UZCarotRASmaterText === "měkké") {
        POPUSCarotRSentences.push("měkké");
		RESUSCarotRmater =  "měkkých plátů. ";
    } else if (UZCarotRASmaterText === "exulc.") {
        POPUSCarotRSentences.push("přítomen i exulcerovaný plát");
		RESUSCarotRmater =  "exulcerovaného plátu"; RESUSCarotRno = "";
    }
}

	if (UZCarotRASmm !== "")  {
		POPUSCarotRSentences.push("výšky do " + UZCarotRASmm + " mm");
		} 
			

POPUSCarotR = POPUSCarotRSentences.join(", ") + ".";
RESUSCarotR = RESUSCarotRSentences.length > 0 ? RESUSCarotRSentences.join(". ") + "." : "";

//vettebralR
var POPUSVertRSentences = [];
var RESUSVertRSentences = [];

ButtonCycleInnerTexts["UZVertRsize"] = ["nedetek.", "gracilní", "normální", "dominant"];
var UZVertRsize = document.getElementById("UZVertRsize").innerText;

if (UZVertRsize === "nedetek.") {
    POPUSVertRSentences.push("není detekovatelná");
	RESUSVertRSentences.push("Pravá vertebrální arterie bez detekovatelného toku");
} else if (UZVertRsize === "gracilní") {
    POPUSVertRSentences.push("gracilní");
} else if (UZVertRsize === "normální") {
    POPUSVertRSentences.push("přiměřené šíře");
} else if (UZVertRsize === "dominant") {
    POPUSVertRSentences.push("asymetricky širší");
} 

ButtonCycleInnerTexts["UZVertRflow"] = ["tok↑", "tok↓"];
var UZVertRflow = document.getElementById("UZVertRflow").innerText;
var RESUSVert = "";

if (UZVertRflow === "tok↑") {
    POPUSVertRSentences.push("s kraniálním tokem");
} else if (UZVertRflow === "tok↓") {
    POPUSVertRSentences.push("s patologickým reverzním kaudálním tokem");
	RESUSVertRSentences.push("Pravá verterální arterie s obráceným tokem (subclavian steal syndrome).");
} 

POPUSVertR = POPUSVertRSentences.join(", ") + ".";
RESUSVertR = RESUSVertRSentences.length > 0 ? RESUSVertRSentences.join(". ") + "." : "";

// interpretatation CarotR

var RICACCA = UZCarotRICA / UZCarotRCCA;
var RICAEDV = UZCarotRICA * (1 - UZCarotRRI);

RESCarotR = "Nejednoznačný nález, neshodují se kritéria k automatizaci závěru, nutno interpretovat."; // Default value

if (UZCarotRICA === "" && UZCarotRASno ==="") {
    RESCarotR = "";
}
else if (UZCarotRASno === "okluze") {
    RESCarotR = "Okluze (či téměř okluze) prox. ICA na podkladě " + RESUSCarotRno + " " + RESUSCarotRmater;
}
else if (UZCarotRASno !== "0" && UZCarotRICA >= 230) {
    RESCarotR = "Vpravo významná stenóza ICA nad 70% na podkladě " + RESUSCarotRno + " " + RESUSCarotRmater;
}
else if (UZCarotRASno !== "0" && UZCarotRICA >= 125 && UZCarotRICA < 230) {
    RESCarotR = "Vpravo stenóza ICA 50-69% na podkladě " + RESUSCarotRno + " " + RESUSCarotRmater;
}
else if (UZCarotRASno !== "0" && UZCarotRASno !== "+" && UZCarotRICA < 125 && UZCarotRASmm <3) {
    RESCarotR = "Vpravo nevýznamná a nevýrazná stenóza na podkladě " + RESUSCarotRno + " " + RESUSCarotRmater;
}
else if (UZCarotRASno !== "0" && UZCarotRASno !== "+" && UZCarotRICA < 125 && UZCarotRASmm >= 3) {
    RESCarotR = "Vpravo nevýznamná stenóza do 50% na podkladě " + RESUSCarotRno + " " + RESUSCarotRmater;
}
else if (UZCarotRASno === "+" && UZCarotRICA < 125) {
    RESCarotR = "Vpravo věku přiměřený nález s minimálními AS změnami bez stenóz. ";
}
else if (UZCarotRASno === "0" && UZCarotRICA < 125) {
    RESCarotR = "Vpravo přiměřený nález bez AS změn a bez stenóz. ";
}
else if (UZCarotRASno === "0" && UZCarotRICA >= 125) {
    RESCarotR = "Vpravo abnormální rychlost v ICA bez AS změn a bez stenóz. ";
}


`;

let codeforL = codeforR.replace(/CarotR/g, 'CarotL').replace(/VertR/g, 'VertL').replace(/prav/g, 'lev').replace(/Prav/g, 'Lev');;
eval(codeforR);
eval(codeforL);



if (UZCarotRCCA !== 0 && UZCarotRCCA !== "") {POPUZCarotRCCAPSV = "R-CCA: PSV " + UZCarotRCCA + " cm/s.";} else {POPUZCarotRCCAPSV = "";}
if (UZCarotRRI !== 0 && UZCarotRRI !== "") {POPUZCarotRICARI = "RI: " + UZCarotRRI + ". ";} else {POPUZCarotRICARI = "";}

if (UZCarotLCCA !== 0 && UZCarotLCCA !== "") {POPUZCarotLCCAPSV = "L-CCA: PSV " + UZCarotLCCA + " cm/s.";} else {POPUZCarotLCCAPSV = "";}
if (UZCarotLRI !== 0 && UZCarotLRI !== "") {POPUZCarotLICARI = "RI: " + UZCarotLRI + ". ";} else {POPUZCarotLICARI = "";}


// POPIS

UZCarotidNAMEText.value = "UZ karotid";

UZCarotidINDText.value = indikace; document.getElementById("indikace").addEventListener("input", updateTexts);

UZCarotidPOPText.value = 
POPUZCarotRCCAPSV + "\n" +
"R-ICA: PSV " + UZCarotRICA + " cm/s. " + POPUZCarotRICARI + "\n" + 
"Aterosklerotické pláty " + POPUSCarotR + "\n" +
"R-VA: " + POPUSVertR + "\n" +
"<empty_row>" +  "\n" +
POPUZCarotLCCAPSV + "\n" +
"L-ICA: PSV " + UZCarotLICA + " cm/s. " + POPUZCarotLICARI + "\n" + 
"Aterosklerotické pláty " + POPUSCarotL + "\n" +
"L-VA: " + POPUSVertL + "\n"
;


UZCarotidRESText.value = 
RESCarotR + RESCarotL + "\n" +
RESUSVertR + RESUSVertL 
;


UZCarotidPOPText.value = UZCarotidPOPText.value.replace(/^\s*[\r\n]/gm, '');  // odstraní prázdné řádky
UZCarotidPOPText.value = UZCarotidPOPText.value.replace(/<empty_row>/g, ''); //nahradní <empty_row> prázdnem

UZCarotidRESText.value = UZCarotidRESText.value.replace(/^\./gm, ''); // odstraní tečku na začátku řádek
UZCarotidRESText.value = UZCarotidRESText.value.replace(/^\s+/gm, '');  // odstraní mezery na začátku řádek
UZCarotidRESText.value = UZCarotidRESText.value.replace(/^\s*[\r\n]/gm, '');  // odstraní prázdné řádky
UZCarotidRESText.value = UZCarotidRESText.value.split(/\r?\n/).filter(item => item.trim() !== '').join('\n');  // prázdné řádky
UZCarotidRESText.value = UZCarotidRESText.value.replace(/ ,/g, ',');  // smazat mezeru před čárkou
UZCarotidRESText.value = UZCarotidRESText.value.replace(/ \./g, '.'); // smazat mezeru před tečkou
UZCarotidRESText.value = UZCarotidRESText.value.replace(/\.{2,}/g, '.'); // více teček = jedna tečka
UZCarotidRESText.value = UZCarotidRESText.value.replace(/\,{2,}/g, ','); // více čárek = jedna čárka
UZCarotidRESText.value = UZCarotidRESText.value.replace(/,\./g, '.'); // odstraní čárku před tečkou
UZCarotidRESText.value = UZCarotidRESText.value.replace(/  +/g, ' '); // dvojmezery


// pravá and levá to bilat. 
function updateBilateralSentences() {
    let text = UZCarotidRESText.value;
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
    UZCarotidRESText.value = updatedText;
	
	
}

updateBilateralSentences();



}
updateTexts();

