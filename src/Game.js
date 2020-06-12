const Hero = require('./game-models/Hero');
const Boomerang = require('./game-models/Boomerang');
const Enemy = require('./game-models/Enemy');
const keypress = require('keypress');
const cursor = require('cli-cursor');
cursor.hide();
const View = require('./View');
const mongoose = require('mongoose');
const User = require('./mongoose');

class Game {
  constructor(name = 'unknown') {
    this.enemy = [];
    this.time = 0;
    this.shore = 0;
    this.name = name;
    this.hero = new Hero();
    this.enemy[this.shore] = new Enemy();
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
    this.enemy.forEach((enemy, i) => {
      if (enemy.x == 0) {
        this.enemy[i].enemyKill();
        this.enemy[i] = new Enemy();
        this.enemy[i].enemyGo();
      }
    });

    this.track = (new Array(this.baseWidth * (this.baseHeight - 3))).fill(this.space);
    this.track[this.hero.heroPosition] = this.hero.face;
    this.enemy.forEach((enemy, i) => {
      if (enemy.x > 0) this.track[enemy.enemyPosition] = enemy.face;
    });
    if (this.boomerang.x > 1) this.track[this.boomerang.x] = this.boomerang.face;
  }

  play() {
    this.startTimer();
    this.enemy[this.shore].enemyGo();
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
    }, 100);
  }

  check() {
    if (this.boomerang.x > 0) {
      this.enemy.forEach((enemy, i) => {
        if (this.boomerang.x == enemy.enemyPosition || this.boomerang.x == enemy.enemyPosition - 1) {
          ++this.shore;
          this.enemy[i].enemyKill();
          this.enemy[i] = new Enemy();
          this.enemy[i].enemyGo();
          this.enemy[this.shore] = new Enemy();
          this.enemy[this.shore].enemyGo();
        }
      });
    }
    this.enemy.forEach((enemy, i) => {
      if (this.hero.heroPosition === enemy.enemyPosition) this.gameOver();
    });

  }
  gameOver() {
    new Promise(res => {
      mongoose.connect('mongodb://localhost:27017/GameZena2020Shougan', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      const newUser = new User({
        name: this.name,
        score: this.shore
      });

      newUser.save((err, data) => {
        if (err) {
          console.log(err);
        }
        res();
        mongoose.connection.close();
      });
    }).then(() => {
      this.hero.skin = '💀';
      console.log('💀 💀 💀 YOU ARE DEAD 💀 💀 💀');
      console.log(`YOU KILLED ${this.shore} ENEMIES`);
      process.exit();
    });
  }
}

module.exports = Game;
