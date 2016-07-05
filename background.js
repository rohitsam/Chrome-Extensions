/*
chrome.runtime.onMessage.addListener(
 function(request, sender, sendResponse) {
    alert(request);
	});
	*/

	
	
    $(function() {
	engine();
	setInterval(engine,3000);
	});
			
	//console.log('outside addListner')
    chrome.extension.onConnect.addListener(function(port){
    //console.log("Connected .....");
    port.onMessage.addListener(function(msg) {
		//console.log(msg);
	chrome.storage.sync.set({msg},function(){			
			alert("ur time table is now stored in chrome storage");
            console.log(msg);

		 });	
	
	
    });
	
	
	
	});
	function engine(){
		

var week=new Date().getDay()+1;
var hours=new Date().getHours();
var sec=new Date().getSeconds();
var time=hours-7;
var min=new Date().getMinutes();
//console.log("week"+(week+2));
//console.log("time"+time);
    if(week!=1){
    if(0<hours&&hours<18){	
	if(20<min&&min<35){
	console.log("inside engine");
	chrome.storage.sync.get("msg",function(data){
		//console.log("inside sync,get");	 
	    //console.log(data.msg);
		//console.log(data.msg);
		if(data.msg[week]!=undefined){
		var notify= {
			type:"basic",
			title:"You have got a class to attend in" ,
			message:data.msg[week][time],
			iconUrl:"alarm.png"
		};		
			
			
		if(!data.msg[week][time]){
			console.log("you are free");
			//chrome.notifications.create(notify);
		}
		else{
			if(sec<15){
			//console.log(data.msg[week][time]);
			
			chrome.notifications.create(notify);
			}
			
		}
		}//undefiend
        	 });

	
	}//end of if min  
	}//end of if time
	}//end of week
       

	
	//console.log("end");
	}
	
	
	