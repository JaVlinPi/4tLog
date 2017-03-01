
var mainUI = {};

(function () {
	
	var isMenuOpen = false;
	var menuOpenTime = 250;
	
	var window = $( window );
	var body = $( '#body' );
	
	var userBtn = $( '#user_button' );
	var menuBtn = $( '#menu_button' );
	
	var menu = $( '#menu_options' );
	var mainMenu = $( '#main_menu' );
	var userMenu = $( '#user_menu' );
	
	var loginBtn = $( '#menu_login' );
	var menuLog = $( '#menu_log' );
	
	var homeBtn = $( '#menu_home' );
	var gamesBtn = $( '#menu_games' );
	var contactBtn = $( '#menu_contact' );
	
	var loginPanel = $( '#user_login' );
	loginPanel.fade = $('#user_login .fade');
	loginPanel.userInput = $('#login_panel #name-input');
	loginPanel.passInput = $('#login_panel #pass-input');
	loginPanel.loginBtn = $('#login_panel #login-button');
	loginPanel.regBtn = $('#login_panel #register-button');
	loginPanel.waiting = $('#login_panel #waiting');
	loginPanel.feedback = $('#login_panel #feedback');
	
	menuLog.hide();
	
	function openMainMenu() {
		console.log('open menu');
		if ( isMenuOpen ) { return; }
		isMenuOpen = true;
		mainMenu.show();
		userMenu.hide();
		body.stop();
		body.animate({
				left: '-80%'
			}, menuOpenTime, function() {
				// Animation complete.
				console.log('Menu opened');
		});
	}
	
	function closeMainMenu() {
		console.log('close menu');
		if ( !isMenuOpen ) { return; }
		isMenuOpen = false;
		body.stop();
		body.animate({
				left: '0%'
			}, menuOpenTime, function() {
				// Animation complete.
				console.log('Menu closed');
		});
	}
	
	function userClick() {
		if ( accountController.isLoggedIn ) {
			
		}
		else {
			showLoginPanel();
		}
	}
	
	function showLoginPanel() {
		loginPanel.show();
	}
	
	function login() {
		loginPanel.showWaiting();
		startSession( true, loginPanel.userInput.val(), loginPanel.passInput.val(), loginPanel.showResponse );
	}
	
	loginPanel.showWaiting = function() {
		loginPanel.waiting.show();
	}
	
	loginPanel.hideWaiting = function() {
		loginPanel.waiting.hide();
	}
	
	loginPanel.showResponse = function( response ) {
		loginPanel.feedback.html(response.msg);
		loginPanel.fade.hide();
	}
	
	// close login panel
	loginPanel.fade.click(function(event) {
		loginPanel.hide();
	});
	
	menuBtn.click(openMainMenu);
	userBtn.click(userClick);
	
	// close main menu
	$(document).click(function(event) {
		if( !$(event.target).closest('#menu_button').length &&
			!$(event.target).closest('#menu_options').length) {
			closeMainMenu();
		}
	});
	
	function loadGamesPage() {
		$.get('pages.games', function(data) {
			console.log('games page loaded');
		});
	}
	
	loginBtn.click(showLoginPanel);
	gamesBtn.click(loadGamesPage);
	loginPanel.loginBtn.click(login);

})();