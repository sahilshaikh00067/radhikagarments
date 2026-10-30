import React, { useState, useEffect, useRef } from "react";

/* ================= CONFIG ================= */
const B = {
  name: "Radhika Garments & Sarees",
  legal: "RADHIKA GARMENTS & SAREES PRIVATE LIMITED",
  gstin: "09AAJCR5559B1Z6",
  since: "03 July 2019",
  address: "Prakash Complex, Kotwali Road, Padrauna, Kushinagar, Uttar Pradesh – 274304",
  wa: "919999999999", // <-- apna WhatsApp number
  phone: "+91 99999 99999", // <-- apna phone
  email: "info@radhikagarments.com", // <-- apni email
  insta: "https://instagram.com/", // <-- apna instagram
};
const SALE_END = "2026-11-08T00:00:00+05:30";
const VIDEO = "https://www.w3schools.com/html/mov_bbb.mp4"; // <-- apni video
const U = (id, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const P = {
  a: "photo-1610030469983-98e550d6193c", b: "photo-1583391733956-3750e0ff4e8b", c: "photo-1617627143750-d86bc21e42bb",
  d: "photo-1594938298603-c8148c4dae35", e: "photo-1558769132-cb1aea458c5e", f: "photo-1523381210434-271e8be1f52b",
  g: "photo-1445205170230-053b83016050", h: "photo-1490481651871-ab68de25d43d", i: "photo-1585487000160-6ebcfceb0d03",
  j: "photo-1566174053879-31528523f8ae", k: "photo-1539109136881-3be0616acf4b", l: "photo-1572804013309-59a88b7e92f1",
};
const RING = [P.a, P.b, P.c, P.d, P.h, P.j, P.k, P.l];
const STACK = [
  { t: "Banarasi Silk", d: "Heirloom katan weaves with real zari borders, made for weddings and pujas.", img: P.a, bg: "#400849", fg: "#fff" },
  { t: "Kanjivaram", d: "Temple borders and rich contrast pallus in pure silk, woven to last generations.", img: P.b, bg: "#e7b0de", fg: "#400849" },
  { t: "Bridal Lehenga", d: "Hand-embroidered lehengas and dupatta sets, with outfits for the whole family.", img: P.h, bg: "#ff5a0a", fg: "#fff" },
  { t: "Designer & Daily Wear", d: "Georgette sarees, Anarkali sets and breathable cotton garments for every day.", img: P.d, bg: "#fbf3fa", fg: "#400849" },
];
const PRODUCTS = [
  { n: "Royal Banarasi Katan", p: "₹6,499", img: P.a },
  { n: "Temple Border Kanjivaram", p: "₹8,999", img: P.b },
  { n: "Pearl Georgette Drape", p: "₹2,999", img: P.c },
  { n: "Zardozi Anarkali Set", p: "₹4,299", img: P.d },
  { n: "Crimson Bridal Lehenga", p: "₹18,999", img: P.h },
  { n: "Emerald Party Saree", p: "₹3,799", img: P.j },
  { n: "Heritage Silk Dupatta", p: "₹3,499", img: P.e },
];
const STRIP1 = [P.a, P.k, P.c, P.i, P.b, P.l, P.h];
const STRIP2 = [P.f, P.d, P.j, P.e, P.g, P.a, P.c];
const GALLERY = [P.a, P.k, P.c, P.i, P.b, P.l, P.h, P.f, P.d, P.j, P.e, P.g];
const STEPS = [
  ["Handpicked at source", "Fabrics chosen directly from trusted weavers and mills across India."],
  ["Checked piece by piece", "Every saree and garment is inspected for weave, colour and finish."],
  ["Styled with you", "Our team matches drapes, blouses and dupattas to your occasion."],
  ["Packed and delivered", "Careful packing, fair billing with GST invoice, dependable delivery."],
];
const REVIEWS = [
  { n: "Priya Gupta", p: "Gorakhpur", t: "The Banarasi I bought for my sister's wedding drew compliments from every guest. Fabric and finish are outstanding." },
  { n: "Anita Singh", p: "Kushinagar", t: "Honest pricing, a huge range, and the team helped us pick a full wedding wardrobe in one visit." },
  { n: "Rakesh Verma", p: "Deoria", t: "Wholesale order arrived on time and matched the samples exactly. We have already reordered." },
  { n: "Meera Tiwari", p: "Kasia", t: "Bought my bridal lehenga here. The embroidery looked even better in person." },
];
const FAQ = [
  ["Do you sell retail and wholesale?", "Yes. We serve walk-in customers and bulk buyers. Message us on WhatsApp for wholesale rates and minimum quantities."],
  ["Are you a registered business?", `Yes. ${B.legal} is a GST registered private limited company (GSTIN ${B.gstin}) and we issue proper GST invoices.`],
  ["Can I see designs before visiting?", "Absolutely. Share your occasion and budget on WhatsApp and we will send photos and videos of matching pieces."],
  ["Do you deliver outside Padrauna?", "We deliver across Uttar Pradesh and nearby states. Delivery details are shared when you place your enquiry."],
];
const DIRECTORS = ["Raj Kumar Tibrewal", "Jagdamba Prasad Tibrewal", "Vishnu Pratap Tibrewal"];
const wa = (t) => `https://wa.me/${B.wa}?text=${encodeURIComponent(t)}`;

/* ================= HOOKS ================= */
function useInView(th = 0.15) {
  const ref = useRef(null); const [seen, setSeen] = useState(false);
  useEffect(() => { const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: th }); ref.current && io.observe(ref.current); return () => io.disconnect(); }, []);
  return [ref, seen];
}
function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => { const f = () => setY(window.scrollY); f(); addEventListener("scroll", f, { passive: true }); return () => removeEventListener("scroll", f); }, []);
  return y;
}
function useWidth() {
  const [w, setW] = useState(typeof window === "undefined" ? 1200 : innerWidth);
  useEffect(() => { const f = () => setW(innerWidth); addEventListener("resize", f); return () => removeEventListener("resize", f); }, []);
  return w;
}
function useCountdown(target) {
  const c = () => { const d = Math.max(0, new Date(target) - Date.now()); return { d: Math.floor(d / 864e5), h: Math.floor(d / 36e5) % 24, m: Math.floor(d / 6e4) % 60, s: Math.floor(d / 1e3) % 60 }; };
  const [t, setT] = useState(c); useEffect(() => { const i = setInterval(() => setT(c()), 1000); return () => clearInterval(i); }, []); return t;
}

