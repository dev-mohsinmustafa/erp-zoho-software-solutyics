import { X } from "lucide-react";
import Link from "next/link";

const FormHeader = ({title, href}) => {
  return (
    <div>
        <div className="flex items-center justify-between bg-white py-3 px-16">
        <h2 className="text-xl font-semibold ">{title}</h2>
        <Link href={href} prefetch={false} aria-label="Close">
          {/* <X /> */}
          <button className="p-2 rounded hover:bg-gray-200 transition">
          <X className="w-6 h-6" />
        </button>
        </Link>
      </div>
    </div>
  )
}

export default FormHeader;