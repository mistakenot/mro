const { Pool } = require('pg')
const fs = require('fs')

const schemaQuery = fs.readFileSync(__dirname + '/get-schema.sql').toString("utf8");

async function readSchemaRowsFromDatabase() {
    const pool = new Pool()
    const res = await pool.query(schemaQuery);
    await pool.end()
    return res.rows;
}

function generateSchemaFromRows(rows) {

}

module.exports = async function() {
    const schema = await readSchemaRowsFromDatabase()
}