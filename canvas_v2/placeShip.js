function placeShips(shipName, idOfPlayer, xUpperLeft, yUpperLeft, horiOrVert, typeOfBoat){
	var shipName = new ship(idOfPlayer, xUpperLeft, yUpperLeft, horiOrVert, typeOfBoat);
	shipName.draw();
}

function ship(id, x, y, orien, type){
	this.id = id;
	//x and y as passed from the logs
	this.x = x;
	this.y = y;
	this.width = 50;
	this.height = 50;
	this.orien = orien;
	this.type = type;
	this.getLength = function(){
		var length = 1;
		switch(this.type){
			case "C":
				length = 5;
				break;
			case "B":
				length = 4;
				break;
			case "S":
				length = 3;
				break;
			case "D":
				length = 3;
				break;
			case "P":
				length = 2;
				break;
			default:
				alert("no length was set");
				length = 0;
				break;
		}
		return length;
	};
	this.length = this.getLength();
	this.setOrien = function(){
		if(this.orien === "h"){
			this.width *= this.length;
		}
		else if(this.orien === "v"){
			this.height *= this.length;
		}
	};
	this.setOrien();
	this.alignToGrid = function(){
		var gridArray = new Array();
		gridArray = getGridArray(this.id);
		//alert(gridArray[x][y].x);
		this.x = gridArray[x][y].x;
		this.y = gridArray[x][y].y;
	}
	this.alignToGrid();
	this.draw = function(){
		ctx.beginPath();
		ctx.fillStyle = "Grey";
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}
/*
var bullet = function(startx, starty, finalx, finaly){
	this.startx = startx;
	this.starty = starty;
	this.x = finalx;
	this.y = finaly;
	this.radius = 25;
	this.draw = function(){
		ctx.beginPath();
		ctx.fillStyle = "#000000";
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
		ctx.fill();
	}
}
*/






