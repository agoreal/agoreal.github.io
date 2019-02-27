let canvas = document.getElementById('gameScreen')
let ctx = canvas.getContext('2d')

const GAME_WIDTH = 800
const GMAE_HTIGHT = 600

let game = new Game(GAME_WIDTH, GMAE_HTIGHT)

let lastTime = 0
function gameloop(timestamp) {
  let deltaTime = timestamp - lastTime
  lastTime = timestamp

  ctx.clearRect(0, 0, GAME_WIDTH, GMAE_HTIGHT)

  game.update(deltaTime)
  game.draw(ctx)

  requestAnimationFrame(gameloop)
}

requestAnimationFrame(gameloop)