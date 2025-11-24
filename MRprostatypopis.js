// COPY

var copyFINAL = document.getElementById('copyFINAL');
var ProstateFinalText = document.getElementById('ProstateFinalText');

copyFINAL.addEventListener('click', function() {
	
    navigator.clipboard.writeText(ProstateFinalText.value)
    .then(() => {
        ProstateFinalText.classList.add('highlight');

        setTimeout(function() {
            ProstateFinalText.classList.remove('highlight');
        }, 100);
    })
    .catch(err => {
    });
});



var copyPOP = document.getElementById('copyPOP');
var ProstateTuPOPText = document.getElementById('ProstateTuPOPText');

copyPOP.addEventListener('click', function() {
    navigator.clipboard.writeText(ProstateTuPOPText.value)
    .then(() => {
        ProstateTuPOPText.classList.add('highlight');

        setTimeout(function() {
            ProstateTuPOPText.classList.remove('highlight');
        }, 100);
    })
    .catch(err => {
    });
});



var copyRES = document.getElementById('copyRES');
var ProstateTuRESText = document.getElementById('ProstateTuRESText');

copyRES.addEventListener('click', function() {
    navigator.clipboard.writeText(ProstateTuRESText.value)
    .then(() => {
        ProstateTuRESText.classList.add('highlight');

        setTimeout(function() {
            ProstateTuRESText.classList.remove('highlight');
        }, 100);
    })
    .catch(err => {
    });
});



// LESION1
var textsProstateLesion1T2 = ["T2 score 1", "T2 score 2", "T2 score 3", "T2 score 4", "T2 score 5"];
var buttonElementProstateLesion1T2 = document.getElementById("ProstateLesion1T2Button");
var indexProstateLesion1T2 = 0;function cycleProstateLesion1T2Text(event) {  indexProstateLesion1T2 = cycleText(event, textsProstateLesion1T2, indexProstateLesion1T2, buttonElementProstateLesion1T2);}
function cycleProstateLesion1T2Text(event) {  indexProstateLesion1T2 = cycleText(event, textsProstateLesion1T2, indexProstateLesion1T2, buttonElementProstateLesion1T2, updateBackgroundColor);  updateTexts();}

var textsProstateLesion1DWI = ["DWI score 1", "DWI score 2", "DWI score 3", "DWI score 4", "DWI score 5"];
var buttonElementProstateLesion1DWI = document.getElementById("ProstateLesion1DWIButton");
var indexProstateLesion1DWI = 0;function cycleProstateLesion1DWIText(event) {  indexProstateLesion1DWI = cycleText(event, textsProstateLesion1DWI, indexProstateLesion1DWI, buttonElementProstateLesion1DWI);}
function cycleProstateLesion1DWIText(event) {  indexProstateLesion1DWI = cycleText(event, textsProstateLesion1DWI, indexProstateLesion1DWI, buttonElementProstateLesion1DWI, updateBackgroundColor);  updateTexts();}

var textsProstateLesion1C = ["kontrast -", "kontrast +"];
var buttonElementProstateLesion1C = document.getElementById("ProstateLesion1CButton");
var indexProstateLesion1C = 0;function cycleProstateLesion1CText(event) {  indexProstateLesion1C = cycleText(event, textsProstateLesion1C, indexProstateLesion1C, buttonElementProstateLesion1C);}
function cycleProstateLesion1CText(event) {  indexProstateLesion1C = cycleText(event, textsProstateLesion1C, indexProstateLesion1C, buttonElementProstateLesion1C, updateBackgroundColor);  updateTexts();}

var textsProstateLesion1Invasion = ["bez invaze", "přes kapsulu", "semen. váčků", "okolních struktur"];
var buttonElementProstateLesion1Invasion = document.getElementById("ProstateLesion1InvasionButton");
var indexProstateLesion1Invasion = 0;function cycleProstateLesion1InvasionText(event) {  indexProstateLesion1Invasion = cycleText(event, textsProstateLesion1Invasion, indexProstateLesion1Invasion, buttonElementProstateLesion1Invasion);}
function cycleProstateLesion1InvasionText(event) {  indexProstateLesion1Invasion = cycleText(event, textsProstateLesion1Invasion, indexProstateLesion1Invasion, buttonElementProstateLesion1Invasion, updateBackgroundColor);  updateTexts();}

var textsProstateLesion1PSMA = ["PSMA 0", "PSMA 1", "PSMA 2", "PSMA 3"];
var buttonElementProstateLesion1PSMA = document.getElementById("ProstateLesion1PSMAButton");
var indexProstateLesion1PSMA = 0;function cycleProstateLesion1PSMAText(event) {  indexProstateLesion1PSMA = cycleText(event, textsProstateLesion1PSMA, indexProstateLesion1PSMA, buttonElementProstateLesion1PSMA);}
function cycleProstateLesion1PSMAText(event) {  indexProstateLesion1PSMA = cycleText(event, textsProstateLesion1PSMA, indexProstateLesion1PSMA, buttonElementProstateLesion1PSMA, updateBackgroundColor);  updateTexts();}

var textsProstateLesion1PIRADS = ["PI-RADS 1", "PI-RADS 2", "PI-RADS 3", "PI-RADS 4", "PI-RADS 5"];
var buttonElementProstateLesion1PIRADS = document.getElementById("ProstateLesion1PIRADSButton");
var indexProstateLesion1PIRADS = 0;function cycleProstateLesion1PIRADSText(event) {  indexProstateLesion1PIRADS = cycleText(event, textsProstateLesion1PIRADS, indexProstateLesion1PIRADS, buttonElementProstateLesion1PIRADS);}
function cycleProstateLesion1PIRADSText(event) {  indexProstateLesion1PIRADS = cycleText(event, textsProstateLesion1PIRADS, indexProstateLesion1PIRADS, buttonElementProstateLesion1PIRADS, updateBackgroundColor);  updateTexts();}

var textsProstateHyperplasia = ["není", "mírná", "střední", "pokročilá"];
var buttonElementProstateHyperplasia = document.getElementById("ProstateHyperplasiaButton");
var indexProstateHyperplasia = 0;function cycleProstateHyperplasiaText(event) {  indexProstateHyperplasia = cycleText(event, textsProstateHyperplasia, indexProstateHyperplasia, buttonElementProstateHyperplasia);}
function cycleProstateHyperplasiaText(event) {  indexProstateHyperplasia = cycleText(event, textsProstateHyperplasia, indexProstateHyperplasia, buttonElementProstateHyperplasia, updateBackgroundColor);  updateTexts();}

var textsProstateSemVes = ["normální", "malá náplň", "bez náplně"];
var buttonElementProstateSemVes = document.getElementById("ProstateSemVesButton");
var indexProstateSemVes = 0;function cycleProstateSemVesText(event) {  indexProstateSemVes = cycleText(event, textsProstateSemVes, indexProstateSemVes, buttonElementProstateSemVes);}
function cycleProstateSemVesText(event) {  indexProstateSemVes = cycleText(event, textsProstateSemVes, indexProstateSemVes, buttonElementProstateSemVes, updateBackgroundColor);  updateTexts();}

// clickable texts Lesion1

let clickedOrderLesion1 = [];

const clickableTextsLesion1 = document.querySelectorAll('.CTLesion1');
clickableTextsLesion1.forEach(text => {
    text.addEventListener('click', function() {
        this.classList.toggle('active');
        const id = this.id;
        if (this.classList.contains('active')) {
            if (!clickedOrderLesion1.includes(id)) {
                clickedOrderLesion1.push(id);
            }
        } else {
            clickedOrderLesion1 = clickedOrderLesion1.filter(item => item !== id);
        }
        updateTexts();
    });
});

// Lesion1 hiding

document.getElementById('ProstateLesion1No').addEventListener('click', function() {
  var element = document.getElementById('ProstateLesion1');
  element.classList.add('hidden');
  updateTexts();
});

document.getElementById('ChbProstatePSMA').addEventListener('change', function() {
    var element = document.getElementById('ProstateLesion1PSMAButton');
    if (this.checked) {
        element.classList.remove('hidden');
    } else {
        element.classList.add('hidden');
    }
    updateTexts(); 
});



// Lesion1 location

document.getElementById('ProstateLesion1Location').addEventListener('focus', function() {
  document.getElementById('ProstateLesion1selectLocation').classList.remove('hidden');
});
document.addEventListener('click', function(e) {
  const ProstateLesion1LocationElement = document.getElementById('ProstateLesion1Location');
  const ProstateLesion1selectLocationElement = document.getElementById('ProstateLesion1selectLocation');
  if (!ProstateLesion1LocationElement.contains(e.target) && !ProstateLesion1selectLocationElement.contains(e.target)) {
	ProstateLesion1selectLocationElement.classList.add('hidden');
  }
});



// LESION2
var textsProstateLesion2T2 = ["T2 score 1", "T2 score 2", "T2 score 3", "T2 score 4", "T2 score 5"];
var buttonElementProstateLesion2T2 = document.getElementById("ProstateLesion2T2Button");
var indexProstateLesion2T2 = 0;function cycleProstateLesion2T2Text(event) {  indexProstateLesion2T2 = cycleText(event, textsProstateLesion2T2, indexProstateLesion2T2, buttonElementProstateLesion2T2);}
function cycleProstateLesion2T2Text(event) {  indexProstateLesion2T2 = cycleText(event, textsProstateLesion2T2, indexProstateLesion2T2, buttonElementProstateLesion2T2, updateBackgroundColor);  updateTexts();}

var textsProstateLesion2DWI = ["DWI score 1", "DWI score 2", "DWI score 3", "DWI score 4", "DWI score 5"];
var buttonElementProstateLesion2DWI = document.getElementById("ProstateLesion2DWIButton");
var indexProstateLesion2DWI = 0;function cycleProstateLesion2DWIText(event) {  indexProstateLesion2DWI = cycleText(event, textsProstateLesion2DWI, indexProstateLesion2DWI, buttonElementProstateLesion2DWI);}
function cycleProstateLesion2DWIText(event) {  indexProstateLesion2DWI = cycleText(event, textsProstateLesion2DWI, indexProstateLesion2DWI, buttonElementProstateLesion2DWI, updateBackgroundColor);  updateTexts();}

var textsProstateLesion2C = ["kontrast -", "kontrast +"];
var buttonElementProstateLesion2C = document.getElementById("ProstateLesion2CButton");
var indexProstateLesion2C = 0;function cycleProstateLesion2CText(event) {  indexProstateLesion2C = cycleText(event, textsProstateLesion2C, indexProstateLesion2C, buttonElementProstateLesion2C);}
function cycleProstateLesion2CText(event) {  indexProstateLesion2C = cycleText(event, textsProstateLesion2C, indexProstateLesion2C, buttonElementProstateLesion2C, updateBackgroundColor);  updateTexts();}

