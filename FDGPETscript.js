// LESIONS (cloning)   --- doplnovat --- 

function cloneAndUpdateIds(sourceId, destId) {
    let sourceElement = document.getElementById(sourceId);
    let clonedElement = sourceElement.cloneNode(true);
    clonedElement.id = destId;

    let sourceNumber = sourceId.match(/\d+/); // extracts number from sourceId (e.g., "1" from "Lesion1")
    let destNumber = destId.match(/\d+/); // extracts number from destId (e.g., "2" from "Lesion2")

    let elements = clonedElement.querySelectorAll("*");
    
    elements.forEach(element => {
        if (element.id) {
            element.id = element.id.replace(`Lesion${sourceNumber}`, `Lesion${destNumber}`);
            element.id = element.id.replace(`Chb${sourceNumber}`, `Chb${destNumber}`);
			
			 if (element.id.endsWith(`${destNumber}no`)) {
                    element.textContent = `L${destNumber}`;
                }
        }
    });
    
    sourceElement.parentNode.appendChild(clonedElement);
}


cloneAndUpdateIds("NeckLesion1", "NeckLesion2");
cloneAndUpdateIds("NeckLesion1selectLocation", "NeckLesion2selectLocation");
cloneAndUpdateIds("ThoraxLesion1", "ThoraxLesion2");
cloneAndUpdateIds("ThoraxLesion1selectLocation", "ThoraxLesion2selectLocation");
cloneAndUpdateIds("AbdomenLesion1", "AbdomenLesion2");
cloneAndUpdateIds("AbdomenLesion1selectLocation", "AbdomenLesion2selectLocation");
cloneAndUpdateIds("SkeletonLesion1", "SkeletonLesion2");
cloneAndUpdateIds("SkeletonLesion1selectLocation", "SkeletonLesion2selectLocation");

cloneAndUpdateIds("NeckLesion1", "NeckLesion3");
cloneAndUpdateIds("NeckLesion1selectLocation", "NeckLesion3selectLocation");
cloneAndUpdateIds("ThoraxLesion1", "ThoraxLesion3");
cloneAndUpdateIds("ThoraxLesion1selectLocation", "ThoraxLesion3selectLocation");
cloneAndUpdateIds("AbdomenLesion1", "AbdomenLesion3");
cloneAndUpdateIds("AbdomenLesion1selectLocation", "AbdomenLesion3selectLocation");
cloneAndUpdateIds("SkeletonLesion1", "SkeletonLesion3");
cloneAndUpdateIds("SkeletonLesion1selectLocation", "SkeletonLesion3selectLocation");




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

function updateBackgroundColor(index, buttonElement, color1 = "transparent", color2 = "transparent") {
  buttonElement.style.backgroundColor = index === 0 ? color1 : color2;
}

var textsPETType = ["FDG", "PSMA", "DOTATOC"];
var buttonElementPETType = document.getElementById("PETTypeButton");
var indexPETType = 0;function cyclePETTypeText(event) {  indexPETType = cycleText(event, textsPETType, indexPETType, buttonElementPETType, updateBackgroundColor);}

function cyclePETTypeText(event) {  indexPETType = cycleText(event, textsPETType, indexPETType, buttonElementPETType, updateBackgroundColor);  updateTexts();}

// TABLES others OVERLAY

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('others')) {
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
        if (!table.contains(event.target) && !event.target.classList.contains('others')) {
            table.classList.add('hidden');
            table.classList.remove('overlay');
        }
    });
});

//input textareas resizable

var InputTextAreas = document.querySelectorAll('.inputothers');
InputTextAreas.forEach(function(InputTextArea) {
    InputTextArea.addEventListener('input', function() {
        // Reset the height to ensure correct calculation
        this.style.height = 'auto';
        // Set the height to the scrollHeight to fit the content
        this.style.height = (this.scrollHeight) + 'px';
    });
});

// button tables overlay change color

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

// button tables overlay unchecked

function uncheckAllCheckboxes(tableId) {
    var checkboxes = document.querySelectorAll('#' + tableId + ' input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
    });
}

document.addEventListener('contextmenu', function(event) {
    if (event.target.classList.contains('others')) {
        event.preventDefault(); // Prevent the default right-click context menu

        var tableId = event.target.id + 'table';
        uncheckAllCheckboxes(tableId);

        var buttonId = tableId.replace('table', '');
        updateButtonColor(buttonId, tableId);
		updateTexts();
    }
});


// srovnani SUV hidden  --- doplnovat --- 

