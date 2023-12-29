// checkbox clickable by right mouse

const checkboxes = document.querySelectorAll('.custom-checkbox input[type="checkbox"]');
checkboxes.forEach(function(checkbox) {
    checkbox.parentElement.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        checkbox.checked = !checkbox.checked;
        updateTexts(); // If you want to immediately trigger the updateTexts function
    });
});

// buttons clickable by right mouse

var buttons = document.getElementsByTagName("button");

for (var i = 0; i < buttons.length; i++) {
    // Add 'contextmenu' event to each button
    buttons[i].addEventListener("contextmenu", function(e){
        // Prevent the default context menu from showing up
        e.preventDefault();
    });
}


//button cycling

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

var textsStrana = ["jakého?", "PRAVÉHO", "LEVÉHO"];
var buttonElementStrana = document.getElementById("StranaButton");
var indexStrana = 0;function cycleStranaText(event) {  indexStrana = cycleText(event, textsStrana, indexStrana, buttonElementStrana, updateBackgroundColor);}

var textsPkNapln = ["0", "↑", "↑↑", "↑↑↑"];
var textsPkWiberg = ["I", "II", "III","IV"];

var textsMkFemurCHr = ["OK", "fisura", "defekt", "II", "III", "IV"];
var textsMkMen = ["Meniskus OK", "ruptura", "degenerace"];
var textsMkMenME = ["bez operace", "ME zadní", "ME přední", "ME subtot."];
var textsMkTibieCHr = ["OK", "fisura", "defekt", "II", "III", "IV"];

var textsLkFemurCHr = ["OK", "fisura", "defekt", "II", "III", "IV"];
var textsLkMen = ["Meniskus OK", "ruptura", "degenerace"];
var textsLkMenME = ["bez operace", "ME zadní", "ME přední", "ME subtot."];
var textsLkTibieCHr = ["OK", "fisura", "defekt", "II", "III", "IV"];

var textsLCM = ["LCM", "ruptura I", "ruptura II", "ruptura III"];
var textsLCL = ["LCL", "ruptura I", "ruptura II", "ruptura III"];

var textsOstBaker = ["0", "↑", "↑↑", "↑↑↑"];


var buttonElementPkNapln = document.getElementById("PkNaplnButton");
var buttonElementPkWiberg = document.getElementById("PkWibergButton");

var buttonElementMkFemurCHr = document.getElementById("MkFemurCHrButton");
var buttonElementMkMen = document.getElementById("MkMenButton");
var buttonElementMkMenME = document.getElementById("MkMenMEButton");
var selectElementMkMenLeze = document.getElementById('MkMenLeze'); var selectElementMkMenLokace = document.getElementById('MkMenLokace'); var selectElementMkMenCystCHB = document.getElementById('MkMenCystCHB');
var buttonElementMkTibieCHr = document.getElementById("MkTibieCHrButton");

var buttonElementLkFemurCHr = document.getElementById("LkFemurCHrButton");
var buttonElementLkMen = document.getElementById("LkMenButton");
var buttonElementLkMenME = document.getElementById("LkMenMEButton");
var selectElementLkMenLeze = document.getElementById('LkMenLeze'); var selectElementLkMenLokace = document.getElementById('LkMenLokace'); var selectElementLkMenCystCHB = document.getElementById('LkMenCystCHB');
var buttonElementLkTibieCHr = document.getElementById("LkTibieCHrButton");

var buttonElementLCM = document.getElementById("LCMButton");
var buttonElementLCL = document.getElementById("LCLButton");

var buttonElementOstBaker = document.getElementById("OstBakerButton");


var indexPkNapln = 0;function cyclePkNaplnText(event) {  indexPkNapln = cycleText(event, textsPkNapln, indexPkNapln, buttonElementPkNapln, updateBackgroundColor);}
var indexPkWiberg = 0;function cyclePkWibergText(event) {  indexPkWiberg = cycleText(event, textsPkWiberg, indexPkWiberg, buttonElementPkWiberg, updateBackgroundColor);}

var indexMkFemurCHr = 0;function cycleMkFemurCHrText(event) {  indexMkFemurCHr = cycleText(event, textsMkFemurCHr, indexMkFemurCHr, buttonElementMkFemurCHr, updateBackgroundColor);}
var indexMkMen = 0;function cycleMkMenText(event) {  indexMkMen = cycleText(event, textsMkMen, indexMkMen, buttonElementMkMen, updateBackgroundColor);}
var indexMkMenME = 0;function cycleMkMenMEText(event) {  indexMkMenME = cycleText(event, textsMkMenME, indexMkMenME, buttonElementMkMenME, updateBackgroundColor);}
var indexMkTibieCHr = 0;function cycleMkTibieCHrText(event) {  indexMkTibieCHr = cycleText(event, textsMkTibieCHr, indexMkTibieCHr, buttonElementMkTibieCHr, updateBackgroundColor);}

var indexLkFemurCHr = 0;function cycleLkFemurCHrText(event) {  indexLkFemurCHr = cycleText(event, textsLkFemurCHr, indexLkFemurCHr, buttonElementLkFemurCHr, updateBackgroundColor);}
var indexLkMen = 0;function cycleLkMenText(event) {  indexLkMen = cycleText(event, textsLkMen, indexLkMen, buttonElementLkMen, updateBackgroundColor);}
var indexLkMenME = 0;function cycleLkMenMEText(event) {  indexLkMenME = cycleText(event, textsLkMenME, indexLkMenME, buttonElementLkMenME, updateBackgroundColor);}
var indexLkTibieCHr = 0;function cycleLkTibieCHrText(event) {  indexLkTibieCHr = cycleText(event, textsLkTibieCHr, indexLkTibieCHr, buttonElementLkTibieCHr, updateBackgroundColor);}

