export default async function ShopDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="max-w-7xl mx-auto py-20 px-8">
      <div className="text-center">
        <span className="material-symbols-outlined text-6xl text-primary mb-4">
          storefront
        </span>
        <h1 className="font-[family-name:var(--font-heading)] text-4xl text-primary font-semibold mb-4">
          Shop: {id}
        </h1>
        <p className="text-stone-600 text-lg">
          Detailed shop page coming soon. This will show menus, reviews, photos,
          and directions.
        </p>
      </div>
    </div>
  );
}
