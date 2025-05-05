// LESIONS (cloning)

const sections = document.querySelectorAll('.Lsection'); // Select all .Lsection elements

sections.forEach((section, index) => {

    for (let i = 2; i <= 3; i++) {
        const clone = section.cloneNode(true); // Clone the current section

        // Update IDs and names dynamically
        clone.innerHTML = clone.innerHTML
            .replace(/Lesion1/g, `Lesion${i}`) // Update IDs for Lesion
            .replace(/Chb1/g, `Chb${i}`);      // Update IDs for Chb

        // Append the cloned section to the body
        document.body.appendChild(clone);
    }
});




//buttons

var textsPETType = ["FDG", "PSMA", "DOTATOC", "DOPA"];
var buttonElementPETType = document.getElementById("PETTypeButton");
buttonElementPETType.value = "FDG";
var indexPETType = 0;function cyclePETTypeText(event) {  indexPETType = cycleText(event, textsPETType, indexPETType, buttonElementPETType, updateBackgroundColor);}

function cyclePETTypeText(event) {  indexPETType = cycleText(event, textsPETType, indexPETType, buttonElementPETType, updateBackgroundColor);  updateTexts();}


// Lesion aktivita   
  
var aktivitaOptions = [
    { text: "není", value: "bez patrné akumulace RF", valueRPH: "téměř bez PSMA exprese", valueFDG: "ametabolické"},
	{ text: "nízká", value: "s akumulací RF pod úrovní ref. jater", valueRPH: "s nízkou PSMA expresí", valueFDG: "nízce metabolicky aktivní "},
    { text: "nižší", value: "s akumulací RF mírně pod úrovní ref. jater", valueRPH: "s nízkou PSMA expresí", valueFDG: "nízce metabolicky aktivní "},
    { text: "intermed.", value: "s akumulací RF cca na úrovni ref. jater", valueRPH: "se střední PSMA expresí", valueFDG: "středně metabolicky aktivní "},
    { text: "vyšší", value: "s akumulací RF mírně nad úrovní ref. jater", valueRPH: "se zvýšenou PSMA expresí", valueFDG: "mírně hypermetabolické "},
	{ text: "vysoká", value: "s akumulací RF zřetelně nad úrovní ref. jater", valueRPH: "se zvýšenou PSMA expresí", valueFDG: "hypermetabolické "},
    { text: "enormní", value: "s akumulací RF výrazně nad úrovní ref. jater", valueRPH: "s vysokou PSMA expresí", valueFDG: "výrazně hypermetabolické "}
];


// text na základě aktivity

function populateAktivitaOptions() {
    var selectElements = document.querySelectorAll("select[id$='Activity']");

    selectElements.forEach(function (selectElement) {
        aktivitaOptions.forEach(function (option) {
            var optionElement = document.createElement("option");
            optionElement.textContent = option.text;
            optionElement.dataset.valueRPH = option.valueRPH;
            optionElement.dataset.valueFDG = option.valueFDG;
            optionElement.value = option.value; // defaultně, přepíše se později

            selectElement.appendChild(optionElement);
        });

        selectElement.addEventListener('change', function () {
            const selectedOption = this.selectedOptions[0];
            const text = selectedOption.textContent;

            if (["nízká", "nižší", "vyšší", "vysoká", "enormní", "intermed."].includes(text)) {
                const lesionIdPrefix = this.id.replace("Activity", "SUV");
                const suvInput = document.getElementById(lesionIdPrefix);
                const liverInput = document.getElementById('SUVLiver');

                if (!suvInput || !liverInput) return;

                const suvValue = parseFloat(suvInput.value.replace(',', '.'));
                const liverValue = parseFloat(liverInput.value.replace(',', '.'));

                if (!isNaN(suvValue) && !isNaN(liverValue) && liverValue > 0) {
                    const ratio = suvValue / liverValue;
                    const percentDiff = Math.round(Math.abs((ratio - 1) * 100 / 10)) * 10;
                    const direction = (ratio < 1) ? "nižší" : "vyšší";

                    if (text === "intermed.") {
                        selectedOption.value = "s akumulací RF na úrovni ref. hodnoty jater";
                    } else if (percentDiff >= 100 && direction === "vyšší") {
                        const multiplier = Math.round(ratio);
                        selectedOption.value = `s akumulací RF ${multiplier}x vyšší než ref. hodnota jater`;
                    } else {
                        selectedOption.value = `s akumulací RF o ${percentDiff}% ${direction} než ref. hodnota jater`;
                    }
                }
            }
        });
    });
}



populateAktivitaOptions();




// Lesion hodnoceni

var hodnoceniOptions = [
    { text: "benigní", value: ": benigního vzhledu", valueRPH: ": benigního vzhledu"},
    { text: "spíše ben.", value: ": nemá charakter viabilní neoplázie", valueRPH: ": v.s. zánětlivá aktivace"},
    { text: "nerozhodný", value: ": nespecifický nález", valueRPH: ": nespecifický nález"},
    { text: "spíše mal.", value: ": suspektní z viabilní neoplázie", valueRPH: ": suspektní z meta"},
    { text: "maligní", value:": charakteru viabilní neoplázie", valueRPH: ": charakteru meta"},
	{ text: "tumor", value:": charakteru tumoru", valueRPH: ": viabilní neoplazie"},
	{ text: "meta", value:": charakteru meta", valueRPH: ": charakteru meta"}
];

function populateHodnoceniOptions() {
    var selectElements = document.querySelectorAll("select[id$='Decision']");

    selectElements.forEach(function (selectElement) {
        hodnoceniOptions.forEach(function (option) {
            var optionElement = document.createElement("option");
            optionElement.value = option.value;
            optionElement.textContent = option.text;
            optionElement.dataset.valueRPH = option.valueRPH;
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
                selectOptionByText(aktSelect, 'není');
            } else if (ratio >= 0.3 && ratio < 0.6) {
                selectOptionByText(aktSelect, 'nízká');
            } else if (ratio >= 0.6 && ratio < 0.9) {
                selectOptionByText(aktSelect, 'nižší');
            } else if (ratio >= 0.9 && ratio < 1.2) {
                selectOptionByText(aktSelect, 'intermed.');
            } else if (ratio >= 1.2 && ratio < 1.6) {
                selectOptionByText(aktSelect, 'vyšší');
            } else if (ratio >= 1.6 && ratio < 8) {
                selectOptionByText(aktSelect, 'vysoká');
            } else if (ratio >= 8) {
                selectOptionByText(aktSelect, 'enormní');
            }
        } else {
            if (suv >= Parotid) {
                selectOptionByText(aktSelect, 'enormní');
            } else if (suv >= Liver && suv < Parotid) {
                selectOptionByText(aktSelect, 'vysoká');
            } else if (suv >= Liver) {
                selectOptionByText(aktSelect, 'vysoká');
            } else if (suv < Liver && suv > Liver / 4) {
                selectOptionByText(aktSelect, 'nízká');
            } else if (suv < Liver / 4) {
                selectOptionByText(aktSelect, 'není');
            }
        }

        updateTexts();
    });
});

function selectOptionByText(selectElement, text) {
    Array.from(selectElement.options).forEach(option => {
        if (option.textContent === text) {
            selectElement.selectedIndex = option.index;
            // Trigger change event to recalculate percentage value
            selectElement.dispatchEvent(new Event('change'));
        }
    });
}


	 

// ostatní SUV

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
    focusElementId: 'NeckLymphNode1AddLocation',
    selectElementId: 'NeckLymphNode1AddLocation',
    fileExtension: '.jpg'
  },
  {
    imageElementId: 'mednodImage',
    imageIndex: 1,
    imagePath: './picmednod/mednod-',
    maxIndex: 28,
    focusElementId: 'ThoraxLymphNode1AddLocation',
    selectElementId: 'ThoraxLymphNode1AddLocation',
    fileExtension: '.jpg'
  },
  {
    imageElementId: 'chestsegImage',
    imageIndex: 2,
    imagePath: './picchestseg/chestseg-',
    maxIndex: 28,
    focusElementsIds: ['ThoraxLesion1AddLocation'],
    selectElementsIds: ['ThoraxLesion1AddLocation'],
    fileExtension: '.png'
  }
];

