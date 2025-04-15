// import {
//     generateComponents,
// } from "@uploadthing/react";


// export const { UploadButton, UploadDropzone, Uploader } = generateComponents();

import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";


export const UploadButton = generateUploadButton();
export const UploadDropzone = generateUploadDropzone();
