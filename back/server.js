const express = require('express')
const cors = require('cors')

let dataManager = null

const app = express()
app.use(cors())

// get survey statistics
app.get('/survey/stats', (req, res, next) => {
  const data = dataManager.getSurveyStats()
  res.setHeader('Content-Type', 'application/json')
  res.status(200).send(data)
})

// get a slice of the survey data
app.get('/survey/:start/:end', (req, res, next) => {
  const start = parseInt(req.params.start)
  const end = parseInt(req.params.end)
  // check dates are valid
  // this is brittle but it gets the point across
  if (start < 1977 || end > 2002) {
    const text = 'please specify dates between 1977 and 2002.'
    page = `<html><body><p>error: ${text}</p></body><html>`
    res.status(400).send(page)
  } else {
    const data = dataManager.getSurveyRange(start, end)
    res.setHeader('Content-Type', 'application/json')
    res.status(200).send(data)
  }
})

// nothing else worked
app.use((req, res, next) => {
  page = `<html><body><p>error: "${req.url}" not found</p></body></html>`
  res.status(404)
     .send(page)
})

module.exports = (dbm) => {
  dataManager = dbm
  return app
}