import { useBundleStore } from "@/store/bundle";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, message } from "antd";

export default function Reset() {
  const { getSelectedItems, reset } = useBundleStore();

  const selectedItems = getSelectedItems();

  const handleReset = () => {
    reset();
    message.info("Build reset to empty state");
  };
  return (
    <Button
      danger
      icon={<DeleteOutlined />}
      block
      disabled={selectedItems.length === 0}
      onClick={handleReset}
    >
      Reset Build
    </Button>
  );
}
