import { Layout } from "antd";

const { Footer } = Layout;

export default function MainFooter() {
  return (
    <Footer className="text-center text-muted-foreground text-sm border-t border-border">
      <p className="m-0">
        Smart Bundle Builder © {new Date().getFullYear()} | Build your perfect
        tech setup with ease
      </p>
    </Footer>
  );
}
