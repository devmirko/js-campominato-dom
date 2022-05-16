
// pulsante play e contatore partite
const playGame = document.getElementById("play");
playGame.addEventListener("click", inizioGame);
let contatore = 0;



// variabile griglia azzerata, e array di bombe
const grid = document.getElementById("grid");
let dimGrid = 0;
let bombsArray = [];

// punti
let points;
let winPoint;


//gestore che inizializza il gioco
function inizioGame() {
    //Variabili griglia e difficolta selettore
    const difficultyOption = document.getElementById("sezione_difficolta");  
    const difficulty = difficultyOption.value;

    //aggiunge la classe se e la prima partita
    if (contatore == 0) {
        grid.classList.add("start");
    }

     //Rimuove messaggio in basso di fine partita se presente
     const gameEndElement = document.getElementById("game_end");
     gameEndElement.classList.remove("show");
     gameEndElement.classList.add("hidden");
 
    
    points = 0;
    // funzione difficolta
    userDifficuly(difficulty);

    // toglie il blocco alla griglia se e presente
    grid.classList.remove("disattiva");
   

    contatore++;
    
}




//Gestore delle difficoltà
function userDifficuly(difficulty) {
    if (difficulty == 1) {
        dimGrid = 100;
        winPoint = 84
        gridGenerator( "facile"); //facile
    } else if (difficulty == 2) {
        dimGrid = 81;
        winPoint = 65;
        gridGenerator( "medio"); //Medio
    } else {
        dimGrid = 49;
        winPoint = 33;
        gridGenerator( "difficile"); //difficile
    }
}


function gridGenerator(choice) {

    //Svuota la griglia
    grid.innerHTML = "";

 
    //Genera array di bombe
    bombsArray = bombGen();

    for (let i = 1; i <= dimGrid ; i++) {
        //Genera Square
        let gridSquare = gridSquareGen(choice, i);

        //Aggiunge eventListener al click in base a se e una bomba o no
        if (checkBomb(i)) {
            gridSquare.addEventListener("click", addBombClass);
        } else {
            gridSquare.addEventListener("click", activeSquare);
        }

        //Aggiunge gridSquare alla griglia
        grid.append(gridSquare);
    }
}

// generatore di array di bombe

function bombGen() {

    let bombe = [];

    do {
        let newBombe = randomNumberGen(1, dimGrid);
        if (!checkBomb(newBombe)) {
            bombe.push(newBombe);

            
        }
        
    } while (bombe.length < 16);
        

    return bombe;
    
}

//Generatore di numeri random
function randomNumberGen(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// controlla se nel elemento e presente la bomba 
function checkBomb(value) {
    for (let i = 0; i < bombsArray.length; i++) {
        if (bombsArray[i] == value) {
            return true;
        }
    }
    return false;
}


//Generatore di square e numeri
function gridSquareGen(choice, i) {
    //Crea square
    let gridSquare = document.createElement("div");
    gridSquare.classList.add("grid_square" + i);
    gridSquare.classList.add(choice);

    //Inserisce numero 
    let gridSquareNum = document.createElement("div");
    gridSquareNum.classList.add("grid_number");
    gridSquareNum.innerHTML = i;
    gridSquare.append(gridSquareNum);

    return gridSquare;
}

//Aggiunge la classe "active" ad un elemento
    function activeSquare() {
     this.classList.add("active");
     //aggiungiamo un punto 
     points++;
     // se i punti sono uguali a i punti minimi per vincere 
     if (points == winPoint) {
        endGame("win");
    }
    console.log(points);
    //rimuove l'evento per bloccare il conteggio dei punti
    this.removeEventListener("click", activeSquare);
 } 

//  aggiungiamo la classe bomba 
function addBombClass() {
    this.classList.add("bomba");
    endGame("lose"); 

    //Rimuove l'EventListener
    this.removeEventListener("click", addBombClass);
}
// funzione di fine gioco

function endGame(risultato) {
    //classe che blocca il click
    grid.classList.add("disattiva");

    //Mostra il div nel footer game-end
    const gameEndElement = document.getElementById("game_end");
    gameEndElement.classList.remove("hidden");
    gameEndElement.classList.add("show");

    //Stampa il numero della partita
    document.getElementById("num_match").innerHTML = "Partita " + contatore + ": ";

    //Gestisce il risultato
    let risultatoContainer = document.getElementById("risultato_match");
    risultatoRivelazione(risultatoContainer, risultato);

    //Stampa il totale dei punti
    document.getElementById("total_point").innerHTML = "Hai fatto: " + points + " punti.";

     //Rivela le bombe
     rivela()

    
}
// funzione che stampa il risultato

function risultatoRivelazione(risultatoContainer, risultato) {
    if (risultato == "win") {
        risultatoContainer.innerHTML = "Hai vinto la Partita";
    } else {
        risultatoContainer.innerHTML = "Hai perso la partita";
    }
}

// funzione che rileva le bombe sulla tabella 

function rivela() {
    for (let i = 1; i <= dimGrid; i++) {
        let discover = document.querySelector(".grid_square" + i);

        if (checkBomb(i)) {
            if (discover.classList.contains("bomba")) {
                continue;
            }

            discover.classList.add("inesplorata");
        }
    }
}








