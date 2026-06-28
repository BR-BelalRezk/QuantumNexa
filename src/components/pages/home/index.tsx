import MainFooter from "@/components/layout/footer";
import MainHeader from "@/components/layout/header";
import { Layout } from "antd";
import CategoryCards from "./content/category-cards";
import DesktopStickyCartPanel from "./content/desktop-sticky-cart-panel";
import MobileDrawer from "./content/mobile-drawer";
import { useBundleStore } from "@/store/bundle";
import { useEffect, useState } from "react";
import { mockItems } from "@/lib/mock-data";

export default function Home() {
  const {
    getSelectedItem,
    isItemDisabled,
    getDisabledReason,
    setItems,
    selectItem,
    maxBudget,
    getTotalCost,
    getRemainingBudget,
    getSelectedItems,
    undo,
    canUndo,
    redo,
    canRedo,
    reset,
  } = useBundleStore();

  const [categories, setCategories] = useState<string[]>([]);

  // Initialize store with mock data
  useEffect(() => {
    setItems(mockItems);
    const uniqueCategories = Array.from(
      new Set(mockItems.map((item) => item.category)),
    ).sort();
    setCategories(uniqueCategories);
  }, [setItems]);

  const getCategoryItems = (category: string) => {
    return mockItems.filter((item) => item.category === category);
  };

  const handleSelectItem = (category: string, itemId: string | null) => {
    selectItem(category, itemId);
  };

  const totalCost = getTotalCost();
  const remainingBudget = getRemainingBudget();
  const selectedItems = getSelectedItems();
  const budgetPercentage = (totalCost / maxBudget) * 100;
  const isOverBudget = remainingBudget < 0;

  const mainContentProps = {
    totalCost,
    remainingBudget,
    selectedItems,
    budgetPercentage,
    isOverBudget,
    maxBudget,
    undo,
    canUndo,
    redo,
    canRedo,
    reset,
    getTotalCost,
    getSelectedItems,
  };
  return (
    <Layout className="min-h-screen flex flex-col bg-background">
      <MainHeader />
      <Layout.Content className="flex-1 container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <CategoryCards
            getSelectedItem={getSelectedItem}
            getCategoryItems={getCategoryItems}
            handleSelectItem={handleSelectItem}
            categories={categories}
            isItemDisabled={isItemDisabled}
            getDisabledReason={getDisabledReason}
          />
          <DesktopStickyCartPanel mainContentProps={mainContentProps} />
        </div>
      </Layout.Content>
      <MobileDrawer mainContentProps={mainContentProps} />
      <MainFooter />
    </Layout>
  );
}
