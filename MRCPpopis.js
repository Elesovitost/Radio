
var CCdiskynormal = ""; 
var CCostatnidiskynormal = "";

var CCobratlenormal = "";
var CCostatniobratlenormal = "";

var CCmicha = "";
var CCmulti = "";
var CCnormalR = ""; var C34variousR  = "";

var POPText = document.getElementById("POPText");
var RESText = document.getElementById("RESText");
var FINALText = document.getElementById("FINALText");



//stenozyR
var C34stenPK = ""; var C34stenPR = ""; var C34stenLR = ""; var C34stenPF = ""; var C34stenLF = ""; 
var C34herniaceR = ""; var C34herniacePodklad = ""; var C34degenerPodklad = ""; var C34degenerdR = ""; var C34degenerfaR = ""; var C34listR = ""; var C34edemR = "";

var C45stenPK = ""; var C45stenPR = ""; var C45stenLR = ""; var C45stenPF = ""; var C45stenLF = ""; 
var C45herniaceR = ""; var C45herniacePodklad = ""; var C45degenerPodklad = ""; var C45degenerdR = ""; var C45degenerfaR = ""; var C45listR = ""; var C45edemR = "";

var C56stenPK = ""; var C56stenPR = ""; var C56stenLR = ""; var C56stenPF = ""; var C56stenLF = ""; 
var C56herniaceR = ""; var C56herniacePodklad = ""; var C56degenerPodklad = ""; var C56degenerdR = ""; var C56degenerfaR = ""; var C56listR = ""; var C56edemR = "";

var C67stenPK = ""; var C67stenPR = ""; var C67stenLR = ""; var C67stenPF = ""; var C67stenLF = ""; 
var C67herniaceR = ""; var C67herniacePodklad = ""; var C67degenerPodklad = ""; var C67degenerdR = ""; var C67degenerfaR = ""; var C67listR = ""; var C67edemR = "";

var C7T1stenPK = ""; var C7T1stenPR = ""; var C7T1stenLR = ""; var C7T1stenPF = ""; var C7T1stenLF = ""; 
var C7T1herniaceR = ""; var C7T1herniacePodklad = ""; var C7T1degenerPodklad = ""; var C7T1degenerdR = ""; var C7T1degenerfaR = ""; var C7T1listR = ""; var C7T1edemR = "";


//TEXTY
 

// nativ - upravit s každým segmentem !!!
const wC3 = "C3 ";
const wC34 = "C3/4 ";
const wC4 = "C4 ";
const wC45 = "C4/5 ";
const wC5 = "C5 ";
const wC56 = "C5/6 ";
const wC6 = "C6 ";
const wC67 = "C6/7 ";
const wC7 = "C7 ";
const wC7T1 = "C7/T1 ";


// CODE

