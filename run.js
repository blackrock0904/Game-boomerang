const yodasay = require('yodasay');
const { table } = require('table');
const User = require('./src/mongoose');
const readline = require('readline');
const mongoose = require('mongoose');
const Game = require('./src/Game');
console.clear();
const interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(question) {
  return new Promise(res => {
    interface.question(question, (answer) => {
      res(answer);
    });
  });
}

async function main() {
  const name = await question('Enter your name\n');
  const answer = await question('1- GAME\n2 - HISTORY\n');
  if (answer == 1) {
    console.log(yodasay.say({
      text: 'MAY THE FORCE BE WITH YOU',
    }));
    setTimeout(() => {
      const game = new Game(name);
      game.play();
    }, 4000);
  } else {
    mongoose.connect('mongodb://localhost:27017/GameZena2020Shougan', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    async function Table() {
      const arr = await User.find({}, {
        _id: 0,
        __v: 0
      }).then((res) => res);
      arr1 = [
        ['Name', 'Score']
      ];
      for (i = 0; i < arr.length; i++) {
        arr2 = [];
        arr2.push(arr[i].name, arr[i].score);
        arr1.push(arr2);
      }
      output = table(arr1);

      console.log(output);

      mongoose.connection.close();
    }
    Table();
  }
}
main();