var textsProstateLesion2Invasion = ["bez invaze", "invaze kapsuly", "přes kapsulu", "semen. váčků", "okolních struktur"];
var buttonElementProstateLesion2Invasion = document.getElementById("ProstateLesion2InvasionButton");
var indexProstateLesion2Invasion = 0;function cycleProstateLesion2InvasionText(event) {  indexProstateLesion2Invasion = cycleText(event, textsProstateLesion2Invasion, indexProstateLesion2Invasion, buttonElementProstateLesion2Invasion);}
function cycleProstateLesion2InvasionText(event) {  indexProstateLesion2Invasion = cycleText(event, textsProstateLesion2Invasion, indexProstateLesion2Invasion, buttonElementProstateLesion2Invasion, updateBackgroundColor);  updateTexts();}

var textsProstateLesion2PSMA = ["PSMA 0", "PSMA 1", "PSMA 2", "PSMA 3"];
var buttonElementProstateLesion2PSMA = document.getElementById("ProstateLesion2PSMAButton");
var indexProstateLesion2PSMA = 0;function cycleProstateLesion2PSMAText(event) {  indexProstateLesion2PSMA = cycleText(event, textsProstateLesion2PSMA, indexProstateLesion2PSMA, buttonElementProstateLesion2PSMA);}
function cycleProstateLesion2PSMAText(event) {  indexProstateLesion2PSMA = cycleText(event, textsProstateLesion2PSMA, indexProstateLesion2PSMA, buttonElementProstateLesion2PSMA, updateBackgroundColor);  updateTexts();}

var textsProstateLesion2PIRADS = ["PI-RADS 1", "PI-RADS 2", "PI-RADS 3", "PI-RADS 4", "PI-RADS 5"];
var buttonElementProstateLesion2PIRADS = document.getElementById("ProstateLesion2PIRADSButton");
var indexProstateLesion2PIRADS = 0;function cycleProstateLesion2PIRADSText(event) {  indexProstateLesion2PIRADS = cycleText(event, textsProstateLesion2PIRADS, indexProstateLesion2PIRADS, buttonElementProstateLesion2PIRADS);}
function cycleProstateLesion2PIRADSText(event) {  indexProstateLesion2PIRADS = cycleText(event, textsProstateLesion2PIRADS, indexProstateLesion2PIRADS, buttonElementProstateLesion2PIRADS, updateBackgroundColor);  updateTexts();}

var textsProstateHyperplasia = ["není", "mírná", "střední", "pokročilá"];
var buttonElementProstateHyperplasia = document.getElementById("ProstateHyperplasiaButton");
var indexProstateHyperplasia = 0;function cycleProstateHyperplasiaText(event) {  indexProstateHyperplasia = cycleText(event, textsProstateHyperplasia, indexProstateHyperplasia, buttonElementProstateHyperplasia);}
function cycleProstateHyperplasiaText(event) {  indexProstateHyperplasia = cycleText(event, textsProstateHyperplasia, indexProstateHyperplasia, buttonElementProstateHyperplasia, updateBackgroundColor);  updateTexts();}

var textsProstateSemVes = ["normální", "malá náplň", "bez náplně"];
var buttonElementProstateSemVes = document.getElementById("ProstateSemVesButton");
var indexProstateSemVes = 0;function cycleProstateSemVesText(event) {  indexProstateSemVes = cycleText(event, textsProstateSemVes, indexProstateSemVes, buttonElementProstateSemVes);}
function cycleProstateSemVesText(event) {  indexProstateSemVes = cycleText(event, textsProstateSemVes, indexProstateSemVes, buttonElementProstateSemVes, updateBackgroundColor);  updateTexts();}

// clickable texts Lesion2

let clickedOrderLesion2 = [];

const clickableTextsLesion2 = document.querySelectorAll('.CTLesion2');
clickableTextsLesion2.forEach(text => {
    text.addEventListener('click', function() {
        this.classList.toggle('active');
        const id = this.id;
        if (this.classList.contains('active')) {
            if (!clickedOrderLesion2.includes(id)) {
                clickedOrderLesion2.push(id);
            }
        } else {
            clickedOrderLesion2 = clickedOrderLesion2.filter(item => item !== id);
        }
        updateTexts();
    });
});

// Lesion2 hiding

document.getElementById('ProstateLesion2No').addEventListener('click', function() {
  var element = document.getElementById('ProstateLesion2');
  element.classList.add('hidden');
  updateTexts();
});

document.getElementById('ChbProstatePSMA').addEventListener('change', function() {
    var element = document.getElementById('ProstateLesion2PSMAButton');
    if (this.checked) {
        element.classList.remove('hidden');
    } else {
        element.classList.add('hidden');
    }
    updateTexts(); 
});

document.getElementById('ProstateLesion2Location').addEventListener('focus', function() {
  document.getElementById('ProstateLesion2selectLocation').classList.remove('hidden');
});
document.addEventListener('click', function(e) {
  const ProstateLesion2LocationElement = document.getElementById('ProstateLesion2Location');
  const ProstateLesion2selectLocationElement = document.getElementById('ProstateLesion2selectLocation');
  if (!ProstateLesion2LocationElement.contains(e.target) && !ProstateLesion2selectLocationElement.contains(e.target)) {
	ProstateLesion2selectLocationElement.classList.add('hidden');
  }
});



// LESION3

var textsProstateLesion3T2 = ["T2 score 1", "T2 score 2", "T2 score 3", "T2 score 4", "T2 score 5"];
var buttonElementProstateLesion3T2 = document.getElementById("ProstateLesion3T2Button");
var indexProstateLesion3T2 = 0;function cycleProstateLesion3T2Text(event) {  indexProstateLesion3T2 = cycleText(event, textsProstateLesion3T2, indexProstateLesion3T2, buttonElementProstateLesion3T2);}
function cycleProstateLesion3T2Text(event) {  indexProstateLesion3T2 = cycleText(event, textsProstateLesion3T2, indexProstateLesion3T2, buttonElementProstateLesion3T2, updateBackgroundColor);  updateTexts();}

var textsProstateLesion3DWI = ["DWI score 1", "DWI score 2", "DWI score 3", "DWI score 4", "DWI score 5"];
var buttonElementProstateLesion3DWI = document.getElementById("ProstateLesion3DWIButton");
var indexProstateLesion3DWI = 0;function cycleProstateLesion3DWIText(event) {  indexProstateLesion3DWI = cycleText(event, textsProstateLesion3DWI, indexProstateLesion3DWI, buttonElementProstateLesion3DWI);}
function cycleProstateLesion3DWIText(event) {  indexProstateLesion3DWI = cycleText(event, textsProstateLesion3DWI, indexProstateLesion3DWI, buttonElementProstateLesion3DWI, updateBackgroundColor);  updateTexts();}

var textsProstateLesion3C = ["kontrast -", "kontrast +"];
var buttonElementProstateLesion3C = document.getElementById("ProstateLesion3CButton");
var indexProstateLesion3C = 0;function cycleProstateLesion3CText(event) {  indexProstateLesion3C = cycleText(event, textsProstateLesion3C, indexProstateLesion3C, buttonElementProstateLesion3C);}
function cycleProstateLesion3CText(event) {  indexProstateLesion3C = cycleText(event, textsProstateLesion3C, indexProstateLesion3C, buttonElementProstateLesion3C, updateBackgroundColor);  updateTexts();}

var textsProstateLesion3Invasion = ["bez invaze", "invaze kapsuly", "přes kapsulu", "semen. váčků", "okolních struktur"];
var buttonElementProstateLesion3Invasion = document.getElementById("ProstateLesion3InvasionButton");
var indexProstateLesion3Invasion = 0;function cycleProstateLesion3InvasionText(event) {  indexProstateLesion3Invasion = cycleText(event, textsProstateLesion3Invasion, indexProstateLesion3Invasion, buttonElementProstateLesion3Invasion);}
function cycleProstateLesion3InvasionText(event) {  indexProstateLesion3Invasion = cycleText(event, textsProstateLesion3Invasion, indexProstateLesion3Invasion, buttonElementProstateLesion3Invasion, updateBackgroundColor);  updateTexts();}

var textsProstateLesion3PSMA = ["PSMA 0", "PSMA 1", "PSMA 2", "PSMA 3"];
var buttonElementProstateLesion3PSMA = document.getElementById("ProstateLesion3PSMAButton");
var indexProstateLesion3PSMA = 0;function cycleProstateLesion3PSMAText(event) {  indexProstateLesion3PSMA = cycleText(event, textsProstateLesion3PSMA, indexProstateLesion3PSMA, buttonElementProstateLesion3PSMA);}
function cycleProstateLesion3PSMAText(event) {  indexProstateLesion3PSMA = cycleText(event, textsProstateLesion3PSMA, indexProstateLesion3PSMA, buttonElementProstateLesion3PSMA, updateBackgroundColor);  updateTexts();}


var textsProstateLesion3PIRADS = ["PI-RADS 1", "PI-RADS 2", "PI-RADS 3", "PI-RADS 4", "PI-RADS 5"];
var buttonElementProstateLesion3PIRADS = document.getElementById("ProstateLesion3PIRADSButton");
var indexProstateLesion3PIRADS = 0;function cycleProstateLesion3PIRADSText(event) {  indexProstateLesion3PIRADS = cycleText(event, textsProstateLesion3PIRADS, indexProstateLesion3PIRADS, buttonElementProstateLesion3PIRADS);}
function cycleProstateLesion3PIRADSText(event) {  indexProstateLesion3PIRADS = cycleText(event, textsProstateLesion3PIRADS, indexProstateLesion3PIRADS, buttonElementProstateLesion3PIRADS, updateBackgroundColor);  updateTexts();}

var textsProstateHyperplasia = ["není", "mírná", "střední", "pokročilá"];
var buttonElementProstateHyperplasia = document.getElementById("ProstateHyperplasiaButton");
var indexProstateHyperplasia = 0;function cycleProstateHyperplasiaText(event) {  indexProstateHyperplasia = cycleText(event, textsProstateHyperplasia, indexProstateHyperplasia, buttonElementProstateHyperplasia);}
function cycleProstateHyperplasiaText(event) {  indexProstateHyperplasia = cycleText(event, textsProstateHyperplasia, indexProstateHyperplasia, buttonElementProstateHyperplasia, updateBackgroundColor);  updateTexts();}

