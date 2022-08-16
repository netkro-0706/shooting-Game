//canvas setting
let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width=400;
canvas.height=700;
document.body.appendChild(canvas);


let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameoverImage;

//spaceship coordinate
let spaceshipX = canvas.width/2-47;
let spaceshipY = canvas.height-94-10;


function loadImage(){
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

let keysDown={

}
function setupKeyboardListener(){
    document.addEventListener("keydown", function(event){
        keysDown[event.keyCode] = true;
        
    });
    document.addEventListener("keyup", function(event){
        delete keysDown[event.keyCode];
    })
}

function update(){
    
    if(39 in keysDown){ //right
        if(spaceshipX >= canvas.width-94){
            return;
        }
        spaceshipX += 5;
    } else if (37 in keysDown){ //left
        if(spaceshipX <= 0){
            return;
        }
        spaceshipX -= 5;
    }
}

function render(){
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);

}

function main(){
    update(); //coordinate update
    render(); //write
    requestAnimationFrame(main);
}

loadImage();
setupKeyboardListener();
main();