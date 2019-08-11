const Type = {
    INT: 'int',
    BIGINT: 'bigint',
    STRING: 'string',
    BOOL: 'bool',
    TIMESTAMP: 'timestamp',
    ARRAY_OF: (type) => `array[${type}]`,
    SET_OF: (type) => `set[${type}]`,
    ROW_OF: (types) => `row[${types.join(',')}]`,

    isArray: (type) => type.match(/^array\[(.*?)\]$/),
    isSet: (type) => type.match(/^set\[(.*?)\]$/),
    isRow: (type) => type.match(/^row\[(.*?)\]$/)
}


module.exports = {
    Type
}