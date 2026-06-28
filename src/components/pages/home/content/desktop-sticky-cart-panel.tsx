import { Card } from "antd";
import MainContent from "./main-content";
import type { MainContentProps } from "@/types";

export default function DesktopStickyCartPanel(props: MainContentProps) {
  return (
    <div className="hidden lg:block">
      <Card
        className="sticky top-24 shadow-lg"
        title={
          <div className="flex items-center justify-between">
            <span>Build Summary</span>
          </div>
        }
      >
        <MainContent {...props} />
      </Card>
    </div>
  );
}
