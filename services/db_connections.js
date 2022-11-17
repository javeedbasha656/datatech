import sql from 'mssql'
import moment from 'moment'

export async function dbConnection(query) {
    try {
        // console.log("Start time: ", moment().format('DD-MM-YYYY hh:mm:ss'))
        let connPool = await sql.connect(process.env.DB_URL)

        return connPool

    } catch (err) {
        console.log("Sql connErr: ", err)
        return err
        // ... error checkss
    }
}