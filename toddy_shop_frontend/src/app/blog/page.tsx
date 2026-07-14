import { useTranslations } from "next-intl";

export default function BlogPage() {
    const t = useTranslations("Blog");

    // Dummy data to map over for the placeholder articles
    const articles = [
        {
            id: "article1",
            imageUrl: "/hero-bg.jpg", 
        },
        {
            id: "article2",
            imageUrl: "/hero-bg-mobile.jpg",
        },
        {
            id: "article3",
            imageUrl: "/hero-bg.jpg",
        },
        {
            id: "article4",
            imageUrl: "/hero-bg-mobile.jpg",
        },
        {
            id: "article5",
            imageUrl: "/hero-bg.jpg",
        }
    ];

    return (
        <div className="flex min-h-screen flex-col bg-cream pb-20">
            {/* Hero Section */}
            <section className="relative flex min-h-[300px] items-center justify-center overflow-hidden px-4 py-16 text-center text-white sm:min-h-[400px]">
                <div className="absolute inset-0 bg-[#05170f]" />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-[#022612]/30" />
                <div className="relative z-10 mx-auto max-w-3xl">
                    <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
                        {t("hero.title")}
                    </h1>
                    <p className="mt-6 text-lg font-medium text-white/90 sm:text-xl">
                        {t("hero.subtitle")}
                    </p>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 md:pt-24">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {articles.map((article) => (
                        <article
                            key={article.id}
                            className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-md"
                        >
                            <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={article.imageUrl}
                                    alt={t(`articles.${article.id}.title`)}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="flex flex-1 flex-col p-6">
                                <div className="mb-4 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-emerald-700">
                                    <span>{t(`articles.${article.id}.tag`)}</span>
                                    <span className="text-stone-400">{t(`articles.${article.id}.readTime`)}</span>
                                </div>
                                <h2 className="mb-3 font-[family-name:var(--font-heading)] text-2xl font-bold leading-snug text-stone-900 transition-colors group-hover:text-emerald-800">
                                    {t(`articles.${article.id}.title`)}
                                </h2>
                                <div className="mt-auto pt-4 flex items-center font-semibold text-emerald-700">
                                    <span className="text-sm">Read Article</span>
                                    <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}
