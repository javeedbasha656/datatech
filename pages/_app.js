import '../styles/globals.css'
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.css'
import { createContext } from "react";
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
import { MenuItems } from '../component/common/menuItems';
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

  //multi class declaration
  const themeClass = theme === "light" ? "light-menu" : "dark-menu";
  const collapseClass = !collapsed ? "ant-layout-sider" : "ant-layout-sider-collapse";

  //handling menu key path 
  const handleMenu = (e) => {
    // console.log(e)
    setCurrent(e.key)
  }

  return (
    <ThemeContext.Provider value={{ theme, themeToggle }}>
      <Layout id="light"
        style={{
          minHeight: '100vh',
        }}
      >
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className={`${themeClass} ${collapseClass}`}
        >
          {!collapsed ? (
            <img
              alt="World Bank Group"
              className="logo"
              src={theme === "dark" ? "/images/dark-logo-fullwidth.png"
                : "/images/light-logo-fullwidth.png"}
            />
          ) : (
            <img
              alt="raaonline"
              className="logo"
              src={"https://raaonline-admin-staging.web.app/favicon.png"}
            />
          )}
          <Menu
            theme={theme}
            mode="inline"
            className={theme === "light" ? "light-menu"
              : "dark-menu"}
            selectedKeys={current}
            // defaultOpenKeys={['sub1']}
            onClick={handleMenu}
            items={MenuItems}
          />
        </Sider>
        <Layout>
          <Header
            className={theme === "light" ? "light-menu"
              : "dark-menu"}
            style={{
              padding: 0
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
            style={{ padding: '20px' }}
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
