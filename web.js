var express = 			require("express");
var formidable =	 	require("formidable");
var DIYMigrator = 		require("./DIYMigrator");
var _ = 				require("underscore");
var app = 				express();
var port = 				Number(process.env.PORT || 5000);

var output = function(res, newName, json){
	res.writeHead(200, {'content-type': 'application/force-download','Content-disposition':'attachment; filename=' + newName});
	res.write(JSON.stringify(json));
	res.end();
};

app.configure(function(){
	app.use(express.static(__dirname + "/public"));
});

app.get('/download', function(req, res) {
	
});

app.post('/upload', function(req, res) {
	var file;
	new formidable.IncomingForm()
	.parse(req, function(err, fields, files) {
		var newName = DIYMigrator.getNewPath(files.upload.name);
        new DIYMigrator()
		.parseFile(files.upload.path)
		.then(_.partial(output, res, newName));
    });
});

app.get('/', function(req, res) {
	app.render(res, "public/src/index.html");
});

app.listen(port, function() {
  console.log("Listening on " + port);
});

