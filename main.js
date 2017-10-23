/*
This is a visualizer script for a battleship game.
Made by Isaac Burton
*/

//======================================================================================================================================================//

//things the whole program should know
var padding = 100;
var gridx = 50;
var gridy = 50;
var bulletRadius = gridx/4;
//var fps = 300;
var gameData;

var run = 0;
var stepForward = 0;
var stepBack = 0;

//gameboard and context
var ctx = null, gameBoard = null;

//index values occupied by ships for each player
var gridSpaces = new Array();
var shotSpaces = new Array();

//colors!
var shipColor = "#DDDDDD";
var oceanColor = "#00FFFF";
var bulletColor = "#000000";
var hitColor = "#FF0000";
var missColor = "#FFFFFF";

//list of gridspaces for each player
for(var id = 0; id <= 1; id++){
	gridSpaces.push(new Array());
	//setup the mother grid
	for(var row = 0; row < 10; row++){
		gridSpaces[id].push(new Array());
		//make an array for the top left corners of all grid squares
		for(var col = 0; col < 10; col++){
			gridSpaces[id][row].push(" ");
		}
	}
}
//list of shots for each player
for(var id = 0; id <= 1; id++){
	shotSpaces.push(new Array());
	//setup the mother grid
	for(var row = 0; row < 10; row++){
		shotSpaces[id].push(new Array());
		//make an array for the top left corners of all grid squares
		for(var col = 0; col < 10; col++){
			shotSpaces[id][row].push(null);
		}
	}
}



//======================================================================================================================================================//
/*sets up the board and waits for a file to be loaded
function waitForFile(){
	//set up the grid so its not just a blue box
	gameBoard = document.getElementById("myCanvas");
	ctx = gameBoard.getContext("2d");
	//ctx.fillStyle = "#00FFFF";
	//ctx.fillRect(0, 0, gameBoard.width, gameBoard.height);

	//after the grid is drawn, wait until a file is loaded
	document.getElementById('file-input').addEventListener('change', readSingleFile, false);
}
//======================================================================================================================================================//

function readSingleFile() {
	var url = window.location.href;
	var param = url.split("?");

	if(param.length > 1){
		var logFile = param[1];
		//var file = e.target.files[0];
		var contents;
		//if no file is loaded or loaded file is empty do nothing
		if(!logFile){
			return;
		}
		//once the reader loads, start the program from beginning
		var reader = new FileReader();

		reader.onload = function(e) {
			contents = e.target.result;
			munchData(contents);
			//start();
		};
		reader.readAsText(logFile);
	}
	
}

*/

//======================================================================================================================================================//

function urlLoaded(){
	var url = window.location.href;
	var param = url.split("?");

	if(param.length > 1){
		var logFile = param[1];
		var client = new XMLHttpRequest();
		client.open('GET', 'logs/' + logFile);
		client.onreadystatechange = function(){
			if(client.readyState === XMLHttpRequest.DONE && client.status === 200){
				gameData = client.responseText;
				gameBoard = document.getElementById("myCanvas");
				ctx = gameBoard.getContext("2d");
				start();
			}
		}
		client.send();
	}
}
//file:///Users/tamer/Documents/bs/canvas_v3/index.html?JavaBossVSBoss.log
//======================================================================================================================================================//

function start(){
	//start at line 1 of the file and go from there
	run = 1;
	//add event listeners for buttons that will soon be coming
	if(run){
		document.getElementById("run-type").innerHTML = "Running...";
		munchData();
	}
	else{
		//write paused
	}
	//drawGraphics(gameData);
}
//======================================================================================================================================================//
//processes data up to given line
function munchData(line){
	var lines = gameData.split("\n");
	var line=0;
	setInterval(function(){
		
			parseLine(lines[line++]);
			drawGrid(0);
			drawGrid(1);
	}, 500);
	
}

