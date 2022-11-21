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
    getItem(<Link href="/">Applications</Link>,
        "/",
        <Image src={Dashboard} alt="Applications"
            width={15} height={15} />
    ),
    getItem("Onboarding", "/",
        <Image src={Database} alt="onboarding"
            width={15} height={15} />,
        [
            getItem(<Link href='/onboardingApplication'>
                Onboarding Applications
            </Link>,
                "/onboardingApplication"),
            getItem(<Link href='/onboardingTopic'>
                Onboarding Topic
            </Link>,
                "/onboardingTopic")
        ]
    ),
    getItem(
        <Link href="/domain">Domain</Link>,
        "/domain",
        <Image src={Publication} alt="Sub Domain"
            width={15} height={15} />
    ),
    getItem(
        <Link href="/subdomain">Sub Domain</Link>,
        "/subdomain",
        <Image src={Publication} alt="Domain"
            width={15} height={15} />
    ),
    getItem(
        <Link href="/catalog">Dremio Catalog</Link>,
        "/catalog",
        <Image src={Publication} alt="Catalog"
            width={15} height={15} />
    ),
    getItem(
        <Link href="/">Subscriptions</Link>,
        "3",
        <Image src={Subscriptions} alt="subscription"
            width={15} height={15} />
    ),
    getItem(
        <Link href="/">Publicaition</Link >,
        "2", <Image src={Publication} alt="publication"
            width={15} height={15} />
    ),
    getItem(<Link href="/">User Management</Link>,
        "4",
        <Image src={Users} alt="User Management"
            width={15} height={15} />
    ),
    getItem(<Link href="/">Metasearch</Link>,
        "5",
        <Image src={Search} alt="metasearch"
            width={15} height={15} />
    ),
    getItem(<Link href="/">Data Governance</Link>,
        "6",
        <Image src={Database} alt="Data Governance"
            width={15} height={15} />
    ),
    getItem(
        <Link href="/">Folder Management</Link>,
        "7",
        <Image src={Folder} alt="Folder Management"
            width={15} height={15} />
    ),
    getItem(
        <Link href="/">Adminstration</Link>,
        "8",
        <Image src={Admin} alt="Adminstration"
            width={15} height={15} />
    ),
    getItem(
        <Link href="/">Reports</Link>,
        "9", <Image src={Report} alt="Reports"
            width={15} height={15} />
    ),
    getItem(
        <Link href="/">API Credentials</Link>,
        "10", <Image src={APIImage} alt="API Credentials Management"
            width={15} height={15} />
    ),
]
