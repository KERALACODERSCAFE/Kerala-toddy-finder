import { useTranslations } from "next-intl";

export default function AboutPage() {
    const t = useTranslations("About");

    return (
        <div className="flex min-h-screen flex-col">
            {/* Hero Section */}
            <section className="relative flex min-h-[400px] items-center justify-center overflow-hidden px-4 py-20 text-center text-white sm:min-h-[500px]">
                <div className="absolute inset-0 bg-[#05170f]" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#022612]/50" />
                <div className="relative z-10 mx-auto max-w-3xl">
                    <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
                        {t("hero.title")}
                    </h1>
                    <p className="mt-6 text-lg font-medium text-white/90 sm:text-xl">
                        {t("hero.tagline")}
                    </p>
                </div>
            </section>

            {/* Our Story */}
            <section className="bg-cream px-4 py-16 sm:px-6 sm:py-24">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[#003e1c] sm:text-4xl">
                        {t("story.title")}
                    </h2>
                    <p className="mt-8 text-base leading-relaxed text-stone-700 sm:text-lg">
                        {t("story.content")}
                    </p>
                </div>
            </section>

            {/* Our Mission Grid */}
            <section className="bg-white px-4 py-16 sm:px-6 sm:py-24">
                <div className="mx-auto max-w-7xl">
                    <h2 className="mb-12 text-center font-[family-name:var(--font-heading)] text-3xl font-bold text-[#003e1c] sm:text-4xl">
                        {t("mission.title")}
                    </h2>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {/* Discover */}
                        <div className="rounded-2xl border border-stone-100 bg-stone-50 p-8 text-center transition-shadow hover:shadow-md">
                            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>explore</span>
                            </div>
                            <h3 className="mb-4 font-[family-name:var(--font-heading)] text-2xl font-bold text-stone-900">
                                {t("mission.discover.title")}
                            </h3>
                            <p className="text-stone-600 leading-relaxed">
                                {t("mission.discover.content")}
                            </p>
                        </div>
                        {/* Document */}
                        <div className="rounded-2xl border border-stone-100 bg-stone-50 p-8 text-center transition-shadow hover:shadow-md">
                            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>menu_book</span>
                            </div>
                            <h3 className="mb-4 font-[family-name:var(--font-heading)] text-2xl font-bold text-stone-900">
                                {t("mission.document.title")}
                            </h3>
                            <p className="text-stone-600 leading-relaxed">
                                {t("mission.document.content")}
                            </p>
                        </div>
                        {/* Empower */}
                        <div className="rounded-2xl border border-stone-100 bg-stone-50 p-8 text-center transition-shadow hover:shadow-md sm:col-span-2 lg:col-span-1">
                            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
                            </div>
                            <h3 className="mb-4 font-[family-name:var(--font-heading)] text-2xl font-bold text-stone-900">
                                {t("mission.empower.title")}
                            </h3>
                            <p className="text-stone-600 leading-relaxed">
                                {t("mission.empower.content")}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Community CTA */}
            <section className="bg-[#05170f] px-4 py-20 text-center text-white sm:px-6 sm:py-32">
                <div className="mx-auto max-w-3xl">
                    <span className="material-symbols-outlined mb-6 text-5xl text-emerald-500" style={{ fontVariationSettings: "'FILL' 1" }}>volunteer_activism</span>
                    <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold sm:text-4xl">
                        {t("community.title")}
                    </h2>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
                        {t("community.content")}
                    </p>
                </div>
            </section>
        </div>
    );
}
