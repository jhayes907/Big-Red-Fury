// Variables
const game = document.getElementById('game');
const powerUps = document.getElementById('power-ups');
const movement = document.getElementById('movement');
const score = document.getElementById('score');
const status = document.getElementById('status');
const ctx = game.getContext('2d');
let santa;
let penguin;
let penguin2;
let powUps;
let presents;
move();

game.setAttribute('height', getComputedStyle(game)['height']);
game.setAttribute('width', getComputedStyle(game)['width']);

// ====================== PAINT INTIAL SCREEN ======================= //

// EVENT LISTENERS
window.addEventListener('DOMContentLoaded', function() {
    santa = new Santa(10, 20, 'grey', 20, 20);
    penguin = new Crawler(10, 100, '#bada55', 20, 20);
    penguin2 = new Crawler(100, 100, '#bada55', 20, 20);
    powUps = new Crawler(10, 200, 'blue', 20, 20);
    presents = new Crawler(10, 300, 'white', 20, 20);
    const name = setInterval(spawnPenguin, 3000);
    const runGame = setInterval(gameLoop, 150);
});

document.addEventListener('keydown', movementHandler);


// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, game.width, game.height);
    movement.textContent = `x:${santa.x}\ny:${santa.y}`;
    //check to see if penguin is alive
    if (penguin.alive) {
        //render penguin
        penguin.render();
        //@todo - check for collision
        let hit = detectHit(santa, penguin, penguin2);
    }
    santa.render();
    powUps.render();
    presents.render();
    penguin2.render();     
}


// Timer

function move() {
    const element = document.getElementById("my-bar");
    let width = 100;
    element.style.height = "50px"
    let id = setInterval(frame, 600);
    function frame() {
        if (width == 0) {
            clearInterval(id);
        } else {
            width--;
            element.style.width = width + "%";
        }
    }    
}

// Enttities

class Crawler {
    constructor(x, y, color, width, height) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = width;
        this.height = height;
        this.alive = true;
        
        this.render = function() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}

class Santa extends Crawler {
    constructor(x, y, color, width, height) {
        super(x, y, color, width, height);
        this.speed = 5;
        
        this.render = function() {
            // ctx.drawImage(this.image, this.x, this.y)
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}
            
class Penguin extends Crawler {
    constructor(x, y, color, width, height,) {
        super(x, y, color, width, height);
        this.x = x;
        this.y = y;
        this.color = color;
        this.height = height;
        this.width = width;
        this.alive = true;
                    
        this.render = function() {
            // ctx.drawImage(this.image, this.x, this.y)
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
                        
}
                        
class PowUps {
    constructor(x, y, image, width, height) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.width = width;
        this.height = height;
        this.active = null;
                                
        this.render = function() {
            // ctx.drawImage(this.image, this.x, this.y)
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
                                    
}
                                    
class Presents {
    constructor(x, y, image, width, height) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.width = width;
        this.height = height;
        this.opened = opened;
                                            
        this.render = function() {
            // ctx.drawImage(this.image, this.x, this.y)
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}
  

// Helper function


// Movement controls
function movementHandler(e) {
    console.log("movement", e.key);
                                                    
    switch(e.key) {
        case "ArrowUp":
        //move santa up
        santa.y - santa.speed >= 0 ? (santa.y -= santa.speed) : null;
        break;                                                    
    case "ArrowLeft":                                                        
        //move santa left                                                         
        santa.x - santa.speed >= 0 ? (santa.x -= santa.speed) : null;                                                       
        break;                                                        
    case "ArrowDown":                                                        
        //move santa down                                                        
        santa.y + santa.speed <= game.height ? (santa.y += santa.speed) : null;                                                        
        break;                                                        
    case "ArrowRight":                                                           
        //move santa right                                                   
        santa.x + santa.speed <= game.width ? (santa.x += santa.speed) : null;                                                        
            break; 
    case "q":
        santa                                                               
    case "w":                                                        
        //move santa up                                                        
        santa.y - santa.speed >= 0 ? (santa.y -= santa.speed) : null;                                                       
        break;                                                        
    case "a":                                                        
        //move santa left                                                       
        santa.x - santa.speed >= 0 ? (santa.x -= santa.speed) : null;                                                        
        break;                                                        
    case "s":                                                            
        //move santa down                                                    
        santa.y + santa.speed <= game.height ? (santa.y += santa.speed) : null;                                                        
        break;                                                        
    case "d":                                                            
        //move santa right                                                    
        santa.x + santa.speed <= game.width ? (santa.x += santa.speed) : null;                                                       
        break;                                                        
                                                                                        
    }
}
                                                                                
// Hit detection
function detectHit(player1, player2) {
    let hitTest = 
        player1.y + player1.height > player2.y &&
        player1.y < player2.y + player2.height &&
        player1.x + player1.width > player2.x &&
        player1.x < player2.x + player2.width;
                                                                                    
    if (hitTest) {
        //add 100 to current score
        let newScore = Number(score.textContent) + 100;
        score.textContent = newScore;
                                                                                        
        //run the addNewPenguin function
        return addNewPenguin();
    } else {
        return false;
    }
}
                                                                                
// Penguin rendering logic
function addNewPenguin() {
        penguin.alive = false; 
        let x = Math.floor(Math.random() * game.width) - 40;
        let y = Math.floor(Math.random() * game.height) - 80;
        penguin = new Crawler(x, y, "#bada55", 20, 20);
    return true;
}

function spawnPenguin() {
        let i = 0;
        let x = Math.floor(Math.random() * game.width) - 40;
        let y = Math.floor(Math.random() * game.height) - 80;
        baddies[i] = new Crawler(x, y, "#bada55", 20, 20);
        if (i => 10) {
            i = 0;
        } else {
            i++;
        }
        console.log(spawnPenguin)
    }
    let baddies = []


                                                                                
                                                                            
// Level progression logic
    move();