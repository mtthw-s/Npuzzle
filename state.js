function State(state){
  var self = this;
  self.parentState = null;
  self.board = [];
  self.Id;
  self.ParentId;
  self.score = 0;
  
  if(typeof state != 'undefined'){
    self.parentState = state;
    //board = JSON.parse(JSON.stringify(state.board));
    self.ParentId = state.Id;
  }
  self.Id = GetId();
  
  self.setBoard = function(b){
    self.board = b;
  }

  self.getBoard = function(){
    return board;
  }

  function GetId() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
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
    var lin = 0;
    for(var i = 0; i < self.board.length; i++){
      var pos = goal.indexOf(self.board[i].val);
      if(i != pos && pos > -1 && self.board[i].val != "b"){
        score += Math.abs(parseInt(self.board[i].row) - parseInt(self.board[pos].row));
        score += Math.abs(parseInt(self.board[i].col) - parseInt(self.board[pos].col));
        if((parseInt(self.board[pos].col) == parseInt(self.board[i].col)) || (parseInt(self.board[pos].row) == parseInt(self.board[i].row)) && self.board[pos].val != "b"){
          lin++;
        }
      }
    }
    score += lin * 2;
    return score;
  }

  self.CalculateScore = function(goal, curr){
    var count = 0;
    for(var i = 0; i < goal.length; i++){
      if(curr[i] == goal[i]){
        count++;
      }
    }
    return count;
  }

  self.GetflatBoard = function(){
    var b = [];
    for(var i = 0; i < self.board.length; i++){
      b.push(self.board[i].val);
    }
    return b;
  }

  self.GetFlatString = function(){
    self.GetflatBoard().toString();
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
      var tempBoard = JSON.parse(JSON.stringify(self.board));
      var blankCell = FindBlank(tempBoard);
      var newCell = FindCell(tempBoard, possMoves[i].row, possMoves[i].col);
      var tempVal = newCell.val;
      newCell.val = blankCell.val;
      blankCell.val = tempVal;
      //var s = new State(self);
      //s.board = JSON.parse(JSON.stringify(tempBoard));
      boards.push(JSON.parse(JSON.stringify(tempBoard)));

    }
    return boards;
  }

  self.FindNewPossibleStates2 = function(){
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
      var tempBoard = JSON.parse(JSON.stringify(self.board));
      var blankCell = FindBlank(tempBoard);
      var newCell = FindCell(tempBoard, possMoves[i].row, possMoves[i].col);
      var tempVal = newCell.val;
      newCell.val = blankCell.val;
      blankCell.val = tempVal;
      var s = new State(self);
      s.board = JSON.parse(JSON.stringify(tempBoard));
      boards.push(s);

    }
    return boards;
  }
  
  
  
}