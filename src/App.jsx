import { useState } from "react";
import {
  Sparkles,
  Star,
  Droplets,
  Leaf,
  Flame,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import AuthModal from "./components/AuthModal";

// NOTE: If you're using Vite + React + Tailwind, paste this as App.jsx and run `npm run dev`.
// The gradient uses #1F1C2C → #928DAB based on your request.

// Smooth scroll function with animation
const smoothScrollTo = (elementId, offset = 80) => {
  const element = document.getElementById(elementId);
  if (element) {
    // Add visual feedback to all buttons
    const button = document.activeElement;
    if (button && button.tagName === "BUTTON") {
      button.style.transform = "scale(0.95)";
      setTimeout(() => {
        button.style.transform = "";
      }, 150);
    }

    const targetPosition = element.offsetTop - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800; // 800ms for smooth animation
    let start = null;

    const animation = (currentTime) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = easeInOutQuart(
        timeElapsed,
        startPosition,
        distance,
        duration
      );
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    // Easing function for smooth animation
    const easeInOutQuart = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t * t * t + b;
      t -= 2;
      return (-c / 2) * (t * t * t * t - 2) + b;
    };

    requestAnimationFrame(animation);
  }
};

export default function App() {
  const [authModal, setAuthModal] = useState({
    isOpen: false,
    mode: "login", // "login" or "signup"
  });

  const openAuthModal = (mode) => {
    setAuthModal({ isOpen: true, mode });
  };

  const closeAuthModal = () => {
    setAuthModal({ isOpen: false, mode: "login" });
  };

  return (
    <div className="min-h-screen w-full text-white bg-[#0f0e13] overflow-x-hidden">
      {/* Global background gradient */}
      <div
        aria-hidden
        className="fixed inset-0 -z-10 opacity-80"
        style={{
          background:
            "radial-gradient(1200px 600px at 10% 0%, rgba(146,141,171,0.25) 0%, rgba(31,28,44,0) 60%), linear-gradient(135deg, #1F1C2C 0%, #928DAB 100%)",
        }}
      />

      <Header onOpenAuth={openAuthModal} />
      <main className="relative w-full">
        <Hero />
        <Collections />
        <Notes />
        <Bestsellers />
        <Story />
        <Newsletter />
      </main>
      <Footer />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={closeAuthModal}
        initialMode={authModal.mode}
      />
    </div>
  );
}

