// checkbox clickable by right mouse

const checkboxes = document.querySelectorAll('.custom-checkbox input[type="checkbox"]');
checkboxes.forEach(function(checkbox) {
    checkbox.parentElement.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        checkbox.checked = !checkbox.checked;
        updateTexts(); toggleLastCells();
    });
});

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
  if (callback) callback(index, buttonElement);
  return index;
}

function updateBackgroundColor(index, buttonElement, color1 = "white", color2 = "#D4A29C") {
  buttonElement.style.backgroundColor = index === 0 ? color1 : color2;
}



var textsOSA = ["((", "(", "|", ")", "))"];
var textsLORD = ["((", "(", "|", ")"];

var buttonElementOSA = document.getElementById("myOSAButton");
var buttonElementLORD = document.getElementById("myLORDButton");

//L12
var textsL1KOM = ["není", "schmorl", "horní", "klínovitá", "výrazná"];
var textsL1LES = ["není", "hemangiom", "atyp hem", "lytické", "sklerotické"];
var textsL1LL = ["není", "ventro", "dorzo"];
var textsL1LISD = ["1 mm", "2 mm", "3 mm", "4 mm", "5 mm", "6 mm", "7 mm", "8 mm", "9 mm", "10 mm"];
var textsL1SL = ["nelýza", "lýza"];
var textsL12DD = ["není", "mírná", "střední", "těžká"];
var textsL12MOD = ["není", "I", "II", "III"];
var textsL12BH = ["není", "bulging", "herniace", "osteofyty"];
var textsL12HD = ["1 mm", "2 mm", "3 mm", "4 mm", "5 mm", "6 mm", "7 mm", "8 mm", "9 mm", "10 mm"];
var textsL12FA = ["není", "mírná", "střední", "těžká", "edém"];

var textsL12HERPF = ["F", "+"];
var textsL12HERPP = ["P", "+"];
var textsL12HERC = ["C", "+"];
var textsL12HERLP = ["P", "+"];
var textsL12HERLF = ["F", "+"];
var textsL12MIG = ["M0", "M▲", "M▼"];

var textsL12PF = ["0", "1", "2", "3"];
var textsL12PR = ["0", "1", "2", "3"];
var textsL12PK = ["0", "1", "2", "3"];
var textsL12LR = ["0", "1", "2", "3"];
var textsL12LF = ["0", "1", "2", "3"];

var buttonElementL1KOM = document.getElementById("myL1KOMButton");
var buttonElementL1LES = document.getElementById("myL1LESButton");

var buttonElementL1LL = document.getElementById("myL1LLButton");
var buttonElementL1LISD = document.getElementById("myL1LISDButton");
var buttonElementL1SL = document.getElementById("myL1SLButton");

var buttonElementL12DD = document.getElementById("myL12DDButton");
var buttonElementL12MOD = document.getElementById("myL12MODButton");
var buttonElementL12BH = document.getElementById("myL12BHButton");
var buttonElementL12HD = document.getElementById("myL12HDButton");
var buttonElementL12FA = document.getElementById("myL12FAButton");

var buttonElementL12HERPF = document.getElementById("myL12HERPFButton");
var buttonElementL12HERPP = document.getElementById("myL12HERPPButton");
var buttonElementL12HERC = document.getElementById("myL12HERCButton");
var buttonElementL12HERLP = document.getElementById("myL12HERLPButton");
var buttonElementL12HERLF = document.getElementById("myL12HERLFButton");
var buttonElementL12MIG = document.getElementById("myL12MIGButton");

var buttonElementL12PF = document.getElementById("myL12PFButton");
var buttonElementL12PR = document.getElementById("myL12PRButton");
var buttonElementL12PK = document.getElementById("myL12PKButton");
var buttonElementL12LR = document.getElementById("myL12LRButton");
var buttonElementL12LF = document.getElementById("myL12LFButton");

//L23
var textsL2KOM = ["není", "schmorl", "horní", "klínovitá", "výrazná"];
var textsL2LES = ["není", "hemangiom", "atyp hem", "lytické", "sklerotické"];
var textsL2LL = ["není", "ventro", "dorzo"];
var textsL2LISD = ["1 mm", "2 mm", "3 mm", "4 mm", "5 mm", "6 mm", "7 mm", "8 mm", "9 mm", "10 mm"];
var textsL2SL = ["nelýza", "lýza"];
var textsL23DD = ["není", "mírná", "střední", "těžká"];
var textsL23MOD = ["není", "I", "II", "III"];
var textsL23BH = ["není", "bulging", "herniace", "osteofyty"];
var textsL23HD = ["1 mm", "2 mm", "3 mm", "4 mm", "5 mm", "6 mm", "7 mm", "8 mm", "9 mm", "10 mm"];
var textsL23FA = ["není", "mírná", "střední", "těžká", "edém"];

var textsL23HERPF = ["F", "+"];
var textsL23HERPP = ["P", "+"];
var textsL23HERC = ["C", "+"];
var textsL23HERLP = ["P", "+"];
var textsL23HERLF = ["F", "+"];
var textsL23MIG = ["M0", "M▲", "M▼"];

var textsL23PF = ["0", "1", "2", "3"];
var textsL23PR = ["0", "1", "2", "3"];
var textsL23PK = ["0", "1", "2", "3"];
var textsL23LR = ["0", "1", "2", "3"];
var textsL23LF = ["0", "1", "2", "3"];


var buttonElementL2KOM = document.getElementById("myL2KOMButton");
var buttonElementL2LES = document.getElementById("myL2LESButton");

var buttonElementL2LL = document.getElementById("myL2LLButton");
var buttonElementL2LISD = document.getElementById("myL2LISDButton");
var buttonElementL2SL = document.getElementById("myL2SLButton");

var buttonElementL23DD = document.getElementById("myL23DDButton");
var buttonElementL23MOD = document.getElementById("myL23MODButton");
var buttonElementL23BH = document.getElementById("myL23BHButton");
var buttonElementL23HD = document.getElementById("myL23HDButton");
var buttonElementL23FA = document.getElementById("myL23FAButton");

var buttonElementL23HERPF = document.getElementById("myL23HERPFButton");
var buttonElementL23HERPP = document.getElementById("myL23HERPPButton");
var buttonElementL23HERC = document.getElementById("myL23HERCButton");
var buttonElementL23HERLP = document.getElementById("myL23HERLPButton");
var buttonElementL23HERLF = document.getElementById("myL23HERLFButton");
var buttonElementL23MIG = document.getElementById("myL23MIGButton");

var buttonElementL23PF = document.getElementById("myL23PFButton");
var buttonElementL23PR = document.getElementById("myL23PRButton");
var buttonElementL23PK = document.getElementById("myL23PKButton");
var buttonElementL23LR = document.getElementById("myL23LRButton");
var buttonElementL23LF = document.getElementById("myL23LFButton");

