const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

let count = 0

app.get('/test', (req, res) => {
  count++
  res.json({ count })
})

app.listen(5000, () => console.log('Example app listening on port 5000!'))
