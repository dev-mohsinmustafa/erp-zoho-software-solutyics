import { PlusCircle } from "lucide-react";
import Link from "next/link"
import React from "react";
import { useCallback } from "react";


const CollapsibleLink = React.memo(({ item, setShowSidebar }) => {
  const handleClick = useCallback(() => setShowSidebar(false), [setShowSidebar]);

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <Link prefetch={false}
        // onClick={()=>setShowSidebar(false)}
        // onClick={handleClick}

        href={item.href}
        className="flex items-center justify-between pl-8 pr-4
    hover:bg-slate-900 transition-all duration-300 py-2.5 rounded-md  space-x-3">
        <span className='text-sm'>{item.title}</span>
        <PlusCircle className='w-4 h-4' />
      </Link>
    </div>
  )
});

export default CollapsibleLink;