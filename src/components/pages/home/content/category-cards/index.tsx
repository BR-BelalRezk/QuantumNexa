import { Empty } from "antd";

import CategorySection from "./category-section";

type Props = {
  categories: string[];
};

export default function CategoryCards({ categories }: Props) {
  if (!categories.length) {
    return (
      <div className="lg:col-span-2">
        <Empty description="No categories found" />
      </div>
    );
  }

  return (
    <div className="space-y-6 lg:col-span-2">
      {categories.map((category) => (
        <CategorySection key={category} category={category} />
      ))}
    </div>
  );
}
