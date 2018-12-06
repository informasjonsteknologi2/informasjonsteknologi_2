PRISBARN = 50;
PRISVOKSEN = 100;
ANTALLRABATT = 5;
PROSENTRABATT = 0.2; //Skrevet inn som prosentfaktor

var bodyEl = document.querySelector("body");
var knappEl = document.querySelector("button");
var forestillingEl = document.querySelector("select");
var barnEl = document.querySelector("#barn");
var voksenEl = document.querySelector("#voksen");
var bestillingUtskriftEl = document.querySelector(".bestillingUtskrift");

knappEl.addEventListener("click", bestilling);

function bestilling() {
  //Henter ut hvilken konsert som er valgt
  var konsert = forestillingEl.value;

  // Henter ut antall
  var antallBarn = Number(barnEl.value);
  var antallVoksne = Number(voksenEl.value);

  //Sjekker om antall biletter er positive tall
  if (antallBarn<0||antallVoksne<0) {
    var tekst = "Du må angi positivt antall billetter"
    bestillingUtskriftEl.innerHTML = tekst;
    return;
  }

  //Beregner pris og trekker ifra rabatt om det blir gitt
  var pris = antallBarn*PRISBARN+antallVoksne*PRISVOKSEN;
  totAnatall = antallBarn+antallVoksne;
  if (totAnatall>=ANTALLRABATT) {
    pris = pris*(1-PROSENTRABATT);
    var rabatt = true;
  } else {
    var rabatt = false;
  }

  //Lager bestillingsutskrift
  var tekst = "Du har bestilt " + totAnatall + " billetter";
  tekst+= " til " + konsert;
  if (antallVoksne>0&&antallBarn>0) {
    tekst+=", " + antallBarn + " barn og " + antallVoksne + " voksne."
  } else if (antallVoksne>0) {
    tekst+= ", " + antallVoksne + " voksne.";
  } else if (antallBarn>0) {
    tekst+= ", " + antallBarn + " barn.";
  } else{
    // Begge antall er null. Må legge til minst en billett
    tekst = "Du må angi minst 1 billett";
    bestillingUtskriftEl.innerHTML = tekst;
    return;
  }
  tekst+=" Totalprisen er kr " + pris;
  if (rabatt) {
    tekst+=", det er inklusiv grupperabatt på " + PROSENTRABATT*100 + "%."
  } else {
    tekst+="."
  }
  bestillingUtskriftEl.innerHTML = tekst;
}
