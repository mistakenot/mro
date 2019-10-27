const cs = require('./cs');

module.exports = function(schemas, options) {
    const csSchema = cs.fromSchemas(schemas, options || {});
    return cs.generateCode(csSchema, options || {});
}