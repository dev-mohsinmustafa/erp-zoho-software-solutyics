import Link from "next/link";

const Footer = () => {
    return (
        <footer className="p-4 bg-white md:p-8 lg:p-10 dark:bg-gray-800">
            <div className="mx-auto max-w-screen-xl text-center ">
                <Link href={"/"} className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white">Inventory</Link>
                {/* <p className="my-6 text-gray-500 dark:text-gray-400">Free Open Source Platform for making inventory for entirely free</p> */}
                <p className="my-6 text-gray-500 dark:text-gray-400">
                    Increase your sales and keep track of every unit with our powerful stock management, order fulfillment, and inventory control software.
                    This was made by MM
                </p>
                <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
                    <li><Link href={"/"} className="mr-4 hover:underline md:mr-6">About </Link></li>
                    <li><Link href={"/"} className="mr-4 hover:underline md:mr-6">Premium</Link></li>
                    <li><Link href={"/"} className="mr-4 hover:underline md:mr-6">Campaigns</Link></li>
                    <li><Link href={"/"} className="mr-4 hover:underline md:mr-6">Blog</Link></li>
                    <li><Link href={"/"} className="mr-4 hover:underline md:mr-6">Affiliate Program</Link></li>
                    <li><Link href={"/"} className="mr-4 hover:underline md:mr-6">FAQs</Link></li>
                    <li><Link href={"/"} className="mr-4 hover:underline md:mr-6">Contact</Link></li>
                </ul>
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">&copy; 2025-2026{" "}<Link href={"/"} className="hover:underline">Inventory &trade;</Link>. You are free to Use the System for your personal and Commercial Use. All Rights Reserved.</span>
            </div>
        </footer>
    )
}

export default Footer;