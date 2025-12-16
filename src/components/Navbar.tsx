import React, {useState, useEffect, useRef} from "react";
import {Link, useLocation} from "react-router-dom";
import {Menu, X, ChevronDown} from "lucide-react";
import {IMAGES} from "../assets";

const navigation = [
  // {name: "Beranda", href: "/"},
  // {name: "Profil Desa", href: "/tentang"},
  // {name: "Aparatur Desa", href: "/aparatur"},
  // {name: "Wisata", href: "/wisata"},
  // {
  //   name: "UMKM",
  //   submenu: [
  //     {name: "Kerupuk Tahu Bagus Hasbi", href: "Hasbi"},
  //     {name: "Emping Semoga Jaya", href: "/Emping"},
  //     {name: "Batu Ulekan Masdi", href: "/Ulekan"},
  //     {name: "Anyaman Lidi", href: "/anyaman"},
  //     {name: "Kulit Lumpia Erlangga", href: "/Lumpia"},
  //   ],
  // },
  // {
  //   name: "Sertifikasi",
  //   submenu: [
  //     { name: "HKI", href: "/hki" },
  //     { name: "Paten", href: "/paten" },
  //     { name: "Desain Industri", href: "/desainindustri" },
  //   ],
  // },
  // {name: "Kegiatan", href: "/activity"},
  {name: "Pelaporan", href: "/"},
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState("");
  const [mobileDropdowns, setMobileDropdowns] = useState({});
  const location = useLocation();
  const dropdownRef = useRef<{[key: string]: HTMLDivElement | null}>({});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedElement = event.target as Node;
      Object.entries(dropdownRef.current).forEach(([key, ref]) => {
        if (ref && !ref.contains(clickedElement)) {
          setActiveDropdown((prev) => (prev === key ? "" : prev));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown("");
    setMobileDropdowns({});
  }, [location.pathname]);

  const handleDropdownClick = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? "" : itemName);
  };

  const handleMobileDropdownClick = (itemName: string) => {
    setMobileDropdowns((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  const isProgramActive = (item: any) => {
    if (item.href) {
      return location.pathname === item.href;
    }
    return item.submenu?.some((sub: any) => sub.href === location.pathname);
  };

  return (
    <nav className="fixed w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 space-x-2">
            <img
              src={IMAGES.image15}
              alt="Logo Desa Buah Berak"
              className="h-10 w-auto"
            />
            <Link
              to="/"
              className="text-xl font-bold text-blue-800 whitespace-nowrap"
            >
              Desa Buah Berak
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 ml-auto">
            {navigation.map((item) =>
              item.submenu ? (
                <div
                  key={item.name}
                  ref={(el) => (dropdownRef.current[item.name] = el)}
                  className="relative"
                >
                  <button
                    onClick={() => handleDropdownClick(item.name)}
                    className={`text-sm font-semibold flex items-center transition duration-300 ${
                      isProgramActive(item) || activeDropdown === item.name
                        ? "text-blue-800"
                        : "text-gray-900 hover:text-blue-800"
                    }`}
                  >
                    {item.name}
                    <ChevronDown
                      size={16}
                      className={`ml-1 transition-transform ${
                        activeDropdown === item.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {activeDropdown === item.name && (
                    <div className="absolute left-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-1 z-10">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.href}
                          className={`block px-4 py-2 text-sm ${
                            location.pathname === sub.href
                              ? "text-blue-800 bg-blue-50 font-semibold"
                              : "text-gray-900 hover:bg-gray-100"
                          }`}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-semibold ${
                    location.pathname === item.href
                      ? "text-blue-800"
                      : "text-gray-900 hover:text-blue-800"
                  }`}
                >
                  {item.name}
                </Link>
              )
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-800"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Items */}
        {isOpen && (
          <div className="md:hidden px-4 pt-2 pb-4 space-y-1 transition-all">
            {navigation.map((item) =>
              item.submenu ? (
                <div key={item.name}>
                  <button
                    onClick={() => handleMobileDropdownClick(item.name)}
                    className="flex w-full justify-between items-center text-base font-medium text-gray-900"
                  >
                    {item.name}
                    <ChevronDown
                      className={`transition-transform ${
                        mobileDropdowns[item.name] ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {mobileDropdowns[item.name] && (
                    <div className="pl-4 mt-1 space-y-1">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.href}
                          className="block text-sm text-gray-700 hover:text-blue-800"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block text-base font-medium text-gray-900 hover:text-blue-800"
                >
                  {item.name}
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
