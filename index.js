const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.listen(3000, () => {
  console.log(`Backend is running in 3000`)
})