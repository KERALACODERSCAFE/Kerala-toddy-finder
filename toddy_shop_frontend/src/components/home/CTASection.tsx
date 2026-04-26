export function CTASection() {
  return (
    <section className="py-24 px-8 bg-surface">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-10">
          <span className="material-symbols-outlined text-6xl text-secondary mb-6">
            forest
          </span>
          <h2 className="font-[family-name:var(--font-heading)] text-5xl text-primary mb-4 font-semibold">
            Preserve the Heritage
          </h2>
          <p className="text-lg text-stone-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join our community of 8,000+ members documenting Kerala&apos;s
            unique toddy shop culture. Share your discoveries and keep the
            tradition alive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all cursor-pointer">
              Start Exploring Now
            </button>
            <button className="border-2 border-secondary text-secondary px-10 py-4 rounded-xl font-bold text-lg hover:bg-secondary/5 transition-all cursor-pointer">
              Join Community
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
