
let MazeNode = require('./MazeNode');

class Maze {

	//maze is a 2D integer array of 1s and 0s
	//(1 = open space, 0 = blocked space)
	//an "exit" is a "1" on the border of the 2D array
	constructor(maze) {
		this.maze = maze;
    this.height = this.maze.length;
    if (this.height > 0)
      this.width = this.maze[0].length;
    else {
      this.width = 0;
    }
	}

  isWellFormed() {
    //check that there's only 2 maze exits, and record them
    let exitArray = this.getExits();
    if (exitArray.length !== 2) {
      return false;
    } else {
        this.startPoint = exitArray[0];
        this.endPoint = exitArray[1];
    }

    //now try tracing two different paths
		//NOTE - the "directionOrder" is an array showing which order we
		//"look" for an opening
    let pathClockwise = this.tracePath(['N', 'E', 'S', 'W']);
		//this.printMaze();
		this.resetMaze();
		let pathCounterClockwise = this.tracePath(['W', 'S', 'E', 'N']);
		//this.printMaze();

		//console.log("pathClockwise");
		//console.log(pathClockwise);
		//console.log("pathCounterClockwise");
		//console.log(pathCounterClockwise);

		//if no path, is not wellformed
		if (pathClockwise == null || pathCounterClockwise == null)
			return false;

		//if more than one path, is not wellformed
		if (this.stacksEqual(pathClockwise, pathCounterClockwise))
			return true;

    return false;
  }

  getExits() {
    let exits = [];
    for (let row = 0; row < this.maze.length; row++) {
      if (row === 0 || row === this.maze.length - 1) {
        for (let col = 0; col < this.maze[row].length; col++) {
          if (this.maze[row][col] == 1)
            exits.push(new MazeNode(row, col));
        }
      } else {
        if (this.maze[row][0] === 1)
          exits.push(new MazeNode(row, 0));
          if (this.maze[row][this.width - 1] === 1)
            exits.push(new MazeNode(row, this.width - 1));
      }
    }
    return exits;
  }

	//follow the standard stack-backtrack method of finding a path (equivalent to
	//depth-first)
	tracePath(directionOrder) {
		let solved = false;
		let moveStack = [];
		let entryNode = this.startPoint;
		moveStack.push(entryNode);
		while (true) {
			let currentNode = moveStack[0];
			this.markTraverse(currentNode);
			if (this.reachedGoal(currentNode)) {
				solved = true;
				break;
			} else {
				let nextNode = this.getNextDirectionNode(currentNode, directionOrder);
				if (nextNode) {
					moveStack.unshift(nextNode);
				} else {
					//time to backtrack
					moveStack.shift();
					if (moveStack.length < 1)
						break;
				}
			}
		}

		if (solved)
			return moveStack;
		else
			return null;
	}

	//marks a spot in the maze as "visited"
	markTraverse(node) {
		this.maze[node.row][node.col] = 2;
	}

	//marks all "visited" nodes as normal
	resetMaze() {
		for (let row = 0; row < this.height; row++)
			for (let col = 0; col < this.width; col++)
				if (this.maze[row][col] === 2)
					this.maze[row][col] = 1;
	}

  getNextDirectionNode(node, directionOrder) {
		//using a map to record reachable nodes
		let directionMap = new Map();
		directionOrder.forEach((direction) => {
			switch(direction) {
				case 'N': {
					let northNode = new MazeNode(node.row - 1, node.col, 'N');
					if (this.isValidNode(northNode))
			      directionMap.set('N', northNode);
					break;
				}
				case 'E': {
					let eastNode = new MazeNode(node.row, node.col + 1, 'E');
					if (this.isValidNode(eastNode))
			      directionMap.set('E', eastNode);
					break;
				}
				case 'S': {
					let southNode = new MazeNode(node.row + 1, node.col, 'S');
					if (this.isValidNode(southNode))
			      directionMap.set('S', southNode);
					break;
				}
				case 'W': {
					let westNode = new MazeNode(node.row, node.col - 1, 'W');
					if (this.isValidNode(westNode))
			      directionMap.set('W', westNode);
					break;
				}
			}

		});
		//return the first "reachable node" according to the problem's
		//direction logic
		for (let i = 0; i < directionOrder.length; i++) {
			let nextNode = directionMap.get(directionOrder[i]);
			if (nextNode)
				return nextNode;
		}

		//returns null if there's no more directions to try
		return null;
  }

	isValidNode(node) {
    if (node.row < 0 || node.row >= this.height)
      return false;
    if (node.col < 0 || node.col >= this.width)
        return false;
		if (this.maze[node.row][node.col] !== 1)
			return false;
		return true;
	}

	reachedGoal(node) {
		if (node.row == this.endPoint.row && node.col == this.endPoint.col)
			return true;
		else
			return false;
	}


	stacksEqual(arrayA, arrayB) {
		if (arrayA.length !== arrayB.length)
			return false;

		for (let i = 0; i < arrayA.length; i++) {
			let nodeA = arrayA[i];
			let nodeB = arrayB[i];
			if (nodeA.row !== nodeB.row || nodeA.col !== nodeB.col || nodeA.direction !== nodeB.direction)
				return false;
		}

		return true;
	}

	printMaze() {
    console.log("height: " + this.height + ", width: " + this.width);
    for (let row = 0; row < this.maze.length; row++) {
      console.log(this.maze[row]);
    }
	}
}

module.exports = Maze;
