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
      this.cells = [
        new Cell(6, 0),
        new Cell(5, 0),
        new Cell(4, 0),
        new Cell(3, 0),
        new Cell(2, 0),
        new Cell(1, 0),
      ]
    }
    get head() {
      return this.cells[0]
    }
    futurePoint(snakeDirection) {
      const head = this.head
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
    hitBody() {
      const [head, ...body] = this.cells
      return body.some((cell) => {
        return cell.x == head.x && cell.y == head.y
      })
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
      this.context = this.canvas.getContext("2d")
      this.randX = rand(0, field_beside)
      this.randY = rand(field_vertical / 2, field_vertical)
    }
    hit(snake) {
      if (this.randX == snake.head.x && this.randY == snake.head.y) {
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
      this.lastKey = undefined
      this.intervalId = undefined
      this.item = new Item()
      this.gameOver = false
      this.speed = 1000
      this.score = 0
      this.init()
    }
    init() {
      if (this.gameOver) {
        return
      }
      document.addEventListener("keydown", (e) => {
        switch (e.keyCode) {
          case 37: //左
            if (this.snakeDirection !== "right") {
              this.lastKey = "left"
            }
            break
          case 38: //上
            if (this.snakeDirection !== "down") {
              this.lastKey = "up"
            }
            break
          case 39: //右
            if (this.snakeDirection !== "left") {
              this.lastKey = "right"
            }
            break
          case 40: //下
            if (this.snakeDirection !== "up") {
              this.lastKey = "down"
            }
            break
        }
      })
    }
    set() {
      this.intervalId = setInterval(() => {
        this.update()
        this.draw()
      }, this.speed)
    }
    update() {
      this.context.clearRect(0, 0, canvas_vertical, canvas_beside)
      if (this.lastKey !== undefined) {
        this.snakeDirection = this.lastKey
        this.lastKey = undefined
      }
      const ptFuture = this.snake.futurePoint(this.snakeDirection)
      if (
        ptFuture.x < 0 ||
        ptFuture.y < 0 ||
        ptFuture.x > field_beside - 1 ||
        ptFuture.y > field_vertical - 1 ||
        this.snake.hitBody()
      ) {
        clearInterval(this.intervalId)
        this.gameOver = true
        confirm("game over")
      } else {
        // アイテムとった場合、popをスキップすることでヘビを伸ばしている
        if (this.item.hit(this.snake)) {
          this.score++
          this.item = new Item()
        } else {
          this.snake.cells.pop()
        }
        this.snake.cells.unshift(new Cell(ptFuture.x, ptFuture.y))
      }
      if (this.score % 3 == 0) {
        this.speedUp()
      } else {
        return
      }
    }
    speedUp() {
      clearInterval(this.intervalId)
      this.speed -= 10
      this.set()
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
