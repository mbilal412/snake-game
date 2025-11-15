const board = document.querySelector('.board');
const modal = document.querySelector('.modal');
const game_over = document.querySelector('.game-over');
const restart = document.querySelector('.restart');
const game_start = document.querySelector('.game-start');
const start = document.querySelector('.start');
const block_width = 28;
const block_height = 28;
const cols = Math.floor((board.clientWidth) / block_width);
const rows = Math.floor((board.clientHeight) / block_height);


const blocks = [];
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement('div');
        block.classList.add('block');
        board.append(block);
        blocks[`${row}-${col}`] = block;
    }
}


game_start.style.display = 'flex';

start.addEventListener('click', () => {
    game_start.style.display = 'none';
    intervalId = setInterval(() => {
        showSnake();
    }, 140);
})

let intervalId = null;
let direction = null;
let snake = null;

let food = null;

direction = "down";
    snake = [
        {
            x: 5,
            y: 5
        },
        {
            x: 4,
            y: 5
        },
    ]

    food = {
        x: Math.floor(Math.random() * rows),
        y: Math.floor(Math.random() * cols)
    };


restart.addEventListener('click', resetGame)


function resetGame() {
    game_over.style.display = 'none';
    
    document.querySelectorAll('.block').forEach(block =>
        block.classList.remove('fill', 'food')
    )
    
    direction = "down";
    snake = [
        {
            x: 5,
            y: 5
        },
        {
            x: 4,
            y: 5
        },
    ]

    food = {
        x: Math.floor(Math.random() * rows),
        y: Math.floor(Math.random() * cols)
    };

    intervalId = setInterval(() => {
        showSnake();
    }, 140);
}




function showSnake() {

    blocks[`${food.x}-${food.y}`].classList.add("food");

    let head = null;
    if (direction === "left") {
        head = { x: snake[0].x, y: snake[0].y - 1 };
    }
    if (direction === "right") {
        head = { x: snake[0].x, y: snake[0].y + 1 };
    }
    if (direction === "down") {
        head = { x: snake[0].x + 1, y: snake[0].y };
    }
    if (direction === "up") {
        head = { x: snake[0].x - 1, y: snake[0].y };
    }

    if (head.x === food.x && head.y === food.y) {
        blocks[`${food.x}-${food.y}`].classList.remove("food");
        snake.unshift(head);
        render();
        showFood();
        return;
    }

    if (head.x === rows || head.y === cols || head.x < 0 || head.y < 0) {
        game_over.style.display = 'flex'
        clearInterval(intervalId);
        return;
    }
    snake.forEach(element => {


        blocks[`${element.x}-${element.y}`].classList.remove("fill");


    });
    snake.unshift(head);
    snake.pop();

    function render() {
        snake.forEach(element => {
            blocks[`${element.x}-${element.y}`].classList.add("fill");
        });
    }
    render();

}


function showFood() {
    food = {
        x: Math.floor(Math.random() * rows),
        y: Math.floor(Math.random() * cols)
    }

    // blocks[`${food.x}-${food.y}`].classList.add("food");


}

function showFood() {
    food = {
        x: Math.floor(Math.random() * rows),
        y: Math.floor(Math.random() * cols)
    };

}




// intervalId = setInterval(() => {
//     showSnake();
// }, 440);


window.addEventListener("keydown", (event) => {

    if (event.key === "ArrowUp") {
        direction = 'up'
    }
    else if (event.key === "ArrowDown") {
        direction = 'down'
    }
    else if (event.key === "ArrowLeft") {
        direction = 'left'
    }
    if (event.key === "ArrowRight") {
        direction = 'right'
    }
})

