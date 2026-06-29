import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import jsPDF from "jspdf";
import type { BundleItem } from "@/types";

// shadcn helper function
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBudgetColor(budgetPercentage: number) {
  if (budgetPercentage <= 75) return "#10B981";
  if (budgetPercentage <= 95) return "#F59E0B";
  return "#EF4444";
}

// AI generated function to export the selected items and their details to a PDF file
export async function exportBuildToPDF(
  selectedItems: BundleItem[],
  totalCost: number,
  maxBudget: number,
  fileName = "build-summary.pdf",
) {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const remainingBudget = maxBudget - totalCost;

  // =====================
  // Header
  // =====================

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(22);
  pdf.text("Smart Bundle Builder", 20, 20);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  pdf.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 28);

  pdf.line(20, 33, 190, 33);

  // =====================
  // Table Header
  // =====================

  let y = 45;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);

  pdf.text("Category", 20, y);
  pdf.text("Component", 70, y);
  pdf.text("Price", 180, y, {
    align: "right",
  });

  y += 6;

  pdf.line(20, y, 190, y);

  y += 8;

  // =====================
  // Selected Components
  // =====================

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);

  if (selectedItems.length === 0) {
    pdf.text("No components selected.", 20, y);
    y += 10;
  } else {
    selectedItems.forEach((item) => {
      // Add a new page if needed
      if (y > 270) {
        pdf.addPage();
        y = 20;

        pdf.setFont("helvetica", "bold");
        pdf.text("Category", 20, y);
        pdf.text("Component", 70, y);
        pdf.text("Price", 180, y, {
          align: "right",
        });

        y += 6;
        pdf.line(20, y, 190, y);
        y += 8;

        pdf.setFont("helvetica", "normal");
      }

      pdf.text(item.category, 20, y);
      pdf.text(item.name, 70, y);
      pdf.text(`$${item.price}`, 180, y, {
        align: "right",
      });

      y += 8;
    });
  }

  // =====================
  // Summary
  // =====================

  y += 8;

  pdf.line(20, y, 190, y);

  y += 12;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);

  pdf.text("Total Cost", 20, y);
  pdf.text(`$${totalCost}`, 180, y, {
    align: "right",
  });

  y += 10;

  pdf.text("Budget", 20, y);
  pdf.text(`$${maxBudget}`, 180, y, {
    align: "right",
  });

  y += 10;

  pdf.text("Remaining", 20, y);
  pdf.text(`$${remainingBudget}`, 180, y, {
    align: "right",
  });

  // =====================
  // Save PDF
  // =====================

  pdf.save(fileName);
}
