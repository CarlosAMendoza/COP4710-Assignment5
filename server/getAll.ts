import * as express from 'express'
import * as mysql from 'mysql'
import {connect} from './config'

const getAll = express.Router()

getAll.get('/', (req, res) => {
    let connection = connect

    connection.query("Select * From BOOK", (err, rows, fields) => {
        if (err) {
            console.log("Failed Query for users " + err)
            res.end()
            return
        }

        console.log("Fetched Data")
        res.json(rows)
    })
})




export {getAll}