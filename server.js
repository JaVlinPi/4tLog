
const ServerBase = require('./com/server/ServerBase.js');

var server = new ServerBase();
server.addPath( 'index.html', '/' );
server.addPath( 'index.js' );
server.addPath( 'main_ui.js' );
server.addPath( 'styles.css', '/styles.css' );
server.addPath( 'menu_styles.css', '/menu_styles.css' );
server.addPath( 'content_styles.css', '/content_styles.css' );
server.addPath( 'jquery-1.11.1.min[1].js' );
server.addPath( 'com/controllers/AssetController.js' );
server.addPath( 'com/controllers/AccountController.js' );
server.addPath( 'com/controllers/AppController.js' );
server.addPath( '/assets/logo.png', 'images.logo' );
server.addPath( '/assets/logo_invert.png', 'images.menuLogo' );
server.addPath( '/assets/logo_invert.png', 'favicon.ico' );
server.addPath( '/assets/menu_button_line.png', 'images.menuBtnLine' );
server.addPath( '/assets/userIcon.png', 'images.userIcon' );
server.addPath( '/assets/settings.png', 'images.settings' );
server.addPath( '/assets/icons/pw.png', 'icon.pw' );
server.addPath( '/assets/icons/coins.png', 'icon.coins' );

