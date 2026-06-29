import { Badge, Card, Empty, Tooltip } from "antd";
import { type KeyboardEvent } from "react";

import { useBundle } from "@/hooks/useBundle";

type Props = {
  categories: string[];
};

export default function CategoryCards({ categories }: Props) {
  const {
    items,
    getSelectedItem,
    isItemDisabled,
    getDisabledReason,
    selectItem,
  } = useBundle();

  if (!categories.length) {
    return (
      <div className="lg:col-span-2">
        <Empty description="No categories found" />
      </div>
    );
  }

  return (
    <div className="lg:col-span-2 space-y-6">
      {categories.map((category) => {
        const selectedItem = getSelectedItem(category);

        const categoryItems = items.filter(
          (item) => item.category === category,
        );

        return (
          <section
            key={category}
            className="space-y-3"
            aria-labelledby={`${category}-heading`}
          >
            <h2
              id={`${category}-heading`}
              className="flex items-center gap-2 text-lg font-bold text-foreground"
            >
              {category}

              {selectedItem && <Badge status="success" text="Selected" />}
            </h2>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {categoryItems.map((item) => {
                const isSelected = selectedItem?.id === item.id;

                const disabled = isItemDisabled(item.id);

                const reason = getDisabledReason(item.id);

                const toggleSelection = () => {
                  if (disabled) return;

                  selectItem(category, isSelected ? null : item.id);
                };

                const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleSelection();
                  }
                };

                return (
                  <Tooltip key={item.id} title={reason ?? item.specs}>
                    <Card
                      hoverable={!disabled}
                      onClick={toggleSelection}
                      onKeyDown={handleKeyDown}
                      tabIndex={disabled ? -1 : 0}
                      role="button"
                      aria-pressed={isSelected}
                      aria-disabled={disabled}
                      aria-label={`${item.name} - ${item.price} dollars`}
                      className={`
                        transition-all duration-200
                        ${
                          isSelected
                            ? "ring-2 ring-indigo-500 shadow-lg scale-[1.02]"
                            : "hover:shadow-md"
                        }
                        ${
                          disabled
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer"
                        }
                      `}
                      style={{
                        borderColor: isSelected ? "#4F46E5" : undefined,
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold">{item.name}</h3>

                          <p className="mt-1 text-xs text-muted-foreground">
                            {item.specs}
                          </p>
                        </div>

                        {isSelected && (
                          <Badge status="success" className="ml-2" />
                        )}
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-border pt-2">
                        <span className="font-bold text-indigo-600 dark:text-indigo-400">
                          ${item.price}
                        </span>

                        {disabled && reason && (
                          <span className="text-xs text-destructive">
                            {reason}
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
