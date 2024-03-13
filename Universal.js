// GRAMMAR

function processSentence(sentence) {
	sentence = sentence.trim();
    const words = sentence.split(/\s+/);
    const containsExactWord = (word) => words.includes(word);

    if (containsExactWord("fokusy") || 
		containsExactWord("noduly") || 
		containsExactWord("ložisko") || 
		containsExactWord("infiltráty") || 
		containsExactWord("tumory") || 
		containsExactWord("pakety")) {
        // No changes needed
    }

    if (containsExactWord("fokus") || 
		containsExactWord("nodul") || 
		containsExactWord("infiltrát") || 
		containsExactWord("tumor") || 
		containsExactWord("paket")) {
        sentence = sentence.replace(/metabolické/g, "metabolický").replace(/četné /g, "četný ");
    }

    if (containsExactWord("masa") || 
		containsExactWord("expanze") || 
		containsExactWord("infiltrace") || 
		containsExactWord("konsolidace") || 
		containsExactWord("opacita") || 
		containsExactWord("ložiska") || 
		containsExactWord("cysta") || 
		containsExactWord("struktura") ||
		containsExactWord("uzlina")) {
        sentence = sentence.replace(/metabolické/g, "metabolická").replace(/četné /g, "četná ");
    }

    if (containsExactWord("masy") || 
		containsExactWord("expanzePL") || 
		containsExactWord("infiltracePL") || 
		containsExactWord("konsolidacePL") || 
		containsExactWord("opacity") || 
		containsExactWord("cysty") || 
		containsExactWord("struktury") ||
		containsExactWord("uzliny")) {
        sentence = sentence.replace(/expanzePL/g, "expanze").replace(/infiltracePL/g, "infiltrace").replace(/konsolidacePL/g, "konsolidace").replace(/dva/g, "dvě");
    }
	
	if (containsExactWord("ložiska")) 
		{
        sentence = sentence.replace(/dva/g, "dvě");
    }

    sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);

    return sentence;
}

//DISABLE CONTEXT MENU
document.addEventListener("contextmenu", function(event) {
    event.preventDefault();
});

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

// buttons clickable by right mouse

var buttons = document.getElementsByTagName("button");

for (var i = 0; i < buttons.length; i++) {
    // Add 'contextmenu' event to each button
    buttons[i].addEventListener("contextmenu", function(e){
        // Prevent the default context menu from showing up
        e.preventDefault();
    });
}



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


//Button checkboxes

let buttonTexts = {}; // Initialize empty object

        function updateButtonTexts(newTexts) {
            buttonTexts = {...buttonTexts, ...newTexts};
        }

document.querySelectorAll('.buttonCheckbox').forEach(button => {
	button.addEventListener('contextmenu', function(e) {
		e.preventDefault(); // Prevent the context menu from showing
		changeText(this.id, true); // Change text forward on right click
	});

	button.addEventListener('click', function(e) {
		e.preventDefault(); // Prevent any default action
		changeText(this.id, false); // Change text backward on left click
	});
});


function changeText(buttonId, forward) {
    const texts = buttonTexts[buttonId];
    let currentText = document.getElementById(buttonId).innerText;
    let currentIndex = texts.indexOf(currentText);

    if (forward) {
        currentIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : currentIndex;
    } else {
        currentIndex = currentIndex + 1 < texts.length ? currentIndex + 1 : currentIndex;
    }

    document.getElementById(buttonId).innerText = texts[currentIndex];
    if (currentIndex !== 0) {
        document.getElementById(buttonId).classList.add('red-background');
    } else {
        document.getElementById(buttonId).classList.remove('red-background');
    }

	let button = document.getElementById(buttonId);
    let tableId = button.closest('[id$="table"]').id;
    if (tableId) {
        let superiorButtonId = tableId.replace('table', '');
        updateButtonColor(superiorButtonId, tableId);
    }
	updateTexts();
}


// Chb clickable by right mouse

const checkboxes = document.querySelectorAll('.CHB input[type="checkbox"]');


const Chb1 = document.querySelector('#Chb1');
const allChbes = [...checkboxes];

if (Chb1) {
    allChbes.push(Chb1);
}

