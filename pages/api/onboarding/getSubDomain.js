// import { getSession } from 'next-auth/react'
import _ from 'lodash'
import { dbConnection } from '../../../services/db_connections'
import { dbQueries } from '../../../services/common'
import moment from 'moment'

// Api to fetch active subdomain records based on domain code
async function handler(req, res) {
    if (req.method == 'GET') {
        let domain = req.query.domain
        try {
            let result, query
            let queries = await dbQueries()
            let connPool = await dbConnection()

            if (req.query.domain && req.query.isActive) {
                query = queries.getSubDomainByStatus
                result = await connPool.request().input('domain', domain).input('isActive', 'Y').query(query);
            }
            else if (req.query.domain) {
                query = queries.getSubDomain
                result = await connPool.request().input('domain', domain).query(query);
            }
            else {
                query = queries.getSubDomainMstr
                result = await connPool.request().query(query);
            }

            connPool.close()

            let subDomainList = result.recordset
            if (_.isArray(subDomainList) && subDomainList.length > 0) {
                res.status(200).json({ message: 'Success', data: subDomainList })
            } else {
                res.status(200).json({ message: 'Data not found', data: [] })
            }
        } catch (err) {
            console.log("Err: ", err)
            res.status(500).json({ message: 'Something went wrong' })
        }

    } else {
        res.status(500).json({ message: 'Only GET request allowed' })
    }

}

export default handler