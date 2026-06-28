import type { BundleItem } from "@/store/bundle";
import ExportToPdf from "./export-to-pdf";
import Redo from "./redo";
import Reset from "./reset";
import Undo from "./undo";
import { Space } from "antd";

type props = {
  maxBudget: number;
  undo: () => void;
  canUndo: () => boolean;
  redo: () => void;
  canRedo: () => boolean;
  getTotalCost: () => number;
  getSelectedItems: () => BundleItem[];
  reset: () => void;
};

export default function ActionButtons({
  undo,
  canUndo,
  redo,
  canRedo,
  getSelectedItems,
  maxBudget,
  getTotalCost,
  reset,
}: props) {
  return (
    <div className="space-y-2 pt-2 border-t border-border">
      <Space orientation="vertical" style={{ width: "100%" }}>
        <div className="flex gap-2">
          <Undo undo={undo} canUndo={canUndo} />
          <Redo redo={redo} canRedo={canRedo} />
        </div>
        <ExportToPdf
          getSelectedItems={getSelectedItems}
          maxBudget={maxBudget}
          getTotalCost={getTotalCost}
        />
        <Reset getSelectedItems={getSelectedItems} reset={reset} />
      </Space>
    </div>
  );
}
