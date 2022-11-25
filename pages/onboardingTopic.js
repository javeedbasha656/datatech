import styles from '../styles/Pages.module.css'
import dynamic from 'next/dynamic'

const OnboardingTopicForm = dynamic(() => import("../component/onboarding-topic/onboarding-topic-form"), {
    // Do not import in server side
    ssr: false,
  })

function OnBoardingTopic() {
    return (
        <div className={`${styles.containerLayout} container-fluid`}>
            <div className='row'>
                <div className='col-md-12'>
                    <h4 className={'title'}>Onboarding Topic</h4>
                    {/* <p className='headline1'></p> */}
                    <OnboardingTopicForm />
                </div>
            </div>
        </div>
    )
}

export default OnBoardingTopic