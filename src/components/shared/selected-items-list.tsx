import { Empty } from "antd";

import { type BundleItem } from "@/types";

type Props = {
  selectedItems: BundleItem[];
};

export default function SelectedItemsList({ selectedItems }: Props) {
  return (
    <div>
      <h3 className="mb-3 font-semibold text-foreground">
        Selected Items ({selectedItems.length})
      </h3>

      {selectedItems.length === 0 ? (
        <Empty description="No items selected" />
      ) : (
        <div className="space-y-2">
          {selectedItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-md bg-secondary p-3"
            >
              <div className="flex-1">
                <p className="m-0 font-medium text-foreground">{item.name}</p>

                <p className="m-0 text-xs text-muted-foreground">
                  {item.category}
                </p>
              </div>

              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                ${item.price}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
