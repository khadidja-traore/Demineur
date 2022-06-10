'use strict'

$(document).ready(function(){

    const rows = 9;
    const columns = 9;
    const nbBombes = 10;
    var board = Array();
    var boardID = Array();

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
    setBombsCoordinates();

    //Generation des cases des numéros 

    //Generation du plateau de jeu
    
    for (let i = 0; i < rows; i++){
        board[i] = Array();
        for(let j = 0; j < columns; j++){
            board[i][j] = 0;
        }
    }

    //Placement des bombes sur le plateau 
    var bombsList = setBombsCoordinates();
    bombsList.forEach(function(couple){
        board[couple[0]][couple[1]] = 9;
    })

    console.log(bombsList);
    console.log(board);
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

    calculBombs();
    console.log(board);

    function generateBoard(){
        var n = 0;
        for(let i = 0; i < rows; i++){
            for(let j = 0; j < columns; j++){
                var line = document.createElement("div");
                line.setAttribute("id", n++);
                line.classList.add("cell");
                // line.innerText =  "C";
                $("#board").append(line);
            }
        }
    }

    generateBoard();

    var cptClick = 0;
    $(".cell").click(function(){
        cptClick++;
        var index = this.id;
        console.log(index);
        if (boardID[index] == 9){
            $(this).text('Bombe !');
            $(this).addClass("bombe");
            
        }else{
            $(this).text(boardID[index]);
            $(this).addClass("show");
        }

        if (cptClick == rows*columns-nbBombes){ // 
            alert("vous avez gagné !")
        }
    });


    









});