import { redirect } from "next/dist/server/api-utils";
import toast from "react-hot-toast";

// api/supplier
export async function makePostRequest(setLoading, endpoint, data, resourceName, reset) {
    // const TAG = "API REQUEST JS():"
    try {
        setLoading(true);
        // const baseUrl = "http://localhost:3000";
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        const response = await fetch(`${baseUrl}/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        // console.log(TAG,"CHECK RESPONSE OK" ,response);
        if (response.ok) {
            // console.log(TAG,"CHECK RESPONSE OK" ,response);
            setLoading(false);
            reset();
            toast.success(`New ${resourceName} Created Successfully`);
        } else {
            setLoading(false);
            if(response.status === 409){
                toast.error("The Giving Warehouse Stock is NOT Enough");
            }else{
                toast.error("Something Went Wrong");
            }
        }
    } catch (error) {
        setLoading(false);
        console.log(error);
    }
}





export async function makePutRequest(setLoading, endpoint, data, resourceName, reset, redirect) {
    try {
        setLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        // const baseUrl = "http://localhost:3000";
        const response = await fetch(`${baseUrl}/${endpoint}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        if (response.ok) {
            console.log(response);
            setLoading(false);
            toast.success(`${resourceName} Updated Successfully`);
            // For redirecting to page
            redirect();
        } else {
            setLoading(false);
            toast.error("Something Went Wrong");
        }
    } catch (error) {
        setLoading(false);
        console.log(error);
    }
}