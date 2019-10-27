var db = require("./db/postgres")
var cs = require('./langs/cs');

var dbSchema = db().then(schemas => {
    console.log(cs(schemas))
})