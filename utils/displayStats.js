const colors = require('colors');

class displayStats {
   displayStats() {
    console.log(`Nome: ${this.name}`.green);
    console.log(`HP: ${this.hp}`.red);
    console.log(`Força: ${this.str}`.blue);
    console.log(`Inteligência: ${this.int}`.yellow);
    console.log(`Evasão: ${this.evasion}`.magenta);
  }
}
module.exports = displayStats
