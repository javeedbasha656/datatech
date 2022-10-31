// import { getSession } from 'next-auth/react'
const _ = require('lodash');
import { dbConnection } from '../../../services/db_connections'


async function handler(req, res) {
    if (req.method == 'GET') {
        // const session = await getSession({ req })
        // if (!session) {
        //     res.status(401).json({ error: 'Unauthenticated user' })
        // }
        // console.log("Process: ", process.env.DB_URL)

        let query = `select * from SourceSetup.InfoDomain`
        let domainList = await dbConnection(query)

        if (_.isArray(domainList) && domainList.length > 0) {
            res.status(200).json({ message: 'Success', domainList: domainList })
        } else {
            res.status(200).json({ message: 'Domain not found', domainList: [] })
        }
    }
    else {
        res.status(500).json({ message: 'Only GET request allowed' })
    }

}



export default handler;