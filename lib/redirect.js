function getAccessToken() {
	alert(location.hash.substring(1));
	var params = {}, query = location.hash.substring(1), 
		regex = /([^&=]+)=([^&]*)/g, temp;
	
	while (temp = regex.exec(query)) {
	  params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
	}

	if(!params['access_token']) {
	  alert("Error: Your access was not granted");
	}
	else {
		alert(params['access_token']);
	  localStorage.setItem("token", params['access_token']);
	  return params['access_token'];
	}
}

function redirect_init() {
	var token = getAccessToken();
	popupWindow.close();
	console.log('Redirect initiated with token: ' + token);

	/* Make sure web browser supports web storage */
	if(typeof(Storage) !== "undefined") {
		console.log('Attempting to store the token: ' + token);
		
		window.opener.callback();
	} 
	else {
	    // Sorry! No Web Storage support..
	}
}