function toggleElements() {
    var dateInput = document.getElementById('DateCompare');
    var SUVLiverTextCompare = document.getElementById('SUVLiverTextCompare');
    var SUVLiverPrevious = document.getElementById('SUVLiverPrevious');
	var NeckLesion1Previous = document.getElementById('NeckLesion1Previous'); var NeckLesion2Previous = document.getElementById('NeckLesion2Previous'); var NeckLesion3Previous = document.getElementById('NeckLesion3Previous'); 
	var NeckLymphNode1Previous = document.getElementById('NeckLymphNode1Previous');
	var ThoraxLesion1Previous = document.getElementById('ThoraxLesion1Previous'); var ThoraxLesion2Previous = document.getElementById('ThoraxLesion2Previous'); var ThoraxLesion3Previous = document.getElementById('ThoraxLesion3Previous');
	var ThoraxLymphNode1Previous = document.getElementById('ThoraxLymphNode1Previous');
	var AbdomenLesion1Previous = document.getElementById('AbdomenLesion1Previous'); var AbdomenLesion2Previous = document.getElementById('AbdomenLesion2Previous'); var AbdomenLesion3Previous = document.getElementById('AbdomenLesion3Previous'); 
	var AbdomenLymphNode1Previous = document.getElementById('AbdomenLymphNode1Previous');
	var SkeletonLesion1Previous = document.getElementById('SkeletonLesion1Previous'); var SkeletonLesion2Previous = document.getElementById('SkeletonLesion2Previous'); var SkeletonLesion3Previous = document.getElementById('SkeletonLesion3Previous');

    if (dateInput.value !== '') {
      SUVLiverTextCompare.classList.remove('hidden');
      SUVLiverPrevious.classList.remove('hidden');
	  NeckLesion1Previous.classList.remove('hidden'); NeckLesion2Previous.classList.remove('hidden'); NeckLesion3Previous.classList.remove('hidden');
	  NeckLymphNode1Previous.classList.remove('hidden');
	  ThoraxLesion1Previous.classList.remove('hidden'); ThoraxLesion2Previous.classList.remove('hidden'); ThoraxLesion3Previous.classList.remove('hidden');
	  ThoraxLymphNode1Previous.classList.remove('hidden');
	  AbdomenLesion1Previous.classList.remove('hidden'); AbdomenLesion2Previous.classList.remove('hidden'); AbdomenLesion3Previous.classList.remove('hidden');
	  AbdomenLymphNode1Previous.classList.remove('hidden');
	  SkeletonLesion1Previous.classList.remove('hidden'); SkeletonLesion2Previous.classList.remove('hidden'); SkeletonLesion3Previous.classList.remove('hidden');
    } else {
      SUVLiverTextCompare.classList.add('hidden');
      SUVLiverPrevious.classList.add('hidden');
	  NeckLesion1Previous.classList.add('hidden'); NeckLesion2Previous.classList.add('hidden'); NeckLesion3Previous.classList.add('hidden');
	  NeckLymphNode1Previous.classList.add('hidden');
	  ThoraxLesion1Previous.classList.add('hidden'); ThoraxLesion2Previous.classList.add('hidden'); ThoraxLesion3Previous.classList.add('hidden');
	  ThoraxLymphNode1Previous.classList.add('hidden');
	  AbdomenLesion1Previous.classList.add('hidden'); AbdomenLesion2Previous.classList.add('hidden'); AbdomenLesion3Previous.classList.add('hidden');
	  AbdomenLymphNode1Previous.classList.add('hidden');
	  SkeletonLesion1Previous.classList.add('hidden'); SkeletonLesion2Previous.classList.add('hidden'); SkeletonLesion3Previous.classList.add('hidden');
    }
  }


// NECK 

//  lesions

document.getElementById('NeckNewLesion1').addEventListener('click', function() {
  var element = document.getElementById('NeckLesion1');
  element.classList.toggle('hidden'); this.classList.toggle('toggleColorRed');
  updateTexts();
});

document.getElementById('NeckLesion1no').addEventListener('click', function() {
  var element = document.getElementById('NeckLesion1');
  element.classList.add('hidden');
  updateTexts();
});

document.getElementById('NeckLesion1number').addEventListener('change', function() {
  let selectedValue = this.value;
  let NeckLesion1LoclargestElement = document.getElementById('NeckLesion1Loclargest');

  if (selectedValue !== "") {
    NeckLesion1LoclargestElement.classList.remove('hidden');
  } else {
    NeckLesion1LoclargestElement.classList.add('hidden');
  }
});

document.getElementById('NeckLesion1Location').addEventListener('focus', function() {
  document.getElementById('NeckLesion1selectLocation').classList.remove('hidden');
});
document.addEventListener('click', function(e) {
  const NeckLesion1LocationElement = document.getElementById('NeckLesion1Location');
  const NeckLesion1selectLocationElement = document.getElementById('NeckLesion1selectLocation');
  if (!NeckLesion1LocationElement.contains(e.target) && !NeckLesion1selectLocationElement.contains(e.target)) {
	NeckLesion1selectLocationElement.classList.add('hidden');
  }
});

document.getElementById('NeckNewLesion2').addEventListener('click', function() {
  var element = document.getElementById('NeckLesion2');
  element.classList.toggle('hidden'); this.classList.toggle('toggleColorRed');
  updateTexts();
});

document.getElementById('NeckLesion2no').addEventListener('click', function() {
  var element = document.getElementById('NeckLesion2');
  element.classList.add('hidden');
  updateTexts();
});

document.getElementById('NeckLesion2number').addEventListener('change', function() {
  let selectedValue = this.value;
  let NeckLesion2LoclargestElement = document.getElementById('NeckLesion2Loclargest');

  if (selectedValue !== "") {
    NeckLesion2LoclargestElement.classList.remove('hidden');
  } else {
    NeckLesion2LoclargestElement.classList.add('hidden');
  }
});

document.getElementById('NeckLesion2Location').addEventListener('focus', function() {
  document.getElementById('NeckLesion2selectLocation').classList.remove('hidden');
});
document.addEventListener('click', function(e) {
  const NeckLesion2LocationElement = document.getElementById('NeckLesion2Location');
  const NeckLesion2selectLocationElement = document.getElementById('NeckLesion2selectLocation');
  if (!NeckLesion2LocationElement.contains(e.target) && !NeckLesion2selectLocationElement.contains(e.target)) {
	NeckLesion2selectLocationElement.classList.add('hidden');
  }
});

document.getElementById('NeckNewLesion3').addEventListener('click', function() {
  var element = document.getElementById('NeckLesion3');
  element.classList.toggle('hidden'); this.classList.toggle('toggleColorRed');
  updateTexts();
});

document.getElementById('NeckLesion3no').addEventListener('click', function() {
  var element = document.getElementById('NeckLesion3');
  element.classList.add('hidden');
  updateTexts();
});