function updateTexts() {

	
var indikace = document.getElementById("indikace").value;

const levels = [
    "OSA", "LORD", 
    "C3CC", "C3LISD", "C3SL", "C3KOM", "C3LES", "C34BH", "C34DD", "C34MOD", "C34HD", "C34HERPF", "C34HERPP", "C34HERC", "C34HERLP", "C34HERLF", "C34MIG", "C34FA", "C34PF", "C34PR", "C34PK", "C34LR", "C34LF", 
    "C4CC", "C4LISD", "C4SL", "C4KOM", "C4LES", "C45BH", "C45DD", "C45MOD", "C45HD", "C45HERPF", "C45HERPP", "C45HERC", "C45HERLP", "C45HERLF", "C45MIG", "C45FA", "C45PF", "C45PR", "C45PK", "C45LR", "C45LF", 
    "C5CC", "C5LISD", "C5SL", "C5KOM", "C5LES", "C56BH", "C56DD", "C56MOD", "C56HD", "C56HERPF", "C56HERPP", "C56HERC", "C56HERLP", "C56HERLF", "C56MIG", "C56FA", "C56PF", "C56PR", "C56PK", "C56LR", "C56LF", 
    "C6CC", "C6LISD", "C6SL", "C6KOM", "C6LES", "C67BH", "C67DD", "C67MOD", "C67HD", "C67HERPF", "C67HERPP", "C67HERC", "C67HERLP", "C67HERLF", "C67MIG", "C67FA", "C67PF", "C67PR", "C67PK", "C67LR", "C67LF", 
    "C7CC", "C7LISD", "C7SL", "C7KOM", "C7LES", "C7T1BH", "C7T1DD", "C7T1MOD", "C7T1HD", "C7T1HERPF", "C7T1HERPP", "C7T1HERC", "C7T1HERLP", "C7T1HERLF", "C7T1MIG", "C7T1FA", "C7T1PF", "C7T1PR", "C7T1PK", "C7T1LR", "C7T1LF",
    "T1LES"
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
 OsyR += "Napřímená krční lordóza. ";
} else if (LORDText === ")") {
 Osy += "Paradoxní kyfotizace. ";
 OsyR += "Paradoxní kyfotizace krční páteře. ";
} else if (LORDText === "((") {
 Osy += "Lordóza akcentovaná. ";
} 

// NATIVNÍ TEXTY  

// operace 

var CCoperace = ""; 

    var stabCheckboxes = document.querySelectorAll('input[id$="stab"]:checked');
    var nahrCheckboxes = document.querySelectorAll('input[id$="nahr"]:checked');
    var lamCheckboxes = document.querySelectorAll('input[id$="lam"]:checked');
    
    if(stabCheckboxes.length > 0) {
        CCoperace += "Přední stabilizace ";
        stabCheckboxes.forEach(function(checkbox, index){
            CCoperace += checkbox.value;
            if(index < stabCheckboxes.length - 1) {
                CCoperace += "-";
            }
        });
        CCoperace += ". ";
    }

    if(nahrCheckboxes.length > 0) {
        CCoperace += "Náhrada disku ";
        nahrCheckboxes.forEach(function(checkbox, index){
            CCoperace += checkbox.value;
            if(index < nahrCheckboxes.length - 1) {
                CCoperace += ", ";
            }
        });
        CCoperace += ". ";
    }

    if(lamCheckboxes.length > 0) {
        CCoperace += "Laminektomie ";
        lamCheckboxes.forEach(function(checkbox, index){
            CCoperace += checkbox.value;
            if(index < lamCheckboxes.length - 1) {
                CCoperace += ", ";
            }
        });
        CCoperace += ". ";
    }





// ložiska

var selectedLES = [C3LESText, C4LESText, C5LESText, C6LESText, C7LESText, T1LESText];
var hemangiomList = [];
var atypHemList = [];
var lytickeList = [];
var sklerotickeList = [];

for (var i = 0; i < selectedLES.length; i++) {
    var currentLevel = i < 5 ? "C" + (i + 3) : "T1";
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

CClozisko = ""; 
CCloziskoR = "";

if (hemangiomList.length > 0) {
    CClozisko += "Ložisko T1+ STIR- (hemangiom) obratle " + hemangiomList.join(", ") + ". ";
}
if (atypHemList.length > 0) {
    CClozisko += "Ložisko T1+/- STIR+/- obratle " + atypHemList.join(", ") + ". ";
}
if (lytickeList.length > 0) {
    CClozisko += "Ložisko T2+ STIR+ obratle " + lytickeList.join(", ") + ". ";
    CCloziskoR += "Patologické lytické ložisko " + lytickeList.join(", ") + ". ";
}
if (sklerotickeList.length > 0) {
    CClozisko += "Ložisko T1- T2- obratle " + sklerotickeList.join(", ") + ". ";
    CCloziskoR += "Sklerotické ložisko / hypercelulární ostrůvek " + sklerotickeList.join(", ") + ". ";
}


//komprese
var selectedKOM = [C3KOMText, C4KOMText, C5KOMText, C6KOMText, C7KOMText];
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

CCfraktura = ""; 
CCfrakturaR = "";

if (schmorlList.length > 0) {
    CCfraktura += "Schmorlův uzel krycí plotny obratl. těla " + schmorlList.join(", ") + ". ";
	CCfrakturaR = "";
}
if (horniList.length > 0) {
    CCfraktura += "Prolomení krycí plotny obratl. těla " + horniList.join(", ") + ". ";
	CCfrakturaR += "St.p. prolomení horní krycí plotny obratl. těla " + horniList.join(", ") + ". ";
}
if (klinovitaList.length > 0) {
    CCfraktura += "Klínovitá komprese obratl. těla " + klinovitaList.join(", ") + ". ";
	CCfrakturaR += "St.p. klínovité kompresi obratl. těla " + klinovitaList.join(", ") + ". ";
}
if (vyraznaList.length > 0) {
    CCfraktura += "Výrazná komprese obratl. těla " + vyraznaList.join(", ") + ". ";
    CCfrakturaR += "St.p. výrazné kompresi obratl. těla " + vyraznaList.join(", ") + ". ";
}

//mícha
CCmicha = "Přehledný úsek míchy bez signálových změn.";


let codeForC34 = `
//C34

// nativ
if (C3CCText === "není" && C34DDText === "není" && C34MODText === "není" && C34BHText === "není" && C34FAText === "není" && C34PFText === "0" && C34PRText === "0" && C34PKText === "0" && C34LRText === "0" && C34LFText === "0") {
 C34nativ = ""; 
 } else {
 C34nativ = "C3/4: ";
 } 

if (C3CCText === "není" && C34DDText !== "těžká" && C34MODText !== "I" && C34BHText === "není" && C34FAText !== "edém" && C34PFText === "0" && C34PRText === "0" && C34PKText === "0" && C34LRText === "0" && C34LFText === "0") {
 C34nativR = "";
 } else {
 C34nativR = "C3/4: ";
 } 
 

//LISTÉZA
if (C3CCText === "není") {
 C3listezaP = ""; 
 C3listezaR = ""; 
 C34listR = "";
} else if (C3CCText === "ventro" && C3SLText === "nelýza") {
 C3listezaP = "Ventrolistéza " + wC3 + "o " + C3LISDText + " bez lýzy oblouku. ";
 C3listezaR = "Ventrolistéza obratle " + wC3 + " bez lýzy oblouku ";
 C34listR = "ventrolistézy " + wC3 + " bez lýzy oblouku, ";
} else if (C3CCText === "ventro" && C3SLText === "lýza") {
 C3listezaP = "Ventrolistéza " + wC3 + "o " + C3LISDText + " s lýzou oblouku. ";
 C3listezaR = "Ventrolistéza obratle " + wC3 + " s lýzou oblouku. ";
 C34listR = "ventrolistézy " + wC3 + " s pseudobulgingem disku ";
} else if (C3CCText === "dorzo" && C3SLText === "nelýza") {
 C3listezaP = "Retrolistéza " + wC3 + "o " + C3LISDText + " bez lýzy oblouku. ";
 C3listezaR = "Retrolistéza obratle " + wC3 + " bez lýzy oblouku. ";
 C34listR = "retrolistézy " + wC3 + " bez lýzy oblouku ";
} else if (C3CCText === "dorzo" && C3SLText === "lýza") {
 C3listezaP = "Retrolistéza " + wC3 + "o " + C3LISDText + " s lýzou oblouku. ";
 C3listezaR = "Retrolistéza obratle " + wC3 + " s lýzou oblouku. ";
 C34listR = "retrolistézy " + wC3 + " s lýzou oblouku ";
}

//DEGENERACE DISKU
if (C34DDText === "není") {
 C34degenerdP = ""; 
 C34degenerdR = "";
 C34degenerPodklad = "";
} else if (C34DDText === "mírná") {
 C34degenerdP = "Mírně snížený disk s nižší SI. ";
 C34degenerdR = "";
 C34degenerPodklad = "";
} else if (C34DDText === "střední") {
 C34degenerdP = "Snížený disk s nízkou SI. ";
 C34degenerdR = "";
 C34degenerPodklad = "";
} else if (C34DDText === "těžká") {
 C34degenerdP = "Výrazně snížený disk a osteofytický lem. ";
 C34degenerdR = "Osteochondróza. ";
 C34degenerPodklad = "osteochondrózy ";
}

//MODIC 
if (C34MODText === "není") {
 C34edemP = ""; 
 C34edemR = "";
} else if (C34MODText === "I") {
 C34edemP = "Signál T2W+ T1W- (edém) pod krycími plotnami. ";
 C34edemR = "Edém pod krycími plotnami Modic I v rámci dekompenzace degenerativních změn. ";
} else if (C34MODText === "II") {
 C34edemP = "Signál T2W+ T1W+ (tuková degenerace) pod krycími plotnami. ";
 C34edemR = "";
} else if (C34MODText === "III") {
 C34edemP = "Signál T2W- T1W- (sklerotizace) pod krycími plotnami. ";
 C34edemR = "";
}

//FACETOVÁ ARTRÓZA
if (C34FAText === "není") {
 C34degenerfaP = ""; 
 C34degenerfaR = "";
 C34edemR += "";
} else if (C34FAText === "mírná") {
 C34degenerfaP = "Mírná facetová degenerace. ";
 C34degenerfaR = "mírné facetové artrózy ";
 C34edemR += "";
} else if (C34FAText === "střední") {
 C34degenerfaP = "Facetová degenerace. ";
 C34degenerfaR = "facetové artrózy ";
 C34edemR += "";
} else if (C34FAText === "těžká") {
 C34degenerfaP = "Pokročilá facetová degenerace. ";
 C34degenerfaR = "pokročilé facetové artrózy ";
 C34edemR += "";
} else if (C34FAText === "edém") {
 C34degenerfaP = "Pokročilá facetová degenerace s okolním edémem. ";
 C34degenerfaR = "pokročilé dekompenzované facetové artrózy ";
 C34edemR += "Edém při facet. skloubeních v rámci dekompenzace degenerativních změn. ";
}

//HERNIACE  
let C34HDdiameter = parseFloat(C34HDText.split(" ")[0]);
if (C34BHText === "není") {
 C34herniace = ""; 
 C34herniaceR = "";
 C34herniacePodklad = ""; 
} else if (C34BHText === "bulging" && C34HDdiameter >= 4) {
 C34herniace = "Bulging disku " + "o " + C34HDText;
 C34herniaceR = "Bulging disku"; 
 C34herniacePodklad = "bulgingu disku ";
} else if (C34BHText === "bulging" && C34HDdiameter < 4) {
 C34herniace = "Nevýrazný bulging disku " + "o " + C34HDText;
 C34herniaceR = "Nevýrazný bulging disku"; 
 C34herniacePodklad = "bulgingu disku ";
} else if (C34BHText === "osteofyty" && C34HDdiameter >= 4) {
 C34herniace = "Výrazné spondylofyty " + "o " + C34HDText;
 C34herniaceR = "Výrazné spondylofyty"; 
 C34herniacePodklad = "spondylofytů obratl. těl ";
} else if (C34BHText === "osteofyty" && C34HDdiameter < 4) {
 C34herniace = "Spondylofyty " + "o " + C34HDText;
 C34herniaceR = "Spondylofyty"; 
 C34herniacePodklad = "spondylofytů ";
} else if (C34BHText === "herniace" && C34HDdiameter < 4) {
 C34herniace = "Herniace disku " + "o " + C34HDText;
 C34herniaceR = "Drobná herniace disku"; 
 C34herniacePodklad = "herniace disku ";
} else if (C34BHText === "herniace" && C34HDdiameter >= 4 && C34HDdiameter <= 6) {
 C34herniace = "Herniace disku " + "o " + C34HDText;
 C34herniaceR = "Herniace disku"; 
 C34herniacePodklad = "herniace disku ";
} else if (C34BHText === "herniace" && C34HDdiameter > 6) {
 C34herniace = "Herniace disku " + "o " + C34HDText;
 C34herniaceR = "Objemná herniace disku"; 
 C34herniacePodklad = "objemné herniace disku ";
}


//HERNIACE SMĚR
const C34herniaDirections = [
    { text: "foraminálně vpravo", active: C34HERPFText === "+" },
    { text: "paracentrálně vpravo", active: C34HERPPText === "+" },
    { text: "centrálně", active: C34HERCText === "+" },
    { text: "paracentrálně vlevo", active: C34HERLPText === "+" },
    { text: "foraminálně vlevo", active: C34HERLFText === "+" },
  ];

  const C34activeDirections = C34herniaDirections.filter(direction => direction.active);

  if (C34BHText !== "není" && C34activeDirections.length === 0) {
    C34herniace += ""; 
	C34herniaceR += " bez stenózy páteřního kanálu a bez známek útlaku kořenů.";
    C34herniacePodklad += "";
  } else if (C34activeDirections.length === 1) {
    C34herniace += " " + C34activeDirections[0].text;
	C34herniaceR += " " + C34activeDirections[0].text;
    C34herniacePodklad += " " + C34activeDirections[0].text; 
  } else if (C34activeDirections.length > 1) {
    C34herniace += " " + C34activeDirections[0].text + " až " + C34activeDirections[C34activeDirections.length - 1].text;
	C34herniaceR += " " + C34activeDirections[0].text + " až " + C34activeDirections[C34activeDirections.length - 1].text;
    C34herniacePodklad += " " + C34activeDirections[0].text + " až " + C34activeDirections[C34activeDirections.length - 1].text;
  } else {
    C34herniace += ""; 
	C34herniaceR += "";
    C34herniacePodklad += "";
  }
  


if (C34MIGText === "M0" && C34BHText !== "není") {
 C34herniace += ". "; 
} else if (C34MIGText === "M▲") {
 C34herniace += " s migrací kraniálně. ";
} else if (C34MIGText === "M▼") {
 C34herniace += " s migrací kaudálně. ";
}
 

//STENÓZY A KOŘENY

if (C34PKText === "0") {
 C34stenozyP = "";  
 C34stenPK = ""; 
} else if (C34PKText === "1") {
 C34stenozyP = "Páteřní kanál se zúžením likvorových prostorů. ";
 C34stenPK = "Mírná stenóza páteřního kanálu ";
} else if (C34PKText === "2") {
 C34stenozyP = "Páteřní kanál s obliterací likvorových prostorů. ";
 C34stenPK = "Stenóza páteřního kanálu ";
} else if (C34PKText === "3") {
 C34stenozyP = "Páteřní kanál s obliterací likvorových prostorů a kompresí míchy. ";
 C34stenPK = "Výrazná stenóza páteřního kanálu s kompresí míchy ";
} 


if (C34PRText === "0") {
 C34stenozyP += ""; 
 C34stenPR = "";  
} else if (C34PRText === "1") {
 C34stenozyP += "Mírná stenóza kanálu zprava. ";
 C34stenPR = "Mírná stenóza kanálu zprava ";
} else if (C34PRText === "2") {
 C34stenozyP += "Stenóza kanálu zprava. ";
 C34stenPR = "Stenóza kanálu zprava ";
} else if (C34PRText === "3") {
 C34stenozyP += "Výrazná stenóza kanálu zprava. ";
 C34stenPR = "Výrazná stenóza kanálu zprava ";
} 

if (C34LRText === "0") {
 C34stenozyP += "";  
 C34stenLR = "";
} else if (C34LRText === "1") {
 C34stenozyP += "Mírná stenóza kanálu zleva. ";
 C34stenLR = "Mírná stenóza kanálu zleva ";
} else if (C34LRText === "2") {
 C34stenozyP += "Stenóza kanálu zleva. ";
 C34stenLR = "Stenóza kanálu zleva ";
} else if (C34LRText === "3") {
 C34stenozyP += "Výrazná stenóza kanálu zleva. ";
 C34stenLR = "Výrazná stenóza kanálu zleva ";
} 


if (C34PFText === C34LFText) {
  if (C34PFText === "0") {
    C34stenozyP += "";
    C34stenBF = "";
    C34stenPF = "";
    C34stenLF = "";
  } else if (C34PFText === "1") {
    C34stenozyP += "Mírné zúžení obou foramin. ";
    C34stenBF = "Mírné zúžení obou foramin ";
    C34stenPF = "";
    C34stenLF = "";
  } else if (C34PFText === "2") {
    C34stenozyP += "Stenóza obou foramin. ";
    C34stenBF = "Stenóza obou foramin ";
    C34stenPF = "";
    C34stenLF = "";
  } else if (C34PFText === "3") {
    C34stenozyP += "Výrazná stenóza obou foramin s tvarovou defigurací kořenů. ";
    C34stenBF = "Výrazná stenóza obou foramin s kompresí kořenů C4 l.utr. ";
    C34stenPF = "";
    C34stenLF = "";
  }
} else {
  if (C34PFText === "1") {
    C34stenozyP += "Mírné zúžení pravého foramina. ";
    C34stenPF = "Mírná stenóza pravého foramina ";
    C34stenBF = "";
  } else if (C34PFText === "2") {
    C34stenozyP += "Stenóza pravého foramina. ";
    C34stenPF = "Stenóza pravého foramina ";
    C34stenBF = "";
  } else if (C34PFText === "3") {
    C34stenozyP += "Výrazná stenóza pravého foramina s tvarovou defigurací kořene. ";
    C34stenPF = "Výrazná stenóza pravého foramina s kompresí kořene C4 l.dx. ";
    C34stenBF = "";
  }

  if (C34LFText === "1") {
    C34stenozyP += "Mírné zúžení levého foramina. ";
    C34stenLF = "Mírná stenóza levého foramina ";
    C34stenBF = "";
  } else if (C34LFText === "2") {
    C34stenozyP += "Stenóza levého foramina. ";
    C34stenLF = "Stenóza levého foramina ";
    C34stenBF = "";
  } else if (C34LFText === "3") {
    C34stenozyP += "Výrazná stenóza levého foramina s tvarovou defigurací kořene. ";
    C34stenLF = "Výrazná stenóza levého foramina s kompresí kořene C4 l.sin. ";
    C34stenBF = "";
  }
}


// combine texts

let C34stenosisArray = [C34stenPK, C34stenPR, C34stenLR, C34stenPF, C34stenLF, C34stenBF].filter(text => text !== "");  // Filter out any empty strings

if (C34stenosisArray.length > 2) {
    let last = C34stenosisArray.pop();
    last = last.charAt(0).toLowerCase() + last.slice(1);
    C34stenosisACC = C34stenosisArray.join(", ") + " a " + last;
} else if (C34stenosisArray.length == 2) {
    let first = C34stenosisArray[0];
    let second = C34stenosisArray[1].charAt(0).toLowerCase() + C34stenosisArray[1].slice(1);
    C34stenosisACC = first + " a " + second;
} else if (C34stenosisArray.length == 1) {
    C34stenosisACC = C34stenosisArray[0];
} else {
    C34stenosisACC = "";
}

let C34stenosisreasonACCArray = [C34listR, C34herniacePodklad, C34degenerPodklad, C34degenerfaR].filter(text => text !== "");  // Filter out any empty strings

if (C34stenosisreasonACCArray.length > 2) {
    let lastReason = C34stenosisreasonACCArray.pop();
    C34stenosisreasonACC = C34stenosisreasonACCArray.join(", ") + " a " + lastReason + ". ";
} else if (C34stenosisreasonACCArray.length == 2) {
    let firstReason = C34stenosisreasonACCArray[0];
    let secondReason = C34stenosisreasonACCArray[1];
    C34stenosisreasonACC = firstReason + " a " + secondReason + ". ";
} else if (C34stenosisreasonACCArray.length == 1) {
    C34stenosisreasonACC = C34stenosisreasonACCArray[0] + ". ";
} else {
    C34stenosisreasonACC = "";
}

// stenóza v závěru ano / ne a proč
if (C34PKText === "0" && C34PRText === "0" && C34LRText === "0" && C34PFText === "0" && C34LFText === "0") {
C34stenozyR = "";	
} else {
C34stenozyR = C34stenosisACC + 
" na podkladě " + C34stenosisreasonACC;
C34herniaceR = ""; C34degenerdR = ""; C3listezaR = ""; C34edemR = "";
}

`;

let codeForC45 = codeForC34.replace(/C34/g, 'C45').replace(/C3\/4/g, 'C4/5').replace(/C4 l./g, 'C5 l.').replace(/C3/g, 'C4');
let codeForC56 = codeForC34.replace(/C34/g, 'C56').replace(/C3\/4/g, 'C5/6').replace(/C4 l./g, 'C6 l.').replace(/C3/g, 'C5');
let codeForC67 = codeForC34.replace(/C34/g, 'C67').replace(/C3\/4/g, 'C6/7').replace(/C4 l./g, 'C7 l.').replace(/C3/g, 'C6');
let codeForC7T1 = codeForC34.replace(/C34/g, 'C7T1').replace(/C3\/4/g, 'C7/T1').replace(/C4 l./g, 'C8 l.').replace(/C3/g, 'C7');
eval(codeForC34);
eval(codeForC45);
eval(codeForC56);
eval(codeForC67);
eval(codeForC7T1);


// normální Závěr

//komprese normal vs ostatni
if (C3KOMText === "není" && C3LESText === "není" && C4KOMText === "není" && C4LESText === "není" && C5KOMText === "není" && C5LESText === "není" && C6KOMText === "není" && C6LESText === "není" && C7KOMText === "není" && C7LESText === "není" && T1LESText === "není") {
 CCobratlenormal = "Obratlová těla přiměřených výšek. "; 
 CCostatniobratlenormal = ""; 
 } else {
 CCobratlenormal = "";
 CCostatniobratlenormal = "Jinak obratlová těla přiměřených výšek. ";
 } 

// disky a kanál vs ostatní normální
if (C34nativ === "" && C45nativ  === "" && C56nativ  === "" && C67nativ  === "" && C7T1nativ  === "") {
CCdiskynormal = "Disky přiměřené výšky bez výraznějších protruzí." + "\n" + "Páteřní kanál volný, foramina volná. "; 
CCostatnidiskynormal = "";
} else if (C34nativ !== "" && C45nativ  !== "" && C56nativ  !== "" && C67nativ  !== "" && C7T1nativ  !== "") {
CCdiskynormal = "Disky přiměřené výšky bez výraznějších protruzí." + "\n" + "Páteřní kanál volný, foramina volná. "; 
CCostatnidiskynormal = "";
} else {
CCdiskynormal = ""; 
CCostatnidiskynormal = "V ostatních etážích disky výraznější nesníženy bez výraznějších protruzí." + "\n" + "Páteřní kanál volný. Ostatní foramina relativně volná. ";	
}

// multietážové degener. změny.
let DDbuttons = [myC34DDButton, myC45DDButton, myC56DDButton, myC67DDButton, myC7T1DDButton];
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
    CCmulti = "Multietážové pokročilé degenerativní změny.";
} else if (textsNotNeni >= 3 && textsStredniOrTezka >= 2) {
    CCmulti = "Multietážové degenerativní změny.";
} else {
    CCmulti = "";
}



//kdy napsat normalní závěr
if (C34nativR === "" && C45nativR  === "" && C56nativR  === "" && C67nativR  === "" && C7T1nativR  === "" && 
	C34stenozyR === "" && C45stenozyR  === "" && C56stenozyR  === "" && C67stenozyR  === "" && C7T1stenozyR  === "" &&
	C34edemR === "" && C45edemR === "" && C56edemR === "" && C67edemR === "" && C7T1edemR === "" &&
	CCloziskoR === "" && CCfrakturaR === "" && CCmulti === "") {
CCnormalR = "Přiměřený nález na krční páteři."; 
} else {
CCnormalR = ""; 
}
	
// FINÁLNÍ TEXT

POPText.value = 
Osy + "\n" + 
CCoperace + CCobratlenormal + CClozisko + CCfraktura + CCostatniobratlenormal + "\n" +
CCdiskynormal + "\n" +
C34nativ + C3listezaP + " " + C34degenerdP + " " + C34edemP + " " + C34herniace + " " + C34degenerfaP + " " + C34stenozyP + "\n" + 
C45nativ + C4listezaP + " " + C45degenerdP + " " + C45edemP + " " + C45herniace + " " + C45degenerfaP + " " + C45stenozyP + "\n" + 
C56nativ + C5listezaP + " " + C56degenerdP + " " + C56edemP + " " + C56herniace + " " + C56degenerfaP + " " + C56stenozyP + "\n" +
C67nativ + C6listezaP + " " + C67degenerdP + " " + C67edemP + " " + C67herniace + " " + C67degenerfaP + " " + C67stenozyP + "\n" +
C7T1nativ + C7listezaP + " " + C7T1degenerdP + " " + C7T1edemP + " " + C7T1herniace + " " + C7T1degenerfaP + " " + C7T1stenozyP + "\n" +
CCostatnidiskynormal + "\n" + 
CCmicha;

POPText.value = POPText.value.replace(/^\s*[\r\n]/gm, '');  // smaže prázdné řádky
POPText.value = POPText.value.replace(/ \./g, '.'); // smazat mezeru před tečkou
POPText.value = POPText.value.replace(/  +/g, ' '); // dvojmezery



// RESUME


RESText.value = 
"Závěr: " + "\n" +
CCmulti + "\n" +
CCnormalR + "\n" +
CCloziskoR + CCfrakturaR + "\n" +
C34nativR + C3listezaR + C34degenerdR + " " + C34herniaceR + C34stenozyR + C34edemR + "\n" +
C45nativR + C4listezaR + C45degenerdR + " " + C45herniaceR + C45stenozyR + C45edemR + "\n" +
C56nativR + C5listezaR + C56degenerdR + " " + C56herniaceR + C56stenozyR + C56edemR + "\n" +
C67nativR + C6listezaR + C67degenerdR + " " + C67herniaceR + C67stenozyR + C67edemR + "\n" +
C7T1nativR + C7listezaR + C7T1degenerdR + " " + C7T1herniaceR + C7T1stenozyR + C7T1edemR + "\n" +
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
RESText.value = RESText.value.replace(/,\s((?!L[1-5]|T1)[A-ZÚ])/g, function(fullMatch, groupMatch) {    return ', ' + groupMatch.toLowerCase();}); // po čárce malé písmeno, nevztahuje se na C3-5 a T1.
RESText.value = RESText.value.replace("Edém pod krycími plotnami Modic I v rámci dekompenzace degenerativních změn. Edém při facet. skloubeních v rámci dekompenzace degenerativních změn.", "Edém pod krycími plotnami Modic I a edém při facet. skloubeních v rámci dekompenzace degenerativních změn."); // combine. edém
RESText.value = RESText.value.replace(/^\s*[\r\n]/gm, '');  // odstraní prázdné řádky




// FINAL

FINALText.value =
"MRI krční páteře" + "\n\n" +
"Indikace: " + indikace + "\n\n" + 
"Sekvence: Cp vyšetřena v sag T1W, T2W, STIR, tra T2W, (event. tra T1W dle potřeby)." + "\n\n" +
POPText.value + "\n\n" + 
RESText.value;


document.getElementById("indikace").addEventListener("input", updateTexts);

}







