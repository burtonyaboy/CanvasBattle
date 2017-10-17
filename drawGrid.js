function drawGrid(id){
	//grab canvas info
	var gameBoard = document.getElementById("myCanvas");
	var ctx = gameBoard.getContext("2d");
	ctx.beginPath();
	//set origin
	var xo = id*600;
	var yo = 0;

	//individual grid dimensions
	var gridx = 500;
	var gridy = 500;

	
	//draw columns
	for(var i = 0; i <= gridx; i += 50){

		ctx.moveTo(i + xo, yo);
		ctx.lineTo(i + xo, gameBoard.height);
		ctx.stroke();

	}

	//draw rows
	for(var i = 0; i <= gameBoard.height; i += 50){

		ctx.moveTo(xo,i);
		ctx.lineTo(gridx + xo, i);
		ctx.stroke();

	}
}

function getGridArray(id){
	var gridArray = new Array();

	//setup the mother grid
	for(var row = 0; row < 10; row++){
		gridArray.push(new Array());
		//make an array for the top left corners of all grid squares
		for(var col = 0; col < 10; col++){
			gridArray[row].push({
				x: row*50 + 600*id,
				y: col*50
				});
		}
	}
	return gridArray;
}

function resetGrid(){
	
	var gameBoard = document.getElementById("myCanvas");
	var ctx = gameBoard.getContext("2d");
	ctx.beginPath();
	ctx.clearRect(0, 0, 400, 600);
	ctx.stroke();
	
	//drawGrid(0);
	//drawGrid(1);
}



