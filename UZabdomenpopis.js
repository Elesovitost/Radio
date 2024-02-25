function updateTexts() {
	
var indikace = document.getElementById("indikace").value;
document.getElementById("indikace").addEventListener("input", updateTexts);


//Liver

var POPUSLiverSentences = [];
var RESUSLiverSentences = [];


ButtonCycleInnerTexts["BTCLiverSize"] = ["zmenšena", "normální", "mírně zvětšena", "výrazně zvětšena"];
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


//Liver malign

ButtonCycleInnerTexts["BTCLiverMalign"] = ["0", "1", "++"];
var BTCLiverMalign = document.getElementById("BTCLiverMalign").innerText;
var LiverMalignSizemm = formatLesionSize('LiverMalignSize');
var LiverMalignSize = document.getElementById('LiverMalignSize');

if (BTCLiverMalign === "0") {
	LiverMalignSize.classList.add('hidden');
} else if (BTCLiverMalign === "1") {
	LiverMalignSize.classList.remove('hidden');
    POPUSLiverSentences.push("s hypoechogenním ložiskem " + LiverMalignSizemm);
    RESUSLiverSentences.push("Ložisko jater obrazu malignity");
} else if (BTCLiverMalign === "++") {
	LiverMalignSize.classList.remove('hidden');
    POPUSLiverSentences.push("s vícečetnými hypechogenními ložisky, největší " + LiverMalignSizemm);
    RESUSLiverSentences.push("Vícečetná ložiska jater obrazu meta postižení");
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

POPUSLiver = POPUSLiverSentences.join(", ") + ".";
RESUSLiver = RESUSLiverSentences.length > 0 ? RESUSLiverSentences.join(". ") + "." : "";



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
RESUSGallbladder = RESUSGallbladderSentences.length > 0 ? RESUSGallbladderSentences.join(". ") + "." : "";


// hepatocholedochus

let POPUSHepatocholSentences = []; let RESUSHepatocholSentences = [];

ButtonCycleInnerTexts["BTCHepatochol"] = ["nepřehledný", "normální", "prostornější", "rozšířen", "s konkrementem"];
let BTCHepatochol = document.getElementById("BTCHepatochol").innerText;

if (BTCHepatochol === "normální") {
    POPUSHepatocholSentences.push("není rozšířen");
} else if (BTCHepatochol === "prostornější") {
    POPUSHepatocholSentences.push("je mírně rozšířen");
} else if (BTCHepatochol === "rozšířen") {
    POPUSHepatocholSentences.push("je dilatován");
	RESUSHepatocholSentences.push("Dilatace d. hepatocholedochus");
} else if (BTCHepatochol === "s konkrementem") {
    POPUSHepatocholSentences.push("je rozšířený s patrným konkrementem");
	RESUSHepatocholSentences.push("Choledocholitiáza s dilatací žlučových cest");
} else if (BTCHepatochol === "nepřehledný") {
    POPUSHepatocholSentences.push("není přehledný");
}	

POPUSHepatochol = POPUSHepatocholSentences.join(", ") + ".";
RESUSHepatochol = RESUSHepatocholSentences.length > 0 ? RESUSHepatocholSentences.join(". ") + "." : "";

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

// Pancreas

var POPUSPancreasSentences = [];
var RESUSPancreasSentences = [];

ButtonCycleInnerTexts["BTCPancreasParenchyma"] = ["chybí", "nepřehledný", "atrofický", "normální", "lipomatózní", "zvětšený"];
var BTCPancreasParenchyma = document.getElementById("BTCPancreasParenchyma").innerText;

if (BTCPancreasParenchyma === "chybí") {
    POPUSPancreasSentences.push("není po operaci přítomen");
	RESUSPancreasSentences.push("St.p. pancreatektomii");
} else if (BTCPancreasParenchyma === "nepřehledný") {
    POPUSPancreasSentences.push("nelze zobrazit pro plyn v GIT");
} else if (BTCPancreasParenchyma === "atrofický") {
    POPUSPancreasSentences.push("je atrofický");
    RESUSPancreasSentences.push("Atrofie pankreatu");
} else if (BTCPancreasParenchyma === "normální") {
    POPUSPancreasSentences.push("má normální velikost a vzhled");
} else if (BTCPancreasParenchyma === "lipomatózní") {
    POPUSPancreasSentences.push("s vysokou echogenitou");
} else if (BTCPancreasParenchyma === "zvětšený") {
    POPUSPancreasSentences.push("je edematózně rozšířen");
    RESUSPancreasSentences.push("Edematózní pankreas podezřelý z akutní pankreatitidy");
}

ButtonCycleInnerTexts["BTCPancreasMalign"] = ["0", "CN", "IPMN", "Tumor"];
var BTCPancreasMalign = document.getElementById("BTCPancreasMalign").innerText;
var PancreasMalignSizemm = formatLesionSize('PancreasMalignSize');
var PancreasMalignSize = document.getElementById('PancreasMalignSize');

if (BTCPancreasMalign === "0") {
    PancreasMalignSize.classList.add('hidden');
} else if (BTCPancreasMalign === "CN") {
    PancreasMalignSize.classList.remove('hidden');
    POPUSPancreasSentences.push("s cystickým ložiskem " + PancreasMalignSizemm);
    RESUSPancreasSentences.push("Cystoidní ložisko pankreatu podezřelé z cystické neoplazie");
} else if (BTCPancreasMalign === "IPMN") {
    POPUSPancreasSentences.push("s cystickým rozšířením / ložiskem " + PancreasMalignSizemm + " v kontaktu s duktem");
    RESUSPancreasSentences.push("Cystické ložisko pankreatu podezřelé z IPMN");
} else if (BTCPancreasMalign === "Tumor") {
    POPUSPancreasSentences.push("se solidním ložiskem " + PancreasMalignSizemm);
    RESUSPancreasSentences.push("Tumor pankreatu");
}


ButtonCycleInnerTexts["BTCPancreasDuct"] = ["normální", "rozšířen"];
var BTCPancreasDuct = document.getElementById("BTCPancreasDuct").innerText;

if (!(BTCPancreasParenchyma === "chybí" || BTCPancreasParenchyma === "nepřehledný")) {
    ButtonCycleInnerTexts["BTCPancreasDuct"] = ["normální", "rozšířen"];
    var BTCPancreasDuct = document.getElementById("BTCPancreasDuct").innerText;

    if (BTCPancreasDuct === "normální") {
        POPUSPancreasSentences.push("vývod nerozšířen");
    } else if (BTCPancreasDuct === "rozšířen") {
        POPUSPancreasSentences.push("vývod je rozšířen");
        RESUSPancreasSentences.push("Dilatace pankreatického vývodu");
    }
}

ButtonCycleInnerTexts["BTCPancreasCyst"] = ["0", "1", "++"];
var BTCPancreasCyst = document.getElementById("BTCPancreasCyst").innerText;

if (BTCPancreasCyst === "1") {
    POPUSPancreasSentences.push("s anechogenním ložiskem s jemnou stěnou");
    RESUSPancreasSentences.push("Pseudocysta pankreatu");
} else if (BTCPancreasCyst === "++") {
    POPUSPancreasSentences.push("s vícečetnými anechogenními ložisky s jemnou stěnou");
    RESUSPancreasSentences.push("Vícečetné pseudocysty pankreatu");
} 

POPUSPancreas = POPUSPancreasSentences.join(", ") + ".";
RESUSPancreas = RESUSPancreasSentences.length > 0 ? RESUSPancreasSentences.join(". ") + "." : "";

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
var KidneyRMalignSizemm = formatLesionSize('KidneyRMalignSize');
var KidneyRMalignSize = document.getElementById('KidneyRMalignSize');

if (BTCKidneyRMalign === "0") {
    KidneyRMalignSize.classList.add('hidden');
} else if (BTCKidneyRMalign === "B 2F") {
    KidneyRMalignSize.classList.remove('hidden');
    POPUSKidneyRSentences.push("s hypoechogenním ložiskem " + KidneyRMalignSizemm + " s jemnými septy");
    RESUSKidneyRSentences.push("Ložisko pravé ledviny obrazu septované cysty Bosniak 2F, k follow-up");
} else if (BTCKidneyRMalign === "B 3") {
    POPUSKidneyRSentences.push("s hypoechogenním ložiskem " + KidneyRMalignSizemm + " se zesílenými septy či nodulem");
    RESUSKidneyRSentences.push("Ložisko pravé ledviny obrazu komplexní cysty Bosniak 3, susp. z malignity");
} else if (BTCKidneyRMalign === "B 4") {
    POPUSKidneyRSentences.push("se solidně-cystickým ložiskem " + KidneyRMalignSizemm);
    RESUSKidneyRSentences.push("Solidně-cystický tumor pravé ledviny");
} else if (BTCKidneyRMalign === "Tumor") {
    POPUSKidneyRSentences.push("se solidním ložiskem " + KidneyRMalignSizemm + " obrazu tumoru");
    RESUSKidneyRSentences.push("Tumor pravé ledviny");
}


// Left Kidney TUmor
ButtonCycleInnerTexts["BTCKidneyLMalign"] = ["0", "B 2F", "B 3", "B 4", "Tumor"];
let BTCKidneyLMalign = document.getElementById("BTCKidneyLMalign").innerText;
var KidneyLMalignSizemm = formatLesionSize('KidneyLMalignSize');
var KidneyLMalignSize = document.getElementById('KidneyLMalignSize');

if (BTCKidneyLMalign === "0") {
    KidneyLMalignSize.classList.add('hidden');
} else if (BTCKidneyLMalign === "B 2F") {
    KidneyLMalignSize.classList.remove('hidden');
    POPUSKidneyLSentences.push("s hypoechogenním ložiskem " + KidneyLMalignSizemm + " s jemnými septy");
    RESUSKidneyLSentences.push("Ložisko pravé ledviny obrazu septované cysty Bosniak 2F, k follow-up");
} else if (BTCKidneyLMalign === "B 3") {
    POPUSKidneyLSentences.push("s hypoechogenním ložiskem " + KidneyLMalignSizemm + " se zesílenými septy či nodulem");
    RESUSKidneyLSentences.push("Ložisko pravé ledviny obrazu komplexní cysty Bosniak 3, susp. z malignity");
} else if (BTCKidneyLMalign === "B 4") {
    POPUSKidneyLSentences.push("se solidně-cystickým ložiskem " + KidneyLMalignSizemm);
    RESUSKidneyLSentences.push("Solidně-cystický tumor pravé ledviny");
} else if (BTCKidneyLMalign === "Tumor") {
    POPUSKidneyLSentences.push("se solidním ložiskem " + KidneyLMalignSizemm + " obrazu tumoru");
    RESUSKidneyLSentences.push("Tumor pravé ledviny");
}

// Right Kidney Stone
ButtonCycleInnerTexts["BTCKidneyRLith"] = ["ne", "v kalichu", "v pánvičce", "v ureteru"];
let BTCKidneyRLith = document.getElementById("BTCKidneyRLith").innerText;

if (BTCKidneyRLith === "ne") {
    POPUSKidneyRSentences.push("bez litiázy");
} else if (BTCKidneyRLith === "v kalichu") {
    POPUSKidneyRSentences.push("s hyperechem s dorzálním stínem v kalichu");
    RESUSKidneyRSentences.push("Kalikolitiáza vpravo");
} else if (BTCKidneyRLith === "v pánvičce") {
    POPUSKidneyRSentences.push("s hyperechem s dorzálním stínem v pánvičce");
    RESUSKidneyRSentences.push("Pánvičková litiáza vpravo");
} else if (BTCKidneyRLith === "v ureteru") {
    POPUSKidneyRSentences.push("s hyperechem s dorzálním stínem v ureteru");
    RESUSKidneyRSentences.push("Ureterolitiáza vpravo");
}

// Right Kidney Stone
ButtonCycleInnerTexts["BTCKidneyLLith"] = ["ne", "v kalichu", "v pánvičce", "v ureteru"];
let BTCKidneyLLith = document.getElementById("BTCKidneyLLith").innerText;

if (BTCKidneyLLith === "ne") {
    POPUSKidneyLSentences.push("bez litiázy");
} else if (BTCKidneyLLith === "v kalichu") {
    POPUSKidneyLSentences.push("s hyperechem s dorzálním stínem v kalichu");
    RESUSKidneyLSentences.push("Kalikolitiáza vlevo");
} else if (BTCKidneyLLith === "v pánvičce") {
    POPUSKidneyLSentences.push("s hyperechem s dorzálním stínem v pánvičce");
    RESUSKidneyLSentences.push("Pánvičková litiáza vlevo");
} else if (BTCKidneyLLith === "v ureteru") {
    POPUSKidneyLSentences.push("s hyperechem s dorzálním stínem v ureteru");
    RESUSKidneyLSentences.push("Ureterolitiáza vlevo");
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
RESUSKidneyR = RESUSKidneyRSentences.length > 0 ? RESUSKidneyRSentences.join(". ") + "." : "";
RESUSKidneyL = RESUSKidneyLSentences.length > 0 ? RESUSKidneyLSentences.join(". ") + "." : "";
  
// appendix

var POPUSAppendixSentences = [];
var RESUSAppendixSentences = [];

ButtonCycleInnerTexts["BTCAppendixSize"] = ["nevyšetřován", "nedetekován", "normální", "akcentován", "zánět"];
var BTCAppendixSize = document.getElementById("BTCAppendixSize").innerText;
var Appendixcmvalue = document.getElementById('Appendixcm').value;
var Appendixcm = document.getElementById('Appendixcm');

if (BTCAppendixSize === "nedetekován") {
    POPUSAppendixSentences.push("nenalezen");
    RESUSAppendixSentences.push("Appendix není přehledný");
} else if (BTCAppendixSize === "normální") {
    POPUSAppendixSentences.push("normální šíře s jemnou stěnou");
    RESUSAppendixSentences.push("Appendix bez známek zánětu");
	Appendixcm.classList.add('hidden');
} else if (BTCAppendixSize === "akcentován") {
	Appendixcm.classList.remove('hidden');
    if (Appendixcm) { // If Appendixcm is not empty
        POPUSAppendixSentences.push("hraničního diametru " + Appendixcmvalue + " mm s hraniční šíře stěny");
    } else {
        POPUSAppendixSentences.push("hraničního diametru či šíře stěny");
    }
    RESUSAppendixSentences.push("Appendix hranční šíře obrazu iritace / počínajícího zánětu");
} else if (BTCAppendixSize === "zánět") {
	Appendixcm.classList.remove('hidden');
    if (Appendixcm) { // If Appendixcm is not empty
        POPUSAppendixSentences.push("objemný diametru " + Appendixcmvalue + " mm, s rozšířenou stěnou a edémem okolí");
    } else {
        POPUSAppendixSentences.push("objemný, s rozšířenou stěnou a edémem okolí");
    }
    RESUSAppendixSentences.push("Appendix je zánětlivě rozšířen");
}


POPUSAppendix = POPUSAppendixSentences.length > 0 ? "Appendix " + POPUSAppendixSentences.join(", ") + "." : "";
RESUSAppendix = RESUSAppendixSentences.length > 0 ? RESUSAppendixSentences.join(". ") + "." : "";



// urinary bladder

var POPUSBladderSentences = [];
var RESUSBladderSentences = [];

ButtonCycleInnerTexts["BTCBladderSize"] = ["vyprázdněn", "katetr", "normální", "reziduum"];
var BTCBladderSize = document.getElementById("BTCBladderSize").innerText;

if (BTCBladderSize === "vyprázdněn") {
    POPUSBladderSentences.push("s minimální náplní");
} else if (BTCBladderSize === "katetr") {
    POPUSBladderSentences.push("s balonkem katetru");
} else if (BTCBladderSize === "normální") {
    POPUSBladderSentences.push("s přiměřenou náplní");
} else if (BTCBladderSize === "reziduum") {
    POPUSBladderSentences.push("s reziduem po mikci");
	RESUSBladderSentences.push("Po mikci reziduum v močovém měchýři");
} 

POPUSBladder = POPUSBladderSentences.join(", ") + ".";
RESUSBladder = RESUSBladderSentences.length > 0 ? RESUSBladderSentences.join(". ") + "." : "";

// sigma

var POPUSSigmaSentences = [];
var RESUSSigmaSentences = [];

ButtonCycleInnerTexts["BTCSigmaInflam"] = ["nevyšetřováno", "normální", "divertikly", "zánět"];
var BTCSigmaInflam = document.getElementById("BTCSigmaInflam").innerText;

if (BTCSigmaInflam === "normální") {
    POPUSSigmaSentences.push("bez zřetelné patologie");
    RESUSSigmaSentences.push("Předhledný levostranný tračník bez zřetelné patologie");
} else if (BTCSigmaInflam === "divertikly") {
    POPUSSigmaSentences.push("s klidnými divertikly");
    RESUSSigmaSentences.push("Divertikulóza c. sigmoideum");
} else if (BTCSigmaInflam === "zánět") {
    POPUSSigmaSentences.push("s fokálně rozšířenou stěnou s edémem okolí");
    RESUSSigmaSentences.push("Zánětlivé změny c. sigmoideum (divertikulitis)");
} 

POPUSSigma = POPUSSigmaSentences.length > 0 ? "C. sigmoideum " + POPUSSigmaSentences.join(", ") + "." : "";
RESUSSigma = RESUSSigmaSentences.length > 0 ? RESUSSigmaSentences.join(". ") + "." : "";

// uterus

var POPUSUterusSentences = [];
var RESUSUterusSentences = [];

ButtonCycleInnerTexts["BTCUterus"] = ["nevyšetřována", "není", "normální", "IUD", "myom"];
var BTCUterus = document.getElementById("BTCUterus").innerText;

if (BTCUterus === "není") {
    POPUSUterusSentences.push("není přítomna");
    RESUSUterusSentences.push("St.p. HYE");
} else if (BTCUterus === "normální") {
    POPUSUterusSentences.push("obvyklého vzhledu");
} else if (BTCUterus === "IUD") {
    POPUSUterusSentences.push("s IUD v dutině");
    RESUSUterusSentences.push("IUD");
} else if (BTCUterus === "myom") {
    POPUSUterusSentences.push("se solidním hladce ohraničeným kulovitým ložiskem");
    RESUSUterusSentences.push("Myom děložní");
} else if (BTCUterus === "myom") {
    POPUSUterusSentences.push("se solidním hladce ohraničeným kulovitým ložiskem");
    RESUSUterusSentences.push("Myom děložní");
} 

POPUSUterus = POPUSUterusSentences.length > 0 ? "Děloha " + POPUSUterusSentences.join(", ") + ". " : "";
RESUSUterus = RESUSUterusSentences.length > 0 ? RESUSUterusSentences.join(". ") + ". " : "";

//Ovary R

var POPUSAdnexaRSentences = [];
var RESUSAdnexaRSentences = [];

ButtonCycleInnerTexts["BTCAdnexaR"] = ["nevyšetřováno", "normální", "cysta do 5 cm", "cysta 5-7 cm", "cysta nad 7 cm", "tumor"];
var BTCAdnexaR = document.getElementById("BTCAdnexaR").innerText;

if (BTCAdnexaR === "normální") {
    POPUSAdnexaRSentences.push("bez patrné patologie");
} else if (BTCAdnexaR === "cysta do 5 cm") {
    POPUSAdnexaRSentences.push("s cystickým ložiskem s jemnou stěnou diametru do 5 cm");
} else if (BTCAdnexaR === "cysta 5-7 cm") {
    POPUSAdnexaRSentences.push("s cystickým ložiskem s jemnou stěnou diametru 5-7 cm");
    RESUSAdnexaRSentences.push("Cysta pravého ovária k follow up (za rok)");
} else if (BTCAdnexaR === "cysta nad 7 cm") {
    POPUSAdnexaRSentences.push("s cystickým ložiskem diametru nad 7 cm");
    RESUSAdnexaRSentences.push("Cystické ložisko pravého ovária nad 7 cm, k dovyšetření");
} else if (BTCAdnexaR === "tumor") {
    POPUSAdnexaRSentences.push("se solidním či solidně-cystickým ložiskem");
    RESUSAdnexaRSentences.push("Patologické ložisko v oblasti pravého ovária obrazu tumoru");
} 

POPUSAdnexaR = POPUSAdnexaRSentences.length > 0 ? "Pravé ovárium " + POPUSAdnexaRSentences.join(", ") + ". " : "";
RESUSAdnexaR = RESUSAdnexaRSentences.length > 0 ? RESUSAdnexaRSentences.join(". ") + ". " : "";

//Ovary L

var POPUSAdnexaLSentences = [];
var RESUSAdnexaLSentences = [];

ButtonCycleInnerTexts["BTCAdnexaL"] = ["nevyšetřováno", "normální", "cysta do 5 cm", "cysta 5-7 cm", "cysta nad 7 cm", "tumor"];
var BTCAdnexaL = document.getElementById("BTCAdnexaL").innerText;

if (BTCAdnexaL === "normální") {
    POPUSAdnexaLSentences.push("bez patrné patologie");
} else if (BTCAdnexaL === "cysta do 5 cm") {
    POPUSAdnexaLSentences.push("s cystickým ložiskem s jemnou stěnou diametru do 5 cm");
} else if (BTCAdnexaL === "cysta 5-7 cm") {
    POPUSAdnexaLSentences.push("s cystickým ložiskem s jemnou stěnou diametru 5-7 cm");
    RESUSAdnexaLSentences.push("Cysta levého ovária k follow up (za rok)");
} else if (BTCAdnexaL === "cysta nad 7 cm") {
    POPUSAdnexaLSentences.push("s cystickým ložiskem diametru nad 7 cm");
    RESUSAdnexaLSentences.push("Cystické ložisko levého ovária nad 7 cm, k dovyšetření");
} else if (BTCAdnexaL === "tumor") {
    POPUSAdnexaLSentences.push("se solidním či solidně-cystickým ložiskem");
    RESUSAdnexaLSentences.push("Patologické ložisko v oblasti levého ovária obrazu tumoru");
} 

POPUSAdnexaL = POPUSAdnexaLSentences.length > 0 ? "Levé ovárium " + POPUSAdnexaLSentences.join(", ") + ". " : "";
RESUSAdnexaL = RESUSAdnexaLSentences.length > 0 ? RESUSAdnexaLSentences.join(". ") + ". " : "";

// ascites

var POPUSAscitesSentences = [];
var RESUSAscitesSentences = [];

ButtonCycleInnerTexts["BTCAscites"] = ["není", "minimum", "v pánvi", "i mezikličkově", "i u jater", "masivně"];
var BTCAscites = document.getElementById("BTCAscites").innerText;

if (BTCAscites === "není") {
    POPUSAscitesSentences.push("bez volné tekutiny");
} else if (BTCAscites === "minimum") {
    POPUSAscitesSentences.push("s minimem tekutiny v malé pánvi");
} else if (BTCAscites === "v pánvi") {
    POPUSAscitesSentences.push("s lehce zvýšeným množstvím tekutiny v malé pánvi");
    RESUSAscitesSentences.push("Malý ascites s tekutinou v pánvi");
} else if (BTCAscites === "i mezikličkově") {
    POPUSAscitesSentences.push("s tekutinou v pánvi a mezikličkově");
    RESUSAscitesSentences.push("Ascites s tekutinou v pánvi a mezikličkově");
} else if (BTCAscites === "i u jater") {
    POPUSAscitesSentences.push("s tekutinou v pánvi, mezikličkově i pod játry");
    RESUSAscitesSentences.push("Ascites s tekutinou v pánvi, mezikličkově i pod játry");
} else if (BTCAscites === "masivně") {
    POPUSAscitesSentences.push("s velkým množstvím tekutiny v celém rozsahu");
    RESUSAscitesSentences.push("Výrazný ascites");
} 

POPUSAscites = POPUSAscitesSentences.length > 0 ? "Dutina břišní " + POPUSAscitesSentences.join(", ") + ". " : "";
RESUSAscites = RESUSAscitesSentences.length > 0 ? RESUSAscitesSentences.join(". ") + ". " : "";


// pleural

var PleuralR = document.getElementById('PleuralR').value; var PleuralL = document.getElementById('PleuralL').value;

var POPUSPleuralSentences = [];
var RESUSPleuralSentences = [];

if (PleuralR !== "") {
	POPUSPleuralSentences.push("Pleurálně vpravo " + PleuralR + " cm tekutiny");
    RESUSPleuralSentences.push("Fluidothorax vpravo (" + PleuralR + " cm)");
} 

if (PleuralL !== "") {
	POPUSPleuralSentences.push("Pleurálně vlevo " + PleuralL + " cm tekutiny");
    RESUSPleuralSentences.push("Fluidothorax vlevo (" + PleuralL + " cm)");
} 
POPUSPleural = POPUSPleuralSentences.length > 0 ? POPUSPleuralSentences.join(". ") + ". " : "";
RESUSPleural = RESUSPleuralSentences.length > 0 ? RESUSPleuralSentences.join(". ") + ". " : "";

// POPIS

UZabdomenNAMEText.value = "UZ břicha";

UZabdomenINDText.value = indikace; document.getElementById("indikace").addEventListener("input", updateTexts);

UZabdomenPOPText.value = 
"Játra " + POPUSLiver + "\n" + 
"Žlučník " + POPUSGallbladder + " Ductus hepatocholedochus " + POPUSHepatochol + "\n" + 
"Pankreas " + POPUSPancreas + "\n" +
"Slezina " + POPUSSpleen + "\n" + 
"Pravá ledvina " + POPUSKidneyR + "\n" + 
"Levá ledvina " + POPUSKidneyL + "\n" + 
"Močový měchýř " + POPUSBladder + "\n" + 
POPUSAppendix + RESUSSigma + "\n" + 
POPUSUterus + POPUSAdnexaR + POPUSAdnexaL + "\n" +
POPUSAscites + POPUSPleural
;

UZabdomenRESText.value = 
RESUSLiver + "\n" + 
RESUSGallbladder + RESUSHepatochol + "\n" + 
RESUSPancreas + "\n" + 
RESUSSpleen + "\n" + 
RESUSKidneyR + "\n" + 
RESUSKidneyL + "\n" + 
RESUSAppendix + POPUSSigma + "\n" +
RESUSUterus + RESUSAdnexaR + RESUSAdnexaL + "\n" +
RESUSAscites + RESUSPleural
;


UZabdomenPOPText.value = UZabdomenPOPText.value.replace(/^\s*[\r\n]/gm, '');  // odstraní prázdné řádky

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

