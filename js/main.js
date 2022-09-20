const canvas = document.getElementById('myCanvas');
const paint = canvas.getContext('2d');

const scoreChart = document.getElementById('score-chart')

//define a location for the ball
let ballPositionX = canvas.width / 2;
let ballPositionY = canvas.height-30;

//define the moving figures for my ball
let directionX = 2;
let directionY = -2;

//define size of ball and size of paddle
const ballRadius = 8;
const paddleHeight = 8;
const paddleWidth = 75;

//define starting paddle position
let paddlePosition = (canvas.width - paddleWidth) / 2

let rightPressed = false;
let leftPressed = false;

//define bricks characters

let brickHeight = 15
let brickWidth = 80
let brickPositionX = 10
let brickPositionY = 10
let brickPadding = 12
let brickColumns = 7
let brickRows = 2
let brickLeftMargin = 20

let bricks = [];

for (let i = 0; i < brickColumns; i++){
    bricks[i] = [];
    for(j = 0; j<brickRows; j++){
        bricks[i][j] = {x:0, y:0, status:1};
    }
}
console.log(bricks)


document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function drawPaddle() {
    paint.beginPath();
    paint.rect(paddlePosition, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    paint.fillStyle = "#FF9C33";
    paint.fill();
    paint.closePath();
  }

function keyDownHandler(event) {
    if (event.key === "ArrowRight") {
      rightPressed = true;
    } else if (event.key === "ArrowLeft") {
      leftPressed = true;
    }
  }

  function keyUpHandler(event) {
    if (event.key === "ArrowRight") {
      rightPressed = false;
    } else if (event.key === "ArrowLeft") {
      leftPressed = false;
    }
  }

  function detectCollision(){
    for(let i = 0; i<brickColumns; i++){
        for(let j = 0; j<brickRows; j++){
            let singleBrick = bricks[i][j];
            if(singleBrick.status === 1){
            if(ballPositionX  > singleBrick.x && ballPositionX  < singleBrick.x + brickWidth && ballPositionY > singleBrick.y && ballPositionY < singleBrick.y + brickHeight){
                directionY = -directionY
            singleBrick.status = 0;}
            }
        }
    
    }
     
}

function drawBall() {
    paint.beginPath();
    paint.arc(ballPositionX, ballPositionY, ballRadius, 0, Math.PI * 2);
    paint.fillStyle = "#4B2804";
    paint.fill();
    paint.closePath();
  }

  
  function drawBricks() {
    for(let i=0; i<brickColumns; i++){
        for(let j=0; j<brickRows; j++){
            if(bricks[i][j].status ===1){
                let brickX = (i * (brickWidth + brickPadding)) + brickLeftMargin
                let brickY = (j * (brickHeight + brickPadding));
                bricks[i][j].x = brickX;
                bricks[i][j].y = brickY;
                paint.beginPath();
                paint.rect(brickX, brickY, brickWidth, brickHeight);
                paint.fillStyle = "#000000";
                paint.fill();
             paint.closePath();
            }
        }

    }
  }
  
  

  

 

  function gamePlay() {
    paint.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    detectCollision();


    if(rightPressed === true) {
        paddlePosition += 7;
        if(paddlePosition > canvas.width-paddleWidth){
    paddlePosition = (canvas.width-paddleWidth)}
    }
    else if(leftPressed === true) {
        paddlePosition -= 7;
        if (paddlePosition < 0){
            paddlePosition = 0;
        }
    }
    
    // implementing bouncing off the walls 
    
    if(ballPositionX + directionX > canvas.width-ballRadius || ballPositionX + directionX < ballRadius) {
        directionX = -directionX;
    }
    if (ballPositionY + directionY < ballRadius) {
        directionY = -directionY;
      } 
      
    // implement bouncing off the paddle and setting end game

      else if (ballPositionY + directionY > canvas.height - ballRadius) {
        if(ballPositionX > paddlePosition && ballPositionX < paddlePosition + paddleWidth){
            directionY = -directionY;
        } else {
        console.log('game is over');
        location.href = "gameover.html"; 
         }
      }
    
   
    //implementing moving of ball
    ballPositionX += directionX;
    ballPositionY += directionY;
}

const interval = setInterval(gamePlay, 10);

