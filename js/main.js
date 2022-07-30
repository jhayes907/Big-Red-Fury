// Variables
const game = document.getElementById('game');
const movement = document.getElementById('movement');
const score = document.getElementById('score');
const status = document.getElementById('status');
const ctx = document.getElementById('2d');
// const santa;
// const penguin;


game.setAttribute('height', getComputedStyle(game), 'height');
game.setAttribute('width', getComputedStyle(game), 'width');


// Game screen 


// Event listeners


// Enttities

class Kringle {
    constructor(x, y, image, width, height) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.width = width;
        this.height = height;
        this.alive = true;

        this.render = function() {
            ctx.drawImage(this.image, this.x, this.y)
        }
    }
}

class Penguins extends Kringle {
    constructor(x, y, image, width, height,) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.height = height;
        this.width = width;
        this.alive = true;

        this.render = function() {
            ctx.drawImage(this.image, this.x, this.y)
        }
    }

}


// Movement controls


// Hit detection


// Penguin renderin logic


// Level progression logic