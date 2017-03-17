
"use strict";

var path = 				require('path');
var fs = 				require("fs");
var XML = 				require('simple-xml');
var _ = 				require("underscore");
var ParserFactory = 	require("./ParserFactory");

var EXTENSION = 		".2diy";
var NEW_EXTENSION = 	".2quiz";

var DIYMigrator = function(configUrl){
	if(configUrl){
		_.each(JSON.parse(configUrl, 'utf8'), this.parseAndWriteFile.bind(this));
	}
};

DIYMigrator.prototype.parseAndWriteFile = function(url){
	this.parseFile(url)
	.then(_.partial(this.writeFile, url));
};

DIYMigrator.prototype.writeFile = function(url, json){
	var newPath = DIYMigrator.getNewPath(url);
	fs.writeFileSync(newPath, JSON.stringify(json, null, 2), 'utf8');
	console.log("written", newPath);
};

DIYMigrator.prototype.parseFile = function(url, options, name){
	var str, json;
	str = fs.readFileSync(url, 'utf8');
	try{
		json = XML.parse(str);
	}
	catch(e){
		console.log("failed to parse", url, options, name);
	}
	return ParserFactory.parse(json, options);
};

// static
DIYMigrator.getNewPath = function(url){
	if(path.extname(url) === EXTENSION){
		return url.substring(0, url.length - EXTENSION.length) + NEW_EXTENSION;
	}
	// else fail
};

module.exports = DIYMigrator;







