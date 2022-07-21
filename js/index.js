'use strict'

$(document).ready(function(){

    const rows = 9;
    const columns = 9;
    const nbBombes = 10;
    var board = Array();
    var bombsList = Array();
    var boardID = Array(); //tableau d'id 

    //Génération des coordonnées des bombes 
    function setBombsCoordinates(){

        var tab = [];
        var a, b;
        for(let i = 0; i < nbBombes; i++){
            a = Math.floor(Math.random() * rows);
            b = Math.floor(Math.random() * rows);
            tab.push([a,b]);
        }
        console.log(tab);
        return tab;
    }
    
    
    //Generation du plateau de jeu
    function setBoard(){
        for (let i = 0; i < rows; i++){
            board[i] = Array();
            for(let j = 0; j < columns; j++){
                board[i][j] = 0;
            }
        }
    }
    
    //Generation des cases des numéros 
    function setBombs(){//Placement des bombes sur le plateau 
    bombsList = setBombsCoordinates();
    bombsList.forEach(function(couple){
        board[couple[0]][couple[1]] = 9;
    })
}
    
    function calculBombs(){
        var cpt = 0;
        for(let i = 0; i < rows; i++){
            for(let j = 0; j < columns; j++){
                cpt = 0;
                if(!board[i][j]){
                    //test pour les 3 cases en haut de la cellule (i,j)
                    if (i-1 < rows && i-1 >= 0){
                        if (j-1 < columns && j-1 >= 0 && board[i-1][j-1] == 9)
                        cpt++;
                        if (j < columns && j >= 0 && board[i-1][j] == 9)
                        cpt++;
                        if (j+1 < columns && j+1 >= 0 && board[i-1][j+1] == 9)
                        cpt++;
                    }
                    
                    //test pour les cases à gauche et à droite de la cellule (i,j)
                    if (j-1 < columns && j-1 >= 0 && board[i][j-1] == 9)
                    cpt++;
                    
                    if (j+1 < columns && j+1 >= 0 && board[i][j+1] == 9)
                    cpt++;
                    
                    //test pour les 3 cases en bas de la cellule (i,j)
                    if (i+1 < rows && i+1 >= 0){
                        if (j-1 < columns && j-1 >= 0 && board[i+1][j-1] == 9)
                        cpt++;
                        if (j < columns && j >= 0 && board[i+1][j] == 9)
                        cpt++;
                        if (j+1 < columns && j+1 >= 0 && board[i+1][j+1] == 9)
                        cpt++;
                    }
                    
                    board[i][j] = cpt;
                }
                
                //ajout de l'elément dans le tableau 
                boardID.push(board[i][j]);
            }
        }
        
    }
    
    // console.log(board);
    // console.log(boardID);
    
    function generateBoard(){
        setBombsCoordinates();
        setBoard();
        setBombs();
        calculBombs();
        var n = 0;
        for(let i = 0; i < rows; i++){
            for(let j = 0; j < columns; j++){
                var line = document.createElement("div");
                line.setAttribute("id", n++);
                line.classList.add("cell");
                $("#board").append(line);
            }
        }

        var reset = document.createElement("button");
            reset.setAttribute("id", "reset");
            reset.innerText = "Recommencer ";
            $("#buttons-container").append(reset);

    }

    
    generateBoard();

    var cptClick = 0;
    $(".cell").click(function(){
        cptClick++;
        var index = this.id;
        console.log(index);
        if (boardID[index] == 9){
            $(this).html('<i class="fa-solid fa-burst"></i>');
            $(this).addClass("bombe");
            alert("Perdu !");
            
        }else{
            $(this).text(boardID[index]);
            $(this).addClass("show");
        }

        if (cptClick == rows*columns-nbBombes){ // 
            alert("vous avez gagné !");
        }

    });
    
    
    $("#reset").click(function(){
        location.reload();
    })

})