import { useState } from "react";
import { Button, message } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

import { useBundle } from "@/hooks/useBundle";
import { exportBuildToPDF } from "@/utils";

export default function ExportToPdf() {
  const { selectedItems, totalCost, maxBudget } = useBundle();

  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    try {
      setLoading(true);
      await exportBuildToPDF(selectedItems, totalCost, maxBudget);
      message.success("Build summary exported successfully.");
    } catch {
      message.error("Unable to export the PDF.");
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
      onClick={handleExport}
    >
      Export PDF
    </Button>
  );
}
