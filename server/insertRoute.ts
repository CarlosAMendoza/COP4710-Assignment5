import * as express from 'express'
import { connect } from './config'

const insertRoutes = express.Router()

insertRoutes.post('/insert/book/:bookCode', (req, res) => {
    const connection = connect

    const query = 'INSERT INTO BOOK VALUES (' +
    '\'' + req.body.bookCode + '\', ' +
    '\'' + req.body.title + '\', ' +
    '\'' + req.body.publisherCode + '\', ' +
    '\'' + req.body.type + '\', ' +
    '\'' + req.body.paperback + '\') '

    connection.query(query, (err, rows, fields) => {
        if (err) {
            console.log('Failed Query for users ' + err)
            res.send({inserted: false})
            return
        }
        console.log('Insert Data')
        res.send({inserted: true})
    })
    console.log(query)
})

insertRoutes.post('/insert/pub/:pubCode', (req, res) => {
    const connection = connect

    const query = 'INSERT INTO Publisher VALUES (' +
    '\'' + req.body.publisherCode + '\', ' +
    '\'' + req.body.publisherName + '\', ' +
    '\'' + req.body.city + '\') '

    connection.query(query, (err, rows, fields) => {
        if (err) {
            console.log('Failed Query for users ' + err)
            res.send({inserted: false})
            return
        }
        console.log('Insert Data')
        res.send({inserted: true})
    })
    console.log(query)
})

insertRoutes.post('/insert/author/:authorNum', (req, res) => {
    const connection = connect

    const query = 'INSERT INTO Author VALUES (' +
    '\'' + req.body.authorNum + '\', ' +
    '\'' + req.body.authorLast + '\', ' +
    '\'' + req.body.authorFirst + '\') '

    connection.query(query, (err, rows, fields) => {
        if (err) {
            console.log('Failed Query for users ' + err)
            res.send({inserted: false})
            return
        }
        console.log('Insert Data')
        res.send({inserted: true})
    })
    console.log(query)
})

export {insertRoutes}
