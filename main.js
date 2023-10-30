"use strict"
{
  const block_size = 20
  const field_vertical = 20
  const canvas_vertical = block_size * field_vertical
  const field_beside = 20
  const canvas_beside = block_size * field_beside
  canvasId.width = canvas_beside
  canvasId.height = canvas_vertical

  const drawCell = (_x, _y, context) => {
    let px = _x * block_size
    let py = _y * block_size
    context.fillStyle = "green"
    context.fillRect(px, py, block_size, block_size)
    context.strokeRect(px, py, block_size, block_size)
  }
  const rand = (min, max) => {
    if (max < min) {
      copyMin = min
      max = copyMin
      min = max
    }
    return Math.floor(Math.random() * (max - min) + min)
  }
  class Snake {
    constructor() {
      this.canvas = document.getElementById("canvasId")
      this.context = this.context = this.canvas.getContext("2d")
      this.cells = [new Cell(3, 0), new Cell(2, 0), new Cell(1, 0)]
    }
    draw() {
      this.cells.forEach((cell) => {
        drawCell(cell.x, cell.y, this.context)
      })
    }
  }

  class Cell {
    constructor(_x, _y) {
      this.x = _x
      this.y = _y
    }
  }

  class Item {
    constructor() {
      this.canvas = document.getElementById("canvasId")
      this.context = this.context = this.canvas.getContext("2d")
      this.randX = rand(0, field_beside)
      this.randY = rand(field_vertical / 2, field_vertical)
    }
    hitSnake() {
      //snakeに衝突した時の処理を書く
      //booleanで返すのが良さそう？
    }
    draw() {
      drawCell(this.randX, this.randY, this.context)
    }
  }

  class Board {
    constructor() {
      this.canvas = document.getElementById("canvasId")
      this.context = this.context = this.canvas.getContext("2d")
      this.snake = new Snake()
      this.snakeDirection = "right"
      this.intervalId = undefined
      this.item = new Item()
      this.gameOver = false
      this.init()
    }
    init() {
      if (this.gameOver == true) {
        return
      }
      document.addEventListener("keydown", (e) => {
        switch (e.keyCode) {
          case 37: //左
            if (this.snakeDirection !== "right") {
              this.snakeDirection = "left"
            }
            break
          case 38: //上
            if (this.snakeDirection !== "down") {
              this.snakeDirection = "up"
            }
            break
          case 39: //右
            if (this.snakeDirection !== "left") {
              this.snakeDirection = "right"
            }
            break
          case 40: //下
            if (this.snakeDirection !== "up") {
              this.snakeDirection = "down"
            }
            break
        }
      })
    }
    set() {
      this.intervalId = setInterval(() => {
        this.update()
        this.draw()
      }, 1000)
    }
    update() {
      this.context.clearRect(0, 0, canvas_vertical, canvas_beside)
      const tipsCell = this.snake.cells[0]
      switch (this.snakeDirection) {
        case "left":
          this.snake.cells.pop()
          this.snake.cells.unshift(new Cell(tipsCell.x - 1, tipsCell.y))
          break
        case "up":
          this.snake.cells.pop()
          this.snake.cells.unshift(new Cell(tipsCell.x, tipsCell.y - 1))
          break
        case "right":
          this.snake.cells.pop()
          this.snake.cells.unshift(new Cell(tipsCell.x + 1, tipsCell.y))
          break
        case "down":
          this.snake.cells.pop()
          this.snake.cells.unshift(new Cell(tipsCell.x, tipsCell.y + 1))
          break
      }
      if (
        this.snake.cells[0].x + 1 >= field_beside ||
        this.snake.cells[0].y + 1 >= field_vertical
      ) {
        clearInterval(this.intervalId)
        this.gameOver = true
      }
    }
    draw() {
      //boardの描画
      this.context.fillStyle = "black"
      this.context.fillRect(0, 0, canvas_beside, canvas_vertical)
      this.snake.draw()
      this.item.draw()
    }
  }

  const board = new Board()
  board.set()
}
