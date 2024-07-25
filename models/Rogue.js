const displayStats = require("../utils/displayStats");

class Rogue extends displayStats {
  constructor(name) {
    super()
    this.name = name;
    this.hp = 100;
    this.str = 6;
    this.int = 5;
    this.evasion = 6;
  }
}

module.exports = Rogue;
