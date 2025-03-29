// Inicializace výchozích hodnot pro tlačítka parenchymu – využívá již existující logiku ButtonCycleInnerTexts
ButtonCycleInnerTexts["UZRenalRParenchym"] = ["normální", "snížený"];
ButtonCycleInnerTexts["UZRenalLParenchym"] = ["normální", "snížený"];

// Při načtení nastavíme výchozí text tlačítek (pokud již nejsou nastaveny)
if(!document.getElementById("UZRenalRParenchym").innerText) {
  document.getElementById("UZRenalRParenchym").innerText = ButtonCycleInnerTexts["UZRenalRParenchym"][0];
}
if(!document.getElementById("UZRenalLParenchym").innerText) {
  document.getElementById("UZRenalLParenchym").innerText = ButtonCycleInnerTexts["UZRenalLParenchym"][0];
}

function updateTexts() {
  // Získání hodnot z formuláře
  var indikace = document.getElementById("indikace").value;
  
  // PSV aorty
  var aortaPSV = document.getElementById("UZRenalAortaPSV").value;
  
  
  // PSV renálních tepen (RA)
  var raPSVPravo = document.getElementById("UZRenalRAPSV_Pravo").value;
  var raPSVVlevo = document.getElementById("UZRenalRAPSV_Vlevo").value;
  
  // Pokud jsou obě RA prázdná, považujeme je za "nezobrazeny"
  var raPopis = "";
  if (!raPSVPravo && !raPSVVlevo) {
    raPopis = "nezobrazeny";
  } else {
    if (raPSVPravo) {
      raPopis += "vpravo: PSV " + raPSVPravo + " cm/s; ";
    }
    if (raPSVVlevo) {
      raPopis += "vlevo: PSV " + raPSVVlevo + " cm/s";
    }
  }
  
  // Ledviny
  var renalRSize = document.getElementById("UZRenalRSize").value;
  var renalRParenchym = document.getElementById("UZRenalRParenchym").innerText;
  var renalLSize = document.getElementById("UZRenalLSize").value;
  var renalLParenchym = document.getElementById("UZRenalLParenchym").innerText;
  
  // Intrarenální arterie
  var renalRIntraPSV = document.getElementById("UZRenalRIntraPSV").value;
  var renalRIntraAT = document.getElementById("UZRenalRIntraAT").value;
  var renalRIntraRI = document.getElementById("UZRenalRIntraRI").value;
  var renalLIntraPSV = document.getElementById("UZRenalLIntraPSV").value;
  var renalLIntraAT = document.getElementById("UZRenalLIntraAT").value;
  var renalLIntraRI = document.getElementById("UZRenalLIntraRI").value;
  
  // Sestavení popisu (bez interpretace PSV)
  var popis = "";
  
  // Aorta
	popis += "Aorta: ";
	if (aortaPSV) {
	  popis += "PSV " + aortaPSV + " cm/s, slouží jako referenční hodnota. ";
	} else {
	  popis += "neměřena. ";
	}

  // Renální arterie
  popis += "\nRenální arterie: " + raPopis + ". ";
  
  // Pravá ledvina
  popis += "\nPravá ledvina: ";
  if (renalRSize) {
    popis += "velikost " + renalRSize + " cm v dlouhé ose, ";
  }
  popis += "parenchym " + renalRParenchym + ". ";
  
  // Levá ledvina
  popis += "\nLevá ledvina: ";
  if (renalLSize) {
    popis += "velikost " + renalLSize + " cm v dlouhé ose, ";
  }
  popis += "parenchym " + renalLParenchym + ". ";
  
  // Intrarenální arterie
  popis += "\nIntrarenální arterie vpravo: ";
  if (renalRIntraPSV) {
    popis += "PSV " + renalRIntraPSV + " cm/s, ";
  }
  if (renalRIntraAT) {
    popis += "AT " + renalRIntraAT + " s, ";
  }
  if (renalRIntraRI) {
    popis += "RI " + renalRIntraRI + ". ";
  }
  
  popis += "\nIntrarenální arterie vlevo: ";
  if (renalLIntraPSV) {
    popis += "PSV " + renalLIntraPSV + " cm/s, ";
  }
  if (renalLIntraAT) {
    popis += "AT " + renalLIntraAT + " s, ";
  }
  if (renalLIntraRI) {
    popis += "RI " + renalLIntraRI + ". ";
  }
  
  // Zápis do textových polí (popis zůstává pouze popis nálezu)
  document.getElementById("UZRenalNAMEText").value = "UZ renálních tepen";
  document.getElementById("UZRenalINDText").value = indikace;
  document.getElementById("UZRenalPOPText").value = popis;
  
  // Sestavení závěru s interpretací (zahrnuje i interpretaci PSV)
  var zavěr = "";
  var abnormal = false;
  var notes = [];
  
  // Interpretace PSV:
  var psaInterp = "";

  if (raPSVPravo) {
    if (parseFloat(raPSVPravo) > 180) {
      psaInterp += "Pravá renální arterie s PSV " + raPSVPravo + " cm/s naznačuje možnost stenózy. ";
    } else {
      psaInterp += "Pravá renální arterie s PSV " + raPSVPravo + " cm/s je v normálním rozmezí. ";
    }
  }
  if (raPSVVlevo) {
    if (parseFloat(raPSVVlevo) > 180) {
      psaInterp += "Levá renální arterie s PSV " + raPSVVlevo + " cm/s naznačuje možnost stenózy. ";
    } else {
      psaInterp += "Levá renální arterie s PSV " + raPSVVlevo + " cm/s je v normálním rozmezí. ";
    }
  }

  
  // Interpretace intrarenálních tepen (RI a AT)
  if (renalRIntraRI && parseFloat(renalRIntraRI) > 0.70) {
    abnormal = true;
    notes.push("pravá intrarenální arterie má zvýšený RI");
  }
  if (renalLIntraRI && parseFloat(renalLIntraRI) > 0.70) {
    abnormal = true;
    notes.push("levá intrarenální arterie má zvýšený RI");
  }
  if (renalRIntraAT && parseFloat(renalRIntraAT) > 0.10) {
    abnormal = true;
    notes.push("pravá intrarenální arterie má prodloužený AT");
  }
  if (renalLIntraAT && parseFloat(renalLIntraAT) > 0.10) {
    abnormal = true;
    notes.push("levá intrarenální arterie má prodloužený AT");
  }
  
  if (abnormal) {
    zavěr = psaInterp + "Nález naznačuje možné změny perfuze: " + notes.join("; ") + ".";
  } else {
    zavěr = psaInterp + "Nález bez nepřímých známek stenózy ren. tepen. ";
  }
  
  document.getElementById("UZRenalRESText").value = zavěr;
}

// Inicializace popisu při načtení
updateTexts();