const RTGtexts = {
    copyRTGChest: "RTG hrudníku - PA vstoje\n\nPlíce: rozvinuté, kresba přiměřená, bez zřetelných ložisek či infiltrátů.\nBránice: klenutá, KF úhly volné.\nSrdce: nezvětšeno.\nMediastinum: nerozšířeno, hily přiměřené.\n\nZávěr: \nBez zřetelných patologických změn.",
    copyRTGAbdomen: "RTG nativ břicha vstoje - AP projekce\n\nBránice klenutá, bez patrného volného plynu subfrenicky bilat. \nTenké kličky bez dilatace, bez hladin. \nPřiměřená smíšená náplň tračníku. \nŽaludeční bublina obvyklého uložení a velikosti. \n\nZávěr: \nBez známek ileózního stavu či pneumoperitonea.",
	copyRTGCp: "RTG C páteře - AP a bočná projekce\n\nText C páteře. \n\nZávěr: \nBez patologie C páteře.",
	copyRTGTp: "RTG Th páteře - AP a bočná projekce\n\nText Th páteře. \n\nZávěr: \nBez patologie Th páteře.",
	copyRTGLp: "RTG L páteře - AP a bočná projekce\n\nText L páteře. \n\nZávěr: \nBez patologie L páteře.",
};


document.addEventListener('DOMContentLoaded', () => {
    let lastClickTime = 0;
    let textsToFuse = []; // Array to hold texts for fusing
    let highlightedButtons = []; // Array to track highlighted buttons

    // Function to handle button highlight
    function highlightButton(button) {
        button.style.border = '1px solid red';
        if (!highlightedButtons.includes(button)) {
            highlightedButtons.push(button);
        }
    }

    // Function to clear all button highlights
    function clearButtonHighlights() {
        highlightedButtons.forEach(button => {
            button.style.border = '';
        });
        highlightedButtons = []; // Reset the highlighted buttons array
    }

    // Function to handle click events and update clipboard
    function handleButtonClick(event) {
        const currentTime = Date.now();
        const timeDiff = currentTime - lastClickTime;
        const buttonId = event.target.id;
        const textData = RTGtexts[buttonId].split('\n\n');

        highlightButton(event.target); // Highlight the clicked button

        if (timeDiff < 5000 && textsToFuse.length > 0) {
            // Append new text data if last click was less than 5 seconds ago
            textsToFuse.push(textData);
        } else {
            // Reset with new text data if the click was more than 5 seconds ago or it's the first click
            textsToFuse = [textData];
            // If starting a new sequence, ensure any previous highlights are cleared (handled below, after delay)
        }

        lastClickTime = currentTime;
        const fusedText = fuseTexts(textsToFuse);
        copyTextToClipboard(fusedText);

        clearTimeout(clearHighlightsTimeout); // Reset the timeout on each click
        clearHighlightsTimeout = setTimeout(clearButtonHighlights, 5000); // Set to clear highlights 5 seconds after the last click
    }

    // Function to fuse texts from the array
    function fuseTexts(textsArray) {
        const names = textsArray.map(parts => parts[0]).join(", ");
        const bodies = textsArray.map(parts => parts[1]).join("\n\n");
        const resumes = textsArray.map(parts => parts[2].replace("Závěr: \n", "")).join("\n");

        return `${names}\n\n${bodies}\n\nZávěr: \n${resumes}`;
    }

    // Function to copy text to the clipboard
    function copyTextToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            console.log("Text copied to clipboard");
        }).catch(err => {
            console.error('Error in copying text: ', err);
        });
    }

    // Attach click event listeners to each button
    document.querySelectorAll('.buttonRTG').forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });

    let clearHighlightsTimeout; // Initialize timeout variable for clearing highlights
});
