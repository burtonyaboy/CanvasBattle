var ships

function start(gameData){
	//placeShips(shipName, idOfPlayer, xUpperLeft, yUpperLeft, horiOrVert, typeOfBoat);
	placeAllShips(gameData);
	
}

function waitForFile(){
	document.getElementById('file-input').addEventListener('change', readSingleFile, false);
	resetGrid();
}

function placeAllShips(gameData){
	if(gameData){
		var playerInfo = new parsedFile(gameData);
		var playerName;

		for (var i = 0; i <= 1; i++) {
			ships = getShipData(i, playerInfo.places[i]);
			playerName = getPlayerName(playerInfo.names[i]);
			console.log(ships);
			for (key in ships) {
				placeShips(playerName, i, ships[key][0], ships[key][1], ships[key][2], key);
				//console.log(ships[key]);
			}

		}
	}
	else{
		console.log("No ships were loaded.");
	}
}

function removeAllShips(){
	console.log("All ships were removed.");
	for(key in ships){
		console.log("bla fuching bla")
	}
}