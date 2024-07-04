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
                    element.textContent = element.textContent.replace(/L\d+/, `L${destNumber}`);
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




//buttons

var textsPETType = ["FDG", "PSMA", "DOTATOC"];
var buttonElementPETType = document.getElementById("PETTypeButton");
buttonElementPETType.value = "FDG";
var indexPETType = 0;function cyclePETTypeText(event) {  indexPETType = cycleText(event, textsPETType, indexPETType, buttonElementPETType, updateBackgroundColor);}

function cyclePETTypeText(event) {  indexPETType = cycleText(event, textsPETType, indexPETType, buttonElementPETType, updateBackgroundColor);  updateTexts();}




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


// new LESIONS


document.getElementById('NeckNewLesions').addEventListener('click', function() {
  var lesionIds = ['NeckLesion1', 'NeckLesion2', 'NeckLesion3'];

  for (var i = 0; i < lesionIds.length; i++) {
    var element = document.getElementById(lesionIds[i]);
    if (element.classList.contains('hidden')) {
      element.classList.remove('hidden');
      break; 
    }
  }
  updateTexts();
  updateNeckButtonColor();
});

document.getElementById('NeckNewLesions').addEventListener('contextmenu', function(event) {
  event.preventDefault();
  var lesionIds = ['NeckLesion3', 'NeckLesion2', 'NeckLesion1'];

  for (var i = 0; i < lesionIds.length; i++) {
    var element = document.getElementById(lesionIds[i]);
    if (!element.classList.contains('hidden')) {
      element.classList.add('hidden');
      break; 
    }
  }
  updateTexts();
  updateNeckButtonColor();
});



function updateNeckButtonColor() {
    var Necklesions = ['NeckLesion1', 'NeckLesion2', 'NeckLesion3'];
    var Neckbutton = document.getElementById('NeckNewLesions');
    var isHidden = Necklesions.every(function(id) {
        return document.getElementById(id).classList.contains('hidden');
    });

    if (isHidden) {
        Neckbutton.classList.remove('toggleColorRed');
    } else {
        Neckbutton.classList.add('toggleColorRed');
    }
}


document.getElementById('NeckLesion1no').addEventListener('click', function() {
  var element = document.getElementById('NeckLesion1');
  element.classList.add('hidden'); 
  updateTexts();
  updateNeckButtonColor();
});

document.getElementById('NeckLesion1no').addEventListener('contextmenu', function(event) {
  var element = document.getElementById('NeckLesion1');
  element.classList.add('hidden'); 
  updateTexts();
  updateNeckButtonColor();
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
  var inputRect = this.getBoundingClientRect();
  var dropdown = document.getElementById('NeckLesion1selectLocation');
  dropdown.style.left = inputRect.left + 'px'; dropdown.style.top = inputRect.bottom + 2 + 'px'; dropdown.classList.remove('hidden');
});

document.addEventListener('click', function(e) {
  var dropdown = document.getElementById('NeckLesion1selectLocation');
  if (!document.getElementById('NeckLesion1Location').contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.add('hidden');
  }
});




document.getElementById('NeckLesion2no').addEventListener('click', function() {
  var element = document.getElementById('NeckLesion2');
  element.classList.add('hidden');
  updateTexts();
  updateNeckButtonColor();
});

document.getElementById('NeckLesion2no').addEventListener('contextmenu', function(event) {
  var element = document.getElementById('NeckLesion2');
  element.classList.add('hidden');
  updateTexts();
  updateNeckButtonColor();
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
  var inputRect = this.getBoundingClientRect();
  var dropdown = document.getElementById('NeckLesion2selectLocation');
  dropdown.style.left = inputRect.left + 'px'; dropdown.style.top = inputRect.bottom + 2 + 'px'; dropdown.classList.remove('hidden');
});

document.addEventListener('click', function(e) {
  var dropdown = document.getElementById('NeckLesion2selectLocation');
  if (!document.getElementById('NeckLesion2Location').contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.add('hidden');
  }
});



document.getElementById('NeckLesion3no').addEventListener('click', function() {
  var element = document.getElementById('NeckLesion3');
  element.classList.add('hidden');
  updateTexts();
  updateNeckButtonColor();
});

document.getElementById('NeckLesion3no').addEventListener('contextmenu', function(event) {
  var element = document.getElementById('NeckLesion3');
  element.classList.add('hidden');
  updateTexts();
  updateNeckButtonColor();
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
  var inputRect = this.getBoundingClientRect();
  var dropdown = document.getElementById('NeckLesion3selectLocation');
  dropdown.style.left = inputRect.left + 'px'; dropdown.style.top = inputRect.bottom + 2 + 'px'; dropdown.classList.remove('hidden');
});

