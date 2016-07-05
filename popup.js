                var leftv = new Date().getHours();
				var week = new Date().getDay()+1;
				var time = new Date().getHours()-7;
				

//console.log("not inside any loop");
$( document ).ready(function() {
    console.log( "ready!" );
	chrome.storage.sync.get("table",function(datas){
		
		$("#time").text("Time-"+ leftv +":"+30+"-"+(leftv+1)+":"+30);
		if(!datas.table[week][time]){
			
			$("#info").text("ENJOY");
		}
		else{
		$("#info").text(datas.table[week][time]);
		}
	});
});

$(function() {
    oFileIn = document.getElementById('my_file_input');
    if(oFileIn.addEventListener) {
        oFileIn.addEventListener('change', filePicked, false);
		console.log(oFileIn);
    }
	
	
  $("#left").click(function(){
			   
				
			    chrome.storage.sync.get("table",function(datas){
	                    				
				console.log(datas.table[week][leftv-7]);
				//console.log(leftv);
				
                
				if(leftv<9){
					leftv=17;
				}
				else{
					
					leftv--;
					
					if(!datas.table[week][leftv-7]){
						$("#info").text("ENJOY");
					}
					else{
						$("#info").text(datas.table[week][leftv-7]);
					}
					$("#time").text("Time-"+ leftv +":"+30+"-"+(leftv+1)+":"+30);
				}
		 
          });
});	
 $("#right").click(function(){
			  
       			chrome.storage.sync.get("table",function(datas){
	           
				console.log(datas.table[week][5]);
				console.log("this right butt");
				console.log(leftv);
				
                	if(leftv>17){
					leftv=7;
				    
				}
				else{
					leftv++;
					$("#time").text("Time-"+ leftv +":"+30+"-"+(leftv+1)+":"+30);  
	               if(!datas.table[week][leftv-7]){
						$("#info").text("ENJOY");
					}
					else{
						$("#info").text(datas.table[week][leftv-7]);
					}
					
				}
		 
          });
});	
	
	
	
});

	
	
	

function filePicked(oEvent) {
    // Get The File From The Input
	console.log(oEvent);
    var oFile = oEvent.target.files[0];
	console.log(oFile);
    var sFilename = oFile.name;
    // Create A File Reader HTML5
    var reader = new FileReader();
   
    // Ready The Event For When A File Gets Selected
    reader.onload = function(e) {
        var data = e.target.result;
        var cfb = XLS.CFB.read(data, {type: 'binary'});
        var wb = XLS.parse_xlscfb(cfb);
     
        wb.SheetNames.forEach(function(sheetName) {
            // Obtain The Current Row As CSV
			var table = XLS.utils.sheet_to_json(wb.Sheets[sheetName], {header:1}); 
           
           	//splicing the table		
			var idx = 6;
		    
            for(var i = table.length ; i >0 ; i--)
            {
                table[i-1].splice(idx,1);
				if(table[i-1].length<=idx){
					
					table.splice(i-1,1);
				}
				
            }
			
			
           //posting message to background page
			var port = chrome.extension.connect({name: "Sample Communication"});
            port.postMessage(table);
		   //storing table to chrome storage
			chrome.storage.sync.set({table},function(){			
			console.log("ur time table is now stored in chrome storage");
            console.log(table);

		 });
		 
          
		  
		   
        });
    };
    
	
    // Tell JS To Start Reading The File.. You could delay this if desired
	
     reader.readAsBinaryString(oFile);
}
		 