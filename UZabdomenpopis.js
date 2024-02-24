function updateTexts() {
	
var indikace = document.getElementById("indikace").value;
document.getElementById("indikace").addEventListener("input", updateTexts);


//Liver

var POPUSLiverSentences = [];
var RESUSLiverSentences = [];

ButtonCycleInnerTexts["BTCLiverMalign"] = ["0", "1", "++"];
var BTCLiverMalign = document.getElementById("BTCLiverMalign").innerText;

if (BTCLiverMalign === "1") {
    POPUSLiverSentences.push("s hypoechogenním ložiskem");
    RESUSLiverSentences.push("Ložisko jater obrazu malignity");
} else if (BTCLiverMalign === "++") {
    POPUSLiverSentences.push("s vícečetnými hypechogenními ložisky");
    RESUSLiverSentences.push("Vícečetná ložiska jater obrazu meta postižení");
}

ButtonCycleInnerTexts["BTCLiverSize"] = ["normální", "mírně zvětšena", "výrazně zvětšena", "zmenšena"];
var BTCLiverSize = document.getElementById("BTCLiverSize").innerText;

if (BTCLiverSize === "normální") {
    POPUSLiverSentences.push("normální velikosti");
} else if (BTCLiverSize === "mírně zvětšena") {
    POPUSLiverSentences.push("zasahují kaudálně pod dolní okraj pravé ledviny");
    RESUSLiverSentences.push("Mírná hepatomegalie");
} else if (BTCLiverSize === "výrazně zvětšena") {
    POPUSLiverSentences.push("výrazně zvětšena, zaoblena");
    RESUSLiverSentences.push("Hepatomegalie");
} else if (BTCLiverSize === "zmenšena") {
    POPUSLiverSentences.push("drobná");
}

ButtonCycleInnerTexts["BTCLiverParenchyma"] = ["normální", "mírná steatóza", "výrazná steatóza", "cirhóza"];
var BTCLiverParenchyma = document.getElementById("BTCLiverParenchyma").innerText;

if (BTCLiverParenchyma === "normální") {
    POPUSLiverSentences.push("s přiměřenou echogenitou parenchymu");
} else if (BTCLiverParenchyma === "mírná steatóza") {
    POPUSLiverSentences.push("se zvýšenou echogenitou parenchymu");
    RESUSLiverSentences.push("Mírná jaterní steatóza");
} else if (BTCLiverParenchyma === "výrazná steatóza") {
    POPUSLiverSentences.push("s vysokou echogenitou parenchymu");
    RESUSLiverSentences.push("Jaterní steatóza");
} else if (BTCLiverParenchyma === "cirhóza") {
    POPUSLiverSentences.push("s hrubou echotexturou parenchymu a zvlněným okrajem");
    RESUSLiverSentences.push("Obraz jaterní cirhózy");
}

ButtonCycleInnerTexts["BTCLiverCyst"] = ["0", "1", "++", "+++"];
var BTCLiverCyst = document.getElementById("BTCLiverCyst").innerText;

if (BTCLiverCyst === "1") {
    POPUSLiverSentences.push("s anechogenním ložiskem");
    RESUSLiverSentences.push("Cysta jater");
} else if (BTCLiverCyst === "++") {
    POPUSLiverSentences.push("s vícečetnými anechogenními ložisky");
    RESUSLiverSentences.push("Vícečetné cysty jater");
} else if (BTCLiverCyst === "+++") {
    POPUSLiverSentences.push("s mnohočetnými anechogenními ložisky");
    RESUSLiverSentences.push("Polycystóza jater");
}

ButtonCycleInnerTexts["BTCLiverHema"] = ["0", "1", "++"];
var BTCLiverHema = document.getElementById("BTCLiverHema").innerText;

if (BTCLiverHema === "1") {
    POPUSLiverSentences.push("s hyperechogenním ložiskem");
    RESUSLiverSentences.push("Hemangiom jater");
} else if (BTCLiverHema === "++") {
    POPUSLiverSentences.push("s vícečetnými hyperechogenními ložisky");
    RESUSLiverSentences.push("Vícečetné hemangiomy jater");
}

var POPUSLiver = POPUSLiverSentences.join(", ") + ".";
var RESUSLiver = RESUSLiverSentences.join(". ") + ".";



//Gallbladder
let POPUSGallbladderSentences = []; let RESUSGallbladderSentences = [];

ButtonCycleInnerTexts["BTCGallbladderSize"] = ["chybí", "vyprázdněn", "normální", "hydropický"];
var BTCGallbladderSize = document.getElementById("BTCGallbladderSize").innerText;

if (BTCGallbladderSize === "normální") {
    POPUSGallbladderSentences.push("přiměřené náplně");
} else if (BTCGallbladderSize === "vyprázdněn") {
    POPUSGallbladderSentences.push("je vyprázdněn a limitovaně hodnotitelný");
} else if (BTCGallbladderSize === "hydropický") {
    POPUSGallbladderSentences.push("je objemný, přes 40 mm v krátké ose");
    RESUSGallbladderSentences.push("Hydrops žlučníku");
} else if (BTCGallbladderSize === "chybí") {
    POPUSGallbladderSentences.push("není přítomen");
	RESUSGallbladderSentences.push("St.p. CHCE");
}

ButtonCycleInnerTexts["BTCGallbladderWall"] = ["normální", "hraniční", "rozšířena", "s echy"];
let BTCGallbladderWall = document.getElementById("BTCGallbladderWall").innerText;

if (BTCGallbladderWall === "normální") {
    POPUSGallbladderSentences.push("jemné stěny");
} else if (BTCGallbladderWall === "hraniční") {
    POPUSGallbladderSentences.push("s hraniční šíří stěny");
	RESUSGallbladderSentences.push("Hraniční šíře stěny žlučníku");
} else if (BTCGallbladderWall === "rozšířena") {
    POPUSGallbladderSentences.push("s rozšířenou stěnou");
	RESUSGallbladderSentences.push("Obraz akutní cholecystitis");
} else if (BTCGallbladderWall === "s echy") {
    POPUSGallbladderSentences.push("s vícečetnými echy");
	RESUSGallbladderSentences.push("Adenomyomatóza stěny žlučníku");
}

ButtonCycleInnerTexts["BTCGallbladderContent"] = ["normální", "sludge", "konkrement", "konkrementy", "kamenolom"];
let BTCGallbladderContent = document.getElementById("BTCGallbladderContent").innerText;

if (BTCGallbladderContent === "normální") {
    POPUSGallbladderSentences.push("bez konkrementů");
} else if (BTCGallbladderContent === "sludge") {
    POPUSGallbladderSentences.push("se zahuštěným obsahem");
	RESUSGallbladderSentences.push("Adenomyomatóza");
} else if (BTCGallbladderContent === "konkrement") {
    POPUSGallbladderSentences.push("se solitárním konkrementem");
	RESUSGallbladderSentences.push("Solitární cholecystolitáza");
} else if (BTCGallbladderContent === "konkrementy") {
    POPUSGallbladderSentences.push("s vícečetnými konkrementy");
	RESUSGallbladderSentences.push("Vícečetná cholecystolitáza");
} else if (BTCGallbladderContent === "kamenolom") {
    POPUSGallbladderSentences.push("vyplněn konkrementy");
	RESUSGallbladderSentences.push("Žlučník je vyplněn konkrementy");
}

POPUSGallbladder = POPUSGallbladderSentences.join(", ") + ".";
RESUSGallbladder = RESUSGallbladderSentences.join(". ") + ".";


//Spleen

RESUSSpleen = "";
ButtonCycleInnerTexts["BTCSpleenSize"] = ["chybí", "normální", "mírně zvětšena", "výrazně zvětšena"];
var BTCSpleenSize = document.getElementById("BTCSpleenSize").innerText;

if (BTCSpleenSize === "normální") {
	POPUSSpleen = "není zvětšena. ";
} else if (BTCSpleenSize === "mírně zvětšena") {
	POPUSSpleen = "je mírně zvětšena. ";
	RESUSSpleen = "Mírná splenomegalie. ";
} else if (BTCSpleenSize === "výrazně zvětšena") {
	POPUSSpleen = "je výrazně zvětšena. ";
	RESUSSpleen = "Splenomegalie. ";
} else if (BTCSpleenSize === "chybí") {
	POPUSSpleen = "není přítomna. ";
	RESUSSpleen = "St.p. splenektomii. ";
}

//Kidneys

let POPUSKidneyRSentences = [];
let POPUSKidneyLSentences = [];
let RESUSKidneyRSentences = [];
let RESUSKidneyLSentences = [];


// Right Kidney Size
ButtonCycleInnerTexts["BTCKidneyRSize"] = ["chybí", "svráštělá", "normální", "zvětšena"];
let BTCKidneyRSize = document.getElementById("BTCKidneyRSize").innerText;

if (BTCKidneyRSize === "normální") {
    POPUSKidneyRSentences.push("normální velikosti");
} else if (BTCKidneyRSize === "chybí") {
    POPUSKidneyRSentences.push("není přítomna");
    RESUSKidneyRSentences.push("St.p. pravostranné nefrektomii");
} else if (BTCKidneyRSize === "svráštělá") {
    POPUSKidneyRSentences.push("je výrazně změnšena");
    RESUSKidneyRSentences.push("Svráštělá pravá ledvina");
} else if (BTCKidneyRSize === "zvětšena") {
    POPUSKidneyRSentences.push("je zvětšena");
}

// Left Kidney Size
ButtonCycleInnerTexts["BTCKidneyLSize"] = ["chybí", "svráštělá", "normální", "zvětšena"];
let BTCKidneyLSize = document.getElementById("BTCKidneyLSize").innerText;

if (BTCKidneyLSize === "normální") {
    POPUSKidneyLSentences.push("normální velikosti");
} else if (BTCKidneyLSize === "chybí") {
    POPUSKidneyLSentences.push("není přítomna");
    RESUSKidneyLSentences.push("St.p. levostanné nefrektomii");
} else if (BTCKidneyLSize === "svráštělá") {
    POPUSKidneyLSentences.push("je výrazně změnšena");
    RESUSKidneyLSentences.push("Svráštělá levá ledvina");
} else if (BTCKidneyLSize === "zvětšena") {
    POPUSKidneyLSentences.push("je zvětšena");
}

// Right Kidney Tumor
ButtonCycleInnerTexts["BTCKidneyRMalign"] = ["0", "B 2F", "B 3", "B 4", "Tumor"];
let BTCKidneyRMalign = document.getElementById("BTCKidneyRMalign").innerText;

if (BTCKidneyRMalign !== "0") {
    if (BTCKidneyRMalign === "B 2F") {
        POPUSKidneyRSentences.push("s hypoechogenním ložiskem s jemnými septy");
        RESUSKidneyRSentences.push("Ložisko pravé ledviny obrazu septované cysty Bosniak 2F, k follow-up");
    } else if (BTCKidneyRMalign === "B 3") {
        POPUSKidneyRSentences.push("s hypoechogenním ložiskem se zesílenými septy či nodulem");
        RESUSKidneyRSentences.push("Ložisko pravé ledviny obrazu komplexní cysty Bosniak 3, susp. z malignity");
    } else if (BTCKidneyRMalign === "B 4") {
        POPUSKidneyRSentences.push("se solidně-cystickým ložiskem");
        RESUSKidneyRSentences.push("Solidně-cystický tumor pravé ledviny");
    } else if (BTCKidneyRMalign === "Tumor") {
        POPUSKidneyRSentences.push("se solidním ložiskem obrazu tumoru");
        RESUSKidneyRSentences.push("Tumor pravé ledviny");
    }
}

// Left Kidney TUmor
ButtonCycleInnerTexts["BTCKidneyLMalign"] = ["0", "B 2F", "B 3", "B 4", "Tumor"];
let BTCKidneyLMalign = document.getElementById("BTCKidneyLMalign").innerText;

if (BTCKidneyLMalign !== "0") {
    if (BTCKidneyLMalign === "B 2F") {
        POPUSKidneyLSentences.push("s hypoechogenním ložiskem s jemnými septy");
        RESUSKidneyLSentences.push("Ložisko levé ledviny obrazu septované cysty Bosniak 2F, k follow-up");
    } else if (BTCKidneyLMalign === "B 3") {
        POPUSKidneyLSentences.push("s hypoechogenním ložiskem se zesílenými septy či nodulem");
        RESUSKidneyLSentences.push("Ložisko levé ledviny obrazu komplexní cysty Bosniak 3, susp. z malignity");
    } else if (BTCKidneyLMalign === "B 4") {
        POPUSKidneyLSentences.push("se solidně-cystickým ložiskem");
        RESUSKidneyLSentences.push("Solidně-cystický tumor levé ledviny");
    } else if (BTCKidneyLMalign === "Tumor") {
        POPUSKidneyLSentences.push("se solidním ložiskem obrazu tumoru");
        RESUSKidneyLSentences.push("Tumor levé ledviny");
    }
}


// Right Kidney CPS
ButtonCycleInnerTexts["BTCKidneyRCPS"] = ["štíhlý", "akcentován", "hydronefróza II", "hydronefróza III", "hydronefróza IV"];
let BTCKidneyRCPS = document.getElementById("BTCKidneyRCPS").innerText;

if (BTCKidneyRCPS === "štíhlý") {
    POPUSKidneyRSentences.push("s nedilatovaným dutým systémem");
} else if (BTCKidneyRCPS === "akcentován") {
    POPUSKidneyRSentences.push("s výraznějším dutým systémem");
    RESUSKidneyRSentences.push("Pravá ledvina s akcentací dutého systému");
} else if (BTCKidneyRCPS === "hydronefróza II") {
    POPUSKidneyRSentences.push("s mírnou dilatací pánvičky a části kalichů");
    RESUSKidneyRSentences.push("Hydronefróza grade II vpravo");
} else if (BTCKidneyRCPS === "hydronefróza III") {
    POPUSKidneyRSentences.push("s dilatací pánvičky a všech kalichů, bez redukce parenchymu");
    RESUSKidneyRSentences.push("Hydronefróza grade III vpravo");
} else if (BTCKidneyRCPS === "hydronefróza IV") {
    POPUSKidneyRSentences.push("s výraznou dilatací pánvičky i kalichů a redukcí šíře parenchymu");
    RESUSKidneyRSentences.push("Hydronefróza grade IV vpravo");
}

// Left Kidney CPS
ButtonCycleInnerTexts["BTCKidneyLCPS"] = ["štíhlý", "akcentován", "hydronefróza II", "hydronefróza III", "hydronefróza IV"];
let BTCKidneyLCPS = document.getElementById("BTCKidneyLCPS").innerText;

if (BTCKidneyLCPS === "štíhlý") {
    POPUSKidneyLSentences.push("s nedilatovaným dutým systémem");
} else if (BTCKidneyLCPS === "akcentován") {
    POPUSKidneyLSentences.push("s výraznějším dutým systémem");
    RESUSKidneyLSentences.push("Levá ledvina s akcentací dutého systému");
} else if (BTCKidneyLCPS === "hydronefróza II") {
    POPUSKidneyLSentences.push("s mírnou dilatací pánvičky a části kalichů");
    RESUSKidneyLSentences.push("Hydronefróza grade II vlevo");
} else if (BTCKidneyLCPS === "hydronefróza III") {
    POPUSKidneyLSentences.push("s dilatací pánvičky a všech kalichů, bez redukce parenchymu");
    RESUSKidneyLSentences.push("Hydronefróza grade III vlevo");
} else if (BTCKidneyLCPS === "hydronefróza IV") {
    POPUSKidneyLSentences.push("s výraznou dilatací pánvičky i kalichů a redukcí šíře parenchymu");
    RESUSKidneyLSentences.push("Hydronefróza grade IV vlevo");
}


// Right Kidney Cyst
ButtonCycleInnerTexts["BTCKidneyRCyst"] = ["0", "1", "++", "+++"];
let BTCKidneyRCyst = document.getElementById("BTCKidneyRCyst").innerText;

if (BTCKidneyRCyst === "1") {
    POPUSKidneyRSentences.push("s anechogenním ložiskem");
    RESUSKidneyRSentences.push("Cysta pravé ledviny");
} else if (BTCKidneyRCyst === "++") {
    POPUSKidneyRSentences.push("s vícečetnými anechogenními ložisky");
    RESUSKidneyRSentences.push("Cysty pravé ledviny");
} else if (BTCKidneyRCyst === "+++") {
    POPUSKidneyRSentences.push("s mnohočetnými anechogenními ložisky");
    RESUSKidneyRSentences.push("Polycystóza pravé ledviny");
}

// Left Kidney Cyst
ButtonCycleInnerTexts["BTCKidneyLCyst"] = ["0", "1", "++", "+++"];
let BTCKidneyLCyst = document.getElementById("BTCKidneyLCyst").innerText;

if (BTCKidneyLCyst === "1") {
    POPUSKidneyLSentences.push("s anechogenním ložiskem");
    RESUSKidneyLSentences.push("Cysta levé ledviny");
} else if (BTCKidneyLCyst === "++") {
    POPUSKidneyLSentences.push("s vícečetnými anechogenními ložisky");
    RESUSKidneyLSentences.push("Cysty levé ledviny");
} else if (BTCKidneyLCyst === "+++") {
    POPUSKidneyLSentences.push("s mnohočetnými anechogenními ložisky");
    RESUSKidneyLSentences.push("Polycystóza levé ledviny");
}

POPUSKidneyR = POPUSKidneyRSentences.join(", ") + ". ";
POPUSKidneyL = POPUSKidneyLSentences.join(", ") + ". ";
RESUSKidneyR = RESUSKidneyRSentences.join(". ") + ". ";
RESUSKidneyL = RESUSKidneyLSentences.join(". ") + ". ";
  


// POPIS

UZabdomenNAMEText.value = "UZ břicha";

UZabdomenINDText.value = indikace; document.getElementById("indikace").addEventListener("input", updateTexts);

UZabdomenPOPText.value = 
"Játra " + POPUSLiver + "\n" + 
"Žlučník " + POPUSGallbladder + "\n" + 
"Slezina " + POPUSSpleen + "\n" + 
"Pravá ledvina " + POPUSKidneyR + "\n" + 
"Levá ledvina " + POPUSKidneyL
;

UZabdomenRESText.value = 
RESUSLiver + "\n" + 
RESUSGallbladder + "\n" + 
RESUSSpleen + "\n" + 
RESUSKidneyR + "\n" + 
RESUSKidneyL
;


UZabdomenRESText.value = UZabdomenRESText.value.replace(/^\./gm, ''); // odstraní tečku na začátku řádek
UZabdomenRESText.value = UZabdomenRESText.value.replace(/^\s+/gm, '');  // odstraní mezery na začátku řádek
UZabdomenRESText.value = UZabdomenRESText.value.replace(/^\s*[\r\n]/gm, '');  // odstraní prázdné řádky
UZabdomenRESText.value = UZabdomenRESText.value.split(/\r?\n/).filter(item => item.trim() !== '').join('\n');  // prázdné řádky
UZabdomenRESText.value = UZabdomenRESText.value.replace(/ ,/g, ',');  // smazat mezeru před čárkou
UZabdomenRESText.value = UZabdomenRESText.value.replace(/ \./g, '.'); // smazat mezeru před tečkou
UZabdomenRESText.value = UZabdomenRESText.value.replace(/\.{2,}/g, '.'); // více teček = jedna tečka
UZabdomenRESText.value = UZabdomenRESText.value.replace(/\,{2,}/g, ','); // více čárek = jedna čárka
UZabdomenRESText.value = UZabdomenRESText.value.replace(/,\./g, '.'); // odstraní čárku před tečkou
UZabdomenRESText.value = UZabdomenRESText.value.replace(/  +/g, ' '); // dvojmezery



}
updateTexts();

