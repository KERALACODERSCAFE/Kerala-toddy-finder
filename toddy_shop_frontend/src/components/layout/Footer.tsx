import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-cream border-t border-cream-border mt-12 pb-20 md:pb-0">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-8 py-16 max-w-7xl mx-auto">
        <div>
          <div className="text-xl font-bold text-primary-container mb-4 font-[family-name:var(--font-heading)]">
            Shaap
          </div>
          <p className="text-stone-600 text-sm">
            &copy; 2024 Kerala Shaap Discovery. Heritage preservation through
            community.
          </p>
        </div>
        <div>
          <h5 className="font-bold text-primary-container mb-6">Explore</h5>
          <ul className="space-y-4 text-stone-600">
            <li>
              <Link href="#" className="hover:text-primary-container transition-colors">
                Popular Shops
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary-container transition-colors">
                By District
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary-container transition-colors">
                Top Food Spots
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold text-primary-container mb-6">Community</h5>
          <ul className="space-y-4 text-stone-600">
            <li>
              <Link href="#" className="hover:text-primary-container transition-colors">
                Guidelines
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary-container transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary-container transition-colors">
                Support
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold text-primary-container mb-6">Contact Us</h5>
          <p className="text-stone-600 text-sm mb-4">
            Questions about heritage preservation? Reach out to us.
          </p>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-stone-400 hover:text-primary cursor-pointer">
              mail
            </span>
            <span className="material-symbols-outlined text-stone-400 hover:text-primary cursor-pointer">
              share
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
