import { DISTRICTS } from "@/lib/constants";

export function DistrictExplorer() {
  return (
    <section className="bg-surface-container-low py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-heading)] text-4xl text-primary font-semibold">
            Explore by District
          </h2>
          <p className="text-stone-600 mt-2">
            Choose your district and find the best shops nearby
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {DISTRICTS.map((district) => (
            <button
              key={district}
              className="bg-white border border-tertiary-fixed py-4 rounded-xl hover:border-secondary hover:text-secondary transition-all flex flex-col items-center cursor-pointer"
            >
              <span className="font-bold text-[13px] tracking-wider">
                {district.toUpperCase()}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
