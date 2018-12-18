
// Oppgave 2 Velg antall tall

// Legger til en lytter på velg antall tall knapp
var antallTallKnappEl = document.querySelector("#antallTallKnapp")
antallTallKnappEl.addEventListener("click", velgAntallTall);

//En array med alle tall vi kan trekke
var tallArray = [];

//Lager en array med heltall fra tallet 1 til og med tallet
// tallet brukeren angir i input-feltet.
function velgAntallTall() {
  var antallTallEl = document.querySelector("#antallTall");
  var antallTall = antallTallEl.value;

  for (var i = 1; i <= antallTall; i++) {
    tallArray.push(i);
  }

  /*
  Her bør vi også tenke på om vi skal fjerne
  de tallene som er trekt (fra oppgave 3) eller hindre
  brukeren i å velge antall tall på nytt. Jeg har valgt
  nå å løse det ved å fjerne lytteren slik at man ikke kan
  trekke tall på nytt. 
  */
  antallTallKnappEl.removeEventListener("click", velgAntallTall)
}

//Oppgave 3 Trekk tilfeldig tall
var trekkTilfeldigTallEl = document.querySelector("#trekkTilfeldigTall");
trekkTilfeldigTallEl.addEventListener("click", trekkTall);

//En array for å samle tall som er trukketTall
var trukketTallArray = [];

function trekkTall() {

  //Sjekker om det er noen tall å trekke
  if (tallArray.length==0) {
    //Mangler å legge til en feilmelding som kan skrives ut.
    return;
  }

  //Velger et tilfeldig tall som fjernes fra tallArray
  var tilfeldigIndex = Math.floor(Math.random()*tallArray.length)
  var trukketTall = Number(tallArray.splice(tilfeldigIndex,1));

  //Legger til trukket tall i trukkettallArray og
  //sorterer denne i stigende rekkefølge
  trukketTallArray.push(trukketTall);
  trukketTallArray.sort(sortereTallStigende)

  //Henter ut div elementet med trekte tall og fjerne tidligere innhold
  var trukketTallEl = document.querySelector(".tallTrukket")
  trukketTallEl.innerHTML = "";

  //Skriver ut de trukkede tallene i siste div-element
  for (var i = 0; i < trukketTallArray.length; i++) {
    var paragrafEl = document.createElement("p");
    paragrafEl.innerHTML =   trukketTallArray[i];

    //Velger farge utfra størrelse på tallet
    paragrafEl.style.backgroundColor = "hsla("+trukketTallArray[i]*30+", 50%, 50%)";
    trukketTallEl.appendChild(paragrafEl);
  }
}

//Oppgave 4

//Henter ut knappen for sjekk kupong og legger til en lytter
var sjekkKuppongKnappEl = document.querySelector("#sjekkKuppong");
sjekkKuppongKnappEl.addEventListener("click", sjekkKupong)

//Legger til en paragraf som kan skrive ut en feilmelding
var sjekkeKupongDivEl = document.querySelector(".sjekkeKupong");
var nyparagraf = document.createElement("p");
nyparagraf.className = "feilmeld";
sjekkeKupongDivEl.appendChild(nyparagraf);

//Legger til en paragraf i fjerde div element som kan skrive ut en vinnemelding
var resultatParagrafEl = document.createElement("p");
resultatParagrafEl.className = "resultatUtskrift";
var resultatDivEl = document.querySelector(".resultat");
resultatDivEl.appendChild(resultatParagrafEl);

//Sjekker kupongen for hvor mange riktige du hadde og om du vant eller ikke.
function sjekkKupong() {
  // Henter ut mine tall fra kupongen
  var minKupong = document.querySelectorAll(".kupong");
  var mineTall = []
  for (var i = 0; i < minKupong.length; i++) {
    mineTall.push(minKupong[i].value);
  }
  mineTall.sort(sortereTallStigende);

  //Tømmer feilmeldingsparagrafen
  var feilmeldEl = document.querySelector(".feilmeld");
  feilmeldEl.innerHTML = "";

  //Sjekker at det ikke er to like tall i kupongen
  //Er det to like så skrives det ut en feilmelding
  for (var i = 0; i < mineTall.length; i++) {
    if (mineTall[i] == mineTall[i-1]) {
      feilmeldEl.innerHTML = "Nå har du lagt inn to like tall...";
      return;
    }
  }

  //Sjekker om mine tall er blant trukkede tall
  var vinnerTall = [];
  for (var i = 0; i < mineTall.length; i++) {
    for (var j = 0; j < trukketTallArray.length; j++) {
      if (trukketTallArray[j] == mineTall[i]) {
        vinnerTall.push(mineTall[i]);
      }
    }
  }

  //Skriver ut antall riktige og om du vinner eller ikke
  var resultatUtskriftEl = document.querySelector(".resultatUtskrift");
  resultatUtskriftEl.innerHTML = "Du fikk " + vinnerTall.length + " riktige.";

  if (vinnerTall.length == minKupong.length) {
    resultatUtskriftEl.innerHTML += " Du vant!";
  } else {
    resultatUtskriftEl.innerHTML += " Du tapte!";
  }

}
