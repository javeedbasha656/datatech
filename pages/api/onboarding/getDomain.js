// import { getSession } from 'next-auth/react'
import _ from 'lodash'
import { dbConnection } from '../../../services/db_connections'
import { dbQueries } from '../../../services/common'
import logger from '../../../services/logger'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid';


async function handler(req, res) {
    let uuid = uuidv4()
    if (req.method == 'GET') {
        try {
            let result, query
            let domainCode = req.query.domain
            // logger(uuid, 'Step 1 - Get Domain Api called', '', req.method, '')
            let queryData = await dbQueries()
            let connPool = await dbConnection(query)
            if (domainCode) {
                query = queryData.getDomainByCode
                result = await connPool.request().input('domainCode', domainCode).query(query);
            }
            else {
                query = queryData.getDomain
                result = await connPool.request().query(query);
            }
            connPool.close()
            // logger(uuid, 'Step 2 - Db query fetched', '', query, result)

            let domainList = result.recordset
            if (_.isArray(domainList) && domainList.length > 0) {
                logger(uuid, 'Step 3 - Fetched data from db', '', query, domainList)
                res.status(200).json({ message: 'Success', data: domainList })
            } else {
                logger(uuid, 'Step 3 - Data not found from db', '', query, domainList)
                res.status(200).json({ message: 'Data not found', data: [] })
            }
        } catch (err) {
            logger(uuid, 'Step 4 - Data not found from db', JSON.stringify(err), '', '')
            res.status(500).json({ message: 'Something went wrong...please try again later' })
        }
    }
    else {
        res.status(500).json({ message: 'Only GET request allowed' })
    }

}



export default handler;