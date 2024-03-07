function cloneAndUpdateIds(sourceId, destId) {
    let sourceElement = document.getElementById(sourceId);
    let clonedElement = sourceElement.cloneNode(true); 
    clonedElement.id = destId; 
    let elements = clonedElement.querySelectorAll("*");
    elements.forEach(element => {
        if (element.id) {
            element.id = element.id.replace("_R_", "_L_");
        }
    });
    sourceElement.parentNode.appendChild(clonedElement);
}

function updateTexts() {
	
var indikace = document.getElementById("indikace").value;
document.getElementById("indikace").addEventListener("input", updateTexts);

let codeforR = `

//PNO

POPXR_R_PNO = "";
RESXR_R_PNO = "";

var POPRTGChestExpSentences = [];
var RESRTGChestExpSentences = [];


ButtonCycleInnerTexts["XR_R_PNOup"] = ["PNO", "plášťový", "malý", "střední", "velký"];
var XR_R_PNOup = document.getElementById("XR_R_PNOup").innerText;

if (XR_R_PNOup === "plášťový") {
    POPRTGChestExpSentences.push("Vpravo apikálně jemný lem nedorozvinuté plíce");
    RESRTGChestExpSentences.push("Plášťový PNO vpravo apikálně");
} else if (XR_R_PNOup === "malý") {
    POPRTGChestExpSentences.push("Vpravo apikálně malé nedorozvinutí plíce");
    RESRTGChestExpSentences.push("Malý PNO vpravo apikálně");
} else if (XR_R_PNOup === "střední") {
    POPRTGChestExpSentences.push("Vpravo v horním poli nedorozvinutí plíce");
	RESRTGChestExpSentences.push("PNO vpravo v horním poli");
} else if (XR_R_PNOup === "velký") {
    POPRTGChestExpSentences.push("Vpravo výrazné nedorozvinutí plíce");
	RESRTGChestExpSentences.push("Výrazný PNO vpravo");
}

ButtonCycleInnerTexts["XR_R_PNObot"] = ["PNO", "plášťový", "malý", "střední", "velký"];
var XR_R_PNObot = document.getElementById("XR_R_PNObot").innerText;

if (XR_R_PNObot === "plášťový") {
    POPRTGChestExpSentences.push("Vpravo v KF úhlu jemný lem nedorozvinuté plíce");
    RESRTGChestExpSentences.push("Drobný PNO vpravo bazálně");
} else if (XR_R_PNObot === "malý") {
    POPRTGChestExpSentences.push("Vpravo v KF úhlu malé nedorozvinutí plíce");
    RESRTGChestExpSentences.push("Malý PNO vpravo bazálně");
} else if (XR_R_PNObot === "střední") {
    POPRTGChestExpSentences.push("Vpravo bazálně nedorozvinutí plíce");
	RESRTGChestExpSentences.push("PNO vpravo bazálně");
} else if (XR_R_PNObot === "velký") {
    POPRTGChestExpSentences.push("Vpravo výrazné nedorozvinutí plíce");
	RESRTGChestExpSentences.push("Výrazný PNO vpravo");
}


POPXR_R_PNO = POPRTGChestExpSentences.length > 0 ? POPRTGChestExpSentences.join(". ") + "." : "";
RESXR_R_PNO = RESRTGChestExpSentences.length > 0 ? RESRTGChestExpSentences.join(". ") + "." : "";



// plicní pole horní

POPXR_R_UZText = ""; RESXR_R_UZText = "";
POPXR_R_UZ = ""; RESXR_R_UZ = "";
RESXR_R_UZDevText = ""; 

ButtonCycleInnerTexts["XR_R_UZDev"] = ["vývoj", "nově", "stac.", "progrese", "regrese"];
var XR_R_UZDev = document.getElementById("XR_R_UZDev").innerText;


if (XR_R_UZDev === "nově") {
    RESXR_R_UZDevText = "nově ";
} else if (XR_R_UZDev === "stac.") {
    RESXR_R_UZDevText = "stacionární ";
} else if (XR_R_UZDev === "progrese") {
    RESXR_R_UZDevText = "progredující ";
} else if (XR_R_UZDev === "regrese") {
    RESXR_R_UZDevText = "regredující ";
}

ButtonCycleInnerTexts["XR_R_UZ"] = ["horní pole", "hypoventilace", "konsolidace", "ložisko"];
var XR_R_UZ = document.getElementById("XR_R_UZ").innerText;

if (XR_R_UZ === "hypoventilace") {
    POPXR_R_UZText = "Zastření v horním poli pravé plíce. ";
    RESXR_R_UZText = RESXR_R_UZDevText + "hypoventilační změny v horním poli pravé plíce";
} else if (XR_R_UZ === "konsolidace") {
    POPXR_R_UZText = "Neohraničené zastínění v horním poli pravé plíce. ";
    RESXR_R_UZText = RESXR_R_UZDevText + "konsolidace (v.s. zánětlivá) v horním poli pravé plíce";
} else if (XR_R_UZ === "ložisko") {
    POPXR_R_UZText = "Ohraničený stín v horním poli pravé plíce. ";
    RESXR_R_UZText = RESXR_R_UZDevText + "ložisko v horním poli pravé plíce";
} 

if (XR_R_UZ !== "horní pole") {
    document.getElementById("XR_R_UZDev").classList.remove("hidden");
}

POPXR_R_UZ = POPXR_R_UZText;
RESXR_R_UZ = RESXR_R_UZText ? RESXR_R_UZText.charAt(0).toUpperCase() + RESXR_R_UZText.slice(1) + (RESXR_R_UZText.endsWith(". ") ? "" : ". ") : "";


// plicní pole střední

POPXR_R_MZText = ""; RESXR_R_MZText = "";
POPXR_R_MZ = ""; RESXR_R_MZ = "";
RESXR_R_MZDevText = ""; 

ButtonCycleInnerTexts["XR_R_MZDev"] = ["vývoj", "nově", "stac.", "progrese", "regrese"];
var XR_R_MZDev = document.getElementById("XR_R_MZDev").innerText;

if (XR_R_MZDev === "nově") {
    RESXR_R_MZDevText = "nově ";
} else if (XR_R_MZDev === "stac.") {
    RESXR_R_MZDevText = "stacionární ";
} else if (XR_R_MZDev === "progrese") {
    RESXR_R_MZDevText = "progredující ";
} else if (XR_R_MZDev === "regrese") {
    RESXR_R_MZDevText = "regredující ";
}

ButtonCycleInnerTexts["XR_R_MZ"] = ["střední pole", "hypoventilace", "konsolidace", "ložisko"];
var XR_R_MZ = document.getElementById("XR_R_MZ").innerText;

if (XR_R_MZ === "hypoventilace") {
    POPXR_R_MZText = "Zastření ve středním poli pravé plíce. ";
    RESXR_R_MZText = RESXR_R_MZDevText + "hypoventilační změny ve středním poli pravé plíce";
} else if (XR_R_MZ === "konsolidace") {
    POPXR_R_MZText = "Neohraničené zastínění ve středním poli pravé plíce. ";
    RESXR_R_MZText = RESXR_R_MZDevText + "konsolidace (v.s. zánětlivá) ve středním poli pravé plíce";
} else if (XR_R_MZ === "ložisko") {
    POPXR_R_MZText = "Ohraničený stín ve středním poli pravé plíce. ";
    RESXR_R_MZText = RESXR_R_MZDevText + "ložisko ve středním poli pravé plíce";
} 

if (XR_R_MZ !== "střední pole") {
    document.getElementById("XR_R_MZDev").classList.remove("hidden");
}

POPXR_R_MZ = POPXR_R_MZText;
RESXR_R_MZ = RESXR_R_MZText ? RESXR_R_MZText.charAt(0).toUpperCase() + RESXR_R_MZText.slice(1) + (RESXR_R_MZText.endsWith(". ") ? "" : ". ") : "";


// plicní pole dolní

POPXR_R_LZText = ""; RESXR_R_LZText = "";
POPXR_R_LZ = ""; RESXR_R_LZ = "";
RESXR_R_LZDevText = ""; 

ButtonCycleInnerTexts["XR_R_LZDev"] = ["vývoj", "nově", "stac.", "progrese", "regrese"];
var XR_R_LZDev = document.getElementById("XR_R_LZDev").innerText;

if (XR_R_LZDev === "nově") {
    RESXR_R_LZDevText = "nově ";
} else if (XR_R_LZDev === "stac.") {
    RESXR_R_LZDevText = "stacionární ";
} else if (XR_R_LZDev === "progrese") {
    RESXR_R_LZDevText = "progredující ";
} else if (XR_R_LZDev === "regrese") {
    RESXR_R_LZDevText = "regredující ";
}

ButtonCycleInnerTexts["XR_R_LZ"] = ["dolní pole", "hypoventilace", "konsolidace", "ložisko"];
var XR_R_LZ = document.getElementById("XR_R_LZ").innerText;

if (XR_R_LZ === "hypoventilace") {
    POPXR_R_LZText = "Zastření v dolním poli pravé plíce. ";
    RESXR_R_LZText = RESXR_R_LZDevText + "hypoventilační změny v dolním poli pravé plíce";
} else if (XR_R_LZ === "konsolidace") {
    POPXR_R_LZText = "Neohraničené zastínění v dolním poli pravé plíce. ";
    RESXR_R_LZText = RESXR_R_LZDevText + "konsolidace (v.s. zánětlivá) v dolním poli pravé plíce";
} else if (XR_R_LZ === "ložisko") {
    POPXR_R_LZText = "Ohraničený stín v dolním poli pravé plíce. ";
    RESXR_R_LZText = RESXR_R_LZDevText + "ložisko v dolním poli pravé plíce";
} 

if (XR_R_LZ !== "dolní pole") {
    document.getElementById("XR_R_LZDev").classList.remove("hidden");
}

POPXR_R_LZ = POPXR_R_LZText;
RESXR_R_LZ = RESXR_R_LZText ? RESXR_R_LZText.charAt(0).toUpperCase() + RESXR_R_LZText.slice(1) + (RESXR_R_LZText.endsWith(". ") ? "" : ". ") : "";



// hilus

POPXR_R_HilusText = ""; RESXR_R_HilusText = "";

ButtonCycleInnerTexts["XR_R_Hilus"] = ["hilus", "expanze"];
var XR_R_Hilus = document.getElementById("XR_R_Hilus").innerText;

if (XR_R_Hilus === "expanze") {
    POPXR_R_HilusText = "Ložiskové zastínění v pravém hilu se ztrátou siluet. ";
	RESXR_R_HilusText = "Susp. ložisko či lymfadenipatie v pravém hilu. ";
} 

POPXR_R_Hilus = POPXR_R_HilusText;
RESXR_R_Hilus = RESXR_R_HilusText;


// tekutina

POPXR_R_FluidText = ""; RESXR_R_FluidText = "";

ButtonCycleInnerTexts["XR_R_Fluid"] = ["tekutina", "jen KF úhel", "více", "hodně"];
var XR_R_Fluid = document.getElementById("XR_R_Fluid").innerText;

if (XR_R_Fluid === "jen KF úhel") {
    POPXR_R_FluidText = "Otupení pravého KF úhlu. ";
	RESXR_R_FluidText = "Drobný fluidothorax vpravo. ";
} else if (XR_R_Fluid === "více") {
    POPXR_R_FluidText = "Zastření siluety pravé poloviny bránice tekutinou. ";
	RESXR_R_FluidText = "Fluidothorax vpravo. ";
} else if (XR_R_Fluid === "hodně") {
    POPXR_R_FluidText = "Výrazné zastření siluety pravé poloviny bránice tekutinou.  ";
	RESXR_R_FluidText = "Výrazný fluidothorax vpravo. ";
} 

POPXR_R_Fluid = POPXR_R_FluidText;
RESXR_R_Fluid = RESXR_R_FluidText;

// devices

POPXR_R_DEVjugText = ""; RESXR_R_DEVjugText = "";

ButtonCycleInnerTexts["XR_R_DEVjug"] = ["device", "CŽK", "CŽK X","sheat"];
var XR_R_DEVjug = document.getElementById("XR_R_DEVjug").innerText;

if (XR_R_DEVjug === "CŽK") {
    POPXR_R_DEVjugText = "CŽK zprava cestou v. jugularis interna. ";
	RESXR_R_DEVjugText = "CŽK zprava. ";
} else if (XR_R_DEVjug === "CŽK X") {
    POPXR_R_DEVjugText = "CŽK zprava cestou v. jugularis interna s malpozicí katetru. ";
	RESXR_R_DEVjugText = "CŽK zprava - malpozice. ";
} else if (XR_R_DEVjug === "sheat") {
    POPXR_R_DEVjugText = "Sheat zprava cestou v. jugularis interna.. ";
	RESXR_R_DEVjugText = "Sheat zprava. ";
} 

POPXR_R_DEVjug = POPXR_R_DEVjugText;
RESXR_R_DEVjug = RESXR_R_DEVjugText;


POPXR_R_DEVsubText = ""; RESXR_R_DEVsubText = "";

ButtonCycleInnerTexts["XR_R_DEVsub"] = ["device", "CŽK", "CŽK X", "PICC", "PICC X"];
var XR_R_DEVsub = document.getElementById("XR_R_DEVsub").innerText;

if (XR_R_DEVsub === "CŽK") {
    POPXR_R_DEVsubText = "CŽK zprava cestou v. sublacvia. ";
	RESXR_R_DEVsubText = "CŽK zprava. ";
} else if (XR_R_DEVsub === "CŽK X") {
    POPXR_R_DEVsubText = "CŽK zprava cestou v. sublacvia s malpozicí katetru. ";
	RESXR_R_DEVsubText = "CŽK zprava - malpozice. ";
} else if (XR_R_DEVsub === "PICC") {
    POPXR_R_DEVsubText = "PICC zprava cestou v. sublacvia. ";
	RESXR_R_DEVsubText = "PICC zprava. ";
} else if (XR_R_DEVsub === "PICC X") {
    POPXR_R_DEVsubText = "PICC zprava cestou v. sublacvia s malpozicí katetru. ";
	RESXR_R_DEVsubText = "PICC zprava - malpozice. ";
} 

POPXR_R_DEVsub = POPXR_R_DEVsubText;
RESXR_R_DEVsub = RESXR_R_DEVsubText;


`;

let codeforL = codeforR.replace(/_R_/g, '_L_').replace(/prav/g, 'lev').replace(/Prav/g, 'Lev');;
eval(codeforR);
eval(codeforL);


// srdce

POPXR_0_HeartText = "Srdeční stín nerozšířen. "; RESXR_0_HeartText = "";

ButtonCycleInnerTexts["XR_0_Heart"] = ["srdce", "hraniční", "rozšířeno", "výpotek"];
var XR_0_Heart = document.getElementById("XR_0_Heart").innerText;

if (XR_0_Heart === "hraniční") {
    POPXR_0_HeartText = "Srdeční stín je hraničně rozšířen. ";
	RESXR_0_HeartText = "Hraniční šíře srdečního stínu. ";
} else if (XR_0_Heart === "rozšířeno") {
    POPXR_0_HeartText = "Srdeční stín je rozšířen. ";
	RESXR_0_HeartText = "Rozšíření srdečního stínu. ";
} else if (XR_0_Heart === "výpotek") {
    POPXR_0_HeartText = "Srdeční stín je kulovitě rozšířen. ";
	RESXR_0_HeartText = "Kulovité rozšíření srdečního stínu susp. při perikardiálním výpotku. ";
} 

POPXR_0_Heart = POPXR_0_HeartText;
RESXR_0_Heart = RESXR_0_HeartText;


// mediastinum

POPXR_0_MediastText = "Mediastinum nerozšířeno. "; RESXR_0_MediastText = "";

ButtonCycleInnerTexts["XR_0_Mediast"] = ["mediastinum", "rozšířeno"];
var XR_0_Mediast = document.getElementById("XR_0_Mediast").innerText;

if (XR_0_Mediast === "rozšířeno") {
    POPXR_0_MediastText = "Mediastinum je rozšířeno. ";
	RESXR_0_MediastText = "Mediastinum je bůhvíproč rozšířeno. ";
} 

POPXR_0_Mediast = POPXR_0_MediastText;
RESXR_0_Mediast = RESXR_0_MediastText;



// mestnani

POPXR_0_MestText = ""; RESXR_0_MestText = "";

ButtonCycleInnerTexts["XR_0_Mest"] = ["městnání", "1. stupně", "2. stupně", "3. stupně"];
var XR_0_Mest = document.getElementById("XR_0_Mest").innerText;

if (XR_0_Mest === "1. stupně") {
    POPXR_0_MestText = "Oboustranně perihilózně rozšířené plicní žíly. ";
	RESXR_0_MestText = "Mírné městnání v malém oběhu. ";
} else if (XR_0_Mest === "2. stupně") {
    POPXR_0_MestText = "Oboustranně perihilózně výrazně rozšířené plicní žíly.  ";
	RESXR_0_MestText = "Středně pokročilé městnání v malém oběhu (intersticiální plicní edém). ";
} else if (XR_0_Mest === "3. stupně") {
    POPXR_0_MestText = "Oboustranně perihilózní a parakardiální konsolidace.  ";
	RESXR_0_MestText = "Pokročilé městnání v malém oběhu (alveolární plicní edém).  ";
} 

POPXR_0_Mest = POPXR_0_MestText;
RESXR_0_Mest = RESXR_0_MestText;



// fusions1

POPXR_PNONormal = "";

if (POPXR_R_PNO === "" && POPXR_L_PNO === "" && POPXR_R_Fluid === "" && POPXR_L_Fluid === "") {
    POPXR_PNONormal = "Plíce rozvinuty. ";
}  

if (POPXR_R_UZ + POPXR_R_MZ + POPXR_R_LZ + POPXR_L_UZ + POPXR_L_MZ + POPXR_L_LZ === "") {
    POPXR_Zones_Normal = "Parenchym přiměřené transpanrence, bez ložisek či stínů. ";
}  


// POPIS

RTGchestNAMEText.value = "RTG plic";

RTGchestINDText.value = indikace; document.getElementById("indikace").addEventListener("input", updateTexts);

RTGchestPOPText.value = 
POPXR_R_PNO + POPXR_L_PNO + POPXR_PNONormal + "\n" + 
POPXR_R_UZ + POPXR_R_MZ + POPXR_R_LZ + POPXR_L_UZ + POPXR_L_MZ + POPXR_L_LZ + POPXR_Zones_Normal + "\n" + 
POPXR_R_Fluid + POPXR_L_Fluid + "\n" + 
POPXR_0_Mediast + "\n" +  
POPXR_0_Heart + POPXR_0_Mest + "\n" + 
POPXR_R_DEVjug + POPXR_R_DEVsub + POPXR_L_DEVjug + POPXR_L_DEVsub 
;

RTGchestRESText.value = 
RESXR_R_PNO + RESXR_L_PNO + "\n" + 
RESXR_R_Fluid + RESXR_L_Fluid + "\n" + 
RESXR_R_UZ + RESXR_R_MZ + RESXR_R_LZ + RESXR_L_UZ + RESXR_L_MZ + RESXR_L_LZ + "\n" + 
RESXR_R_DEVjug + RESXR_R_DEVsub + RESXR_L_DEVjug + RESXR_L_DEVsub + "\n" + 
RESXR_0_Mediast + RESXR_0_Heart + RESXR_0_Mest 
;



RTGchestPOPText.value = RTGchestPOPText.value.replace(/^\s*[\r\n]/gm, '');  // odstraní prázdné řádky

RTGchestRESText.value = RTGchestRESText.value.replace(/^\./gm, ''); // odstraní tečku na začátku řádek
RTGchestRESText.value = RTGchestRESText.value.replace(/^\s+/gm, '');  // odstraní mezery na začátku řádek
RTGchestRESText.value = RTGchestRESText.value.replace(/^\s*[\r\n]/gm, '');  // odstraní prázdné řádky
RTGchestRESText.value = RTGchestRESText.value.split(/\r?\n/).filter(item => item.trim() !== '').join('\n');  // prázdné řádky
RTGchestRESText.value = RTGchestRESText.value.replace(/ ,/g, ',');  // smazat mezeru před čárkou
RTGchestRESText.value = RTGchestRESText.value.replace(/ \./g, '.'); // smazat mezeru před tečkou
RTGchestRESText.value = RTGchestRESText.value.replace(/\.{2,}/g, '.'); // více teček = jedna tečka
RTGchestRESText.value = RTGchestRESText.value.replace(/\,{2,}/g, ','); // více čárek = jedna čárka
RTGchestRESText.value = RTGchestRESText.value.replace(/,\./g, '.'); // odstraní čárku před tečkou
RTGchestRESText.value = RTGchestRESText.value.replace(/  +/g, ' '); // dvojmezery

if (!RTGchestRESText.value.trim() || !RTGchestRESText.value.replace(/[\n\r\s]+/g, '').length) {
    RTGchestRESText.value = "Bez patrné patologie.";
}

//fusions2

RTGchestPOPText.value = RTGchestPOPText.value.replace("Pravý KF úhel volný. Levý KF úhel volný. ", "KF úhly volné. ")

RTGchestRESText.value = RTGchestRESText.value.replace("Drobný fluidothorax vpravo. Drobný fluidothorax vlevo.", "Drobný fluidohotrax bilat. ")
                                             .replace("Fluidothorax vpravo. Fluidothorax vlevo.", "Fluidohotrax bilat. ")
                                             .replace("Výrazný fluidothorax vpravo. Výrazný fluidothorax vlevo.", "Výrazný fluidothorax bilat. ");





}
updateTexts();


