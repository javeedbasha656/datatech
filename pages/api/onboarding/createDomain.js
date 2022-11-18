// import { getSession } from 'next-auth/react'
import _ from 'lodash'
import { dbConnection } from '../../../services/db_connections'
import { dbQueries } from '../../../services/common'
import moment from 'moment'

async function handler(req, res) {

    if (req.method == 'POST') {
        let body = req.body
        if (body.domainCode && body.domainName && body.domainDesc) {
            try {
                let queries = await dbQueries()
                let query = queries.createDomain

                let connPool = await dbConnection()
                let result = await connPool.request()
                    .input('domainCode', body.domainCode)
                    .input('domainName', body.domainName)
                    .input('domainDesc', body.domainDesc)
                    .input('isActive', body.isActive)
                    .input('userId', body.userId)
                    .query(query);

                connPool.close()

                let createRes = result.rowsAffected
                console.log("createRes: ", result)
                if (_.isArray(createRes) && createRes.length > 0) {
                    res.status(200).json({ message: 'Success', data: 'Domain created successfully' })
                } else {
                    res.status(200).json({ message: 'Failed', data: 'Failed to add domain' })
                }
            } catch (err) {
                console.log("Err: ", err)
                res.status(500).json({ message: 'Something went wrong...please try again later' })
            }
        } else {
            res.status(500).json({ message: 'Invalid domain passed' })
        }

    } else {
        res.status(500).json({ message: 'Only POST request allowed' })
    }

}

export default handler