import React from "react";
import {Link} from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import {MdEmail} from "react-icons/md";
import {FaWhatsapp} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Desa Buah Berak</h3>
            <p className="text-gray-400 mb-4">
              Desa Buah Berak adalah sebuah desa yang terletak di Kalianda,
              Lampung Selatan. Desa ini dikenal dengan keindahan alamnya dan
              potensi sumber daya alam yang melimpah. Masyarakat desa ini sangat
              ramah dan selalu siap menyambut pengunjung dengan hangat.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/share/1GWYCyWL6T/"
                className="text-gray-400 hover:text-white"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/munggukgacor_?igsh=dW9hYXk4cW9semEx"
                className="text-gray-400 hover:text-white"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://wa.me/qr/O4IAPRULLQYDC1"
                className="text-gray-400 hover:text-white"
              >
                <FaWhatsapp size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/tentang" className="text-gray-400 hover:text-white">
                  Profil Desa
                </Link>
              </li>
              <li>
                <Link to="/aparatur" className="text-gray-400 hover:text-white">
                  Aparatur Desa
                </Link>
              </li>
              <li>
                <Link to="/wisata" className="text-gray-400 hover:text-white">
                  Wisata
                </Link>
              </li>
              <li>
                <Link to="/prestasi" className="text-gray-400 hover:text-white">
                  Kegiatan
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-xl font-bold mb-4">Program</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                Peningkatan Jalan Produksi dan Usaha Tani
              </li>
              <li className="text-gray-400">
                Pembangunan Sarana Prasarana Jalan
              </li>
              <li className="text-gray-400">Pengelolaan Sampah</li>
              <li className="text-gray-400">Posyandu</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <MapPin size={50} className="mr-2" />
                Jl. Titik Veteran Atas Penengahan Pios, Desa Buah Berak, Kec.
                Kalianda, Kab. Lampung Selatan.
              </li>
              <li className="flex items-center text-gray-400">
                <Phone size={20} className="mr-2" />
                +62 896 3341 4351
              </li>
              <li className="flex items-center text-gray-400">
                <Mail size={20} className="mr-2" />
                buahberakpemdes@@gmail.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} By -. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
