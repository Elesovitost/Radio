

// BUTTONS CYCLING

function cycleText(event, texts, index, buttonElement, callback) {
    event.preventDefault(); // Add this line to prevent the default action (context menu in this case)

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
    buttonElement.value = texts[index];
    if (callback) callback(index, buttonElement);
    return index;
}


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

// Chb clickable by right mouse

const ChbesFromCHB = document.querySelectorAll('.CHB input[type="checkbox"]');
const Chb1 = document.querySelector('#Chb1');
const allChbes = [...ChbesFromCHB];

if (Chb1) {
    allChbes.push(Chb1);
}

allChbes.forEach(function(Chb) {
    Chb.parentElement.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        Chb.checked = !Chb.checked;
        updateTexts(); 
    });
});

// buttons clickable by right mouse

var buttons = document.getElementsByTagName("button");

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("contextmenu", function(e){
        e.preventDefault();
    });
}



// NUMBERS MOUSE WHEELING

window.addEventListener('load', function() {
    var numberInputs = document.getElementsByClassName("numbers");
    for (var i = 0; i < numberInputs.length; i++) {
        numberInputs[i].addEventListener('wheel', function(e) {
            if (this.value === "") {
                this.value = 0;
            }
            e.preventDefault(); // Prevents the browser from scrolling while changing the number
            if (e.deltaY < 0) {
                this.stepUp(); 
            } else {
                this.stepDown(); 
                if (this.value == 0) {
                    this.value = ''; // Delete the number if it's 0
                }
            }
            var event = new Event('input');
            this.dispatchEvent(event);
        });
    }
});


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
