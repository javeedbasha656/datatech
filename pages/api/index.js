import { getSession } from 'next-auth/react'
async function handler(req, res) {

    res.status(200).json({ message: 'Index Api ' })
}





export default handler;