// Initialize each image configuration
imageConfigs.forEach(config => {
  const imageElement = document.getElementById(config.imageElementId);
  let isMouseDown = false; // Track if the mouse button is held down
  let startY = 0; // Starting Y position when the mouse button is pressed
  let holdTimeout; // Timeout to track long press

  const updateImageSrc = () => {
    imageElement.src = `${config.imagePath}${String(config.imageIndex).padStart(2, '0')}${config.fileExtension}`;
  };

  const onMouseDown = (event) => {
    if (event.button !== 0) return; // Only respond to the left mouse button
    startY = event.clientY;
    isMouseDown = true;

    // Set a timeout for the long press (2 seconds)
    holdTimeout = setTimeout(() => {
      if (isMouseDown) {
        imageElement.style.display = 'block';
      }
    }, 500);

    document.addEventListener('mousemove', onMouseMove);
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

  const onMouseUp = () => {
    isMouseDown = false;
    clearTimeout(holdTimeout); // Clear the timeout if mouse button is released early
    document.removeEventListener('mousemove', onMouseMove);
  };

  // Prevent context menu on the image
  imageElement.addEventListener('contextmenu', event => {
    event.preventDefault();
    imageElement.style.display = 'none'; // Hide the image on right-click
  });

  // Attach the event listeners to the image element
  imageElement.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mouseup', onMouseUp);

  const focusElementIds = config.focusElementsIds || [config.focusElementId];
  focusElementIds.forEach(id => {
    const element = document.getElementById(id);
    element.addEventListener('mousedown', (event) => {
      if (event.button !== 0) return; // Allow normal clicks
      startY = event.clientY;
      isMouseDown = true;

      // Set a timeout for the long press (2 seconds)
      holdTimeout = setTimeout(() => {
        if (isMouseDown) {
          imageElement.style.display = 'block';
        }
      }, 500);
    });

    element.addEventListener('mouseup', () => {
      isMouseDown = false;
      clearTimeout(holdTimeout);
    });

    element.addEventListener('focus', () => {
      // Allow normal focus behavior
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




// CODE

function updateTexts() {

var indikace = document.getElementById("indikace").value;



// universal SUV

function formatSUV(variableName) {
    var elementValue = document.getElementById(variableName).value;

    if (elementValue && elementValue.trim() !== "") {
        elementValue = elementValue.trim().replace('.', ',');
        return "s SUVmax=" + elementValue;
    }

    return "";
}


//Date
let DateCompare = document.getElementById("DateCompare").value; 
let date = new Date(DateCompare); let day = String(date.getDate()).padStart(2, '0'); let month = String(date.getMonth() + 1).padStart(2, '0'); let year = date.getFullYear(); let DateComparison = day + "." + month + "." + year + " ";

// checking if the current date is not chosen else popup
function showDatePopup() {
    var popup = document.getElementById('popupMessageDate');
    var dateInput = document.getElementById('DateCompare');

    var inputRect = dateInput.getBoundingClientRect();
    var topPosition = inputRect.bottom + scrollY + 5; // Position below the input
    var leftPosition = inputRect.left + scrollX;

    popup.textContent = "Pozor, datum současné"; 
    popup.style.top = topPosition + 'px';
    popup.style.left = leftPosition + 'px';
    popup.style.display = 'block';

    setTimeout(() => {
        popup.style.display = 'none';
    }, 2000); // Hide after 1 second
}

document.getElementById('DateCompare').addEventListener('change', function() {
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    let selectedDate = new Date(this.value);
    let timeDifference = Math.abs(currentDate - selectedDate);
    let dayDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (dayDifference <= 7) {
        showDatePopup();
    }
});


var dateInput = document.getElementById('DateCompare');
var SUVLiverTextCompare = document.getElementById('SUVLiverTextCompare');
var SUVLiverPrevious = document.getElementById('SUVLiverPrevious');

if (dateInput.value !== '') {
  SUVLiverTextCompare.classList.remove('hidden');
  SUVLiverPrevious.classList.remove('hidden');
	 } else {
  SUVLiverTextCompare.classList.add('hidden');
  SUVLiverPrevious.classList.add('hidden');
	  SkeletonLesion1Previous.classList.add('hidden'); SkeletonLesion2Previous.classList.add('hidden'); SkeletonLesion3Previous.classList.add('hidden');
}


// universal comparison POP

function generateComparisonText(prevSUV, prevSize, date, currentSUV, currentSize) {
    var comparisonText = compareActPOP(currentSUV, prevSUV);

    if (prevSize.includes(" 0 ")) {
        return " (oproti minule nově)";
    } else if (currentSize !== "" && prevSize !== "" && currentSize === prevSize) {
        return " (minule obdobné velikosti" + (comparisonText ? ", " + comparisonText : "") + ")";
    } else if (comparisonText !== "" || prevSize.trim() !== "") {
        let result = " (minule";
        if (prevSize.trim() !== "") result += " " + prevSize;
        if (comparisonText !== "") result += (prevSize.trim() !== "" ? ", " : " ") + comparisonText;
        return result + ")";
    } else {
        return "";
    }
}



// SUVLiver value native preset
var suvLiverInput = document.getElementById('SUVLiver');
var suvParotidInput = document.getElementById('SUVParotid');

if (buttonElementPETType.value === "FDG" && suvLiverInput.value === '' || suvLiverInput.value == 7) {
    suvLiverInput.value = 3;
	suvParotidInput.value =  "";
}

if (buttonElementPETType.value === "PSMA" && suvLiverInput.value == 3 ) {
    suvLiverInput.value = 7;
    suvParotidInput.value = 20;
}

if (buttonElementPETType.value === "DOTATOC" && suvLiverInput.value == 3) {
    suvLiverInput.value = 7;
    suvParotidInput.value = 20;
}

if (buttonElementPETType.value === "DOPA" && suvLiverInput.value == 3) {
    suvLiverInput.value = 7;
    suvParotidInput.value = 20;
}


// SUVmax Comparison POP
function compareActPOP(currentSUV, previousSUV) {
    if (!currentSUV || !previousSUV || currentSUV.trim() === "" || previousSUV.trim() === "") {
        return "";
    }

    var current = parseFloat(currentSUV.replace('s SUVmax=', '').replace(',', '.').trim());
    var prev = parseFloat(previousSUV.replace('s SUVmax=', '').replace(',', '.').trim());

    var SUVLiver = parseFloat(document.getElementById("SUVLiver").value);
    var SUVLiverPrevious = document.getElementById("SUVLiverPrevious").value;

    if (SUVLiverPrevious.trim() === "" || isNaN(parseFloat(SUVLiverPrevious))) {
        SUVLiverPrevious = SUVLiver;
    } else {
        SUVLiverPrevious = parseFloat(SUVLiverPrevious);
    }

    if (isNaN(SUVLiver) || isNaN(SUVLiverPrevious)) {
        SUVLiver = 3; SUVLiverPrevious = 3;
    }

    var currentRatio = current / SUVLiver;
    var prevRatio = prev / SUVLiverPrevious;

    var change = Math.log(currentRatio / prevRatio) * 100;

    if (Math.abs(change) < 20) {
        return "akumulace byla obdobná";
    } else if (change >= 20 && change < 50) {
        return "akumulace byla mírně nižší";
	} else if (change >= 50 && change < 100) {
        return "akumulace byla zřetelně nižší";
    } else if (change >= 100) {
        return "akumulace byla výrazně nižší";
    } else if (change <= -20 && change > -50) {
        return "akumulace byla mírně vyšší";
	} else if (change <= -50 && change > -100) {
        return "akumulace byla zřetelně vyšší";
    } else if (change <= -100) {
        return "akumulace byla výrazně vyšší";
    }
}


// SUVmax Comparison RES

function compareActRES(currentSUV, previousSUV) {
    if (!currentSUV || !previousSUV || currentSUV.trim() === "" || previousSUV.trim() === "") {
        return "";
    }

    var current = parseFloat(currentSUV.replace('s SUVmax=', '').replace(',', '.').trim());
    var prev = parseFloat(previousSUV.replace('s SUVmax=', '').replace(',', '.').trim());

    var SUVLiver = parseFloat(document.getElementById("SUVLiver").value);
    var SUVLiverPrevious = document.getElementById("SUVLiverPrevious").value;

    if (SUVLiverPrevious.trim() === "" || isNaN(parseFloat(SUVLiverPrevious))) {
        SUVLiverPrevious = SUVLiver;
    } else {
        SUVLiverPrevious = parseFloat(SUVLiverPrevious);
    }

    if (isNaN(SUVLiver) || isNaN(SUVLiverPrevious)) {
        SUVLiver = 3; SUVLiverPrevious = 3;
    }

    var currentRatio = current / SUVLiver;
    var prevRatio = prev / SUVLiverPrevious;

    var change = Math.log(currentRatio / prevRatio) * 100;

    if (Math.abs(change) < 20) {
        return "metabolicky přibližně stacionární";
    } else if (change >= 20 && change < 50) {
        return "v mírné metabolické progresi";
	} else if (change >= 50 && change < 100) {
        return "v metabolické progresi";
    } else if (change >= 100) {
        return "ve výrazné metabolické progresi";
    } else if (change <= -20 && change > -50) {
        return "v mírné metabolické regresi";
	} else if (change <= -50 && change > -100) {
        return "v metabolické regresi";
    } else if (change <= -100) {
        return "ve výrazné metabolické regresi";
    }
}

// RES Size Comparison

function getMaxDimension(sizeString) {
    var numbers = sizeString.match(/\d+,\d+|\d+/g).map(s => parseFloat(s.replace(',', '.')));
    return Math.max(...numbers);
}

function compareSizes(currentSize, prevSize) {
    if (!currentSize || !prevSize || currentSize.trim() === "" || prevSize.trim() === "") {
        return "";
    }

    var currentMax = getMaxDimension(currentSize);
    var prevMax = getMaxDimension(prevSize);

    var change = ((currentMax - prevMax) / prevMax) * 100;
    var roundedChange = Math.round(change / 5) * 5;  // Round to nearest five

    // Check the checkbox state
    var showPercentage = document.getElementById('ChbRECIST').checked;
    var percentageString = showPercentage ? " (cca o " + roundedChange + "%)" : "";

    var result = "";
	if (prevMax === 0) { 
        result = "nově";
    } else if (change <= -60) {
        result = "ve výrazné rozměrové regresi";
    } else if (change > -60 && change <= -30) {
        result = "v rozměrové regresi";
	} else if (change > -30 && change <= -10) {
        result = "v mírné rozměrové regresi";
    } else if (change > -10 && change < 10) {
        result = "rozměrově přibližně stacionární";
    } else if (change >= 10 && change < 20) {
        result = "v mírné rozměrové progresi";
	} else if (change >= 20 && change < 50) {
        result = "v rozměrové progresi";
    } else if (change >= 50) {
        result = "ve výrazné rozměrové progresi";
    }

    return result + percentageString;  // Append the percentage string if needed
}


// combine results

function combineComparisonResults(sizeRes, suvRes, number) {
    if (!sizeRes && !suvRes) {
        return "";
    }

    var prefix = (number && number.trim() !== "") ? "jsou " : "je ";

    if (!sizeRes) {
        return prefix + suvRes;
    }

    if (!suvRes) {
        return prefix + sizeRes;
    }

    if (sizeRes.includes("ve výrazné rozměrové regresi") && suvRes.includes("ve výrazné metabolické regresi")) {
        return prefix + "ve výrazné rozměrové i metabolické regresi";
    } else if (sizeRes.includes("v rozměrové regresi") && suvRes.includes("v metabolické regresi")) {
        return prefix + "v rozměrové i metabolické regresi";
    } else if (sizeRes.includes("v mírné rozměrové regresi") && suvRes.includes("v mírné metabolické regresi")) {
        return prefix + "v mírné rozměrové i metabolické regresi";
    } else if (sizeRes.includes("ve výrazné rozměrové progresi") && suvRes.includes("ve výrazné metabolické progresi")) {
        return prefix + "ve výrazné rozměrové i metabolické progresi";
    } else if (sizeRes.includes("v rozměrové progresi") && suvRes.includes("v metabolické progresi")) {
        return prefix + "v rozměrové i metabolické progresi";
    } else if (sizeRes.includes("v mírné rozměrové progresi") && suvRes.includes("v mírné metabolické progresi")) {
        return prefix + "v mírné rozměrové i metabolické progresi";
    } else if (sizeRes.includes("rozměrově přibližně stacionární") && suvRes.includes("metabolicky přibližně stacionární")) {
        return prefix + "rozměrově i metabolicky přibližně stacionární";
    }


    return prefix + sizeRes + " a " + suvRes;
}

// smallSize

function checkSmallSize(LesionSize, LesionSUV) {
    var SUVLiver = parseFloat(document.getElementById("SUVLiver").value);
    var LesionSUVValue = LesionSUV ? parseFloat(LesionSUV.replace('s SUVmax=', '').replace(',', '.').trim()) : null;
    var LesionSizeValue = LesionSize ? getMaxDimension(LesionSize) : null;
    var SUVLiverRatio = LesionSUVValue !== null ? LesionSUVValue / SUVLiver : null;
    var SizeSUVRatio = LesionSizeValue !== null ? LesionSizeValue / SUVLiverRatio : null;

    if (LesionSizeValue !== null && SUVLiverRatio !== null && SizeSUVRatio !== null) {
        if (SUVLiverRatio < 0.8 && LesionSizeValue < 9 &&SizeSUVRatio < 9) {
            return "(vzhledem k malým rozměrům je i tato metabolická aktivita signifikantní)";
        }
    }
    return "";
}

	


// viability check

function checkViability(text) {
  const keywords = ['na úrovni', 'nad úrovní', 'intermed', 'střední', 'zvýšen', 'vysok', 'hyper', 'vyšší'];
  const hasKeyword = keywords.some(keyword => text.includes(keyword));
  const suvMatch = text.match(/SUVmax=([\d.]+)/);
  const hasHighSUV = suvMatch && parseFloat(suvMatch[1]) > 1;

  return hasKeyword || hasHighSUV;
}


// obecne texts

 var ObecneTexts = "";

 if (document.getElementById('ChbFat').checked) {
    ObecneTexts += 'Zvýšená akumulace RF v oblasti metabolicky aktivního tuku krku a trupu symetricky bilat. ';
  }
  if (document.getElementById('ChbParavasR').checked) {
    ObecneTexts += 'Zvýšená akumulace RF v průběhu lymfatik PHK po parc. extravazaci RF při aplikaci. ';
  }
  if (document.getElementById('ChbParavasL').checked) {
    ObecneTexts += 'Zvýšená akumulace RF v průběhu lymfatik LHK po parc. extravazaci RF při aplikaci. ';
  }
  if (document.getElementById('ChbFull').checked) {
    ObecneTexts += 'Vysoká akumulace RF v kosterním svalstvu pravděpodobně při nedodržení lačnění. ';
  }


if (ObecneTexts.trim() === "") {
    ObecneNativeText = "Neložisková akumulace radiofarmaka ve svalech, v gastrointestinální traktu a urotraktu je přítomna na podkladě fyziologických procesů či jako zcela nespecifický nález. ";
} else {
    ObecneNativeText = "Jinak je neložisková akumulace radiofarmaka ve svalech, v gastrointestinální traktu a urotraktu přítomna na podkladě fyziologických procesů či jako zcela nespecifický nález. ";
}

const PETTypeText = buttonElementPETType.innerText;
var elementParotid = document.getElementById('suvmax-parotid-container');

if (PETTypeText === "FDG") {
    nazev = "FDG-PET/CT trupu"; 
    elementParotid.classList.add('hidden');
}  else if (PETTypeText === "PSMA") {
    ObecneNativeText = "Neložisková akumulace radiofarmaka ve slinných a slzných žlazách, v jaterním parenchymu, slezině, v gastrointestinální traktu a urotraktu je přítomna na podkladě fyziologických procesů či jako zcela nespecifický nález."; 
    nazev = "PSMA-PET/CT trupu"; 
	document.getElementById('suvmax-parotid-container').childNodes[0].nodeValue = "SUVmax parotid ";
    elementParotid.classList.remove('hidden');
}  else if (PETTypeText === "DOTATOC") {
    ObecneNativeText = "Neložisková akumulace radiofarmaka v hypofýze, štítné žláze, nadledvinách a urotraktu je přítomna na podkladě fyziologických procesů či jako zcela nespecifický nález."; 
    nazev = "DOTATOC-PET/CT trupu"; 
	document.getElementById('suvmax-parotid-container').childNodes[0].nodeValue = "SUVmax sleziny ";
    elementParotid.classList.remove('hidden');
}  else if (PETTypeText === "DOPA") {
    ObecneNativeText = "Neložisková akumulace radiofarmaka v BG bilat., játrech a urotraktu je přítomna na podkladě fyziologických procesů či jako zcela nespecifický nález.."; 
    nazev = "DOPA-PET/CT trupu"; 
	elementParotid.classList.add('hidden');
}


// NECK	
// neck lesions (clones)


  var NeckLesionsLocationTexts = {
    "Nasopharynx": "nazofaryngu",
    "TongueApex": "apexu jazyka",
    "GlSubmand": "submandibulární žlázy",
    "Palate": "patra",
    "TongueBody": "těla jazyka",
    "GlParot": "parotické žlázy",
    "Oropharynx": "orofaryngu",
    "TongueRadix": "kořene jazyka",
    "Thyroid": "štítné žlázy",
    "Tonsils": "patrové tonsily",
    "LarynxSupra": "supraglotické části hrtanu",
    "Hypopharynx": "hypofaryngu",
    "LarynxGlot": "glotické části hrtanu",
    "LarynxInfra": "infraglotické části hrtanu",
  };

let codeForNeckLesion1 = `

var NeckLesion1Locationtext = ""; for (var key in NeckLesionsLocationTexts) { var right = document.getElementById('Chb1' + key + 'R').checked; var left = document.getElementById('Chb1' + key + 'L').checked; if (right && left) { NeckLesion1Locationtext += NeckLesionsLocationTexts[key] + " bilat., "; } else { if (right) NeckLesion1Locationtext += NeckLesionsLocationTexts[key] + " vpravo, "; if (left) NeckLesion1Locationtext += NeckLesionsLocationTexts[key] + " vlevo, "; } }
NeckLesion1Locationtext = NeckLesion1Locationtext.trim(); if (NeckLesion1Locationtext.endsWith(',')) NeckLesion1Locationtext = NeckLesion1Locationtext.slice(0, -1);
document.getElementById('NeckLesion1Location').value = NeckLesion1Locationtext;

var NeckLesion1Button = document.getElementById("NeckLesion1");
var NeckLesion1typeRaw = document.getElementById("NeckLesion1type").value.trim();
var NeckLesion1number = document.getElementById("NeckLesion1number").value;
var NeckLesion1type = (NeckLesion1number && NeckLesion1number !== "") ? (pluralForms[NeckLesion1typeRaw] || NeckLesion1typeRaw) : NeckLesion1typeRaw;
var NeckLesion1Location = document.getElementById("NeckLesion1Location").value;
var NeckLesion1AddLocation = document.getElementById("NeckLesion1AddLocation").value;
var NeckLesion1Loclargest = document.getElementById("NeckLesion1Loclargest").value;
document.getElementById('NeckLesion1number').addEventListener('change', () => document.getElementById('NeckLesion1Large').classList.toggle('hidden', document.getElementById('NeckLesion1number').value === ""));
var NeckLesion1Activity = document.getElementById("NeckLesion1Activity").value;
var NeckLesion1ActivityCopy = NeckLesion1Activity;
var NeckLesion1ActivityOption = document.getElementById("NeckLesion1Activity").selectedOptions[0];
var NeckLesion1RESActivityRPH = NeckLesion1ActivityOption.dataset.valueRPH || '';
var NeckLesion1RESActivityFDG = NeckLesion1ActivityOption.dataset.valueFDG || '';
var NeckLesion1SUV = formatSUV("NeckLesion1SUV");
var NeckLesion1Size = formatLesionSize("NeckLesion1Size");
var NeckLesion1RESDecision = document.getElementById("NeckLesion1Decision").value;
document.getElementById("DateCompare").addEventListener('change', () => document.getElementById("NeckLesion1Previous").classList.toggle("hidden", !document.getElementById("DateCompare").value));
var NeckLesion1SUVPrev = formatSUV("NeckLesion1SUVPrev");
var NeckLesion1PrevSize = formatLesionSize("NeckLesion1PrevSize");
var NeckLesion1ComparisonText = generateComparisonText(NeckLesion1SUVPrev, NeckLesion1PrevSize, DateComparison, NeckLesion1SUV, NeckLesion1Size);
var NeckLesion1ComparisonSUVRes = compareActRES(NeckLesion1SUV, NeckLesion1SUVPrev);
var NeckLesion1ComparisonSizeRes = compareSizes(NeckLesion1Size, NeckLesion1PrevSize);
var NeckLesion1CombinedResult = combineComparisonResults(NeckLesion1ComparisonSizeRes, NeckLesion1ComparisonSUVRes, NeckLesion1number);
var NeckLesion1ActivityAdd = checkSmallSize(NeckLesion1Size, NeckLesion1SUV);
var NeckLesion1AllLocations = (NeckLesion1Location + " " + NeckLesion1AddLocation).trim();

if (NeckLesion1Loclargest !== "") { NeckLesion1Loclargest = NeckLesion1ActivityCopy + ", největší " + NeckLesion1Loclargest + " "; NeckLesion1Activity = ""; }
if (NeckLesion1number !== "" && NeckLesion1Loclargest === "") {
  NeckLesion1Size = NeckLesion1Size.replace("diametru ", "diametru až ").replace("rozměru ", "rozměru až ");
  NeckLesion1ComparisonText = NeckLesion1ComparisonText.replace("diametru ", "diametru až ").replace("rozměru ", "rozměru až ");
}

var processedSentencePOPNeckLesion1 = processSentence(NeckLesion1number + " " + NeckLesion1type);
var POPNeckLesion1 = processedSentencePOPNeckLesion1 + " " + NeckLesion1AllLocations + " " + NeckLesion1Loclargest + " " + NeckLesion1Size + " " + NeckLesion1Activity + " " + NeckLesion1ComparisonText + ".";
var processedSentenceRESNeckLesionFDG = processSentence(NeckLesion1number + " " + NeckLesion1RESActivityFDG + " " + NeckLesion1type);
var processedSentenceRESNeckLesionRPH = processSentence(NeckLesion1number + " " + NeckLesion1type);
var RESNeckLesion1 = (buttonElementPETType.value === "FDG")
  ? processedSentenceRESNeckLesionFDG + " " + NeckLesion1AllLocations + " " + NeckLesion1CombinedResult + " " + NeckLesion1RESDecision + " " + NeckLesion1ActivityAdd + "."
  : processedSentenceRESNeckLesionRPH + " " + NeckLesion1AllLocations + " " + NeckLesion1RESActivityRPH + " " + NeckLesion1CombinedResult + " " + NeckLesion1RESDecision + " " + NeckLesion1ActivityAdd + ".";

if (NeckLesion1RESDecision.includes("meta") && NeckLesion1type.includes("ožisk")) RESNeckLesion1 = RESNeckLesion1.replace(/ložisk/g, "meta ložisk").replace(/Ložisk/g, "Meta ložisk").replace(": charakteru meta", ".");
if (NeckLesion1RESDecision.includes("tumor") && NeckLesion1type.includes("ožisk")) RESNeckLesion1 = RESNeckLesion1.replace(/ložisk/g, "tumorózní ložisk").replace(/Ložisk/g, "Tumorózní ložisk").replace(": charakteru tumoru", ".");
if (NeckLesion1RESDecision.includes("tumor") && NeckLesion1type.includes("as")) RESNeckLesion1 = RESNeckLesion1.replace(/mas/g, "tumorózní mas").replace(/Mas/g, "Tumorózní mas").replace(": charakteru tumoru", ".");
if (NeckLesion1RESDecision.includes("tumor") && NeckLesion1type.includes("nfiltr")) RESNeckLesion1 = RESNeckLesion1.replace(/infiltr/g, "tumorózní infiltr").replace(/Infiltr/g, "Tumorózní infiltr").replace(": charakteru tumoru", ".");
if (NeckLesion1CombinedResult.includes("je nově") || NeckLesion1CombinedResult.includes("jsou nově")) RESNeckLesion1 = "Nově " + RESNeckLesion1.charAt(0).toLowerCase() + RESNeckLesion1.substring(1).replace(" je nově", "").replace(" jsou nově", "");
if (NeckLesion1Location === "" && NeckLesion1AddLocation === "") { POPNeckLesion1 = ""; RESNeckLesion1 = ""; }


`;

let codeForNeckLesion2 = codeForNeckLesion1.replace(/Lesion1/g, 'Lesion2').replace(/Chb1/g, 'Chb2');
let codeForNeckLesion3 = codeForNeckLesion1.replace(/Lesion1/g, 'Lesion3').replace(/Chb1/g, 'Chb3');
eval(codeForNeckLesion1);
eval(codeForNeckLesion2);
eval(codeForNeckLesion3);




// NECK LYMPH NODES 

var NeckLymphNode1selectLocationtext = "";

var ChbNeckAllR = document.getElementById("ChbNeckAllR").checked;
var ChbNeckAllL = document.getElementById("ChbNeckAllL").checked;
var ChbNeck1AR = document.getElementById("ChbNeck1AR").checked;
var ChbNeck1AL = document.getElementById("ChbNeck1AL").checked;
var ChbNeck1BR = document.getElementById("ChbNeck1BR").checked;
var ChbNeck1BL = document.getElementById("ChbNeck1BL").checked;
var ChbNeck2AR = document.getElementById("ChbNeck2AR").checked;
var ChbNeck2AL = document.getElementById("ChbNeck2AL").checked;
var ChbNeck2BR = document.getElementById("ChbNeck2BR").checked;
var ChbNeck2BL = document.getElementById("ChbNeck2BL").checked;
var ChbNeck3R = document.getElementById("ChbNeck3R").checked;
var ChbNeck3L = document.getElementById("ChbNeck3L").checked;
var ChbNeck4R = document.getElementById("ChbNeck4R").checked;
var ChbNeck4L = document.getElementById("ChbNeck4L").checked;
var ChbNeck5R = document.getElementById("ChbNeck5R").checked;
var ChbNeck5L = document.getElementById("ChbNeck5L").checked;
var ChbNeck6R = document.getElementById("ChbNeck6R").checked;
var ChbNeck6L = document.getElementById("ChbNeck6L").checked;

var descriptions = [];

if (ChbNeckAllR || ChbNeckAllL) {
    if (ChbNeckAllR && ChbNeckAllL) descriptions.push("na krku bilat.");
    else {
        if (ChbNeckAllR) descriptions.push("na pravé polovině krku");
        if (ChbNeckAllL) descriptions.push("na levé polovině krku");
    }
    NeckLymphNode1selectLocationtext = descriptions.join(', ');
} else {

if (ChbNeck1AR && ChbNeck1AL) descriptions.push("Ia bilat.");
else {
    if (ChbNeck1AR) descriptions.push("Ia vpravo");
    if (ChbNeck1AL) descriptions.push("Ia vlevo");
}

if (ChbNeck1BR && ChbNeck1BL) descriptions.push("Ib bilat.");
else {
    if (ChbNeck1BR) descriptions.push("Ib vpravo");
    if (ChbNeck1BL) descriptions.push("Ib vlevo");
}

if (ChbNeck2AR && ChbNeck2AL) descriptions.push("IIa bilat.");
else {
    if (ChbNeck2AR) descriptions.push("IIa vpravo");
    if (ChbNeck2AL) descriptions.push("IIa vlevo");
}

if (ChbNeck2BR && ChbNeck2BL) descriptions.push("IIb bilat.");
else {
    if (ChbNeck2BR) descriptions.push("IIb vpravo");
    if (ChbNeck2BL) descriptions.push("IIb vlevo");
}

if (ChbNeck3R && ChbNeck3L) descriptions.push("III bilat.");
else {
    if (ChbNeck3R) descriptions.push("III vpravo");
    if (ChbNeck3L) descriptions.push("III vlevo");
}

if (ChbNeck4R && ChbNeck4L) descriptions.push("IV bilat.");
else {
    if (ChbNeck4R) descriptions.push("IV vpravo");
    if (ChbNeck4L) descriptions.push("IV vlevo");
}

if (ChbNeck5R && ChbNeck5L) descriptions.push("V bilat.");
else {
    if (ChbNeck5R) descriptions.push("V vpravo");
    if (ChbNeck5L) descriptions.push("V vlevo");
}

if (ChbNeck6R && ChbNeck6L) descriptions.push("VI bilat.");
else {
    if (ChbNeck6R) descriptions.push("VI vpravo");
    if (ChbNeck6L) descriptions.push("VI vlevo");
}

if (descriptions.length === 1) {
    NeckLymphNode1selectLocationtext = "v krčním regiu " + descriptions[0];
} else if (descriptions.length === 2) {
    NeckLymphNode1selectLocationtext = "v krčních regiích " + descriptions.join(' a ');
} else if (descriptions.length > 2) {
    var lastDescription = descriptions.pop();
    var secondLastDescription = descriptions.pop();
    NeckLymphNode1selectLocationtext = "v krčních regiích " + descriptions.join(', ') + ', ' + secondLastDescription + ' a ' + lastDescription;
} else {
    NeckLymphNode1selectLocationtext = descriptions.join(', ');
}

}

document.getElementById('NeckLymphNode1Location').value = NeckLymphNode1selectLocationtext;




// neck lymph node popis

var NeckLymphNode1Button = document.getElementById("NeckLymphNode1");
var NeckLymphNode1number = document.getElementById("NeckLymphNode1number").value;
var NeckLymphNode1typeRaw = document.getElementById("NeckLymphNode1type").value.trim();
var NeckLymphNode1type = (NeckLymphNode1number && NeckLymphNode1number !== "") ? (pluralForms[NeckLymphNode1typeRaw] || NeckLymphNode1typeRaw) : NeckLymphNode1typeRaw;
var NeckLymphNode1Location = document.getElementById("NeckLymphNode1Location").value;
var NeckLymphNode1AddLocation = document.getElementById("NeckLymphNode1AddLocation").value;
var NeckLymphNode1Loclargest = document.getElementById("NeckLymphNode1Loclargest").value;
var NeckLymphNode1Large = document.getElementById("NeckLymphNode1Large").value;
document.getElementById('NeckLymphNode1number').addEventListener('change', () => document.getElementById('NeckLymphNode1Large').classList.toggle('hidden', document.getElementById('NeckLymphNode1number').value === ""));
var NeckLymphNode1Activity = document.getElementById("NeckLymphNode1Activity").value;
var NeckLymphNode1ActivityCopy = NeckLymphNode1Activity;
var selectedOption = document.getElementById("NeckLymphNode1Activity").selectedOptions[0];
var NeckLymphNode1RESActivityRPH = selectedOption.dataset.valueRPH || '';
var NeckLymphNode1RESActivityFDG = selectedOption.dataset.valueFDG || '';
var NeckLymphNode1SUV = formatSUV("NeckLymphNode1SUV");
var NeckLymphNode1Size = formatLymphNodeSize("NeckLymphNode1Size");
var selectedDecisionOption = document.getElementById("NeckLymphNode1Decision").selectedOptions[0];
var NeckLymphNode1RESDecision = selectedDecisionOption.dataset.valueRPH || '';
var NeckLymphNode1SUVPrev = formatSUV("NeckLymphNode1SUVPrev");
var NeckLymphNode1PrevSize = formatLymphNodeSize("NeckLymphNode1PrevSize");
var NeckLymphNode1ComparisonText = generateComparisonText(NeckLymphNode1SUVPrev, NeckLymphNode1PrevSize, DateComparison, NeckLymphNode1SUV, NeckLymphNode1Size);
var NeckLymphNode1ComparisonSUVRes = compareActRES(NeckLymphNode1SUV, NeckLymphNode1SUVPrev);
var NeckLymphNode1ComparisonSizeRes = compareSizes(NeckLymphNode1Size, NeckLymphNode1PrevSize);
var NeckLymphNode1CombinedResult = combineComparisonResults(NeckLymphNode1ComparisonSizeRes, NeckLymphNode1ComparisonSUVRes, NeckLymphNode1number);
document.getElementById("DateCompare").addEventListener('change', () => document.getElementById("NeckLymphNode1Previous").classList.toggle("hidden", !document.getElementById("DateCompare").value));

var NeckLymphNode1AllLocations = (NeckLymphNode1Location + " " + NeckLymphNode1AddLocation).trim();
if (NeckLymphNode1Loclargest !== "") { NeckLymphNode1Loclargest = NeckLymphNode1ActivityCopy + ", největší " + NeckLymphNode1Loclargest + " "; NeckLymphNode1Activity = ""; }
if (NeckLymphNode1number !== "" && NeckLymphNode1Loclargest === "") {
  NeckLymphNode1Size = NeckLymphNode1Size.replace('diametru ', 'diametru až ').replace('rozměru ', 'rozměru až ');
  NeckLymphNode1ComparisonText = NeckLymphNode1ComparisonText.replace('diametru ', 'diametru až ').replace('rozměru ', 'rozměru až ');
}

var processedSentencePOPNeckLymphNode1 = processSentence(NeckLymphNode1number + " " + NeckLymphNode1type);
var POPNeckLymphNode1 = processedSentencePOPNeckLymphNode1 + " " + NeckLymphNode1AllLocations + " " + NeckLymphNode1Loclargest + " " + NeckLymphNode1Size + " " + NeckLymphNode1Activity + " " + NeckLymphNode1ComparisonText + ".";
var processedSentenceRESNeckLymphNodeFDG = processSentence(NeckLymphNode1number + " " + NeckLymphNode1RESActivityFDG + " " + NeckLymphNode1type);
var processedSentenceRESNeckLymphNodeRPH = processSentence(NeckLymphNode1number + " " + NeckLymphNode1type);
var RESNeckLymphNode1 = (buttonElementPETType.value === "FDG")
  ? processedSentenceRESNeckLymphNodeFDG + " " + NeckLymphNode1AllLocations + " " + NeckLymphNode1CombinedResult + " " + NeckLymphNode1RESDecision + "."
  : processedSentenceRESNeckLymphNodeRPH + " " + NeckLymphNode1AllLocations + " " + NeckLymphNode1RESActivityRPH + " " + NeckLymphNode1CombinedResult + " " + NeckLymphNode1RESDecision + ".";

if (NeckLymphNode1Location === "" && NeckLymphNode1AddLocation === "") { POPNeckLymphNode1 = ""; RESNeckLymphNode1 = ""; }
if (NeckLymphNode1CombinedResult.includes("je nově") || NeckLymphNode1CombinedResult.includes("jsou nově")) {
  RESNeckLymphNode1 = "Nově " + RESNeckLymphNode1.charAt(0).toLowerCase() + RESNeckLymphNode1.substring(1);
  RESNeckLymphNode1 = RESNeckLymphNode1.replace(" je nově", "").replace(" jsou nově", "");
}


// neck others 

// siny

var HeadMaxSinusText = "";
var HeadMaxSinusRes = "";

  var ChbHeadMaxSinusCystR = document.getElementById("ChbHeadMaxSinusCystR").checked;
  var ChbHeadMaxSinusCystL = document.getElementById("ChbHeadMaxSinusCystL").checked;
  var ChbHeadMaxSinusFullR = document.getElementById("ChbHeadMaxSinusFullR").checked;
  var ChbHeadMaxSinusFullL = document.getElementById("ChbHeadMaxSinusFullL").checked;
  var ChbHeadMaxSinusFluidR = document.getElementById("ChbHeadMaxSinusFluidR").checked;
  var ChbHeadMaxSinusFluidL = document.getElementById("ChbHeadMaxSinusFluidL").checked;
  var HeadMaxSinusOther = document.getElementById("HeadMaxSinusOther").value.trim();

var descriptionsHeadMax = [];

if (ChbHeadMaxSinusCystR && ChbHeadMaxSinusCystL) {
    descriptionsHeadMax.push("retenční cysty / polypy bilat.");
} else {
    if (ChbHeadMaxSinusCystR) descriptionsHeadMax.push("retenční cysta / polyp vpravo");
    if (ChbHeadMaxSinusCystL) descriptionsHeadMax.push("retenční cysta / polyp vpravo");
}

if (ChbHeadMaxSinusFullR && ChbHeadMaxSinusFullL) {
    descriptionsHeadMax.push("nevzdušnost bilat. pravědpodobně při chronickém zánětu");
} else {
    if (ChbHeadMaxSinusFullR) descriptionsHeadMax.push("nevzdušnost vpravo pravědpodobně při chronickém zánětu");
    if (ChbHeadMaxSinusFullL) descriptionsHeadMax.push("nevzdušnost vlevo pravědpodobně při chronickém zánětu");
}

if (ChbHeadMaxSinusFluidR && ChbHeadMaxSinusFluidL) {
    descriptionsHeadMax.push("tekutina bilat.");
} else {
    if (ChbHeadMaxSinusFluidR) descriptionsHeadMax.push("tekutina vpravo");
    if (ChbHeadMaxSinusFluidL) descriptionsHeadMax.push("tekutina vlevo");
}

if (HeadMaxSinusOther) descriptionsHeadMax.push(HeadMaxSinusOther);

if (descriptionsHeadMax.length) {
  HeadMaxSinusText = "Maxilární siny: " + descriptionsHeadMax.join(", ") + ". ";
}

// Zuby

// Zuby – HeadTeeth
var HeadTeethText = "";
const upperR = document.getElementById("ChbHeadTeethUpperR").checked;
const upperL = document.getElementById("ChbHeadTeethUpperL").checked;
const lowerR = document.getElementById("ChbHeadTeethLowerR").checked;
const lowerL = document.getElementById("ChbHeadTeethLowerL").checked;
const specTeeth = document.getElementById("HeadTeethText").value.trim();

const locations = [];
if (upperR) locations.push("horní čelisti vpravo");
if (upperL) locations.push("horní čelisti vlevo");
if (lowerR) locations.push("dolní čelisti vpravo");
if (lowerL) locations.push("dolní čelisti vlevo");

let locSimplified = "";
if ((upperR && upperL) && !(lowerR || lowerL)) locSimplified = "v horní čelisti bilat.";
else if ((lowerR && lowerL) && !(upperR || upperL)) locSimplified = "v dolní čelisti bilat.";
else if ((upperR && lowerR) && !(upperL || lowerL)) locSimplified = "v horní i dolní čelisti vpravo";
else if ((upperL && lowerL) && !(upperR || lowerR)) locSimplified = "v horní i dolní čelisti vlevo";

const countChecked = [upperR, upperL, lowerR, lowerL].filter(Boolean).length;
const plural = (countChecked > 1 || specTeeth.includes("zubů")) ? "zubů" : "zubu";

if (countChecked || specTeeth) {
  HeadTeethText = "Zvýšená akumulace RF v oblasti " + plural;

  if (specTeeth) {
    HeadTeethText += " " + specTeeth;
  } else if (locSimplified) {
    HeadTeethText += " " + locSimplified;
  } else if (locations.length > 0) {
    HeadTeethText += " " + locations.join(", ");
  }

  HeadTeethText += " - odontogenní etiologie.";
}


// Tonsils

var HeadTonsilsText = "";
var HeadTonsilsRes = "";

var ChbHeadTonsilsAsymR = document.getElementById("ChbHeadTonsilsAsymR").checked;
var ChbHeadTonsilsAsymL = document.getElementById("ChbHeadTonsilsAsymL").checked;
var ChbHeadAllTonsils = document.getElementById("ChbHeadAllTonsils").checked;
var HeadTonsilsOther = document.getElementById("HeadTonsilsOther").value.trim();

var descriptionsHeadTonsils = [];

if (ChbHeadTonsilsAsymR && ChbHeadTonsilsAsymL) {
    descriptionsHeadTonsils.push("symetricky vysoká akumulace RF v obou patrových tonsilách");
    HeadTonsilsRes = "Metabolická aktivita v obou patrových tonsilách je symetrická. "
} else {
    if (ChbHeadTonsilsAsymR) {
        descriptionsHeadTonsils.push("asymetricky zvýšená akumulace RF v pravé patrové tonsile");
        HeadTonsilsRes = "Asymetricky zvýšená metabolická aktivita v pravé patrové tonsile event. k dovyšetření. "
    }
    if (ChbHeadTonsilsAsymL) {
        descriptionsHeadTonsils.push("asymetricky zvýšená akumulace RF v levé patrové tonsile");
        HeadTonsilsRes = "Asymetricky zvýšená metabolická aktivita v levé patrové tonsile event. k dovyšetření. "
    }
} 

if (ChbHeadAllTonsils) {
    descriptionsHeadTonsils.push("s difuzně vysokou metabolickou aktivitou");
} 

if (HeadTonsilsOther) descriptionsHeadTonsils.push(HeadTonsilsOther);

if (descriptionsHeadTonsils.length) {
  HeadTonsilsText = "Waldeyerův okruh: " + descriptionsHeadTonsils.join(", ") + ". ";
}


// parotidy

var NeckParotidText = "";
  var NeckParotidRes = "";

  var ParotidavidLesionR = document.getElementById("ChbParotidRavidLesion").checked;
  var ParotidavidLesionL = document.getElementById("ChbParotidLavidLesion").checked;
  var ParotidresectionR = document.getElementById("ChbParotidRresection").checked;
  var ParotidresectionL = document.getElementById("ChbParotidLresection").checked;
  var NeckParotidOther = document.getElementById("NeckParotidOther").value.trim();


  if (ParotidavidLesionR || ParotidavidLesionL || ParotidresectionR || ParotidresectionL || NeckParotidOther) {
    NeckParotidText += "Parotické žlázy: ";
  }


  if (ParotidavidLesionR && ParotidavidLesionL) NeckParotidText += "drobné noduly se zvýšenou akumulací RF oboustranně, spíše benigní etiologie (Warthin), ";
  else {
    if (ParotidavidLesionR) NeckParotidText += "drobný nodul se zvýšenou akumulací RF vpravo, spíše benigní etiologie (Warthin), ";
    if (ParotidavidLesionL) NeckParotidText += "drobný nodul se zvýšenou akumulací RF vlevo, spíše benigní etiologie (Warthin), ";
  }

  if (ParotidresectionR && ParotidresectionL) NeckParotidText += "chybí po bilat. resekci, ";
  else {
    if (ParotidresectionR) NeckParotidText += "chybí pravá po resekci, ";
    if (ParotidresectionL) NeckParotidText += "chybí levá po resekci, ";
  }

  if (NeckParotidOther) {
    NeckParotidText += NeckParotidOther + ", ";
  }

  if (NeckParotidText.endsWith(", ")) {
    NeckParotidText = NeckParotidText.slice(0, -2) + ". ";
  }

// thyroid

var NeckThyroidText = ""; var NeckThyroidRes = "";

  var ThyroidenlargementR = document.getElementById("ChbThyroidRenlarge").checked;
  var ThyroidenlargementL = document.getElementById("ChbThyroidLenlarge").checked;
  var ThyroidavidLesionR = document.getElementById("ChbThyroidRavidLesion").checked;
  var ThyroidavidLesionL = document.getElementById("ChbThyroidLavidLesion").checked;
  var ThyroidnonAvidLesionR = document.getElementById("ChbThyroidRnonavidLesion").checked;
  var ThyroidnonAvidLesionL = document.getElementById("ChbThyroidLnonavidLesion").checked;
  var ThyroidresectionR = document.getElementById("ChbThyroidRresection").checked;
  var ThyroidresectionL = document.getElementById("ChbThyroidLresection").checked;
  var Thyroiddiffuse = document.getElementById("ChbThyroidaviddiffuse").checked;
  var NeckThyroidOther = document.getElementById("NeckThyroidOther").value.trim();

    if (ThyroidenlargementR || ThyroidenlargementL || ThyroidavidLesionR || ThyroidavidLesionL || ThyroidnonAvidLesionR || ThyroidnonAvidLesionL || ThyroidresectionR || ThyroidresectionL || Thyroiddiffuse || NeckThyroidOther) {
    NeckThyroidText += "Thyroidea: ";
  }

  if (ThyroidenlargementR && ThyroidenlargementL) NeckThyroidText += "zvětšená, ";
  else {
    if (ThyroidenlargementR) NeckThyroidText += "zvětšený pravý lalok, ";
    if (ThyroidenlargementL) NeckThyroidText += "zvětšený levý lalok, ";
  }

if (ThyroidavidLesionR && ThyroidavidLesionL) {NeckThyroidText += "noduly se zvýšenou akumulací RF v obou lalocích, "; NeckThyroidRes += "Oba laloky štítné žlázy s metabolicky aktivními noduly k dovyšetření. ";
} else {
    if (ThyroidavidLesionR) {NeckThyroidText += "nodul se zvýšenou akumulací RF v pravém laloku, "; NeckThyroidRes += "Pravý lalok štítné žlázy s metabolicky aktivním nodulem k dovyšetření. "; }
    if (ThyroidavidLesionL) {NeckThyroidText += "nodul se zvýšenou akumulací RF v levém laloku, "; NeckThyroidRes += "Levý lalok štítné žlázy s metabolicky aktivním nodulem k dovyšetření. "; }
}


  if (ThyroidnonAvidLesionR && ThyroidnonAvidLesionL) NeckThyroidText += "noduly bez zvýšené akumulace RF v obou lalocích, ";
  else {
    if (ThyroidnonAvidLesionR) NeckThyroidText += "nodul bez zvýšené akumulace RF v pravém laloku, ";
    if (ThyroidnonAvidLesionL) NeckThyroidText += "nodul bez zvýšené akumulace RF v levém laloku, ";
  }

  if (ThyroidresectionR && ThyroidresectionL) NeckThyroidText += "chybí po TTE, ";
  else {
    if (ThyroidresectionR) NeckThyroidText += "st.p. hemithyroidektomii vpravo, ";
    if (ThyroidresectionL) NeckThyroidText += "st.p. hemithyroidektomii vlevo, ";
  }

  if (Thyroiddiffuse) {
    NeckThyroidText += "difuzně zvýšená akumulace RF, ";
    NeckThyroidRes += "Štítná žláza s difuzně zvýšenou metabolickou aktivitou při thyreopatii. ";
  }

  if (NeckThyroidOther) {
    NeckThyroidText += NeckThyroidOther + ", ";
  }

  if (NeckThyroidText.endsWith(", ")) {
    NeckThyroidText = NeckThyroidText.slice(0, -2) + ".";
  }

// Hlasivky

var NeckVCordsText = "";
  var NeckVCordsRes = "";

  var ChbVCordsR = document.getElementById("ChbVCordsR").checked;
  var ChbVCordsL = document.getElementById("ChbVCordsL").checked;
  var NeckVCordsOther = document.getElementById("NeckVCordsOther").value.trim();

  if (ChbVCordsR || ChbVCordsL || NeckVCordsOther) {
    NeckVCordsText += "Hlasivky: ";
  }

  if (ChbVCordsR && ChbVCordsL) {
    NeckVCordsText += "abduktory oboustranně bez patrné akumulace RF, ";
} else {
    if (ChbVCordsR) {
        NeckVCordsText += "pravý m. cricoaryt. post. asymetricky bez patrné akumulace RF, "; 
        NeckVCordsRes = "Paréza pravé hlasivky. ";
    }
    if (ChbVCordsL) {
        NeckVCordsText += "levý m. cricoaryt. post. asymetricky bez patrné akumulace RF, "; 
        NeckVCordsRes = "Paréza levé hlasivky. ";
    }
}


  if (NeckVCordsOther) {
    NeckVCordsText += NeckVCordsOther + ", ";
  }

  if (NeckVCordsText.endsWith(", ")) {
    NeckVCordsText = NeckVCordsText.slice(0, -2) + ". ";
  }

// zakrok

var NeckTreatmentText = "";
  var NeckTreatmentRes = "";

  var NeckRradiation = document.getElementById("ChbNeckRradiation").checked;
  var NeckLradiation = document.getElementById("ChbNeckLradiation").checked;
  var NeckRsurgery = document.getElementById("ChbNeckRsurgery").checked;
  var NeckLsurgery = document.getElementById("ChbNeckLsurgery").checked;
  var ChbNeckTSK = document.getElementById("ChbNeckTSK").checked;
  var NeckTreatmentOther = document.getElementById("NeckTreatmentOther").value.trim();

	if (NeckRradiation && NeckRsurgery && NeckLradiation && NeckLsurgery) {
	  NeckTreatmentText += "Pooperační a poradiační změny měkkých tkání na krku oboustranně. ";
	} else {
	  if (NeckRradiation && NeckRsurgery) NeckTreatmentText += "Pooperační a poradiační změny měkkých tkání na krku vpravo. ";
	  if (NeckLradiation && NeckLsurgery) NeckTreatmentText += "Pooperační a poradiační změny měkkých tkání na krku vlevo. ";
	  if (NeckRradiation && NeckLradiation && !NeckRsurgery && !NeckLsurgery) NeckTreatmentText += "Poradiační změny měkkých tkání na krku oboustranně. ";
	  else {
		if (NeckRradiation && !NeckRsurgery) NeckTreatmentText += "Poradiační změny měkkých tkání na krku vpravo. ";
		if (NeckLradiation && !NeckLsurgery) NeckTreatmentText += "Poradiační změny měkkých tkání na krku vlevo. ";
	  }
	  if (NeckRsurgery && NeckLsurgery && !NeckRradiation && !NeckLradiation) NeckTreatmentText += "Pooperační změny měkkých tkání na krku oboustranně. ";
	  else {
		if (NeckRsurgery && !NeckRradiation) NeckTreatmentText += "Pooperační změny měkkých tkání na krku vpravo. ";
		if (NeckLsurgery && !NeckLradiation) NeckTreatmentText += "Pooperační změny měkkých tkání na krku vlevo. ";
	  }
	}	
	
	if (ChbNeckTSK) {
    NeckTreatmentText += "Tracheostomická kanyla. ";
  }

  if (NeckTreatmentOther) {
    NeckTreatmentText += NeckTreatmentOther[0].toUpperCase() + NeckTreatmentOther.slice(1) + ". ";
  }



//Neck Others by priority

var NeckOther1Priority = ""; var NeckOther1NoPriority = ""; var NeckOther1ResPriority = "";
var NeckOther1Pop = document.getElementById("NeckOther1Pop").value;
var NeckOther1Res = document.getElementById("NeckOther1Res").value;
if (NeckOther1Pop !== "" && NeckOther1Res ==="") {NeckOther1Priority = ""; NeckOther1NoPriority = NeckOther1Pop + ". "; NeckOther1ResPriority = "";
	} else if (NeckOther1Pop !== "" && NeckOther1Res !=="") {NeckOther1Priority = NeckOther1Pop  + ". "; NeckOther1NoPriority = ""; NeckOther1ResPriority = NeckOther1Res  + ". ";}

NeckOther1Priority = NeckOther1Priority.charAt(0).toUpperCase() + NeckOther1Priority.slice(1);
NeckOther1NoPriority = NeckOther1NoPriority.charAt(0).toUpperCase() + NeckOther1NoPriority.slice(1);
NeckOther1ResPriority = NeckOther1ResPriority.charAt(0).toUpperCase() + NeckOther1ResPriority.slice(1);

// neck native or not
if (checkViability(POPNeckLymphNode1 || POPNeckLesion1 || POPNeckLesion2 || POPNeckLesion3 )) {
  POPNeckNative = "";
  POPNeckElse = "Jinde se patologická hypermetabolická ložiska nezobrazují. ";
} else {
  POPNeckNative = "Není přítomen patologický hyperakumulující fokus, ložisko či lymfadenopatie. ";
  POPNeckElse = "";
}



// THORAX

// Thorax lesions
let codeForThoraxLesion1 = `

var ThoraxLesion1Locationtext = "";

  // Plíce
  if (document.getElementById('Chb1LungsR').checked && document.getElementById('Chb1LungsL').checked) {
    ThoraxLesion1Locationtext += "obou plic";
  } else {
    if (document.getElementById('Chb1LungsR').checked) ThoraxLesion1Locationtext += "pravé plíce";
    if (document.getElementById('Chb1LungsL').checked) ThoraxLesion1Locationtext += "levé plíce";
  }


// Right side
var rightLungLobes = [];
if (document.getElementById('Chb1LobeUpperR').checked) rightLungLobes.push("horního laloku");
if (document.getElementById('Chb1LobeMiddleR').checked) rightLungLobes.push("středního laloku");
if (document.getElementById('Chb1LobeLowerR').checked) rightLungLobes.push("dolního laloku");
if (rightLungLobes.length > 0) {
  ThoraxLesion1Locationtext += (ThoraxLesion1Locationtext ? ", " : "") + rightLungLobes.join(' a ') + " pravé plíce";
}

// Left side
var leftLungLobes = [];
if (document.getElementById('Chb1LobeUpperL').checked) leftLungLobes.push("horního laloku");
if (document.getElementById('Chb1LobeMiddleL').checked) leftLungLobes.push("linguly");
if (document.getElementById('Chb1LobeLowerL').checked) leftLungLobes.push("dolního laloku");
if (leftLungLobes.length > 0) {
  ThoraxLesion1Locationtext += (ThoraxLesion1Locationtext ? ", " : "") + leftLungLobes.join(' a ') + " levé plíce";
}



// S1 - S10
var rightLungSegments = [];
var leftLungSegments = [];

for (var i = 1; i <= 10; i++) {
  if (document.getElementById('Chb1LungS' + i + 'R').checked) {
    rightLungSegments.push("S" + i);
  }
  if (document.getElementById('Chb1LungS' + i + 'L').checked) {
    if (i === 1 ) {
      leftLungSegments.push("S1+2");
    } else {
      leftLungSegments.push("S" + i);
    }
  }
}

if (rightLungSegments.length > 0) {
  ThoraxLesion1Locationtext += (ThoraxLesion1Locationtext ? ", " : "") + rightLungSegments.join(', ') + " pravé plíce";
}
if (leftLungSegments.length > 0) {
  ThoraxLesion1Locationtext += (ThoraxLesion1Locationtext ? ", " : "") + leftLungSegments.join(', ') + " levé plíce";
}


// Central and Peripheral locations
  if (document.getElementById('Chb1CentralLocation').checked) ThoraxLesion1Locationtext += (ThoraxLesion1Locationtext ? " " : "") + "centrálně";
  if (document.getElementById('Chb1PeripheralLocation').checked) ThoraxLesion1Locationtext += (ThoraxLesion1Locationtext ? " " : "") + "periferně";

// Pleura
  if (document.getElementById('Chb1PleuraR').checked && document.getElementById('Chb1PleuraL').checked) {
    ThoraxLesion1Locationtext += (ThoraxLesion1Locationtext ? ", " : "") + "pleurálně oboustranně";
  } else {
    if (document.getElementById('Chb1PleuraR').checked) ThoraxLesion1Locationtext += (ThoraxLesion1Locationtext ? ", " : "") + "pleurálně vpravo";
    if (document.getElementById('Chb1PleuraL').checked) ThoraxLesion1Locationtext += (ThoraxLesion1Locationtext ? ", " : "") + "pleurálně vlevo";
  }

// Hrudní stěna
  if (document.getElementById('Chb1ChestWallR').checked && document.getElementById('Chb1ChestWallL').checked) {
    ThoraxLesion1Locationtext += (ThoraxLesion1Locationtext ? ", " : "") + "hrudní stěny oboustranně";
  } else {
    if (document.getElementById('Chb1ChestWallR').checked) ThoraxLesion1Locationtext += (ThoraxLesion1Locationtext ? ", " : "") + "hrudní stěny vpravo";
    if (document.getElementById('Chb1ChestWallL').checked) ThoraxLesion1Locationtext += (ThoraxLesion1Locationtext ? ", " : "") + "hrudní stěny vlevo";
  }

  // PRSY  
function addBreastLocationText(side, location) {
  return (ThoraxLesion1Locationtext ? ", " : "") + location + " " + side;
}

if (document.getElementById('Chb1MammaULQR').checked && document.getElementById('Chb1MammaUMQR').checked) {
  ThoraxLesion1Locationtext += addBreastLocationText('pravého prsu', 'na rozhraní HZK a HVK');
} else if (document.getElementById('Chb1MammaLMQR').checked && document.getElementById('Chb1MammaLLQR').checked) {
  ThoraxLesion1Locationtext += addBreastLocationText('pravého prsu', 'na rozhraní DVK a DZK');
} else if (document.getElementById('Chb1MammaUMQR').checked && document.getElementById('Chb1MammaLMQR').checked) {
  ThoraxLesion1Locationtext += addBreastLocationText('pravého prsu', 'na rozhraní HVK a DVK');
} else if (document.getElementById('Chb1MammaULQR').checked && document.getElementById('Chb1MammaLLQR').checked) {
  ThoraxLesion1Locationtext += addBreastLocationText('pravého prsu', 'na rozhraní HZK a DZK');
} else if (document.getElementById('Chb1MammaULQR').checked) {
  ThoraxLesion1Locationtext += addBreastLocationText('pravého prsu', 'HZK');
} else if (document.getElementById('Chb1MammaUMQR').checked) {
  ThoraxLesion1Locationtext += addBreastLocationText('pravého prsu', 'HVK');
} else if (document.getElementById('Chb1MammaLMQR').checked) {
  ThoraxLesion1Locationtext += addBreastLocationText('pravého prsu', 'DVK');
} else if (document.getElementById('Chb1MammaLLQR').checked) {
  ThoraxLesion1Locationtext += addBreastLocationText('pravého prsu', 'DZK');
}

if (document.getElementById('Chb1MammaULQL').checked && document.getElementById('Chb1MammaUMQL').checked) {
  ThoraxLesion1Locationtext += addBreastLocationText('levého prsu', 'na rozhraní HZK a HVK');
} else if (document.getElementById('Chb1MammaLMQL').checked && document.getElementById('Chb1MammaLLQL').checked) {
  ThoraxLesion1Locationtext += addBreastLocationText('levého prsu', 'na rozhraní DVK a DZK');
} else if (document.getElementById('Chb1MammaUMQL').checked && document.getElementById('Chb1MammaLMQL').checked) {
  ThoraxLesion1Locationtext += addBreastLocationText('levého prsu', 'na rozhraní HVK a DVK');
} else if (document.getElementById('Chb1MammaULQL').checked && document.getElementById('Chb1MammaLLQL').checked) {
  ThoraxLesion1Locationtext += addBreastLocationText('levého prsu', 'na rozhraní HZK a DZK');
} else if (document.getElementById('Chb1MammaULQL').checked) {
  ThoraxLesion1Locationtext += addBreastLocationText('levého prsu', 'HZK');
} else if (document.getElementById('Chb1MammaUMQL').checked) {
  ThoraxLesion1Locationtext += addBreastLocationText('levého prsu', 'HVK');
} else if (document.getElementById('Chb1MammaLMQL').checked) {
  ThoraxLesion1Locationtext += addBreastLocationText('levého prsu', 'DVK');
} else if (document.getElementById('Chb1MammaLLQL').checked) {
  ThoraxLesion1Locationtext += addBreastLocationText('levého prsu', 'DZK');
}

// oesophagus

var OesophagusParts = [];
if (document.getElementById('Chb1OesophagusUpper').checked) OesophagusParts.push("horní třetiny");
if (document.getElementById('Chb1OesophagusMiddle').checked) OesophagusParts.push("střední třetiny");
if (document.getElementById('Chb1OesophagusLower').checked) OesophagusParts.push("dolní třetiny");
if (OesophagusParts.length > 0) {
  ThoraxLesion1Locationtext += (ThoraxLesion1Locationtext ? ", " : "") + OesophagusParts.join(' a ') + " jícnu";
}

// Thymus
  if (document.getElementById('Chb1ThymusR').checked && document.getElementById('Chb1ThymusL').checked) {
    ThoraxLesion1Locationtext += (ThoraxLesion1Locationtext ? ", " : "") + "thymu centrálně";
  } else {
    if (document.getElementById('Chb1ThymusR').checked) ThoraxLesion1Locationtext += (ThoraxLesion1Locationtext ? ", " : "") + "thymu vpravo";
    if (document.getElementById('Chb1ThymusL').checked) ThoraxLesion1Locationtext += (ThoraxLesion1Locationtext ? ", " : "") + "thymu vlevo";
  }
  
// Parkardiálně
  if (document.getElementById('Chb1ParacardialR').checked && document.getElementById('Chb1ParacardialL').checked) {
    ThoraxLesion1Locationtext += (ThoraxLesion1Locationtext ? ", " : "") + "v parakardiálním tuku oboustranně";
  } else {
    if (document.getElementById('Chb1ParacardialR').checked) ThoraxLesion1Locationtext += (ThoraxLesion1Locationtext ? ", " : "") + "v parakardiálním tuku vpravo";
    if (document.getElementById('Chb1ParacardialL').checked) ThoraxLesion1Locationtext += (ThoraxLesion1Locationtext ? ", " : "") + "v parakardiálním tuku vlevo";
  }

document.getElementById('ThoraxLesion1Location').value = ThoraxLesion1Locationtext;


// Thorax lesion1 popis

var ThoraxLesion1Button = document.getElementById("ThoraxLesion1");
var ThoraxLesion1typeRaw = document.getElementById("ThoraxLesion1type").value.trim();
var ThoraxLesion1number = document.getElementById("ThoraxLesion1number").value;
var ThoraxLesion1type = (ThoraxLesion1number && ThoraxLesion1number !== "") ? (pluralForms[ThoraxLesion1typeRaw] || ThoraxLesion1typeRaw) : ThoraxLesion1typeRaw;
var ThoraxLesion1Location = document.getElementById("ThoraxLesion1Location").value;
var ThoraxLesion1AddLocation = document.getElementById("ThoraxLesion1AddLocation").value;
var ThoraxLesion1Loclargest = document.getElementById("ThoraxLesion1Loclargest").value;
document.getElementById('ThoraxLesion1number').addEventListener('change', () => document.getElementById('ThoraxLesion1Large').classList.toggle('hidden', document.getElementById('ThoraxLesion1number').value === ""));
var ThoraxLesion1Activity = document.getElementById("ThoraxLesion1Activity").value;
var ThoraxLesion1ActivityCopy = ThoraxLesion1Activity;
var ThoraxLesion1ActivityOption = document.getElementById("ThoraxLesion1Activity").selectedOptions[0];
var ThoraxLesion1RESActivityRPH = ThoraxLesion1ActivityOption.dataset.valueRPH || '';
var ThoraxLesion1RESActivityFDG = ThoraxLesion1ActivityOption.dataset.valueFDG || '';
var ThoraxLesion1SUV = formatSUV("ThoraxLesion1SUV");
var ThoraxLesion1Size = formatLesionSize("ThoraxLesion1Size");
var ThoraxLesion1RESDecision = document.getElementById("ThoraxLesion1Decision").value;
document.getElementById("DateCompare").addEventListener('change', () => document.getElementById("ThoraxLesion1Previous").classList.toggle("hidden", !document.getElementById("DateCompare").value));
var ThoraxLesion1SUVPrev = formatSUV("ThoraxLesion1SUVPrev");
var ThoraxLesion1PrevSize = formatLesionSize("ThoraxLesion1PrevSize");
var ThoraxLesion1ComparisonText = generateComparisonText(ThoraxLesion1SUVPrev, ThoraxLesion1PrevSize, DateComparison, ThoraxLesion1SUV, ThoraxLesion1Size);
var ThoraxLesion1ComparisonSUVRes = compareActRES(ThoraxLesion1SUV, ThoraxLesion1SUVPrev);
var ThoraxLesion1ComparisonSizeRes = compareSizes(ThoraxLesion1Size, ThoraxLesion1PrevSize);
var ThoraxLesion1CombinedResult = combineComparisonResults(ThoraxLesion1ComparisonSizeRes, ThoraxLesion1ComparisonSUVRes, ThoraxLesion1number);
var ThoraxLesion1ActivityAdd = checkSmallSize(ThoraxLesion1Size, ThoraxLesion1SUV);
var ThoraxLesion1AllLocations = (ThoraxLesion1Location + " " + ThoraxLesion1AddLocation).trim();

if (ThoraxLesion1Loclargest !== "") { ThoraxLesion1Loclargest = ThoraxLesion1ActivityCopy + ", největší " + ThoraxLesion1Loclargest + " "; ThoraxLesion1Activity = ""; }
if (ThoraxLesion1number !== "" && ThoraxLesion1Loclargest === "") {
  ThoraxLesion1Size = ThoraxLesion1Size.replace("diametru ", "diametru až ").replace("rozměru ", "rozměru až ");
  ThoraxLesion1ComparisonText = ThoraxLesion1ComparisonText.replace("diametru ", "diametru až ").replace("rozměru ", "rozměru až ");
}

var processedSentencePOPThoraxLesion1 = processSentence(ThoraxLesion1number + " " + ThoraxLesion1type);
var POPThoraxLesion1 = processedSentencePOPThoraxLesion1 + " " + ThoraxLesion1AllLocations + " " + ThoraxLesion1Loclargest + " " + ThoraxLesion1Size + " " + ThoraxLesion1Activity + " " + ThoraxLesion1ComparisonText + ".";
var processedSentenceRESThoraxLesionFDG = processSentence(ThoraxLesion1number + " " + ThoraxLesion1RESActivityFDG + " " + ThoraxLesion1type);
var processedSentenceRESThoraxLesionRPH = processSentence(ThoraxLesion1number + " " + ThoraxLesion1type);
var RESThoraxLesion1 = (buttonElementPETType.value === "FDG")
  ? processedSentenceRESThoraxLesionFDG + " " + ThoraxLesion1AllLocations + " " + ThoraxLesion1CombinedResult + " " + ThoraxLesion1RESDecision + " " + ThoraxLesion1ActivityAdd + "."
  : processedSentenceRESThoraxLesionRPH + " " + ThoraxLesion1AllLocations + " " + ThoraxLesion1RESActivityRPH + " " + ThoraxLesion1CombinedResult + " " + ThoraxLesion1RESDecision + " " + ThoraxLesion1ActivityAdd + ".";


if (ThoraxLesion1RESDecision.includes("meta") && ThoraxLesion1type.includes("ožisk")) {RESThoraxLesion1 = RESThoraxLesion1.replace(/ložisk/g, "meta ložisk").replace(/Ložisk/g, "Meta ložisk").replace(": charakteru meta", ".");}
if (ThoraxLesion1RESDecision.includes("tumor") && ThoraxLesion1type.includes("ožisk")) {RESThoraxLesion1 = RESThoraxLesion1.replace(/ložisk/g, "tumorózní ložisk").replace(/Ložisk/g, "Tumorózní ložisk").replace(": charakteru tumoru", ".");}
if (ThoraxLesion1RESDecision.includes("tumor") && ThoraxLesion1type.includes("as")) {RESThoraxLesion1 = RESThoraxLesion1.replace(/mas/g, "tumorózní mas").replace(/Mas/g, "Tumorózní mas").replace(": charakteru tumoru", ".");}
if (ThoraxLesion1RESDecision.includes("tumor") && ThoraxLesion1type.includes("nfiltr")) {RESThoraxLesion1 = RESThoraxLesion1.replace(/infiltr/g, "tumorózní infiltr").replace(/Infiltrace/g, "Tumorózní infiltr").replace(": charakteru tumoru", ".");}
if (ThoraxLesion1RESDecision.includes("tumor") && ThoraxLesion1type.includes("xpanz")) {RESThoraxLesion1 = RESThoraxLesion1.replace(/expanze/g, "tumorózní expanze").replace(/Expanze/g, "Tumorózní expanze").replace(": charakteru tumoru", ".");}
if (ThoraxLesion1RESDecision.includes("tumor") && ThoraxLesion1type.includes("onsolidac")) {RESThoraxLesion1 = RESThoraxLesion1.replace(/konsolidace/g, "tumorózní konsolidace").replace(/Konsolidace/g, "Tumorózní konsolidace").replace(": charakteru tumoru", ".");}
if (ThoraxLesion1CombinedResult.includes("je nově") || ThoraxLesion1CombinedResult.includes("jsou nově")) { RESThoraxLesion1 = "Nově " + RESThoraxLesion1.charAt(0).toLowerCase() + RESThoraxLesion1.substring(1) ; RESThoraxLesion1 = RESThoraxLesion1.replace(" je nově", "").replace(" jsou nově", "");}

if (ThoraxLesion1Location ==="" && ThoraxLesion1AddLocation ==="") {POPThoraxLesion1 = ""; RESThoraxLesion1 = "";}

`;

let codeForThoraxLesion2 = codeForThoraxLesion1.replace(/Lesion1/g, 'Lesion2').replace(/Chb1/g, 'Chb2');
let codeForThoraxLesion3 = codeForThoraxLesion1.replace(/Lesion1/g, 'Lesion3').replace(/Chb1/g, 'Chb3');
eval(codeForThoraxLesion1);
eval(codeForThoraxLesion2);
eval(codeForThoraxLesion3);



// THORAX LYMPH NODES

var ThoraxLymphNode1Locationtext = "";

	var segments = [];
	var ChbMed_segments = [];

    var SupraCR = document.getElementById('ChbSupraClavR').checked;
    varSupraCL = document.getElementById('ChbSupraClavL').checked;
    if(SupraCR && varSupraCL) {
        segments.push('supraklavikulárně bilat.');
    } else if(SupraCR) {
        segments.push('supraklavikulárně vpravo');
    } else if(varSupraCL) {
        segments.push('supraklavikulárně vlevo');
    }


for(var i = 1; i <= 10; i++) {
    if(i === 3) {
        if(document.getElementById('ChbMed3A') && document.getElementById('ChbMed3A').checked) {
            ChbMed_segments.push('3A');
        }
        if(document.getElementById('ChbMed3P') && document.getElementById('ChbMed3P').checked) {
            ChbMed_segments.push('3P');
        }
    } else {
        if(document.getElementById('ChbMed' + i + 'R') && document.getElementById('ChbMed' + i + 'R').checked) {
            ChbMed_segments.push(i + 'R');
        }
        if(document.getElementById('ChbMed' + i + 'L') && document.getElementById('ChbMed' + i + 'L').checked) {
            ChbMed_segments.push(i + 'L');
        }
        if(!document.getElementById('ChbMed' + i + 'R') && !document.getElementById('ChbMed' + i + 'L') && document.getElementById('ChbMed' + i) && document.getElementById('ChbMed' + i).checked) {
            ChbMed_segments.push(i.toString());
        }
    }
}

if (ChbMed_segments.length > 1) {
    segments.push("v regiích " + ChbMed_segments.join(', '));
} else if (ChbMed_segments.length > 0) {
    segments.push("v regiu " + ChbMed_segments.join(', '));
}


    if(document.getElementById('ChbMediastinum').checked) {
        segments.push('mediastina');
    }

    var hilyR = document.getElementById('ChbMedHilaR').checked;
    var hilyL = document.getElementById('ChbMedHilaL').checked;
    if(hilyR && hilyL) {
        segments.push('v obou plicních hilech');
    } else if(hilyR) {
        segments.push('v pravém plicním hilu');
    } else if(hilyL) {
        segments.push('v levém plicním hilu');
    }

    var axilsR = document.getElementById('ChbAxilsR').checked;
    var axilsL = document.getElementById('ChbAxilsL').checked;
    if(axilsR && axilsL) {
        segments.push('v obou axilách');
    } else if(axilsR) {
        segments.push('pravé axily');
    } else if(axilsL) {
        segments.push('levé axily');
    }

    var parasternalR = document.getElementById('ChbParasternalR').checked;
    var parasternalL = document.getElementById('ChbParasternalL').checked;
    if(parasternalR && parasternalL) {
        segments.push('parasternálně bilat.');
    } else if(parasternalR) {
        segments.push('parasternálně vpravo');
    } else if(parasternalL) {
        segments.push('parasternálně vlevo');
    }

    var paracardiumR = document.getElementById('ChbParacardiumR').checked;
    var paracardiumL = document.getElementById('ChbParacardiumL').checked;
    if(paracardiumR && paracardiumL) {
        segments.push('v parakardiálním tuku bilat.');
    } else if(paracardiumR) {
        segments.push('v parakardiálním tuku vpravo');
    } else if(paracardiumL) {
        segments.push('v parakardiálním tuku vlevo');
    }

if (segments.length === 2) {
    ThoraxLymphNode1Locationtext = segments.join(' a ');
} else if (segments.length > 2) {
    var lastSegment = segments.pop();
    var secondLastSegment = segments.pop();
    ThoraxLymphNode1Locationtext = segments.join(', ') + ', ' + secondLastSegment + ' a ' + lastSegment;
} else {
    ThoraxLymphNode1Locationtext = segments.join(', ');
}

  document.getElementById('ThoraxLymphNode1Location').value = ThoraxLymphNode1Locationtext;



// Thorax lymph node popis

var ThoraxLymphNode1Button = document.getElementById("ThoraxLymphNode1");
var ThoraxLymphNode1number = document.getElementById("ThoraxLymphNode1number").value;
var ThoraxLymphNode1typeRaw = document.getElementById("ThoraxLymphNode1type").value.trim();
var ThoraxLymphNode1type = (ThoraxLymphNode1number && ThoraxLymphNode1number !== "") ? (pluralForms[ThoraxLymphNode1typeRaw] || ThoraxLymphNode1typeRaw) : ThoraxLymphNode1typeRaw;
var ThoraxLymphNode1Location = document.getElementById("ThoraxLymphNode1Location").value;
var ThoraxLymphNode1AddLocation = document.getElementById("ThoraxLymphNode1AddLocation").value;
var ThoraxLymphNode1Loclargest = document.getElementById("ThoraxLymphNode1Loclargest").value;
var ThoraxLymphNode1Large = document.getElementById("ThoraxLymphNode1Large").value;
document.getElementById('ThoraxLymphNode1number').addEventListener('change', () => {document.getElementById('ThoraxLymphNode1Large').classList.toggle('hidden', document.getElementById('ThoraxLymphNode1number').value === "");});
var ThoraxLymphNode1Activity = document.getElementById("ThoraxLymphNode1Activity").value;
var ThoraxLymphNode1ActivityCopy = ThoraxLymphNode1Activity;
var selectedOption = document.getElementById("ThoraxLymphNode1Activity").selectedOptions[0];
var ThoraxLymphNode1RESActivityRPH = selectedOption.dataset.valueRPH || '';
var ThoraxLymphNode1RESActivityFDG = selectedOption.dataset.valueFDG || '';
var ThoraxLymphNode1SUV = formatSUV("ThoraxLymphNode1SUV");
var ThoraxLymphNode1Size = formatLymphNodeSize("ThoraxLymphNode1Size");
var selectedDecisionOption = document.getElementById("ThoraxLymphNode1Decision").selectedOptions[0];
var ThoraxLymphNode1RESDecision = selectedDecisionOption.dataset.valueRPH || '';
var ThoraxLymphNode1SUVPrev = formatSUV("ThoraxLymphNode1SUVPrev");
var ThoraxLymphNode1PrevSize = formatLymphNodeSize("ThoraxLymphNode1PrevSize");
var ThoraxLymphNode1ComparisonText = generateComparisonText(ThoraxLymphNode1SUVPrev, ThoraxLymphNode1PrevSize, DateComparison, ThoraxLymphNode1SUV, ThoraxLymphNode1Size);
var ThoraxLymphNode1ComparisonSUVRes = compareActRES(ThoraxLymphNode1SUV, ThoraxLymphNode1SUVPrev);
var ThoraxLymphNode1ComparisonSizeRes = compareSizes(ThoraxLymphNode1Size, ThoraxLymphNode1PrevSize);
var ThoraxLymphNode1CombinedResult = combineComparisonResults(ThoraxLymphNode1ComparisonSizeRes, ThoraxLymphNode1ComparisonSUVRes, ThoraxLymphNode1number);
document.getElementById("DateCompare").addEventListener('change', () => document.getElementById("ThoraxLymphNode1Previous").classList.toggle("hidden", !document.getElementById("DateCompare").value));

var ThoraxLymphNode1AllLocations = (ThoraxLymphNode1Location + " " + ThoraxLymphNode1AddLocation).trim();
if (ThoraxLymphNode1Loclargest !== "") { ThoraxLymphNode1Loclargest = ThoraxLymphNode1ActivityCopy + ", největší " + ThoraxLymphNode1Loclargest + " "; ThoraxLymphNode1Activity = ""; }
if (ThoraxLymphNode1number !== "" && ThoraxLymphNode1Loclargest === "") {
  ThoraxLymphNode1Size = ThoraxLymphNode1Size.replace('diametru ', 'diametru až ').replace('rozměru ', 'rozměru až ');
  ThoraxLymphNode1ComparisonText = ThoraxLymphNode1ComparisonText.replace('diametru ', 'diametru až ').replace('rozměru ', 'rozměru až ');
}

var processedSentencePOPThoraxLymphNode1 = processSentence(ThoraxLymphNode1number + " " + ThoraxLymphNode1type);
var POPThoraxLymphNode1 = processedSentencePOPThoraxLymphNode1 + " " + ThoraxLymphNode1AllLocations + " " + ThoraxLymphNode1Loclargest + " " + ThoraxLymphNode1Size + " " + ThoraxLymphNode1Activity + " " + ThoraxLymphNode1ComparisonText + ".";
var processedSentenceRESThoraxLymphNodeFDG = processSentence(ThoraxLymphNode1number + " " + ThoraxLymphNode1RESActivityFDG + " " + ThoraxLymphNode1type);
var processedSentenceRESThoraxLymphNodeRPH = processSentence(ThoraxLymphNode1number + " " + ThoraxLymphNode1type);
var RESThoraxLymphNode1 = (buttonElementPETType.value === "FDG")
  ? processedSentenceRESThoraxLymphNodeFDG + " " + ThoraxLymphNode1AllLocations + " " + ThoraxLymphNode1CombinedResult + " " + ThoraxLymphNode1RESDecision + "."
  : processedSentenceRESThoraxLymphNodeRPH + " " + ThoraxLymphNode1AllLocations + " " + ThoraxLymphNode1RESActivityRPH + " " + ThoraxLymphNode1CombinedResult + " " + ThoraxLymphNode1RESDecision + ".";

if (ThoraxLymphNode1Location === "" && ThoraxLymphNode1AddLocation === "") { POPThoraxLymphNode1 = ""; RESThoraxLymphNode1 = ""; }
if (ThoraxLymphNode1CombinedResult.includes("je nově") || ThoraxLymphNode1CombinedResult.includes("jsou nově")) {
  RESThoraxLymphNode1 = "Nově " + RESThoraxLymphNode1.charAt(0).toLowerCase() + RESThoraxLymphNode1.substring(1);
  RESThoraxLymphNode1 = RESThoraxLymphNode1.replace(" je nově", "").replace(" jsou nově", "");
}


// THORAX OTHERS
// devices


var ThoraxDevicesText = "";
var ThoraxDevicesRes = "";

  var ThoraxDevicesPortR = document.getElementById("ChbDevicesPortR").checked;
  var ThoraxDevicesPortL = document.getElementById("ChbDevicesPortL").checked;
  var ThoraxDevicesPICCR = document.getElementById("ChbDevicesPICCR").checked;
  var ThoraxDevicesPICCL = document.getElementById("ChbDevicesPICCL").checked;
  var ThoraxDevicesCVKR = document.getElementById("ChbDevicesCVKR").checked;
  var ThoraxDevicesCVKL = document.getElementById("ChbDevicesCVKL").checked;
  var ThoraxDevicesCardiacStimR = document.getElementById("ChbDevicesCardiacStimR").checked;
  var ThoraxDevicesCardiacStimL = document.getElementById("ChbDevicesCardiacStimL").checked;
   var ThoraxDevicesCardiacICDR = document.getElementById("ChbDevicesCardiacICDR").checked;
  var ThoraxDevicesCardiacICDL = document.getElementById("ChbDevicesCardiacICDL").checked;
  var ThoraxDevicesMalposition = document.getElementById("ChbDevicesMalposition").checked;
  var ThoraxDevicesOther = document.getElementById("ThoraxDevicesOther").value.trim();


    if (ThoraxDevicesPortR) ThoraxDevicesText += "Portkater zprava. ";
    if (ThoraxDevicesPortL) ThoraxDevicesText += "Portkater zleva. ";

    if (ThoraxDevicesPICCR) ThoraxDevicesText += "PICC zprava. ";
    if (ThoraxDevicesPICCL) ThoraxDevicesText += "PICC zleva. ";
	
    if (ThoraxDevicesCVKR) ThoraxDevicesText += "CVK zprava. ";
    if (ThoraxDevicesCVKL) ThoraxDevicesText += "CVK zleva. ";
	
	if (ThoraxDevicesCardiacStimR) ThoraxDevicesText += "KS zprava. ";
    if (ThoraxDevicesCardiacStimL) ThoraxDevicesText += "KS zleva. ";

	if (ThoraxDevicesCardiacICDR) ThoraxDevicesText += "ICD zprava. ";
    if (ThoraxDevicesCardiacICDL) ThoraxDevicesText += "ICD zleva. ";
	
	if (ThoraxDevicesMalposition) ThoraxDevicesText += "Malpozice katetru. ";

  if (ThoraxDevicesOther) {
    ThoraxDevicesText += ThoraxDevicesOther[0].toUpperCase() + ThoraxDevicesOther.slice(1) + ". ";
  }
  
 

// oesophagus
var ThoraxOesophText = "";
var ThoraxOesophRes = "";

var ThoraxOesophHernia = document.getElementById("ChbOesophHernia").innerText;
var ThoraxOesophActDist = document.getElementById("ChbOesophActDist").checked;
var ThoraxOesophActDiff = document.getElementById("ChbOesophActDiff").checked;
var ThoraxOesophAnastomosis = document.getElementById("ChbOesophAnastomosis").checked;
var ThoraxOesophOther = document.getElementById("ThoraxOesophOther").value.trim();

updateButtonTexts({
            'ChbOesophHernia': ['0', '+', '++', '↕']
        });

if (ThoraxOesophHernia === "+") ThoraxOesophText += "Drobná hiátová hernie. ";
if (ThoraxOesophHernia === "++") ThoraxOesophText += "Hiátová hernie. ";
if (ThoraxOesophHernia === "↕") ThoraxOesophText += "Objemná upside-down hiátová hernie. ";

if (ThoraxOesophActDist) ThoraxOesophText += "Zvýšená akumulace RF v dist. jícnu funkčně či při refluxu. ";
if (ThoraxOesophActDiff) ThoraxOesophText += "Difuzně zvýšená akumulace RF v jícnu funkčně či při zánětu. ";
if (ThoraxOesophAnastomosis) ThoraxOesophText += "St.p. resekci dist. jícnu s anastomózou v hrudníku. ";

if (ThoraxOesophOther) {
  ThoraxOesophText += ThoraxOesophOther + ". ";
}

// mamma
var ThoraxMammaText = "";

var ThoraxMammaMER = document.getElementById("ChbMammaMER").checked; var ThoraxMammaMEL = document.getElementById("ChbMammaMEL").checked;
var ThoraxMammaKVER = document.getElementById("ChbMammaKVER").checked; var ThoraxMammaKVEL = document.getElementById("ChbMammaKVEL").checked;
var ThoraxMammaSegR = document.getElementById("ChbMammaSegR").checked; var ThoraxMammaSegL = document.getElementById("ChbMammaSegL").checked;
var ThoraxMammaReplaceR = document.getElementById("ChbMammaReplaceR").checked; var ThoraxMammaReplaceL = document.getElementById("ChbMammaReplaceL").checked;
var ThoraxMammaOther = document.getElementById("ThoraxMammaOther").value.trim();

if (ThoraxMammaMER && ThoraxMammaMEL) ThoraxMammaText += "St.p. oboustranné mastektomii. ";
  else {
	if (ThoraxMammaMER) ThoraxMammaText += "St.p. pravostranné mastektomii. ";
	if (ThoraxMammaMEL) ThoraxMammaText += "St.p. levostranné mastektomii. ";
  }

if (ThoraxMammaKVER && ThoraxMammaKVEL) ThoraxMammaText += "St.p. kvadrantektomii obou prsů. ";
  else {  
	if (ThoraxMammaKVER) ThoraxMammaText += "St.p. kvadrantektomii pravého prsu. ";
	if (ThoraxMammaKVEL) ThoraxMammaText += "St.p. kvadrantektomii levého prsu. ";
  }

if (ThoraxMammaSegR && ThoraxMammaSegL) ThoraxMammaText += "St.p. segmentektomii obou prsů. ";
  else {
	if (ThoraxMammaSegR) ThoraxMammaText += "St.p. segmentektomii pravého prsu. ";
	if (ThoraxMammaSegL) ThoraxMammaText += "St.p. segmentektomii levého prsu. ";
  }

if (ThoraxMammaReplaceR && ThoraxMammaReplaceL) ThoraxMammaText += "St.p. náhradě obou prsů. ";
  else {
if (ThoraxMammaReplaceR) ThoraxMammaText += "St.p. náhradě pravého prsu. ";
if (ThoraxMammaReplaceL) ThoraxMammaText += "St.p. náhradě levého prsu. ";
  }
  
if (ThoraxMammaOther) {
  ThoraxMammaText += ThoraxMammaOther[0].toUpperCase() + ThoraxMammaOther.slice(1) + ". ";
}

// thorax parenchyma and surgery

 if (POPThoraxLesion1 !== "")  {
        PliceOrDale = "Dále ";
    }  else   {PliceOrDale = "Plíce: ";
	}

var ThoraxParenchymaText = "";
var ThoraxParenchymaRes = "";

var ThoraxPulmonectomyR = document.getElementById("ChbPulmonectomyR").checked;
var ThoraxPulmonectomyL = document.getElementById("ChbPulmonectomyL").checked;
var ThoraxULobectomyR = document.getElementById("ChbULobectomyR").checked;
var ThoraxULobectomyL = document.getElementById("ChbULobectomyL").checked;
var ThoraxMLobectomyR = document.getElementById("ChbMLobectomyR").checked; 
var ThoraxLLobectomyR = document.getElementById("ChbLLobectomyR").checked;
var ThoraxLLobectomyL = document.getElementById("ChbLLobectomyL").checked;
var ThoraxUResectionR = document.getElementById("ChbUResectionR").checked;
var ThoraxUResectionL = document.getElementById("ChbUResectionL").checked;
var ThoraxMResectionR = document.getElementById("ChbMResectionR").checked; 
var ThoraxLResectionR = document.getElementById("ChbLResectionR").checked;
var ThoraxLResectionL = document.getElementById("ChbLResectionL").checked;
var ThoraxLobectomyOther = document.getElementById("ThoraxLobectomyOther").value.trim(); 


var ThoraxParenchymaRTR = document.getElementById("ChbThoraxParenchymaRTR").checked;
var ThoraxParenchymaRTL = document.getElementById("ChbThoraxParenchymaRTL").checked;
var ThoraxParenchymaHypoventR = document.getElementById("ChbThoraxParenchymaHypoventR").checked;
var ThoraxParenchymaHypoventL = document.getElementById("ChbThoraxParenchymaHypoventL").checked;
var buttonThoraxParenchymaFibrText = document.getElementById("ChbThoraxParenchymaFibr").innerText;
var buttonThoraxParenchymaEmphysText = document.getElementById("ChbThoraxParenchymaEmphys").innerText;
var ThoraxParenchymaOther = document.getElementById("ThoraxParenchymaOther").value.trim();
var ThoraxLNPlusOther = document.getElementById("ThoraxLNPlusOther").value.trim();

updateButtonTexts({
            'ChbThoraxParenchymaFibr': ['0', 'I', 'II','III'],
			'ChbThoraxParenchymaEmphys': ['0', 'I', 'II','III']
        });

if (ThoraxPulmonectomyR) ThoraxParenchymaText += "st.p. pravostranné pneumonektomii, ";
if (ThoraxPulmonectomyL) ThoraxParenchymaText += "st.p. levostranné pneumonektomii, ";

if (ThoraxULobectomyR && ThoraxMLobectomyR) ThoraxParenchymaText += "st.p. pravostranné horní a střední bilobektomii, ";
  else if (ThoraxMLobectomyR && ThoraxLLobectomyR) ThoraxParenchymaText += "st.p. pravostranné střední a dolní bilobektomii, ";
  else {
	  if (ThoraxULobectomyR) ThoraxParenchymaText += "st.p. pravostranné horní lobektomii, ";
	  if (ThoraxMLobectomyR) ThoraxParenchymaText += "st.p. pravostranné střední lobektomii, "; 
	  if (ThoraxLLobectomyR) ThoraxParenchymaText += "st.p. pravostranné dolní lobektomii, ";
	}
  
if (ThoraxULobectomyL) ThoraxParenchymaText += "st.p. levostranné horní lobektomii, ";
if (ThoraxLLobectomyL) ThoraxParenchymaText += "st.p. levostranné dolní lobektomii, ";

var resectionsR = [];
var resectionsL = [];

if (ThoraxUResectionR) resectionsR.push("v pravém horním laloku");
if (ThoraxMResectionR) resectionsR.push("v pravém středním laloku");
if (ThoraxLResectionR) resectionsR.push("v pravém dolním laloku");
if (ThoraxUResectionL) resectionsL.push("v levém horním laloku");
if (ThoraxLResectionL) resectionsL.push("v levém dolním laloku");

function combineResections(resections) {
    if (resections.length === 0) return "";
    if (resections.length === 1) return resections[0];
    let last = resections.pop();
    return resections.join(", ") + " a " + last;
}

var finalTextR = combineResections(resectionsR);
var finalTextL = combineResections(resectionsL);

var finalText = "st.p. neanatomické resekci ";
if (finalTextR && finalTextL) {
    ThoraxParenchymaText += finalText + finalTextR + " a " + finalTextL + ", ";
} else if (finalTextR || finalTextL) {
    ThoraxParenchymaText += finalText + (finalTextR || finalTextL) + ", ";
}

if (ThoraxLobectomyOther) {
    ThoraxParenchymaText += ThoraxLobectomyOther + ", ";
}

updateButtonTexts({
	'ChbThoraxParenchymaNodulesR': ['R', '+', '++'],
	'ChbThoraxParenchymaNodulesL': ['L', '+', '++']
});
		
var ChbThoraxParenchymaNodulesR = document.getElementById("ChbThoraxParenchymaNodulesR").innerText;
var ChbThoraxParenchymaNodulesL = document.getElementById("ChbThoraxParenchymaNodulesL").innerText;

if (ChbThoraxParenchymaNodulesR === "+" && ChbThoraxParenchymaNodulesL === "+") {
	ThoraxParenchymaText += "drobný nespecifický nodul bez zvýšené akumulace RF bilat., ";
} else {
	if (ChbThoraxParenchymaNodulesR === "+") {
		ThoraxParenchymaText +="drobný nespecifický nodul bez zvýšené akumulace RF vpravo, ";
	}
	if (ChbThoraxParenchymaNodulesL === "+") {
		ThoraxParenchymaText += "drobný nespecifický nodul bez zvýšené akumulace RF vlevo, ";
	}
}

if (ChbThoraxParenchymaNodulesR === "++" && ChbThoraxParenchymaNodulesL === "++") {
	ThoraxParenchymaText += "drobné nespecifické noduly bez zvýšené akumulace RF bilat., ";
} else {
	if (ChbThoraxParenchymaNodulesR === "++") {
		ThoraxParenchymaText += "drobné nespecifické noduly bez zvýšené akumulace RF vpravo, ";
	}
	if (ChbThoraxParenchymaNodulesL === "++") {
		ThoraxParenchymaText += "drobné nespecifické noduly bez zvýšené akumulace RF vlevo, ";
	}
}


updateButtonTexts({
    'ChbThoraxParenchymaMicroR': ['R', '+', '++'],
    'ChbThoraxParenchymaMicroL': ['L', '+', '++']
});

var ChbThoraxParenchymaMicroR = document.getElementById("ChbThoraxParenchymaMicroR").innerText;
var ChbThoraxParenchymaMicroL = document.getElementById("ChbThoraxParenchymaMicroL").innerText;

if (ChbThoraxParenchymaMicroR === "+" && ChbThoraxParenchymaMicroL === "+") {
    ThoraxParenchymaText += "drobný mikronodul bez zvýšené akumulace RF bilat., ";
} else {
    if (ChbThoraxParenchymaMicroR === "+") {
        ThoraxParenchymaText += "drobný mikronodul bez zvýšené akumulace RF vpravo, ";
    }
    if (ChbThoraxParenchymaMicroL === "+") {
        ThoraxParenchymaText += "drobný mikronodul bez zvýšené akumulace RF vlevo, ";
    }
}

if (ChbThoraxParenchymaMicroR === "++" && ChbThoraxParenchymaMicroL === "++") {
    ThoraxParenchymaText += "drobné mikronoduly bez zvýšené akumulace RF bilat., ";
} else {
    if (ChbThoraxParenchymaMicroR === "++") {
        ThoraxParenchymaText += "drobné mikronoduly bez zvýšené akumulace RF vpravo, ";
    }
    if (ChbThoraxParenchymaMicroL === "++") {
        ThoraxParenchymaText += "drobné mikronoduly bez zvýšené akumulace RF vlevo, ";
    }
}


updateButtonTexts({
    'ChbThoraxParenchymaOpacR': ['R', '+', '++'],
    'ChbThoraxParenchymaOpacL': ['L', '+', '++']
});

var ChbThoraxParenchymaOpacR = document.getElementById("ChbThoraxParenchymaOpacR").innerText;
var ChbThoraxParenchymaOpacL = document.getElementById("ChbThoraxParenchymaOpacL").innerText;

if (ChbThoraxParenchymaOpacR === "+" && ChbThoraxParenchymaOpacL === "+") {
    ThoraxParenchymaText += "drobná opacita bez zvýšené akumulace RF bilat., ";
} else {
    if (ChbThoraxParenchymaOpacR === "+") {
        ThoraxParenchymaText += "drobná opacita bez zvýšené akumulace RF vpravo, ";
    }
    if (ChbThoraxParenchymaOpacL === "+") {
        ThoraxParenchymaText += "drobná opacita bez zvýšené akumulace RF vlevo, ";
    }
}

if (ChbThoraxParenchymaOpacR === "++" && ChbThoraxParenchymaOpacL === "++") {
    ThoraxParenchymaText += "drobné opacity bez zvýšené akumulace RF bilat., ";
} else {
    if (ChbThoraxParenchymaOpacR === "++") {
        ThoraxParenchymaText += "drobné opacity bez zvýšené akumulace RF vpravo, ";
    }
    if (ChbThoraxParenchymaOpacL === "++") {
        ThoraxParenchymaText += "drobné opacity bez zvýšené akumulace RF vlevo, ";
    }
}



updateButtonTexts({
	'ChbThoraxParenchymaConsolR': ['R', '+', '++'],
	'ChbThoraxParenchymaConsolL': ['L', '+', '++']
});
		
var ChbThoraxParenchymaConsolR = document.getElementById("ChbThoraxParenchymaConsolR").innerText;
var ChbThoraxParenchymaConsolL = document.getElementById("ChbThoraxParenchymaConsolL").innerText;

if (ChbThoraxParenchymaConsolR === "+" && ChbThoraxParenchymaConsolL === "+") {
	ThoraxParenchymaText += "drobné infiltráty / konsolidace s nízkou až střední akumulací RF bilat., ";
} else {
	if (ChbThoraxParenchymaConsolR === "+") {
		ThoraxParenchymaText +="drobný infiltrát / konsolidace s nízkou až střední akumulací RF vpravo, ";
	}
	if (ChbThoraxParenchymaConsolL === "+") {
		ThoraxParenchymaText += "drobný infiltrát / konsolidace s nízkou až střední akumulací RF vlevo, ";
	}
}

if (ChbThoraxParenchymaConsolR === "++" && ChbThoraxParenchymaConsolL === "++") {
	ThoraxParenchymaText += "vícečetné drobné infiltráty / konsolidace s nízkou až střední akumulací RF bilat., ";
} else {
	if (ChbThoraxParenchymaConsolR === "++") {
		ThoraxParenchymaText += "drobné infiltráty / konsolidace s nízkou až střední akumulací RF vpravo, ";
	}
	if (ChbThoraxParenchymaConsolL === "++") {
		ThoraxParenchymaText += "drobné infiltráty / konsolidace s nízkou až střední akumulací RF vlevo, ";
	}
}


if (ThoraxParenchymaRTR && ThoraxParenchymaRTL) ThoraxParenchymaText += "poradiační změny v parenchymu bilat, ";
  else {
if (ThoraxParenchymaRTR) ThoraxParenchymaText += "poradiační změny v parenchymu vpravo, ";
if (ThoraxParenchymaRTL) ThoraxParenchymaText += "poradiační změny v parenchymu vlevo, ";
  }
  
if (ThoraxParenchymaHypoventR && ThoraxParenchymaHypoventL) ThoraxParenchymaText += "hypoventilační změny bilat, ";
  else {  
if (ThoraxParenchymaHypoventR) ThoraxParenchymaText += "hypoventilační změny vpravo, ";
if (ThoraxParenchymaHypoventL) ThoraxParenchymaText += "hypoventilační změny vlevo, ";
  }
  
if (buttonThoraxParenchymaFibrText === "I") {
    ThoraxParenchymaText +=("mírné fibrózní změny subpleurálně, ");
} else if (buttonThoraxParenchymaFibrText === "II") {
    ThoraxParenchymaText +=("výraznější fibrózní změny, ");
} else if (buttonThoraxParenchymaFibrText === "III") {
    ThoraxParenchymaText +=("pokročilá fibróza s honeycombingem, ");
}

if (buttonThoraxParenchymaEmphysText === "I") {
    ThoraxParenchymaText +=("mírný emfyzém, ");
} else if (buttonThoraxParenchymaEmphysText === "II") {
    ThoraxParenchymaText +=("přítomen emfyzém, ");
} else if (buttonThoraxParenchymaEmphysText === "III") {
    ThoraxParenchymaText +=("panlobulární pokročilý emfyzém, ");
}

if (ThoraxParenchymaOther) {
    ThoraxParenchymaText += ThoraxParenchymaOther + ", ";
}

if (ThoraxParenchymaText.endsWith(", ")) {
    ThoraxParenchymaText = PliceOrDale +  ThoraxParenchymaText.substring(0, ThoraxParenchymaText.length - 2) + ".";
}

// Thymus
var ThoraxThymusText = "";
var ThoraxThymusRes = "";

var ThoraxThymusEnlarge = document.getElementById("ChbThymusEnlarge").checked;
var ThoraxThymusAct = document.getElementById("ChbThoraxThymusAct").checked;
var ThoraxThymusOther = document.getElementById("ThoraxThymusOther").value.trim();

var descriptionsThymus = [];

if (ThoraxThymusEnlarge) descriptionsThymus.push("difuzně rozšířen");
if (ThoraxThymusAct)  descriptionsThymus.push("se zvýšenou akumulací RF");
if (ThoraxThymusOther) descriptionsThymus.push(ThoraxThymusOther);

if (descriptionsThymus.length && (ThoraxThymusAct || ThoraxThymusEnlarge)) {
	ThoraxThymusText = "Thymus " + descriptionsThymus.join(" ") + ". ";
	ThoraxThymusRes = "Thymus " + descriptionsThymus.join(" ") + " pravděpodobně při reaktivaci. ";
	} else if (descriptionsThymus.length) {
		ThoraxThymusText = "Thymus " + descriptionsThymus.join(" ") + ". ";
	}
	

// srdce
var ThoraxHeartText = "";
var ThoraxHeartRes = "";

var ThoraxHeartAtrialDilatR = document.getElementById("ChbThoraxHeartAtrialDilatR").checked;
var ThoraxHeartAtrialDilatL = document.getElementById("ChbThoraxHeartAtrialDilatL").checked;
var ThoraxHeartValveMi = document.getElementById("ChbThoraxHeartValveMi").checked;
var ThoraxHeartValveAo = document.getElementById("ChbThoraxHeartValveAo").checked;
var ThoraxHeartAS = document.getElementById("ChbThoraxHeartAS").checked;
var ThoraxHeartOther = document.getElementById("ThoraxHeartOther").value.trim();

if (ThoraxHeartAtrialDilatR && ThoraxHeartAtrialDilatL) ThoraxHeartText += "Dilatace srdečních síní. ";
else { 
	if (ThoraxHeartAtrialDilatR) ThoraxHeartText += "Dilatace pravé srdeční síně. ";
	if (ThoraxHeartAtrialDilatL) ThoraxHeartText += "Dilatace levé srdeční síně. ";
}

if (ThoraxHeartValveMi && ThoraxHeartValveAo) ThoraxHeartText += "Náhrada mitrálních a aortální chlopně. ";
else {
	if (ThoraxHeartValveMi) ThoraxHeartText += "Náhrada mitrálních chlopně. ";
	if (ThoraxHeartValveAo) ThoraxHeartText += "Náhrada aortální chlopně. ";
}

if (ThoraxHeartAS) ThoraxHeartText += "AS koronárních tepen. ";

if (ThoraxHeartOther) {
ThoraxHeartText += ThoraxHeartOther + ". ";
}


// active mediastinal lymph nodes 
var ThoraxLymphNodePlusText = "";

var ThoraxLymphNodePlusHila = document.getElementById("ChbThoraxLymphNodePlusHila").checked;
var ThoraxLymphNodePlusMed = document.getElementById("ChbThoraxLymphNodePlusMed").checked;

if (ThoraxLymphNodePlusHila && ThoraxLymphNodePlusMed) ThoraxLymphNodePlusText += "Nespecificky zvýšená akumulace RF v nezvětšených mediastinálních a hilových uzlinách. ";
  else {
if (ThoraxLymphNodePlusMed) ThoraxLymphNodePlusText += "Nespecificky zvýšená akumulace RF v nezvětšených mediastinálních uzlinách. ";
if (ThoraxLymphNodePlusHila) ThoraxLymphNodePlusText += "Nespecificky zvýšená akumulace RF v nezvětšených hilových uzlinách. ";
} 

if (ThoraxLNPlusOther) {
ThoraxLymphNodePlusText += ThoraxLNPlusOther + ". ";
}
if (ThoraxLymphNodePlusText.includes(". ")) {
    ThoraxLymphNodePlusText = ThoraxLymphNodePlusText.replace(/\. (\S)/, ", $1");
}


//embolisation
var ThoraxEmbolisationText = "";
var ThoraxEmbolisationRes = "";

var ThoraxEmbolisationMildR = document.getElementById("ChbThoraxEmbolisationMildR").checked;
var ThoraxEmbolisationMildL = document.getElementById("ChbThoraxEmbolisationMildL").checked;
var ThoraxEmbolisationSevereR = document.getElementById("ChbThoraxEmbolisationSevereR").checked;
var ThoraxEmbolisationSevereL = document.getElementById("ChbThoraxEmbolisationSevereL").checked;
var ThoraxEmbolisationOther = document.getElementById("ThoraxEmbolisationOther").value.trim(); 

if (ThoraxEmbolisationMildR || ThoraxEmbolisationMildL || ThoraxEmbolisationSevereR || ThoraxEmbolisationSevereL) {
    ThoraxEmbolisationRes += "CAVE! Plicní embolizace. ";
}

if (ThoraxEmbolisationMildR && ThoraxEmbolisationMildL) ThoraxEmbolisationText += "Nevýrazné emboly ve větvích obou plicních tepen. ";
  else {
if (ThoraxEmbolisationMildR) ThoraxEmbolisationText += "Nevýrazné emboly ve větvích pravé plicní tepny. ";
if (ThoraxEmbolisationMildL) ThoraxEmbolisationText += "Nevýrazné emboly ve větvích pravé levé tepny. ";
  }

if (ThoraxEmbolisationSevereR && ThoraxEmbolisationSevereL) ThoraxEmbolisationText += "Nevýrazné emboly v obou větvích plicnice. ";
  else {
if (ThoraxEmbolisationSevereR) ThoraxEmbolisationText += "Výrazné emboly v pravé větvi plicnice. ";
if (ThoraxEmbolisationSevereL) ThoraxEmbolisationText += "Výrazné emboly v levé větvi plicnice. ";
  }

if (ThoraxEmbolisationOther) {
    ThoraxEmbolisationText += ThoraxEmbolisationOther + ". ";
}

// thorax fluid
var ThoraxFluidFTR = document.getElementById("ThoraxFluidFTR").value; var ThoraxFluidFTRNumber = parseFloat(ThoraxFluidFTR.trim());
var ThoraxFluidFTL = document.getElementById("ThoraxFluidFTL").value; var ThoraxFluidFTLNumber = parseFloat(ThoraxFluidFTL.trim());
var ThoraxFluidFP = document.getElementById("ThoraxFluidFP").value; var ThoraxFluidFPNumber = parseFloat(ThoraxFluidFP.trim());


if (ThoraxFluidFTR.trim() === "") {ThoraxFluidFTRRes = "";} else if (ThoraxFluidFTRNumber < 20) {ThoraxFluidFTRRes = "Drobný fluidothorax vpravo. ";} else if (ThoraxFluidFTRNumber <= 40) {ThoraxFluidFTRRes = "Fluidothorax vpravo. ";} else {ThoraxFluidFTRRes = "Výrazný fluidothorax vpravo. ";}
if (ThoraxFluidFTL.trim() === "") {ThoraxFluidFTLRes = "";} else if (ThoraxFluidFTLNumber < 20) {ThoraxFluidFTLRes = "Drobný fluidothorax vlevo. ";} else if (ThoraxFluidFTLNumber <= 40) {ThoraxFluidFTLRes = "Fluidothorax vlevo. ";} else {ThoraxFluidFTLRes = "Výrazný fluidothorax vlevo. ";}
if (ThoraxFluidFP.trim() === "") {ThoraxFluidFPRes = "";} else if (ThoraxFluidFPNumber < 10) {ThoraxFluidFPRes = "Drobný perikardiální výpotek. ";} else if (ThoraxFluidFPNumber <= 20) {ThoraxFluidFPRes = "Perikardiální výpotek. ";} else {ThoraxFluidFPRes = "Výrazný perikardiální výpotek.";}


if (ThoraxFluidFTR.trim() !== "") {
    ThoraxFluidFTRText = "Fluidothorax vpravo šíře cca " + ThoraxFluidFTR + " mm. ";
  } else {
    ThoraxFluidFTRText = "";
  }
  if (ThoraxFluidFTL.trim() !== "") {
    ThoraxFluidFTLText = "Fluidothorax vlevo šíře cca " + ThoraxFluidFTL + " mm. ";
  } else {
    ThoraxFluidFTLText = "";
  }
  if (ThoraxFluidFP.trim() !== "") {
    ThoraxFluidFPText = "Perikardiální výpotek šíře cca " + ThoraxFluidFP + " mm. ";
  } else {
    ThoraxFluidFPText = "";
  }

const combinedFTRight = ThoraxFluidFTRRes.replace('vpravo.', '').trim();
const combinedFTLeft = ThoraxFluidFTLRes.replace('vlevo.', '').trim();

if (combinedFTRight && combinedFTRight === combinedFTLeft) {
    ThoraxFluidFTRRes = combinedFTRight + " bilat. ";
    ThoraxFluidFTLRes = "";
}

if (ThoraxFluidFTR === "" && ThoraxFluidFTL === "" && ThoraxFluidFP === "") {
    ThoraxFluidText = "Bez výpotků.";
} else {
    ThoraxFluidText = ThoraxFluidFTRText + ThoraxFluidFTLText + ThoraxFluidFPText;
} 


// Thorax Adekvatní nebo nic nebo Jinak. + OTHERS

var ThoraxOther1Priority = ""; var ThoraxOther1NoPriority = ""; var ThoraxOther1ResPriority = "";
var ThoraxOther1Pop = document.getElementById("ThoraxOther1Pop").value;
var ThoraxOther1Res = document.getElementById("ThoraxOther1Res").value;

if (ThoraxOther1Pop !== "" && ThoraxOther1Res ==="") {ThoraxOther1Priority = ""; ThoraxOther1NoPriority = ThoraxOther1Pop + ". "; ThoraxOther1ResPriority = "";
	} else if (ThoraxOther1Pop !== "" && ThoraxOther1Res !=="") {ThoraxOther1Priority = ThoraxOther1Pop  + ". "; ThoraxOther1NoPriority = ""; ThoraxOther1ResPriority = ThoraxOther1Res  + ". ";}


// Define an array containing POPThoraxLesion1, POPThoraxLesion2, and POPThoraxLesion3
const POPThoraxLesions = [POPThoraxLesion1];

if (ThoraxParenchymaText.includes('fibróz') || ThoraxParenchymaText.includes('emfyz') || ((ThoraxFluidFTR > 0 && ThoraxFluidFTL > 0))) {
    POPThoraxLungOk = "";
} else if (POPThoraxLesions.some(lesion => lesion.trim() !== '')) {
    POPThoraxLungOk = "";
} else if (ThoraxParenchymaText === "" && ThoraxFluidFTR === "" && ThoraxFluidFTL === "" && ThoraxOther1Priority === "") {
    POPThoraxLungOk = "Adekvátní plicní objem a vzdušnost. ";
} else {
    POPThoraxLungOk = "Jinak adekvátní plicní objem a vzdušnost. ";
}


// Thorax native or not

if (checkViability(POPThoraxLymphNode1 || POPThoraxLesion1 || POPThoraxLesion2 || POPThoraxLesion3)) {
  POPThoraxNative = "";
  POPThoraxElse = "Jinde se patologická hypermetabolická ložiska nezobrazují. ";
} else {
  POPThoraxNative = "Není přítomen patologický hyperakumulující fokus, ložisko či lymfadenopatie. ";
  POPThoraxElse = "";
}




// ABDOMEN


let codeForAbdomenLesion1 = `

// Liver
var AbdomenLesion1Locationtext = "";
var LiverSegments = [];
var LiverLobeR = document.getElementById('Chb1LiverLobeR').checked;
var LiverLobeL = document.getElementById('Chb1LiverLobeL').checked;

if (LiverLobeR && LiverLobeL) {
    LiverSegments.push("");
} else if (LiverLobeR) {
    LiverSegments.push("pravého laloku");
} else if (LiverLobeL) {
    LiverSegments.push("levého laloku");
}

// Check and add specific liver segments
for (let i = 1; i <= 8; i++) {
    let checkboxLiverElem = document.getElementById('Chb1LiverSeg' + i);
    if (checkboxLiverElem && checkboxLiverElem.checked) { 
        LiverSegments.push("S" + i);
    }
}

var seg4A = document.getElementById('Chb1LiverSeg4A').checked;
var seg4B = document.getElementById('Chb1LiverSeg4B').checked;
if (seg4A) LiverSegments.push("S4A");
if (seg4B) LiverSegments.push("S4B");

if (LiverSegments.length > 0) {
    if (LiverSegments.length > 0) {
        AbdomenLesion1Locationtext += LiverSegments.join(", ") + " jater";
    }
}

//Stomach
	var Chb1Stomach = document.getElementById('Chb1Stomach').checked;
	if (Chb1Stomach) {
		AbdomenLesion1Locationtext += "stěny žaludku";
	}

	
// Colon	
let ColonParts = [
	{ id: "Chb1ColonTermIleum", name: "terminálního ilea" },
	{ id: "Chb1ColonCaecum", name: "céka" },
	{ id: "Chb1ColonAsc", name: "c. ascendens" },
	{ id: "Chb1ColonTrans", name: "c. transverzum" },
	{ id: "Chb1ColonDesc", name: "c. descendens" },
	{ id: "Chb1ColonSigmoid", name: "sigmoidea" },
	{ id: "Chb1ColonRectum", name: "rekta" },
	{ id: "Chb1ColonAnus", name: "anu" },
	{ id: "Chb1ColonAppendix", name: "appendixu" }
];

let combinedParts = {
	"terminálního ilea-céka": "ileocéka",
	"céka-c. ascendens": "cékoascendens",
	"c. ascendens-c. transverzum": "hepatální flexury tračníku",
	"c. transverzum-c. descendens": "lienální flexury tračníku",
	"sigmoidea-rekta": "rektosigmatu",
	"rekta-anu": "anorekta"
};

let ColonSelected = [];
for (let part of ColonParts) {
	let checkboxColonElem = document.getElementById(part.id);
	if (checkboxColonElem && checkboxColonElem.checked) {
		ColonSelected.push(part.name);
	}
}

for (let i = 0; i < ColonSelected.length - 1; i++) {
	let combinedName = combinedParts[ColonSelected[i] + "-" + ColonSelected[i + 1]];
	if (combinedName) {
		ColonSelected[i] = combinedName;
		ColonSelected.splice(i + 1, 1);
		i--;
	}
}

if (ColonSelected.length > 0) {
	if (AbdomenLesion1Locationtext !== "") {
		AbdomenLesion1Locationtext += ", ";
	}

	AbdomenLesion1Locationtext += ColonSelected.join(", ");
}

//Spleen
	var Chb1Spleen = document.getElementById('Chb1Spleen').checked;
	if (Chb1Spleen) {
		AbdomenLesion1Locationtext += "sleziny";
	}

// Stomach
let stomachParts = [
	{ id: "Chb1StomachCardia", name: "kardie" },
	{ id: "Chb1StomachFundus", name: "fundu" },
	{ id: "Chb1StomachBody", name: "těla" },
	{ id: "Chb1StomachPylorus", name: "pyloru" }
];

let selectedStomach = [];
for (let part of stomachParts) {
	let checkboxStomachElem = document.getElementById(part.id);
	if (checkboxStomachElem && checkboxStomachElem.checked) {
		selectedStomach.push(part.name);
	}
}

if (selectedStomach.length > 0) {
	if (AbdomenLesion1Locationtext !== "") {
		AbdomenLesion1Locationtext += ", ";
	}

	if (selectedStomach.length >= 2) {
		let last = selectedStomach.pop();
		AbdomenLesion1Locationtext += selectedStomach.join(", ") + " a " + last + " žaludku";
	} else {
		AbdomenLesion1Locationtext += selectedStomach.join(", ") + " žaludku";
	}
}

// Pancreas
let pancreasParts = [
    { id: "Chb1PancreasHead", name: "hlavy" },
    { id: "Chb1PancreasBody", name: "těla" },
    { id: "Chb1PancreasTail", name: "kaudy" }
];

let selectedPancreas = [];

for (let part of pancreasParts) {
    let checkboxPancreasElem = document.getElementById(part.id);
    if (checkboxPancreasElem && checkboxPancreasElem.checked) {
        selectedPancreas.push(part.name);
    }
}

if (selectedPancreas.length > 0) {
    if (AbdomenLesion1Locationtext !== "") {
        AbdomenLesion1Locationtext += ", ";
    }
    else if (selectedPancreas.length >= 2) {
        let last = selectedPancreas.pop();
        AbdomenLesion1Locationtext += selectedPancreas.join(", ") + " a " + last + " pankreatu";
    } else {
        AbdomenLesion1Locationtext += selectedPancreas.join(", ") + " pankreatu";
    }
}

// Adrenals
	let adrenals = [];
    if (document.getElementById('Chb1AdrenalR').checked) {
        adrenals.push("pravé nadledviny");
    }
    if (document.getElementById('Chb1AdrenalL').checked) {
        adrenals.push("levé nadledviny");
    }

    if (adrenals.length === 2) {
        AbdomenLesion1Locationtext += "obou nadledvin";
    } else {
        AbdomenLesion1Locationtext += adrenals.join(", ");
    }
	
// Kidneys
	let kidneys = [];
    if (document.getElementById('Chb1KidneyR').checked) {
        kidneys.push("pravé ledviny");
    }
    if (document.getElementById('Chb1KidneyL').checked) {
        kidneys.push("levé ledviny");
    }

    if (kidneys.length === 2) {
        AbdomenLesion1Locationtext += " obou ledvin";
    } else {
        AbdomenLesion1Locationtext += kidneys.join(", ");
    }

// Uterus
    let uterusParts = [
        { id: "Chb1UterusCervix", name: "cervixu" },
        { id: "Chb1UterusBody", name: "těla" },
        { id: "Chb1UterusFundus", name: "fundu" }
    ];

    let selectedUterus = [];
    for (let part of uterusParts) {
        let checkboxUterusElem = document.getElementById(part.id);
        if (checkboxUterusElem && checkboxUterusElem.checked) {
            selectedUterus.push(part.name);
        }
    }

    if (selectedUterus.length > 0) {
        if (AbdomenLesion1Locationtext !== "") {
            AbdomenLesion1Locationtext += ", ";
        }
		
        if (selectedUterus.length >= 2) {
            let last = selectedUterus.pop();
            AbdomenLesion1Locationtext += selectedUterus.join(", ") + " a " + last + " dělohy";
        } else {
            AbdomenLesion1Locationtext += selectedUterus.join(", ") + " dělohy";
        }
    }

// Ovaries
	let ovaries = [];
    if (document.getElementById('Chb1OvaryR').checked) {
        ovaries.push("pravého ovaria");
    }
    if (document.getElementById('Chb1OvaryL').checked) {
        ovaries.push("levého ovaria");
    }

    if (ovaries.length === 2) {
        AbdomenLesion1Locationtext += "obou ovarií";
    } else {
        AbdomenLesion1Locationtext += ovaries.join(", ");
    }

//močák
	var Chb1UrinaryBladder = document.getElementById('Chb1UrinaryBladder').checked;
	if (Chb1UrinaryBladder) {
		AbdomenLesion1Locationtext += "močového měchýře";
	}

// prostata
let prostate = [];
    if (document.getElementById('Chb1ProstateR').checked) {
        prostate.push("pravého laloku prostaty");
    }
    if (document.getElementById('Chb1ProstateL').checked) {
        prostate.push("levého laloku prostaty");
    }

    if (prostate.length === 2) {
        AbdomenLesion1Locationtext += "prostaty";
    } else {
        AbdomenLesion1Locationtext += prostate.join(", ");
    }

// Peritoneum
let peritoneumParts = [
    { id: "Chb1PeritAbdomen", name: "břišní dutiny" },
    { id: "Chb1PeritPelvis", name: "pánve" },
    { id: "Chb1PeritOmentum", name: "omenta" }
];

let selectedPeritoneum = [];
let PeritoneumWhole = document.getElementById('Chb1AbdomenSelectPeritoneum').checked;

for (let part of peritoneumParts) {
    let checkboxPeritoneumElem = document.getElementById(part.id);
    if (checkboxPeritoneumElem && checkboxPeritoneumElem.checked) {
        selectedPeritoneum.push(part.name);
    }
}

if (PeritoneumWhole && selectedPeritoneum.length === 0) {
    // Only PeritoneumWhole is checked
    if (AbdomenLesion1Locationtext !== "") {
        AbdomenLesion1Locationtext += ", ";
    }
    AbdomenLesion1Locationtext += "peritonea";
} else if (selectedPeritoneum.length > 0) {
    if (AbdomenLesion1Locationtext !== "") {
        AbdomenLesion1Locationtext += ", ";
    }
    if (selectedPeritoneum.length == 1 && selectedPeritoneum[0] == "omenta") {
        AbdomenLesion1Locationtext += selectedPeritoneum[0];
    } else if (selectedPeritoneum.length >= 2) {
        let last = selectedPeritoneum.pop();
        AbdomenLesion1Locationtext += "peritonea " + selectedPeritoneum.join(", ") + " a " + last;
    } else {
        AbdomenLesion1Locationtext += "peritonea " + selectedPeritoneum.join(", ");
    }
}

document.getElementById('AbdomenLesion1Location').value = AbdomenLesion1Locationtext;

// Abdomen lesion1 popis

var AbdomenLesion1Button = document.getElementById("AbdomenLesion1");
var AbdomenLesion1typeRaw = document.getElementById("AbdomenLesion1type").value.trim();
var AbdomenLesion1number = document.getElementById("AbdomenLesion1number").value;
var AbdomenLesion1type = (AbdomenLesion1number && AbdomenLesion1number !== "") ? (pluralForms[AbdomenLesion1typeRaw] || AbdomenLesion1typeRaw) : AbdomenLesion1typeRaw;
var AbdomenLesion1Location = document.getElementById("AbdomenLesion1Location").value;
var AbdomenLesion1AddLocation = document.getElementById("AbdomenLesion1AddLocation").value;
var AbdomenLesion1Loclargest = document.getElementById("AbdomenLesion1Loclargest").value;
document.getElementById('AbdomenLesion1number').addEventListener('change', () => document.getElementById('AbdomenLesion1Large').classList.toggle('hidden', document.getElementById('AbdomenLesion1number').value === ""));
var AbdomenLesion1Activity = document.getElementById("AbdomenLesion1Activity").value;
var AbdomenLesion1ActivityCopy = AbdomenLesion1Activity;
var selectedOption = document.getElementById("AbdomenLesion1Activity").selectedOptions[0];
var AbdomenLesion1RESActivityRPH = selectedOption.dataset.valueRPH || '';
var AbdomenLesion1RESActivityFDG = selectedOption.dataset.valueFDG || '';
var AbdomenLesion1SUV = formatSUV("AbdomenLesion1SUV");
var AbdomenLesion1Size = formatLesionSize("AbdomenLesion1Size");
var AbdomenLesion1RESDecision = document.getElementById("AbdomenLesion1Decision").value;
document.getElementById("DateCompare").addEventListener('change', () => document.getElementById("AbdomenLesion1Previous").classList.toggle("hidden", !document.getElementById("DateCompare").value));
var AbdomenLesion1SUVPrev = formatSUV("AbdomenLesion1SUVPrev");
var AbdomenLesion1PrevSize = formatLesionSize("AbdomenLesion1PrevSize");
var AbdomenLesion1ComparisonText = generateComparisonText(AbdomenLesion1SUVPrev, AbdomenLesion1PrevSize, DateComparison, AbdomenLesion1SUV, AbdomenLesion1Size);
var AbdomenLesion1ComparisonSUVRes = compareActRES(AbdomenLesion1SUV, AbdomenLesion1SUVPrev);
var AbdomenLesion1ComparisonSizeRes = compareSizes(AbdomenLesion1Size, AbdomenLesion1PrevSize);
var AbdomenLesion1CombinedResult = combineComparisonResults(AbdomenLesion1ComparisonSizeRes, AbdomenLesion1ComparisonSUVRes, AbdomenLesion1number);
var AbdomenLesion1ActivityAdd = checkSmallSize(AbdomenLesion1Size, AbdomenLesion1SUV);
var AbdomenLesion1AllLocations = (AbdomenLesion1Location + " " + AbdomenLesion1AddLocation).trim();

if (AbdomenLesion1Loclargest !== "") { AbdomenLesion1Loclargest = AbdomenLesion1ActivityCopy + ", největší " + AbdomenLesion1Loclargest + " "; AbdomenLesion1Activity = ""; }
if (AbdomenLesion1number !== "" && AbdomenLesion1Loclargest === "") {
  AbdomenLesion1Size = AbdomenLesion1Size.replace("diametru ", "diametru až ").replace("rozměru ", "rozměru až ");
  AbdomenLesion1ComparisonText = AbdomenLesion1ComparisonText.replace("diametru ", "diametru až ").replace("rozměru ", "rozměru až ");
}

var processedSentencePOPAbdomenLesion1 = processSentence(AbdomenLesion1number + " " + AbdomenLesion1type);
var POPAbdomenLesion1 = processedSentencePOPAbdomenLesion1 + " " + AbdomenLesion1AllLocations + " " + AbdomenLesion1Loclargest + " " + AbdomenLesion1Size + " " + AbdomenLesion1Activity + " " + AbdomenLesion1ComparisonText + ".";
var processedSentenceRESAbdomenLesionFDG = processSentence(AbdomenLesion1number + " " + AbdomenLesion1RESActivityFDG + " " + AbdomenLesion1type);
var processedSentenceRESAbdomenLesionRPH = processSentence(AbdomenLesion1number + " " + AbdomenLesion1type);
var RESAbdomenLesion1 = (buttonElementPETType.value === "FDG")
  ? processedSentenceRESAbdomenLesionFDG + " " + AbdomenLesion1AllLocations + " " + AbdomenLesion1CombinedResult + " " + AbdomenLesion1RESDecision + " " + AbdomenLesion1ActivityAdd + "."
  : processedSentenceRESAbdomenLesionRPH + " " + AbdomenLesion1AllLocations + " " + AbdomenLesion1RESActivityRPH + " " + AbdomenLesion1CombinedResult + " " + AbdomenLesion1RESDecision + " " + AbdomenLesion1ActivityAdd + ".";

if (AbdomenLesion1RESDecision.includes("meta") && AbdomenLesion1type.includes("ožisk")) {RESAbdomenLesion1 = RESAbdomenLesion1.replace(/ložisk/g, "meta ložisk").replace(/Ložisk/g, "Meta ložisk").replace(": charakteru meta", ".");}
if (AbdomenLesion1RESDecision.includes("tumor") && AbdomenLesion1type.includes("ožisk")) {RESAbdomenLesion1 = RESAbdomenLesion1.replace(/ložisk/g, "tumorózní ložisk").replace(/Ložisk/g, "Tumorózní ložisk").replace(": charakteru tumoru", ".");}
if (AbdomenLesion1RESDecision.includes("tumor") && AbdomenLesion1type.includes("as")) {RESAbdomenLesion1 = RESAbdomenLesion1.replace(/mas/g, "tumorózní mas").replace(/Mas/g, "Tumorózní mas").replace(": charakteru tumoru", ".");}
if (AbdomenLesion1RESDecision.includes("tumor") && AbdomenLesion1type.includes("nfiltr")) {RESAbdomenLesion1 = RESAbdomenLesion1.replace(/infiltr/g, "tumorózní infiltr").replace(/Infiltr/g, "Tumorózní infiltr").replace(": charakteru tumoru", ".");}
if (AbdomenLesion1RESDecision.includes("tumor") && AbdomenLesion1type.includes("xpanz")) {RESAbdomenLesion1 = RESAbdomenLesion1.replace(/expanze/g, "tumorózní expanze").replace(/Expanze/g, "Tumorózní expanze").replace(": charakteru tumoru", ".");}
if (AbdomenLesion1CombinedResult.includes("je nově") || AbdomenLesion1CombinedResult.includes("jsou nově")) { RESAbdomenLesion1 = "Nově " + RESAbdomenLesion1.charAt(0).toLowerCase() + RESAbdomenLesion1.substring(1) ; RESAbdomenLesion1 = RESAbdomenLesion1.replace(" je nově", "").replace(" jsou nově", "");}

if (AbdomenLesion1Location ==="" && AbdomenLesion1AddLocation ==="") {POPAbdomenLesion1 = ""; RESAbdomenLesion1 = "";}

`;

let codeForAbdomenLesion2 = codeForAbdomenLesion1.replace(/Lesion1/g, 'Lesion2').replace(/Chb1/g, 'Chb2');
let codeForAbdomenLesion3 = codeForAbdomenLesion1.replace(/Lesion1/g, 'Lesion3').replace(/Chb1/g, 'Chb3');
eval(codeForAbdomenLesion1);
eval(codeForAbdomenLesion2);
eval(codeForAbdomenLesion3);

// ABDOMEN LN

var AbdomenLymphNode1LocationText = "";

var ChbAbdomenSubphrenic = document.getElementById("ChbAbdomenSubphrenic").checked;
var ChbAbdomenRetrocruralR = document.getElementById("ChbAbdomenRetrocruralR").checked;
var ChbAbdomenRetrocruralL = document.getElementById("ChbAbdomenRetrocruralL").checked;
var ChbAbdomenPeriportal = document.getElementById("ChbAbdomenPeriportal").checked;
var ChbAbdomenMesenterial = document.getElementById("ChbAbdomenMesenterial").checked;
var ChbAbdomenRetroperit = document.getElementById("ChbAbdomenRetroperit").checked;
var ChbAbdomenParaaortalR = document.getElementById("ChbAbdomenParaaortalR").checked;
var ChbAbdomenParaaortalL = document.getElementById("ChbAbdomenParaaortalL").checked;
var ChbAbdomenPelvic = document.getElementById("ChbAbdomenPelvic").checked;
var ChbAbdomenParaAICR = document.getElementById("ChbAbdomenParaAICR").checked;
var ChbAbdomenParaAICL = document.getElementById("ChbAbdomenParaAICL").checked;
var ChbAbdomenParaAIER = document.getElementById("ChbAbdomenParaAIER").checked;
var ChbAbdomenParaAIEL = document.getElementById("ChbAbdomenParaAIEL").checked;
var ChbAbdomenParaAIIR = document.getElementById("ChbAbdomenParaAIIR").checked;
var ChbAbdomenParaAIIL = document.getElementById("ChbAbdomenParaAIIL").checked;
var ChbAbdomenInguinsR = document.getElementById("ChbAbdomenInguinsR").checked;
var ChbAbdomenInguinsL = document.getElementById("ChbAbdomenInguinsL").checked;

var descriptions = [];

if (ChbAbdomenSubphrenic) descriptions.push("subfrenicky");
if (ChbAbdomenPeriportal) descriptions.push("periportálně");
if (ChbAbdomenMesenterial) descriptions.push("v mesenteriu");
if (ChbAbdomenRetroperit) descriptions.push("v retroperitoneu");
if (ChbAbdomenPelvic) descriptions.push("v pánvi");

if (ChbAbdomenParaaortalR && ChbAbdomenParaaortalL) {
    descriptions.push("paraaortálně bilat.");
} else {
    if (ChbAbdomenParaaortalR) descriptions.push("paraaortálně vpravo");
    if (ChbAbdomenParaaortalL) descriptions.push("paraaortálně vlevo");
}

if (ChbAbdomenRetrocruralR && ChbAbdomenRetrocruralL) {
    descriptions.push("retrokrurálně bilat.");
} else {
    if (ChbAbdomenRetrocruralR) descriptions.push("retrokrurálně vpravo");
    if (ChbAbdomenRetrocruralL) descriptions.push("retrokrurálně vlevo");
}

if (ChbAbdomenParaAICR && ChbAbdomenParaAICL) {
    descriptions.push("při společných ilikách bilat.");
} else {
    if (ChbAbdomenParaAICR) descriptions.push("při společné ilice vpravo");
    if (ChbAbdomenParaAICL) descriptions.push("při společné ilice vlevo");
}

if (ChbAbdomenParaAIER && ChbAbdomenParaAIEL) {
    descriptions.push("při zevních ilikách bilat.");
} else {
    if (ChbAbdomenParaAIER) descriptions.push("při zevní ilice vpravo");
    if (ChbAbdomenParaAIEL) descriptions.push("při zevní ilice vlevo");
}

if (ChbAbdomenParaAIIR && ChbAbdomenParaAIIL) {
    descriptions.push("při vnitřních ilikách bilat.");
} else {
    if (ChbAbdomenParaAIIR) descriptions.push("při vnitřní ilice vpravo");
    if (ChbAbdomenParaAIIL) descriptions.push("při vnitřní ilice vlevo");
}

if (ChbAbdomenInguinsR && ChbAbdomenInguinsL) {
    descriptions.push("inguinální bilat.");
} else {
    if (ChbAbdomenInguinsR) descriptions.push("inguinálně vpravo");
    if (ChbAbdomenInguinsL) descriptions.push("inguinálně vlevo");
}

if (descriptions.length === 2) {
    AbdomenLymphNode1LocationText = descriptions.join(' a ');
} else if (descriptions.length > 2) {
    var lastDescription = descriptions.pop();
    var secondLastDescription = descriptions.pop();
    AbdomenLymphNode1LocationText = descriptions.join(', ') + ', ' + secondLastDescription + ' a ' + lastDescription;
} else {
    AbdomenLymphNode1LocationText = descriptions.join(', ');
}


document.getElementById('AbdomenLymphNode1Location').value = AbdomenLymphNode1LocationText;


// Abdomen lymph node popis

var AbdomenLymphNode1Button = document.getElementById("AbdomenLymphNode1");
var AbdomenLymphNode1number = document.getElementById("AbdomenLymphNode1number").value;
var AbdomenLymphNode1typeRaw = document.getElementById("AbdomenLymphNode1type").value.trim();
var AbdomenLymphNode1type = (AbdomenLymphNode1number && AbdomenLymphNode1number !== "") ? (pluralForms[AbdomenLymphNode1typeRaw] || AbdomenLymphNode1typeRaw) : AbdomenLymphNode1typeRaw;
var AbdomenLymphNode1Location = document.getElementById("AbdomenLymphNode1Location").value;
var AbdomenLymphNode1AddLocation = document.getElementById("AbdomenLymphNode1AddLocation").value;
var AbdomenLymphNode1Loclargest = document.getElementById("AbdomenLymphNode1Loclargest").value;
var AbdomenLymphNode1Large = document.getElementById("AbdomenLymphNode1Large").value;
document.getElementById('AbdomenLymphNode1number').addEventListener('change', () => {document.getElementById('AbdomenLymphNode1Large').classList.toggle('hidden', document.getElementById('AbdomenLymphNode1number').value === "");});
var AbdomenLymphNode1Activity = document.getElementById("AbdomenLymphNode1Activity").value;
var AbdomenLymphNode1ActivityCopy = AbdomenLymphNode1Activity;
var selectedOption = document.getElementById("AbdomenLymphNode1Activity").selectedOptions[0];
var AbdomenLymphNode1RESActivityRPH = selectedOption.dataset.valueRPH || '';
var AbdomenLymphNode1RESActivityFDG = selectedOption.dataset.valueFDG || '';
var AbdomenLymphNode1SUV = formatSUV("AbdomenLymphNode1SUV");
var AbdomenLymphNode1Size = formatLymphNodeSize("AbdomenLymphNode1Size");
var selectedDecisionOption = document.getElementById("AbdomenLymphNode1Decision").selectedOptions[0];
var AbdomenLymphNode1RESDecision = selectedDecisionOption.dataset.valueRPH || '';
var AbdomenLymphNode1SUVPrev = formatSUV("AbdomenLymphNode1SUVPrev");
var AbdomenLymphNode1PrevSize = formatLymphNodeSize("AbdomenLymphNode1PrevSize");
var AbdomenLymphNode1ComparisonText = generateComparisonText(AbdomenLymphNode1SUVPrev, AbdomenLymphNode1PrevSize, DateComparison, AbdomenLymphNode1SUV, AbdomenLymphNode1Size);
var AbdomenLymphNode1ComparisonSUVRes = compareActRES(AbdomenLymphNode1SUV, AbdomenLymphNode1SUVPrev);
var AbdomenLymphNode1ComparisonSizeRes = compareSizes(AbdomenLymphNode1Size, AbdomenLymphNode1PrevSize);
var AbdomenLymphNode1CombinedResult = combineComparisonResults(AbdomenLymphNode1ComparisonSizeRes, AbdomenLymphNode1ComparisonSUVRes, AbdomenLymphNode1number);
document.getElementById("DateCompare").addEventListener('change', () => document.getElementById("AbdomenLymphNode1Previous").classList.toggle("hidden", !document.getElementById("DateCompare").value));

var AbdomenLymphNode1AllLocations = (AbdomenLymphNode1Location + " " + AbdomenLymphNode1AddLocation).trim();
if (AbdomenLymphNode1Loclargest !== "") { AbdomenLymphNode1Loclargest = AbdomenLymphNode1ActivityCopy + ", největší " + AbdomenLymphNode1Loclargest + " "; AbdomenLymphNode1Activity = ""; }
if (AbdomenLymphNode1number !== "" && AbdomenLymphNode1Loclargest === "") {
  AbdomenLymphNode1Size = AbdomenLymphNode1Size.replace('diametru ', 'diametru až ').replace('rozměru ', 'rozměru až ');
  AbdomenLymphNode1ComparisonText = AbdomenLymphNode1ComparisonText.replace('diametru ', 'diametru až ').replace('rozměru ', 'rozměru až ');
}

var processedSentencePOPAbdomenLymphNode1 = processSentence(AbdomenLymphNode1number + " " + AbdomenLymphNode1type);
var POPAbdomenLymphNode1 = processedSentencePOPAbdomenLymphNode1 + " " + AbdomenLymphNode1AllLocations + " " + AbdomenLymphNode1Loclargest + " " + AbdomenLymphNode1Size + " " + AbdomenLymphNode1Activity + " " + AbdomenLymphNode1ComparisonText + ".";
var processedSentenceRESAbdomenLymphNodeFDG = processSentence(AbdomenLymphNode1number + " " + AbdomenLymphNode1RESActivityFDG + " " + AbdomenLymphNode1type);
var processedSentenceRESAbdomenLymphNodeRPH = processSentence(AbdomenLymphNode1number + " " + AbdomenLymphNode1type);
var RESAbdomenLymphNode1 = (buttonElementPETType.value === "FDG")
  ? processedSentenceRESAbdomenLymphNodeFDG + " " + AbdomenLymphNode1AllLocations + " " + AbdomenLymphNode1CombinedResult + " " + AbdomenLymphNode1RESDecision + "."
  : processedSentenceRESAbdomenLymphNodeRPH + " " + AbdomenLymphNode1AllLocations + " " + AbdomenLymphNode1RESActivityRPH + " " + AbdomenLymphNode1CombinedResult + " " + AbdomenLymphNode1RESDecision + ".";

if (AbdomenLymphNode1Location === "" && AbdomenLymphNode1AddLocation === "") { POPAbdomenLymphNode1 = ""; RESAbdomenLymphNode1 = ""; }
if (AbdomenLymphNode1CombinedResult.includes("je nově") || AbdomenLymphNode1CombinedResult.includes("jsou nově")) {
  RESAbdomenLymphNode1 = "Nově " + RESAbdomenLymphNode1.charAt(0).toLowerCase() + RESAbdomenLymphNode1.substring(1);
  RESAbdomenLymphNode1 = RESAbdomenLymphNode1.replace(" je nově", "").replace(" jsou nově", "");
}


// ABDOMEN OTHERS

// Liver
var AbdomenLiverText = "";

var ChbLiverSteatosis = document.getElementById("ChbLiverSteatosis").checked;
var buttonLiverCystText = document.getElementById("ChbLiverCyst").innerText;
var buttonLiverHemangiomaText = document.getElementById("ChbLiverHemangioma").innerText;
var ChbLiverResectionR = document.getElementById("ChbLiverResectionR").checked;
var ChbLiverResectionL = document.getElementById("ChbLiverResectionL").checked;
var ChbLiverRFAR = document.getElementById("ChbLiverRFAR").checked;
var ChbLiverRFAL = document.getElementById("ChbLiverRFAL").checked;
var ChbLiverBileductDilation = document.getElementById("ChbLiverBileductDilation").checked;
var AbdomenLiverOther = document.getElementById("AbdomenLiverOther").value.trim();

updateButtonTexts({
            'ChbLiverCyst': ['0', '+', '++'],
			'ChbLiverHemangioma': ['0', '+', '++']
        });

var descriptions = [];

if (ChbLiverSteatosis) descriptions.push("steatotická");

if (buttonLiverCystText === "+") {
    descriptions.push("s fotopenickou cystou");
} else if (buttonLiverCystText === "++") {
    descriptions.push("s fotopenickými cystami");
}

if (buttonLiverHemangiomaText === "+") {
    descriptions.push("s ložiskem bez zvýšené akumulace RF charakteru hemangiomu");
} else if (buttonLiverHemangiomaText === "++") {
    descriptions.push("s vícečetnými ložisky bez zvýšené akumulace RF charakteru hemangiomů");
}

if (ChbLiverResectionR && ChbLiverResectionL) {
    descriptions.push("po resekci v obou lalocích");
} else {
    if (ChbLiverResectionR) descriptions.push("po resekci v pravém laloku");
    if (ChbLiverResectionL) descriptions.push("po resekci v levém laloku");
}

if (ChbLiverRFAR && ChbLiverRFAL) {
    descriptions.push("po RFA v obou lalocích");
} else {
    if (ChbLiverRFAR) descriptions.push("po RFA v pravém laloku");
    if (ChbLiverRFAL) descriptions.push("po RFA v levém laloku");
}

if (ChbLiverBileductDilation) descriptions.push("s dilatací žlučových cest");
if (AbdomenLiverOther) descriptions.push(AbdomenLiverOther);

if (descriptions.length) {
  AbdomenLiverText = "Játra " + descriptions.join(", ") + ". ";
}

// Gallbladder

var AbodomenGallbladderText = "";

var ChbGallbladderEctomy = document.getElementById("ChbGallbladderEctomy").checked;
var buttonGallbladderStoneText = document.getElementById("ChbGallbladderStone").innerText;
var ChbGallbladderSludge = document.getElementById("ChbGallbladderSludge").checked;
var ChbGallbladderItis = document.getElementById("ChbGallbladderItis").checked;
var GallbladderOther = document.getElementById("GallbladderOther").value.trim();

updateButtonTexts({'ChbGallbladderStone': ['0', '+', '++']});

var descriptionsGallbladder = [];

if (ChbGallbladderEctomy) descriptionsGallbladder.push("chybí po CHCE");

if (buttonGallbladderStoneText === "+") {
    descriptionsGallbladder.push("s konkrementem");
} else if (buttonGallbladderStoneText === "++") {
    descriptionsGallbladder.push("s vícečetnými konkrementy");
}

if (ChbGallbladderSludge) descriptionsGallbladder.push("s drobnými konkrementy či sludge");
if (ChbGallbladderItis) descriptionsGallbladder.push("s rozšířenou stěnou se zvýšenou akumulací RF");
if (GallbladderOther) descriptionsGallbladder.push(GallbladderOther);

if (descriptionsGallbladder.length) {
	AbodomenGallbladderText = "Žlučník " + descriptionsGallbladder.join(", ") + ". ";
	}

// Spleen
var AbdomenSpleenText = "";

var ChbSpleenEnlarged = document.getElementById("ChbSpleenEnlarged").checked;
var ChbSpleenActivity = document.getElementById("ChbSpleenActivity").checked;
var ChbSpleenEctomy = document.getElementById("ChbSpleenEctomy").checked;
var buttonSpleenCystText = document.getElementById("ChbSpleenCyst").innerText;
var ChbSpleenInfarct = document.getElementById("ChbSpleenInfarct").checked;
var ChbSpleenRegenerate = document.getElementById("ChbSpleenRegenerate").checked;
var AbdomenSpleenOther = document.getElementById("AbdomenSpleenOther").value.trim();

updateButtonTexts({
            'ChbSpleenCyst': ['0', '+', '++']
        });

var spleenDescriptions = [];

if (ChbSpleenEnlarged) spleenDescriptions.push("zvětšena");
if (ChbSpleenActivity) spleenDescriptions.push("s difuzně vysokou akumulací RF");
if (ChbSpleenEctomy) spleenDescriptions.push("chybí po splenektomii");

if (buttonSpleenCystText === "+") {
    spleenDescriptions.push("s fotopenickou cystou");
} else if (buttonSpleenCystText === "++") {
    spleenDescriptions.push("s fotopenickými cystami");
}

if (ChbSpleenInfarct) spleenDescriptions.push("s klínovitým defektem po infarktu");
if (ChbSpleenRegenerate) spleenDescriptions.push("přítomny regeneráty");
if (AbdomenSpleenOther) spleenDescriptions.push(AbdomenSpleenOther);

if (spleenDescriptions.length) {
  AbdomenSpleenText = "Slezina " + spleenDescriptions.join(", ") + ". ";
}

// Stomach
var AbdomenStomachText = "";

var ChbStomachGastrectomyTot = document.getElementById("ChbStomachGastrectomyTot").checked;
var ChbStomachGastrectomyPart = document.getElementById("ChbStomachGastrectomyPart").checked;
var ChbStomachActivity = document.getElementById("ChbStomachActivity").checked;
var ChbStomachPEG = document.getElementById("ChbStomachPEG").checked;
var AbdomenStomachOther = document.getElementById("AbdomenStomachOther").value.trim();

var stomachDescriptions = [];

if (ChbStomachGastrectomyTot) stomachDescriptions.push("chybí po totální gastrectomii, anastomóza klidná");
if (ChbStomachGastrectomyPart) stomachDescriptions.push("po parciální gastrectomii, anastomóza klidná");
if (ChbStomachActivity) stomachDescriptions.push("s nespecificky difuzně vysokou akumulací RF");
if (ChbStomachPEG) stomachDescriptions.push("s PEG");
if (AbdomenStomachOther) stomachDescriptions.push(AbdomenStomachOther);

if (stomachDescriptions.length) {
  AbdomenStomachText = "Žaludek " + stomachDescriptions.join(", ") + ". ";
}

// Pancreas
var AbdomenPancreasText = "";

var ChbSPancreasEnlarged = document.getElementById("ChbSPancreasEnlarged").checked;
var ChbPancreasActivity = document.getElementById("ChbPancreasActivity").checked;
var buttonPancreasCystText = document.getElementById("ChbPancreasCyst").innerText;
var ChbPancreasEctomy = document.getElementById("ChbPancreasEctomy").checked;
var ChbSpleenHemiEctomyR = document.getElementById("ChbSpleenHemiEctomyR").checked;
var ChbSpleenHemiEctomyL = document.getElementById("ChbSpleenHemiEctomyL").checked;
var AbdomenPancreasOther = document.getElementById("AbdomenPancreasOther").value.trim();

updateButtonTexts({
            'ChbPancreasCyst': ['0', '+', '++']
        });

var pancreasDescriptions = [];

if (ChbSPancreasEnlarged) pancreasDescriptions.push("atrofický");
if (ChbPancreasActivity) pancreasDescriptions.push("s dilatovaným Wirsungem");

if (buttonPancreasCystText === "+") {
    pancreasDescriptions.push("s fotopenickým cystickým ložiskem");
} else if (buttonPancreasCystText === "++") {
    pancreasDescriptions.push("s fotopenickými cystickými ložisky");
}

if (ChbPancreasEctomy) pancreasDescriptions.push("chybí po totální pankreatektomii");
if (ChbSpleenHemiEctomyR) pancreasDescriptions.push("redukován po hemipankreatoduodenektomii");
if (ChbSpleenHemiEctomyL) pancreasDescriptions.push("redukován po hemipankreatektomii těla a kaudy");
if (AbdomenPancreasOther) pancreasDescriptions.push(AbdomenPancreasOther);

if (pancreasDescriptions.length) {
  AbdomenPancreasText = "Pankreas " + pancreasDescriptions.join(", ") + ". ";
}

// Adrenal
var AbdomenAdrenalText = "";

var ChbAdrenalAdenomaR = document.getElementById("ChbAdrenalAdenomaR").checked;
var ChbAdrenalAdenomaL = document.getElementById("ChbAdrenalAdenomaL").checked;
var ChbAdrenalHyperplasiaR = document.getElementById("ChbAdrenalHyperplasiaR").checked;
var ChbAdrenalHyperplasiaL = document.getElementById("ChbAdrenalHyperplasiaL").checked;
var ChbAdrenalMyelolipomaR = document.getElementById("ChbAdrenalMyelolipomaR").checked;
var ChbAdrenalMyelolipomaL = document.getElementById("ChbAdrenalMyelolipomaL").checked;
var ChbAdrenalActivityR = document.getElementById("ChbAdrenalActivityR").checked;
var ChbAdrenalActivityL = document.getElementById("ChbAdrenalActivityL").checked;
var ChbStomachGastrectomyPart = document.getElementById("ChbStomachGastrectomyPart").checked;
var ChbStomachActivity = document.getElementById("ChbStomachActivity").checked;
var ChbAdrenalEctomyR = document.getElementById("ChbAdrenalEctomyR").checked;
var ChbAdrenalEctomyL = document.getElementById("ChbAdrenalEctomyL").checked;
var AbdomenAdrenalOther = document.getElementById("AbdomenAdrenalOther").value.trim();

var descriptionsAdrenal = [];

if (ChbAdrenalAdenomaR && ChbAdrenalAdenomaL) {
    descriptionsAdrenal.push("bilat. s ložisky bez zvýšené akumulace RF obrazu adenomů");
} else {
    if (ChbAdrenalAdenomaR) descriptionsAdrenal.push("pravá s ložiskem bez zvýšené akumulace RF obrazu adenomu");
    if (ChbAdrenalAdenomaL) descriptionsAdrenal.push("levá s ložiskem bez zvýšené akumulace RF obrazu adenomu");
} 

if (ChbAdrenalHyperplasiaR && ChbAdrenalHyperplasiaL) {
    descriptionsAdrenal.push("bilat. rozšířeny bez výrazněji zvýšené akumulace RF obrazu hyperplázie");
} else {
    if (ChbAdrenalHyperplasiaR) descriptionsAdrenal.push("pravá rozšířena bez zvýšené akumulace RF obrazu hyperplázie");
    if (ChbAdrenalHyperplasiaL) descriptionsAdrenal.push("levá rozšířena bez zvýšené akumulace RF obrazu hyperplázie");
}

if (ChbAdrenalMyelolipomaR && ChbAdrenalMyelolipomaL) {
    descriptionsAdrenal.push("bilat. s ložisky s podílem tuku a bez zvýšené akumulace RF obrazu myelolipomů");
} else {
    if (ChbAdrenalMyelolipomaR) descriptionsAdrenal.push("pravá s ložiskem s podílem tuku a bez zvýšené akumulace RF obrazu myelolipomu");
    if (ChbAdrenalMyelolipomaL) descriptionsAdrenal.push("levá s ložiskem s podílem tuku a bez zvýšené akumulace RF obrazu myelolipomu");
}

if (ChbAdrenalActivityR && ChbAdrenalActivityL) {
    descriptionsAdrenal.push("se zvýšenou akumulací RF bilat. bez ložiskových změn pravděpodobně při aktivaci");
} else {
    if (ChbAdrenalActivityR) descriptionsAdrenal.push("pravá se zvýšenou akumulací RF bez ložiskových změn pravděpodobně při aktivaci");
    if (ChbAdrenalActivityL) descriptionsAdrenal.push("levá se zvýšenou akumulací RF bez ložiskových změn pravděpodobně při aktivaci");
}

if (ChbAdrenalEctomyR && ChbAdrenalEctomyL) {
    descriptionsAdrenal.push("chybí bilat. po adrenalektomii");
} else {
    if (ChbAdrenalEctomyR) descriptionsAdrenal.push("pravá chybí po adrenalektomii");
    if (ChbAdrenalEctomyL) descriptionsAdrenal.push("levá chybí po adrenalektomii");
}
if (AbdomenAdrenalOther) descriptionsAdrenal.push(AbdomenAdrenalOther);

if (descriptionsAdrenal.length) {
  AbdomenAdrenalText = "Nadledviny: " + descriptionsAdrenal.join(", ") + ". ";
}


// Kidneys
var AbdomenKidneysText = "";

var ChbKidneysLithR = document.getElementById("ChbKidneysLithR").checked;
var ChbKidneysLithL = document.getElementById("ChbKidneysLithL").checked;
var ChbKidneysAMLR = document.getElementById("ChbKidneysAMLR").checked;
var ChbKidneysAMLL = document.getElementById("ChbKidneysAMLL").checked;
var ChbKidneysScarR = document.getElementById("ChbKidneysScarR").checked;
var ChbKidneysScarL = document.getElementById("ChbKidneysScarL").checked;
var ChbKidneysStentR = document.getElementById("ChbKidneysStentR").checked;
var ChbKidneysStentL = document.getElementById("ChbKidneysStentL").checked;
var ChbKidneysStomyR = document.getElementById("ChbKidneysStomyR").checked;
var ChbKidneysStomyL = document.getElementById("ChbKidneysStomyL").checked;
var ChbKidneysParcResectionR = document.getElementById("ChbKidneysParcResectionR").checked;
var ChbKidneysParcResectionL = document.getElementById("ChbKidneysParcResectionL").checked;
var ChbKidneysEctomyR = document.getElementById("ChbKidneysEctomyR").checked;
var ChbKidneysEctomyL = document.getElementById("ChbKidneysEctomyL").checked;
var AbdomenKidneysOther = document.getElementById("AbdomenKidneysOther").value.trim();

updateButtonTexts({
            'ChbKidneysHydroR': ['R', 'I', 'II', 'III', 'IV'],
            'ChbKidneysHydroL': ['L', 'I', 'II', 'III', 'IV'],
			'ChbKidneysCystsR': ['R', '+', '++'],
			'ChbKidneysCystsL': ['L', '+', '++']
        });

var descriptionsKidneys = [];

function addBilateralDescription(rCheck, lCheck, bilateralDesc, rDesc, lDesc) {
    if (rCheck && lCheck) {
        descriptionsKidneys.push(bilateralDesc);
    } else {
        if (rCheck) descriptionsKidneys.push(rDesc);
        if (lCheck) descriptionsKidneys.push(lDesc);
    }
}

addBilateralDescription(ChbKidneysLithR, ChbKidneysLithL, "kalikolitiáza bilat.", "kalikolitiáza vpravo", "kalikolitiáza vlevo");
addBilateralDescription(ChbKidneysAMLR, ChbKidneysAMLL, "bilat. ložiska s tuk. denzitami bez zvýšené akumulace RF obrazu AML", "vpravo ložisko s tuk. denzitami bez zvýšené akumulace RF obrazu AML", "vlevo ložisko s tuk. denzitami bez zvýšené akumulace RF obrazu AML");
addBilateralDescription(ChbKidneysScarR, ChbKidneysScarL, "jizevnaté změny parenchymu bilat.", "jizevnaté změny parenchymu vpravo", "jizevnaté změny parenchymu vlevo");
addBilateralDescription(ChbKidneysStentR, ChbKidneysStentL, "double pig-tail katetr pánvička - ureter bilat.", "double pig-tail katetr pánvička - ureter vpravo", "double pig-tail katetr pánvička - ureter vlevo");
addBilateralDescription(ChbKidneysStomyR, ChbKidneysStomyL, "nefrostomie bilat.", "nefrostomie vpravo", "nefrostomie vlevo");
addBilateralDescription(ChbKidneysParcResectionR, ChbKidneysParcResectionL, "obě po parc. resekci", "pravá po parc. resekci", "levá po parc. resekci");
addBilateralDescription(ChbKidneysEctomyR, ChbKidneysEctomyL, "obě chybí po totální nefrektomii", "pravá chybí po totální nefrektomii", "levá chybí po totální nefrektomii");
if (AbdomenKidneysOther) descriptionsKidneys.push(AbdomenKidneysOther);


function addHydroDescription(buttonIdR, buttonIdL, sideTextR, sideTextL) {
	var buttonTextR = document.getElementById(buttonIdR).innerText;
	var buttonTextL = document.getElementById(buttonIdL).innerText;

	if (buttonTextR === buttonTextL && ['I', 'II', 'III', 'IV'].includes(buttonTextR)) {
		descriptionsKidneys.push(`oboustranně hydronefróza ${buttonTextR}.st`);
		return; 
	}

	var sides = [{ id: buttonIdR, text: sideTextR }, { id: buttonIdL, text: sideTextL }];
	sides.forEach(side => {
		switch (document.getElementById(side.id).innerText) {
			case 'I':
				descriptionsKidneys.push(`${side.text} hydronefróza I.st`);
				break;
			case 'II':
				descriptionsKidneys.push(`${side.text} hydronefróza II.st`);
				break;
			case 'III':
				descriptionsKidneys.push(`${side.text} hydronefróza III.st`);
				break;
			case 'IV':
				descriptionsKidneys.push(`${side.text} hydronefróza IV.st`);
				break;
		}
	});
}
addHydroDescription('ChbKidneysHydroR', 'ChbKidneysHydroL', 'vpravo', 'vlevo');

function updateCystDescriptions() {
    var buttonCystsRText = document.getElementById("ChbKidneysCystsR").innerText;
    var buttonCystsLText = document.getElementById("ChbKidneysCystsL").innerText;

    if (buttonCystsRText === "+" && buttonCystsLText === "+") {
        descriptionsKidneys.push("fotopenické cysty bilat.");
    } else {
        if (buttonCystsRText === "+") {
            descriptionsKidneys.push("fotopenická cysta vpravo");
        }
        if (buttonCystsLText === "+") {
            descriptionsKidneys.push("fotopenická cysta vlevo");
        }
    }

    if (buttonCystsRText === "++" && buttonCystsLText === "++") {
        descriptionsKidneys.push("vícečetné fotopenické cysty bilat.");
    } else {
        if (buttonCystsRText === "++") {
            descriptionsKidneys.push("vícečetné fotopenické cysty vpravo");
        }
        if (buttonCystsLText === "++") {
            descriptionsKidneys.push("vícečetné fotopenické cysty vlevo");
        }
    }
}
updateCystDescriptions();


if (descriptionsKidneys.length) {
  AbdomenKidneysText = "Ledviny: " + descriptionsKidneys.join(", ") + ". ";
}

// Colon
var AbdomenColonText = "";


var ChbColonRectalRes = document.getElementById("ChbColonRectalRes").checked;
var ChbColonRectalAmp = document.getElementById("ChbColonRectalAmp").checked;
var ChbColonHemicolectomyR = document.getElementById("ChbColonHemicolectomyR").checked;
var ChbColonHemicolectomyL = document.getElementById("ChbColonHemicolectomyL").checked;
var ChbColonAnast = document.getElementById("ChbColonAnast").checked;
var ChbColonStomiaR = document.getElementById("ChbColonStomiaR").checked;
var ChbColonStomiaL = document.getElementById("ChbColonStomiaL").checked;
var ChbColonInfiltrate = document.getElementById("ChbColonInfiltrate").checked;
var AbdomenColonOther = document.getElementById("AbdomenColonOther").value.trim();

var descriptionsColon = [];

if (ChbColonRectalRes) {descriptionsColon.push("st.p. resekci rektosigmatu");} 
if (ChbColonRectalAmp) {descriptionsColon.push("st.p. amputaci rekta");}
if (ChbColonHemicolectomyR && ChbColonHemicolectomyL) {descriptionsColon.push("st.p. subtotální kolektomii");
} else {if (ChbColonHemicolectomyR) {descriptionsColon.push("st.p. pravostranné hemikolektomii");}
		if (ChbColonHemicolectomyL) {descriptionsColon.push("st.p. levostranné hemikolektomii");}
}
if (ChbColonAnast) {descriptionsColon.push("anastomóza klidná");} 
if (ChbColonStomiaR) {descriptionsColon.push("stomie v pravém hypogastriu");}
if (ChbColonStomiaL) {descriptionsColon.push("stomie v levém hypogastriu");}
if (ChbColonInfiltrate) {descriptionsColon.push("presakrální infiltrát bez fokálně zvýšené akumulace RF");}
if (AbdomenColonOther) descriptionsColon.push(AbdomenColonOther);

if (descriptionsColon.length) {AbdomenColonText = "Tračník: " + descriptionsColon.join(", ") + ". ";
}

// Bladder
var AbdomenBladderText = "";

var ChbBladderEctomy = document.getElementById("ChbBladderEctomy").checked;
var ChbBladderStomia = document.getElementById("ChbBladderStomia").checked;
var ChbBladderDiverticulum = document.getElementById("ChbBladderDiverticulum").checked;
var ChbBladderDiverticulums = document.getElementById("ChbBladderDiverticulums").checked;
var ChbBladderCatether = document.getElementById("ChbBladderCatether").checked;
var AbdomenBladderOther = document.getElementById("AbdomenBladderOther").value.trim();

var descriptionsBladder = [];

if (ChbBladderEctomy) {descriptionsBladder.push("chybí po cystektomii");}
if (ChbBladderStomia) {descriptionsBladder.push("ureteroileocystostomie v pravém hypogastriu");}
if (ChbBladderDiverticulum) {descriptionsBladder.push("s divertiklem");}
if (ChbBladderDiverticulums) {descriptionsBladder.push("s vícečetnými divertikly");}
if (ChbBladderCatether) {descriptionsBladder.push("se zavedeným katetrem");}
if (AbdomenBladderOther) descriptionsBladder.push(AbdomenBladderOther);

if (descriptionsBladder.length) {AbdomenBladderText = "Močový měchýř " + descriptionsBladder.join(", ") + ". ";}

// Uterus
var AbdomenUterusText = "";

var ChbUterusEctomy = document.getElementById("ChbUterusEctomy").checked;
var buttonUterusMyomaText = document.getElementById("ChbUterusMyoma").innerText;
var ChbUterusActivity = document.getElementById("ChbUterusActivity").checked;
var AbdomenUterusOther = document.getElementById("AbdomenUterusOther").value.trim();

updateButtonTexts({
            'ChbUterusMyoma': ['0', '+', '++']
        });

var descriptionsUterus = [];

if (ChbUterusEctomy) {descriptionsUterus.push("chybí po hysterektomii");}

if (buttonUterusMyomaText === "+") {
    descriptionsUterus.push("s ložiskem bez zvýšené akumulace RF obrazu myomu");
} else if (buttonUterusMyomaText === "++") {
    descriptionsUterus.push("s vícečetnými ložisky bez zvýšené akumulace RF obrazu myomů");
}

if (ChbUterusActivity) {descriptionsUterus.push("se zvýšenou aktivitou sliznice pravděp. v rámci cyklu");}
if (AbdomenUterusOther) descriptionsUterus.push(AbdomenUterusOther);

if (descriptionsUterus.length) {AbdomenUterusText = "Děloha " + descriptionsUterus.join(", ") + ". ";}

// Ovaries
var AbdomenOvariesText = "";

var ChbOvariesCystR = document.getElementById("ChbOvariesCystR").checked;
var ChbOvariesCystL = document.getElementById("ChbOvariesCystL").checked;
var ChbOvariesActivityR = document.getElementById("ChbOvariesActivityR").checked;
var ChbOvariesActivityL = document.getElementById("ChbOvariesActivityL").checked;
var AbdomenOvariesOther = document.getElementById("AbdomenOvariesOther").value.trim();

var descriptionsOvaries = [];

if (ChbOvariesCystR && ChbOvariesCystL) {
    descriptionsOvaries.push("obě s fotopenickými cystami");
} else {
	if (ChbOvariesCystR) {descriptionsOvaries.push("pravé s fotopenickou cystou");}
	if (ChbOvariesCystL) {descriptionsOvaries.push("levé s fotopenickou cystou");}
}

if (ChbOvariesActivityR && ChbOvariesActivityL) {
    descriptionsOvaries.push("obě se zvýšenou aktivitou pravděp. v rámci cyklu");
} else {
    if (ChbOvariesActivityR) {descriptionsOvaries.push("pravé se zvýšenou aktivitou pravděp. v rámci cyklu");}
    if (ChbOvariesActivityL) {descriptionsOvaries.push("levé se zvýšenou aktivitou pravděp. v rámci cyklu");}
}

if (AbdomenOvariesOther) descriptionsOvaries.push(AbdomenOvariesOther);

if (descriptionsOvaries.length) {AbdomenOvariesText = "Ovária: " + descriptionsOvaries.join(", ") + ". ";}

// Prostate
var AbdomenProstateText = ""; AbdomenProstateRes = [];

var ChbProstateEctomy = document.getElementById("ChbProstateEctomy").checked;
var ChbProstateTURP = document.getElementById("ChbProstateTURP").checked;
var ChbProstateEnlarged = document.getElementById("ChbProstateEnlarged").checked;
var ChbProstateLesionR = document.getElementById("ChbProstateLesionR").checked;
var ChbProstateLesionL = document.getElementById("ChbProstateLesionL").checked;
var AbdomenProstateOther = document.getElementById("AbdomenProstateOther").value.trim();

var descriptionsProstate = [];

if (ChbProstateEctomy) {descriptionsProstate.push("chybí po radikální prostatektomii");}
if (ChbProstateTURP) {descriptionsProstate.push("s centrálním defektem po transuretrální resekci");}
if (ChbProstateEnlarged) {descriptionsProstate.push("je zvětšena");}

if (ChbProstateLesionR && ChbProstateLesionL) {
    descriptionsProstate.push("s okrsky zvýšené akumulace RF bilat."); AbdomenProstateRes.push("Prostata s okrsky zvýšené metabolické aktivity bilat. k dovyšetření. ");
} else {
    if (ChbProstateLesionR) {descriptionsProstate.push("s okrskem zvýšené akumulace RF vpravo"); AbdomenProstateRes.push("Prostata s okrskem zvýšené metabolické aktivity vpravo k dovyšetření. ");}
    if (ChbProstateLesionL) {descriptionsProstate.push("s okrskem zvýšené akumulace RF vlevo"); AbdomenProstateRes.push("Prostata s okrskem zvýšené metabolické aktivity vlevo k dovyšetření. ");}
}

if (AbdomenProstateOther) descriptionsProstate.push(AbdomenProstateOther);

if (descriptionsProstate.length) {AbdomenProstateText = "Prostata " + descriptionsProstate.join(", ") + ". ";}

//Testes
var AbdomenTestesText = "";

var ChbTestesEctomyR = document.getElementById("ChbTestesEctomyR").checked;
var ChbTestesEctomyL = document.getElementById("ChbTestesEctomyL").checked;
var ChbTestesHydroceleR = document.getElementById("ChbTestesHydroceleR").checked;
var ChbTestesHydroceleL = document.getElementById("ChbTestesHydroceleL").checked;
var AbdomenTestesOther = document.getElementById("AbdomenTestesOther").value.trim();

var descriptionsTestes = [];

if (ChbTestesEctomyR && ChbTestesEctomyL) {
    descriptionsTestes.push("chybí obě po orchiektomii");
} else {
    if (ChbTestesEctomyR) {descriptionsTestes.push("chybí pravé po orchiektomii");}
    if (ChbTestesEctomyL) {descriptionsTestes.push("chybí levé po orchiektomii");}
}

if (ChbTestesHydroceleR && ChbTestesHydroceleL) {
    descriptionsTestes.push("hydrokéla bilat.");
} else {
    if (ChbTestesHydroceleR) {descriptionsTestes.push("hydrokéla vpravo");}
    if (ChbTestesHydroceleL) {descriptionsTestes.push("hydrokéla vlevo");}
}

if (AbdomenTestesOther) descriptionsTestes.push(AbdomenTestesOther);

if (descriptionsTestes.length) {AbdomenTestesText = "Testes: " + descriptionsTestes.join(", ") + ". ";}

// Abd. wall
var AbdomenWallText = "";

var buttonAbdomenWallPlusText = document.getElementById("ChbAbdomenWallPlus").innerText;
var buttonAbdomenWallHerniaSText = document.getElementById("ChbAbdomenWallHerniaS").innerText;
var buttonAbdomenWallHerniaSupraSText = document.getElementById("ChbAbdomenWallHerniaSupraS").innerText;
var buttonAbdomenWallHerniaUmbSText = document.getElementById("ChbAbdomenWallHerniaUmbS").innerText;
var buttonAbdomenWallHerniaIngRSText = document.getElementById("ChbAbdomenWallHerniaIngR").innerText;
var buttonAbdomenWallHerniaIngLSText = document.getElementById("ChbAbdomenWallHerniaIngL").innerText;
var AbdomenWallOther = document.getElementById("AbdomenWallOther").value.trim();

updateButtonTexts({
            'ChbAbdomenWallPlus': ['0', '-', '+'],
			'ChbAbdomenWallHerniaS': ['0', '+', '++'],
			'ChbAbdomenWallHerniaSupraS': ['0', '+', '++'],
			'ChbAbdomenWallHerniaUmbS': ['0', '+', '++'],
			'ChbAbdomenWallHerniaIngR': ['R', '+', '++'],
			'ChbAbdomenWallHerniaIngL': ['L', '+', '++']
        });

var descriptionsWall = [];

if (buttonAbdomenWallPlusText === "+") {
    descriptionsWall.push("s přetrvávající zvýšenou akumulací RF v jizvě");
} else if (buttonAbdomenWallPlusText === "-") {
    descriptionsWall.push("s jizvou bez zvýšené akumulace RF");
}

if (buttonAbdomenWallHerniaSText === "+") {
    descriptionsWall.push("s drobnou herniací v jizvě");
} else if (buttonAbdomenWallHerniaSText === "++") {
    descriptionsWall.push("s herniací v jizvě s obsahem střevních kliček");
}

if (buttonAbdomenWallHerniaSupraSText === "+") {
    descriptionsWall.push("s drobnou herniací supraumbilikálně");
} else if (buttonAbdomenWallHerniaSupraSText === "++") {
    descriptionsWall.push("s herniací supraumbilikálně s obsahem střevních kliček");
}

if (buttonAbdomenWallHerniaUmbSText === "+") {
    descriptionsWall.push("s drobnou umbilikální hernií");
} else if (buttonAbdomenWallHerniaUmbSText === "++") {
    descriptionsWall.push("s umbilikální hernií s obsahem střevní kličky");
}

if (buttonAbdomenWallHerniaIngRSText === "+" && buttonAbdomenWallHerniaIngLSText === "+") {
    descriptionsWall.push("s bilaterální inguinální herniací");
} else if (buttonAbdomenWallHerniaIngRSText === "++" && buttonAbdomenWallHerniaIngLSText === "++") {
    descriptionsWall.push("s bilaterální skrotální herniací");
} else {
    if (buttonAbdomenWallHerniaIngRSText === "+") {
        descriptionsWall.push("s inguinální herniací vpravo");
    } else if (buttonAbdomenWallHerniaIngRSText === "++") {
        descriptionsWall.push("se skrotální herniací vpravo");
    }

    if (buttonAbdomenWallHerniaIngLSText === "+") {
        descriptionsWall.push("s inguinální herniací vlevo");
    } else if (buttonAbdomenWallHerniaIngLSText === "++") {
        descriptionsWall.push("se skrotální herniací vlevo");
    }
}

if (AbdomenWallOther) descriptionsWall.push(AbdomenWallOther);

if (descriptionsWall.length > 1) {
  AbdomenWallText = "Břišní stěna " + descriptionsWall.slice(0, -1).join(", ") + " a " + descriptionsWall.slice(-1) + ". ";
} else {
  AbdomenWallText = descriptionsWall.length ? "Břišní stěna " + descriptionsWall[0] + ". " : "";
}


//Ascites
var AbdomenFluidText = "";
var AbdomenFluidRes = "";

var ChbAbdomenFluidS = document.getElementById("ChbAbdomenFluidS").checked;
var ChbAbdomenFluidM = document.getElementById("ChbAbdomenFluidM").checked;
var ChbAbdomenFluidL = document.getElementById("ChbAbdomenFluidL").checked;
var ChbAbdomenFluidXL = document.getElementById("ChbAbdomenFluidXL").checked;

AbdomenFluidText = "Bez tekutiny v dutině břišní. ";

function uncheckOthers(clickedCheckboxId) {
    const checkboxes = ["ChbAbdomenFluidS", "ChbAbdomenFluidM", "ChbAbdomenFluidL", "ChbAbdomenFluidXL"];
    checkboxes.forEach(function(id) {
        if (id !== clickedCheckboxId) {
            document.getElementById(id).checked = false;
        }
    });
}
["ChbAbdomenFluidS", "ChbAbdomenFluidM", "ChbAbdomenFluidL", "ChbAbdomenFluidXL"].forEach(function(id) {
    document.getElementById(id).addEventListener("click", function() {
        uncheckOthers(id);
    });
});


if (ChbAbdomenFluidS) {AbdomenFluidText = "Malé množství tekutiny v malé pánvi.";AbdomenFluidRes = "Malé množství tekutiny v malé pánvi. ";}
if (ChbAbdomenFluidM) {AbdomenFluidText = "Tekutina pod játry a v malé pánvi.";AbdomenFluidRes = "Nevýrazný ascites. ";}
if (ChbAbdomenFluidL) {AbdomenFluidText = "Tekutina okolo jater, sleziny, mezikličkově a v pánvi.";AbdomenFluidRes = "Ascites. ";}
if (ChbAbdomenFluidXL) {AbdomenFluidText = "Velké množství tekutiny intraperitoneálně.";AbdomenFluidRes = "Výrazný ascites. ";}


// Vessels
var AbdomenVesselsText = "";
var AbdomenVesselsRes = "";

var ChbAbdomenVesselsAoAneurysmSupra = document.getElementById("ChbAbdomenVesselsAoAneurysmSupra").checked;
var ChbAbdomenVesselsAoAneurysmSub = document.getElementById("ChbAbdomenVesselsAoAneurysmSub").checked;
var ChbAbdomenVesselsAoAneurysmBif = document.getElementById("ChbAbdomenVesselsAoAneurysmBif").checked;

var ChbAbdomenVesselsASAortaCH = document.getElementById("ChbAbdomenVesselsASAortaCH").checked;
var ChbAbdomenVesselsASAortaA = document.getElementById("ChbAbdomenVesselsASAortaA").checked;
var ChbAbdomenVesselsASIliacComR = document.getElementById("ChbAbdomenVesselsASIliacComR").checked;
var ChbAbdomenVesselsASIliacComL = document.getElementById("ChbAbdomenVesselsASIliacComL").checked;
var ChbAbdomenVesselsASIliacExtR = document.getElementById("ChbAbdomenVesselsASIliacExtR").checked;
var ChbAbdomenVesselsASIliacExtL = document.getElementById("ChbAbdomenVesselsASIliacExtL").checked;
var ChbAbdomenVesselsASFemR = document.getElementById("ChbAbdomenVesselsASFemR").checked;
var ChbAbdomenVesselsASFemL = document.getElementById("ChbAbdomenVesselsASFemL").checked;
var AbdomenVesselsOther = document.getElementById("AbdomenVesselsOther").value.trim();
var AneurysmDiameter = document.getElementById("AneurysmDiameter").value.trim(); document.getElementById("AneurysmDiameter").addEventListener("input", updateTexts);

var aneurysmText = "";
var isSupra = ChbAbdomenVesselsAoAneurysmSupra;
var isSub = ChbAbdomenVesselsAoAneurysmSub;
var isBif = ChbAbdomenVesselsAoAneurysmBif;
var AbdomenVesselAnDia = document.getElementById("AbdomenVesselAnDia");

if (isSupra || isSub || isBif) {
    aneurysmText += "Aneurysma ";
    if (isSupra) aneurysmText += "suprarenální aorty";
    if (isSub) aneurysmText += (isSupra ? " a " : "") + "subrenální aorty";
    if (isBif) aneurysmText += ((isSupra || isSub) ? " a " : "") + "bifurkace přecházející na ilické tepny";

    if (AneurysmDiameter !== "") {
        aneurysmText += " diametru " + AneurysmDiameter + " mm. ";
    } else {
        aneurysmText += ". ";
    }
    AbdomenVesselAnDia.classList.remove("hidden");
} else {
    AbdomenVesselAnDia.classList.add("hidden");
}

AbdomenVesselsText = aneurysmText;
AbdomenVesselsRes = aneurysmText;

var arteries = [];

if (ChbAbdomenVesselsASAortaCH && ChbAbdomenVesselsASAortaA) {
    arteries.push("hrudní i břišní aorty");
} else {
    if (ChbAbdomenVesselsASAortaCH) arteries.push("hrudní aorty");
    if (ChbAbdomenVesselsASAortaA) arteries.push("břišní aorty");
}

if (ChbAbdomenVesselsASIliacComR && ChbAbdomenVesselsASIliacComL) {
    arteries.push("společných ilik");
} else {
    if (ChbAbdomenVesselsASIliacComR) arteries.push("společné iliky vpravo");
    if (ChbAbdomenVesselsASIliacComL) arteries.push("společné iliky vlevo");
}

if (ChbAbdomenVesselsASIliacExtR && ChbAbdomenVesselsASIliacExtL) {
    arteries.push("zevních ilik");
} else {
    if (ChbAbdomenVesselsASIliacExtR) arteries.push("zevní iliky vpravo");
    if (ChbAbdomenVesselsASIliacExtL) arteries.push("zevní iliky vlevo");
}

if (ChbAbdomenVesselsASFemR && ChbAbdomenVesselsASFemL) {
    arteries.push("femorálních tepen");
} else {
    if (ChbAbdomenVesselsASFemR) arteries.push("femorální tepny vpravo");
    if (ChbAbdomenVesselsASFemL) arteries.push("femorální tepny vlevo");
}

if (arteries.length > 0) {
    var arteryText = arteries.length > 2 ? arteries.slice(0, -2).join(", ") + ", " + arteries.slice(-2).join(" a ") : arteries.join(" a ");
    AbdomenVesselsText += "Aterosklerotické změny " + arteryText + ". ";
}

if (AbdomenVesselsOther.length > 0) {
    AbdomenVesselsText += AbdomenVesselsOther;
}


//Abdomen Organs Combine

AbdomenOrgansText = AbdomenLiverText + " " + AbodomenGallbladderText + " " + AbdomenSpleenText + " " + AbdomenStomachText + " " + AbdomenPancreasText + " " + AbdomenAdrenalText + " " + AbdomenKidneysText + " " + AbdomenColonText + " " + AbdomenBladderText + " " + 
					AbdomenUterusText + " " + AbdomenOvariesText + " " + AbdomenProstateText;



// Abdomen Other Organs Ok or Not

//Others by priority
var AbdomenOther1Priority = ""; var AbdomenOther1NoPriority = ""; var AbdomenOther1ResPriority = "";
var AbdomenOther1Pop = document.getElementById("AbdomenOther1Pop").value;
var AbdomenOther1Res = document.getElementById("AbdomenOther1Res").value;
if (AbdomenOther1Pop !== "" && AbdomenOther1Res ==="") {AbdomenOther1Priority = ""; AbdomenOther1NoPriority = AbdomenOther1Pop + ". "; AbdomenOther1ResPriority = "";
	} else if (AbdomenOther1Pop !== "" && AbdomenOther1Res !=="") {AbdomenOther1Priority = AbdomenOther1Pop  + ". "; AbdomenOther1NoPriority = ""; AbdomenOther1ResPriority = AbdomenOther1Res  + ". ";}


if (AbdomenOrgansText.trim() === "" && AbdomenOther1Priority === "") {
    POPAbdomenOrgansOk = "Orgány dutiny břišní jsou bez výraznější patologie. ";
} else if (((AbdomenOrgansText.split(',').length - 1) < 5) || AbdomenOther1Priority !== "") {
    POPAbdomenOrgansOk = "Jinak jsou orgány dutiny břišní bez výraznější patologie. ";
} else {
	POPAbdomenOrgansOk = "";
}

// Abdomen native or not

if (checkViability(POPAbdomenLymphNode1 || POPAbdomenLesion1 || POPAbdomenLesion2 || POPAbdomenLesion3)) {
  POPAbdomenNative = "";
  POPAbdomenElse = "Jinde se patologická hypermetabolická ložiska nezobrazují. ";
} else {
  POPAbdomenNative = "Není přítomen patologický hyperakumulující fokus, ložisko či lymfadenopatie. ";
  POPAbdomenElse = "";
}


// SKELETON

// Skeleton Lesion1

let codeForSkeletonLesion1 = `

var SkeletonLesion1Locationtext = "";

if (document.getElementById('Chb1SkeletonAll').checked) {
    SkeletonLesion1Locationtext += "skeletu";
}

    if (document.getElementById('Chb1SkeletCalvaR').checked && document.getElementById('Chb1SkeletCalvaL').checked) {
        SkeletonLesion1Locationtext += "kalvy bilat.";
    } else if (document.getElementById('Chb1SkeletCalvaR').checked) {
        SkeletonLesion1Locationtext += "kalvy vpravo";
    } else if (document.getElementById('Chb1SkeletCalvaL').checked) {
        SkeletonLesion1Locationtext += "kalvy vlevo";
    }

    var vertebra = [];
    if (document.getElementById('Chb1SkeletVertebraC').checked) vertebra.push("C");
    if (document.getElementById('Chb1SkeletVertebraT').checked) vertebra.push("T");
    if (document.getElementById('Chb1SkeletVertebraL').checked) vertebra.push("L");
    if (vertebra.length > 0) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "obratlů " + vertebra.join(", ") + " páteře";
    }

    if (document.getElementById('Chb1SkeletClavicleR').checked && document.getElementById('Chb1SkeletClavicleL').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "klavikuly bilat.";
    } else if (document.getElementById('Chb1SkeletClavicleR').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "klavikuly vpravo";
    } else if (document.getElementById('Chb1SkeletClavicleL').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "klavikuly vlevo";
    }

    if (document.getElementById('Chb1SkeletScapulaR').checked && document.getElementById('Chb1SkeletScapulaL').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "scapuly bilat.";
    } else if (document.getElementById('Chb1SkeletScapulaR').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "scapuly vpravo";
    } else if (document.getElementById('Chb1SkeletScapulaL').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "scapuly vlevo";
    }

    if (document.getElementById('Chb1SkeletSternum').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "sterna";
    }


    if (document.getElementById('Chb1SkeletHumerusR').checked && document.getElementById('Chb1SkeletHumerusL').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "prox. humeru bilat.";
    } else if (document.getElementById('Chb1SkeletHumerusR').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "prox. humeru vpravo";
    } else if (document.getElementById('Chb1SkeletHumerusL').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "prox. humeru vlevo";
    }

    if (document.getElementById('Chb1SkeletRibsR').checked && document.getElementById('Chb1SkeletRibsL').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "žeber bilat.";
    } else if (document.getElementById('Chb1SkeletRibsR').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "žeber vpravo";
    } else if (document.getElementById('Chb1SkeletRibsL').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "žeber vlevo";
    }

    if (document.getElementById('Chb1SkeletSacrumR').checked && document.getElementById('Chb1SkeletSacrumL').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "sakra";
    } else if (document.getElementById('Chb1SkeletSacrumR').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "sakra vpravo";
    } else if (document.getElementById('Chb1SkeletSacrumL').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "sakra vlevo";
    }

    if (document.getElementById('Chb1SkeletIliumR').checked && document.getElementById('Chb1SkeletIliumL').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "kyčelní kosti bilat.";
    } else if (document.getElementById('Chb1SkeletIliumR').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "kyčelní kosti vpravo";
    } else if (document.getElementById('Chb1SkeletIliumL').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "kyčelní kosti vlevo";
    }

    if (document.getElementById('Chb1SkeletPubisR').checked && document.getElementById('Chb1SkeletPubisL').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "stydké kosti bilat.";
    } else if (document.getElementById('Chb1SkeletPubisR').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "stydké kosti vpravo";
    } else if (document.getElementById('Chb1SkeletPubisL').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "stydké kosti vlevo";
    }

    if (document.getElementById('Chb1SkeletIschiumR').checked && document.getElementById('Chb1SkeletIschiumL').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "sedací kosti bilat.";
    } else if (document.getElementById('Chb1SkeletIschiumR').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "sedací kosti vpravo";
    } else if (document.getElementById('Chb1SkeletIschiumL').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "sedací kosti vlevo";
    }

    if (document.getElementById('Chb1SkeletFemurR').checked && document.getElementById('Chb1SkeletFemurL').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "prox. femurů bilat.";
    } else if (document.getElementById('Chb1SkeletFemurR').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "prox. femuru vpravo";
    } else if (document.getElementById('Chb1SkeletFemurL').checked) {
        SkeletonLesion1Locationtext += (SkeletonLesion1Locationtext ? ", " : "") + "prox. femuru vlevo";
    }

var arr = SkeletonLesion1Locationtext.split(", ");
    if (arr.length > 1) {
        SkeletonLesion1Locationtext = arr.slice(0, arr.length - 1).join(", ") + " a " + arr[arr.length - 1];
    }

    document.getElementById('SkeletonLesion1Location').value = SkeletonLesion1Locationtext;


// Skeleton lesion1 popis

var SkeletonLesion1Button = document.getElementById("SkeletonLesion1");
var SkeletonLesion1typeRaw = document.getElementById("SkeletonLesion1type").value.trim();
var SkeletonLesion1number = document.getElementById("SkeletonLesion1number").value;
var SkeletonLesion1type = (SkeletonLesion1number && SkeletonLesion1number !== "") ? (pluralForms[SkeletonLesion1typeRaw] || SkeletonLesion1typeRaw) : SkeletonLesion1typeRaw;
var SkeletonLesion1Location = document.getElementById("SkeletonLesion1Location").value;
var SkeletonLesion1AddLocation = document.getElementById("SkeletonLesion1AddLocation").value;
var SkeletonLesion1Loclargest = document.getElementById("SkeletonLesion1Loclargest").value;
document.getElementById('SkeletonLesion1number').addEventListener('change', () => document.getElementById('SkeletonLesion1Large').classList.toggle('hidden', document.getElementById('SkeletonLesion1number').value === ""));
var SkeletonLesion1Activity = document.getElementById("SkeletonLesion1Activity").value;
var SkeletonLesion1ActivityCopy = SkeletonLesion1Activity;
var selectedOption = document.getElementById("SkeletonLesion1Activity").selectedOptions[0];
var SkeletonLesion1RESActivityRPH = selectedOption.dataset.valueRPH || '';
var SkeletonLesion1RESActivityFDG = selectedOption.dataset.valueFDG || '';
var SkeletonLesion1SUV = formatSUV("SkeletonLesion1SUV");
var SkeletonLesion1Size = formatLesionSize("SkeletonLesion1Size");
var SkeletonLesion1RESDecision = document.getElementById("SkeletonLesion1Decision").value;
document.getElementById("DateCompare").addEventListener('change', () => document.getElementById("SkeletonLesion1Previous").classList.toggle("hidden", !document.getElementById("DateCompare").value));
var SkeletonLesion1SUVPrev = formatSUV("SkeletonLesion1SUVPrev");
var SkeletonLesion1PrevSize = formatLesionSize("SkeletonLesion1PrevSize");
var SkeletonLesion1ComparisonText = generateComparisonText(SkeletonLesion1SUVPrev, SkeletonLesion1PrevSize, DateComparison, SkeletonLesion1SUV, SkeletonLesion1Size);
var SkeletonLesion1ComparisonSUVRes = compareActRES(SkeletonLesion1SUV, SkeletonLesion1SUVPrev);
var SkeletonLesion1ComparisonSizeRes = compareSizes(SkeletonLesion1Size, SkeletonLesion1PrevSize);
var SkeletonLesion1CombinedResult = combineComparisonResults(SkeletonLesion1ComparisonSizeRes, SkeletonLesion1ComparisonSUVRes, SkeletonLesion1number);
var SkeletonLesion1ActivityAdd = checkSmallSize(SkeletonLesion1Size, SkeletonLesion1SUV);
var SkeletonLesion1AllLocations = (SkeletonLesion1Location + " " + SkeletonLesion1AddLocation).trim();

if (SkeletonLesion1Loclargest !== "") { SkeletonLesion1Loclargest = SkeletonLesion1ActivityCopy + ", největší " + SkeletonLesion1Loclargest + " "; SkeletonLesion1Activity = ""; }
if (SkeletonLesion1number !== "" && SkeletonLesion1Loclargest === "") {
  SkeletonLesion1Size = SkeletonLesion1Size.replace("diametru ", "diametru až ").replace("rozměru ", "rozměru až ");
  SkeletonLesion1ComparisonText = SkeletonLesion1ComparisonText.replace("diametru ", "diametru až ").replace("rozměru ", "rozměru až ");
}

var processedSentencePOPSkeletonLesion1 = processSentence(SkeletonLesion1number + " " + SkeletonLesion1type);
var POPSkeletonLesion1 = processedSentencePOPSkeletonLesion1 + " " + SkeletonLesion1AllLocations + " " + SkeletonLesion1Loclargest + " " + SkeletonLesion1Size + " " + SkeletonLesion1Activity + " " + SkeletonLesion1ComparisonText + ".";
var processedSentenceRESSkeletonLesionFDG = processSentence(SkeletonLesion1number + " " + SkeletonLesion1RESActivityFDG + " " + SkeletonLesion1type);
var processedSentenceRESSkeletonLesionRPH = processSentence(SkeletonLesion1number + " " + SkeletonLesion1type);
var RESSkeletonLesion1 = (buttonElementPETType.value === "FDG")
  ? processedSentenceRESSkeletonLesionFDG + " " + SkeletonLesion1AllLocations + " " + SkeletonLesion1CombinedResult + " " + SkeletonLesion1RESDecision + " " + SkeletonLesion1ActivityAdd + "."
  : processedSentenceRESSkeletonLesionRPH + " " + SkeletonLesion1AllLocations + " " + SkeletonLesion1RESActivityRPH + " " + SkeletonLesion1CombinedResult + " " + SkeletonLesion1RESDecision + " " + SkeletonLesion1ActivityAdd + ".";


if (SkeletonLesion1RESDecision.includes("meta") && SkeletonLesion1type.includes("ožisk")) {RESSkeletonLesion1 = RESSkeletonLesion1.replace(/ložisk/g, "meta ložisk").replace(/Ložisk/g, "Meta ložisk").replace(": charakteru meta", ".");}
if (SkeletonLesion1RESDecision.includes("tumor") && SkeletonLesion1type.includes("ožisk")) {RESSkeletonLesion1 = RESSkeletonLesion1.replace(/ložisk/g, "tumorózní ložisk").replace(/Ložisk/g, "Tumorózní ložisk").replace(": charakteru tumoru", ".");}
if (SkeletonLesion1CombinedResult.includes("je nově") || SkeletonLesion1CombinedResult.includes("jsou nově")) { RESSkeletonLesion1 = "Nově " + RESSkeletonLesion1.charAt(0).toLowerCase() + RESSkeletonLesion1.substring(1) ; RESSkeletonLesion1 = RESSkeletonLesion1.replace(" je nově", "").replace(" jsou nově", "");}

if (SkeletonLesion1Location ==="" && SkeletonLesion1AddLocation ==="") {POPSkeletonLesion1 = ""; RESSkeletonLesion1 = "";}

`;

let codeForSkeletonLesion2 = codeForSkeletonLesion1.replace(/Lesion1/g, 'Lesion2').replace(/Chb1/g, 'Chb2');
let codeForSkeletonLesion3 = codeForSkeletonLesion1.replace(/Lesion1/g, 'Lesion3').replace(/Chb1/g, 'Chb3');
eval(codeForSkeletonLesion1);
eval(codeForSkeletonLesion2);
eval(codeForSkeletonLesion3);

// Skeleton OTHERS

// surgery
var SkeletonSurgeryText = "";

var ChbSkeletSurgSternum = document.getElementById("ChbSkeletSurgSternum").checked;
var ChbSkeletSurgVertC = document.getElementById("ChbSkeletSurgVertC").checked; var ChbSkeletSurgVertT = document.getElementById("ChbSkeletSurgVertT").checked; var ChbSkeletSurgVertL = document.getElementById("ChbSkeletSurgVertL").checked;
var ChbSkeletSurgTEPR = document.getElementById("ChbSkeletSurgTEPR").checked; var ChbSkeletSurgTEPL = document.getElementById("ChbSkeletSurgTEPL").checked;
var SkeletSurgOther = document.getElementById("SkeletSurgOther").value.trim();

if (ChbSkeletSurgSternum) SkeletonSurgeryText += "Cerkláž sterna. ";

if (ChbSkeletSurgVertC) SkeletonSurgeryText += "Přední stabilizace Cp. ";
if (ChbSkeletSurgVertT) SkeletonSurgeryText += "Zadní stabilizace Thp. ";
if (ChbSkeletSurgVertL) SkeletonSurgeryText += "Zadní stabilizace Lp. ";

if (ChbSkeletSurgTEPR && ChbSkeletSurgTEPL) {SkeletonSurgeryText += "TEP obou kyčlí. ";
} else {
    if (ChbSkeletSurgTEPR) SkeletonSurgeryText += "TEP pravé kyčle. ";
    if (ChbSkeletSurgTEPL) SkeletonSurgeryText += "TEP levé kyčle. ";
}

if (SkeletSurgOther) SkeletonSurgeryText += SkeletSurgOther + ". ";

// softtissues
var SkeletonSoftTissueText = "";

var ChbSkeletInjGlut = document.getElementById("ChbSkeletInjGlut").checked;
var ChbSkeletInjAbd = document.getElementById("ChbSkeletInjAbd").checked;
var SkeletSoftTissueOther = document.getElementById("SkeletSoftTissueOther").value.trim();

if (ChbSkeletInjGlut && ChbSkeletInjAbd) {SkeletonSoftTissueText += "V podkoží hýžďové i břišní krajiny infiltráty s mírně zvýšenou akumulací RF v.s. postinjekční.  ";
} else {
    if (ChbSkeletInjGlut) SkeletonSoftTissueText += "V podkoží hýžďové krajiny infiltráty s mírně zvýšenou akumulací RF v.s. postinjekční. ";
    if (ChbSkeletInjAbd) SkeletonSoftTissueText += "V podkoží krajiny břišní infiltráty s mírně zvýšenou akumulací RF v.s. postinjekční. ";
}

if (SkeletSoftTissueOther) SkeletonSoftTissueText += SkeletSoftTissueOther + ". ";

// activity

var SkeletonActivityText = ""; var SkeletonActivityRes = "";

var ChbSkeletonActivityPlus = document.getElementById("ChbSkeletonActivityPlus").checked;
var ChbSkeletonActivityMinus = document.getElementById("ChbSkeletonActivityMinus").checked;
var buttonSkeletonEnostosisText = document.getElementById("ChbSkeletonEnostosis").innerText;
var SkeletonActivityOther = document.getElementById("SkeletonActivityOther").value.trim();

updateButtonTexts({
            'ChbSkeletonEnostosis': ['0', '+', '++']
        });

if (ChbSkeletonActivityPlus) SkeletonActivityText += "Difuzně zvýšená metabolická aktivita v kostní dřeni. ";
if (ChbSkeletonActivityMinus) SkeletonActivityText += "Lokální absence akumulace RF v kostní dřeni ozářené oblasti. ";  

if (buttonSkeletonEnostosisText === "+") {
    SkeletonActivityText +=("Drobná enostóza bez zvýšené akumulace RF.");
} else if (buttonSkeletonEnostosisText === "++") {
    SkeletonActivityText +=("Drobné enostózy bez zvýšené akumulace RF.");
}

if (SkeletonActivityOther) SkeletonActivityText += SkeletonActivityOther + ". ";


// trauma

var SkeletonTraumaText = ""; var SkeletonTraumaRecentText = ""; var SkeletonTraumaOlderText = ""; var SkeletonTraumaRecentRes = "";

var ChbSkeletTraumaRecent = document.getElementById("ChbSkeletTraumaRecent").checked;
var SkeletTraumaRecentOther = document.getElementById("SkeletTraumaRecentOther").value.trim();
var ChbSkeletTraumaOlder = document.getElementById("ChbSkeletTraumaOlder").checked;
var SkeletTraumaOlderOther = document.getElementById("SkeletTraumaOlderOther").value.trim();
var SkeletTraumaNew = document.getElementById("SkeletTraumaNew");
var SkeletTraumaOld = document.getElementById("SkeletTraumaOld");

if (ChbSkeletTraumaRecent) {
    SkeletTraumaNew.classList.remove("hidden");
} else {
    SkeletTraumaNew.classList.add("hidden");
}

if (ChbSkeletTraumaOlder) {
    SkeletTraumaOld.classList.remove("hidden");
} else {
    SkeletTraumaOld.classList.add("hidden");
}

if (SkeletTraumaRecentOther) SkeletonTraumaRecentText = "Potraumatické změny " + SkeletTraumaRecentOther + " se zvýšenou akumulací RF (recentní). ";
if (SkeletTraumaOlderOther) SkeletonTraumaOlderText = "Potraumatické změny " + SkeletTraumaOlderOther + " bez zvýšené akumulace RF (staršího data). ";

if (ChbSkeletTraumaRecent && SkeletTraumaRecentOther !== "") {SkeletonTraumaRecentRes = "Zvýšená metabolická aktivita " + SkeletTraumaRecentOther + " na podkladu recentních traumatických změn. ";}

SkeletonTraumaText = SkeletonTraumaRecentText + SkeletonTraumaOlderText;

// degener
var SkeletonDegenerText = "";

var ChbSkeletDegenerVertC = document.getElementById("ChbSkeletDegenerVertC").checked;
var ChbSkeletDegenerVertT = document.getElementById("ChbSkeletDegenerVertT").checked;
var ChbSkeletDegenerVertL = document.getElementById("ChbSkeletDegenerVertL").checked;
var ChbSkeletDegenerShoulderR = document.getElementById("ChbSkeletDegenerShoulderR").checked;
var ChbSkeletDegenerShoulderL = document.getElementById("ChbSkeletDegenerShoulderL").checked;
var ChbSkeletDegenerHipR = document.getElementById("ChbSkeletDegenerHipR").checked;
var ChbSkeletDegenerHipL = document.getElementById("ChbSkeletDegenerHipL").checked;
var SkeletDegenerOther = document.getElementById("SkeletDegenerOther").value.trim();

var descriptionsSkeleton = [];

if (ChbSkeletDegenerVertC && ChbSkeletDegenerVertT && ChbSkeletDegenerVertL) {
  descriptionsSkeleton.push("celé páteře");
  } else {
    if (ChbSkeletDegenerVertC) descriptionsSkeleton.push("C páteře");
    if (ChbSkeletDegenerVertT) descriptionsSkeleton.push("T páteře");
    if (ChbSkeletDegenerVertL) descriptionsSkeleton.push("L páteře");
  }

if (ChbSkeletDegenerShoulderR && ChbSkeletDegenerShoulderL) {
  descriptionsSkeleton.push("obou ramenních kloubů");
  } else {
    if (ChbSkeletDegenerShoulderR) descriptionsSkeleton.push("pravého ramenního kloubu");
    if (ChbSkeletDegenerShoulderL) descriptionsSkeleton.push("levého ramenního kloubu");
  }

if (ChbSkeletDegenerHipR && ChbSkeletDegenerHipL) {
  descriptionsSkeleton.push("obou kyčelních kloubů");
  } else {
    if (ChbSkeletDegenerHipR) descriptionsSkeleton.push("pravého kyčelního kloubu");
    if (ChbSkeletDegenerHipL) descriptionsSkeleton.push("levého kyčelního kloubu");
  }

if (SkeletDegenerOther) descriptionsSkeleton.push(SkeletDegenerOther);

if (descriptionsSkeleton.length > 1) {
  SkeletonDegenerText = "Pokročilé degenerativní změny " + descriptionsSkeleton.slice(0, -1).join(", ") + ", " + descriptionsSkeleton.slice(-1) + ". ";
} else {
  SkeletonDegenerText = descriptionsSkeleton.length ? "Pokročilé degenerativní změny " + descriptionsSkeleton[0] + ". " : "";
}

// Joints activity

var SkeletonJointsText = ""; var SkeletonJointsRes = "";

var ChbSkeletJointsSCR = document.getElementById("ChbSkeletJointsSCR").checked;
var ChbSkeletJointsSCL = document.getElementById("ChbSkeletJointsSCL").checked;
var ChbSkeletJointsACR = document.getElementById("ChbSkeletJointsACR").checked;
var ChbSkeletJointsACL = document.getElementById("ChbSkeletJointsACL").checked;
var ChbSkeletJointsShoulderR = document.getElementById("ChbSkeletJointsShoulderR").checked;
var ChbSkeletJointsShoulderL = document.getElementById("ChbSkeletJointsShoulderL").checked;
var ChbSkeletJointsVertC = document.getElementById("ChbSkeletJointsVertC").checked;
var ChbSkeletJointsVertT = document.getElementById("ChbSkeletJointsVertT").checked;
var ChbSkeletJointsVertL = document.getElementById("ChbSkeletJointsVertL").checked;
var ChbSkeletJointsHipR = document.getElementById("ChbSkeletJointsHipR").checked;
var ChbSkeletJointsHipL = document.getElementById("ChbSkeletJointsHipL").checked;
var ChbSkeletJointsIschR = document.getElementById("ChbSkeletJointsIschR").checked;
var ChbSkeletJointsIschL = document.getElementById("ChbSkeletJointsIschL").checked;
var ChbSkeletJointsSymR = document.getElementById("ChbSkeletJointsSymR").checked;
var ChbSkeletJointsPolyMyaR = document.getElementById("ChbSkeletJointsPolyMyaR").checked;
var SkeletJointsOther = document.getElementById("SkeletJointsOther").value.trim();

var descriptionsJoints = [];

if (ChbSkeletJointsSCR && ChbSkeletJointsSCL) {
  descriptionsJoints.push("obou sternoklavikulárních kloubů");
} else {
  if (ChbSkeletJointsSCR) descriptionsJoints.push("pravého sternoklavikulárního kloubu");
  if (ChbSkeletJointsSCL) descriptionsJoints.push("levého sternoklavikulárního kloubu");
}

if (ChbSkeletJointsACR && ChbSkeletJointsACL) {
  descriptionsJoints.push("obou akromioklavikulárních kloubů");
} else {
  if (ChbSkeletJointsACR) descriptionsJoints.push("pravého akromioklavikulárního kloubu");
  if (ChbSkeletJointsACL) descriptionsJoints.push("levého akromioklavikulárního kloubu");
}

if (ChbSkeletJointsShoulderR && ChbSkeletJointsShoulderL) {
  descriptionsJoints.push("obou ramenních kloubů");
} else {
  if (ChbSkeletJointsShoulderR) descriptionsJoints.push("pravého ramenního kloubu");
  if (ChbSkeletJointsShoulderL) descriptionsJoints.push("levého ramenního kloubu");
}

if (ChbSkeletJointsVertC && ChbSkeletJointsVertT && ChbSkeletJointsVertL) {
  descriptionsJoints.push("interspinózních prostor C, T i L páteře");
} else {
  if (ChbSkeletJointsVertC) descriptionsJoints.push("krční interspinózně  ");
  if (ChbSkeletJointsVertT) descriptionsJoints.push("hrudní interspinózně");
  if (ChbSkeletJointsVertL) descriptionsJoints.push("bederní interspinózně");
}

if (ChbSkeletJointsHipR && ChbSkeletJointsHipL) {
  descriptionsJoints.push("obou kyčelních kloubů");
} else {
  if (ChbSkeletJointsHipR) descriptionsJoints.push("pravého kyčelního kloubu");
  if (ChbSkeletJointsHipL) descriptionsJoints.push("levého kyčelního kloubu");
}

if (ChbSkeletJointsIschR && ChbSkeletJointsIschL) {
  descriptionsJoints.push("obou sedacích kostí");
} else {
  if (ChbSkeletJointsIschR) descriptionsJoints.push("pravé sedací kosti");
  if (ChbSkeletJointsIschL) descriptionsJoints.push("levé sedací kosti");
}

if (ChbSkeletJointsSymR) descriptionsJoints.push("symfýzy");

if (SkeletJointsOther) descriptionsJoints.push(SkeletJointsOther);

if (descriptionsJoints.length > 1) {
  SkeletonJointsText = "Zvýšená akumulace RF v oblastech " + descriptionsJoints.slice(0, -1).join(", ") + " a " + descriptionsJoints.slice(-1) + " v rámci degenerativních / zánětlivých změn. ";
} else {
  SkeletonJointsText = descriptionsJoints.length ? "Zvýšená akumulace RF v oblasti " + descriptionsJoints[0] + " v rámci degenerativních / zánětlivých změn. " : "";
}

if (ChbSkeletJointsPolyMyaR) {SkeletonJointsText = "Zvýšená akumulace RF v oblastech, ramenních, SC, AC, kyčelních kloubech, při symfýze, velkých trochanterech, interpsinózně."; 
								SkeletonJointsRes = "Zvýšená metabolická aktivita v mnohočetných kloubních lokalizacích a při šlachových úponech v rámci burzitis, entezitis a synovitis: v.s. v rámci polymyalgia rheumatica.";}



//Others by priority
var SkeletonOther1Priority = ""; var SkeletonOther1NoPriority = ""; var SkeletonOther1ResPriority = "";
var SkeletonOther1Pop = document.getElementById("SkeletonOther1Pop").value;
var SkeletonOther1Res = document.getElementById("SkeletonOther1Res").value;
if (SkeletonOther1Pop !== "" && SkeletonOther1Res ==="") {SkeletonOther1Priority = ""; SkeletonOther1NoPriority = SkeletonOther1Pop + ". "; SkeletonOther1ResPriority = "";
	} else if (SkeletonOther1Pop !== "" && SkeletonOther1Res !=="") {SkeletonOther1Priority = SkeletonOther1Pop  + ". "; SkeletonOther1NoPriority = ""; SkeletonOther1ResPriority = SkeletonOther1Res  + ". ";}


// Skeleton native or not

if (checkViability(POPSkeletonLesion1 || POPSkeletonLesion2 || POPSkeletonLesion3)) {
  POPSkeletonNative = "";
  POPSkeletonElse = "Jinde se patologická hypermetabolická ložiska nezobrazují. ";
} else {
  POPSkeletonNative = "Není přítomen patologický hyperakumulující fokus či ložisko. ";
  POPSkeletonElse = "";
}


//Latest examination comparison
if (DateCompare === "") {ExamCompareText = ""; POPExamCompareText = "";} else {ExamCompareText = "Oproti vyšetření z " + DateComparison + ":"; POPExamCompareText = "Srovnáno s vyšetřením z " + DateComparison + ". ";}

//ReferenceText

var ReferenceText = "";
var SUVLiver = document.getElementById("SUVLiver").value;
var SUVParotid = document.getElementById('SUVParotid').value;

if (buttonElementPETType.value === "FDG" && SUVLiver !== "") {
    ReferenceText = "Akumulace RF vztažena k referenčním játrům.";
  }
if (buttonElementPETType.value === "PSMA" && SUVLiver !== "" && SUVParotid !== "") {
    ReferenceText = "Akumulace RF vztažena k referenčním játrům a parotidám.";
  }
if (buttonElementPETType.value === "DOTATOC" && SUVLiver !== "" && SUVParotid !== "") {
    ReferenceText = "Akumulace RF vztažena k referenčním játrům a slezině.";
  }
if (buttonElementPETType.value === "DOPA" && SUVLiver !== "" && SUVParotid !== "") {
    ReferenceText = "Akumulace RF vztažena k referenčním játrům.";
  }  

	
// POPIS

PETCTNAMEText.value = nazev;

PETCTINDText.value = indikace; document.getElementById("indikace").addEventListener("input", updateTexts);

var POPREMINDER = document.getElementById("REMINDER").value; document.getElementById("REMINDER").addEventListener("input", updateTexts);
    if (POPREMINDER.trim() !== "") {
        POPREMINDER = "DOPLNIT: " + POPREMINDER;
    } 

var POPText = document.getElementById("POPText"); 
	
POPText.value = 
POPExamCompareText + "\n" +
"Hlava/krk: " + 
POPNeckNative + " " + 
POPNeckLesion1 + " " + 
POPNeckLesion2 + " " + 
POPNeckLesion3 + " " + 
POPNeckLymphNode1 + " " + 
POPNeckElse + " " + 
NeckOther1Priority + " " + NeckVCordsText + " " + HeadTonsilsText + " " + HeadTeethText  + " " + NeckParotidText + " " + NeckThyroidText + " " + NeckTreatmentText + " " + HeadMaxSinusText + " " + NeckOther1NoPriority + "\n" +
"Hrudník: " + 
POPThoraxNative + " " + 
POPThoraxLesion1 + " " + 
POPThoraxLesion2 + " " + 
POPThoraxLesion3 + " " + 
ThoraxLymphNodePlusText + " " + 
POPThoraxLymphNode1 + " " + 
POPThoraxElse + " " + 
ThoraxOther1Priority + " " +  ThoraxParenchymaText + " " + POPThoraxLungOk + " " + ThoraxFluidText + " " + ThoraxOesophText + " " + ThoraxMammaText + " " + ThoraxThymusText + " " + ThoraxHeartText + " " + ThoraxDevicesText + " " + ThoraxEmbolisationText + " " + ThoraxOther1NoPriority + "\n" +
"Břicho: " + 
POPAbdomenNative + " " + 
POPAbdomenLesion1 + " " + 
POPAbdomenLesion2 + " " + 
POPAbdomenLesion3 + " " + 
POPAbdomenLymphNode1 + " " + 
POPAbdomenElse + " " + 
AbdomenOther1Priority + " " + AbdomenOrgansText + " " + POPAbdomenOrgansOk + " " + AbdomenOther1NoPriority + " " + AbdomenFluidText + " " + AbdomenTestesText + " " + AbdomenWallText + " " + AbdomenVesselsText + "\n" +
"Skelet a měkké tkáně: " + 
POPSkeletonNative + " " + 
POPSkeletonLesion1 + " " + 
POPSkeletonLesion2 + " " + 
POPSkeletonLesion3 + " " + 
POPSkeletonElse + " " + 
SkeletonOther1Priority + " " + SkeletonActivityText + " " + SkeletonJointsText + " " + SkeletonTraumaText + " " + SkeletonSurgeryText + " " + SkeletonDegenerText + " " + SkeletonOther1NoPriority + " " + SkeletonSoftTissueText + "\n" +			
ObecneTexts + " " + ObecneNativeText + " " + ReferenceText;


	POPText.value = POPText.value.replace(/^\s+/gm, '');  // odstraní mezery na začátku řádek
	POPText.value = POPText.value.replace(/ {2,}/g, ' ');  // více mezer = jedna mezera
	POPText.value = POPText.value.replace(/^[.,\s]+/gm, '');  // odstraní tečku a čárku pokud jsou první na řádce
	POPText.value = POPText.value.replace(/ \./g, '.'); // mezera tečka = bez mezery tečka
	POPText.value = POPText.value.replace(/\.{2,}/g, '.'); // více teček = jedna tečka
	POPText.value = POPText.value.replace(/\s\)/g, ')');   // mezera závorka = jen závorka


	//  Modifikátor: nastaví "minule shodného obrazu", když má ložisko teď a minule stejná měření - nyní nefunkční
    let originalPOPText = POPText.value;
    let regex = /\((minule[^)]+)\)/g;
    let correctedPOPText = originalPOPText;
    let matches;
    let replacements = [];

    while ((matches = regex.exec(originalPOPText)) !== null) {
        let fullMinuleText = matches[0];
        let minuleContent = matches[1].trim().substring(6).trim();
        let textBeforeMinule = originalPOPText.substring(0, matches.index).trim();

        if (textBeforeMinule.endsWith(minuleContent)) {
            replacements.push({
                oldText: fullMinuleText,
                newText: "(minule shodného obrazu)"
            });
        }
    }

    replacements.forEach(replacement => {
        correctedPOPText = correctedPOPText.replace(replacement.oldText, replacement.newText);
    });

    POPText.value = correctedPOPText;

	// když DOTATOC nebo RPH, změna popisu akumulace Parotid nebo sleziny
	if (buttonElementPETType.value === "PSMA") {
        POPText.value = POPText.value.replace(/>> ref. játra/g, '> ref. parotidy');
    }
	
	if (buttonElementPETType.value === "DOTATOC") {
        POPText.value = POPText.value.replace(/>> ref. játra/g, '> ref. slezina');
    }
	
	if (buttonElementPETType.value === "DOPA") {
        POPText.value = POPText.value.replace(/>> ref. játra/g, '> ref. slezina');
    }


// ZÁVĚR

//checking jestli bez známek přítomnosti nebo ne
let variablesToCheck = [
    RESNeckLesion1, RESNeckLesion2, RESNeckLesion3, RESNeckLymphNode1,
    RESThoraxLesion1, RESThoraxLesion2, RESThoraxLesion3, RESThoraxLymphNode1,
    RESAbdomenLesion1, RESAbdomenLesion2, RESAbdomenLesion3, RESAbdomenLymphNode1,
    RESSkeletonLesion1, RESSkeletonLesion2, RESSkeletonLesion3
];

let bannedWords = ['suspektní', 'tumor',  'Tumor', 'meta ', 'Meta', 'charakteru', 'neoplaz', 'nespecifický'];

function containsBannedWord(str) {
    return bannedWords.some(bannedWord => str.includes(bannedWord));
}

let containsBanned = variablesToCheck.some(variable => variable && containsBannedWord(variable));
if (containsBanned) {
    RESTextNative = "";
} else {
    if (buttonElementPETType.value === "FDG") {
        RESTextNative = "Bez známek přítomnosti FDG-avidní neoplázie. ";
    } else if (buttonElementPETType.value === "PSMA") {
        RESTextNative = "Bez známek přítomnosti ložisek zvýšené exprese PSMA. ";
    } else if (buttonElementPETType.value === "DOTATOC") {
        RESTextNative = "Bez známek přítomnosti ložisek se zvýšeným nakupením somatostatinových receptorů. ";
	} else if (buttonElementPETType.value === "DOPA") {
        RESTextNative = "Bez známek přítomnosti ložisek se zvýšenou konzumpcí aminokyseliny. ";
    } else  {
        RESTextNative = ""; 
    }
}


// bez nových ložisek
var ChbNoNew = document.getElementById("ChbNoNew").checked;
var RESTextNoNew = "";
if (ChbNoNew) {RESTextNoNew = "Bez nových hypermetabolických patologických ložisek.";
} 

var RESText = document.getElementById("RESText"); 

RESText.value = 
RESTextNative + "\n" + 
ExamCompareText + "\n" + 
RESNeckLesion1 + "\n" +
RESNeckLesion2 + "\n" +
RESNeckLesion3 + "\n" +
RESNeckLymphNode1 + "\n" +
NeckOther1ResPriority + " " + NeckVCordsRes + "\n" +
RESThoraxLesion1 + "\n" +
RESThoraxLesion2 + "\n" +
RESThoraxLesion3 + "\n" +
RESThoraxLymphNode1 + "\n" +
ThoraxOther1ResPriority + "\n" +
ThoraxFluidFTRRes + ThoraxFluidFTLRes + ThoraxFluidFPRes + ThoraxEmbolisationRes + ThoraxThymusRes + "\n" +
RESAbdomenLesion1 + " " + 
RESAbdomenLesion2 + " " +
RESAbdomenLesion3 + " " +
RESAbdomenLymphNode1 + "\n" +
AbdomenOther1ResPriority + "\n" +
AbdomenProstateRes + "\n" +
AbdomenFluidRes + " " + 
AbdomenVesselsRes + "\n" +
RESSkeletonLesion1 + "\n" +
RESSkeletonLesion2 + "\n" +
RESSkeletonLesion3 + "\n" +
SkeletonTraumaRecentRes + "\n" +
SkeletonOther1ResPriority + "\n" +
SkeletonJointsRes + "\n" +
NeckThyroidRes + HeadTonsilsRes + "\n" +
RESTextNoNew + "\n" +
POPREMINDER
;


	RESText.value = RESText.value.replace(/^\s+/gm, '');  // odstraní mezery na začátku řádek
	RESText.value = RESText.value.replace(/ {2,}/g, ' ');  // více mezer = jedna mezera
	RESText.value = RESText.value.replace(/^[.,\s]+/gm, '');  // odstraní tečku a čárku pokud jsou první na řádce
	RESText.value = RESText.value.replace(/ \./g, '.'); // mezera tečka = bez mezery tečka
	RESText.value = RESText.value.replace(/\.{2,}/g, '.'); // více teček = jedna tečka
	RESText.value = RESText.value.replace(/ :/g, ':');  // odstraní mezeru před dvojtečkou
	
	//když je vybrán jiný RPH zněma závěru
	if (buttonElementPETType.value === "DOTATOC") {
        RESText.value = RESText.value.replace(/bez PSMA exprese/g, 'bez zvýšené koncentrace somatostatinových receptorů');
		RESText.value = RESText.value.replace(/PSMA expresí/g, 'koncentrací somatostatinových receptorů');
		RESText.value = RESText.value.replace(/metabolické/g, 'akumulační').replace(/metabolicky/g, 'akumulačně');
    }
	
	if (buttonElementPETType.value === "PSMA") {
        RESText.value = RESText.value.replace(/metabolické/g, 'akumulační').replace(/metabolicky/g, 'akumulačně');
    }

	if (buttonElementPETType.value === "DOPA") {
        RESText.value = RESText.value.replace(/bez PSMA exprese/g, 'bez zvýšené konzumpce aminokysliny');
		RESText.value = RESText.value.replace(/PSMA expresí/g, 'konzumpcí aminokyseliny');
		RESText.value = RESText.value.replace(/metabolické/g, 'akumulační').replace(/metabolicky/g, 'akumulačně');
    }

}
updateTexts();

