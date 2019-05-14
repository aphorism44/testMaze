
class MazeNode {
  //this class just holds the coordinates of a particular
  //point in the maze, and, if needed, the action/direction used
  //to get there (N, S, E, W) and the maximum number of rows/cols
  //, which is only used when we need to check if this node is legitimate
	constructor(row, col, direction = 'none') {
		this.row = row;
    this.col = col;
    this.direction = direction;
	}
	
	printNode() {
		let output = 'row: ' + this.row + ", col: " + this.col;
    if (this.direction)
      output += ", direction: " + this.direction
    console.log(output);
	}
}

module.exports = MazeNode;
