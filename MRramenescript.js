// nebude zobrazovat context menu po rightclicku
var buttons = document.getElementsByTagName("button");

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("contextmenu", function(e){
        e.preventDefault();
    });
}

//button cycling
function cycleText(event, texts, index, buttonElement, callback) {
    if (event.button === 0) {
     
    if (index === texts.length - 1) {
      index = texts.length - 1;
    } else {
      index = (index + 1) % texts.length;
    }
  } else if (event.button === 2) {
     
    if (index === 0) {
      index = 0;
    } else {
      index = (index - 1 + texts.length) % texts.length;
    }
  }

  buttonElement.innerText = texts[index];
  buttonElement.value = texts[index].value;
  if (callback) callback(index, buttonElement);
  return index;
}

function updateBackgroundColor(index, buttonElement, color1 = "transparent", color2 = "#D4A29C") {
  buttonElement.style.backgroundColor = index === 0 ? color1 : color2;
}


//button define texts

var textsStrana = ["jakého?", "PRAVÉHO", "LEVÉHO"];

var textsNapln = ["0", "↑", "↑↑", "↑↑↑"];
var textsACdegenerace = ["0", "mírná", "střední", "výrazná", "dekomp"];
var textsACsubluxace = ["není", "Tossy I", "Tossy II", "Tossy III"];
var textsAcromion = ["0", "typ III", "os acrom."];

var textsGHdegenerace = ["0", "mírná", "střední", "výrazná"];
var textsGHsubluxace = ["0", "kraniální", "ventrální", "dorzální"];
var textsSASD = ["0", "↑", "↑↑", "↑↑↑"];
var textsSC = ["0", "↑", "↑↑"];
var textsBankart = ["0", "ano", "osseozní", "Perthes", "reverzní"];
var textsIGHL = ["OK", "edém", "HAGL", "GAGL"];

var textsRMsupra = ["OK", "tendinóza", "low-grade", "high-grade", "kompletní"];
var textsRMsupraLokHoriz = ["část...", "ventrálně", "centrálně", "dorzálně"];
var textsRMsupraLokVert = ["povrch...", "burzálně", "intersticiálně", "artikulárně"];

var textsRMinfra = ["OK", "tendinóza", "low-grade", "high-grade", "kompletní"];
var textsRMinfraLokHoriz = ["část...", "kraniálně", "centrálně", "kaudálně"];
var textsRMinfraLokVert = ["povrch...", "burzálně", "intersticiálně", "artikulárně"];

var textsRMss = ["OK", "tendinóza", "low-grade", "high-grade", "kompletní"];
var textsRMssLokHoriz = ["část...", "kraniálně", "centrálně", "kaudálně"];
var textsRMssLokVert = ["povrch...", "burzálně", "intersticiálně", "artikulárně"];

var textsLHBT = ["OK", "tendinóza", "low-grade", "high-grade", "kompletní"];



var textsOstBaker = ["0", "↑", "↑↑", "↑↑↑"];


var buttonElementStrana = document.getElementById("StranaButton");

var buttonElementNapln = document.getElementById("NaplnButton");
var buttonElementACdegenerace = document.getElementById("ACdegeneraceButton");
var buttonElementACsubluxace = document.getElementById('ACsubluxaceButton');
var buttonElementAcromion = document.getElementById("AcromionButton");

var buttonElementGHdegenerace = document.getElementById("GHdegeneraceButton");
var buttonElementGHsubluxace = document.getElementById("GHsubluxaceButton");
var buttonElementSASD = document.getElementById("SASDButton");
var buttonElementSC = document.getElementById("SCButton");
var buttonElementBankart = document.getElementById("BankartButton");
var buttonElementIGHL = document.getElementById("IGHLButton");

var buttonElementRMsupra = document.getElementById("RMsupraButton");
var buttonElementRMsupraLokVert = document.getElementById("RMsupraLokVertButton");
var selectElementRMsupraLokVert = document.getElementById('RMsupraLokVertButton');
var selectElementsupralok = document.getElementById('supralok'); var selectElementsupralokh = document.getElementById('supralokh'); var selectElementsupralokv = document.getElementById('supralokv'); var selectElementsupraa = document.getElementById('supraa'); var selectElementsupraatrofie = document.getElementById('supraatrofie');
var buttonElementRMsupraLokHoriz = document.getElementById("RMsupraLokHorizButton");
var selectElementRMsupraLokHoriz = document.getElementById('RMsupraLokHorizButton');