document.getElementById('NeckLesion3number').addEventListener('change', function() {
  let selectedValue = this.value;
  let NeckLesion3LoclargestElement = document.getElementById('NeckLesion3Loclargest');

  if (selectedValue !== "") {
    NeckLesion3LoclargestElement.classList.remove('hidden');
  } else {
    NeckLesion3LoclargestElement.classList.add('hidden');
  }
});

document.getElementById('NeckLesion3Location').addEventListener('focus', function() {
  document.getElementById('NeckLesion3selectLocation').classList.remove('hidden');
});
document.addEventListener('click', function(e) {
  const NeckLesion3LocationElement = document.getElementById('NeckLesion3Location');
  const NeckLesion3selectLocationElement = document.getElementById('NeckLesion3selectLocation');
  if (!NeckLesion3LocationElement.contains(e.target) && !NeckLesion3selectLocationElement.contains(e.target)) {
	NeckLesion3selectLocationElement.classList.add('hidden');
  }
});

// new lymph node 1

document.getElementById('NeckNewLymphNode1').addEventListener('click', function() {
  var element = document.getElementById('NeckLymphNode1');
  element.classList.toggle('hidden'); this.classList.toggle('toggleColorRed');
  updateTexts();
});

document.getElementById('NeckLymphNode1no').addEventListener('click', function() {
  var element = document.getElementById('NeckLymphNode1');
  element.classList.add('hidden');
  updateTexts();
});

//hiding neck LN

document.getElementById('NeckLymphNode1number').addEventListener('change', function() {
  let selectedValue = this.value;
  let NeckLymphNode1LoclargestElement = document.getElementById('NeckLymphNode1Loclargest');

  if (selectedValue !== "") {
    NeckLymphNode1LoclargestElement.classList.remove('hidden');
  } else {
    NeckLymphNode1LoclargestElement.classList.add('hidden');
  }
});


document.getElementById('NeckLymphNode1Location').addEventListener('focus', function() {
  document.getElementById('NeckLymphNode1selectLocation').classList.remove('hidden');
});
document.addEventListener('click', function(e) {
  const NeckLymphNode1LocationElement = document.getElementById('NeckLymphNode1Location');
  const NeckLymphNode1selectLocationElement = document.getElementById('NeckLymphNode1selectLocation');
  if (!NeckLymphNode1LocationElement.contains(e.target) && !NeckLymphNode1selectLocationElement.contains(e.target)) {
	NeckLymphNode1selectLocationElement.classList.add('hidden');
  }
});


// new neck others 
document.getElementById('NeckNewOther1').addEventListener('click', function() {
  var element = document.getElementById('NeckOther1');
  element.classList.toggle('hidden'); 
  updateTexts();
});

document.getElementById('NeckOther1no').addEventListener('click', function() {
  var element = document.getElementById('NeckOther1');
  element.classList.add('hidden');
  updateTexts();
});

// THORAX

// lesion show

document.getElementById('ThoraxNewLesion1').addEventListener('click', function() {
  var element = document.getElementById('ThoraxLesion1');
  element.classList.toggle('hidden'); this.classList.toggle('toggleColorRed');
  updateTexts();
});

document.getElementById('ThoraxLesion1no').addEventListener('click', function() {
  var element = document.getElementById('ThoraxLesion1');
  element.classList.add('hidden');
  updateTexts();
});

document.getElementById('ThoraxLesion1number').addEventListener('change', function() {
  let selectedValue = this.value;
  let ThoraxLesion1LoclargestElement = document.getElementById('ThoraxLesion1Loclargest');

  if (selectedValue !== "") {
    ThoraxLesion1LoclargestElement.classList.remove('hidden');
  } else {
    ThoraxLesion1LoclargestElement.classList.add('hidden');
  }
});

document.getElementById('ThoraxLesion1Location').addEventListener('focus', function() {
  document.getElementById('ThoraxLesion1selectLocation').classList.remove('hidden');
});
document.addEventListener('click', function(e) {
  const ThoraxLesion1LocationElement = document.getElementById('ThoraxLesion1Location');
  const ThoraxLesion1selectLocationElement = document.getElementById('ThoraxLesion1selectLocation');
  if (!ThoraxLesion1LocationElement.contains(e.target) && !ThoraxLesion1selectLocationElement.contains(e.target)) {
	ThoraxLesion1selectLocationElement.classList.add('hidden');
  }
});


document.getElementById('ThoraxNewLesion2').addEventListener('click', function() {
  var element = document.getElementById('ThoraxLesion2');
  element.classList.toggle('hidden'); this.classList.toggle('toggleColorRed');
  updateTexts();
});

document.getElementById('ThoraxLesion2no').addEventListener('click', function() {
  var element = document.getElementById('ThoraxLesion2');
  element.classList.add('hidden');
  updateTexts();
});

document.getElementById('ThoraxLesion2number').addEventListener('change', function() {
  let selectedValue = this.value;
  let ThoraxLesion2LoclargestElement = document.getElementById('ThoraxLesion2Loclargest');

  if (selectedValue !== "") {
    ThoraxLesion2LoclargestElement.classList.remove('hidden');
  } else {
    ThoraxLesion2LoclargestElement.classList.add('hidden');
  }
});

document.getElementById('ThoraxLesion2Location').addEventListener('focus', function() {
  document.getElementById('ThoraxLesion2selectLocation').classList.remove('hidden');
});
document.addEventListener('click', function(e) {
  const ThoraxLesion2LocationElement = document.getElementById('ThoraxLesion2Location');
  const ThoraxLesion2selectLocationElement = document.getElementById('ThoraxLesion2selectLocation');
  if (!ThoraxLesion2LocationElement.contains(e.target) && !ThoraxLesion2selectLocationElement.contains(e.target)) {
	ThoraxLesion2selectLocationElement.classList.add('hidden');
  }
});


