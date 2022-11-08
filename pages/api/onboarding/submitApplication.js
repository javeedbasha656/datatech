// import { getSession } from 'next-auth/react'
import _ from 'lodash'
import { dbConnection } from '../../../services/db_connections'
import { dbQueries } from '../../../services/common'
import moment from 'moment'

async function handler(req, res) {
    if (req.method == 'POST') {
        let body = req.body
        let data = {
            "domain": body.domain,
            "subDomain": body.subDomain,
            "applicationName": body.applicationName,
            "applicationAbbreviatedName": body.applicationAbbreviatedName,
            "applicationDesc": body.applicationDesc,
            "statusCode": body.statusCode,
            "primaryContactName": body.primaryContactName,
            "primaryEmailAddress": body.primaryEmailAddress,
            "primaryContactNumber": body.primaryContactNumber,
            "secondaryContactName": body.secondaryContactName,
            "secondaryEmailAddress": body.secondaryEmailAddress,
            "secondaryContactNumber": body.secondaryContactNumber,
            "ITSupportEmailAddress": body.ITSupportEmailAddress
        }

        if (body.domain && body.subDomain) {
            let query = dbQueries.callSubmitAppSp

            let connPool = await dbConnection()
            let result = await connPool.request()
                .input('domain', data.domain)
                .execute(`LoadControl.SP_PopulateOnBoardingApp`);

            connPool.close()
            console.log("End time: ", moment().format('DD-MM-YYYY hh:mm:ss'))
            let subDomainList = result.recordset


            let details = await dbConnection(query)

            if (_.isArray(details) && details.length > 0) {
                res.status(200).json({ message: 'Success', data: details })
            } else {
                res.status(200).json({ message: 'Data not found', data: [] })
            }
        } else {
            res.status(500).json({ message: 'Invalid data passed' })
        }

    } else {
        res.status(500).json({ message: 'Only POST request allowed' })
    }

}

export default handler