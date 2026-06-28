import { useBundleStore } from "@/store/bundle";

import BudgetProgress from "@/components/shared/budget-progress";
import SelectedItemsList from "@/components/shared/selected-items-list";
import ActionButtons from "../action-buttons";

export default function MainContent() {
  const { maxBudget, getTotalCost, getRemainingBudget, getSelectedItems } =
    useBundleStore();

  const totalCost = getTotalCost();
  const remainingBudget = getRemainingBudget();
  const selectedItems = getSelectedItems();

  const budgetPercentage = (totalCost / maxBudget) * 100;
  const isOverBudget = remainingBudget < 0;

  return (
    <div className="space-y-4">
      <BudgetProgress
        totalCost={totalCost}
        maxBudget={maxBudget}
        remainingBudget={remainingBudget}
        budgetPercentage={budgetPercentage}
        isOverBudget={isOverBudget}
      />

      <SelectedItemsList selectedItems={selectedItems} />

      <ActionButtons />
    </div>
  );
}
