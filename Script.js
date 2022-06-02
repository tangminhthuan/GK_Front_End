var canvas = document.getElementById("snakeCanvas");
var context = canvas.getContext("2d");
var score = document.getElementById("score");
var startBtn = document.getElementById("startBtn");
var fruit = document.getElementById("fruit");
var virus = document.getElementById("virus");
var snakeHeadX, snakeHeadY, fruitX, fruitY, virusX, virusY, tail, totalTail, directionVar, direction, previousDir,wallX,wallY;
var speed=1, xSpeed, ySpeed;
const scale = 20;
var rows = canvas.height / scale;
var columns = canvas.width / scale;
var min = scale / 10;
var max = rows - min;
var gameInterval,
    virusInterval,
    intervalDuration=200;
var playing, gameStarted;
var boundaryCollision;
var wallCollision;
var tail0;
var xArray,yArray
xArray = [5,4,3,2,1,1,1,1,1,1,1,1,1,1,2,3,4,5,19,20,21,22,23,23,23,23,23,19,20,21,22,23,23,23,23,23];
yArray = [1,1,1,1,1,2,3,4,5,19,20,21,22,23,23,23,23,23,1,1,1,1,1,2,3,4,5,23,23,23,23,23,19,20,21,22];


startBtn.addEventListener("click", startGame);


function reset() {
    clearInterval(gameInterval);
    clearInterval(virusInterval);
    tail = [];
    totalTail = 0;
    point=0;
    directionVar = "Right";
    direction = "Right";
    previousDir = "Right";
    xSpeed = scale * speed;
    ySpeed = 0;
    snakeHeadX = 0;
    snakeHeadY = 0;
    playing=false, gameStarted=false;
    boundaryCollision=false;

}
function leverUp() {
    clearInterval(gameInterval);
    clearInterval(virusInterval);
    tail = [];
    totalTail = 0;
    directionVar = "Right";
    direction = "Right";
    previousDir = "Right";
    xSpeed = scale * speed;
    ySpeed = 0;
    snakeHeadX = 0;
    snakeHeadY = 0;
    boundaryCollision=false;
}
function startGame() {
    reset();
    gameStarted=true;
    playing=true;
    fruitPosition();
    main();
}

window.addEventListener("keydown", pressedKey);
function pressedKey(event) {
    previousDir = direction;
    directionVar=event.keyCode;
    directionVar = event.key.replace("Arrow", "");
    changeDirection();

}
function pressedKey(event) {
        previousDir = direction;
        directionVar=event.keyCode;
        directionVar = event.key.replace();
        changeDirection();

}

//đổi hướng theo mũi tên dc nhấn
function changeDirection() {
    switch (directionVar) {
        case "ArrowUp":
            if (previousDir != "ArrowDown") {
                direction=directionVar;
                xSpeed = 0;
                ySpeed = scale * -speed;
            }
            break;

        case "ArrowDown":
            if (previousDir !== "ArrowUp") {
                direction=directionVar;
                xSpeed = 0;
                ySpeed = scale * speed;
            }
            break;

        case "ArrowLeft":
            if (previousDir !== "ArrowRight") {
                direction=directionVar;
                xSpeed = scale * -speed;
                ySpeed = 0;
            }
            break;

        case "ArrowRight":
            if (previousDir !== "ArrowLeft") {
                direction=directionVar;
                xSpeed = scale * speed;
                ySpeed = 0;
            }
            break;
        case "p":
             {if(totalTail==0){
                 direction=directionVar;
                 xSpeed = 0;
                 ySpeed = 0;}
            }
            break;
    }
}

//tạo tọa độ ngẫu nhiên
function generateCoordinates() {
    let xCoordinate = (Math.floor(Math.random() * (max - min) + min)) * scale;
    let yCoordinate = (Math.floor(Math.random() * (max - min) + min)) * scale;
    return {xCoordinate, yCoordinate};
}

//kiểm tra rắn va chạm
function checkCollision() {
    let tailCollision=false;
    boundaryCollision=false;
    //với đuôi
    for (let i = 0; i < tail.length; i++) {
        if (snakeHeadX == tail[i].tailX && snakeHeadY == tail[i].tailY) {
            tailCollision=true;
        }
    }
    //với ranh giới
    if(snakeHeadX >= canvas.width || snakeHeadX < 0 || snakeHeadY >= canvas.height || snakeHeadY < 0)
    {
        boundaryCollision=true;
    }


    return (tailCollision || boundaryCollision );
}
//đụng virus
function VirusCollision(){
   let virusCollision=false;
    if(snakeHeadX===virusX && snakeHeadY===virusY) {
        virusCollision=true;
    }
    return(virusCollision);
}
//đụng tường
function WallCollision(){
    let wallCollision=false;
    for(let i=0;i<xArray.length && i<yArray.length;i++) {
        wallX = xArray[i] * scale;
        wallY = yArray[i] * scale;
        if (snakeHeadX == wallX && snakeHeadY == wallY) {
            wallCollision = true;
        }

    }return(wallCollision);
}

