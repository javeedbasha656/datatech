import { getSession } from 'next-auth/react'
import { queries } from '../../../services/dbQueries'
import _ from 'lodash'
import { dbConnection } from '../../../services/db_connections'


async function handler(req, res) {
    if (req.method == 'GET') {
        const session = await getSession({ req })
        if (!session) {
            res.status(401).json({ error: 'Unauthenticated user' })
        }

        let query = queries.getEmp
        let dataList = await dbConnection(query)

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