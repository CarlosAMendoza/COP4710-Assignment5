import * as express from 'express'
import * as mysql from 'mysql'
import {connect} from './config'

const getAll = express.Router()

getAll.get('/allbooks', (req, res) => {
    const connection = connect

    connection.query('Select * From BOOK', (err, rows, fields) => {
        if (err) {
            console.log('Failed Query for users ' + err)
            res.end()
            return
        }

        console.log('Fetched Data')
        res.json(rows)
    })
})

getAll.get('/allpubs', (req, res) => {
    const connection = connect

    connection.query('Select * From Publisher', (err, rows, fields) => {
        if (err) {
            console.log('Failed Query for users ' + err)
            res.end()
            return
        }

        console.log('Fetched Data')
        res.json(rows)
    })
})

getAll.get('/allcopies', (req, res) => {
    const connection = connect

    connection.query('Select * From Copy', (err, rows, fields) => {
        if (err) {
            console.log('Failed Query for users ' + err)
            res.end()
            return
        }

        console.log('Fetched Data')
        res.json(rows)
    })
})

getAll.get('/allauthors', (req, res) => {
    const connection = connect

    connection.query('Select * From Author', (err, rows, fields) => {
        if (err) {
            console.log('Failed Query for users ' + err)
            res.end()
            return
        }

        console.log('Fetched Data')
        res.json(rows)
    })
})

export {getAll}

