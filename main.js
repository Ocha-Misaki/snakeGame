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
    futurePoint(snakeDirection) {
      const head = this.cells[0]
      switch (snakeDirection) {
        case "left":
          return { x: head.x - 1, y: head.y }

        case "up":
          return { x: head.x, y: head.y - 1 }

        case "right":
          return { x: head.x + 1, y: head.y }

        case "down":
          return { x: head.x, y: head.y + 1 }
      }
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
      this.visible = true
    }
    hitSnake(snake) {
      //snakeに衝突した時の処理を書く
      //booleanで返すのが良さそう？

      if (this.randX == snake.cells[0].x && this.randY == snake.cells[0].y) {
        return true
      }
      return false
    }
    draw() {
      if (this.visible == true) {
        drawCell(this.randX, this.randY, this.context)
      }
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
      }, 800)
    }
    update() {
      this.context.clearRect(0, 0, canvas_vertical, canvas_beside)

      const ptFuture = this.snake.futurePoint(this.snakeDirection)
      if (
        ptFuture.x < 0 ||
        ptFuture.y < 0 ||
        ptFuture.x >= field_beside - 1 ||
        ptFuture.y >= field_vertical - 1
      ) {
        clearInterval(this.intervalId)
        this.gameOver = true
      } else {
        this.snake.cells.pop()
        this.snake.cells.unshift(new Cell(ptFuture.x, ptFuture.y))
      }


      if (this.item.hitSnake(this.snake) == true) {
        this.item.visible = false //うまく動いていない
        //蛇を伸ばす
        const lastCell = this.snake.cells[this.snake.cells.length - 1]
        this.snake.cells.push(new Cell(lastCell.x - 1, lastCell.y))
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
