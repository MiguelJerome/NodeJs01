import {createInterface} from "readline/promises";

let readInterface = createInterface({
    input: process.stdin,
    output: process.stdout
});

let match;

do{
    let passwordOriginal = await readInterface.question("Entrez votre mot de passe: ");
    let passwordCheck = await readInterface.question("Entrez votre mot de passe de nouveau: ")

    match = true;
    if(passwordOriginal !== passwordCheck){
        match = false;
        console.log('Mot de passe mal confirmé. Essayez de nouveau.')
    }
} while(!match);

console.log("Mot de passe bien confirmé.");

readInterface.close();