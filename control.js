(function(window){
  function Control(){
    function getInversionCount(array){
        
        var count = 0;
        var test = JSON.parse(JSON.stringify(array));
        //if(test.indexOf("9") > 0){
          //test[test.indexOf("9")] = 9;
        //}
        for(var i = 0; i < test.length; i++){
          for(var j = i; j < test.length; j++){
            if(parseInt(array[i]) > parseInt(array[j])){
              count++;
            }
          }
        }
        return count;
      }

      function Shuffle(state){
        
        return AI.ShuffleBoard(state);

      }
      
      function shuffleInplace(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
          j = Math.floor(Math.random() * (i + 1));
          x = a[i];
          a[i] = a[j];
          a[j] = x;
        }
        return a;
      }
      
      this.StartGame = function(){
        var size = document.getElementById("numBoard").value;
        var startStates = Setup(size);
        console.log("Start: " + startStates[0].toString() + " InvertionCount:" + getInversionCount(startStates[0]));
        run(startStates[0], startStates[1]);
        //do{
          //boards = Control.Setup(9);
          //console.log("Start: " + boards[0].toString() + " InvertionCount:" + Control.getInversionCount(boards[0]));
          //run(startStates[0], startStates[1]);
          //boards = [[1,8,3,4,6,7,5,9,2],[1,2,3,4,5,6,7,8,9]];
          //boards = [[5,1,4,7,9,8,6,2,3],[1,2,3,4,5,6,7,8,9]];
          //alert(getInversionCount(boards[0]));
        //}while(Control.getInversionCount(boards[0]) % 2 !== 0 || Control.getInversionCount(boards[0]) == 0 )
        
      }
      
      
      function run(start, end){
        UI.DrawBoard(start);
        var final;
        var b = UI.ReadBoard2();
        var newState = AI.createState(b, end);
          var path = [];
          var startTime = Date.now();
          while(newState !== null && newState.score !== 0){
            console.log(newState.flatString + " score:" + newState.score + " distance: " + newState.distance);
            newState = AI.makeMove2(newState);
          }
          var time = "Time: " + ((Date.now() - startTime)/1000) + " secs";
          UI.DrawBoard(newState.flatBoard);
          var ans = [];
          while(newState !== null){
            ans.push(newState);
            newState = newState.parentState;
          }
          console.log("Solved in " + ans.length + " moves\n" + time + "</br>");
          for(var j = ans.length - 1; j >= 0; j--){
            UI.DrawBoard(ans[j].flatBoard);
            console.log(ans[j].flatString + " score: " + ans[j].score + " distance: " + ans[j].distance + "</br>");
          }
      }
      
      function Setup(num){
        var end = [];
        var start;
        for(var i = 0; i < num; i++){
          end.push((i + 1));
        }
        start = JSON.parse(JSON.stringify(end));
        UI.DrawBoard(start);
        var b = UI.ReadBoard2();
        var state = new State();
        //state.setBoard(shuffleInplace(b));
        state.setBoard(b);
        state = Shuffle(state);
        return [state.flatBoard, end];
      }
      
      this.startGame = function(){
        
      }
  }
      
      window.Control = new Control();
  
})(this)