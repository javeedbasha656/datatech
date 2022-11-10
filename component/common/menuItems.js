import Image from 'next/image';
import Dashboard from '../../public/images/dashboard.svg'
import Publication from '../../public/images/publications.svg'
import Subscriptions from '../../public/images/subscriptions.svg'
import Users from '../../public/images/users.svg'
import Admin from '../../public/images/admin.svg'
import Database from '../../public/images/database.svg'
import Search from '../../public/images/search.svg'
import Folder from '../../public/images/folder.svg'
import APIImage from '../../public/images/api.svg'
import Report from '../../public/images/reports.svg'


function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type
    };
}


export const MenuItems = [
    getItem("Domain", "1", <Image src={Dashboard} alt="dashboard"
        width={15} height={15} />, [
        getItem("Sub-Domain", "sub1"),
        getItem("Applications", "sub2"),
    ]),
    getItem(<span>Publicaition</span>, "2", <Image src={Publication} alt="publication"
        width={15} height={15} />),
    getItem("Subscriptions", "3", <Image src={Subscriptions} alt="subscription"
        width={15} height={15} />),
    getItem("User Management", "4", <Image src={Users} alt="User Management"
        width={15} height={15} />),
    getItem("Metasearch", "5", <Image src={Search} alt="metasearch"
        width={15} height={15} />),
    getItem("Data Governance", "6", <Image src={Database} alt="Data Governance"
        width={15} height={15} />),
    getItem("Folder Management", "7", <Image src={Folder} alt="Folder Management"
        width={15} height={15} />),
    getItem("Adminstration", "8", <Image src={Admin} alt="Adminstration"
        width={15} height={15} />),
    getItem("Reports", "9", <Image src={Report} alt="Reports"
        width={15} height={15} />),
    getItem("API Credentails Management", "10", <Image src={APIImage} alt="API Credentails Management"
        width={15} height={15} />),
]