document.addEventListener('click', function(e) {
  var dropdown = document.getElementById('NeckLesion3selectLocation');
  if (!document.getElementById('NeckLesion3Location').contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.add('hidden');
  }
});



// new lymph node 1

document.getElementById('NeckNewLymphNode1').addEventListener('click', function() {
  var element = document.getElementById('NeckLymphNode1');
  element.classList.remove('hidden'); this.classList.add('toggleColorRed');
  updateTexts();
});

document.getElementById('NeckNewLymphNode1').addEventListener('contextmenu', function(event) {
  event.preventDefault(); 
  var element = document.getElementById('NeckLymphNode1');
  element.classList.add('hidden');   this.classList.remove('toggleColorRed');
  updateTexts();
});

document.getElementById('NeckLymphNode1no').addEventListener('click', function() {
  var element = document.getElementById('NeckLymphNode1');
  element.classList.add('hidden');
  var button = document.getElementById('NeckNewLymphNode1');
  button.classList.remove('toggleColorRed');
  updateTexts();
});

document.getElementById('NeckLymphNode1no').addEventListener('contextmenu', function(event) {
  var element = document.getElementById('NeckLymphNode1');
  element.classList.add('hidden');
  var button = document.getElementById('NeckNewLymphNode1');
  button.classList.remove('toggleColorRed');
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
  var dropdown = document.getElementById('NeckLymphNode1selectLocation');
  var rect = this.getBoundingClientRect();
  dropdown.style.left = rect.left + 'px';
  dropdown.style.top = rect.bottom + 2 + 'px';
  dropdown.classList.remove('hidden');
});

document.addEventListener('click', function(e) {
  var dropdown = document.getElementById('NeckLymphNode1selectLocation');
  if (!document.getElementById('NeckLymphNode1Location').contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.add('hidden');
  }
});


// new neck OTHERS 

document.getElementById('NeckNewOther1').addEventListener('click', function() {
  var element = document.getElementById('NeckOther1');
  element.classList.remove('hidden');  this.classList.add('toggleColorRed');
  updateTexts();
});

document.getElementById('NeckNewOther1').addEventListener('contextmenu', function(event) {
  event.preventDefault(); 
  var element = document.getElementById('NeckOther1');
  element.classList.add('hidden');  this.classList.remove('toggleColorRed');
  updateTexts();
});

document.getElementById('NeckOther1no').addEventListener('click', function() {
  var element = document.getElementById('NeckOther1');
  element.classList.add('hidden');
  var button = document.getElementById('NeckNewOther1');
  button.classList.remove('toggleColorRed');
  updateTexts();
});

document.getElementById('NeckOther1no').addEventListener('contextmenu', function(event) {
  var element = document.getElementById('NeckOther1');
  element.classList.add('hidden');
  var button = document.getElementById('NeckNewOther1');
  button.classList.remove('toggleColorRed');
  updateTexts();
});


// THORAX

// new LESIONS

document.getElementById('ThoraxNewLesions').addEventListener('click', function() {
  var lesionIds = ['ThoraxLesion1', 'ThoraxLesion2', 'ThoraxLesion3'];

  for (var i = 0; i < lesionIds.length; i++) {
    var element = document.getElementById(lesionIds[i]);
    if (element.classList.contains('hidden')) {
      element.classList.remove('hidden');
      break; 
    }
  }
  updateTexts();
  updateThoraxButtonColor();
});

document.getElementById('ThoraxNewLesions').addEventListener('contextmenu', function(event) {
  event.preventDefault();
  var lesionIds = ['ThoraxLesion3', 'ThoraxLesion2', 'ThoraxLesion1'];

  for (var i = 0; i < lesionIds.length; i++) {
    var element = document.getElementById(lesionIds[i]);
    if (!element.classList.contains('hidden')) {
      element.classList.add('hidden');
      break; 
    }
  }
  updateTexts();
  updateThoraxButtonColor();
});


function updateThoraxButtonColor() {
    var Thoraxlesions = ['ThoraxLesion1', 'ThoraxLesion2', 'ThoraxLesion3'];
    var Thoraxbutton = document.getElementById('ThoraxNewLesions');
    var isHidden = Thoraxlesions.every(function(id) {
        return document.getElementById(id).classList.contains('hidden');
    });

    if (isHidden) {
        Thoraxbutton.classList.remove('toggleColorRed');
    } else {
        Thoraxbutton.classList.add('toggleColorRed');
    }
}

// lesion show

document.getElementById('ThoraxLesion1no').addEventListener('click', function() {
  var element = document.getElementById('ThoraxLesion1');
  element.classList.add('hidden');
  updateTexts();
  updateThoraxButtonColor();
});

