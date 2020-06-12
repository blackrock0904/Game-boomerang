class Boomerang {
  constructor(power = 15) {
    this.face = '🌀';
    this.x = 0;
    this.power = power;
  }

  fly(startPosition) {
    this.x = startPosition;
    this.interval = setInterval(() => {
      if (this.x > this.power + startPosition) {
        this.x = 0;
        clearInterval(this.interval);
      }
      this.moveRight();
    }, 200)
  }

  moveLeft() {
    this.x -= 1;
  }

  moveRight() {
    this.x += 1;
  }
}

module.exports = Boomerang;