/* ================= ATOMS ================= */
const Reveal = ({ children, delay = 0, from = "up", className = "" }) => {
  const [ref, seen] = useInView();
  const hid = { up: "translate-y-14", left: "-translate-x-14", right: "translate-x-14", zoom: "scale-90" }[from];
  return <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`transition-all duration-[1100ms] ease-[cubic-bezier(.2,.7,.2,1)] ${seen ? "opacity-100 translate-x-0 translate-y-0 scale-100" : `opacity-0 ${hid}`} ${className}`}>{children}</div>;
};
function SplitText({ text, className = "", delay = 0 }) {
  const [ref, seen] = useInView(0.3);
  return <span ref={ref} className={className} aria-label={text}>{text.split(" ").map((w, i) => <span key={i} className="inline-block overflow-hidden align-bottom mr-[.25em]"><span className="inline-block transition-transform duration-[1000ms] ease-[cubic-bezier(.2,.8,.2,1)]" style={{ transform: seen ? "translateY(0)" : "translateY(110%)", transitionDelay: `${delay + i * 70}ms` }}>{w}</span></span>)}</span>;
}
function Tilt({ children, className = "", max = 12 }) {
  const r = useRef(null);
  const mv = (e) => {
    const b = r.current.getBoundingClientRect(), x = (e.clientX - b.left) / b.width - .5, y = (e.clientY - b.top) / b.height - .5;
    r.current.style.transform = `perspective(1000px) rotateY(${x * max}deg) rotateX(${-y * max}deg) scale3d(1.025,1.025,1.025)`; r.current.style.setProperty("--x", `${(x + .5) * 100}%`); r.current.style.setProperty("--y", `${(y + .5) * 100}%`);
  };
  const lv = () => (r.current.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)");
  return <div ref={r} onMouseMove={mv} onMouseLeave={lv} style={{ transformStyle: "preserve-3d" }} className={`relative transition-transform duration-200 will-change-transform ${className}`}>{children}<div className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 hover:opacity-100 transition glare" /></div>;
}
function Counter({ to, suf = "" }) {
  const [ref, seen] = useInView(); const [v, setV] = useState(0);
  useEffect(() => { if (!seen) return; let s; const f = (t) => { s ??= t; const p = Math.min((t - s) / 2000, 1); setV(Math.floor((1 - (1 - p) ** 3) * to)); p < 1 && requestAnimationFrame(f); }; requestAnimationFrame(f); }, [seen]);
  return <span ref={ref}>{v.toLocaleString("en-IN")}{suf}</span>;
}
const Img = ({ id, w = 900, className = "", alt = "", style }) => <img src={U(id, w)} alt={alt} loading="lazy" draggable="false" style={style} className={className} onError={(e) => { e.currentTarget.removeAttribute("src"); e.currentTarget.style.background = "linear-gradient(135deg,#e7b0de,#400849)"; }} />;
const Pill = ({ children, dark }) => <span className={`inline-block text-sm font-semibold px-4 py-1.5 rounded-full ${dark ? "bg-white/10 text-[#e7b0de]" : "bg-[#400849]/10 text-[#400849]"}`}>{children}</span>;
const Btn = ({ children, href, ghost, dark, ...p }) => <a href={href} {...p} className={`group inline-flex items-center gap-3 font-semibold pl-8 pr-3 py-3 rounded-full transition hover:-translate-y-1 ${ghost ? (dark ? "border-2 border-white/40 text-white hover:bg-white hover:text-[#400849]" : "border-2 border-[#400849] text-[#400849] hover:bg-[#400849] hover:text-white") : "bg-[#ff5a0a] text-white shadow-[0_16px_44px_-12px_#ff5a0a]"}`}>{children}<span className={`w-10 h-10 rounded-full grid place-items-center transition group-hover:rotate-45 ${ghost ? "bg-[#ff5a0a] text-white" : "bg-white text-[#ff5a0a]"}`}>↗</span></a>;

