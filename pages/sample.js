import styles from '../styles/Home.module.css'

function Sample() {
    return (
        <div>
            <div className={`${styles.containerLayout} container`}>
                <div className='row'>
                    <div className='col-md-12'>
                        <h4 className={'title'}>Sample Template</h4>
                        {/* <PageTemplateForm /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sample