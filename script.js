"use strict"

var currentPlayer = "X";  
var players = {};         
var board = Array(9).fill(null); //array zerado inicialmente
var count = 0;    
var gameOver = false;

function validateForm(){
    var player1 = document.forms["myForm"]["player1"].value;
    var player2 = document.forms["myForm"]["player2"].value;

    if(player1 == "" || player1 == null || player2 == "" || player2 == null){
        alert("Os nomes devem ser inserido!!!");
        return false;
    }

    else {
        var hide = document.getElementById("forms-name");
        var show = document.getElementById("game");
        players = {"X": player1, "O": player2};
        var sort = Math.random();
        if(sort < 0.5) {
            currentPlayer = "X";
        }
        else {
            currentPlayer = "O";
        }

        hide.style.display = "none";
        show.style.display = "grid";

        document.getElementById("player-names").innerHTML = players[currentPlayer] + " é a sua vez de começar (" +currentPlayer+")!!";

         for(var i=0; i<9; i++){
            var box = document.createElement("div");
            box.classList.add("box");
            box.dataset.index = i;
            box.addEventListener("click", gameMove);
            show.appendChild(box);
        }
        
        return false;
    }
}

function gameMove(e) { //e - event (click)
    var box = e.currentTarget;
    var index = box.dataset.index;
    var buttonReload = document.getElementById("finish");
    var endGame = document.getElementById("end");
    var img = document.createElement("img");

    if(gameOver) {
        return;
    }
    
    if(board[index] != null) { //checagem da casa ja ocupada
        alert("Você não pode jogar em uma casa já ocupada!");
        return;
    }

    board[index] = currentPlayer;

    if(currentPlayer == "X") {
        img.src = "img/x.png";
    }
    else {
        img.src = "img/o.png";
    }

    img.alt = currentPlayer;
    img.classList.add("img-game");

    while(box.firstChild) {
        box.removeChild(box.firstChild)
    }
    box.appendChild(img);
    count++;

    if(checkWinner(currentPlayer)) {
        document.getElementById("end").innerHTML = players[currentPlayer] + "  ganhou a partida!!";
        gameOver = true;
        buttonReload.style.display = "block";
        endGame.style.display = "block";
        return;
    }

    //checagem de empate
    if(count == 9) {
        document.getElementById("end").innerHTML = "Deu velha!!";
        buttonReload.style.display = "block";
        endGame.style.display = "block";
        return;
    }


    //troca de jogador
    if(currentPlayer == "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    document.getElementById("player-names").innerHTML = "Agora é a vez de: " + players[currentPlayer] + "(" + currentPlayer+")!!";
}

function checkWinner(player) {
    if(board[0] == player && board[1] == player && board[2] == player) {
        return true;
    } //linha 0

    if(board[3] == player && board[4] == player && board[5] == player) {
        return true;
    } //linha 1

    if(board[6] == player && board[7] == player && board[8] == player) {
        return true;
    } //linha 2

    if(board[0] == player && board[3] == player && board[6] == player) {
        return true;
    }//coluna 0

    if(board[1] == player && board[4] == player && board[7] == player) {
        return true;
    }//coluna 1

    if(board[2] == player && board[5] == player && board[8] == player) {
        return true;
    }//coluna 2

    if(board[0] == player && board[4] == player && board[8] == player) {
        return true;
    }//diagonal 

    if(board[2] == player && board[4] == player && board[6] == player) {
        return true;
    }//diagonal 

    return false;
}

document.getElementById("finish").addEventListener("click", function() {
    location.reload();
});