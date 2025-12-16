import React, {useState} from "react";
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import {Icon} from "leaflet";
import {Target, Award, ChevronDown, ChevronUp} from "lucide-react";
import {visiMisi, pimpinan, faqs} from "../data/aboutData";
import {motion} from "framer-motion";
import {Navigate, useNavigate} from "react-router-dom";
import {IMAGES} from "../assets";

const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
});

const About = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setIsMapLoaded(true);
      window.dispatchEvent(new Event("resize"));
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-28 mb-10">
        {/* Section Title and Description */}
        {/* Section Title and Description */}
        <div className="text-center">
          <h2 className="text-lg font-semibold text-blue-600 uppercase tracking-wide">
            Tentang Kami
          </h2>
          <p className="mt-2 text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Desa Buah Berak
          </p>
        </div>

        {/* About Us Section with Image */}
        {/* About Us Section with Image */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center md:items-start">
          {/* Text Section (Atas di Mobile, Kiri di Desktop) */}
          <motion.div
            initial={{opacity: 0, x: -20}}
            whileInView={{opacity: 1, x: 0}}
            viewport={{once: true}}
            className="text-lg text-gray-600 text-justify"
          >
            <p
              className={`transition-all duration-300 ${
                isExpanded
                  ? "block"
                  : "line-clamp-5 sm:line-clamp-3 md:line-clamp-4"
              }`}
            >
              Pada jaman dahulu Desa Buah berak terkenal dengan hasil pertanian
              Konon tanah di Desa Buah berak sangat subur, sehingga kehidupan
              masyarakat Desa pun bisa dikatakan makmur. Asal mula pemberian
              nama Desa ini bermula dari musyawarah yang dilakukan para tokoh
              adat, tokoh masyarakat dan tokoh agama. Dari musyawarah yang
              dilakukan tersebut diambil kesempatan bahwa Desa ini diberi nama
              Desa buah bekhak yang diambil dari nama Buah = "pinang", bekhak =
              "luas" (lapang), Dengan kata lain mempunyai makna "hamparan pohon
              pinang yang luas".
            </p>
            <p
              className={`transition-all duration-300 ${
                isExpanded
                  ? "block"
                  : "line-clamp-5 sm:line-clamp-3 md:line-clamp-4"
              }`}
            >
              Desa Buah Berak merupakan salah satu desa yang berada di wilayah
              Kecamatan Kalianda, Kabupaten Lampung Selatan , Provinsi Lampung.
              Desa ini berdiri sejak tahun 1952 dan telah mengalami berbagai
              perkembangan, baik dari segi infrastruktur maupun kehidupan sosial
              masyarakatnya. Kepala desa yang pertama adalah M.Tahir (Raden
              Panji) yang pada saat itu sistem nya langsung ditunjuk oleh
              masyarakat desa dan kepala desa yang sekarang yaitu Umar Sofriandi
              S.E. Penduduk desa dengan beragam suku merupakan penduduk lokal
              yang telah tinggal di sini selama beberapa generasi. Jumlah
              penduduknya terus berkembang, sebagian besar dari masyarakat
              bekerja di sektor pertanian dan perkebunan.
            </p>

            {/* Read More Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-3 text-blue-600 font-semibold"
            >
              {isExpanded ? "Tutup" : "Baca Selengkapnya"}
            </button>
          </motion.div>

          {/* Image Section (Di Bawah di Mobile, Sebelah Kanan di Desktop) */}
          <motion.div
            initial={{opacity: 0, x: 20}}
            whileInView={{opacity: 1, x: 0}}
            viewport={{once: true}}
            className="w-full h-full"
          >
            <img
              src={IMAGES.image15}
              alt="Program Studi Informatika"
              className="w-full h-auto object-cover mb-10"
            />
          </motion.div>
        </div>

        {/* Vision & Mission Section */}
        <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-2">
          {/* Vision */}
          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            className="relative bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center transition-transform duration-300 hover:scale-105"
          >
            <div className="bg-blue-600 p-3 rounded-full">
              <Target className="h-6 w-6 text-white" />
            </div>
            <h3 className="mt-4 text-2xl font-bold text-gray-900">Visi</h3>
            <p className="mt-4 text-lg text-gray-600 text-center">
              {visiMisi.visi}
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            className="relative bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center transition-transform duration-300 hover:scale-105"
          >
            <div className="bg-blue-600 p-3 rounded-full">
              <Award className="h-6 w-6 text-white" />
            </div>
            <h3 className="mt-4 text-2xl font-bold text-gray-900">Misi</h3>
            <ul className="mt-4 space-y-3 text-lg text-gray-600 list-disc list-inside">
              {visiMisi.misi.map((mission, index) => (
                <li key={index}>{mission}</li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Team Members */}
        <div className="mx-auto mt-20 max-w-7xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
            Struktur Pemerintahanan Desa Buah Berak
          </h2>
          <div className="mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {pimpinan.map((person, index) => (
              <motion.article
                key={person.id}
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{delay: index * 0.2}}
                className="flex flex-col items-center bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-2xl overflow-hidden border border-green-200"
              >
                <div className="relative w-full">
                  <img
                    src={person.foto}
                    alt={person.nama}
                    className="w-full h-[475px] object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <span className="text-gray-500 text-sm">
                    {person.jabatan}
                  </span>
                  <h3 className="mt-2 text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                    {person.nama}
                  </h3>
                  <p className="mt-3 text-sm text-gray-600">
                    {person.pendidikan}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.8, delay: 0.2}}
          className="flex flex-wrap justify-center gap-4 mt-8"
        >
          <button
            onClick={() => navigate("/aparatur")}
            className="rounded-md bg-blue-900 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
          >
            Lihat Aparatur Desa
          </button>
        </motion.div>

        {/* Location Map */}
        <div className="mt-20 relative">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Lokasi Desa
          </h2>
          <motion.div
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: true}}
            className="h-[400px] rounded-xl overflow-hidden shadow-lg relative"
          >
            {isMapLoaded && (
              <div className="h-full w-full relative">
                <div
                  id="map-overlay"
                  className="absolute inset-0 bg-transparent z-10"
                  onClick={() => {
                    document.getElementById(
                      "map-container"
                    ).style.pointerEvents = "auto";
                    document.getElementById("map-overlay").style.display =
                      "none";
                  }}
                />
                <MapContainer
                  id="map-container"
                  center={[-5.7393389567056285, 105.60051927440357]}
                  zoom={15}
                  className="h-full w-full z-0 pointer-events-none"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="Balai Desa Buah Berak-Desa Buah Berak"
                  />
                  <Marker
                    position={[-5.7393389567056285, 105.60051927440357]}
                    icon={customIcon}
                  >
                    <Popup>
                      <b>Desa Buah Berak</b>
                      <br />
                      Balai Desa Buah Berak
                      <br />
                      <br />
                      <a
                        href="https://maps.app.goo.gl/mtdp5h8rHovFmLBT7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Buka di Google Maps
                      </a>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            )}
          </motion.div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl text-center">
            Daftar Layanan Tersedia
          </h2>
          <div className="mt-8 space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{delay: index * 0.1}}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 transition duration-300"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  <span className="text-lg items-between font-medium flex-1 text-left text-gray-900">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
                <ul className="mt-4 space-y-3 text-lg text-gray-600 list-disc list-inside">
                  {openIndex === index && (
                    <div>
                      {faq.keterangan === "-" ? null : (
                        <p className="px-4 text-gray-600 bg-white">
                          {faq.keterangan}
                        </p>
                      )}
                      {faq.answer.map((line, idx) => (
                        <li key={idx} className="px-4 text-gray-600 bg-white">
                          {line.trim()}
                        </li>
                      ))}
                    </div>
                  )}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
