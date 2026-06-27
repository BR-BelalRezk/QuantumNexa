import ExportToPdf from "./export-to-pdf";
import Redo from "./redo";
import Reset from "./reset";
import Undo from "./undo";

import { Space } from "antd";

export default function ActionButtons() {
  return (
    <div className="space-y-2 pt-2 border-t border-border">
      <Space orientation="vertical" style={{ width: "100%" }}>
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
