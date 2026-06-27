import { RedoOutlined } from "@ant-design/icons";
import { Tooltip, Button } from "antd";
import { useBundleStore } from "@/store/bundle";

export default function Redo() {
  const { redo, canRedo } = useBundleStore();

  return (
    <Tooltip title="Redo (Ctrl+Y)">
      <Button
        icon={<RedoOutlined />}
        disabled={!canRedo()}
        onClick={redo}
        size="small"
        className="flex-1"
      >
        Redo
      </Button>
    </Tooltip>
  );
}
