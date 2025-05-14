import DataTable from "@/components/dashboard/DataTable";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";

const Categories = async () => {
  const categories = await getData("categories");
  const columns = ["title", "description"];
  // how do i get an array with objects with only the keys title and description 
  // const data = categories.map((obj) => {
  //   return {
  //     title: obj.title,
  //     description: obj.description
  //   };
  // })
  // Now we data as a prop instead of categories
  return (
    <div>
      {/* Fixed Header */}
      <FixedHeader title="Categories" newLink="/dashboard/inventory/categories/new" />
      {/* I need a Table that show all the categories */}
      {/* Table */}
      <div className="my-4 p-8">
        <DataTable data={categories} columns={columns} resourceTitle={"categories"} />
      </div>

    </div>
  )
}
export default Categories;