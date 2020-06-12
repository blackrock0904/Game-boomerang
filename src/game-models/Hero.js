class Hero {
  constructor(x = 0, y = 0) {
    this.face = '🤠';
    this.x = x;
    this.y = y;
  }
  get heroPosition() {
    return this.x + this.y * process.stdout.columns;
  }

  moveLeft() {
    this.x -= 1;
  }
  moveRight() {
    this.x += 1;
  }
  moveUp() {
    this.y -= 1;
  }
  moveDown() {
    this.y += 1;
  }
  

  die() {
    this.skin = '💀';
    console.log('YOU ARE DEAD!💀');
    process.exit();
  }
}

module.exports = Hero;
