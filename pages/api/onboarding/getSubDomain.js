// import { getSession } from 'next-auth/react'
import _ from 'lodash'
import { dbConnection } from '../../../services/db_connections'
import { dbQueries } from '../../../services/common'
import moment from 'moment'

async function handler(req, res) {

    if (req.method == 'POST') {
        let body = req.body
        let domain = body.domain
        if (domain) {
            let queries = await dbQueries()
            let query = queries.getSubDomain
            // console.log("Query: ", query)

            let connPool = await dbConnection()
            let result = await connPool.request()
                .input('domain', domain)
                .query(query);

            connPool.close()
            console.log("End time: ", moment().format('DD-MM-YYYY hh:mm:ss'))
            let subDomainList = result.recordset

            if (_.isArray(subDomainList) && subDomainList.length > 0) {
                res.status(200).json({ message: 'Success', data: subDomainList })
            } else {
                res.status(200).json({ message: 'Data not found', data: [] })
            }
        } else {
            res.status(500).json({ message: 'Invalid domain passed' })
        }

    } else {
        res.status(500).json({ message: 'Only POST request allowed' })
    }

}

export default handler