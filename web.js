var express = 			require("express");
var formidable =	 	require("formidable");
var DIYMigrator = 		require("./DIYMigrator");
var _ = 				require("underscore");
var Promise =           require("bluebird");
var AdmZip = 			require('adm-zip');
var app = 				express();
var port = 				Number(process.env.PORT || 5000);

var _output = function(res, newNames, jsonArray){
	if(newNames.length === 1){
		res.writeHead(200, {'content-type': 'application/force-download','Content-disposition':'attachment; filename=' + newNames[0]});
		res.write(JSON.stringify(jsonArray[0], null, 2));
		res.end();
	}
	else{
		var zip = new AdmZip();
		_.each(jsonArray, function(json, i){
			zip.addFile(newNames[i], new Buffer(JSON.stringify(jsonArray[0], null, 2)), "file " + i, 0400);
		});
		var willSendthis = zip.toBuffer();
		res.setHeader('Content-disposition', 'attachment; filename=quiz.zip');
		return res.send(200, willSendthis);
		//This is deprecated. I got this error message 'express deprecated res.send(status, body): Use res.status(status).send(body)' – danielbh Mar 8 at 16:21
	}
};

app.configure(function(){
	app.use(express.static(__dirname + "/public"));
});

app.get('/download', function(req, res) {
	
});

app.post('/upload', function(req, res) {
	var form = new formidable.IncomingForm();
	form.multiples = true; // per their documents
	form.parse(req, function(err, fields, files) {
		var filesArray = _.isArray(files.upload) ? files.upload : [files.upload];
		var newNames = _.map(filesArray, function(file){
			return DIYMigrator.getNewPath(file.name);
		});
		Promise.all(_.map(filesArray, function(file){
			return new DIYMigrator()
			.parseFile(file.path, fields);
		}))
		.then(_.partial(_output, res, newNames))
		.catch(function(e){
			console.log(e);
		});
    });
});

app.get('/', function(req, res) {
	app.render(res, "public/src/index.html");
});

app.listen(port, function() {
  console.log("Listening on " + port);
});

