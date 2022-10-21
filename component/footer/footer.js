import { Layout } from "antd";
import styles from './footer.module.css'
import Image from 'next/image'
import FooterLogo from '../../public/images/footer_logo.png'

const { Footer } = Layout;

function FooterLayout() {
    return (
        <Footer>
            <div className={styles.div_left_align}>
                <Image src={FooterLogo} alt={"WBG_Logo"}
                    width={150} height={30} className={styles.logoAlign} />
                <ul className={styles.itemsAlign}>
                    <li>IBRD</li>
                    <li>IDA</li>
                    <li>IFC</li>
                    <li>MIGA</li>
                    <li>ICSID</li>
                </ul>
            </div>
            <div className={styles.div_right_align}>
                Ant Design ©2018 Created by Ant UED</div>

        </Footer>
    )
}

export default FooterLayout