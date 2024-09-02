document.addEventListener("DOMContentLoaded", function () {

    let gameStarted =  false;
    let isLeftBarMove = false;
    let isRightBarMove = true; //first ball will be towards right bar

    let leftPlayerScore = 0;
    let rightPlayerScore = 0;
    const score = 10

    let gameRound = 5;
    let gameRoundInterval = 1000

    const cellSize = 2.5;
    const arenaHeight = 600;
    const arenaWidth = 800;
    const ballDiameter = 2.5;  //ball is 2.5% of total width
    const barHeight = 20; //20% of total arenaHeight

    const ballPosition = {x: 50, y: 50}
    const leftBarPosition = {x: 5, y: 40} //Bar is 20% of total arena height so 40% is in top and bottom
    const rightBarPositon = {x: 95, y: 40}

    let intervalId
    let gameSpeed = 100

    let dx = cellSize
    let dy = 0

    const randommYDirection = [-2.5, 1, 0, -1.5, 1.5, 0, 1, 2.5 , 3, 0, -3];

    const gameArena = document.getElementById("game-arena");

    function randomDyGenerate(){
        return randommYDirection[Math.floor(Math.random() * randommYDirection.length)];
    }

    function resetGame(){
        console.log("reset is calling...")
        const startButton = document.querySelector('#start-button');
        startButton.style.display = 'block'; 

        gameRound = 5;
        leftPlayerScore = 0;
        rightPlayerScore = 0;

        ballPosition.x = 50
        ballPosition.y = 50

        leftBarPosition.x= 5;
        leftBarPosition.y= 40;

        rightBarPositon.x = 95;
        rightBarPositon.y = 40;
        
        dx = cellSize
        dy = 0
        drawBarAndBall()
        updateScore()
    }

    function drawScoreboard() {
        const scoreBoard = document.createElement("div");
        scoreBoard.id = "score-board";
        const leftPlayerText = document.createElement("p");
        leftPlayerText.textContent = `Left player score: ${leftPlayerScore}`;
        leftPlayerText.classList.add('score')

        const rightPlayerText = document.createElement("p");
        rightPlayerText.textContent = `Right player score: ${rightPlayerScore}`;
        rightPlayerText.classList.add('score')

        scoreBoard.appendChild(leftPlayerText);
        scoreBoard.appendChild(rightPlayerText);

        document.body.insertBefore(scoreBoard, gameArena);
    }

    function updateScore(){
        const scoreElement = document.getElementsByClassName('score')

        scoreElement[0].textContent = `Left player score: ${leftPlayerScore}`;   
        scoreElement[1].textContent = `Right player score: ${rightPlayerScore}`;;  
    }

    function barPositionSetting(e, bar, barPosition){
        if (e.key === "ArrowUp") {
            barPosition.y = Math.max(0, barPosition.y - cellSize);
        } else if (e.key === "ArrowDown") {
            barPosition.y = Math.min(80,  barPosition.y + cellSize);
        }
        bar.style.top = `${barPosition.y}%`;
    }

    function moveBars(e) {
        const bar = document.getElementsByClassName("bar");
        const leftBar = bar[0]
        const rightBar = bar[1]

        if(isRightBarMove){ // while ball will be middle of the board, next player will be able to move the bar.
            barPositionSetting(e, rightBar, rightBarPositon)
        }else{
            barPositionSetting(e, leftBar, leftBarPosition)
        }
    }


    function drawDiv(x, y, className){
        const divElement = document.createElement('div')
        divElement.classList.add(className)
        divElement.style.top = `${y}%`
        divElement.style.left = `${x}%`
        return divElement
    }

    function drawBarAndBall(){
        gameArena.innerHTML = ''; //clear the game arena //wipe out everything and redraw with new positions
        console.log('draw calling...')
        const leftBarDiv = drawDiv(leftBarPosition.x, leftBarPosition.y, 'bar')
        gameArena.appendChild(leftBarDiv)

        const rigthBarDiv = drawDiv(rightBarPositon.x, rightBarPositon.y, 'bar')
        gameArena.appendChild(rigthBarDiv)

        const ballDiv = drawDiv(ballPosition.x, ballPosition.y, 'ball')
        gameArena.appendChild(ballDiv)
    }

    function moveBall(){
        ballPosition.x += dx
        ballPosition.y += dy
        // console.log(ballPosition)

        // const ball = document.querySelector('.ball')
        // ball.style.top = `${ballPosition.y}%`
        // ball.style.left = `${ballPosition.x}%`
        
    }

    function isBallHitingWalls(){
        const rightWall = ballPosition.x >= 100 - cellSize;
        const leftWall = ballPosition.x <= 0 ;
        const topWall = ballPosition.y <= 0;
        const bottomWall = ballPosition.y >= 100 - cellSize;

        return {rightWall, leftWall, topWall, bottomWall}
    }

    function isBallHitingLeftBar(){
        const leftBar = (leftBarPosition.x === ballPosition.x) && (leftBarPosition.y <= ballPosition.y) && (ballPosition.y <= leftBarPosition.y + barHeight)
        
        return leftBar
    }

    function isBallHitingRightBar(){
        const rightBar = (rightBarPositon.x === ballPosition.x + ballDiameter) && (rightBarPositon.y <= ballPosition.y) && (ballPosition.y <= rightBarPositon.y + barHeight )
        
        return rightBar
    }

    function rungameAgain(bar){
        if(gameRound === 0){
            clearInterval(intervalId)
            alert(`Game Over ${'\n'} ${rightPlayerScore > leftPlayerScore ? 'Right' : 'Left'} player win the game by ${Math.abs(rightPlayerScore - leftPlayerScore)} points`)
            gameStarted = false
            resetGame()
            return
        }
        setTimeout(() => {
            if(bar === 'rightBar'){
                rightBarPositon.x = 95;
                rightBarPositon.y = 40;
    
                ballPosition.x = 90;
                ballPosition.y = 50;
            }else{
                leftBarPosition.x = 5;
                leftBarPosition.y = 40;
    
                ballPosition.x = 5;
                ballPosition.y = 50;
            }
           
            gameLoop()
        }, gameRoundInterval);       
    }

    function gameLoop(){
        intervalId = setInterval(()=>{
            const { rightWall, leftWall, topWall, bottomWall } = isBallHitingWalls();

            if(isBallHitingLeftBar()){
                console.log("Ball hit left bar...")
                isRightBarMove = true
                isLeftBarMove = false
                dx = cellSize   //change horizontal direction
                dy = randomDyGenerate() //Random vertical direction
            }
            if(isBallHitingRightBar()){
                console.log("Ball hit right bar...")
                isRightBarMove = false
                isLeftBarMove = true
                dx = -cellSize
                dy = randomDyGenerate() 
            }
            if(topWall || bottomWall){
                dy = -dy
            }

            if(rightWall){
                leftPlayerScore += score
                updateScore()
                clearInterval(intervalId)
                gameRound--
                rungameAgain('rightBar')
                return               
            }
            if(leftWall){
                rightPlayerScore +=score
                updateScore()
                clearInterval(intervalId)
                gameRound--
                rungameAgain('leftBar')
                return
            }
            moveBall()
            drawBarAndBall()
        }, gameSpeed)
    }

    function runGame() {
        if(!gameStarted){
            gameStarted = true
            document.addEventListener("keydown", moveBars);
            gameLoop()
        }

    }

    function initiateGame() {
        drawScoreboard();
        drawBarAndBall();
        const startBtn = document.getElementById("start-button");
        startBtn.addEventListener("click", function startGame() {
            startBtn.style.display = 'none'
            runGame();
        });
    }
    initiateGame();
});
