import OnboardingTopicForm from '../component/onboarding-topic/onboarding-topic-form'
import styles from '../styles/Home.module.css'


function OnBoardingTopic() {
    return (
        <div>
            <div className={`${styles.containerLayout} container`}>
                <div className='row'>
                    <div className='col-md-12'>
                        <h4 className={'title'}>Onboarding Topic</h4>
                        <OnboardingTopicForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OnBoardingTopic