//L34
var textsL3KOM = ["není", "schmorl", "horní", "klínovitá", "výrazná"];
var textsL3LES = ["není", "hemangiom", "atyp hem", "lytické", "sklerotické"];
var textsL3LL = ["není", "ventro", "dorzo"];
var textsL3LISD = ["1 mm", "2 mm", "3 mm", "4 mm", "5 mm", "6 mm", "7 mm", "8 mm", "9 mm", "10 mm"];
var textsL3SL = ["nelýza", "lýza"];
var textsL34DD = ["není", "mírná", "střední", "těžká"];
var textsL34MOD = ["není", "I", "II", "III"];
var textsL34BH = ["není", "bulging", "herniace", "osteofyty"];
var textsL34HD = ["1 mm", "2 mm", "3 mm", "4 mm", "5 mm", "6 mm", "7 mm", "8 mm", "9 mm", "10 mm"];
var textsL34FA = ["není", "mírná", "střední", "těžká", "edém"];

var textsL34HERPF = ["F", "+"];
var textsL34HERPP = ["P", "+"];
var textsL34HERC = ["C", "+"];
var textsL34HERLP = ["P", "+"];
var textsL34HERLF = ["F", "+"];
var textsL34MIG = ["M0", "M▲", "M▼"];

var textsL34PF = ["0", "1", "2", "3"];
var textsL34PR = ["0", "1", "2", "3"];
var textsL34PK = ["0", "1", "2", "3"];
var textsL34LR = ["0", "1", "2", "3"];
var textsL34LF = ["0", "1", "2", "3"];


var buttonElementL3KOM = document.getElementById("myL3KOMButton");
var buttonElementL3LES = document.getElementById("myL3LESButton");

var buttonElementL3LL = document.getElementById("myL3LLButton");
var buttonElementL3LISD = document.getElementById("myL3LISDButton");
var buttonElementL3SL = document.getElementById("myL3SLButton");

var buttonElementL34DD = document.getElementById("myL34DDButton");
var buttonElementL34MOD = document.getElementById("myL34MODButton");
var buttonElementL34BH = document.getElementById("myL34BHButton");
var buttonElementL34HD = document.getElementById("myL34HDButton");
var buttonElementL34FA = document.getElementById("myL34FAButton");

var buttonElementL34HERPF = document.getElementById("myL34HERPFButton");
var buttonElementL34HERPP = document.getElementById("myL34HERPPButton");
var buttonElementL34HERC = document.getElementById("myL34HERCButton");
var buttonElementL34HERLP = document.getElementById("myL34HERLPButton");
var buttonElementL34HERLF = document.getElementById("myL34HERLFButton");
var buttonElementL34MIG = document.getElementById("myL34MIGButton");

var buttonElementL34PF = document.getElementById("myL34PFButton");
var buttonElementL34PR = document.getElementById("myL34PRButton");
var buttonElementL34PK = document.getElementById("myL34PKButton");
var buttonElementL34LR = document.getElementById("myL34LRButton");
var buttonElementL34LF = document.getElementById("myL34LFButton");

//L45
var textsL4KOM = ["není", "schmorl", "horní", "klínovitá", "výrazná"];
var textsL4LES = ["není", "hemangiom", "atyp hem", "lytické", "sklerotické"];
var textsL4LL = ["není", "ventro", "dorzo"];
var textsL4LISD = ["1 mm", "2 mm", "3 mm", "4 mm", "5 mm", "6 mm", "7 mm", "8 mm", "9 mm", "10 mm"];
var textsL4SL = ["nelýza", "lýza"];
var textsL45DD = ["není", "mírná", "střední", "těžká"];
var textsL45MOD = ["není", "I", "II", "III"];
var textsL45BH = ["není", "bulging", "herniace", "osteofyty"];
var textsL45HD = ["1 mm", "2 mm", "3 mm", "4 mm", "5 mm", "6 mm", "7 mm", "8 mm", "9 mm", "10 mm"];
var textsL45FA = ["není", "mírná", "střední", "těžká", "edém"];

var textsL45HERPF = ["F", "+"];
var textsL45HERPP = ["P", "+"];
var textsL45HERC = ["C", "+"];
var textsL45HERLP = ["P", "+"];
var textsL45HERLF = ["F", "+"];
var textsL45MIG = ["M0", "M▲", "M▼"];

var textsL45PF = ["0", "1", "2", "3"];
var textsL45PR = ["0", "1", "2", "3"];
var textsL45PK = ["0", "1", "2", "3"];
var textsL45LR = ["0", "1", "2", "3"];
var textsL45LF = ["0", "1", "2", "3"];


var buttonElementL4KOM = document.getElementById("myL4KOMButton");
var buttonElementL4LES = document.getElementById("myL4LESButton");

var buttonElementL4LL = document.getElementById("myL4LLButton");
var buttonElementL4LISD = document.getElementById("myL4LISDButton");
var buttonElementL4SL = document.getElementById("myL4SLButton");

var buttonElementL45DD = document.getElementById("myL45DDButton");
var buttonElementL45MOD = document.getElementById("myL45MODButton");
var buttonElementL45BH = document.getElementById("myL45BHButton");
var buttonElementL45HD = document.getElementById("myL45HDButton");
var buttonElementL45FA = document.getElementById("myL45FAButton");

var buttonElementL45HERPF = document.getElementById("myL45HERPFButton");
var buttonElementL45HERPP = document.getElementById("myL45HERPPButton");
var buttonElementL45HERC = document.getElementById("myL45HERCButton");
var buttonElementL45HERLP = document.getElementById("myL45HERLPButton");
var buttonElementL45HERLF = document.getElementById("myL45HERLFButton");
var buttonElementL45MIG = document.getElementById("myL45MIGButton");

var buttonElementL45PF = document.getElementById("myL45PFButton");
var buttonElementL45PR = document.getElementById("myL45PRButton");
var buttonElementL45PK = document.getElementById("myL45PKButton");
var buttonElementL45LR = document.getElementById("myL45LRButton");
var buttonElementL45LF = document.getElementById("myL45LFButton");

//L5S1
var textsL5KOM = ["není", "schmorl", "horní", "klínovitá", "výrazná"];
var textsL5LES = ["není", "hemangiom", "atyp hem", "lytické", "sklerotické"];
var textsL5LL = ["není", "ventro", "dorzo"];
var textsL5LISD = ["1 mm", "2 mm", "3 mm", "4 mm", "5 mm", "6 mm", "7 mm", "8 mm", "9 mm", "10 mm"];
var textsL5SL = ["nelýza", "lýza"];
var textsL5S1DD = ["není", "mírná", "střední", "těžká"];
var textsL5S1MOD = ["není", "I", "II", "III"];
var textsL5S1BH = ["není", "bulging", "herniace", "osteofyty"];
var textsL5S1HD = ["1 mm", "2 mm", "3 mm", "4 mm", "5 mm", "6 mm", "7 mm", "8 mm", "9 mm", "10 mm"];
var textsL5S1FA = ["není", "mírná", "střední", "těžká", "edém"];

