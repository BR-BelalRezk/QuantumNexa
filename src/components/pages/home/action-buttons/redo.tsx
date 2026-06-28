import { RedoOutlined } from "@ant-design/icons";
import { Tooltip, Button } from "antd";

type props = {
  redo: () => void;
  canRedo: () => boolean;
};

export default function Redo({ redo, canRedo }: props) {
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
