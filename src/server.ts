import express from 'express'
import cors from 'cors'
import { routes } from './routes'

const app = express()

app.use(cors({
  origin: process.env.FRONT_URL
}))

app.use(express.json())

app.use(routes)

app.listen(3333, () => {
  console.log('! http server running on port:' + 3333)
})