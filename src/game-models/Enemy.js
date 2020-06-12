class Enemy {
  constructor() {
    this.generateFace();
    this.x = process.stdout.columns - 1;
    this.y = 0;
  }

  enemyGo() {
    this.interval = setInterval(() => {
      this.moveLeft()
    }, 100);
  }
  enemyKill() {
    clearInterval(this.interval);
  }

  generateFace() {
    const faces = ['👾', '💀', '👹', '👻', '👽', '👿', '💩', '🤡', '🤺', '🧛', '🧟', '🎃'];
    this.face = faces[Math.floor(Math.random() * faces.length)];
  }

  moveLeft() {
    this.x -= 1;
  }

  // die() {
  //   this.position = '?';
  //   console.log('Enemy is dead!');
  // }
}

module.exports = Enemy;
