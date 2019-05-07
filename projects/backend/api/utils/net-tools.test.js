const axios = require('axios');
const netTools = require('./net-tools');

jest.mock('axios');

test('should validate url with protocol', async () => {
    const req = { body: {
        url: 'http://localhost'
    }};
    const data = "<html><header><title>Test</title></header><body>Body</body></html>";
    const resp = { data };
    axios.get.mockResolvedValue(resp);
    await expect(netTools.validateUrl(req)).resolves.toEqual(true);
});

test('should validate url without protocol', async () => {
    const req = { body: {
        url: 'localhost'
    }};
    const data = "<html><header><title>Test</title></header><body>Body</body></html>";
    const resp = { data };
    axios.get.mockResolvedValue(resp);
    await expect(netTools.validateUrl(req)).resolves.toEqual(true);
});

test('should not validate url', async () => {
    const req = { body: {
        url: 'http://localhost'
    }};
    axios.get.mockImplementation(() => Promise.reject());
    await expect(netTools.validateUrl(req)).resolves.toEqual(false);
});
