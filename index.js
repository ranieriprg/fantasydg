const express = require("express");
const app = express();

//controller
const GameController = require("./controllers/GameController");
const gameController = new GameController();

function navigateMenu(heroName) {
  prompt([
    {
      type: "list",
      name: "chosenOption",
      message: `Diga campeão, o que deseja fazer? ${heroName}`,
      choices: ["Explore", "Itens", "Status", "Save"],
    },
  ])
    .then((answers) => {
      const chosenOption = answers["chosenOption"];

      if (chosenOption === "Explore") {
        explore();
      } else if (chosenOption === "Itens") {
        console.log("inventário está vazio");
        navigateMenu(heroName);
        return;
      } else if (chosenOption === "Status") {
        hero.displayStats();

        navigateMenu(heroName);
      } else if (chosenOption === "Save") {
        console.log("inventário está vazio");
        navigateMenu(heroName);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function explore() {
  console.log("log explore retorno");
}

app.listen(5000, () => {
  gameController.startGame();
  // Chama a função startGame após o servidor iniciar
});