updateTexts();

function updateTextAndCycleText(event, texts, index, buttonElement, cycleFunc) {  cycleFunc(event);  updateTexts();}

function cycleOSAText(event) {  indexOSA = cycleText(event, textsOSA, indexOSA, buttonElementOSA);  updateTexts(); }
function cycleLORDText(event) {  indexLORD = cycleText(event, textsLORD, indexLORD, buttonElementLORD);  updateTexts(); }

function cycleC3KOMText(event) {  indexC3KOM = cycleText(event, textsC3KOM, indexC3KOM, buttonElementC3KOM, updateBackgroundColor);  updateTexts(); }
function cycleC3LESText(event) {  indexC3LES = cycleText(event, textsC3LES, indexC3LES, buttonElementC3LES, updateBackgroundColor);  updateTexts(); }
function cycleC3CCText(event) {  indexC3CC = cycleText(event, textsC3CC, indexC3CC, buttonElementC3CC, updateBackgroundColor);  updateTexts(); }
function cycleC3LISDText(event) {  indexC3LISD = cycleText(event, textsC3LISD, indexC3LISD, buttonElementC3LISD);  updateTexts(); }
function cycleC3SLText(event) {  indexC3SL = cycleText(event, textsC3SL, indexC3SL, buttonElementC3SL, updateBackgroundColor);  updateTexts(); }
function cycleC34BHText(event) {  indexC34BH = cycleText(event, textsC34BH, indexC34BH, buttonElementC34BH, updateBackgroundColor);  updateTexts(); }
function cycleC34DDText(event) {  indexC34DD = cycleText(event, textsC34DD, indexC34DD, buttonElementC34DD, updateBackgroundColor);  updateTexts(); }
function cycleC34MODText(event) {  indexC34MOD = cycleText(event, textsC34MOD, indexC34MOD, buttonElementC34MOD, updateBackgroundColor);  updateTexts(); }
function cycleC34HDText(event) {  indexC34HD = cycleText(event, textsC34HD, indexC34HD, buttonElementC34HD, updateBackgroundColor);  updateTexts(); }
function cycleC34HERPFText(event) {  indexC34HERPF = cycleText(event, textsC34HERPF, indexC34HERPF, buttonElementC34HERPF, updateBackgroundColor);  updateTexts(); }
function cycleC34HERPPText(event) {  indexC34HERPP = cycleText(event, textsC34HERPP, indexC34HERPP, buttonElementC34HERPP, updateBackgroundColor);  updateTexts(); }
function cycleC34HERCText(event) {  indexC34HERC = cycleText(event, textsC34HERC, indexC34HERC, buttonElementC34HERC, updateBackgroundColor);  updateTexts(); }
function cycleC34HERLPText(event) {  indexC34HERLP = cycleText(event, textsC34HERLP, indexC34HERLP, buttonElementC34HERLP, updateBackgroundColor);  updateTexts(); }
function cycleC34HERLFText(event) {  indexC34HERLF = cycleText(event, textsC34HERLF, indexC34HERLF, buttonElementC34HERLF, updateBackgroundColor);  updateTexts(); }
function cycleC34MIGText(event) {  indexC34MIG = cycleText(event, textsC34MIG, indexC34MIG, buttonElementC34MIG, updateBackgroundColor);  updateTexts(); }
function cycleC34FAText(event) {  indexC34FA = cycleText(event, textsC34FA, indexC34FA, buttonElementC34FA, updateBackgroundColor);  updateTexts(); }
function cycleC34PFText(event) {  indexC34PF = cycleText(event, textsC34PF, indexC34PF, buttonElementC34PF, updateBackgroundColor);  updateTexts();}
function cycleC34PRText(event) {  indexC34PR = cycleText(event, textsC34PR, indexC34PR, buttonElementC34PR, updateBackgroundColor);  updateTexts();}
function cycleC34PKText(event) {  indexC34PK = cycleText(event, textsC34PK, indexC34PK, buttonElementC34PK, updateBackgroundColor);  updateTexts();}
function cycleC34LRText(event) {  indexC34LR = cycleText(event, textsC34LR, indexC34LR, buttonElementC34LR, updateBackgroundColor);  updateTexts();}
function cycleC34LFText(event) {  indexC34LF = cycleText(event, textsC34LF, indexC34LF, buttonElementC34LF, updateBackgroundColor);  updateTexts();}

