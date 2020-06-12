const Hero = require('./game-models/Hero');
const Boomerang = require('./game-models/Boomerang');
const Enemy = require('./game-models/Enemy');
const keypress = require('keypress');
const cursor = require('cli-cursor');
cursor.hide();
const View = require('./View');

class Game {
  constructor(name = 'unknown') {
    this.time = 0;
    this.shore = 0;
    this.name = name;
    this.hero = new Hero();
    this.enemy = new Enemy();
    this.boomerang = new Boomerang();
    this.view = new View();
    this.space = ' ';
    this.baseWidth = process.stdout.columns;
    this.baseHeight = process.stdout.rows;
    this.regenerateTrack();
  }

  startTimer() {
    setInterval(() => {
      this.time++
    }, 1000);
  }

  regenerateTrack() {
    this.check();
    if (this.enemy.x == 0) {
      this.enemy.enemyKill();
      this.enemy = new Enemy();
      this.enemy.enemyGo();
    }
    this.track = (new Array(this.baseWidth * (this.baseHeight - 3))).fill(this.space);
    this.track[this.hero.heroPosition] = this.hero.face;
    if (this.enemy.x > 0) this.track[this.enemy.enemyPosition] = this.enemy.face;
    if (this.boomerang.x > 1) this.track[this.boomerang.x] = this.boomerang.face;
  }

  play() {
    this.startTimer();
    this.enemy.enemyGo();
    keypress(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.on('keypress', (ch, key) => {
      switch (key.name) {
        case 'up':
          (this.hero.y > 0) ? this.hero.moveUp(): null;
          break;
        case 'right':
          (this.hero.x < this.baseWidth - 1) ? this.hero.moveRight(): null;
          break;
        case 'down':
          (this.hero.y < this.baseHeight - 4) ? this.hero.moveDown(): null;
          break;
        case 'left':
          (this.hero.x > 0) ? this.hero.moveLeft(): null;
          break;
        case 'r':
          console.log('***** You are out of the game *****', '\n\n\n\n\n\n');
          process.exit();
          break;
        case 'space':
          if (this.boomerang.x > 0) {
            clearInterval(this.boomerang.interval);
            this.boomerang.x = 0;
          }
          this.boomerang.fly(this.hero.heroPosition);
          break;
      }
      this.regenerateTrack();
    });

    setInterval(() => {
      this.regenerateTrack();
      this.view.render(this);
      //console.log(this.hero.y);
      //this.check();
    }, 100);
  }

  check() {
    if (this.hero.heroPosition === this.enemy.enemyPosition) {
      this.gameOver();
    }
  }
  gameOver() {
    this.hero.skin = '💀';
    console.log('💀💀💀 YOU ARE DEAD 💀💀💀');
    process.exit();
  }
}

module.exports = Game;
