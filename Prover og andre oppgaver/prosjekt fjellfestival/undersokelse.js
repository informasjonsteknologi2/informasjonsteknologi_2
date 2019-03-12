//undersøkelsen
var data =[
  {
    sporsmaal:"Hvor ofte går du på tur i fjellet",
    alternativer:[
      {alternativ:"Hver dag"},
      {alternativ:"Annen hver uke"},
      {alternativ:"En gang i måneden"},
      {alternativ:"1-2 ganger i året"},
      {alternativ:"Aldri"}
    ]
  },
  {
    sporsmaal:"Når du er i tur på fjellet går du mest på:",
    alternativer:[
      {alternativ:"Merket sti"},
      {alternativ:"Umerket sti"},
      {alternativ:"Utenfor sti"}
    ]
  },
  {
    sporsmaal:"Hvor fornøyd er du med fjellfestivalen så langt?",
    alternativer:[
      {alternativ:"Meget fornøyd"},
      {alternativ:"fornøyd"},
      {alternativ:"verken eller"},
      {alternativ:"Misfornøyd"},
      {alternativ:"Meget misfornøyd"}
    ]
  }
]

//Legger til verdien 0 for alternativene til å kunne telle antall svar
//på hvert alternativ
for (var i = 0; i < data.length; i++) {
  for (var j = 0; j < data[i].alternativer .length; j++) {
    data[i].alternativer[j].verdi = 0;
  }
}

//Skriver ut spørsmålene på siden med tilhørende radio-buttons
var undersokelseEl = document.querySelector(".undersokelse");
for (var i = 0; i < data.length; i++) {

  //Legger spm inn i et div for å kunne plassere spørsmål og
  //diagram ved siden av hverandre. Lager et canvas element for diagram
  var divEl = document.createElement("div");
  var divspmEl = document.createElement("div");
  divEl.className = "rad"
  var canvasEl = document.createElement("canvas");
  canvasEl.width = 400;
  canvasEl.height = 50;

  //Legger inn spm
  var spmEl = document.createElement("h4");
  spmEl.innerHTML = data[i].sporsmaal;
  undersokelseEl.appendChild(spmEl);
  for (var j = 0; j < data[i].alternativer.length; j++) {
    var inputEl = document.createElement("input");
    inputEl.type = "radio";
    inputEl.name = "spm"+i;

    //For å kunne ha checked på det første alternativet slik at brukeren alltid må svare på alle tre spm
    if (j==0) {
      inputEl.className = "huketAv";
    }
    divspmEl.appendChild(inputEl);
    divspmEl.innerHTML += data[i].alternativer[j].alternativ + "<br>";
  }
  divEl.appendChild(divspmEl);
  divEl.appendChild(canvasEl);
  undersokelseEl.appendChild(divEl);
}

//Huker av det første alternativet
var huketAv = document.querySelectorAll(".huketAv");
for (var i = 0; i < huketAv.length; i++) {
  huketAv[i].checked = true;
}

//Legger til svar knapp
var knappEl = document.createElement("button");
knappEl.id = "sendSvar";
knappEl.innerHTML = "Send inn";
undersokelseEl.appendChild(knappEl);

//Legger til svanitt for totalt antall svart
var antallSvarEl = document.createElement("p");
antallSvarEl.id = "antallSvar";
undersokelseEl.appendChild(antallSvarEl)

//Henter ut hva brukeren har svart når han har trykket på
//send inn og oppdaterer verdi og tegner søylediagram
var svarknappEl = document.querySelector("#sendSvar");
svarknappEl.addEventListener("click", oppdaterSvar);
canvasEl = document.querySelectorAll("canvas");

//Teller hvor mange ganger noen har trykket på Send for å finne totalt antall svart
var totalAntallSvart = 0;
var antallSvarEl = document.querySelector("#antallSvar");

function oppdaterSvar() {
  totalAntallSvart++;
  for (var i = 0; i < data.length; i++) {
    var navn = "spm"+i;
    var svarEl = document.querySelectorAll("input[name ='"+navn+"' ]")
    for (var j = 0; j < svarEl.length; j++) {
      if (svarEl[j].checked) {
        data[i].alternativer[j].verdi++;
      }
    }
    tegnSoylediagram(data[i].alternativer, canvasEl[i], 190)
  }
  antallSvarEl.innerHTML = "Så langt har " + totalAntallSvart + " personer svart på undersøkelsen."

}

function tegnSoylediagram(data, canvas, tekstbredde) {
  var ctx = canvas.getContext("2d");
  var totallengde = canvas.width;
  var soylebredde = totallengde-tekstbredde-10;
  var hoyde =23;
  var luft = 3


  canvas.height = data.length*hoyde;

  var max = 0;
  for (var i = 0; i < data.length; i++) {
    if (data[i].verdi>max) {
      max = data[i].verdi;
    }
  }

  ctx.font = hoyde-luft*2+"px Roboto";
  ctx.textAlign = "end";
  ctx.textBaseline = "hanging";

  for (var i = 0; i < data.length; i++) {
    //Legger inn tekst
    ctx.fillStyle = "#323232";
    ctx.fillText(data[i].alternativ +"(" + data[i].verdi +", "+Math.round(data[i].verdi/totalAntallSvart*100)+ "%)", tekstbredde, i*hoyde+luft);

    //Beregner lengde på søylen
    var bredde = (data[i].verdi/max)*soylebredde;
    ctx.fillStyle = "hsl(" + i*hoyde + ", 100%, 70%)";
    ctx.fillRect(tekstbredde+5, i*hoyde+luft, bredde, hoyde-luft*2);
  }
}
