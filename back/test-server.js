
const assert = require('assert')
const request = require('supertest')
const DataManager = require('./data-manager')
const make_server = require('./server')

TEST_DATA_PATH = './data/test-data.csv'

describe('server', () => {

  it('should return statistics about survey data', (done) => {
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
        assert.deepStrictEqual(res.body, expected, '')
        done()
      })
  })

  it('should 400 if given invalid date range', (done) => {
    const db = new DataManager(TEST_DATA_PATH)
    const server = make_server(db)
    request(server)
      .get('/survey/1979/2009') // 2009 outside range
      .expect(400)
      .end((err, res) => {
          assert(res.text.includes('error', 'Has an error message'))
          done()
      })
  })

  it('should 404 for other pages', (done) => {
    const db = new DataManager(TEST_DATA_PATH)
    const server = make_server(db)
    request(server)
      .get('/blah')
      .expect(404)
      .end((err, res) => {
          assert(res.text.includes('error', 'Has an error message'))
          done()
      })
  })


})