function cycleC4KOMText(event) {  indexC4KOM = cycleText(event, textsC4KOM, indexC4KOM, buttonElementC4KOM, updateBackgroundColor);  updateTexts(); }
function cycleC4LESText(event) {  indexC4LES = cycleText(event, textsC4LES, indexC4LES, buttonElementC4LES, updateBackgroundColor);  updateTexts(); }
function cycleC4CCText(event) {  indexC4CC = cycleText(event, textsC4CC, indexC4CC, buttonElementC4CC, updateBackgroundColor);  updateTexts(); }
function cycleC4LISDText(event) {  indexC4LISD = cycleText(event, textsC4LISD, indexC4LISD, buttonElementC4LISD);  updateTexts(); }
function cycleC4SLText(event) {  indexC4SL = cycleText(event, textsC4SL, indexC4SL, buttonElementC4SL, updateBackgroundColor);  updateTexts(); }
function cycleC45BHText(event) {  indexC45BH = cycleText(event, textsC45BH, indexC45BH, buttonElementC45BH, updateBackgroundColor);  updateTexts(); }
function cycleC45DDText(event) {  indexC45DD = cycleText(event, textsC45DD, indexC45DD, buttonElementC45DD, updateBackgroundColor);  updateTexts(); }
function cycleC45MODText(event) {  indexC45MOD = cycleText(event, textsC45MOD, indexC45MOD, buttonElementC45MOD, updateBackgroundColor);  updateTexts(); }
function cycleC45HDText(event) {  indexC45HD = cycleText(event, textsC45HD, indexC45HD, buttonElementC45HD, updateBackgroundColor);  updateTexts(); }
function cycleC45HERPFText(event) {  indexC45HERPF = cycleText(event, textsC45HERPF, indexC45HERPF, buttonElementC45HERPF, updateBackgroundColor);  updateTexts(); }
function cycleC45HERPPText(event) {  indexC45HERPP = cycleText(event, textsC45HERPP, indexC45HERPP, buttonElementC45HERPP, updateBackgroundColor);  updateTexts(); }
function cycleC45HERCText(event) {  indexC45HERC = cycleText(event, textsC45HERC, indexC45HERC, buttonElementC45HERC, updateBackgroundColor);  updateTexts(); }
function cycleC45HERLPText(event) {  indexC45HERLP = cycleText(event, textsC45HERLP, indexC45HERLP, buttonElementC45HERLP, updateBackgroundColor);  updateTexts(); }
function cycleC45HERLFText(event) {  indexC45HERLF = cycleText(event, textsC45HERLF, indexC45HERLF, buttonElementC45HERLF, updateBackgroundColor);  updateTexts(); }
function cycleC45MIGText(event) {  indexC45MIG = cycleText(event, textsC45MIG, indexC45MIG, buttonElementC45MIG, updateBackgroundColor);  updateTexts(); }
function cycleC45FAText(event) {  indexC45FA = cycleText(event, textsC45FA, indexC45FA, buttonElementC45FA, updateBackgroundColor);  updateTexts(); }
function cycleC45PFText(event) {  indexC45PF = cycleText(event, textsC45PF, indexC45PF, buttonElementC45PF, updateBackgroundColor);  updateTexts();}
function cycleC45PRText(event) {  indexC45PR = cycleText(event, textsC45PR, indexC45PR, buttonElementC45PR, updateBackgroundColor);  updateTexts();}
function cycleC45PKText(event) {  indexC45PK = cycleText(event, textsC45PK, indexC45PK, buttonElementC45PK, updateBackgroundColor);  updateTexts();}
function cycleC45LRText(event) {  indexC45LR = cycleText(event, textsC45LR, indexC45LR, buttonElementC45LR, updateBackgroundColor);  updateTexts();}
function cycleC45LFText(event) {  indexC45LF = cycleText(event, textsC45LF, indexC45LF, buttonElementC45LF, updateBackgroundColor);  updateTexts();}

