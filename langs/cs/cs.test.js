const {CsType, fromSchemas, generateCode, convertType} = require('./cs');
const Type = require('../../types').Type;

test('convertType int to int', () => {
    expect(convertType(Type.INT)).toEqual('int');
});

test('convertType string to string', () => {
    expect(convertType(Type.STRING)).toEqual('string');
});

test('convertType bool to bool', () => {
    expect(convertType(Type.BOOL)).toEqual('bool')
});

test('convertType int array', () => {
    expect(convertType(Type.ARRAY_OF(Type.INT))).toEqual('int[]');
})

test('convertType string array', () => {
    expect(convertType(Type.ARRAY_OF(Type.STRING))).toEqual('string[]');
})

test('convertType array[bool] to bool[]', () => {
    expect(convertType(Type.ARRAY_OF(Type.BOOL))).toEqual('bool[]');
})

test('convertType ROW[id int, name string] to class(int id, string name)', () => {
    expect(convertType(Type.ROW_OF({id: Type.INT, name: Type.STRING}))).toEqual("class({\"id\":\"int\",\"name\":\"string\"})")
})

test('CsType.isClass', () => {
    const type = CsType.CLASS_OF({id: CsType.INT});
    expect(CsType.isClass(type)).toEqual({id: CsType.INT});
})

test('fromSchema add_two_ints', () => {
    const schemas = [{
        schema: 'public',
        name: 'add_two_ints',
        returns: Type.INT,
        args: {
            a: Type.INT,
            b: Type.INT
        }
    }]

    const actual = fromSchemas(schemas, {});

    const expected = {
        namespace: 'Mro',
        types: [],
        methods: [
            {
                name: 'AddTwoInts',
                returns: 'int',
                args: [
                    {name: 'a', type: 'int'},
                    {name: 'b', type: 'int'}
                ],
                schema: schemas[0]
            }
        ]
    }

    expect(actual).toEqual(expected);
});

test('fromSchema concat_two_text_strings', () => {
    const schemas = [{
        schema: 'public',
        name: 'concat_two_text_strings',
        returns: Type.STRING,
        args: {
            a: Type.STRING,
            b: Type.STRING
        }
    }]

    const actual = fromSchemas(schemas, {});

    const expected = {
        namespace: 'Mro',
        types: [],
        methods: [
            {
                name: 'ConcatTwoTextStrings',
                returns: 'string',
                args: [
                    {name: 'a', type: 'string'},
                    {name:'b', type: 'string'}
                ],
                schema: schemas[0]
            }
        ]
    }

    expect(actual).toEqual(expected);
})

test('fromSchema create_and_return_employee', () => {
    const schemas = [{
        schema: 'public',
        name: 'create_and_return_employee',
        returns: Type.ROW_OF({id: Type.INT, firstname: Type.STRING, secondname: Type.STRING, fullname: Type.STRING, dob: Type.TIMESTAMP}),
        args: {
            _id: Type.INT,
            _firstname: Type.STRING,
            _secondname: Type.STRING,
            _dob: Type.TIMESTAMP
        }
    }]

    const actual = fromSchemas(schemas, {});

    const expected = {
        namespace: 'Mro',
        types: [{
            name: 'CreateAndReturnEmployeeResult',
            properties: {
                firstname: CsType.STRING,
                fullname: CsType.STRING,
                id: CsType.INT,
                secondname: CsType.STRING
            }
        }],
        methods: [
            {
                name: 'CreateAndReturnEmployee',
                returns: 'CreateAndReturnEmployeeResult',
                args: [
                    {name: '_id', type: 'int'},
                    {name:'_firstname', type: 'string'},
                    {name: '_secondname', type: 'string'},
                    {name: '_dob', type: undefined}
                ],
                schema: schemas[0]
            }
        ]
    }

    expect(actual).toEqual(expected);
})

test('generateCode concat_two_text_strings', () => {
    const csSchema = {
        namespace: 'Mro',
        types: [{
            name: 'ConcatTwoTextStringsAsRowResult',
            properties: {value: CsType.STRING}
        }],
        methods: [
            {
                name: 'ConcatTwoTextStrings',
                returns: 'string',
                args: [
                    {name: 'a', type: 'string'},
                    {name: 'b', type: 'string'}
                ],
                schema: {
                    schema: 'public',
                    name: 'concat_two_text_strings',
                    returns: Type.STRING,
                    args: {
                        a: Type.STRING,
                        b: Type.STRING
                    }
                }
            },
            {
                name: 'ConcatTwoTextStringsAsRow',
                returns: 'ConcatTwoTextStringsAsRowResult',
                args: [
                    {name: 'a', type: 'string'},
                    {name: 'b', type: 'string'}
                ],
                schema: {
                    schema: 'public',
                    name: 'concat_two_text_strings',
                    returns: Type.STRING,
                    args: {
                        a: Type.STRING,
                        b: Type.STRING
                    }
                }
            }
        ]
    }

    const actual = generateCode(csSchema) 
    const expected = `namespace Mro
{
    // Install dapper using:
    //  dotnet add package dapper
    using System;
    using System.Data;
    using System.Threading.Tasks;
    using Dapper;

    // Class Definitions
    public class ConcatTwoTextStringsAsRowResult {
        public string Value { get; set; }
    }

    public static class MroDbConnectionExtensions
    {
        public static Task<string> ConcatTwoTextStrings(this IDbConnection db, string a, string b)
            => db.ExecuteScalarAsync<string>("select public.concat_two_text_strings(@a, @b)", new { a, b });

        public static Task<ConcatTwoTextStringsAsRowResult> ConcatTwoTextStringsAsRow(this IDbConnection db, string a, string b)
            => db.ExecuteScalarAsync<ConcatTwoTextStringsAsRowResult>("select public.concat_two_text_strings(@a, @b)", new { a, b });

    }
}`
    expect(actual).toEqual(expected);
})