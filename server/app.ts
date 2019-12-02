import * as express from 'express'
import * as mysql from 'mysql'
import {getAll} from './getAll'

const app = express()

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(getAll)

app.listen(4001, () => console.log('Server Running'))

