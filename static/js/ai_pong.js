// Use requestAnimationFrame to animate the game
// similar to setTimeout, but more optimized for the browser
var animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||

  // calls the callback at 60 calls/ second to simulate 60fps
  function(callback) { window.setTimeout(callback, 1000/60) };


// Get the canvas from the html page 
var canvas = document.getElementById("game_canvas"); 
// var canvas = document.createElement('canvas');
var width = 400;
var height = 600;
canvas.width = width;
canvas.height = height;

// get the 2D context of our new canvas and call it 'context' 
var context = canvas.getContext('2d');

// loads immediately after the page has been loaded
// TODO --- should make this a button --- 
window.onload = function() {
    document.body.appendChild(canvas);
    animate(step);
  };

// create the function for taking each step in the game
var step = function() {
  update();
  render();
  animate(step);
};

// function to update the ball and paddles
var update = function() {
};

// funciton to render the results using the context defined above 
var render = function() {
  context.fillStyle = "#0D47A1";
  // context.fillRect(100, 0, 100, 50);
};

// create function to animate paddle 
function Paddle(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.x_speed = 0;
    this.y_speed = 0;
  }
  
  // use prototype to inherit properties of a 'paddle' defined above 
  Paddle.prototype.render = function() {
    context.fillStyle = "#BDBDBD";
    context.fillRect(this.x, this.y, this.width, this.height);
  };

// put the players paddle at the bottom
function Player() {
    this.paddle = new Paddle(175, 580, 50, 10);
 }
 
// put the computers paddle at the top
 function Computer() {
   this.paddle = new Paddle(175, 10, 50, 10);
 }

// render the players paddle
 Player.prototype.render = function() {
    this.paddle.render();
  };

// render the computer's paddle  
Computer.prototype.render = function() {
    this.paddle.render();
  };

// create a function for the ball
function Ball(x, y) {
    this.x = x;
    this.y = y;
    this.x_speed = 0;
    this.y_speed = 3;
    this.radius = 5;
  }
  
// create a function to render the ball 
Ball.prototype.render = function() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
    context.fillStyle = "#ffffff";
    context.fill();
  };

// instantiate our objects 
var player = new Player();
var computer = new Computer();
var ball = new Ball(200, 300);

// render the new objects 
var render = function() {
    context.fillStyle = "#0D47A1";
    context.fillRect(0, 0, width, height);
    player.render();
    computer.render();
    ball.render();
  };