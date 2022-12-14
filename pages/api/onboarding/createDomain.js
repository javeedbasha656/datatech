// import { getSession } from 'next-auth/react'
import _ from 'lodash'
import { dbConnection } from '../../../services/db_connections'
import { dbQueries } from '../../../services/common'

async function handler(req, res) {

    if (req.method == 'POST') {
        let body = req.body
        if (body.domainCode && body.domainName && body.domainDesc && body.isActive && body.userId) {
            try {
                let queries = await dbQueries()
                let connPool = await dbConnection()
                let domainData = await connPool.request().input('domainCode', body.domainCode).query(queries.getDomainByCode);
                domainData = domainData ? domainData.recordset : ''
                if (domainData && domainData.length > 0) {
                    res.status(500).json({ status: 'Failed', message: 'Domain already exists' })
                }
                else {
                    let query = queries.createDomain
                    let result = await connPool.request()
                        .input('domainCode', body.domainCode)
                        .input('domainName', body.domainName)
                        .input('domainDesc', body.domainDesc)
                        .input('isActive', 'Y')
                        .input('userId', body.userId)
                        .query(query);

                    // connPool.close()
                    let createRes = result.rowsAffected
                    // console.log("createRes: ", result)
                    if (_.isArray(createRes) && createRes.length > 0) {
                        res.status(200).json({ status: 'Success', message: 'Domain created successfully' })
                    } else {
                        res.status(500).json({ status: 'Failed', message: 'Failed to add domain' })
                    }

                }

            } catch (err) {
                console.log("Err: ", err)
                res.status(500).json({ status: 'Failed', message: 'Something went wrong' })
            }
        } else {
            res.status(500).json({ status: 'Failed', message: 'Bad request' })
        }

    } else {
        res.status(500).json({ status: 'Failed', message: 'Only POST request allowed' })
    }

}

export default handler