function cycleC5KOMText(event) {  indexC5KOM = cycleText(event, textsC5KOM, indexC5KOM, buttonElementC5KOM, updateBackgroundColor);  updateTexts(); }
function cycleC5LESText(event) {  indexC5LES = cycleText(event, textsC5LES, indexC5LES, buttonElementC5LES, updateBackgroundColor);  updateTexts(); }
function cycleC5CCText(event) {  indexC5CC = cycleText(event, textsC5CC, indexC5CC, buttonElementC5CC, updateBackgroundColor);  updateTexts(); }
function cycleC5LISDText(event) {  indexC5LISD = cycleText(event, textsC5LISD, indexC5LISD, buttonElementC5LISD);  updateTexts(); }
function cycleC5SLText(event) {  indexC5SL = cycleText(event, textsC5SL, indexC5SL, buttonElementC5SL, updateBackgroundColor);  updateTexts(); }
function cycleC56BHText(event) {  indexC56BH = cycleText(event, textsC56BH, indexC56BH, buttonElementC56BH, updateBackgroundColor);  updateTexts(); }
function cycleC56DDText(event) {  indexC56DD = cycleText(event, textsC56DD, indexC56DD, buttonElementC56DD, updateBackgroundColor);  updateTexts(); }
function cycleC56MODText(event) {  indexC56MOD = cycleText(event, textsC56MOD, indexC56MOD, buttonElementC56MOD, updateBackgroundColor);  updateTexts(); }
function cycleC56HDText(event) {  indexC56HD = cycleText(event, textsC56HD, indexC56HD, buttonElementC56HD, updateBackgroundColor);  updateTexts(); }
function cycleC56HERPFText(event) {  indexC56HERPF = cycleText(event, textsC56HERPF, indexC56HERPF, buttonElementC56HERPF, updateBackgroundColor);  updateTexts(); }
function cycleC56HERPPText(event) {  indexC56HERPP = cycleText(event, textsC56HERPP, indexC56HERPP, buttonElementC56HERPP, updateBackgroundColor);  updateTexts(); }
function cycleC56HERCText(event) {  indexC56HERC = cycleText(event, textsC56HERC, indexC56HERC, buttonElementC56HERC, updateBackgroundColor);  updateTexts(); }
function cycleC56HERLPText(event) {  indexC56HERLP = cycleText(event, textsC56HERLP, indexC56HERLP, buttonElementC56HERLP, updateBackgroundColor);  updateTexts(); }
function cycleC56HERLFText(event) {  indexC56HERLF = cycleText(event, textsC56HERLF, indexC56HERLF, buttonElementC56HERLF, updateBackgroundColor);  updateTexts(); }
function cycleC56MIGText(event) {  indexC56MIG = cycleText(event, textsC56MIG, indexC56MIG, buttonElementC56MIG, updateBackgroundColor);  updateTexts(); }
function cycleC56FAText(event) {  indexC56FA = cycleText(event, textsC56FA, indexC56FA, buttonElementC56FA, updateBackgroundColor);  updateTexts(); }
function cycleC56PFText(event) {  indexC56PF = cycleText(event, textsC56PF, indexC56PF, buttonElementC56PF, updateBackgroundColor);  updateTexts();}
function cycleC56PRText(event) {  indexC56PR = cycleText(event, textsC56PR, indexC56PR, buttonElementC56PR, updateBackgroundColor);  updateTexts();}
function cycleC56PKText(event) {  indexC56PK = cycleText(event, textsC56PK, indexC56PK, buttonElementC56PK, updateBackgroundColor);  updateTexts();}
function cycleC56LRText(event) {  indexC56LR = cycleText(event, textsC56LR, indexC56LR, buttonElementC56LR, updateBackgroundColor);  updateTexts();}
function cycleC56LFText(event) {  indexC56LF = cycleText(event, textsC56LF, indexC56LF, buttonElementC56LF, updateBackgroundColor);  updateTexts();}