document.getElementById('ThoraxNewLesion3').addEventListener('click', function() {
  var element = document.getElementById('ThoraxLesion3');
  element.classList.toggle('hidden'); this.classList.toggle('toggleColorRed');
  updateTexts();
});

document.getElementById('ThoraxLesion3no').addEventListener('click', function() {
  var element = document.getElementById('ThoraxLesion3');
  element.classList.add('hidden');
  updateTexts();
});

document.getElementById('ThoraxLesion3number').addEventListener('change', function() {
  let selectedValue = this.value;
  let ThoraxLesion3LoclargestElement = document.getElementById('ThoraxLesion3Loclargest');

  if (selectedValue !== "") {
    ThoraxLesion3LoclargestElement.classList.remove('hidden');
  } else {
    ThoraxLesion3LoclargestElement.classList.add('hidden');
  }
});

document.getElementById('ThoraxLesion3Location').addEventListener('focus', function() {
  document.getElementById('ThoraxLesion3selectLocation').classList.remove('hidden');
});
document.addEventListener('click', function(e) {
  const ThoraxLesion3LocationElement = document.getElementById('ThoraxLesion3Location');
  const ThoraxLesion3selectLocationElement = document.getElementById('ThoraxLesion3selectLocation');
  if (!ThoraxLesion3LocationElement.contains(e.target) && !ThoraxLesion3selectLocationElement.contains(e.target)) {
	ThoraxLesion3selectLocationElement.classList.add('hidden');
  }
});

// new LN1

document.getElementById('ThoraxNewLymphNode1').addEventListener('click', function() {
  var element = document.getElementById('ThoraxLymphNode1');
  element.classList.toggle('hidden'); this.classList.toggle('toggleColorRed');
  updateTexts();
});

document.getElementById('ThoraxLymphNode1no').addEventListener('click', function() {
  var element = document.getElementById('ThoraxLymphNode1');
  element.classList.add('hidden');
  updateTexts();
});


//hiding LN1

document.getElementById('ThoraxLymphNode1number').addEventListener('change', function() {
  let selectedValue = this.value;
  let ThoraxLymphNode1LoclargestElement = document.getElementById('ThoraxLymphNode1Loclargest');

  if (selectedValue !== "") {
    ThoraxLymphNode1LoclargestElement.classList.remove('hidden');
  } else {
    ThoraxLymphNode1LoclargestElement.classList.add('hidden');
  }
});


document.getElementById('ThoraxLymphNode1Location').addEventListener('focus', function() {
  document.getElementById('ThoraxLymphNode1selectLocation').classList.remove('hidden');
});
document.addEventListener('click', function(e) {
  const ThoraxLymphNode1LocationElement = document.getElementById('ThoraxLymphNode1Location');
  const ThoraxLymphNode1selectLocationElement = document.getElementById('ThoraxLymphNode1selectLocation');
  if (!ThoraxLymphNode1LocationElement.contains(e.target) && !ThoraxLymphNode1selectLocationElement.contains(e.target)) {
	ThoraxLymphNode1selectLocationElement.classList.add('hidden');
  }
});

// new Thorax others 
document.getElementById('ThoraxNewOther1').addEventListener('click', function() {
  var element = document.getElementById('ThoraxOther1');
  element.classList.toggle('hidden');
  updateTexts();
});

document.getElementById('ThoraxOther1no').addEventListener('click', function() {
  var element = document.getElementById('ThoraxOther1');
  element.classList.add('hidden');
  updateTexts();
});


// ABDOMEN

// new lesion1

document.getElementById('AbdomenNewLesion1').addEventListener('click', function() {
  var element = document.getElementById('AbdomenLesion1');
  element.classList.toggle('hidden'); this.classList.toggle('toggleColorRed');
  updateTexts();
});

document.getElementById('AbdomenLesion1no').addEventListener('click', function() {
  var element = document.getElementById('AbdomenLesion1');
  element.classList.add('hidden');
  updateTexts();
});

document.getElementById('AbdomenLesion1number').addEventListener('change', function() {
  let selectedValue = this.value;
  let AbdomenLesion1LoclargestElement = document.getElementById('AbdomenLesion1Loclargest');

  if (selectedValue !== "") {
    AbdomenLesion1LoclargestElement.classList.remove('hidden');
  } else {
    AbdomenLesion1LoclargestElement.classList.add('hidden');
  }
});

document.getElementById('AbdomenLesion1Location').addEventListener('focus', function() {
  document.getElementById('AbdomenLesion1selectLocation').classList.remove('hidden'); document.getElementById('AbdomenLesion1selectLocationA').classList.remove('hidden'); 
});
document.addEventListener('click', function(e) {
  const AbdomenLesion1LocationElement = document.getElementById('AbdomenLesion1Location');
  const AbdomenLesion1selectLocationElement = document.getElementById('AbdomenLesion1selectLocation'); 
  const AbdomenLesion1selectLocationAElement = document.getElementById('AbdomenLesion1selectLocationA');
  if (!AbdomenLesion1LocationElement.contains(e.target) && !AbdomenLesion1selectLocationElement.contains(e.target) && !AbdomenLesion1selectLocationAElement.contains(e.target) ) {
	AbdomenLesion1selectLocationElement.classList.add('hidden'); 
	AbdomenLesion1selectLocationAElement.classList.add('hidden');
  }
});


document.getElementById('AbdomenNewLesion2').addEventListener('click', function() {
  var element = document.getElementById('AbdomenLesion2');
  element.classList.toggle('hidden'); this.classList.toggle('toggleColorRed');
  updateTexts();
});

