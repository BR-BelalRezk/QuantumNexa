import { Empty } from "antd";
import { AnimatePresence, motion } from "motion/react";

import type { BundleItem } from "@/types";

type Props = {
  selectedItems: BundleItem[];
};

export default function SelectedItemsList({ selectedItems }: Props) {
  return (
    <div>
      <h3 className="mb-3 font-semibold text-foreground">
        Selected Items ({selectedItems.length})
      </h3>

      <AnimatePresence mode="popLayout">
        {selectedItems.length === 0 ? (
          <motion.div
            key="empty"
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Empty description="No items selected" />
          </motion.div>
        ) : (
          <motion.div layout className="space-y-2">
            <AnimatePresence>
              {selectedItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{
                    opacity: 0,
                    y: -15,
                    scale: 0.95,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: -15,
                    scale: 0.95,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className="flex items-center justify-between rounded-md bg-secondary p-3"
                >
                  <div className="flex-1">
                    <p className="m-0 font-medium">{item.name}</p>

                    <p className="m-0 text-xs text-muted-foreground">
                      {item.category}
                    </p>
                  </div>

                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                    ${item.price}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
