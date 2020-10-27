const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
canvas.width = 1200 //window.innerWidth;
canvas.height = 600 //window.innerHeight;
let activePlayer = 1;

// 1. Instancia de fondo
let img = new Image();
img.src = "./images/background.jpg";
img.alt = "href='https://www.freepik.com/vectors/background'>Background vector created by macrovector - www.freepik.com"
let backgroundImage = {
  img: img,
  draw: function() {
    ctx.drawImage(this.img,0,0, canvas.width, canvas.height);
}
};

// Explosion for collision
let cannonExplosion = new Image();
cannonExplosion.src = './images/explosion.png';

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
    explosion: cannonExplosion,
    launchAngle: 15*Math.PI/180,
    x: 50,
    speed: 2,
    flightTime: 0,
    ballX: 70,
    ballY: canvas.height - 146,
    initialSpeed: 1.75,
    gravity: .005,
    livesLeft:3,
    collision: false,
    //
    aimUp: function() {
      this.launchAngle += 1*Math.PI/180;
  },
    aimDown: function() {
        this.launchAngle -= 1*Math.PI/180;
  },
    moveRight: function() {
      this.x += this.speed;
      this.ballX += this.speed;
  },
    moveLeft: function () {
        this.x -= this.speed;
        this.ballX -= this.speed;
    },

    shoot: function(){
    if(this.collision === false || this.ballY > canvas.height-140){
        //this.flightTime ++;
        this.ballY += -this.initialSpeed * Math.sin(this.launchAngle + 15*Math.PI/180) + this.gravity/2 * this.flightTime;
        this.ballX += this.initialSpeed * Math.cos(this.launchAngle + 15*Math.PI/180);
    } 
    },

  //
    draw: function () {
        if(cannon2.collision===false){
        if(this.collision === false){
            ctx.drawImage(this.ball, this.ballX, this.ballY, 20, 20);
        }
        ctx.save();
        ctx.translate(this.x + 30, canvas.height-160+24);
        ctx.rotate(-this.launchAngle+15*Math.PI/180);
        ctx.drawImage(this.img, -30, -(24), 63, 48);
        ctx.restore();
        ctx.drawImage(this.base, this.x - 30, canvas.height-140, 80, 38);
        ctx.save();
        ctx.translate(this.x + 8 + 12, canvas.height-120+12);
        ctx.rotate(this.x*6 * 0.017);
        ctx.drawImage(this.wheel,-12, -12, 24, 24);
        ctx.restore();
    } else {
        ctx.drawImage(this.explosion, cannon2.ballX, cannon2.ballY, -100, 100)
    }
    // ctx.beginPath()
    //     ctx.moveTo(this.x, 0)
    //     ctx.lineTo(this.x, canvas.width)
    //     ctx.stroke() 
    },

    collide: function(){
        if(this.ballX +20 > cannon2.x - 63 &&
            this.ballX +20 < cannon2.x &&
            this.ballY +20 >= canvas.height - 160){
                this.collision = true;
                cannon1.livesLeft -=1;
            }

        },
    
    resume: function(){
        this.collision = false;
        activePlayer = 2;
        this.ballX = this.x + 30;
        this.ballY = canvas.height - 146;
        this.initialSpeed = 1.75;
        //this.flightTime = 0;
        launcher = undefined;
    }
    
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
    explosion: cannonExplosion,
    launchAngle: 15*Math.PI/180,
    x: canvas.width - 50,
    speed: 2,
    flightTime: 0,
    ballX: canvas.width - 80,
    ballY: canvas.height - 146,
    initialSpeed: 1.75,
    gravity: .005,
    livesLeft: 3,
    collision: false,
    //
    aimUp: function() {
      this.launchAngle += 1*Math.PI/180;
  },
    aimDown: function() {
        this.launchAngle -= 1*Math.PI/180;
  },
    moveRight: function() {
         this.x += this.speed;
         this.ballX += this.speed;
  },
    moveLeft: function () {
        this.x -= this.speed;
        this.ballX -= this.speed;
    },
    shoot: function(){
    if( this.collision === false || this.ballY > canvas.height -140){
        //this.flightTime ++;
        this.ballY += -this.initialSpeed * Math.sin(this.launchAngle + 15*Math.PI/180) + this.gravity/2 * this.flightTime;
        this.ballX -= this.initialSpeed * Math.cos(this.launchAngle + 15*Math.PI/180);
    } 
    },

    draw: function () {
        if(cannon1.collision===false){
            if(this.collision === false){
                ctx.drawImage(this.ball, this.ballX, this.ballY, 20, 20);
            }
        ctx.save();
        ctx.translate(this.x - 30, canvas.height-160+24);
        ctx.rotate(this.launchAngle-15*Math.PI/180);
        ctx.drawImage(this.img, -30, -(24), 63, 48);
        ctx.restore();
        ctx.drawImage(this.base, this.x - 50, canvas.height-140, 80, 38);
        ctx.save();
        ctx.translate(this.x - 8 - 12, canvas.height-120+12);
        ctx.rotate(this.x*6 * 0.017);
        ctx.drawImage(this.wheel,-12, -12, 24, 24);
        ctx.restore();
        } else {
        ctx.drawImage(this.explosion,cannon1.ballX, cannon1.ballY, 100, 100)   
        }
        // ctx.beginPath()
        // ctx.moveTo(this.x, 0)
        // ctx.lineTo(this.x, canvas.width)
        // ctx.stroke()  
        // ctx.beginPath()
        // ctx.moveTo(this.x - 63, 0)
        // ctx.lineTo(this.x - 63, canvas.width)
        // ctx.stroke()       
    },

    collide: function(){
    if(this.ballX < cannon1.x + 63 &&
        this.ballX > cannon1.x &&
        this.ballY+20 >= canvas.height - 160){
            this.collision = true;
            cannon1.livesLeft -= 1;
        }
    },
    
    resume: function(){
        this.collision = false;
        activePlayer = 1;
        this.ballX = this.x - 30;
        this.ballY = canvas.height - 146;
        this.initialSpeed = 1.75;
        //this.flightTime = 0;
        launcher = undefined;
    }
}

