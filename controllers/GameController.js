const figlet = require("figlet");
const inquirer = require("inquirer");
const colors = require("colors");
const readline = require("readline");

// Models
const Warrior = require("../models/Warrior");
const Rogue = require("../models/Rogue");
const Mage = require("../models/Mage");
const Monster = require("../models/Monster");
const prompt = inquirer.createPromptModule();

// Função para quebrar o texto em linhas de comprimento fixo
const wrapText = (text, width) => {
  const regex = new RegExp(`(.{1,${width}})(\\s|$)`, "g");
  return text.match(regex).join("\n");
};

// Função para imprimir o mapa
const printMap = (map, playerPosition) => {
  for (let y = 0; y < map.length; y++) {
    let row = "";
    for (let x = 0; x < map[y].length; x++) {
      if (playerPosition.x === x && playerPosition.y === y) {
        row += "@".green; // Personagem do jogador
      } else {
        row += map[y][x];
      }
    }
    console.log(row);
  }
};

module.exports = class GameController {
  constructor() {
    this.map = [
      [".", ".", ".", "#", "#", "#", ".", ".", ".", "."],
      [".", "F", "F", "#", ".", ".", ".", "C", "C", "."],
      [".", "F", "F", "#", ".", "~", "~", ".", ".", "."],
      [".", ".", ".", ".", ".", "~", "~", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    ];
    this.playerPosition = { x: 0, y: 0 };
    this.player = null; // O herói será criado posteriormente
    this.monster = null; // O herói será criado posteriormente
  }

  async startGame() {
    console.log(
      colors.green(
        figlet.textSync("Fantasy Dungeon", { horizontalLayout: "full" })
      )
    );
    console.log("RPG Game");
    await this.createHero();
  }

  async createHero() {
    prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the name of your hero: ",
        validate: (input) => input.trim() !== "" || "Name cannot be empty.",
      },
    ])
      .then((answers) => {
        const heroName = answers["name"];
        console.log(`Hello ${heroName}, how are you doing?`.green);

        // Chamar o método createClass após obter o nome do herói
        this.createClass(heroName);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async createClass(heroName) {
    const borderWidth = 38;
    const border = `
+${"-".repeat(borderWidth)}+
|${" ".repeat(borderWidth)}|
+${"-".repeat(borderWidth)}+
`;

    const printInsideBorder = (text) => {
      const wrappedText = wrapText(text, borderWidth - 2);
      const lines = wrappedText.split("\n");
      lines.forEach((line) => {
        const paddedLine = line.padEnd(borderWidth - 2);
        console.log(`| ${paddedLine} |`.yellow);
      });
    };

    console.log(border.split("\n")[0]); // Print the top border
    printInsideBorder(
      `Guardião: Saudações, bravo ${heroName}. Antes de partir em sua jornada, é imperativo que escolhas tua senda.`
    );
    printInsideBorder(
      "Guardião: Que tipo de herói tu és? Escolha sabiamente, pois tua classe definirá teu destino."
    );
    console.log(border.split("\n")[2]); // Print the bottom border

    const classes = [
      {
        name: "Guerreiro - Mestre do combate corpo-a-corpo, com força e resistência inigualáveis."
          .cyan,
        value: "Warrior",
      },
      {
        name: "Mago - Sábio manipulador das artes arcanas, capaz de conjurar poderosas magias."
          .cyan,
        value: "Mage",
      },
      {
        name: "Ladino - Ágil e astuto, mestre das sombras e das artimanhas."
          .cyan,
        value: "Rogue",
      },
    ];

    prompt([
      {
        type: "list",
        name: "class",
        message: "Guardião: Qual é tua classe, herói?".yellow,
        choices: classes,
      },
    ])
      .then((answers) => {
        const chosenClass = answers["class"];
        console.log(border.split("\n")[0]); // Print the top border
        printInsideBorder(
          `Guardião: Ah, um ${chosenClass}. Uma escolha excelente!`
        );
        console.log(border.split("\n")[2]); // Print the bottom border

        // Aqui você pode instanciar o herói com base na classe escolhida
        if (chosenClass === "Warrior") {
          this.player = new Warrior(heroName);
        } else if (chosenClass === "Mage") {
          this.player = new Mage(heroName);
        } else if (chosenClass === "Rogue") {
          this.player = new Rogue(heroName);
        }

        // Chamar o menu de navegação após a criação do herói
        this.navigateMenu(heroName);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async navigateMenu(heroName) {
    const borderWidth = 50;
    const border = `
+${"-".repeat(borderWidth)}+
|${" ".repeat(borderWidth)}|
+${"-".repeat(borderWidth)}+
`;

    const printInsideBorder = (text) => {
      const wrappedText = wrapText(text, borderWidth - 2);
      const lines = wrappedText.split("\n");
      lines.forEach((line) => {
        const paddedLine = line.padEnd(borderWidth - 2);
        console.log(`| ${paddedLine} |`.yellow);
      });
    };

    console.log(border.split("\n")[0]); // Print the top border
    printInsideBorder(`Diga campeão, o que deseja fazer? ${heroName}`);
    console.log(border.split("\n")[2]); // Print the bottom border

    const options = [
      { name: "Explorar".green, value: "Explore" },
      { name: "Inventário".cyan, value: "Itens" },
      { name: "Status".magenta, value: "Status" },
      { name: "Salvar".yellow, value: "Save" },
    ];

    prompt([
      {
        type: "list",
        name: "chosenOption",
        message: "Escolha uma opção:".yellow,
        choices: options,
      },
    ])
      .then((answers) => {
        const chosenOption = answers["chosenOption"];

        if (chosenOption === "Explore") {
          this.explore();
        } else if (chosenOption === "Itens") {
          console.log("Inventário está vazio".cyan);
          this.navigateMenu(heroName);
        } else if (chosenOption === "Status") {
          this.player.displayStats();
          this.navigateMenu(heroName);
        } else if (chosenOption === "Save") {
          console.log("Jogo salvo com sucesso!".yellow);
          this.navigateMenu(heroName);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  explore() {
    console.clear();
    printMap(this.map, this.playerPosition);
    console.log("Use as setas do teclado para mover o personagem.".yellow);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: true,
    });

    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);

    const handleKeyPress = (str, key) => {
      if (key.name === "up" && this.playerPosition.y > 0) {
        this.playerPosition.y--;
      } else if (
        key.name === "down" &&
        this.playerPosition.y < this.map.length - 1
      ) {
        this.playerPosition.y++;
      } else if (key.name === "left" && this.playerPosition.x > 0) {
        this.playerPosition.x--;
      } else if (
        key.name === "right" &&
        this.playerPosition.x < this.map[0].length - 1
      ) {
        this.playerPosition.x++;
      } else if (key.name === "escape") {
        process.stdin.setRawMode(false);
        process.stdin.pause();
        this.navigateMenu(this.player.name);
        return;
      }

      console.clear();
      printMap(this.map, this.playerPosition);
      this.encounterMonster(); // Verifica se o jogador encontrou um monstro
      console.log("Use as setas do teclado para mover o personagem.".yellow);
      console.log("Pressione 'esc' para voltar ao menu.".yellow);
    };

    process.stdin.on("keypress", handleKeyPress);
  }

  encounterMonster() {
    let name = "Skeleton";
    this.monster = new Monster(name);
    console.log(monster);
    this.monster.displayStats();
    // Chance de encontrar um monstro
    const chance = Math.random();
    if (chance < 0.2) {
      // 20% de chance
      console.log("Você encontrou um monstro!".red);
      // Aqui você pode adicionar lógica para a batalha com o monstro
      this.battle();
    }
  }

  battle() {
    console.log("Preparando para a batalha...".red);
    // Adicione a lógica de batalha aqui
    // Por exemplo, você pode perguntar ao jogador se ele deseja atacar, usar magia, etc.
    // Após a batalha, retorne ao menu ou continue a exploração
    this.navigateMenu(this.player.name);
  }
};
