import { Card } from "antd";

import MainContent from "./main-content";

export default function DesktopStickyCartPanel() {
  return (
    <aside className="hidden lg:block">
      <Card className="sticky top-24 shadow-lg" title="Build Summary">
        <MainContent />
      </Card>
    </aside>
  );
}
