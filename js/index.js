const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
canvas.width = 1200 //window.innerWidth;
canvas.height = 600 //window.innerHeight;

// 1. Instancia de fondo
let img = new Image();
img.src = "./images/background.jpg";
img.alt = "href='https://www.freepik.com/vectors/background'>Background vector created by macrovector - www.freepik.com"
let backgroundImage = {
  img: img,
  draw: function() {
    ctx.drawImage(this.img,0,0, canvas.width, canvas.height);
}
}

// Cannon
let cannonImage1 = new Image();
let cannonBase1 = new Image();
let cannonWheel1 = new Image();
cannonImage1.src = './images/facing-right/body-blue.png';
cannonBase1.src = './images/facing-right/body-bordered.png';
cannonWheel1.src = './images/facing-right/wheel-bordered.png';
let cannon1 = {
    img: cannonImage1,
    base: cannonBase1,
    wheel: cannonWheel1,
    launchAngle: 0,
    x: 50,
    speed: 2,

    //
    aimUp: function() {
      this.launchAngle += 1;
  },
    aimDown: function() {
        this.launchAngle -= 1;
  },
    moveRight: function() {
      this.x += this.speed;
  },
    moveLeft: function () {
        this.x -= this.speed;
    },

  //
    draw: function () {
        ctx.save();
        ctx.translate(this.x + 30, canvas.height-160+24);
        ctx.rotate(-this.launchAngle*.017);
        ctx.drawImage(this.img, -30, -(24), 63, 48);
        ctx.restore();
        ctx.drawImage(this.base, this.x - 30, canvas.height-140, 80, 38);
        ctx.save();
        ctx.translate(this.x + 8 + 12, canvas.height-120+12);
        ctx.rotate(this.x*6 * 0.017);
        ctx.drawImage(this.wheel,-12, -12, 24, 24);
        ctx.restore();
    },
}


//Botón de iniciar juego
window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    updateCanvas()
  };
};

//moviemientos
document.addEventListener('keydown', e => {
  switch(e.keyCode){
    case 37: cannon1.moveLeft(); break;
    case 39: cannon1.moveRight(); break;
    case 38: cannon1.aimUp(); break;
    case 40: cannon1.aimDown(); break;
  }
  updateCanvas();
});

// 8. Nuestra actualizacion de canvas.
const updateCanvas = () => {
//   Object.keys(keysPressed).forEach(function(direction) {
//     if (keysPressed[direction]) {
//       player.move(direction);
//     }
//   });

  // Los obstáculos se mueven
//   obstacles.move();
//   player.update();
//   backgroundImage.move();
//   obstacles.clearWalls();
//   backgroundImage.speed *= 1 + obstacles.wallCounter / 300000;
//   obstacles.speed *= 1 + obstacles.wallCounter / 300000;

//   if (player.isDead(obstacles.walls)) {
//     alert("You've lost! Your score: " + obstacles.wallCounter);
//     location.reload();
//     obstacles.wallCounter = 0;
//   }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  backgroundImage.draw();
  cannon1.draw();
//   cannon1.aimDown();
//   cannon1.aimUp();
//   cannon1.rotateWheel();
  
//   player.draw();
//   obstacles.draw();

  //requestAnimationFrame(updateCanvas);
}

// class Cannon {
//     constructor()
// }