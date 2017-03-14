
"use strict";

var path = 				require('path');
var fs = 				require("fs");
var XML = 				require('simple-xml');
var _ = 				require("underscore");
var ParserFactory = 	require("./ParserFactory");

var EXTENSION = 		".2diy";
var NEW_EXTENSION = 	".2quiz";

var DIYMigrator = function(configUrl){
	_.each(JSON.parse(configUrl, 'utf8'), this.parseFile);
};

DIYMigrator.prototype.parseFile = function(url){
	var str, json, newPath, ext;
	str = fs.readFileSync(url, 'utf8');
	newPath = DIYMigrator.getNewPath(url);
	json = XML.parse(str);
	ParserFactory.parse(json)
	.then(function(out){
		fs.writeFileSync(newPath, JSON.stringify(out, null, 2), 'utf8');
		console.log("written", newPath);
	});
};

// static
DIYMigrator.getNewPath = function(url){
	if(path.extname(url) === EXTENSION){
		return url.substring(0, url.length - EXTENSION.length) + NEW_EXTENSION;
	}
	// else fail
};

module.exports = DIYMigrator;







