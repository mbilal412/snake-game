const board = document.querySelector('.board');
const modal = document.querySelector('.modal');
const game_over = document.querySelector('.game-over');
const restart = document.querySelector('.restart');
const game_start = document.querySelector('.game-start');
const start = document.querySelector('.start');
const block_width = 26;
const block_height = 26;
const cols = Math.floor((board.clientWidth) / block_width);
const rows = Math.floor((board.clientHeight) / block_height);
const score = document.querySelector('.score h3 span');
const time = document.querySelector('.time h3 span');
const highscore = document.querySelector('.highscore h3 span');

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

let point = 0
let highest = 0;
let intervalId = null;
let timeIntervalId = null;
let direction = null;
let snake = null;

let food = null;
let timer = '00-00';

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



let displayTime = function () {
    let [min, sec] = timer.split('-').map(Number);
    if (sec === 60) {
        sec = 0;
        min += 1;
    }
    else {
        sec += 1;
    }
    console.log(sec)
    timer = `${min}-${sec}`
    time.innerHTML = timer;
}



start.addEventListener('click', () => {
    game_start.style.display = 'none';
    timeIntervalId = setInterval(() => {
        displayTime();
    }, 1000);

    intervalId = setInterval(() => {
        showSnake();
    }, 90);
})

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
    }, 90);
    timeIntervalId = setInterval(() => {
        displayTime();
    }, 1000);

    direction = "down";

    point = 0;
    score.innerHTML = point;
    timer = '00-00';
    time.innerHTML = timer

    highscore.innerHTML = localStorage.getItem('highest')

}

window.addEventListener('load', () => {
    highest = Number(localStorage.getItem('highest')) || 0;
    highscore.innerHTML = highest;
});


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
        point += 10;
        if (point >= highest) {
            highest = point;  
            localStorage.setItem('highest', highest);
            highscore.innerHTML = highest;
        }
        score.innerHTML = point;

        return;
    }

    if (head.x === rows || head.y === cols || head.x < 0 || head.y < 0) {
        game_over.style.display = 'flex';
        clearInterval(intervalId);
        clearInterval(timeIntervalId);
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

// function showFood() {
//     food = {
//         x: Math.floor(Math.random() * rows),
//         y: Math.floor(Math.random() * cols)
//     };

// }




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

