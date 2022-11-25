import styles from '../styles/Pages.module.css'
import { Button, Result } from 'antd';
import Router from 'next/router'

function Notfound() {
    return (
        <div className={`${styles.containerLayout1} container-fluid`}>
            <div className="row">
                <div className='col-md-12'>
                    <Result
                        status="404"
                        title="404"
                        subTitle="Sorry, the page you visited does not exist."
                        extra={<Button type="primary"
                            onClick={() => Router.push('/')}
                            className={'submitbtn homebtn'}
                        >Back Home</Button>}
                    />
                </div>
            </div>
        </div>


    )
}

export default Notfound