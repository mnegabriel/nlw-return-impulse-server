import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('kkk')
})

app.listen(3333, () => {
  console.log('! http server running')
})