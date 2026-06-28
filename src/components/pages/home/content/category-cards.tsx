import { Badge, Card, Spin, Tooltip } from "antd";

import { mockItems } from "@/lib/mock-data";
import { useBundleStore } from "@/store/bundle";

type Props = {
  categories: string[];
};

export default function CategoryCards({ categories }: Props) {
  const {
    getSelectedItem,
    isItemDisabled,
    getDisabledReason,
    selectItem,
  } = useBundleStore();

  const getCategoryItems = (category: string) =>
    mockItems.filter((item) => item.category === category);

  if (!categories.length) {
    return (
      <div className="lg:col-span-2 flex justify-center py-10">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="lg:col-span-2 space-y-6">
      {categories.map((category) => {
        const selectedItem = getSelectedItem(category);

        return (
          <section key={category} className="space-y-3">
            <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
              {category}

              {selectedItem && (
                <Badge status="success" text="Selected" />
              )}
            </h2>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {getCategoryItems(category).map((item) => {
                const isSelected = selectedItem?.id === item.id;
                const isDisabled = isItemDisabled(item.id);
                const disabledReason = getDisabledReason(item.id);

                return (
                  <Tooltip
                    key={item.id}
                    placement="top"
                    title={disabledReason ?? item.specs}
                  >
                    <Card
                      hoverable={!isDisabled}
                      onClick={() => {
                        if (isDisabled) return;

                        selectItem(
                          category,
                          isSelected ? null : item.id,
                        );
                      }}
                      className={`
                        transition-all duration-200
                        ${
                          isSelected
                            ? "ring-2 ring-indigo-500 shadow-lg scale-[1.02]"
                            : "hover:shadow-md"
                        }
                        ${
                          isDisabled
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer"
                        }
                      `}
                      style={{
                        borderColor: isSelected
                          ? "#4F46E5"
                          : undefined,
                      }}
                    >
                      <div className="mb-2 flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="m-0 text-sm font-semibold">
                            {item.name}
                          </h3>

                          <p className="mt-1 m-0 text-xs text-muted-foreground">
                            {item.specs}
                          </p>
                        </div>

                        {isSelected && (
                          <Badge
                            status="success"
                            className="ml-2"
                          />
                        )}
                      </div>

                      <div className="mt-3 flex items-center justify-between border-t border-border pt-2">
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
          </section>
        );
      })}
    </div>
  );
}