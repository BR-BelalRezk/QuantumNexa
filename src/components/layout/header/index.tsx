import Logo from "@/components/shared/logo";
import { useTheme } from "@/context/theme";
import { BgColorsOutlined } from "@ant-design/icons";
import { Layout, Tooltip, Button } from "antd";

const { Header } = Layout;

export default function MainHeader() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Header className="sticky top-0 z-50 bg-white dark:bg-slate-900 shadow-md border-b border-border">
      <div className="container flex items-center justify-between h-full">
        <div className="flex items-center gap-3">
          <Logo size="sm" />
        </div>
        <div className="flex items-center gap-4">
          <Tooltip
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            <Button icon={<BgColorsOutlined />} onClick={toggleTheme} />
          </Tooltip>
        </div>
      </div>
    </Header>
  );
}
