import Image from "next/image";

export function FeaturedBest() {
  return (
    <section className="py-24 px-8 max-w-7xl mx-auto">
      <div className="mb-10">
        <h2 className="font-[family-name:var(--font-heading)] text-5xl font-semibold text-on-surface mb-3">
          Featured <span className="text-primary">Best.</span>
        </h2>
        <p className="text-stone-500 font-medium">
          Lorem ipsum dolor sit amet.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Large Card */}
        <div className="relative rounded-3xl overflow-hidden min-h-[400px] lg:min-h-[500px] group cursor-pointer">
          <Image 
            src="/kerala-hero.png" 
            alt="Mullapanthal Shaap" 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 w-full">
            <span className="text-white font-bold text-sm flex items-center gap-1 mb-2">
              <span className="material-symbols-outlined text-[16px] text-[#ffb148]">star</span>
              4.0 (1k+)
            </span>
            <h3 className="text-white text-3xl font-bold mb-1">Mullapanthal Shaap</h3>
            <p className="text-white/80 font-malayalam mb-3">മുല്ലപ്പന്തൽ ഷാപ്പ്</p>
            <p className="text-white/60 text-sm flex items-center justify-between">
              <span className="line-clamp-1 pr-4">These establishments act as rural community hubs offering kalla...</span>
              <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
            </p>
          </div>
        </div>

        {/* Right Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Top Left Card */}
          <div className="relative rounded-3xl overflow-hidden min-h-[240px] group cursor-pointer">
            <div className="absolute inset-0 bg-stone-800" />
            <div className="absolute inset-0 bg-gradient-to-br from-stone-700 to-stone-900 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <span className="text-white font-bold text-xs flex items-center gap-1 mb-1">
                <span className="material-symbols-outlined text-[14px] text-[#ffb148]">star</span>
                4.2 (1k+)
              </span>
              <h4 className="text-white text-lg font-bold">Tapioca with Sardines</h4>
              <p className="text-white/80 font-malayalam text-sm mb-2">കപ്പയും മത്തി കറിയും</p>
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-[10px] font-bold uppercase tracking-wider">Toddy Shop Special</span>
                <span className="material-symbols-outlined text-white text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>
          </div>

          {/* Top Right Card */}
          <div className="relative rounded-3xl overflow-hidden min-h-[240px] group cursor-pointer">
            <div className="absolute inset-0 bg-stone-800" />
            <div className="absolute inset-0 bg-gradient-to-br from-stone-800 to-stone-600 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <span className="text-white font-bold text-xs flex items-center gap-1 mb-1">
                <span className="material-symbols-outlined text-[14px] text-[#ffb148]">star</span>
                4.0 (1k+)
              </span>
              <h4 className="text-white text-lg font-bold">Pidi and Chicken</h4>
              <p className="text-white/80 font-malayalam text-sm mb-2">പിടിയും കോഴിയും</p>
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-[10px] font-bold uppercase tracking-wider">Mullapanthal Shaap</span>
                <span className="material-symbols-outlined text-white text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>
          </div>

          {/* Bottom Left Card */}
          <div className="relative rounded-3xl overflow-hidden min-h-[240px] group cursor-pointer">
            <div className="absolute inset-0 bg-stone-800" />
            <div className="absolute inset-0 bg-gradient-to-br from-stone-700 to-stone-900 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <span className="text-white font-bold text-xs flex items-center gap-1 mb-1">
                <span className="material-symbols-outlined text-[14px] text-[#ffb148]">star</span>
                4.0 (1k+)
              </span>
              <h4 className="text-white text-lg font-bold">Tapioca with Sardines</h4>
              <p className="text-white/80 font-malayalam text-sm mb-2">കപ്പയും മത്തി കറിയും</p>
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-[10px] font-bold uppercase tracking-wider">Toddy Shop Special</span>
                <span className="material-symbols-outlined text-white text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>
          </div>

          {/* Bottom Right Green Block */}
          <div className="bg-[#005a30] rounded-3xl p-8 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-[#004a28] transition-colors group">
            <h4 className="text-white text-xl font-bold mb-2">Find your place.</h4>
            <p className="text-white/80 text-sm leading-relaxed mb-6">
              Browse all top places establishments.
            </p>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
              <span className="material-symbols-outlined text-[#005a30]">arrow_forward</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
