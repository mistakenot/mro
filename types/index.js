const Type = {
    INT: 'int',
    BIGINT: 'bigint',
    STRING: 'string',
    BOOL: 'bool',
    TIMESTAMP: 'timestamp',
    ARRAY_OF: (type) => `array[${type}]`,
    SET_OF: (type) => `set[${type}]`,
    ROW_OF: (types) => `row[${JSON.stringify(types)}]`,

    isArray: (type) => {
        const match = type.match(/^array\[(.*?)\]$/)
        return (match && match[1]);
    },
    isSet: (type) => type.match(/^set\[(.*?)\]$/),
    isRow: (type) => {
        const innerTypeHash = type.match(/^row\[(.*?)\]$/)

        if (!innerTypeHash) {
            return null;
        }

        return JSON.parse(innerTypeHash[1]);
    }
}


module.exports = {
    Type
}