function cycleC6KOMText(event) {  indexC6KOM = cycleText(event, textsC6KOM, indexC6KOM, buttonElementC6KOM, updateBackgroundColor);  updateTexts(); }
function cycleC6LESText(event) {  indexC6LES = cycleText(event, textsC6LES, indexC6LES, buttonElementC6LES, updateBackgroundColor);  updateTexts(); }
function cycleC6CCText(event) {  indexC6CC = cycleText(event, textsC6CC, indexC6CC, buttonElementC6CC, updateBackgroundColor);  updateTexts(); }
function cycleC6LISDText(event) {  indexC6LISD = cycleText(event, textsC6LISD, indexC6LISD, buttonElementC6LISD);  updateTexts(); }
function cycleC6SLText(event) {  indexC6SL = cycleText(event, textsC6SL, indexC6SL, buttonElementC6SL, updateBackgroundColor);  updateTexts(); }
function cycleC67BHText(event) {  indexC67BH = cycleText(event, textsC67BH, indexC67BH, buttonElementC67BH, updateBackgroundColor);  updateTexts(); }
function cycleC67DDText(event) {  indexC67DD = cycleText(event, textsC67DD, indexC67DD, buttonElementC67DD, updateBackgroundColor);  updateTexts(); }
function cycleC67MODText(event) {  indexC67MOD = cycleText(event, textsC67MOD, indexC67MOD, buttonElementC67MOD, updateBackgroundColor);  updateTexts(); }
function cycleC67HDText(event) {  indexC67HD = cycleText(event, textsC67HD, indexC67HD, buttonElementC67HD, updateBackgroundColor);  updateTexts(); }
function cycleC67HERPFText(event) {  indexC67HERPF = cycleText(event, textsC67HERPF, indexC67HERPF, buttonElementC67HERPF, updateBackgroundColor);  updateTexts(); }
function cycleC67HERPPText(event) {  indexC67HERPP = cycleText(event, textsC67HERPP, indexC67HERPP, buttonElementC67HERPP, updateBackgroundColor);  updateTexts(); }
function cycleC67HERCText(event) {  indexC67HERC = cycleText(event, textsC67HERC, indexC67HERC, buttonElementC67HERC, updateBackgroundColor);  updateTexts(); }
function cycleC67HERLPText(event) {  indexC67HERLP = cycleText(event, textsC67HERLP, indexC67HERLP, buttonElementC67HERLP, updateBackgroundColor);  updateTexts(); }
function cycleC67HERLFText(event) {  indexC67HERLF = cycleText(event, textsC67HERLF, indexC67HERLF, buttonElementC67HERLF, updateBackgroundColor);  updateTexts(); }
function cycleC67MIGText(event) {  indexC67MIG = cycleText(event, textsC67MIG, indexC67MIG, buttonElementC67MIG, updateBackgroundColor);  updateTexts(); }
function cycleC67FAText(event) {  indexC67FA = cycleText(event, textsC67FA, indexC67FA, buttonElementC67FA, updateBackgroundColor);  updateTexts(); }
function cycleC67PFText(event) {  indexC67PF = cycleText(event, textsC67PF, indexC67PF, buttonElementC67PF, updateBackgroundColor);  updateTexts();}
function cycleC67PRText(event) {  indexC67PR = cycleText(event, textsC67PR, indexC67PR, buttonElementC67PR, updateBackgroundColor);  updateTexts();}
function cycleC67PKText(event) {  indexC67PK = cycleText(event, textsC67PK, indexC67PK, buttonElementC67PK, updateBackgroundColor);  updateTexts();}
function cycleC67LRText(event) {  indexC67LR = cycleText(event, textsC67LR, indexC67LR, buttonElementC67LR, updateBackgroundColor);  updateTexts();}
function cycleC67LFText(event) {  indexC67LF = cycleText(event, textsC67LF, indexC67LF, buttonElementC67LF, updateBackgroundColor);  updateTexts();}