document.getElementById('AbdomenLesion2no').addEventListener('click', function() {
  var element = document.getElementById('AbdomenLesion2');
  element.classList.add('hidden');
  updateTexts();
});

document.getElementById('AbdomenLesion2number').addEventListener('change', function() {
  let selectedValue = this.value;
  let AbdomenLesion2LoclargestElement = document.getElementById('AbdomenLesion2Loclargest');

  if (selectedValue !== "") {
    AbdomenLesion2LoclargestElement.classList.remove('hidden');
  } else {
    AbdomenLesion2LoclargestElement.classList.add('hidden');
  }
});

document.getElementById('AbdomenLesion2Location').addEventListener('focus', function() {
  document.getElementById('AbdomenLesion2selectLocation').classList.remove('hidden'); document.getElementById('AbdomenLesion2selectLocationA').classList.remove('hidden'); 
});
document.addEventListener('click', function(e) {
  const AbdomenLesion2LocationElement = document.getElementById('AbdomenLesion2Location');
  const AbdomenLesion2selectLocationElement = document.getElementById('AbdomenLesion2selectLocation'); 
  const AbdomenLesion2selectLocationAElement = document.getElementById('AbdomenLesion2selectLocationA');
  if (!AbdomenLesion2LocationElement.contains(e.target) && !AbdomenLesion2selectLocationElement.contains(e.target) && !AbdomenLesion2selectLocationAElement.contains(e.target) ) {
	AbdomenLesion2selectLocationElement.classList.add('hidden'); 
	AbdomenLesion2selectLocationAElement.classList.add('hidden');
  }
});

document.getElementById('AbdomenNewLesion3').addEventListener('click', function() {
  var element = document.getElementById('AbdomenLesion3');
  element.classList.toggle('hidden'); this.classList.toggle('toggleColorRed');
  updateTexts();
});

document.getElementById('AbdomenLesion3no').addEventListener('click', function() {
  var element = document.getElementById('AbdomenLesion3');
  element.classList.add('hidden');
  updateTexts();
});

document.getElementById('AbdomenLesion3number').addEventListener('change', function() {
  let selectedValue = this.value;
  let AbdomenLesion3LoclargestElement = document.getElementById('AbdomenLesion3Loclargest');

  if (selectedValue !== "") {
    AbdomenLesion3LoclargestElement.classList.remove('hidden');
  } else {
    AbdomenLesion3LoclargestElement.classList.add('hidden');
  }
});

document.getElementById('AbdomenLesion3Location').addEventListener('focus', function() {
  document.getElementById('AbdomenLesion3selectLocation').classList.remove('hidden'); document.getElementById('AbdomenLesion3selectLocationA').classList.remove('hidden'); 
});
document.addEventListener('click', function(e) {
  const AbdomenLesion3LocationElement = document.getElementById('AbdomenLesion3Location');
  const AbdomenLesion3selectLocationElement = document.getElementById('AbdomenLesion3selectLocation'); 
  const AbdomenLesion3selectLocationAElement = document.getElementById('AbdomenLesion3selectLocationA');
  if (!AbdomenLesion3LocationElement.contains(e.target) && !AbdomenLesion3selectLocationElement.contains(e.target) && !AbdomenLesion3selectLocationAElement.contains(e.target) ) {
	AbdomenLesion3selectLocationElement.classList.add('hidden'); 
	AbdomenLesion3selectLocationAElement.classList.add('hidden');
  }
});

// abdomen suboptions showing-hiding
function handleCheckboxChangeFactory(prefix, tablePrefix) {
    return function(event) {
        let suffix = event.target.id.replace(prefix, '');
        let tableId = tablePrefix + suffix;
        let element = document.getElementById(tableId);
        if(element) {
            element.classList.toggle('hidden');
        }
    };
}

function bindCheckboxListeners(prefix, tablePrefix, organList) {
    organList.forEach(suffix => {
        let checkboxId = prefix + suffix;
        let checkbox = document.getElementById(checkboxId);
        if(checkbox) {
            checkbox.addEventListener('change', handleCheckboxChangeFactory(prefix, tablePrefix));
        }
    });
}

const organs = ['Liver', 'Colon', 'Stomach', 'Pancreas', 'Adrenals', 'Kidneys', 'Uterus', 'Ovaries', 'Prostate', 'Peritoneum', 'Others'];

bindCheckboxListeners('Chb1AbdomenSelect', 'AbdomenLesion1selectLocation', organs);
bindCheckboxListeners('Chb2AbdomenSelect', 'AbdomenLesion2selectLocation', organs);
bindCheckboxListeners('Chb3AbdomenSelect', 'AbdomenLesion3selectLocation', organs);



// new abdomen lymph node 1

document.getElementById('AbdomenNewLymphNode1').addEventListener('click', function() {
  var element = document.getElementById('AbdomenLymphNode1');
  element.classList.toggle('hidden'); this.classList.toggle('toggleColorRed');
  updateTexts();
});

document.getElementById('AbdomenLymphNode1no').addEventListener('click', function() {
  var element = document.getElementById('AbdomenLymphNode1');
  element.classList.add('hidden');
  updateTexts();
});


//hiding abdomen LN

document.getElementById('AbdomenLymphNode1number').addEventListener('change', function() {
  let selectedValue = this.value;
  let AbdomenLymphNode1LoclargestElement = document.getElementById('AbdomenLymphNode1Loclargest');

  if (selectedValue !== "") {
    AbdomenLymphNode1LoclargestElement.classList.remove('hidden');
  } else {
    AbdomenLymphNode1LoclargestElement.classList.add('hidden');
  }
});


