
const fs = require('fs');

var DBList = function( path, callback ) {
	console.log(' :: new DBList('+path+', '+callback+')');
	this._path = path;
	this._onLoad = callback;


	// check folder exists
	var that = this;
	fs.stat(this._path, function(err,stat){
		console.log(' - stat:'+stat);
	    if ( err === null ) { 
	    	console.log('DBList '+that._path+' exists'); 
	    	that.loadList();
	    }
	    else { 
	    	console.log('DBList '+that._path+' does not exists'); 
	    	console.log('err.code:'+err.code);
	    	fs.mkdir(that._path, function(err){
	    		if ( err ) {
					console.log('cannot make folder '+that._path); 
	    			console.log('err.code:'+err.code);
	    		}
	    		else {
	    			console.log('successfully created folder '+that._path); 
	    			that.loadList();
	    		}
	    	});
	    }
	});
	

};

DBList.prototype.loadList = function() {
	console.log(':> DBList.prototype.loadList');
	var that = this;
	// check folder for files
	fs.readdir( this._path, function( err, list ) {
		if ( err ) {
			console.log('Error loading folder '+that._path)
		}
		else {
			that._dirList = list;
			console.log(' - dirList:'+list);
			console.log(' - dirList:'+that._dirList);
			that._onLoad();
		}
	} );
};

DBList.prototype.createRecord = function( label, data, override ) {
	console.log('DBList.prototype.createRecord( '+label+', '+data+', '+override+' )');
	console.log(' - dirList:'+this._dirList);
	var that = this;
	if ( this._dirList.indexOf(label) === -1 || override ){
		console.log(' - Create Record '+that._path+'/'+label);
		fs.writeFile( that._path+'/'+label+'.txt', JSON.stringify(data), null, function(err) {
		  if (err) {
		  	throw err;
		  }
		  else {
		  	console.log('Create Record '+label+' in '+that._path+' was successful!');
		  }
		});
	}
	else {
		console.log('Record '+label+' already exists in '+that._path);
	}

};

module.exports = DBList;