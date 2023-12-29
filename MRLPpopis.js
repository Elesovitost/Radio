// dodělat: změny textů dle zaškrtnutí. Např. disky vs ostatní disky. Nebo těla vs ostatní těla.
// co s edémem při fraktuře těla.
// (s útlakem kořene) přehodit
// v ostatních etážích smazat když je vše vyplněno.
// 


var LLdiskynormal = ""; 
var LLostatnidiskynormal = "";

var LLobratlenormal = "";
var LLostatniobratlenormal = "";

var LLmicha = "";
var LLmulti = "";
var LLnormalR = ""; var L12variousR  = "";

var POPText = document.getElementById("POPText");
var RESText = document.getElementById("RESText");
var FINALText = document.getElementById("FINALText");



//stenozyR
var L12stenPK = ""; var L12stenPR = ""; var L12stenLR = ""; var L12stenPF = ""; var L12stenLF = ""; var L12stenBF = ""; 
var L12herniaceR = ""; var L12herniacePodklad = ""; var L12degenerPodklad = ""; var L12degenerdR = ""; var L12degenerfaR = ""; var L12listR = ""; var L12edemR = "";

var L23stenPK = ""; var L23stenPR = ""; var L23stenLR = ""; var L23stenPF = ""; var L23stenLF = ""; var L23stenBF = ""; 
var L23herniaceR = ""; var L23herniacePodklad = ""; var L23degenerPodklad = ""; var L23degenerdR = ""; var L23degenerfaR = ""; var L23listR = ""; var L23edemR = "";

var L34stenPK = ""; var L34stenPR = ""; var L34stenLR = ""; var L34stenPF = ""; var L34stenLF = ""; var L34stenBF = ""; 
var L34herniaceR = ""; var L34herniacePodklad = ""; var L34degenerPodklad = ""; var L34degenerdR = ""; var L34degenerfaR = ""; var L34listR = ""; var L34edemR = "";

var L45stenPK = ""; var L45stenPR = ""; var L45stenLR = ""; var L45stenPF = ""; var L45stenLF = ""; var L45stenBF = ""; 
var L45herniaceR = ""; var L45herniacePodklad = ""; var L45degenerPodklad = ""; var L45degenerdR = ""; var L45degenerfaR = ""; var L45listR = ""; var L45edemR = "";

var L5S1stenPK = ""; var L5S1stenPR = ""; var L5S1stenLR = ""; var L5S1stenPF = ""; var L5S1stenLF = ""; var L5S1stenBF = ""; 
var L5S1herniaceR = ""; var L5S1herniacePodklad = ""; var L5S1degenerPodklad = ""; var L5S1degenerdR = ""; var L5S1degenerfaR = ""; var L5S1listR = ""; var L5S1edemR = "";


//TEXTY
 

// nativ - upravit s každým segmentem !!!
const wL1 = "L1 ";
const wL12 = "L1/2 ";
const wL2 = "L2 ";
const wL23 = "L2/3 ";
const wL3 = "L3 ";
const wL34 = "L3/4 ";
const wL4 = "L4 ";
const wL45 = "L4/5 ";
const wL5 = "L5 ";
const wL5S1 = "L5/S1 ";


// CODE

