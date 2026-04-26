import Link from "next/link";

export function Navbar() {
  return (
    <header className="bg-cream border-b border-cream-border sticky top-0 z-50">
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-primary-container font-[family-name:var(--font-heading)]"
        >
          Shaap
        </Link>
        <nav className="hidden md:flex items-center gap-x-8">
          <Link
            href="/"
            className="text-primary-container font-bold border-b-2 border-primary-container pb-1 font-[family-name:var(--font-heading)]"
          >
            Discover
          </Link>
          <Link
            href="/explore"
            className="text-stone-600 font-medium hover:text-primary-container transition-all duration-300 font-[family-name:var(--font-heading)]"
          >
            Explore
          </Link>
          <Link
            href="/community"
            className="text-stone-600 font-medium hover:text-primary-container transition-all duration-300 font-[family-name:var(--font-heading)]"
          >
            Community
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-stone-600 cursor-pointer">
            account_circle
          </span>
        </div>
      </div>
    </header>
  );
}
