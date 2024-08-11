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

var MRLumbarPOPText = document.getElementById("MRLumbarPOPText");
var MRLumbarRESText = document.getElementById("MRLumbarRESText");
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
 L12degenerfaP = "Pokročilá facetová degenerace. ";
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
 L12herniaceR = "Výrazné spondylofyty "; 
 L12herniacePodklad = "spondylofytů obratl. těl ";
} else if (L12BHText === "osteofyty" && L12HDdiameter < 4) {
 L12herniace = "Spondylofyty " + "o " + L12HDText;
 L12herniaceR = "Spondylofyty"; 
 L12herniacePodklad = "spondylofytů ";
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
} else if (L12BHText === "kombinace") {
 L12herniace = "Spondylofyty a protruze disku " + "o " + L12HDText;
 L12herniaceR = "Spondylofyty a protruze disku"; 
 L12herniacePodklad = "spondylofytů a bulgingu disku "; 
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
if (L1KOMText === "není" && L2KOMText === "není" && L3KOMText === "není" && L4KOMText === "není" && L5KOMText === "není") {
 LLobratlenormal = "Obratlová těla přiměřených výšek. "; 
 LLostatniobratlenormal = ""; 
 } else {
 LLobratlenormal = "";
 LLostatniobratlenormal = "Ostatní obratlová těla přiměřených výšek. ";
 } 

// disky a kanál vs ostatní normální
if (L12DDText === "není" && L12BHText === "není" && L23DDText === "není" && L23BHText === "není" && L34DDText === "není" && L34BHText === "není" && L45DDText === "není" && L45BHText === "není" && L5S1DDText === "není" && L5S1BHText === "není") {
	LLdiskynormal = "Disky přiměřené výšky bez výraznějších protruzí.";
	LLostatnidiskynormal = "";
} else if ((L12DDText !== "není" || L12BHText !== "není") && (L23DDText !== "není" || L23BHText !== "není") && (L34DDText !== "není" || L34BHText !== "není") && (L45DDText !== "není" || L45BHText !== "není") && (L5S1DDText !== "není" || L5S1BHText !== "není")) {
	LLdiskynormal = "";
	LLostatnidiskynormal = "";
} else if ((L12DDText !== "není" || L12BHText !== "není") || (L23DDText !== "není" || L23BHText !== "není") || (L34DDText !== "není" || L34BHText !== "není") || (L45DDText !== "není" || L45BHText !== "není") || (L5S1DDText !== "není" || L5S1BHText !== "není")) {
	LLdiskynormal = "";
	LLostatnidiskynormal = "V ostatních etážích disky přiměřené výšky bez výraznějších protruzí.";
}	

// stenóza kanálu ano vs jinak
if (L12PKText === "0" && L23PKText === "0" && L34PKText === "0" && L45PKText === "0" && L5S1PKText === "0") {
	LLstenozakanalne = "Páteřní kanál je volný. ";
	LLkanaljinak = "";
} else if (L12PKText !== "0" && L23PKText !== "0" && L34PKText !== "0" && L45PKText !== "0" && L5S1PKText !== "0") {
	LLstenozakanalne = "";
	LLkanaljinak = "";
} else if (L12PKText !== "0" || L23PKText !== "0" || L34PKText !== "0" || L45PKText !== "0" || L5S1PKText !== "0") {
	LLstenozakanalne = "";
	LLkanaljinak = "V ostatních etážích je páteřní kanál volný. ";
}

// stenóza foramin ano vs jinak
if (L12PFText === "0" && L23PFText === "0" && L34PFText === "0" && L45PFText === "0" && L5S1PFText === "0" &&
	L12LFText === "0" && L23LFText === "0" && L34LFText === "0" && L45LFText === "0" && L5S1LFText === "0") {
	LLstenozaforaminne = "Foramina jsou relativně volná. ";
	LLforaminjinak = "";
} else if (L12PFText !== "0" && L23PFText !== "0" && L34PFText !== "0" && L45PFText !== "0" && L5S1PFText !== "0" &&
			L12LFText !== "0" && L23LFText !== "0" && L34LFText !== "0" && L45LFText !== "0" && L5S1LFText !== "0") {
	LLstenozaforaminne = "";
	LLforaminjinak = "";
} else if (L12PFText !== "0" || L23PFText !== "0" || L34PFText !== "0" || L45PFText !== "0" || L5S1PFText !== "0" ||
			L12LFText !== "0" || L23LFText !== "0" || L34LFText !== "0" || L45LFText !== "0" || L5S1LFText !== "0") {
	LLstenozaforaminne = "";
	LLforaminjinak = "Ostatní foramina jsou relativně volná. ";
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
	
// FINÁLNÍ TEXTY

MRLumbarNAMEText.value = "MR bederní páteře";

MRLumbarINDText.value = indikace;

MRLumbarSEKVText.value = "L páteř v sag T1W, T2W, STIR, tra T2W, (event. tra T1W dle potřeby). ";

MRLumbarPOPText.value = 
Osy + "\n" + 
LLoperace + LLobratlenormal + LLlozisko + LLfraktura + LLostatniobratlenormal + "\n" +
LLdiskynormal + "\n" +
L12nativ + L1listezaP + " " + L12degenerdP + " " + L12edemP + " " + L12herniace + " " + L12degenerfaP + " " + L12stenozyP + "\n" + 
L23nativ + L2listezaP + " " + L23degenerdP + " " + L23edemP + " " + L23herniace + " " + L23degenerfaP + " " + L23stenozyP + "\n" + 
L34nativ + L3listezaP + " " + L34degenerdP + " " + L34edemP + " " + L34herniace + " " + L34degenerfaP + " " + L34stenozyP + "\n" +
L45nativ + L4listezaP + " " + L45degenerdP + " " + L45edemP + " " + L45herniace + " " + L45degenerfaP + " " + L45stenozyP + "\n" +
L5S1nativ + L5listezaP + " " + L5S1degenerdP + " " + L5S1edemP + " " + L5S1herniace + " " + L5S1degenerfaP + " " + L5S1stenozyP + "\n" +
LLostatnidiskynormal + "\n" + 
LLstenozakanalne + LLkanaljinak + "\n" + 
LLstenozaforaminne + LLforaminjinak + "\n" + 
LLmicha;

MRLumbarPOPText.value = MRLumbarPOPText.value.replace(/^\s*[\r\n]/gm, '');  // smaže prázdné řádky
MRLumbarPOPText.value = MRLumbarPOPText.value.replace(/ \./g, '.'); // smazat mezeru před tečkou
MRLumbarPOPText.value = MRLumbarPOPText.value.replace(/  +/g, ' '); // dvojmezery



MRLumbarRESText.value = 
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
MRLumbarRESText.value = MRLumbarRESText.value.split(/\r?\n/).filter(item => item.trim() !== '').join('\n');  // prázdné řádky
MRLumbarRESText.value = MRLumbarRESText.value.replace(/ ,/g, ',');  // smazat mezeru před čárkou
MRLumbarRESText.value = MRLumbarRESText.value.replace(/ \./g, '.'); // smazat mezeru před tečkou
MRLumbarRESText.value = MRLumbarRESText.value.replace(/\.{2,}/g, '.'); // více teček = jedna tečka
MRLumbarRESText.value = MRLumbarRESText.value.replace(/\,{2,}/g, ','); // více čárek = jedna čárka
MRLumbarRESText.value = MRLumbarRESText.value.replace(/,\./g, '.'); // odstraní čárku před tečkou
MRLumbarRESText.value = MRLumbarRESText.value.replace(/,\s*na\s+podkladě\s*,\s*|\s*,\s*na\s+podkladě\s*,|,\s*na\s+podkladě\s*|\s*,\s*na\s+podkladě/g, ' na podkladě ');   //odstraní čárku před podkladem
MRLumbarRESText.value = MRLumbarRESText.value.replace(/  +/g, ' '); // dvojmezery
MRLumbarRESText.value = MRLumbarRESText.value.replace(/,\s((?!L[1-5]|S1)[A-ZÚ])/g, function(fullMatch, groupMatch) {    return ', ' + groupMatch.toLowerCase();}); // po čárce malé písmeno, nevztahuje se na L1-5 a S1.
MRLumbarRESText.value = MRLumbarRESText.value.replace("Edém pod krycími plotnami Modic I v rámci dekompenzace degenerativních změn. Edém při facet. skloubeních v rámci dekompenzace degenerativních změn.", "Edém pod krycími plotnami Modic I a edém při facet. skloubeních v rámci dekompenzace degenerativních změn."); // combine. edém
MRLumbarRESText.value = MRLumbarRESText.value.replace(/^\s*[\r\n]/gm, '');  // odstraní prázdné řádky




document.getElementById("indikace").addEventListener("input", updateTexts);

}



updateTexts();
