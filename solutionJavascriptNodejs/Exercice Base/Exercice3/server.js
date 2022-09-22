import {createInterface} from "readline/promises";

let readInterface = createInterface({
    input: process.stdin,
    output: process.stdout
});

let somme = 0;
let min = Number.MAX_VALUE;
let max = Number.MIN_VALUE;
let nbNombres = 0
let nombre;

do{
    nombre = await readInterface.question("Entrez un nombre: ");
    nombre = Number(nombre);

    if(nombre !== 0) {
        nbNombres++;
        somme += nombre;
        if(nombre > max){
            max = nombre;
        }
        if(nombre < min && nombre != 0){
            min = nombre;
        }
    }
} while(nombre !== 0);

console.log("Total: " + somme);
console.log("Minimum: " + min);
console.log("Maximum: " + max);
console.log("Moyenne: " + somme / nbNombres);

readInterface.close();
