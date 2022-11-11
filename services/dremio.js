
import moment from 'moment'
import { DremioLoginAPI } from '../endPointsURL';

export async function getDremioAuth() {
    try {
        // console.log("Start time: ", moment().format('DD-MM-YYYY hh:mm:ss'))
        // Call dremio login api for auth token
        const response = await fetch(DremioLoginAPI, {
            method: 'POST',
            body: JSON.stringify({ "userName": process.env.Dremio_UN, "password": process.env.Dremio_Pass }),
            headers: { 'Content-Type': 'application/json' }
        })
        const data = await response.json()
        let authToken = data ? data.token : ""

        return authToken

    } catch (err) {
        console.log("Dremio connErr: ", err)
        return err
    }
}