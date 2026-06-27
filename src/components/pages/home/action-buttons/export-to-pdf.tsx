import { useBundleStore } from "@/store/bundle";
import { exportBuildToPDF } from "@/utils";
import { DownloadOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { useState } from "react";

export default function ExportToPdf() {
  const { getSelectedItems, maxBudget, getTotalCost } = useBundleStore();
  const [loading, setLoading] = useState(false);

  const selectedItems = getSelectedItems();
  const totalCost = getTotalCost();

  const handleExportPDF = async () => {
    try {
      setLoading(true);
      await exportBuildToPDF(selectedItems, totalCost, maxBudget);
      message.success("Build summary exported to PDF!");
    } catch (error) {
      message.error("Failed to export PDF");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      type="primary"
      icon={<DownloadOutlined />}
      block
      loading={loading}
      disabled={selectedItems.length === 0}
      onClick={handleExportPDF}
    >
      Export PDF
    </Button>
  );
}
