import { type BundleItem } from "@/types";

export function getSelectedItem(
  category: string,
  selectedItems: Record<string, string>,
  items: BundleItem[],
) {
  const id = selectedItems[category];

  if (!id) return null;

  return items.find((item) => item.id === id) ?? null;
}

export function getSelectedItems(
  selectedItems: Record<string, string>,
  items: BundleItem[],
) {
  return Object.values(selectedItems)
    .map((id) => items.find((item) => item.id === id))
    .filter((item): item is BundleItem => item !== undefined);
}

export function getTotalCost(
  selectedItems: Record<string, string>,
  items: BundleItem[],
) {
  return getSelectedItems(selectedItems, items).reduce(
    (total, item) => total + item.price,
    0,
  );
}

export function getRemainingBudget(
  selectedItems: Record<string, string>,
  items: BundleItem[],
  maxBudget: number,
) {
  return maxBudget - getTotalCost(selectedItems, items);
}

/*
Got some AI help here, 
but I think this is a good implementation of the logic for checking 
incompatibilities and budget constraints for bundle items. 
The functions are well-structured and make use of
helper functions to keep the code clean and readable.
*/

export function hasIncompatibility(
  candidate: BundleItem,
  selectedItems: Record<string, string>,
  items: BundleItem[],
) {
  const selected = getSelectedItems(selectedItems, items);

  return selected.some((selectedItem) => {
    return (
      candidate.incompatibleWith.includes(selectedItem.id) ||
      selectedItem.incompatibleWith.includes(candidate.id)
    );
  });
}

export function exceedsBudget(
  candidate: BundleItem,
  selectedItems: Record<string, string>,
  items: BundleItem[],
  maxBudget: number,
) {
  const total = getTotalCost(selectedItems, items);

  const currentSelection = getSelectedItem(
    candidate.category,
    selectedItems,
    items,
  );

  const adjustedTotal = total - (currentSelection?.price ?? 0);

  return adjustedTotal + candidate.price > maxBudget;
}

export function isItemDisabled(
  candidate: BundleItem,
  selectedItems: Record<string, string>,
  items: BundleItem[],
  maxBudget: number,
) {
  return (
    exceedsBudget(candidate, selectedItems, items, maxBudget) ||
    hasIncompatibility(candidate, selectedItems, items)
  );
}

export function getDisabledReason(
  candidate: BundleItem,
  selectedItems: Record<string, string>,
  items: BundleItem[],
  maxBudget: number,
) {
  if (exceedsBudget(candidate, selectedItems, items, maxBudget)) {
    return "Exceeds remaining budget";
  }

  const selected = getSelectedItems(selectedItems, items);

  const incompatible = selected.find(
    (selectedItem) =>
      candidate.incompatibleWith.includes(selectedItem.id) ||
      selectedItem.incompatibleWith.includes(candidate.id),
  );

  if (incompatible) {
    return `Incompatible with ${incompatible.name}`;
  }

  return null;
}
