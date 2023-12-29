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

// strana

function updateBackgroundColor(index, buttonElement, color1 = "transparent", color2 = "#D4A29C") {
  buttonElement.style.backgroundColor = index === 0 ? color1 : color2;
}

var textsStrana = ["jakého?", "PRAVÉHO", "LEVÉHO"];
var buttonElementStrana = document.getElementById("StranaButton");
var indexStrana = 0;function cycleStranaText(event) {  indexStrana = cycleText(event, textsStrana, indexStrana, buttonElementStrana, updateBackgroundColor);}

function cycleStranaText(event) {  indexStrana = cycleText(event, textsStrana, indexStrana, buttonElementStrana);  updateTexts();}