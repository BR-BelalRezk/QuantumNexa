import { Button, Tooltip } from "antd";
import { RedoOutlined } from "@ant-design/icons";

import { useBundleStore } from "@/store/bundle";

export default function Redo() {
  const { redo, canRedo } = useBundleStore();

  return (
    <Tooltip title="Redo (Ctrl + Y)">
      <Button
        icon={<RedoOutlined />}
        onClick={redo}
        disabled={!canRedo()}
        size="small"
        className="flex-1"
      >
        Redo
      </Button>
    </Tooltip>
  );
}
