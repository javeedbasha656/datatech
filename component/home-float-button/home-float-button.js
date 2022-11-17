import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import { PlusCircleOutlined } from '@ant-design/icons';
import Router from 'next/router'
import Image from 'next/image';
import Approve from '../../public/images/approve.png'
import Subscribe from '../../public/images/subscribe.png'
import Publish from '../../public/images/publish.png'
import Create from '../../public/images/create_topic.png'
import Link from 'next/link';


const mainButtonstyles = {
    backgroundColor: 'var(--titleColor)',
    color: 'var(--white)',
    fontSize: '28px',
    backgroundImage: 'linear-gradient(var(--titleColor), var(--tertiaryColor))',
    marginBottom: '30px'
}

const tinyButtonSytles = {
    backgroundColor: 'var(--titleColor) !important',
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
                text={<Link href="/">Subscribe Topic</Link>}
                onClick={() => Router.push('https://stackblitz.com/')}
                style={tinyButtonSytles}
            >
                <Image src={Subscribe} alt="api" width={25} height={25} />
            </Action>
            <Action
                text={<Link href="/">Publish Topic</Link>}
                onClick={() => Router.push('https://stackblitz.com/')}
                style={tinyButtonSytles}
            >
                <Image src={Publish} alt="api" width={25} height={25} />
            </Action>
            <Action
                text={<Link href="/">Approve Topic</Link>}
                onClick={false}
                style={tinyButtonSytles}
            >
                <Image src={Approve} alt="api" width={25} height={25} />
            </Action>
            <Action
                text={<Link href="/">Create Topic</Link>}
                onClick={() => Router.push('/onboardingTopic')}
                style={tinyButtonSytles}
            >
                <Image src={Create} alt="api" width={25} height={25} />
            </Action>
            <Action
                text={<Link href="/onboardingApplication">Create Applicaiton</Link>}
                onClick={() => Router.push('/onboardingApplication')}
                style={tinyButtonSytles}
            >
                <Image src={Create} alt="api" width={25} height={25} />
            </Action>
        </Fab>

    )
}

export default QuickLinksButton