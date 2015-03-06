var account;
var clientId;
var type;
var callback;

var popupWindow;

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
	windowpop("https://api.imgur.com/oauth2/authorize?client_id=" + clientId 
		+ "&response_type=" + type, 645, 633);	
}

function windowpop(url, width, height) {
    var leftPosition, topPosition;
    //Allow for borders.
    leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
    //Allow for title and status bars.
    topPosition = (window.screen.height / 2) - ((height / 2) + 50);
    //Open the window.
    popupWindow = $(window.open(url, "Window2", "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no"));
}
