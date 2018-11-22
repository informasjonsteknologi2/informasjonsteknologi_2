//Lager variabel for poeng og henter ut poengparagraf
var poeng = 0;
var poengEl = document.querySelector("#poeng");

//Spørsmål 1

//Henter ut alternativene på spørsmål 1
var alt1El = document.querySelector("#alt1");
var alt2El = document.querySelector("#alt2");
var alt3El = document.querySelector("#alt3");
var alt4El = document.querySelector("#alt4");

//Legger til EventListener på alle alternativer
alt1El.addEventListener("click", gjettSvar1);
alt2El.addEventListener("click", gjettSvar1);
alt3El.addEventListener("click", gjettSvar1);
alt4El.addEventListener("click", gjettSvar1);

function gjettSvar1(e) {
  //Henter ut id på valgt alternativ
  var gjettet = e.target.id;

  //Riktig svar er alternativ 3
  if (gjettet=="alt3") {
    //Hvis riktig svar så økes poeng med 1, samt oppdatere poeng på siden
    // og alternativet får grønn bakgrunnsfarge
    e.target.className="riktig";
    poeng++;
    poengEl.innerHTML = "Poeng: " + poeng;

  } else {
    //Hvis feil alternativ er valgt så får alternativet rød bakgrunnsfarge
    //Og riktig alternativ får grønn bakgrunnsfarge. Poeng oppdateres ikke.
    e.target.className="feil";
    alt3El.className ="riktig";
  }

  //Fjerner EventListener slik at man ikke kan gjette på samme spørsmål
  // en gang til
  alt1El.removeEventListener("click", gjettSvar1);
  alt2El.removeEventListener("click", gjettSvar1);
  alt3El.removeEventListener("click", gjettSvar1);
  alt4El.removeEventListener("click", gjettSvar1);
}

//sporsmål 2

//Henter ut alternativene på spørsmål 2
var alt5El = document.querySelector("#alt5");
var alt6El = document.querySelector("#alt6");
var alt7El = document.querySelector("#alt7");
var alt8El = document.querySelector("#alt8");

//Legger til EventListener på alle alternativer
alt5El.addEventListener("click", gjettSvar2);
alt6El.addEventListener("click", gjettSvar2);
alt7El.addEventListener("click", gjettSvar2);
alt8El.addEventListener("click", gjettSvar2);

function gjettSvar2(e) {
  //Henter ut id på valgt alternativ
  var gjettet = e.target.id;

  //Riktig svar er alternativ 2 (alt6)
  if (gjettet=="alt6") {
    //Hvis riktig svar så økes poeng med 1, samt oppdatere poeng på siden
    // og alternativet får grønn bakgrunnsfarge
    e.target.className="riktig";
    poeng++;
    poengEl.innerHTML = "Poeng: " + poeng;

    //Hvis feil alternativ er valgt så får alternativet rød bakgrunnsfarge
    //Og riktig alternativ får grønn bakgrunnsfarge. Poeng oppdateres ikke.
  } else {
    e.target.className="feil";
    alt6El.className="riktig";
  }

  //Fjerner EventListener slik at man ikke kan gjette på samme spørsmål
  // en gang til
  alt5El.removeEventListener("click", gjettSvar2);
  alt6El.removeEventListener("click", gjettSvar2);
  alt7El.removeEventListener("click", gjettSvar2);
  alt8El.removeEventListener("click", gjettSvar2);
}

//sporsmål 3

//Henter ut alternativene på spørsmål 3
var alt9El = document.querySelector("#alt9");
var alt10El = document.querySelector("#alt10");
var alt11El = document.querySelector("#alt11");
var alt12El = document.querySelector("#alt12");

//Legger til EventListener på alle alternativer
alt9El.addEventListener("click", gjettSvar3);
alt10El.addEventListener("click", gjettSvar3);
alt11El.addEventListener("click", gjettSvar3);
alt12El.addEventListener("click", gjettSvar3);

function gjettSvar3(e) {
  //Henter ut id på valgt alternativ
  var gjettet = e.target.id;

  //Riktig svar er alternativ 1(alt9)
  if (gjettet=="alt9") {
    //Hvis riktig svar så økes poeng med 1, samt oppdatere poeng på siden
    // og alternativet får grønn bakgrunnsfarge
    e.target.className="riktig";
    poeng++;
    poengEl.innerHTML = "Poeng: " + poeng;

    //Hvis feil alternativ er valgt så får alternativet rød bakgrunnsfarge
    //Og riktig alternativ får grønn bakgrunnsfarge. Poeng oppdateres ikke.
  } else {
    e.target.className="feil";
    alt9El.className="riktig";
  }

  //Fjerner EventListener slik at man ikke kan gjette på samme spørsmål
  // en gang til
  alt9El.removeEventListener("click", gjettSvar3);
  alt10El.removeEventListener("click", gjettSvar3);
  alt11El.removeEventListener("click", gjettSvar3);
  alt12El.removeEventListener("click", gjettSvar3);
}
