"use client"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import CollapsibleLink from "./CollapsibleLink"
import { ChevronRight } from "lucide-react";


const SidebarDropdownLink = ({ items, title, icon, setShowSidebar }) => {
    const Icon = icon;
    return (
        <Collapsible>
            <CollapsibleTrigger className='flex justify-between items-center  w-full'>
                <div className="flex p-2 items-center space-x-2">
                    <Icon className='w-4 h-4' />
                    <span>{title}</span>
                </div>
                <ChevronRight className="w-4 h-4" />
            </CollapsibleTrigger>
            <CollapsibleContent
            // onClick={()=>setShowSidebar(false)}
            >
                {
                    items.map((item, index) => {
                        return (
                            <CollapsibleLink key={index} item={item} title={item.title} setShowSidebar={setShowSidebar} />
                        )
                    })
                }


            </CollapsibleContent>
        </Collapsible>
    )
}

export default SidebarDropdownLink;