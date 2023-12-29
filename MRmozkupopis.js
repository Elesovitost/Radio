// dodělat +sekvence, ostatní, více ložisek, ischemii, RS zvlášť



var obecnetext = document.getElementById("obecnetext");
var WMtext = document.getElementById("WMtext");
var MKtext = document.getElementById("MKtext");
var LKtext = document.getElementById("LKtext");



function updateTexts() {
	

var indikace = document.getElementById("indikace").value;

var checkboxsekMMK = document.getElementById('checkboxsekMMK');
var checkboxsekHEMA = document.getElementById('checkboxsekHEMA');
var checkboxsekkontrast = document.getElementById('checkboxsekkontrast');
var checkboxsekangio = document.getElementById('checkboxsekangio');
var checkboxsekCmicha = document.getElementById('checkboxsekCmicha');

const WMLText = buttonElementWML.innerText;
var WMLkdeText = document.getElementById("WMLkde").value;
var RSP = ""; var RSR = ""; var checkboxRS = document.getElementById('checkboxRS');

const GCAText = buttonElementGCA.innerText;
var lobaratrophy = document.getElementById("lobaratrophy").value; 
const ventriclesText = buttonElementventricles.innerText;

const MMKRText = buttonElementMMKR.innerText;
const MMKLText = buttonElementMMKL.innerText;

var Lesion1 = document.getElementById("Lesion1").value; 
var Lesion1axial = document.getElementById("Lesion1axial").value; 
var Lesion1lokR = document.getElementById("Lesion1lokR").value; 
var Lesion1lokL = document.getElementById("Lesion1lokL").value; 
var Lesion1detail = document.getElementById("Lesion1detail").value; 
var Lesion1signal = document.getElementById("Lesion1signal").value; 
const Lesion1enhancementText = buttonElementLesion1enhancement.innerText;
var Lesion1size = document.getElementById("Lesion1size").value; 

var Lesion2 = document.getElementById("Lesion2").value; 
var Lesion2axial = document.getElementById("Lesion2axial").value; 
var Lesion2lokR = document.getElementById("Lesion2lokR").value; 
var Lesion2lokL = document.getElementById("Lesion2lokL").value; 
var Lesion2detail = document.getElementById("Lesion2detail").value; 
var Lesion2signal = document.getElementById("Lesion2signal").value; 
const Lesion2enhancementText = buttonElementLesion2enhancement.innerText;
var Lesion2size = document.getElementById("Lesion2size").value; 

var LesionVP = document.getElementById("LesionVP").value;
var LesionVR = document.getElementById("LesionVR").value;

var Pituitary = document.getElementById("Pituitary").value; 
var Pineal = document.getElementById("Pineal").value; 

const MastoidRText = buttonElementMastoidR.innerText;
const MastoidLText = buttonElementMastoidL.innerText;
const FrontalRText = buttonElementFrontalR.innerText;
const FrontalLText = buttonElementFrontalL.innerText;
const MaxillarRText = buttonElementMaxillarR.innerText;
const MaxillarLText = buttonElementMaxillarL.innerText;
const EthmoidRText = buttonElementEthmoidR.innerText;
const EthmoidLText = buttonElementEthmoidL.innerText;
const SphenoidRText = buttonElementSphenoidR.innerText;
const SphenoidLText = buttonElementSphenoidL.innerText;
const OrbitRText = buttonElementOrbitR.innerText;
const OrbitLText = buttonElementOrbitL.innerText;


//nadpis

const Nadpis = "MR mozku";

// sekvence

var SEK = ""; var NADPISext = ""; var ANGIOP = ""; var ANGIOR = "";

if (checkboxsekMMK.checked) {
    SEK += " T2 SPACE tra. ";
} 
if (checkboxsekHEMA.checked) {
    SEK += " T2 FLASH tra. ";
} 
if (checkboxsekkontrast.checked) {
    SEK += " T1W postkontrastně ve 3 rovinách. ";
} 
if (checkboxsekangio.checked) {
    SEK += " MRA technikou TOF, MIP rekonstrukce. ";
	NADPISext += " + MR angiografie ";
	ANGIOP = " Přívodné mozkové tepny mají normální šířku i průběh, Willisův okruh se zobrazuje obvykle, cévy přiměřené šíře do periferie, bez patrných aneurysmat. ";
	ANGIOR = " Přiměřený nález na MR angiografii. ";
} 

if (checkboxsekCmicha.checked) {
    SEK += " C páteř vyšetřena v sag T1W, T2W, STIR, tra T2W, (event. tra T1W, cor T2 FS dle potřeby). ";
	NADPISext += " + MR C páteře ";
} 

 
// WML

if (WMLText === "0") {
 WMLP = "Bez lézí v bílé hmotě."; 
 WMLR = ""; 
} else if (WMLText === "ojedinělé") {
 WMLP = "Ojedinělé tečkovité T2W+ FLAIR+ léze v bílé hmotě ";
 WMLR = "Ojedinělé nespecifické tečkovité léze v bílé hmotě ";
} else if (WMLText === "sporadické") {
 WMLP = "Sporadické drobné T2W+ FLAIR+ léze v bílé hmotě ";
 WMLR = "Sporadické nespecifické drobné léze v bílé hmotě ";
} else if (WMLText === "vícečetné") {
 WMLP = "Vícečetné T2W+ FLAIR+ léze v bílé hmotě ";
 WMLR = "Vícečetné léze v bílé hmotě ";
} else if (WMLText === "splývající") {
 WMLP = "Mnohočetné splývající T2W+ FLAIR+ léze v bílé hmotě ";
 WMLR = "Mnohočetné splývající léze v bílé hmotě ";
}


var WMLkdeP = ""; var WMLkdeR = "";
var results = []; var checkedCount = 0; var checkedCountR = 0; var checkedCountL = 0;

const WMLCheckboxes = Array.from(checkboxes).filter(checkbox => checkbox.id.startsWith('ChbWML'));
WMLCheckboxes.forEach(function(checkbox) {
    if (checkbox.checked) {
        checkedCount++;
        if (checkbox.id.endsWith('R')) {
            checkedCountR++;
        }
        if (checkbox.id.endsWith('L')) {
            checkedCountL++;
        }
    }
});

if (document.getElementById('ChbWMLSupratentR').checked && document.getElementById('ChbWMLSupratentL').checked) {
    results.push("supratentoriálně bilat.");
} else {
    if (document.getElementById('ChbWMLSupratentR').checked) results.push("supratentoriálně vpravo");
    if (document.getElementById('ChbWMLSupratentL').checked) results.push("supratentoriálně vlevo");
}

if (document.getElementById('ChbWMLFrontalR').checked && document.getElementById('ChbWMLFrontalL').checked) {
    results.push("frontálně bilat.");
} else {
    if (document.getElementById('ChbWMLFrontalR').checked) results.push("frontálně vpravo");
    if (document.getElementById('ChbWMLFrontalL').checked) results.push("frontálně vlevo");
}

if (document.getElementById('ChbWMLPeriventrikular').checked) {results.push("periventrikulárně");}

if (document.getElementById('ChbWMLParietalR').checked && document.getElementById('ChbWMLParietalL').checked) {
    results.push("parietálně bilat.");
} else {
    if (document.getElementById('ChbWMLParietalR').checked) results.push("parietálně vpravo");
    if (document.getElementById('ChbWMLParietalL').checked) results.push("parietálně vlevo");
}

if (document.getElementById('ChbWMLJuxtakortikalni').checked) {results.push("juxtakortikálně");} 

if (document.getElementById('ChbWMLTemporalR').checked && document.getElementById('ChbWMLTemporalL').checked) {
    results.push("Temporálně bilat.");
} else {
    if (document.getElementById('ChbWMLTemporalR').checked) results.push("temporálně vpravo");
    if (document.getElementById('ChbWMLTemporalL').checked) results.push("temporálně vlevo");
}

if (document.getElementById('ChbWMLOccipitalR').checked && document.getElementById('ChbWMLOccipitalL').checked) {
    results.push("okcipitálně bilat.");
} else {
    if (document.getElementById('ChbWMLOccipitalR').checked) results.push("okcipitálně vpravo");
    if (document.getElementById('ChbWMLOccipitalL').checked) results.push("okcipitálně vlevo");
}

if (document.getElementById('ChbWMLCorpusCallosum').checked) {results.push("v corpus callosum");}

if (document.getElementById('ChbWMLCentrumOvaleR').checked && document.getElementById('ChbWMLCentrumOvaleL').checked) {
    results.push("v centrum Ovale bilat.");
} else {
    if (document.getElementById('ChbWMLCentrumOvaleR').checked) results.push("v centrum ovale vpravo");
    if (document.getElementById('ChbWMLCentrumOvaleL').checked) results.push("v centrum ovale vlevo");
}

if (document.getElementById('ChbWMLInfratentR').checked && document.getElementById('ChbWMLInfratentL').checked) {
    results.push("infratentoriálně bilat.");
} else {
    if (document.getElementById('ChbWMLInfratentR').checked) results.push("infratentoriálně vpravo");
    if (document.getElementById('ChbWMLInfratentL').checked) results.push("infratentoriálně vlevo");
}

if (document.getElementById('ChbWMLCerebelR').checked && document.getElementById('ChbWMLCerebelL').checked) {
    results.push("cerebelárně bilat.");
} else {
    if (document.getElementById('ChbWMLCerebelR').checked) results.push("cerebelárně vpravo");
    if (document.getElementById('ChbWMLCerebelL').checked) results.push("cerebelárně vlevo");
}

if (document.getElementById('ChbWMLMesenR').checked && document.getElementById('ChbWMLMesenL').checked) {
    results.push("v mesencephalu");
} else {
    if (document.getElementById('ChbWMLMesenR').checked) results.push("v mesencephalu vpravo");
    if (document.getElementById('ChbWMLMesenL').checked) results.push("v mesencephalu vlevo");
}

if (document.getElementById('ChbWMLPonsR').checked && document.getElementById('ChbWMLPonsL').checked) {
    results.push("v pontu");
} else {
    if (document.getElementById('ChbWMLPonsR').checked) results.push("v pontu vpravo");
    if (document.getElementById('ChbWMLPonsL').checked) results.push("v pontu vlevo");
}

if (document.getElementById('ChbWMLObloR').checked && document.getElementById('ChbWMLObloL').checked) {
    results.push("v prodloužené míše");
} else {
    if (document.getElementById('ChbWMLObloR').checked) results.push("v prodloužené míše vpravo");
    if (document.getElementById('ChbWMLObloL').checked) results.push("v prodloužené míše vlevo");
}



if (results.length > 1) {
    var last = results.pop();
    WMLkdeP = results.join(", ") + " a " + last;
} else if (results.length === 1) {
    WMLkdeP = results[0];
} else {
    WMLkdeP = "";
}

if (checkedCount > 2 && checkedCountR > 0 && checkedCountL > 0) {
    WMLkdeR = "supratentoriálně bilat.";
} else if (checkedCountR > 1) {
    WMLkdeR = "supratentoriálně vpravo";
} else if (checkedCountL > 1) {
    WMLkdeR = "supratentoriálně vlevo";
} else {
    WMLkdeR = WMLkdeP;
}

document.getElementById('WMLkde').value = WMLkdeR;


if (checkboxRS.checked) {
    RSP = "";
    RSR = ". Distribucí a charakterem jsou léze suspektní z demyelinizace. ";
} else if (!checkboxRS.checked && (WMLText === "vícečetné" || WMLText === "splývající")) {
    RSP = "";
    RSR = " v.s. postichemické etiologie.";
} else if (WMLkdeText === "" && WMLText === "0") {
    RSP = "";
    RSR = "";
} else if (WMLkdeText !== "" && WMLText === "0") {
 WMLkdeP = ""; 
 WMLkdeR = "";
} else {
    RSP = "";
    RSR = ".";
}


// KORTEX 

if (GCAText === "0") {
GCAP = "Subarachnoidální prostory oboustranně šířkou přiměřené k věku. "; 
GCAR = "";
} else if (GCAText === "1") {
 GCAP = "Lehké povšechné zúžení gyrů a rozšíření sulků mozkových hemisfér. ";
 GCAR = "Mírná celková atrofie mozku (GCA grade 1). ";
} else if (GCAText === "2") {
 GCAP = "Středně pokročilé povšechné zúžení gyrů a rozšíření sulků mozkových hemisfér. ";
 GCAR = "Středně pokročilá celková atrofie mozku (GCA grade 2). ";
} else if (GCAText === "3") {
 GCAP = " Výrazné zúžení gyrů a rozšíření sulků mozkových hemisfér. ";
 GCAR = "Pokročilá celková atrofie mozku (GCA grade 3). ";
}

var lobaratrophyP = ""; 
var lobaratrophyR = ""; 

if (lobaratrophy === "") {
lobaratrophyP = ""; 
lobaratrophyR = ""; 
} else if (lobaratrophy === "frontálně") {
 lobaratrophyP = "Nápadnější atrofizace frontálních laloků. ";
 lobaratrophyR = "Nápadnější atrofizace frontálních laloků. ";
} else if (lobaratrophy === "frontoparietálně") {
 lobaratrophyP = "Nápadnější atrofizace frontálních a parietálních laloků. ";
 lobaratrophyR = "Nápadnější atrofizace frontálních a parietálních laloků. ";
} else if (lobaratrophy === "frontotemporálně") {
 lobaratrophyP = "Nápadnější atrofizace frontálních a temporálních laloků. ";
 lobaratrophyR = "Nápadnější atrofizace frontálních a temporálních laloků. ";
} else if (lobaratrophy === "temporálně") {
 lobaratrophyP = "Nápadnější atrofizace temporálních laloků. ";
 lobaratrophyR = "Nápadnější atrofizace temporálních laloků. ";
} else if (lobaratrophy === "okcipitálně") {
 lobaratrophyP = "Nápadnější atrofizace okcipitálních laloků. ";
 lobaratrophyR = "Nápadnější atrofizace okcipitálních laloků. ";
} 


// KOMORY

if (ventriclesText === "0") {
ventriclesP = "Komorový systém není dilatován. "; 
ventriclesR = "";
} else if (ventriclesText === "↑") {
 ventriclesP = "Mírná dilatace komorového systému. ";
 ventriclesR = "";
} else if (ventriclesText === "↑↑") {
 ventriclesP = "Středně pokročilá dilatace komorového systému. ";
 ventriclesR = "Dilatace komorového systému. ";
} else if (ventriclesText === "↑↑↑") {
 ventriclesP = "Výrazná dilatace komorového systému. ";
 ventriclesR = "Výrazná dilatace komorového systému. ";
}

// HYPOFÝZA, EPIFÝZA

var PituitaryP = ""; 
var PituitaryR = ""; 

if (Pituitary === "") {
PituitaryP = "Hypofýza normální velikosti uložena v nezvětšeném tureckém sedle. "; 
PituitaryR = ""; 
} else if (Pituitary === "partial empty") {
 PituitaryP = "Turecké sedlo je z velké části vyplněno signálem likvoru, na jeho dně je zmenšená hypofýza. ";
 PituitaryR = "Partial empty sella.";
} else if (Pituitary === "empty sella") {
 PituitaryP = "Turecké sedlo je z velké části vyplněno signálem likvoru, na jeho dně je výrazně zmenšená hypofýza, kraniokaudálně pod 2 mm. ";
 PituitaryR = "Empty sella. ";
} else if (Pituitary === "Rathke cyst") {
 PituitaryP = "Na rozhraní adeno a neurohypofýzy je ohraničená kolekce tekutiny. ";
 PituitaryR = "Cysta Rathkeho výchlipky. ";
} else if (Pituitary === "Ložisko") {
 PituitaryP = "Turecké sedlo obsahuje ložisko. ";
 PituitaryR = "Ložisko tureckého sedla. ";
} 

var PinealP = ""; 
var PinealR = ""; 

if (Pineal === "") {
PinealP = ""; 
PinealR = ""; 
} else if (Pineal === "cysta") {
 PinealP = "Epifýza s dobře ohraničeným ložiskem T2W+ FLAIR+. ";
 PinealR = "Pineální cysta. ";
} 


// LESION1

if (Lesion1enhancementText === "?") {
Lesion1enhancementP = ""; 
Lesion1enhancementR = "";
} else if (Lesion1enhancementText === "0") {
 Lesion1enhancementP = "bez enhancementu postkontrastně ";
 Lesion1enhancementR = "";
} else if (Lesion1enhancementText === "↑") {
 Lesion1enhancementP = "s mírným sycením postkontrastně ";
 Lesion1enhancementR = "";
} else if (Lesion1enhancementText === "↑↑") {
 Lesion1enhancementP = "se sycením postkontrastně ";
 Lesion1enhancementR = "";
} else if (Lesion1enhancementText === "↑↑↑") {
 Lesion1enhancementP = "s výrazným sycením postkontrastně ";
 Lesion1enhancementR = "";
}

if (Lesion1size === "") {
Lesion1sizeFinal = ""; 
} else {
 Lesion1sizeFinal = "rozměru " + Lesion1size + " mm";
} 

var Lesion1P = "";
var Lesion1R = "";

if (Lesion1 === "Cystické ložisko" && Lesion1axial === "extraaxiálně") {
 Lesion1signal = " signálu likvoru ";
 Lesion1R = "Arachnoidální cysta" + " " + Lesion1lokR + " " + Lesion1lokL + " " + Lesion1detail + "."; 
} else if (Lesion1 === "Cystické ložisko" && Lesion1axial === "intraaxiálně") {
 Lesion1signal = " signálu tekutiny ";
 Lesion1R = "Rozšířený perivaskulární prostor" + " " + Lesion1lokR + " " + Lesion1lokL + " " + Lesion1detail + "."; 
} else if (Lesion1 === "Pruhovitá léze") {
 Lesion1signal = " T2W+ FLAIR+";
 Lesion1R = "Vývojová venózní anomálie" + " " + Lesion1lokR + " " + Lesion1lokL + " " + Lesion1detail + "."; 
} else if (Lesion1 === "Léze") {
 Lesion1signal = " s SWI artefakty ";
 Lesion1R = "Kavernom" + " " + Lesion1lokR + " " + Lesion1lokL + " " + Lesion1detail + "."; 
} else if (Lesion1 === "Ložisko") {
 Lesion1R = "Ložisko" + " " + Lesion1lokR + " " + Lesion1lokL + " " + Lesion1detail + ": v dif. dg.:"; 
}


//LESION2

if (Lesion2enhancementText === "?") {
Lesion2enhancementP = ""; 
Lesion2enhancementR = "";
} else if (Lesion2enhancementText === "0") {
 Lesion2enhancementP = "bez enhancementu postkontrastně ";
 Lesion2enhancementR = "";
} else if (Lesion2enhancementText === "↑") {
 Lesion2enhancementP = "s mírným sycením postkontrastně ";
 Lesion2enhancementR = "";
} else if (Lesion2enhancementText === "↑↑") {
 Lesion2enhancementP = "se sycením postkontrastně ";
 Lesion2enhancementR = "";
} else if (Lesion2enhancementText === "↑↑↑") {
 Lesion2enhancementP = "s výrazným sycením postkontrastně ";
 Lesion2enhancementR = "";
}

if (Lesion2size === "") {
Lesion2sizeFinal = ""; 
} else {
 Lesion2sizeFinal = "rozměru " + Lesion2size + " mm";
} 

var Lesion2P = "";
var Lesion2R = "";

if (Lesion2 === "Cystické ložisko" && Lesion2axial === "extraaxiálně") {
 Lesion2signal = " signálu likvoru ";
 Lesion2R = "Arachnoidální cysta" + " " + Lesion2lokR + " " + Lesion2lokL + " " + Lesion2detail + "."; 
} else if (Lesion2 === "Cystické ložisko" && Lesion2axial === "intraaxiálně") {
 Lesion2signal = " signálu tekutiny ";
 Lesion2R = "Rozšířený perivaskulární prostor" + " " + Lesion2lokR + " " + Lesion2lokL + " " + Lesion2detail + "."; 
} else if (Lesion2 === "Pruhovitá léze") {
 Lesion2signal = " T2W+ FLAIR+";
 Lesion2R = "Vývojová venózní anomálie" + " " + Lesion2lokR + " " + Lesion2lokL + " " + Lesion2detail + "."; 
} else if (Lesion2 === "Léze") {
 Lesion2signal = " s SWI artefakty ";
 Lesion2R = "Kavernom" + " " + Lesion2lokR + " " + Lesion2lokL + " " + Lesion2detail + "."; 
} else if (Lesion2 === "Ložisko") {
 Lesion2R = "Ložisko" + " " + Lesion2lokR + " " + Lesion2lokL + " " + Lesion2detail + ": v dif. dg.:"; 
}



// LESIONS COMBINED

var LesionsP = "";
var LesionsR = "";

if (Lesion1 === "" && Lesion2 === "" && LesionVP === "" && LesionVR === "") {
 LesionsP = "Bez patologických ložiskových změn. "; 
} else {
 LesionsP = Lesion1 + " " + Lesion1signal + " " + Lesion1axial + " " + Lesion1lokR + " " + Lesion1lokL + " " + Lesion1detail + " " + Lesion1enhancementP + " " + Lesion1sizeFinal + ". " + 
			Lesion2 + " " + Lesion2signal + " " + Lesion2axial + " " + Lesion2lokR + " " + Lesion2lokL + " " + Lesion2detail + " " + Lesion2enhancementP + " " + Lesion2sizeFinal + ". " + 
			LesionVP;
} 

//MMK

switch (MMKRText) {
    case "0": switch (MMKLText) {
        case "0": MMKP = "Struktury v MMK a vnitřních zvukovodech bez patrné patologie."; MMKR = ""; break;
        case "ložisko": MMKP = MMKR = "Ložisko v oblasti levého MMK / vnitřního zvukovodu."; break;
        case "konflikt": MMKP = "Cévní klička AICA zasahuje vlevo hluboko do vnitřního zvukovodu."; MMKR = "Suspekce na neurovaskulární konflikt vlevo."; break;
    } break;
    case "ložisko": switch (MMKLText) {
        case "0": MMKP = MMKR = "Ložisko v oblasti pravého MMK / vnitřního zvukovodu."; break;
        case "ložisko": MMKP = MMKR = "Ložisko v oblasti obou MMK / vnitřního zvukovodu."; break;
        case "konflikt": MMKP = "Ložisko v oblasti pravého MMK / vnitřního zvukovodu. Cévní klička AICA zasahuje vlevo hluboko do vnitřního zvukovodu."; MMKR = "Ložisko v oblasti pravého MMK / vnitřního zvukovodu. Suspekce na neurovaskulární konflikt vlevo."; break;
    } break;
    case "konflikt": switch (MMKLText) {
        case "0": MMKP = "Cévní klička AICA zasahuje vpravo hluboko do vnitřního zvukovodu."; MMKR = "Suspekce na neurovaskulární konflikt vpravo."; break;
        case "ložisko": MMKP = "Cévní klička AICA zasahuje vpravo hluboko do vnitřního zvukovodu. Ložisko v oblasti levého MMK / vnitřního zvukovodu."; MMKR = "Suspekce na neurovaskulární konflikt vpravo. Ložisko v oblasti levého MMK / vnitřního zvukovodu."; break;
        case "konflikt": MMKP = "Cévní kličky AICA zasahují bilat. hluboko do vnitřních zvukovodů."; MMKR = "Suspekce na neurovaskulární konflikt bilat."; break;
    } break;
}

// OSTATNÍ

if (OrbitRText === "0" && OrbitLText === "0") {
    OrbitsP = "Orbity bez patologie. "; 
} else if (OrbitRText === "čočka" && OrbitLText === "čočka") {
    OrbitsP = "Náhrada čoček bilat. ";
} else if (OrbitRText === "čočka" && OrbitLText === "0") {
    OrbitsP = "Náhrada čočky vpravo. ";
} else if (OrbitRText === "0" && OrbitLText === "čočka") {
    OrbitsP = "Náhrada čočky vlevo. ";
} else if (OrbitRText === "enukl" && OrbitLText === "enukl") {
    OrbitsP = "St.p. enukleaci bulbů bilat. ";
} else if (OrbitRText === "enukl" && OrbitLText === "0") {
    OrbitsP = "St.p. enukleaci bulbu vpravo. ";
} else if (OrbitRText === "0" && OrbitLText === "enukl") {
    OrbitsP = "St.p. enukleaci bulbu vlevo. ";
} else if (OrbitRText === "čočka" && OrbitLText === "enukl") {
    OrbitsP = "Náhrada čočky vpravo a st.p. enukleaci bulbu vlevo. ";
} else if (OrbitRText === "enukl" && OrbitLText === "čočka") {
    OrbitsP = "St.p. enukleaci bulbu vpravo a náhrada čočky vlevo. ";
}

if (MastoidRText === "0" && MastoidLText === "0") {
MastoidyP = "Mastoideální sklípky vzdušné. "; 
MastoidyR = "";
} else if (MastoidRText === "↑" && MastoidLText === "0") {
 MastoidyP = "Mastoideální sklípky vpravo mírně parc. nevzdušné. ";
 MastoidyR = "";
} else if (MastoidRText === "0" && MastoidLText === "↑") {
 MastoidyP = "Mastoideální sklípky vlevo mírně parc. nevzdušné. ";
 MastoidyR = "";
} else if (MastoidRText === "↑" && MastoidLText === "↑") {
 MastoidyP = "Mastoideální sklípky bilat. mírně parc. nevzdušné. ";
 MastoidyR = "";
} else if (MastoidRText === "↑↑" && MastoidLText === "0") {
 MastoidyP = "Mastoideální sklípky vpravo nevzdušné s tekutinou. ";
 MastoidyR = "Mastoideální sklípky vpravo nevzdušné s tekutinou. ";
} else if (MastoidRText === "0" && MastoidLText === "↑↑") {
 MastoidyP = "Mastoideální sklípky vlevo nevzdušné s tekutinou. ";
 MastoidyR = "Mastoideální sklípky vlevo nevzdušné s tekutinou. ";
} else if ((MastoidRText === "↑" && MastoidLText === "↑↑") || (MastoidRText === "↑↑" && MastoidLText === "↑") || (MastoidRText === "↑↑" && MastoidLText === "↑↑")) {
 MastoidyP = "Mastoideální sklípky bilat. parciálně nevzdušné s tekutinou. ";
 MastoidyR = "Mastoideální sklípky bilat. parciálně nevzdušné s tekutinou. ";
} 




//SINY  není ideální, kombinuje podle počtu slov, takže někde je "v" a někde ne. Taky spojuje vše pomocí "a" a neumí kombinovat nesousedící.

const conditions = {
  "cysta": ["Cystická léze", "Retenční cysta"],
  "polyp": ["Polypózní léze", "Polyp"],
  "hyper↑": ["Mírná hyperplázie sliznic", "Mírná hyperplázie sliznic"],
  "hyper↑↑": ["Výrazná hyperplázie sliznic", "Výrazná hyperplázie sliznic"],
  "tekutina": ["Hladina tekutiny", "Známky akutní sinusitis"],
};

let FrontalP = ''; let FrontalR = '';
let MaxillarP = ''; let MaxillarR = '';
let EthmoidP = ''; let EthmoidR = '';
let SphenoidP = ''; let SphenoidR = '';

if (
    FrontalRText === '0' && FrontalLText === '0' && 
    MaxillarRText === '0' && MaxillarLText === '0' && 
    EthmoidRText === '0' && EthmoidLText === '0' && 
    SphenoidRText === '0' && SphenoidLText === '0'
) {
    var SinusP = "Dutiny vzdušné. ";
    var SinusR = "";
} else {

if (FrontalRText === FrontalLText && FrontalRText !== '0') {
  FrontalP = conditions[FrontalRText][0] + ' v obou frontálních sinech. ';
  FrontalR = conditions[FrontalRText][1] + ' v obou frontálních sinech. ';
} else {
  if (FrontalRText !== '0') {
    FrontalP += conditions[FrontalRText][0] + ' v pravém frontálním sinu. ';
    FrontalR += conditions[FrontalRText][1] + ' v pravém frontálním sinu. ';
  }
  if (FrontalLText !== '0') {
    FrontalP += conditions[FrontalLText][0] + ' v levém frontálním sinu. ';
    FrontalR += conditions[FrontalLText][1] + ' v levém frontálním sinu. ';
  }
}

if (MaxillarRText === MaxillarLText && MaxillarRText !== '0') {
  MaxillarP = conditions[MaxillarRText][0] + ' v obou maxilárních sinech. ';
  MaxillarR = conditions[MaxillarRText][1] + ' v obou maxilárních sinech. ';
} else {
  if (MaxillarRText !== '0') {
    MaxillarP += conditions[MaxillarRText][0] + ' v pravém maxilárním sinu. ';
    MaxillarR += conditions[MaxillarRText][1] + ' v pravém maxilárním sinu. ';
  }
  if (MaxillarLText !== '0') {
    MaxillarP += conditions[MaxillarLText][0] + ' v levém maxilárním sinu. ';
    MaxillarR += conditions[MaxillarLText][1] + ' v levém maxilárním sinu. ';
  }
}

if (EthmoidRText === EthmoidLText && EthmoidRText !== '0') {
  EthmoidP = conditions[EthmoidRText][0] + ' v obou ethmoidálních sinech. ';
  EthmoidR = conditions[EthmoidRText][1] + ' v obou ethmoidálních sinech. ';
} else {
  if (EthmoidRText !== '0') {
    EthmoidP += conditions[EthmoidRText][0] + ' v pravém ethmoidálním sinu. ';
    EthmoidR += conditions[EthmoidRText][1] + ' v pravém ethmoidálním sinu. ';
  }
  if (EthmoidLText !== '0') {
    EthmoidP += conditions[EthmoidLText][0] + ' v levém ethmoidálním sinu. ';
    EthmoidR += conditions[EthmoidLText][1] + ' v levém ethmoidálním sinu. ';
  }
}

if (SphenoidRText === SphenoidLText && SphenoidRText !== '0') {
  SphenoidP = conditions[SphenoidRText][0] + ' v obou sphenoidálních sinech. ';
  SphenoidR = conditions[SphenoidRText][1] + ' v obou sphenoidálních sinech. ';
} else {
  if (SphenoidRText !== '0') {
    SphenoidP += conditions[SphenoidRText][0] + ' v pravém sphenoidálním sinu. ';
    SphenoidR += conditions[SphenoidRText][1] + ' v pravém sphenoidálním sinu. ';
  }
  if (SphenoidLText !== '0') {
    SphenoidP += conditions[SphenoidLText][0] + ' v levém sphenoidálním sinu. ';
    SphenoidR += conditions[SphenoidLText][1] + ' v levém sphenoidálním sinu. ';
  }
}

function combineStrings(strArray) {
  let combinedStr = "";

  for(let i = 0; i < strArray.length; i++) {
    if(strArray[i].trim() === "") {
      continue;
    }

    if(i > 0 && strArray[i].split(" ").slice(0, 3).join(" ") === strArray[i - 1].split(" ").slice(0, 3).join(" ")) {
      combinedStr = combinedStr.replace(/\. $/, '') + " a " + strArray[i].split(" ").slice(3).join(" ");
    } else {
      combinedStr += strArray[i];
    }
  }

  return combinedStr;
}

var SinusP = combineStrings([FrontalP, MaxillarP, EthmoidP, SphenoidP]);
var SinusR = combineStrings([FrontalR, MaxillarR, EthmoidR, SphenoidR]);
}



//POPIS

MRbrainNAMEText.value = "MR mozku";

MRbrainINDText.value = indikace;

MRbrainSEKVText.value = "Mozek v T2W, FLAIR, DWI+ADC, T1W, (event. dle potřeby T2 SPACE, FLASH, SWI, FS). ";

MRbrainPOPText.value = 
LesionsP + "\n" +
WMLP + WMLkdeP + RSP + "." + "\n" +
GCAP + " " + lobaratrophyP + "\n" +
ventriclesP + "\n" +
MMKP + "\n" +
PituitaryP + PinealP + "\n" +
OrbitsP + MastoidyP + SinusP + "\n" +
ANGIOP;

MRbrainPOPText.value = MRbrainPOPText.value.trim(); 
MRbrainPOPText.value = MRbrainPOPText.value.replace(/^\s+/gm, '');  // odstraní mezery na začátku řádek
MRbrainPOPText.value = MRbrainPOPText.value.replace(/^\s*[\r\n]/gm, '');  // odstraní prázdné řádky
MRbrainPOPText.value = MRbrainPOPText.value.split(/\r?\n/).filter(item => item.trim() !== '').join('\n');  // prázdné řádky
MRbrainPOPText.value = MRbrainPOPText.value.replace(/  +/g, ' '); // dvojmezery
MRbrainPOPText.value = MRbrainPOPText.value.replace(/ ,/g, ',');  // smazat mezeru před čárkou
MRbrainPOPText.value = MRbrainPOPText.value.replace(/ \./g, '.'); // smazat mezeru před tečkou
MRbrainPOPText.value = MRbrainPOPText.value.replace(/\.{2,}/g, '.'); // více teček = jedna tečka
MRbrainPOPText.value = MRbrainPOPText.value.replace(/\,{2,}/g, ','); // více čárek = jedna čárka
MRbrainPOPText.value = MRbrainPOPText.value.replace(/,\./g, '.'); // odstraní čárku před tečkou
MRbrainPOPText.value = MRbrainPOPText.value.replace(/  +/g, ' '); // dvojmezery
MRbrainPOPText.value = MRbrainPOPText.value.replace(/^\./gm, ''); // odstraní tečku na začátku řádek
MRbrainPOPText.value = MRbrainPOPText.value.replace(/^\s+/gm, '');  // odstraní mezery na začátku řádek

MRbrainRESText.value = 
Lesion1R + "\n" +
Lesion2R + "\n" +
LesionVR + "\n" +
WMLR + WMLkdeR + RSR + "\n" + 
GCAR + lobaratrophyR + "\n" +
ventriclesR + "\n" +
MMKR + "\n" +
PituitaryR + PinealR + "\n" +
MastoidyR + SinusR 
; 

MRbrainRESText.value = MRbrainRESText.value.trim(); 
MRbrainRESText.value = MRbrainRESText.value.replace(/^\s+/gm, '');  // odstraní mezery na začátku řádek
MRbrainRESText.value = MRbrainRESText.value.replace(/^\s*[\r\n]/gm, '');  // odstraní prázdné řádky
MRbrainRESText.value = MRbrainRESText.value.split(/\r?\n/).filter(item => item.trim() !== '').join('\n');  // prázdné řádky
MRbrainRESText.value = MRbrainRESText.value.replace(/ ,/g, ',');  // smazat mezeru před čárkou
MRbrainRESText.value = MRbrainRESText.value.replace(/ \./g, '.'); // smazat mezeru před tečkou
MRbrainRESText.value = MRbrainRESText.value.replace(/\.{2,}/g, '.'); // více teček = jedna tečka
MRbrainRESText.value = MRbrainRESText.value.replace(/\,{2,}/g, ','); // více čárek = jedna čárka
MRbrainRESText.value = MRbrainRESText.value.replace(/,\./g, '.'); // odstraní čárku před tečkou
MRbrainRESText.value = MRbrainRESText.value.replace(/  +/g, ' '); // dvojmezery

FINALText.value =
MRbrainNAMEText.value + "\n\n" +
"Sekvence: " + MRbrainSEKVText.value + "\n\n" + 
"Indikace: " + MRbrainINDText.value + "\n\n" + 
MRbrainPOPText.value + "\n\n" + 
"Závěr: " + "\n" + MRbrainRESText.value;

FINALText.value = FINALText.value.replace(/  +/g, ' '); // dvojmezery
FINALText.value = FINALText.value.replace(/ \./g, '.'); // smazat mezeru před tečkou


if (MRbrainRESText.value.trim() === "") {
        MRbrainRESText.value = "Bez patrné patologie.";
    }



document.getElementById("indikace").addEventListener("input", updateTexts);

document.getElementById("Lesion1detail").addEventListener("input", updateTexts);
document.getElementById("Lesion1signal").addEventListener("input", updateTexts);
document.getElementById("Lesion2detail").addEventListener("input", updateTexts);
document.getElementById("Lesion2signal").addEventListener("input", updateTexts);
document.getElementById("Lesion1size").addEventListener("input", updateTexts);

document.getElementById("Lesion2detail").addEventListener("input", updateTexts);
document.getElementById("Lesion2signal").addEventListener("input", updateTexts);
document.getElementById("Lesion2detail").addEventListener("input", updateTexts);
document.getElementById("Lesion2signal").addEventListener("input", updateTexts);
document.getElementById("Lesion2size").addEventListener("input", updateTexts);

document.getElementById("LesionVP").addEventListener("input", updateTexts);
document.getElementById("LesionVR").addEventListener("input", updateTexts);

}
updateTexts();	

