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

export {modifyRoutes}
