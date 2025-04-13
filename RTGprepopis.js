const RTGtexts = {
    copyRTGChest: "RTG hrudníku - PA vstoje\n\nPlíce: rozvinuté, kresba přiměřená, bez zřetelných ložisek či infiltrátů.\nBránice: klenutá, KF úhly volné.\nSrdce: nezvětšeno.\nMediastinum: nerozšířeno, hily přiměřené.\n\nZávěr: \nBez zřetelných patologických změn.",
    copyRTGAbdomen: "RTG nativ břicha vstoje - AP projekce\n\nBránice klenutá, bez patrného volného plynu subfrenicky bilat. \nTenké kličky bez dilatace, bez hladin. \nPřiměřená smíšená náplň tračníku. \nŽaludeční bublina obvyklého uložení a velikosti. \n\nZávěr: \nBez známek ileózního stavu či pneumoperitonea.",
    copyRTGCp: "RTG C páteře - AP a bočná projekce\n\nText C páteře. \n\nZávěr: \nBez patologie C páteře.",
    copyRTGTp: "RTG Th páteře - AP a bočná projekce\n\nText Th páteře. \n\nZávěr: \nBez patologie Th páteře.",
    copyRTGLp: "RTG L páteře - AP a bočná projekce\n\nText L páteře. \n\nZávěr: \nBez patologie L páteře.",
};

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.buttonRTG').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.id;
            if (!RTGtexts[id]) return;

            const textData = RTGtexts[id].split('\n\n');
            const name = textData[0];
            const popis = textData[1] || "";
            const zaver = (textData[2] || "").replace("Závěr: \n", "");

            const nameEl = document.getElementById("RTGpreNAMEText");
            const popisEl = document.getElementById("RTGprePOPText");
            const zaverEl = document.getElementById("RTGpreRESText");

            if (nameEl && popisEl && zaverEl) {
                nameEl.value = name;
                popisEl.value = popis;
                zaverEl.value = zaver;
            }
        });
    });
});