allChbes.forEach(function(Chb) {
	Chb.parentElement.addEventListener('change', function() {
        updateTexts();
    });
    Chb.parentElement.addEventListener('contextmenu', function(e) {
        e.preventDefault(); // Prevent the default context menu
        Chb.checked = !Chb.checked;
        updateTexts();
        // Trigger color update
        var table = Chb.closest('[id$="table"]');
        if (table) {
            var tableId = table.id;
            var buttonId = tableId.replace('table', '');
            updateButtonColor(buttonId, tableId);
        }
    });
});




// button tables overlay change color when something is entered or checked

function isAnyCheckboxChecked(tableId) {
    var checkboxes = document.querySelectorAll('#' + tableId + ' input[type="checkbox"]');
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            return true;
        }
    }
    return false;
}

function isTextInputFilled(tableId) {
    var textInputs = document.querySelectorAll('#' + tableId + ' input[type="text"], #' + tableId + ' textarea');
    for (var i = 0; i < textInputs.length; i++) {
        if (textInputs[i].value.trim() !== '') {
            return true;
        }
    }
    return false;
}

function isAnyButtonTextChanged(tableId) {
    var buttonCheckboxes = document.querySelectorAll('#' + tableId + ' .buttonCheckbox');
    for (var i = 0; i < buttonCheckboxes.length; i++) {
        let btn = buttonCheckboxes[i];
        // Check if the button's current text is different from its original text
        if (buttonTexts[btn.id] && buttonTexts[btn.id][0] !== btn.innerText) {
            return true;
        }
    }
    return false;
}


function updateButtonColor(buttonId, tableId) {
    var button = document.getElementById(buttonId);
    // Extend the condition to check for buttonCheckbox text changes
    if (isAnyCheckboxChecked(tableId) || isTextInputFilled(tableId) || isAnyButtonTextChanged(tableId)) {
        button.style.backgroundColor = '#D4A29C'; // Change color if conditions are met
    } else {
        button.style.backgroundColor = ''; // Revert color if no conditions are met
    }
}

