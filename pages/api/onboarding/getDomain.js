import { getSession } from 'next-auth/react'
// import {PrismaClient} from '@prisma/client'
// import { MongoClient } from 'mongodb'
const sql = require('mssql')
// const prisma = new PrismaClient


async function handler(req, res) {
    // const session = await getSession({ req })
    // if (!session) {
    //     res.status(401).json({ error: 'Unauthenticated user' })
    // }
    console.log("Process: ", process.env.DB_URL)
    let getData = ''

    // Mongo Connection test
    // -----------------------
    // const client = await MongoClient.connect('mongodb+srv://skadf_svc:skadf_2022@cluster0.jx4jjvh.mongodb.net/?retryWrites=true&w=majority')
    // const db = client.db()
    // getData = await db.collection('emails').find().toArray()
    // client.close()

    // Sql Connection
    // ----------------
   
    try {
        await sql.connect('Server=itsfi-tr-mi-sql01.e57c104c9ca0.database.windows.net;Database=ITSFIDataFramework;User Id=skadf_svc;Password=skadf_2022;Encrypt=true')
        const result = await sql.query`select * from InfoDomain`
        console.log("DbResult: ",result)
    } catch (err) {
        console.log(err)
        // ... error checks
    }

    // getData = await prisma.InfoDomain.findMany()

    res.status(200).json({ message: 'Get Domain Api ',getData })


}



export default handler;