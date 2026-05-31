export function InteractiveMapSection() {
  return (
    <section className="py-24 px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
      {/* Left Side */}
      <div className="w-full lg:w-[35%] flex flex-col gap-6">
        <h2 className="font-[family-name:var(--font-heading)] text-5xl lg:text-[54px] font-semibold leading-[1.1] text-on-surface">
          Explore the <br />
          interactive <span className="text-primary">Map.</span>
        </h2>
        <p className="text-stone-500 text-[15px] leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque viverra 
          aliquet elit. Curabitur egestas interdum leo, sed finibus enim ultrices ac. 
          Cras quam nisl, aliquet.
        </p>
        <div className="flex flex-col gap-3 mt-4">
          <button className="bg-primary text-white px-8 py-[18px] rounded-xl font-bold text-[15px] hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-3 w-full">
            <span className="material-symbols-outlined text-xl">group</span>
            Join Community
          </button>
          <button className="border-2 border-stone-200 text-stone-700 bg-white px-8 py-[18px] rounded-xl font-bold text-[15px] hover:bg-stone-50 hover:border-stone-300 transition-all cursor-pointer flex items-center justify-center gap-3 w-full">
            <span className="material-symbols-outlined text-xl">location_on</span>
            How it Works
          </button>
        </div>
      </div>

      {/* Right Side - Map Reconstruction */}
      <div className="w-full lg:w-[65%] h-[400px] lg:h-[550px] relative rounded-[2.5rem] overflow-hidden bg-[#a5dff0] shadow-[0_8px_30px_rgba(0,0,0,0.06)] border-[6px] border-white ring-1 ring-stone-100">
        {/* Land Mass SVG */}
        <svg className="absolute top-0 right-0 w-[85%] h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M 30,0 C 15,25 45,60 25,100 L 100,100 L 100,0 Z" fill="#f0f5f4" />
          <path d="M 30,0 C 15,25 45,60 25,100" stroke="#e2ecea" strokeWidth="1" fill="none" />
        </svg>

        {/* Roads SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 550" preserveAspectRatio="none">
          {/* Main vertical road */}
          <path d="M 600,0 C 620,150 560,300 650,550" stroke="#cbd5e1" strokeWidth="14" fill="none" strokeLinecap="round" />
          <path d="M 600,0 C 620,150 560,300 650,550" stroke="#f8fafc" strokeWidth="10" fill="none" strokeLinecap="round" />
          
          {/* Side road to Mullapanthal */}
          <path d="M 610,180 C 550,220 480,280 430,260" stroke="#cbd5e1" strokeWidth="10" fill="none" strokeLinecap="round" />
          <path d="M 610,180 C 550,220 480,280 430,260" stroke="#f8fafc" strokeWidth="6" fill="none" strokeLinecap="round" />
          
          {/* Road to Valiyakulam */}
          <path d="M 590,380 C 650,400 700,450 780,480" stroke="#cbd5e1" strokeWidth="10" fill="none" strokeLinecap="round" />
          <path d="M 590,380 C 650,400 700,450 780,480" stroke="#f8fafc" strokeWidth="6" fill="none" strokeLinecap="round" />
        </svg>

        {/* Map Markers & Labels */}
        
        {/* Udayamperoor */}
        <div className="absolute top-[12%] left-[45%] lg:left-[50%] flex items-center gap-3 cursor-pointer group">
          <div className="flex flex-col text-right transition-transform group-hover:-translate-x-1">
            <span className="text-[#2563eb] font-semibold text-lg lg:text-xl leading-tight drop-shadow-md">Udayamperoor</span>
            <span className="text-[#2563eb] font-medium text-[13px] lg:text-sm drop-shadow-md">via piravam</span>
          </div>
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-[#3b82f6] relative z-10 transition-transform group-hover:scale-110">
            <span className="material-symbols-outlined text-[#3b82f6] text-[22px]">lock</span>
          </div>
        </div>

        {/* Mullapanthal */}
        <div className="absolute top-[42%] left-[10%] lg:left-[20%] flex items-center gap-3 cursor-pointer group">
          <div className="flex flex-col text-right transition-transform group-hover:-translate-x-1">
            <span className="text-[#b45309] font-bold text-[22px] lg:text-[26px] leading-none drop-shadow-sm">Mullapanthal</span>
            <span className="text-[#b45309] font-semibold text-lg lg:text-xl leading-snug drop-shadow-sm mb-1">Toddy Shop</span>
            <span className="text-[#d97706] font-medium text-xs lg:text-sm">മുല്ലപ്പന്തൽ കള്ള് ഷാപ്പ്</span>
          </div>
          <div className="w-14 h-14 bg-[#ea580c] rounded-full flex items-center justify-center shadow-xl border-4 border-white relative z-10 transition-transform group-hover:scale-110 group-hover:rotate-[10deg]">
            <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-[#ea580c]"></span>
            <span className="material-symbols-outlined text-white text-[28px]">restaurant</span>
          </div>
        </div>

        {/* Valiyakulam */}
        <div className="absolute bottom-[18%] right-[10%] flex flex-col items-center cursor-pointer group transition-transform hover:scale-105">
          <span className="text-stone-600 font-bold tracking-[0.2em] text-lg lg:text-xl uppercase drop-shadow-sm">Valiyakulam</span>
          <span className="text-stone-500 font-semibold tracking-wider text-sm mt-1">വലിയകുളം</span>
          <div className="w-2 h-2 rounded-full bg-stone-400 mt-2 shadow-sm ring-4 ring-white"></div>
        </div>
      </div>
    </section>
  );
}
