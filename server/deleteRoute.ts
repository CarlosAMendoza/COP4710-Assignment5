import * as express from 'express'
import { connect } from './config'

const deleteRoutes = express.Router()

deleteRoutes.delete('/delete/book/:bookCode', (req, res) => {
    const connection = connect

    const query = 'DELETE FROM BOOK WHERE bookCode = \'' + req.params.bookCode + '\''

    connection.query(query, (err, rows, fields) => {
        if (err) {
            console.log('Failed Query for users ' + err)
            res.send({deleted: false})
            return
        }
        console.log('Deleted Data')
        res.send({deleted: true})
    })
})

deleteRoutes.delete('/delete/pub/:pubCode', (req, res) => {
    const connection = connect

    const query = 'DELETE FROM Publisher WHERE publisherCode = \'' + req.params.pubCode + '\''

    connection.query(query, (err, rows, fields) => {
        if (err) {
            console.log('Failed Query for users ' + err)
            res.send({deleted: false})
            return
        }
        console.log('Deleted Data')
        res.send({deleted: true})
    })
})

deleteRoutes.delete('/delete/author/:authorNum', (req, res) => {
    const connection = connect

    const query = 'DELETE FROM Author WHERE authorNum = \'' + req.params.authorNum + '\''

    connection.query(query, (err, rows, fields) => {
        if (err) {
            console.log('Failed Query for users ' + err)
            res.send({deleted: false})
            return
        }
        console.log('Deleted Data')
        res.send({deleted: true})
    })
})

deleteRoutes.delete('/delete/copy/:copyNum/:bookCode/:branchNum', (req, res) => {
    const connection = connect

    const query = 'DELETE FROM Copy WHERE ' +
    'bookCode = \'' + req.params.bookCode + '\' AND ' +
    'branchNum = ' + req.params.branchNum + ' AND ' +
    'copyNum = ' + req.params.copyNum

    connection.query(query, (err, rows, fields) => {
        if (err) {
            console.log('Failed Query for users ' + err)
            res.send({deleted: false})
            return
        }
        console.log('Deleted Data')
        res.send({deleted: true})
    })
})

export { deleteRoutes }
