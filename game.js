var boardArray = [[],[],[], [], [], [], [], [], [], []];
var counter = 1;
var emptyBoard = true;
var prevPosition = [];
var rowIndex = 0;
var colIndex = 0;
var rowIndexOld = 0;
var colIndexOld = 0;
var highScore = 0;

// Fill in the box with the respective number (counter) if all rules are followed
function boxWasClicked(box)
{
  rowIndex = box.parentElement.rowIndex;
  colIndex = box.cellIndex;

  if (emptyBoard){
    newNumber(box, rowIndex, colIndex);
    emptyBoard = false;
  }
  else if (boardArray[rowIndex][colIndex]){
    alert("Sorry! This box is taken.");
  }
  else {
    checkRules(box);
  }
  document.getElementById("counter").innerHTML = "Next number: " + counter;
  rowIndexOld = box.parentElement.rowIndex;
  colIndexOld = box.cellIndex;

  // Check if user completed the entire table (which is rare)
  if (counter == 100){
    highScore = 100;
    alert("Jackpot!! You won :)");
  }
}

function checkRules(box){
  // Checking vertical gap (skip two boxes)
  if (rowIndex == prevPosition[0] - 3 || rowIndex == prevPosition[0] + 3){
    newNumber(box, rowIndex, colIndex);
  }
  // Checking horizontal gap (skip two boxes)
  else if (colIndex == prevPosition[1] - 3 || colIndex == prevPosition[1] + 3){
    newNumber(box, rowIndex, colIndex);
  }
  // Checking for diagonal gap (skip one box)
  else if (rowIndex == prevPosition[0] - 2 && colIndex == prevPosition[1] + 2 ||
    rowIndex == prevPosition[0] - 2 && colIndex == prevPosition[1] - 2 ||
    rowIndex == prevPosition[0] + 2 && colIndex == prevPosition[1] + 2 ||
    rowIndex == prevPosition[0] + 2 && colIndex == prevPosition[1] - 2 ){
    newNumber(box, rowIndex, colIndex)
  }
  else{
    alert("Breaking rule");
  }
}

// Add the appropriate number to the table and boardArray
function newNumber(box, r, c){
  var textNode = document.createTextNode(counter);
  box.appendChild(textNode);
  boardArray[r][c] = counter;
  counter++;
  prevPosition = [r, c];
}

function reset(){
  // Update the high score if applicable
  if (counter > highScore){
    highScore = counter;
    document.getElementById("high").innerHTML = "High score: " + highScore;
  }
  // Empty the array
  boardArray = [[],[],[], [], [], [], [], [], [], []];
  // Empty the table
  $("td").text("");
  // Reset all of the values
  counter = 1;
  emptyBoard = true;
  prevPosition = [];
  rowIndex = 0;
  colIndex = 0;
  rowIndexOld = 0;
  colIndexOld = 0;
  document.getElementById("counter").innerHTML = "Next number: ";
}
