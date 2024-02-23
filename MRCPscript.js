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

//C34
var textsC3KOM = ["není", "schmorl", "horní", "klínovitá", "výrazná"];
var textsC3LES = ["není", "hemangiom", "atyp hem", "lytické", "sklerotické"];
var textsC3CC = ["není", "ventro", "dorzo"];
var textsC3LISD = ["1 mm", "2 mm", "3 mm", "4 mm", "5 mm", "6 mm", "7 mm", "8 mm", "9 mm", "10 mm"];
var textsC3SL = ["nelýza", "lýza"];
var textsC34DD = ["není", "mírná", "střední", "těžká"];
var textsC34MOD = ["není", "I", "II", "III"];
var textsC34BH = ["není", "bulging", "herniace", "osteofyty", "kombinace"];
var textsC34HD = ["1 mm", "2 mm", "3 mm", "4 mm", "5 mm", "6 mm", "7 mm", "8 mm", "9 mm", "10 mm"];
var textsC34FA = ["není", "mírná", "střední", "těžká", "edém"];

var textsC34HERPF = ["F", "+"];
var textsC34HERPP = ["P", "+"];
var textsC34HERC = ["C", "+"];
var textsC34HERLP = ["P", "+"];
var textsC34HERLF = ["F", "+"];
var textsC34MIG = ["M0", "M▲", "M▼"];

var textsC34PF = ["0", "1", "2", "3"];
var textsC34PR = ["0", "1", "2", "3"];
var textsC34PK = ["0", "1", "2", "3"];
var textsC34LR = ["0", "1", "2", "3"];
var textsC34LF = ["0", "1", "2", "3"];

var buttonElementC3KOM = document.getElementById("myC3KOMButton");
var buttonElementC3LES = document.getElementById("myC3LESButton");

var buttonElementC3CC = document.getElementById("myC3CCButton");
var buttonElementC3LISD = document.getElementById("myC3LISDButton");
var buttonElementC3SL = document.getElementById("myC3SLButton");

var buttonElementC34DD = document.getElementById("myC34DDButton");
var buttonElementC34MOD = document.getElementById("myC34MODButton");
var buttonElementC34BH = document.getElementById("myC34BHButton");
var buttonElementC34HD = document.getElementById("myC34HDButton");
var buttonElementC34FA = document.getElementById("myC34FAButton");

var buttonElementC34HERPF = document.getElementById("myC34HERPFButton");
var buttonElementC34HERPP = document.getElementById("myC34HERPPButton");
var buttonElementC34HERC = document.getElementById("myC34HERCButton");
var buttonElementC34HERLP = document.getElementById("myC34HERLPButton");
var buttonElementC34HERLF = document.getElementById("myC34HERLFButton");
var buttonElementC34MIG = document.getElementById("myC34MIGButton");

var buttonElementC34PF = document.getElementById("myC34PFButton");
var buttonElementC34PR = document.getElementById("myC34PRButton");
var buttonElementC34PK = document.getElementById("myC34PKButton");
var buttonElementC34LR = document.getElementById("myC34LRButton");
var buttonElementC34LF = document.getElementById("myC34LFButton");

//C45
var textsC4KOM = ["není", "schmorl", "horní", "klínovitá", "výrazná"];
var textsC4LES = ["není", "hemangiom", "atyp hem", "lytické", "sklerotické"];
var textsC4CC = ["není", "ventro", "dorzo"];
var textsC4LISD = ["1 mm", "2 mm", "3 mm", "4 mm", "5 mm", "6 mm", "7 mm", "8 mm", "9 mm", "10 mm"];
var textsC4SL = ["nelýza", "lýza"];
var textsC45DD = ["není", "mírná", "střední", "těžká"];
var textsC45MOD = ["není", "I", "II", "III"];
var textsC45BH = ["není", "bulging", "herniace", "osteofyty", "kombinace"];
var textsC45HD = ["1 mm", "2 mm", "3 mm", "4 mm", "5 mm", "6 mm", "7 mm", "8 mm", "9 mm", "10 mm"];
var textsC45FA = ["není", "mírná", "střední", "těžká", "edém"];

var textsC45HERPF = ["F", "+"];
var textsC45HERPP = ["P", "+"];
var textsC45HERC = ["C", "+"];
var textsC45HERLP = ["P", "+"];
var textsC45HERLF = ["F", "+"];
var textsC45MIG = ["M0", "M▲", "M▼"];

var textsC45PF = ["0", "1", "2", "3"];
var textsC45PR = ["0", "1", "2", "3"];
var textsC45PK = ["0", "1", "2", "3"];
var textsC45LR = ["0", "1", "2", "3"];
var textsC45LF = ["0", "1", "2", "3"];


var buttonElementC4KOM = document.getElementById("myC4KOMButton");
var buttonElementC4LES = document.getElementById("myC4LESButton");

var buttonElementC4CC = document.getElementById("myC4CCButton");
var buttonElementC4LISD = document.getElementById("myC4LISDButton");
var buttonElementC4SL = document.getElementById("myC4SLButton");

var buttonElementC45DD = document.getElementById("myC45DDButton");
var buttonElementC45MOD = document.getElementById("myC45MODButton");
var buttonElementC45BH = document.getElementById("myC45BHButton");
var buttonElementC45HD = document.getElementById("myC45HDButton");
var buttonElementC45FA = document.getElementById("myC45FAButton");

var buttonElementC45HERPF = document.getElementById("myC45HERPFButton");
var buttonElementC45HERPP = document.getElementById("myC45HERPPButton");
var buttonElementC45HERC = document.getElementById("myC45HERCButton");
var buttonElementC45HERLP = document.getElementById("myC45HERLPButton");
var buttonElementC45HERLF = document.getElementById("myC45HERLFButton");
var buttonElementC45MIG = document.getElementById("myC45MIGButton");

var buttonElementC45PF = document.getElementById("myC45PFButton");
var buttonElementC45PR = document.getElementById("myC45PRButton");
var buttonElementC45PK = document.getElementById("myC45PKButton");
var buttonElementC45LR = document.getElementById("myC45LRButton");
var buttonElementC45LF = document.getElementById("myC45LFButton");

//C56
var textsC5KOM = ["není", "schmorl", "horní", "klínovitá", "výrazná"];
var textsC5LES = ["není", "hemangiom", "atyp hem", "lytické", "sklerotické"];
var textsC5CC = ["není", "ventro", "dorzo"];
var textsC5LISD = ["1 mm", "2 mm", "3 mm", "4 mm", "5 mm", "6 mm", "7 mm", "8 mm", "9 mm", "10 mm"];
var textsC5SL = ["nelýza", "lýza"];
var textsC56DD = ["není", "mírná", "střední", "těžká"];
var textsC56MOD = ["není", "I", "II", "III"];
var textsC56BH = ["není", "bulging", "herniace", "osteofyty", "kombinace"];
var textsC56HD = ["1 mm", "2 mm", "3 mm", "4 mm", "5 mm", "6 mm", "7 mm", "8 mm", "9 mm", "10 mm"];
var textsC56FA = ["není", "mírná", "střední", "těžká", "edém"];

