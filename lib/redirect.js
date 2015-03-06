function getAccessToken() {
	alert(location.hash.substring(1));
    var query = window.location.search.substring(1);
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
