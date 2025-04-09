function updateTexts() {

let SegmentT12L1 = "";
let SegmentL1L2 = "";
let SegmentL2L3 = "";
let SegmentL3L4 = "";
let SegmentL4L5 = "";
let SegmentL5S1 = "";

let codeForT12L1 = `

function generateSegmentText() {
    let SegmentT12L1active = "";
    let SegmentT12L1mild = "";
    
    const activeElements = document.querySelectorAll('.NaFLocation.active');
    const mildElements = document.querySelectorAll('.NaFLocation.mild');

    const generateTextFromIds = (ids) => {
    let VB = [];
    let FJ = [];
    let SP = [];
    const VB_PREFIX = 'v krycích plotnách';

    ids.forEach(id => {
        if (id.includes('T12L1-VB')) {
            if (id.includes('-A')) VB.push('vpředu');
            if (id.includes('-P')) VB.push('vzadu');
            if (id.includes('-R')) VB.push('vpravo');
            if (id.includes('-L')) VB.push('vlevo');
        } else if (id.includes('T12L1-FJ')) {
            if (id.includes('-R')) FJ.push('ve facetovém skloubení vpravo');
            if (id.includes('-L')) FJ.push('ve facetovém skloubení vlevo');
        } else if (id.includes('T12L1-SP')) {
            SP.push('interspinózně');
        }
    });

    if (VB.length > 2) {
    VB = [VB_PREFIX];
} else if (VB.length > 1) {
    VB = [VB_PREFIX + ' ' + VB.join(' i ')];
} else if (VB.length === 1) {
    VB = [VB_PREFIX + ' ' + VB[0]];
}


    if (FJ.length === 2) {
        FJ = ['ve facetových skloubeních bilat.'];
    }

    let combinedText = VB.concat(FJ, SP);

    if (combinedText.length === 0) {
        return "";
    } else if (combinedText.length === 1) {
        return combinedText[0];
    } else if (combinedText.length === 2) {
        return combinedText.join(' a ');
    } else if (combinedText.length === 3) {
        return combinedText[0] + ', ' + combinedText[1] + ' a ' + combinedText[2];
    }

    return "";
    }

    let activeTexts = Array.from(activeElements).map(el => el.id);
    let mildTexts = Array.from(mildElements).map(el => el.id);

    SegmentT12L1active = generateTextFromIds(activeTexts);
    SegmentT12L1mild = generateTextFromIds(mildTexts);

    if (SegmentT12L1active) {
        SegmentT12L1active = "Vysoká akumulace RF " + SegmentT12L1active + ". ";
    }

    if (SegmentT12L1mild) {
        SegmentT12L1mild = "Mírně zvýšená akumulace RF " + SegmentT12L1mild + ". ";
    }

    if (SegmentT12L1active || SegmentT12L1mild) {
            SegmentT12L1 = "T12/L1: " + SegmentT12L1active + SegmentT12L1mild;
        }

    return SegmentT12L1;
}

generateSegmentText();


`;

let codeForL1L2 = codeForT12L1.replace(/T12L1/g, 'L1L2').replace(/T12\/L1/g, 'L1/2');
let codeForL2L3 = codeForT12L1.replace(/T12L1/g, 'L2L3').replace(/T12\/L1/g, 'L2/3');
let codeForL3L4 = codeForT12L1.replace(/T12L1/g, 'L3L4').replace(/T12\/L1/g, 'L3/4');
let codeForL4L5 = codeForT12L1.replace(/T12L1/g, 'L4L5').replace(/T12\/L1/g, 'L4/5');
let codeForL5S1 = codeForT12L1.replace(/T12L1/g, 'L5S1').replace(/T12\/L1/g, 'L5/S1');
eval(codeForT12L1);
eval(codeForL1L2);
eval(codeForL2L3);
eval(codeForL3L4);
eval(codeForL4L5);
eval(codeForL5S1);



function generatePelvisText() {
    const pelvisMappings = {
        'Pelvis-SI-R': "v SI skloubení vpravo",
        'Pelvis-SI-L': "v SI skloubení vlevo",
        'Pelvis-HIP-R': "v kyčelním kloubu vpravo",
        'Pelvis-HIP-L': "v kyčelním kloubu vlevo",
        'Pelvis-SYM-0': "v symfýze"
    };

    let activeElements = document.querySelectorAll('.NaFLocation.active');
    let mildElements = document.querySelectorAll('.NaFLocation.mild');

    let activeTexts = Array.from(activeElements).map(el => el.id).filter(id => id.startsWith('Pelvis'));
    let mildTexts = Array.from(mildElements).map(el => el.id).filter(id => id.startsWith('Pelvis'));

    const processTexts = (texts) => {
        let processedTexts = [];

        if (texts.includes('Pelvis-SI-R') && texts.includes('Pelvis-SI-L')) {
            processedTexts.push("v SI skloubení bilat.");
            texts = texts.filter(id => !id.includes('Pelvis-SI-'));
        }
        if (texts.includes('Pelvis-HIP-R') && texts.includes('Pelvis-HIP-L')) {
            processedTexts.push("v kyčelních kloubech bilat.");
            texts = texts.filter(id => !id.includes('Pelvis-HIP-'));
        }

        texts.forEach(id => {
            if (pelvisMappings[id]) processedTexts.push(pelvisMappings[id]);
        });

        if (processedTexts.length === 1) {
            return processedTexts[0];
        } else if (processedTexts.length === 2) {
            return processedTexts.join(', ');
        } else if (processedTexts.length > 2) {
            const last = processedTexts.pop();
            return processedTexts.join(', ') + ' a ' + last;
        }
        return "";
    }

    const activePelvis = processTexts(activeTexts);
    const mildPelvis = processTexts(mildTexts);

    let PelvisActive = "", PelvisMild = "";

    if (activePelvis) {
        PelvisActive = "Vysoká akumulace RF " + activePelvis + ".";
    }
    if (mildPelvis) {
        PelvisMild = "Mírně zvýšená akumulace RF " + mildPelvis + ".";
    }

    return PelvisActive + " " + PelvisMild;
}

let PelvisText = generatePelvisText();
if (PelvisText.trim()) { // Check if the string isn't just whitespace or empty
    PelvisText = "Pánev: " + PelvisText;
} else {
    PelvisText = "";
}


// Res

let elements = document.querySelectorAll('.NaFLocation.active');
    let locations = {
        "VB": { singular: "v krycích plotnách", plural: "v krycích plotnách", map: {} },
        "FJ": { singular: "ve facetovém skloubení", plural: "ve facetových skloubeních", map: {} },
        "SP": { singular: "interspinózně v", plural: "interspinózně v", map: {} },
        "SI": { singular: "v SI kloubení", plural: "v obou SI skloubeních", map: {} },
        "HIP": { singular: "v kyčelním kloubu", plural: "v obou kyčelních kloubech", map: {} },
        "SYM": { singular: "v symfýze", plural: "v symfýze", map: {} }
    };

    let sides = {
        "R": "vpravo",
        "L": "vlevo",
        "A": "vpředu",
        "P": "vzadu",
        "0": ""
    };

    let levels = {
        "T12L1": "T12/L1",
        "L1L2": "L1/2",
        "L2L3": "L2/3",
        "L3L4": "L3/4",
        "L4L5": "L4/5",
        "L5S1": "L5/S1",
		"Pelvis": ""
    };

    elements.forEach(el => {
        let idParts = el.id.split('-');
        let level = idParts[0];
        let location = idParts[1];
        let side = idParts[2];

        if (!locations[location].map[level]) {
            locations[location].map[level] = [];
        }

        locations[location].map[level].push(side);
    });

    let texts = [];

    for (let location in locations) {
        let locTexts = [];

        for (let level in locations[location].map) {
            let sidesText = locations[location].map[level].map(side => sides[side]);

            if (location === 'VB') {
                if (sidesText.length > 2) {
                    sidesText = ['difuzně'];
                } else if (sidesText.length === 2) {
                    sidesText = [`${sidesText[0]} a ${sidesText[1]}`];
                }
            } else if (location === 'FJ' || location === 'SI' || location === 'HIP') {
                if (sidesText.length === 2) {
                    sidesText = ['bilat.'];
                }
            }

            locTexts.push(`${levels[level]} ${sidesText.join(' ')}`.trim());
        }

        if (locTexts.length > 0) {
            texts.push(`${locations[location][locTexts.length > 1 ? 'plural' : 'singular']} ${locTexts.join(', ')}`.trim());
        }
    }

    if (texts.length > 0) {
    if (texts.length === 1) {
        ActiveRESText = `Vysoká osteoblastická aktivita se nachází ${texts[0]}.`;
    } else {
        let finalTexts = texts.slice(0, -1).join(', ');
        finalTexts += ` a ${texts[texts.length - 1]}`;
        ActiveRESText = `Vysoká osteoblastická aktivita se nachází ${finalTexts}.`;
    }
} else {
    ActiveRESText = "";
}



let elementsMild = document.querySelectorAll('.NaFLocation.mild');
let locationsMild = {
    "VB": { singular: "v krycích plotnách", plural: "v krycích plotnách", map: {} },
    "FJ": { singular: "ve facetovém skloubení", plural: "ve facetových skloubeních", map: {} },
    "SP": { singular: "interspinózně v", plural: "interspinózně v", map: {} },
    "SI": { singular: "v SI kloubení", plural: "v obou SI skloubeních", map: {} },
    "HIP": { singular: "v kyčelním kloubu", plural: "v obou kyčelních kloubech", map: {} },
    "SYM": { singular: "v symfýze", plural: "v symfýze", map: {} }
};

elementsMild.forEach(el => {
    let idParts = el.id.split('-');
    let level = idParts[0];
    let location = idParts[1];
    let side = idParts[2];

    if (!locationsMild[location].map[level]) {
        locationsMild[location].map[level] = [];
    }

    locationsMild[location].map[level].push(side);
});

let textsMild = [];

for (let location in locationsMild) {
    let locTexts = [];

    for (let level in locationsMild[location].map) {
        let sidesText = locationsMild[location].map[level].map(side => sides[side]);

        if (location === 'VB') {
            if (sidesText.length > 2) {
                sidesText = ['difuzně'];
            } else if (sidesText.length === 2) {
                sidesText = [`${sidesText[0]} a ${sidesText[1]}`];
            }
        } else if (location === 'FJ' || location === 'SI' || location === 'HIP') {
            if (sidesText.length === 2) {
                sidesText = ['bilat.'];
            }
        }

        locTexts.push(`${levels[level]} ${sidesText.join(' ')}`.trim());
    }

    if (locTexts.length > 0) {
        textsMild.push(`${locationsMild[location][locTexts.length > 1 ? 'plural' : 'singular']} ${locTexts.join(', ')}`.trim());
    }
}

if (textsMild.length > 0) {
    if (textsMild.length === 1) {
        MildRESText = `Mírně zvýšená osteoblastická aktivita se nachází ${textsMild[0]}.`;
    } else {
        let finalTextsMild = textsMild.slice(0, -1).join(', ');
        finalTextsMild += ` a ${textsMild[textsMild.length - 1]}`;
        MildRESText = `Mírně zvýšená osteoblastická aktivita se nachází ${finalTextsMild}.`;
    }
} else {
    MildRESText = "";
}


// Normal 

if (SegmentT12L1.trim() === "" && SegmentL1L2.trim() === "" && SegmentL2L3.trim() === "" && SegmentL3L4.trim() === "" && SegmentL4L5.trim() === "" && SegmentL5S1.trim() === "" && PelvisText.trim() === "") {
    NativePOPText = "Bez patologicky zvýšené akumulace RF na zobrazeném skeletu. ";
	NativeRESText = "Bez patologicky zvýšené osteoblastické aktivity na zobrazeném skeletu. ";
} else {
    NativePOPText = "";
	NativeRESText = "";
}


// Others

var NaFskeletOther1Pop = document.getElementById("NaFskeletOther1Pop").value;
var NaFskeletOther1Res = document.getElementById("NaFskeletOther1Res").value;


// POPIS

NaFNAMEText.value = "PET NaF / CT skeletu";

NaFPOPText.value = 
NativePOPText + "\n" +
SegmentT12L1 + "\n" +
SegmentL1L2 + "\n" +
SegmentL2L3 + "\n" +
SegmentL3L4 + "\n" +
SegmentL4L5 + "\n" +
SegmentL5S1 + "\n" +
PelvisText + "\n" +
NaFskeletOther1Pop
;

	NaFPOPText.value = NaFPOPText.value.replace(/^\s+/gm, '');  // odstraní mezery na začátku řádek
	NaFPOPText.value = NaFPOPText.value.replace(/ {2,}/g, ' ');  // více mezer = jedna mezera
	//NaFPOPText.value = NaFPOPText.value.replace(/^[.,\s]+/gm, '');  // odstraní tečku a čárku pokud jsou první na řádce
	NaFPOPText.value = NaFPOPText.value.replace(/ \./g, '.'); // mezera tečka = bez mezery tečka
	NaFPOPText.value = NaFPOPText.value.replace(/\.{2,}/g, '.'); // více teček = jedna tečka
	NaFPOPText.value = NaFPOPText.value.replace(/^\s*[\r\n]/gm, ''); // smaže prázdné řádky
	NaFPOPText.value = NaFPOPText.value.replace(/\,\./g, '.'); // čarka tečka = tečka
	NaFPOPText.value = NaFPOPText.value.replace(/^\s*[\r\n]+|[\r\n]+\s*$/gm, ''); // Remove empty rows 


//RESUME

NaFRESText.value = 
NativeRESText + "\n" +
ActiveRESText + "\n" +
MildRESText + "\n" +
NaFskeletOther1Res;

	NaFRESText.value = NaFRESText.value.replace(/^\s+/gm, '');  // odstraní mezery na začátku řádek
	NaFRESText.value = NaFRESText.value.replace(/ {2,}/g, ' ');  // více mezer = jedna mezera
	NaFRESText.value = NaFRESText.value.replace(/^[.,\s]+/gm, '');  // odstraní tečku a čárku pokud jsou první na řádce
	NaFRESText.value = NaFRESText.value.replace(/ \./g, '.'); // mezera tečka = bez mezery tečka
	NaFRESText.value = NaFRESText.value.replace(/\.{2,}/g, '.'); // více teček = jedna tečka
	NaFRESText.value = NaFRESText.value.replace(/ :/g, ':');  // odstraní mezeru před dvojtečkou
	NaFRESText.value = NaFRESText.value.replace(/ \, /g, ', '); // mezera čárka na čárka


// FINAL

NaFFinalText.value = 
"NaF PET / CT skeletu" + "\n\n" +
NaFPOPText.value + "\n\n" +
"Závěr:" + "\n" +
NaFRESText.value;



}
updateTexts();	

