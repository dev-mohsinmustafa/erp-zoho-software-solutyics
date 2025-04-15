"use client"
import Link from 'next/link';

const OptionCard = ({ optionData }) => {
    const { title, description, link, linkTitle, enabled, icon : Icon } = optionData;
    return (
        <div className="shadow-md bg-white flex flex-col items-center justify-center gap-4 p-6">
            <h2 className='text-xl font-semibold'>{title}</h2>
            <div>
                <Icon strokeWidth="0.5" className='w-32 h-32' />
            </div>
            <p className="line-clamp-1">
                {description}
            </p>
            {
                enabled ? (
                    <Link href={link}   prefetch={false} 
                    className="py-2 rounded-sm bg-blue-600 px-3 inline-flex items-center space-x-2 text-white transition-colors duration-300 hover:bg-gray-400">
                        {/* <Icon className="w-4 h-4" /> */}
                        {linkTitle}
                    </Link>
                ) : (
                    <button className="py-2 rounded-sm bg-blue-600 px-3 inline-flex items-center space-x-2 text-white">
                        Enable
                    </button>
                )
            }

        </div>
    )
}

export default OptionCard;