var textsL5S1HERPF = ["F", "+"];
var textsL5S1HERPP = ["P", "+"];
var textsL5S1HERC = ["C", "+"];
var textsL5S1HERLP = ["P", "+"];
var textsL5S1HERLF = ["F", "+"];
var textsL5S1MIG = ["M0", "M▲", "M▼"];

var textsL5S1PF = ["0", "1", "2", "3"];
var textsL5S1PR = ["0", "1", "2", "3"];
var textsL5S1PK = ["0", "1", "2", "3"];
var textsL5S1LR = ["0", "1", "2", "3"];
var textsL5S1LF = ["0", "1", "2", "3"];


var buttonElementL5KOM = document.getElementById("myL5KOMButton");
var buttonElementL5LES = document.getElementById("myL5LESButton");

var buttonElementL5LL = document.getElementById("myL5LLButton");
var buttonElementL5LISD = document.getElementById("myL5LISDButton");
var buttonElementL5SL = document.getElementById("myL5SLButton");

var buttonElementL5S1DD = document.getElementById("myL5S1DDButton");
var buttonElementL5S1MOD = document.getElementById("myL5S1MODButton");
var buttonElementL5S1BH = document.getElementById("myL5S1BHButton");
var buttonElementL5S1HD = document.getElementById("myL5S1HDButton");
var buttonElementL5S1FA = document.getElementById("myL5S1FAButton");

var buttonElementL5S1HERPF = document.getElementById("myL5S1HERPFButton");
var buttonElementL5S1HERPP = document.getElementById("myL5S1HERPPButton");
var buttonElementL5S1HERC = document.getElementById("myL5S1HERCButton");
var buttonElementL5S1HERLP = document.getElementById("myL5S1HERLPButton");
var buttonElementL5S1HERLF = document.getElementById("myL5S1HERLFButton");
var buttonElementL5S1MIG = document.getElementById("myL5S1MIGButton");

var buttonElementL5S1PF = document.getElementById("myL5S1PFButton");
var buttonElementL5S1PR = document.getElementById("myL5S1PRButton");
var buttonElementL5S1PK = document.getElementById("myL5S1PKButton");
var buttonElementL5S1LR = document.getElementById("myL5S1LRButton");
var buttonElementL5S1LF = document.getElementById("myL5S1LFButton");


//S1
var textsS1LES = ["není", "hemangiom", "atyp hem", "lytické", "sklerotické"];

var buttonElementS1LES = document.getElementById("myS1LESButton");


// HIDING BUTTONS

buttonElementL1LL.addEventListener("mousedown", function() {
  if (buttonElementL1LL.innerText !== "není") {
    buttonElementL1LISD.style.display = "block";
    buttonElementL1SL.style.display = "block";
  } else {
    buttonElementL1LISD.style.display = "none";
    buttonElementL1SL.style.display = "none";
  }
});

buttonElementL12BH.addEventListener("mousedown", function() {
  if (buttonElementL12BH.innerText !== "není") {
    buttonElementL12HD.style.display = "block";
    buttonElementL12HERPF.style.display = "inline-block";
    buttonElementL12HERPP.style.display = "inline-block";
    buttonElementL12HERC.style.display = "inline-block";
    buttonElementL12HERLP.style.display = "inline-block";
    buttonElementL12HERLF.style.display = "inline-block";
    buttonElementL12MIG.style.display = "inline-block";
  } else {
    buttonElementL12HD.style.display = "none";
    buttonElementL12HERPF.style.display = "none";
    buttonElementL12HERPP.style.display = "none";
    buttonElementL12HERC.style.display = "none";
    buttonElementL12HERLP.style.display = "none";
    buttonElementL12HERLF.style.display = "none";
    buttonElementL12MIG.style.display = "none";
  }
});

//L23
buttonElementL2LL.addEventListener("mousedown", function() {
  if (buttonElementL2LL.innerText !== "není") {
    buttonElementL2LISD.style.display = "block";
    buttonElementL2SL.style.display = "block";
  } else {
    buttonElementL2LISD.style.display = "none";
    buttonElementL2SL.style.display = "none";
  }
});

buttonElementL23BH.addEventListener("mousedown", function() {
  if (buttonElementL23BH.innerText !== "není") {
    buttonElementL23HD.style.display = "block";
    buttonElementL23HERPF.style.display = "inline-block";
    buttonElementL23HERPP.style.display = "inline-block";
    buttonElementL23HERC.style.display = "inline-block";
    buttonElementL23HERLP.style.display = "inline-block";
    buttonElementL23HERLF.style.display = "inline-block";
    buttonElementL23MIG.style.display = "inline-block";
  } else {
    buttonElementL23HD.style.display = "none";
    buttonElementL23HERPF.style.display = "none";
    buttonElementL23HERPP.style.display = "none";
    buttonElementL23HERC.style.display = "none";
    buttonElementL23HERLP.style.display = "none";
    buttonElementL23HERLF.style.display = "none";
    buttonElementL23MIG.style.display = "none";
  }
});

//L34
buttonElementL3LL.addEventListener("mousedown", function() {
  if (buttonElementL3LL.innerText !== "není") {
    buttonElementL3LISD.style.display = "block";
    buttonElementL3SL.style.display = "block";
  } else {
    buttonElementL3LISD.style.display = "none";
    buttonElementL3SL.style.display = "none";
  }
});

buttonElementL34BH.addEventListener("mousedown", function() {
  if (buttonElementL34BH.innerText !== "není") {
    buttonElementL34HD.style.display = "block";
    buttonElementL34HERPF.style.display = "inline-block";
    buttonElementL34HERPP.style.display = "inline-block";
    buttonElementL34HERC.style.display = "inline-block";
    buttonElementL34HERLP.style.display = "inline-block";
    buttonElementL34HERLF.style.display = "inline-block";
    buttonElementL34MIG.style.display = "inline-block";
  } else {
    buttonElementL34HD.style.display = "none";
    buttonElementL34HERPF.style.display = "none";
    buttonElementL34HERPP.style.display = "none";
    buttonElementL34HERC.style.display = "none";
    buttonElementL34HERLP.style.display = "none";
    buttonElementL34HERLF.style.display = "none";
    buttonElementL34MIG.style.display = "none";
  }
});

//L45
buttonElementL4LL.addEventListener("mousedown", function() {
  if (buttonElementL4LL.innerText !== "není") {
    buttonElementL4LISD.style.display = "block";
    buttonElementL4SL.style.display = "block";
  } else {
    buttonElementL4LISD.style.display = "none";
    buttonElementL4SL.style.display = "none";
  }
});

