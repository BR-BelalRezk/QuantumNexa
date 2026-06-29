import { useBundleContext } from "@/context/bundle";

import {
  getDisabledReason,
  getRemainingBudget,
  getSelectedItem,
  getSelectedItems,
  getTotalCost,
  isItemDisabled,
} from "@/utils/bundle-utils";

/* 
Centerlization of the bundle (Business) logic for the components to use, 
this is a custom hook that uses the context and 
the utils functions to provide a clean API for the components to use. 
It also provides undo/redo functionality and reset functionality (we will later explain the approach of doing this functionality in the readme file).
*/

export function useBundle() {
  const { state, dispatch } = useBundleContext();

  const totalCost = getTotalCost(state.selectedItems, state.items);

  const remainingBudget = getRemainingBudget(
    state.selectedItems,
    state.items,
    state.maxBudget,
  );

  const selectedItems = getSelectedItems(state.selectedItems, state.items);

  function selectItem(category: string, itemId: string | null) {
    dispatch({
      type: "SELECT_ITEM",
      payload: {
        category,
        itemId,
      },
    });
  }

  function setItems(items: typeof state.items) {
    dispatch({
      type: "SET_ITEMS",
      payload: items,
    });
  }

  function undo() {
    dispatch({
      type: "UNDO",
    });
  }

  function redo() {
    dispatch({
      type: "REDO",
    });
  }

  function reset() {
    dispatch({
      type: "RESET",
    });
  }

  function getSelectedItemByCategory(category: string) {
    return getSelectedItem(category, state.selectedItems, state.items);
  }

  function isDisabled(itemId: string) {
    const item = state.items.find((i) => i.id === itemId);

    if (!item) {
      return false;
    }

    if (state.selectedItems[item.category] === item.id) {
      return false;
    }

    return isItemDisabled(
      item,
      state.selectedItems,
      state.items,
      state.maxBudget,
    );
  }

  function getItemDisabledReason(itemId: string) {
    const item = state.items.find((i) => i.id === itemId);

    if (!item) {
      return null;
    }

    return getDisabledReason(
      item,
      state.selectedItems,
      state.items,
      state.maxBudget,
    );
  }

  return {
    dispatch,
    items: state.items,
    selectedItems,
    selectedMap: state.selectedItems,

    maxBudget: state.maxBudget,

    totalCost,
    remainingBudget,

    getSelectedItem: getSelectedItemByCategory,
    isItemDisabled: isDisabled,
    getDisabledReason: getItemDisabledReason,

    selectItem,
    setItems,
    undo,
    redo,
    reset,

    canUndo: state.historyIndex > 0,
    canRedo: state.historyIndex < state.history.length - 1,
  };
}
