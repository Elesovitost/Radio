//buttons: ACdegenerace, ACsubluxace, Acromion, GHdegenerace, GHsubluxace, SASD, SC, Bankart, IGHL, RMsupra, RMsupraLokVert, RMsupraLokHoriz, RMinfra, RMsub, LHBT
//checkboxes: SAprostor, SLAP, HS, LHBTsulkus, LHBTdisl

var POPtext = document.getElementById("POPtext");
var RESText = document.getElementById("RESText");
var FINALText = document.getElementById("FINALText");

function updateTexts() {

const StranaText = buttonElementStrana.innerText;
var indikace = document.getElementById("indikace").value;
const NaplnText = buttonElementNapln.innerText;

var VolnaTeliskaP = ""; var VolnaTeliskaR = ""; var checkboxVolnaTeliska = document.getElementById('checkboxVolnaTeliska');

var LezeLabra = document.getElementById("LezeLabra").value; 

const ACdegeneraceText = buttonElementACdegenerace.innerText;
const ACsubluxaceText = buttonElementACsubluxace.innerText;
const AcromionText = buttonElementAcromion.innerText;
const GHdegeneraceText = buttonElementGHdegenerace.innerText;
const GHsubluxaceText = buttonElementGHsubluxace.innerText;
const SASDText = buttonElementSASD.innerText;
const SCText = buttonElementSC.innerText;
const BankartText = buttonElementBankart.innerText;
const IGHLText = buttonElementIGHL.innerText;

const RMsupraText = buttonElementRMsupra.innerText;
const RMsupraLokVertText = buttonElementRMsupraLokVert.innerText;
const RMsupraLokHorizText = buttonElementRMsupraLokHoriz.innerText;

const RMinfraText = buttonElementRMinfra.innerText;
const RMinfraLokVertText = buttonElementRMinfraLokVert.innerText;
const RMinfraLokHorizText = buttonElementRMinfraLokHoriz.innerText;

const RMssText = buttonElementRMss.innerText;
const RMssLokVertText = buttonElementRMssLokVert.innerText;
const RMssLokHorizText = buttonElementRMssLokHoriz.innerText;

const LHBTText = buttonElementLHBT.innerText;

var SAprostorP = ""; var SAprostorR = ""; var checkboxSAprostor = document.getElementById('checkboxSAprostor');
var SLAPP = ""; var SLAPR = ""; var checkboxSLAP = document.getElementById('checkboxSLAP');
var HSP = ""; var HSR = ""; var checkboxHS = document.getElementById('checkboxHS'); 
var LHBTsulkusP = ""; var LHBTsulkusR = ""; var checkboxLHBTsulkus = document.getElementById('checkboxLHBTsulkus');
var LHBTdislP = ""; var LHBTdislR = ""; var checkboxLHBTdisl = document.getElementById('checkboxLHBTdisl');


//strana

if (StranaText === "jakého?") {
 Nadpis = "MR ramene"; 
} else if (StranaText === "PRAVÉHO") {
 Nadpis = "MR pravého ramene";
} else if (StranaText === "LEVÉHO") {
 Nadpis = "MR levého ramene";
} 


// obecné

if (NaplnText === "0") {
 NaplnP = "Bez zvýšené tekutiny."; 
 NaplnR = ""; 
} else if (NaplnText === "↑") {
 NaplnP = "Mírně zvýšené množství tekutiny v kloubní dutině.";
 NaplnR = "Mírně zvýšená kloubní náplň.";
} else if (NaplnText === "↑↑") {
 NaplnP = "Zvýšené množství tekutiny v kloubní dutině.";
 NaplnR = "Zvýšená kloubní náplň.";
} else if (NaplnText === "↑↑↑") {
 NaplnP = "Výrazně zvýšené množství tekutiny v kloubní dutině.";
 NaplnR = "Výrazné zvýšená kloubní náplň.";
}

 if (checkboxVolnaTeliska.checked) {
        VolnaTeliskaP = "Volná tělíska v kloubní dutině. ";
        VolnaTeliskaR = "Volná tělíska v kloubní dutině. ";
    } else {
        VolnaTeliskaP = "";
        VolnaTeliskaR = "";
    }

if (SASDText === "0") {
 SASDP = ""; 
 SASDR = ""; 
} else if (SASDText === "↑") {
 SASDP = "Stopově tekutina v subakromiální-subdeltoidní burze.";
 SASDR = "Stopově subakromiální-subdeltoidní burzitis.";
} else if (SASDText === "↑↑") {
 SASDP = "Tekutina v subakromiální-subdeltoidní burze.";
 SASDR = "Subakromiální-subdeltoidní burzitis.";
} else if (SASDText === "↑↑↑") {
 SASDP = "Výrazné množství tekutiny v subakromiální-subdeltoidní burze.";
 SASDR = "Výrazná subakromiální-subdeltoidní burzitis.";
}	

if (SCText === "0") {
 SCP = ""; 
 SCR = ""; 
} else if (SCText === "↑") {
 SCP = "Tekutina v subkorakoidní burze.";
 SCR = "Subkorakoidní burzitis.";
} else if (SCText === "↑↑") {
 SCP = "Větší množství tekutiny v subkorakoidní burze.";
 SCR = "Výrazná subkorakoidní burzitis.";
}	


//AC

if (ACdegeneraceText === "0") {
 ACdegeneraceP = "AC skloubení bez výraznější degenerace."; 
 ACdegeneraceR = ""; 
} else if (ACdegeneraceText === "mírná") {
 ACdegeneraceP = "Mírné degenerativní změny AC skloubení s drobnými osteofyty.";
 ACdegeneraceR = "Mírná AC artróza.";
} else if (ACdegeneraceText === "střední") {
 ACdegeneraceP = "Degenerativní změny AC skloubení s osteofyty.";
 ACdegeneraceR = "AC artróza.";
} else if (ACdegeneraceText === "výrazná") {
 ACdegeneraceP = "Výrazné degenerativní změny AC skloubení s osteofyty.";
 ACdegeneraceR = "Pokročilá AC artróza.";
} else if (ACdegeneraceText === "dekomp") {
 ACdegeneraceP = "Degenerativní změny AC skloubení se subchondrálním edémem.";
 ACdegeneraceR = "Dekompenzovaná AC artróza s edémem.";
}	

if (ACsubluxaceText === "není") {
 ACsubluxaceP = ""; 
 ACsubluxaceR = ""; 
} else if (ACsubluxaceText === "Tossy I") {
 ACsubluxaceP = "Distenze AC skloubení s rozšířením štěrbiny a edémem při lézi AC vazu.";
 ACsubluxaceR = "Distenze v AC skloubení Tossy I.";
} else if (ACsubluxaceText === "Tossy II") {
 ACsubluxaceP = "Distenze AC skloubení s výrazným rozšířením štěrbiny a edémem při lézi AC vazu i CC vazu.";
 ACsubluxaceR = "Subluxace v AC skloubení Tossy II.";
} else if (ACsubluxaceText === "Tossy III") {
 ACsubluxaceP = "Luxace v AC AC skloubení při lézi AC i CC vazu.";
 ACsubluxaceR = "AC luxace Tossy III.";
}	

if (AcromionText === "0") {
 AcromionP = ""; 
 AcromionR = ""; 
} else if (AcromionText === "typ III") {
 AcromionP = "Hákovité ohnutí předního akromia.";
 AcromionR = "Akromion typ III.";
} else if (AcromionText === "os acrom.") {
 AcromionP = "Os acromiale.";
 AcromionR = "Os acromiale.";
}


if (checkboxSAprostor.checked && AcromionText === "os acrom." && ACdegeneraceText === "0")  {
  SAprostorP = "Zúžení SA prostoru.";
  SAprostorR = "Zúžení SA prostoru na podkladě os acromiale."; AcromionR = "";
} else if (checkboxSAprostor.checked && AcromionText === "typ III" && ACdegeneraceText === "0") {
  SAprostorP = "Zúžení SA prostoru.";
  SAprostorR = "Zúžení SA prostoru na podkladě hákovitého tvaru akromia."; AcromionR = "";
} else if (checkboxSAprostor.checked && ACdegeneraceText !== "0" && AcromionText === "0") {
  SAprostorP = "Zúžení SA prostoru.";
  SAprostorR = "Zúžení SA prostoru na podkladě AC artrózy."; ACdegeneraceR = "";
} else if (checkboxSAprostor.checked && ACdegeneraceText !== "0" && AcromionText === "typ III") {
  SAprostorP = "Zúžení SA prostoru.";
  SAprostorR = "Zúžení SA prostoru na podkladě AC artrózy a hákovitě zahnutého akromia."; ACdegeneraceR = ""; AcromionR = "";
} else if (checkboxSAprostor.checked && ACdegeneraceText !== "0" && AcromionText === "os acrom.") {
  SAprostorP = "Zúžení SA prostoru.";
  SAprostorR = "Zúžení SA prostoru na podkladě AC artrózy a os acromiale."; ACdegeneraceR = ""; AcromionR = "";
} else if (checkboxSAprostor.checked && ACdegeneraceText === "0" && AcromionText === "0") {
  SAprostorP = "Zúžení SA prostoru.";
  SAprostorR = "Zúžení SA prostoru."; ACdegeneraceR = ""; AcromionR = "";
}

//GH

if (GHdegeneraceText === "0") {
 GHdegeneraceP = ""; 
 GHdegeneraceR = ""; 
} else if (GHdegeneraceText === "mírná") {
 GHdegeneraceP = "Mírné snížení chrupavek GH kloubu, přihrocení okrajů kloubních ploch.";
 GHdegeneraceR = "";
} else if (GHdegeneraceText === "střední") {
 GHdegeneraceP = "Snížení chrupavek GH kloubu, drobné okrajové osteofyty.";
 GHdegeneraceR = "Omartróza.";
} else if (GHdegeneraceText === "výrazná") {
 GHdegeneraceP = "Výrazné snížení chrupavek GH kloubu, subchondrální edém glenoidu i hlavic, okrajové osteofyty.";
 GHdegeneraceR = "Výrazná omartróza.";
}	

if (GHsubluxaceText === "0") {
 GHsubluxaceP = ""; 
 GHsubluxaceR = ""; 
} else if (GHsubluxaceText === "kraniální") {
 GHsubluxaceP = "Kraniální subluxace hlavice humeru.";
 GHsubluxaceR = "Kraniální subluxace hlavice humeru.";
} else if (GHsubluxaceText === "ventrální") {
 GHsubluxaceP = "Ventrální subluxace hlavice humeru.";
 GHsubluxaceR = "Ventrální subluxace hlavice humeru.";
} else if (GHsubluxaceText === "dorzální") {
 GHsubluxaceP = "Dorzální subluxace hlavice humeru.";
 GHsubluxaceR = "Dorzální subluxace hlavice humeru.";
}	

if (checkboxHS.checked)  {
  HSP = "Defekt horní zadní konvexity hlavice humeru s edémem.";
  HSR = "Hill-Sachsova léze hlavice humeru."; 
} else {
  HSP = "";
  HSR = "";
}


if (IGHLText === "OK") {
 IGHLP = ""; 
 IGHLR = ""; 
} else if (IGHLText === "edém") {
 IGHLP = "Rozšíření a vysoká SI dolního glenohumerálního ligamenta.";
 IGHLR = "Rozšíření a edém dolního glenohumerálního ligamenta: v dif.dg. potraumaticky či v rámci zánětu.";
} else if (IGHLText === "HAGL") {
 IGHLP = "Léze dolního glenohumerálního ligamenta při humeru a tekutinou v axil. recesu zasahující výrazně kaudálně.";
 IGHLR = "Léze dolního glenohumerálního ligamenta.";
} else if (IGHLText === "GAGL") {
 IGHLP = "Léze dolního glenohumerálního ligamenta při glenoidu a tekutinou v axil. recesu zasahující výrazně kaudálně.";
 IGHLR = "Léze dolního glenohumerálního ligamenta.";
} 


//RM supra

if (RMsupraText === "OK") {
 RMsupraP = "Šlacha m. supraspinatus má zachovalou kontinuitu a přiměřenou SI."; 
 RMsupraR = ""; 
} else if (RMsupraText === "tendinóza") {
 RMsupraP = "Zvýšená SI šlachy m. supraspinatus "; 
 RMsupraR = "Tendinóza šlachy m. supraspinatus ";
} else if (RMsupraText === "low-grade") {
 RMsupraP = "Drobné porušení kontinuity šlachy m. supraspinatus ";
 RMsupraR = "Low-grade parciální ruptura šlachy m. supraspinatus ";
} else if (RMsupraText === "high-grade") {
 RMsupraP = "Výrazné porušení kontinuity šlachy m. supraspinatus ";
 RMsupraR = "High-grade parciální ruptura šlachy m. supraspinatus ";
} else if (RMsupraText === "kompletní") {
 RMsupraP = "Kompletní přerušení kontinuity šlachy m. supraspinatus s její retrakcí ";
 RMsupraR = "Kompletní ruptura šlachy m. supraspinatus ";
}

if (RMsupraLokVertText === "povrch...") {
 RMsupraLokVertP = ""; 
 RMsupraLokVertR = ""; 
} else if (RMsupraLokVertText === "burzálně") {
 RMsupraLokVertP = "burzálního povrchu ";
} else if (RMsupraLokVertText === "intersticiálně") {
 RMsupraLokVertP = "intradendinózně ";
} else if (RMsupraLokVertText === "artikulárně") {
 RMsupraLokVertP = "artikulárního povrchu ";
} 

if (RMsupraLokHorizText === "část...") {
 RMsupraLokHorizP = ""; 
 RMsupraLokHorizR = ""; 
} else if (RMsupraLokHorizText === "ventrálně") {
 RMsupraLokHorizP = "v přední části ";
} else if (RMsupraLokHorizText === "centrálně") {
 RMsupraLokHorizP = "ve střední části ";
} else if (RMsupraLokHorizText === "dorzálně") {
 RMsupraLokHorizP = "v zadní části ";
} 

if (checkboxsupraAtrofie.checked)  {
  supraAtrofieP = "a atrofií svalu s tukovou přestavbou";
  supraAtrofieR = "s atrofií svalu"; 
} else {
  supraAtrofieP = "";
  supraAtrofieR = "";
}	
// reset lokací
if (RMsupraText === "OK") {  
 RMsupraLokVertP = ""; RMsupraLokHorizP = ""; RMsupraLokVertR = ""; RMsupraLokHorizR = ""; supraAtrofieP = ""; supraAtrofieR = "";  
} else if (RMsupraText === "tendinóza") {
 RMsupraLokVertP = ""; RMsupraLokHorizP = ""; RMsupraLokVertR = ""; RMsupraLokHorizR = ""; supraAtrofieP = ""; supraAtrofieR = "";
} else if (RMsupraText === "kompletní") {
 RMsupraLokVertP = ""; RMsupraLokHorizP = ""; RMsupraLokVertR = ""; RMsupraLokHorizR = "";
}

RMsupraFinalP =  RMsupraP + RMsupraLokVertP + RMsupraLokHorizP + supraAtrofieP + ".";
RMsupraFinalR =  RMsupraR + RMsupraLokVertR + RMsupraLokHorizR + supraAtrofieR + ".";

//infra

if (RMinfraText === "OK") {
 RMinfraP = "Šlacha m. infraspinatus má zachovalou kontinuitu a přiměřenou SI."; 
 RMinfraR = ""; 
} else if (RMinfraText === "tendinóza") {
 RMinfraP = "Zvýšená SI šlachy m. infraspinatus "; 
 RMinfraR = "Tendinóza šlachy m. infraspinatus ";
} else if (RMinfraText === "low-grade") {
 RMinfraP = "Drobné porušení kontinuity šlachy m. infraspinatus ";
 RMinfraR = "Low-grade parciální ruptura šlachy m. infraspinatus ";
} else if (RMinfraText === "high-grade") {
 RMinfraP = "Výrazné porušení kontinuity šlachy m. infraspinatus ";
 RMinfraR = "High-grade parciální ruptura šlachy m. infraspinatus ";
} else if (RMinfraText === "kompletní") {
 RMinfraP = "Kompletní přerušení kontinuity šlachy m. infraspinatus s její retrakcí ";
 RMinfraR = "Kompletní ruptura šlachy m. infraspinatus ";
}

if (RMinfraLokVertText === "povrch...") {
 RMinfraLokVertP = ""; 
 RMinfraLokVertR = ""; 
} else if (RMinfraLokVertText === "burzálně") {
 RMinfraLokVertP = "burzálního povrchu ";
} else if (RMinfraLokVertText === "intersticiálně") {
 RMinfraLokVertP = "intradendinózně ";
} else if (RMinfraLokVertText === "artikulárně") {
 RMinfraLokVertP = "artikulárního povrchu ";
} 

if (RMinfraLokHorizText === "část...") {
 RMinfraLokHorizP = ""; 
 RMinfraLokHorizR = ""; 
} else if (RMinfraLokHorizText === "kraniálně") {
 RMinfraLokHorizP = "v horní části ";
} else if (RMinfraLokHorizText === "centrálně") {
 RMinfraLokHorizP = "ve střední části ";
} else if (RMinfraLokHorizText === "kaudálně") {
 RMinfraLokHorizP = "v dolní části ";
} 

if (checkboxinfraAtrofie.checked)  {
  infraAtrofieP = "a atrofií svalu s tukovou přestavbou";
  infraAtrofieR = "s atrofií svalu"; 
} else {
  infraAtrofieP = "";
  infraAtrofieR = "";
}	

if (RMinfraText === "OK") {  // reset lokací
 RMinfraLokVertP = ""; RMinfraLokHorizP = ""; RMinfraLokVertR = ""; RMinfraLokHorizR = ""; infraAtrofieP = ""; infraAtrofieR = "";  
} else if (RMinfraText === "tendinóza") {
 RMinfraLokVertP = ""; RMinfraLokHorizP = ""; RMinfraLokVertR = ""; RMinfraLokHorizR = ""; infraAtrofieP = ""; infraAtrofieR = "";
} else if (RMinfraText === "kompletní") {
 RMinfraLokVertP = ""; RMinfraLokHorizP = ""; RMinfraLokVertR = ""; RMinfraLokHorizR = "";
}

RMinfraFinalP =  RMinfraP + RMinfraLokVertP + RMinfraLokHorizP + infraAtrofieP + ".";
RMinfraFinalR =  RMinfraR + RMinfraLokVertR + RMinfraLokHorizR + infraAtrofieR + ".";

//SS

if (RMssText === "OK") {
 RMssP = "Šlacha m. subscapularis má zachovalou kontinuitu a přiměřenou SI."; 
 RMssR = ""; 
} else if (RMssText === "tendinóza") {
 RMssP = "Zvýšená SI šlachy m. subscapularis "; 
 RMssR = "Tendinóza šlachy m. subscapularis ";
} else if (RMssText === "low-grade") {
 RMssP = "Drobné porušení kontinuity šlachy m. subscapularis ";
 RMssR = "Low-grade parciální ruptura šlachy m. subscapularis ";
} else if (RMssText === "high-grade") {
 RMssP = "Výrazné porušení kontinuity šlachy m. subscapularis ";
 RMssR = "High-grade parciální ruptura šlachy m. subscapularis ";
} else if (RMssText === "kompletní") {
 RMssP = "Kompletní přerušení kontinuity šlachy m. subscapularis s její retrakcí ";
 RMssR = "Kompletní ruptura šlachy m. subscapularis ";
}

if (RMssLokVertText === "povrch...") {
 RMssLokVertP = ""; 
 RMssLokVertR = ""; 
} else if (RMssLokVertText === "burzálně") {
 RMssLokVertP = "burzálního povrchu ";
} else if (RMssLokVertText === "intersticiálně") {
 RMssLokVertP = "intradendinózně ";
} else if (RMssLokVertText === "artikulárně") {
 RMssLokVertP = "artikulárního povrchu ";
} 

if (RMssLokHorizText === "část...") {
 RMssLokHorizP = ""; 
 RMssLokHorizR = ""; 
} else if (RMssLokHorizText === "kraniálně") {
 RMssLokHorizP = "v horní části ";
} else if (RMssLokHorizText === "centrálně") {
 RMssLokHorizP = "ve střední části ";
} else if (RMssLokHorizText === "kaudálně") {
 RMssLokHorizP = "v dolní části ";
} 

if (checkboxssAtrofie.checked)  {
  ssAtrofieP = "a atrofií svalu s tukovou přestavbou";
  ssAtrofieR = "s atrofií svalu"; 
} else {
  ssAtrofieP = "";
  ssAtrofieR = "";
}	

if (RMssText === "OK") {  // reset lokací
 RMssLokVertP = ""; RMssLokHorizP = ""; RMssLokVertR = ""; RMssLokHorizR = ""; ssAtrofieP = ""; ssAtrofieR = "";  
} else if (RMssText === "tendinóza") {
 RMssLokVertP = ""; RMssLokHorizP = ""; RMssLokVertR = ""; RMssLokHorizR = ""; ssAtrofieP = ""; ssAtrofieR = "";
} else if (RMssText === "kompletní") {
 RMssLokVertP = ""; RMssLokHorizP = ""; RMssLokVertR = ""; RMssLokHorizR = "";
}

RMssFinalP =  RMssP + RMssLokVertP + RMssLokHorizP + ssAtrofieP + ".";
RMssFinalR =  RMssR + RMssLokVertR + RMssLokHorizR + ssAtrofieR + ".";

// labrum

if (LezeLabra === "") {
 LezeLabraP = ""; 
 LezeLabraR = ""; 
} else if (LezeLabra === "difuzní") {
 LezeLabraP = "Difuzně defigurované labrum s vysokou SI.";
 LezeLabraR = "Difuzní léze labra.";
} else if (LezeLabra === "horního") {
 LezeLabraP = "Defigurace horního labra s vysokou SI.";
 LezeLabraR = "Léze horního labra.";
} else if (LezeLabra === "předního") {
 LezeLabraP = "Defigurace předního labra s vysokou SI.";
 LezeLabraR = "Léze předního labra.";
} else if (LezeLabra === "zadního") {
 LezeLabraP = "Defigurace zadního labra s vysokou SI.";
 LezeLabraR = "Léze zadního labra.";
} else if (LezeLabra === "dolního") {
 LezeLabraP = "Defigurace dolního labra s vysokou SI.";
 LezeLabraR = "Léze dolního labra.";
}

if (checkboxSLAP.checked)  {
  SLAPP = "Vysoká SI labra na pozici 11-12 zasahující sublabrálně.";
  SLAPR = "SLAP léze."; 
} else {
  SLAPP = "";
  SLAPR = "";
}

if (BankartText === "0") {
 BankartP = ""; 
 BankartR = ""; 
} else if (BankartText === "ano") {
 BankartP = "Defekt labra na pozici 3-5.";
 BankartR = "Bankartova léze předního dolního labra.";
} else if (BankartText === "osseozní") {
 BankartP = "Defekt labra a přilehlého glenoidu na pozici 3-5.";
 BankartR = "Bankartova léze předního dolního labra a glenoidu.";
} else if (BankartText === "Perthes") {
 BankartP = "Léze labra na pozici 3-5 s jeho odtržením.";
 BankartR = "Perthesova léze předního dolního labra.";
} else if (BankartText === "reverzní") {
 BankartP = "Defekt labra na pozici 7-9.";
 BankartR = "Reverzní Bankartova léze zadního labra.";
} 

if (LezeLabra === "" && BankartText === "0" && !checkboxSLAP.checked) {
 LezeLabraFinalP = "Labrum bez výraznější léze."; 
 LezeLabraFinalR = ""; 
} else {
 LezeLabraFinalP = LezeLabraP + " " + SLAPP + " " + BankartP;
 LezeLabraFinalR = LezeLabraR + " " + SLAPR + " " + BankartR;
}

//LHBT

if (LHBTText === "OK") {
 LHBTP = "Šlacha dlouhé hlavy bicepsu má zachovalou kontinuitu a přiměřenou SI."; 
 LHBTR = ""; 
} else if (LHBTText === "tendinóza") {
 LHBTP = "Zvýšená SI šlachy dlouhé hlavy bicepsu."; 
 LHBTR = "Tendinóza šlachy dlouhé hlavy bicepsu.";
} else if (LHBTText === "low-grade") {
 LHBTP = "Drobné porušení kontinuity šlachy dlouhé hlavy bicepsu.";
 LHBTR = "Low-grade parciální ruptura šlachy dlouhé hlavy bicepsu.";
} else if (LHBTText === "high-grade") {
 LHBTP = "Výrazné porušení kontinuity šlachy dlouhé hlavy bicepsu.";
 LHBTR = "High-grade parciální ruptura šlachy dlouhé hlavy bicepsu.";
} else if (LHBTText === "kompletní") {
 LHBTP = "Kompletní přerušení kontinuity šlachy dlouhé hlavy bicepsu s její retrakcí.";
 LHBTR = "Kompletní ruptura šlachy dlouhé hlavy bicepsu.";
}

if (checkboxLHBTsulkus.checked)  {
  LHBTsulkusP = "Zmnožená tekutina v bicipitálním sulku.";
} else {
  LHBTsulkusP = "";
}

if (checkboxLHBTdisl.checked)  {
  LHBTdislP = "Mediální dislokace bicipitální šlachy.";
  LHBTdislR = "Mediální dislokace bicipitální šlachy."; 
} else {
  LHBTdislP = "";
  LHBTdislR = "";
}


//POPIS

POPText.value = 
NaplnP + " " + VolnaTeliskaP + " " + ACsubluxaceP + " " + ACdegeneraceP + " " + AcromionP + " " + SAprostorP + "\n" + 
GHdegeneraceP + " " + GHsubluxaceP + " " + IGHLP + " " + HSP + " " + SASDP + " " + SCP + "\n" +
RMsupraFinalP + "\n" +
RMinfraFinalP + "\n" +
RMssFinalP + "\n" +
LezeLabraFinalP + "\n" +
LHBTP + " " + LHBTdislP + " " + LHBTsulkusP;
	
POPText.value = POPText.value.trim(); 
POPText.value = POPText.value.replace(/^\s+/gm, '');  // odstraní mezery na začátku řádek
POPText.value = POPText.value.replace(/^\s*[\r\n]/gm, '');  // odstraní prázdné řádky
POPText.value = POPText.value.split(/\r?\n/).filter(item => item.trim() !== '').join('\n');  // prázdné řádky
POPText.value = POPText.value.replace(/ ,/g, ',');  // smazat mezeru před čárkou
POPText.value = POPText.value.replace(/ \./g, '.'); // smazat mezeru před tečkou
POPText.value = POPText.value.replace(/\.{2,}/g, '.'); // více teček = jedna tečka
POPText.value = POPText.value.replace(/\,{2,}/g, ','); // více čárek = jedna čárka
POPText.value = POPText.value.replace(/,\./g, '.'); // odstraní čárku před tečkou
POPText.value = POPText.value.replace(/  +/g, ' '); // dvojmezery
POPText.value = POPText.value.replace(/^(\.+)/gm, ''); //odstraní tečku pokud je to první věc na řádce


RESText.value = 
"Závěr: " + "\n" +
NaplnR + " " + VolnaTeliskaR + " " + ACsubluxaceR + " " + ACdegeneraceR + " " + AcromionR + " " + SAprostorR + "\n" +
GHdegeneraceR + " " + GHsubluxaceR + " " + IGHLR + " " +HSR + " " + SASDR + " " + SCR + "\n" + 
RMsupraFinalR + "\n" +
RMinfraFinalR + "\n" +
RMssFinalR + "\n" +
LezeLabraFinalR + "\n" +
LHBTR + " " + LHBTdislR; 

RESText.value = RESText.value.trim(); 
RESText.value = RESText.value.replace(/^\s+/gm, '');  // odstraní mezery na začátku řádek
RESText.value = RESText.value.replace(/^(\.+)/gm, ''); //odstraní tečku pokud je to první věc na řádce
RESText.value = RESText.value.replace(/^\s*[\r\n]/gm, '');  // odstraní prázdné řádky
RESText.value = RESText.value.split(/\r?\n/).filter(item => item.trim() !== '').join('\n');  // prázdné řádky
RESText.value = RESText.value.replace(/ ,/g, ',');  // smazat mezeru před čárkou
RESText.value = RESText.value.replace(/ \./g, '.'); // smazat mezeru před tečkou
RESText.value = RESText.value.replace(/\.{2,}/g, '.'); // více teček = jedna tečka
RESText.value = RESText.value.replace(/\,{2,}/g, ','); // více čárek = jedna čárka
RESText.value = RESText.value.replace(/,\./g, '.'); // odstraní čárku před tečkou
RESText.value = RESText.value.replace(/  +/g, ' '); // dvojmezery


FINALText.value =
Nadpis + "\n\n" +
"Indikace: " + indikace + "\n\n" + 
"Sekvence: Rameno vyšetřeno v cor, tra, sag PDW FS, cor T1W, sag T2W." + "\n\n" +
POPText.value + "\n\n" + 
RESText.value;


document.getElementById("indikace").addEventListener("input", updateTexts);
}
updateTexts();	