buttonElementL45BH.addEventListener("mousedown", function() {
  if (buttonElementL45BH.innerText !== "není") {
    buttonElementL45HD.style.display = "block";
    buttonElementL45HERPF.style.display = "inline-block";
    buttonElementL45HERPP.style.display = "inline-block";
    buttonElementL45HERC.style.display = "inline-block";
    buttonElementL45HERLP.style.display = "inline-block";
    buttonElementL45HERLF.style.display = "inline-block";
    buttonElementL45MIG.style.display = "inline-block";
  } else {
    buttonElementL45HD.style.display = "none";
    buttonElementL45HERPF.style.display = "none";
    buttonElementL45HERPP.style.display = "none";
    buttonElementL45HERC.style.display = "none";
    buttonElementL45HERLP.style.display = "none";
    buttonElementL45HERLF.style.display = "none";
    buttonElementL45MIG.style.display = "none";
  }
});

//L5S1
buttonElementL5LL.addEventListener("mousedown", function() {
  if (buttonElementL5LL.innerText !== "není") {
    buttonElementL5LISD.style.display = "block";
    buttonElementL5SL.style.display = "block";
  } else {
    buttonElementL5LISD.style.display = "none";
    buttonElementL5SL.style.display = "none";
  }
});

buttonElementL5S1BH.addEventListener("mousedown", function() {
  if (buttonElementL5S1BH.innerText !== "není") {
    buttonElementL5S1HD.style.display = "block";
    buttonElementL5S1HERPF.style.display = "inline-block";
    buttonElementL5S1HERPP.style.display = "inline-block";
    buttonElementL5S1HERC.style.display = "inline-block";
    buttonElementL5S1HERLP.style.display = "inline-block";
    buttonElementL5S1HERLF.style.display = "inline-block";
    buttonElementL5S1MIG.style.display = "inline-block";
  } else {
    buttonElementL5S1HD.style.display = "none";
    buttonElementL5S1HERPF.style.display = "none";
    buttonElementL5S1HERPP.style.display = "none";
    buttonElementL5S1HERC.style.display = "none";
    buttonElementL5S1HERLP.style.display = "none";
    buttonElementL5S1HERLF.style.display = "none";
    buttonElementL5S1MIG.style.display = "none";
  }
});

// RESETS
function resetL1Row() {
  const buttons = [
    { element: buttonElementL1LL, texts: textsL1LL },
    { element: buttonElementL1LISD, texts: textsL1LISD },
    { element: buttonElementL1SL, texts: textsL1SL },
    { element: buttonElementL1KOM, texts: textsL1KOM },
    { element: buttonElementL1LES, texts: textsL1LES }
  ];

  buttons.forEach(({ element, texts }, index) => {
    element.innerText = texts[0];
	element.style.backgroundColor = "white";
    
    // Reset index variable to 0
    switch (index) {
      case 0: indexL1LL = 0; break;
      case 1: indexL1LISD = 0; break;
      case 2: indexL1SL = 0; break;
      case 3: indexL1KOM = 0; break;
      case 5: indexL1LES = 0; break;
    }
  });
updateTexts();
}

function resetL12Row() {
  const buttons = [
    { element: buttonElementL12DD, texts: textsL12DD },
    { element: buttonElementL12MOD, texts: textsL12MOD },
    { element: buttonElementL12BH, texts: textsL12BH },
    { element: buttonElementL12HD, texts: textsL12HD },
    { element: buttonElementL12MIG, texts: textsL12MIG },
    { element: buttonElementL12FA, texts: textsL12FA },

    { element: buttonElementL12HERPF, texts: textsL12HERPF },
    { element: buttonElementL12HERPP, texts: textsL12HERPP },
    { element: buttonElementL12HERC, texts: textsL12HERC },
    { element: buttonElementL12HERLP, texts: textsL12HERLP },
    { element: buttonElementL12HERLF, texts: textsL12HERLF },

    { element: buttonElementL12PF, texts: textsL12PF },
    { element: buttonElementL12PR, texts: textsL12PR },
    { element: buttonElementL12PK, texts: textsL12PK },
    { element: buttonElementL12LR, texts: textsL12LR },
    { element: buttonElementL12LF, texts: textsL12LF }
  ];


  buttons.forEach(({ element, texts }) => {
    element.innerText = texts[0];
    element.style.backgroundColor = "white";
  });
  updateTexts();
}

function resetL2Row() {
  const buttons = [
    { element: buttonElementL2LL, texts: textsL2LL },
    { element: buttonElementL2LISD, texts: textsL2LISD },
    { element: buttonElementL2SL, texts: textsL2SL },
    { element: buttonElementL2KOM, texts: textsL2KOM },
    { element: buttonElementL2LES, texts: textsL2LES }
  ];

  buttons.forEach(({ element, texts }, index) => {
    element.innerText = texts[0];
    element.style.backgroundColor = "white";
    // Reset index variable to 0
    switch (index) {
      case 0: indexL2LL = 0; break;
      case 1: indexL2LISD = 0; break;
      case 2: indexL2SL = 0; break;
      case 3: indexL2KOM = 0; break;
      case 5: indexL2LES = 0; break;
    }
  });
updateTexts();
}

function resetL23Row() {
  const buttons = [
    { element: buttonElementL23DD, texts: textsL23DD },
    { element: buttonElementL23MOD, texts: textsL23MOD },
    { element: buttonElementL23BH, texts: textsL23BH },
    { element: buttonElementL23HD, texts: textsL23HD },
    { element: buttonElementL23MIG, texts: textsL23MIG },
    { element: buttonElementL23FA, texts: textsL23FA },

    { element: buttonElementL23HERPF, texts: textsL23HERPF },
    { element: buttonElementL23HERPP, texts: textsL23HERPP },
    { element: buttonElementL23HERC, texts: textsL23HERC },
    { element: buttonElementL23HERLP, texts: textsL23HERLP },
    { element: buttonElementL23HERLF, texts: textsL23HERLF },

    { element: buttonElementL23PF, texts: textsL23PF },
    { element: buttonElementL23PR, texts: textsL23PR },
    { element: buttonElementL23PK, texts: textsL23PK },
    { element: buttonElementL23LR, texts: textsL23LR },
    { element: buttonElementL23LF, texts: textsL23LF }
  ];


  buttons.forEach(({ element, texts }) => {
    element.innerText = texts[0];
    element.style.backgroundColor = "white";
  });
  updateTexts();
}

//L34
function resetL3Row() {
  const buttons = [
    { element: buttonElementL3LL, texts: textsL3LL },
    { element: buttonElementL3LISD, texts: textsL3LISD },
    { element: buttonElementL3SL, texts: textsL3SL },
    { element: buttonElementL3KOM, texts: textsL3KOM },
    { element: buttonElementL3LES, texts: textsL3LES }
  ];

  buttons.forEach(({ element, texts }, index) => {
    element.innerText = texts[0];
    element.style.backgroundColor = "white";
    // Reset index variable to 0
    switch (index) {
      case 0: indexL3LL = 0; break;
      case 1: indexL3LISD = 0; break;
      case 2: indexL3SL = 0; break;
      case 3: indexL3KOM = 0; break;
      case 5: indexL3LES = 0; break;
    }
  });
updateTexts();
}

