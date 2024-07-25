const displayStats = require("../utils/displayStats");

class Warrior extends displayStats {
  constructor(name) {
    super()
    this.name = name;
    this.hp = 100;
    this.str = 8;
    this.int = 3;
    this.evasion = 4;
  }
  
  displayStats() {
    console.log(`Nome: ${this.name}`.green);
    console.log(`HP: ${this.hp}`.red);
    console.log(`Força: ${this.str}`.blue);
    console.log(`Inteligência: ${this.int}`.yellow);
    console.log(`Evasão: ${this.evasion}`.magenta);
  }
}

module.exports = Warrior;
