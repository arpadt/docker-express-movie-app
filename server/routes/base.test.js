const chai = require('chai');
const chaiHttp = require('chai-http');

const { app } = require('../server');

const { expect, request } = chai.use(chaiHttp);

describe('GET /', () => {
  it('returns a basic response string', async () => {
    const response = await request(app)
      .get('/');

    expect(response.status).to.equal(200);
    expect(response.text).to.equal('Landing page works.');
  });
});
