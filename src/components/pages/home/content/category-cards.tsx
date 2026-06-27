import { mockItems } from "@/lib/mock-data";
import { useBundleStore } from "@/store/bundle";
import { Badge, Card, Spin, Tooltip } from "antd";
import { useEffect, useState } from "react";

export default function CategoryCards() {
  const {
    getSelectedItem,
    isItemDisabled,
    getDisabledReason,
    setItems,
    selectItem,
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

  return (
    <div className="lg:col-span-2 space-y-6">
      {categories.length === 0 ? (
        <Spin />
      ) : (
        categories.map((category) => (
          <div key={category} className="space-y-3">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              {category}
              {getSelectedItem(category) && (
                <Badge status="success" text="Selected" />
              )}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {getCategoryItems(category).map((item) => {
                const isSelected = getSelectedItem(category)?.id === item.id;
                const isDisabled = isItemDisabled(item.id);
                const disabledReason = getDisabledReason(item.id);

                return (
                  <Tooltip
                    key={item.id}
                    title={disabledReason || item.specs}
                    placement="top"
                  >
                    <Card
                      className={`cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? "ring-2 ring-indigo-500 shadow-lg scale-105"
                          : "hover:shadow-md"
                      } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                      onClick={() => {
                        if (!isDisabled) {
                          handleSelectItem(
                            category,
                            isSelected ? null : item.id,
                          );
                        }
                      }}
                      style={{
                        borderColor: isSelected ? "#4F46E5" : undefined,
                      }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground m-0 text-sm">
                            {item.name}
                          </h3>
                          <p className="text-xs text-muted-foreground m-0 mt-1">
                            {item.specs}
                          </p>
                        </div>
                        {isSelected && (
                          <Badge status="success" className="ml-2" />
                        )}
                      </div>
                      <div className="flex justify-between items-center mt-3 pt-2 border-t border-border">
                        <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                          ${item.price}
                        </span>
                        {isDisabled && disabledReason && (
                          <span className="text-xs text-destructive">
                            {disabledReason.split("(")[0].trim()}
                          </span>
                        )}
                      </div>
                    </Card>
                  </Tooltip>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
