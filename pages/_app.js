import '../styles/globals.css'
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.css'
import { createContext, useEffect } from "react";
import {
  Layout, Menu, Switch,
  Button
} from 'antd';
import { useState } from 'react';
import {
  CloseOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import Footer from '../component/footer/footer'
import Profile from '../component/common/profile'
import { MenuItems, } from '../component/common/menuItems';
import Image from 'next/image'
import { useRouter } from 'next/router'
// import useRouter from 'next/router'


export const ThemeContext = createContext(null);

const { Header, Content, Sider } = Layout;


function MyApp({ Component, pageProps }) {

  //state declaration
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState("light");
  const [current, setCurrent] = useState("1")

  //toggling function
  const themeToggle = (value) => {
    console.log(value);
    setTheme(value ? "dark" : "light");
  };


  const ContentAlign = {
    marginLeft: '200px',
  }

  const ContentCollapseAlign = {
    marginLeft: '80px',
  }

  //multi class declaration
  const themeClass = theme === "light" ? "light-menu" : "dark-menu";
  const collapseClass = !collapsed ? "ant-layout-sider" : "ant-layout-sider-collapse";
  const contentCollapseClass = !collapsed ? ContentAlign : ContentCollapseAlign;

  //handling menu key path 
  const handleMenu = (e) => {
    // console.log(e)
    setCurrent(e.key)
  }

  const router = useRouter()
  // console.log(router)

  useEffect(() => {
    // console.log = function(){};
    setCurrent(router.pathname)
  })

  return (
    <ThemeContext.Provider value={{ theme, themeToggle }}>
      <Layout id="light"
        style={{
          minHeight: '100vh',
        }}
      >
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
          }}
          trigger={null}
          collapsible
          collapsed={collapsed}
          className={`${themeClass} ${collapseClass}`}
        >
          <Image
            src={!collapsed ? "/images/light-logo-fullwidth.png" :
              "/images/publications.svg"}
            alt="World Bank Group"
            className="logo"
            width="180px"
            height="50px"
            // layout="responsive"
            objectFit="contain"
          />
          <Menu
            theme={theme}
            mode="inline"
            className={theme === "light" ? "light-menu"
              : "dark-menu"}
            selectedKeys={[current]}
            defaultOpenKeys={['/']}
            onClick={handleMenu}
            items={MenuItems}
          />
        </Sider>
        <Layout
          style={contentCollapseClass}
        >
          <Header
            className={theme === "light" ? "light-menu"
              : "dark-menu"}
            style={{
              padding: 0,
            }}
          >
            <Button type="primary"
              className={'primary-btn'}
              icon={collapsed ? <CloseOutlined /> : <MenuOutlined />}
              size={32}
              onClick={() => setCollapsed(!collapsed)} />
            {/* <Switch
              checked={theme === "dark"}
              onChange={themeToggle}
              checkedChildren="Dark"
              unCheckedChildren="Light"
            /> */}
            <div className={'profileImg'}>
              <Profile />
            </div>
          </Header>
          <Content
            style={{
              padding: '0px',
              overflow: 'initial',
            }}
          >
            <Component {...pageProps} />
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </ThemeContext.Provider >
  )
}

export default MyApp
