import { Card, Badge, Tooltip } from "antd";
import type { KeyboardEvent } from "react";

import type { BundleItem } from "@/types";
import { useBundle } from "@/hooks/useBundle";

type Props = {
  item: BundleItem;
  category: string;
  selected: boolean;
};

export default function ItemCard({ item, category, selected }: Props) {
  const { isItemDisabled, getDisabledReason, selectItem } = useBundle();

  const disabled = isItemDisabled(item.id);

  const reason = getDisabledReason(item.id);

  function toggleSelection() {
    if (disabled) return;

    selectItem(category, selected ? null : item.id);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleSelection();
    }
  }

  return (
    <Tooltip title={reason ?? item.specs}>
      <Card
        hoverable={!disabled}
        onClick={toggleSelection}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="button"
        aria-pressed={selected}
        aria-disabled={disabled}
        aria-label={`${item.name} - ${item.price} dollars`}
        className={`
          transition-all duration-200
          ${
            selected
              ? "scale-[1.02] ring-2 ring-indigo-500 shadow-lg"
              : "hover:shadow-md"
          }
          ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
        `}
        style={{
          borderColor: selected ? "#4F46E5" : undefined,
        }}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-sm font-semibold">{item.name}</h3>

            <p className="mt-1 text-xs text-muted-foreground">{item.specs}</p>
          </div>

          {selected && <Badge status="success" className="ml-2" />}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-2">
          <span className="font-bold text-indigo-600 dark:text-indigo-400">
            ${item.price}
          </span>

          {disabled && reason && (
            <span className="text-xs text-destructive">{reason}</span>
          )}
        </div>
      </Card>
    </Tooltip>
  );
}
