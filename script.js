const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");


let board = ["","","","","","","","",""];

let gameOver = false;

const user = "X";
const computer = "O";


const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];



// User Move
cells.forEach(cell=>{

    cell.addEventListener("click",()=>{

        let index = cell.dataset.index;


        if(board[index] !== "" || gameOver)
            return;


        makeMove(index,user);


        if(checkWinner(user)){
            statusText.innerHTML="🎉 You Win!";
            gameOver=true;
            return;
        }


        if(isDraw()){
            statusText.innerHTML="🤝 Draw!";
            gameOver=true;
            return;
        }


        statusText.innerHTML="Computer thinking...";


        setTimeout(computerMove,500);

    });

});



// Place symbol
function makeMove(index,player){

    board[index]=player;

    cells[index].textContent=player;

    cells[index].classList.add(player);

}



// Computer AI Move
function computerMove(){

    let empty=[];


    board.forEach((value,index)=>{

        if(value===""){
            empty.push(index);
        }

    });


    let randomMove =
        empty[Math.floor(Math.random()*empty.length)];


    makeMove(randomMove,computer);



    if(checkWinner(computer)){

        statusText.innerHTML="🤖 Computer Wins!";
        gameOver=true;
        return;

    }


    if(isDraw()){

        statusText.innerHTML="🤝 Draw!";
        gameOver=true;
        return;

    }


    statusText.innerHTML="Your turn (X)";

}



// Check Winner
function checkWinner(player){

    return winPatterns.some(pattern=>{

        return pattern.every(index=>{
            return board[index]===player;
        });

    });

}



// Draw check
function isDraw(){

    return board.every(cell=>cell!=="");

}



// Restart Game
restartBtn.addEventListener("click",()=>{

    board=["","","","","","","","",""];

    gameOver=false;

    statusText.innerHTML="Your turn (X)";


    cells.forEach(cell=>{

        cell.textContent="";

        cell.classList.remove("X","O");

    });

});