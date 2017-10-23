function start(gameData){
	gameInfo = new parsedFile(gameData);
	numberOfShots = gameInfo.shots.length;
	shotCounter = 0;
	//numberOfShots = getShots()
	drawGraphics(gameData);
	if(numberOfShots >= shotCounter){
		setInterval(update, 1000/fps);
		//update();
	}
	else{
		//console.log("The game is OVER >:D")
		alert("The game is OVER >:D");
	}
	//alert("GAME OVER");
}

function waitForFile(){
	document.getElementById('file-input').addEventListener('change', readSingleFile, false);
}

function update(){
	//console.log(gameCounter);
	timeCounter++;
	if(timeCounter%100 === 0){
		drawGraphics(gameInfo);
		stepCounter++;
	}
}

function run(){
	//put a constantly running program here
}

function stepBack(){
	//code that resets the board and runs the last shot
}

function stepForward(){
	//run only the next shot command
}