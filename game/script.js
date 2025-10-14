class GameObject {
  #position = [];

  constructor() {
    this.#position = this.setRandomPosition();
  }

  position() {
    return [...this.#position];
  }
  getX() {
    return this.#position[0];
  }
  getY() {
    return this.#position[1];
  }
  setRandomPosition() {
    const x = Math.floor(Math.random() * 30) + 1;
    const y = Math.floor(Math.random() * 30) + 1;
    this.#position = [x, y];
    return [x, y];
  }
  setPosition(x, y) {
    const clamp = (v) => Math.max(1, Math.min(31, v));
    this.#position = [clamp(x), clamp(y)];
  }
}
class Food extends GameObject {
  constructor() {
    super();
  }
}
class Snake extends GameObject {
  #velocity = [0, 0];
  #body = [];

  constructor() {
    super();
    this.#body.push(this.position())
  }
  setVelocity(key) {
    if (key.key === "ArrowLeft") this.#velocity = [0, -1];
    if (key.key === "ArrowRight") this.#velocity = [0, 1];
    if (key.key === "ArrowUp") this.#velocity = [-1, 0];
    if (key.key === "ArrowDown") this.#velocity = [1, 0];
  }
  grow(coordinate) {
    this.#body.push(coordinate);
  }
  getBody() {
    return this.#body;
  }
  getX() {
    return this.#body[0][0];
  }
  getY() {
    return this.#body[0][1];
  }
  updatePosition() {
    const [x, y] = this.#body[0];
    const [vx, vy] = this.#velocity;
    this.#body[0] = [x+vx,y+vy]
    for(let i = this.#body.length -1; i>0; i--) {
      this.#body[i] = this.#body[i-1]
    }
  }
}

const playBoard = document.querySelector(".play-board");

let food = new Food();
let snake = new Snake();

const initGame = () => {
  let htmlMarkup = `<div class="food" style="grid-area: ${food.getX()} / ${food.getY()}"></div>`;
  if (snake.getX() === food.getX() && snake.getY() === food.getY()) {
    snake.grow([food.getX(), food.getY()]);
    food.setRandomPosition();
  }
  for (let i in snake.getBody()) {
    htmlMarkup += `<div class="snake body" style="grid-area: ${snake.getBody()[i][0]} / ${snake.getBody()[i][1]}"></div>`;
  }
  playBoard.innerHTML = htmlMarkup;
};

const intervalID = setInterval(() => {
  initGame();
  snake.updatePosition();
}, 125);
document.addEventListener("keydown", (e) => {
  snake.setVelocity(e);
});
