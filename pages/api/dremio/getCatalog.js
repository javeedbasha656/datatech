// import { getSession } from 'next-auth/react'
import _ from 'lodash'
import moment from 'moment'
import { getDremioAuth } from '../../../services/dremio'
import { DremioCatalogAPI } from '../../../endPointsURL';

async function handler(req, res) {

    if (req.method == 'GET') {
        try {
            // Get dremio auth token
            let authToken = await getDremioAuth()
            if (authToken) {
                // Call dremio catalog api 
                const response = await fetch(DremioCatalogAPI, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Authorization': authToken }
                })
                let catalogData = await response.json()

                if (_.isObject(catalogData) && _.isArray(catalogData.data) && catalogData.data.length > 0) {
                    res.status(200).json({ message: 'Success', catalogData: catalogData.data })
                } else {
                    res.status(200).json({ message: 'Data not found', catalogData: [] })
                }
            }
            else {
                res.status(500).json({ message: 'Something went wrong...please try again later1' })
            }
        } catch (err) {
            console.log("Err: ", err)
            res.status(500).json({ message: 'Something went wrong...please try again later2' })
        }
    }
    else {
        res.status(500).json({ message: 'Only GET request allowed' })
    }

}



export default handler;