var textsC56HERPF = ["F", "+"];
var textsC56HERPP = ["P", "+"];
var textsC56HERC = ["C", "+"];
var textsC56HERLP = ["P", "+"];
var textsC56HERLF = ["F", "+"];
var textsC56MIG = ["M0", "M▲", "M▼"];

var textsC56PF = ["0", "1", "2", "3"];
var textsC56PR = ["0", "1", "2", "3"];
var textsC56PK = ["0", "1", "2", "3"];
var textsC56LR = ["0", "1", "2", "3"];
var textsC56LF = ["0", "1", "2", "3"];


var buttonElementC5KOM = document.getElementById("myC5KOMButton");
var buttonElementC5LES = document.getElementById("myC5LESButton");

var buttonElementC5CC = document.getElementById("myC5CCButton");
var buttonElementC5LISD = document.getElementById("myC5LISDButton");
var buttonElementC5SL = document.getElementById("myC5SLButton");

var buttonElementC56DD = document.getElementById("myC56DDButton");
var buttonElementC56MOD = document.getElementById("myC56MODButton");
var buttonElementC56BH = document.getElementById("myC56BHButton");
var buttonElementC56HD = document.getElementById("myC56HDButton");
var buttonElementC56FA = document.getElementById("myC56FAButton");

var buttonElementC56HERPF = document.getElementById("myC56HERPFButton");
var buttonElementC56HERPP = document.getElementById("myC56HERPPButton");
var buttonElementC56HERC = document.getElementById("myC56HERCButton");
var buttonElementC56HERLP = document.getElementById("myC56HERLPButton");
var buttonElementC56HERLF = document.getElementById("myC56HERLFButton");
var buttonElementC56MIG = document.getElementById("myC56MIGButton");

var buttonElementC56PF = document.getElementById("myC56PFButton");
var buttonElementC56PR = document.getElementById("myC56PRButton");
var buttonElementC56PK = document.getElementById("myC56PKButton");
var buttonElementC56LR = document.getElementById("myC56LRButton");
var buttonElementC56LF = document.getElementById("myC56LFButton");

//C67
var textsC6KOM = ["není", "schmorl", "horní", "klínovitá", "výrazná"];
var textsC6LES = ["není", "hemangiom", "atyp hem", "lytické", "sklerotické"];
var textsC6CC = ["není", "ventro", "dorzo"];
var textsC6LISD = ["1 mm", "2 mm", "3 mm", "4 mm", "5 mm", "6 mm", "7 mm", "8 mm", "9 mm", "10 mm"];
var textsC6SL = ["nelýza", "lýza"];
var textsC67DD = ["není", "mírná", "střední", "těžká"];
var textsC67MOD = ["není", "I", "II", "III"];
var textsC67BH = ["není", "bulging", "herniace", "osteofyty", "kombinace"];
var textsC67HD = ["1 mm", "2 mm", "3 mm", "4 mm", "5 mm", "6 mm", "7 mm", "8 mm", "9 mm", "10 mm"];
var textsC67FA = ["není", "mírná", "střední", "těžká", "edém"];

var textsC67HERPF = ["F", "+"];
var textsC67HERPP = ["P", "+"];
var textsC67HERC = ["C", "+"];
var textsC67HERLP = ["P", "+"];
var textsC67HERLF = ["F", "+"];
var textsC67MIG = ["M0", "M▲", "M▼"];

var textsC67PF = ["0", "1", "2", "3"];
var textsC67PR = ["0", "1", "2", "3"];
var textsC67PK = ["0", "1", "2", "3"];
var textsC67LR = ["0", "1", "2", "3"];
var textsC67LF = ["0", "1", "2", "3"];


var buttonElementC6KOM = document.getElementById("myC6KOMButton");
var buttonElementC6LES = document.getElementById("myC6LESButton");

var buttonElementC6CC = document.getElementById("myC6CCButton");
var buttonElementC6LISD = document.getElementById("myC6LISDButton");
var buttonElementC6SL = document.getElementById("myC6SLButton");

var buttonElementC67DD = document.getElementById("myC67DDButton");
var buttonElementC67MOD = document.getElementById("myC67MODButton");
var buttonElementC67BH = document.getElementById("myC67BHButton");
var buttonElementC67HD = document.getElementById("myC67HDButton");
var buttonElementC67FA = document.getElementById("myC67FAButton");

var buttonElementC67HERPF = document.getElementById("myC67HERPFButton");
var buttonElementC67HERPP = document.getElementById("myC67HERPPButton");
var buttonElementC67HERC = document.getElementById("myC67HERCButton");
var buttonElementC67HERLP = document.getElementById("myC67HERLPButton");
var buttonElementC67HERLF = document.getElementById("myC67HERLFButton");
var buttonElementC67MIG = document.getElementById("myC67MIGButton");

var buttonElementC67PF = document.getElementById("myC67PFButton");
var buttonElementC67PR = document.getElementById("myC67PRButton");
var buttonElementC67PK = document.getElementById("myC67PKButton");
var buttonElementC67LR = document.getElementById("myC67LRButton");
var buttonElementC67LF = document.getElementById("myC67LFButton");

//C7T1
var textsC7KOM = ["není", "schmorl", "horní", "klínovitá", "výrazná"];
var textsC7LES = ["není", "hemangiom", "atyp hem", "lytické", "sklerotické"];
var textsC7CC = ["není", "ventro", "dorzo"];
var textsC7LISD = ["1 mm", "2 mm", "3 mm", "4 mm", "5 mm", "6 mm", "7 mm", "8 mm", "9 mm", "10 mm"];
var textsC7SL = ["nelýza", "lýza"];
var textsC7T1DD = ["není", "mírná", "střední", "těžká"];
var textsC7T1MOD = ["není", "I", "II", "III"];
var textsC7T1BH = ["není", "bulging", "herniace", "osteofyty", "kombinace"];
var textsC7T1HD = ["1 mm", "2 mm", "3 mm", "4 mm", "5 mm", "6 mm", "7 mm", "8 mm", "9 mm", "10 mm"];
var textsC7T1FA = ["není", "mírná", "střední", "těžká", "edém"];

var textsC7T1HERPF = ["F", "+"];
var textsC7T1HERPP = ["P", "+"];
var textsC7T1HERC = ["C", "+"];
var textsC7T1HERLP = ["P", "+"];
var textsC7T1HERLF = ["F", "+"];
var textsC7T1MIG = ["M0", "M▲", "M▼"];

