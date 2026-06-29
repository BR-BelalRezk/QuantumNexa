import { Button, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { useBundle } from "@/hooks/useBundle";

export default function Reset() {
  const { reset, selectedItems } = useBundle();

  const handleReset = () => {
    reset();
    message.success("Build reset successfully.");
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
