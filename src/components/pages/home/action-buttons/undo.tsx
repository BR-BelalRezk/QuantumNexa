import { Tooltip, Button } from "antd";
import { UndoOutlined } from "@ant-design/icons";

type props = {
  undo: () => void;
  canUndo: () => boolean;
};

export default function Undo({ undo, canUndo }: props) {
  return (
    <Tooltip title="Undo (Ctrl+Z)">
      <Button
        icon={<UndoOutlined />}
        disabled={!canUndo()}
        onClick={undo}
        size="small"
        className="flex-1"
      >
        Undo
      </Button>
    </Tooltip>
  );
}