document.getElementById('AbdomenLymphNode1Location').addEventListener('focus', function() {
  document.getElementById('AbdomenLymphNode1selectLocation').classList.remove('hidden');
});
document.addEventListener('click', function(e) {
  const AbdomenLymphNode1LocationElement = document.getElementById('AbdomenLymphNode1Location');
  const AbdomenLymphNode1selectLocationElement = document.getElementById('AbdomenLymphNode1selectLocation');
  if (!AbdomenLymphNode1LocationElement.contains(e.target) && !AbdomenLymphNode1selectLocationElement.contains(e.target)) {
	AbdomenLymphNode1selectLocationElement.classList.add('hidden');
  }
});


// new Abdomen others 
document.getElementById('AbdomenNewOther1').addEventListener('click', function() {
  var element = document.getElementById('AbdomenOther1');
  element.classList.toggle('hidden');
  updateTexts();
});

document.getElementById('AbdomenOther1no').addEventListener('click', function() {
  var element = document.getElementById('AbdomenOther1');
  element.classList.add('hidden');
  updateTexts();
});


// SKELETON 

//  lesions

document.getElementById('SkeletonNewLesion1').addEventListener('click', function() {
  var element = document.getElementById('SkeletonLesion1');
  element.classList.toggle('hidden'); this.classList.toggle('toggleColorRed');
  updateTexts();
});

document.getElementById('SkeletonLesion1no').addEventListener('click', function() {
  var element = document.getElementById('SkeletonLesion1');
  element.classList.toggle('hidden'); 
  updateTexts();
});

document.getElementById('SkeletonLesion1number').addEventListener('change', function() {
  let selectedValue = this.value;
  let SkeletonLesion1LoclargestElement = document.getElementById('SkeletonLesion1Loclargest');

  if (selectedValue !== "") {
    SkeletonLesion1LoclargestElement.classList.remove('hidden');
  } else {
    SkeletonLesion1LoclargestElement.classList.add('hidden');
  }
});

document.getElementById('SkeletonLesion1Location').addEventListener('focus', function() {
  document.getElementById('SkeletonLesion1selectLocation').classList.remove('hidden');
});
document.addEventListener('click', function(e) {
  const SkeletonLesion1LocationElement = document.getElementById('SkeletonLesion1Location');
  const SkeletonLesion1selectLocationElement = document.getElementById('SkeletonLesion1selectLocation');
  if (!SkeletonLesion1LocationElement.contains(e.target) && !SkeletonLesion1selectLocationElement.contains(e.target)) {
	SkeletonLesion1selectLocationElement.classList.add('hidden');
  }
});


document.getElementById('SkeletonNewLesion2').addEventListener('click', function() {
  var element = document.getElementById('SkeletonLesion2');
  element.classList.toggle('hidden'); this.classList.toggle('toggleColorRed');
  updateTexts();
});

document.getElementById('SkeletonLesion2no').addEventListener('click', function() {
  var element = document.getElementById('SkeletonLesion2');
  element.classList.toggle('hidden');
  updateTexts();
});

document.getElementById('SkeletonLesion2Location').addEventListener('focus', function() {
  document.getElementById('SkeletonLesion2selectLocation').classList.remove('hidden');
});
document.addEventListener('click', function(e) {
  const SkeletonLesion2LocationElement = document.getElementById('SkeletonLesion2Location');
  const SkeletonLesion2selectLocationElement = document.getElementById('SkeletonLesion2selectLocation');
  if (!SkeletonLesion2LocationElement.contains(e.target) && !SkeletonLesion2selectLocationElement.contains(e.target)) {
	SkeletonLesion2selectLocationElement.classList.add('hidden');
  }
});

document.getElementById('SkeletonLesion2number').addEventListener('change', function() {
  let selectedValue = this.value;
  let SkeletonLesion2LoclargestElement = document.getElementById('SkeletonLesion2Loclargest');

  if (selectedValue !== "") {
    SkeletonLesion2LoclargestElement.classList.remove('hidden');
  } else {
    SkeletonLesion2LoclargestElement.classList.add('hidden');
  }
});


document.getElementById('SkeletonNewLesion3').addEventListener('click', function() {
  var element = document.getElementById('SkeletonLesion3');
  element.classList.toggle('hidden'); this.classList.toggle('toggleColorRed');
  updateTexts();
});

document.getElementById('SkeletonLesion3no').addEventListener('click', function() {
  var element = document.getElementById('SkeletonLesion3');
  element.classList.toggle('hidden');
  updateTexts();
});

document.getElementById('SkeletonLesion3Location').addEventListener('focus', function() {
  document.getElementById('SkeletonLesion3selectLocation').classList.remove('hidden');
});
document.addEventListener('click', function(e) {
  const SkeletonLesion3LocationElement = document.getElementById('SkeletonLesion3Location');
  const SkeletonLesion3selectLocationElement = document.getElementById('SkeletonLesion3selectLocation');
  if (!SkeletonLesion3LocationElement.contains(e.target) && !SkeletonLesion3selectLocationElement.contains(e.target)) {
	SkeletonLesion3selectLocationElement.classList.add('hidden');
  }
});

document.getElementById('SkeletonLesion3number').addEventListener('change', function() {
  let selectedValue = this.value;
  let SkeletonLesion3LoclargestElement = document.getElementById('SkeletonLesion3Loclargest');

  if (selectedValue !== "") {
    SkeletonLesion3LoclargestElement.classList.remove('hidden');
  } else {
    SkeletonLesion3LoclargestElement.classList.add('hidden');
  }
});

// new Skeleton others 
document.getElementById('SkeletonNewOther1').addEventListener('click', function() {
  var element = document.getElementById('SkeletonOther1');
  element.classList.toggle('hidden');
  updateTexts();
});

