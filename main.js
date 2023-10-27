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
      this.init()
    }
    init() {
      //キーを受けつけたら、上下左右に動くようにする
      //updateとdrawを押されるたびに呼び出す
      document.addEventListener("keydown", (e) => {
        this.context.clearRect(0, 0, canvas_vertical, canvas_beside)
        const tipsCell = this.snake.cells[0]
        switch (e.keyCode) {
          case 37: //左
            this.snake.cells.pop()
            this.snake.cells.unshift(new Cell(tipsCell.x - 1, tipsCell.y))
            break
          case 38: //上
            this.snake.cells.pop()
            this.snake.cells.unshift(new Cell(tipsCell.x, tipsCell.y - 1))
            break
          case 39: //右
            this.snake.cells.pop()
            this.snake.cells.unshift(new Cell(tipsCell.x + 1, tipsCell.y))
            break
          case 40: //下
            this.snake.cells.pop()
            this.snake.cells.unshift(new Cell(tipsCell.x, tipsCell.y + 1))
            break
        }
        this.draw()
      })
    }
    update() {}
    draw() {
      this.snake.draw()
    }
  }

  const board = new Board()
  board.draw()
}
