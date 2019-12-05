import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as mysql from 'mysql'
import {getAll} from './getAll'
import { connect } from './config'
import { deleteRoutes } from './deleteRoute'
import { modifyRoutes } from './modifyRoute'
import { insertRoutes } from './insertRoute'
import { stringify } from 'querystring'
import { send } from 'q'


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

app.get('/search/:title', (req, res) => {
    const connection = connect
    type search  = [{bookCode: string, title: string, publisherCode: string, publisherName: string, city: string,
        inventory: [{branchNum: number, onHand: number, branchName: string, branchLocation: string}]}]

    // const query = 'Select * FROM Book JOIN (Select * FROM Publisher) t1 using(publisherCode) WHERE title LIKE \'%'
    //  + req.params.title + '%\''

    const query = 'Select bookCode, publisherCode, title, type, paperback, publisherName, city, ' +
    'group_concat((CONCAT(authorFirst,\' \', authorLast)) SEPARATOR \', \') as authors FROM Book JOIN ' +
    '(Select * FROM Publisher) t1 using(publisherCode) JOIN (Select * from wrote join (select * from author) ' +
    't2 using(authorNum)) t3 using(bookCode) where title like \'%' + req.params.title + '%\' group by bookCode'

    connection.query(query, (err, rows: search, fields) => {
        if (err) {
            console.log('Failed Query for users ' + err)
            res.end()
            return
        }

        rows.forEach((element, index, arr) => {
            // const subquery = 'Select BranchNum as branchNum, OnHand as onHand from book join (select * from inventory) ' +
            //  ' t1 using(bookCode) where bookCode = ' + element.bookCode
            const subquery = 'Select BranchNum as branchNum, OnHand as onHand, branchName, branchLocation from book ' +
            'join (select * from inventory join (select * from Branch) as t2 using(branchNum) ) t1 using(bookCode) where bookCode = \''
             + element.bookCode + '\''
            connection.query(subquery, (err2, rows2: [{branchNum: number, onHand: number, branchName: string, branchLocation: string}],
                                        fields2) => {
                if (err2) {
                    console.log('Failed Query for users ' + err2)
                    res.end()
                    return
                }
                rows[index].inventory = rows2

                if (index === arr.length - 1) {
                    console.log('Searched Data')
                    res.send(rows)
                }
            })
        })

    })
})

app.listen(4001, () => console.log('Server Running'))