var textsC7T1PF = ["0", "1", "2", "3"];
var textsC7T1PR = ["0", "1", "2", "3"];
var textsC7T1PK = ["0", "1", "2", "3"];
var textsC7T1LR = ["0", "1", "2", "3"];
var textsC7T1LF = ["0", "1", "2", "3"];


var buttonElementC7KOM = document.getElementById("myC7KOMButton");
var buttonElementC7LES = document.getElementById("myC7LESButton");

var buttonElementC7CC = document.getElementById("myC7CCButton");
var buttonElementC7LISD = document.getElementById("myC7LISDButton");
var buttonElementC7SL = document.getElementById("myC7SLButton");

var buttonElementC7T1DD = document.getElementById("myC7T1DDButton");
var buttonElementC7T1MOD = document.getElementById("myC7T1MODButton");
var buttonElementC7T1BH = document.getElementById("myC7T1BHButton");
var buttonElementC7T1HD = document.getElementById("myC7T1HDButton");
var buttonElementC7T1FA = document.getElementById("myC7T1FAButton");

var buttonElementC7T1HERPF = document.getElementById("myC7T1HERPFButton");
var buttonElementC7T1HERPP = document.getElementById("myC7T1HERPPButton");
var buttonElementC7T1HERC = document.getElementById("myC7T1HERCButton");
var buttonElementC7T1HERLP = document.getElementById("myC7T1HERLPButton");
var buttonElementC7T1HERLF = document.getElementById("myC7T1HERLFButton");
var buttonElementC7T1MIG = document.getElementById("myC7T1MIGButton");

var buttonElementC7T1PF = document.getElementById("myC7T1PFButton");
var buttonElementC7T1PR = document.getElementById("myC7T1PRButton");
var buttonElementC7T1PK = document.getElementById("myC7T1PKButton");
var buttonElementC7T1LR = document.getElementById("myC7T1LRButton");
var buttonElementC7T1LF = document.getElementById("myC7T1LFButton");


//T1
var textsT1LES = ["není", "hemangiom", "atyp hem", "lytické", "sklerotické"];

var buttonElementT1LES = document.getElementById("myT1LESButton");


// HIDING BUTTONS

buttonElementC3CC.addEventListener("mousedown", function() {
  if (buttonElementC3CC.innerText !== "není") {
    buttonElementC3LISD.style.display = "block";
    buttonElementC3SL.style.display = "block";
  } else {
    buttonElementC3LISD.style.display = "none";
    buttonElementC3SL.style.display = "none";
  }
});

buttonElementC34BH.addEventListener("mousedown", function() {
  if (buttonElementC34BH.innerText !== "není") {
    buttonElementC34HD.style.display = "block";
    buttonElementC34HERPF.style.display = "inline-block";
    buttonElementC34HERPP.style.display = "inline-block";
    buttonElementC34HERC.style.display = "inline-block";
    buttonElementC34HERLP.style.display = "inline-block";
    buttonElementC34HERLF.style.display = "inline-block";
    buttonElementC34MIG.style.display = "inline-block";
  } else {
    buttonElementC34HD.style.display = "none";
    buttonElementC34HERPF.style.display = "none";
    buttonElementC34HERPP.style.display = "none";
    buttonElementC34HERC.style.display = "none";
    buttonElementC34HERLP.style.display = "none";
    buttonElementC34HERLF.style.display = "none";
    buttonElementC34MIG.style.display = "none";
  }
});

//C45
buttonElementC4CC.addEventListener("mousedown", function() {
  if (buttonElementC4CC.innerText !== "není") {
    buttonElementC4LISD.style.display = "block";
    buttonElementC4SL.style.display = "block";
  } else {
    buttonElementC4LISD.style.display = "none";
    buttonElementC4SL.style.display = "none";
  }
});

buttonElementC45BH.addEventListener("mousedown", function() {
  if (buttonElementC45BH.innerText !== "není") {
    buttonElementC45HD.style.display = "block";
    buttonElementC45HERPF.style.display = "inline-block";
    buttonElementC45HERPP.style.display = "inline-block";
    buttonElementC45HERC.style.display = "inline-block";
    buttonElementC45HERLP.style.display = "inline-block";
    buttonElementC45HERLF.style.display = "inline-block";
    buttonElementC45MIG.style.display = "inline-block";
  } else {
    buttonElementC45HD.style.display = "none";
    buttonElementC45HERPF.style.display = "none";
    buttonElementC45HERPP.style.display = "none";
    buttonElementC45HERC.style.display = "none";
    buttonElementC45HERLP.style.display = "none";
    buttonElementC45HERLF.style.display = "none";
    buttonElementC45MIG.style.display = "none";
  }
});

//C56
buttonElementC5CC.addEventListener("mousedown", function() {
  if (buttonElementC5CC.innerText !== "není") {
    buttonElementC5LISD.style.display = "block";
    buttonElementC5SL.style.display = "block";
  } else {
    buttonElementC5LISD.style.display = "none";
    buttonElementC5SL.style.display = "none";
  }
});

buttonElementC56BH.addEventListener("mousedown", function() {
  if (buttonElementC56BH.innerText !== "není") {
    buttonElementC56HD.style.display = "block";
    buttonElementC56HERPF.style.display = "inline-block";
    buttonElementC56HERPP.style.display = "inline-block";
    buttonElementC56HERC.style.display = "inline-block";
    buttonElementC56HERLP.style.display = "inline-block";
    buttonElementC56HERLF.style.display = "inline-block";
    buttonElementC56MIG.style.display = "inline-block";
  } else {
    buttonElementC56HD.style.display = "none";
    buttonElementC56HERPF.style.display = "none";
    buttonElementC56HERPP.style.display = "none";
    buttonElementC56HERC.style.display = "none";
    buttonElementC56HERLP.style.display = "none";
    buttonElementC56HERLF.style.display = "none";
    buttonElementC56MIG.style.display = "none";
  }
});

//C67
buttonElementC6CC.addEventListener("mousedown", function() {
  if (buttonElementC6CC.innerText !== "není") {
    buttonElementC6LISD.style.display = "block";
    buttonElementC6SL.style.display = "block";
  } else {
    buttonElementC6LISD.style.display = "none";
    buttonElementC6SL.style.display = "none";
  }
});

buttonElementC67BH.addEventListener("mousedown", function() {
  if (buttonElementC67BH.innerText !== "není") {
    buttonElementC67HD.style.display = "block";
    buttonElementC67HERPF.style.display = "inline-block";
    buttonElementC67HERPP.style.display = "inline-block";
    buttonElementC67HERC.style.display = "inline-block";
    buttonElementC67HERLP.style.display = "inline-block";
    buttonElementC67HERLF.style.display = "inline-block";
    buttonElementC67MIG.style.display = "inline-block";
  } else {
    buttonElementC67HD.style.display = "none";
    buttonElementC67HERPF.style.display = "none";
    buttonElementC67HERPP.style.display = "none";
    buttonElementC67HERC.style.display = "none";
    buttonElementC67HERLP.style.display = "none";
    buttonElementC67HERLF.style.display = "none";
    buttonElementC67MIG.style.display = "none";
  }
});

