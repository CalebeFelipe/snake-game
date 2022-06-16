
    const stage = document.getElementById('stage');
    const context = stage.getContext("2d");
    const scoreBoard = document.getElementById('score')
    const maxScoreBoard = document.getElementById('maxScore')
    const restart = document.getElementById('replay')
    const divGameOver = document.querySelector('.gameOver')
    const getDataBaseMaxScore = () => localStorage.getItem("maxscore") ?? 00;
    getDataBaseMaxScore() < 10 ? maxScoreBoard.innerText = `0${getDataBaseMaxScore()}` : maxScoreBoard.innerText = getDataBaseMaxScore()

    const vel = 1;

    let velX = velY = 0,
    posX = posY = 20,
    cellSize = 16,
    cells = 25,
    appleX = appleY = 15,
    score = 0,
    maxScore = getDataBaseMaxScore(),
    trail = [],
    tail = 1,
    goGame = false;

    const reset = () => {
        velX = velY = 0;
        posX = posY = 20;
        appleX = appleY = 15;
        tail = 1;
        score = 0;
        updateScore(scoreBoard, score)
    }

    const replay = () => {
        divGameOver.classList.remove('active');
        goGame = false;
        reset();
    }

    const updateScore = (element, counter) => {

        if(counter < 10) {
            element.innerHTML = `0${counter}`
        } else {
            element.innerHTML = counter
        }
    }
    
    const gameOver = () => {
        divGameOver.classList.add('active');
        if(maxScore < score) {
            maxScore = score;
            localStorage.setItem('maxscore', maxScore);
        }
        reset()
        updateScore(maxScoreBoard, maxScore)
    }

    let game = () => { 


        posX += velX;
        posY += velY;
        if(posX < 0) {
            posX = cells -1;
        }

        if(posX > cells - 1) {
            posX = 0;
        }

        if(posY < 0) {
            posY = cells - 1;
        }

        if(posY > cells - 1) {
            posY = 0;
        }

        // palco do jogo
        context.fillStyle = "#181825";
        context.fillRect(0,0, stage.width, stage.height);
        
        //comida
        context.fillStyle = "red"
        context.shadowColor = 'red';
        context.shadowBlur = 9;
        context.fillRect(appleX*cellSize,appleY*cellSize, cellSize, cellSize);

        //cobra
        context.fillStyle = "white";
        context.shadowColor = 'rgba(255,255,255,.3)';
        context.shadowBlur = 3;
        for(let i = 0; i < trail.length; i++) {
            context.fillRect(trail[i].x*cellSize,trail[i].y*cellSize, cellSize, cellSize);
            //condição Game Over
            if(trail[i].x == posX && trail[i].y == posY && goGame == true) {
                gameOver();
            }
        }
            

        trail.push({x:posX, y:posY})
        while(trail.length > tail) {
            trail.shift();
        }

        //Condição comer a comida
        if(appleX == posX && appleY == posY) {
            tail++;
            score++;
            updateScore(scoreBoard, score)
            appleX = Math.floor(Math.random() * cells);
            appleY = Math.floor(Math.random() * cells);
        }
        
    }

    const keyPush = (event) => {
        switch (event.keyCode) {
            case 37: //left
                velX = -vel;
                velY = 0;
                goGame = true;
                divGameOver.classList.remove('active');
                break;
            case 38: //up
                velX = 0;
                velY = -vel;
                goGame = true;
                divGameOver.classList.remove('active');
                break
            case 39: //right
                velX = vel;
                velY = 0;
                goGame = true;
                divGameOver.classList.remove('active');
                break
            case 40: //down
                velX = 0;
                velY = vel;
                goGame = true;
                divGameOver.classList.remove('active');
                break;
        }
    }

    setInterval(game, 100);

//Eventos

document.addEventListener("keydown", keyPush);
restart.addEventListener("click", replay);



