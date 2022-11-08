import { Layout } from "antd";
import styles from './footer.module.css'
import Image from 'next/image'
import FooterLogo from '../../public/images/footer_logo.png'
import { useEffect, useState } from "react";

const { Footer } = Layout;

function FooterLayout() {

    const [year, setyear] = useState('')

    const getYear = () => {
        const date = new Date();
        let curyear = date.getFullYear();
        setyear(curyear)
    }

    useEffect(() => {
        getYear()
    }, [])

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
                © {year} The World Bank Group, All Rights Reserved</div>

        </Footer>
    )
}

export default FooterLayout