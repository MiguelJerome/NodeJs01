import {createInterface} from "readline/promises";
import {readFile} from "fs/promises";

let readInterface = createInterface({
    input: process.stdin,
    output: process.stdout
});

let data = await readFile("./password.txt");
let text = data.toString();

let listeCompte = text.split(" \r\n");
for(let i = 0 ; i < listeCompte.length ; i++){
    listeCompte[i] = listeCompte[i].split(":");
}

let acces = false;
console.log("Connexion: ");
do{
    let utilisateur = await readInterface.question("Nom d'utilisateur: ");
    let motDePasse = await readInterface.question("Mot de passe: ");
    
    for(let i = 0 ; i < listeCompte.length ; i++){
        if(listeCompte[i][0] === utilisateur && 
           listeCompte[i][1] === motDePasse) {
            console.log("Accès avec succès!");
            acces = true;
        }
    }

    if(!acces){
        console.log("Accès refusé. Veuillez réessayer.");
    }

} while(!acces);

readInterface.close();
