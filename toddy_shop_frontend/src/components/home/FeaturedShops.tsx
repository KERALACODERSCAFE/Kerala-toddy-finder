import { FEATURED_SHOPS } from "@/lib/constants";
import { ShopCard } from "@/components/ui/ShopCard";

export function FeaturedShops() {
  return (
    <section className="max-w-7xl mx-auto py-20 px-8">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="font-[family-name:var(--font-heading)] text-4xl text-primary font-semibold">
            Featured Shops
          </h2>
          <p className="text-stone-600 mt-2">
            The best toddy shops, handpicked for you
          </p>
        </div>
        <button className="text-primary font-bold border-b-2 border-primary pb-1 flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          View All{" "}
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {FEATURED_SHOPS.map((shop) => (
          <ShopCard key={shop.id} shop={shop} />
        ))}
      </div>
    </section>
  );
}
