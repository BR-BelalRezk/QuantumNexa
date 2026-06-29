// import type { BundleItem } from "@/store/bundle";

// export type MainContentProps = {
//   mainContentProps: {
//     totalCost: number;
//     remainingBudget: number;
//     budgetPercentage: number;
//     isOverBudget: boolean;
//     selectedItems: BundleItem[];
//     maxBudget: number;
//     undo: () => void;
//     canUndo: () => boolean;
//     redo: () => void;
//     canRedo: () => boolean;
//     getTotalCost: () => number;
//     getSelectedItems: () => BundleItem[];
//     reset: () => void;
//   };
// };

export interface BundleItem {
  id: string;
  name: string;
  price: number;
  category: string;
  incompatibleWith: string[];
  specs?: string;
}

export interface BundleState {
  items: BundleItem[];
  selectedItems: Record<string, string>;

  history: Record<string, string>[];
  historyIndex: number;

  maxBudget: number;
}

export type BundleAction =
  | {
      type: "SET_ITEMS";
      payload: BundleItem[];
    }
  | {
      type: "SELECT_ITEM";
      payload: {
        category: string;
        itemId: string | null;
      };
    }
  | {
      type: "UNDO";
    }
  | {
      type: "REDO";
    }
  | {
      type: "RESET";
    };
