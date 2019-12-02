import * as express from 'express'
import * as mysql from 'mysql'
import {getAll} from './getAll'

const app = express()
app.use(getAll)

app.listen(3001, () => console.log('Server Running'))
