import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import QuickLinksButton from '../component/homeFloatButton/homeFloatButton'


export default function Home({ }) {
  return (
    <div>
      <Head>
        <title>Data Tech App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${styles.containerLayout} container`}>
        <div className="row">
          <div className='col-md-12'>
            <h4 className={'title'}>Applications</h4>
            <div className='text-center'>
              <Image src={"/images/homeEmpty.svg"}
                alt="Empty home"
                width={300}
                height={300}
              />
              <p style={{ fontWeight: '600' }}>You don't have any topic. Create your topic!</p>
            </div>
          </div>
        </div>
        <QuickLinksButton />
      </div>
    </div>
  )
}
