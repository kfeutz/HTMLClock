setInterval(function(){getTime()}, 1000);

function getTime() {
	var clockDiv = document.getElementById("clock");
	var d = new Date();
	clockDiv.innerHTML = d.toLocaleTimeString();
}

getTime();