//canvas setting
let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);


let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameoverImage;
let gameOver = false; //true면 gameover
let score = 0;


//spaceship coordinate
let spaceshipX = canvas.width / 2 - 47;
let spaceshipY = canvas.height - 94 - 10;

let bulletList = [];
function Bullet() {
    this.x = 0;
    this.y = 0;
    this.init = function () {
        this.x = spaceshipX + 24;
        this.y = spaceshipY - 48;
        this.alive = true; //true면 살아있는 총알
        bulletList.push(this);
    };
    this.update = function () {
        this.y -= 7;
    }
    this.checkHit = function () {
        for (let i = 0; i < enemyList.length; i++) {
            if (this.y <= enemyList[i].y && this.x+bulletImage.width/2 >= enemyList[i].x && this.x + bulletImage.width/2 <= enemyList[i].x + enemyImage.width) {
                score++;
                this.alive = false;
                enemyList.splice(i, 1);
            }
        }

    }

}

function generateRandomValue(min, max) {
    let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNum;
}
let enemyList = [];
function Enemy() {
    this.x = 0;
    this.y = 0;
    this.init = function () {
        this.x = generateRandomValue(0, canvas.width - enemyImage.width),
            this.y = 0,
            enemyList.push(this);
    };

    this.update = function () {
        this.y += 3;

        if (this.y >= canvas.height - 48) {
            gameOver = true;
            console.log("game");
        }
    };
}

function loadImage() {
    backgroundImage = new Image();
    backgroundImage.src = "img/background.png";

    spaceshipImage = new Image();
    spaceshipImage.src = "img/spaceship.png";

    bulletImage = new Image();
    bulletImage.src = "img/bullet.png";

    gameoverImage = new Image();
    gameoverImage.src = "img/gameover.png";

    enemyImage = new Image();
    enemyImage.src = "img/enemy.png";
}


let keysDown = {}

function setupKeyboardListener() {
    document.addEventListener("keydown", function (event) {

        keysDown[event.keyCode] = true;

    });
    document.addEventListener("keyup", function (event) {
        delete keysDown[event.keyCode];

        if (event.keyCode == 32) {
            createBullet() // 총알생성
        }
    })
}

function createBullet() {
    let b = new Bullet();
    b.init();
    console.log("새 총알", bulletList);
}

function createEnemy() {
    const interval = setInterval(function () {
        let e = new Enemy();
        e.init();
    }, 1000);
}

function update() {

    if (39 in keysDown) { //right
        if (spaceshipX >= canvas.width - 94) {
            return;
        }
        spaceshipX += 5;
    } else if (37 in keysDown) { //left
        if (spaceshipX <= 0) {
            return;
        }
        spaceshipX -= 5;
    }

    //총알의 y좌표 업데이트 함수 호출
    for (let i = 0; i < bulletList.length; i++) {
        if (bulletList[i].alive) {
            bulletList[i].update();
            bulletList[i].checkHit();
        }
    }

    for (let i = 0; i < enemyList.length; i++) {
        enemyList[i].update();
    }
}

function render() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
    ctx.fillText(`Score:${score}`, 10, 30);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial"

    for (let i = 0; i < bulletList.length; i++) {
        if (bulletList[i].alive) {
            ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
        }
    }
    for (let i = 0; i < enemyList.length; i++) {
        ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y);
    }
}

function main() {
    if (!gameOver) {
        update(); //coordinate update
        render(); //write
        requestAnimationFrame(main);
    } else {
        ctx.drawImage(gameoverImage, 10, 230, 380, 200);
    }
}

loadImage();
setupKeyboardListener();
createEnemy();
main();

// 방향키를 누르면
// 우주선의 xy 좌표가 바뀌고
// 다시 Render로 그려준다

// 총알 만들기
// 1.스페이스바를 누르면 총알 발사
// 2.총알이 발사 = 총알의 y값이 -- , 총알의 x값은 스페이스바를 누른 순간의 우주선의 x좌표
// 3.발사된 총알들은 총알 배열에 저장을 한다
// 4.총알들은 x, y좌표값이 있어야한다.
// 5.총알 배열을 가지고 render로 그려준다

// 1.x, y, init, update
// 2.적군은 위치가 랜덤하다
// 3.적군은 밑으로 내려온다
// 4.1초마다 하나씩 적군이 나온다
// 5.적군의 우주선이 바닥에 닿으면 게임 오버
// 6.적군과 총알이 만나면 우주선이 사라진다. 점수 1점 획득

//적이 죽는다
// 1.총알.y <= 적군.y And
// 총알.x >= 적군.x && 총알.x <= 적군 + 적군의 넓이
//   ->닿는다
//   ->총알이 없어짐, 적군이 죽음, 점수 획득
//
//
//
//
//
// 
