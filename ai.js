(function(window){
	function AI(){
		var self = this;
		var goal;
		var deadStates = [];
		var futureStates = [];

		self.AddToDeadStates = function(s){
			deadStates.push(s);
		}

		self.checkDeadStates = function(array1d){
			return deadStates.findIndex(function(s){
				var sString = s.GetflatBoard().toString();
				var aString = array1d.toString();
				return sString == aString;
			});
		}
		self.checkDeadStates2 = function(array1d){
			var test = [];
			for(var i = 0; i < deadStates.length; i++){
				test.push(deadStates[i].GetflatBoard().toString());
			}
			return test.indexOf(array1d.toString());
		}

		// self.checkDeadStates = function(array1d){
		// 	for(var i = 0; i < deadStates.length; i++){
		// 		var count = 0;
		// 		var flat = deadStates[i].GetflatBoard();
		// 		for(var j = 0; j < flat.length; j++){
		// 			if(flat[j] == array1d[j]){
		// 				count++;
		// 			}
		// 		}
		// 		if(count == array1d.length){
		// 			return i;
		// 		}
		// 	}
		// 	return -1;
		// }

		self.makeMove = function(state){
			var moves = state.FindNewPossibleStates();
			var test = [];
			var deadMoves = [];
			for(var i = 0; i < moves.length; i++){
				var s = new State();
				//s.setBoard(moves[i]);
				s.board =  JSON.parse(JSON.stringify(moves[i]));
				moves[i] = s;
				moves[i].score = moves[i].CalculateScore2(goal, moves[i].GetflatBoard());
				test.push(moves[i].GetflatBoard());
				var pos = self.checkDeadStates2(moves[i].GetflatBoard());
				if(pos > -1){
					deadMoves.push(pos);
					//moves.splice(pos, 1);
				}
			}
			for(var i = 0; i < deadMoves.length; i++){
				moves.splice(deadMoves[i], 1);
			}
			// moves.map(function(s){
			// 	s.CalculateAndSetScore(goal);
			// 	return s;
			// });
			moves.sort(function(a,b){
				return a.score - b.score;
			});
			if(moves.length > 0){
				deadStates.push(moves[0]);
				return moves[0];
			}
			return null;
		}

		self.createState = function(start, end){
		  goal = end;
		  var state = new State();
		  state.board = start;
		  return state;
		}


	}
	window.AI = new AI();
})(this);