document.getElementById('ThoraxLesion1no').addEventListener('contextmenu', function(event) {
  var element = document.getElementById('ThoraxLesion1');
  element.classList.add('hidden');
  updateTexts();
  updateThoraxButtonColor();
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
  var inputRect = this.getBoundingClientRect();
  var dropdown = document.getElementById('ThoraxLesion1selectLocation');
  dropdown.style.left = inputRect.left + 'px'; dropdown.style.top = inputRect.bottom + 2 + 'px'; dropdown.classList.remove('hidden');
});

document.addEventListener('click', function(e) {
  var dropdown = document.getElementById('ThoraxLesion1selectLocation');
  if (!document.getElementById('ThoraxLesion1Location').contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.add('hidden');
  }
});


document.getElementById('ThoraxLesion2no').addEventListener('click', function() {
  var element = document.getElementById('ThoraxLesion2');
  element.classList.add('hidden');
  updateTexts();
  updateThoraxButtonColor();
});

document.getElementById('ThoraxLesion2no').addEventListener('contextmenu', function(event) {
  var element = document.getElementById('ThoraxLesion2');
  element.classList.add('hidden');
  updateTexts();
  updateThoraxButtonColor();
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
  var inputRect = this.getBoundingClientRect();
  var dropdown = document.getElementById('ThoraxLesion2selectLocation');
  dropdown.style.left = inputRect.left + 'px'; dropdown.style.top = inputRect.bottom + 2 + 'px'; dropdown.classList.remove('hidden');
});

document.addEventListener('click', function(e) {
  var dropdown = document.getElementById('ThoraxLesion2selectLocation');
  if (!document.getElementById('ThoraxLesion2Location').contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.add('hidden');
  }
});


document.getElementById('ThoraxLesion3no').addEventListener('click', function() {
  var element = document.getElementById('ThoraxLesion3');
  element.classList.add('hidden');
  updateTexts();
  updateThoraxButtonColor();
});

document.getElementById('ThoraxLesion3no').addEventListener('contextmenu', function(event) {
  var element = document.getElementById('ThoraxLesion3');
  element.classList.add('hidden');
  updateTexts();
  updateThoraxButtonColor();
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
  var inputRect = this.getBoundingClientRect();
  var dropdown = document.getElementById('ThoraxLesion3selectLocation');
  dropdown.style.left = inputRect.left + 'px'; dropdown.style.top = inputRect.bottom + 2 + 'px'; dropdown.classList.remove('hidden');
});

document.addEventListener('click', function(e) {
  var dropdown = document.getElementById('ThoraxLesion3selectLocation');
  if (!document.getElementById('ThoraxLesion3Location').contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.add('hidden');
  }
});

// new LN1

document.getElementById('ThoraxNewLymphNode1').addEventListener('click', function() {
  var element = document.getElementById('ThoraxLymphNode1');
  element.classList.remove('hidden'); this.classList.add('toggleColorRed');
  updateTexts();
});

document.getElementById('ThoraxNewLymphNode1').addEventListener('contextmenu', function(event) {
  event.preventDefault(); 
  var element = document.getElementById('ThoraxLymphNode1');
  element.classList.add('hidden');   this.classList.remove('toggleColorRed');
  updateTexts();
});


document.getElementById('ThoraxLymphNode1no').addEventListener('click', function() {
  var element = document.getElementById('ThoraxLymphNode1');
  element.classList.add('hidden');
  var button = document.getElementById('ThoraxNewLymphNode1');
  button.classList.remove('toggleColorRed');
  updateTexts();
});

document.getElementById('ThoraxLymphNode1no').addEventListener('contextmenu', function(event) {
  var element = document.getElementById('ThoraxLymphNode1');
  element.classList.add('hidden');
  var button = document.getElementById('ThoraxNewLymphNode1');
  button.classList.remove('toggleColorRed');
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
  var dropdown = document.getElementById('ThoraxLymphNode1selectLocation');
  var rect = this.getBoundingClientRect();
  dropdown.style.left = rect.left + 'px'; dropdown.style.top = rect.bottom + 2 + 'px'; dropdown.classList.remove('hidden');
});

document.addEventListener('click', function(e) {
  var dropdown = document.getElementById('ThoraxLymphNode1selectLocation');
  if (!document.getElementById('ThoraxLymphNode1Location').contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.add('hidden');
  }
});

// new Thorax OTHERS 

document.getElementById('ThoraxNewOther1').addEventListener('click', function() {
  var element = document.getElementById('ThoraxOther1');
  element.classList.remove('hidden');  this.classList.add('toggleColorRed');
  updateTexts();
});

