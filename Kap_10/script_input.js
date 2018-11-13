var tittelEl = document.querySelector("#tittel");
var knappEl = document.querySelector("button");
knappEl.addEventListener("click", registrer);
var innpakningEl = document.querySelector(".innpakning");
var oscarJa = document.querySelector("#oscarJa");
var oscarNei = document.querySelector("#oscarNei");

function registrer() {
  var nyParagraf = document.createElement("p")
  var tittel=tittelEl.value;
  nyParagraf.innerHTML = "Du registrerte filmen" + tittel;


  if (oscarJa.checked) {
    nyParagraf.innerHTML+=" Ja denne filmen har fått oscar"
  }else if (oscarNei.checked) {
    nyParagraf.innerHTML+= " Nei denne filmen har ikke fått oscar"
  }

  innpakningEl.appendChild(nyParagraf);
}
