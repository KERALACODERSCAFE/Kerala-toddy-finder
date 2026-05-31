import ExploreClient from "@/features/explore/ExploreClient";

export const metadata = {
  title: "Explore Shops | Toddy Finder",
  description: "Find toddy shops near you on an interactive map.",
};

export default function ExplorePage() {
  return (
    <main className="relative h-screen w-full overflow-hidden">
      {/* MAP */}
      <ExploreClient />
    </main>
  );
}