document.getElementById('ThoraxNewOther1').addEventListener('contextmenu', function(event) {
  event.preventDefault(); 
  var element = document.getElementById('ThoraxOther1');
  element.classList.add('hidden');  this.classList.remove('toggleColorRed');
  updateTexts();
});

document.getElementById('ThoraxOther1no').addEventListener('click', function() {
  var element = document.getElementById('ThoraxOther1');
  element.classList.add('hidden');
  var button = document.getElementById('ThoraxNewOther1');
  button.classList.remove('toggleColorRed');
  updateTexts();
});

document.getElementById('ThoraxOther1no').addEventListener('contextmenu', function(event) {
  var element = document.getElementById('ThoraxOther1');
  element.classList.add('hidden');
  var button = document.getElementById('ThoraxNewOther1');
  button.classList.remove('toggleColorRed');
  updateTexts();
});

// ABDOMEN

// new LESIONS

document.getElementById('AbdomenNewLesions').addEventListener('click', function() {
  var lesionIds = ['AbdomenLesion1', 'AbdomenLesion2', 'AbdomenLesion3'];

  for (var i = 0; i < lesionIds.length; i++) {
    var element = document.getElementById(lesionIds[i]);
    if (element.classList.contains('hidden')) {
      element.classList.remove('hidden');
      break; 
    }
  }
  updateTexts();
  updateAbdomenButtonColor();
});

document.getElementById('AbdomenNewLesions').addEventListener('contextmenu', function(event) {
  event.preventDefault();
  var lesionIds = ['AbdomenLesion3', 'AbdomenLesion2', 'AbdomenLesion1'];

  for (var i = 0; i < lesionIds.length; i++) {
    var element = document.getElementById(lesionIds[i]);
    if (!element.classList.contains('hidden')) {
      element.classList.add('hidden');
      break; 
    }
  }
  updateTexts();
  updateAbdomenButtonColor();
});

function updateAbdomenButtonColor() {
    var Abdomenlesions = ['AbdomenLesion1', 'AbdomenLesion2', 'AbdomenLesion3'];
    var Abdomenbutton = document.getElementById('AbdomenNewLesions');
    var isHidden = Abdomenlesions.every(function(id) {
        return document.getElementById(id).classList.contains('hidden');
    });

    if (isHidden) {
        Abdomenbutton.classList.remove('toggleColorRed');
    } else {
        Abdomenbutton.classList.add('toggleColorRed');
    }
}

// new lesion1

document.getElementById('AbdomenLesion1no').addEventListener('click', function() {
  var element = document.getElementById('AbdomenLesion1');
  element.classList.add('hidden');
  updateTexts();
  updateAbdomenButtonColor();
});

document.getElementById('AbdomenLesion1no').addEventListener('contextmenu', function(event) {
  var element = document.getElementById('AbdomenLesion1');
  element.classList.add('hidden');
  updateTexts();
  updateAbdomenButtonColor();
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
  var rect = this.getBoundingClientRect();
  var dropdown1 = document.getElementById('AbdomenLesion1selectLocation');
  var dropdown2 = document.getElementById('AbdomenLesion1selectLocationA');
  dropdown1.style.left = rect.left + 'px';
  dropdown1.style.top = rect.bottom + 2 + 'px';
  dropdown2.style.left = rect.left + 'px';
  dropdown2.style.top = rect.bottom + 2 + 'px';
  dropdown1.classList.remove('hidden');
  dropdown2.classList.remove('hidden');
});

document.addEventListener('click', function(e) {
  var dropdown1 = document.getElementById('AbdomenLesion1selectLocation');
  var dropdown2 = document.getElementById('AbdomenLesion1selectLocationA');
  if (!document.getElementById('AbdomenLesion1Location').contains(e.target) && !dropdown1.contains(e.target) && !dropdown2.contains(e.target)) {
    dropdown1.classList.add('hidden');
    dropdown2.classList.add('hidden');
  }
});



document.getElementById('AbdomenLesion2no').addEventListener('click', function() {
  var element = document.getElementById('AbdomenLesion2');
  element.classList.add('hidden');
  updateTexts();
  updateAbdomenButtonColor();
});

document.getElementById('AbdomenLesion2no').addEventListener('contextmenu', function(event) {
  var element = document.getElementById('AbdomenLesion2');
  element.classList.add('hidden');
  updateTexts();
  updateAbdomenButtonColor();
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
  var rect = this.getBoundingClientRect();
  var dropdown1 = document.getElementById('AbdomenLesion2selectLocation');
  var dropdown2 = document.getElementById('AbdomenLesion2selectLocationA');
  dropdown1.style.left = rect.left + 'px';
  dropdown1.style.top = rect.bottom + 2 + 'px';
  dropdown2.style.left = rect.left + 'px';
  dropdown2.style.top = rect.bottom + 2 + 'px';
  dropdown1.classList.remove('hidden');
  dropdown2.classList.remove('hidden');
});

