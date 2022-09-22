import {createInterface} from "readline/promises";
import {writeFile} from "fs/promises";

let readInterface = createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Écrivez dans la console.\nEntrez le code \":q\" pour fermer.");

let fermeture = false;
let texte = "";
do{
    let ligne = await readInterface.question("");

    if(ligne.includes(":q")==true){
        texte += ligne.substring(0, ligne.indexOf(':q'));
        fermeture = true;
    }
    else {
        texte += ligne;
    }
} while(!fermeture);

await writeFile('fichier.txt', texte);

readInterface.close();
