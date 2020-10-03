// The source for this project can be found here: https://thoughtbot.com/blog/pong-clone-in-javascript
// much of the JS code was adapted from this souece. this was my starting place for the pong game - I 
// then went in and added a few other AI opponents which users could play against

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


// add animation to the ball
var update = function() {
    ball.update();
};

// update the ball's position based on the speed
Ball.prototype.update = function() {
    this.x += this.x_speed;
    this.y += this.y_speed;
};

// add in the animation for the paddle
var update = function() {
    ball.update(player.paddle, computer.paddle);
  };


// add controls
// we now need to add the controls before we define the Ball.prototype.update
var keysDown = {};
var spaceDown = {}; // add another array to be filled by space down 

// for paddle controls 
window.addEventListener("keydown", function(event) {
  keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
  delete keysDown[event.keyCode];
});

// for next game start 
window.addEventListener("keydown", function(event) {
  spaceDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
  delete spaceDown[event.keyCode];
});

var update = function() {
    // call update method for player object
    player.update();

    // call update method for ball object 
    ball.update(player.paddle, computer.paddle);
  };
  
  Player.prototype.update = function() {
    for(var key in keysDown) {
      var value = Number(key);
      if(value == 37) { // left arrow
        this.paddle.move(-4, 0);
      } else if (value == 39) { // right arrow
        this.paddle.move(4, 0);
      } else {
        this.paddle.move(0, 0);
      }
    }
  };
  
  Paddle.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
    this.x_speed = x;
    this.y_speed = y;
    if(this.x < 0) { // all the way to the left
      this.x = 0;
      this.x_speed = 0;
    } else if (this.x + this.width > 400) { // all the way to the right
      this.x = 400 - this.width;
      this.x_speed = 0;
    }
  }

  
// create scores for computer and player to be updated during the game 
var computer_score = 0
var player_score = 0 

  // add bounderies for the ball
Ball.prototype.update = function(paddle1, paddle2) {
  this.x += this.x_speed;
  this.y += this.y_speed;
  var top_x = this.x - 5;
  var top_y = this.y - 5;
  var bottom_x = this.x + 5;
  var bottom_y = this.y + 5;

  if(this.x - 5 < 0) { // hitting the left wall
    this.x = 5;
    this.x_speed = -this.x_speed;
  } else if(this.x + 5 > 400) { // hitting the right wall
    this.x = 395;
    this.x_speed = -this.x_speed;
  }

  if(top_y > 300) {
    if(top_y < (paddle1.y + paddle1.height) && bottom_y > paddle1.y && top_x < (paddle1.x + paddle1.width) && bottom_x > paddle1.x) {
      // hit the player's paddle
      this.y_speed = -3;
      this.x_speed += (paddle1.x_speed / 2);
      this.y += this.y_speed;
    }
  } else {
    if(top_y < (paddle2.y + paddle2.height) && bottom_y > paddle2.y && top_x < (paddle2.x + paddle2.width) && bottom_x > paddle2.x) {
      // hit the computer's paddle
      this.y_speed = 3;
      this.x_speed += (paddle2.x_speed / 2);
      this.y += this.y_speed;
    }
  }

  // YOU WIN A POINT 
  if (this.y < 0) { 
    this.x_speed = 0;
    this.y_speed = 0; // <-- change the y speed to 0 until button is pressed! 
    this.x = 200;
    this.y = 300;

    // increment the computer score by 1
    player_score += 1

    // update the value retrieved by the html page 
    document.getElementById("playerScore").innerHTML = player_score;
    }

  // YOU LOSE A POINT 
  if (this.y > 600) { 
    this.x_speed = 0;
    this.y_speed = 0; // <-- change the y speed to 0 until button is pressed! 
    this.x = 200;
    this.y = 300;

    // increment the player score by 1
    computer_score += 1

    // update the value retrieved by the html page 
    document.getElementById("computerScore").innerHTML = computer_score;
    }

    // after winning a point or losing a point, press the space bar to begin the next game 
    for(var key in spaceDown) {
      var value = Number(key);
      // 
      if(value == 32) { // space bar
        this.x_speed = 0;
        this.y_speed = 3; // <-- change the y speed to 0 until button is pressed! 
        this.x = 200;
        this.y = 300;
      } 
    }

};


// DEFINE RULES BASED AI
var update = function() {
    player.update();
    computer.update(ball);
    ball.update(player.paddle, computer.paddle);
  };
  
  Computer.prototype.update = function(ball) {
    var x_pos = ball.x;
    var diff = -((this.paddle.x + (this.paddle.width / 2)) - x_pos);
    if(diff < 0 && diff < -4) { // max speed left
      diff = -5;
    } else if(diff > 0 && diff > 4) { // max speed right
      diff = 5;
    }
    this.paddle.move(diff, 0);
    if(this.paddle.x < 0) {
      this.paddle.x = 0;
    } else if (this.paddle.x + this.paddle.width > 400) {
      this.paddle.x = 400 - this.paddle.width;
    }
  };

// --- Choose Rules Based AI --- 
document.getElementById("rules_AI").onclick = function(){
    // todo 

    // Flash success message after network parameters get updated 
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

// --- Tensorflow AI --- 
document.getElementById("tf_AI").onclick = function(){
    // todo 

    // Flash success message after network parameters get updated 
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

// --- Reinforcement Learning AI --- 
document.getElementById("rl_AI").onclick = function(){
    // todo 

    // Flash success message after network parameters get updated 
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}