var buttonElementRMinfra = document.getElementById("RMinfraButton");
var buttonElementRMinfraLokVert = document.getElementById("RMinfraLokVertButton");
var selectElementRMinfraLokVert = document.getElementById('RMinfraLokVertButton');
var selectElementinfralok = document.getElementById('infralok'); var selectElementinfralokh = document.getElementById('infralokh'); var selectElementinfralokv = document.getElementById('infralokv'); var selectElementinfraa = document.getElementById('infraa'); var selectElementinfraatrofie = document.getElementById('infraatrofie');
var buttonElementRMinfraLokHoriz = document.getElementById("RMinfraLokHorizButton");
var selectElementRMinfraLokHoriz = document.getElementById('RMinfraLokHorizButton');

var buttonElementRMss = document.getElementById("RMssButton");
var buttonElementRMssLokVert = document.getElementById("RMssLokVertButton");
var selectElementRMssLokVert = document.getElementById('RMssLokVertButton');
var selectElementsslok = document.getElementById('sslok'); var selectElementsslokh = document.getElementById('sslokh'); var selectElementsslokv = document.getElementById('sslokv'); var selectElementssa = document.getElementById('ssa'); var selectElementssatrofie = document.getElementById('ssatrofie');
var buttonElementRMssLokHoriz = document.getElementById("RMssLokHorizButton");
var selectElementRMssLokHoriz = document.getElementById('RMssLokHorizButton');

var buttonElementLHBT = document.getElementById("LHBTButton");


var indexStrana = 0;function cycleStranaText(event) {  indexStrana = cycleText(event, textsStrana, indexStrana, buttonElementStrana, updateBackgroundColor);}

var indexNapln = 0;function cycleNaplnText(event) {  indexNapln = cycleText(event, textsNapln, indexNapln, buttonElementNapln, updateBackgroundColor);}
var indexACdegenerace = 0;function cycleACdegeneraceText(event) {  indexACdegenerace = cycleText(event, textsACdegenerace, indexACdegenerace, buttonElementACdegenerace, updateBackgroundColor);}
var indexACsubluxace = 0;function cycleACsubluxaceText(event) {  indexACsubluxace = cycleText(event, textsACsubluxace, indexACsubluxace, buttonElementACsubluxace, updateBackgroundColor);}
var indexAcromion = 0;function cycleAcromionText(event) {  indexAcromion = cycleText(event, textsAcromion, indexAcromion, buttonElementAcromion, updateBackgroundColor);}


var indexGHdegenerace = 0; function cycleGHdegeneraceText(event) {       indexGHdegenerace = cycleText(event, textsGHdegenerace, indexGHdegenerace, buttonElementGHdegenerace, updateBackgroundColor);}
var indexGHsubluxace = 0;function cycleGHsubluxaceText(event) {      indexGHsubluxace = cycleText(event, textsGHsubluxace, indexGHsubluxace, buttonElementGHsubluxace, updateBackgroundColor);}
var indexSASD = 0;function cycleSASDText(event) {      indexSASD = cycleText(event, textsSASD, indexSASD, buttonElementSASD, updateBackgroundColor);}
var indexSC = 0;function cycleSCText(event) {      indexSC = cycleText(event, textsSC, indexSC, buttonElementSC, updateBackgroundColor);}
var indexBankart = 0;function cycleBankartText(event) {      indexBankart = cycleText(event, textsBankart, indexBankart, buttonElementBankart, updateBackgroundColor);}
var indexIGHL = 0;function cycleIGHLText(event) {      indexIGHL = cycleText(event, textsIGHL, indexIGHL, buttonElementIGHL, updateBackgroundColor);}

var indexRMsupra = 0;function cycleRMsupraText(event) {      indexRMsupra = cycleText(event, textsRMsupra, indexRMsupra, buttonElementRMsupra, updateBackgroundColor);}
var indexRMsupraLokVert = 0;function cycleRMsupraLokVertText(event) {      indexRMsupraLokVert = cycleText(event, textsRMsupraLokVert, indexRMsupraLokVert, buttonElementRMsupraLokVert, updateBackgroundColor);}
var indexRMsupraLokHoriz = 0;function cycleRMsupraLokHorizText(event) {      indexRMsupraLokHoriz = cycleText(event, textsRMsupraLokHoriz, indexRMsupraLokHoriz, buttonElementRMsupraLokHoriz, updateBackgroundColor);}

