var express = 			require("express");
var formidable =	 	require("formidable");
var DIYMigrator = 		require("./DIYMigrator");
var DIYOutput = 		require("./DIYOutput");
var Utils = 			require("./utils/Utils");
var _ = 				require("underscore");
var Promise =           require("bluebird");
var AdmZip = 			require('adm-zip');
var app = 				express();
var port = 				Number(process.env.PORT || 5000);

app.configure(function(){
	app.use(express.static(__dirname + "/public"));
});

app.post('/upload', function(req, res) {
	var form = new formidable.IncomingForm();
	form.multiples = true;
	form.parse(req, function(err, fields, files) {
		var filesArray, newNames;
		filesArray = _.filter(Utils.arrayify(files.upload), Utils.isCorrectExtension);
		if(!filesArray || filesArray.length === 0){
			DIYOutput.error(res);
		}
		else{
			newNames = _.map(filesArray, Utils.getNewPath);
			console.log("newNames" + newNames);
			Promise.all(_.map(filesArray, function(file){
				return new DIYMigrator().parseFile(file, fields);
			}))
			.then(_.partial(DIYOutput.output, res, newNames))
			.catch(console.log);
		}
    });
});

app.get('/', function(req, res) {
	app.render(res, "public/src/index.html");
});

app.listen(port, function() {
  console.log("Listening on " + port);
});

