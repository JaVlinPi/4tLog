
var assetController, accountController, ctx, canvas;

window.onload = function(){
	canvas = $('#myCanvas')[0];
	ctx = canvas.getContext("2d");
	assetController = new AssetController();
	accountController = new AccountController();
	appController = new AppController();
};


function startSession( isLogin, userName, password, callback ) {

  var socket = io();

  socket.on('message', function( msg ) {
    console.log(msg);
  });

  socket.on('regLog', function( uiData, callback ) {
    if ( isLogin ) {
		accountController.login( userName, password, callback );
	}
	else {
		accountController.register( userName, password, callback );
	}
  });

  socket.on('regLogCB', function( data ) {
    callback( data );
    accountController.processLogRegResponse( data );
  });

  socket.on('appData', function( data ) {
    appController.processAppData( data );
  });

}