function State(state){
  var oldState;
  //var currentState;
  var board;
  
  if(state !== null){
    oldState = state;
    board = state.board.slice(0);
  }
  
  function FindBlank(){
    var blank = board.find(function(cell){
      return cell.val == b;
    });
    return blank;
  }
  
  function FindCellIndex(brd, row, col){
    return brd.find(function(cell){
      return cell.row == row && cell.col == col;
    })
  }
  
  this.FindNewPossibleStates = function(){
    var blank = FindBlank();
    var limit = Math.sqrt(board.length) - 1;
    var possMoves = [];
    
    if(blank.row < limit){
      //move down
      possMoves.push({row: blank.row + 1, col: blank.col})
    }
    if(blank.col < limit){
      //move right
      possMoves.push({row: blank.row, col: blank.col + 1})
    }
    if(blank.row > 0){
      //move up
      possMoves.push({row: blank.row - 1, col: blank.col})
    }
    if(blank.col > 0){
      //move left
      possMoves.push({row: blank.row, col: blank.col - 1})
    }
    possMoves.map(function(move){
      var tempBoard = board.slice(0);
      var blankCell = FindBlank();
      var newCell = FindCell(tempBoard, move.row, move.col);
      var tempVal = newCell.val;
      newCell.val = blankCell.val;
      blankCell.val = tempVal;
      var s = new State();
      s.board = tempBoard;
      s.oldState = oldState;
      return s;
    });
    return possMoves;
  }
  
  
  
}