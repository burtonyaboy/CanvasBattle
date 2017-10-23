function drawGraphics(gameData){

	ctx.beginPath();
	ctx.clearRect(0, 0, gameBoard.width, gameBoard.height);

	//var grids = [grid0, grid1];
	ctx.beginPath();
	grid0.draw();
	grid1.draw();

	ctx.beginPath();
	placeAllShips(gameData);
	drawShots();

}

function placeAllShips(gameData){
	if(gameData){
		var playerName;

		for (var i = 0; i <= 1; i++) {
			ships = getShipData(i, gameInfo.places[i]);
			playerName = getPlayerName(gameInfo.names[i]);
			//console.log(ships);
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

function drawBullet(id, x, y, color){
	//draw a circle with arguments position and color
	var radius = 25;
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.arc(x + 25, y + 25, radius, 0, Math.PI*2, true);
	ctx.fill();
	console.log("bullet placed at " + x + y);
}

function drawShots(){
	var currentShots = new Array();
	var allShots = getShots(gameInfo.shots);
	var color = "#000000";
	currentShots = allShots.slice(0, stepCounter);
	console.log(currentShots);
	id = 0;
	gridArray = getGridArray(id);
	for(shot in currentShots){
		drawBullet(id, 50*currentShots[shot][1] + id*600, 50*currentShots[shot][2], color);
		id = Math.abs(id-1);
		gridArray = getGridArray(id);
	}
}