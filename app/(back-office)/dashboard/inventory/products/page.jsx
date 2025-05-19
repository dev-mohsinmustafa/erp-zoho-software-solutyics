
// "use client"
import DataTableProduct from "@/components/dashboard/DataTableProduct";
import FixedHeader from "@/components/dashboard/FixedHeader";
import { getData } from "@/lib/getData";
// import { useEffect, useState } from "react";

const Products = async () => {
  const products = await getData("inventory/products");
  // const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const products = await getData("products");
  //     setProducts(products);
  //   };
  //   fetchData();
  // }, [])
  const columns = ["imageUrl", "title", "quantity", "category.title", "warehouse.title", "supplier.title", "buyingPrice", "sellingPrice"];
  return (
    <div>
      {/* Fixed Header */}
      <FixedHeader title="Products Management" newLink="/dashboard/inventory/products/new" />
      {/* I need a Table that show all the brands */}
      {/* Table */}
      <div className="my-4 p-8">
        <DataTableProduct data={products} columns={columns} resourceTitle={"products"} />
      </div>
    </div>
  )
}
export default Products;