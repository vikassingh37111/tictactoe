/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/

const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';

// Helper method - gives player Name from ids playerId Number (1 or 2 in this case)
function getPlayerName(playerId){
    return ["", "Human (X)" , "Computer (O)"][playerId];
}

// Prints the final result
function printResult(text){
    const resultContainer = document.getElementById("result");
    resultContainer.innerHTML = text;
}

// Checks if any of the rows is completely filled by any of the players
function checkAnyRowFull(){
    for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
        let rowFull = true;
        let winner = grid[0][rowidx];

        if (winner == 0){
            rowFull = false;
        }
        else{    
            for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
                if(grid[colIdx][rowidx] != winner){
                    rowFull = false;
                    break;
                }
            }
        }

        if(rowFull){
            printResult("Game Over! \n Winner: " + getPlayerName(winner) + "\nColumn Full: " + (rowidx+1).toString());
            return true;
        }
    }
}

// Checks if any of the columns is completely filled by any of the players
function checkAnyColumnFull(){
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        let columnFull = true;
        let winner = grid[colIdx][0];

        if (winner == 0){
            columnFull = false;
        }
        else{
            for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
                if(grid[colIdx][rowidx] != winner){
                    columnFull = false;
                    break;
                }
            }
        }

        if(columnFull){
            printResult("Game Over! \n Winner: " + getPlayerName(winner) + "\nRow Full: " + (colIdx+1).toString());
            return true;
        }
    }
}

// Checks if the back diagonal is completely filled by any of the players
function checkBackDiagonalFull(){
    let backDiagonalFull = true;
    let winner = grid[GRID_LENGTH-1][GRID_LENGTH-1];

    if (winner == 0){
        backDiagonalFull = false;
    }
    else{
        for(let i=GRID_LENGTH-1; i>=0; i--){
            if(grid[i][i] != winner){
                backDiagonalFull = false;
                break;
            }
        }
    }

    if(backDiagonalFull){
        printResult("Game Over! \n Winner: " + getPlayerName(winner) + "\nBack Diagonal Full");
        return true;
    }
}

// Checks if the front diagonal is completely filled by any of the players
function checkForwardDiagonalFull(){
    let forwardDiagonalFull = true;
    let winner = grid[0][0];

    if (winner == 0){
        forwardDiagonalFull = false;
    }
    else{
        for(let i=0; i<GRID_LENGTH; i++){
            if(grid[i][i] != winner){
                forwardDiagonalFull = false;
                break;
            }
        }
    }

    if(forwardDiagonalFull){
        printResult("Game Over! \n Winner: " + getPlayerName(winner) + "\nForward Diagonal Full");
        return true;
    }
}

// Checks if all boxes are filled and no-one yet won
function checkDraw(){
     for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            if(grid[colIdx][rowidx] == 0){
                return false;
            }
        }
    }

    printResult("Its a draw!");
    return true;
}

// Checks all the winning conditions and finally checks the draw condition
function checkGameOver(){
    if(checkAnyColumnFull())
        return true;
    else if(checkAnyRowFull())
        return true;
    else if(checkBackDiagonalFull())
        return true;
    else if(checkForwardDiagonalFull())
        return true;
    else if(checkDraw())
        return true;
    else
        return false;
}

// A very basic level computer player which just fills the first empty box
// TODO: We can write an algorithm that will calculate all the possible comibinations and will never lose
function amateurLevelComputerMove(){
     for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            if(grid[colIdx][rowidx] == 0){
                grid[colIdx][rowidx] = 2;
                return;
            }
        }
    }
}

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    let newValue = 1;

    // Added this condition so already filled boxes cant be changed
    if(grid[colIdx][rowIdx] != 0){
        return;
    }

    grid[colIdx][rowIdx] = newValue;
    renderMainGrid();
    // Check if Game Over after the player moves
    // BUGFIX 1- Also return this function so it doesnt execute further computer moves
    if(checkGameOver()){
        return;
    }

    //Computer moves    
    amateurLevelComputerMove();

    renderMainGrid();
    // Check Again if Game Over after the computer moves
    // Also if game is over then disable all the box clicks
    if(!checkGameOver()){
        addClickHandlers();
    }
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

function reInitializeGrid(){
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            grid[colIdx][rowidx] = 0;
        }
    }
    turn = 'X';
}

function playAgain(){
    reInitializeGrid();
    renderMainGrid();
    addClickHandlers();
    printResult('');

}

initializeGrid();
renderMainGrid();
addClickHandlers();
