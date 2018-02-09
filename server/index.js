const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

const AddressCountTable = require('./address-count-table')
const data = new AddressCountTable()
const verifySig = require('./verify-sig')

app.use(cors())
app.use(bodyParser.json())

app.post('/login', (req, res) => {
  const { sig, address } = req.body
  const verified = verifySig(sig, address)
  if (!verified) {
    res.status(403).json({ error: 'unauthorized', msg: 'The signature does not match the address' })
  } else {
    data.create(address)
    res.json({ success: true })
  }
})

app.get('/user/:address/count', (req, res) => {
  const { sig, address } = req.query
  const verified = verifySig(sig, address)
  if (!verified) {
    res.status(403).json({ error: 'unauthorized', msg: 'The signature does not match the address' })
  } else {
    const count = data.get(address)
    res.json({ count })
  }
})

app.listen(5000, () => console.log('Example app listening on port 5000!'))
