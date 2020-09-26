// to run:
// be in Desktop/js4ds-notes (!!!update this!!!!)
// npm test -- capstone/follow-along/back/test-server.js
const path = require('path')
const assert = require('assert')
const request = require('supertest')
const DataManager = require('./data-manager')
const make_server = require('./server-0')

TEST_DATA_PATH = path.resolve(__dirname, 'test-data.csv')

describe('server', () => {

  it('should return statistics about survey data', (done) => {
    /*expected = { // original. causes error. submitted issue.
      minYear: 1979,
      maxYear: 2000,
      count: 10
    }*/
    expected = {
        year_low: 1979,
        year_high: 2000,
        record_count: 10
    }
    const db = new DataManager(TEST_DATA_PATH)
    const server = make_server(db)
    request(server)
      .get('/survey/stats')
      .expect(200)
      .expect('Content-Type', 'application/json')
      .end((err, res) => {
        //assert.deepEqual(res.body, expected, '')
        assert.deepStrictEqual(res.body, expected, '')
        done()
      })
  })
})