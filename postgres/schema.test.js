const getSchemaFromRow = require('./schema');
const Type = require('../types').Type;

test('add_two_ints', () => {
    const row = {
        schema: 'public',
        name: 'add_two_ints',
        returntype: 23,
        allreturntypes: null,
        returnsset: false,
        numberofargs: 2,
        argtypes: '23 23',
        argnames: [ 'a', 'b' ]
    };

    const expected = {
        schema: 'public',
        name: 'add_two_ints',
        returns: Type.INT,
        args: {
            a: Type.INT,
            b: Type.INT
        }
    }

    const actual = getSchemaFromRow(row);
    
    expect(actual).toEqual(expected);
});

test('concat_two_text_strings generates', () => {
    const row = {
        schema: 'public',
        name: 'concat_two_text_strings',
        returntype: 25,
        allreturntypes: null,
        returnsset: false,
        numberofargs: 2,
        argtypes: '25 25',
        argnames: [ 'a', 'b' ]
    };

    const expected = {
        schema: 'public',
        name: 'concat_two_text_strings',
        returns: Type.STRING,
        args: {
            a: Type.STRING,
            b: Type.STRING
        }
    }

    const actual = getSchemaFromRow(row);
    
    expect(actual).toEqual(expected);
});

test('and_two_booleans', () => {
    const row = {
        schema: 'public',
        name: 'and_two_booleans',
        returntype: 16,
        allreturntypes: null,
        returnsset: false,
        numberofargs: 2,
        argtypes: '16 16',
        argnames: [ 'a', 'b' ]
    }

    const expected = {
        name: 'and_two_booleans',
        schema: 'public',
        returns: Type.BOOL,
        args: {
            a: Type.BOOL,
            b: Type.BOOL
        }
    }

    const actual = getSchemaFromRow(row);

    expect(actual).toEqual(expected)
})

test('concat_two_int_arrays_returns_int_array', () => {
    const row = {
        schema: 'public',
        name: 'concat_two_int_arrays_returns_int_array',
        returntype: 1007,
        allreturntypes: null,
        returnsset: false,
        numberofargs: 2,
        argtypes: '1007 1007',
        argnames: [ 'a', 'b' ]
    }

    const expected = {
        schema: 'public',
        name: 'concat_two_int_arrays_returns_int_array',
        returns: Type.ARRAY_OF(Type.INT),
        args: {
            a: Type.ARRAY_OF(Type.INT),
            b: Type.ARRAY_OF(Type.INT)
        }
    }

    const actual = getSchemaFromRow(row);

    expect(actual).toEqual(expected)
})

test('concat_two_varchar_strings', () => {
    const row = {
        schema: 'public',
        name: 'concat_two_varchar_strings',
        returntype: 1043,
        allreturntypes: null,
        returnsset: false,
        numberofargs: 2,
        argtypes: '1043 1043',
        argnames: [ 'a', 'b' ]
    }

    const expected = {
        schema: 'public',
        name: 'concat_two_varchar_strings',
        returns: Type.STRING,
        args: {
            a: Type.STRING,
            b: Type.STRING
        }
    }

    expect(getSchemaFromRow(row)).toEqual(expected);
})

test('create_and_return_employee', () => {
    const row = {
        schema: 'public',
        name: 'create_and_return_employee',
        returntype: 2249,
        allreturntypes: [
            23, 25, 25, 1114,
            23, 25, 25,   25,
            1114
        ],
        returnsset: true,
        numberofargs: 4,
        argtypes: '23 25 25 1114',
        argnames: [
        '_id',         '_firstname',
        '_secondname', '_dob',
        'id',          'firstname',
        'secondname',  'fullname',
        'dob'
        ]
    }

    const expected = {
        schema: 'public',
        name: 'create_and_return_employee',
        returns: Type.ROW_OF([Type.INT, Type.STRING, Type.STRING, Type.STRING, Type.TIMESTAMP]),
        args: {
            _id: Type.INT,
            _firstname: Type.STRING,
            _secondname: Type.STRING,
            _dob: Type.TIMESTAMP
        }
    }

    expect(getSchemaFromRow(row)).toEqual(expected);
})


const testRows = [
    {
        schema: 'public',
        name: 'add_two_ints',
        returntype: 23,
        allreturntypes: null,
        returnsset: false,
        numberofargs: 2,
        argtypes: '23 23',
        argnames: [ 'a', 'b' ]
    },
    {
        schema: 'public',
        name: 'concat_two_text_strings',
        returntype: 25,
        allreturntypes: null,
        returnsset: false,
        numberofargs: 2,
        argtypes: '25 25',
        argnames: [ 'a', 'b' ]
    },
    {
        schema: 'public',
        name: 'concat_two_int_arrays_returns_int_array',
        returntype: 1007,
        allreturntypes: null,
        returnsset: false,
        numberofargs: 2,
        argtypes: '1007 1007',
        argnames: [ 'a', 'b' ]
    },
    {
        schema: 'public',
        name: 'create_and_return_employee',
        returntype: 2249,
        allreturntypes: [
            23, 25, 25, 1114,
            23, 25, 25,   25,
        1114
        ],
        returnsset: true,
        numberofargs: 4,
        argtypes: '23 25 25 1114',
        argnames: [
        '_id',         '_firstname',
        '_secondname', '_dob',
        'id',          'firstname',
        'secondname',  'fullname',
        'dob'
        ]
    },
    {
        schema: 'public',
        name: 'and_two_booleans',
        returntype: 16,
        allreturntypes: null,
        returnsset: false,
        numberofargs: 2,
        argtypes: '16 16',
        argnames: [ 'a', 'b' ]
    },
    {
        schema: 'public',
        name: 'concat_two_varchar_strings',
        returntype: 1043,
        allreturntypes: null,
        returnsset: false,
        numberofargs: 2,
        argtypes: '1043 1043',
        argnames: [ 'a', 'b' ]
    },
    {
        schema: 'public',
        name: 'take_int_return_int',
        returntype: 23,
        allreturntypes: null,
        returnsset: false,
        numberofargs: 1,
        argtypes: '23',
        argnames: [ 'val' ]
    },
    {
        schema: 'public',
        name: 'concat_two_int_arrays_returns_int_set',
        returntype: 23,
        allreturntypes: [ 1007, 1007, 23 ],
        returnsset: true,
        numberofargs: 2,
        argtypes: '1007 1007',
        argnames: [ 'a', 'b', 'i' ]
    }];