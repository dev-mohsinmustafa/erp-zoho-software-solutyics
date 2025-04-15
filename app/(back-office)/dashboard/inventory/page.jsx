"use client"

import FixedHeader from '@/components/dashboard/FixedHeader';
import OptionCard from '@/components/dashboard/OptionCard';
import {  Diff, Factory, LayoutGrid, LayoutPanelTop, Scale, Slack, Warehouse } from 'lucide-react';


const Inventory = () => {

  const optionCards = [
    // {
    //   title: "Item groups",
    //   icon: Boxes,
    //   description: "Create multiple variants of the same item using Item Groups",
    //   link: "/new",
    //   linkTitle: "New Item Group",
    //   enabled: true,
    // },
    // Shirt
    // Component,
    // Boxes
    // ScrollText
    {
      title: "Items",
      icon: LayoutGrid,
      description: "Create standalone items and services that you buy and sell",
      link: "/dashboard/inventory/items/new",
      linkTitle: "New Item",
      enabled: true,
      // label: "New Item",
      // color: "text-blue-600",
    },
    {
      title: "Categories",
      icon: LayoutPanelTop,
      description: "Group different items together and sell them as a single item",
      link: "/dashboard/inventory/categories/new",
      linkTitle: "New Category",
      enabled: true,
    },
    {
      title: "Brands",
      icon: Slack,
      description: "Tweak your item prices for specific contacts or transactions",
      link: "/dashboard/inventory/brands/new",
      linkTitle: "New Brands",
      enabled: true,
    },
    {
      title: "Warehouse",
      icon: Warehouse,
      description: "Tweak your item prices for specific contacts or transactions",
      link: "/dashboard/inventory/warehouse/new",
      linkTitle: "New Warehouse",
      enabled: true,
    },
    {
      title: "Units",
      icon: Scale,
      description: "Tweak your item prices for specific contacts or transactions",
      link: "/dashboard/inventory/units/new",
      linkTitle: "New Unit",
      enabled: true,
    },
    {
      title: "Suppliers",
      icon: Factory,
      description: "Tweak your item prices for specific contacts or transactions",
      link: "/dashboard/inventory/suppliers/new",
      linkTitle: "New Supplier",
      enabled: true,
    },
    {
      title: "Inventory Adjustments",
      icon: Diff,
      description: "Transfer Stock from the Main Warehouse",
      link: "/dashboard/inventory/adjustments/new",
      linkTitle: "New Adjustments",
      enabled: true,
    },
  ]

  return (
    <div>
      <FixedHeader title="All Items" newLink="/dashboard/inventory/items/new" />
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 px-16 py-8 gap-6">

        {
          optionCards.map((card, index) => {
            return (
              <OptionCard key={index} optionData={card} />
            )
          })
        }





      </div>
    </div>
  )
}

export default Inventory;