//C7T1
buttonElementC7CC.addEventListener("mousedown", function() {
  if (buttonElementC7CC.innerText !== "není") {
    buttonElementC7LISD.style.display = "block";
    buttonElementC7SL.style.display = "block";
  } else {
    buttonElementC7LISD.style.display = "none";
    buttonElementC7SL.style.display = "none";
  }
});

buttonElementC7T1BH.addEventListener("mousedown", function() {
  if (buttonElementC7T1BH.innerText !== "není") {
    buttonElementC7T1HD.style.display = "block";
    buttonElementC7T1HERPF.style.display = "inline-block";
    buttonElementC7T1HERPP.style.display = "inline-block";
    buttonElementC7T1HERC.style.display = "inline-block";
    buttonElementC7T1HERLP.style.display = "inline-block";
    buttonElementC7T1HERLF.style.display = "inline-block";
    buttonElementC7T1MIG.style.display = "inline-block";
  } else {
    buttonElementC7T1HD.style.display = "none";
    buttonElementC7T1HERPF.style.display = "none";
    buttonElementC7T1HERPP.style.display = "none";
    buttonElementC7T1HERC.style.display = "none";
    buttonElementC7T1HERLP.style.display = "none";
    buttonElementC7T1HERLF.style.display = "none";
    buttonElementC7T1MIG.style.display = "none";
  }
});

// RESETS
function resetC3Row() {
  const buttons = [
    { element: buttonElementC3CC, texts: textsC3CC },
    { element: buttonElementC3LISD, texts: textsC3LISD },
    { element: buttonElementC3SL, texts: textsC3SL },
    { element: buttonElementC3KOM, texts: textsC3KOM },
    { element: buttonElementC3LES, texts: textsC3LES }
  ];

  buttons.forEach(({ element, texts }, index) => {
    element.innerText = texts[0];
	element.style.backgroundColor = "white";
    
    // Reset index variable to 0
    switch (index) {
      case 0: indexC3CC = 0; break;
      case 1: indexC3LISD = 0; break;
      case 2: indexC3SL = 0; break;
      case 3: indexC3KOM = 0; break;
      case 5: indexC3LES = 0; break;
    }
  });
updateTexts();
}

function resetC34Row() {
  const buttons = [
    { element: buttonElementC34DD, texts: textsC34DD },
    { element: buttonElementC34MOD, texts: textsC34MOD },
    { element: buttonElementC34BH, texts: textsC34BH },
    { element: buttonElementC34HD, texts: textsC34HD },
    { element: buttonElementC34MIG, texts: textsC34MIG },
    { element: buttonElementC34FA, texts: textsC34FA },

    { element: buttonElementC34HERPF, texts: textsC34HERPF },
    { element: buttonElementC34HERPP, texts: textsC34HERPP },
    { element: buttonElementC34HERC, texts: textsC34HERC },
    { element: buttonElementC34HERLP, texts: textsC34HERLP },
    { element: buttonElementC34HERLF, texts: textsC34HERLF },

    { element: buttonElementC34PF, texts: textsC34PF },
    { element: buttonElementC34PR, texts: textsC34PR },
    { element: buttonElementC34PK, texts: textsC34PK },
    { element: buttonElementC34LR, texts: textsC34LR },
    { element: buttonElementC34LF, texts: textsC34LF }
  ];


  buttons.forEach(({ element, texts }) => {
    element.innerText = texts[0];
    element.style.backgroundColor = "white";
  });
  updateTexts();
}

function resetC4Row() {
  const buttons = [
    { element: buttonElementC4CC, texts: textsC4CC },
    { element: buttonElementC4LISD, texts: textsC4LISD },
    { element: buttonElementC4SL, texts: textsC4SL },
    { element: buttonElementC4KOM, texts: textsC4KOM },
    { element: buttonElementC4LES, texts: textsC4LES }
  ];

  buttons.forEach(({ element, texts }, index) => {
    element.innerText = texts[0];
    element.style.backgroundColor = "white";
    // Reset index variable to 0
    switch (index) {
      case 0: indexC4CC = 0; break;
      case 1: indexC4LISD = 0; break;
      case 2: indexC4SL = 0; break;
      case 3: indexC4KOM = 0; break;
      case 5: indexC4LES = 0; break;
    }
  });
updateTexts();
}

function resetC45Row() {
  const buttons = [
    { element: buttonElementC45DD, texts: textsC45DD },
    { element: buttonElementC45MOD, texts: textsC45MOD },
    { element: buttonElementC45BH, texts: textsC45BH },
    { element: buttonElementC45HD, texts: textsC45HD },
    { element: buttonElementC45MIG, texts: textsC45MIG },
    { element: buttonElementC45FA, texts: textsC45FA },

    { element: buttonElementC45HERPF, texts: textsC45HERPF },
    { element: buttonElementC45HERPP, texts: textsC45HERPP },
    { element: buttonElementC45HERC, texts: textsC45HERC },
    { element: buttonElementC45HERLP, texts: textsC45HERLP },
    { element: buttonElementC45HERLF, texts: textsC45HERLF },

    { element: buttonElementC45PF, texts: textsC45PF },
    { element: buttonElementC45PR, texts: textsC45PR },
    { element: buttonElementC45PK, texts: textsC45PK },
    { element: buttonElementC45LR, texts: textsC45LR },
    { element: buttonElementC45LF, texts: textsC45LF }
  ];


  buttons.forEach(({ element, texts }) => {
    element.innerText = texts[0];
    element.style.backgroundColor = "white";
  });
  updateTexts();
}

//C56
function resetC5Row() {
  const buttons = [
    { element: buttonElementC5CC, texts: textsC5CC },
    { element: buttonElementC5LISD, texts: textsC5LISD },
    { element: buttonElementC5SL, texts: textsC5SL },
    { element: buttonElementC5KOM, texts: textsC5KOM },
    { element: buttonElementC5LES, texts: textsC5LES }
  ];

  buttons.forEach(({ element, texts }, index) => {
    element.innerText = texts[0];
    element.style.backgroundColor = "white";
    // Reset index variable to 0
    switch (index) {
      case 0: indexC5CC = 0; break;
      case 1: indexC5LISD = 0; break;
      case 2: indexC5SL = 0; break;
      case 3: indexC5KOM = 0; break;
      case 5: indexC5LES = 0; break;
    }
  });
updateTexts();
}

