import { Card } from "antd";

import MainContent from "./main-content";
import { LayoutGroup } from "motion/react";

export default function CartPanel() {
  return (
    <aside className="lg:sticky top-24 self-start">
      <Card title="Build Summary">
        <LayoutGroup>
          <MainContent />
        </LayoutGroup>
      </Card>
    </aside>
  );
}
