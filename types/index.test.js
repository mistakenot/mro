const Type = require('./').Type;

test('Type.isRow', () => {
    const type = Type.ROW_OF({id: Type.INT});
    expect(Type.isRow(type)).toEqual({id: Type.INT})
})