//-----------------------------------------------------SNAKE-----------------------------------------------------------//
function drawSnakeHead(color) {
    context.beginPath();
    context.arc(snakeHeadX+scale/2, snakeHeadY+scale/2, scale/2, 0, 2 * Math.PI);
    context.fillStyle = color;
    context.fill();
}

function drawSnakeTail() {
    for (let i = 0; i < tail.length; i++) {
        context.beginPath();
        context.fillStyle = "black";
        context.fillRect((tail[i].tailX), (tail[i].tailY), scale, scale);
        context.fill();
    }
}

//chuyển vị trí trước đó của con rắn sang vị trí tiếp theo
function moveSnakeForward() {
    tail0=tail[0];
    for (let i = 0; i < tail.length - 1; i++) {
        tail[i] = tail[i + 1];
    }
    tail[totalTail - 1] = { tailX: snakeHeadX, tailY: snakeHeadY };
    snakeHeadX += xSpeed;
    snakeHeadY += ySpeed;
    if(direction=="p"){
        function pauseGame(){
            return moveSnakeForward();
        }
    }
}
function pauseGame(){

}


//chỉ trong trường hợp va chạm ranh giới
function moveSnakeBack() {
    context.clearRect(0, 0, 500, 500);
    for (let i = tail.length-1; i >= 1; i--) {
        tail[i] = tail[i - 1];
    }
    if(tail.length>=1) {
        tail[0] = { tailX: tail0.tailX, tailY: tail0.tailY };
    }
    snakeHeadX -= xSpeed;
    snakeHeadY -= ySpeed;
        // drawVirus();
    drawFruit();
    drawSnakeTail();
}

function drawSnake() {
    drawSnakeHead("blue");
    drawSnakeTail();
    if (checkCollision()||VirusCollision()) {
         clearInterval(gameInterval);
        clearInterval(virusInterval);
        if(boundaryCollision||wallCollision) {
            moveSnakeBack();
        }
        drawSnakeHead("red");
        setTimeout(()=>{
            scoreModal.textContent = point;
            $('#alertModal').modal('show');
            //nếu modal được hiển thị, xóa keydown event listener để con rắn không di chuyển
            $( "#alertModal" ).on('shown.bs.modal', function(){
                window.removeEventListener("keydown", pressedKey);
            });
            //khi modal ẩn thì đặt lại mọi biến và  add lại keydown event listener
            $('#alertModal').on('hidden.bs.modal', function () {
                context.clearRect(0, 0, 500, 500);
                score.innerText = 0;
                window.addEventListener("keydown", pressedKey);
                reset();
            })
            modalBtn.addEventListener("click", ()=>{
                context.clearRect(0, 0, 500, 500);
                score.innerText = 0;
            });
        }, 1000);
    }
}
function drawSnake1() {
    drawSnakeHead("blue");
    drawSnakeTail();
    if (checkCollision()||VirusCollision()||WallCollision()) {
        clearInterval(gameInterval);
        clearInterval(virusInterval);
        if(boundaryCollision||wallCollision) {
            moveSnakeBack();
        }
        drawSnakeHead("red");
        setTimeout(()=>{
            scoreModal.textContent = point;
            $('#alertModal').modal('show');
            $( "#alertModal" ).on('shown.bs.modal', function(){
                window.removeEventListener("keydown", pressedKey);
            });
            $('#alertModal').on('hidden.bs.modal', function () {
                context.clearRect(0, 0, 500, 500);
                score.innerText = 0;
                window.addEventListener("keydown", pressedKey);
                reset();
            })
            modalBtn.addEventListener("click", ()=>{
                context.clearRect(0, 0, 500, 500);

                score.innerText = 0;
            });
        }, 1000);
    }
}
//------------------------------------------------------WALL-----------------------------------------------------------//

