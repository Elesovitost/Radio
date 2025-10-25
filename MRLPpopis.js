function cycleText(event, texts, index, button) {
  const currentText = button.innerText;
  let currentIndex = texts.indexOf(currentText);

  if (event.button === 0) { // levé tlačítko
    if (currentIndex < texts.length - 1) {
      currentIndex++;
    }
  } else if (event.button === 2) { // pravé tlačítko
    if (currentIndex > 0) {
      currentIndex--;
    }
  }

  button.innerText = texts[currentIndex];
  return currentIndex;
}



// OSY

var textsOSA = ["((", "(", "|", ")", "))"];
var textsLORD = ["((", "(", "|", ")"];
var textsLSTV = ["ne", "S1", "L5"];

var buttonElementOSA = document.getElementById("myOSAButton");
var buttonElementLORD = document.getElementById("myLORDButton");
var buttonElementLSTV = document.getElementById("myLSTVButton");

// DEFINICE segmentů


const segmentTemplates = {
  vertebra: {
    KOM: ["není", "schmorl", "horní", "klínovitá", "výrazná"],
    LES: ["není", "hemangiom", "atyp hem", "lytické", "sklerotické"],
    LL: ["není", "ventro", "dorzo"],
    LISD: ["1 mm", "2 mm", "3 mm", "4 mm", "5 mm", "6 mm", "7 mm", "8 mm", "9 mm", "10 mm"],
    SL: ["nelýza", "lýza"]
  },
  disc: {
    DD: ["není", "mírná", "střední", "těžká"],
    MOD: ["není", "I", "II", "III"],
    BH: ["není", "bulging", "herniace", "osteofyty", "kombinace"],
    HD: ["1 mm", "2 mm", "3 mm", "4 mm", "5 mm", "6 mm", "7 mm", "8 mm", "9 mm", "10 mm"],
    FA: ["není", "mírná", "střední", "těžká", "edém"],
    HERPF: ["F", "+"],
    HERPP: ["P", "+"],
    HERC: ["C", "+"],
    HERLP: ["P", "+"],
    HERLF: ["F", "+"],
    MIG: ["M0", "M▲", "M▼"],
    PF: ["0", "1", "2", "3"],
    PR: ["0", "1", "2", "3"],
    PK: ["0", "1", "2", "3"],
    LR: ["0", "1", "2", "3"],
    LF: ["0", "1", "2", "3"]
  },
  X6: {
    LES: ["není", "hemangiom", "atyp hem", "lytické", "sklerotické"]
  }
};

const segmentMap = {
  X0: "vertebra",
  X01: "disc",
  X1: "vertebra",
  X12: "disc",
  X2: "vertebra",
  X23: "disc",
  X3: "vertebra",
  X34: "disc",
  X4: "vertebra",
  X45: "disc",
  X5: "vertebra",
  X56: "disc",
  X6: "vertebra"
};

for (const [seg, type] of Object.entries(segmentMap)) {
  const buttons = segmentTemplates[type];
  for (const [btnType, texts] of Object.entries(buttons)) {
    window[`texts${seg}${btnType}`] = texts;

    const button = document.getElementById(`my${seg}${btnType}Button`);
    if (button) {
      window[`buttonElement${seg}${btnType}`] = button;
    }
  }
}

// HIDING BUTTONS


function setupShowHide(mainButton, dependentButtons, inline = false) {
  if (!mainButton) return;
  const apply = () => {
    const displayType = inline ? 'inline-block' : 'block';
    const show = mainButton.innerText !== 'není';
    dependentButtons.forEach(btn => {
      if (btn) btn.style.display = show ? displayType : 'none';
    });
  };
  mainButton.addEventListener('mousedown', apply);
  apply(); 
}


// Obratle LL ➔ LISD a SL (block)
setupShowHide(buttonElementX0LL, [buttonElementX0LISD, buttonElementX0SL]);
setupShowHide(buttonElementX1LL, [buttonElementX1LISD, buttonElementX1SL]);
setupShowHide(buttonElementX2LL, [buttonElementX2LISD, buttonElementX2SL]);
setupShowHide(buttonElementX3LL, [buttonElementX3LISD, buttonElementX3SL]);
setupShowHide(buttonElementX4LL, [buttonElementX4LISD, buttonElementX4SL]);
setupShowHide(buttonElementX5LL, [buttonElementX5LISD, buttonElementX5SL]);
setupShowHide(buttonElementX6LL, [buttonElementX6LISD, buttonElementX6SL]);

// Prostory BH ➔ HD a herniace (inline-block)
setupShowHide(buttonElementX01BH, [buttonElementX01HD, buttonElementX01HERPF, buttonElementX01HERPP, buttonElementX01HERC, buttonElementX01HERLP, buttonElementX01HERLF, buttonElementX01MIG], true);
setupShowHide(buttonElementX12BH, [buttonElementX12HD, buttonElementX12HERPF, buttonElementX12HERPP, buttonElementX12HERC, buttonElementX12HERLP, buttonElementX12HERLF, buttonElementX12MIG], true);
setupShowHide(buttonElementX23BH, [buttonElementX23HD, buttonElementX23HERPF, buttonElementX23HERPP, buttonElementX23HERC, buttonElementX23HERLP, buttonElementX23HERLF, buttonElementX23MIG], true);
setupShowHide(buttonElementX34BH, [buttonElementX34HD, buttonElementX34HERPF, buttonElementX34HERPP, buttonElementX34HERC, buttonElementX34HERLP, buttonElementX34HERLF, buttonElementX34MIG], true);
setupShowHide(buttonElementX45BH, [buttonElementX45HD, buttonElementX45HERPF, buttonElementX45HERPP, buttonElementX45HERC, buttonElementX45HERLP, buttonElementX45HERLF, buttonElementX45MIG], true);
setupShowHide(buttonElementX56BH, [buttonElementX56HD, buttonElementX56HERPF, buttonElementX56HERPP, buttonElementX56HERC, buttonElementX56HERLP, buttonElementX56HERLF, buttonElementX56MIG], true);


//unhide operace

function toggleLastCells() {
  let operaceCheckbox = document.getElementById('operace');
  let rows = document.querySelectorAll('#TABULKA tr');

  rows.forEach(row => {
    let cells = row.querySelectorAll('td:nth-last-child(-n+3), th:last-child');
    cells.forEach(cell => {
      cell.style.display = operaceCheckbox.checked ? 'table-cell' : 'none';
    });
  });
}



// USAGE:

