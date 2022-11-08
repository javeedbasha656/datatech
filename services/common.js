import fsPromises from 'fs/promises';
import path from 'path'

export async function dbQueries() {
    try {
        const filePath = path.join(process.cwd(), 'lib/dbQueries.json');
        const jsonData = await fsPromises.readFile(filePath);
        const queryData = JSON.parse(jsonData);
        return queryData
    }
    catch (err) {
        console.log("Db Queries err: ", err)
        return err
    }
}


