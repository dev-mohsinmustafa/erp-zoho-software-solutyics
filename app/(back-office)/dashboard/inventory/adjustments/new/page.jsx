import AdjustmentForm from "@/components/dashboard/AdjustmentForm";
import { getData } from "@/lib/getData";

const NewAdjustments = async () => {
  // const items = await getData("items");
  // const warehouses = await getData("warehouse");
  const itemsData =  getData("items");
  const warehousesData =  getData("warehouse");
  // After making relationship schema in addStockAdjustments
  const suppliersData =  getData("suppliers");
  const [items, warehouses, suppliers] = await Promise.all([itemsData, warehousesData, suppliersData]);
  return (
    <AdjustmentForm items={items} warehouses={warehouses} suppliers={suppliers}/>
  )
}

export default NewAdjustments;
























// "use client"

// import AddInventoryForm from "@/components/dashboard/AddInventoryForm";
// import FormHeader from "@/components/dashboard/FormHeader";
// import TransferInventoryForm from "@/components/dashboard/TransferInventoryForm";
// import SelectInput from "@/components/formInputs/SelectInput";
// import SubmitButton from "@/components/formInputs/SubmitButton";
// import TextareaInput from "@/components/formInputs/TextareaInput";
// import TextInput from "@/components/formInputs/TextInput";
// import { Minus, Plus } from "lucide-react";
// import { useState } from "react";

// const NewAdjustments = () => {

//   const tabs = [
//     {
//       title: "Add Stock",
//       icon: Plus,
//       form: "add"
//     },
//     {
//       title: "Transfer Stock",
//       icon: Minus,
//       form: "transfer"
//     },
//   ]
//   const [activeForm, setActiveForm] = useState("add");
//   return (
//     <div>

//       {/* Header */}
//       <FormHeader title="New Adjustment" href={"/dashboard/inventory"} />

//       {/* Form */}
//       {/* <div className="w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700
//       mx-auto my-3"> */}

//       <div className="border-b border-gray-200 dark:border-gray-700
//          w-full max-w-3xl px-4 py-2 bg-white border shadow rounded
//          mx-auto my-4">
//         <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">


//           {
//             tabs.map((tab, index) => {
//               const Icon = tab.icon;
//               return (
//                 <li className="me-2" key={index}>
//                   <button
//                     onClick={() => setActiveForm(tab.form)}
//                     className={`${activeForm === tab.form ?
//                       "inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
//                       :
//                       "inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300"}`}
//                   // className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300"
//                   >
//                     <Icon className="w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 " />
//                     {tab.title}
//                   </button>
//                 </li>
//               )
//             })
//           }

//         </ul>
//       </div>



//       {/* Need two tabs 1 for creating stock and 2 for creating a new inventory and another for
//         transferring stock */}
//       {/* Move form in this component TransferInventoryForm */}

//       {/* add condition */}
//       {activeForm === "add" ? <AddInventoryForm /> : <TransferInventoryForm />}



//       {/* </div> */}

//     </div>
//   )
// }

// export default NewAdjustments;