import BudgetProgress from "@/components/shared/budget-progress";
import SelectedItemsList from "@/components/shared/selected-items-list";

import ActionButtons from "../action-buttons";

import { useBundle } from "@/hooks/useBundle";
import { motion } from "motion/react";

export default function MainContent() {
  const { maxBudget, totalCost, remainingBudget, selectedItems } = useBundle();

  const budgetPercentage = (totalCost / maxBudget) * 100;

  return (
    <motion.div layout className="space-y-4">
      <BudgetProgress
        totalCost={totalCost}
        maxBudget={maxBudget}
        remainingBudget={remainingBudget}
        budgetPercentage={budgetPercentage}
      />

      <SelectedItemsList selectedItems={selectedItems} />

      <ActionButtons />
    </motion.div>
  );
}
