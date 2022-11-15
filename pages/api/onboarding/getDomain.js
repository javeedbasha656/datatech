// import { getSession } from 'next-auth/react'
import _ from 'lodash'
import { dbConnection } from '../../../services/db_connections'
import { dbQueries } from '../../../services/common'
import moment from 'moment'

async function handler(req, res) {

    if (req.method == 'GET') {
        try {
            let queryData = await dbQueries()
            let query = queryData.getDomain

            let connPool = await dbConnection(query)
            let result = await connPool.request().query(query);
            connPool.close()
            // console.log("End time: ", moment().format('DD-MM-YYYY hh:mm:ss'))

            let domainList = result.recordset
            if (_.isArray(domainList) && domainList.length > 0) {
                res.status(200).json({ message: 'Success', domainList: domainList })
            } else {
                res.status(200).json({ message: 'Data not found', domainList: [] })
            }
        } catch (err) {
            console.log("Err: ", err)
            res.status(500).json({ message: 'Something went wrong...please try again later' })
        }
    }
    else {
        res.status(500).json({ message: 'Only GET request allowed' })
    }

}



export default handler;