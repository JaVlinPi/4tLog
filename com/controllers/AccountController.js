


var loginUI = $('#loginUI');
var userInput = $('#name-input');
var passInput = $('#pass-input');
var loginBtn = $('#login-button');
var regBtn = $('#register-button');

function AccountController () {
	// body...
	console.log("new AccountController");
	this.isLoggedIn = false;
}

AccountController.prototype.login = function( userName, password, callback ) {
	callback( 'login', userName, password );
}

AccountController.prototype.register = function( userName, password, callback ) {
	callback( 'reg', userName, password );
}

AccountController.prototype.processLogRegResponse = function( data ) {
  if ( data.type === 'error' ) {
    alert( 'Error: '+data.msg );
    this.enableLogin();
  }
  else if ( data.type === 'login' ) {
	this.isLoggedIn = true;
    this.showLoading();
    loginUI.hide();
  }
  else if ( data.type === 'reg' ) {
	this.isLoggedIn = true;
    this.showLoading();
    loginUI.hide();
  }
  else {
    alert( 'Unknown Error' );
    this.enableLogin();
  }
}

AccountController.prototype.disableLogin = function() {
  userInput.prop('disabled', true);
  passInput.prop('disabled', true);
  loginBtn.prop('disabled', true);
  regBtn.prop('disabled', true);
}

AccountController.prototype.enableLogin = function() {
  userInput.prop('disabled', false);
  passInput.prop('disabled', false);
  loginBtn.prop('disabled', false);
  regBtn.prop('disabled', false);
}

AccountController.prototype.showLoading = function() {
  // need something here
}