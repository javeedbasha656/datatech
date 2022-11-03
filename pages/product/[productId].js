import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const URL = 'https://jsonplaceholder.typicode.com/posts'

function ProductDetail() {

    const [data, setData] = useState([])


    const router = useRouter()
    const postid = router.query.productId
    // console.log(postid)


    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`${URL}/${postid}`)
            const post = await res.json()
            setData(post)
            console.log(post)
        }
        fetchData()
    }, [postid])


    if (router.isFallback) {
        return <div>Loading...</div>
    }
    return (
        <>
            <h3 style={{ marginBottom: '30px' }}>
                Product Detail page for id: {postid}
            </h3>
            <h4>
                {data.id}: {data.title}
            </h4>
            <p>{data.body}</p>
        </>
    )
}

export default ProductDetail



