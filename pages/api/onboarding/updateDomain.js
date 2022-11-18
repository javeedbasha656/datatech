import _ from 'lodash'
import { dbConnection } from '../../../services/db_connections'
import { dbQueries } from '../../../services/common'

async function handler(req, res) {

    if (req.method == 'POST') {
        let body = req.body
        if (body.domainCode && body.domainName && body.domainDesc && body.isActive) {
            try {
                let queries = await dbQueries()
                let connPool = await dbConnection()

                let query = queries.updateDomain
                let result = await connPool.request()
                    .input('domainName', body.domainName)
                    .input('domainDesc', body.domainDesc)
                    .input('isActive', body.isActive)
                    .input('domainCode', body.domainCode)
                    .query(query);

                connPool.close()
                let updateRes = result.rowsAffected
                // console.log("updateRes: ", result)
                if (_.isArray(updateRes) && updateRes.length > 0) {
                    res.status(200).json({ status: 'Success', message: 'Domain updated successfully' })
                } else {
                    res.status(500).json({ status: 'Failed', message: 'Failed to update domain' })
                }


            } catch (err) {
                console.log("Err: ", err)
                res.status(500).json({ status: 'Failed', message: 'Something went wrong' })
            }
        } else {
            res.status(400).json({ status: 'Failed', message: 'Bad request' })
        }

    } else {
        res.status(400).json({ status: 'Failed', message: 'Only POST request allowed' })
    }

}

export default handler