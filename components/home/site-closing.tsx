import Image from "next/image";

function Book() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden>
      <path d="M32 3l24 14v30L32 61 8 47V17z" fill="#143a2d" stroke="#c79a49" strokeWidth="1.4" />
      <g fill="none" stroke="#e2c47a" strokeWidth="1.6">
        <path d="M18 22c5-2 10-1 14 2 4-3 9-4 14-2v22c-5-2-10-1-14 2-4-3-9-4-14-2z" />
        <path d="M32 24v22" />
      </g>
    </svg>
  );
}

export function SiteClosing() {
  return (
    <footer className="hm-foot">
      <svg className="hm-wave" viewBox="0 0 1440 214" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id="home-wave" x1="0" x2="1">
            <stop offset="0" stopColor="#0e3a2b" />
            <stop offset=".6" stopColor="#14442f" />
            <stop offset="1" stopColor="#1b4a38" />
          </linearGradient>
        </defs>
        <path d="M0 0C60 10 130 44 260 52C500 66 800 48 1100 56C1250 60 1350 58 1440 50V214H0z" fill="url(#home-wave)" />
      </svg>
      <svg className="hm-lat" viewBox="0 0 230 170" aria-hidden>
        <defs>
          <pattern id="home-lattice" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="20" fill="none" stroke="#c79a49" strokeWidth="1" />
            <circle cx="0" cy="0" r="20" fill="none" stroke="#c79a49" strokeWidth="1" />
            <circle cx="40" cy="40" r="20" fill="none" stroke="#c79a49" strokeWidth="1" />
            <circle cx="40" cy="0" r="20" fill="none" stroke="#c79a49" strokeWidth="1" />
            <circle cx="0" cy="40" r="20" fill="none" stroke="#c79a49" strokeWidth="1" />
          </pattern>
          <linearGradient id="home-lattice-fade" x1="0" x2="1" y1="1" y2="0">
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </linearGradient>
          <mask id="home-lattice-mask">
            <rect width="230" height="170" fill="url(#home-lattice-fade)" />
          </mask>
        </defs>
        <rect width="230" height="170" fill="url(#home-lattice)" mask="url(#home-lattice-mask)" opacity=".55" />
      </svg>
      <div className="hm-sky">
        <Image
          src="/images/footer-skyline.webp"
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, 1150px"
          className="object-contain object-right-bottom"
        />
      </div>
      <div className="hm-in">
        <div className="hm-ft">
          <Book />
          <div>
            Across borders and distances,
            <br />
            kindness still reaches you.
            <u />
          </div>
        </div>
      </div>
    </footer>
  );
}
