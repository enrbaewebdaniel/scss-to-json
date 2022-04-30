const fs = require("fs");
const readLine = require("readline");

let lector = readLine.createInterface({
  input: fs.createReadStream("prueba.scss"),
});

let listOfVariables = [];

lector.on("line", (linea) => {
  if (linea != "") {
    const variable = linea.split(":");
    const variableName: string = variable[0]
      .slice(1)
      .replace(new RegExp("-", "g"), "")
      .trim();

    const variableValue: string = variable[1].replace(";", "").trim();

    const stringvar = `${variableName}:'${variableValue}'`;
    listOfVariables.push(stringvar);
  }
});

lector.on("close", () => {
  fs.writeFile(
    "output.json",
    "{" + listOfVariables.toString() + "}",
    "utf8",
    function (err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }
    }
  );
});
