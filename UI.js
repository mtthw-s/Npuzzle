(function(window){
	function UI(){
	  var tblID = "tblPuzzle";
	  this.init = function(_tblID){
	    tblID = _tblID;
	  }
	  
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
		
		function DrawRow(row, values, rowIndex){
		  for(var i = 0; i < values.length; i++){
		    var cell = row.insertCell(i);
		    cell.innerHTML = "<input type='button' id='" + rowIndex + i + "' value='" + values[i] + "'>";
		  }
		}
	}
	window.UI = new UI();
})(this);