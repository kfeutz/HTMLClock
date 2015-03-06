function getAccessToken() {
    var query = location.hash.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == 'access_token') {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}

function redirect_init() {
	var token = getAccessToken();
	
	console.log('Redirect initiated with token: ' + token);

	/* Make sure web browser supports web storage */
	if(typeof(Storage) !== "undefined") {
		console.log('Attempting to store the token: ' + token);
		try {
			localStorage.setItem("token", token); //saves to the database, “key”, “value”
			} catch (e) {
			if (e == QUOTA_EXCEEDED_ERROR) {
			alert('Quota exceeded!'); //data wasn’t successfully saved due to quota exceed so throw an error
			}
		window.opener.callback;
		window.close();
	} 
	else {
	    // Sorry! No Web Storage support..
	}
}
