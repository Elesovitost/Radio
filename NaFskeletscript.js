

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


// clickable texts Lesion1

let clickedOrderLesion1 = [];

const clickableTextsLesion1 = document.querySelectorAll('.NaFLocation');

clickableTextsLesion1.forEach(text => {
    text.addEventListener('click', function(event) {
        if (event.button === 0) { // Left-click
            if (this.classList.contains('mild')) {
                this.classList.remove('mild');
                clickedOrderLesion1 = clickedOrderLesion1.filter(item => item !== this.id);
            } else if (this.classList.contains('active')) {
                this.classList.remove('active');
                this.classList.add('mild');
            } else {
                this.classList.add('active');
            }
        }
        updateTexts();
    });

    text.addEventListener('contextmenu', function(event) {
        event.preventDefault(); // Prevent the default right-click menu from appearing
        if (event.button === 2) { // Right-click
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                clickedOrderLesion1 = clickedOrderLesion1.filter(item => item !== this.id);
            } else if (this.classList.contains('mild')) {
                this.classList.remove('mild');
                this.classList.add('active');
            } else {
                this.classList.add('mild');
            }
        }
        updateTexts();
    });
});


// new NaFskelet OTHERS 

document.getElementById('NaFskeletNewOther1').addEventListener('click', function() {
  var element = document.getElementById('NaFskeletOther1');
  element.classList.remove('hidden');  this.classList.add('toggleColorRed');
  updateTexts();
});

document.getElementById('NaFskeletNewOther1').addEventListener('contextmenu', function(event) {
  event.preventDefault(); 
  var element = document.getElementById('NaFskeletOther1');
  element.classList.add('hidden');  this.classList.remove('toggleColorRed');
  updateTexts();
});

document.getElementById('NaFskeletOther1no').addEventListener('click', function() {
  var element = document.getElementById('NaFskeletOther1');
  element.classList.add('hidden');
  var button = document.getElementById('NaFskeletNewOther1');
  button.classList.remove('toggleColorRed');
  updateTexts();
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

var copyPOP = document.getElementById('copyPOP');
var NaFPOPText = document.getElementById('NaFPOPText');

copyPOP.addEventListener('click', function() {
    navigator.clipboard.writeText(NaFPOPText.value)
    .then(() => {
        NaFPOPText.classList.add('highlight');

        setTimeout(function() {
            NaFPOPText.classList.remove('highlight');
        }, 100);
    })
    .catch(err => {
    });
});



var copyRES = document.getElementById('copyRES');
var NaFRESText = document.getElementById('NaFRESText');

copyRES.addEventListener('click', function() {
    navigator.clipboard.writeText(NaFRESText.value)
    .then(() => {
        NaFRESText.classList.add('highlight');

        setTimeout(function() {
            NaFRESText.classList.remove('highlight');
        }, 100);
    })
    .catch(err => {
    });
});