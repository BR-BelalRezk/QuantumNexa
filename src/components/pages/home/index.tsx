import MainFooter from "@/components/layout/footer";
import MainHeader from "@/components/layout/header";
import { Layout } from "antd";
import CategoryCards from "./content/category-cards";
import DesktopStickyCartPanel from "./content/desktop-sticky-cart-panel";
import MobileDrawer from "./content/mobile-drawer";

export default function Home() {
  return (
    <Layout className="min-h-screen flex flex-col bg-background">
      <MainHeader />
      <Layout.Content className="flex-1 container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <CategoryCards />
        </div>
        <DesktopStickyCartPanel />
      </Layout.Content>
      <MobileDrawer />
      <MainFooter />
    </Layout>
  );
}
