import Link from "next/link";

export function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center h-16 px-4 bg-cream/95 backdrop-blur-md border-t border-cream-border shadow-[0_-4px_12px_rgba(30,86,49,0.05)] z-50">
      <Link
        href="/"
        className="flex flex-col items-center justify-center text-primary-container bg-primary-container/5 rounded-xl px-4 py-1"
      >
        <span
          className="material-symbols-outlined"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          home
        </span>
        <span className="text-xs font-semibold font-[family-name:var(--font-heading)]">
          Home
        </span>
      </Link>
      <Link
        href="/explore"
        className="flex flex-col items-center justify-center text-stone-500 hover:bg-stone-100 rounded-xl px-4 py-1"
      >
        <span className="material-symbols-outlined">explore</span>
        <span className="text-xs font-semibold font-[family-name:var(--font-heading)]">
          Explore
        </span>
      </Link>
      <Link
        href="/community"
        className="flex flex-col items-center justify-center text-stone-500 hover:bg-stone-100 rounded-xl px-4 py-1"
      >
        <span className="material-symbols-outlined">forum</span>
        <span className="text-xs font-semibold font-[family-name:var(--font-heading)]">
          Community
        </span>
      </Link>
      <Link
        href="#"
        className="flex flex-col items-center justify-center text-stone-500 hover:bg-stone-100 rounded-xl px-4 py-1"
      >
        <span className="material-symbols-outlined">person</span>
        <span className="text-xs font-semibold font-[family-name:var(--font-heading)]">
          Profile
        </span>
      </Link>
    </nav>
  );
}
