import Image from "next/image";

const ARCH_PATH =
  "M0 437V195C0 150 25 118 55 106C70 70 120 36 173 0C205 32 262 55 304 118C312 128 317 138 317 150V437Z";

const ARCH_MASK = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 317 437"><path fill="black" d="${ARCH_PATH}"/></svg>`,
)}")`;

export function ArchVisual() {
  return (
    <div className="hm-vis">
      <div className="hm-arch">
        <div
          className="absolute inset-0"
          style={{
            maskImage: ARCH_MASK,
            WebkitMaskImage: ARCH_MASK,
            maskSize: "100% 100%",
            WebkitMaskSize: "100% 100%",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          <Image
            src="/images/arch-photo.webp"
            alt=""
            fill
            preload
            sizes="(max-width: 640px) 52vw, 320px"
            className="object-cover"
          />
        </div>
        <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 317 437" preserveAspectRatio="none" aria-hidden>
          <path d={ARCH_PATH} fill="none" stroke="#c9a24f" strokeWidth="2" />
        </svg>
        <Image src="/images/olive-left.png" alt="" width={680} height={718} className="hm-olive hm-olive-left" />
        <Image src="/images/olive-bottom-right.png" alt="" width={900} height={466} className="hm-olive hm-olive-right" />
      </div>
      <Image src="/images/olive-top-right-small.png" alt="" width={360} height={224} className="hm-vtop" />
      <div className="hm-orn" aria-hidden>
        <svg viewBox="0 0 30 30">
          <g stroke="#b08d4a" strokeWidth="1.5">
            <path d="M15 2l3 5 6-1-1 6 5 3-5 3 1 6-6-1-3 5-3-5-6 1 1-6-5-3 5-3-1-6 6 1z" fill="#fbf3dc" />
            <circle cx="15" cy="15" r="5" fill="none" />
          </g>
        </svg>
      </div>
      <div className="hm-ar" lang="ar" dir="rtl">
        لستم وحدكم
      </div>
      <div className="hm-are">“You are not alone.”</div>
      <div className="hm-arl" />
    </div>
  );
}