document.addEventListener('input', function(event) {
    if (event.target.type === 'checkbox' || event.target.type === 'text' || event.target.tagName.toLowerCase() === 'textarea') {
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


// NUMBERS MOUSE WHEELING

window.addEventListener('load', function() {
    var numberInputs = document.getElementsByClassName("numbers");
    for (var i = 0; i < numberInputs.length; i++) {
        numberInputs[i].addEventListener('wheel', function(e) {
            if (this.value === "") {
                this.value = 0;
            }
            e.preventDefault();	
            if (e.deltaY < 0) {
                this.stepUp(); 
            } else {
                this.stepDown(); 
                if (this.value == 0) {
                    this.value = ''; 
                }
            }
            var event = new Event('input');
            this.dispatchEvent(event);
        });
    }
});

// NUMBERSTEXT MOUSE WHEELING
window.addEventListener('load', function() {
    var textInputs = document.getElementsByClassName("numberstext");
    for (var i = 0; i < textInputs.length; i++) {
        textInputs[i].addEventListener('wheel', function(e) {
            var isNumeric = /^\d+$/.test(this.value);
            var isEmpty = this.value === "";
            if (isNumeric || isEmpty) {
                e.preventDefault();
                var currentValue = parseInt(this.value, 10) || 0;
                if (e.deltaY < 0) {
                    this.value = currentValue + 1;
                } else if (currentValue > 0) {
                    this.value = currentValue - 1;
                }
                if (this.value == 0) {
                    this.value = '';
                }
                var event = new Event('input');
                this.dispatchEvent(event);
            }
        });
    }
});


// universal size

function formatLesionSize(variableName) {
  var elementValue = document.getElementById(variableName).value;
  if (elementValue !== "") {
    if (/^\d+$/.test(elementValue)) { 
      return "diametru " + elementValue + " mm";
    } else { 
      return "rozměru " + elementValue + " mm";
    }
  }
  return "";
}

function formatLymphNodeSize(variableName) {
  var elementValue = document.getElementById(variableName).value;
  if (elementValue !== "") {
    if (/^\d+$/.test(elementValue)) { 
      return "diametru " + elementValue + " mm v krátké ose";
    } else { 
      return "rozměru " + elementValue + " mm";
    }
  }
  return "";
}


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



// new lesions animation

document.querySelectorAll('.myButtonLesion').forEach(button => {
  button.addEventListener('click', function() {
    button.classList.add('click-animation');
    setTimeout(() => {
      button.classList.remove('click-animation');
    }, 300); // This duration should match your CSS animation duration
  });
});


//input textareas resizable

var InputTextAreas = document.querySelectorAll('.inputothers, .inputOtherFinding');
InputTextAreas.forEach(function(InputTextArea) {
    InputTextArea.addEventListener('input', function() {
        // Reset the height to ensure correct calculation
        this.style.height = '22px';
        // Set the height to the scrollHeight to fit the content
        this.style.height = (this.scrollHeight) + 'px';
    });
});



// ButtonCycleText

const ButtonCycleInnerTexts = {};

const originalButtonTexts = {};

document.querySelectorAll('.ButtonCycleText').forEach(button => {
    originalButtonTexts[button.id] = button.innerText;
});

function updateButtonText(button, direction) {
    const texts = ButtonCycleInnerTexts[button.id];
    let BCTcurrentIndex = texts.indexOf(button.innerText);

    if (direction === 'forward') {
        if (BCTcurrentIndex < texts.length - 1) {
            BCTcurrentIndex++;
        }
    } else {
        if (BCTcurrentIndex > 0) {
            BCTcurrentIndex--;
        }
    }

    button.innerText = texts[BCTcurrentIndex];

    button.classList.toggle('red-background', button.innerText !== originalButtonTexts[button.id]);
}

document.querySelectorAll('.ButtonCycleText').forEach(button => {
    button.addEventListener('click', (event) => {
        if (event.button === 0) { 
            updateButtonText(button, 'forward');
        }
    });

    button.addEventListener('contextmenu', (event) => {
        event.preventDefault(); 
        updateButtonText(button, 'backward');
    });
	
});


function addEventListenersForButtons() {
    document.querySelectorAll('.ButtonCycleText').forEach(button => {
        button.addEventListener('click', function() {
            updateTexts();
        });
        button.addEventListener('contextmenu', function(event) {
            event.preventDefault();
            updateTexts();
        });
    });
}
addEventListenersForButtons();



// tooltip (only when chbTooltip is checked)
 
 function showInnerTextsOnHover() {
    document.querySelectorAll('.ButtonCycleText').forEach(button => {
        let hoverTimer;
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.type === "characterData" || mutation.type === "childList") {
                    updateTooltipContent(button);
                }
            });
        });

        const updateTooltipContent = (button) => {
            const texts = ButtonCycleInnerTexts[button.id];
            let tooltip = document.getElementById('tooltip');
            if (!tooltip) {
                tooltip = document.createElement('div');
                tooltip.id = 'tooltip';
                document.body.appendChild(tooltip);
            }

            tooltip.innerHTML = '';

            texts.forEach((text, index) => {
                const span = document.createElement('span');
                span.textContent = text;
                if (text === button.innerText) {
                    span.style.fontWeight = 'bold';
                    span.style.color = '#D4A29C';
                } else {
                    span.style.fontWeight = 'normal';
                    span.style.color = 'black';
                }
				tooltip.appendChild(span);

				if (index < texts.length - 1) {
					tooltip.appendChild(document.createTextNode(', '));
				}
			});

            tooltip.style.display = 'block';
            tooltip.style.position = 'absolute';
            tooltip.style.left = button.getBoundingClientRect().right + 'px';
            tooltip.style.top = button.getBoundingClientRect().top + 'px';
        };

        button.addEventListener('mouseenter', function() {
            const chbTooltip = document.getElementById('ChbTooltip');
            if (!chbTooltip || !chbTooltip.checked) return; 

            clearTimeout(hoverTimer);
            hoverTimer = setTimeout(() => updateTooltipContent(button), 500); // Show tooltip after a delay of 1 second
            observer.observe(button, { childList: true, subtree: true, characterData: true });
        });

        button.addEventListener('mouseleave', function() {
            clearTimeout(hoverTimer);
            const tooltip = document.getElementById('tooltip');
            if (tooltip) {
                tooltip.style.display = 'none';
            }
            observer.disconnect();
        });
    });
}

showInnerTextsOnHover();


// copyButtons blink

document.addEventListener('mousedown', function(event) {
  if (event.target.tagName === 'BUTTON' && event.target.id.startsWith('copy')) {
    event.target.classList.add('partiallyDisappear');
  }
});

document.addEventListener('mouseup', function(event) {
  if (event.target.tagName === 'BUTTON' && event.target.id.startsWith('copy')) {
    event.target.classList.remove('partiallyDisappear');
  }
});
