const {CsType, fromSchemas, generateCode} = require('./cs');
const Type = require('../../types').Type;

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

test('generateCode concat_two_text_strings', () => {
    const csSchema = {
        namespace: 'Mro',
        types: [],
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
            }
        ]
    }

    const actual = generateCode(csSchema) 
    const expected = `namespace Mro
{
    // Install dapper using:
    //  dotnet add package dapper
    using Dapper;

    // Class Definitions

    public static class MroDbConnectionExtensions
    {
        public static async Task<string> ConcatTwoTextStrings(this IDbConnection db, string a, string b)
            => db.ExecuteScalarAsync<string>("select public.concat_two_text_strings(@a, @b)", new { a, b });
    }
}`
    expect(actual).toEqual(expected);
})