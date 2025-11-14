const board = document.querySelector('.board');
const block_width = 32;
const block_height = 32;
const cols = Math.floor((board.clientWidth) / block_width);
const rows = Math.floor((board.clientHeight) / block_height);


const blocks = [];
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement('div');
        block.classList.add('block');
        board.append(block);
        block.innerText = `${row}-${col}`; // Swapped
        blocks[`${row}-${col}`] = block;  // Swapped - now it's x-y
    }
}


const snake = [
    {
        x: 4,
        y: 6
    },
    {
        x: 4,
        y: 7
    },
    

]
const head = {
    x: snake[0].x,
    y: snake[0].y
}




let direction = "left";

let showSnake = () => {

    snake.forEach(element => {


        blocks[`${element.x}-${element.y}`].classList.add("fill");


    });
}

window.addEventListener("keydown", (event) => {
        console.log(event.key)
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


setInterval(() => {
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


    
    snake.forEach(element => {


        blocks[`${element.x}-${element.y}`].classList.remove("fill");


    });
    snake.unshift(head);
    snake.pop();
    showSnake();
}, 100);



