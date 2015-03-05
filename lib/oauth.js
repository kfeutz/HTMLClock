var account;
var clientId;
var type;
var callback;

function init (jsonObj) {
	account = jsonObj;
	clientId = account.client_id;
	type = account.type;
	callback = account.callback_function;
	console.log('Attempting to login with type: ' + type);
}

/* Launch the Imgur Oauth flow in new popup window */
function login() {
	console.log('Attempting to login with client_id: ' + clientId);
	window.open("https://api.imgur.com/oauth2/authorize?client_id=" + clientId 
		+ "&response_type=" + type);	
}
