import { Badge } from "antd";

import ItemCard from "./item-card";

import { useBundle } from "@/hooks/useBundle";

type Props = {
  category: string;
};

export default function CategorySection({ category }: Props) {
  const { items, getSelectedItem } = useBundle();

  const selectedItem = getSelectedItem(category);

  const categoryItems = items.filter((item) => item.category === category);

  return (
    <section className="space-y-3" aria-labelledby={`${category}-heading`}>
      <h2
        id={`${category}-heading`}
        className="flex items-center gap-2 text-lg font-bold"
      >
        {category}

        {selectedItem && <Badge status="success" text="Selected" />}
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {categoryItems.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            category={category}
            selected={selectedItem?.id === item.id}
          />
        ))}
      </div>
    </section>
  );
}
