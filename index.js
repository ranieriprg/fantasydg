const express = require("express");
const inquirer = require("inquirer");

//models
const Warrior = require("./models/Warrior");
const Rogue = require("./models/Rogue");
const Mage = require("./models/Mage");

const ascii = require("./ASCII");

const prompt = inquirer.createPromptModule();
const app = express();

function startGame() {
  // asciiArt.js
  console.log(`
    ________ ________  ________   _________  ________  ________       ___    ___ ________  ________     
   |\\  _____\\   __  \\|\\   ___  \\|\\___   ___\\   __  \\|\\   ____\\     |\\  \\  /  /|\\   ___ \\|\\   ____\\    
   \\ \\  \\__/\\ \\  \\|\\  \\ \\  \\\\ \\  \\|___ \\  \\_\\ \\  \\|\\  \\ \\  \\___|_    \\ \\  \\/  / | \\  \\_\\ \\ \\  \\___|    
    \\ \\   __\\ \\ \\   __  \\ \\  \\\\ \\  \\   \\ \\  \\ \\ \\   __  \\ \\_____  \\    \\ \\    / / \\ \\  \\ \\ \\ \\  \\  ___  
     \\ \\  \\_|  \\ \\  \\ \\  \\ \\  \\\\ \\  \\   \\ \\  \\ \\ \\  \\ \\  \\|_____|  \\    \\/  /  /   \\ \\  \\_\\ \\ \\  \\|  \\ 
      \\ \\__\\    \\ \\__\\ \\__\\ \\__\\ \\__\\   \\ \\__\\ \\ \\__\\ \\__\\____\\_\\  \\ __/  / /      \\ \\_______\\ \\_______\\
       \\|__|     \\|__|\\|__|\\|__|\\|__|    \\|__|  \\|__|\\|__|\\_________\\|___/ /        \\|_______|\\|_______|
                                                     \\|_________\\|___|/                             
   `);

  prompt([
    {
      type: "input",
      name: "heroName",
      message: "Bem vindo ao final fantasy, qual o seu nome Héroi?",
    },
  ])
    .then((answers) => {
      const heroName = answers["heroName"];
      console.log(`O nome do seu herói é: ${heroName}`);
      createHero(heroName);
    })
    .catch((error) => {
      console.error("Erro ao obter o nome do herói:", error);
    });
}

function createHero(heroName) {
  let hero;
  prompt([
    {
      type: "list",
      name: "class",
      message: "Qual a sua classe?",
      choices: ["Warrior", "Mage", "Rogue"],
    },
  ])
    .then((answers) => {
      const chosenClass = answers["class"];
      if (chosenClass === "Warrior") {
        hero = new Warrior(heroName);
        console.log(ascii.warrior);
        hero.displayStats()
      } else if (chosenClass === "Mage") {
        hero = new Mage(heroName);
        console.log(ascii.mage);
        hero.displayStats();
      } else if (chosenClass === "Rogue") {
        hero = new Rogue(heroName);
        console.log(ascii.rogue);
        hero.displayStats();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

app.listen(5000, () => {
  // Chama a função startGame após o servidor iniciar
  startGame();
});
