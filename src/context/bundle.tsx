/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useReducer, type ReactNode } from "react";

import { type BundleAction, type BundleState } from "@/types";

const initialState: BundleState = {
  items: [],
  selectedItems: {},
  history: [{}],
  historyIndex: 0,
  maxBudget: 1000,
};


// Usage of reducer instead of useState for better state management and undo/redo functionality
function reducer(state: BundleState, action: BundleAction): BundleState {
  switch (action.type) {
    case "SET_ITEMS":
      return {
        ...state,
        items: action.payload,
      };

    case "SELECT_ITEM": {
      const { category, itemId } = action.payload;

      const selectedItems = {
        ...state.selectedItems,
      };

      if (itemId === selectedItems[category]) {
        return state;
      }

      if (itemId === null) {
        delete selectedItems[category];
      } else {
        selectedItems[category] = itemId;
      }

      const history = state.history.slice(0, state.historyIndex + 1);

      history.push(selectedItems);

      return {
        ...state,
        selectedItems,
        history,
        historyIndex: history.length - 1,
      };
    }

    case "UNDO": {
      if (state.historyIndex === 0) {
        return state;
      }

      const historyIndex = state.historyIndex - 1;

      return {
        ...state,
        historyIndex,
        selectedItems: {
          ...state.history[historyIndex],
        },
      };
    }

    case "REDO": {
      if (state.historyIndex >= state.history.length - 1) {
        return state;
      }

      const historyIndex = state.historyIndex + 1;

      return {
        ...state,
        historyIndex,
        selectedItems: {
          ...state.history[historyIndex],
        },
      };
    }

    case "RESET":
      return {
        ...state,
        selectedItems: {},
        history: [{}],
        historyIndex: 0,
      };

    default:
      return state;
  }
}


type BundleContextValue = {
  state: BundleState;
  dispatch: React.Dispatch<BundleAction>;
};

const BundleContext = createContext<BundleContextValue | null>(null);

export function BundleProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BundleContext.Provider value={{ state, dispatch }}>
      {children}
    </BundleContext.Provider>
  );
}

export function useBundleContext() {
  const context = useContext(BundleContext);

  if (!context) {
    throw new Error("useBundleContext must be used inside BundleProvider.");
  }

  return context;
}
