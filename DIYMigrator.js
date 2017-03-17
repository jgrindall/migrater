
"use strict";

var path = 				require('path');
var fs = 				require("fs");
var XML = 				require('simple-xml');
var Utils = 			require('./utils/Utils');
var _ = 				require("underscore");
var ParserFactory = 	require("./ParserFactory");
var DIYOutput = 		require("./DIYOutput");

var DIYMigrator = function(configUrl){
	if(configUrl){
		_.each(JSON.parse(configUrl, 'utf8'), this.parseAndWriteFile.bind(this));
	}
};

DIYMigrator.prototype.parseAndWriteFile = function(url){
	console.log("parseAndWriteFile", url);
	this.parseFile({"path":url})
	.then(_.partial(this.writeFile, url));
};

DIYMigrator.prototype.writeFile = function(url, json){
	DIYOutput.write(Utils.getNewPath({"name":url}), json);
};

DIYMigrator.prototype.parseFile = function(file, options){
	var str, json;
	str = fs.readFileSync(file.path, 'utf8');
	try{
		return ParserFactory.parse(XML.parse(str), options);
	}
	catch(e){
		console.log("failed to parse", file, options);
	}
	return Promise.resolve("unable to parse xml??");
};

module.exports = DIYMigrator;







