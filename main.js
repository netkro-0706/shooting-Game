//canvas setting
let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);


let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameoverImage;

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

        bulletList.push(this);
    };
    this.update = function () {
        this.y -= 7;
    }

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

let keysDown = {

}
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
        bulletList[i].update();
    }
}

function render() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);

    for (let i = 0; i < bulletList.length; i++) {
        ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
    }
}

function main() {
    update(); //coordinate update
    render(); //write
    requestAnimationFrame(main);
}

loadImage();
setupKeyboardListener();
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