function resetC56Row() {
  const buttons = [
    { element: buttonElementC56DD, texts: textsC56DD },
    { element: buttonElementC56MOD, texts: textsC56MOD },
    { element: buttonElementC56BH, texts: textsC56BH },
    { element: buttonElementC56HD, texts: textsC56HD },
    { element: buttonElementC56MIG, texts: textsC56MIG },
    { element: buttonElementC56FA, texts: textsC56FA },

    { element: buttonElementC56HERPF, texts: textsC56HERPF },
    { element: buttonElementC56HERPP, texts: textsC56HERPP },
    { element: buttonElementC56HERC, texts: textsC56HERC },
    { element: buttonElementC56HERLP, texts: textsC56HERLP },
    { element: buttonElementC56HERLF, texts: textsC56HERLF },

    { element: buttonElementC56PF, texts: textsC56PF },
    { element: buttonElementC56PR, texts: textsC56PR },
    { element: buttonElementC56PK, texts: textsC56PK },
    { element: buttonElementC56LR, texts: textsC56LR },
    { element: buttonElementC56LF, texts: textsC56LF }
  ];


  buttons.forEach(({ element, texts }) => {
    element.innerText = texts[0];
    element.style.backgroundColor = "white";
  });
  updateTexts();
}



//C67
function resetC6Row() {
  const buttons = [
    { element: buttonElementC6CC, texts: textsC6CC },
    { element: buttonElementC6LISD, texts: textsC6LISD },
    { element: buttonElementC6SL, texts: textsC6SL },
    { element: buttonElementC6KOM, texts: textsC6KOM },
    { element: buttonElementC6LES, texts: textsC6LES }
  ];

  buttons.forEach(({ element, texts }, index) => {
    element.innerText = texts[0];
    element.style.backgroundColor = "white";
    // Reset index variable to 0
    switch (index) {
      case 0: indexC6CC = 0; break;
      case 1: indexC6LISD = 0; break;
      case 2: indexC6SL = 0; break;
      case 3: indexC6KOM = 0; break;
      case 5: indexC6LES = 0; break;
    }
  });
updateTexts();
}

function resetC67Row() {
  const buttons = [
    { element: buttonElementC67DD, texts: textsC67DD },
    { element: buttonElementC67MOD, texts: textsC67MOD },
    { element: buttonElementC67BH, texts: textsC67BH },
    { element: buttonElementC67HD, texts: textsC67HD },
    { element: buttonElementC67MIG, texts: textsC67MIG },
    { element: buttonElementC67FA, texts: textsC67FA },

    { element: buttonElementC67HERPF, texts: textsC67HERPF },
    { element: buttonElementC67HERPP, texts: textsC67HERPP },
    { element: buttonElementC67HERC, texts: textsC67HERC },
    { element: buttonElementC67HERLP, texts: textsC67HERLP },
    { element: buttonElementC67HERLF, texts: textsC67HERLF },

    { element: buttonElementC67PF, texts: textsC67PF },
    { element: buttonElementC67PR, texts: textsC67PR },
    { element: buttonElementC67PK, texts: textsC67PK },
    { element: buttonElementC67LR, texts: textsC67LR },
    { element: buttonElementC67LF, texts: textsC67LF }
  ];


  buttons.forEach(({ element, texts }) => {
    element.innerText = texts[0];
    element.style.backgroundColor = "white";
  });
  updateTexts();
}

//C7T1
function resetC7Row() {
  const buttons = [
    { element: buttonElementC7CC, texts: textsC7CC },
    { element: buttonElementC7LISD, texts: textsC7LISD },
    { element: buttonElementC7SL, texts: textsC7SL },
    { element: buttonElementC7KOM, texts: textsC7KOM },
    { element: buttonElementC7LES, texts: textsC7LES }
  ];

  buttons.forEach(({ element, texts }, index) => {
    element.innerText = texts[0];
    element.style.backgroundColor = "white";
    // Reset index variable to 0
    switch (index) {
      case 0: indexC7CC = 0; break;
      case 1: indexC7LISD = 0; break;
      case 2: indexC7SL = 0; break;
      case 3: indexC7KOM = 0; break;
      case 5: indexC7LES = 0; break;
    }
  });
updateTexts();
}

function resetC7T1Row() {
  const buttons = [
    { element: buttonElementC7T1DD, texts: textsC7T1DD },
    { element: buttonElementC7T1MOD, texts: textsC7T1MOD },
    { element: buttonElementC7T1BH, texts: textsC7T1BH },
    { element: buttonElementC7T1HD, texts: textsC7T1HD },
    { element: buttonElementC7T1MIG, texts: textsC7T1MIG },
    { element: buttonElementC7T1FA, texts: textsC7T1FA },

    { element: buttonElementC7T1HERPF, texts: textsC7T1HERPF },
    { element: buttonElementC7T1HERPP, texts: textsC7T1HERPP },
    { element: buttonElementC7T1HERC, texts: textsC7T1HERC },
    { element: buttonElementC7T1HERLP, texts: textsC7T1HERLP },
    { element: buttonElementC7T1HERLF, texts: textsC7T1HERLF },

    { element: buttonElementC7T1PF, texts: textsC7T1PF },
    { element: buttonElementC7T1PR, texts: textsC7T1PR },
    { element: buttonElementC7T1PK, texts: textsC7T1PK },
    { element: buttonElementC7T1LR, texts: textsC7T1LR },
    { element: buttonElementC7T1LF, texts: textsC7T1LF }
  ];


  buttons.forEach(({ element, texts }) => {
    element.innerText = texts[0];
    element.style.backgroundColor = "white";
  });
  updateTexts();
}

//T1