document.addEventListener('click', function(e) {
  var dropdown1 = document.getElementById('AbdomenLesion2selectLocation');
  var dropdown2 = document.getElementById('AbdomenLesion2selectLocationA');
  if (!document.getElementById('AbdomenLesion2Location').contains(e.target) && !dropdown1.contains(e.target) && !dropdown2.contains(e.target)) {
    dropdown1.classList.add('hidden');
    dropdown2.classList.add('hidden');
  }
});



document.getElementById('AbdomenLesion3no').addEventListener('click', function() {
  var element = document.getElementById('AbdomenLesion3');
  element.classList.add('hidden');
  updateTexts();
  updateAbdomenButtonColor();
});

document.getElementById('AbdomenLesion3no').addEventListener('contextmenu', function(event) {
  var element = document.getElementById('AbdomenLesion3');
  element.classList.add('hidden');
  updateTexts();
  updateAbdomenButtonColor();
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
  var rect = this.getBoundingClientRect();
  var dropdown1 = document.getElementById('AbdomenLesion3selectLocation');
  var dropdown2 = document.getElementById('AbdomenLesion3selectLocationA');
  dropdown1.style.left = rect.left + 'px';
  dropdown1.style.top = rect.bottom + 2 + 'px';
  dropdown2.style.left = rect.left + 'px';
  dropdown2.style.top = rect.bottom + 2 + 'px';
  dropdown1.classList.remove('hidden');
  dropdown2.classList.remove('hidden');
});

