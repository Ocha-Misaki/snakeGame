"use strict"
{
  const block_size = 20
  const field_vertical = 20
  const canvas_vertical = block_size * field_vertical
  const field_beside = 20
  const canvas_beside = block_size * field_beside
  canvasId.width = canvas_beside
  canvasId.height = canvas_vertical

  const drawCell = (_x, _y, context, color = "green") => {
    let px = _x * block_size
    let py = _y * block_size
    context.fillStyle = color
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
      drawCell(this.randX, this.randY, this.context, "red")
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
              keyLogs.push("left")
              // updateのときに
              if (keyLogs.length > 0) {
                this.snakeDirection = keyLogs[0]
              }
            }
            ////////
            if (this.snakeDirection !== "right") {
              this.snakeDirection = "left"
              //keyLogs.push('left)
              // updateのときに
              /*
              keyLogs.filter(key => {
                === 'right' ? key !== 'left'
              })[0]
            */
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
      }, 500)
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
        confirm("game over")
      } else {
        this.snake.cells.pop()
        this.snake.cells.unshift(new Cell(ptFuture.x, ptFuture.y))
      }

      if (this.item.hitSnake(this.snake) == true) {
        this.item = new Item()
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
