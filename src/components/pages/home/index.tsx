import { useEffect, useMemo } from "react";
import { Layout } from "antd";

import MainHeader from "@/components/layout/header";
import MainFooter from "@/components/layout/footer";

import CategoryCards from "./content/category-cards";
import DesktopStickyCartPanel from "./content/desktop-sticky-cart-panel";

import { useBundleStore } from "@/store/bundle";
import { mockItems } from "@/lib/mock-data";

export default function Home() {
  const setItems = useBundleStore((state) => state.setItems);

  useEffect(() => {
    setItems(mockItems);
  }, [setItems]);

  const categories = useMemo(
    () => [...new Set(mockItems.map((item) => item.category))].sort(),
    [],
  );

  return (
    <Layout className="min-h-screen flex flex-col bg-background">
      <MainHeader />

      <Layout.Content className="container flex-1 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <CategoryCards categories={categories} />

          <DesktopStickyCartPanel />
        </div>
      </Layout.Content>

      <MainFooter />
    </Layout>
  );
}
