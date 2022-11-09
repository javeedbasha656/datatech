import OnboardingTopicForm from '../component/onboarding-topic/onboarding-topic-form'
import styles from '../styles/Pages.module.css'


function OnBoardingTopic() {
    return (
        <div className={`${styles.containerLayout} container`}>
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