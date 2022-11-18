import Image from 'next/image'
import styles from '../styles/Pages.module.css'
import PageNotFound from '../public/images/Notfound.svg'
import { Button } from 'antd';
import Router from 'next/router'

function Notfound() {
    return (
        <div className={`${styles.containerLayout1} container-fluid`}>
            <div className="row">
                <div className='col-md-12'>
                    <div className='text-center'
                        style={{ marginTop: '30px' }}>
                        <Image
                            src={PageNotFound}
                            alt="Empty home"
                            width={300}
                            height={300}
                        />
                        <h3 className={'notfound'}>{`Oooopss...!`}</h3>
                        <h5
                            className={'notfoundtext'}>
                            {`Your directed page is not found!`}
                        </h5>
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={() => Router.push('/')}
                            className={'submitbtn homebtn'}>
                            Go Home
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notfound