function updateTextAndCycleText(event, texts, index, buttonElement, cycleFunc) {  cycleFunc(event);  updateTexts();}

function cycleStranaText(event) {  indexStrana = cycleText(event, textsStrana, indexStrana, buttonElementStrana);  updateTexts();}
function cycleNaplnText(event) {  indexNapln = cycleText(event, textsNapln, indexNapln, buttonElementNapln, updateBackgroundColor);  updateTexts();}
function cycleACdegeneraceText(event) { indexACdegenerace = cycleText(event, textsACdegenerace, indexACdegenerace, buttonElementACdegenerace, updateBackgroundColor); updateTexts(); }
function cycleACsubluxaceText(event) { indexACsubluxace = cycleText(event, textsACsubluxace, indexACsubluxace, buttonElementACsubluxace, updateBackgroundColor); updateTexts(); }
function cycleAcromionText(event) { indexAcromion = cycleText(event, textsAcromion, indexAcromion, buttonElementAcromion, updateBackgroundColor); updateTexts(); }
function cycleGHdegeneraceText(event) { indexGHdegenerace = cycleText(event, textsGHdegenerace, indexGHdegenerace, buttonElementGHdegenerace, updateBackgroundColor); updateTexts(); }
function cycleGHsubluxaceText(event) { indexGHsubluxace = cycleText(event, textsGHsubluxace, indexGHsubluxace, buttonElementGHsubluxace, updateBackgroundColor); updateTexts(); }
function cycleSASDText(event) { indexSASD = cycleText(event, textsSASD, indexSASD, buttonElementSASD, updateBackgroundColor); updateTexts(); }
function cycleSCText(event) { indexSC = cycleText(event, textsSC, indexSC, buttonElementSC, updateBackgroundColor); updateTexts(); }
function cycleBankartText(event) { indexBankart = cycleText(event, textsBankart, indexBankart, buttonElementBankart, updateBackgroundColor); updateTexts(); }
function cycleIGHLText(event) { indexIGHL = cycleText(event, textsIGHL, indexIGHL, buttonElementIGHL, updateBackgroundColor); updateTexts(); }

