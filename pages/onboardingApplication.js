import OnboardingApp from '../component/onboarding-application/onboarding-application'
import styles from '../styles/Home.module.css'


function OnboardingApplication() {
    return (
        <div>
            <div className={`${styles.containerLayout} container`}>
                <div className='row'>
                    <div className='col-md-12'>
                        <h4 className={'title'}
                            style={{ marginBottom: '25px' }}
                        >Onboarding Application</h4>
                        <OnboardingApp />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OnboardingApplication