var indexRMinfra = 0;function cycleRMinfraText(event) {      indexRMinfra = cycleText(event, textsRMinfra, indexRMinfra, buttonElementRMinfra, updateBackgroundColor);}
var indexRMinfraLokVert = 0;function cycleRMinfraLokVertText(event) {      indexRMinfraLokVert = cycleText(event, textsRMinfraLokVert, indexRMinfraLokVert, buttonElementRMinfraLokVert, updateBackgroundColor);}
var indexRMinfraLokHoriz = 0;function cycleRMinfraLokHorizText(event) {      indexRMinfraLokHoriz = cycleText(event, textsRMinfraLokHoriz, indexRMinfraLokHoriz, buttonElementRMinfraLokHoriz, updateBackgroundColor);}

var indexRMss = 0;function cycleRMssText(event) {      indexRMss = cycleText(event, textsRMss, indexRMss, buttonElementRMss, updateBackgroundColor);}
var indexRMssLokVert = 0;function cycleRMssLokVertText(event) {      indexRMssLokVert = cycleText(event, textsRMssLokVert, indexRMssLokVert, buttonElementRMssLokVert, updateBackgroundColor);}
var indexRMssLokHoriz = 0;function cycleRMssLokHorizText(event) {      indexRMssLokHoriz = cycleText(event, textsRMssLokHoriz, indexRMssLokHoriz, buttonElementRMssLokHoriz, updateBackgroundColor);}

var indexLHBT = 0;function cycleLHBTText(event) {      indexLHBT = cycleText(event, textsLHBT, indexLHBT, buttonElementLHBT, updateBackgroundColor);}

//hiding ruptury

buttonElementRMsupra.addEventListener("mousedown", function() {
    if (this.innerText === 'low-grade' || this.innerText === 'high-grade') {
        selectElementsupralok.classList.remove('hidden');
		selectElementsupralokh.classList.remove('hidden');
		selectElementsupralokv.classList.remove('hidden');
		selectElementsupraa.classList.remove('hidden');
		selectElementsupraatrofie.classList.remove('hidden');
    } else if (this.innerText === 'kompletní') {
        selectElementsupralok.classList.add('hidden');
		selectElementsupralokh.classList.add('hidden');
		selectElementsupralokv.classList.add('hidden');
		selectElementsupraa.classList.remove('hidden');
		selectElementsupraatrofie.classList.remove('hidden');
    } else {
        selectElementsupralok.classList.add('hidden');
		selectElementsupralokh.classList.add('hidden');
		selectElementsupralokv.classList.add('hidden');
		selectElementsupraa.classList.add('hidden');
		selectElementsupraatrofie.classList.add('hidden');
    }
});


buttonElementRMinfra.addEventListener("mousedown", function() {
    if (this.innerText === 'low-grade' || this.innerText === 'high-grade') {
        selectElementinfralok.classList.remove('hidden');
		selectElementinfralokh.classList.remove('hidden');
		selectElementinfralokv.classList.remove('hidden');
		selectElementinfraa.classList.remove('hidden');
		selectElementinfraatrofie.classList.remove('hidden');
    } else if (this.innerText === 'kompletní') {
        selectElementinfralok.classList.add('hidden');
		selectElementinfralokh.classList.add('hidden');
		selectElementinfralokv.classList.add('hidden');
		selectElementinfraa.classList.remove('hidden');
		selectElementinfraatrofie.classList.remove('hidden');
    } else {
        selectElementinfralok.classList.add('hidden');
		selectElementinfralokh.classList.add('hidden');
		selectElementinfralokv.classList.add('hidden');
		selectElementinfraa.classList.add('hidden');
		selectElementinfraatrofie.classList.add('hidden');
    }
});

buttonElementRMss.addEventListener("mousedown", function() {
    if (this.innerText === 'low-grade' || this.innerText === 'high-grade') {
        selectElementsslok.classList.remove('hidden');
		selectElementsslokh.classList.remove('hidden');
		selectElementsslokv.classList.remove('hidden');
		selectElementssa.classList.remove('hidden');
		selectElementssatrofie.classList.remove('hidden');
    } else if (this.innerText === 'kompletní') {
        selectElementsslok.classList.add('hidden');
		selectElementsslokh.classList.add('hidden');
		selectElementsslokv.classList.add('hidden');
		selectElementssa.classList.remove('hidden');
		selectElementssatrofie.classList.remove('hidden');
    } else {
        selectElementsslok.classList.add('hidden');
		selectElementsslokh.classList.add('hidden');
		selectElementsslokv.classList.add('hidden');
		selectElementssa.classList.add('hidden');
		selectElementssatrofie.classList.add('hidden');
    }
});



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


