const express = require('express')
const path = require('path')

const app = express()

app.set('port', 3000)

app.use((req, res, next) => {
  const host = req.get('host')
  const protocol = host.startsWith('localhost') ? 'http' : 'https'

  const origin = `${protocol}://${host}`

  res.set('Access-Control-Allow-origin', origin)
  // https://github.com/ampproject/amphtml/blob/6285cbe28b37bc4a2c5e54beb49b772f1cb74253/spec/amp-cors-requests.md#ensuring-secure-responses
  res.set('AMP-Access-Control-Allow-Source-Origin', origin)
  res.set(
    'Access-Control-Allow-Headers',
    'Origin, C-Requested-With, Content-Type, Accept'
  )
  res.set('Access-Control-Allow-Methods', 'GET, POST')
  res.set('Access-Control-Allow-Credential', 'true')
  next()
})

app.use(express.static(path.join(__dirname, 'dist')))

app.listen(app.get('port'), () => {
  console.log('Running on http://localhost:3000')
})
