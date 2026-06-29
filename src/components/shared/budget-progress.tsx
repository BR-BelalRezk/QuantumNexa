import { Progress } from "antd";

import { getBudgetColor } from "@/utils";

type BudgetProgressProps = {
  totalCost: number;
  maxBudget: number;
  remainingBudget: number;
  budgetPercentage: number;
};

export default function BudgetProgress({
  totalCost,
  maxBudget,
  remainingBudget,
  budgetPercentage,
}: BudgetProgressProps) {
  const isOverBudget = remainingBudget < 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">Budget Usage</span>

        <span
          className="text-sm font-bold"
          style={{
            color: getBudgetColor(budgetPercentage),
          }}
        >
          ${totalCost} / ${maxBudget}
        </span>
      </div>

      <Progress
        percent={Math.min(Math.round(budgetPercentage), 100)}
        strokeColor={getBudgetColor(budgetPercentage)}
        status={isOverBudget ? "exception" : "active"}
        showInfo={false}
        aria-label="Budget usage"
      />

      <div className="text-xs" aria-live="polite">
        {isOverBudget ? (
          <span className="font-semibold text-red-500">
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
