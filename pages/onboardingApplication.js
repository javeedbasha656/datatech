import styles from '../styles/Pages.module.css'
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const OnboardingApp = dynamic(() => import("../component/onboarding-application/onboarding-application"), {
    // Do not import in server side
    ssr: false,
  })

function OnboardingApplication() {

    const router = useRouter()

    return (
        <div>
            <div className={`${styles.containerLayout} container-fluid`}>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <h4 className={'title'}>Onboarding Application</h4>
                            </div>
                            <div className='col-md-6'>
                                <Button className={`${styles.backbtnAlign} ${styles.backBtn}`}
                                    icon={<ArrowLeftOutlined />}
                                    onClick={() => router.push('/')}
                                >Back</Button>
                            </div>
                        </div>

                        {/* <p className='headline1'></p> */}
                        <OnboardingApp />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OnboardingApplication

