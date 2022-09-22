import {createInterface} from "readline/promises";

let readInterface = createInterface({
    input: process.stdin,
    output: process.stdout
});

let total = 0;
let termine = false;
let facture = '';

for(let i = 1 ; !termine ; i++) {
    console.log('\nArticle ' + i + ': ');
    let nbArticle = Number(await readInterface.question("Nombre (0 pour terminer): "));
    if(nbArticle !== 0){
        let prix = Number(await readInterface.question("Prix: "));
        facture += 
            nbArticle.toString().padStart(4) + ' @ ' + 
            prix.toFixed(2).padStart(5) + '$ = ' + 
            (nbArticle * prix).toFixed(2).padStart(8) + '$\n';
        total += nbArticle * prix;
    }
    else {
        termine = true;
    }
}

let taux = await readInterface.question("\nTaux de taxation (13.5): ");
if(taux === '') {
    taux = 13.5;
}

let taxe = (taux / 100) * total;
let grandTotal = total + taxe;

facture += '   Sous-total = ' + total.toFixed(2).padStart(8) + '$\n';
facture += '        Taxes = ' + taxe.toFixed(2).padStart(8) + '$ (' + taux + '%)\n';
facture += '  Grand-total = ' + grandTotal.toFixed(2).padStart(8) + '$\n';

console.log('\nFature:\n' + facture);

readInterface.close();
