import { create } from "zustand";

export interface BundleItem {
  id: string;
  name: string;
  price: number;
  category: string;
  incompatibleWith: string[];
  specs?: string;
}

export interface BundleState {
    
//  Base data
  items: BundleItem[];
  selectedItems: Record<string, string>;
  history: Array<Record<string, string>>;
  historyIndex: number;
  maxBudget: number;

// Actions
  selectItem: (category: string, itemId: string | null) => void;
  getSelectedItem: (category: string) => BundleItem | null;
  getTotalCost: () => number;
  getRemainingBudget: () => number;
  isItemDisabled: (itemId: string) => boolean;
  getDisabledReason: (itemId: string) => string | null;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  reset: () => void;
  setItems: (items: BundleItem[]) => void;
  getSelectedItems: () => BundleItem[];
}

export const useBundleStore = create<BundleState>((set, get) => ({
  items: [],
  selectedItems: {},
  history: [{}],
  historyIndex: 0,
  maxBudget: 1000,

  selectItem: (category: string, itemId: string | null) => {
    const state = get();
    const newSelected = { ...state.selectedItems };

    if (itemId === null) {
      delete newSelected[category];
    } else {
      newSelected[category] = itemId;
    }

    // Add to history
    const newHistory = state.history.slice(0, state.historyIndex + 1);
    newHistory.push(newSelected);

    set({
      selectedItems: newSelected,
      history: newHistory,
      historyIndex: newHistory.length - 1,
    });
  },

  getSelectedItem: (category: string) => {
    const state = get();
    const itemId = state.selectedItems[category];
    if (!itemId) return null;
    return state.items.find((item) => item.id === itemId) || null;
  },

  getTotalCost: () => {
    const state = get();
    return Object.values(state.selectedItems).reduce((total, itemId) => {
      const item = state.items.find((i) => i.id === itemId);
      return total + (item?.price || 0);
    }, 0);
  },

  getRemainingBudget: () => {
    const state = get();
    return state.maxBudget - state.getTotalCost();
  },

  isItemDisabled: (itemId: string) => {
    const state = get();
    const item = state.items.find((i) => i.id === itemId);
    if (!item) return false;

    // Check budget constraint
    const totalCost = state.getTotalCost();
    if (totalCost + item.price > state.maxBudget) {
      return true;
    }

    // Check incompatibilities
    for (const [ , selectedItemId] of Object.entries(
      state.selectedItems,
    )) {
      if (item.incompatibleWith.includes(selectedItemId)) {
        return true;
      }
    }

    return false;
  },

  getDisabledReason: (itemId: string) => {
    const state = get();
    const item = state.items.find((i) => i.id === itemId);
    if (!item) return null;

    // Check budget constraint
    const totalCost = state.getTotalCost();
    if (totalCost + item.price > state.maxBudget) {
      return `Budget exceeded (${item.price} > ${state.maxBudget - totalCost} remaining)`;
    }

    // Check incompatibilities
    for (const [ , selectedItemId] of Object.entries(
      state.selectedItems,
    )) {
      if (item.incompatibleWith.includes(selectedItemId)) {
        const incompatibleItem = state.items.find(
          (i) => i.id === selectedItemId,
        );
        return `Incompatible with ${incompatibleItem?.name || "selected item"}`;
      }
    }

    return null;
  },

 
  reset: () => {
    set({
      selectedItems: {},
      history: [{}],
      historyIndex: 0,
    });
  },

  setItems: (items: BundleItem[]) => {
    set({ items });
  },

  getSelectedItems: () => {
    const state = get();
    return Object.values(state.selectedItems)
      .map((itemId) => state.items.find((i) => i.id === itemId))
      .filter((item): item is BundleItem => item !== undefined);
  },






// undo-redo functionality
 undo: () => {
    const state = get();
    if (state.historyIndex > 0) {
      const newIndex = state.historyIndex - 1;
      set({
        selectedItems: { ...state.history[newIndex] },
        historyIndex: newIndex,
      });
    }
  },

  redo: () => {
    const state = get();
    if (state.historyIndex < state.history.length - 1) {
      const newIndex = state.historyIndex + 1;
      set({
        selectedItems: { ...state.history[newIndex] },
        historyIndex: newIndex,
      });
    }
  },

  canUndo: () => {
    const state = get();
    return state.historyIndex > 0;
  },

  canRedo: () => {
    const state = get();
    return state.historyIndex < state.history.length - 1;
  },
// undo-redo functionality


}));
