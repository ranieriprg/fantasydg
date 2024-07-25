const displayStats = require('../utils/displayStats')

class Mage extends displayStats {
  constructor(name) {
    super(); 
    this.name = name;
    this.hp = 100;
    this.str = 3;
    this.int = 8;
    this.evasion = 6;
  }

}
module.exports = Mage;
