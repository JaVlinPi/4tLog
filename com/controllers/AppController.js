
function AppController() {
	this._appList = [];
	this._icons = [];
}

AppController.prototype.processAppData = function( data ) {
  var that = this;
  var iconLabel;
  if ( data.type === 'appList' ) {
    this._appList = data.list;
    var iconAssets = [];
    for ( var i = 0; i < this._appList.length; i++ ) {
      iconLabel = this.getIconAssetID(this._appList[i]['icon']);
      iconAssets.push( {url:iconLabel, label:iconLabel } );
    }
    assetController.loadImages(iconAssets, function() {
      for ( var i = 0; i < that._appList.length; i++ ) {
        that._icons.push( { app:that._appList[i].id, 
        					label:that._appList[i].label, 
        					icon:assetController.images[that.getIconAssetID(that._appList[i]['icon'])] 
        				  } );
      }
      that.drawPage(0);
      that.enableAppSelect();
    });
  }
}

AppController.prototype.getIconAssetID = function( iconName ) {
  return ('icon.'+iconName);
}

AppController.prototype.showApps = function() {
  for ( var i = 0; i < this._appList.length; i++ ) {
    icons.push( { app:this._appList[i].id, label:this._appList[i].label, icon:assetController.images[this._appList[i].label] } );
  }
  drawPage(0);
  enableAppSelect();
}

AppController.prototype.enableAppSelect = function() {
  canvas.addEventListener( "mousedown", this.onCanvasClick, false )
}

AppController.prototype.onCanvasClick = function(event) {
  var canvasX = event.pageX;
  var canvasY = event.pageY;
}

AppController.prototype.drawPage = function( n ) {
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  var pageW = 4;
  var pageH = 5;
  var row = 0, col = 0;
  var appN = pageW * pageH * n;
  for ( var i = 0; i < this._icons.length && i < (pageW*pageH); i++ ) {
    var x = 10+(canvas.width-20)/pageW*col;
    var y = 10+(canvas.height-20)/pageH*row;
    ctx.drawImage( this._icons[appN+i].icon, x, y, (canvas.width-20)/pageW*0.8, (canvas.height-20)/pageH*0.8);
    ctx.fillText( this._icons[appN+i].label, canvas.width/pageW*col, canvas.height/pageH*row );
    if ( ++col >= pageW ) {
      col = 0;
      row++; 
    }
  }
}