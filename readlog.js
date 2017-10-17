
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
    var namesAndPlaces = contents.split("\n", 4);
    this.shots = 0;
    this.win = 0;
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

function playerId(lineData){
    var id = Number(lineData.split(" ", 2)[1].replace(':', ' '));
}

function getPlayerName(lineData){
    var name = lineData.split(" ", 1)[0];
    console.log(name);
    return name;
}













