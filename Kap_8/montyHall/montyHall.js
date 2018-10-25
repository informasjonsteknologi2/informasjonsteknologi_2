var rodDorEl = document.querySelector("#r");
var gronnDorEl = document.querySelector("#g");
var blaaDorEl = document.querySelector("#b");

rodDorEl.addEventListener("click", sjekkDor);
blaaDorEl.addEventListener("click", sjekkDor);
gronnDorEl.addEventListener("click", sjekkDor);


function sjekkDor(e) {
  var trykketDor = e.target
  console.log(trykketDor.id);
  if (trykketDor.id==="r") {
    console.log("Du trykket på den røde døren");
  } else if (trykketDor.id==="g") {
    console.log("Du trykket på den grønne døren");
  }else {
    console.log("Du trykket på den blå døren");
  }
}
