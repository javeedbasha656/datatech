const URL = 'https://jsonplaceholder.typicode.com/users'


export const getDomainApi = async () => {
    const res = await fetch(URL)
    const data = await res.json()
    console.log(data)
}
