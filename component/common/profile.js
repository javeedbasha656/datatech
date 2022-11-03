import {
    UserOutlined,
    LogoutOutlined,
    IdcardOutlined,

} from '@ant-design/icons';
import {
    Dropdown, Menu,
    Space, Avatar
} from 'antd';
import Link from 'next/link'


//handleclick for menu onclick function
const handleClick = (e, path) => {
    console.log(e, path)
    if (path === "/") {
        console.log("I clicked on the home Page");
    }
    if (path === "/onboarding") {
        console.log("I clicked on the onboarding Page");
    }
};


const menu = (
    <Menu
        items={[
            {
                label: <Link href="/">
                    <a onClick={(e) => handleClick(e, "/")}>
                        <IdcardOutlined
                            className={'profileIcon'} />
                        Account</a>
                </Link>,
                key: '0',
            },
            {
                label: <Link href="/">
                    <a onClick={(e) => handleClick(e, "/onboarding")}>
                        <LogoutOutlined
                            className={'profileIcon'} />
                        Logout</a>
                </Link>,
                key: '1',
            },
        ]}
    />
);

function ProfileAvatar() {
    return (
        <>
            <Dropdown
                overlay={menu}
                trigger={['click']}>
                <Space>
                    <Avatar size={30}
                        style={{ lineHeight: '25px' }}
                        icon={<UserOutlined />}
                        className={'profile'} />
                    <span className='profileuser'>wb542341</span>
                </Space>
            </Dropdown>
        </>
    )
}

export default ProfileAvatar