function resetL34Row() {
  const buttons = [
    { element: buttonElementL34DD, texts: textsL34DD },
    { element: buttonElementL34MOD, texts: textsL34MOD },
    { element: buttonElementL34BH, texts: textsL34BH },
    { element: buttonElementL34HD, texts: textsL34HD },
    { element: buttonElementL34MIG, texts: textsL34MIG },
    { element: buttonElementL34FA, texts: textsL34FA },

    { element: buttonElementL34HERPF, texts: textsL34HERPF },
    { element: buttonElementL34HERPP, texts: textsL34HERPP },
    { element: buttonElementL34HERC, texts: textsL34HERC },
    { element: buttonElementL34HERLP, texts: textsL34HERLP },
    { element: buttonElementL34HERLF, texts: textsL34HERLF },

    { element: buttonElementL34PF, texts: textsL34PF },
    { element: buttonElementL34PR, texts: textsL34PR },
    { element: buttonElementL34PK, texts: textsL34PK },
    { element: buttonElementL34LR, texts: textsL34LR },
    { element: buttonElementL34LF, texts: textsL34LF }
  ];


  buttons.forEach(({ element, texts }) => {
    element.innerText = texts[0];
    element.style.backgroundColor = "white";
  });
  updateTexts();
}



//L45
function resetL4Row() {
  const buttons = [
    { element: buttonElementL4LL, texts: textsL4LL },
    { element: buttonElementL4LISD, texts: textsL4LISD },
    { element: buttonElementL4SL, texts: textsL4SL },
    { element: buttonElementL4KOM, texts: textsL4KOM },
    { element: buttonElementL4LES, texts: textsL4LES }
  ];

  buttons.forEach(({ element, texts }, index) => {
    element.innerText = texts[0];
    element.style.backgroundColor = "white";
    // Reset index variable to 0
    switch (index) {
      case 0: indexL4LL = 0; break;
      case 1: indexL4LISD = 0; break;
      case 2: indexL4SL = 0; break;
      case 3: indexL4KOM = 0; break;
      case 5: indexL4LES = 0; break;
    }
  });
updateTexts();
}

function resetL45Row() {
  const buttons = [
    { element: buttonElementL45DD, texts: textsL45DD },
    { element: buttonElementL45MOD, texts: textsL45MOD },
    { element: buttonElementL45BH, texts: textsL45BH },
    { element: buttonElementL45HD, texts: textsL45HD },
    { element: buttonElementL45MIG, texts: textsL45MIG },
    { element: buttonElementL45FA, texts: textsL45FA },

    { element: buttonElementL45HERPF, texts: textsL45HERPF },
    { element: buttonElementL45HERPP, texts: textsL45HERPP },
    { element: buttonElementL45HERC, texts: textsL45HERC },
    { element: buttonElementL45HERLP, texts: textsL45HERLP },
    { element: buttonElementL45HERLF, texts: textsL45HERLF },

    { element: buttonElementL45PF, texts: textsL45PF },
    { element: buttonElementL45PR, texts: textsL45PR },
    { element: buttonElementL45PK, texts: textsL45PK },
    { element: buttonElementL45LR, texts: textsL45LR },
    { element: buttonElementL45LF, texts: textsL45LF }
  ];


  buttons.forEach(({ element, texts }) => {
    element.innerText = texts[0];
    element.style.backgroundColor = "white";
  });
  updateTexts();
}

//L5S1
function resetL5Row() {
  const buttons = [
    { element: buttonElementL5LL, texts: textsL5LL },
    { element: buttonElementL5LISD, texts: textsL5LISD },
    { element: buttonElementL5SL, texts: textsL5SL },
    { element: buttonElementL5KOM, texts: textsL5KOM },
    { element: buttonElementL5LES, texts: textsL5LES }
  ];

  buttons.forEach(({ element, texts }, index) => {
    element.innerText = texts[0];
    element.style.backgroundColor = "white";
    // Reset index variable to 0
    switch (index) {
      case 0: indexL5LL = 0; break;
      case 1: indexL5LISD = 0; break;
      case 2: indexL5SL = 0; break;
      case 3: indexL5KOM = 0; break;
      case 5: indexL5LES = 0; break;
    }
  });
updateTexts();
}

function resetL5S1Row() {
  const buttons = [
    { element: buttonElementL5S1DD, texts: textsL5S1DD },
    { element: buttonElementL5S1MOD, texts: textsL5S1MOD },
    { element: buttonElementL5S1BH, texts: textsL5S1BH },
    { element: buttonElementL5S1HD, texts: textsL5S1HD },
    { element: buttonElementL5S1MIG, texts: textsL5S1MIG },
    { element: buttonElementL5S1FA, texts: textsL5S1FA },

    { element: buttonElementL5S1HERPF, texts: textsL5S1HERPF },
    { element: buttonElementL5S1HERPP, texts: textsL5S1HERPP },
    { element: buttonElementL5S1HERC, texts: textsL5S1HERC },
    { element: buttonElementL5S1HERLP, texts: textsL5S1HERLP },
    { element: buttonElementL5S1HERLF, texts: textsL5S1HERLF },

    { element: buttonElementL5S1PF, texts: textsL5S1PF },
    { element: buttonElementL5S1PR, texts: textsL5S1PR },
    { element: buttonElementL5S1PK, texts: textsL5S1PK },
    { element: buttonElementL5S1LR, texts: textsL5S1LR },
    { element: buttonElementL5S1LF, texts: textsL5S1LF }
  ];


  buttons.forEach(({ element, texts }) => {
    element.innerText = texts[0];
    element.style.backgroundColor = "white";
  });
  updateTexts();
}

//S1

function resetS1Row() {
  const buttons = [
    { element: buttonElementS1LES, texts: textsS1LES }
  ];

  buttons.forEach(({ element, texts }, index) => {
    element.innerText = texts[0];
    element.style.backgroundColor = "white";
    // Reset index variable to 0
    switch (index) {
      case 0: indexS1LES = 0; break;
    }
  });
updateTexts();
}


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

var indexOSA = 2;function cycleOSAText(event) {  indexOSA = cycleText(event, textsOSA, indexOSA, buttonElementOSA);}
var indexLORD = 1;function cycleLORDText(event) {  indexLORD = cycleText(event, textsLORD, indexLORD, buttonElementLORD);}

