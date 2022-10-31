import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import { PlusCircleOutlined } from '@ant-design/icons';
import Router from 'next/router'
import Image from 'next/image';
import Approve from '../../public/images/approve.png'
import Subscribe from '../../public/images/subscribe.png'
import Publish from '../../public/images/publish.png'
import Create from '../../public/images/create_topic.png'


const mainButtonstyles = {
    backgroundColor: 'var(--primaryColor)',
    color: 'var(--white)',
    fontSize: '28px',
    backgroundImage: 'linear-gradient(var(--primaryColor), var(--tertiaryColor))',
    marginBottom: '30px'
}

const tinyButtonSytles = {
    backgroundColor: 'var(--primaryColor) !important',
}


function QuickLinksButton() {
    return (
        <Fab
            mainButtonStyles={mainButtonstyles}
            // actionButtonStyles={tinyButtonSytles}
            // style={style}
            event={'click'}
            icon={<PlusCircleOutlined />}
            alwaysShowTitle={true}
            onClick={false}
        >
            <Action
                text="Subscribe Topic"
                onClick={() => Router.push('https://stackblitz.com/')}
                style={tinyButtonSytles}
            >
                <Image src={Subscribe} alt="api" width={25} height={25} />
            </Action>
            <Action
                text="Publish Topic"
                onClick={() => Router.push('https://stackblitz.com/')}
                style={tinyButtonSytles}
            >
                <Image src={Publish} alt="api" width={25} height={25} />
            </Action>
            <Action
                text="Approve Topic"
                onClick={false}
                style={tinyButtonSytles}
            >
                <Image src={Approve} alt="api" width={25} height={25} />
            </Action>
            <Action
                text="Create Topic"
                onClick={() => Router.push('/onboarding')}
                style={tinyButtonSytles}
            >
                <Image src={Create} alt="api" width={25} height={25} />
            </Action>
        </Fab>
    )
}

export default QuickLinksButton