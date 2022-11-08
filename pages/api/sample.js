// import { getSession } from 'next-auth/react'
import _ from 'lodash'
import { dbConnection } from '../../services/db_connections'
import { dbQueries } from '../../services/common'
import moment from 'moment'

async function handler(req, res) {
    if (req.method == 'GET') {
        // const session = await getSession({ req })
        // if (!session) {
        //     res.status(401).json({ error: 'Unauthenticated user' })
        // }
        let queryData = await dbQueries()
        let query = queryData.getAppList
        let connPool = await dbConnection()
        let result = await connPool.request().query(query);
        connPool.close()
        console.log("End time: ", moment().format('DD-MM-YYYY hh:mm:ss'))
        let dataList = result.recordset

        if (_.isArray(dataList) && dataList.length > 0) {
            res.status(200).json({ message: 'Success', dataList: dataList })
        } else {
            res.status(200).json({ message: 'Data not found', dataList: [] })
        }
    }
    else {
        res.status(500).json({ message: 'Only GET request allowed' })
    }

}



export default handler;