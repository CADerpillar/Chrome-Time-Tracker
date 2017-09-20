
chrome.browserAction.setBadgeBackgroundColor({ color: "#4285f4"});

//Time variables
var seconds = 0;
var minutes = 0;
var hours = 0;
var timeString = "";


function main(){
	setTimeout(function(){
		seconds += 1;
		if(seconds > 60){
			seconds -= 60;
			minutes += 1;
		}
		if(minutes > 60){
			minutes -= 60;
			hours += 1;
		}
		if((seconds & 1)==0){
			chrome.browserAction.setIcon({path:"icons/tick.png"});
		}else {
			chrome.browserAction.setIcon({path:"icons/tock.png"});
		}
		timeString = hours.toString()+ "h" + ":" + minutes.toString()+ "m" + ":" + seconds.toString() + "s";
		timeAbv = hours.toString()+ ":" + minutes.toString();
		chrome.browserAction.setBadgeText({text: timeAbv});
		
		
		//Change the DOCUMENT
		var poppy = chrome.extension.getViews({
			type: "popup"
		});
		for (var i = 0; i < poppy.length; i++){
			poppy[i].document.getElementById('time').innerHTML = timeString;
		}
    /*
    TO-DO:  Set up the badge so it doesn't show hour or minutes when it is at zero.
    */
		main();
	},1000);
}
main();
