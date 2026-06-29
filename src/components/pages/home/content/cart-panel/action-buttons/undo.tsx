import { Button, Tooltip } from "antd";
import { UndoOutlined } from "@ant-design/icons";

import { useBundle } from "@/hooks/useBundle";

export default function Undo() {
  const { undo, canUndo } = useBundle();

  return (
    <Tooltip title="Undo (Ctrl + Z)">
      <Button
        icon={<UndoOutlined />}
        onClick={undo}
        disabled={!canUndo}
        size="small"
        className="flex-1"
      >
        Undo
      </Button>
    </Tooltip>
  );
}
