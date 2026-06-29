import { Button, Tooltip } from "antd";
import { RedoOutlined } from "@ant-design/icons";

import { useBundle } from "@/hooks/useBundle";

export default function Redo() {
  const { redo, canRedo } = useBundle();

  return (
    <Tooltip title="Redo (Ctrl + Y)">
      <Button
        icon={<RedoOutlined />}
        onClick={redo}
        disabled={!canRedo}
        size="small"
        className="flex-1"
      >
        Redo
      </Button>
    </Tooltip>
  );
}