document.getElementById('SkeletonOther1no').addEventListener('click', function() {
  var element = document.getElementById('SkeletonOther1');
  element.classList.toggle('hidden');
  updateTexts();
});


// Lesion aktivita   


  
var aktivitaOptions = [
    { text: "není", value: "bez akumulace RF", valuez1: "bez metabolické aktivity", valuez2: "ametabolické"},
    { text: "nízká", value: "s nízkou akumulací RF", valuez1: "s nízkou metabolickou aktivitou", valuez2: "nízce metabolicky aktivní "},
    { text: "intermed.", value: "se střední akumulací RF", valuez1: "se střední metabolickou aktivitou", valuez2: "intermediárně metabolicky aktivní "},
    { text: "zvýšená", value: "s mírně zvýšenou akumulací RF", valuez1: "s mírně zvýšenou metabolickou aktivitou", valuez2: "mírně hypermetabolické "},
    { text: "vysoká", value: "s vysokou akumulací RF", valuez1: "s vysokou metabolickou aktivitou", valuez2: "hypermetabolické "},
	{ text: "enormní", value: "s velmi vysokou akumulací RF", valuez1: "s velmi vysokou metabolickou aktivitou", valuez2: "výrazně hypermetabolické "}
];

function populateAktivitaOptions() {
    var selectElements = document.querySelectorAll("select[id$='Activity']");

    selectElements.forEach(function (selectElement) {
        aktivitaOptions.forEach(function (option) {
            var optionElement = document.createElement("option");
            optionElement.value = option.value;
            optionElement.textContent = option.text;
            optionElement.dataset.valuez1 = option.valuez1;
			optionElement.dataset.valuez2 = option.valuez2;
            selectElement.appendChild(optionElement);
        });
    });
}

populateAktivitaOptions();



// Lesion hodnoceni

var hodnoceniOptions = [
    { text: "---", value: ": benigního vzhledu", valuez1: ": benigního vzhledu"},
    { text: "-", value: ": nemá charakter viabilní neoplázie", valuez1: ": v.s. zánětlivá aktivace"},
    { text: "+/-", value: ": nespecifický nález", valuez1: ": nespecifický nález"},
    { text: "+", value: ": suspektní z viabilní neoplázie", valuez1: ": suspektní z infiltrace neoplazií"},
    { text: "+++", value:": charakteru viabilní neoplázie", valuez1: ": charakteru infiltrace neoplazií"},
	{ text: "M1", value:": obrazu metastáz", valuez1: ": infiltrace neoplazií"}
];

function populateHodnoceniOptions() {
    var selectElements = document.querySelectorAll("select[id$='Decision']");

    selectElements.forEach(function (selectElement) {
        hodnoceniOptions.forEach(function (option) {
            var optionElement = document.createElement("option");
            optionElement.value = option.value;
            optionElement.textContent = option.text;
            optionElement.dataset.valuez1 = option.valuez1;
            selectElement.appendChild(optionElement);
        });
    });
}
populateHodnoceniOptions();


// SUV = aktivita automaticky

document.querySelectorAll('input[id$="SUV"]').forEach((input) => {
  input.addEventListener('input', (event) => {
    let name = event.target.id.replace('SUV', '');
    let suv = parseFloat(document.getElementById(`${name}SUV`).value);
    let Liver = parseFloat(document.getElementById('SUVLiver').value);

    if (!isNaN(suv) && !isNaN(Liver) && Liver != "") {
      let ratio = suv / Liver;
      let aktSelect = document.getElementById(`${name}Activity`);

      if (ratio >= 0 && ratio < 0.2) {
        aktSelect.value = 'bez akumulace RF';
      } else if (ratio >= 0.2 && ratio < 0.8) {
        aktSelect.value = 's nízkou akumulací RF';
      } else if (ratio >= 0.8 && ratio < 1.2) {
        aktSelect.value = 'se střední akumulací RF';
      } else if (ratio >= 1.2 && ratio < 1.5) {
        aktSelect.value = 's mírně zvýšenou akumulací RF';
      } else if (ratio >= 1.5 && ratio < 3) {
        aktSelect.value = 's vysokou akumulací RF';
      } else if (ratio >= 3) {
        aktSelect.value = 's velmi vysokou akumulací RF';
      }
    }
  });
});

document.getElementById('SUVLiver').addEventListener('input', () => {
  let event = new Event('input');
  document.querySelectorAll('input[id$="SUV"]').forEach((input) => {
    input.dispatchEvent(event);
  });
});

document.getElementById('SUVLiverPrevious').addEventListener('input', () => {
  let event = new Event('input');
  document.querySelectorAll('input[id$="SUV"]').forEach((input) => {
    input.dispatchEvent(event);
  });
});

document.getElementById('SUVParotid').addEventListener('input', () => {
  let event = new Event('input');
  document.querySelectorAll('input[id$="SUV"]').forEach((input) => {
    input.dispatchEvent(event);
  });
});

// NUMBERS MOUSE WHEELING