var textsProstateSemVes = ["normální", "malá náplň", "bez náplně"];
var buttonElementProstateSemVes = document.getElementById("ProstateSemVesButton");
var indexProstateSemVes = 0;function cycleProstateSemVesText(event) {  indexProstateSemVes = cycleText(event, textsProstateSemVes, indexProstateSemVes, buttonElementProstateSemVes);}
function cycleProstateSemVesText(event) {  indexProstateSemVes = cycleText(event, textsProstateSemVes, indexProstateSemVes, buttonElementProstateSemVes, updateBackgroundColor);  updateTexts();}

// clickable texts Lesion3

let clickedOrderLesion3 = [];

const clickableTextsLesion3 = document.querySelectorAll('.CTLesion3');
clickableTextsLesion3.forEach(text => {
    text.addEventListener('click', function() {
        this.classList.toggle('active');
        const id = this.id;
        if (this.classList.contains('active')) {
            if (!clickedOrderLesion3.includes(id)) {
                clickedOrderLesion3.push(id);
            }
        } else {
            clickedOrderLesion3 = clickedOrderLesion3.filter(item => item !== id);
        }
        updateTexts();
    });
});

// Lesions3 hiding

document.getElementById('ProstateLesion3No').addEventListener('click', function() {
  var element = document.getElementById('ProstateLesion3');
  element.classList.add('hidden');
  updateTexts();
});

document.getElementById('ChbProstatePSMA').addEventListener('change', function() {
    var element = document.getElementById('ProstateLesion3PSMAButton');
    if (this.checked) {
        element.classList.remove('hidden');
    } else {
        element.classList.add('hidden');
    }
    updateTexts(); 
});

document.getElementById('ProstateLesion3Location').addEventListener('focus', function() {
  document.getElementById('ProstateLesion3selectLocation').classList.remove('hidden');
});
document.addEventListener('click', function(e) {
  const ProstateLesion3LocationElement = document.getElementById('ProstateLesion3Location');
  const ProstateLesion3selectLocationElement = document.getElementById('ProstateLesion3selectLocation');
  if (!ProstateLesion3LocationElement.contains(e.target) && !ProstateLesion3selectLocationElement.contains(e.target)) {
	ProstateLesion3selectLocationElement.classList.add('hidden');
  }
});


// NON Lesion

// LN
var textsProstateLNReg = ["nesuspektní", "suspektní"];
var buttonElementProstateLNReg = document.getElementById("ProstateLNRegButton");
var indexProstateLNReg = 0;function cycleProstateLNRegText(event) {  indexProstateLNReg = cycleText(event, textsProstateLNReg, indexProstateLNReg, buttonElementProstateLNReg);}
function cycleProstateLNRegText(event) {  indexProstateLNReg = cycleText(event, textsProstateLNReg, indexProstateLNReg, buttonElementProstateLNReg, updateBackgroundColor);  
// reg LN show hide - alternative...must be within function cycleProstateLNRegText
let ProstateLNRegValue = buttonElementProstateLNReg.innerText.trim(); 
    let ProstateLNRegLocationElement = document.getElementById('ProstateLNRegLocation');

    if (ProstateLNRegValue === "suspektní") {
        ProstateLNRegLocationElement.classList.remove('hidden');
    } else if (ProstateLNRegValue === "nesuspektní") {
        ProstateLNRegLocationElement.classList.add('hidden');
    }
updateTexts();}

var textsProstateLNNonReg = ["nesuspektní", "suspektní"];
var buttonElementProstateLNNonReg = document.getElementById("ProstateLNNonRegButton");
var indexProstateLNNonReg = 0;function cycleProstateLNNonRegText(event) {  indexProstateLNNonReg = cycleText(event, textsProstateLNNonReg, indexProstateLNNonReg, buttonElementProstateLNNonReg);}
function cycleProstateLNNonRegText(event) {  indexProstateLNNonReg = cycleText(event, textsProstateLNNonReg, indexProstateLNNonReg, buttonElementProstateLNNonReg, updateBackgroundColor);  
// reg LN show hide - alternative...must be within function cycleProstateLNNonRegText
let ProstateLNNonRegValue = buttonElementProstateLNNonReg.innerText.trim(); 
    let ProstateLNNonRegLocationElement = document.getElementById('ProstateLNNonRegLocation');

    if (ProstateLNNonRegValue === "suspektní") {
        ProstateLNNonRegLocationElement.classList.remove('hidden');
    } else if (ProstateLNNonRegValue === "nesuspektní") {
        ProstateLNNonRegLocationElement.classList.add('hidden');
    }
updateTexts();}


// Lymph node location

document.getElementById('ProstateLNRegLocation').addEventListener('focus', function() {
  document.getElementById('ProstateLNRegSelectLocation').classList.remove('hidden');
});
document.addEventListener('click', function(e) {
  const ProstateLNRegLocationElement = document.getElementById('ProstateLNRegLocation');
  const ProstateLNRegSelectLocationElement = document.getElementById('ProstateLNRegSelectLocation');
  if (!ProstateLNRegLocationElement.contains(e.target) && !ProstateLNRegSelectLocationElement.contains(e.target)) {
	ProstateLNRegSelectLocationElement.classList.add('hidden');
  }
});

document.getElementById('ProstateLNNonRegLocation').addEventListener('focus', function() {
  document.getElementById('ProstateLNNonRegSelectLocation').classList.remove('hidden');
});
document.addEventListener('click', function(e) {
  const ProstateLNNonRegLocationElement = document.getElementById('ProstateLNNonRegLocation');
  const ProstateLNNonRegSelectLocationElement = document.getElementById('ProstateLNNonRegSelectLocation');
  if (!ProstateLNNonRegLocationElement.contains(e.target) && !ProstateLNNonRegSelectLocationElement.contains(e.target)) {
	ProstateLNNonRegSelectLocationElement.classList.add('hidden');
  }
});


// BUTTONS texts


function updateBackgroundColor(index, buttonElement, color1 = "transparent", color2 = "#D4A29C") {
  buttonElement.style.backgroundColor = index === 0 ? color1 : color2;
}

// new LESIONS

document.getElementById('ProstateNewLesions').addEventListener('click', function() {
  var lesionIds = ['ProstateLesion1', 'ProstateLesion2', 'ProstateLesion3'];

  for (var i = 0; i < lesionIds.length; i++) {
    var element = document.getElementById(lesionIds[i]);
    if (element.classList.contains('hidden')) {
      element.classList.remove('hidden');
      break; 
    }
  }
  updateProstateButtonColor();
});

document.getElementById('ProstateNewLesions').addEventListener('contextmenu', function(event) {
  event.preventDefault();
  var lesionIds = ['ProstateLesion3', 'ProstateLesion2', 'ProstateLesion1'];

  for (var i = 0; i < lesionIds.length; i++) {
    var element = document.getElementById(lesionIds[i]);
    if (!element.classList.contains('hidden')) {
      element.classList.add('hidden');
      break; 
    }
  }
  updateProstateButtonColor();
});

function updateProstateButtonColor() {
    var Prostatelesions = ['ProstateLesion1', 'ProstateLesion2', 'ProstateLesion3'];
    var Prostatebutton = document.getElementById('ProstateNewLesions');
    var isHidden = Prostatelesions.every(function(id) {
        return document.getElementById(id).classList.contains('hidden');
    });

    if (isHidden) {
        Prostatebutton.classList.remove('toggleColorRed');
    } else {
        Prostatebutton.classList.add('toggleColorRed');
    }
}



// TEXTS


