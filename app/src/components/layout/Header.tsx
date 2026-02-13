import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import ThemeToggle from "@/components/theme/ThemeToggle";

function Header() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  const isResourcesPage =
    location.pathname === "/portfolio" || location.pathname === "/slides";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest("nav")) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 md:py-4 transition-all duration-300 ${
        isLandingPage
          ? "bg-ivory-50 dark:bg-gray-900 border-b border-stone-200 dark:border-gray-700"
          : "bg-ivory-50 dark:bg-gray-900 border-b border-stone-200 dark:border-gray-700"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {isLandingPage ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center transition-opacity hover:opacity-80 gap-2 z-10 cursor-pointer"
            aria-label="Scroll to top"
          >
            <img
              src="/kmavillanosa/cms/media/logo.png"
              alt="Kim Avillanosa"
              className="h-10 md:h-12 lg:h-14 w-auto object-contain"
              style={{ maxHeight: "56px" }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </button>
        ) : (
          <Link
            to="/"
            className="flex items-center transition-opacity hover:opacity-80 gap-2 z-10"
            onClick={() => {
              setIsMenuOpen(false);
              // Ensure we scroll to top when navigating to landing page
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }, 100);
            }}
          >
            <img
              src="/kmavillanosa/cms/media/logo.png"
              alt="Kim Avillanosa"
              className="h-10 md:h-12 lg:h-14 w-auto object-contain"
              style={{ maxHeight: "56px" }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </Link>
        )}

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/"
            className={`px-3 py-2 transition-colors rounded-lg ${
              isLandingPage
                ? "text-stone-800 dark:text-gray-200 hover:text-stone-900 dark:hover:text-white"
                : "text-stone-700 dark:text-gray-300 hover:text-stone-900 dark:hover:text-white"
            }`}
          >
            Home
          </Link>
          <div className="relative group">
            <button
              className={`px-3 py-2 transition-colors rounded-lg flex items-center gap-1 ${
                isResourcesPage
                  ? "text-green-600 dark:text-green-400 font-semibold"
                  : isLandingPage
                  ? "text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                  : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Resources
              <svg
                className="w-4 h-4 transition-transform group-hover:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <Link
                to="/portfolio"
                className={`block px-4 py-2 transition-colors ${
                  location.pathname === "/portfolio"
                    ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 font-medium"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                Portfolio
              </Link>
              <Link
                to="/slides"
                className={`block px-4 py-2 transition-colors ${
                  location.pathname === "/slides"
                    ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 font-medium"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                Slides
              </Link>
              <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
              <a
                href="https://kmavillanosa.github.io/kmavillanosa/cv/Kim_Cyriel_S._Avillanosa_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Download CV
              </a>
              <a
                href="http://88.222.245.88/resume/"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg transition-colors"
              >
                Download CV (OCR Friendly)
              </a>
            </div>
          </div>
          <ThemeToggle />
          <a
            href="/kmavillanosa/cms/admin/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-2 py-1 text-sm transition-colors rounded-lg ${
              isLandingPage
                ? "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            Admin
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            className={`p-2.5 rounded-lg transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center ${
              isLandingPage
                ? "text-gray-800 dark:text-gray-200 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 bg-white/50 dark:bg-gray-800/50"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay - rendered via portal to ensure it's above all content */}
        {isMenuOpen &&
          typeof document !== "undefined" &&
          createPortal(
            <>
              <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] md:hidden"
                onClick={() => setIsMenuOpen(false)}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              />
              <div
                className={`mobile-menu-sidebar fixed top-0 right-0 bottom-0 w-64 z-[9999] dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 md:hidden border-l border-stone-200 dark:border-gray-700 ${
                  isMenuOpen ? "translate-x-0" : "translate-x-full"
                }`}
                style={{ position: "fixed", top: 0, right: 0, bottom: 0 }}
              >
                <div className="flex flex-col h-full pt-20 px-4 overflow-y-auto">
                  <Link
                    to="/"
                    className={`px-4 py-3 text-lg font-medium transition-colors rounded-lg mb-2 ${
                      isLandingPage
                        ? "text-gray-800 dark:text-gray-200 bg-green-50 dark:bg-green-900/20"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <div className="mb-2">
                    <div className="px-4 py-3 text-lg font-medium text-gray-700 dark:text-gray-300">
                      Resources
                    </div>
                    <div className="pl-4 space-y-1">
                      <Link
                        to="/portfolio"
                        className="block px-4 py-2 text-base font-normal text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-lg"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Portfolio
                      </Link>
                      <Link
                        to="/slides"
                        className="block px-4 py-2 text-base font-normal text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-lg"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Slides
                      </Link>
                      <a
                        href="https://kmavillanosa.github.io/kmavillanosa/cv/Kim_Cyriel_S._Avillanosa_CV.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 text-base font-normal text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-lg"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Download CV
                      </a>
                      <a
                        href="http://88.222.245.88/resume/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 text-base font-normal text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-lg"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Download CV (OCR Friendly)
                      </a>
                    </div>
                  </div>
                  <a
                    href="/kmavillanosa/cms/admin/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 text-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-lg mb-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin
                  </a>
                </div>
              </div>
            </>,
            document.body
          )}
      </div>
    </nav>
  );
}

export default Header;
