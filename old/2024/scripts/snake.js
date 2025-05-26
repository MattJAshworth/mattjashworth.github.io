// Snake Game Variables
let snake;
let fruit;
let scale = 20;
let rows;
let columns;
let canvas;
let ctx;
let gameInterval;
let touchStartX = 0;
let touchStartY = 0;

// Snake Class
class Snake {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.xSpeed = scale * 1;
        this.ySpeed = 0;
        this.total = 0;
        this.tail = [];
    }

    draw() {
        ctx.fillStyle = "#FFFFFF";
        for (let i = 0; i < this.tail.length; i++) {
            ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
        }
        ctx.fillRect(this.x, this.y, scale, scale);
    }

    update() {
        for (let i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1];
        }
        this.tail[this.total - 1] = { x: this.x, y: this.y };

        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if (this.x >= canvas.width) {
            this.x = 0;
        }
        if (this.y >= canvas.height) {
            this.y = 0;
        }
        if (this.x < 0) {
            this.x = canvas.width - scale;
        }
        if (this.y < 0) {
            this.y = canvas.height - scale;
        }
    }

    changeDirection(direction) {
        switch (direction) {
            case "Up":
                if (this.ySpeed === 0) {
                    this.xSpeed = 0;
                    this.ySpeed = -scale * 1;
                }
                break;
            case "Down":
                if (this.ySpeed === 0) {
                    this.xSpeed = 0;
                    this.ySpeed = scale * 1;
                }
                break;
            case "Left":
                if (this.xSpeed === 0) {
                    this.xSpeed = -scale * 1;
                    this.ySpeed = 0;
                }
                break;
            case "Right":
                if (this.xSpeed === 0) {
                    this.xSpeed = scale * 1;
                    this.ySpeed = 0;
                }
                break;
        }
    }

    eat(fruit) {
        if (this.x === fruit.x && this.y === fruit.y) {
            this.total++;
            return true;
        }
        return false;
    }

    checkCollision() {
        for (let i = 0; i < this.tail.length; i++) {
            if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
                this.total = 0;
                this.tail = [];
            }
        }
    }
}

// Fruit Class
class Fruit {
    constructor() {
        this.x;
        this.y;
    }

    pickLocation() {
        this.x = Math.floor(Math.random() * columns) * scale;
        this.y = Math.floor(Math.random() * rows) * scale;
    }

    draw() {
        ctx.fillStyle = '#8b2be2';
        ctx.fillRect(this.x, this.y, scale, scale);
    }
}

// Start Snake Game
function startSnakeGame() {
    // Show the mobile device overlay with the Snake game
    const snakeGameOverlay = document.getElementById('snake-game-overlay');
    snakeGameOverlay.style.display = 'block';

    // Initialize canvas and context
    canvas = document.getElementById('snakeCanvas');
    ctx = canvas.getContext('2d');

    // Set canvas dimensions based on device container
    canvas.width = 280; // Adjust width as needed
    canvas.height = 460; // Adjust height as needed

    // Calculate number of rows and columns
    rows = canvas.height / scale;
    columns = canvas.width / scale;

    // Initialize snake and fruit objects
    snake = new Snake();
    fruit = new Fruit();
    fruit.pickLocation();


    // Start game loop
    gameInterval = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fruit.draw();
        snake.update();
        snake.draw();

        if (snake.eat(fruit)) {
            fruit.pickLocation();
        }

        statusBarTime()
        snake.checkCollision();
        // Update and display score
        document.getElementById('score').textContent = snake.total;
    }, 150); // Adjust game speed as needed

    // Add event listener for keydown events on the canvas
    canvas.addEventListener('keydown', function(event) {
        // Prevent default behavior for arrow keys to avoid page scrolling
        if ([37, 38, 39, 40].includes(event.keyCode)) {
            event.preventDefault();
        }
    });

    canvas.addEventListener('touchstart', handleTouchStart, false);
    canvas.addEventListener('touchmove', handleTouchMove, false);

    // Ensure the canvas is focusable by adding a tabindex attribute
    canvas.setAttribute('tabindex', '0');
    canvas.focus();
}

// Close Snake Game
function closeSnakeGame() {
    // Hide the mobile device overlay
    const snakeGameOverlay = document.getElementById('snake-game-overlay');
    snakeGameOverlay.style.display = 'none';

    // Stop the game loop
    clearInterval(gameInterval);
}

// Event listener for keyboard controls
window.addEventListener('keydown', e => {
    const direction = e.key.replace('Arrow', '');
    snake.changeDirection(direction);
});

function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
}

function handleTouchMove(event) {
    if (!touchStartX || !touchStartY) {
        return;
    }

    let touchEndX = event.touches[0].clientX;
    let touchEndY = event.touches[0].clientY;

    let dx = touchEndX - touchStartX;
    let dy = touchEndY - touchStartY;

    // Determine direction based on the largest movement axis
    if (Math.abs(dx) > Math.abs(dy)) {
        // Horizontal swipe
        if (dx > 0) {
            // Right swipe
            snake.changeDirection('Right');
        } else {
            // Left swipe
            snake.changeDirection('Left');
        }
    } else {
        // Vertical swipe
        if (dy > 0) {
            // Down swipe
            snake.changeDirection('Down');
        } else {
            // Up swipe
            snake.changeDirection('Up');
        }
    }

    // Reset touch start coordinates
    touchStartX = 0;
    touchStartY = 0;

    event.preventDefault();
}

function statusBarTime() {
    const now = new Date();

    // Get hours, minutes, and seconds from the Date object
    const hours = now.getHours(); // 0-23
    let minutes = now.getMinutes().toString().padStart(2, '0');

    // Format the time as HH:MM:SS (24-hour format)
    const currentTime = `${hours}:${minutes}`;

    document.getElementById('status-time').textContent = currentTime;


}