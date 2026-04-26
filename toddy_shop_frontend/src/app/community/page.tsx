import Image from "next/image";
import {
  HERITAGE_STORIES,
  DISH_GALLERY,
  TOP_CONNOISSEURS,
  HERO_IMAGE,
  SIDEBAR_NAV,
} from "@/lib/community-data";

export const metadata = {
  title: "Community Hub | Toddy Finder",
  description:
    "Heritage stories, culinary traditions, and community discoveries from Kerala's toddy shop culture.",
};

export default function CommunityPage() {
  return (
    <div className="bg-cream">
      <main className="max-w-7xl mx-auto px-8 pb-10">
        {/* Hero Section */}
        <section className="py-10 border-b border-outline-variant flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-4">
            <div className="inline-flex bg-secondary-container/10 px-4 py-1 leaf-chip border border-secondary-container/20">
              <span className="text-[13px] font-bold tracking-wider text-secondary uppercase">
                The Heritage Hub
              </span>
            </div>
            <h1 className="font-[family-name:var(--font-heading)] text-5xl font-semibold text-primary leading-tight">
              The Soul of the Backwaters
            </h1>
            <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed">
              Welcome to Shaap, a community-driven initiative dedicated to
              chronicling and preserving the authentic culinary traditions of
              Kerala. From hidden backwater gems to generational recipes,
              discover the heart of our culture.
            </p>
            <div className="pt-4">
              <button className="bg-primary-container text-white px-8 py-3 text-[13px] font-bold tracking-wider rounded-lg active:scale-95 transition-transform cursor-pointer">
                EXPLORE DISCOVERIES
              </button>
            </div>
          </div>
          <div className="flex-1 w-full aspect-[4/3] overflow-hidden rounded-xl relative group">
            <Image
              src={HERO_IMAGE}
              alt="Stunning aerial view of Kuttanad backwaters in Kerala with traditional houseboats and coconut palms"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-all duration-500" />
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-10">
          {/* Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6">
            {/* Hub Explorer */}
            <div className="p-6 bg-white/50 rounded-xl border border-outline-variant">
              <h3 className="font-[family-name:var(--font-heading)] text-2xl font-medium text-primary mb-1">
                Hub Explorer
              </h3>
              <p className="text-[13px] font-bold tracking-wider text-on-surface-variant opacity-70 mb-6 uppercase">
                Deep in the Western Ghats
              </p>
              <nav className="space-y-1">
                {SIDEBAR_NAV.map((item) => (
                  <a
                    key={item.label}
                    href="#"
                    className={`flex items-center gap-3 p-3 font-[family-name:var(--font-heading)] text-sm cursor-pointer ${
                      item.active
                        ? "text-primary font-bold bg-primary-container/5 border-l-4 border-primary-container"
                        : "text-on-surface-variant hover:bg-tertiary-fixed transition-all"
                    }`}
                  >
                    <span className="material-symbols-outlined">
                      {item.icon}
                    </span>
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Top Connoisseurs */}
            <div className="p-6 bg-white rounded-xl border border-outline-variant shadow-sm">
              <h4 className="font-[family-name:var(--font-heading)] text-2xl font-medium text-primary mb-4">
                Top Connoisseurs
              </h4>
              <div className="space-y-4">
                {TOP_CONNOISSEURS.map((person) => (
                  <div key={person.name} className="flex items-center gap-3">
                    <div className="relative">
                      <Image
                        src={person.image}
                        alt={person.alt}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span
                        className={`absolute -bottom-1 -right-1 ${person.badgeColor} text-[10px] px-1 rounded-full border border-white font-bold`}
                      >
                        {person.badge}
                      </span>
                    </div>
                    <div>
                      <p className="text-[13px] font-bold tracking-wider text-primary">
                        {person.name}
                      </p>
                      <p className="text-[11px] text-on-surface-variant font-semibold">
                        {person.contributions} Contributions
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-10">
            {/* Heritage Stories */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-[family-name:var(--font-heading)] text-4xl font-semibold text-primary">
                  Heritage Stories
                </h2>
                <button className="text-secondary text-[13px] font-bold tracking-wider flex items-center gap-1 hover:underline cursor-pointer">
                  VIEW ALL
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {HERITAGE_STORIES.map((story) => (
                  <article
                    key={story.id}
                    className="bg-white border border-outline-variant overflow-hidden group cursor-pointer"
                  >
                    <div className="aspect-video overflow-hidden relative">
                      <Image
                        src={story.image}
                        alt={story.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-[11px] font-bold text-secondary uppercase tracking-widest">
                        {story.category}
                      </span>
                      <h3 className="font-[family-name:var(--font-heading)] text-2xl font-medium text-primary mt-2 group-hover:text-primary-container transition-colors">
                        {story.title}
                      </h3>
                      <p className="text-on-surface-variant mt-3 line-clamp-2">
                        {story.excerpt}
                      </p>
                      <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className="material-symbols-outlined text-primary text-sm"
                            style={
                              story.dateIconFill
                                ? {
                                    fontVariationSettings: "'FILL' 1",
                                  }
                                : undefined
                            }
                          >
                            {story.dateIcon}
                          </span>
                          <span className="text-xs font-semibold text-on-surface-variant">
                            {story.date}
                          </span>
                        </div>
                        <span className="material-symbols-outlined text-outline cursor-pointer hover:text-secondary">
                          {story.actionIcon}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Signature Dish Gallery (Bento Grid) */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-[family-name:var(--font-heading)] text-4xl font-semibold text-primary">
                    Signature Dish Gallery
                  </h2>
                  <p className="text-on-surface-variant">
                    This Week&apos;s Best Dishes as rated by the community
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {DISH_GALLERY.map((dish) => (
                  <div
                    key={dish.name}
                    className={`${dish.span} relative group overflow-hidden rounded-xl ${dish.height} cursor-pointer`}
                  >
                    <Image
                      src={dish.image}
                      alt={dish.alt}
                      fill
                      className={`object-cover ${
                        dish.featured
                          ? "group-hover:scale-105 transition-transform duration-1000"
                          : ""
                      }`}
                      sizes={
                        dish.featured
                          ? "(max-width: 768px) 100vw, 50vw"
                          : "(max-width: 768px) 50vw, 25vw"
                      }
                    />
                    {dish.featured ? (
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-primary/80 to-transparent">
                        <h4 className="font-[family-name:var(--font-heading)] text-2xl font-medium text-white">
                          {dish.name}
                        </h4>
                        {dish.badge && (
                          <div className="flex items-center gap-2 mt-2">
                            <span className="bg-secondary-container text-on-surface leaf-chip text-[10px] font-bold px-2 py-0.5">
                              {dish.badge}
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all" />
                        <div className="absolute bottom-3 left-3 bg-white/90 px-2 py-1 rounded text-[11px] font-bold text-primary">
                          {dish.name.toUpperCase()}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Join the Circle CTA */}
            <section className="bg-primary-container p-10 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10 text-center max-w-2xl mx-auto space-y-6">
                <h2 className="font-[family-name:var(--font-heading)] text-4xl font-semibold text-white">
                  Join the Circle
                </h2>
                <p className="text-lg text-on-primary-container/80 leading-relaxed">
                  Be more than a visitor. Become a guardian of our culinary
                  heritage. Share your discoveries, rate traditional shops, and
                  help us preserve the soul of the backwaters.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <button className="bg-white text-primary text-[13px] font-bold tracking-wider px-8 py-3 rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
                    REGISTER AS MEMBER
                  </button>
                  <button className="border border-white/30 text-white text-[13px] font-bold tracking-wider px-8 py-3 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                    LEARN OUR MISSION
                  </button>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary-container/30 to-transparent" />
            </section>
          </div>
        </div>
      </main>

      {/* Leaf motif divider */}
      <div className="flex justify-center items-center py-10 text-primary opacity-20">
        <div className="h-[1px] w-32 bg-primary" />
        <span className="material-symbols-outlined mx-4">eco</span>
        <div className="h-[1px] w-32 bg-primary" />
      </div>
    </div>
  );
}
