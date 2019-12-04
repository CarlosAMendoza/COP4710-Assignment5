import * as express from 'express'
import { connect } from './config'

const modifyRoutes = express.Router()

modifyRoutes.post('/modify/book/:bookCode', (req, res) => {
    const connection = connect

    const query = 'UPDATE BOOK SET ' +
    'title = \'' + req.body.title + '\', ' +
    'publisherCode = \'' + req.body.publisherCode + '\', ' +
    'type = \'' + req.body.type + '\', ' +
    'paperback = \'' + req.body.paperback + '\' ' +
    'WHERE bookCode = \'' + req.params.bookCode + '\''

    connection.query(query, (err, rows, fields) => {
        if (err) {
            console.log('Failed Query for users ' + err)
            res.send({modified: false})
            return
        }
        console.log('Modified Data')
        res.send({modified: true})
    })
})

modifyRoutes.post('/modify/pub/:pubCode', (req, res) => {
    const connection = connect

    const query = 'UPDATE Publisher SET ' +
    'publisherName = \'' + req.body.publisherName + '\', ' +
    'city = \'' + req.body.city + '\' ' +
    'WHERE publisherCode = \'' + req.params.pubCode + '\''

    connection.query(query, (err, rows, fields) => {
        if (err) {
            console.log('Failed Query for users ' + err)
            res.send({modified: false})
            return
        }
        console.log('Modified Data')
        res.send({modified: true})
    })
})

modifyRoutes.post('/modify/author/:authorNum', (req, res) => {
    const connection = connect

    const query = 'UPDATE Author SET ' +
    'authorLast = \'' + req.body.authorLast + '\', ' +
    'authorFirst = \'' + req.body.authorFirst + '\' ' +
    'WHERE authorNum = ' + req.params.authorNum

    connection.query(query, (err, rows, fields) => {
        if (err) {
            console.log('Failed Query for users ' + err)
            res.send({modified: false})
            return
        }
        console.log('Modified Data')
        res.send({modified: true})
    })
})

modifyRoutes.post('/modify/copy/:copyNum/:bookCode/:branchNum', (req, res) => {
    const connection = connect

    const query = 'UPDATE Copy SET ' +
    'quality = \'' + req.body.quality + '\', ' +
    'price = \'' + req.body.price + '\' ' +
    'WHERE bookCode = \'' + req.params.bookCode + '\' AND ' +
    'branchNum = ' + req.params.branchNum + ' AND ' +
    'copyNum =' + req.params.copyNum

    connection.query(query, (err, rows, fields) => {
        if (err) {
            console.log('Failed Query for users ' + err)
            res.send({modified: false})
            return
        }
        console.log('Modified Data')
        res.send({modified: true})
    })
})

export {modifyRoutes}