//L12
var indexL1KOM = 0;function cycleL1KOMText(event) {  indexL1KOM = cycleText(event, textsL1KOM, indexL1KOM, buttonElementL1KOM, updateBackgroundColor);}
var indexL1LES = 0;function cycleL1LESText(event) {  indexL1LES = cycleText(event, textsL1LES, indexL1LES, buttonElementL1LES, updateBackgroundColor);}
var indexL1LL = 0;function cycleL1LLText(event) {  indexL1LL = cycleText(event, textsL1LL, indexL1LL, buttonElementL1LL, updateBackgroundColor);}
var indexL1LISD = 0;function cycleL1LISDText(event) {  indexL1LISD = cycleText(event, textsL1LISD, indexL1LISD, buttonElementL1LISD);}
var indexL1SL = 0;function cycleL1SLText(event) {  indexL1SL = cycleText(event, textsL1SL, indexL1SL, buttonElementL1SL, updateBackgroundColor);}
var indexL12DD = 0;function cycleL12DDText(event) {  indexL12DD = cycleText(event, textsL12DD, indexL12DD, buttonElementL12DD, updateBackgroundColor);}
var indexL12MOD = 0;function cycleL12MODText(event) {  indexL12MOD = cycleText(event, textsL12MOD, indexL12MOD, buttonElementL12MOD, updateBackgroundColor);}
var indexL12BH = 0;function cycleL12BHText(event) {  indexL12BH = cycleText(event, textsL12BH, indexL12BH, buttonElementL12BH, updateBackgroundColor);}
var indexL12HD = 0;function cycleL12HDText(event) {  indexL12HD = cycleText(event, textsL12HD, indexL12HD, buttonElementL12HD);}
var indexL12FA = 0;function cycleL12FAText(event) {  indexL12FA = cycleText(event, textsL12FA, indexL12FA, buttonElementL12FA, updateBackgroundColor);}

var indexL12HERPF = 0;function cycleL12HERPFText(event) {  indexL12HERPF = cycleText(event, textsL12HERPF, indexL12HERPF, buttonElementL12HERPF, updateBackgroundColor);}
var indexL12HERPP = 0;function cycleL12HERPPText(event) {  indexL12HERPP = cycleText(event, textsL12HERPP, indexL12HERPP, buttonElementL12HERPP, updateBackgroundColor);}
var indexL12HERC = 0;function cycleL12HERCText(event) {  indexL12HERC = cycleText(event, textsL12HERC, indexL12HERC, buttonElementL12HERC, updateBackgroundColor);}
var indexL12HERLP = 0;function cycleL12HERLPText(event) {  indexL12HERLP = cycleText(event, textsL12HERLP, indexL12HERLP, buttonElementL12HERLP, updateBackgroundColor);}
var indexL12HERLF = 0;function cycleL12HERLFText(event) {  indexL12HERLF = cycleText(event, textsL12HERLF, indexL12HERLF, buttonElementL12HERLF, updateBackgroundColor);}
var indexL12MIG = 0;function cycleL12MIGText(event) {  indexL12MIG = cycleText(event, textsL12MIG, indexL12MIG, buttonElementL12MIG, updateBackgroundColor);}

var indexL12PF = 0;function cycleL12PFText(event) {  indexL12PF = cycleText(event, textsL12PF, indexL12PF, buttonElementL12PF, updateBackgroundColor);}
var indexL12PR = 0;function cycleL12PRText(event) {  indexL12PR = cycleText(event, textsL12PR, indexL12PR, buttonElementL12PR, updateBackgroundColor);}
var indexL12PK = 0;function cycleL12PKText(event) {  indexL12PK = cycleText(event, textsL12PK, indexL12PK, buttonElementL12PK, updateBackgroundColor);}
var indexL12LR = 0;function cycleL12LRText(event) {  indexL12LR = cycleText(event, textsL12LR, indexL12LR, buttonElementL12LR, updateBackgroundColor);}
var indexL12LF = 0;function cycleL12LFText(event) {  indexL12LF = cycleText(event, textsL12LF, indexL12LF, buttonElementL12LF, updateBackgroundColor);}

//L23
var indexL2KOM = 0;function cycleL2KOMText(event) {  indexL2KOM = cycleText(event, textsL2KOM, indexL2KOM, buttonElementL2KOM, updateBackgroundColor);}
var indexL2LES = 0;function cycleL2LESText(event) {  indexL2LES = cycleText(event, textsL2LES, indexL2LES, buttonElementL2LES, updateBackgroundColor);}
var indexL2LL = 0;function cycleL2LLText(event) {  indexL2LL = cycleText(event, textsL2LL, indexL2LL, buttonElementL2LL, updateBackgroundColor);}
var indexL2LISD = 0;function cycleL2LISDText(event) {  indexL2LISD = cycleText(event, textsL2LISD, indexL2LISD, buttonElementL2LISD);}
var indexL2SL = 0;function cycleL2SLText(event) {  indexL2SL = cycleText(event, textsL2SL, indexL2SL, buttonElementL2SL, updateBackgroundColor);}
var indexL23DD = 0;function cycleL23DDText(event) {  indexL23DD = cycleText(event, textsL23DD, indexL23DD, buttonElementL23DD, updateBackgroundColor);}
var indexL23MOD = 0;function cycleL23MODText(event) {  indexL23MOD = cycleText(event, textsL23MOD, indexL23MOD, buttonElementL23MOD, updateBackgroundColor);}
var indexL23BH = 0;function cycleL23BHText(event) {  indexL23BH = cycleText(event, textsL23BH, indexL23BH, buttonElementL23BH, updateBackgroundColor);}
var indexL23HD = 0;function cycleL23HDText(event) {  indexL23HD = cycleText(event, textsL23HD, indexL23HD, buttonElementL23HD);}
var indexL23FA = 0;function cycleL23FAText(event) {  indexL23FA = cycleText(event, textsL23FA, indexL23FA, buttonElementL23FA, updateBackgroundColor);}

var indexL23HERPF = 0;function cycleL23HERPFText(event) {  indexL23HERPF = cycleText(event, textsL23HERPF, indexL23HERPF, buttonElementL23HERPF, updateBackgroundColor);}
var indexL23HERPP = 0;function cycleL23HERPPText(event) {  indexL23HERPP = cycleText(event, textsL23HERPP, indexL23HERPP, buttonElementL23HERPP, updateBackgroundColor);}
var indexL23HERC = 0;function cycleL23HERCText(event) {  indexL23HERC = cycleText(event, textsL23HERC, indexL23HERC, buttonElementL23HERC, updateBackgroundColor);}
var indexL23HERLP = 0;function cycleL23HERLPText(event) {  indexL23HERLP = cycleText(event, textsL23HERLP, indexL23HERLP, buttonElementL23HERLP, updateBackgroundColor);}
var indexL23HERLF = 0;function cycleL23HERLFText(event) {  indexL23HERLF = cycleText(event, textsL23HERLF, indexL23HERLF, buttonElementL23HERLF, updateBackgroundColor);}
var indexL23MIG = 0;function cycleL23MIGText(event) {  indexL23MIG = cycleText(event, textsL23MIG, indexL23MIG, buttonElementL23MIG, updateBackgroundColor);}