//could be included in munchdata, but this makes it more modular.
//decideds the type of line and acts accordingly
function parseLine(lineData){
	var lineType = String(lineData.slice(0,3));
	if(lineType === "NAM"){
		//grab the players name and return it
		//example line:
		//NAME 0: Dummy
		var player = lineData[5];
		console.log(player);
		document.getElementById("namePlayer" + player).innerHTML = lineData.slice(7, lineData.length);
		}
	else if(lineType === "PLA"){
		//place the ships through a method, return 0?
		//example line:
		//PLACE 0: {"B": [3, 1, "h"], "C": [3, 8, "h"], "S": [1, 2, "h"], "P": [2, 6, "h"], "D": [1, 5, "h"]}
		var ships = JSON.parse(lineData.slice(9));
		var player = Number(lineData[6]);
		console.log(lineData[6]);
		for(var key in ships){
			shipConstructor(player, ships[key][0], ships[key][1], ships[key][2], key);
		}
	}
	else if(lineType === "SHO"){
		//send a bullet from the players ID to the coordinates specified
		//example line:
		//SHOOT 0: [5, 5]
		var location = JSON.parse(lineData.slice(8));
		var id = Math.abs(Number(lineData[6])-1);
		var wasHit = false;
		if(gridSpaces[id][location[0]][location[1]] !== " "){
			wasHit = true;
		}
		shotSpaces[id][location[0]][location[1]] = wasHit;
	}
	else if(lineType === "WIN"){
		//declare winner and stop program
		//example line:
		//WIN 1
		console.log(lineData + "game over!");
	}
	else{
		//something went terribly wrong! (or I did something terribly wrong :( )
		console.log("error...");
	}
}

//======================================================================================================================================================//

function shipConstructor(id, x, y, orien, type){
	//console.log(id);
	var width = gridx;
	var height = gridy;
	var length = 1;
	
	switch(type){
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
	//set the height or width to length value
	//depending on orientation
	if(orien === "h"){
		width *= length;
	
		for (var i = x; i < length + x; i++) {
			gridSpaces[id][i][y] = type;
		}
	}
	else if(orien === "v"){
		height *= length;

		for (var i = y; i < length + y; i++) {
			gridSpaces[id][x][i] = type;
		}
	}
	else{
		console.log("Error setting orientation for ship " + type + " " + x + " " + y);
	}
/*
	var draw = function(){
		//set the actual location
		ctx.beginPath();
		ctx.fillStyle = "Grey";
		ctx.fillRect(x, y, width, height);
	};
	*/
}

//======================================================================================================================================================//

function drawGrid(id){
	for(var i = 0; i < 10; i++){
		for(var j = 0; j < 10; j++){
			ctx.beginPath();
			//console.log(String(i*gridx + id * (10 * gridx + padding))+ " " +String(j*gridy));
			if(gridSpaces[id][i][j] !== " "){
				ctx.fillStyle = shipColor;
				ctx.rect(i*gridx + id * (10 * gridx + padding), j*gridy, gridx, gridy);
				ctx.fill();
				if(shotSpaces[id][i][j] === true){
					ctx.beginPath();
					ctx.fillStyle = hitColor;
					ctx.arc(gridx*i + id * (10 * gridx + padding) + gridx/2, gridy*j + gridy/2, bulletRadius, 0, Math.PI*2, true);
					ctx.fill();
				}
			}
			else{
				ctx.fillStyle = oceanColor;
				ctx.rect(i*gridx + id * (10 * gridx + padding), j*gridy, gridx, gridy);
				ctx.fill();
				if(shotSpaces[id][i][j] === false){
					ctx.beginPath();
					ctx.fillStyle = missColor;
					ctx.arc(gridx*i + id * (10 * gridx + padding) + gridy/2, gridy*j + gridy/2, bulletRadius, 0, Math.PI*2, true);
					ctx.fill();
				}
			}
		}
	}
}

//======================================================================================================================================================//
/*
function drawBullet(id, x, y){
	//draw a circle with arguments position and color
	var radius = 25;
	ctx.beginPath();
	ctx.fillStyle = bulletColor;
	ctx.arc(gridx*x + id*600 + 25, gridy*y + 25, radius, 0, Math.PI*2, true);
	ctx.fill();
	console.log("bullet printed");
	//console.log("bullet placed at " + x + y);
}
*/
//======================================================================================================================================================//

/*
function shoot(lineData){
	
}
*/

//======================================================================================================================================================//

//======================================================================================================================================================//

//======================================================================================================================================================//


