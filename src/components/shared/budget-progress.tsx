import { getBudgetColor } from "@/utils";
import { Progress } from "antd";

type props = {
  budgetPercentage: number;
  totalCost: number;
  maxBudget: number;
  remainingBudget: number;
  isOverBudget: boolean;
};

export default function BudgetProgress({
  budgetPercentage,
  maxBudget,
  remainingBudget,
  isOverBudget,
  totalCost,
}: props) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-foreground">
          Budget Usage
        </span>
        <span
          className="text-sm font-bold"
          style={{ color: getBudgetColor(budgetPercentage) }}
        >
          ${totalCost} / ${maxBudget}
        </span>
      </div>
      <Progress
        percent={Math.min(budgetPercentage, 100)}
        strokeColor={getBudgetColor(budgetPercentage)}
        status={isOverBudget ? "exception" : "active"}
      />
      <div className="text-xs text-muted-foreground mt-1">
        {isOverBudget ? (
          <span className="text-destructive font-semibold">
            Over budget by ${Math.abs(remainingBudget)}
          </span>
        ) : (
          <span className="text-emerald-600 dark:text-emerald-400">
            ${remainingBudget} remaining
          </span>
        )}
      </div>
    </div>
  );
}