var indexL23PF = 0;function cycleL23PFText(event) {  indexL23PF = cycleText(event, textsL23PF, indexL23PF, buttonElementL23PF, updateBackgroundColor);}
var indexL23PR = 0;function cycleL23PRText(event) {  indexL23PR = cycleText(event, textsL23PR, indexL23PR, buttonElementL23PR, updateBackgroundColor);}
var indexL23PK = 0;function cycleL23PKText(event) {  indexL23PK = cycleText(event, textsL23PK, indexL23PK, buttonElementL23PK, updateBackgroundColor);}
var indexL23LR = 0;function cycleL23LRText(event) {  indexL23LR = cycleText(event, textsL23LR, indexL23LR, buttonElementL23LR, updateBackgroundColor);}
var indexL23LF = 0;function cycleL23LFText(event) {  indexL23LF = cycleText(event, textsL23LF, indexL23LF, buttonElementL23LF, updateBackgroundColor);}

//L34
var indexL3KOM = 0;function cycleL3KOMText(event) {  indexL3KOM = cycleText(event, textsL3KOM, indexL3KOM, buttonElementL3KOM, updateBackgroundColor);}
var indexL3LES = 0;function cycleL3LESText(event) {  indexL3LES = cycleText(event, textsL3LES, indexL3LES, buttonElementL3LES, updateBackgroundColor);}
var indexL3LL = 0;function cycleL3LLText(event) {  indexL3LL = cycleText(event, textsL3LL, indexL3LL, buttonElementL3LL, updateBackgroundColor);}
var indexL3LISD = 0;function cycleL3LISDText(event) {  indexL3LISD = cycleText(event, textsL3LISD, indexL3LISD, buttonElementL3LISD);}
var indexL3SL = 0;function cycleL3SLText(event) {  indexL3SL = cycleText(event, textsL3SL, indexL3SL, buttonElementL3SL, updateBackgroundColor);}
var indexL34DD = 0;function cycleL34DDText(event) {  indexL34DD = cycleText(event, textsL34DD, indexL34DD, buttonElementL34DD, updateBackgroundColor);}
var indexL34MOD = 0;function cycleL34MODText(event) {  indexL34MOD = cycleText(event, textsL34MOD, indexL34MOD, buttonElementL34MOD, updateBackgroundColor);}
var indexL34BH = 0;function cycleL34BHText(event) {  indexL34BH = cycleText(event, textsL34BH, indexL34BH, buttonElementL34BH, updateBackgroundColor);}
var indexL34HD = 0;function cycleL34HDText(event) {  indexL34HD = cycleText(event, textsL34HD, indexL34HD, buttonElementL34HD);}
var indexL34FA = 0;function cycleL34FAText(event) {  indexL34FA = cycleText(event, textsL34FA, indexL34FA, buttonElementL34FA, updateBackgroundColor);}

var indexL34HERPF = 0;function cycleL34HERPFText(event) {  indexL34HERPF = cycleText(event, textsL34HERPF, indexL34HERPF, buttonElementL34HERPF, updateBackgroundColor);}
var indexL34HERPP = 0;function cycleL34HERPPText(event) {  indexL34HERPP = cycleText(event, textsL34HERPP, indexL34HERPP, buttonElementL34HERPP, updateBackgroundColor);}
var indexL34HERC = 0;function cycleL34HERCText(event) {  indexL34HERC = cycleText(event, textsL34HERC, indexL34HERC, buttonElementL34HERC, updateBackgroundColor);}
var indexL34HERLP = 0;function cycleL34HERLPText(event) {  indexL34HERLP = cycleText(event, textsL34HERLP, indexL34HERLP, buttonElementL34HERLP, updateBackgroundColor);}
var indexL34HERLF = 0;function cycleL34HERLFText(event) {  indexL34HERLF = cycleText(event, textsL34HERLF, indexL34HERLF, buttonElementL34HERLF, updateBackgroundColor);}
var indexL34MIG = 0;function cycleL34MIGText(event) {  indexL34MIG = cycleText(event, textsL34MIG, indexL34MIG, buttonElementL34MIG, updateBackgroundColor);}

var indexL34PF = 0;function cycleL34PFText(event) {  indexL34PF = cycleText(event, textsL34PF, indexL34PF, buttonElementL34PF, updateBackgroundColor);}
var indexL34PR = 0;function cycleL34PRText(event) {  indexL34PR = cycleText(event, textsL34PR, indexL34PR, buttonElementL34PR, updateBackgroundColor);}
var indexL34PK = 0;function cycleL34PKText(event) {  indexL34PK = cycleText(event, textsL34PK, indexL34PK, buttonElementL34PK, updateBackgroundColor);}
var indexL34LR = 0;function cycleL34LRText(event) {  indexL34LR = cycleText(event, textsL34LR, indexL34LR, buttonElementL34LR, updateBackgroundColor);}
var indexL34LF = 0;function cycleL34LFText(event) {  indexL34LF = cycleText(event, textsL34LF, indexL34LF, buttonElementL34LF, updateBackgroundColor);}

//L45
var indexL4KOM = 0;function cycleL4KOMText(event) {  indexL4KOM = cycleText(event, textsL4KOM, indexL4KOM, buttonElementL4KOM, updateBackgroundColor);}
var indexL4LES = 0;function cycleL4LESText(event) {  indexL4LES = cycleText(event, textsL4LES, indexL4LES, buttonElementL4LES, updateBackgroundColor);}
var indexL4LL = 0;function cycleL4LLText(event) {  indexL4LL = cycleText(event, textsL4LL, indexL4LL, buttonElementL4LL, updateBackgroundColor);}
var indexL4LISD = 0;function cycleL4LISDText(event) {  indexL4LISD = cycleText(event, textsL4LISD, indexL4LISD, buttonElementL4LISD);}
var indexL4SL = 0;function cycleL4SLText(event) {  indexL4SL = cycleText(event, textsL4SL, indexL4SL, buttonElementL4SL, updateBackgroundColor);}
var indexL45DD = 0;function cycleL45DDText(event) {  indexL45DD = cycleText(event, textsL45DD, indexL45DD, buttonElementL45DD, updateBackgroundColor);}
var indexL45MOD = 0;function cycleL45MODText(event) {  indexL45MOD = cycleText(event, textsL45MOD, indexL45MOD, buttonElementL45MOD, updateBackgroundColor);}
var indexL45BH = 0;function cycleL45BHText(event) {  indexL45BH = cycleText(event, textsL45BH, indexL45BH, buttonElementL45BH, updateBackgroundColor);}
var indexL45HD = 0;function cycleL45HDText(event) {  indexL45HD = cycleText(event, textsL45HD, indexL45HD, buttonElementL45HD);}
var indexL45FA = 0;function cycleL45FAText(event) {  indexL45FA = cycleText(event, textsL45FA, indexL45FA, buttonElementL45FA, updateBackgroundColor);}

