import { UploadDropzone } from "@/lib/uploadthing";
import { Pencil } from "lucide-react";

import Image from "next/image";

const ImageInput = ({ label, className = "col-span-full", imageUrl = "", setImageUrl, endpoint = "imageUploader" }) => {
    return (
        <div className={className}>
            <div className="flex justify-between items-center mb-4">
                <label
                    htmlFor="course-image"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    {label}
                </label>
                {imageUrl && (
                    <button
                        onClick={() => setImageUrl("")}
                        type="button"
                        className="flex space-x-2  bg-slate-900 rounded-md shadow text-slate-50  py-2 px-4"
                    >
                        <Pencil className="w-5 h-5" />
                        <span>Change Image</span>
                    </button>
                )}
            </div>
            {imageUrl ? (
                <Image
                    src={imageUrl}
                    alt="Item image"
                    width={1000}
                    height={667}
                    className="w-full h-64 object-cover"
                />
            ) : (
                <UploadDropzone
                    endpoint={endpoint}
                    onClientUploadComplete={(res) => {
                        setImageUrl(res[0].ufsUrl);
                        // Do something with the response
                        console.log("Files: ", res);
                        console.log("Upload Completed");
                    }}
                    onUploadError={(error) => {
                        // Do something with the error.
                        console.log(`ERROR! ${error.message}`);
                        alert("Error uploading file: " + error.message);
                    }}
                    onUploadBegin={() => {
                        console.log("Upload starting...");
                    }}
                    appearance={{
                        button: "bg-blue-600 p-2 text-white rounded-lg",
                        allowedContent: "text-gray-600 text-sm",
                        container: "mt-2 border-2 border-dashed border-gray-300 rounded-lg p-8"
                    }}
                    content={{
                        button: "Choose File",
                        allowedContent: "Image files only (max 4MB)"
                    }}
                />
            )}
        </div>
    )
}

export default ImageInput;