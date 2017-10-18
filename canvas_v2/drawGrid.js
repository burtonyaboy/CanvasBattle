function playerGrid(id){
	//set origin
	this.id = id;
	this.xo = id*600;
	this.yo = 0;

	//individual grid dimensions
	this.gridx = 500;
	this.gridy = 500;
	this.draw = function(){
		ctx.fillStyle = "#00FFFF";
		ctx.fillRect(0, 0, gameBoard.width, gameBoard.height);
		for(var i = 0; i <= this.gridx; i += 50){
			ctx.moveTo(i + this.xo, this.yo);
			ctx.lineTo(i + this.xo, gameBoard.height);
			ctx.stroke();
		}

		//draw rows
		for(var i = 0; i <= gameBoard.height; i += 50){
			ctx.moveTo(this.xo,i);
			ctx.lineTo(this.gridx + this.xo, i);
			ctx.stroke();
		}
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





