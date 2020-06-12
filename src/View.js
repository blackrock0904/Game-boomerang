const {
  formatDuration
} = require('./parse_time');

class View {
  render(game) {
    console.clear();
    console.log(`TIME: ${formatDuration(game.time)} ${'SCORE:'.padStart(10,' ')} ${String(game.shore).padStart(3,'0')} ${'NAME:'.padStart(9,' ')} ${game.name}`);
    console.log('_'.repeat(game.baseWidth));
    console.log(game.track.join(''));
  }
}

module.exports = View;
