import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { useSiteSettings } from "@/hooks/useSiteSettings";

function Header() {
  const location = useLocation();
  const { data: siteSettings } = useSiteSettings();
  const isLandingPage = location.pathname === "/";
  const isResourcesPage =
    location.pathname === "/portfolio" || location.pathname === "/slides";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const resumeUrl = siteSettings?.resumeUrl || "https://kmavillanosa.github.io/kmavillanosa/cv/Kim_Cyriel_S._Avillanosa_CV.pdf";

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
    <>
    <header className="fixed top-0 left-0 right-0 z-50 bg-ivory-50 dark:bg-gray-900 border-b border-stone-200 dark:border-gray-700">
      <nav className="px-4 py-2.5 md:py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          {isLandingPage ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsMenuOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-2 z-10 cursor-pointer rounded-md hover:opacity-90 transition-opacity min-h-[44px]"
              aria-label="Scroll to top"
            >
              <img
                src="/kmavillanosa/cms/media/logo.png"
                alt="Kim Avillanosa"
                className="h-9 md:h-10 w-auto object-contain"
                style={{ maxHeight: "40px" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <span className="hidden sm:inline text-sm font-semibold text-stone-800 dark:text-gray-200 tracking-tight">
                Kim Avillanosa
              </span>
            </button>
          ) : (
            <Link
              to="/"
              className="flex items-center gap-2 z-10 rounded-md hover:opacity-90 transition-opacity min-h-[44px]"
              onClick={() => {
                setIsMenuOpen(false);
                setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
              }}
            >
              <img
                src="/kmavillanosa/cms/media/logo.png"
                alt="Kim Avillanosa"
                className="h-9 md:h-10 w-auto object-contain"
                style={{ maxHeight: "40px" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <span className="hidden sm:inline text-sm font-semibold text-stone-800 dark:text-gray-200 tracking-tight">
                Kim Avillanosa
              </span>
            </Link>
          )}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className="px-3 py-2 text-sm font-medium text-stone-600 dark:text-gray-400 hover:text-stone-900 dark:hover:text-white rounded-md transition-colors"
            >
              Home
            </Link>
            <div className="relative group">
              <button
                className={`px-3 py-2 text-sm font-medium rounded-md flex items-center gap-1 transition-colors ${
                  isResourcesPage
                    ? "text-green-600 dark:text-green-400"
                    : "text-stone-600 dark:text-gray-400 hover:text-stone-900 dark:hover:text-white"
                }`}
                aria-expanded="false"
                aria-haspopup="true"
              >
                Resources
                <svg className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-0.5 w-44 bg-white dark:bg-gray-800 rounded-lg border border-stone-200 dark:border-gray-700 shadow-sm py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-150 z-50">
                <Link
                  to="/portfolio"
                  className={`block px-3 py-2 text-sm transition-colors first:rounded-t-lg ${
                    location.pathname === "/portfolio"
                      ? "bg-ivory-100 dark:bg-gray-700 text-green-600 dark:text-green-400 font-medium"
                      : "text-stone-700 dark:text-gray-300 hover:bg-ivory-100 dark:hover:bg-gray-700"
                  }`}
                >
                  Portfolio
                </Link>
                <Link
                  to="/slides"
                  className={`block px-3 py-2 text-sm transition-colors ${
                    location.pathname === "/slides"
                      ? "bg-ivory-100 dark:bg-gray-700 text-green-600 dark:text-green-400 font-medium"
                      : "text-stone-700 dark:text-gray-300 hover:bg-ivory-100 dark:hover:bg-gray-700"
                  }`}
                >
                  Slides
                </Link>
                <div className="border-t border-stone-200 dark:border-gray-700 my-1" />
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 text-sm text-stone-700 dark:text-gray-300 hover:bg-ivory-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Download CV
                </a>
                <a
                  href="http://88.222.245.88/resume/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 text-sm text-stone-700 dark:text-gray-300 hover:bg-ivory-100 dark:hover:bg-gray-700 rounded-b-lg transition-colors"
                >
                  CV (OCR)
                </a>
              </div>
            </div>
            <Link
              to="/contact"
              className="px-3 py-2 text-sm font-medium text-stone-600 dark:text-gray-400 hover:text-stone-900 dark:hover:text-white rounded-md transition-colors"
            >
              Contact
            </Link>
            <ThemeToggle />
            <a
              href="/kmavillanosa/cms/admin/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-1.5 text-xs text-stone-500 dark:text-gray-500 hover:text-stone-700 dark:hover:text-gray-300 rounded-md transition-colors"
            >
              Admin
            </a>
          </div>

        {/* Mobile: menu button + theme */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            className="p-2.5 rounded-md text-stone-700 dark:text-gray-300 hover:bg-stone-100 dark:hover:bg-gray-800 transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
    </header>

    {/* Mobile menu overlay + sidebar (portal) */}
    {isMenuOpen && typeof document !== "undefined" && createPortal(
      <>
        <div
          className="fixed inset-0 bg-black/40 z-[9998] md:hidden"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
        <div
          className="fixed top-0 right-0 bottom-0 w-56 z-[9999] md:hidden bg-ivory-50 dark:bg-gray-900 border-l border-stone-200 dark:border-gray-700 shadow-xl transition-transform duration-200 translate-x-0"
          role="dialog"
          aria-label="Menu"
        >
          <div className="flex flex-col h-full pt-16 px-3 pb-6 overflow-y-auto">
            <Link
              to="/"
              className="px-3 py-2.5 text-sm font-medium text-stone-800 dark:text-gray-200 hover:bg-stone-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <div className="mt-1 pt-2 border-t border-stone-200 dark:border-gray-700">
              <div className="px-3 py-1.5 text-xs font-semibold text-stone-500 dark:text-gray-500 uppercase tracking-wider">
                Resources
              </div>
              <Link
                to="/portfolio"
                className="block px-3 py-2 text-sm text-stone-700 dark:text-gray-300 hover:bg-stone-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Portfolio
              </Link>
              <Link
                to="/slides"
                className="block px-3 py-2 text-sm text-stone-700 dark:text-gray-300 hover:bg-stone-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Slides
              </Link>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 text-sm text-stone-700 dark:text-gray-300 hover:bg-stone-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Download CV
              </a>
              <a
                href="http://88.222.245.88/resume/"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 text-sm text-stone-700 dark:text-gray-300 hover:bg-stone-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                CV (OCR)
              </a>
            </div>
            <Link
              to="/contact"
              className="mt-2 px-3 py-2.5 text-sm font-medium text-stone-800 dark:text-gray-200 hover:bg-stone-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <a
              href="/kmavillanosa/cms/admin/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto pt-4 px-3 py-2 text-xs text-stone-500 dark:text-gray-500 hover:text-stone-700 dark:hover:text-gray-300 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
            </a>
          </div>
        </div>
      </>,
      document.body
    )}
    </>
  );
}

export default Header;
