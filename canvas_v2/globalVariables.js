//things the whole program should know
var fps = 500;
var stepCounter = 0;
var timeCounter = 0;
var numberOfShots = 100;
var gameInfo;

//set up the grid so its not just a blue box
var gameBoard = document.getElementById("myCanvas");
var ctx = gameBoard.getContext("2d");
ctx.fillStyle = "#00FFFF";
ctx.fillRect(0, 0, gameBoard.width, gameBoard.height);
var grid0 = new playerGrid(0);
var grid1 = new playerGrid(1);
ctx.beginPath();
grid0.draw();
grid1.draw();