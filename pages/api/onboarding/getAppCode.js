// import { getSession } from 'next-auth/react'
import _ from 'lodash'
import { dbConnection } from '../../../services/db_connections'
import { dbQueries } from '../../../services/common'
import moment from 'moment'

async function handler(req, res) {

    if (req.method == 'POST') {
        let body = req.body
        let domain = body.domain
        let subDomain = body.subDomain
        if (domain && subDomain) {
            try {
                // Get sql queries
                let queries = await dbQueries()
                let query = queries.getAppCodes
                // fetch data from db
                let connPool = await dbConnection()
                let result = await connPool.request()
                    .input('domain', domain)
                    .input('subDomain', subDomain)
                    .query(query);

                connPool.close()
                // console.log("End time: ", moment().format('DD-MM-YYYY hh:mm:ss'))
                let appCodeList = result.recordset

                if (_.isArray(appCodeList) && appCodeList.length > 0) {
                    res.status(200).json({ message: 'Success', data: appCodeList })
                } else {
                    res.status(200).json({ message: 'Data not found', data: [] })
                }
            } catch (err) {
                console.log("Err: ", err)
                res.status(500).json({ message: 'Something went wrong...please try again later' })
            }
        } else {
            res.status(500).json({ message: 'Invalid domain or subDomain passed' })
        }

    } else {
        res.status(500).json({ message: 'Only POST request allowed' })
    }

}

export default handler