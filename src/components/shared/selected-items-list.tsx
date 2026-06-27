import { Empty } from "antd";
import { type BundleItem } from "@/store/bundle";

type props = {
  selectedItems: BundleItem[];
};

export default function SelectedItemsList({ selectedItems }: props) {
  return (
    <div>
      <h3 className="font-semibold text-foreground mb-2">
        Selected Items ({selectedItems.length})
      </h3>
      {selectedItems.length === 0 ? (
        <Empty description="No items selected" />
      ) : (
        <div className="space-y-2">
          {selectedItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-2 bg-secondary rounded-md text-sm"
            >
              <div className="flex-1">
                <p className="font-medium text-foreground m-0">{item.name}</p>
                <p className="text-xs text-muted-foreground m-0">
                  {item.category}
                </p>
              </div>
              <span className="font-semibold text-indigo-600 dark:text-indigo-400 ml-2">
                ${item.price}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