console.log(cannon2.x)

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
});

// let measureForce = {
//     i:0,
//     increaseForce: function(){
//         if(this.i<1600){
//             this.i += 80;
//         } else {
//             this.i = 1600;
//         } 
//         return this.i;
//     }
// }

let launcher;

document.addEventListener('keydown', e =>{
    switch (e.keyCode) {
    case 32:
      //measureForce.increaseForce();  
      launcher = false;
      console.log('launcher false')
      break;
  }
});

document.addEventListener('keyup', e =>{
    switch (e.keyCode) {
    case 32: 
      launcher = true;
      console.log('launcher true')
      break;
  }
});




// 8. Nuestra actualizacion de canvas.
const updateCanvas = () => {
ctx.clearRect(0, 0, canvas.width, canvas.height);
backgroundImage.draw();
cannon1.draw();
cannon2.draw();


  

if( activePlayer === 1 && launcher){
    if(cannon1.ballY > canvas.height-140 || cannon1.collision === true){
        launcher = false;
        setTimeout(function(){
        console.log(`ball1X: ${cannon1.ballX}`)
    console.log(`ball1Y: ${cannon1.ballY}`)
        cannon1.resume();
        cannon2.draw();
        cannon1.flightTime = 0;
    console.log(`active placer: ${activePlayer}`)
    
    console.log(launcher)
    console.log(`cannon1 collision: ${cannon1.collision}`)
    console.log(`cannon2 collision: ${cannon2.collision}`)
    console.log(`cannon1 Lives: ${cannon1.livesLeft}`)
    console.log(`cannon2 Lives: ${cannon2.livesLeft}`)
    console.log(cannon1.flightTime)
    console.log(cannon2.flightTime)
        }, 3000)
            
        //location.reload();
        //activePlayer=2;
    console.log(`active placer: ${activePlayer}`)
    console.log(`ball1X: ${cannon1.ballX}`)
    console.log(`ball1Y: ${cannon1.ballY}`)
    console.log(launcher)
    console.log(`cannon1 collision: ${cannon1.collision}`)
    console.log(`cannon2 collision: ${cannon2.collision}`)
    console.log(`cannon1 Lives: ${cannon1.livesLeft}`)
    console.log(`cannon2 Lives: ${cannon2.livesLeft}`)
    console.log(cannon1.flightTime)
    console.log(cannon2.flightTime)
    return true;   
    }
    cannon1.shoot();
    cannon1.collide();
    cannon1.flightTime ++;
}

if(activePlayer === 2 && launcher){
    if(cannon2.ballY > canvas.height-140 || cannon2.collision === true){
        launcher = false;
        setTimeout(function() {
        cannon2.resume();
        cannon1.draw();
        cannon2.flightTime = 0;
        console.log(`active placer: ${activePlayer}`)
        console.log(`ball2X: ${cannon2.ballX}`)
        console.log(`ball2Y: ${cannon2.ballY}`)
        console.log(launcher)
        console.log(`cannon1 collision: ${cannon1.collision}`)
        console.log(`cannon2 collision: ${cannon2.collision}`)
        console.log(`cannon1 Lives: ${cannon1.livesLeft}`)
        console.log(`cannon2 Lives: ${cannon2.livesLeft}`)
        console.log(cannon1.flightTime)
        console.log(cannon2.flightTime)
        }, 3000)
        return true; 
    }
    console.log(`active placer: ${activePlayer}`)
    console.log(`ball1X: ${cannon2.ballX}`)
    console.log(`ball1Y: ${cannon2.ballY}`)
    console.log(launcher)
    console.log(`cannon1 collision: ${cannon1.collision}`)
    console.log(`cannon2 collision: ${cannon2.collision}`)
    console.log(`cannon1 Lives: ${cannon1.livesLeft}`)
    console.log(`cannon2 Lives: ${cannon2.livesLeft}`)
    console.log(cannon1.flightTime)
    console.log(cannon2.flightTime)
    cannon2.shoot();
    cannon2.collide();
    cannon2.flightTime ++;
}
    console.log(cannon1.flightTime)
    console.log(cannon2.flightTime) 
  requestAnimationFrame(updateCanvas);
}

