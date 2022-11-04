// import { getSession } from 'next-auth/react'
import _ from 'lodash'
import { dbConnection } from '../../../services/db_connections'
import { queries } from '../../../services/dbQueries'


async function handler(req, res) {
    console.log("Query: ", queries)

    if (req.method == 'GET') {

        // const session = await getSession({ req })
        // if (!session) {
        //     res.status(401).json({ error: 'Unauthenticated user' })
        // }

        let query = `select * from SourceSetup.InfoDomain`
        // let query = queries.getDomain
        let domainList = await dbConnection(query)

        if (_.isArray(domainList) && domainList.length > 0) {
            res.status(200).json({ message: 'Success', domainList: domainList })
        } else {
            res.status(200).json({ message: 'Data not found', domainList: [] })
        }
    }
    else {
        res.status(500).json({ message: 'Only GET request allowed' })
    }

}



export default handler;