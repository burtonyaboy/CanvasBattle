function readSingleFile(e) {
  var file = e.target.files[0];
  var contents;
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    contents = e.target.result;
    displayContents(contents);
    start(contents);
  };
  reader.readAsText(file)
}

function displayContents(contents) {
  var element = document.getElementById('file-content');
  element.textContent = contents;
}

var parsedFile = function (contents){
    //after reading the file, divide the first four lines into respective names and json ship objects
    var allContents = contents.split("\n");
    var namesAndPlaces = contents.split("\n", 4);
    this.shots = allContents.slice(4, allContents.length);;
    this.win = allContents[allContents.length - 1];

    //create a variable for each name and json object, then create an array to access these
    this.nameLine1 = namesAndPlaces[0];
    this.nameLine2 = namesAndPlaces[1];
    this.shipPlaces1 = namesAndPlaces[2];
    this.shipPlaces2 = namesAndPlaces[3];
    this.places = [this.shipPlaces1, this.shipPlaces2];
    this.names = [this.nameLine1, this.nameLine2];
    }

function getShipData(id, lineData){
    //return an json object of ships for player id
    var shipData = JSON.parse(lineData.slice(9));
    return shipData;
}

function getPlayerName(lineData){
    var name = lineData.split(" ", 1)[0];
    //console.log(name);
    return name;
}

function getShots(shots){
  var shotInfo = new Array();
  //var innerArray = new Array();
  var hitOrMiss, x, y, coords;
  for (var i = 0; i <= 40; i++) {

    hitOrMiss = Number(String(shots[i].split(" ", 2)[1]).replace(":", " "));
    //console.log(hitOrMiss);
    coords = shots[i].slice(10, 14);
    x = Number(coords[0]);
    y = Number(coords[3]);
    shotInfo.push([hitOrMiss, x, y]);
  }
  return shotInfo;
}

/*
SHOOT 0: [5, 5]
SHOOT 0: [8, 8]
SHOOT 1: [3, 2]
SHOOT 1: [3, 1]
*/











