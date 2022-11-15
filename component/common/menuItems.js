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
import Link from 'next/link';


function getItem(label, key, icon, children, type) {
    return {
        label,
        key,
        icon,
        children,
        type
    };

}

export const MenuItems = [
    getItem(<Link href="/">Applications</Link>, "/", <Image src={Dashboard} alt="Applications"
        width={15} height={15} />),
    getItem("Onboarding", "/", <Image src={Database} alt="onboarding"
        width={15} height={15} />, [
        getItem(<Link href='/onboardingApplication'>Onboarding Applications</Link>, "/onboardingApplication"),
        getItem(<Link href='/onboardingTopic'>Onboarding Topic</Link>, "/onboardingTopic")
    ]),
    getItem(<Link href="/catalog">Dremio Catalog</Link>, "/catalog", <Image src={Publication} alt="Catalog"
        width={15} height={15} />),
    getItem("Subscriptions", "3", <Image src={Subscriptions} alt="subscription"
        width={15} height={15} />),
    getItem(<span>Publicaition</span>, "2", <Image src={Publication} alt="publication"
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
    getItem("API Credentials Management", "10", <Image src={APIImage} alt="API Credentials Management"
        width={15} height={15} />),
]
