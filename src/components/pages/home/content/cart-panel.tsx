import { Card } from "antd";

import MainContent from "./main-content";

export default function CartPanel() {
  return (
    <aside>
      <Card className="shadow-lg" title="Build Summary">
        <MainContent />
      </Card>
    </aside>
  );
}