window.addEventListener('load', function() {
    var numberInputs = document.getElementsByClassName("numbers");
    for (var i = 0; i < numberInputs.length; i++) {
        numberInputs[i].addEventListener('wheel', function(e) {
            if (this.value === "") {
                this.value = 0;
            }
            e.preventDefault();			// Prevents the browser from scrolling while changing the number
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

// AUTOCOMPLETE OFF

window.onload = function() {
  var inputs = document.getElementsByTagName('input');
  for(var i = 0; i < inputs.length; i++) {
    inputs[i].setAttribute('autocomplete', 'off');
  }

  var textareas = document.getElementsByTagName('textarea');
  for(var i = 0; i < textareas.length; i++) {
    textareas[i].setAttribute('autocomplete', 'off');
  }
};

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
    // Add 'contextmenu' event to each button
    buttons[i].addEventListener("contextmenu", function(e){
        // Prevent the default context menu from showing up
        e.preventDefault();
    });
}



// COPY

var copyPOP = document.getElementById('copyPOP');
var POPText = document.getElementById('POPText');

copyPOP.addEventListener('click', function() {
    navigator.clipboard.writeText(POPText.value)
    .then(() => {
        POPText.classList.add('highlight');

        setTimeout(function() {
            POPText.classList.remove('highlight');
        }, 100);
    })
    .catch(err => {
    });
});



var copyRES = document.getElementById('copyRES');
var RESText = document.getElementById('RESText');

copyRES.addEventListener('click', function() {
    navigator.clipboard.writeText(RESText.value)
    .then(() => {
        RESText.classList.add('highlight');

        setTimeout(function() {
            RESText.classList.remove('highlight');
        }, 100);
    })
    .catch(err => {
    });
});




// IMAGE KRK NODES
let krknodImage = document.getElementById('krknodImage'); 
let krknodImageIndex = 1; 

krknodImage.src = `./pickrknod/krknod-${String(krknodImageIndex).padStart(2, '0')}.jpg`; 

document.getElementById('NeckLymphNode1Location').addEventListener('focus', function() {
  showImageKrknod();
});

document.addEventListener('click', function(e) {
  const NeckLymphNode1LocationElement = document.getElementById('NeckLymphNode1Location');
  const NeckLymphNode1selectLocationElement = document.getElementById('NeckLymphNode1selectLocation');
  if (!NeckLymphNode1LocationElement.contains(e.target) && !NeckLymphNode1selectLocationElement.contains(e.target) && !krknodImage.contains(e.target)) {
    hideImageKrknod();
  }
});

function showImageKrknod() {
  krknodImage.style.display = 'block';
}

function hideImageKrknod() {
  krknodImage.style.display = 'none';
}

krknodImage.addEventListener('wheel', scrollImagesKrknod);

function scrollImagesKrknod(event) {
  if (event.deltaY > 0) {
    if (krknodImageIndex < 34) krknodImageIndex++;
  } else {
    if (krknodImageIndex > 1) krknodImageIndex--;
  }

  krknodImage.src = `./pickrknod/krknod-${String(krknodImageIndex).padStart(2, '0')}.jpg`;

  event.preventDefault();
}


// IMAGE MED NODES
let mednodImage = document.getElementById('mednodImage'); 
let mednodImageIndex = 1; 

mednodImage.src = `./picmednod/mednod-${String(mednodImageIndex).padStart(2, '0')}.jpg`; 

document.getElementById('ThoraxLymphNode1Location').addEventListener('focus', function() {
  showImageMednod();
});

document.addEventListener('click', function(e) {
  const ThoraxLymphNode1LocationElement = document.getElementById('ThoraxLymphNode1Location');
  const ThoraxLymphNode1selectLocationElement = document.getElementById('ThoraxLymphNode1selectLocation');
  if (!ThoraxLymphNode1LocationElement.contains(e.target) && !ThoraxLymphNode1selectLocationElement.contains(e.target) && !mednodImage.contains(e.target)) {
    hideImageMednod();
  }
});

function showImageMednod() {
  mednodImage.style.display = 'block';
}

function hideImageMednod() {
  mednodImage.style.display = 'none';
}

mednodImage.addEventListener('wheel', scrollImagesMednod);

function scrollImagesMednod(event) {
  if (event.deltaY > 0) {
    if (mednodImageIndex < 28) mednodImageIndex++;
  } else {
    if (mednodImageIndex > 1) mednodImageIndex--;
  }
  // Update the src attribute within the event handler to match the new naming format and file extension
  mednodImage.src = `./picmednod/mednod-${String(mednodImageIndex).padStart(2, '0')}.jpg`;

  event.preventDefault();
}


// IMAGE CHEST SEG
let chestsegImage = document.getElementById('chestsegImage'); 
let chestsegImageIndex = 2; 

chestsegImage.src = `./picchestseg/chestseg-${String(chestsegImageIndex).padStart(2, '0')}.png`;

['ThoraxLesion1Location', 'ThoraxLesion2Location', 'ThoraxLesion3Location'].forEach(id => {
  document.getElementById(id).addEventListener('focus', function() {
    showImageChestseg();
  });
});

document.addEventListener('click', function(e) {
  const thoraxLesionElements = [
    document.getElementById('ThoraxLesion1Location'), document.getElementById('ThoraxLesion2Location'), document.getElementById('ThoraxLesion3Location'),
    document.getElementById('ThoraxLesion1selectLocation'), document.getElementById('ThoraxLesion2selectLocation'), document.getElementById('ThoraxLesion3selectLocation'),
  ];

  if (thoraxLesionElements.every(el => !el.contains(e.target)) && !chestsegImage.contains(e.target)) {
    hideImageChestseg();
  }
});

function showImageChestseg() {
  chestsegImage.style.display = 'block';
}

function hideImageChestseg() {
  chestsegImage.style.display = 'none';
}

chestsegImage.addEventListener('wheel', scrollImagesChestseg);

function scrollImagesChestseg(event) {
  if (event.deltaY > 0) {
    if (chestsegImageIndex < 28) chestsegImageIndex++;
  } else {
    if (chestsegImageIndex > 2) chestsegImageIndex--;
  }

  chestsegImage.src = `./picchestseg/chestseg-${String(chestsegImageIndex).padStart(2, '0')}.png`;

  event.preventDefault();
}


