var fs = require("fs");
var readLine = require("readline");
var lector = readLine.createInterface({
    input: fs.createReadStream("prueba.scss")
});
var listOfVariables = [];
lector.on("line", function (linea) {
    if (linea != "") {
        var variable = linea.split(":");
        var variableName = variable[0]
            .slice(1)
            .replace(new RegExp("-", "g"), "")
            .trim();
        var variableValue = variable[1].replace(";", "").trim();
        var stringvar = "".concat(variableName, ":'").concat(variableValue, "'");
        listOfVariables.push(stringvar);
    }
});
lector.on("close", function () {
    fs.writeFile("output.json", "{" + listOfVariables.toString() + "}", "utf8", function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
    });
});