function wallPositionLV2() {
    for(let i=0;i<xArray.length && i<yArray.length;i++) {
            wallX = xArray[i] * scale;
            wallY = yArray[i] * scale;
            context.fillStyle="pink";
            context.fillRect(wallX,wallY,scale,scale);
    }
}
function wallPositionLV4() {
    xArray = [5,4,3,2,1,1,1,1,1,1,1,1,1,1,2,3,4,5,19,20,21,22,23,23,23,23,23,19,20,21,22,23,23,23,23,23,11,11,11,11,11,7,8,9,10,11,11,11,11,11,7,8,9,10,13,13,13,13,13,14,15,16,17,13,14,15,16,17,13,13,13,13];
    yArray = [1,1,1,1,1,2,3,4,5,19,20,21,22,23,23,23,23,23,1,1,1,1,1,2,3,4,5,23,23,23,23,23,19,20,21,22,7,8,9,10,11,11,11,11,11,13,14,15,16,17,13,13,13,13,7,8,9,10,11,11,11,11,11,13,13,13,13,13,14,15,16,17];
    for(let i=0;i<xArray.length && i<yArray.length;i++) {
        wallX = xArray[i] * scale;
        wallY = yArray[i] * scale;
        context.fillStyle="pink";
        context.fillRect(wallX,wallY,scale,scale);
    }
}
function wallPositionLV5() {
    xArray = [1,3,5,7,11,13,17,19,21,23,1,3,5,7,11,13,17,19,21,23,1,3,5,7,11,13,17,19,21,23,1,3,5,7,11,13,17,19,21,23,1,3,5,7,11,13,17,19,21,23,1,3,5,7,11,13,17,19,21,23,1,3,5,7,11,13,17,19,21,23,1,3,5,7,11,13,17,19,21,23,1,3,5,7,11,13,17,19,21,23,1,3,5,7,11,13,17,19,21,23,];
    yArray = [1,1,1,1,1,1,1,1,1,1,3,3,3,3,3,3,3,3,3,3,5,5,5,5,5,5,5,5,5,5,7,7,7,7,7,7,7,7,7,7,9,9,9,9,9,9,9,9,9,9,15,15,15,15,15,15,15,15,15,15,17,17,17,17,17,17,17,17,17,17,19,19,19,19,19,19,19,19,19,19,21,21,21,21,21,21,21,21,21,21,23,23,23,23,23,23,23,23,23,23,];
    for(let i=0;i<xArray.length && i<yArray.length;i++) {
        wallX = xArray[i] * scale;
        wallY = yArray[i] * scale;
        context.fillStyle="pink";
        context.fillRect(wallX,wallY,scale,scale);
    }
}
function wallPositionLV6() {
    xArray=[23,24,3,4,21,22,3,4,21,22,5,6,19,20,5,6,19,20,7,8,17,18,7,8,17,18,9,10,15,16,9,10,15,16,11,14,11,12,14,14,11,11,13,14,10,14,9 ,10,15,16,9 ,10,15,16,7 ,8 ,17,18,7 ,8 ,17,18,5 ,6 ,19,20,5 ,6 ,19,20,3 ,4 ,21,22,3 ,4 ,21,22,1 ,2 ,23,24,1 ,2 ,23,24];
    yArray=[0 ,0 ,1,1,1 ,1 ,2,2,2 ,2 ,3,3 ,3,3 ,4,4,4 ,4 ,5,5,5 ,5 ,6,6,6 ,6 ,7,7 ,7 ,7 ,8,8 ,8 ,8 ,9 ,9 ,10,10,10,11,12,13,13,13,14,14,15,15,15,15,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,22,22,22,22,23,23,23,23,24,24,24,24];
    for(let i=0;i<xArray.length && i<yArray.length;i++) {
        wallX = xArray[i] * scale;
        wallY = yArray[i] * scale;
        context.fillStyle="pink";
        context.fillRect(wallX,wallY,scale,scale);
    }
}

//------------------------------------------------------VIRUS-----------------------------------------------------------//
function virusPosition() {
    let virus=generateCoordinates();
    virusX=virus.xCoordinate;
    virusY=virus.yCoordinate;

}

function drawVirus() {
   context.drawImage(virus, virusX, virusY, scale, scale);

}

//------------------------------------------------------FRUIT-----------------------------------------------------------//
function fruitPosition() {
    let fruit=generateCoordinates();
    fruitX=fruit.xCoordinate;
    fruitY=fruit.yCoordinate;
}

function drawFruit() {
    context.drawImage(fruit, fruitX, fruitY, scale, scale);
}
//------------------------------------------------------MAIN GAME-----------------------------------------------------------//
//thức ăn trùng với virus sẽ tạo virus mới
function checkVirusPosition() {
    if(fruitX===virusX && fruitY===virusY) {
        virusPosition();
    }

}
//nếu thức ăn hay virus sinh ra trùng với đuôi sẽ thức ăn hay virus cái mới
function checkTailPosition() {
    for(let i=0; i< tail.length; i++){
        if(fruitX===tail[i].tailX && fruitY===tail[i].tailY)
        {
            fruitPosition();
            break;
        }
    }
    for(let i=0; i< tail.length; i++){
        if(virusX===tail[i].tailX && virusY===tail[i].tailY)
        {
            virusPosition();
            break;
        }
    }

}
//nếu thức ăn hay virus sinh ra trùng tường sẽ tạo thức ăn hay virus mới
function checkWallPosition(){
    for(let i=0; i<xArray.length && i<yArray.length; i++){
        if(fruitX===xArray[i] && fruitY===yArray[i]) {
            fruitPosition();
            break;
        }
    }
    for(let i=0; i<xArray.length && i<yArray.length; i++){
        if(virusX===xArray[i] && virusY===yArray[i]) {
            virusPosition();
            break;
        }
    }
}


