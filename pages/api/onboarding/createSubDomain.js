// import { getSession } from 'next-auth/react'
import _ from 'lodash'
import { dbConnection } from '../../../services/db_connections'
import { dbQueries } from '../../../services/common'

async function handler(req, res) {

    if (req.method == 'POST') {
        let body = req.body
        if (body.domainCode, body.subDomainCode && body.subDomainName && body.subDomainDesc && body.isActive && body.userId) {
            try {
                let queries = await dbQueries()
                let connPool = await dbConnection()
                let subDomainData = await connPool.request().input('subDomainCode', body.subDomainCode).query(queries.getSubDomainByCode);
                subDomainData = subDomainData ? subDomainData.recordset : ''
                console.log("subDomainData: ", subDomainData)
                if (subDomainData && subDomainData.length > 0) {
                    res.status(500).json({ status: 'Failed', message: 'SubDomain already exists' })
                }
                else {
                    let query = queries.createSubDomain
                    let result = await connPool.request()
                        .input('domainCode', body.domainCode)
                        .input('subDomainCode', body.subDomainCode)
                        .input('subDomainName', body.subDomainName)
                        .input('subDomainDesc', body.subDomainDesc)
                        .input('isActive', 'Y')
                        .input('userId', body.userId)
                        .query(query);

                    connPool.close()
                    let createRes = result.rowsAffected
                    // console.log("createRes: ", result)
                    if (_.isArray(createRes) && createRes.length > 0) {
                        res.status(200).json({ status: 'Success', message: 'SubDomain created successfully' })
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