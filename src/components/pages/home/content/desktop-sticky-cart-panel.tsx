import { Card } from "antd";
import MainContent from "./main-content";

export default function DesktopStickyCartPanel() {
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
        <MainContent />
      </Card>
    </div>
  );
}
