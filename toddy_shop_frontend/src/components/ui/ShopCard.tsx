import Image from "next/image";
import Link from "next/link";

interface Shop {
  id: string;
  name: string;
  district: string;
  rating: number;
  badge: string | null;
  badgeColor: string;
  tag: string;
  image: string;
  alt: string;
}

export function ShopCard({ shop }: { shop: Shop }) {
  return (
    <div className="group bg-white border border-tertiary-fixed rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
      <div className="relative h-48">
        <Image
          src={shop.image}
          alt={shop.alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {shop.badge && (
          <div
            className={`absolute top-4 right-4 ${shop.badgeColor} text-white px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 uppercase tracking-wider`}
          >
            {shop.badge === "Hygiene Verified" && (
              <span
                className="material-symbols-outlined text-[12px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
            )}
            {shop.badge}
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-[family-name:var(--font-heading)] text-xl text-primary font-bold">
            {shop.name}
          </h4>
          <span className="text-secondary font-bold">{shop.rating} ★</span>
        </div>
        <p className="text-stone-500 text-sm mb-4">{shop.district}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="leaf-chip bg-secondary/10 text-secondary px-3 py-1 text-[11px] font-bold">
            {shop.district.toUpperCase()}
          </span>
          <span className="leaf-chip bg-primary/5 text-primary px-3 py-1 text-[11px] font-bold">
            {shop.tag}
          </span>
        </div>
        <Link
          href={`/shops/${shop.id}`}
          className="w-full py-3 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
