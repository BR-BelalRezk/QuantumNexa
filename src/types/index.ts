// Inspired from the mock data (backend later)
export interface BundleItem {
  id: string;
  name: string;
  price: number;
  category: string;
  incompatibleWith: string[];
  specs?: string;
}

// Connection between the state and the actions for the reducer for better (undo/redo) functionality
export interface BundleState {
  items: BundleItem[];
  selectedItems: Record<string, string>;

  history: Record<string, string>[];
  historyIndex: number;

  maxBudget: number;
}

// Bundle actions for the reducer
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
