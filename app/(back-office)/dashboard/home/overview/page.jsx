import SalesOverview from '@/components/dashboard/SalesOverview';
// import SalesOverview from '../../../../../components/dashboard/SalesOverview';
// import DashboardBanner from '../../../../../components/dashboard/DashboardBanner';
import CurrentStock from '@/components/dashboard/CurrentStock';
import { getData } from '@/lib/getData';

const Dashboard = async () => {
  // const items = await getData("items");
  // const warehouses = await getData("warehouse") || [];

  const itemsData = getData("inventory/items");
  const warehousesData = getData("inventory/warehouse");
  const [items, warehouses] = await Promise.all([itemsData, warehousesData]);



  return (
    <div>
      {/* <DashboardBanner /> */}
      {/* <h2>Dashboard Mohsin</h2> */}
      <SalesOverview />
      {/* Now we create CurrentStock as reuseable component */}
      <CurrentStock items={items || []} title="Available Stock Items" />
      {/* {
        warehouses?.map((warehouse, index) => {
          return (
            <CurrentStock key={index} items={warehouse.items} title={`Available Stock Items in ${warehouse.title}`} />
          )
        })
      } */}
      {/* Safely handle warehouses data */}
      {warehouses?.length > 0 ? (
        warehouses.map((warehouse) => (
          <CurrentStock
            key={warehouse.id} // 👈 Use a unique ID instead of index
            items={warehouse.items || []}
            title={`Stock in ${warehouse.title}`}
          />
        ))
      ) : (
        <p>No warehouse data available.</p>
      )}
      {/* Fetch items in the warehouse in a particular warehouse  */}
    </div>
  )
}

export default Dashboard;