function Header({ onOpenAuth }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-black/20 bg-black/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2 group">
          <Sparkles className="w-5 h-5" />
          <span className="tracking-widest font-light text-sm group-hover:opacity-90">
            LUNARÉ PARFUMS
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm">
          <button
            onClick={() => smoothScrollTo("collections")}
            className="hover:opacity-80 transition-all duration-150 active:scale-95"
          >
            Koleksiyonlar
          </button>
          <button
            onClick={() => smoothScrollTo("notes")}
            className="hover:opacity-80 transition-all duration-150 active:scale-95"
          >
            Notalar
          </button>
          <button
            onClick={() => smoothScrollTo("story")}
            className="hover:opacity-80 transition-all duration-150 active:scale-95"
          >
            Hikayemiz
          </button>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => onOpenAuth("login")}
            className="px-4 py-2 rounded-xl bg-white text-black hover:bg-white/90 transition"
          >
            Giriş
          </button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2"
          aria-label="Menüyü Aç/Kapat"
        >
          <div className="w-6 h-0.5 bg-white mb-1" />
          <div className="w-6 h-0.5 bg-white mb-1" />
          <div className="w-6 h-0.5 bg-white" />
        </button>
      </nav>

      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-black/40 backdrop-blur">
          <button
            onClick={() => {
              smoothScrollTo("collections");
              setOpen(false);
            }}
            className="block py-2 w-full text-left hover:opacity-80 transition-all duration-150 active:scale-95"
          >
            Koleksiyonlar
          </button>
          <button
            onClick={() => {
              smoothScrollTo("notes");
              setOpen(false);
            }}
            className="block py-2 w-full text-left hover:opacity-80 transition-all duration-150 active:scale-95"
          >
            Notalar
          </button>
          <button
            onClick={() => {
              smoothScrollTo("story");
              setOpen(false);
            }}
            className="block py-2 w-full text-left hover:opacity-80 transition-all duration-150 active:scale-95"
          >
            Hikayemiz
          </button>
          <div className="pt-2">
            <button
              onClick={() => onOpenAuth("login")}
              className="w-full px-4 py-2 rounded-xl bg-white text-black hover:bg-white/90 transition text-center"
            >
              Giriş
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="uppercase tracking-[0.3em] text-white/80 text-xs">
            Eau de Parfum
          </p>
          <h1 className="mt-4 text-4xl md:text-6xl lg:text-7xl leading-tight font-light">
            Geceyle <span className="font-semibold">Dans Eden</span> Notalar
          </h1>
          <p className="mt-6 text-lg text-white/80 max-w-xl">
            Şehir ışıklarının altında doğan LUNARÉ, koyu orman ve amber
            dokunuşlarını mor gün batımının zarafetiyle buluşturur. Hem cesur,
            hem zarif.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => smoothScrollTo("bestsellers")}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-white text-black hover:bg-white/90 transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              Şimdi Keşfet <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => smoothScrollTo("story")}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl border border-white/30 hover:border-white/60 transition-all duration-300 hover:bg-white/10 active:scale-95"
            >
              Markayı Tanı
            </button>
          </div>

          <div className="mt-10 flex items-center gap-6 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" /> 4.9/5 (2.4k+ değerlendirme)
            </div>
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4" /> Uzun Kalıcılık
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <div
            className="absolute -inset-6 bg-white/10 rounded-[2rem] blur-2xl"
            aria-hidden
          />
          <div className="relative rounded-[2rem] overflow-hidden border border-white/20">
            <img
              src="https://images.unsplash.com/photo-1629198720078-2b2cfb1af654?q=80&w=1600&auto=format&fit=crop"
              alt="LUNARÉ Eau de Parfum şişesi"
              className="w-full h-[420px] object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Collections() {
  const items = [
    {
      title: "Nocturne",
      img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop",
      desc: "Mür, sedir ve kakule ile koyu bir gece yürüyüşü.",
    },
    {
      title: "Améthyste",
      img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop",
      desc: "Menekşe, lavanta ve misk ile mor tonlarda bir zarafet.",
    },
    {
      title: "Argent",
      img: "https://images.unsplash.com/photo-1509833903111-9cb142f644e1?q=80&w=1600&auto=format&fit=crop",
      desc: "Bergamot, vetiver ve amberin sofistike dokunuşu.",
    },
  ];

  return (
    <section id="collections" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-light mb-8 flex items-center gap-3">
          <span className="h-px w-10 bg-white/30" /> Signature Koleksiyonlar
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it) => (
            <motion.article
              key={it.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group rounded-3xl overflow-hidden border border-white/15 bg-white/5 hover:bg-white/10 backdrop-blur"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={it.img}
                  alt={it.title}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-medium">{it.title}</h3>
                <p className="text-sm text-white/80 mt-1">{it.desc}</p>
                <button className="mt-4 text-sm inline-flex items-center gap-1 hover:opacity-80">
                  İncele <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Notes() {
  const notes = [
    {
      icon: <Leaf className="w-5 h-5" />,
      title: "Üst Nota",
      text: "Bergamot · Kakule",
    },
    {
      icon: <Droplets className="w-5 h-5" />,
      title: "Orta Nota",
      text: "Menekşe · Lavanta",
    },
    {
      icon: <Flame className="w-5 h-5" />,
      title: "Alt Nota",
      text: "Amber · Misk",
    },
  ];

  return (
    <section id="notes" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-light mb-8">
            Parfüm Notaları
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {notes.map((n) => (
              <div
                key={n.title}
                className="rounded-2xl p-6 bg-black/20 border border-white/10"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/10">
                    {n.icon}
                  </span>
                  <div>
                    <p className="text-sm text-white/70">{n.title}</p>
                    <p className="font-medium">{n.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Bestsellers() {
  const items = [
    {
      name: "Eau de Minuit",
      price: "₺2.490",
      img: "https://images.unsplash.com/photo-1547887538-047f814d52b0?q=80&w=1600&auto=format&fit=crop",
    },
    {
      name: "Nocturne Intense",
      price: "₺2.890",
      img: "https://images.unsplash.com/photo-1520950237264-8f9517e83f51?q=80&w=1600&auto=format&fit=crop",
    },
    {
      name: "Améthyste 50ml",
      price: "₺1.990",
      img: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=1600&auto=format&fit=crop",
    },
  ];

  return (
    <section id="bestsellers" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-light">Çok Satanlar</h2>
          <button
            onClick={() => smoothScrollTo("collections")}
            className="text-sm hover:opacity-80 transition-all duration-150 active:scale-95"
          >
            Tümünü Gör
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p) => (
            <div
              key={p.name}
              className="rounded-3xl overflow-hidden border border-white/15 bg-white/5"
            >
              <div className="aspect-[4/3] overflow-hidden bg-black/20">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{p.name}</h3>
                  <span className="text-white/80 text-sm">{p.price}</span>
                </div>
                <button className="mt-4 w-full py-2.5 rounded-xl bg-white text-black hover:bg-white/90 transition">
                  Sepete Ekle
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="story" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
        <div className="rounded-3xl overflow-hidden border border-white/15">
          <img
            src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1600&auto=format&fit=crop"
            alt="Atölyede parfüm karışımları"
            className="w-full h-[360px] object-cover"
          />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-light">
            Ay Işığından İlham
          </h2>
          <p className="mt-4 text-white/80">
            LUNARÉ, gece gökyüzünün derin tonlarını ve ay ışığının gümüş
            parıltısını şişeye taşır. Sürdürülebilir hammaddeler ve küçük parti
            üretim anlayışıyla, her damla benzersiz bir karakter sunar.
          </p>
          <ul className="mt-6 space-y-2 text-white/80 text-sm list-disc list-inside">
            <li>Avrupa menşeli esanslar</li>
            <li>Vegan & hayvan dostu</li>
            <li>Geri dönüştürülebilir ambalaj</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/15 bg-white/5 p-8">
          <h3 className="text-xl md:text-2xl font-light">
            Özel lansmanlardan haberdar olun
          </h3>
          <p className="mt-2 text-white/80 text-sm">
            Ayda bir e-posta. İndirimler, erken erişimler ve atölye hikayeleri.
          </p>
          <form className="mt-6 flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="E-posta adresiniz"
              className="flex-1 px-4 py-3 rounded-xl bg-black/40 border border-white/20 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <button className="px-6 py-3 rounded-xl bg-white text-black hover:bg-white/90 transition">
              Kaydol
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 py-10 text-sm text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>LUNARÉ PARFUMS</span>
          </div>
          <p className="mt-3 max-w-sm">
            Gece tonlarında zarafet. © {new Date().getFullYear()}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-white mb-2">Mağaza</p>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:opacity-80">
                  Yeni Gelenler
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-80">
                  Hediye Setleri
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-80">
                  Aksesuar
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-white mb-2">Destek</p>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:opacity-80">
                  S.S.S
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-80">
                  İletişim
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-80">
                  Kargo & İade
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="md:text-right">
          <p>Bizi Takip Edin</p>
          <div className="mt-3 inline-flex gap-3">
            <a
              href="#"
              className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 hover:bg-white/15"
            >
              IG
            </a>
            <a
              href="#"
              className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 hover:bg-white/15"
            >
              TT
            </a>
            <a
              href="#"
              className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 hover:bg-white/15"
            >
              YT
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
