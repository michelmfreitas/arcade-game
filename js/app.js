const blockWidth = 105;
const blockHeight = 83;

const INITIAL_PLAYER_POSITION = {
    x: 200,
    y: blockHeight * 4.5
};

class Character {
    constructor(sprite, x, y) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        console.log(this.sprite, this.x, this.y);
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}


// Enemies our player must avoid
class Enemy extends Character {

    constructor(p, sprite = 'images/enemy-bug.png', x = -100, y = (blockHeight * (Math.floor(Math.random() * 3) + 1)) - 20) {
        this.player = p;
        super(sprite, x, y);
        this.speed = this.randSpeed();
    }

    randSpeed() {
        return Math.random() * 300 + 5;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x = this.x + this.speed * dt;

        //when enemy is out of canvas limit, restart position and speed
        if (this.x > 550) {
            this.x = -100;
            this.speed = this.randSpeed();
        }

        //detect colision
        if (this.player.x < this.x + 60 && this.player.x + 37 > this.x && this.player.y < this.y + 25 && 30 + this.player.y > this.y) {
            //reset player
            this.player.x = INITIAL_PLAYER_POSITION.x;
            this.player.y = INITIAL_PLAYER_POSITION.y;
        }
    }
}

class Player extends Character {
    constructor(sprite = 'images/char-boy.png', x = INITIAL_PLAYER_POSITION.x, y = INITIAL_PLAYER_POSITION.y) {
        super(sprite, x, y);
    }

    win() {
        //wait 300 miliseconds for player apper in
        //last block before finish the game and reset player position
        setTimeout(() => {
            alert('player wins');
            this.x = INITIAL_PLAYER_POSITION.x;
            this.y = INITIAL_PLAYER_POSITION.y;
        }, 300);
    }


    handleInput(keyPressed) {

        //press key up and check if Y is smaller than 0 - top limit
        if (keyPressed === "up" && this.y > 0) {
            this.y -= blockHeight;
            if (this.y < 0) {
                this.win();
            }
        }

        //press key down and check if Y is smaller than down limit
        if (keyPressed === "down" && this.y < blockHeight * 4) {
            this.y += blockHeight;
        }

        //press key left and check if X is smaller than 0 - left limit
        if (keyPressed === "left" && this.x > 0) {
            this.x -= blockWidth;
        }

        //press key right and check if X is smaller than right limit
        if (keyPressed === "right" && this.x < blockWidth * 3) {
            this.x += blockWidth;
        }



    }


}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];
const player = new Player();

//init enemies
const enemies = () => {
    for (let i = 0; i < 10; i++) {
        let enemy = new Enemy(player);
        console.log(enemy);
        allEnemies.push(enemy);
    }
}

enemies();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
