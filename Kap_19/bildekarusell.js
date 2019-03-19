
var bilder = ["bilde1.jpg", "bilde2.jpg", "bilde3.jpg", "bilde4.jpg"]
var tid = 4000;
var bildekarusellEl = document.querySelector(".bildekarusell");

for (var i = 0; i < bilder.length; i++) {
  var divEl = document.createElement("div");
  divEl.className = "bilde";
  divEl.style.backgroundImage = "url(bilder/"+bilder[i]+")";
  if (!i==0) {
    divEl.style.display = "none";
  }
  bildekarusellEl.appendChild(divEl);
}

var bilderEl = document.querySelectorAll(".bilde");
var indexSynligBilde = 0;
var indexNesteBilde;


//Lager knapper for å styre til høyre og utFraVenstre
var knapperEl = document.querySelector(".knapper");

var forrigeEl = document.createElement("button");
forrigeEl.innerHTML = "Forrige";
forrigeEl.className = "forrige";
forrigeEl.addEventListener("click", forrige);
knapperEl.appendChild(forrigeEl);

for (var i = 0; i < bilderEl.length; i++) {
  bildeNrEl = document.createElement("button");
  bildeNrEl.innerHTML = i+1;
  bildeNrEl.value = i;
  bildeNrEl.addEventListener("click", valgtBilde)
  knapperEl.appendChild(bildeNrEl)
}


var nesteEl = document.createElement("button");
nesteEl.className = "neste";
nesteEl.innerHTML = "Neste";
nesteEl.addEventListener("click", neste);
knapperEl.appendChild(nesteEl);

var bytt = setTimeout(flytt, tid);
knappSynlig();

function flytt() {
  byttBilde()
  bytt = setTimeout(flytt, tid)
}


function valgtBilde(e) {
  clearTimeout(bytt);
  indexNesteBilde = Number(e.target.value);
  animasjon(indexNesteBilde);
  bytt = setTimeout(flytt, tid);
}
function forrige() {
  clearTimeout(bytt);
  if (indexSynligBilde==0) {
    indexNesteBilde = bilderEl.length-1;
  } else {
    indexNesteBilde = indexSynligBilde-1;
  }

  knappIkkeSynlig()
  bilderEl[indexSynligBilde].style.animation = "utFraHoyre 2s ease-in-out forwards";

  bilderEl[indexNesteBilde].style.display = "initial"
  bilderEl[indexNesteBilde].style.animation = "innTilVenstre 2s ease-in-out forwards";

  indexSynligBilde = indexNesteBilde;
  knappSynlig();

  bytt = setTimeout(flytt, tid);
}

function neste() {
  clearTimeout(bytt);
  byttBilde();
  bytt = setTimeout(flytt, tid);
}

function byttBilde() {
  if (indexSynligBilde>=bilderEl.length-1) {
    indexNesteBilde = 0;
  } else {
    indexNesteBilde = indexSynligBilde+1;
  }
  animasjon(indexNesteBilde);
}

function animasjon(indexNesteBilde) {
  knappIkkeSynlig();
  bilderEl[indexSynligBilde].style.animation = "utFraVenstre 1.5s ease-in-out forwards";
  bilderEl[indexNesteBilde].style.display = "initial"
  bilderEl[indexNesteBilde].style.animation = "innFraHoyre 1.5s ease-in-out forwards";

  indexSynligBilde = indexNesteBilde;
  knappSynlig();
}

function knappSynlig() {
  var knappEl = document.querySelector("button[value='"+indexSynligBilde+"']");
  knappEl.className = "valgt";

}

function knappIkkeSynlig() {
  var knappEl = document.querySelector("button[value='"+indexSynligBilde+"']");
  knappEl.className = "button";
}
