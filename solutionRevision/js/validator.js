/*
    Programmeur: Jonathan Wilkie
*/
// ===========================================================================
// Fonctions utilitaires
// ===========================================================================
// Change l'affichage du validateur si l'exercice est réussi
const switchValidator = function(validator){
    validator.children[0].innerText = 'done';
    validator.classList.add('done');
}

// Retourne la valeur d'une propriété de style d'un élément HTML
const getStyle = function(element, property){
    return window.getComputedStyle(element).getPropertyValue(property);
}

// Boucle au travers des validateurs d'exercices pour voir s'ils sont réussi
const checkExercise = function(jsValidators){
    const NB_EXERCICE = Object.keys(jsValidators).length;
    for(let i = 1 ; i <= NB_EXERCICE ; i++){
        let exercice = document.querySelector(`#exercice${ i } .exercise`);
        let validator = document.querySelector(`#exercice${ i } .validator`);
        if(jsValidators[`exercice${ i }`](exercice)){
            switchValidator(validator);
        }
    }
}

// Comparer des objets sans profondeur
const objectEquals = function(obj1, obj2){
    const keys = Object.keys(obj1);
    if(keys.length != Object.keys(obj2).length){
        return false;
    }

    for(let key of keys){
        if(obj1[key] !== obj2[key]){
            return false;
        }
    }

    return true;
}

// ===========================================================================
// Validation du Javascript
// ===========================================================================
const js = {
    exercice1: function(exercice){
        if(typeof additionneur === 'undefined'){
            return false;
        }

        let submit = exercice.querySelector('input[type=submit]');
        let nombre1 = exercice.querySelector('.nombre1');
        let nombre2 = exercice.querySelector('.nombre2');
        let span = exercice.querySelector('.reponse');
        submit.onclick = function(){
            span.innerText = additionneur(
                parseInt(nombre1.value), 
                parseInt(nombre2.value)
            );
        }

        return additionneur(5, 8) === 26 && additionneur(9, 20) === 174;
    },

    exercice2: function(exercice){
        let button = exercice.querySelector('input[type=button]');
        let div = exercice.querySelector('.switcher');
        const color1 = getStyle(div, 'background-color');
        button.click();
        const color2 = getStyle(div, 'background-color');
        button.click();
        const color3 = getStyle(div, 'background-color');
        button.click();
        const color4 = getStyle(div, 'background-color');
        button.click();

        return color1 !== color2 && color1 === color3 && color2 === color4;
    },

    exercice3: function(exercice){
        let textarea = exercice.querySelector('textarea');
        if(typeof inverserPhrase === 'undefined'){
            textarea.value = "Bonjour, je m'appelle Jonathan";
            return false;
        }

        let submit = exercice.querySelector('input[type=submit]');
        let span = exercice.querySelector('.reponse');
        submit.onclick = function(){
            span.innerText = inverserPhrase();
        }

        let valid = true;
        textarea.value = "Bonjour à tous";
        valid = valid && (inverserPhrase() === "tous à Bonjour");
        textarea.value = "Une pomme est un fruit";
        valid = valid && (inverserPhrase() === "fruit un est pomme Une");
        textarea.value = "Bonjour, je m'appelle Jonathan";
        return valid
    },

    exercice4: function(exercice){
        if(typeof ajouterTodo === 'undefined'){
            return false;
        }

        let submit = exercice.querySelector('input[type=submit]');
        let input = exercice.querySelector('input[type=text]');
        let ul = exercice.querySelector('ul');
        submit.onclick = ajouterTodo;

        let valid = true;
        input.value = "Installer les logiciels";
        submit.click();
        valid = valid && (
            ul.children.length === 3 && 
            ul.lastElementChild.tagName === 'LI' &&
            ul.lastElementChild.innerText === "Installer les logiciels"
        );
        input.value = "Party!";
        submit.click();
        valid = valid && (
            ul.children.length === 4 && 
            ul.lastElementChild.tagName === 'LI' &&
            ul.lastElementChild.innerText === "Party!"
        );
        input.value = "";
        return valid;
    },

    exercice5: function(exercice){
        if(typeof enObjet === 'undefined'){
            return false;
        }

        let submit = exercice.querySelector('input[type=submit]');
        let input1 = exercice.querySelector('input.nom');
        let input2 = exercice.querySelector('input.developpeur');
        let input3 = exercice.querySelector('input.plateforme');
        let table = exercice.querySelector('table');
        submit.onclick = function(){
            const jeu = enObjet();
            const props = ['nom', 'developpeur', 'plateforme'];
            let tr = document.createElement('tr');
            for(let prop of props){
                let td = document.createElement('td');
                td.innerText = jeu[prop];
                tr.appendChild(td);
            }

            table.appendChild(tr);
        };

        let valid = true;
        input1.value = 'Final Fantasy VII Remake';
        input2.value = 'Square Enix';
        input3.value = 'PlayStation 4';
        valid = valid && objectEquals(enObjet(), { 
            nom: 'Final Fantasy VII Remake', 
            developpeur: 'Square Enix',
            plateforme: 'PlayStation 4'
        });
        input1.value = 'The Witcher 3: Wild Hunt';
        input2.value = 'CD Projeckt';
        input3.value = 'PC';
        valid = valid && objectEquals(enObjet(), { 
            nom: 'The Witcher 3: Wild Hunt', 
            developpeur: 'CD Projeckt',
            plateforme: 'PC'
        });
        input1.value = '';
        input2.value = '';
        input3.value = '';
        return valid;
    }
}

// ===========================================================================
// Validation des exercices
// ===========================================================================
checkExercise(js);
