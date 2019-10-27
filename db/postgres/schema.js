var Type = require('../../types/index').Type;

const PType = {
    16: Type.BOOL,
    17: Type.ARRAY_OF(Type.BYTE),
    23: Type.INT,
    25: Type.STRING,
    114: Type.JSON,
    1007: Type.ARRAY_OF(Type.INT),
    1043: Type.STRING,
    1114: Type.TIMESTAMP,
    2249: "record"
}

function getSchemaFromRow(row) {
    var args = {}
    var argnames = row.argnames;
    var argtypes = row.argtypes.split(' ');

    for (var i = 0; i < row.numberofargs; i++) {
        let typeId = parseInt(argtypes[i])
        args[argnames[i]] = PType[typeId];
    }

    let result = {
        name: row.name,
        schema: row.schema,
        returns: PType[row.returntype],
        args
    }


    if (result.returns === "record") {
        var recordTypes = {};

        for (var i = row.numberofargs; i < row.allreturntypes.length; i++) {
            let name = row.argnames[i];
            let type = PType[row.allreturntypes[i]];
            recordTypes[name] = type;
        }

        result.returns = Type.ROW_OF(recordTypes);
    }

    return result;
}

module.exports = getSchemaFromRow;