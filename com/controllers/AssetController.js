


function AssetController () {
	// body...
	console.log("new AssetController");
	var data = [];
	//var labels = new Array();
	this.images = {};
	this.queue = [];
	this.testString = "testString";
	this.loadQueueCallback;
}

AssetController.prototype.loadAsset = function( url, label ) {
	// body...
	console.log("loadAsset");
	console.log("url:"+url);
	console.log("label:"+label);
	this[label] = "it works";
	console.log(":::"+this[label]);
};

AssetController.prototype.addImageToQueue = function( url, label ) {
	
	this.queue.push({ type:"image", url:url, label:label });
};

AssetController.prototype.loadQueue = function( callback ) {
	// body...
	console.log("loadQueue");
	this.loadQueueCallback = callback;
	console.log("this.queue:"+this.queue);
	console.log("this.queue.length:"+this.queue.length);
	if ( this.queue.length > 0 ) {
		console.log("this.queue:"+this.queue);
		this.load( this.queue.pop(), this.loadQueue );
		console.log(" - this.queue:"+this.queue);
	}
	else {
		console.log("loadQueue complete");
		this.loadQueueCallback();
	}
};

AssetController.prototype.loadImages = function( images, callback ) {
	console.log("this.images:"+this.images);
	var loadedImages = 0;
    // get num of sources
    var numImages = images.length;
    var label;
    var url;
    for(var i = 0; i < numImages; i++ ) {
    	label = images[i].label;
    	url = images[i].url;
      this.images[label] = new Image();
      console.log('AssetController.prototype.loadImages   label:'+label);
      console.log('AssetController.prototype.loadImages   url:'+url);
      this.images[label].onload = function() {
        if(++loadedImages >= numImages) {
          callback();
        }
      };
      this.images[label].src = url;
    }
    /*
	this.images[images[0].label] = new Image();
	this.images[images[0].label].src = loadData.url;
	// this.images[loadData.label].addEventListener("load", (inQueue ? this.loadQueue : onImgLoad), false);
	this.images[loadData.label].onload = function() {
    	console.log("image loaded");
    	console.log("callback:"+callback);
    	console.log("loadQueue:"+this.loadQueue);
    	if ( images.length > 1 ) {

    	}
    };
	this.images[loadData.label].addEventListener("error", function() {
		console.log("image load error");
	}, false);
	*/
}

AssetController.prototype.load = function( loadData, callback, inQueue ) {
	// body...
	console.log(" - load");
	console.log("loadData.url:"+loadData.url);
	
	if ( loadData.type == "image") {
		console.log("this.images:"+this.images);
		this.images[loadData.label] = new Image();
		this.images[loadData.label].src = loadData.url;
		// this.images[loadData.label].addEventListener("load", (inQueue ? this.loadQueue : onImgLoad), false);
		this.images[loadData.label].onload = function() {
        	console.log("image loaed");
        	console.log("callback:"+callback);
        	console.log("loadQueue:"+this.loadQueue);
        	callback.call();
        };
		this.images[loadData.label].addEventListener("error", function() {
			console.log("image load error");
		}, false);
	}
	
};




