const { default: Link } = require("next/link")

const ThemeLink = ({ className, href, title }) => {
    return (
        <Link href={href}
            className={` focus:ring-4 focus:outline-none 
                 font-medium rounded text-sm px-8 py-2.5 text-center ${className}`}
        >
            {title}
        </Link>
    )
}

export default ThemeLink;