document.addEventListener('click', function(e) {
  var dropdown1 = document.getElementById('AbdomenLesion3selectLocation');
  var dropdown2 = document.getElementById('AbdomenLesion3selectLocationA');
  if (!document.getElementById('AbdomenLesion3Location').contains(e.target) && !dropdown1.contains(e.target) && !dropdown2.contains(e.target)) {
    dropdown1.classList.add('hidden');
    dropdown2.classList.add('hidden');
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
  element.classList.remove('hidden'); this.classList.add('toggleColorRed');
  updateTexts();
});

document.getElementById('AbdomenNewLymphNode1').addEventListener('contextmenu', function(event) {
  event.preventDefault(); 
  var element = document.getElementById('AbdomenLymphNode1');
  element.classList.add('hidden');   this.classList.remove('toggleColorRed');
  updateTexts();
});


document.getElementById('AbdomenLymphNode1no').addEventListener('click', function() {
  var element = document.getElementById('AbdomenLymphNode1');
  element.classList.add('hidden');
  var button = document.getElementById('AbdomenNewLymphNode1');
  button.classList.remove('toggleColorRed');
  updateTexts();
});

document.getElementById('AbdomenLymphNode1no').addEventListener('contextmenu', function(event) {
  var element = document.getElementById('AbdomenLymphNode1');
  element.classList.add('hidden');
  var button = document.getElementById('AbdomenNewLymphNode1');
  button.classList.remove('toggleColorRed');
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
  var dropdown = document.getElementById('AbdomenLymphNode1selectLocation');
  var rect = this.getBoundingClientRect();
  dropdown.style.left = rect.left + 'px'; dropdown.style.top = rect.bottom + 2 + 'px'; dropdown.classList.remove('hidden');
});

document.addEventListener('click', function(e) {
  var dropdown = document.getElementById('AbdomenLymphNode1selectLocation');
  if (!document.getElementById('AbdomenLymphNode1Location').contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.add('hidden');
  }
});


// new Abdomen OTHERS 
document.getElementById('AbdomenNewOther1').addEventListener('click', function() {
  var element = document.getElementById('AbdomenOther1');
  element.classList.remove('hidden');  this.classList.add('toggleColorRed');
  updateTexts();
});

document.getElementById('AbdomenNewOther1').addEventListener('contextmenu', function(event) {
  event.preventDefault(); 
  var element = document.getElementById('AbdomenOther1');
  element.classList.add('hidden');  this.classList.remove('toggleColorRed');
  updateTexts();
});

document.getElementById('AbdomenOther1no').addEventListener('click', function() {
  var element = document.getElementById('AbdomenOther1');
  element.classList.add('hidden');
  var button = document.getElementById('AbdomenNewOther1');
  button.classList.remove('toggleColorRed');
  updateTexts();
});

document.getElementById('AbdomenOther1no').addEventListener('contextmenu', function(event) {
  var element = document.getElementById('AbdomenOther1');
  element.classList.add('hidden');
  var button = document.getElementById('AbdomenNewOther1');
  button.classList.remove('toggleColorRed');
  updateTexts();
});

// SKELETON 

// new LESIONS

document.getElementById('SkeletonNewLesions').addEventListener('click', function() {
  var lesionIds = ['SkeletonLesion1', 'SkeletonLesion2', 'SkeletonLesion3'];

  for (var i = 0; i < lesionIds.length; i++) {
    var element = document.getElementById(lesionIds[i]);
    if (element.classList.contains('hidden')) {
      element.classList.remove('hidden');
      break; 
    }
  }
  updateTexts();
  updateSkeletonButtonColor();
});

document.getElementById('SkeletonNewLesions').addEventListener('contextmenu', function(event) {
  event.preventDefault();
  var lesionIds = ['SkeletonLesion3', 'SkeletonLesion2', 'SkeletonLesion1'];

  for (var i = 0; i < lesionIds.length; i++) {
    var element = document.getElementById(lesionIds[i]);
    if (!element.classList.contains('hidden')) {
      element.classList.add('hidden');
      break; 
    }
  }
  updateTexts();
  updateSkeletonButtonColor();
});

function updateSkeletonButtonColor() {
    var Skeletonlesions = ['SkeletonLesion1', 'SkeletonLesion2', 'SkeletonLesion3'];
    var Skeletonbutton = document.getElementById('SkeletonNewLesions');
    var isHidden = Skeletonlesions.every(function(id) {
        return document.getElementById(id).classList.contains('hidden');
    });

    if (isHidden) {
        Skeletonbutton.classList.remove('toggleColorRed');
    } else {
        Skeletonbutton.classList.add('toggleColorRed');
    }
}

//  lesions

document.getElementById('SkeletonLesion1no').addEventListener('click', function() {
  var element = document.getElementById('SkeletonLesion1');
  element.classList.toggle('hidden'); 
  updateTexts();
  updateSkeletonButtonColor();
});

document.getElementById('SkeletonLesion1no').addEventListener('contextmenu', function(event) {
  var element = document.getElementById('SkeletonLesion1');
  element.classList.toggle('hidden'); 
  updateTexts();
  updateSkeletonButtonColor();
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
  var inputRect = this.getBoundingClientRect();
  var dropdown = document.getElementById('SkeletonLesion1selectLocation');
  dropdown.style.left = inputRect.left + 'px'; dropdown.style.top = inputRect.bottom + 2 + 'px'; dropdown.classList.remove('hidden');
});

document.addEventListener('click', function(e) {
  var dropdown = document.getElementById('SkeletonLesion1selectLocation');
  if (!document.getElementById('SkeletonLesion1Location').contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.add('hidden');
  }
});


document.getElementById('SkeletonLesion2no').addEventListener('click', function() {
  var element = document.getElementById('SkeletonLesion2');
  element.classList.toggle('hidden');
  updateTexts();
  updateSkeletonButtonColor();
});

document.getElementById('SkeletonLesion2no').addEventListener('contextmenu', function(event) {
  var element = document.getElementById('SkeletonLesion2');
  element.classList.toggle('hidden'); 
  updateTexts();
  updateSkeletonButtonColor();
});

document.getElementById('SkeletonLesion2Location').addEventListener('focus', function() {
  var inputRect = this.getBoundingClientRect();
  var dropdown = document.getElementById('SkeletonLesion2selectLocation');
  dropdown.style.left = inputRect.left + 'px'; dropdown.style.top = inputRect.bottom + 2 + 'px'; dropdown.classList.remove('hidden');
});

document.addEventListener('click', function(e) {
  var dropdown = document.getElementById('SkeletonLesion2selectLocation');
  if (!document.getElementById('SkeletonLesion2Location').contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.add('hidden');
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


document.getElementById('SkeletonLesion3no').addEventListener('click', function() {
  var element = document.getElementById('SkeletonLesion3');
  element.classList.toggle('hidden');
  updateTexts();
  updateSkeletonButtonColor();
});

document.getElementById('SkeletonLesion3no').addEventListener('contextmenu', function(event) {
  var element = document.getElementById('SkeletonLesion3');
  element.classList.toggle('hidden'); 
  updateTexts();
  updateSkeletonButtonColor();
});

document.getElementById('SkeletonLesion3Location').addEventListener('focus', function() {
  var inputRect = this.getBoundingClientRect();
  var dropdown = document.getElementById('SkeletonLesion3selectLocation');
  dropdown.style.left = inputRect.left + 'px'; dropdown.style.top = inputRect.bottom + 2 + 'px'; dropdown.classList.remove('hidden');
});

document.addEventListener('click', function(e) {
  var dropdown = document.getElementById('SkeletonLesion3selectLocation');
  if (!document.getElementById('SkeletonLesion3Location').contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.add('hidden');
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

// new Skeleton OTHERS 

document.getElementById('SkeletonNewOther1').addEventListener('click', function() {
  var element = document.getElementById('SkeletonOther1');
  element.classList.remove('hidden');  this.classList.add('toggleColorRed');
  updateTexts();
});

document.getElementById('SkeletonNewOther1').addEventListener('contextmenu', function(event) {
  event.preventDefault(); 
  var element = document.getElementById('SkeletonOther1');
  element.classList.add('hidden');  this.classList.remove('toggleColorRed');
  updateTexts();
});

document.getElementById('SkeletonOther1no').addEventListener('click', function() {
  var element = document.getElementById('SkeletonOther1');
  element.classList.add('hidden');
  var button = document.getElementById('SkeletonNewOther1');
  button.classList.remove('toggleColorRed');
  updateTexts();
});

document.getElementById('SkeletonOther1no').addEventListener('contextmenu', function(event) {
  var element = document.getElementById('SkeletonOther1');
  element.classList.add('hidden');
  var button = document.getElementById('SkeletonNewOther1');
  button.classList.remove('toggleColorRed');
  updateTexts();
});



// Lesion aktivita   
  
var aktivitaOptions = [
    { text: "není", value: "s akumulací RF < ref. blood pool", valuePSMA: "téměř bez PSMA exprese", valueFDG: "ametabolické"},
    { text: "nízká", value: "s akumulací RF < ref. játra", valuePSMA: "s nízkou PSMA expresí", valueFDG: "nízce metabolicky aktivní "},
    { text: "intermed.", value: "s akumulací RF blízkou ref. játrům", valuePSMA: "se střední PSMA expresí", valueFDG: "středně metabolicky aktivní "},
    { text: "vysoká", value: "s akumulací RF > ref. játra", valuePSMA: "se zvýšenou PSMA expresí", valueFDG: "hypermetabolické "},
    { text: "enormní", value: "s akumulací RF >> ref. játra", valuePSMA: "s vysokou PSMA expresí", valueFDG: "výrazně hypermetabolické "}
];

function populateAktivitaOptions() {
    var selectElements = document.querySelectorAll("select[id$='Activity']");

    selectElements.forEach(function (selectElement) {
        aktivitaOptions.forEach(function (option) {
            var optionElement = document.createElement("option");
            optionElement.value = option.value;
            optionElement.textContent = option.text;
            optionElement.dataset.valuePSMA = option.valuePSMA;
			optionElement.dataset.valueFDG = option.valueFDG;
            selectElement.appendChild(optionElement);
        });
    });
}

populateAktivitaOptions();



// Lesion hodnoceni

var hodnoceniOptions = [
    { text: "benigní", value: ": benigního vzhledu", valuePSMA: ": benigního vzhledu"},
    { text: "spíše ben.", value: ": nemá charakter viabilní neoplázie", valuePSMA: ": v.s. zánětlivá aktivace"},
    { text: "nerozhodný", value: ": nespecifický nález", valuePSMA: ": nespecifický nález"},
    { text: "spíše mal.", value: ": suspektní z viabilní neoplázie", valuePSMA: ": suspektní z infiltrace neoplazií"},
    { text: "maligní", value:": charakteru viabilní neoplázie", valuePSMA: ": charakteru infiltrace neoplazií"},
	{ text: "tumor", value:": charakteru tumoru", valuePSMA: ": infiltrace neoplazií"},
	{ text: "meta", value:": charakteru meta", valuePSMA: ": infiltrace neoplazií"}
];

function populateHodnoceniOptions() {
    var selectElements = document.querySelectorAll("select[id$='Decision']");

    selectElements.forEach(function (selectElement) {
        hodnoceniOptions.forEach(function (option) {
            var optionElement = document.createElement("option");
            optionElement.value = option.value;
            optionElement.textContent = option.text;
            optionElement.dataset.valuePSMA = option.valuePSMA;
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
    let Parotid = parseFloat(document.getElementById('SUVParotid').value);
    let aktSelect = document.getElementById(`${name}Activity`);
    let ratio = suv / Liver;

    if (buttonElementPETType.value === "FDG") {
      if (ratio >= 0 && ratio < 0.3) {
        aktSelect.value = 's akumulací RF < ref. blood pool';
      } else if (ratio >= 0.3 && ratio < 0.8) {
        aktSelect.value = 's akumulací RF < ref. játra';
      } else if (ratio >= 0.8 && ratio < 1.2) {
        aktSelect.value = 's akumulací RF blízkou ref. játrům';
      } else if (ratio >= 1.2 && ratio < 5) {
        aktSelect.value = 's akumulací RF > ref. játra';
      } else if (ratio >= 5) {
        aktSelect.value = 's akumulací RF >> ref. játra';
      } 
    } else if ((buttonElementPETType.value === "PSMA" || buttonElementPETType.value === "DOTATOC")) {
      if (suv >= Parotid) {
        aktSelect.value = 's akumulací RF >> ref. játra';
      } else if (suv >= Liver && suv < Parotid) {
        aktSelect.value = 's akumulací RF > ref. játra';
      } else if (suv >= Liver) {
        aktSelect.value = 's akumulací RF > ref. játra';
      } else if (suv < Liver && suv > Liver/4) {
        aktSelect.value = 's akumulací RF < ref. játra';
      } else if (suv < Liver/4) {
        aktSelect.value = 's akumulací RF < ref. blood pool';
      }
    } 

    updateTexts();
  });
});  


	 

// ostatní

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




// IMAGES


// Define a general structure for managing images
const imageConfigs = [
  {
    imageElementId: 'krknodImage',
    imageIndex: 1,
    imagePath: './pickrknod/krknod-',
    maxIndex: 34,
    focusElementId: 'NeckLymphNode1Location',
    selectElementId: 'NeckLymphNode1selectLocation',
    fileExtension: '.jpg'
  },
  {
    imageElementId: 'mednodImage',
    imageIndex: 1,
    imagePath: './picmednod/mednod-',
    maxIndex: 28,
    focusElementId: 'ThoraxLymphNode1Location',
    selectElementId: 'ThoraxLymphNode1selectLocation',
    fileExtension: '.jpg'
  },
  {
    imageElementId: 'chestsegImage',
    imageIndex: 2,
    imagePath: './picchestseg/chestseg-',
    maxIndex: 28,
    focusElementsIds: ['ThoraxLesion1Location', 'ThoraxLesion2Location', 'ThoraxLesion3Location'],
    selectElementsIds: ['ThoraxLesion1selectLocation', 'ThoraxLesion2selectLocation', 'ThoraxLesion3selectLocation'],
    fileExtension: '.png'
  }
];

// Initialize each image configuration
imageConfigs.forEach(config => {
  const imageElement = document.getElementById(config.imageElementId);
  let isMouseDown = false; // Track if the mouse button is held down
  let startY = 0; // Starting Y position when the mouse button is pressed

  const updateImageSrc = () => {
    imageElement.src = `${config.imagePath}${String(config.imageIndex).padStart(2, '0')}${config.fileExtension}`;
  };

  const onMouseDown = (event) => {
    if (event.button === 2) {
      event.preventDefault();
    }
    isMouseDown = true;
    startY = event.clientY;
    document.addEventListener('mousemove', onMouseMove);
    event.preventDefault();
  };

  const onMouseMove = (event) => {
    if (!isMouseDown) return;

    const diffY = event.clientY - startY;
    if (Math.abs(diffY) > 5) { // Add a threshold to reduce sensitivity
		if (diffY > 0) {
		  // Moved down
		  if (config.imageIndex < config.maxIndex) config.imageIndex++;
		} else {
		  // Moved up
		  if (config.imageIndex > 1) config.imageIndex--;
		}
      updateImageSrc();
      startY = event.clientY; // Reset start position
    }
  };

  // Function to handle mouse up events
  const onMouseUp = () => {
    isMouseDown = false;
    document.removeEventListener('mousemove', onMouseMove);
  };

  // Prevent context menu on the image
  imageElement.addEventListener('contextmenu', event => event.preventDefault());

  // Attach the event listeners to the image element
  imageElement.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mouseup', onMouseUp);

  const focusElementIds = config.focusElementsIds || [config.focusElementId];
  focusElementIds.forEach(id => {
    document.getElementById(id).addEventListener('focus', () => {
      imageElement.style.display = 'block';
    });
  });

  const selectElementIds = config.selectElementsIds || [config.selectElementId];
  document.addEventListener('click', function(e) {
    if (selectElementIds.concat(focusElementIds).every(id => !document.getElementById(id).contains(e.target)) && !imageElement.contains(e.target)) {
      imageElement.style.display = 'none';
    }
  });

  imageElement.addEventListener('wheel', (event) => {
    if (event.deltaY > 0) {
      if (config.imageIndex < config.maxIndex) config.imageIndex++;
    } else {
      if (config.imageIndex > 1) config.imageIndex--;
    }
    updateImageSrc();
    event.preventDefault();
  });
});

