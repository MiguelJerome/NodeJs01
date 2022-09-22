const drawingBoard = (function(){
    /** Différentes taille de pinceaux */
    const PEN_SIZES = { big: 32, medium: 16, small: 1 };

    /** Couleur de l'efface */
    const ERASER_COLOR = '#fff';

    /** Outil présentement utilisé */
    let currentTool = 'pen';

    /** Couleur présentement utilisé */
    let currentColor = '#000';

    /** Point de départ d'une ligne */
    let lineStart = null;

    /** Tableau de tous les radio buttons pour les outils */
    let tools = document.querySelectorAll('.tools input[name=tool]');

    /** Tableau de tous les radio buttons pour les tailles */
    let sizes = document.querySelectorAll('.sizes input[name=size]');
    
    /** Tableau de tous les radio buttons pour les couleurs */
    let colors = document.querySelectorAll('.colors input[name=color]');

    /** Canvas sur lequel l'utilisateur va dessiner */
    let canvas = document.getElementById('canvas');

    /** Contexte graphique du canvas pour nous permettre de dessiner */
    let context = canvas.getContext('2d');

    /** 
     * Trouve la position en X d'un point à l'écran dans le contexte graphique 
     * @param {Number} x Une position en X à l'écran sur le canvas.
     * @param {Number} [movementX] Un mouvement de la position en X à l'écran sur le canvas.
     */
    const getXContextCoord = function(x, movementX){
        // Retourne les dimensions et la position du canvas
        let canvasRect = canvas.getBoundingClientRect();

        // On trouve la position de la souris dans le canvas. La position 
        // retournée est celle à l'écran, donc on la soustrait à la position 
        // du canvas à l'écran.
        let canvasPosition = x - canvasRect.x;

        // Si on a spécifié un mouvement, on le soustrait pour avoir la 
        // position avant le mouvement
        if(movementX){
            canvasPosition -= movementX;
        }

        // On fait un produit croisé pour trouvé la position dans le contexte
        // graphique. C'est nécessaire si le canvas à l'écran a été 
        // redimensionné par le CSS, ce qui est fort probable
        let contextPosition = canvasPosition / canvasRect.width * canvas.width

        return contextPosition;
    }

        /** 
     * Trouve la position en Y d'un point à l'écran dans le contexte graphique 
     * @param {Number} y Une position en Y à l'écran sur le canvas.
     * @param {Number} [movementY] Un mouvement de la position en Y à l'écran sur le canvas.
     */
    const getYContextCoord = function(y, movementY){
        // Retourne les dimensions et la position du canvas
        let canvasRect = canvas.getBoundingClientRect();

        // On trouve la position de la souris dans le canvas. La position 
        // retournée est celle à l'écran, donc on la soustrait à la position 
        // du canvas à l'écran.
        let canvasPosition = y - canvasRect.y;

        // Si on a spécifié un mouvement, on le soustrait pour avoir la 
        // position avant le mouvement
        if(movementY){
            canvasPosition -= movementY;
        }

        // On fait un produit croisé pour trouvé la position dans le contexte
        // graphique. C'est nécessaire si le canvas à l'écran a été 
        // redimensionné par le CSS, ce qui est fort probable
        let contextPosition = canvasPosition / canvasRect.height * canvas.height

        return contextPosition;
    }

    // Configuration des options du contexte graphique par défaut
    context.lineWidth = PEN_SIZES['medium'];
    context.lineJoin = 'round';
    context.lineCap = 'round';

    // Évènement lorsqu'on presse le bouton de notre souris sur le canvas
    canvas.addEventListener('mousedown', function(event){
        // On s'assure que c'est bien le bouton gauche de la souris
        if(event.button === 0){
            if(currentTool === 'pen' || currentTool === 'eraser'){
                // Si notre outil est le pinceau ou l'efface, on dessine 
                // un cercle à l'emplacement du curseur
                context.beginPath();
                context.arc(
                    getXContextCoord(event.clientX), 
                    getYContextCoord(event.clientY), 
                    context.lineWidth / 2, 
                    0, 2 * Math.PI, false
                );
                context.fill();
            }
            else if(currentTool === 'line'){
                // Si notre outil est la ligne on garde la position du 
                // clic dans une variable
                lineStart = { 
                    x: getXContextCoord(event.clientX),
                    y: getYContextCoord(event.clientY),
                };
            }
        }
    });
    
    // Évènement lorsqu'on relache le bouton de notre souris sur le canvas
    canvas.addEventListener('mouseup', function(event){
        // On s'assure que c'est bien le bouton gauche de la souris
        if(event.button === 0){
            if(currentTool === 'line' && lineStart){
                // Si notre outil est la ligne on dessine la ligne entre le 
                // point où l'utilisateur a cliqué initialement et la position 
                // de la relache du bouton
                context.beginPath();
                context.moveTo(lineStart.x, lineStart.y);
                context.lineTo(
                    getXContextCoord(event.clientX), 
                    getYContextCoord(event.clientY), 
                );
                context.closePath();
                context.stroke();
            }
        }
    });
    
    // Évènement lorsque la souris quitte le canvas
    canvas.addEventListener('mouseout', function(event){
        // Si on était en train de faire une ligne, on l'annule
        if(lineStart){
            lineStart = null;
        }
    });
    
    // Évènement lorsque la souris bouge au dessus du canvas
    canvas.addEventListener('mousemove', function(event){
        // On s'assure que le bouton gauche de la souris est enfoncé
        if(event.buttons === 1){
            if(currentTool === 'pen' || currentTool === 'eraser'){
                // Si notre outil est le pinceau ou l'efface, on dessine 
                // une ligne entre la dernière position de la souris sur le 
                // canvas et la nouvelle
                context.beginPath();
                context.moveTo(
                    getXContextCoord(event.clientX, event.movementX), 
                    getYContextCoord(event.clientY, event.movementY), 
                );
                context.lineTo(
                    getXContextCoord(event.clientX), 
                    getYContextCoord(event.clientY), 
                );
                context.closePath();
                context.stroke();
            }
        }
    });

    // Évènement lorsque l'on change d'outil sur chacun des radio buttons
    for(let tool of tools){
        tool.addEventListener('change', function(){
            // On change l'outil
            currentTool = this.value;

            // On change la couleur dépendant de l'outil
            if(this.value === 'eraser'){
                context.strokeStyle = ERASER_COLOR;
                context.fillStyle = ERASER_COLOR;
            }
            else{
                context.strokeStyle = currentColor;
                context.fillStyle = currentColor;
            }
        });
    }

    // Évènement lorsque l'on change de taille sur chacun des radio buttons
    for(let size of sizes){
        size.addEventListener('change', function(){
            // On change la taille du trait dans le contexte graphique
            context.lineWidth = PEN_SIZES[this.value];
        });
    }
    
    // Évènement lorsque l'on change la couleur sur chacun des radio buttons
    for(let color of colors){
        color.addEventListener('change', function(){
            // On change la couleur
            currentColor = this.value;

            // Si notre outil n'est pas l'efface, on change la couleur du 
            // trait de notre contexte graphique
            if(currentTool !== 'eraser'){
                context.strokeStyle = this.value;
                context.fillStyle = this.value;
            }
        });
    }
})();
