import type { BundleItem } from "@/store/bundle";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, message } from "antd";

type props = {
  getSelectedItems: () => BundleItem[];
  reset: () => void;
};

export default function Reset({ getSelectedItems, reset }: props) {
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
