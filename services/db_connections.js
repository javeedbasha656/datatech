const sql = require('mssql')

export async function dbConnection(query) {
    // console.log("query : ",  query)
    try {
        let conn = await sql.connect('Server=itsfi-tr-mi-sql01.e57c104c9ca0.database.windows.net;Database=ITSFIDataFramework;User Id=skadf_svc;Password=skadf_2022;Encrypt=true')
    
        const result = await sql.query(query)
        // console.log("DbResult: ", result)
        let sqlData = result.recordset
        conn.close();
        return sqlData

    } catch (err) {
        console.log("Sql connErr: ", err)
        return err
        // ... error checkss
    }
}