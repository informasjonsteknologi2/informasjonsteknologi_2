var turer =[
  {
    navn:"Topptur til Snøhetta",
    beskrivelse:"En flott tur til dovrefjells høyeste punkt",
    lengde: 11.7,
    vanskelighetsgrad:"Krevende",
    farge:"red",
    plasser:{fredag:10, lordag:0, sondag:15}
  },
  {
    navn:"Veslehetta",
    beskrivelse:"Ved foten av Snøhetta ligger Veslehetta, en flott tur for de minste",
    lengde:6.4,
    vanskelighetsgrad:"Enkel",
    farge:"green",
    plasser:{fredag:0, lordag:5, sondag:9}
  },
  {
    navn:"Moskussafari",
    beskrivelse:"Med lokal guide som garanterer at vi får se moskus",
    lengde:"Ukjent",
    vanskelighetsgrad:"Krevende",
    farge:"red",
    plasser:{fredag:20, lordag:15, sondag:16}
  },
  {
    navn:"Topptur til Larstinden",
    beskrivelse:"Klatretur for de som ønsker utfordringer",
    lengde: 24.2,
    vanskelighetsgrad:"Ekstra krevende",
    farge:"black",
    plasser:{fredag:1, lordag:5, sondag:0}
  }
]

DAGER = {fredag:"Fredag 19.07.19", lordag:"Lørdag 20.07.19", sondag:"Søndag 21.07.19"}
bookingDivEl = document.querySelector(".booking");


//Lager knapper for valg av dag.
var knapperDivEl = document.createElement("div");
knapperDivEl.className = "knapper";
for (var dag in DAGER) {
  var knapp = document.createElement("button");
  knapp.id = dag;
  knapp.className = "btn"
  knapp.innerHTML = DAGER[dag];
  knapp.addEventListener("click", visTurer)
  knapperDivEl.appendChild(knapp);
}
bookingDivEl.appendChild(knapperDivEl);

//Dagen som er valgt blir markert
var btns = document.querySelectorAll(".btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  if (current.length > 0) {
    current[0].className = current[0].className.replace(" active", "");
  }
  this.className += " active";
  });
}

//Lager div til å vise de turene de dagene som er valgt
var divTurerEl = document.createElement("div");
divTurerEl.className="velgtur";
bookingDivEl.appendChild(divTurerEl);

var valgtDag ="";
//Visere de turene der det er igjen ledige plasser.
function visTurer(e) {
  valgtDag = e.target.id;
  var divTurerEl = document.querySelector(".velgtur");
  divTurerEl.innerHTML = "";

  //Sjekker om det er ledige plasser igjen på noen av turene den valgte dagene.
  //Skriver ut en melding hvis det er fullt
  antallLedigeValgtDag = 0;
  for (var i = 0; i < turer.length; i++) {
    antallLedigeValgtDag +=turer[i].plasser[valgtDag]
  }
  if (antallLedigeValgtDag <= 0){
    var paragrafEl = document.createElement("p");
    paragrafEl.innerHTML = "Ingen ledige plasser igjen på valgt dag. Prøv en annen dag";
    divTurerEl.appendChild(paragrafEl);
  } else {

    //Skriver ut alle turene det er igjen ledige plasser på.
    for (var i = 0; i < turer.length; i++) {
      if (turer[i].plasser[valgtDag]>0) {
        //Lager et div-element for hver tur som kommer opp
        var divTurEl = document.createElement("div");
        divTurEl.id = "turdiv" + i;

        //Skriver ut overskrift på turene
        var navnOverskrift = document.createElement("h3");
        navnOverskrift.innerHTML = turer[i].navn;
        divTurEl.appendChild(navnOverskrift);

        //Skriver ut beskrivelse av turene
        var beskrivelsePEl = document.createElement("p");
        beskrivelsePEl.innerHTML = turer[i].beskrivelse;
        divTurEl.appendChild(beskrivelsePEl);

        // Skriver ut Lengde og vanskelighetsgrad
        var lengdeEl = document.createElement("p");
        lengdeEl.innerHTML = "Lengde: "+turer[i].lengde;
        if (turer[i].lengde>0) {
          lengdeEl.innerHTML+=" km"
        }
        divTurEl.appendChild(lengdeEl);

        //Legger inn vanskelighetsgrad med en firkant med farge
        firkantEl = document.createElement("div");
        firkantEl.className="firkant";
        firkantEl.style.backgroundColor = turer[i].farge;
        divTurEl.appendChild(firkantEl);

        var kravEl = document.createElement("p");
        kravEl.style.display="inline"
        kravEl.innerHTML += "  "+ turer[i].vanskelighetsgrad;
        divTurEl.appendChild(kravEl);

        //Legger inn antall ledige plasser
        var plasserEl = document.createElement("p");
        plasserEl.innerHTML = "Antall plasser ledig: " + turer[i].plasser[valgtDag];
        divTurEl.appendChild(plasserEl);

        //Lager input number for å velge antall plasser med knapp for å bekrefte
        var velgantallEl = document.createElement("input");
        velgantallEl.type = "number";
        velgantallEl.id = "tur"+i;
        velgantallEl.style.display = "inline";
        divTurEl.appendChild(velgantallEl);

        var bekreftKnappEl = document.createElement("button");
        bekreftKnappEl.innerHTML = "Bestill";
        bekreftKnappEl.value = i;
        bekreftKnappEl.style.display="inline"
        bekreftKnappEl.addEventListener("click", bestill);
        divTurEl.appendChild(bekreftKnappEl);

        //Mulighet til å skrive ut feilmelding om brukeren legger inn ugyldige verdier
        var feilmeldingEl = document.createElement("p");
        feilmeldingEl.id = "feil"+i;
        feilmeldingEl.style.fontStyle="italic";
        divTurEl.appendChild(feilmeldingEl);

        divTurerEl.appendChild(divTurEl)

      }
    }
  }

}



function bestill(e) {
  var antallplasser = document.querySelector("#tur"+e.target.value).value;
  var valgtTurDivEl = document.querySelector("#turdiv" + e.target.value);
  var feilmeldingEl = document.querySelector("#feil" + e.target.value);

  //Feilmelding hvis brukeren skriver inn galt antall plasser igjen
  if (antallplasser<0 || antallplasser=="") {
    feilmeldingEl.innerHTML="Skriv inn et gyldig tall";
  } else if (antallplasser>turer[e.target.value].plasser[valgtDag]) {
    feilmeldingEl.innerHTML="Ikke nok plasser igjen. Velg et mindre antall";
  } else {

    //Skriver ut en kvittering på bestillingen
    var kvitteringEl = document.createElement("p");
    kvitteringEl.className="kvittering"
    kvitteringEl.innerHTML = "Du har bestilt " + antallplasser + " plasser til ";
    kvitteringEl.innerHTML += turer[e.target.value].navn + " "+ DAGER[valgtDag] ;

    //Oppdaterer antall plasser
    turer[e.target.value].plasser[valgtDag] -=antallplasser;

    //fjerner turene fra siden og kvittering blir skrevet ut til siden
    divTurerEl.innerHTML="";
    divTurerEl.appendChild(kvitteringEl)


  }

}
