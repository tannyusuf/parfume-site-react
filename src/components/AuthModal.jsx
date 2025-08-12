import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Eye,
  EyeOff,
  Sparkles,
  User,
  Mail,
  Lock,
  ArrowRight,
} from "lucide-react";

export default function AuthModal({ isOpen, onClose, initialMode = "login" }) {
  const [mode, setMode] = useState(initialMode); // "login" or "signup"
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300); // Animation duration
  };
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "signup" && formData.password !== formData.confirmPassword) {
      alert("Şifreler eşleşmiyor!");
      return;
    }
    // Burada login/signup işlemleri yapılacak
    console.log(mode === "login" ? "Giriş yapılıyor..." : "Kayıt olunuyor...");
    console.log(formData);
    handleClose();
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  // ESC tuşu ile kapatma
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Modal açıkken body scroll'unu engelle
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {(isOpen || isClosing) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.2,
              exit: { duration: 0.3 },
            }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{
              opacity: 0,
              scale: 0.8,
              y: -20,
            }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 500,
              exit: {
                duration: 0.3,
                ease: "easeIn",
              },
            }}
            className="relative w-full max-w-md mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-3xl border border-white/20 bg-gradient-to-br from-[#1F1C2C] to-[#2a2535] p-8 backdrop-blur-xl shadow-2xl">
              {/* Background gradient effect */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-3xl opacity-50"
                style={{
                  background:
                    "radial-gradient(600px 300px at 50% 0%, rgba(146,141,171,0.15) 0%, rgba(31,28,44,0) 60%)",
                }}
              />

              {/* Close button */}
              <motion.button
                onClick={handleClose}
                initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.6, rotate: 180 }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{
                  duration: 0.2,
                  exit: { duration: 0.25, ease: "easeIn" },
                }}
                className="absolute top-6 right-6 p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors z-10"
                aria-label="Modalı Kapat"
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>

              {/* Header */}
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{
                  duration: 0.3,
                  exit: { duration: 0.2 },
                }}
                className="relative text-center mb-8"
              >
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                  <span className="text-xl font-light tracking-widest text-white">
                    LUNARÉ
                  </span>
                </div>
                <h2 className="text-2xl font-light text-white mb-2">
                  {mode === "login" ? "Hoş Geldiniz" : "Aramıza Katılın"}
                </h2>
                <p className="text-white/70 text-sm">
                  {mode === "login"
                    ? "Hesabınıza giriş yapın"
                    : "Yeni hesap oluşturun"}
                </p>
              </motion.div>

              {/* Form */}
              <motion.form
                key={`form-${mode}`}
                initial={{ opacity: 0, x: mode === "login" ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{
                  opacity: 0,
                  x: mode === "login" ? 20 : -20,
                  scale: 0.95,
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                  exit: { duration: 0.25, ease: "easeIn" },
                }}
                onSubmit={handleSubmit}
                className="relative space-y-5"
              >
                {/* Name field - only for signup */}
                {mode === "signup" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="relative"
                  >
                    <label className="block text-white/80 text-sm mb-2">
                      Ad Soyad
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Adınızı girin"
                        required={mode === "signup"}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Email field */}
                <div className="relative">
                  <label className="block text-white/80 text-sm mb-2">
                    E-posta
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="ornek@email.com"
                      required
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Password field */}
                <div className="relative">
                  <label className="block text-white/80 text-sm mb-2">
                    Şifre
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      required
                      className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-white/50 hover:text-white/80"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password field - only for signup */}
                {mode === "signup" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
                    className="relative"
                  >
                    <label className="block text-white/80 text-sm mb-2">
                      Şifre Tekrar
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        required={mode === "signup"}
                        className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-white/50 hover:text-white/80"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Forgot password - only for login */}
                {mode === "login" && (
                  <div className="text-right">
                    <button
                      type="button"
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      Şifremi Unuttum
                    </button>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  {mode === "login" ? "Giriş Yap" : "Kayıt Ol"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.form>

              {/* Toggle mode */}
              <motion.div
                key={`toggle-${mode}`}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5, scale: 0.9 }}
                transition={{
                  duration: 0.3,
                  delay: 0.1,
                  exit: { duration: 0.2, delay: 0 },
                }}
                className="relative mt-8 text-center"
              >
                <div className="flex items-center justify-center gap-2 text-sm text-white/70">
                  <span>
                    {mode === "login"
                      ? "Hesabınız yok mu?"
                      : "Zaten hesabınız var mı?"}
                  </span>
                  <motion.button
                    onClick={toggleMode}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-white hover:text-white/80 font-medium underline decoration-white/30 hover:decoration-white/60 transition-colors"
                  >
                    {mode === "login" ? "Kayıt Ol" : "Giriş Yap"}
                  </motion.button>
                </div>
              </motion.div>

              {/* Terms - only for signup */}
              {mode === "signup" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15, scale: 0.9 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.2,
                    exit: { duration: 0.2, delay: 0 },
                  }}
                  className="relative mt-6 text-center text-xs text-white/60"
                >
                  Kayıt olarak{" "}
                  <a href="#" className="underline hover:text-white/80">
                    Kullanım Şartları
                  </a>{" "}
                  ve{" "}
                  <a href="#" className="underline hover:text-white/80">
                    Gizlilik Politikası
                  </a>
                  'nı kabul etmiş olursunuz.
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
