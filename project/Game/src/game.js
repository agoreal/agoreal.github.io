const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4
}

class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth
    this.gameHeight = gameHeight
    this.gamestate = GAMESTATE.MENU
    this.paddle = new Paddle(this)
    this.ball = new Ball(this)
    this.gameObjects = []
    this.bricks = []
    this.lives = 3

    this.levels = [level1, level2]
    this.currentlevel = 0

    new InputHandler(this.paddle, this);
  }
  start() {
    if (
      this.gamestate !== GAMESTATE.MENU &&
      this.gamestate !== GAMESTATE.NEWLEVEL
      ) return

    this.bricks = buildLevel(this, this.levels[this.currentlevel])
    this.ball.reset()
    this.gameObjects = [this.ball, this.paddle]

    this.gamestate = GAMESTATE.RUNNING
  }

  update(deltaTime) {
    if (this.lives === 0) {
      this.gamestate = GAMESTATE.GAMEOVER
    }

    if (
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU ||
      this.gamestate === GAMESTATE.GAMEOVER
    )
      return

    if (this.bricks.length === 0) {
      this.currentlevel++
      this.gamestate = GAMESTATE.NEWLEVEL
      this.start()
    }

    [...this.gameObjects, ...this.bricks].forEach(object => object.update(deltaTime))

    this.bricks = this.bricks.filter(brick => !brick.markedForDeletion)
  }

  draw(ctx) {
    [...this.gameObjects, ...this.bricks].forEach(object => object.draw(ctx))

    if (this.gamestate === GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight)
      ctx.fillStyle = "rgba(0,0,0,0.5)"
      ctx.fill()

      ctx.font = '30px Arial'
      ctx.fillStyle = "White"
      ctx.textAlign = "center"
      ctx.fillText("暂停中…", this.gameWidth / 2, this.gameHeight / 2)
    }

    if (this.gamestate === GAMESTATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight)
      ctx.fillStyle = "rgba(0,0,0,1)"
      ctx.fill()

      ctx.font = '30px Arial'
      ctx.fillStyle = "White"
      ctx.textAlign = "center"
      ctx.fillText("按回车键开始游戏", this.gameWidth / 2, this.gameHeight / 2)
    }

    if (this.gamestate === GAMESTATE.GAMEOVER) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight)
      ctx.fillStyle = "rgba(0,0,0,1)"
      ctx.fill()

      ctx.font = '30px Arial'
      ctx.fillStyle = "White"
      ctx.textAlign = "center"
      ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2)
    }
  }

  togglePause() {
    if (this.gamestate == GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING
    } else {
      this.gamestate = GAMESTATE.PAUSED
    }
  }
}