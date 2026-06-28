import { useState } from "react";
import { Button, message } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

import { useBundleStore } from "@/store/bundle";
import { exportBuildToPDF } from "@/utils";

export default function ExportToPdf() {
  const { getSelectedItems, getTotalCost, maxBudget } = useBundleStore();

  const [loading, setLoading] = useState(false);

  const selectedItems = getSelectedItems();
  const totalCost = getTotalCost();

  const handleExportPDF = async () => {
    try {
      setLoading(true);

      await exportBuildToPDF(selectedItems, totalCost, maxBudget);

      message.success("Build summary exported to PDF!");
    } catch (error) {
      console.error(error);
      message.error("Failed to export PDF");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      block
      type="primary"
      icon={<DownloadOutlined />}
      loading={loading}
      disabled={selectedItems.length === 0}
      onClick={handleExportPDF}
    >
      Export PDF
    </Button>
  );
}