var indexLCM = 0;function cycleLCMText(event) {  indexLCM = cycleText(event, textsLCM, indexLCM, buttonElementLCM, updateBackgroundColor);}
var indexLCL = 0;function cycleLCLText(event) {  indexLCL = cycleText(event, textsLCL, indexLCL, buttonElementLCL, updateBackgroundColor);}

var indexOstBaker = 0;function cycleOstBakerText(event) {  indexOstBaker = cycleText(event, textsOstBaker, indexOstBaker, buttonElementOstBaker, updateBackgroundColor);}

//hiding 

buttonElementMkMen.addEventListener("mousedown", function() {
    if(this.innerText === 'Meniskus OK') {
        selectElementMkMenLeze.classList.add('hidden'); 
        selectElementMkMenLokace.classList.add('hidden');
		selectElementMkMenCystCHB.classList.add('hidden');
    } else if (this.innerText === 'ruptura') {
        selectElementMkMenLeze.classList.remove('hidden'); 
        selectElementMkMenLokace.classList.remove('hidden');
		selectElementMkMenCystCHB.classList.remove('hidden');
    } else if (this.innerText === 'degenerace' || this.innerText === 'menisektomie') {
        selectElementMkMenLeze.classList.add('hidden'); 
        selectElementMkMenLokace.classList.remove('hidden');
		selectElementMkMenCystCHB.classList.add('hidden');
    }
});

buttonElementLkMen.addEventListener("mousedown", function() {	
    if(this.innerText === 'Meniskus OK') {
        selectElementLkMenLeze.classList.add('hidden'); 
        selectElementLkMenLokace.classList.add('hidden');
		selectElementLkMenCystCHB.classList.add('hidden');
    } else if (this.innerText === 'ruptura') {
        selectElementLkMenLeze.classList.remove('hidden'); 
        selectElementLkMenLokace.classList.remove('hidden');
		selectElementLkMenCystCHB.classList.remove('hidden');
    } else if (this.innerText === 'degenerace' || this.innerText === 'menisektomie') {
        selectElementLkMenLeze.classList.add('hidden'); 
        selectElementLkMenLokace.classList.remove('hidden');
		selectElementLkMenCystCHB.classList.add('hidden');
    }
});




// TABLES others OVERLAY

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('others100')) {
        var tableId = event.target.id + 'table';
        var table = document.getElementById(tableId);
        
        var overlayTables = document.querySelectorAll('.overlay');
        overlayTables.forEach(function(otherTable) {
            if (otherTable.id !== tableId) {
                otherTable.classList.add('hidden');
                otherTable.classList.remove('overlay');
            }
        });
        
        table.classList.toggle('overlay');
        table.classList.toggle('hidden');
    }
});

document.addEventListener('click', function(event) {
    var overlayTables = document.querySelectorAll('.overlay');
    overlayTables.forEach(function(table) {
        if (!table.contains(event.target) && !event.target.classList.contains('others100')) {
            table.classList.add('hidden');
            table.classList.remove('overlay');
        }
    });
});


// button color overlay table change

function isAnyCheckboxChecked(tableId) {
    var checkboxes = document.querySelectorAll('#' + tableId + ' input[type="checkbox"]');
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            return true;
        }
    }
    return false;
}

function updateButtonColor(buttonId, tableId) {
    var button = document.getElementById(buttonId);
    if (isAnyCheckboxChecked(tableId)) {
        button.style.backgroundColor = '#D4A29C';
    } else {
        button.style.backgroundColor = ''; 
    }
}

document.addEventListener('change', function(event) {
    if (event.target.type === 'checkbox') {
        var table = event.target.closest('[id$="table"]');
        if (table) {
            var buttonId = table.id.replace('table', '');
            updateButtonColor(buttonId, table.id);
        }
    }
});

// button overlay unchecked

function uncheckAllCheckboxes(tableId) {
    var checkboxes = document.querySelectorAll('#' + tableId + ' input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
    });
}

document.addEventListener('contextmenu', function(event) {
    if (event.target.classList.contains('others100')) {
        event.preventDefault(); // Prevent the default right-click context menu

        var tableId = event.target.id + 'table';
        uncheckAllCheckboxes(tableId);

        var buttonId = tableId.replace('table', '');
        updateButtonColor(buttonId, tableId);
		updateTexts();
    }
});


// COPY

var copyfinal = document.getElementById('copyfinal');
var FINALText = document.getElementById('FINALText');

copyfinal.addEventListener('click', function() {
	
	const StranaText = document.getElementById('StranaButton').innerText;

    // Check the value of StranaText
    if (StranaText === "jakého?") {
        alert("vyplnit stranu vyšetření"); // Show popup message
        return; // Exit the function early
    }
	
    navigator.clipboard.writeText(FINALText.value)
    .then(() => {
        FINALText.classList.add('highlight');

        setTimeout(function() {
            FINALText.classList.remove('highlight');
        }, 100);
    })
    .catch(err => {
    });
});



