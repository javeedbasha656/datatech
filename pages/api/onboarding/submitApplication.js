// import { getSession } from 'next-auth/react'
import _ from 'lodash'
import { dbConnection } from '../../../services/db_connections'
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
            "primaryContactNumber": body.primaryContactNumber.toString(),
            "secondaryContactName": body.secondaryContactName,
            "secondaryEmailAddress": body.secondaryEmailAddress,
            "secondaryContactNumber": body.secondaryContactNumber.toString(),
            "ITSupportEmailAddress": body.ITSupportEmailAddress
        }

        if (body.domain && body.subDomain && body.applicationName && body.applicationAbbreviatedName && body.applicationDesc && body.statusCode) {
            try {
                let connPool = await dbConnection()
                let result = await connPool.request()
                    .input('Info_Domain_Code', data.domain)
                    .input('Info_SubDomain_Code', data.subDomain)
                    .input('DataSource_App_Code', data.applicationName)
                    .input('DataSource_App_Abb_Name', data.applicationAbbreviatedName)
                    .input('DataSource_App_Desc', data.applicationDesc)
                    .input('StatusCd', data.statusCode)
                    .input('Primary_Person_Name', data.primaryContactName)
                    .input('Primary_Email', data.primaryEmailAddress)
                    .input('Primary_Tel', data.primaryContactNumber)
                    .input('Secondary_Person_Name', data.secondaryContactName)
                    .input('Secondary_Email', data.secondaryEmailAddress)
                    .input('Secondary_Tel', data.secondaryContactNumber)
                    .input('ITSupport_Email', data.ITSupportEmailAddress)
                    .input('ITSupport_ContactNumber', '')
                    .execute(`LoadControl.SP_PopulateOnBoardingApp`);

                connPool.close()
                // console.log("End time: ", moment().format('DD-MM-YYYY hh:mm:ss'))
                let rowsAffected = result.rowsAffected

                if (_.isArray(rowsAffected) && rowsAffected.length > 0) {
                    res.status(200).json({ status: 'Success', message: `Application submitted successfully` })
                } else {
                    res.status(200).json({ status: 'Failed', message: 'Failed to add record' })
                }
            }
            catch (err) {
                // console.log("Err: ", err)
                res.status(500).json({ message: 'Please check for duplicate entries' })
            }
        } else {
            res.status(400).json({ message: 'Invalid data passed' })
        }

    } else {
        res.status(400).json({ message: 'Only POST request allowed' })
    }

}

export default handler