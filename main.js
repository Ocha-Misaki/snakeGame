"use strict"
{
  const block_size = 20
  const canvas_vertical = 400
  const canvas_beside = 400
  canvasId.width = canvas_beside
  canvasId.height = canvas_vertical

  const drawCell = (_x, _y, context) => {
    let px = _x * block_size
    let py = _y * block_size
    context.fillStyle = "green"
    context.fillRect(px, py, block_size, block_size)
    context.strokeRect(px, py, block_size, block_size)
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

  class Board {
    constructor() {
      this.canvas = document.getElementById("canvasId")
      this.context = this.context = this.canvas.getContext("2d")
      this.snake = new Snake()
      this.snakeDirection = "right"
      this.init()
    }
    init() {
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
      setInterval(() => {
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
    }
    draw() {
      this.snake.draw()
    }
  }

  const board = new Board()
  board.set()
}
