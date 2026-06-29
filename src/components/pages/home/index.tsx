import { useEffect } from "react";
import { Layout } from "antd";

import MainHeader from "@/components/layout/header";
import MainFooter from "@/components/layout/footer";

import CategoryCards from "./content/category-cards";
import CartPanel from "./content/cart-panel";

import { mockItems } from "@/lib/mock-data";
import { useBundle } from "@/hooks/useBundle";

export default function Home() {
  const { items, dispatch } = useBundle();

  /*
  I know this is static data for now, but in the future, 
  we can fetch this data from an API or a database.
  */
  useEffect(() => {
    dispatch({
      type: "SET_ITEMS",
      payload: mockItems,
    });
  }, [dispatch]);

  /*
  The usage of Set  to remove duplicate category names, 
  and simplify the code by using the map method to extract the category names from the items array. 
  The sort method is used to sort the categories alphabetically.
  */
 
  const categories = [...new Set(items.map((item) => item.category))].sort();

  return (
    <Layout className="min-h-screen flex flex-col bg-background">
      <MainHeader />

      <Layout.Content className="container flex-1 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <CategoryCards categories={categories} />

          <CartPanel />
        </div>
      </Layout.Content>

      <MainFooter />
    </Layout>
  );
}
