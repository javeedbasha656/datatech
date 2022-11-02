import OnboardingForm from '../component/onboarding/onboarding-step-form'
import styles from '../styles/Home.module.css'


function onBoardingUser() {
    return (
        <div>
            <div className={`${styles.containerLayout} container`}>
                <div className='row'>
                    <div className='col-md-12'>
                        <h4 className={'title'}>Onboarding Application</h4>
                        <OnboardingForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default onBoardingUser