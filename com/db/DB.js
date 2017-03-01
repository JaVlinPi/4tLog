
const fs = require('fs');
const DBList = require('./DBList.js');

var DB = function( path ) {
	this._path = path;
	this._lists = {};
};

DB.prototype.openList = function( name, callback ) {
	console.log(' -- - - - callback'+callback);
	if ( !this._lists[ name ] ) {
		this._lists[ name ] = new DBList( this._path+name, callback );
	}
};

DB.prototype.createRecord = function( listName, label, data, override ) {

	if ( !this._lists[ listName ] ) {
		throw( 'DB list '+listName+' does not exist');
	}
	// check if record already exists
	this._lists[ listName ].createRecord( label, data, override );

	// if so and autoOverride is false, throw error


};



module.exports = DB;