const fs = require('fs');
const hb = require('handlebars');
const Type = require('../../types').Type;

const CsType = {
    [Type.INT]: 'int',
    [Type.STRING]: 'string'
}

hb.registerHelper('csarglist', function(args) {
    return args.map(a => a.type + ' ' + a.name).join(', ');
});

hb.registerHelper('csargnames', function(args) {
    return args.map(a => a.name).join(', ');
})

hb.registerHelper('arglist', function(schemaArgs) {
    return Object.keys(schemaArgs).map(k => '@' + k).join(', ');
})

hb.registerHelper('dappercall', function(method) {
    return `db.ExecuteScalarAsync<${method.returns}>("select`;
})

function camelcase(s) {
    return s.split('_').map(s => s[0].toUpperCase() + s.substring(1)).join('')
}

function fromSchemas(schemas, options) {
    const result = {
        namespace: options.namespace || 'Mro',
        types: [],
        methods: []
    };

    for (var i = 0; i < schemas.length; i++) {
        let schema = schemas[i];
        let name = 
            (schema.schema == 'public' ? '' : camelcase(schema.schema)) +
            camelcase(schema.name);

        let args = [];

        for (var argName in schema.args) {
            args.push({name: argName, type: CsType[schema.args[argName]]})
        }

        result.methods.push({
            name: name,
            returns: CsType[schema.returns],
            args,
            schema
        })
    }

    return result;
}

function generateCode(csSchema, options) {
    const templateSource = fs.readFileSync(__dirname + '/template.hbs').toString('utf8');
    const template = hb.compile(templateSource)
    return template(csSchema);
}

module.exports = {
    fromSchemas,
    generateCode,
    CsType
}