function updateTexts() {

var indikace = document.getElementById("indikace").value;

// LESION1

// Prostate segments

let prostateSegmentLesion1 = "";

const segmentsLesion1 = [];
const positionsLesion1 = []; 
const sidesLesion1 = [];

clickedOrderLesion1.forEach(id => {
    const text = document.querySelector('#' + id);

    const idPartsLesion1 = id.split('-'); 

    let segmentNameLesion1 = idPartsLesion1[0];
    if (!segmentsLesion1.includes(segmentNameLesion1)) {
        segmentsLesion1.push(segmentNameLesion1);
    }
    
    let sideLesion1 = idPartsLesion1[1] === "L" ? "vlevo" : "vpravo";
    if (!sidesLesion1.includes(sideLesion1)) {
        sidesLesion1.push(sideLesion1);
    }

    let positionLesion1 = ""; 
    switch (idPartsLesion1[2]) {
        case "B":
            positionLesion1 = "baze prostaty"; 
            break;
        case "M":
            positionLesion1 = "střední etáže prostaty"; 
            break;
        case "A":
            positionLesion1 = "apexu prostaty"; 
            break;
    }
    if (!positionsLesion1.includes(positionLesion1)) {
        positionsLesion1.push(positionLesion1);
    }
});

if (positionsLesion1.includes("baze prostaty") && positionsLesion1.includes("střední etáže prostaty")) {
    positionsLesion1[positionsLesion1.indexOf("baze prostaty")] = "baze";
}
if (positionsLesion1.includes("střední etáže prostaty") && positionsLesion1.includes("apexu prostaty")) {
    positionsLesion1[positionsLesion1.indexOf("střední etáže prostaty")] = "střední etáže";
}
if (positionsLesion1.length === 3) {
    positionsLesion1.length = 0;  // clear the array
    positionsLesion1.push("všech etáží prostaty");
}

let segmentStrLesion1 = segmentsLesion1.length > 1 
    ? " v segmentech " + segmentsLesion1.slice(0, -1).join(", ") + " a " + segmentsLesion1.slice(-1)
    : segmentsLesion1.length > 0 ? " v segmentu " + segmentsLesion1[0] : "";

let positionStrLesion1 = positionsLesion1.length > 1 
    ? " na rozhraní " + positionsLesion1.slice(0, -1).join(", ") + " a " + positionsLesion1.slice(-1)
    : positionsLesion1.length > 0 ? " v úrovni " + positionsLesion1[0] : "";

let sideStrLesion1 = sidesLesion1.length > 1
    ? "na rozhraní obou laloků"
    : sidesLesion1.length > 0 ? sidesLesion1[0] : "";

if (sideStrLesion1 || positionStrLesion1 || segmentStrLesion1) {
    prostateSegmentLesion1 = sideStrLesion1 + positionStrLesion1 + segmentStrLesion1;
} else {
    prostateSegmentLesion1 = "";
}

document.getElementById('ProstateLesion1Location').value = segmentsLesion1.join(', ');



// T2
const ProstateLesion1T2Text = buttonElementProstateLesion1T2.innerText;

if (ProstateLesion1T2Text === "T2 score 1") {
 ProstateLesion1T2P = "bez snížení SI na T2, "; 
 ProstateLesion1T2R = ""; 
} else if (ProstateLesion1T2Text === "T2 score 2") {
 ProstateLesion1T2P = "dobře ohraničené homogenně nízké SI na T2, ";
 ProstateLesion1T2R = "";
} else if (ProstateLesion1T2Text === "T2 score 3") {
 ProstateLesion1T2P = "hůře ohraničené nehomogenně nízké SI na T2, ";
 ProstateLesion1T2R = "";
} else if (ProstateLesion1T2Text === "T2 score 4") {
 ProstateLesion1T2P = "neohraničené nehomogenně nízké SI na T2, ";
 ProstateLesion1T2R = "";
} else if (ProstateLesion1T2Text === "T2 score 5") {
 ProstateLesion1T2P = "neohraničené nehomogenně nízké SI na T2, ";
 ProstateLesion1T2R = "";
}

// DWI
var ProstateLesion1DWIText = buttonElementProstateLesion1DWI.innerText;

if (ProstateLesion1DWIText === "DWI score 1") {
    ProstateLesion1DWIP = "bez vyšší SI na DWI a bez snížení SI na ADC, "; 
    ProstateLesion1DWIR = ""; 
} else if (ProstateLesion1DWIText === "DWI score 2") {
    ProstateLesion1DWIP = "pruh/klín lehce vyšší na DWI / nižší na ADC, "; 
    ProstateLesion1DWIR = ""; 
} else if (ProstateLesion1DWIText === "DWI score 3") {
    ProstateLesion1DWIP = "vyšší SI na DWI nebo nižší SI na ADC, ";
    ProstateLesion1DWIR = "";
} else if (ProstateLesion1DWIText === "DWI score 4") {
    ProstateLesion1DWIP = "vysoké SI na DWI a současně nízké SI na ADC, ";
    ProstateLesion1DWIR = "";
} else if (ProstateLesion1DWIText === "DWI score 5") {
    ProstateLesion1DWIP = "vysoké SI na DWI a současně nízké SI na ADC, ";
    ProstateLesion1DWIR = "";
}

// C+
var ProstateLesion1CText = buttonElementProstateLesion1C.innerText;

if (ProstateLesion1CText === "kontrast -") {
    ProstateLesion1CP = ""; 
    ProstateLesion1CR = ""; 
} else if (ProstateLesion1CText === "kontrast +") {
    ProstateLesion1CP = "s časným postkontrastním sycením, "; 
    ProstateLesion1CR = ""; 
}

// PSMA
var ProstateLesion1PSMAText = buttonElementProstateLesion1PSMA.innerText;

if (document.getElementById('ChbProstatePSMA').checked) {
        if (ProstateLesion1PSMAText === "PSMA 0") {
            ProstateLesion1PSMAP = "s akumulací RF pod úrovní krevního poolu (score 0), "; 
            ProstateLesion1PSMAR = ", bez zvýšené PSMA exprese"; 
        } else if (ProstateLesion1PSMAText === "PSMA 1") {
            ProstateLesion1PSMAP = "s akumulací RF nad úrovní krevního poolu, ale nižší než játra (score 1), "; 
            ProstateLesion1PSMAR = ", s mírně zvýšenou PSMA expresí"; 
        } else if (ProstateLesion1PSMAText === "PSMA 2") {
            ProstateLesion1PSMAP = "s akumulací RF nad úrovní jater, ale nižší než parotid (score 2), ";
            ProstateLesion1PSMAR = ", se středně vysokou PSMA expresí";
        } else if (ProstateLesion1PSMAText === "PSMA 3") {
            ProstateLesion1PSMAP = "s akumulací RF nad úrovní parotid (score 3), ";
            ProstateLesion1PSMAR = ", s vysokou PSMA expresí";
        } 
    } else {
        ProstateLesion1PSMAP = "";
        ProstateLesion1PSMAR = "";
    }

// size
var ProstateLesion1SizeValue = document.getElementById("ProstateLesion1Size").value;
document.getElementById("ProstateLesion1Size").addEventListener('input', updateTexts);
var ProstateLesion1SizeP = "";

if (ProstateLesion1SizeValue === "") {
    ProstateLesion1SizeP = "";
} else if (ProstateLesion1SizeValue !== "") {
    ProstateLesion1SizeP = "diametru cca " + ProstateLesion1SizeValue + " mm,";
}

// invaze
var ProstateLesion1InvasionText = buttonElementProstateLesion1Invasion.innerText;

if (ProstateLesion1InvasionText === "bez invaze") {
    ProstateLesion1InvasionP = ""; 
    ProstateLesion1InvasionR = "";  
} else if (ProstateLesion1InvasionText === "přes kapsulu") {
    ProstateLesion1InvasionP = "s invazí přes kapsulu, "; 
    ProstateLesion1InvasionR = ", s invazí přes kapsulu"; 
} else if (ProstateLesion1InvasionText === "semen. váčků") {
    ProstateLesion1InvasionP = "s infiltrací semenných váčků, "; 
    ProstateLesion1InvasionR = ", s infiltrací semenných váčků"; 
} else if (ProstateLesion1InvasionText === "okolních struktur") {
    ProstateLesion1InvasionP = "s infiltrací okolních struktur, "; 
    ProstateLesion1InvasionR = ", s infiltrací okolních struktur"; 
}


// === PI-RADS v2.1 helper ===
function getZoneFromSegment(seg) {
  if (!seg) return "unknown";
  if (seg.includes("PZa") || seg.includes("PZpl") || seg.includes("PZpm") || seg.includes("PZ")) return "PZ";
  if (seg.includes("TZa") || seg.includes("TZp")) return "TZ";
  if (seg.includes("CZ") || seg.includes("AFS")) return "CZAFS";
  return "unknown";
}

function computePiradsV21({ zone, t2, dwi, dcePos, sizeMm, hasECE }) {
  const big = (typeof sizeMm === "number" && sizeMm >= 15) || !!hasECE;

  if (zone === "PZ") {
    if (dwi <= 1) return 1;
    if (dwi === 2) return 2;
    if (dwi === 3) return dcePos ? 4 : 3;                // DCE jen jako tie-breaker
    if (dwi === 4) return big ? 5 : 4;                   // ≥15 mm nebo ECE -> 5
    if (dwi >= 5) return 5;                              // DWI 5 vždy 5
  }

  if (zone === "TZ") {
    if (t2 <= 1) return 1;
    if (t2 === 2) return (dwi >= 4) ? 3 : 2;
    if (t2 === 3) return (dwi === 5) ? 4 : 3;
    if (t2 === 4) return big ? 5 : 4;                    // ≥15 mm nebo ECE -> 5
    if (t2 >= 5) return 5;
  }

  // CZ/AFS: vezmi vyšší z T2 a DWI; pokud je 4 a splněn big, povyš na 5
  let base = Math.max(t2 || 0, dwi || 0);
  if (base === 4 && big) return 5;
  return Math.min(Math.max(base, 1), 5);
}

// === PIRADS auto  ===
{
  const firstSegmentLesion1 = segmentsLesion1[0];
  const zone1 = getZoneFromSegment(firstSegmentLesion1);

  const t2_1  = parseInt(buttonElementProstateLesion1T2.innerText.replace("T2 score ","")) || 0;
  const dwi_1 = parseInt(buttonElementProstateLesion1DWI.innerText.replace("DWI score ","")) || 0;
  const dce_1 = (buttonElementProstateLesion1C.innerText.trim() === "kontrast +");

  const sizeRaw1 = document.getElementById("ProstateLesion1Size").value;
  const sizeMm1 = sizeRaw1 === "" ? undefined : parseFloat(sizeRaw1);

  const inv1 = buttonElementProstateLesion1Invasion.innerText.trim();
  const hasECE1 = (inv1 !== "bez invaze"); // zahrnuje "přes kapsulu", SV, okolní struktury

  const pi1 = computePiradsV21({
    zone: zone1, t2: t2_1, dwi: dwi_1, dcePos: dce_1, sizeMm: sizeMm1, hasECE: hasECE1
  });

  buttonElementProstateLesion1PIRADS.innerText = `PI-RADS ${pi1}`;
}



//PIRADS manual
var ProstateLesion1PIRADSText = buttonElementProstateLesion1PIRADS.innerText;

if (prostateSegmentLesion1 === "") {
    ProstateLesion1PIRADSText = "";
} else {
    ProstateLesion1PIRADSText += "";
}

// Lesion Finals
const prostateTableLesion1 = document.querySelector('#ProstateLesion1');
var ProstateLesion1P = ""; var ProstateLesion1R = "";
if (!prostateTableLesion1.classList.contains('hidden') && prostateSegmentLesion1 !== "") {
    const isPeripheral = segmentsLesion1.length > 0 && segmentsLesion1[0].charAt(0) === 'P';
	ProstateLesion1P = "Ložisko " + " " + prostateSegmentLesion1 + " " + ProstateLesion1SizeP + " " + (isPeripheral ? "" : ProstateLesion1T2P) + " " + ProstateLesion1DWIP + " " + ProstateLesion1CP + " " + ProstateLesion1InvasionP + " " + ProstateLesion1PSMAP + ".";
    ProstateLesion1R = "Ložisko " + ProstateLesion1PIRADSText + " - " + prostateSegmentLesion1 + " " + ProstateLesion1InvasionR + " " + ProstateLesion1PSMAR + ".";}

//LESION2

// Prostate segments

let prostateSegmentLesion2 = "";

const segmentsLesion2 = [];
const positionsLesion2 = []; 
const sidesLesion2 = [];

clickedOrderLesion2.forEach(id => {
    const text = document.querySelector('#' + id);

    const idPartsLesion2 = id.split('-'); 

    let segmentNameLesion2 = idPartsLesion2[0];
    if (!segmentsLesion2.includes(segmentNameLesion2)) {
        segmentsLesion2.push(segmentNameLesion2);
    }
    
    let sideLesion2 = idPartsLesion2[1] === "L" ? "vlevo" : "vpravo";
    if (!sidesLesion2.includes(sideLesion2)) {
        sidesLesion2.push(sideLesion2);
    }

    let positionLesion2 = ""; 
    switch (idPartsLesion2[2]) {
        case "B":
            positionLesion2 = "baze prostaty"; 
            break;
        case "M":
            positionLesion2 = "střední etáže prostaty"; 
            break;
        case "A":
            positionLesion2 = "apexu prostaty"; 
            break;
    }
    if (!positionsLesion2.includes(positionLesion2)) {
        positionsLesion2.push(positionLesion2);
    }
});

if (positionsLesion2.includes("baze prostaty") && positionsLesion2.includes("střední etáže prostaty")) {
    positionsLesion2[positionsLesion2.indexOf("baze prostaty")] = "baze";
}
if (positionsLesion2.includes("střední etáže prostaty") && positionsLesion2.includes("apexu prostaty")) {
    positionsLesion2[positionsLesion2.indexOf("střední etáže prostaty")] = "střední etáže";
}
if (positionsLesion2.length === 3) {
    positionsLesion2.length = 0;  // clear the array
    positionsLesion2.push("všech etáží prostaty");
}

let segmentStrLesion2 = segmentsLesion2.length > 1 
    ? " v segmentech " + segmentsLesion2.slice(0, -1).join(", ") + " a " + segmentsLesion2.slice(-1)
    : segmentsLesion2.length > 0 ? " v segmentu " + segmentsLesion2[0] : "";

let positionStrLesion2 = positionsLesion2.length > 1 
    ? " na rozhraní " + positionsLesion2.slice(0, -1).join(", ") + " a " + positionsLesion2.slice(-1)
    : positionsLesion2.length > 0 ? " v úrovni " + positionsLesion2[0] : "";

let sideStrLesion2 = sidesLesion2.length > 1
    ? "na rozhraní obou laloků"
    : sidesLesion2.length > 0 ? sidesLesion2[0] : "";

if (sideStrLesion2 || positionStrLesion2 || segmentStrLesion2) {
    prostateSegmentLesion2 = sideStrLesion2 + positionStrLesion2 + segmentStrLesion2;
} else {
    prostateSegmentLesion2 = "";
}

document.getElementById('ProstateLesion2Location').value = segmentsLesion2.join(', ');

// Number

let buttonIDLesion2 = document.getElementById('ProstateLesion2No').id;
let matchLesion2 = buttonIDLesion2.match(/(\d)[^\d]{2}$/);
if (matchLesion2) {
	var ProstateLesion2Number = "Ložisko č. " + matchLesion2[1] + ": ";  
}


// T2
const ProstateLesion2T2Text = buttonElementProstateLesion2T2.innerText;

if (ProstateLesion2T2Text === "T2 score 1") {
 ProstateLesion2T2P = "bez snížení SI na T2, "; 
 ProstateLesion2T2R = ""; 
} else if (ProstateLesion2T2Text === "T2 score 2") {
 ProstateLesion2T2P = "dobře ohraničené homogenně nízké SI na T2, ";
 ProstateLesion2T2R = "";
} else if (ProstateLesion2T2Text === "T2 score 3") {
 ProstateLesion2T2P = "hůře ohraničené nehomogenně nízké SI na T2, ";
 ProstateLesion2T2R = "";
} else if (ProstateLesion2T2Text === "T2 score 4") {
 ProstateLesion2T2P = "neohraničené nehomogenně nízké SI na T2, ";
 ProstateLesion2T2R = "";
} else if (ProstateLesion2T2Text === "T2 score 5") {
 ProstateLesion2T2P = "neohraničené nehomogenně nízké SI na T2, ";
 ProstateLesion2T2R = "";
}

// DWI
var ProstateLesion2DWIText = buttonElementProstateLesion2DWI.innerText;

if (ProstateLesion2DWIText === "DWI score 1") {
    ProstateLesion2DWIP = "bez vyšší SI na DWI a bez snížení SI na ADC, "; 
    ProstateLesion2DWIR = ""; 
} else if (ProstateLesion2DWIText === "DWI score 2") {
    ProstateLesion2DWIP = "pruh/klín lehce vyšší na DWI / nižší na ADC, "; 
    ProstateLesion2DWIR = ""; 
} else if (ProstateLesion2DWIText === "DWI score 3") {
    ProstateLesion2DWIP = "vyšší SI na DWI nebo nižší SI na ADC, ";
    ProstateLesion2DWIR = "";
} else if (ProstateLesion2DWIText === "DWI score 4") {
    ProstateLesion2DWIP = "vysoké SI na DWI a současně nízké SI na ADC, ";
    ProstateLesion2DWIR = "";
} else if (ProstateLesion2DWIText === "DWI score 5") {
    ProstateLesion2DWIP = "vysoké SI na DWI a současně nízké SI na ADC, ";
    ProstateLesion2DWIR = "";
}

// C+
var ProstateLesion2CText = buttonElementProstateLesion2C.innerText;

if (ProstateLesion2CText === "kontrast -") {
    ProstateLesion2CP = ""; 
    ProstateLesion2CR = ""; 
} else if (ProstateLesion2CText === "kontrast +") {
    ProstateLesion2CP = "s časným postkontrastním sycením, "; 
    ProstateLesion2CR = ""; 
}

// PSMA
var ProstateLesion2PSMAText = buttonElementProstateLesion2PSMA.innerText;

if (document.getElementById('ChbProstatePSMA').checked) {
        if (ProstateLesion2PSMAText === "PSMA 0") {
            ProstateLesion2PSMAP = "s akumulací RF pod úrovní krevního poolu (score 0), "; 
            ProstateLesion2PSMAR = ", bez zvýšené PSMA exprese"; 
        } else if (ProstateLesion2PSMAText === "PSMA 1") {
            ProstateLesion2PSMAP = "s akumulací RF nad úrovní krevního poolu, ale nižší než játra (score 1), "; 
            ProstateLesion2PSMAR = ", s mírně zvýšenou PSMA expresí"; 
        } else if (ProstateLesion2PSMAText === "PSMA 2") {
            ProstateLesion2PSMAP = "s akumulací RF nad úrovní jater, ale nižší než parotid (score 2), ";
            ProstateLesion2PSMAR = ", se středně vysokou PSMA expresí";
        } else if (ProstateLesion2PSMAText === "PSMA 3") {
            ProstateLesion2PSMAP = "s akumulací RF nad úrovní parotid (score 3), ";
            ProstateLesion2PSMAR = ", s vysokou PSMA expresí";
        } 
    } else {
        ProstateLesion2PSMAP = "";
        ProstateLesion2PSMAR = "";
    }

// size
var ProstateLesion2SizeValue = document.getElementById("ProstateLesion2Size").value;
document.getElementById("ProstateLesion2Size").addEventListener('input', updateTexts);
var ProstateLesion2SizeP = "";

if (ProstateLesion2SizeValue === "") {
    ProstateLesion2SizeP = "";
} else if (ProstateLesion2SizeValue !== "") {
    ProstateLesion2SizeP = "diametru cca " + ProstateLesion2SizeValue + " mm,";
}

// invaze
var ProstateLesion2InvasionText = buttonElementProstateLesion2Invasion.innerText;

if (ProstateLesion2InvasionText === "bez invaze") {
    ProstateLesion2InvasionP = ""; 
    ProstateLesion2InvasionR = "";  
} else if (ProstateLesion2InvasionText === "přes kapsulu") {
    ProstateLesion2InvasionP = "s invazí přes kapsulu, "; 
    ProstateLesion2InvasionR = ", s invazí přes kapsulu"; 
} else if (ProstateLesion2InvasionText === "semen. váčků") {
    ProstateLesion2InvasionP = "s infiltrací semenných váčků, "; 
    ProstateLesion2InvasionR = ", s infiltrací semenných váčků"; 
} else if (ProstateLesion2InvasionText === "okolních struktur") {
    ProstateLesion2InvasionP = "s infiltrací okolních struktur, "; 
    ProstateLesion2InvasionR = ", s infiltrací okolních struktur"; 
}


// === PI-RADS v2.1 helper ===
function getZoneFromSegment(seg) {
  if (!seg) return "unknown";
  if (seg.includes("PZa") || seg.includes("PZpl") || seg.includes("PZpm") || seg.includes("PZ")) return "PZ";
  if (seg.includes("TZa") || seg.includes("TZp")) return "TZ";
  if (seg.includes("CZ") || seg.includes("AFS")) return "CZAFS";
  return "unknown";
}

function computePiradsV21({ zone, t2, dwi, dcePos, sizeMm, hasECE }) {
  const big = (typeof sizeMm === "number" && sizeMm >= 15) || !!hasECE;

  if (zone === "PZ") {
    if (dwi <= 1) return 1;
    if (dwi === 2) return 2;
    if (dwi === 3) return dcePos ? 4 : 3;                // DCE jen jako tie-breaker
    if (dwi === 4) return big ? 5 : 4;                   // ≥15 mm nebo ECE -> 5
    if (dwi >= 5) return 5;                              // DWI 5 vždy 5
  }

  if (zone === "TZ") {
    if (t2 <= 1) return 1;
    if (t2 === 2) return (dwi >= 4) ? 3 : 2;
    if (t2 === 3) return (dwi === 5) ? 4 : 3;
    if (t2 === 4) return big ? 5 : 4;                    // ≥15 mm nebo ECE -> 5
    if (t2 >= 5) return 5;
  }

  // CZ/AFS: vezmi vyšší z T2 a DWI; pokud je 4 a splněn big, povyš na 5
  let base = Math.max(t2 || 0, dwi || 0);
  if (base === 4 && big) return 5;
  return Math.min(Math.max(base, 1), 5);
}

// === PIRADS auto  ===
{
  const firstSegmentLesion2 = segmentsLesion2[0];
  const zone1 = getZoneFromSegment(firstSegmentLesion2);

  const t2_1  = parseInt(buttonElementProstateLesion2T2.innerText.replace("T2 score ","")) || 0;
  const dwi_1 = parseInt(buttonElementProstateLesion2DWI.innerText.replace("DWI score ","")) || 0;
  const dce_1 = (buttonElementProstateLesion2C.innerText.trim() === "kontrast +");

  const sizeRaw1 = document.getElementById("ProstateLesion2Size").value;
  const sizeMm1 = sizeRaw1 === "" ? undefined : parseFloat(sizeRaw1);

  const inv1 = buttonElementProstateLesion2Invasion.innerText.trim();
  const hasECE1 = (inv1 !== "bez invaze"); // zahrnuje "přes kapsulu", SV, okolní struktury

  const pi1 = computePiradsV21({
    zone: zone1, t2: t2_1, dwi: dwi_1, dcePos: dce_1, sizeMm: sizeMm1, hasECE: hasECE1
  });

  buttonElementProstateLesion2PIRADS.innerText = `PI-RADS ${pi1}`;
}




//PIRADS manual
var ProstateLesion2PIRADSText = buttonElementProstateLesion2PIRADS.innerText;

if (prostateSegmentLesion2 === "") {
    ProstateLesion2PIRADSText = "";
} else {
    ProstateLesion2PIRADSText += "";
}

// Lesion2 Finals
const prostateTableLesion2 = document.querySelector('#ProstateLesion2');
var ProstateLesion2P = ""; var ProstateLesion2R = "";
if (!prostateTableLesion2.classList.contains('hidden') && prostateSegmentLesion2 !== "") {
    const isPeripheral = segmentsLesion2.length > 0 && segmentsLesion2[0].charAt(0) === 'P';
    ProstateLesion2P = "Ložisko " + " " + prostateSegmentLesion2 + " " + ProstateLesion2SizeP + " " + (isPeripheral ? "" : ProstateLesion2T2P) + " " + ProstateLesion2DWIP + " " + ProstateLesion2CP + " " + ProstateLesion2InvasionP + " " + ProstateLesion2PSMAP + ".";
    ProstateLesion2R = "Ložisko " + ProstateLesion2PIRADSText + " - " + prostateSegmentLesion2 + " " + ProstateLesion2InvasionR + " " + ProstateLesion2PSMAR + ".";
}


//LESION3

// Prostate segments

let prostateSegmentLesion3 = "";

const segmentsLesion3 = [];
const positionsLesion3 = []; 
const sidesLesion3 = [];

clickedOrderLesion3.forEach(id => {
    const text = document.querySelector('#' + id);

    const idPartsLesion3 = id.split('-'); 

    let segmentNameLesion3 = idPartsLesion3[0];
    if (!segmentsLesion3.includes(segmentNameLesion3)) {
        segmentsLesion3.push(segmentNameLesion3);
    }
    
    let sideLesion3 = idPartsLesion3[1] === "L" ? "vlevo" : "vpravo";
    if (!sidesLesion3.includes(sideLesion3)) {
        sidesLesion3.push(sideLesion3);
    }

    let positionLesion3 = ""; 
    switch (idPartsLesion3[2]) {
        case "B":
            positionLesion3 = "baze prostaty"; 
            break;
        case "M":
            positionLesion3 = "střední etáže prostaty"; 
            break;
        case "A":
            positionLesion3 = "apexu prostaty"; 
            break;
    }
    if (!positionsLesion3.includes(positionLesion3)) {
        positionsLesion3.push(positionLesion3);
    }
});

if (positionsLesion3.includes("baze prostaty") && positionsLesion3.includes("střední etáže prostaty")) {
    positionsLesion3[positionsLesion3.indexOf("baze prostaty")] = "baze";
}
if (positionsLesion3.includes("střední etáže prostaty") && positionsLesion3.includes("apexu prostaty")) {
    positionsLesion3[positionsLesion3.indexOf("střední etáže prostaty")] = "střední etáže";
}
if (positionsLesion3.length === 3) {
    positionsLesion3.length = 0;  // clear the array
    positionsLesion3.push("všech etáží prostaty");
}

let segmentStrLesion3 = segmentsLesion3.length > 1 
    ? " v segmentech " + segmentsLesion3.slice(0, -1).join(", ") + " a " + segmentsLesion3.slice(-1)
    : segmentsLesion3.length > 0 ? " v segmentu " + segmentsLesion3[0] : "";

let positionStrLesion3 = positionsLesion3.length > 1 
    ? " na rozhraní " + positionsLesion3.slice(0, -1).join(", ") + " a " + positionsLesion3.slice(-1)
    : positionsLesion3.length > 0 ? " v úrovni " + positionsLesion3[0] : "";

let sideStrLesion3 = sidesLesion3.length > 1
    ? "na rozhraní obou laloků"
    : sidesLesion3.length > 0 ? sidesLesion3[0] : "";

if (sideStrLesion3 || positionStrLesion3 || segmentStrLesion3) {
    prostateSegmentLesion3 = sideStrLesion3 + positionStrLesion3 + segmentStrLesion3;
} else {
    prostateSegmentLesion3 = "";
}

document.getElementById('ProstateLesion3Location').value = segmentsLesion3.join(', ');

// Number

let buttonIDLesion3 = document.getElementById('ProstateLesion3No').id;
let matchLesion3 = buttonIDLesion3.match(/(\d)[^\d]{2}$/);
if (matchLesion3) {
	var ProstateLesion3Number = "Ložisko č. " + matchLesion3[1] + ": ";  
}


// T2
const ProstateLesion3T2Text = buttonElementProstateLesion3T2.innerText;

if (ProstateLesion3T2Text === "T2 score 1") {
 ProstateLesion3T2P = "bez snížení SI na T2, "; 
 ProstateLesion3T2R = ""; 
} else if (ProstateLesion3T2Text === "T2 score 2") {
 ProstateLesion3T2P = "dobře ohraničené homogenně nízké SI na T2, ";
 ProstateLesion3T2R = "";
} else if (ProstateLesion3T2Text === "T2 score 3") {
 ProstateLesion3T2P = "hůře ohraničené nehomogenně nízké SI na T2, ";
 ProstateLesion3T2R = "";
} else if (ProstateLesion3T2Text === "T2 score 4") {
 ProstateLesion3T2P = "neohraničené nehomogenně nízké SI na T2, ";
 ProstateLesion3T2R = "";
} else if (ProstateLesion3T2Text === "T2 score 5") {
 ProstateLesion3T2P = "neohraničené nehomogenně nízké SI na T2, ";
 ProstateLesion3T2R = "";
}

// DWI
var ProstateLesion3DWIText = buttonElementProstateLesion3DWI.innerText;

if (ProstateLesion3DWIText === "DWI score 1") {
    ProstateLesion3DWIP = "bez vyšší SI na DWI a bez snížení SI na ADC, "; 
    ProstateLesion3DWIR = ""; 
} else if (ProstateLesion3DWIText === "DWI score 2") {
    ProstateLesion3DWIP = "pruh/klín lehce vyšší na DWI / nižší na ADC, "; 
    ProstateLesion3DWIR = ""; 
} else if (ProstateLesion3DWIText === "DWI score 3") {
    ProstateLesion3DWIP = "vyšší SI na DWI nebo nižší SI na ADC, ";
    ProstateLesion3DWIR = "";
} else if (ProstateLesion3DWIText === "DWI score 4") {
    ProstateLesion3DWIP = "vysoké SI na DWI a současně nízké SI na ADC, ";
    ProstateLesion3DWIR = "";
} else if (ProstateLesion3DWIText === "DWI score 5") {
    ProstateLesion3DWIP = "vysoké SI na DWI a současně nízké SI na ADC, ";
    ProstateLesion3DWIR = "";
}

// C+
var ProstateLesion3CText = buttonElementProstateLesion3C.innerText;

if (ProstateLesion3CText === "kontrast -") {
    ProstateLesion3CP = ""; 
    ProstateLesion3CR = ""; 
} else if (ProstateLesion3CText === "kontrast +") {
    ProstateLesion3CP = "s časným postkontrastním sycením, "; 
    ProstateLesion3CR = ""; 
}

// PSMA
var ProstateLesion3PSMAText = buttonElementProstateLesion3PSMA.innerText;

if (document.getElementById('ChbProstatePSMA').checked) {
        if (ProstateLesion3PSMAText === "PSMA 0") {
            ProstateLesion3PSMAP = "s akumulací RF pod úrovní krevního poolu (score 0), "; 
            ProstateLesion3PSMAR = ", bez zvýšené PSMA exprese"; 
        } else if (ProstateLesion3PSMAText === "PSMA 1") {
            ProstateLesion3PSMAP = "s akumulací RF nad úrovní krevního poolu, ale nižší než játra (score 1), "; 
            ProstateLesion3PSMAR = ", s mírně zvýšenou PSMA expresí"; 
        } else if (ProstateLesion3PSMAText === "PSMA 2") {
            ProstateLesion3PSMAP = "s akumulací RF nad úrovní jater, ale nižší než parotid (score 2), ";
            ProstateLesion3PSMAR = ", se středně vysokou PSMA expresí";
        } else if (ProstateLesion3PSMAText === "PSMA 3") {
            ProstateLesion3PSMAP = "s akumulací RF nad úrovní parotid (score 3), ";
            ProstateLesion3PSMAR = ", s vysokou PSMA expresí";
        } 
    } else {
        ProstateLesion3PSMAP = "";
        ProstateLesion3PSMAR = "";
    }

// size
var ProstateLesion3SizeValue = document.getElementById("ProstateLesion3Size").value;
document.getElementById("ProstateLesion3Size").addEventListener('input', updateTexts);
var ProstateLesion3SizeP = "";

if (ProstateLesion3SizeValue === "") {
    ProstateLesion3SizeP = "";
} else if (ProstateLesion3SizeValue !== "") {
    ProstateLesion3SizeP = "diametru cca " + ProstateLesion3SizeValue + " mm,";
}

// invaze
var ProstateLesion3InvasionText = buttonElementProstateLesion3Invasion.innerText;

if (ProstateLesion3InvasionText === "bez invaze") {
    ProstateLesion3InvasionP = ""; 
    ProstateLesion3InvasionR = "";  
} else if (ProstateLesion3InvasionText === "přes kapsulu") {
    ProstateLesion3InvasionP = "s invazí přes kapsulu, "; 
    ProstateLesion3InvasionR = ", s invazí přes kapsulu"; 
} else if (ProstateLesion3InvasionText === "semen. váčků") {
    ProstateLesion3InvasionP = "s infiltrací semenných váčků, "; 
    ProstateLesion3InvasionR = ", s infiltrací semenných váčků"; 
} else if (ProstateLesion3InvasionText === "okolních struktur") {
    ProstateLesion3InvasionP = "s infiltrací okolních struktur, "; 
    ProstateLesion3InvasionR = ", s infiltrací okolních struktur"; 
}


// === PI-RADS v2.1 helper ===
function getZoneFromSegment(seg) {
  if (!seg) return "unknown";
  if (seg.includes("PZa") || seg.includes("PZpl") || seg.includes("PZpm") || seg.includes("PZ")) return "PZ";
  if (seg.includes("TZa") || seg.includes("TZp")) return "TZ";
  if (seg.includes("CZ") || seg.includes("AFS")) return "CZAFS";
  return "unknown";
}

function computePiradsV21({ zone, t2, dwi, dcePos, sizeMm, hasECE }) {
  const big = (typeof sizeMm === "number" && sizeMm >= 15) || !!hasECE;

  if (zone === "PZ") {
    if (dwi <= 1) return 1;
    if (dwi === 2) return 2;
    if (dwi === 3) return dcePos ? 4 : 3;                // DCE jen jako tie-breaker
    if (dwi === 4) return big ? 5 : 4;                   // ≥15 mm nebo ECE -> 5
    if (dwi >= 5) return 5;                              // DWI 5 vždy 5
  }

  if (zone === "TZ") {
    if (t2 <= 1) return 1;
    if (t2 === 2) return (dwi >= 4) ? 3 : 2;
    if (t2 === 3) return (dwi === 5) ? 4 : 3;
    if (t2 === 4) return big ? 5 : 4;                    // ≥15 mm nebo ECE -> 5
    if (t2 >= 5) return 5;
  }

  // CZ/AFS: vezmi vyšší z T2 a DWI; pokud je 4 a splněn big, povyš na 5
  let base = Math.max(t2 || 0, dwi || 0);
  if (base === 4 && big) return 5;
  return Math.min(Math.max(base, 1), 5);
}

// === PIRADS auto  ===
{
  const firstSegmentLesion3 = segmentsLesion3[0];
  const zone1 = getZoneFromSegment(firstSegmentLesion3);

  const t2_1  = parseInt(buttonElementProstateLesion3T2.innerText.replace("T2 score ","")) || 0;
  const dwi_1 = parseInt(buttonElementProstateLesion3DWI.innerText.replace("DWI score ","")) || 0;
  const dce_1 = (buttonElementProstateLesion3C.innerText.trim() === "kontrast +");

  const sizeRaw1 = document.getElementById("ProstateLesion3Size").value;
  const sizeMm1 = sizeRaw1 === "" ? undefined : parseFloat(sizeRaw1);

  const inv1 = buttonElementProstateLesion3Invasion.innerText.trim();
  const hasECE1 = (inv1 !== "bez invaze"); // zahrnuje "přes kapsulu", SV, okolní struktury

  const pi1 = computePiradsV21({
    zone: zone1, t2: t2_1, dwi: dwi_1, dcePos: dce_1, sizeMm: sizeMm1, hasECE: hasECE1
  });

  buttonElementProstateLesion3PIRADS.innerText = `PI-RADS ${pi1}`;
}



//PIRADS manual
var ProstateLesion3PIRADSText = buttonElementProstateLesion3PIRADS.innerText;

if (prostateSegmentLesion3 === "") {
    ProstateLesion3PIRADSText = "";
} else {
    ProstateLesion3PIRADSText += "";
}

// Lesion3 Finals
const prostateTableLesion3 = document.querySelector('#ProstateLesion3');
var ProstateLesion3P = ""; var ProstateLesion3R = "";
if (!prostateTableLesion3.classList.contains('hidden') && prostateSegmentLesion3 !== "") {
    const isPeripheral = segmentsLesion3.length > 0 && segmentsLesion3[0].charAt(0) === 'P';
    ProstateLesion3P = "Ložisko " + " " + prostateSegmentLesion3 + " " + ProstateLesion3SizeP + " " + (isPeripheral ? "" : ProstateLesion3T2P) + " " + ProstateLesion3DWIP + " " + ProstateLesion3CP + " " + ProstateLesion3InvasionP + " " + ProstateLesion3PSMAP + ".";
    ProstateLesion3R = "Ložisko " + ProstateLesion3PIRADSText + " - " + prostateSegmentLesion3 + " " + ProstateLesion3InvasionR + " " + ProstateLesion3PSMAR + ".";
}


// NON LESION


// size
var ProstateSizeValue = document.getElementById("ProstateSize").value;
    var ProstateSizeP = "";
    var matches = ProstateSizeValue.match(/(\d+)/g); // Extract all groups of digits from the string
    
    if (!ProstateSizeValue) {
        ProstateSizeP = "";
    } else if (matches && matches.length === 3) { // If there are exactly 3 groups of numbers
        var a = parseFloat(matches[0]);
        var b = parseFloat(matches[1]);
        var c = parseFloat(matches[2]);
        var ProstateVolume = (a * b * c) / 2000;
        var roundedVolume = Math.round(ProstateVolume / 10) * 10;  // Round to nearest ten
        var ProstateSizeR = getProstateVolumeR(roundedVolume);
        ProstateSizeP = "Prostata rozměrů cca " + ProstateSizeValue + " mm, což představuje objem cca " + roundedVolume + " ml. ";
    } else {
        ProstateSizeP = "Prostata rozměrů cca " + ProstateSizeValue + " mm. ";
    }

function getProstateVolumeR(volume) {
    if (volume < 30) {
        return "";
    } else if (volume >= 30 && volume < 40) {
        return "Hraniční velikost prostaty";
    } else if (volume >= 40 && volume < 70) {
        return "Zvětšená prostata";
    } else {
        return "Výrazně zvětšená prostata";
    }
}

// hyperplasia
const ProstateHyperplasiaText = buttonElementProstateHyperplasia.innerText;

if (ProstateHyperplasiaText === "není") {
 ProstateHyperplasiaP = "";
 ProstateHyperplasiaR = "";
} else if (ProstateHyperplasiaText === "mírná") {
 ProstateHyperplasiaP = "Mírné zbytnění nodulárně prostavěné přechodové zóny prostaty. "; 
 ProstateHyperplasiaR = "Mírná benigní hyperplázie prostaty. "; 
} else if (ProstateHyperplasiaText === "střední") {
 ProstateHyperplasiaP = "Zbytnění nodulárně prostavěné přechodové zóny a tak útlak periferní zóny prostaty. ";
 ProstateHyperplasiaR = "Středně pokročilá hyperplázie prostaty. ";
} else if (ProstateHyperplasiaText === "pokročilá") {
 ProstateHyperplasiaP = "Pokročilé zbytnění nodulárně prostavěné přechodové zóny s útlakem periferní zóny prostaty. ";
 ProstateHyperplasiaR = "Pokročilá hyperplázie prostaty. ";
}

// seminal vesicles
const ProstateSemVesText = buttonElementProstateSemVes.innerText;

if (ProstateSemVesText === "normální") {
 ProstateSemVesP = "Normální náplň semenných váčků. ";
 ProstateSemVesR = "";
} else if (ProstateSemVesText === "malá náplň") {
 ProstateSemVesP = "Chabá náplň semenných váčků, jejich hodnotitelnost je limitována. "; 
 ProstateSemVesR = ""; 
} else if (ProstateSemVesText === "bez náplně") {
 ProstateSemVesP = "Není náplň semenných váčků, které jsou proto hodnotitelné. ";
 ProstateSemVesR = "";
} 



// Lymph nodes Reg

var locationsLNReg = [
        "při externí ilice vpravo",
        "při externí ilice vlevo",
        "při interní ilice vpravo",
        "při interní ilice vlevo",
		"presakrální vpravo",
        "presakrální vlevo",
        "další pánevní vpravo",
        "další pánevní vlevo"
    ];
    
    var inputsLNReg = [
        document.getElementById("ProstateLNExtR"),
        document.getElementById("ProstateLNExtL"),
        document.getElementById("ProstateLNIntR"),
        document.getElementById("ProstateLNIntL"),
		document.getElementById("ProstateLNSacralR"),
        document.getElementById("ProstateLNSacralL"),
        document.getElementById("ProstateLNPelvR"),
        document.getElementById("ProstateLNPelvL")
    ];
    
    var ProstateLNRegP = "Suspektní regionální uzliny jsou přítomny: ";
    var totalNodesReg = 0;
    var nodesArrayReg = [];
    
    for (var i = 0; i < inputsLNReg.length; i++) {
        if (inputsLNReg[i].value && parseInt(inputsLNReg[i].value) > 0) {
            nodesArrayReg.push(inputsLNReg[i].value + " " + locationsLNReg[i]);
            totalNodesReg += parseInt(inputsLNReg[i].value);
        }
    }

const ProstateLNRegText = buttonElementProstateLNReg.innerText;

if (nodesArrayReg.length === 0) {
    ProstateLNRegP = "Nejsou zřetelné patologické regionální lymfatické uzliny. ";
    ProstateLNRegR = "Bez patrných patologických regionálních lymfatických uzlin. ";
} else {
    // Handling the comma and 'a' separators
    ProstateLNRegP += nodesArrayReg.slice(0, -2).join(", ") + 
                   (nodesArrayReg.length > 2 ? ", " : "") + 
                   nodesArrayReg.slice(-2).join(" a ") + ". ";
    
    if (totalNodesReg === 1) {
        ProstateLNRegR = totalNodesReg + " suspektní regionální uzlina.";
    } else if (totalNodesReg >= 2 && totalNodesReg <= 4) {
        ProstateLNRegR = totalNodesReg + " suspektní regionální uzliny.";
    } else {
        ProstateLNRegR = totalNodesReg + " suspektních regionálních uzlin.";
    }
}


// Lymph nodes NonNonReg

var locationsLNNonReg = [
		"paraaortálně",
        "při společné ilice vpravo",
		"při společné ilice vlevo",
        "inguinálně vpravo",
        "inguinálně vlevo",
        "další non-regionální"
    ];
    
    var inputsLNNonReg = [
		document.getElementById("ProstateLNAo"),
		document.getElementById("ProstateLNComR"),
        document.getElementById("ProstateLNComL"),
        document.getElementById("ProstateLNIngR"),
        document.getElementById("ProstateLNIngL"),
        document.getElementById("ProstateLNFar")
    ];
    
    var ProstateLNNonRegP = "Suspektní non-regionální uzliny jsou přítomny: ";
    var totalNodesNonReg = 0;
    var nodesArrayNonReg = [];
    
    for (var i = 0; i < inputsLNNonReg.length; i++) {
        if (inputsLNNonReg[i].value && parseInt(inputsLNNonReg[i].value) > 0) {
            nodesArrayNonReg.push(inputsLNNonReg[i].value + " " + locationsLNNonReg[i]);
            totalNodesNonReg += parseInt(inputsLNNonReg[i].value);
        }
    }

const ProstateLNNonRegText = buttonElementProstateLNNonReg.innerText;

if (nodesArrayNonReg.length === 0) {
    ProstateLNNonRegP = "Nejsou zřetelné patologické non-regionální lymfatické uzliny. ";
    ProstateLNNonRegR = "Bez patrných patologických non-regionálních lymfatických uzlin. ";
} else {
    // Handling the comma and 'a' separators
    ProstateLNNonRegP += nodesArrayNonReg.slice(0, -2).join(", ") + 
                   (nodesArrayNonReg.length > 2 ? ", " : "") + 
                   nodesArrayNonReg.slice(-2).join(" a ") + ". ";
    
    if (totalNodesNonReg === 1) {
        ProstateLNNonRegR = totalNodesNonReg + " suspektní non-regionální uzlina.";
    } else if (totalNodesNonReg >= 2 && totalNodesNonReg <= 4) {
        ProstateLNNonRegR = totalNodesNonReg + " suspektní non-regionální uzliny.";
    } else {
        ProstateLNNonRegR = totalNodesNonReg + " suspektních non-regionálních uzlin.";
    }
}


// normal exam
let ProstateOkP = "", ProstateOkR = "";

const lesionsP = [ProstateLesion1P, ProstateLesion2P, ProstateLesion3P];
const lesionsR = [ProstateLesion1R, ProstateLesion2R, ProstateLesion3R];

ProstateOkP = lesionsP.every(lesion => lesion === "") ? "Bez patrných ložisek abnormálního SI. " : "";
ProstateOkR = lesionsR.every(lesion => lesion === "") ? "Bez známek přítomnosti patologických ložisek prostaty. PI-RADS 1." : "";


//Meta

let ProstateSkeletonMetaP = "", ProstateSkeletonMetaR = "", ProstateOtherMetaR = "", ProstateMetaR = "";




//TNM
let ProstateTstageR = "", ProstateNstageR = "", ProstateMstageR = ""; ProstateTMN = "";

if (ProstateLesion1R === "" && ProstateLesion2R === "" && ProstateLesion3R === "" ) {
    ProstateTstageR = "T0";
} else if (ProstateLesion1InvasionText === "okolních struktur" || ProstateLesion2InvasionText === "okolních struktur" || ProstateLesion3InvasionText === "okolních struktur") {
    ProstateTstageR = "T4";
} else if (ProstateLesion1InvasionText === "semen. váčků" || ProstateLesion2InvasionText === "semen. váčků" || ProstateLesion3InvasionText === "semen. váčků") {
    ProstateTstageR = "T3b";
} else if (ProstateLesion1InvasionText === "přes kapsulu" || ProstateLesion2InvasionText === "přes kapsulu" || ProstateLesion3InvasionText === "přes kapsulu") {
    ProstateTstageR = "T3a";
} else if (ProstateLesion1InvasionText === "invaze kapsuly" || ProstateLesion2InvasionText === "invaze kapsuly" || ProstateLesion3InvasionText === "invaze kapsuly" ||
           ProstateLesion1InvasionText === "bez invaze" || ProstateLesion2InvasionText === "bez invaze" || ProstateLesion3InvasionText === "bez invaze") {
    ProstateTstageR = "T2";
}


if (totalNodesReg === 0) {
    ProstateNstageR = "N0";
} else if (totalNodesReg > 1) {
    ProstateNstageR = "N2";
} else if (totalNodesReg > 0) {
    ProstateNstageR = "N1";
}


if (totalNodesNonReg > 0) {
    ProstateMstageR = "M1a ";
}

if (document.getElementById('ChbProstateSkeletonMeta').checked) {
	ProstateMstageR += "M1b ";
} 	
if (document.getElementById('ChbProstateOtherMeta').checked) {
	ProstateMstageR += "M1c ";
} 
if (!document.getElementById('ChbProstateSkeletonMeta').checked && !document.getElementById('ChbProstateOtherMeta').checked && totalNodesNonReg === 0) {
	ProstateMstageR = "M0";
}



//miTNM
let ProstatemiTstageR = "", ProstatemiNstageR = "", ProstatemiMstageR = ""; ProstatemiTMN = "";

if (document.getElementById("ChbProstateRecidR").checked || document.getElementById("ChbProstateRecidL").checked) {
    ProstatemiTstageR = "miTr";
} else if  (ProstateLesion1R === "" && ProstateLesion2R === "" && ProstateLesion3R === "") {
    ProstatemiTstageR = "miT0";
} else if (ProstateLesion1InvasionText === "okolních struktur" || ProstateLesion2InvasionText === "okolních struktur" || ProstateLesion3InvasionText === "okolních struktur") {
    ProstatemiTstageR = "miT4";
} else if (ProstateLesion1InvasionText === "semen. váčků" || ProstateLesion2InvasionText === "semen. váčků" || ProstateLesion3InvasionText === "semen. váčků") {
    ProstatemiTstageR = "miT3b";
} else if (ProstateLesion1InvasionText === "přes kapsulu" || ProstateLesion2InvasionText === "přes kapsulu" || ProstateLesion3InvasionText === "přes kapsulu") {
    ProstatemiTstageR = "miT3a";
} else if (ProstateLesion1InvasionText === "invaze kapsuly" || ProstateLesion2InvasionText === "invaze kapsuly" || ProstateLesion3InvasionText === "invaze kapsuly") {
    ProstatemiTstageR = "miT2";
} else if (ProstateLesion1InvasionText === "bez invaze" || ProstateLesion2InvasionText === "bez invaze" || ProstateLesion3InvasionText === "bez invaze") {
    ProstatemiTstageR = "miT2";
} 

if (totalNodesReg === 0) {
    ProstatemiNstageR = "miN0";
} else if (totalNodesReg > 1) {
    ProstatemiNstageR = "miN2";
} else if (totalNodesReg > 0) {
    ProstatemiNstageR = "miN1";
}


if (totalNodesNonReg > 0) {
    ProstatemiMstageR += "miM1a ";
}

if (document.getElementById('ChbProstateSkeletonMeta').checked) {
	ProstatemiMstageR += "miM1b ";
} 	
if (document.getElementById('ChbProstateOtherMeta').checked) {
	ProstatemiMstageR += "miM1c ";
} 
if (!document.getElementById('ChbProstateSkeletonMeta').checked && !document.getElementById('ChbProstateOtherMeta').checked && totalNodesNonReg === 0) {
	ProstatemiMstageR = "miM0";
}


// TMN or miTNM 
if (document.getElementById('ChbProstatePSMA').checked) {
	ProstateTMN = ""; 
	ProstatemiTMN = "Dnešní molekulární zobrazení (mi) odpovídá stagingu ca prostaty: " + ProstatemiTstageR + " " + ProstatemiNstageR + " " + ProstatemiMstageR + ".";
} else {
	ProstateTMN = "TNM stage: " + ProstateTstageR + " " + ProstateNstageR + " " + ProstateMstageR;
	ProstatemiTMN = "";
}
	
// RAPE ?
const prostateRAPE = document.getElementById('ChbProstateRAPE');
const prostateRec = document.getElementById('ProstateRec');

if (prostateRAPE.checked) {
        prostateRec.classList.remove('hidden');
		ProstateOkP = "Prostata po radikálním odstranění. ";
		ProstateSemVesP = "";
        ProstateOkR = "St.p. RAPE. ";
    } else {
        prostateRec.classList.add('hidden');
    }

// RECID

var ProstateRecidP = "";
var ProstateRecidR = "";

var ChbProstateRecidR = document.getElementById("ChbProstateRecidR").checked;
var ChbProstateRecidL = document.getElementById("ChbProstateRecidL").checked;
var ChbProstateNoRecid = document.getElementById("ChbProstateNoRecid").checked;

if (ChbProstateRecidR && ChbProstateRecidL) {
  ProstateRecidP = "Ložiska v lůžku prostaty bilat. ";
  ProstateRecidR = "Ložiska recidivy v lůžku prostaty bilat. ";
  ProstateSemVesP = "";
} else {
  if (ChbProstateRecidR) {
    ProstateRecidP = "Ložisko s vysokou akumulací RF v lůžku prostaty vpravo. ";
    ProstateRecidR = "Ložisko recidivy v lůžku prostaty vpravo. ";
	ProstateSemVesP = "";
  }   if (ChbProstateRecidL) {
    ProstateRecidP = "Ložisko s vysokou akumulací RF v lůžku prostaty vlevo. ";
    ProstateRecidR = "Ložisko recidivy v lůžku prostaty vlevo. ";
	ProstateSemVesP = "";
  } 
}

if (prostateRAPE.checked && !ChbProstateRecidR && !ChbProstateRecidL ) {
	ProstateRecidP = "Bez patrných ložisek zvýšené akumulace RF v lůžku prostaty. " ;
	ProstateRecidR = "Bez patrné recidivy v lůžku. ";
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



// POPIS
ProstateTuNAMEText.value = "MR prostaty"; if (document.getElementById('ChbProstatePSMA').checked) {ProstateTuNAMEText.value = "PSMA-PET/MR prostaty";}

ProstateTuINDText.value  = indikace; document.getElementById("indikace").addEventListener("input", updateTexts);

ProstateTuPOPText.value = 
ProstateOkP + "\n" +
ProstateRecidP + "\n" +
ProstateLesion1P + "\n" +
ProstateLesion2P + "\n" +
ProstateLesion3P + "\n" +
ProstateSizeP + ProstateHyperplasiaP + ProstateSemVesP + "\n" +
ProstateLNRegP + ProstateLNNonRegP + "\n" +
dalsiPopis 
;

	//ProstateTuPOPText.value = ProstateTuPOPText.value.replace(/^\s+/gm, '');  // odstraní mezery na začátku řádek
	ProstateTuPOPText.value = ProstateTuPOPText.value.replace(/ {2,}/g, ' ');  // více mezer = jedna mezera
	//ProstateTuPOPText.value = ProstateTuPOPText.value.replace(/^[.,\s]+/gm, '');  // odstraní tečku a čárku pokud jsou první na řádce
	ProstateTuPOPText.value = ProstateTuPOPText.value.replace(/ \./g, '.'); // mezera tečka = bez mezery tečka
	ProstateTuPOPText.value = ProstateTuPOPText.value.replace(/\.{2,}/g, '.'); // více teček = jedna tečka
	ProstateTuPOPText.value = ProstateTuPOPText.value.replace(/^\s*[\r\n]/gm, ''); // smaže prázdné řádky
	ProstateTuPOPText.value = ProstateTuPOPText.value.replace(/\,\./g, '.'); // čarka tečka = tečka


//RESUME
ProstateTuRESText.value = 
ProstateOkR + ProstateRecidR + "\n" +
ProstateLesion1R + "\n" +
ProstateLesion2R + "\n" +
ProstateLesion3R + "\n" +
ProstateLNRegR + " " + ProstateLNNonRegR +  "\n" +
ProstateMetaR +  "\n" +
dalsiZaver +  "\n" +
ProstateTMN + ProstatemiTMN
;

	ProstateTuRESText.value = ProstateTuRESText.value.replace(/^\s+/gm, '');  // odstraní mezery na začátku řádek
	ProstateTuRESText.value = ProstateTuRESText.value.replace(/ {2,}/g, ' ');  // více mezer = jedna mezera
	ProstateTuRESText.value = ProstateTuRESText.value.replace(/^[.,\s]+/gm, '');  // odstraní tečku a čárku pokud jsou první na řádce
	ProstateTuRESText.value = ProstateTuRESText.value.replace(/ \./g, '.'); // mezera tečka = bez mezery tečka
	ProstateTuRESText.value = ProstateTuRESText.value.replace(/\.{2,}/g, '.'); // více teček = jedna tečka
	ProstateTuRESText.value = ProstateTuRESText.value.replace(/ :/g, ':');  // odstraní mezeru před dvojtečkou
	ProstateTuRESText.value = ProstateTuRESText.value.replace(/ \, /g, ', '); // mezera čárka na čárka
	
	ProstateTuRESText.value = ProstateTuRESText.value.replace(
  /Bez patrných patologických regionálních lymfatických uzlin\. Bez patrných patologických non-regionálních lymfatických uzlin\./g,
  "Bez patrných patologických regionálních i non-regionálních lymfatických uzlin."
	);



// FINAL

ProstateFinalText.value = 
"Staging ca prostaty" + "\n\n" +
ProstateTuPOPText.value + "\n" +
"Závěr:" + "\n" +
ProstateTuRESText.value;

}
updateTexts();	

