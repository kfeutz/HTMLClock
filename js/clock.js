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

 window.onload = function() {
 	getAllAlarms();
 }

 function showAlarmPopup() {
 	$('#mask').removeClass('hide');
 	$('#popup').removeClass('hide');
 }

 function hideAlarmPopup() {
 	$('#mask').addClass('hide');
 	$('#popup').addClass('hide');
 }

 function insertAlarm(hours, mins, ampm, alarmName, alarmId) {
 	var time = hours + ':' + mins + ampm
 	insertStoredAlarm(time, alarmName, alarmId);

 }

 function insertStoredAlarm(time, alarmName, alarmId) {
 	var newDiv = $('<div>').addClass('flexable');
 	var checkDiv = $('<input> ', {type: 'checkbox', id: alarmId}).addClass('check');
 	var nameDiv = $('<div>').addClass('name');
 	nameDiv.html(alarmName);
 	newDiv.append(nameDiv);
 	newDiv.append('<div class="time">' + time + '</div>');
 	newDiv.append(checkDiv);
 	$("#alarms").append(newDiv);

 	
 }

 function addAlarm() {
 	var hours = $("#hours option:selected").text();
 	var mins = $("#mins option:selected").text();
 	var ampm = $("#ampm option:selected").text();
 	var alarmName = $('#alarmName').val();

 	var AlarmObject = Parse.Object.extend("Alarm");
    var alarmObject = new AlarmObject();
    var time = hours + ":" + mins + ampm; 

      alarmObject.save({"time": time,"alarmName": alarmName}, {
      success: function(object) {
        insertAlarm(hours, mins, ampm, alarmName, object.id);
 		hideAlarmPopup();
      }
    });
 }

 function getAllAlarms() {
 	Parse.initialize("GYDUCbQ9boPKsethN4hhYnDFEdEnfq51aWBhYlln", "zunRCHq6OGvjjBYeO9Jov3g2Ww2hbsf8PqBSnhZP");
 	var AlarmObject = Parse.Object.extend("Alarm");
    var query = new Parse.Query(AlarmObject);
    console.log('getting all alarms');
    query.find({
        success: function(results) {
          for (var i = 0; i < results.length; i++) { 
            insertStoredAlarm(results[i].get("time"), results[i].get("alarmName"), results[i].id);
          }
        }
    });
 }

 function deleteAlarm() {
 	var alarms = document.getElementById('alarms');
 	var checkBoxes = alarms.getElementsByTagName('input');
	var AlarmObject = Parse.Object.extend("Alarm");
    var query = new Parse.Query(AlarmObject);

 	for(var i = 0, len = checkBoxes.length; i < len; i++) {
 		if (checkBoxes[i].checked) {
 			var deleteId = checkBoxes[i].id;

 			$("#" + deleteId).parent().addClass("hide");
 			$("#" + deleteId).parent().removeClass("flexable");
 		    query.get(deleteId, {
 		    	success: function (alarms) {
 		    		alarms.destroy({
 		    			error: function(myObject, error) {
 		    				console.log("Error deleting");
 		    			}
 		    		});
 		    	},
 		    	error: function(object, error) {
 		    		console.log('error');
 		    	} 
 		    });
 		}	 		
 	}
 }

 function signinCallback(authResult) {
  if (authResult['status']['signed_in']) {
    // Update the app to reflect a signed in user
    // Hide the sign-in button now that the user is authorized, for example:
    document.getElementById('signinButton').setAttribute('style', 'display: none');
    $.ajax({
		type:'GET',
		url: 'https://www.googleapis.com/plus/v1/people/me',
		dataType: 'json',	
	})
	.done(function (data) {
		console.log ('success: ' + data);
	})
	.fail(function (jqXHR, status) {
		console.log(jqXHR);
		console.log(status);
	});
  } else {
    // Update the app to reflect a signed out user
    // Possible error values:
    //   "user_signed_out" - User is signed-out
    //   "access_denied" - User denied access to your app
    //   "immediate_failed" - Could not automatically log in the user
    console.log('Sign-in state: ' + authResult['error']);
  }
}