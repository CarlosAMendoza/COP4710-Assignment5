import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as mysql from 'mysql'
import {getAll} from './getAll'
import { connect } from './config'
import { deleteRoutes } from './deleteRoute'
import { modifyRoutes } from './modifyRoute'
import { insertRoutes } from './insertRoute'


const app = express()
app.use(bodyParser())

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(getAll)

app.use(deleteRoutes)

app.use(modifyRoutes)

app.use(insertRoutes)

app.listen(4001, () => console.log('Server Running'))