function updateTexts() {

	
var indikace = document.getElementById("indikace").value;

const levels = [
    "OSA", "LORD", 
    "L1LL", "L1LISD", "L1SL", "L1KOM", "L1LES", "L12BH", "L12DD", "L12MOD", "L12HD", "L12HERPF", "L12HERPP", "L12HERC", "L12HERLP", "L12HERLF", "L12MIG", "L12FA", "L12PF", "L12PR", "L12PK", "L12LR", "L12LF", 
    "L2LL", "L2LISD", "L2SL", "L2KOM", "L2LES", "L23BH", "L23DD", "L23MOD", "L23HD", "L23HERPF", "L23HERPP", "L23HERC", "L23HERLP", "L23HERLF", "L23MIG", "L23FA", "L23PF", "L23PR", "L23PK", "L23LR", "L23LF", 
    "L3LL", "L3LISD", "L3SL", "L3KOM", "L3LES", "L34BH", "L34DD", "L34MOD", "L34HD", "L34HERPF", "L34HERPP", "L34HERC", "L34HERLP", "L34HERLF", "L34MIG", "L34FA", "L34PF", "L34PR", "L34PK", "L34LR", "L34LF", 
    "L4LL", "L4LISD", "L4SL", "L4KOM", "L4LES", "L45BH", "L45DD", "L45MOD", "L45HD", "L45HERPF", "L45HERPP", "L45HERC", "L45HERLP", "L45HERLF", "L45MIG", "L45FA", "L45PF", "L45PR", "L45PK", "L45LR", "L45LF", 
    "L5LL", "L5LISD", "L5SL", "L5KOM", "L5LES", "L5S1BH", "L5S1DD", "L5S1MOD", "L5S1HD", "L5S1HERPF", "L5S1HERPP", "L5S1HERC", "L5S1HERLP", "L5S1HERLF", "L5S1MIG", "L5S1FA", "L5S1PF", "L5S1PR", "L5S1PK", "L5S1LR", "L5S1LF",
    "S1LES"
];

levels.forEach(level => {
    const elementName = `buttonElement${level}`;
    if (window[elementName]) {
        window[`${level}Text`] = window[elementName].innerText;
    }
});


//OSY
if (OSAText === "|") {
 Osy = "Osa přímá. ";
 OsyR = ""; 
} else if (OSAText === "(") {
 Osy = "Mírná dextrokonvexní skolióza. ";
 OsyR = ""; 
} else if (OSAText === ")") {
 Osy = "Mírná sinistrokonvexní skolióza. ";
 OsyR = ""; 
} else if (OSAText === "((") {
 Osy = "Výrazná dextrokonvexní skolióza. ";
 OsyR = "Výrazná dextrokonvexní skolióza. ";
} else if (OSAText === "))") {
 Osy = "Výrazná sinistrokonvexní skolióza. ";
 OsyR = "Výrazná sinistrokonvexní skolióza. ";
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

// NATIVNÍ TEXTY  

// operace 

var LLoperace = ""; 

    var stabCheckboxes = document.querySelectorAll('input[id$="stab"]:checked');
    var nahrCheckboxes = document.querySelectorAll('input[id$="nahr"]:checked');
    var lamCheckboxes = document.querySelectorAll('input[id$="lam"]:checked');
    
    if(stabCheckboxes.length > 0) {
        LLoperace += "Zadní stabilizace ";
        stabCheckboxes.forEach(function(checkbox, index){
            LLoperace += checkbox.value;
            if(index < stabCheckboxes.length - 1) {
                LLoperace += "-";
            }
        });
        LLoperace += ". ";
    }

    if(nahrCheckboxes.length > 0) {
        LLoperace += "Náhrada disku ";
        nahrCheckboxes.forEach(function(checkbox, index){
            LLoperace += checkbox.value;
            if(index < nahrCheckboxes.length - 1) {
                LLoperace += ", ";
            }
        });
        LLoperace += ". ";
    }

    if(lamCheckboxes.length > 0) {
        LLoperace += "Laminektomie ";
        lamCheckboxes.forEach(function(checkbox, index){
            LLoperace += checkbox.value;
            if(index < lamCheckboxes.length - 1) {
                LLoperace += ", ";
            }
        });
        LLoperace += ". ";
    }





// ložiska

var selectedLES = [L1LESText, L2LESText, L3LESText, L4LESText, L5LESText, S1LESText];
var hemangiomList = [];
var atypHemList = [];
var lytickeList = [];
var sklerotickeList = [];

for (var i = 0; i < selectedLES.length; i++) {
    var currentLevel = i < 5 ? "L" + (i + 1) : "S1";
    switch (selectedLES[i]) {
        case "hemangiom":
            hemangiomList.push(currentLevel);
            break;
        case "atyp hem":
            atypHemList.push(currentLevel);
            break;
        case "lytické":
            lytickeList.push(currentLevel);
            break;
        case "sklerotické":
            sklerotickeList.push(currentLevel);
            break;
        default:
            break;
    }
}

LLlozisko = ""; 
LLloziskoR = "";

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


//komprese
var selectedKOM = [L1KOMText, L2KOMText, L3KOMText, L4KOMText, L5KOMText];
var schmorlList = [];
var horniList = [];
var klinovitaList = [];
var vyraznaList = [];

for (var i = 0; i < selectedKOM.length; i++) {
    switch (selectedKOM[i]) {
        case "schmorl":
            schmorlList.push("L" + (i + 1));
            break;
		case "horní":
            horniList.push("L" + (i + 1));
            break;
        case "klínovitá":
            klinovitaList.push("L" + (i + 1));
            break;
        case "výrazná":
            vyraznaList.push("L" + (i + 1));
            break;
        default:
            break;
    }
}

LLfraktura = ""; 
LLfrakturaR = "";

if (schmorlList.length > 0) {
    LLfraktura += "Schmorlův uzel krycí plotny obratl. těla " + schmorlList.join(", ") + ". ";
	LLfrakturaR = "";
}
if (horniList.length > 0) {
    LLfraktura += "Prolomení krycí plotny obratl. těla " + horniList.join(", ") + ". ";
	LLfrakturaR += "St.p. prolomení horní krycí plotny obratl. těla " + horniList.join(", ") + ". ";
}
if (klinovitaList.length > 0) {
    LLfraktura += "Klínovitá komprese obratl. těla " + klinovitaList.join(", ") + ". ";
	LLfrakturaR += "St.p. klínovité kompresi obratl. těla " + klinovitaList.join(", ") + ". ";
}
if (vyraznaList.length > 0) {
    LLfraktura += "Výrazná komprese obratl. těla " + vyraznaList.join(", ") + ". ";
    LLfrakturaR += "St.p. výrazné kompresi obratl. těla " + vyraznaList.join(", ") + ". ";
}

//mícha
LLmicha = "Přehledný úsek míchy bez signálových změn.";


let codeForL12 = `
//L12

// nativ
if (L1LLText === "není" && L12DDText === "není" && L12MODText === "není" && L12BHText === "není" && L12FAText === "není" && L12PFText === "0" && L12PRText === "0" && L12PKText === "0" && L12LRText === "0" && L12LFText === "0") {
 L12nativ = ""; 
 } else {
 L12nativ = "L1/2: ";
 } 

if (L1LLText === "není" && L12DDText !== "těžká" && L12MODText !== "I" && L12BHText === "není" && L12FAText !== "edém" && L12PFText === "0" && L12PRText === "0" && L12PKText === "0" && L12LRText === "0" && L12LFText === "0") {
 L12nativR = "";
 } else {
 L12nativR = "L1/2: ";
 } 
 

//LISTÉZA
if (L1LLText === "není") {
 L1listezaP = ""; 
 L1listezaR = ""; 
 L12listR = "";
} else if (L1LLText === "ventro" && L1SLText === "nelýza") {
 L1listezaP = "Ventrolistéza " + wL1 + "o " + L1LISDText + " bez lýzy oblouku. ";
 L1listezaR = "Ventrolistéza obratle " + wL1 + " bez lýzy oblouku ";
 L12listR = "ventrolistézy " + wL1 + " bez lýzy oblouku, ";
} else if (L1LLText === "ventro" && L1SLText === "lýza") {
 L1listezaP = "Ventrolistéza " + wL1 + "o " + L1LISDText + " s lýzou oblouku. ";
 L1listezaR = "Ventrolistéza obratle " + wL1 + " s lýzou oblouku. ";
 L12listR = "ventrolistézy " + wL1 + " s pseudobulgingem disku ";
} else if (L1LLText === "dorzo" && L1SLText === "nelýza") {
 L1listezaP = "Retrolistéza " + wL1 + "o " + L1LISDText + " bez lýzy oblouku. ";
 L1listezaR = "Retrolistéza obratle " + wL1 + " bez lýzy oblouku. ";
 L12listR = "retrolistézy " + wL1 + " bez lýzy oblouku ";
} else if (L1LLText === "dorzo" && L1SLText === "lýza") {
 L1listezaP = "Retrolistéza " + wL1 + "o " + L1LISDText + " s lýzou oblouku. ";
 L1listezaR = "Retrolistéza obratle " + wL1 + " s lýzou oblouku. ";
 L12listR = "retrolistézy " + wL1 + " s lýzou oblouku ";
}

//DEGENERACE DISKU
if (L12DDText === "není") {
 L12degenerdP = ""; 
 L12degenerdR = "";
 L12degenerPodklad = "";
} else if (L12DDText === "mírná") {
 L12degenerdP = "Mírně snížený disk s nižší SI. ";
 L12degenerdR = "";
 L12degenerPodklad = "";
} else if (L12DDText === "střední") {
 L12degenerdP = "Snížený disk s nízkou SI. ";
 L12degenerdR = "";
 L12degenerPodklad = "";
} else if (L12DDText === "těžká") {
 L12degenerdP = "Výrazně snížený disk a osteofytický lem. ";
 L12degenerdR = "Osteochondróza. ";
 L12degenerPodklad = "osteochondrózy ";
}

//MODIC 
if (L12MODText === "není") {
 L12edemP = ""; 
 L12edemR = "";
} else if (L12MODText === "I") {
 L12edemP = "Signál T2W+ T1W- (edém) pod krycími plotnami. ";
 L12edemR = "Edém pod krycími plotnami Modic I v rámci dekompenzace degenerativních změn. ";
} else if (L12MODText === "II") {
 L12edemP = "Signál T2W+ T1W+ (tuková degenerace) pod krycími plotnami. ";
 L12edemR = "";
} else if (L12MODText === "III") {
 L12edemP = "Signál T2W- T1W- (sklerotizace) pod krycími plotnami. ";
 L12edemR = "";
}

//FACETOVÁ ARTRÓZA
if (L12FAText === "není") {
 L12degenerfaP = ""; 
 L12degenerfaR = "";
 L12edemR += "";
} else if (L12FAText === "mírná") {
 L12degenerfaP = "Mírná facetová degenerace. ";
 L12degenerfaR = "mírné facetové artrózy ";
 L12edemR += "";
} else if (L12FAText === "střední") {
 L12degenerfaP = "Facetová degenerace. ";
 L12degenerfaR = "facetové artrózy ";
 L12edemR += "";
} else if (L12FAText === "těžká") {
 L12degenerfaP = "Pokročilá facetová degenerace s hypertrofií žlutých vazů. ";
 L12degenerfaR = "pokročilé facetové artrózy ";
 L12edemR += "";
} else if (L12FAText === "edém") {
 L12degenerfaP = "Pokročilá facetová degenerace s okolním edémem. ";
 L12degenerfaR = "pokročilé dekompenzované facetové artrózy ";
 L12edemR += "Edém při facet. skloubeních v rámci dekompenzace degenerativních změn. ";
}

//HERNIACE  
let L12HDdiameter = parseFloat(L12HDText.split(" ")[0]);
if (L12BHText === "není") {
 L12herniace = ""; 
 L12herniaceR = "";
 L12herniacePodklad = ""; 
} else if (L12BHText === "bulging" && L12HDdiameter >= 4) {
 L12herniace = "Bulging disku " + "o " + L12HDText;
 L12herniaceR = "Bulging disku"; 
 L12herniacePodklad = "bulgingu disku ";
} else if (L12BHText === "bulging" && L12HDdiameter < 4) {
 L12herniace = "Nevýrazný bulging disku " + "o " + L12HDText;
 L12herniaceR = "Nevýrazný bulging disku"; 
 L12herniacePodklad = "bulgingu disku ";
} else if (L12BHText === "osteofyty" && L12HDdiameter >= 4) {
 L12herniace = "Spondylofyty obratl. těl " + "o " + L12HDText;
 L12herniaceR = "Bulging disku"; 
 L12herniacePodklad = "bulgingu disku ";
} else if (L12BHText === "osteofyty" && L12HDdiameter < 4) {
 L12herniace = "Nevýrazný bulging disku " + "o " + L12HDText;
 L12herniaceR = "Nevýrazný bulging disku"; 
 L12herniacePodklad = "bulgingu disku ";
} else if (L12BHText === "herniace" && L12HDdiameter < 4) {
 L12herniace = "Herniace disku " + "o " + L12HDText;
 L12herniaceR = "Drobná herniace disku"; 
 L12herniacePodklad = "herniace disku ";
} else if (L12BHText === "herniace" && L12HDdiameter >= 4 && L12HDdiameter <= 6) {
 L12herniace = "Herniace disku " + "o " + L12HDText;
 L12herniaceR = "Herniace disku"; 
 L12herniacePodklad = "herniace disku ";
} else if (L12BHText === "herniace" && L12HDdiameter > 6) {
 L12herniace = "Herniace disku " + "o " + L12HDText;
 L12herniaceR = "Objemná herniace disku"; 
 L12herniacePodklad = "objemné herniace disku ";
}


//HERNIACE SMĚR
const L12herniaDirections = [
    { text: "foraminálně vpravo", active: L12HERPFText === "+" },
    { text: "paracentrálně vpravo", active: L12HERPPText === "+" },
    { text: "centrálně", active: L12HERCText === "+" },
    { text: "paracentrálně vlevo", active: L12HERLPText === "+" },
    { text: "foraminálně vlevo", active: L12HERLFText === "+" },
  ];

  const L12activeDirections = L12herniaDirections.filter(direction => direction.active);

  if (L12BHText !== "není" && L12activeDirections.length === 0) {
    L12herniace += ""; 
	L12herniaceR += " bez stenózy páteřního kanálu a bez známek útlaku kořenů.";
    L12herniacePodklad += "";
  } else if (L12activeDirections.length === 1) {
    L12herniace += " " + L12activeDirections[0].text;
	L12herniaceR += " " + L12activeDirections[0].text;
    L12herniacePodklad += " " + L12activeDirections[0].text; 
  } else if (L12activeDirections.length > 1) {
    L12herniace += " " + L12activeDirections[0].text + " až " + L12activeDirections[L12activeDirections.length - 1].text;
	L12herniaceR += " " + L12activeDirections[0].text + " až " + L12activeDirections[L12activeDirections.length - 1].text;
    L12herniacePodklad += " " + L12activeDirections[0].text + " až " + L12activeDirections[L12activeDirections.length - 1].text;
  } else {
    L12herniace += ""; 
	L12herniaceR += "";
    L12herniacePodklad += "";
  }
  


if (L12MIGText === "M0" && L12BHText !== "není") {
 L12herniace += ". "; 
} else if (L12MIGText === "M▲") {
 L12herniace += " s migrací kraniálně. ";
} else if (L12MIGText === "M▼") {
 L12herniace += " s migrací kaudálně. ";
}
 

//STENÓZY A KOŘENY

if (L12PKText === "0") {
 L12stenozyP = "";  
 L12stenPK = ""; 
} else if (L12PKText === "1") {
 L12stenozyP = "Páteřní kanál " + "mírně zúžen. ";
 L12stenPK = "Mírná stenóza páteřního kanálu ";
} else if (L12PKText === "2") {
 L12stenozyP = "Páteřní kanál " + "zúžen. ";
 L12stenPK = "Stenóza páteřního kanálu ";
} else if (L12PKText === "3") {
 L12stenozyP = "Páteřní kanál " + "výrazně zúžen s agregací kaudy. ";
 L12stenPK = "Výrazná stenóza páteřního kanálu ";
} 


if (L12PRText === "0") {
 L12stenozyP += ""; 
 L12stenPR = "";  
} else if (L12PRText === "1") {
 L12stenozyP += "Mírný tlak na pravostranný kořen v durálním vaku. ";
 L12stenPR = "Mírný tlak na kořen L2 l.dx. ";
} else if (L12PRText === "2") {
 L12stenozyP += "Útlak pravostranného kořene v durálním vaku. ";
 L12stenPR = "Útlak kořene L2 l.dx. ";
} else if (L12PRText === "3") {
 L12stenozyP += "Komprese pravostranného kořene v durálním vaku / laterálním recesu. ";
 L12stenPR = "Komprese kořene L2 l.dx. ";
} 

if (L12LRText === "0") {
 L12stenozyP += "";  
 L12stenLR = "";
} else if (L12LRText === "1") {
 L12stenozyP += "Mírný tlak na levostranný kořen v durálním vaku. ";
 L12stenLR = "Mírný tlak na kořen L2 l.sin. ";
} else if (L12LRText === "2") {
 L12stenozyP += "Útlak levostranného kořene v durálním vaku. ";
 L12stenLR = "Útlak kořene L2 l.sin. ";
} else if (L12LRText === "3") {
 L12stenozyP += "Komprese levostranného kořene v durálním vaku / laterálním recesu. ";
 L12stenLR = "Komprese kořene L2 l.sin. ";
} 



if (L12PFText === L12LFText) {
  if (L12PFText === "0") {
    L12stenozyP += "";
    L12stenBF = "";
    L12stenPF = "";
    L12stenLF = "";
  } else if (L12PFText === "1") {
    L12stenozyP += "Mírné zúžení obou foramin. ";
    L12stenBF = "Mírné zúžení obou foramin ";
    L12stenPF = "";
    L12stenLF = "";
  } else if (L12PFText === "2") {
    L12stenozyP += "Stenóza obou foramin. ";
    L12stenBF = "Stenóza obou foramin ";
    L12stenPF = "";
    L12stenLF = "";
  } else if (L12PFText === "3") {
    L12stenozyP += "Výrazná stenóza obou foramin s tvarovou defigurací kořenů. ";
    L12stenBF = "Výrazná stenóza obou foramin s kompresí kořenů L1 l.utr. ";
    L12stenPF = "";
    L12stenLF = "";
  }
} else {
  if (L12PFText === "1") {
    L12stenozyP += "Mírné zúžení pravého foramina. ";
    L12stenPF = "Mírná stenóza pravého foramina ";
    L12stenBF = "";
  } else if (L12PFText === "2") {
    L12stenozyP += "Stenóza pravého foramina. ";
    L12stenPF = "Stenóza pravého foramina ";
    L12stenBF = "";
  } else if (L12PFText === "3") {
    L12stenozyP += "Výrazná stenóza pravého foramina s tvarovou defigurací kořene. ";
    L12stenPF = "Výrazná stenóza pravého foramina s kompresí kořene L1 l.dx. ";
    L12stenBF = "";
  }

  if (L12LFText === "1") {
    L12stenozyP += "Mírné zúžení levého foramina. ";
    L12stenLF = "Mírná stenóza levého foramina ";
    L12stenBF = "";
  } else if (L12LFText === "2") {
    L12stenozyP += "Stenóza levého foramina. ";
    L12stenLF = "Stenóza levého foramina ";
    L12stenBF = "";
  } else if (L12LFText === "3") {
    L12stenozyP += "Výrazná stenóza levého foramina s tvarovou defigurací kořene. ";
    L12stenLF = "Výrazná stenóza levého foramina s kompresí kořene L1 l.sin. ";
    L12stenBF = "";
  }
}




// combine texts

let L12stenosisArray = [L12stenPK, L12stenPR, L12stenLR, L12stenPF, L12stenLF, L12stenBF].filter(text => text !== "");  // Filter out any empty strings

if (L12stenosisArray.length > 2) {
    let last = L12stenosisArray.pop();
    last = last.charAt(0).toLowerCase() + last.slice(1);
    L12stenosisALL = L12stenosisArray.join(", ") + " a " + last;
} else if (L12stenosisArray.length == 2) {
    let first = L12stenosisArray[0];
    let second = L12stenosisArray[1].charAt(0).toLowerCase() + L12stenosisArray[1].slice(1);
    L12stenosisALL = first + " a " + second;
} else if (L12stenosisArray.length == 1) {
    L12stenosisALL = L12stenosisArray[0];
} else {
    L12stenosisALL = "";
}

let L12stenosisreasonALLArray = [L12listR, L12herniacePodklad, L12degenerPodklad, L12degenerfaR].filter(text => text !== "");  // Filter out any empty strings

if (L12stenosisreasonALLArray.length > 2) {
    let lastReason = L12stenosisreasonALLArray.pop();
    L12stenosisreasonALL = L12stenosisreasonALLArray.join(", ") + " a " + lastReason + ". ";
} else if (L12stenosisreasonALLArray.length == 2) {
    let firstReason = L12stenosisreasonALLArray[0];
    let secondReason = L12stenosisreasonALLArray[1];
    L12stenosisreasonALL = firstReason + " a " + secondReason + ". ";
} else if (L12stenosisreasonALLArray.length == 1) {
    L12stenosisreasonALL = L12stenosisreasonALLArray[0] + ". ";
} else {
    L12stenosisreasonALL = "";
}

// stenóza v závěru ano / ne a proč
if (L12PKText === "0" && L12PRText === "0" && L12LRText === "0" && L12PFText === "0" && L12LFText === "0") {
L12stenozyR = "";	
} else {
L12stenozyR = L12stenosisALL + 
" na podkladě " + L12stenosisreasonALL;
L12herniaceR = ""; L12degenerdR = ""; L1listezaR = ""; L12edemR = "";
}

`;

let codeForL23 = codeForL12.replace(/L12/g, 'L23').replace(/L1\/2/g, 'L2/3').replace(/L2 l./g, 'L3 l.').replace(/L1/g, 'L2');
let codeForL34 = codeForL12.replace(/L12/g, 'L34').replace(/L1\/2/g, 'L3/4').replace(/L2 l./g, 'L4 l.').replace(/L1/g, 'L3');
let codeForL45 = codeForL12.replace(/L12/g, 'L45').replace(/L1\/2/g, 'L4/5').replace(/L2 l./g, 'L5 l.').replace(/L1/g, 'L4');
let codeForL5S1 = codeForL12.replace(/L12/g, 'L5S1').replace(/L1\/2/g, 'L5/S1').replace(/L2 l./g, 'S1 l.').replace(/L1/g, 'L5');
eval(codeForL12);
eval(codeForL23);
eval(codeForL34);
eval(codeForL45);
eval(codeForL5S1);


// normální Závěr

//komprese normal vs ostatni
if (L1KOMText === "není" && L1LESText === "není" && L2KOMText === "není" && L2LESText === "není" && L3KOMText === "není" && L3LESText === "není" && L4KOMText === "není" && L4LESText === "není" && L5KOMText === "není" && L5LESText === "není" && S1LESText === "není") {
 LLobratlenormal = "Obratlová těla přiměřených výšek. "; 
 LLostatniobratlenormal = ""; 
 } else {
 LLobratlenormal = "";
 LLostatniobratlenormal = "Jinak obratlová těla přiměřených výšek. ";
 } 

// disky a kanál vs ostatní normální
if (L12nativ === "" && L23nativ  === "" && L34nativ  === "" && L45nativ  === "" && L5S1nativ  === "") {
LLdiskynormal = "Disky přiměřené výšky bez výraznějších protruzí." + "\n" + "Páteřní kanál volný, foramina volná. "; 
LLostatnidiskynormal = "";
} else if (L12nativ !== "" && L23nativ  !== "" && L34nativ  !== "" && L45nativ  !== "" && L5S1nativ  !== "") {
LLdiskynormal = ""; 
LLostatnidiskynormal = "";	
} else {
LLdiskynormal = ""; 
LLostatnidiskynormal = "V ostatních etážích disky výrazněji nesníženy bez výraznějších protruzí" + "\n" + "Páteřní kanál volný. Ostatní foramina relativně volná. ";	
}

// multietážové degener. změny.
let DDbuttons = [myL12DDButton, myL23DDButton, myL34DDButton, myL45DDButton, myL5S1DDButton];
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



//kdy napsat normalní závěr
if (L12nativR === "" && L23nativR  === "" && L34nativR  === "" && L45nativR  === "" && L5S1nativR  === "" && 
	L12stenozyR === "" && L23stenozyR  === "" && L34stenozyR  === "" && L45stenozyR  === "" && L5S1stenozyR  === "" &&
	L12edemR === "" && L23edemR === "" && L34edemR === "" && L45edemR === "" && L5S1edemR === "" &&
	LLloziskoR === "" && LLfrakturaR === "" && LLmulti === "") {
LLnormalR = "Přiměřený nález na bederní páteři."; 
} else {
LLnormalR = ""; 
}
	
// FINÁLNÍ TEXT

POPText.value = 
Osy + "\n" + 
LLoperace + LLobratlenormal + LLlozisko + LLfraktura + LLostatniobratlenormal + "\n" +
LLdiskynormal + "\n" +
L12nativ + L1listezaP + " " + L12degenerdP + " " + L12edemP + " " + L12herniace + " " + L12degenerfaP + " " + L12stenozyP + "\n" + 
L23nativ + L2listezaP + " " + L23degenerdP + " " + L23edemP + " " + L23herniace + " " + L23degenerfaP + " " + L23stenozyP + "\n" + 
L34nativ + L3listezaP + " " + L34degenerdP + " " + L34edemP + " " + L34herniace + " " + L34degenerfaP + " " + L34stenozyP + "\n" +
L45nativ + L4listezaP + " " + L45degenerdP + " " + L45edemP + " " + L45herniace + " " + L45degenerfaP + " " + L45stenozyP + "\n" +
L5S1nativ + L5listezaP + " " + L5S1degenerdP + " " + L5S1edemP + " " + L5S1herniace + " " + L5S1degenerfaP + " " + L5S1stenozyP + "\n" +
LLostatnidiskynormal + "\n" + 
LLmicha;

POPText.value = POPText.value.replace(/^\s*[\r\n]/gm, '');  // smaže prázdné řádky
POPText.value = POPText.value.replace(/ \./g, '.'); // smazat mezeru před tečkou
POPText.value = POPText.value.replace(/  +/g, ' '); // dvojmezery



// RESUME


RESText.value = 
"Závěr: " + "\n" +
LLmulti + "\n" +
LLnormalR + "\n" +
LLloziskoR + LLfrakturaR + "\n" +
L12nativR + L1listezaR + L12degenerdR + " " + L12herniaceR + L12stenozyR + L12edemR + "\n" +
L23nativR + L2listezaR + L23degenerdR + " " + L23herniaceR + L23stenozyR + L23edemR + "\n" +
L34nativR + L3listezaR + L34degenerdR + " " + L34herniaceR + L34stenozyR + L34edemR + "\n" +
L45nativR + L4listezaR + L45degenerdR + " " + L45herniaceR + L45stenozyR + L45edemR + "\n" +
L5S1nativR + L5listezaR + L5S1degenerdR + " " + L5S1herniaceR + L5S1stenozyR + L5S1edemR + "\n" +
OsyR;



//náhrady ostatní
RESText.value = RESText.value.split(/\r?\n/).filter(item => item.trim() !== '').join('\n');  // prázdné řádky
RESText.value = RESText.value.replace(/ ,/g, ',');  // smazat mezeru před čárkou
RESText.value = RESText.value.replace(/ \./g, '.'); // smazat mezeru před tečkou
RESText.value = RESText.value.replace(/\.{2,}/g, '.'); // více teček = jedna tečka
RESText.value = RESText.value.replace(/\,{2,}/g, ','); // více čárek = jedna čárka
RESText.value = RESText.value.replace(/,\./g, '.'); // odstraní čárku před tečkou
RESText.value = RESText.value.replace(/,\s*na\s+podkladě\s*,\s*|\s*,\s*na\s+podkladě\s*,|,\s*na\s+podkladě\s*|\s*,\s*na\s+podkladě/g, ' na podkladě ');   //odstraní čárku před podkladem
RESText.value = RESText.value.replace(/  +/g, ' '); // dvojmezery
RESText.value = RESText.value.replace(/,\s((?!L[1-5]|S1)[A-ZÚ])/g, function(fullMatch, groupMatch) {    return ', ' + groupMatch.toLowerCase();}); // po čárce malé písmeno, nevztahuje se na L1-5 a S1.
RESText.value = RESText.value.replace("Edém pod krycími plotnami Modic I v rámci dekompenzace degenerativních změn. Edém při facet. skloubeních v rámci dekompenzace degenerativních změn.", "Edém pod krycími plotnami Modic I a edém při facet. skloubeních v rámci dekompenzace degenerativních změn."); // combine. edém
RESText.value = RESText.value.replace(/^\s*[\r\n]/gm, '');  // odstraní prázdné řádky




// FINAL

FINALText.value =
"MRI bederní páteře" + "\n\n" +
"Indikace: " + indikace + "\n\n" + 
"Sekvence: Lp vyšetřena v sag T1W, T2W, STIR, tra T2W, (event. tra T1W dle potřeby)." + "\n\n" +
POPText.value + "\n\n" + 
RESText.value;


document.getElementById("indikace").addEventListener("input", updateTexts);

}







updateTexts();

function updateTextAndCycleText(event, texts, index, buttonElement, cycleFunc) {  cycleFunc(event);  updateTexts();}

function cycleOSAText(event) {  indexOSA = cycleText(event, textsOSA, indexOSA, buttonElementOSA);  updateTexts(); }
function cycleLORDText(event) {  indexLORD = cycleText(event, textsLORD, indexLORD, buttonElementLORD);  updateTexts(); }

function cycleL1KOMText(event) {  indexL1KOM = cycleText(event, textsL1KOM, indexL1KOM, buttonElementL1KOM, updateBackgroundColor);  updateTexts(); }
function cycleL1LESText(event) {  indexL1LES = cycleText(event, textsL1LES, indexL1LES, buttonElementL1LES, updateBackgroundColor);  updateTexts(); }
function cycleL1LLText(event) {  indexL1LL = cycleText(event, textsL1LL, indexL1LL, buttonElementL1LL, updateBackgroundColor);  updateTexts(); }
function cycleL1LISDText(event) {  indexL1LISD = cycleText(event, textsL1LISD, indexL1LISD, buttonElementL1LISD);  updateTexts(); }
function cycleL1SLText(event) {  indexL1SL = cycleText(event, textsL1SL, indexL1SL, buttonElementL1SL, updateBackgroundColor);  updateTexts(); }
function cycleL12BHText(event) {  indexL12BH = cycleText(event, textsL12BH, indexL12BH, buttonElementL12BH, updateBackgroundColor);  updateTexts(); }
function cycleL12DDText(event) {  indexL12DD = cycleText(event, textsL12DD, indexL12DD, buttonElementL12DD, updateBackgroundColor);  updateTexts(); }
function cycleL12MODText(event) {  indexL12MOD = cycleText(event, textsL12MOD, indexL12MOD, buttonElementL12MOD, updateBackgroundColor);  updateTexts(); }
function cycleL12HDText(event) {  indexL12HD = cycleText(event, textsL12HD, indexL12HD, buttonElementL12HD, updateBackgroundColor);  updateTexts(); }
function cycleL12HERPFText(event) {  indexL12HERPF = cycleText(event, textsL12HERPF, indexL12HERPF, buttonElementL12HERPF, updateBackgroundColor);  updateTexts(); }
function cycleL12HERPPText(event) {  indexL12HERPP = cycleText(event, textsL12HERPP, indexL12HERPP, buttonElementL12HERPP, updateBackgroundColor);  updateTexts(); }
function cycleL12HERCText(event) {  indexL12HERC = cycleText(event, textsL12HERC, indexL12HERC, buttonElementL12HERC, updateBackgroundColor);  updateTexts(); }
function cycleL12HERLPText(event) {  indexL12HERLP = cycleText(event, textsL12HERLP, indexL12HERLP, buttonElementL12HERLP, updateBackgroundColor);  updateTexts(); }
function cycleL12HERLFText(event) {  indexL12HERLF = cycleText(event, textsL12HERLF, indexL12HERLF, buttonElementL12HERLF, updateBackgroundColor);  updateTexts(); }
function cycleL12MIGText(event) {  indexL12MIG = cycleText(event, textsL12MIG, indexL12MIG, buttonElementL12MIG, updateBackgroundColor);  updateTexts(); }
function cycleL12FAText(event) {  indexL12FA = cycleText(event, textsL12FA, indexL12FA, buttonElementL12FA, updateBackgroundColor);  updateTexts(); }
function cycleL12PFText(event) {  indexL12PF = cycleText(event, textsL12PF, indexL12PF, buttonElementL12PF, updateBackgroundColor);  updateTexts();}
function cycleL12PRText(event) {  indexL12PR = cycleText(event, textsL12PR, indexL12PR, buttonElementL12PR, updateBackgroundColor);  updateTexts();}
function cycleL12PKText(event) {  indexL12PK = cycleText(event, textsL12PK, indexL12PK, buttonElementL12PK, updateBackgroundColor);  updateTexts();}
function cycleL12LRText(event) {  indexL12LR = cycleText(event, textsL12LR, indexL12LR, buttonElementL12LR, updateBackgroundColor);  updateTexts();}
function cycleL12LFText(event) {  indexL12LF = cycleText(event, textsL12LF, indexL12LF, buttonElementL12LF, updateBackgroundColor);  updateTexts();}

function cycleL2KOMText(event) {  indexL2KOM = cycleText(event, textsL2KOM, indexL2KOM, buttonElementL2KOM, updateBackgroundColor);  updateTexts(); }
function cycleL2LESText(event) {  indexL2LES = cycleText(event, textsL2LES, indexL2LES, buttonElementL2LES, updateBackgroundColor);  updateTexts(); }
function cycleL2LLText(event) {  indexL2LL = cycleText(event, textsL2LL, indexL2LL, buttonElementL2LL, updateBackgroundColor);  updateTexts(); }
function cycleL2LISDText(event) {  indexL2LISD = cycleText(event, textsL2LISD, indexL2LISD, buttonElementL2LISD);  updateTexts(); }
function cycleL2SLText(event) {  indexL2SL = cycleText(event, textsL2SL, indexL2SL, buttonElementL2SL, updateBackgroundColor);  updateTexts(); }
function cycleL23BHText(event) {  indexL23BH = cycleText(event, textsL23BH, indexL23BH, buttonElementL23BH, updateBackgroundColor);  updateTexts(); }
function cycleL23DDText(event) {  indexL23DD = cycleText(event, textsL23DD, indexL23DD, buttonElementL23DD, updateBackgroundColor);  updateTexts(); }
function cycleL23MODText(event) {  indexL23MOD = cycleText(event, textsL23MOD, indexL23MOD, buttonElementL23MOD, updateBackgroundColor);  updateTexts(); }
function cycleL23HDText(event) {  indexL23HD = cycleText(event, textsL23HD, indexL23HD, buttonElementL23HD, updateBackgroundColor);  updateTexts(); }
function cycleL23HERPFText(event) {  indexL23HERPF = cycleText(event, textsL23HERPF, indexL23HERPF, buttonElementL23HERPF, updateBackgroundColor);  updateTexts(); }
function cycleL23HERPPText(event) {  indexL23HERPP = cycleText(event, textsL23HERPP, indexL23HERPP, buttonElementL23HERPP, updateBackgroundColor);  updateTexts(); }
function cycleL23HERCText(event) {  indexL23HERC = cycleText(event, textsL23HERC, indexL23HERC, buttonElementL23HERC, updateBackgroundColor);  updateTexts(); }
function cycleL23HERLPText(event) {  indexL23HERLP = cycleText(event, textsL23HERLP, indexL23HERLP, buttonElementL23HERLP, updateBackgroundColor);  updateTexts(); }
function cycleL23HERLFText(event) {  indexL23HERLF = cycleText(event, textsL23HERLF, indexL23HERLF, buttonElementL23HERLF, updateBackgroundColor);  updateTexts(); }
function cycleL23MIGText(event) {  indexL23MIG = cycleText(event, textsL23MIG, indexL23MIG, buttonElementL23MIG, updateBackgroundColor);  updateTexts(); }
function cycleL23FAText(event) {  indexL23FA = cycleText(event, textsL23FA, indexL23FA, buttonElementL23FA, updateBackgroundColor);  updateTexts(); }
function cycleL23PFText(event) {  indexL23PF = cycleText(event, textsL23PF, indexL23PF, buttonElementL23PF, updateBackgroundColor);  updateTexts();}
function cycleL23PRText(event) {  indexL23PR = cycleText(event, textsL23PR, indexL23PR, buttonElementL23PR, updateBackgroundColor);  updateTexts();}
function cycleL23PKText(event) {  indexL23PK = cycleText(event, textsL23PK, indexL23PK, buttonElementL23PK, updateBackgroundColor);  updateTexts();}
function cycleL23LRText(event) {  indexL23LR = cycleText(event, textsL23LR, indexL23LR, buttonElementL23LR, updateBackgroundColor);  updateTexts();}
function cycleL23LFText(event) {  indexL23LF = cycleText(event, textsL23LF, indexL23LF, buttonElementL23LF, updateBackgroundColor);  updateTexts();}

function cycleL3KOMText(event) {  indexL3KOM = cycleText(event, textsL3KOM, indexL3KOM, buttonElementL3KOM, updateBackgroundColor);  updateTexts(); }
function cycleL3LESText(event) {  indexL3LES = cycleText(event, textsL3LES, indexL3LES, buttonElementL3LES, updateBackgroundColor);  updateTexts(); }
function cycleL3LLText(event) {  indexL3LL = cycleText(event, textsL3LL, indexL3LL, buttonElementL3LL, updateBackgroundColor);  updateTexts(); }
function cycleL3LISDText(event) {  indexL3LISD = cycleText(event, textsL3LISD, indexL3LISD, buttonElementL3LISD);  updateTexts(); }
function cycleL3SLText(event) {  indexL3SL = cycleText(event, textsL3SL, indexL3SL, buttonElementL3SL, updateBackgroundColor);  updateTexts(); }
function cycleL34BHText(event) {  indexL34BH = cycleText(event, textsL34BH, indexL34BH, buttonElementL34BH, updateBackgroundColor);  updateTexts(); }
function cycleL34DDText(event) {  indexL34DD = cycleText(event, textsL34DD, indexL34DD, buttonElementL34DD, updateBackgroundColor);  updateTexts(); }
function cycleL34MODText(event) {  indexL34MOD = cycleText(event, textsL34MOD, indexL34MOD, buttonElementL34MOD, updateBackgroundColor);  updateTexts(); }
function cycleL34HDText(event) {  indexL34HD = cycleText(event, textsL34HD, indexL34HD, buttonElementL34HD, updateBackgroundColor);  updateTexts(); }
function cycleL34HERPFText(event) {  indexL34HERPF = cycleText(event, textsL34HERPF, indexL34HERPF, buttonElementL34HERPF, updateBackgroundColor);  updateTexts(); }
function cycleL34HERPPText(event) {  indexL34HERPP = cycleText(event, textsL34HERPP, indexL34HERPP, buttonElementL34HERPP, updateBackgroundColor);  updateTexts(); }
function cycleL34HERCText(event) {  indexL34HERC = cycleText(event, textsL34HERC, indexL34HERC, buttonElementL34HERC, updateBackgroundColor);  updateTexts(); }
function cycleL34HERLPText(event) {  indexL34HERLP = cycleText(event, textsL34HERLP, indexL34HERLP, buttonElementL34HERLP, updateBackgroundColor);  updateTexts(); }
function cycleL34HERLFText(event) {  indexL34HERLF = cycleText(event, textsL34HERLF, indexL34HERLF, buttonElementL34HERLF, updateBackgroundColor);  updateTexts(); }
function cycleL34MIGText(event) {  indexL34MIG = cycleText(event, textsL34MIG, indexL34MIG, buttonElementL34MIG, updateBackgroundColor);  updateTexts(); }
function cycleL34FAText(event) {  indexL34FA = cycleText(event, textsL34FA, indexL34FA, buttonElementL34FA, updateBackgroundColor);  updateTexts(); }
function cycleL34PFText(event) {  indexL34PF = cycleText(event, textsL34PF, indexL34PF, buttonElementL34PF, updateBackgroundColor);  updateTexts();}
function cycleL34PRText(event) {  indexL34PR = cycleText(event, textsL34PR, indexL34PR, buttonElementL34PR, updateBackgroundColor);  updateTexts();}
function cycleL34PKText(event) {  indexL34PK = cycleText(event, textsL34PK, indexL34PK, buttonElementL34PK, updateBackgroundColor);  updateTexts();}
function cycleL34LRText(event) {  indexL34LR = cycleText(event, textsL34LR, indexL34LR, buttonElementL34LR, updateBackgroundColor);  updateTexts();}
function cycleL34LFText(event) {  indexL34LF = cycleText(event, textsL34LF, indexL34LF, buttonElementL34LF, updateBackgroundColor);  updateTexts();}

function cycleL4KOMText(event) {  indexL4KOM = cycleText(event, textsL4KOM, indexL4KOM, buttonElementL4KOM, updateBackgroundColor);  updateTexts(); }
function cycleL4LESText(event) {  indexL4LES = cycleText(event, textsL4LES, indexL4LES, buttonElementL4LES, updateBackgroundColor);  updateTexts(); }
function cycleL4LLText(event) {  indexL4LL = cycleText(event, textsL4LL, indexL4LL, buttonElementL4LL, updateBackgroundColor);  updateTexts(); }
function cycleL4LISDText(event) {  indexL4LISD = cycleText(event, textsL4LISD, indexL4LISD, buttonElementL4LISD);  updateTexts(); }
function cycleL4SLText(event) {  indexL4SL = cycleText(event, textsL4SL, indexL4SL, buttonElementL4SL, updateBackgroundColor);  updateTexts(); }
function cycleL45BHText(event) {  indexL45BH = cycleText(event, textsL45BH, indexL45BH, buttonElementL45BH, updateBackgroundColor);  updateTexts(); }
function cycleL45DDText(event) {  indexL45DD = cycleText(event, textsL45DD, indexL45DD, buttonElementL45DD, updateBackgroundColor);  updateTexts(); }
function cycleL45MODText(event) {  indexL45MOD = cycleText(event, textsL45MOD, indexL45MOD, buttonElementL45MOD, updateBackgroundColor);  updateTexts(); }
function cycleL45HDText(event) {  indexL45HD = cycleText(event, textsL45HD, indexL45HD, buttonElementL45HD, updateBackgroundColor);  updateTexts(); }
function cycleL45HERPFText(event) {  indexL45HERPF = cycleText(event, textsL45HERPF, indexL45HERPF, buttonElementL45HERPF, updateBackgroundColor);  updateTexts(); }
function cycleL45HERPPText(event) {  indexL45HERPP = cycleText(event, textsL45HERPP, indexL45HERPP, buttonElementL45HERPP, updateBackgroundColor);  updateTexts(); }
function cycleL45HERCText(event) {  indexL45HERC = cycleText(event, textsL45HERC, indexL45HERC, buttonElementL45HERC, updateBackgroundColor);  updateTexts(); }
function cycleL45HERLPText(event) {  indexL45HERLP = cycleText(event, textsL45HERLP, indexL45HERLP, buttonElementL45HERLP, updateBackgroundColor);  updateTexts(); }
function cycleL45HERLFText(event) {  indexL45HERLF = cycleText(event, textsL45HERLF, indexL45HERLF, buttonElementL45HERLF, updateBackgroundColor);  updateTexts(); }
function cycleL45MIGText(event) {  indexL45MIG = cycleText(event, textsL45MIG, indexL45MIG, buttonElementL45MIG, updateBackgroundColor);  updateTexts(); }
function cycleL45FAText(event) {  indexL45FA = cycleText(event, textsL45FA, indexL45FA, buttonElementL45FA, updateBackgroundColor);  updateTexts(); }
function cycleL45PFText(event) {  indexL45PF = cycleText(event, textsL45PF, indexL45PF, buttonElementL45PF, updateBackgroundColor);  updateTexts();}
function cycleL45PRText(event) {  indexL45PR = cycleText(event, textsL45PR, indexL45PR, buttonElementL45PR, updateBackgroundColor);  updateTexts();}
function cycleL45PKText(event) {  indexL45PK = cycleText(event, textsL45PK, indexL45PK, buttonElementL45PK, updateBackgroundColor);  updateTexts();}
function cycleL45LRText(event) {  indexL45LR = cycleText(event, textsL45LR, indexL45LR, buttonElementL45LR, updateBackgroundColor);  updateTexts();}
function cycleL45LFText(event) {  indexL45LF = cycleText(event, textsL45LF, indexL45LF, buttonElementL45LF, updateBackgroundColor);  updateTexts();}

function cycleL5KOMText(event) {  indexL5KOM = cycleText(event, textsL5KOM, indexL5KOM, buttonElementL5KOM, updateBackgroundColor);  updateTexts(); }
function cycleL5LESText(event) {  indexL5LES = cycleText(event, textsL5LES, indexL5LES, buttonElementL5LES, updateBackgroundColor);  updateTexts(); }
function cycleL5LLText(event) {  indexL5LL = cycleText(event, textsL5LL, indexL5LL, buttonElementL5LL, updateBackgroundColor);  updateTexts(); }
function cycleL5LISDText(event) {  indexL5LISD = cycleText(event, textsL5LISD, indexL5LISD, buttonElementL5LISD);  updateTexts(); }
function cycleL5SLText(event) {  indexL5SL = cycleText(event, textsL5SL, indexL5SL, buttonElementL5SL, updateBackgroundColor);  updateTexts(); }
function cycleL5S1BHText(event) {  indexL5S1BH = cycleText(event, textsL5S1BH, indexL5S1BH, buttonElementL5S1BH, updateBackgroundColor);  updateTexts(); }
function cycleL5S1DDText(event) {  indexL5S1DD = cycleText(event, textsL5S1DD, indexL5S1DD, buttonElementL5S1DD, updateBackgroundColor);  updateTexts(); }
function cycleL5S1MODText(event) {  indexL5S1MOD = cycleText(event, textsL5S1MOD, indexL5S1MOD, buttonElementL5S1MOD, updateBackgroundColor);  updateTexts(); }
function cycleL5S1HDText(event) {  indexL5S1HD = cycleText(event, textsL5S1HD, indexL5S1HD, buttonElementL5S1HD, updateBackgroundColor);  updateTexts(); }
function cycleL5S1HERPFText(event) {  indexL5S1HERPF = cycleText(event, textsL5S1HERPF, indexL5S1HERPF, buttonElementL5S1HERPF, updateBackgroundColor);  updateTexts(); }
function cycleL5S1HERPPText(event) {  indexL5S1HERPP = cycleText(event, textsL5S1HERPP, indexL5S1HERPP, buttonElementL5S1HERPP, updateBackgroundColor);  updateTexts(); }
function cycleL5S1HERCText(event) {  indexL5S1HERC = cycleText(event, textsL5S1HERC, indexL5S1HERC, buttonElementL5S1HERC, updateBackgroundColor);  updateTexts(); }
function cycleL5S1HERLPText(event) {  indexL5S1HERLP = cycleText(event, textsL5S1HERLP, indexL5S1HERLP, buttonElementL5S1HERLP, updateBackgroundColor);  updateTexts(); }
function cycleL5S1HERLFText(event) {  indexL5S1HERLF = cycleText(event, textsL5S1HERLF, indexL5S1HERLF, buttonElementL5S1HERLF, updateBackgroundColor);  updateTexts(); }
function cycleL5S1MIGText(event) {  indexL5S1MIG = cycleText(event, textsL5S1MIG, indexL5S1MIG, buttonElementL5S1MIG, updateBackgroundColor);  updateTexts(); }
function cycleL5S1FAText(event) {  indexL5S1FA = cycleText(event, textsL5S1FA, indexL5S1FA, buttonElementL5S1FA, updateBackgroundColor);  updateTexts(); }
function cycleL5S1PFText(event) {  indexL5S1PF = cycleText(event, textsL5S1PF, indexL5S1PF, buttonElementL5S1PF, updateBackgroundColor);  updateTexts();}
function cycleL5S1PRText(event) {  indexL5S1PR = cycleText(event, textsL5S1PR, indexL5S1PR, buttonElementL5S1PR, updateBackgroundColor);  updateTexts();}
function cycleL5S1PKText(event) {  indexL5S1PK = cycleText(event, textsL5S1PK, indexL5S1PK, buttonElementL5S1PK, updateBackgroundColor);  updateTexts();}
function cycleL5S1LRText(event) {  indexL5S1LR = cycleText(event, textsL5S1LR, indexL5S1LR, buttonElementL5S1LR, updateBackgroundColor);  updateTexts();}
function cycleL5S1LFText(event) {  indexL5S1LF = cycleText(event, textsL5S1LF, indexL5S1LF, buttonElementL5S1LF, updateBackgroundColor);  updateTexts();}

function cycleS1LESText(event) {  indexS1LES = cycleText(event, textsS1LES, indexS1LES, buttonElementS1LES, updateBackgroundColor);  updateTexts(); }