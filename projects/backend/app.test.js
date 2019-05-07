const request = require('supertest');
const app = require('./app');

describe('Test the links path', () => {
    test('It should response the GET /links method with 401 status', (done) => {
        return request(app).get('/links').then((response) => {
            expect(response.statusCode).toBe(401);
            done();
        });
    });

    test('It should response the GET /links/:link method with 404 status', (done) => {
        return request(app).get('/links/123456').then((response) => {
            expect(response.statusCode).toBe(404);
            done();
        });
    });

    test('It should response the POST /links method with 400 status', (done) => {
        return request(app).post('/links').then((response) => {
            expect(response.statusCode).toBe(400);
            done();
        });
    });

    test('It should response the DELETE /links/:id method with 401 status', (done) => {
        return request(app).delete('/links/123456789').then((response) => {
            expect(response.statusCode).toBe(401);
            done();
        });
    });
});
