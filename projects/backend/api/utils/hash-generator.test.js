const hashGenerator = require('./hash-generator');

test('should generate hash with string "localhost"', () => {
    expect(hashGenerator("localhost")).toBeDefined();
});

test('should generate hash with empty string', () => {
    expect(hashGenerator()).toBeDefined();
});