var fs = require("fs");
var DIYMigrator = require("./DIYMigrator");
new DIYMigrator(fs.readFileSync(process.argv[2] || 'files.json'));
