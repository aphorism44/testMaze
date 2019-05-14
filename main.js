let Maze = require('./Maze');

let wellFormed = [
	 [0, 1, 0, 0]
	,[0, 1, 1, 0]
	,[0, 0, 1, 0]
	,[0, 0, 1, 0]];

let threeExits = [
	 [0, 1, 0, 0]
	,[0, 1, 1, 1]
	,[0, 0, 1, 0]
	,[0, 0, 1, 0]];

let twoPaths = [
 [0, 1, 0, 0]
,[0, 1, 1, 0]
,[0, 1, 1, 0]
,[0, 0, 1, 0]];

let disconnected = [
 [0, 1, 0, 0]
,[0, 1, 0, 0]
,[0, 0, 1, 0]
,[0, 0, 1, 0]];

let needsBacktrack = [
 [0, 1, 0, 0, 0]
,[0, 1, 1, 1, 0]
,[0, 0, 1, 0, 0]
,[0, 0, 1, 0, 0]];

let wellFormed2 = [
 [0, 1, 0, 0, 0]
,[0, 1, 0, 0, 0]
,[0, 1, 0, 0, 0]
,[0, 1, 0, 0, 0]
,[0, 1, 0, 0, 0]
,[0, 1, 0, 0, 0]
,[0, 1, 0, 0, 0]
,[0, 1, 0, 0, 0]
,[0, 1, 0, 0, 0]];

let multiplePath = [
 [0, 1, 0, 0, 0]
,[0, 1, 0, 0, 0]
,[0, 1, 1, 0, 0]
,[0, 1, 1, 0, 0]
,[0, 1, 1, 0, 0]
,[0, 1, 1, 0, 0]
,[0, 1, 1, 0, 0]
,[0, 1, 1, 0, 0]
,[0, 1, 0, 0, 0]];

let emptyMaze = [];

let oneDMaze = [0, 1, 0, 0, 1];

console.log(1);
let maze1 = new Maze(wellFormed);
console.log(maze1.isWellFormed());

console.log(2);
let maze2 = new Maze(threeExits);
console.log(maze2.isWellFormed());

console.log(3);
let maze3 = new Maze(twoPaths);
console.log(maze3.isWellFormed());

console.log(4);
let maze4 = new Maze(disconnected);
console.log(maze4.isWellFormed());

console.log(5);
let maze5 = new Maze(needsBacktrack);
console.log(maze5.isWellFormed());

console.log(6);
let maze6 = new Maze(wellFormed2);
console.log(maze6.isWellFormed());

console.log(7);
let maze7 = new Maze(multiplePath);
console.log(maze7.isWellFormed());

console.log(8);
let maze8 = new Maze(emptyMaze);
console.log(maze8.isWellFormed());

console.log(9);
let maze9 = new Maze(oneDMaze);
console.log(maze9.isWellFormed());
