import BudgetProgress from "@/components/shared/budget-progress";
import SelectedItemsList from "@/components/shared/selected-items-list";
import { useBundleStore } from "@/store/bundle";
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
        budgetPercentage={budgetPercentage}
        maxBudget={maxBudget}
        remainingBudget={remainingBudget}
        isOverBudget={isOverBudget}
        totalCost={totalCost}
      />

      <SelectedItemsList selectedItems={selectedItems} />

      <ActionButtons />
    </div>
  );
}