function cycleRMsupraText(event) { indexRMsupra = cycleText(event, textsRMsupra, indexRMsupra, buttonElementRMsupra, updateBackgroundColor); updateTexts(); }
function cycleRMsupraLokVertText(event) { indexRMsupraLokVert = cycleText(event, textsRMsupraLokVert, indexRMsupraLokVert, buttonElementRMsupraLokVert, updateBackgroundColor); updateTexts(); }
function cycleRMsupraLokHorizText(event) { indexRMsupraLokHoriz = cycleText(event, textsRMsupraLokHoriz, indexRMsupraLokHoriz, buttonElementRMsupraLokHoriz, updateBackgroundColor); updateTexts(); }

function cycleRMinfraText(event) { indexRMinfra = cycleText(event, textsRMinfra, indexRMinfra, buttonElementRMinfra, updateBackgroundColor); updateTexts(); }
function cycleRMinfraLokVertText(event) { indexRMinfraLokVert = cycleText(event, textsRMinfraLokVert, indexRMinfraLokVert, buttonElementRMinfraLokVert, updateBackgroundColor); updateTexts(); }
function cycleRMinfraLokHorizText(event) { indexRMinfraLokHoriz = cycleText(event, textsRMinfraLokHoriz, indexRMinfraLokHoriz, buttonElementRMinfraLokHoriz, updateBackgroundColor); updateTexts(); }

function cycleRMssText(event) { indexRMss = cycleText(event, textsRMss, indexRMss, buttonElementRMss, updateBackgroundColor); updateTexts(); }
function cycleRMssLokVertText(event) { indexRMssLokVert = cycleText(event, textsRMssLokVert, indexRMssLokVert, buttonElementRMssLokVert, updateBackgroundColor); updateTexts(); }
function cycleRMssLokHorizText(event) { indexRMssLokHoriz = cycleText(event, textsRMssLokHoriz, indexRMssLokHoriz, buttonElementRMssLokHoriz, updateBackgroundColor); updateTexts(); }

function cycleLHBTText(event) { indexLHBT = cycleText(event, textsLHBT, indexLHBT, buttonElementLHBT, updateBackgroundColor); updateTexts(); }