var indexL45HERPF = 0;function cycleL45HERPFText(event) {  indexL45HERPF = cycleText(event, textsL45HERPF, indexL45HERPF, buttonElementL45HERPF, updateBackgroundColor);}
var indexL45HERPP = 0;function cycleL45HERPPText(event) {  indexL45HERPP = cycleText(event, textsL45HERPP, indexL45HERPP, buttonElementL45HERPP, updateBackgroundColor);}
var indexL45HERC = 0;function cycleL45HERCText(event) {  indexL45HERC = cycleText(event, textsL45HERC, indexL45HERC, buttonElementL45HERC, updateBackgroundColor);}
var indexL45HERLP = 0;function cycleL45HERLPText(event) {  indexL45HERLP = cycleText(event, textsL45HERLP, indexL45HERLP, buttonElementL45HERLP, updateBackgroundColor);}
var indexL45HERLF = 0;function cycleL45HERLFText(event) {  indexL45HERLF = cycleText(event, textsL45HERLF, indexL45HERLF, buttonElementL45HERLF, updateBackgroundColor);}
var indexL45MIG = 0;function cycleL45MIGText(event) {  indexL45MIG = cycleText(event, textsL45MIG, indexL45MIG, buttonElementL45MIG, updateBackgroundColor);}

var indexL45PF = 0;function cycleL45PFText(event) {  indexL45PF = cycleText(event, textsL45PF, indexL45PF, buttonElementL45PF, updateBackgroundColor);}
var indexL45PR = 0;function cycleL45PRText(event) {  indexL45PR = cycleText(event, textsL45PR, indexL45PR, buttonElementL45PR, updateBackgroundColor);}
var indexL45PK = 0;function cycleL45PKText(event) {  indexL45PK = cycleText(event, textsL45PK, indexL45PK, buttonElementL45PK, updateBackgroundColor);}
var indexL45LR = 0;function cycleL45LRText(event) {  indexL45LR = cycleText(event, textsL45LR, indexL45LR, buttonElementL45LR, updateBackgroundColor);}
var indexL45LF = 0;function cycleL45LFText(event) {  indexL45LF = cycleText(event, textsL45LF, indexL45LF, buttonElementL45LF, updateBackgroundColor);}

//L5S1
var indexL5KOM = 0;function cycleL5KOMText(event) {  indexL5KOM = cycleText(event, textsL5KOM, indexL5KOM, buttonElementL5KOM, updateBackgroundColor);}
var indexL5LES = 0;function cycleL5LESText(event) {  indexL5LES = cycleText(event, textsL5LES, indexL5LES, buttonElementL5LES, updateBackgroundColor);}
var indexL5LL = 0;function cycleL5LLText(event) {  indexL5LL = cycleText(event, textsL5LL, indexL5LL, buttonElementL5LL, updateBackgroundColor);}
var indexL5LISD = 0;function cycleL5LISDText(event) {  indexL5LISD = cycleText(event, textsL5LISD, indexL5LISD, buttonElementL5LISD);}
var indexL5SL = 0;function cycleL5SLText(event) {  indexL5SL = cycleText(event, textsL5SL, indexL5SL, buttonElementL5SL, updateBackgroundColor);}
var indexL5S1DD = 0;function cycleL5S1DDText(event) {  indexL5S1DD = cycleText(event, textsL5S1DD, indexL5S1DD, buttonElementL5S1DD, updateBackgroundColor);}
var indexL5S1MOD = 0;function cycleL5S1MODText(event) {  indexL5S1MOD = cycleText(event, textsL5S1MOD, indexL5S1MOD, buttonElementL5S1MOD, updateBackgroundColor);}
var indexL5S1BH = 0;function cycleL5S1BHText(event) {  indexL5S1BH = cycleText(event, textsL5S1BH, indexL5S1BH, buttonElementL5S1BH, updateBackgroundColor);}
var indexL5S1HD = 0;function cycleL5S1HDText(event) {  indexL5S1HD = cycleText(event, textsL5S1HD, indexL5S1HD, buttonElementL5S1HD);}
var indexL5S1FA = 0;function cycleL5S1FAText(event) {  indexL5S1FA = cycleText(event, textsL5S1FA, indexL5S1FA, buttonElementL5S1FA, updateBackgroundColor);}

var indexL5S1HERPF = 0;function cycleL5S1HERPFText(event) {  indexL5S1HERPF = cycleText(event, textsL5S1HERPF, indexL5S1HERPF, buttonElementL5S1HERPF, updateBackgroundColor);}
var indexL5S1HERPP = 0;function cycleL5S1HERPPText(event) {  indexL5S1HERPP = cycleText(event, textsL5S1HERPP, indexL5S1HERPP, buttonElementL5S1HERPP, updateBackgroundColor);}
var indexL5S1HERC = 0;function cycleL5S1HERCText(event) {  indexL5S1HERC = cycleText(event, textsL5S1HERC, indexL5S1HERC, buttonElementL5S1HERC, updateBackgroundColor);}
var indexL5S1HERLP = 0;function cycleL5S1HERLPText(event) {  indexL5S1HERLP = cycleText(event, textsL5S1HERLP, indexL5S1HERLP, buttonElementL5S1HERLP, updateBackgroundColor);}
var indexL5S1HERLF = 0;function cycleL5S1HERLFText(event) {  indexL5S1HERLF = cycleText(event, textsL5S1HERLF, indexL5S1HERLF, buttonElementL5S1HERLF, updateBackgroundColor);}
var indexL5S1MIG = 0;function cycleL5S1MIGText(event) {  indexL5S1MIG = cycleText(event, textsL5S1MIG, indexL5S1MIG, buttonElementL5S1MIG, updateBackgroundColor);}

var indexL5S1PF = 0;function cycleL5S1PFText(event) {  indexL5S1PF = cycleText(event, textsL5S1PF, indexL5S1PF, buttonElementL5S1PF, updateBackgroundColor);}
var indexL5S1PR = 0;function cycleL5S1PRText(event) {  indexL5S1PR = cycleText(event, textsL5S1PR, indexL5S1PR, buttonElementL5S1PR, updateBackgroundColor);}
var indexL5S1PK = 0;function cycleL5S1PKText(event) {  indexL5S1PK = cycleText(event, textsL5S1PK, indexL5S1PK, buttonElementL5S1PK, updateBackgroundColor);}
var indexL5S1LR = 0;function cycleL5S1LRText(event) {  indexL5S1LR = cycleText(event, textsL5S1LR, indexL5S1LR, buttonElementL5S1LR, updateBackgroundColor);}
var indexL5S1LF = 0;function cycleL5S1LFText(event) {  indexL5S1LF = cycleText(event, textsL5S1LF, indexL5S1LF, buttonElementL5S1LF, updateBackgroundColor);}


//S1
var indexS1LES = 0;function cycleS1LESText(event) {  indexS1LES = cycleText(event, textsS1LES, indexS1LES, buttonElementS1LES, updateBackgroundColor);}



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
