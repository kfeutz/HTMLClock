setInterval(function(){getTime()}, 1000);

function getTime() {
	var clockDiv = document.getElementById("clock");
	var d = new Date();
	clockDiv.innerHTML = d.toLocaleTimeString();
}

function getTemp() {
	var url = "https://api.forecast.io/forecast/d196fbc43a8a64cc8819d752b4d2c62d/35.300399,-120.662362?callback=?";
	var imgPath;

	$.getJSON(url, function( data ) {
		var currentData = data.currently;
	  $('#forecastLabel').html(currentData.summary + " " + data.daily.data[0].temperatureMax);
	  imgPath = "img/" + data.currently.icon + '.png';
	  $('#forecastIcon').attr('src', imgPath);
	  var maxTemp = data.daily.data[0].temperatureMax;
	  if (maxTemp < 60) {
	  	$('body').addClass('cold');	
	  }
	  else if (maxTemp >= 60 && maxTemp < 70) {
	  	$('body').addClass('chilly');	
	  }
	  else if (maxTemp >= 70 && maxTemp < 80) {
	  	$('body').addClass('nice');
	  }
	  else if (maxTemp >= 80 && maxTemp < 90) {
	  	$('body').addClass('warm');
	  }
	  else {
	  	$('body').addClass('hot');
	  }
	});
}

getTime();

 $(document).ready(function() { 
 	getTemp(); 
 });