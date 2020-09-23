// PARTIALLY COMPLETE
 // https://www.youtube.com/watch?v=aKYlikFAV4k&t=14s&ab_channel=TheCodingTrain
 // left off at point 22:36

// create a grid 
var cols = 5;
var rows = 5;
var grid = new Array(cols)

// create arrays to be filled with the open set and the closed set
// as A* finds its way through the space, the open set will be populated 
var openSet = [];
var closedSet = [];

var start;
var end;

// so that the grid can be scaled 
var w, h; 

// create a class which represents each of the individual cells in the search space 
function Spot(i, j) {
    this.x = i;
    this.y = j;
    this.f = 0; 
    this.g = 0;
    this.h = 0;

    // show the actual grid 
    this.show = function(col) {
        fill(col);
        noStroke();
        rect(this.x * w, this.y * h, w-1, h-1);
    }
}

function setup(){
    createCanvas(400, 400);
    console.log('A*');
  
    // Grid cell size
    w = width / cols;
    h = height / rows;

    // create the grid from the array of all the columns 
    // basically just an array of arrays 
    for (var i = 0; i < cols; i++){
        grid[i] = new Array(rows); 
    }

    // create a grid of Spot objects 
    for (var i = 0; i < cols; i++){
        for (var j = 0; j < rows; j++){
            grid[i][j] = new Spot(i, j); 
        }
    }

    // TODO - Make Configurable!
    start = grid[0][0];
    end = grid[cols-1][rows-1];

    // add the very first position to the open set 
    openSet.push(start);



    console.log(grid);

}

function draw() {

    if (openSet.length > 0) {
        //we can continue

    } else {
        // no solution exists

    }

    background(0);

    for (var i = 0; i < cols; i++){
        for (var j = j; j < rows; j++){
            grid[i][j].show(color(255, 255, 255));
        }
    }

    for (var i = 0; i < closedSet.length; i++){
        closedSet[i].show(color(255, 0, 0))
    }

    for (var i = 0; i < openSet.length; i++){
        openSet[i].show(color(0, 255, 0))
    }

}