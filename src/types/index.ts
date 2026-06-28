import type { BundleItem } from "@/store/bundle";

export type MainContentProps = {
  mainContentProps: {
    totalCost: number;
    remainingBudget: number;
    budgetPercentage: number;
    isOverBudget: boolean;
    selectedItems: BundleItem[];
    maxBudget: number;
    undo: () => void;
    canUndo: () => boolean;
    redo: () => void;
    canRedo: () => boolean;
    getTotalCost: () => number;
    getSelectedItems: () => BundleItem[];
    reset: () => void;
  };
};