const buttonConfigs = [
  { textName: "OSA", updateBackground: false },
  { textName: "LORD", updateBackground: false },
  { textName: "LSTV", updateBackground: false },
  
  { textName: "X0KOM" }, { textName: "X0LES" }, { textName: "X0LL" }, { textName: "X0LISD", updateBackground: false }, { textName: "X0SL" },
  { textName: "X01DD" }, { textName: "X01MOD" }, { textName: "X01BH" }, { textName: "X01HD", updateBackground: false }, { textName: "X01FA" },
  { textName: "X01HERPF" }, { textName: "X01HERPP" }, { textName: "X01HERC" }, { textName: "X01HERLP" }, { textName: "X01HERLF" },
  { textName: "X01MIG" }, { textName: "X01PF" }, { textName: "X01PR" }, { textName: "X01PK" }, { textName: "X01LR" }, { textName: "X01LF" },

  
  { textName: "X1KOM" }, { textName: "X1LES" }, { textName: "X1LL" }, { textName: "X1LISD", updateBackground: false }, { textName: "X1SL" },
  { textName: "X12DD" }, { textName: "X12MOD" }, { textName: "X12BH" }, { textName: "X12HD", updateBackground: false }, { textName: "X12FA" },
  { textName: "X12HERPF" }, { textName: "X12HERPP" }, { textName: "X12HERC" }, { textName: "X12HERLP" }, { textName: "X12HERLF" },
  { textName: "X12MIG" }, { textName: "X12PF" }, { textName: "X12PR" }, { textName: "X12PK" }, { textName: "X12LR" }, { textName: "X12LF" },

  { textName: "X2KOM" }, { textName: "X2LES" }, { textName: "X2LL" }, { textName: "X2LISD", updateBackground: false }, { textName: "X2SL" },
  { textName: "X23DD" }, { textName: "X23MOD" }, { textName: "X23BH" }, { textName: "X23HD", updateBackground: false }, { textName: "X23FA" },
  { textName: "X23HERPF" }, { textName: "X23HERPP" }, { textName: "X23HERC" }, { textName: "X23HERLP" }, { textName: "X23HERLF" },
  { textName: "X23MIG" }, { textName: "X23PF" }, { textName: "X23PR" }, { textName: "X23PK" }, { textName: "X23LR" }, { textName: "X23LF" },

  { textName: "X3KOM" }, { textName: "X3LES" }, { textName: "X3LL" }, { textName: "X3LISD", updateBackground: false }, { textName: "X3SL" },
  { textName: "X34DD" }, { textName: "X34MOD" }, { textName: "X34BH" }, { textName: "X34HD", updateBackground: false }, { textName: "X34FA" },
  { textName: "X34HERPF" }, { textName: "X34HERPP" }, { textName: "X34HERC" }, { textName: "X34HERLP" }, { textName: "X34HERLF" },
  { textName: "X34MIG" }, { textName: "X34PF" }, { textName: "X34PR" }, { textName: "X34PK" }, { textName: "X34LR" }, { textName: "X34LF" },

  { textName: "X4KOM" }, { textName: "X4LES" }, { textName: "X4LL" }, { textName: "X4LISD", updateBackground: false }, { textName: "X4SL" },
  { textName: "X45DD" }, { textName: "X45MOD" }, { textName: "X45BH" }, { textName: "X45HD", updateBackground: false }, { textName: "X45FA" },
  { textName: "X45HERPF" }, { textName: "X45HERPP" }, { textName: "X45HERC" }, { textName: "X45HERLP" }, { textName: "X45HERLF" },
  { textName: "X45MIG" }, { textName: "X45PF" }, { textName: "X45PR" }, { textName: "X45PK" }, { textName: "X45LR" }, { textName: "X45LF" },

  { textName: "X5KOM" }, { textName: "X5LES" }, { textName: "X5LL" }, { textName: "X5LISD", updateBackground: false }, { textName: "X5SL" },
  { textName: "X56DD" }, { textName: "X56MOD" }, { textName: "X56BH" }, { textName: "X56HD", updateBackground: false }, { textName: "X56FA" },
  { textName: "X56HERPF" }, { textName: "X56HERPP" }, { textName: "X56HERC" }, { textName: "X56HERLP" }, { textName: "X56HERLF" },
  { textName: "X56MIG" }, { textName: "X56PF" }, { textName: "X56PR" }, { textName: "X56PK" }, { textName: "X56LR" }, { textName: "X56LF" },

  { textName: "X6KOM" }, { textName: "X6LES" }, { textName: "X6LL" }, { textName: "X6LISD", updateBackground: false }, { textName: "X6SL" }
];



const indexes = {};

buttonConfigs.forEach(({ textName, defaultText, updateBackground = true }) => {
  indexes[`index${textName}`] = 0;

  window[`cycle${textName}Text`] = function(event) {
    const texts = window[`texts${textName}`];
    const button = window[`buttonElement${textName}`];

    indexes[`index${textName}`] = cycleText(
      event,
      texts,
      indexes[`index${textName}`],
      button
    );

    if (button && updateBackground) {
      const referenceText = defaultText ?? texts[0]; // defaultText pokud existuje, jinak texts[0]
      button.style.backgroundColor = (button.innerText === referenceText) ? "white" : "#D4A29C";
    }

    updateTexts();
  };
});



// POPIS




var LLdiskynormal = ""; 
var LLostatnidiskynormal = "";

var LLobratlenormal = "";
var LLostatniobratlenormal = "";

var LLmicha = "";
var LLmulti = "";
var LLnormalR = ""; var variousR  = "";

var MRLumbarPOPText = document.getElementById("MRLumbarPOPText");
var MRLumbarRESText = document.getElementById("MRLumbarRESText");
var FINALText = document.getElementById("FINALText");



//stenozyR

var X01stenPK = ""; var X01stenPR = ""; var X01stenLR = ""; var X01stenPF = ""; var X01stenLF = ""; var X01stenBF = ""; 
var X01herniaceR = ""; var X01herniacePodklad = ""; var X01degenerPodklad = ""; var X01degenerdR = ""; var X01degenerfaR = ""; var X01listR = ""; var X01edemR = "";

var X12stenPK = ""; var X12stenPR = ""; var X12stenLR = ""; var X12stenPF = ""; var X12stenLF = ""; var X12stenBF = ""; 
var X12herniaceR = ""; var X12herniacePodklad = ""; var X12degenerPodklad = ""; var X12degenerdR = ""; var X12degenerfaR = ""; var X12listR = ""; var X12edemR = "";

var X23stenPK = ""; var X23stenPR = ""; var X23stenLR = ""; var X23stenPF = ""; var X23stenLF = ""; var X23stenBF = ""; 
var X23herniaceR = ""; var X23herniacePodklad = ""; var X23degenerPodklad = ""; var X23degenerdR = ""; var X23degenerfaR = ""; var X23listR = ""; var X23edemR = "";

var X34stenPK = ""; var X34stenPR = ""; var X34stenLR = ""; var X34stenPF = ""; var X34stenLF = ""; var X34stenBF = ""; 
var X34herniaceR = ""; var X34herniacePodklad = ""; var X34degenerPodklad = ""; var X34degenerdR = ""; var X34degenerfaR = ""; var X34listR = ""; var X34edemR = "";

