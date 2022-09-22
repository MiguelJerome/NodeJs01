// Exercice 1 ici
const additionneur = function(nombre1, nombre2){
    let resultat = 0
    for(let i = nombre1 ; i <= nombre2 ; i++){
        resultat += i;
    }

    return resultat;
}

// Exercice 2 ici
const button = document.querySelector('.exercice2 input');
const div = document.querySelector('.exercice2 .switcher');
button.onclick = function(){
    if(div.style.backgroundColor === 'blue'){
        div.style.backgroundColor = 'red';
    }
    else{
        div.style.backgroundColor = 'blue';
    }
}

// Exercice 3 ici
const inverserPhrase = function(){
    let text = document.querySelector('.exercice3 textarea').value;
    return text.split(' ').reverse().join(' ');
}

// Exercice 4 ici
const ajouterTodo = function(){
    let text = document.querySelector('.exercice4 input[type=text]').value;
    let ul = document.querySelector('.exercice4 ul');
    let li = document.createElement('li');
    li.innerText = text;
    ul.appendChild(li);
}

// Exercice 5 ici
const enObjet = function(){
    return {
        nom: document.querySelector('.exercice5 .nom').value,
        developpeur: document.querySelector('.exercice5 .developpeur').value,
        plateforme: document.querySelector('.exercice5 .plateforme').value,
    }
}
