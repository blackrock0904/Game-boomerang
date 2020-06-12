
const yodasay = require('yodasay');
const { table } = require('table');
const readlineSync = require('readline-sync');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/GameZena2020Shougan', { useNewUrlParser: true, useUnifiedTopology: true });

const Game = require('./src/Game');
console.clear()
//const name = readlineSync.question('Введите имя!\n');
console.clear();
//const choice = readlineSync.question('[1] Чтобы начать игру нажмите\n[2] Для просмотра истории нажмите\n');
console.clear();
const score = Math.floor(Math.random() * (50 - 1) + 1);
const choice = 1;
const name = 'Maks';

const userSchema = new mongoose.Schema({
  name: String,
  score: Number,
});
const User = mongoose.model('user', userSchema);

if (choice == 1) {
  console.log(yodasay.say({
    text: 'AND MAY BE FORCE BE WITH YOU.',
  }));
  const user1 = new User({
    name,
    score,
  });

  user1.save((err, data) => {
    if (err) {
      console.log(err);rr
    } else {
    }
    mongoose.connection.close();
  });
//let name = 'const'
  const game = new Game(name);
  game.play();

} else {
  async function Table() {
    const arr = await User.find({}, { _id: 0, __v: 0 }).then((res) => res);
    arr1 = [['Name', 'Score']];
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
