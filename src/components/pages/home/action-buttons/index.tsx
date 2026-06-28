import { Space } from "antd";

import Undo from "./undo";
import Redo from "./redo";
import Reset from "./reset";
import ExportToPdf from "./export-to-pdf";

export default function ActionButtons() {
  return (
    <div className="space-y-2 border-t border-border pt-2">
      <Space direction="vertical" style={{ width: "100%" }}>
        <div className="flex gap-2">
          <Undo />
          <Redo />
        </div>

        <ExportToPdf />

        <Reset />
      </Space>
    </div>
  );
}
