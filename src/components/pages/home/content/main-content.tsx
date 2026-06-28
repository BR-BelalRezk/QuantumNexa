import BudgetProgress from "@/components/shared/budget-progress";
import SelectedItemsList from "@/components/shared/selected-items-list";
import ActionButtons from "../action-buttons";
import type { MainContentProps } from "@/types";

export default function MainContent(props: MainContentProps) {
  const {
    maxBudget,
    totalCost,
    remainingBudget,
    selectedItems,
    budgetPercentage,
    isOverBudget,
    undo,
    canUndo,
    redo,
    canRedo,

    getTotalCost,
    getSelectedItems,
    reset,
  } = props.mainContentProps;

  return (
    <div className="space-y-4">
      <BudgetProgress
        budgetPercentage={budgetPercentage}
        maxBudget={maxBudget}
        remainingBudget={remainingBudget}
        isOverBudget={isOverBudget}
        totalCost={totalCost}
      />

      <SelectedItemsList selectedItems={selectedItems} />

      <ActionButtons
        undo={undo}
        canUndo={canUndo}
        redo={redo}
        canRedo={canRedo}
        maxBudget={maxBudget}
        getTotalCost={getTotalCost}
        getSelectedItems={getSelectedItems}
        reset={reset}
      />
    </div>
  );
}
