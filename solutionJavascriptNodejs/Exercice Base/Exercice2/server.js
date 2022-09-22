import {createInterface} from "readline/promises";

let readInterface = createInterface({
    input: process.stdin,
    output: process.stdout
});

let nombre = await readInterface.question("Entrez un nombre: ");

let premier = true;

if (nombre > 1){
    for (let i = 2; i < nombre ; i++){
        if (nombre % i == 0){
            console.log (nombre + " n'est pas premier")
            premier = false;
            break;
        }
    }

    if (premier){
        console.log(nombre + " est premier");
    }
}
else{
    console.log(nombre + " n'est pas premier") 
}

readInterface.close();
