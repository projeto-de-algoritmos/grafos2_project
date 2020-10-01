let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

const height = 500;
const width = 770;

var aLoopSize = 11, bLoopSize = 17;
var u = 10, v = 16, size = 23;

var maze = [];
var prev = [];
var safe = [];
var mst = [];


class Node {
  constructor(x, y, size, value){
    this.x = x * 2 * size;
    this.y = y * 2 * size;
    this.size = size;
    this.value = value;

    this.isInMST = false;
    this.path = false;
    this.currentNode = false;
    this.edges = [];

    this.draw = this.draw;
  }

  draw() {
    if(this.isInMST) {
      if(this.path || this.current){
        context.fillStyle = "red";
      } else {
        context.fillStyle = "white";
      }
      context.fillRect(this.x, this.y, this.size, this.size);
    }
  }
}

class Edge {
  constructor(nodeA, nodeB, edge){
    this.a;
    this.b;
    this.weight;
    this.minimal = false;

    if(nodeA === undefined && nodeB === undefined && edge === undefined){
      this.weight = Infinity;
    }

    else if (edge === undefined) {
      this.weight = Math.round(Math.random());
      this.a = nodeA;
      this.b = nodeB;
    }
    
    else {
      this.weight = edge.weight;
      this.a = nodeA;
      this.b = nodeB;
    }
  
    this.draw = this.draw;
  }
  
  draw(){
    if (this.minimal) {
      var size = this.a.size;

      if(this.a.path && this.b.path) {
        context.fillStyle = "red"
      } else {
        context.fillStyle = "white";
      }
      context.fillRect((this.a.x + this.b.x) / 2, (this.a.y + this.b.y) / 2, size, size);
    }
  }
}

function initialize(){
  for(var i = 0; i < aLoopSize; i++){
    maze[i] = [];
    for(var j = 0; j < bLoopSize; j++) {
      maze[i][j] = new Node(j, i, size, i * bLoopSize + j);
    }
  }

  // Adiciona paredes laterais
  for (var i = 0; i < aLoopSize; i++){
    for(var j = 0; j < bLoopSize - 1; j++){
      maze[i][j].edges[0] = new Edge(maze[i][j], maze[i][j + 1]);

      maze[i][j + 1].edges[2] = new Edge(maze[i][j + 1], maze[i][j], maze[i][j].edges[0]);
    }
  }

  // Adiciona paredes inferiores
  for (var i = 0; i < aLoopSize - 1; i++){
    for(var j = 0; j < bLoopSize; j++){
      maze[i][j].edges[1] = new Edge(maze[i][j], maze[i + 1][j]);

      maze[i + 1][j].edges[3] = new Edge(maze[i + 1][j], maze[i][j], maze[i][j].edges[1]);
    }
  }

  prev[0] = maze[0][0];

  safe[0] = maze[0][0].edges[0];
  safe[1] = maze[0][0].edges[1];

  maze[0][0].isInMST = true;
  maze[0][0].path = true;

  mst[0] = maze[0][0];
  mst[0].draw();
}






// // Player Functionality

// function drawPlayer(player){
//   context.clearRect(player.x * 50, player.y * 50, 50, 50);

//   context.beginPath();
//   context.fillStyle = '#00FF00';
//   context.fillRect(player.nextX * 50, player.nextY * 50, 50, 50);

//   player.x = player.nextX;
//   player.y = player.nextY;

//   if (player.x === 9 && player.y === 9){
//     alert('Ganhou!');
//   }
// }

// var player = {
//   x: 0,
//   y: 0,
//   nextX: 0,
//   nextY: 0
// };

// window.onkeydown = function(e){
//   if(e.key === "ArrowLeft"){
//     if(player.x !== 0) {
//       player.nextX -= 1;
//       if(maze[player.nextY][player.nextX] !== 1){
//         drawPlayer(player);
//       } else {
//         player.nextX += 1;
//       } 
//     }
//   }
//   if(e.key === "ArrowUp"){
//     if(player.y !== 0) {
//       player.nextY -= 1;
//       if(maze[player.nextY][player.nextX] !== 1){
//         drawPlayer(player);
//       } else {
//         player.nextY += 1;
//       } 
//     }
//   }
//   if(e.key === "ArrowRight"){
//     if(player.x !== 9) {
//       player.nextX += 1;
//       if(maze[player.nextY][player.nextX] !== 1){
//         drawPlayer(player);
//       } else {
//         player.nextX -= 1;
//       } 
//     }
//   }
//   if(e.key === "ArrowDown"){
//     if(player.y !== 9) {
//       player.nextY += 1;
//       if(maze[player.nextY][player.nextX] !== 1){
//         drawPlayer(player);
//       } else {
//         player.nextY -= 1;
//       } 
//     }
//   } 
// }

// // Initialize the game

window.onload = function() {
  initialize();
}

