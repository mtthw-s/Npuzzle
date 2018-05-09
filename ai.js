(function(window){
	function AI(){
		var self = this;
		var goal;
		var deadStates = [];
		var futureStates = [];

		self.AddToDeadStates = function(s){
			deadStates.push(s);
		};

		self.checkDeadStates = function(array1d){
			return deadStates.findIndex(function(s){
				var sString = s.GetflatBoard().toString();
				var aString = array1d.toString();
				return sString == aString;
			});
		};
		
		self.checkDeadStates2 = function(array1d){
			var test = [];
			for(var i = 0; i < deadStates.length; i++){
				test.push(deadStates[i].GetflatBoard().toString());
			}
			return test.indexOf(array1d.toString());
		};
		
		function FindDups(s){
			var sString = s.GetflatBoard().toString();
			var aString = array1d.toString();
			return sString == aString;
    }
    
    function RemoveIndexesFromArray(indexes, array){
      var newArray = [];
      var count = 0;
      for(var i = 0; i < array.length; i++){
        if(indexes.indexOf(i) == -1){
          newArray.push(array[i]);
        }
        else{
          count++;
        }
      }
      if(newArray.length === 0 && count != array.length){
        return array;
      }
      return newArray;
    }
		
		function RemoveDeadStates(states){
		  var deadIndexes = [];
		  var test = [];
			for(var i = 0; i < deadStates.length; i++){
				test.push(deadStates[i].GetflatBoard().toString());
			}
		  for(var j = 0; j < states.length; j++){
		    var pos = test.indexOf(states[j].GetflatBoard().toString());
		    if(pos > -1){
		      deadIndexes.push(j);
		    }
		  }
		  return RemoveIndexesFromArray(deadIndexes, states);
		}

		self.ShuffleBoard = function(state){
			var count = state.board.length * 2;
			for(var i = 0; i < count; i++){
				var moves = state.FindNewPossibleStates();
				state = GetRandomState(moves);
			}
			return state;
		};

		function GetRandomNumber(min, max){
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		function GetRandomState(mvs){
			var rnd = GetRandomNumber(0, mvs.length - 1);
			var s = new State();
			s.board = mvs[rnd];
			return s;
		}

		self.GetPath = function(state, array){
			if(state.parentState !== null){
				array.push(state.parentState);
				return self.GetPath(state.parentState, array);
			}
			else{
				return array;
			}
		};

		self.makeMove2 = function(state){
			deadStates.push(state);
			var states = state.FindNewPossibleStates2();
			for(var i = 0; i < states.length; i++){
				states[i].score = states[i].CalculateScore2(goal, states[i].GetflatBoard());
			}
			states = RemoveDeadStates(states);
			states.sort(function(a,b){
				return a.score - b.score;
			});
			if(states.length > 0){
				for(var j = 0; j < states.length; j++){
					if(states[j].score === 0){
						return states[j];
					}
					AddTofutureStates(states[j]);
				}
			}
			var nextState = GetNextState();
			if(nextState !== null){
				return self.makeMove2(nextState);
			}
			else{
				return deadStates;
			}
		};

		function GetNextState(){
			if(futureStates.length > 0){
				return futureStates.pop();
			}
			return null;
		}

		function AddTofutureStates(state){
			for(var i = 0; i < futureStates.length; i++){
			  var futureFlat = futureStates[i].GetFlatString();
			  var stateFlat = state.GetFlatString();
				if(futureStates[i].GetFlatString() == state.GetFlatString()){
					return;
				}
			}
			futureStates.push(state);
			futureStates.sort(function(a,b){
				return b.score - a.score;
			});
		}

		self.makeMove = function(state){
			var moves = state.FindNewPossibleStates();
			var test = [];
			var deadMoves = [];
			for(var i = 0; i < moves.length; i++){
				var s = new State();
				s.board =  JSON.parse(JSON.stringify(moves[i]));
				moves[i] = s;
				moves[i].score = moves[i].CalculateScore2(goal, moves[i].GetflatBoard());
				test.push(moves[i].GetflatBoard());
			}
			moves = RemoveDeadStates(moves);

			moves.sort(function(a,b){
				return a.score - b.score;
			});
			if(moves.length > 0){
				//deadStates.push(moves[0]);
				return moves[0];
			}
			return null;
		}

		self.createState = function(start, end){
		  goal = end;
		  var state = new State();
		  state.board = start;
		  return state;
		};


	}
	window.AI = new AI();
})(this);