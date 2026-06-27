import { Drawer } from "antd";
import MainContent from "./main-content";
import { useDrawer } from "@/context/mobile-drawer";

export default function MobileDrawer() {
  const { close, isOpen } = useDrawer();
  return (
    <Drawer
      title="Build Summary"
      placement="bottom"
      onClose={close}
      open={isOpen}
      size="80vh"
      className="lg:hidden"
    >
      <MainContent />
    </Drawer>
  );
}
