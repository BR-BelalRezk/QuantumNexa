import { Drawer } from "antd";
import MainContent from "./main-content";
import { useDrawer } from "@/context/mobile-drawer";
import type { MainContentProps } from "@/types";

export default function MobileDrawer(props: MainContentProps) {
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
      <MainContent {...props} />
    </Drawer>
  );
}
