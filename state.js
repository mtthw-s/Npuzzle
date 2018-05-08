function State(state){
  var self = this;
  var oldState;
  //var currentState;
  self.board = [];
  //board = [{val:1, row:0, col:0}];
  self.score = 0;
  
  if(typeof state != 'undefined'){
    oldState = state;
    board = JSON.parse(JSON.stringify(state.board));//state.board.slice(0);
  }
  
  self.setBoard = function(b){
    self.board = b;
  }

  self.getBoard = function(){
    return board;
  }

  function FindBlank(b){
    var blank;
    if(typeof b != 'undefined'){
      blank = b.find(function(cell){
        return cell.val == "b";
      });
    }
    else{
      blank = self.board.find(function(cell){
        return cell.val == "b";
      });
    }
    return blank;
  }
  
  function FindCell(brd, row, col){
    return brd.find(function(cell){
      return cell.row == row && cell.col == col;
    })
  }

  self.CalculateAndSetScore = function(goal){
    var count = 0;
    var flatState = self.GetflatBoard();
    for(var i = 0; i < goal.length; i++){
      if(flatState[i] == goal[i]){
        count++;
      }
    }
    self.score = count;
  }

  self.CalculateScore2 = function(goal){
    var score = 0;
    for(var i = 0; i < self.board.length; i++){
      var pos = goal.indexOf(self.board[i].val);
      if(i != pos && pos > -1){
        score += Math.abs(parseInt(self.board[i].row) - parseInt(self.board[pos].row));
        score += Math.abs(parseInt(self.board[i].col) - parseInt(self.board[pos].col));
      }
    }
    return score;
  }

  self.CalculateScore = function(goal, curr){
    var count = 0;
    //var flatState = self.GetflatBoard();
    for(var i = 0; i < goal.length; i++){
      if(curr[i] == goal[i]){
        count++;
      }
    }
    return count;
  }

  self.GetflatBoard = function(){
    //var b = self.board.slice(0);
    var b = [];
    for(var i = 0; i < self.board.length; i++){
      b.push(self.board[i].val);
    }
    // b.map(function(ele){
    //   return ele = ele.val;
    // });
    return b;
  }
  
  self.FindNewPossibleStates = function(){
    var blank = FindBlank();
    var limit = Math.sqrt(self.board.length) - 1;
    var possMoves = [];
    
    if(blank.row < limit){
      //move down
      possMoves.push({row: parseInt(blank.row) + 1, col: blank.col});
    }
    if(blank.col < limit){
      //move right
      possMoves.push({row: blank.row, col: parseInt(blank.col) + 1});
    }
    if(blank.row > 0){
      //move up
      possMoves.push({row: parseInt(blank.row) - 1, col: blank.col});
    }
    if(blank.col > 0){
      //move left
      possMoves.push({row: blank.row, col: parseInt(blank.col) - 1});
    }
    var boards = [];
    for(var i = 0; i < possMoves.length; i++){
      var tempBoard = JSON.parse(JSON.stringify(self.board));//Object.assign([], board);//board.slice(0);
      var blankCell = FindBlank(tempBoard);
      var newCell = FindCell(tempBoard, possMoves[i].row, possMoves[i].col);
      var tempVal = newCell.val;
      newCell.val = blankCell.val;
      blankCell.val = tempVal;
      var s = new State();
      //s.board = tempBoard;
      boards.push(JSON.parse(JSON.stringify(tempBoard)));
      //s.board = tempBoard;
      //s.oldState = oldState;
      //possMoves[i] = s;
    }
    // possMoves.map(function(move){
    //   var tempBoard = board.slice(0);
    //   var blankCell = FindBlank();
    //   var newCell = FindCell(tempBoard, move.row, move.col);
    //   var tempVal = newCell.val;
    //   newCell.val = blankCell.val;
    //   blankCell.val = tempVal;
    //   var s = new State();
    //   s.board = tempBoard;
    //   s.oldState = oldState;
    //   return s;
    // });
    //for(var i = 0; i < possMoves.length; i++){
      //console.log(possMoves[i].GetflatBoard());
    //}
//    return possMoves;
    return boards;
  }
  
  
  
}