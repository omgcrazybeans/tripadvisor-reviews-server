// Global Jest Methods: https://jestjs.io/docs/en/api
// Expect Jest Methods: https://jestjs.io/docs/en/expect
// Async Jest: https://jestjs.io/docs/en/asynchronous#callbacks
// http-terminator: https://expressjs.com/en/advanced/healthcheck-graceful-shutdown.html
// supertest: https://www.npmjs.com/package/supertest

const request = require('supertest'); // request - A module to test express.js server
const { createHttpTerminator } = require('http-terminator'); // http-terminator - A module to terminate http server
const { server } = require('../server/index.js'); // server - An express.js server

const httpTerminator = createHttpTerminator({ server });

describe('GET /id', () => {
  let id;

  // set `id` before testing
  beforeAll(() => {
    id = 0;
  });

  // terminate express.js server after testing
  afterAll(() => {
    httpTerminator.terminate();
  });

  test('responds with json', (done) => request(server)
    .get(`/reviews/${id}`)
    .expect('Content-Type', /json/)
    .expect(200, done));
});
