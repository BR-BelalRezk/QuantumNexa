import { Button, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { useBundleStore } from "@/store/bundle";

export default function Reset() {
  const { reset, getSelectedItems } = useBundleStore();

  const selectedItems = getSelectedItems();

  const handleReset = () => {
    reset();
    message.info("Build reset to empty state");
  };

  return (
    <Button
      danger
      block
      icon={<DeleteOutlined />}
      disabled={selectedItems.length === 0}
      onClick={handleReset}
    >
      Reset Build
    </Button>
  );
}