var X45stenPK = ""; var X45stenPR = ""; var X45stenLR = ""; var X45stenPF = ""; var X45stenLF = ""; var X45stenBF = ""; 
var X45herniaceR = ""; var X45herniacePodklad = ""; var X45degenerPodklad = ""; var X45degenerdR = ""; var X45degenerfaR = ""; var X45listR = ""; var X45edemR = "";

var X56stenPK = ""; var X56stenPR = ""; var X56stenLR = ""; var X56stenPF = ""; var X56stenLF = ""; var X56stenBF = ""; 
var X56herniaceR = ""; var X56herniacePodklad = ""; var X56degenerPodklad = ""; var X56degenerdR = ""; var X56degenerfaR = ""; var X56listR = ""; var X56edemR = "";


//TEXTY
 
// nativ - upravit s každým segmentem !!!
const wX0 = "T12 ";
const wX01 = "T12/L1 ";
const wX1 = "L1 ";
const wX12 = "L1/2 ";
const wX2 = "L2 ";
const wX23 = "L2/3 ";
const wX3 = "L3 ";
const wX34 = "L3/4 ";
const wX4 = "L4 ";
const wX45 = "L4/5 ";
const wX5 = "L5 ";
const wX56 = "L5/S1 ";


// CODE

function updateTexts() {

	
var indikace = document.getElementById("indikace").value;

const levels = [
    "OSA", "LORD", "LSTV", 
	"X0LL", "X0LISD", "X0SL", "X0KOM", "X0LES", "X01BH", "X01DD", "X01MOD", "X01HD", "X01HERPF", "X01HERPP", "X01HERC", "X01HERLP", "X01HERLF", "X01MIG", "X01FA", "X01PF", "X01PR", "X01PK", "X01LR", "X01LF", 
    "X1LL", "X1LISD", "X1SL", "X1KOM", "X1LES", "X12BH", "X12DD", "X12MOD", "X12HD", "X12HERPF", "X12HERPP", "X12HERC", "X12HERLP", "X12HERLF", "X12MIG", "X12FA", "X12PF", "X12PR", "X12PK", "X12LR", "X12LF", 
    "X2LL", "X2LISD", "X2SL", "X2KOM", "X2LES", "X23BH", "X23DD", "X23MOD", "X23HD", "X23HERPF", "X23HERPP", "X23HERC", "X23HERLP", "X23HERLF", "X23MIG", "X23FA", "X23PF", "X23PR", "X23PK", "X23LR", "X23LF", 
    "X3LL", "X3LISD", "X3SL", "X3KOM", "X3LES", "X34BH", "X34DD", "X34MOD", "X34HD", "X34HERPF", "X34HERPP", "X34HERC", "X34HERLP", "X34HERLF", "X34MIG", "X34FA", "X34PF", "X34PR", "X34PK", "X34LR", "X34LF", 
    "X4LL", "X4LISD", "X4SL", "X4KOM", "X4LES", "X45BH", "X45DD", "X45MOD", "X45HD", "X45HERPF", "X45HERPP", "X45HERC", "X45HERLP", "X45HERLF", "X45MIG", "X45FA", "X45PF", "X45PR", "X45PK", "X45LR", "X45LF", 
    "X5LL", "X5LISD", "X5SL", "X5KOM", "X5LES", "X56BH", "X56DD", "X56MOD", "X56HD", "X56HERPF", "X56HERPP", "X56HERC", "X56HERLP", "X56HERLF", "X56MIG", "X56FA", "X56PF", "X56PR", "X56PK", "X56LR", "X56LF",
    "X6LL", "X6LISD", "X6SL", "X6KOM", "X6LES" 
];

levels.forEach(level => {
    const elementName = `buttonElement${level}`;
    if (window[elementName]) {
        window[`${level}Text`] = window[elementName].innerText;
    }
});


//OSY
if (OSAText === "|") {
 Osy = "Osa Lp přímá. ";
 OsyR = ""; 
} else if (OSAText === "(") {
 Osy = "Mírná dextrokonvexní skolióza. ";
 OsyR = ""; 
} else if (OSAText === ")") {
 Osy = "Mírná sinistrokonvexní skolióza. ";
 OsyR = ""; 
} else if (OSAText === "((") {
 Osy = "Dextrokonvexní skolióza. ";
 OsyR = "Dextrokonvexní skolióza. ";
} else if (OSAText === "))") {
 Osy = "Sinistrokonvexní skolióza. ";
 OsyR = "Sinistrokonvexní skolióza. ";
}

if (LORDText === "(") {
 Osy += "Lordóza přiměřená. "; 
} else if (LORDText === "|") {
 Osy += "Lordóza vyrovnaná. ";
 OsyR += "Napřímená bederní lordóza. ";
} else if (LORDText === ")") {
 Osy += "Paradoxní kyfotizace. ";
 OsyR += "Paradoxní kyfotizace bederní páteře. ";
} else if (LORDText === "((") {
 Osy += "Lordóza akcentovaná. ";
} 

if (LSTVText === "ne") {
 Osy += ""; 
} else if (LSTVText === "S1") {
 Osy += "Přechodný LS obratel, počítán jako S1. ";
 OsyR += "Přechodný LS obratel, počítán jako S1. ";
} else if (LSTVText === "L5") {
 Osy += "Přechodný LS obratel, počítán jako L5. ";
 OsyR += "Přechodný LS obratel, počítán jako L5. ";
} 

// NATIVNÍ TEXTY  

// Definice segmentů
const vertebraLabels = {
  X0: "T12",
  X1: "L1",
  X2: "L2",
  X3: "L3",
  X4: "L4",
  X5: "L5",
  X6: "S1",
  X01: "T12/L1",
  X12: "L1/2",
  X23: "L2/3",
  X34: "L3/4",
  X45: "L4/5",
  X56: "L5/S1"
};

function getVertebraLabel(id) {
  return vertebraLabels[id] || id;
}



// OPERACE
var LLoperace = "";

var stabCheckboxes = document.querySelectorAll('input[id$="stab"]:checked');
var nahrCheckboxes = document.querySelectorAll('input[id$="nahr"]:checked');
var lamCheckboxes = document.querySelectorAll('input[id$="lam"]:checked');

function extractSegmentId(id) {
  const match = id.match(/(X\d+)/);
  return match ? match[1] : id;
}

// Zadní stabilizace
if (stabCheckboxes.length > 0) {
  LLoperace += "Zadní stabilizace ";
  stabCheckboxes.forEach((checkbox, i) => {
    const segId = extractSegmentId(checkbox.id);
    const lbl = getVertebraLabel(segId);
    LLoperace += lbl + (i < stabCheckboxes.length - 1 ? "-" : "");
  });
  LLoperace += ". ";
}

// Náhrada disku
if (nahrCheckboxes.length > 0) {
  LLoperace += "Náhrada disku ";
  nahrCheckboxes.forEach((checkbox, i) => {
    const segId = extractSegmentId(checkbox.id);
    const lbl = getVertebraLabel(segId);
    LLoperace += lbl + (i < nahrCheckboxes.length - 1 ? ", " : "");
  });
  LLoperace += ". ";
}

// Laminektomie
if (lamCheckboxes.length > 0) {
  LLoperace += "Laminektomie ";
  lamCheckboxes.forEach((checkbox, i) => {
    const segId = extractSegmentId(checkbox.id);
    const lbl = getVertebraLabel(segId);
    LLoperace += lbl + (i < lamCheckboxes.length - 1 ? ", " : "");
  });
  LLoperace += ". ";
}


// LOŽISKA
var selectedLES = [X0LESText, X1LESText, X2LESText, X3LESText, X4LESText, X5LESText, X6LESText];

var hemangiomList = [];
var atypHemList = [];
var lytickeList = [];
var sklerotickeList = [];

for (var i = 0; i < selectedLES.length; i++) {
  var vertebraId = "X" + i;
  var levelName = getVertebraLabel(vertebraId);

  switch (selectedLES[i]) {
    case "hemangiom":
      hemangiomList.push(levelName);
      break;
    case "atyp hem":
      atypHemList.push(levelName);
      break;
    case "lytické":
      lytickeList.push(levelName);
      break;
    case "sklerotické":
      sklerotickeList.push(levelName);
      break;
    default:
      break;
  }
}

var LLlozisko = "";
var LLloziskoR = "";

if (hemangiomList.length > 0) {
  LLlozisko += "Ložisko T1+ STIR- (hemangiom) obratle " + hemangiomList.join(", ") + ". ";
}
if (atypHemList.length > 0) {
  LLlozisko += "Ložisko T1+/- STIR+/- obratle " + atypHemList.join(", ") + ". ";
}
if (lytickeList.length > 0) {
  LLlozisko += "Ložisko T2+ STIR+ obratle " + lytickeList.join(", ") + ". ";
  LLloziskoR += "Patologické lytické ložisko " + lytickeList.join(", ") + ". ";
}
if (sklerotickeList.length > 0) {
  LLlozisko += "Ložisko T1- T2- obratle " + sklerotickeList.join(", ") + ". ";
  LLloziskoR += "Sklerotické ložisko / hypercelulární ostrůvek " + sklerotickeList.join(", ") + ". ";
}

// KOMPRESNÍ FRAKTURY
var selectedKOM = [X0KOMText, X1KOMText, X2KOMText, X3KOMText, X4KOMText, X5KOMText, X6KOMText];

var schmorlList = [];
var horniList = [];
var klinovitaList = [];
var vyraznaList = [];

for (var i = 0; i < selectedKOM.length; i++) {
  var vertebraId = "X" + i;
  var levelName = getVertebraLabel(vertebraId);

  switch (selectedKOM[i]) {
    case "schmorl":
      schmorlList.push(levelName);
      break;
    case "horní":
      horniList.push(levelName);
      break;
    case "klínovitá":
      klinovitaList.push(levelName);
      break;
    case "výrazná":
      vyraznaList.push(levelName);
      break;
    default:
      break;
  }
}

var LLfraktura = "";
var LLfrakturaR = "";

if (schmorlList.length > 0) {
  LLfraktura += "Schmorlův uzel krycí plotny obratl. těla " + schmorlList.join(", ") + ". ";
}
if (horniList.length > 0) {
  LLfraktura += "Prolomení krycí plotny obratl. těla " + horniList.join(", ") + ". ";
  LLfrakturaR += "St.p. prolomení krycí plotny obratl. těla " + horniList.join(", ") + ". ";
}
if (klinovitaList.length > 0) {
  LLfraktura += "Klínovitá komprese obratl. těla " + klinovitaList.join(", ") + ". ";
  LLfrakturaR += "St.p. kompresivní fraktuře obratl. těla " + klinovitaList.join(", ") + ". ";
}
if (vyraznaList.length > 0) {
  LLfraktura += "Výrazná komprese obratl. těla " + vyraznaList.join(", ") + ". ";
  LLfrakturaR += "St.p. výrazné kompresi obratl. těla " + vyraznaList.join(", ") + ". ";
}

// MÍCHA
var LLmicha = "Přehledný úsek míchy bez signálových změn.";


//mícha
LLmicha = "Přehledný úsek míchy bez signálových změn.";


let codeForX01 = `
//X01

// nativ
if (X0LLText === "není" && X01DDText === "není" && X01MODText === "není" && X01BHText === "není" && X01FAText === "není" && X01PFText === "0" && X01PRText === "0" && X01PKText === "0" && X01LRText === "0" && X01LFText === "0") {
 X01nativ = ""; 
 } else {
 X01nativ = "Level0/1: ";
 } 

if (X0LLText === "není" && X01DDText !== "těžká" && X01MODText !== "I" && X01BHText === "není" && X01FAText !== "edém" && X01PFText === "0" && X01PRText === "0" && X01PKText === "0" && X01LRText === "0" && X01LFText === "0") {
 X01nativR = "";
 } else {
 X01nativR = "Level0/1: ";
 } 
 

//LISTÉZA
if (X0LLText === "není") {
 X0listezaP = ""; 
 X0listezaR = ""; 
 X01listR = "";
} else if (X0LLText === "ventro" && X0SLText === "nelýza") {
 X0listezaP = "Ventrolistéza " + wX0 + "o " + X0LISDText + " bez lýzy oblouku. ";
 X0listezaR = "Ventrolistéza obratle " + wX0 + " bez lýzy oblouku ";
 X01listR = "ventrolistézy " + wX0 + " bez lýzy oblouku, ";
} else if (X0LLText === "ventro" && X0SLText === "lýza") {
 X0listezaP = "Ventrolistéza " + wX0 + "o " + X0LISDText + " s lýzou oblouku. ";
 X0listezaR = "Ventrolistéza obratle " + wX0 + " s lýzou oblouku. ";
 X01listR = "ventrolistézy " + wX0 + " s pseudobulgingem disku ";
} else if (X0LLText === "dorzo" && X0SLText === "nelýza") {
 X0listezaP = "Retrolistéza " + wX0 + "o " + X0LISDText + " bez lýzy oblouku. ";
 X0listezaR = "Retrolistéza obratle " + wX0 + " bez lýzy oblouku. ";
 X01listR = "retrolistézy " + wX0 + " bez lýzy oblouku ";
} else if (X0LLText === "dorzo" && X0SLText === "lýza") {
 X0listezaP = "Retrolistéza " + wX0 + "o " + X0LISDText + " s lýzou oblouku. ";
 X0listezaR = "Retrolistéza obratle " + wX0 + " s lýzou oblouku. ";
 X01listR = "retrolistézy " + wX0 + " s lýzou oblouku ";
}

//DEGENERACE DISKU
if (X01DDText === "není") {
 X01degenerdP = ""; 
 X01degenerdR = "";
 X01degenerPodklad = "";
} else if (X01DDText === "mírná") {
 X01degenerdP = "Mírně snížený disk s nižší SI. ";
 X01degenerdR = "";
 X01degenerPodklad = "";
} else if (X01DDText === "střední") {
 X01degenerdP = "Snížený disk s nízkou SI. ";
 X01degenerdR = "";
 X01degenerPodklad = "";
} else if (X01DDText === "těžká") {
 X01degenerdP = "Výrazně snížený disk a osteofytický lem. ";
 X01degenerdR = "Osteochondróza. ";
 X01degenerPodklad = "osteochondrózy ";
}

//MODIC 
if (X01MODText === "není") {
 X01edemP = ""; 
 X01edemR = "";
} else if (X01MODText === "I") {
 X01edemP = "Signál T2W+ T1W- (edém) pod krycími plotnami. ";
 X01edemR = "Edém pod krycími plotnami Modic I v rámci dekompenzace degenerativních změn. ";
} else if (X01MODText === "II") {
 X01edemP = "Signál T2W+ T1W+ (tuková degenerace) pod krycími plotnami. ";
 X01edemR = "";
} else if (X01MODText === "III") {
 X01edemP = "Signál T2W- T1W- (sklerotizace) pod krycími plotnami. ";
 X01edemR = "";
}

//FACETOVÁ ARTRÓZA
if (X01FAText === "není") {
 X01degenerfaP = ""; 
 X01degenerfaR = "";
 X01edemR += "";
} else if (X01FAText === "mírná") {
 X01degenerfaP = "Mírná facetová degenerace. ";
 X01degenerfaR = "mírné facetové artrózy ";
 X01edemR += "";
} else if (X01FAText === "střední") {
 X01degenerfaP = "Facetová degenerace. ";
 X01degenerfaR = "facetové artrózy ";
 X01edemR += "";
} else if (X01FAText === "těžká") {
 X01degenerfaP = "Pokročilá facetová degenerace. ";
 X01degenerfaR = "pokročilé facetové artrózy ";
 X01edemR += "";
} else if (X01FAText === "edém") {
 X01degenerfaP = "Pokročilá facetová degenerace s okolním edémem. ";
 X01degenerfaR = "pokročilé dekompenzované facetové artrózy ";
 X01edemR += "Edém při facet. skloubeních v rámci dekompenzace degenerativních změn. ";
}

//HERNIACE  
let X01HDdiameter = parseFloat(X01HDText.split(" ")[0]);
if (X01BHText === "není") {
 X01herniace = ""; 
 X01herniaceR = "";
 X01herniacePodklad = ""; 
} else if (X01BHText === "bulging" && X01HDdiameter >= 4) {
 X01herniace = "Bulging disku " + "o " + X01HDText;
 X01herniaceR = "Bulging disku"; 
 X01herniacePodklad = "bulgingu disku ";
} else if (X01BHText === "bulging" && X01HDdiameter < 4) {
 X01herniace = "Nevýrazný bulging disku " + "o " + X01HDText;
 X01herniaceR = "Nevýrazný bulging disku"; 
 X01herniacePodklad = "bulgingu disku ";
} else if (X01BHText === "osteofyty" && X01HDdiameter >= 4) {
 X01herniace = "Spondylofyty obratl. těl " + "o " + X01HDText;
 X01herniaceR = "Výrazné spondylofyty "; 
 X01herniacePodklad = "spondylofytů obratl. těl ";
} else if (X01BHText === "osteofyty" && X01HDdiameter < 4) {
 X01herniace = "Spondylofyty " + "o " + X01HDText;
 X01herniaceR = "Spondylofyty"; 
 X01herniacePodklad = "spondylofytů ";
} else if (X01BHText === "herniace" && X01HDdiameter < 4) {
 X01herniace = "Herniace disku " + "o " + X01HDText;
 X01herniaceR = "Drobná herniace disku"; 
 X01herniacePodklad = "herniace disku ";
} else if (X01BHText === "herniace" && X01HDdiameter >= 4 && X01HDdiameter <= 6) {
 X01herniace = "Herniace disku " + "o " + X01HDText;
 X01herniaceR = "Herniace disku"; 
 X01herniacePodklad = "herniace disku ";
} else if (X01BHText === "herniace" && X01HDdiameter > 6) {
 X01herniace = "Herniace disku " + "o " + X01HDText;
 X01herniaceR = "Objemná herniace disku"; 
 X01herniacePodklad = "objemné herniace disku ";
} else if (X01BHText === "kombinace") {
 X01herniace = "Spondylofyty a protruze disku " + "o " + X01HDText;
 X01herniaceR = "Spondylofyty a protruze disku"; 
 X01herniacePodklad = "spondylofytů a bulgingu disku "; 
}

//HERNIACE SMĚR
const X01herniaDirections = [
    { text: "foraminálně vpravo", active: X01HERPFText === "+" },
    { text: "paracentrálně vpravo", active: X01HERPPText === "+" },
    { text: "centrálně", active: X01HERCText === "+" },
    { text: "paracentrálně vlevo", active: X01HERLPText === "+" },
    { text: "foraminálně vlevo", active: X01HERLFText === "+" },
  ];

  const X01activeDirections = X01herniaDirections.filter(direction => direction.active);

  if (X01BHText !== "není" && X01activeDirections.length === 0) {
    X01herniace += ""; 
	X01herniaceR += " bez stenózy páteřního kanálu a bez známek útlaku kořenů. ";
    X01herniacePodklad += "";
  } else if (X01activeDirections.length === 1) {
    X01herniace += " " + X01activeDirections[0].text;
	X01herniaceR += " " + X01activeDirections[0].text + " bez stenózy páteřního kanálu a bez známek útlaku kořenů. ";
    X01herniacePodklad += " " + X01activeDirections[0].text; 
  } else if (X01activeDirections.length > 1) {
    X01herniace += " " + X01activeDirections[0].text + " až " + X01activeDirections[X01activeDirections.length - 1].text;
	X01herniaceR += " " + X01activeDirections[0].text + " až " + X01activeDirections[X01activeDirections.length - 1].text + " bez stenózy páteřního kanálu a bez známek útlaku kořenů. ";
    X01herniacePodklad += " " + X01activeDirections[0].text + " až " + X01activeDirections[X01activeDirections.length - 1].text;
  } else {
    X01herniace += ""; 
	X01herniaceR += "";
    X01herniacePodklad += "";
  }
  


if (X01MIGText === "M0" && X01BHText !== "není") {
 X01herniace += ". "; 
} else if (X01MIGText === "M▲") {
 X01herniace += " s migrací kraniálně. ";
} else if (X01MIGText === "M▼") {
 X01herniace += " s migrací kaudálně. ";
}
 

//STENÓZY A KOŘENY
let HeSize = "";
let inp = myX01PKButton.parentElement.querySelector(".numbers");
if (inp && inp.value && inp.value.trim() !== "0") {
  HeSize = " (" + inp.value.trim() + " mm AP)";
}

if (X01PKText === "0") {
  X01stenozyP = "";
  X01stenPK = "";
} else if (X01PKText === "1") {
  X01stenozyP = "Durální vak mírně zúžen" + HeSize + ". ";
  X01stenPK = "Mírná spinální stenóza ";
} else if (X01PKText === "2") {
  X01stenozyP = "Durální vak zúžen" + HeSize + ". ";
  X01stenPK = "Spinální stenóza ";
} else if (X01PKText === "3") {
  X01stenozyP = "Durální vak výrazně zúžen" + HeSize + " s agregací kaudy. ";
  X01stenPK = "Výrazná spinální stenóza ";
}



if (X01PRText === "0") {
 X01stenozyP += ""; 
 X01stenPR = "";  
} else if (X01PRText === "1") {
 X01stenozyP += "Mírný tlak na pravostranný kořen v durálním vaku. ";
 X01stenPR = "Mírný tlak na kořen Root1 l.dx. ";
} else if (X01PRText === "2") {
 X01stenozyP += "Útlak pravostranného kořene v durálním vaku. ";
 X01stenPR = "Útlak kořene Root1 l.dx. ";
} else if (X01PRText === "3") {
 X01stenozyP += "Komprese pravostranného kořene v durálním vaku / laterálním recesu. ";
 X01stenPR = "Komprese kořene Root1 l.dx. ";
} 

if (X01LRText === "0") {
 X01stenozyP += "";  
 X01stenLR = "";
} else if (X01LRText === "1") {
 X01stenozyP += "Mírný tlak na levostranný kořen v durálním vaku. ";
 X01stenLR = "Mírný tlak na kořen Root1 l.sin. ";
} else if (X01LRText === "2") {
 X01stenozyP += "Útlak levostranného kořene v durálním vaku. ";
 X01stenLR = "Útlak kořene Root1 l.sin. ";
} else if (X01LRText === "3") {
 X01stenozyP += "Komprese levostranného kořene v durálním vaku / laterálním recesu. ";
 X01stenLR = "Komprese kořene Root1 l.sin. ";
} 



if (X01PFText === X01LFText) {
  if (X01PFText === "0") {
    X01stenozyP += "";
    X01stenBF = "";
    X01stenPF = "";
    X01stenLF = "";
  } else if (X01PFText === "1") {
    X01stenozyP += "Mírné zúžení obou foramin. ";
    X01stenBF = "Mírné zúžení obou foramin ";
    X01stenPF = "";
    X01stenLF = "";
  } else if (X01PFText === "2") {
    X01stenozyP += "Stenóza obou foramin. ";
    X01stenBF = "Stenóza obou foramin ";
    X01stenPF = "";
    X01stenLF = "";
  } else if (X01PFText === "3") {
    X01stenozyP += "Výrazná stenóza obou foramin s tvarovou defigurací kořenů. ";
    X01stenBF = "Výrazná stenóza obou foramin s kompresí kořenů Root0 l.utr. ";
    X01stenPF = "";
    X01stenLF = "";
  }
} else {
  if (X01PFText === "1") {
    X01stenozyP += "Mírné zúžení pravostranného foramina. ";
    X01stenPF = "Mírná stenóza pravostranného foramina ";
    X01stenBF = "";
  } else if (X01PFText === "2") {
    X01stenozyP += "Stenóza pravostranného foramina. ";
    X01stenPF = "Stenóza pravostranného foramina ";
    X01stenBF = "";
  } else if (X01PFText === "3") {
    X01stenozyP += "Výrazná stenóza pravostranného foramina s tvarovou defigurací kořene. ";
    X01stenPF = "Výrazná stenóza pravostranného foramina s kompresí kořene Root0 l.dx. ";
    X01stenBF = "";
  }

  if (X01LFText === "1") {
    X01stenozyP += "Mírné zúžení levostranného foramina. ";
    X01stenLF = "Mírná stenóza levostranného foramina ";
    X01stenBF = "";
  } else if (X01LFText === "2") {
    X01stenozyP += "Stenóza levostranného foramina. ";
    X01stenLF = "Stenóza levostranného foramina ";
    X01stenBF = "";
  } else if (X01LFText === "3") {
    X01stenozyP += "Výrazná stenóza levostranného foramina s tvarovou defigurací kořene. ";
    X01stenLF = "Výrazná stenóza levostranného foramina s kompresí kořene Root0 l.sin. ";
    X01stenBF = "";
  }
}

// stenózy, diametr
window.addEventListener('load',()=>document.querySelectorAll('[id^="my"][id$="PKButton"]').forEach(btn=>btn.addEventListener('mousedown',()=>setTimeout(()=>{
  const p=btn.parentElement,e=p.querySelector('.numbers');
  if(btn.innerText!=="0"){
    if(!e){
      const i=Object.assign(document.createElement('input'),{type:'number',className:'numbers PHsmall',placeholder:'mm',min:0,max:10,step:1,oninput:()=>{if(i.value==="0")i.value="";updateTexts();}});
      Object.assign(i.style,{position:'absolute',left:'50%',bottom:'100%',transform:'translateX(-50%) translateY(+1px)',zIndex:10,width:'22px',textAlign:'center',caretColor:'transparent'});
      i.addEventListener('mouseenter',()=>i.focus());
      p.style.position='relative';p.appendChild(i);
    }
  }else e?.remove();
},50))));



// combine texts

let X01stenosisArray = [X01stenPK, X01stenPR, X01stenLR, X01stenPF, X01stenLF, X01stenBF].filter(text => text !== "");  // Filter out any empty strings

if (X01stenosisArray.length > 2) {
    let last = X01stenosisArray.pop();
    last = last.charAt(0).toLowerCase() + last.slice(1);
    X01stenosisALL = X01stenosisArray.join(", ") + " a " + last;
} else if (X01stenosisArray.length == 2) {
    let first = X01stenosisArray[0];
    let second = X01stenosisArray[1].charAt(0).toLowerCase() + X01stenosisArray[1].slice(1);
    X01stenosisALL = first + " a " + second;
} else if (X01stenosisArray.length == 1) {
    X01stenosisALL = X01stenosisArray[0];
} else {
    X01stenosisALL = "";
}

let X01stenosisreasonALLArray = [X01listR, X01herniacePodklad, X01degenerPodklad, X01degenerfaR].filter(text => text !== "");  // Filter out any empty strings

if (X01stenosisreasonALLArray.length > 2) {
    let lastReason = X01stenosisreasonALLArray.pop();
    X01stenosisreasonALL = X01stenosisreasonALLArray.join(", ") + " a " + lastReason + ". ";
} else if (X01stenosisreasonALLArray.length == 2) {
    let firstReason = X01stenosisreasonALLArray[0];
    let secondReason = X01stenosisreasonALLArray[1];
    X01stenosisreasonALL = firstReason + " a " + secondReason + ". ";
} else if (X01stenosisreasonALLArray.length == 1) {
    X01stenosisreasonALL = X01stenosisreasonALLArray[0] + ". ";
} else {
    X01stenosisreasonALL = "";
}

// stenóza v závěru ano / ne a proč
if (X01PKText === "0" && X01PRText === "0" && X01LRText === "0" && X01PFText === "0" && X01LFText === "0") {
X01stenozyR = "";	
} else {
X01stenozyR = X01stenosisALL + 
" na podkladě " + X01stenosisreasonALL;
X01herniaceR = ""; X01degenerdR = ""; X0listezaR = ""; X01edemR = "";
}



`;
let codeForX12 = codeForX01.replace(/X01/g, 'X12').replace(/Level0\/1/g, 'L1/2').replace(/X0/g, 'X1').replace(/Root0/g, 'L1').replace(/Root1/g, 'L2');
let codeForX23 = codeForX01.replace(/X01/g, 'X23').replace(/Level0\/1/g, 'L2/3').replace(/X0/g, 'X2').replace(/Root0/g, 'L2').replace(/Root1/g, 'L3');
let codeForX34 = codeForX01.replace(/X01/g, 'X34').replace(/Level0\/1/g, 'L3/4').replace(/X0/g, 'X3').replace(/Root0/g, 'L3').replace(/Root1/g, 'L4');
let codeForX45 = codeForX01.replace(/X01/g, 'X45').replace(/Level0\/1/g, 'L4/5').replace(/X0/g, 'X4').replace(/Root0/g, 'L4').replace(/Root1/g, 'L5');
let codeForX56 = codeForX01.replace(/X01/g, 'X56').replace(/Level0\/1/g, 'L5/S1').replace(/X0/g, 'X5').replace(/Root0/g, 'L5').replace(/Root1/g, 'S1');
      codeForX01 = codeForX01.replace(/X01/g, 'X01').replace(/Level0\/1/g, 'T12/L1').replace(/X0/g, 'X0').replace(/Root0/g, 'T12').replace(/Root1/g, 'L1');
 
eval(codeForX01);
eval(codeForX12);
eval(codeForX23);
eval(codeForX34);
eval(codeForX45);
eval(codeForX56);


// normální Závěr

//komprese normal vs ostatni
if (X1KOMText === "není" && X2KOMText === "není" && X3KOMText === "není" && X4KOMText === "není" && X5KOMText === "není") {
 LLobratlenormal = "Obratlová těla přiměřených výšek. "; 
 LLostatniobratlenormal = ""; 
 } else {
 LLobratlenormal = "";
 LLostatniobratlenormal = "Ostatní obratlová těla přiměřených výšek. ";
 } 

// disky a kanál vs ostatní normální
if (X01DDText === "není" && X01BHText === "není" && X12DDText === "není" && X12BHText === "není" && X23DDText === "není" && X23BHText === "není" && X34DDText === "není" && X34BHText === "není" && X45DDText === "není" && X45BHText === "není" && X56DDText === "není" && X56BHText === "není") {
    LLdiskynormal = "Disky přiměřené výšky bez výraznějších protruzí."; LLostatnidiskynormal = "";
} else if ((X01DDText !== "není" || X01BHText !== "není") && (X12DDText !== "není" || X12BHText !== "není") && (X23DDText !== "není" || X23BHText !== "není") && (X34DDText !== "není" || X34BHText !== "není") && (X45DDText !== "není" || X45BHText !== "není") && (X56DDText !== "není" || X56BHText !== "není")) {
    LLdiskynormal = ""; LLostatnidiskynormal = "";
} else if ((X01DDText !== "není" || X01BHText !== "není") || (X12DDText !== "není" || X12BHText !== "není") || (X23DDText !== "není" || X23BHText !== "není") || (X34DDText !== "není" || X34BHText !== "není") || (X45DDText !== "není" || X45BHText !== "není") || (X56DDText !== "není" || X56BHText !== "není")) {
    LLdiskynormal = ""; LLostatnidiskynormal = "V ostatních etážích disky přiměřené výšky bez výraznějších protruzí.";
}

// stenóza kanálu ano vs jinak
if (X01PKText === "0" && X12PKText === "0" && X23PKText === "0" && X34PKText === "0" && X45PKText === "0" && X56PKText === "0") {
    LLstenozakanalne = "Páteřní kanál je volný. "; LLkanaljinak = "";
} else if (X01PKText !== "0" && X12PKText !== "0" && X23PKText !== "0" && X34PKText !== "0" && X45PKText !== "0" && X56PKText !== "0") {
    LLstenozakanalne = ""; LLkanaljinak = "";
} else if (X01PKText !== "0" || X12PKText !== "0" || X23PKText !== "0" || X34PKText !== "0" || X45PKText !== "0" || X56PKText !== "0") {
    LLstenozakanalne = ""; LLkanaljinak = "V ostatních etážích je páteřní kanál volný. ";
}

// stenóza foramin ano vs jinak
if (X01PFText === "0" && X01LFText === "0" && X12PFText === "0" && X12LFText === "0" && X23PFText === "0" && X23LFText === "0" && X34PFText === "0" && X34LFText === "0" && X45PFText === "0" && X45LFText === "0" && X56PFText === "0" && X56LFText === "0") {
    LLstenozaforaminne = "Foramina jsou volná. "; LLforaminjinak = "";
} else if (X01PFText !== "0" && X01LFText !== "0" && X12PFText !== "0" && X12LFText !== "0" && X23PFText !== "0" && X23LFText !== "0" && X34PFText !== "0" && X34LFText !== "0" && X45PFText !== "0" && X45LFText !== "0" && X56PFText !== "0" && X56LFText !== "0") {
    LLstenozaforaminne = ""; LLforaminjinak = "";
} else if (X01PFText !== "0" || X01LFText !== "0" || X12PFText !== "0" || X12LFText !== "0" || X23PFText !== "0" || X23LFText !== "0" || X34PFText !== "0" || X34LFText !== "0" || X45PFText !== "0" || X45LFText !== "0" || X56PFText !== "0" || X56LFText !== "0") {
    LLstenozaforaminne = ""; LLforaminjinak = "Ostatní foramina jsou relativně volná. ";
}


// multietážové degener. změny.
let DDbuttons = [myX01DDButton, myX12DDButton, myX23DDButton, myX34DDButton, myX45DDButton, myX56DDButton];
let textsNotNeni = 0; let textsStredniOrTezka = 0; let textsTezka = 0;

DDbuttons.forEach(button => {
    let buttonText = button.innerText;
    if (buttonText !== 'není') {
        textsNotNeni += 1;
        if (buttonText === 'střední' || buttonText === 'těžká') {
            textsStredniOrTezka += 1;
        }
        if (buttonText === 'těžká') {
            textsTezka += 1;
        }
    }
});

if (textsNotNeni >= 4 && textsTezka >= 2) {
    LLmulti = "Multietážové pokročilé degenerativní změny.";
} else if (textsNotNeni >= 3 && textsStredniOrTezka >= 2) {
    LLmulti = "Multietážové degenerativní změny.";
} else {
    LLmulti = "";
}



// kdy napsat normální závěr
if (X01nativR === "" && X12nativR === "" && X23nativR === "" && X34nativR === "" && X45nativR === "" && X56nativR === "" &&
    X01stenozyR === "" && X12stenozyR === "" && X23stenozyR === "" && X34stenozyR === "" && X45stenozyR === "" && X56stenozyR === "" &&
    X01edemR === "" && X12edemR === "" && X23edemR === "" && X34edemR === "" && X45edemR === "" && X56edemR === "" &&
    LLloziskoR === "" && LLfrakturaR === "" && LLmulti === "") {
    LLnormalR = "Přiměřený nález na bederní páteři.";
} else {
    LLnormalR = "";
}

// další

function toggleDalsiSection() {
  const checkbox = document.getElementById('dalsiShow');
  const fields = document.getElementById('dalsiFields');
  fields.style.display = checkbox.checked ? 'flex' : 'none';
}
window.addEventListener('load', function() {
  const checkbox = document.getElementById('dalsiShow');
  if (checkbox) {
    checkbox.addEventListener('change', toggleDalsiSection);
  }
});


function capitalizeAndDot(text) {
  text = text.trim();
  if (text.length === 0) return ""; // prázdný text nech tak
  text = text[0].toUpperCase() + text.slice(1); // první písmeno velké
  if (!/[.!?]$/.test(text)) {  // pokud text nekončí . ! nebo ?
    text += ".";
  }
  return text;
}

const dalsiPopis = capitalizeAndDot(document.getElementById('dalsiPopis').value);
const dalsiZaver = capitalizeAndDot(document.getElementById('dalsiZaver').value);


	
// FINÁLNÍ TEXTY

MRLumbarNAMEText.value = "MR bederní páteře";

MRLumbarINDText.value = indikace;

MRLumbarSEKVText.value = "L páteř v sag T1W, T2W, STIR, tra T2W, (event. tra T1W dle potřeby). ";

MRLumbarPOPText.value = 
Osy + "\n" + 
LLoperace + LLobratlenormal + LLlozisko + LLfraktura + LLostatniobratlenormal + "\n" +
LLdiskynormal + "\n" +
X01nativ + X0listezaP + " " + X01degenerdP + " " + X01edemP + " " + X01herniace + " " + X01degenerfaP + " " + X01stenozyP + "\n" + 
X12nativ + X1listezaP + " " + X12degenerdP + " " + X12edemP + " " + X12herniace + " " + X12degenerfaP + " " + X12stenozyP + "\n" + 
X23nativ + X2listezaP + " " + X23degenerdP + " " + X23edemP + " " + X23herniace + " " + X23degenerfaP + " " + X23stenozyP + "\n" + 
X34nativ + X3listezaP + " " + X34degenerdP + " " + X34edemP + " " + X34herniace + " " + X34degenerfaP + " " + X34stenozyP + "\n" +
X45nativ + X4listezaP + " " + X45degenerdP + " " + X45edemP + " " + X45herniace + " " + X45degenerfaP + " " + X45stenozyP + "\n" +
X56nativ + X5listezaP + " " + X56degenerdP + " " + X56edemP + " " + X56herniace + " " + X56degenerfaP + " " + X56stenozyP + "\n" +
LLostatnidiskynormal + "\n" + 
LLstenozakanalne + LLkanaljinak + "\n" + 
LLstenozaforaminne + LLforaminjinak + "\n" + 
LLmicha + "\n" +
dalsiPopis
;

MRLumbarPOPText.value = MRLumbarPOPText.value.replace(/^\s*[\r\n]/gm, '');  // smaže prázdné řádky
MRLumbarPOPText.value = MRLumbarPOPText.value.replace(/ \./g, '.'); // smazat mezeru před tečkou
MRLumbarPOPText.value = MRLumbarPOPText.value.replace(/  +/g, ' '); // dvojmezery

sloucitStejneRadky('MRLumbarPOPText');


MRLumbarRESText.value = 
LLoperace + "\n" +
LLmulti + "\n" +
LLnormalR + "\n" +
LLloziskoR + LLfrakturaR + "\n" +
X01nativR + X0listezaR + X01degenerdR + " " + X01herniaceR + X01stenozyR + X01edemR + "\n" +
X12nativR + X1listezaR + X12degenerdR + " " + X12herniaceR + X12stenozyR + X12edemR + "\n" +
X23nativR + X2listezaR + X23degenerdR + " " + X23herniaceR + X23stenozyR + X23edemR + "\n" +
X34nativR + X3listezaR + X34degenerdR + " " + X34herniaceR + X34stenozyR + X34edemR + "\n" +
X45nativR + X4listezaR + X45degenerdR + " " + X45herniaceR + X45stenozyR + X45edemR + "\n" +
X56nativR + X5listezaR + X56degenerdR + " " + X56herniaceR + X56stenozyR + X56edemR + "\n" +
OsyR + "\n" +
dalsiZaver;

//náhrady ostatní
MRLumbarRESText.value = MRLumbarRESText.value.split(/\r?\n/).filter(item => item.trim() !== '').join('\n');  // prázdné řádky
MRLumbarRESText.value = MRLumbarRESText.value.replace(/ ,/g, ',');  // smazat mezeru před čárkou
MRLumbarRESText.value = MRLumbarRESText.value.replace(/ \./g, '.'); // smazat mezeru před tečkou
MRLumbarRESText.value = MRLumbarRESText.value.replace(/\.{2,}/g, '.'); // více teček = jedna tečka
MRLumbarRESText.value = MRLumbarRESText.value.replace(/\,{2,}/g, ','); // více čárek = jedna čárka
MRLumbarRESText.value = MRLumbarRESText.value.replace(/,\./g, '.'); // odstraní čárku před tečkou
MRLumbarRESText.value = MRLumbarRESText.value.replace(/,\s*na\s+podkladě\s*,\s*|\s*,\s*na\s+podkladě\s*,|,\s*na\s+podkladě\s*|\s*,\s*na\s+podkladě/g, ' na podkladě ');   //odstraní čárku před podkladem
MRLumbarRESText.value = MRLumbarRESText.value.replace(/  +/g, ' '); // dvojmezery
MRLumbarRESText.value = MRLumbarRESText.value.replace(/,\s((?!L[1-5]|T12)[A-ZÚ])/g, function(fullMatch, groupMatch) {    return ', ' + groupMatch.toLowerCase();}); // po čárce malé písmeno, nevztahuje se na X1-5 a X6.
MRLumbarRESText.value = MRLumbarRESText.value.replace("Edém pod krycími plotnami Modic I v rámci dekompenzace degenerativních změn. Edém při facet. skloubeních v rámci dekompenzace degenerativních změn.", "Edém pod krycími plotnami Modic I a edém při facet. skloubeních v rámci dekompenzace degenerativních změn."); // combine. edém
MRLumbarRESText.value = MRLumbarRESText.value.replace(/^\s*[\r\n]/gm, '');  // odstraní prázdné řádky

sloucitStejneRadky('MRLumbarRESText');



document.getElementById("indikace").addEventListener("input", updateTexts);

}



updateTexts();
