
chrome.browserAction.setBadgeBackgroundColor({ color: [77, 165, 223, 0] });

//NOW THE DIRTY CODE ENDS, AND THE CLEAN SPLEAN CODE IS BELOW BY THE AMAZING MILAN

//Time variables
var seconds = 0;
var minutes = 0;
var hours = 0;
var timeString = "";

//Variables for getting saved values
var LEGACYHOURS = 0;
var LEGACYMINUTES = 0;
var LEGACYSECONDS = 0;



//GET THE VALUES IF THEY EXIST
if(localStorage.getItem("UHOURS") != null){
	 LEGACYHOURS = localStorage.getItem("UHOURS");
}
if(localStorage.getItem("UMINUTES") != null){
	LEGACYMINUTES = localStorage.getItem("UMINUTES");
}
if(localStorage.getItem("USECONDS") != null){
	LEGACYSECONDS = localStorage.getItem("USECONDS");
}


var timeTotal = ""; //For displaying total chrome usage


//  Executes code on exit
function save(){
	
	
	
	let saveHours = LEGACYHOURS + hours;
	let saveMinutes = LEGACYMINUTES + minutes;
	let saveSeconds = LEGACYSECONDS + seconds;
	
	if(saveSeconds > 60){
		console.log("CALIBRATING SECONDS TO SAVE");
		saveSeconds = 0;
		saveMinutes += 1;	
	}
	console.log(saveSeconds.toString());
	if(saveMinutes > 60){
		console.log("CALIBRATING MINUTES TO SAVE");
		saveMinutes = 0;
		saveHours += 1;
		
	}
	console.log(saveMinutes.toString());
	timeTotal = saveHours.toString() + ":" + saveMinutes.toString() + ":" + saveSeconds.toString();
	localStorage.setItem("UHOURS", hours);
	localStorage.setItem("UMINUTES", minutes);
	localStorage.setItem("USECONDS", seconds);
}

// Main function
function main(){
	setTimeout(function(){
		seconds += 1;
		while(seconds > 60){
			seconds -= 60;
			minutes += 1;
		}
		while(minutes > 60){
			minutes -= 60;
			hours += 1;
		}
		if((seconds & 1)==0){
			chrome.browserAction.setIcon({path:"icons/tick.png"});
		}else {
			chrome.browserAction.setIcon({path:"icons/tock.png"});
	}
		timeString = hours.toString() + ":" + minutes.toString() + ":" + seconds.toString();
		timeAbv = hours.toString() + ":" + minutes.toString();
		chrome.browserAction.setBadgeText({text: timeAbv});
		
		save();
		
		//Change the DOCUMENT
		var poppy = chrome.extension.getViews({
			type: "popup"
		});
		for (var i = 0; i < poppy.length; i++){
			poppy[i].document.getElementById('time').innerHTML = timeString;
			poppy[i].document.getElementById('atime').innerHTML = timeTotal;
		}
    /*
    TO-DO:  Set up the badge so it doesn't show hour or minutes when it is at zero.
    */
		main();
	},1000);
}
main();
