// import { getSession } from 'next-auth/react'
import _ from 'lodash'
import { dbConnection } from '../../../services/db_connections'
import { queries } from '../../../services/dbQueries'

async function handler(req, res) {
    if (req.method == 'POST') {
        let domain = req.body.domain
        if (domain) {
            let query = "select * from SourceSetup.InfoSubDomain where Info_Domain_Code='" + domain + "'"
            // let query = queries.getSubDomain
            let subDomainList = await dbConnection(query)
            

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