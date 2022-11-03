import Link from 'next/link'
import https from 'https'

function Product({ posts }) {

    return (
        <div>
            <h1 style={{ marginBottom: '30px' }}>Product:</h1>
            {posts?.map((product) => {
                return (
                    <div key={product.id}>
                        <Link href={'product/' + product.id}>
                            <h4>{product.id} {product.title}</h4>
                        </Link>

                        <p>{product.body}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Product


export async function getStaticProps() {

    const agent = new https.Agent({
        rejectUnauthorized: false
    });


    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'GET',
        agent
    })
    const data = await response.json()

    return {
        props: {
            posts: data
        }
    }
}
