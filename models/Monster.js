const displayStats = require('../utils/displayStats')

class Monster extends displayStats {
  constructor(name) {
    super()
    this.name = name;
    this.hp = 2;
    this.str = 3;
    this.int = 0
    this.evasion = 0
  }
}
module.exports = Monster;