function resetT1Row() {
  const buttons = [
    { element: buttonElementT1LES, texts: textsT1LES }
  ];

  buttons.forEach(({ element, texts }, index) => {
    element.innerText = texts[0];
    element.style.backgroundColor = "white";
    // Reset index variable to 0
    switch (index) {
      case 0: indexT1LES = 0; break;
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

//C34
var indexC3KOM = 0;function cycleC3KOMText(event) {  indexC3KOM = cycleText(event, textsC3KOM, indexC3KOM, buttonElementC3KOM, updateBackgroundColor);}
var indexC3LES = 0;function cycleC3LESText(event) {  indexC3LES = cycleText(event, textsC3LES, indexC3LES, buttonElementC3LES, updateBackgroundColor);}
var indexC3CC = 0;function cycleC3CCText(event) {  indexC3CC = cycleText(event, textsC3CC, indexC3CC, buttonElementC3CC, updateBackgroundColor);}
var indexC3LISD = 0;function cycleC3LISDText(event) {  indexC3LISD = cycleText(event, textsC3LISD, indexC3LISD, buttonElementC3LISD);}
var indexC3SL = 0;function cycleC3SLText(event) {  indexC3SL = cycleText(event, textsC3SL, indexC3SL, buttonElementC3SL, updateBackgroundColor);}
var indexC34DD = 0;function cycleC34DDText(event) {  indexC34DD = cycleText(event, textsC34DD, indexC34DD, buttonElementC34DD, updateBackgroundColor);}
var indexC34MOD = 0;function cycleC34MODText(event) {  indexC34MOD = cycleText(event, textsC34MOD, indexC34MOD, buttonElementC34MOD, updateBackgroundColor);}
var indexC34BH = 0;function cycleC34BHText(event) {  indexC34BH = cycleText(event, textsC34BH, indexC34BH, buttonElementC34BH, updateBackgroundColor);}
var indexC34HD = 0;function cycleC34HDText(event) {  indexC34HD = cycleText(event, textsC34HD, indexC34HD, buttonElementC34HD);}
var indexC34FA = 0;function cycleC34FAText(event) {  indexC34FA = cycleText(event, textsC34FA, indexC34FA, buttonElementC34FA, updateBackgroundColor);}

var indexC34HERPF = 0;function cycleC34HERPFText(event) {  indexC34HERPF = cycleText(event, textsC34HERPF, indexC34HERPF, buttonElementC34HERPF, updateBackgroundColor);}
var indexC34HERPP = 0;function cycleC34HERPPText(event) {  indexC34HERPP = cycleText(event, textsC34HERPP, indexC34HERPP, buttonElementC34HERPP, updateBackgroundColor);}
var indexC34HERC = 0;function cycleC34HERCText(event) {  indexC34HERC = cycleText(event, textsC34HERC, indexC34HERC, buttonElementC34HERC, updateBackgroundColor);}
var indexC34HERLP = 0;function cycleC34HERLPText(event) {  indexC34HERLP = cycleText(event, textsC34HERLP, indexC34HERLP, buttonElementC34HERLP, updateBackgroundColor);}
var indexC34HERLF = 0;function cycleC34HERLFText(event) {  indexC34HERLF = cycleText(event, textsC34HERLF, indexC34HERLF, buttonElementC34HERLF, updateBackgroundColor);}
var indexC34MIG = 0;function cycleC34MIGText(event) {  indexC34MIG = cycleText(event, textsC34MIG, indexC34MIG, buttonElementC34MIG, updateBackgroundColor);}

var indexC34PF = 0;function cycleC34PFText(event) {  indexC34PF = cycleText(event, textsC34PF, indexC34PF, buttonElementC34PF, updateBackgroundColor);}
var indexC34PR = 0;function cycleC34PRText(event) {  indexC34PR = cycleText(event, textsC34PR, indexC34PR, buttonElementC34PR, updateBackgroundColor);}
var indexC34PK = 0;function cycleC34PKText(event) {  indexC34PK = cycleText(event, textsC34PK, indexC34PK, buttonElementC34PK, updateBackgroundColor);}
var indexC34LR = 0;function cycleC34LRText(event) {  indexC34LR = cycleText(event, textsC34LR, indexC34LR, buttonElementC34LR, updateBackgroundColor);}
var indexC34LF = 0;function cycleC34LFText(event) {  indexC34LF = cycleText(event, textsC34LF, indexC34LF, buttonElementC34LF, updateBackgroundColor);}

//C45
var indexC4KOM = 0;function cycleC4KOMText(event) {  indexC4KOM = cycleText(event, textsC4KOM, indexC4KOM, buttonElementC4KOM, updateBackgroundColor);}
var indexC4LES = 0;function cycleC4LESText(event) {  indexC4LES = cycleText(event, textsC4LES, indexC4LES, buttonElementC4LES, updateBackgroundColor);}
var indexC4CC = 0;function cycleC4CCText(event) {  indexC4CC = cycleText(event, textsC4CC, indexC4CC, buttonElementC4CC, updateBackgroundColor);}
var indexC4LISD = 0;function cycleC4LISDText(event) {  indexC4LISD = cycleText(event, textsC4LISD, indexC4LISD, buttonElementC4LISD);}
var indexC4SL = 0;function cycleC4SLText(event) {  indexC4SL = cycleText(event, textsC4SL, indexC4SL, buttonElementC4SL, updateBackgroundColor);}
var indexC45DD = 0;function cycleC45DDText(event) {  indexC45DD = cycleText(event, textsC45DD, indexC45DD, buttonElementC45DD, updateBackgroundColor);}
var indexC45MOD = 0;function cycleC45MODText(event) {  indexC45MOD = cycleText(event, textsC45MOD, indexC45MOD, buttonElementC45MOD, updateBackgroundColor);}
var indexC45BH = 0;function cycleC45BHText(event) {  indexC45BH = cycleText(event, textsC45BH, indexC45BH, buttonElementC45BH, updateBackgroundColor);}
var indexC45HD = 0;function cycleC45HDText(event) {  indexC45HD = cycleText(event, textsC45HD, indexC45HD, buttonElementC45HD);}
var indexC45FA = 0;function cycleC45FAText(event) {  indexC45FA = cycleText(event, textsC45FA, indexC45FA, buttonElementC45FA, updateBackgroundColor);}

var indexC45HERPF = 0;function cycleC45HERPFText(event) {  indexC45HERPF = cycleText(event, textsC45HERPF, indexC45HERPF, buttonElementC45HERPF, updateBackgroundColor);}
var indexC45HERPP = 0;function cycleC45HERPPText(event) {  indexC45HERPP = cycleText(event, textsC45HERPP, indexC45HERPP, buttonElementC45HERPP, updateBackgroundColor);}
var indexC45HERC = 0;function cycleC45HERCText(event) {  indexC45HERC = cycleText(event, textsC45HERC, indexC45HERC, buttonElementC45HERC, updateBackgroundColor);}
var indexC45HERLP = 0;function cycleC45HERLPText(event) {  indexC45HERLP = cycleText(event, textsC45HERLP, indexC45HERLP, buttonElementC45HERLP, updateBackgroundColor);}
var indexC45HERLF = 0;function cycleC45HERLFText(event) {  indexC45HERLF = cycleText(event, textsC45HERLF, indexC45HERLF, buttonElementC45HERLF, updateBackgroundColor);}
var indexC45MIG = 0;function cycleC45MIGText(event) {  indexC45MIG = cycleText(event, textsC45MIG, indexC45MIG, buttonElementC45MIG, updateBackgroundColor);}

var indexC45PF = 0;function cycleC45PFText(event) {  indexC45PF = cycleText(event, textsC45PF, indexC45PF, buttonElementC45PF, updateBackgroundColor);}
var indexC45PR = 0;function cycleC45PRText(event) {  indexC45PR = cycleText(event, textsC45PR, indexC45PR, buttonElementC45PR, updateBackgroundColor);}
var indexC45PK = 0;function cycleC45PKText(event) {  indexC45PK = cycleText(event, textsC45PK, indexC45PK, buttonElementC45PK, updateBackgroundColor);}
var indexC45LR = 0;function cycleC45LRText(event) {  indexC45LR = cycleText(event, textsC45LR, indexC45LR, buttonElementC45LR, updateBackgroundColor);}
var indexC45LF = 0;function cycleC45LFText(event) {  indexC45LF = cycleText(event, textsC45LF, indexC45LF, buttonElementC45LF, updateBackgroundColor);}

//C56
var indexC5KOM = 0;function cycleC5KOMText(event) {  indexC5KOM = cycleText(event, textsC5KOM, indexC5KOM, buttonElementC5KOM, updateBackgroundColor);}
var indexC5LES = 0;function cycleC5LESText(event) {  indexC5LES = cycleText(event, textsC5LES, indexC5LES, buttonElementC5LES, updateBackgroundColor);}
var indexC5CC = 0;function cycleC5CCText(event) {  indexC5CC = cycleText(event, textsC5CC, indexC5CC, buttonElementC5CC, updateBackgroundColor);}
var indexC5LISD = 0;function cycleC5LISDText(event) {  indexC5LISD = cycleText(event, textsC5LISD, indexC5LISD, buttonElementC5LISD);}
var indexC5SL = 0;function cycleC5SLText(event) {  indexC5SL = cycleText(event, textsC5SL, indexC5SL, buttonElementC5SL, updateBackgroundColor);}
var indexC56DD = 0;function cycleC56DDText(event) {  indexC56DD = cycleText(event, textsC56DD, indexC56DD, buttonElementC56DD, updateBackgroundColor);}
var indexC56MOD = 0;function cycleC56MODText(event) {  indexC56MOD = cycleText(event, textsC56MOD, indexC56MOD, buttonElementC56MOD, updateBackgroundColor);}
var indexC56BH = 0;function cycleC56BHText(event) {  indexC56BH = cycleText(event, textsC56BH, indexC56BH, buttonElementC56BH, updateBackgroundColor);}
var indexC56HD = 0;function cycleC56HDText(event) {  indexC56HD = cycleText(event, textsC56HD, indexC56HD, buttonElementC56HD);}
var indexC56FA = 0;function cycleC56FAText(event) {  indexC56FA = cycleText(event, textsC56FA, indexC56FA, buttonElementC56FA, updateBackgroundColor);}

var indexC56HERPF = 0;function cycleC56HERPFText(event) {  indexC56HERPF = cycleText(event, textsC56HERPF, indexC56HERPF, buttonElementC56HERPF, updateBackgroundColor);}
var indexC56HERPP = 0;function cycleC56HERPPText(event) {  indexC56HERPP = cycleText(event, textsC56HERPP, indexC56HERPP, buttonElementC56HERPP, updateBackgroundColor);}
var indexC56HERC = 0;function cycleC56HERCText(event) {  indexC56HERC = cycleText(event, textsC56HERC, indexC56HERC, buttonElementC56HERC, updateBackgroundColor);}
var indexC56HERLP = 0;function cycleC56HERLPText(event) {  indexC56HERLP = cycleText(event, textsC56HERLP, indexC56HERLP, buttonElementC56HERLP, updateBackgroundColor);}
var indexC56HERLF = 0;function cycleC56HERLFText(event) {  indexC56HERLF = cycleText(event, textsC56HERLF, indexC56HERLF, buttonElementC56HERLF, updateBackgroundColor);}
var indexC56MIG = 0;function cycleC56MIGText(event) {  indexC56MIG = cycleText(event, textsC56MIG, indexC56MIG, buttonElementC56MIG, updateBackgroundColor);}

var indexC56PF = 0;function cycleC56PFText(event) {  indexC56PF = cycleText(event, textsC56PF, indexC56PF, buttonElementC56PF, updateBackgroundColor);}
var indexC56PR = 0;function cycleC56PRText(event) {  indexC56PR = cycleText(event, textsC56PR, indexC56PR, buttonElementC56PR, updateBackgroundColor);}
var indexC56PK = 0;function cycleC56PKText(event) {  indexC56PK = cycleText(event, textsC56PK, indexC56PK, buttonElementC56PK, updateBackgroundColor);}
var indexC56LR = 0;function cycleC56LRText(event) {  indexC56LR = cycleText(event, textsC56LR, indexC56LR, buttonElementC56LR, updateBackgroundColor);}
var indexC56LF = 0;function cycleC56LFText(event) {  indexC56LF = cycleText(event, textsC56LF, indexC56LF, buttonElementC56LF, updateBackgroundColor);}

//C67
var indexC6KOM = 0;function cycleC6KOMText(event) {  indexC6KOM = cycleText(event, textsC6KOM, indexC6KOM, buttonElementC6KOM, updateBackgroundColor);}
var indexC6LES = 0;function cycleC6LESText(event) {  indexC6LES = cycleText(event, textsC6LES, indexC6LES, buttonElementC6LES, updateBackgroundColor);}
var indexC6CC = 0;function cycleC6CCText(event) {  indexC6CC = cycleText(event, textsC6CC, indexC6CC, buttonElementC6CC, updateBackgroundColor);}
var indexC6LISD = 0;function cycleC6LISDText(event) {  indexC6LISD = cycleText(event, textsC6LISD, indexC6LISD, buttonElementC6LISD);}
var indexC6SL = 0;function cycleC6SLText(event) {  indexC6SL = cycleText(event, textsC6SL, indexC6SL, buttonElementC6SL, updateBackgroundColor);}
var indexC67DD = 0;function cycleC67DDText(event) {  indexC67DD = cycleText(event, textsC67DD, indexC67DD, buttonElementC67DD, updateBackgroundColor);}
var indexC67MOD = 0;function cycleC67MODText(event) {  indexC67MOD = cycleText(event, textsC67MOD, indexC67MOD, buttonElementC67MOD, updateBackgroundColor);}
var indexC67BH = 0;function cycleC67BHText(event) {  indexC67BH = cycleText(event, textsC67BH, indexC67BH, buttonElementC67BH, updateBackgroundColor);}
var indexC67HD = 0;function cycleC67HDText(event) {  indexC67HD = cycleText(event, textsC67HD, indexC67HD, buttonElementC67HD);}
var indexC67FA = 0;function cycleC67FAText(event) {  indexC67FA = cycleText(event, textsC67FA, indexC67FA, buttonElementC67FA, updateBackgroundColor);}

var indexC67HERPF = 0;function cycleC67HERPFText(event) {  indexC67HERPF = cycleText(event, textsC67HERPF, indexC67HERPF, buttonElementC67HERPF, updateBackgroundColor);}
var indexC67HERPP = 0;function cycleC67HERPPText(event) {  indexC67HERPP = cycleText(event, textsC67HERPP, indexC67HERPP, buttonElementC67HERPP, updateBackgroundColor);}
var indexC67HERC = 0;function cycleC67HERCText(event) {  indexC67HERC = cycleText(event, textsC67HERC, indexC67HERC, buttonElementC67HERC, updateBackgroundColor);}
var indexC67HERLP = 0;function cycleC67HERLPText(event) {  indexC67HERLP = cycleText(event, textsC67HERLP, indexC67HERLP, buttonElementC67HERLP, updateBackgroundColor);}
var indexC67HERLF = 0;function cycleC67HERLFText(event) {  indexC67HERLF = cycleText(event, textsC67HERLF, indexC67HERLF, buttonElementC67HERLF, updateBackgroundColor);}
var indexC67MIG = 0;function cycleC67MIGText(event) {  indexC67MIG = cycleText(event, textsC67MIG, indexC67MIG, buttonElementC67MIG, updateBackgroundColor);}

var indexC67PF = 0;function cycleC67PFText(event) {  indexC67PF = cycleText(event, textsC67PF, indexC67PF, buttonElementC67PF, updateBackgroundColor);}
var indexC67PR = 0;function cycleC67PRText(event) {  indexC67PR = cycleText(event, textsC67PR, indexC67PR, buttonElementC67PR, updateBackgroundColor);}
var indexC67PK = 0;function cycleC67PKText(event) {  indexC67PK = cycleText(event, textsC67PK, indexC67PK, buttonElementC67PK, updateBackgroundColor);}
var indexC67LR = 0;function cycleC67LRText(event) {  indexC67LR = cycleText(event, textsC67LR, indexC67LR, buttonElementC67LR, updateBackgroundColor);}
var indexC67LF = 0;function cycleC67LFText(event) {  indexC67LF = cycleText(event, textsC67LF, indexC67LF, buttonElementC67LF, updateBackgroundColor);}

//C7T1
var indexC7KOM = 0;function cycleC7KOMText(event) {  indexC7KOM = cycleText(event, textsC7KOM, indexC7KOM, buttonElementC7KOM, updateBackgroundColor);}
var indexC7LES = 0;function cycleC7LESText(event) {  indexC7LES = cycleText(event, textsC7LES, indexC7LES, buttonElementC7LES, updateBackgroundColor);}
var indexC7CC = 0;function cycleC7CCText(event) {  indexC7CC = cycleText(event, textsC7CC, indexC7CC, buttonElementC7CC, updateBackgroundColor);}
var indexC7LISD = 0;function cycleC7LISDText(event) {  indexC7LISD = cycleText(event, textsC7LISD, indexC7LISD, buttonElementC7LISD);}
var indexC7SL = 0;function cycleC7SLText(event) {  indexC7SL = cycleText(event, textsC7SL, indexC7SL, buttonElementC7SL, updateBackgroundColor);}
var indexC7T1DD = 0;function cycleC7T1DDText(event) {  indexC7T1DD = cycleText(event, textsC7T1DD, indexC7T1DD, buttonElementC7T1DD, updateBackgroundColor);}
var indexC7T1MOD = 0;function cycleC7T1MODText(event) {  indexC7T1MOD = cycleText(event, textsC7T1MOD, indexC7T1MOD, buttonElementC7T1MOD, updateBackgroundColor);}
var indexC7T1BH = 0;function cycleC7T1BHText(event) {  indexC7T1BH = cycleText(event, textsC7T1BH, indexC7T1BH, buttonElementC7T1BH, updateBackgroundColor);}
var indexC7T1HD = 0;function cycleC7T1HDText(event) {  indexC7T1HD = cycleText(event, textsC7T1HD, indexC7T1HD, buttonElementC7T1HD);}
var indexC7T1FA = 0;function cycleC7T1FAText(event) {  indexC7T1FA = cycleText(event, textsC7T1FA, indexC7T1FA, buttonElementC7T1FA, updateBackgroundColor);}

var indexC7T1HERPF = 0;function cycleC7T1HERPFText(event) {  indexC7T1HERPF = cycleText(event, textsC7T1HERPF, indexC7T1HERPF, buttonElementC7T1HERPF, updateBackgroundColor);}
var indexC7T1HERPP = 0;function cycleC7T1HERPPText(event) {  indexC7T1HERPP = cycleText(event, textsC7T1HERPP, indexC7T1HERPP, buttonElementC7T1HERPP, updateBackgroundColor);}
var indexC7T1HERC = 0;function cycleC7T1HERCText(event) {  indexC7T1HERC = cycleText(event, textsC7T1HERC, indexC7T1HERC, buttonElementC7T1HERC, updateBackgroundColor);}
var indexC7T1HERLP = 0;function cycleC7T1HERLPText(event) {  indexC7T1HERLP = cycleText(event, textsC7T1HERLP, indexC7T1HERLP, buttonElementC7T1HERLP, updateBackgroundColor);}
var indexC7T1HERLF = 0;function cycleC7T1HERLFText(event) {  indexC7T1HERLF = cycleText(event, textsC7T1HERLF, indexC7T1HERLF, buttonElementC7T1HERLF, updateBackgroundColor);}
var indexC7T1MIG = 0;function cycleC7T1MIGText(event) {  indexC7T1MIG = cycleText(event, textsC7T1MIG, indexC7T1MIG, buttonElementC7T1MIG, updateBackgroundColor);}

var indexC7T1PF = 0;function cycleC7T1PFText(event) {  indexC7T1PF = cycleText(event, textsC7T1PF, indexC7T1PF, buttonElementC7T1PF, updateBackgroundColor);}
var indexC7T1PR = 0;function cycleC7T1PRText(event) {  indexC7T1PR = cycleText(event, textsC7T1PR, indexC7T1PR, buttonElementC7T1PR, updateBackgroundColor);}
var indexC7T1PK = 0;function cycleC7T1PKText(event) {  indexC7T1PK = cycleText(event, textsC7T1PK, indexC7T1PK, buttonElementC7T1PK, updateBackgroundColor);}
var indexC7T1LR = 0;function cycleC7T1LRText(event) {  indexC7T1LR = cycleText(event, textsC7T1LR, indexC7T1LR, buttonElementC7T1LR, updateBackgroundColor);}
var indexC7T1LF = 0;function cycleC7T1LFText(event) {  indexC7T1LF = cycleText(event, textsC7T1LF, indexC7T1LF, buttonElementC7T1LF, updateBackgroundColor);}


//T1
var indexT1LES = 0;function cycleT1LESText(event) {  indexT1LES = cycleText(event, textsT1LES, indexT1LES, buttonElementT1LES, updateBackgroundColor);}




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
