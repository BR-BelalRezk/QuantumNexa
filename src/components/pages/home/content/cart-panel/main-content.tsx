import BudgetProgress from "@/components/pages/home/content/cart-panel/budget-progress";
import SelectedItemsList from "@/components/pages/home/content/cart-panel/selected-items-list";

import { useBundle } from "@/hooks/useBundle";
import { motion } from "motion/react";
import ActionButtons from "./action-buttons";

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
