const fs = require('fs');
const hb = require('handlebars');
const Type = require('../../types').Type;

const CsType = {
    [Type.INT]: 'int',
    [Type.STRING]: 'string',
    [Type.BOOL]: 'bool',
    INT: 'int',
    STRING: 'string',
    ARRAY_OF: (t) => `${t}[]`,
    CLASS_OF: (properties) => `class(${JSON.stringify(properties)})`,
    isClass: (type) => {
        const match = type.match(/^class\((.*?)\)$/)

        if (!match) {
            return null
        }

        return JSON.parse(match[1]);
    }
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

hb.registerHelper('property', function(property) {
    const key = Object.keys(property)[0]
    const type = property[key]
    return `public ${type} ${camelcase(key)} { get; set; }`
})

function camelcase(s) {
    return s.split('_').map(s => s[0].toUpperCase() + s.substring(1)).join('')
}

function convertType(fromType) {
    const simpleType = CsType[fromType];

    if (simpleType) {
        return simpleType;
    }

    const arrayType = Type.isArray(fromType);

    if (arrayType) {
        return CsType.ARRAY_OF(convertType(arrayType))
    }

    const rowType = Type.isRow(fromType)

    if (rowType) {
        const keys = Object.keys(rowType);
        const result = {}

        for (var i = 0; i < keys.length; i++) {
            const key = keys[i]
            const type = convertType(rowType[key])
            result[key] = type;
        }

        return CsType.CLASS_OF(result);
    }
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
            args.push({name: argName, type: convertType(schema.args[argName])})
        }

        let returnType = convertType(schema.returns);

        if (CsType.isClass(returnType)) {
            const properties = CsType.isClass(returnType);
            returnType = name + 'Result';
            result.types.push({name: returnType, properties})
        }

        result.methods.push({
            name: name,
            returns: returnType,
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
    convertType,
    CsType
}