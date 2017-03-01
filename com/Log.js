
const fs = require('fs');

var Log = function( path ) {
	console.log(':: new log to '+path);
	this._path = path;
}

Log.prototype.append = function(data) {
	var d = new Date();
	var dStr = d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
	dStr += '  '+['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'][d.getDay()];
	dStr += '  '+d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear();
	fs.appendFile(this._path, "\n: "+dStr+' -:- '+data, (err) => {
	  if (err) {
	  	console.log(data+' was not appended to '+this._path);
	  	throw err;
	  }
	});
};

module.exports = Log;

