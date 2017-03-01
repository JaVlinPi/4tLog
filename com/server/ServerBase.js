
const http = require('http'); // Server class
const path = require('path'); // URI path decoder
const url = require('url'); // handles url queries
const fs = require('fs');

var io;
var portNumber = 7777;

var mimeTypes = {
  '.js' : 'text/javascript',
  '.html': 'text/html',
  '.css' : 'text/css',
  '.png' : 'image/png'
};

var cache = {};

var ServerBase = function() {

	io = require('socket.io')(http.createServer(function (request, response) {
		
		var rURL = request.url;

		// check whitelist for path
		if ( !paths[rURL] ) {
			response.writeHead(404); //no such file found!
	    	return;
		}
		else {
			rURL = paths[rURL];
		}

		if ( rURL.indexOf('?') !== -1 ) {
			rURL = rURL.slice(0,rURL.indexOf('?'));
		}

		if ( rURL.indexOf('/') === 0 ) {
			rURL = rURL.slice(1);
		}

		var lookup = rURL;
		var f = lookup;

		fs.exists(f, function (exists) { 
		    if ( !exists ) {
		    	console.log( lookup + " doesn't exist");
		    }
		    if ( exists ) {
		    	console.log( lookup + " does exist");
		    	cacheAndDeliver(f, function(err, data) {
		    		if (err) {
		    			response.writeHead(500); response.end('Server Error!');
		    			return;
		    		}
					var headers = {'Content-type': mimeTypes[path.extname(lookup)]};
		    		response.writeHead(200, headers);
		    		response.end(data);
		    	});
				return;
		    }
		    response.writeHead(404); //no such file found!
	    	response.end('Page Not Found');
		});
	}).listen(portNumber));
	
	io.on('connection', this.connection.bind(this) );

	console.log('server on');

}

var connectedSockets = [];

ServerBase.prototype.connection = function( socket ) {
	
	console.log(' >>>>> - a user connected');

	connectedSockets.push( socket );

	socket.on('disconnect', function(){
	    console.log(' <<<< - user disconnected');
	});

	socket.emit('message', 'you are connected');
	
	socket.emit('regLog', 'loginHTML', function( action, username, password ){
		checkAccountExists( username, function( exists ) {
			if ( exists ) {
				if ( action === 'reg' ) {
					socket.emit( 'regLogCB', { type:'error', msg:'The user already exists' } );
				}
				else if ( action === 'login' ) {
					fs.readFile('data/users/'+username+'.txt', function ( error, data ) {
						if ( error ) {
							console.log('error reading file:'+error);
						}
						else {
							var d = JSON.parse( (data) );
							if ( d.password === password ) {
								socket.emit( 'regLogCB', { type:'login', msg:'Login was successful' } );
							}
						}
					});
				}
			}
			else {
				if ( action === 'reg' ) {
					fs.writeFile( 'data/users/'+username+'.txt', JSON.stringify({'userName':username,'password':password}), function ( error ) {
						if ( error ) {
							console.log('error creating file:'+error);
						}
						else {
							socket.emit( 'regLogCB', { type:'reg', msg:'Created User Succcessfully' } );
						}
					});
				}
				else if ( action === 'login' ) {
					socket.emit( 'regLogCB', { type:'error', msg:'No such user exists' } );
				}
			}
		});
		console.log('user attempting to '+action+' with username:'+username+' and password:'+password);
	});

};

function sendAppList( socket ) {
	socket.emit( 'appData', { type:'appList', list:[{ id:'passwordMNG', icon:'pw', label:'Password'},
													{ id:'coinPurse', icon:'coins', label:'Coin Bag'},
		] } );
}

function checkAccountExists( userName, callback ) {
	fs.exists('data/users/'+userName+'.txt', function (exists) { 
	    callback( exists );
	} );
}

var cache = {};
function cacheAndDeliver(f, cb) {
	fs.stat(f, function (err, stats) {
	    if (err) { return console.log('Oh no!, Error', err); }
	    var lastChanged = Date.parse(stats.ctime),
	    isUpdated = (cache[f]) && lastChanged  > cache[f].timestamp;
	    if (!cache[f] || isUpdated) {
	    	fs.readFile(f, function(err, data) {
	    		if (!err) {
	    			cache[f] = {content: data,timestamp: Date.now() } //store a Unix time stamp
	    		}
	    		cb(err, data);
	    	});
	    	return;
	    }
	    cb(null, cache[f].content);
	}); //end of fs.stat
}

var paths = {};
ServerBase.prototype.addPath = function( path, ref ) {
	if ( !path ) { return; }
	if ( ref && ref !== '/' && ref.indexOf('/') !== 0 ) {
		ref = '/' + ref;
	}
	if ( path && path !== '/' && path.indexOf('/') !== 0 ) {
		path = '/' + path;
	}
	paths[ref ? ref : path] = path;

};

module.exports = ServerBase;
