(function(window){
	function UI(){
	  var tblID = "tblPuzzle";
	  
	  /*
	  Public function
	  This will initialize the board's table ID value.
	  If no value is given or if the function is not used the default "tblPuzzle" will be used
	  */
	  this.init = function(_tblID){
	    var id = _tblID;
	    if(id){
	      tblID = _tblID;
	    }
	  }
	  
	  /*
	  Public function
	  This will draw a HTML board given an array of values.
	  The number of values MUST have an even square root.
	  */
		this.DrawBoard = function(brdArray){
		  var rowLength = Math.sqrt(brdArray.length);
		  var tbl = document.getElementById(tblID);
		  var startVals = 0;
		  
		  tbl.innerHTML = "";
		  for(var i = 0; i < rowLength; i++){
        var row = tbl.insertRow(i);
        DrawRow(row, brdArray.slice(startVals, rowLength + startVals), i);
        startVals += rowLength;
		  }
		}
		
		/*
		Public function
		This will read out all the cell values from the HTML table board and return a one dimentional array
		*/
		this.ReadBoard = function(){
		  var table = document.getElementById(tblID);
		  var board = [];
		  for(var i = 0; i < table.rows.length; i++){
		    var row = table.rows[i];
		    for(var j = 0; j < row.cells.length; j++){
		      board.push(row.cells[j].childNodes[0].value);
		    }
		  }
		  return board;
		}
		
		this.ReadBoard2 = function(){
		  var table = document.getElementById(tblID);
		  var board = [];
		  for(var i = 0; i < table.rows.length; i++){
		    var row = table.rows[i];
		    for(var j = 0; j < row.cells.length; j++){
		      var pos = row.cells[j].childNodes[0].id.split(".");
		      board.push({val: row.cells[j].childNodes[0].value, row: pos[0], col: pos[1]});
		    }
		  }
		  return board;
		}
		
		/*
		Private function
		This will take a row object and a set of values for that row and the row's index on the board.
		It creates a visual representation of the values in a table cell with an ID of that cells coordinates.
		This can be modified to create images, divs, or any other html element
		*/
		function DrawRow(row, values, rowIndex){
		  for(var i = 0; i < values.length; i++){
		    var cell = row.insertCell(i);
		    //This is where the object is made, any HTML element can work.
		    cell.innerHTML = "<input type='button' id='" + rowIndex + "." + i + "' value='" + values[i] + "'>";
		  }
		}
		
		
	}
	window.UI = new UI();
})(this);