function main() {
    lv1();
    function lv1(){
        document.getElementById("level").innerHTML="level 1";
        gameInterval = window.setInterval(() => {
        context.clearRect(0, 0, 500, 500);
        checkTailPosition();
        checkWallPosition();
        checkVirusPosition();
        drawFruit();
        moveSnakeForward();
        drawVirus();
        drawSnake();
        if (snakeHeadX === fruitX && snakeHeadY === fruitY) {
            totalTail++;
            point++;
        }if(point>=2&&point<4 ){
                clearInterval(gameInterval);
                leverUp();
                lv2();
                virusPosition();
                fruitPosition();

            }
        score.innerText = point;
    }, intervalDuration);
    }
    function lv2(){
        document.getElementById("level").innerHTML="level 2";
        virusInterval = window.setInterval(virusPosition, 10000);
        gameInterval = window.setInterval(() => {
            context.clearRect(0, 0, 500, 500);
            checkTailPosition();
            VirusCollision();
            checkVirusPosition();
            drawFruit();
            drawVirus();
            moveSnakeForward();
            drawSnake();
            if (snakeHeadX === fruitX && snakeHeadY === fruitY) {
                totalTail++;
                point++;}
            if(point>=4){
                clearInterval(gameInterval);
                leverUp();
                lv3();
                fruitPosition();

            }
            score.innerText = point;
        }, intervalDuration);
    }
    function lv3(){
        document.getElementById("level").innerHTML="level 3";

        virusInterval = window.setInterval(virusPosition, 10000);
        gameInterval = window.setInterval(() => {
            context.clearRect(0, 0, 500, 500);
            wallPositionLV2();
            checkTailPosition();
            checkWallPosition();
            checkVirusPosition();

            drawFruit();
            drawVirus();
            moveSnakeForward();
            drawSnake1();

            if (snakeHeadX === fruitX && snakeHeadY === fruitY) {
                totalTail++;
                point++;}
            if(point>=6){
                clearInterval(gameInterval);
                leverUp();
                lv4();
                fruitPosition();
            }
            score.innerText = point;
        }, intervalDuration);
    }
    function lv4(){
        document.getElementById("level").innerHTML="level 4";

        virusInterval = window.setInterval(virusPosition, 10000);
        gameInterval = window.setInterval(() => {
            context.clearRect(0, 0, 500, 500);
            wallPositionLV4();
            checkTailPosition();
            checkWallPosition();

            checkVirusPosition();
            drawFruit();
            drawVirus();
            moveSnakeForward();
            drawSnake1();

            if (snakeHeadX === fruitX && snakeHeadY === fruitY) {
                totalTail++;
                point++;}
            if(point>=8){
                clearInterval(gameInterval);
            leverUp();
            lv5();
            fruitPosition();
            }
            score.innerText = point;
        }, intervalDuration);
    }
    function lv5(){
        document.getElementById("level").innerHTML="level 5";
        virusInterval = window.setInterval(virusPosition, 10000);
        gameInterval = window.setInterval(() => {
            context.clearRect(0, 0, 500, 500);
            wallPositionLV5();
            checkTailPosition();
            checkWallPosition();
            checkVirusPosition();
            drawFruit();
            drawVirus();
            moveSnakeForward();
            drawSnake1();
            if (snakeHeadX === fruitX && snakeHeadY === fruitY) {
                totalTail++;
                point++;}
            if(point>=10){
                clearInterval(gameInterval);
                leverUp();
                lv6();
                fruitPosition();

            }
            score.innerText = point;
        }, intervalDuration);
    }
    function lv6(){
        document.getElementById("level").innerHTML="level 6";

        virusInterval = window.setInterval(virusPosition, 10000);
        gameInterval = window.setInterval(() => {
            context.clearRect(0, 0, 500, 500);
            wallPositionLV6();
            checkTailPosition();
            checkWallPosition();
            checkVirusPosition();

            drawFruit();
            drawVirus();
            moveSnakeForward();
            drawSnake1();
            if (snakeHeadX === fruitX && snakeHeadY === fruitY) {
                totalTail++;
                point++;
            }
            score.innerText = point;
        }, intervalDuration);
    }
}