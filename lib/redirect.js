function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}

function redirect_init() {
	var token = getQueryVariable('access_token');
	console.log('Redirect initiated with token: ' + token);
	popupWindow.close();
	/* Make sure web browser supports web storage */
	if(typeof(Storage) !== "undefined") {
		localStorage.setItem("token", token);
		callback();
	} 
	else {
	    // Sorry! No Web Storage support..
	}
}
