const player = document.querySelector('.player');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;

function handlePlay(event) {
    if(event.keyCode === 38) {
      if(!isJumping){
        jump();
      }
    }
}

function jump() {
    isJumping = true;
    let upInterval = setInterval(() => {
        if(position >= 475) {
            clearInterval(upInterval);
            let downInterval = setInterval(() => {
                if(position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    player.style.bottom = position + 'px';
                }
            }, 15)
        }
        else{
          position += 20;
          player.style.bottom = position + 'px';
        }
    }, 20)
}

function createEnemies(){
    const enemy = document.createElement('div');
    let enemyPosition = 1000;
    let randonTime = Math.random() * 3000;

    enemy.classList.add('enemy');
    enemy.style.left = enemyPosition + 'px';
    background.appendChild(enemy);

    let enemyInterval = setInterval(() => {
     
        if(enemyPosition < -30) {
            background.removeChild(enemy);
            clearInterval(enemyInterval);
        } 
        else if(enemyPosition > 0 && enemyPosition < 30 && position < 30) {
           // gamer over
            clearInterval(enemyInterval);
            document.body.innerHTML = '<h1 class="end-game">Game Over</h1>';
        } 
        else{
            enemyPosition -= 10;
            enemy.style.left = enemyPosition + 'px';
        }
    }, 20)

    setTimeout(() => {
        createEnemies();
    } , randonTime);
}

createEnemies();
document.addEventListener('keyup' , handlePlay);