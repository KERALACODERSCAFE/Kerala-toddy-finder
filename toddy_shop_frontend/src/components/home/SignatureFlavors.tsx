import Image from "next/image";
import { SIGNATURE_DISHES } from "@/lib/constants";

export function SignatureFlavors() {
  return (
    <section className="max-w-7xl mx-auto py-24 px-8">
      <div className="mb-16">
        <h2 className="font-[family-name:var(--font-heading)] text-4xl text-primary text-center font-semibold">
          Signature Shaap Flavors
        </h2>
        <p className="text-center text-stone-600 mt-2">
          Authentic dishes that define the toddy shop experience
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {SIGNATURE_DISHES.map((dish) => (
          <div
            key={dish.name}
            className="group relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer"
          >
            <Image
              src={dish.image}
              alt={dish.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end">
              <span className="text-white font-bold text-[13px] tracking-wider">
                {dish.name.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
