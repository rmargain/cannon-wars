const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
canvas.width = 1200 //window.innerWidth;
canvas.height = 600 //window.innerHeight;
let activePlayer = 1;

// 1. Instancia de fondo
// let img = new Image();
// img.src = "./images/background.jpg";
// img.alt = "href='https://www.freepik.com/vectors/background'>Background vector created by macrovector - www.freepik.com"
// let backgroundImage = {
//   img: img,
//   draw: function() {
//     ctx.drawImage(this.img,0,0, canvas.width, canvas.height);
// }
// };

// Left Cannon along with methods to move and aim
let cannonImage1 = new Image();
let cannonBase1 = new Image();
let cannonWheel1 = new Image();
let cannonBall1 = new Image();
cannonImage1.src = './images/facing-right/body-blue.png';
cannonBase1.src = './images/facing-right/body-bordered.png';
cannonWheel1.src = './images/facing-right/wheel-bordered.png';
cannonBall1.src = './images/facing-right/cannon-ball-bordered.png';
let cannon1 = {
    img: cannonImage1,
    base: cannonBase1,
    wheel: cannonWheel1,
    ball: cannonBall1,
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
        //ctx.drawImage(this.ball, -10, -10, 20, 20);
        ctx.restore();
        ctx.drawImage(this.base, this.x - 30, canvas.height-140, 80, 38);
        ctx.save();
        ctx.translate(this.x + 8 + 12, canvas.height-120+12);
        ctx.rotate(this.x*6 * 0.017);
        ctx.drawImage(this.wheel,-12, -12, 24, 24);
        ctx.restore();
    },
}

// Right Cannon along with methods to move and aim
let cannonImage2 = new Image();
let cannonBase2 = new Image();
let cannonWheel2 = new Image();
let cannonBall2 = new Image();
cannonImage2.src = './images/facing-left/body-black.png';
cannonBase2.src = './images/facing-left/body-bordered.png';
cannonWheel2.src = './images/facing-left/wheel-bordered.png';
cannonBall2.src = './images/facing-left/cannon-ball-bordered.png';
let cannon2 = {
    img: cannonImage2,
    base: cannonBase2,
    wheel: cannonWheel2,
    ball: cannonBall2,
    launchAngle: 0,
    x: canvas.width - 50,
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
        ctx.translate(this.x - 30, canvas.height-160+24);
        ctx.rotate(this.launchAngle*.017);
        ctx.drawImage(this.ball, -10, -10, 20, 20);
        ctx.drawImage(this.img, -30, -(24), 63, 48);
        ctx.restore();
        ctx.drawImage(this.base, this.x - 50, canvas.height-140, 80, 38);
        ctx.save();
        ctx.translate(this.x - 8 - 12, canvas.height-120+12);
        ctx.rotate(this.x*6 * 0.017);
        ctx.drawImage(this.wheel,-12, -12, 24, 24);
        ctx.restore();
        
    },
}

// Left Shot
let leftShot = {
    gravity: 0,
    initialSpeed: 1,
    initialSpeedX: this.initialSpeed * Math.cos(-cannon1.launchAngle + 15*Math.PI/180),
    initialSpeedY: this.initialSpeed * Math.sin(-cannon1.launchAngle + 15*Math.PI/180),
    flightTime: this.initialSpeedY/this.gravity,
    x: cannon1.x +20,
    y: canvas.height -156,
    ball: cannonBall1,
    move: function(){
        this.x += this.initialSpeedX;
        this.y -= this.initialSpeedY + this.gravity;
    },
    draw: function(){
        ctx.drawImage(this.ball, this.x, this.y, 40, 40);
    }
}



//Botón de iniciar juego
window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    updateCanvas()
  };
};

//moviemientos
document.addEventListener('keydown', e => {
  if(activePlayer === 1){
    switch(e.keyCode){
    case 37: cannon1.moveLeft(); break;
    case 39: cannon1.moveRight(); break;
    case 38: cannon1.aimUp(); break;
    case 40: cannon1.aimDown(); break;
  }
} else if (activePlayer === 2){
    switch(e.keyCode){
    case 37: cannon2.moveLeft(); break;
    case 39: cannon2.moveRight(); break;
    case 38: cannon2.aimUp(); break;
    case 40: cannon2.aimDown(); break;
  }
}
  updateCanvas();
});

let measureForce = {
    i:0,
    increaseForce: function(){
        if(this.i<1600){
            this.i += 80;
        } else {
            this.i = 1600;
        } 
        return this.i;
    }
}

let launcher;

document.addEventListener('keydown', e =>{
    switch (e.keyCode) {
    case 32:
      measureForce.increaseForce();  
      launcher = false;
      break;
  }
});

document.addEventListener('keyup', e =>{
    switch (e.keyCode) {
    case 32:  
      launcher = true;
      break;
  }
});

// document.onkeydown = function(event) {
//   event.preventDefault();
//   switch (event.keyCode) {
//     case 32:
//       measureForce.increaseForce();  
//       launcher = true;
//       break;
//   }
// };

// document.onkeyup = function(event) {
//   switch (event.keyCode) {
//     case 32:
//       launcher = false;
//       break;
//   }
// };




// 8. Nuestra actualizacion de canvas.
const updateCanvas = () => {


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
        
  
          
          
          //console.log('a');
          console.log(leftShot.x);
          console.log(leftShot.initialSpeed * Math.sin(-cannon1.launchAngle + 15*Math.PI/180))
 if(launcher){
    leftShot.move();
}
        cannon1.draw();
        cannon2.draw();
        leftShot.draw();
        
  
//   player.draw();
//   obstacles.draw();

  requestAnimationFrame(updateCanvas);
}

// class Cannon {
//     constructor()
// }