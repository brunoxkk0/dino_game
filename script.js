const keyEvents = new Map();

const entity =      document.querySelector(".entity");
const background =  document.querySelector(".background");
const game_score =  document.querySelector(".game-score h1");

let entityPosition = 0;
let isJumping = false;

let jumpInterval;
let downInterval;
let gameLoop;

let score = 0;

const down = () =>{

    clearInterval(jumpInterval)

    downInterval = setInterval(() => {

        if(entityPosition <= 0){
            clearInterval(downInterval)
            isJumping = false;
        } else {
            entityPosition -= 10;
            entity.style.bottom = entityPosition + "px";
        }

    }, 10)

}

const jump = () => {

    if(isJumping) return;

    isJumping = true;

    console.log("Called Jump")

    jumpInterval = setInterval(() => {

        if(entityPosition >= 200){
            down()
        } else {
            entityPosition += 10;
            entity.style.bottom = entityPosition + "px";
        }

    }, 10)
    
}

const gameOver = () => {
    clearInterval(gameLoop)
    document.body.innerHTML = `<h1 class=\"game-over\"> Fim de Jogo! <br> Pontuação: ${score} </h1>`;
}

const gameDifficulty = () => {

    let defaultTimer = 5000;

    if(score > 100 && score < 300){
        return defaultTimer * 0.90;
    }else if( score > 300 && score < 500) {
        return defaultTimer * 0.70;
    }else if( score > 500 && score < 700) {
        return defaultTimer * 0.50;
    }else{
        return defaultTimer * 0.35;
    }
}

const createObstacle = () => {
    
    const obstacle = document.createElement('div');
    let obstaclePosition = 1000;

    obstacle.classList.add("obstacle");

    if((Math.random() * 100) > 50){
        obstacle.style.backgroundImage = "url('resources/rock_2.png')";
    }

    obstacle.style.left = obstaclePosition + "px";
    
    background.appendChild(obstacle);

    let obstacleInterval = setInterval(() => {

        if(obstaclePosition <= -60){
            clearInterval(obstacleInterval)
            background.removeChild(obstacle);

        } else if (obstaclePosition > 0 && obstaclePosition < 60 && entityPosition < 60){
            clearInterval(obstacleInterval)
            gameOver();
        } else {
            obstaclePosition -= 10;
            obstacle.style.left = obstaclePosition + "px";
        }

    }, 20)

    let randomInterval = 1000 + (Math.random() * gameDifficulty());

    setTimeout(createObstacle, randomInterval)

} 

document.addEventListener("keyup", (keyEvent) => {
    if(keyEvents.has(keyEvent.code)){
        keyEvents.get(keyEvent.code)();
    }
});


const gameStart = () => {

    keyEvents.set("Space", jump)

    gameLoop = setInterval(() => {
        score += 1;
        game_score.innerHTML = `Pontuação: ${score}`
    }, 50)

    createObstacle();
}

gameStart();