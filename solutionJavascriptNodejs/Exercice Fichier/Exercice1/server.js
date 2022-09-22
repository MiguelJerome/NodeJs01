import {createInterface} from "readline/promises";
import {readFile} from "fs/promises";

let readInterface = createInterface({
    input: process.stdin,
    output: process.stdout 
});

let path = await readInterface.question("Entrez le chemin vers un fichier:\n");
let data = await readFile(path);

console.log("\nContenu du fichier en hexadécimal: ");
console.log(data);

console.log("\nContenu du fichier en texte: ");
console.log(data.toString());

readInterface.close();
