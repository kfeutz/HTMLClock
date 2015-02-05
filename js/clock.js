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

 function showAlarmPopup() {
 	$('#mask').removeClass('hide');
 	$('#popup').removeClass('hide');
 }

 function hideAlarmPopup() {
 	$('#mask').addClass('hide');
 	$('#popup').addClass('hide');
 }

 function insertAlarm(hours, mins, ampm, alarmName) {
 	var newDiv = $('<div>').addClass('flexible');
 	var nameDiv = $('<div>').addClass('name');
 	nameDiv.html(alarmName);
 	newDiv.append(nameDiv);
 	newDiv.append('<div class="time">' + hours + ':' + mins + ampm + '</div>');
 	$("#alarms").append(newDiv);
 }

 function addAlarm() {
 	var hours = $("#hours option:selected").text();
 	var mins = $("#mins option:selected").text();
 	var ampm = $("#ampm option:selected").text();
 	var alarmName = $('#alarmName').val();
 	console.log(alarmName);
 	insertAlarm(hours, mins, ampm, alarmName);
 	hideAlarmPopup();
 }