/* ================= SECTIONS ================= */
function Preloader() {
  const [n, setN] = useState(0); const [h, setH] = useState(false); const [g, setG] = useState(false);
  useEffect(() => { const i = setInterval(() => setN((x) => { if (x >= 100) { clearInterval(i); setH(true); setTimeout(() => setG(true), 900); return 100; } return x + 4; }), 50); return () => clearInterval(i); }, []);
  if (g) return null;
  return <div className={`fixed inset-0 z-[100] bg-[#1d0322] text-white flex flex-col justify-between p-8 transition-transform duration-[900ms] ease-[cubic-bezier(.8,0,.2,1)] ${h ? "-translate-y-full" : ""}`}>
    <p className="font-display text-2xl">Radhika <span className="text-[#e7b0de] italic">Garments</span></p>
    <p className="font-display text-[22vw] leading-none text-[#e7b0de] tabular-nums">{n}<span className="text-[#ff5a0a]">%</span></p></div>;
}
function Cursor() {
  const r = useRef(null); const [big, setBig] = useState(false);
  useEffect(() => { const mv = (e) => r.current && (r.current.style.transform = `translate(${e.clientX}px,${e.clientY}px)`); const ov = (e) => setBig(!!e.target.closest("a,button,input,textarea,select")); addEventListener("mousemove", mv); addEventListener("mouseover", ov); return () => { removeEventListener("mousemove", mv); removeEventListener("mouseover", ov); }; }, []);
  return <div ref={r} className="hidden lg:block fixed top-0 left-0 z-[95] pointer-events-none"><div className={`-translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff5a0a] mix-blend-difference transition-all duration-300 ${big ? "w-16 h-16" : "w-4 h-4"}`} /></div>;
}
function Nav() {
  const y = useScrollY(); const [o, setO] = useState(false);
  const L = [["Collections", "#collections"], ["Featured", "#featured"], ["Bridal", "#bridal"], ["Gallery", "#gallery"], ["FAQ", "#faq"], ["Contact", "#contact"]];
  return <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
    <div className="fixed top-0 left-0 h-[3px] bg-[#ff5a0a] z-[60]" style={{ width: `${(y / Math.max(1, document.documentElement.scrollHeight - innerHeight)) * 100}%` }} />
    <nav className={`max-w-6xl mx-auto flex items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ${y > 40 ? "bg-white/85 backdrop-blur-xl shadow-[0_20px_50px_-20px_rgba(64,8,73,.5)]" : "bg-white/10 backdrop-blur-md border border-white/20"}`}>
      <a href="#top" className={`font-display text-xl ${y > 40 ? "text-[#400849]" : "text-white"}`}>Radhika <span className="text-[#ff5a0a] italic">Garments</span></a>
      <ul className="hidden lg:flex gap-7">{L.map(([l, h]) => <li key={l}><a href={h} className={`text-[15px] font-medium transition hover:text-[#ff5a0a] ${y > 40 ? "text-[#400849]" : "text-white/85"}`}>{l}</a></li>)}</ul>
      <a href={wa("Hello, I want to know about your collections")} target="_blank" rel="noreferrer" className="hidden lg:block bg-[#ff5a0a] text-white px-6 py-2.5 rounded-full hover:bg-[#400849] transition">WhatsApp us</a>
      <button onClick={() => setO(!o)} aria-label="Menu" className={`lg:hidden text-3xl ${y > 40 ? "text-[#400849]" : "text-white"}`}>{o ? "✕" : "☰"}</button>
    </nav>
    {o && <div className="lg:hidden mt-2 max-w-6xl mx-auto bg-white rounded-3xl p-6 flex flex-col gap-4 shadow-2xl">{L.map(([l, h]) => <a key={l} href={h} onClick={() => setO(false)} className="text-[#400849] text-lg">{l}</a>)}</div>}
  </header>;
}
function Hero() {
  const y = useScrollY(); const w = useWidth(); const t = useCountdown(SALE_END); const [m, setM] = useState({ x: 0, y: 0 });
  const R = w < 768 ? 230 : w < 1100 ? 340 : 440;
  return <section id="top" onMouseMove={(e) => setM({ x: (e.clientX / innerWidth - .5) * 2, y: (e.clientY / innerHeight - .5) * 2 })} className="relative min-h-screen bg-[#1d0322] overflow-hidden pt-32 pb-16">
    <div className="absolute inset-0 opacity-30" style={{ transform: `translateY(${y * .25}px) scale(1.1)` }}><Img id={P.k} w={1800} className="w-full h-full object-cover" /></div>
    <div className="absolute inset-0 bg-gradient-to-b from-[#1d0322]/70 via-[#400849]/60 to-[#1d0322]" />
    <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#ff5a0a]/25 blur-[120px] floaty" /><div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#e7b0de]/25 blur-[120px] floaty" />
    <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
      <span className="hero-a inline-flex items-center gap-2 bg-white/10 border border-white/20 text-[#e7b0de] text-sm px-4 py-2 rounded-full backdrop-blur"><span className="w-2 h-2 rounded-full bg-[#ff5a0a] pulse" />GST registered · Padrauna, Kushinagar · Since 2019</span>
      <h1 className="font-display text-white text-[3.4rem] sm:text-7xl md:text-8xl xl:text-[8.5rem] leading-[.92] mt-7"><SplitText text="The art of" /><br /><SplitText text="the drape" className="text-[#e7b0de] italic" delay={250} /></h1>
      <p className="hero-a text-white/70 text-lg md:text-xl max-w-2xl mx-auto mt-7" style={{ animationDelay: ".5s" }}>Silk sarees, bridal couture and garments from a trusted family showroom, chosen with care and priced fairly.</p>
      <div className="hero-a flex flex-wrap justify-center gap-4 mt-9" style={{ animationDelay: ".65s" }}><Btn href="#collections">Explore collections</Btn><Btn href="#video" ghost dark>Watch the film</Btn></div>
      <div className="relative mt-14 h-[320px] md:h-[420px]" style={{ perspective: "1800px" }}>
        <div className="absolute left-1/2 top-1/2 w-0 h-0" style={{ transformStyle: "preserve-3d", transform: `rotateX(${-m.y * 6}deg) rotateY(${m.x * 8}deg)` }}>
          <div className="ring3d absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
            {RING.map((id, k) => <div key={k} className="absolute w-[150px] h-[210px] md:w-[210px] md:h-[290px] -left-[75px] -top-[105px] md:-left-[105px] md:-top-[145px] rounded-2xl overflow-hidden border-2 border-[#e7b0de]/60 shadow-2xl bg-[#400849]" style={{ transform: `rotateY(${k * (360 / RING.length)}deg) translateZ(${R}px)` }}><Img id={id} w={500} className="w-full h-full object-cover" /></div>)}
          </div>
        </div>
      </div>
      <div className="inline-flex items-center gap-5 bg-white/10 backdrop-blur border border-white/20 rounded-2xl px-6 py-3 mt-6"><div className="text-left"><p className="text-xs text-white/60">Festive sale ends in</p><p className="font-display text-2xl text-white tabular-nums">{t.d}d : {String(t.h).padStart(2, "0")}h : {String(t.m).padStart(2, "0")}m : {String(t.s).padStart(2, "0")}s</p></div><span className="bg-[#ff5a0a] text-white text-sm font-semibold px-3 py-1.5 rounded-lg">30% off</span></div>
    </div></section>;
}
function Marquee({ rev }) {
  const w = ["Banarasi Silk", "Kanjivaram", "Bridal Lehenga", "Georgette", "Anarkali", "Wholesale", "Retail", "GST Invoice"];
  return <div className="bg-[#ff5a0a] py-5 overflow-hidden"><div className={`${rev ? "marq-r" : "marq"} flex w-max whitespace-nowrap`}>{[...w, ...w, ...w, ...w].map((t, k) => <span key={k} className="font-display text-3xl text-white mx-6 italic">{t}<span className="mx-6 not-italic text-[#400849]">✦</span></span>)}</div></div>;
}
function Intro() {
  return <section className="bg-[#fbf3fa] py-32 overflow-hidden"><div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
    <Reveal from="left" className="relative h-[580px]"><Tilt className="absolute left-0 top-0 w-[62%]"><Img id={P.d} w={800} className="rounded-[2rem] h-[420px] w-full object-cover shadow-2xl" /></Tilt>
      <Tilt className="absolute right-0 bottom-0 w-[56%]"><Img id={P.i} w={800} className="rounded-[2rem] h-[350px] w-full object-cover border-[6px] border-[#fbf3fa] shadow-2xl" /></Tilt>
      <div className="absolute left-[4%] bottom-[6%] w-36 h-36 rounded-full bg-[#400849] text-white grid place-items-center text-center floaty shadow-2xl"><div><p className="font-display text-4xl">2019</p><p className="text-xs text-[#e7b0de]">Est. Padrauna</p></div></div></Reveal>
    <div><Pill>Our story</Pill><h2 className="font-display text-5xl md:text-6xl text-[#400849] leading-[1.02] mt-5"><SplitText text="A family house of fabric, built on trust" /></h2>
      <Reveal delay={200}><p className="text-[#400849]/70 text-lg leading-relaxed mt-6">{B.name} Pvt. Ltd. is a GST registered private limited company led by three directors of the Tibrewal family. We bring authentic silks, bridal couture and everyday garments to Padrauna and the Kushinagar region with fair pricing and personal service.</p>
        <div className="grid sm:grid-cols-3 gap-4 mt-9">{DIRECTORS.map((d) => <Tilt key={d} max={10} className="rounded-2xl bg-white border border-[#e7b0de] p-5 text-center"><div className="w-14 h-14 mx-auto rounded-full bg-[#400849] text-[#e7b0de] font-display text-2xl grid place-items-center">{d[0]}</div><p className="text-[#400849] font-medium text-sm mt-3 leading-snug">{d}</p><p className="text-[#ff5a0a] text-xs mt-1">Director</p></Tilt>)}</div></Reveal></div></div></section>;
}
function Stats() {
  const s = [[7, "+", "Years in business"], [25000, "+", "Happy customers"], [5000, "+", "Designs in stock"], [50, "+", "Towns we serve"]];
  return <section className="bg-[#400849] py-20"><div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">{s.map(([n, x, l], k) => <Reveal key={l} delay={k * 100}><p className="font-display text-5xl md:text-7xl text-white"><Counter to={n} suf={x} /></p><div className="w-10 h-1 bg-[#ff5a0a] rounded mx-auto my-3" /><p className="text-[#e7b0de]">{l}</p></Reveal>)}</div></section>;
}
function Collections() {
  return <section id="collections" className="bg-[#fbf3fa] pt-28 pb-16"><div className="max-w-6xl mx-auto px-6">
    <div className="text-center mb-14"><Pill>Shop by category</Pill><h2 className="font-display text-5xl md:text-7xl text-[#400849] mt-5 leading-[1]"><SplitText text="Four worlds of elegance" /></h2></div>
    {STACK.map((c, k) => <div key={c.t} className="sticky mb-10" style={{ top: `${96 + k * 26}px` }}>
      <div className="rounded-[2.5rem] overflow-hidden grid md:grid-cols-2 min-h-[440px] shadow-[0_40px_80px_-40px_rgba(64,8,73,.6)]" style={{ background: c.bg, color: c.fg }}>
        <div className="p-10 md:p-14 flex flex-col justify-between"><div><p className="font-display text-7xl opacity-30">0{k + 1}</p><h3 className="font-display text-4xl md:text-6xl mt-4 leading-none">{c.t}</h3><p className="mt-5 text-lg opacity-80 max-w-md">{c.d}</p></div>
          <a href={wa("I want to see " + c.t)} target="_blank" rel="noreferrer" className="mt-8 self-start inline-flex items-center gap-3 border-2 rounded-full px-6 py-3 font-semibold hover:bg-white hover:text-[#400849] hover:border-white transition" style={{ borderColor: c.fg }}>Ask for designs ↗</a></div>
        <div className="relative min-h-[300px] overflow-hidden group"><Img id={c.img} w={1000} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-[1500ms]" /></div></div></div>)}
  </div></section>;
}
function Featured() {
  const [i, setI] = useState(2); const n = PRODUCTS.length; const w = useWidth(); const drag = useRef(null);
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % n), 4500); return () => clearInterval(t); }, []);
  const step = w < 768 ? 150 : 250;
  return <section id="featured" className="bg-[#1d0322] py-28 overflow-hidden"><div className="max-w-7xl mx-auto px-6"><div className="text-center mb-10"><Pill dark>Featured pieces</Pill><h2 className="font-display text-5xl md:text-7xl text-white mt-5"><SplitText text="Drag, flip, fall in love" /></h2></div>
    <div className="relative h-[520px] md:h-[600px] cursor-grab active:cursor-grabbing select-none" style={{ perspective: "1600px" }} onPointerDown={(e) => (drag.current = e.clientX)} onPointerUp={(e) => { if (drag.current != null) { const d = e.clientX - drag.current; if (d > 60) setI((i - 1 + n) % n); else if (d < -60) setI((i + 1) % n); drag.current = null; } }}>
      {PRODUCTS.map((p, k) => {
        const o = (k - i + n) % n; const pos = o > n / 2 ? o - n : o; const a = Math.abs(pos);
        return <div key={p.n} className="absolute left-1/2 top-1/2 w-[240px] md:w-[320px] transition-all duration-700 ease-out" style={{ transform: `translate(-50%,-50%) translateX(${pos * step}px) translateZ(${-a * 160}px) rotateY(${-pos * 38}deg)`, zIndex: 10 - a, opacity: a > 2 ? 0 : 1 - a * .22, pointerEvents: a > 2 ? "none" : "auto" }}>
          <div className="rounded-[2rem] overflow-hidden bg-[#400849] border border-[#e7b0de]/40 shadow-[0_40px_80px_-30px_rgba(0,0,0,.8)]"><Img id={p.img} w={700} className="w-full h-[360px] md:h-[440px] object-cover" />
            <div className="p-5 flex items-center justify-between"><div><h3 className="font-display text-xl text-white leading-tight">{p.n}</h3><p className="text-[#e7b0de] mt-1">from {p.p}</p></div><a href={wa("I want to buy " + p.n)} target="_blank" rel="noreferrer" className="bg-[#ff5a0a] text-white w-11 h-11 rounded-full grid place-items-center hover:scale-110 transition">↗</a></div></div></div>;
      })}
    </div>
    <div className="flex justify-center items-center gap-6 mt-4">{["←", "→"].map((a, k) => <button key={a} aria-label={k ? "Next" : "Previous"} onClick={() => setI((i + (k ? 1 : -1) + n) % n)} className="w-14 h-14 rounded-full border border-[#e7b0de] text-[#e7b0de] text-xl hover:bg-[#ff5a0a] hover:border-[#ff5a0a] hover:text-white transition">{a}</button>)}</div></div></section>;
}
function Strips() {
  const row = (arr, rev) => <div className="overflow-hidden"><div className={`${rev ? "marq-r" : "marq"} flex w-max gap-4`}>{[...arr, ...arr, ...arr, ...arr].map((id, k) => <div key={k} className="w-[200px] md:w-[280px] h-[260px] md:h-[360px] shrink-0 rounded-3xl overflow-hidden group"><Img id={id} w={600} className="w-full h-full object-cover group-hover:scale-110 transition duration-[1200ms]" /></div>)}</div></div>;
  return <section className="bg-[#fbf3fa] py-20 space-y-4 overflow-hidden">{row(STRIP1)}{row(STRIP2, true)}</section>;
}
function Process() {
  return <section className="bg-[#fbf3fa] py-28"><div className="max-w-6xl mx-auto px-6"><div className="text-center mb-14"><Pill>How we work</Pill><h2 className="font-display text-5xl md:text-7xl text-[#400849] mt-5"><SplitText text="From loom to wardrobe" /></h2></div>
    <div className="grid md:grid-cols-4 gap-6">{STEPS.map(([t, d], k) => <Reveal key={t} delay={k * 120}><Tilt max={10} className="h-full rounded-3xl bg-white border border-[#e7b0de] p-7 shadow-[0_30px_60px_-35px_rgba(64,8,73,.5)]"><div className="w-12 h-12 rounded-2xl bg-[#400849] text-[#e7b0de] font-display text-2xl grid place-items-center" style={{ transform: "translateZ(30px)" }}>{k + 1}</div><h3 className="font-display text-2xl text-[#400849] mt-5">{t}</h3><p className="text-[#400849]/65 mt-2">{d}</p></Tilt></Reveal>)}</div></div></section>;
}
function Video() {
  const v = useRef(null); const [pl, setPl] = useState(false);
  return <section id="video" className="bg-[#400849] py-28"><div className="max-w-6xl mx-auto px-6"><div className="text-center mb-12"><Pill dark>Showroom film</Pill><h2 className="font-display text-5xl md:text-7xl text-white mt-5"><SplitText text="Step inside Radhika" /></h2></div>
    <Reveal from="zoom"><Tilt max={4} className="rounded-[2.5rem] overflow-hidden border-[8px] border-[#e7b0de]/40 shadow-[0_60px_100px_-40px_rgba(0,0,0,.8)]"><div className="relative aspect-video bg-[#1d0322]">
      <video ref={v} src={VIDEO} poster={U(P.l, 1600)} loop muted playsInline className="w-full h-full object-cover" />
      <button onClick={() => { v.current.paused ? v.current.play() : v.current.pause(); setPl(!v.current.paused); }} aria-label="Play or pause" className={`absolute inset-0 grid place-items-center transition ${pl ? "opacity-0 hover:opacity-100" : ""}`}><span className="w-24 h-24 rounded-full bg-[#ff5a0a] text-white text-3xl grid place-items-center ripple">{pl ? "❚❚" : "▶"}</span></button></div></Tilt></Reveal></div></section>;
}
function Bridal() {
  const y = useScrollY();
  return <section id="bridal" className="relative bg-[#1d0322] py-40 overflow-hidden"><Img id={P.h} w={1800} className="absolute inset-0 w-full h-full object-cover opacity-30" style={{ transform: `translateY(${(y % 5000) * -.04}px) scale(1.15)` }} /><div className="absolute inset-0 bg-gradient-to-r from-[#1d0322] via-[#1d0322]/85 to-transparent" />
    <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center"><div><Pill dark>Bridal studio</Pill><h2 className="font-display text-5xl md:text-7xl text-white leading-[1] mt-5"><SplitText text="Your wedding, dressed in heirlooms" /></h2>
      <Reveal delay={200}><p className="text-white/70 text-lg mt-6 max-w-xl">Lehengas, Banarasi sarees, dupattas and outfits for the entire family, planned together at package pricing.</p>
        <ul className="mt-8 space-y-3 text-white">{["Complete bride and groom family outfitting", "Hand embroidery: zardozi, resham and sequin", "Private appointment and styling session", "Special rates on bulk wedding orders"].map((x) => <li key={x} className="flex gap-3"><span className="text-[#ff5a0a]">✦</span>{x}</li>)}</ul>
        <div className="mt-10"><Btn href={wa("I want to book a bridal appointment")} target="_blank" rel="noreferrer">Book appointment</Btn></div></Reveal></div>
      <Reveal from="right" className="hidden lg:block"><Tilt max={16} className="mx-auto w-[360px]"><div className="rounded-[2.5rem] overflow-hidden border-[6px] border-[#e7b0de] shadow-2xl" style={{ transform: "translateZ(40px)" }}><Img id={P.j} w={800} className="h-[500px] w-full object-cover" /></div></Tilt></Reveal></div></section>;
}
function Sale() {
  const t = useCountdown(SALE_END);
  const Bx = ({ v, l }) => <div className="text-center"><div className="w-20 md:w-32 h-24 md:h-36 grid place-items-center rounded-3xl bg-[#400849] font-display text-5xl md:text-7xl text-white flip tabular-nums shadow-2xl">{String(v).padStart(2, "0")}</div><p className="text-[#400849] mt-3 text-sm font-semibold">{l}</p></div>;
  return <section className="bg-[#e7b0de] py-28 text-center"><div className="max-w-5xl mx-auto px-6"><Reveal><span className="bg-[#ff5a0a] text-white text-sm font-semibold px-4 py-1.5 rounded-full">Festive sale is live</span><h2 className="font-display text-5xl md:text-7xl text-[#400849] mt-5 leading-[1]">Flat 30% off on silk and bridal wear</h2><p className="text-[#400849]/70 mt-4">Offer ends in</p>
    <div className="flex justify-center gap-3 md:gap-6 mt-8"><Bx v={t.d} l="Days" /><Bx v={t.h} l="Hours" /><Bx v={t.m} l="Minutes" /><Bx v={t.s} l="Seconds" /></div><div className="mt-12"><Btn href="#contact">Claim the offer</Btn></div></Reveal></div></section>;
}
function Gallery() {
  const [lb, setLb] = useState(null);
  return <section id="gallery" className="bg-[#fbf3fa] py-28"><div className="max-w-7xl mx-auto px-6"><div className="text-center mb-14"><Pill>Lookbook</Pill><h2 className="font-display text-5xl md:text-7xl text-[#400849] mt-5"><SplitText text="Our favourite drapes" /></h2></div>
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 [&>*]:mb-4">{GALLERY.map((id, k) => <Reveal key={k} delay={(k % 4) * 70} from="zoom"><button onClick={() => setLb(id)} className="block w-full overflow-hidden rounded-2xl group shadow-lg"><Img id={id} w={700} className={`w-full object-cover group-hover:scale-110 transition duration-[1200ms] ${k % 3 === 0 ? "h-80" : k % 3 === 1 ? "h-64" : "h-96"}`} /></button></Reveal>)}</div></div>
    {lb && <div onClick={() => setLb(null)} className="fixed inset-0 z-[90] bg-[#1d0322]/95 grid place-items-center p-6 cursor-zoom-out fade-in"><Img id={lb} w={1600} className="max-h-[90vh] rounded-2xl" /><button className="absolute top-6 right-6 text-white text-4xl" aria-label="Close">✕</button></div>}</section>;
}
function Wholesale() {
  const tiers = [["Retail", "Walk-in shopping", ["Full showroom range", "Personal styling help", "GST invoice on request"]], ["Wholesale", "For shops and resellers", ["Special bulk rates", "Design catalogues on WhatsApp", "New stock alerts"], true], ["Wedding package", "For complete weddings", ["Bridal and family outfits", "Private appointment", "Package pricing"]]];
  return <section className="bg-white py-28"><div className="max-w-7xl mx-auto px-6"><div className="text-center mb-14"><Pill>Buy your way</Pill><h2 className="font-display text-5xl md:text-7xl text-[#400849] mt-5"><SplitText text="Retail, wholesale, weddings" /></h2></div>
    <div className="grid md:grid-cols-3 gap-7 items-stretch">{tiers.map(([t, s, l, hot], k) => <Reveal key={t} delay={k * 110}><Tilt className={`rounded-[2rem] p-9 h-full ${hot ? "bg-[#400849] text-white shadow-2xl md:-translate-y-4" : "bg-[#fbf3fa] text-[#400849] border border-[#e7b0de]"}`}>
      {hot && <span className="absolute -top-3 right-6 bg-[#ff5a0a] text-white text-xs font-semibold px-3 py-1 rounded-full">Most popular</span>}
      <h3 className="font-display text-4xl">{t}</h3><p className={`mt-1 ${hot ? "text-white/65" : "text-[#400849]/60"}`}>{s}</p><ul className="mt-6 space-y-3">{l.map((x) => <li key={x} className="flex gap-3"><span className="text-[#ff5a0a]">✓</span>{x}</li>)}</ul>
      <a href={wa("I am interested in " + t)} target="_blank" rel="noreferrer" className={`inline-block mt-8 px-7 py-3 rounded-full font-semibold transition ${hot ? "bg-[#ff5a0a] text-white hover:bg-white hover:text-[#400849]" : "bg-[#400849] text-white hover:bg-[#ff5a0a]"}`}>Get in touch</a></Tilt></Reveal>)}</div></div></section>;
}
function Reviews() {
  const [i, setI] = useState(0); const n = REVIEWS.length;
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % n), 5000); return () => clearInterval(t); }, []);
  return <section className="bg-[#e7b0de]/40 py-28"><div className="max-w-4xl mx-auto px-6 text-center"><Pill>Kind words</Pill>
    <div className="relative mt-10 min-h-[300px]">{REVIEWS.map((r, k) => <div key={k} className={`absolute inset-0 transition-all duration-700 ${k === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"}`}><p className="font-display text-7xl text-[#ff5a0a] leading-none">“</p><p className="font-display text-2xl md:text-4xl text-[#400849] leading-snug">{r.t}</p><p className="mt-6 text-[#400849] font-semibold">{r.n} <span className="text-[#400849]/50 font-normal">· {r.p}</span></p></div>)}</div>
    <div className="flex justify-center gap-2">{REVIEWS.map((_, k) => <button key={k} onClick={() => setI(k)} aria-label={`Review ${k + 1}`} className={`h-2 rounded-full transition-all ${k === i ? "w-10 bg-[#ff5a0a]" : "w-2 bg-[#400849]/30"}`} />)}</div></div></section>;
}
function Faq() {
  const [o, setO] = useState(0);
  return <section id="faq" className="bg-[#fbf3fa] py-28"><div className="max-w-3xl mx-auto px-6"><div className="text-center mb-12"><Pill>Questions</Pill><h2 className="font-display text-5xl md:text-6xl text-[#400849] mt-5">Things people ask us</h2></div>
    {FAQ.map(([q, a], k) => <div key={q} className="bg-white rounded-2xl mb-4 border border-[#e7b0de]/70 overflow-hidden"><button onClick={() => setO(o === k ? -1 : k)} className="w-full flex justify-between items-center p-6 text-left"><span className="font-display text-xl md:text-2xl text-[#400849]">{q}</span><span className={`w-9 h-9 shrink-0 rounded-full grid place-items-center text-xl transition ${o === k ? "bg-[#ff5a0a] text-white rotate-45" : "bg-[#e7b0de]/50 text-[#400849]"}`}>+</span></button>
      <div className={`grid transition-all duration-500 ${o === k ? "grid-rows-[1fr] pb-6 px-6" : "grid-rows-[0fr] px-6"}`}><p className="overflow-hidden text-[#400849]/70 text-lg">{a}</p></div></div>)}</div></section>;
}
function Trust() {
  const rows = [["Legal name", B.legal], ["GSTIN", B.gstin], ["Constitution", "Private Limited Company"], ["Registration type", "Regular"], ["Valid from", B.since], ["Principal place of business", B.address]];
  return <section className="bg-white py-24"><div className="max-w-5xl mx-auto px-6"><Reveal><Tilt max={4} className="rounded-[2.25rem] border-2 border-[#e7b0de] bg-[#fbf3fa] p-8 md:p-12 shadow-[0_40px_80px_-40px_rgba(64,8,73,.5)]">
    <div className="flex items-center gap-4 mb-8"><span className="w-12 h-12 rounded-full bg-emerald-500 text-white text-2xl grid place-items-center">✓</span><h3 className="font-display text-3xl md:text-4xl text-[#400849]">Verified GST registered business</h3></div>
    <dl className="grid md:grid-cols-2 gap-x-12 gap-y-6">{rows.map(([k, v], i) => <div key={k} className={i === 5 ? "md:col-span-2" : ""}><dt className="text-[#ff5a0a] text-sm font-semibold">{k}</dt><dd className="text-[#400849] text-lg break-words">{v}</dd></div>)}</dl></Tilt></Reveal></div></section>;
}
function Contact() {
  const [f, setF] = useState({ n: "", p: "", i: "Sarees", m: "" });
  const go = (e) => { e.preventDefault(); window.open(wa(`Hello Radhika Garments\nName: ${f.n}\nPhone: ${f.p}\nInterested in: ${f.i}\nMessage: ${f.m}`), "_blank"); };
  const c = "w-full bg-[#fbf3fa] border border-[#e7b0de] focus:border-[#ff5a0a] outline-none rounded-xl px-5 py-4 text-[#400849] placeholder-[#400849]/40 transition";
  return <section id="contact" className="bg-[#400849] py-28"><div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14">
    <div><Pill dark>Visit or write to us</Pill><h2 className="font-display text-5xl md:text-6xl text-white leading-[1.02] mt-5"><SplitText text="Let us help you find your perfect drape" /></h2>
      <div className="mt-9 space-y-5 text-white/80">{[["Showroom", B.address], ["Phone", B.phone], ["Email", B.email]].map(([k, v]) => <p key={k}><span className="text-[#e7b0de] block text-sm">{k}</span>{v}</p>)}</div>
      <div className="mt-8 h-60 rounded-3xl overflow-hidden border-4 border-white/10"><iframe title="Map" loading="lazy" className="w-full h-full" src={`https://www.google.com/maps?q=${encodeURIComponent("Prakash Complex Kotwali Road Padrauna Kushinagar")}&output=embed`} /></div></div>
    <Reveal from="right"><Tilt max={4} className="rounded-[2rem] bg-white p-8 md:p-10"><form onSubmit={go} className="space-y-5">
      <input required className={c} placeholder="Your name" value={f.n} onChange={(e) => setF({ ...f, n: e.target.value })} />
      <input required type="tel" className={c} placeholder="Phone number" value={f.p} onChange={(e) => setF({ ...f, p: e.target.value })} />
      <select className={c} value={f.i} onChange={(e) => setF({ ...f, i: e.target.value })}>{["Sarees", "Garments", "Bridal wear", "Wholesale"].map((o) => <option key={o}>{o}</option>)}</select>
      <textarea rows="4" className={c} placeholder="Tell us what you are looking for" value={f.m} onChange={(e) => setF({ ...f, m: e.target.value })} />
      <button className="w-full bg-[#ff5a0a] text-white font-semibold py-4 rounded-full shadow-[0_14px_40px_-12px_#ff5a0a] hover:-translate-y-1 transition">Send on WhatsApp</button></form></Tilt></Reveal></div></section>;
}
function Footer() {
  return <footer className="bg-[#1d0322] pt-20 pb-8 text-white/60 overflow-hidden"><div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
    <div className="md:col-span-2"><p className="font-display text-3xl text-white">Radhika <span className="text-[#e7b0de] italic">Garments</span></p><p className="mt-4 max-w-md">Premium sarees, bridal wear and garments from Padrauna, Kushinagar.</p></div>
    <div><p className="text-[#e7b0de] mb-3 font-semibold">Explore</p>{["Collections", "Featured", "Bridal", "Gallery", "Contact"].map((x) => <a key={x} href={`#${x.toLowerCase()}`} className="block py-1 hover:text-[#ff5a0a] transition">{x}</a>)}</div>
    <div><p className="text-[#e7b0de] mb-3 font-semibold">Business</p><p className="text-sm">GSTIN {B.gstin}</p><a href={B.insta} className="block mt-2 hover:text-[#ff5a0a]">Instagram</a><a href={wa("Hello")} className="block hover:text-[#ff5a0a]">WhatsApp</a></div></div>
    <p className="font-display text-[17vw] leading-none text-center text-[#400849] select-none mt-12">RADHIKA</p>
    <p className="text-center text-sm border-t border-white/10 pt-6 mx-6">© {new Date().getFullYear()} {B.legal}. All rights reserved.</p></footer>;
}
function Floating() {
  const y = useScrollY();
  return <><a href={wa("Hello")} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#ff5a0a] text-white text-2xl grid place-items-center shadow-2xl hover:scale-110 transition ripple">✆</a>
    {y > 800 && <a href="#top" aria-label="Back to top" className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-[#400849] text-white text-xl grid place-items-center hover:-translate-y-1 transition">↑</a>}</>;
}

/* ================= APP ================= */
export default function App() {
  return <div className="font-sans antialiased overflow-x-clip bg-[#fbf3fa]">
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;1,400;1,600&family=Outfit:wght@300;400;500;600&display=swap');
      html{scroll-behavior:smooth}.font-display{font-family:'Fraunces',serif;font-weight:600}.font-sans,body{font-family:'Outfit',sans-serif}
      @media (min-width:1024px){body,a,button{cursor:none}}
      .glare{background:radial-gradient(circle at var(--x,50%) var(--y,50%),rgba(255,255,255,.28),transparent 55%)}
      .floaty{animation:fl 7s ease-in-out infinite}@keyframes fl{50%{translate:0 -20px}}
      .ring3d{animation:ring 30s linear infinite}@keyframes ring{to{transform:rotateY(-360deg)}}
      .marq{animation:mq 40s linear infinite}@keyframes mq{to{transform:translateX(-50%)}}
      .marq-r{animation:mqr 40s linear infinite}@keyframes mqr{from{transform:translateX(-50%)}to{transform:translateX(0)}}
      .hero-a{animation:ha 1.1s cubic-bezier(.2,.7,.2,1) both}@keyframes ha{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:none}}
      .fade-in{animation:fi .8s both}@keyframes fi{from{opacity:0}to{opacity:1}}
      .ripple{animation:rp 2s infinite}@keyframes rp{0%{box-shadow:0 0 0 0 rgba(255,90,10,.55)}100%{box-shadow:0 0 0 30px rgba(255,90,10,0)}}
      .pulse{animation:pu 1.6s infinite}@keyframes pu{50%{transform:scale(1.7);opacity:.5}}
      .flip{animation:fp 1s ease-out}@keyframes fp{from{transform:rotateX(-70deg)}to{transform:none}}
      ::selection{background:#e7b0de;color:#400849}
      @media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
    `}</style>
    <Preloader /><Cursor /><Nav /><Hero /><Marquee /><Intro /><Stats /><Collections /><Featured /><Strips /><Process /><Video /><Bridal /><Sale /><Gallery /><Wholesale /><Reviews /><Faq /><Trust /><Contact /><Footer /><Floating />
  </div>;
}