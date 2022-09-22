import {createInterface} from "readline/promises";

let readInterface = createInterface({
    input: process.stdin,
    output: process.stdout
});

let phrase = await readInterface.question("Entrez une phrase: \n");
let motSecret = await readInterface.question("Entrez un mot secret: ");

let regex = new RegExp(motSecret, "ig");
let etoiles = "*".repeat(motSecret.length);
let nbMatch = (phrase.match(regex) || []).length;

phrase = phrase.replace(regex, etoiles);

console.log("\n" + phrase);
console.log("Le mot \"" + motSecret + "\" a été remplacé " + nbMatch + " fois");

readInterface.close();
