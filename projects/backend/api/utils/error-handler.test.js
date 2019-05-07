const errorHandler = require('./error-handler');

test('should return http status 400', () => {
    const errors = [];
    const req = {
        status: () => {
            return {
                send: (payload) => {
                    return payload;
                }
            };
        }
    };
    expect(errorHandler(req, errors)).toEqual({errors});
});
