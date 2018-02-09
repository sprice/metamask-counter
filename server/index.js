const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

const AddressCountTable = require('./address-count-table')
const data = new AddressCountTable()
const verifySig = require('./verify-sig')

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({ status: 'online' })
})

app.post('/login', (req, res) => {
  console.log('login data', data)
  const { sig, address } = req.body
  const verified = verifySig(sig, address)

  if (!verified) {
    return res.status(403).json({ error: 'unauthorized', msg: 'The signature does not match the address' })
  }

  data.create(address)
  return res.json({ success: true })
})

app.get('/user/:address/count', (req, res) => {
  console.log('get data', data)
  const { sig, address } = req.query
  const verified = verifySig(sig, address)

  if (!verified) {
    return res.status(403).json({ error: 'unauthorized', msg: 'The signature does not match the address' })
  }

  if (!data.addressExists(address)) {
    return res.status(404).json({ error: 'not found' })
  }

  const count = data.get(address)
  return res.json({ count })
})

app.put('/user/:address/count', (req, res) => {
  console.log('put data', data)
  const { sig, address } = req.body
  const verified = verifySig(sig, address)

  if (!verified) {
    return res.status(403).json({ error: 'unauthorized', msg: 'The signature does not match the address' })
  }

  if (!data.addressExists(address)) {
    return res.status(404).json({ error: 'not found' })
  }

  const count = data.increment(address)
  res.json({ msg: 'count incremented', count })
})

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`API server running on port ${port}`))
