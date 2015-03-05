function init (jsonObj) {
	var account = jsonObj;
	var clientId = account.client_id;
	var type = account.type;
	var callback = account.callback_function;
}

/* Launch the Imgur Oauth flow in new popup window */
function login() {
	window.open("https://api.imgur.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&response_type=REQUESTED_RESPONSE_TYPE&state=APPLICATION_STATE");	
}