function cycleC7KOMText(event) {  indexC7KOM = cycleText(event, textsC7KOM, indexC7KOM, buttonElementC7KOM, updateBackgroundColor);  updateTexts(); }
function cycleC7LESText(event) {  indexC7LES = cycleText(event, textsC7LES, indexC7LES, buttonElementC7LES, updateBackgroundColor);  updateTexts(); }
function cycleC7CCText(event) {  indexC7CC = cycleText(event, textsC7CC, indexC7CC, buttonElementC7CC, updateBackgroundColor);  updateTexts(); }
function cycleC7LISDText(event) {  indexC7LISD = cycleText(event, textsC7LISD, indexC7LISD, buttonElementC7LISD);  updateTexts(); }
function cycleC7SLText(event) {  indexC7SL = cycleText(event, textsC7SL, indexC7SL, buttonElementC7SL, updateBackgroundColor);  updateTexts(); }
function cycleC7T1BHText(event) {  indexC7T1BH = cycleText(event, textsC7T1BH, indexC7T1BH, buttonElementC7T1BH, updateBackgroundColor);  updateTexts(); }
function cycleC7T1DDText(event) {  indexC7T1DD = cycleText(event, textsC7T1DD, indexC7T1DD, buttonElementC7T1DD, updateBackgroundColor);  updateTexts(); }
function cycleC7T1MODText(event) {  indexC7T1MOD = cycleText(event, textsC7T1MOD, indexC7T1MOD, buttonElementC7T1MOD, updateBackgroundColor);  updateTexts(); }
function cycleC7T1HDText(event) {  indexC7T1HD = cycleText(event, textsC7T1HD, indexC7T1HD, buttonElementC7T1HD, updateBackgroundColor);  updateTexts(); }
function cycleC7T1HERPFText(event) {  indexC7T1HERPF = cycleText(event, textsC7T1HERPF, indexC7T1HERPF, buttonElementC7T1HERPF, updateBackgroundColor);  updateTexts(); }
function cycleC7T1HERPPText(event) {  indexC7T1HERPP = cycleText(event, textsC7T1HERPP, indexC7T1HERPP, buttonElementC7T1HERPP, updateBackgroundColor);  updateTexts(); }
function cycleC7T1HERCText(event) {  indexC7T1HERC = cycleText(event, textsC7T1HERC, indexC7T1HERC, buttonElementC7T1HERC, updateBackgroundColor);  updateTexts(); }
function cycleC7T1HERLPText(event) {  indexC7T1HERLP = cycleText(event, textsC7T1HERLP, indexC7T1HERLP, buttonElementC7T1HERLP, updateBackgroundColor);  updateTexts(); }
function cycleC7T1HERLFText(event) {  indexC7T1HERLF = cycleText(event, textsC7T1HERLF, indexC7T1HERLF, buttonElementC7T1HERLF, updateBackgroundColor);  updateTexts(); }
function cycleC7T1MIGText(event) {  indexC7T1MIG = cycleText(event, textsC7T1MIG, indexC7T1MIG, buttonElementC7T1MIG, updateBackgroundColor);  updateTexts(); }
function cycleC7T1FAText(event) {  indexC7T1FA = cycleText(event, textsC7T1FA, indexC7T1FA, buttonElementC7T1FA, updateBackgroundColor);  updateTexts(); }
function cycleC7T1PFText(event) {  indexC7T1PF = cycleText(event, textsC7T1PF, indexC7T1PF, buttonElementC7T1PF, updateBackgroundColor);  updateTexts();}
function cycleC7T1PRText(event) {  indexC7T1PR = cycleText(event, textsC7T1PR, indexC7T1PR, buttonElementC7T1PR, updateBackgroundColor);  updateTexts();}
function cycleC7T1PKText(event) {  indexC7T1PK = cycleText(event, textsC7T1PK, indexC7T1PK, buttonElementC7T1PK, updateBackgroundColor);  updateTexts();}
function cycleC7T1LRText(event) {  indexC7T1LR = cycleText(event, textsC7T1LR, indexC7T1LR, buttonElementC7T1LR, updateBackgroundColor);  updateTexts();}
function cycleC7T1LFText(event) {  indexC7T1LF = cycleText(event, textsC7T1LF, indexC7T1LF, buttonElementC7T1LF, updateBackgroundColor);  updateTexts();}

function cycleT1LESText(event) {  indexT1LES = cycleText(event, textsT1LES, indexT1LES, buttonElementT1LES, updateBackgroundColor);  updateTexts(); }