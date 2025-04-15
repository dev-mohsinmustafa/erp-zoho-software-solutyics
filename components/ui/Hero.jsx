import ThemeLink from './ThemeLink';
import inventoryImage from "@/public/images/inventoryImage.png";
import Image from 'next/image';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

const Hero = () => {
  const session = getServerSession(authOptions);
  return (
    // <div className='mt-16 bg-[#E3E3E3] grid grid-cols-1 md:grid-cols-2 py-8 md:py-16 px-4 md:px-16 text-[#172A31] items-center gap-6'>
    <div className='bg-gradient-to-b mt-16 bg-[#E3E3E3] flex flex-col py-8 md:py-32 px-4 md:px-16 text-[#172A31] items-center gap-6'>
      <div className="flex flex-col space-y-8 items-center max-w-4xl mx-auto text-center">
        <h2 className='text-3xl md:text-5xl font-bold'>Inventory management software for growing businesses.</h2>
        <p className='text-base md:text-xl text-[#9F4787]'>Increase your sales and keep track of every unit with our powerful stock management, order fulfillment, and inventory control software.</p>


        <div className="py-4 flex space-x-4 items-center">
          {
            session ? (
              <ThemeLink
                className="bg-[#9F4787] hover:bg-rose-700 focus:ring-rose-300 text-white"
                title="View Dashboard"
                href="/dashboard/home/overview"
                icon={AiOutlineArrowDown}
              />
            ) : (
              <ThemeLink
                className="bg-[#9F4787] hover:bg-rose-700 focus:ring-rose-300 text-white"
                title="Access the Inventory System"
                href="/dashboard/home/overview"
                icon={AiOutlineArrowDown}
              />
            )
          }


          <ThemeLink
            className="bg-slate-50 hover:bg-slate-100 focus:ring-slate-300 text-slate-900"
            title="Explore Demo Account"
            href="/dashboard/home/overview"
            icon={AiOutlineArrowDown}
          />
        </div>

      </div>

      <div className=''>
        <Image src={inventoryImage} alt='inventory Image' />

      </div>
    </div>
  )
}

export default Hero;