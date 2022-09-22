import {createInterface} from "readline/promises";

let readInterface = createInterface({
    input: process.stdin,
    output: process.stdout
});

let phrase = await readInterface.question("Chaîne saisie: ");
console.log("Longeur de la chaîne: " + phrase.length);

phrase = phrase.normalize('NFD').replace(/\u0300-\u036f/g, '');
phrase = phrase.toUpperCase();

let distribution = new Array(26).fill(0);
let compteChar = 0;
for (let i = 0 ; i < phrase.length ; i++) {
    if(phrase[i] >= 'A' && phrase[i] <= 'Z'){
        distribution[phrase.charCodeAt(i) - 'A'.charCodeAt(0)]++;
        compteChar++;
    }
}

console.log("Nombre de caractères alphabétique: " + compteChar);

let table = '';
for(let i = 0 ; i < distribution.length ; i++) {
    table += 
        String.fromCharCode(i + 'a'.charCodeAt(0)).toUpperCase() + ':' + 
        distribution[i].toString().padStart(3) + '/' + compteChar + ' = ' + 
        (distribution[i] / compteChar * 100).toFixed(1).padStart(5) + '%    ';

    if((i + 1) % 4 === 0) {
        table += '\n';
    }
}

console.log(table);

readInterface.close();
