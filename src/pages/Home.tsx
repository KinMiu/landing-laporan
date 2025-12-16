import React from "react";
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {Icon} from "leaflet";
import {statistics} from "../data/homeData";
import Hero from "../components/Hero";
import Statistics from "../components/home/Statistics";
import Programs from "../components/home/Programs";
import {useNavigate} from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay} from "swiper/modules";
import {Calendar, MapPin, ChevronRight} from "lucide-react";
import {usePublicCampusData} from "../contexts/PublicCampusDataContext";
import "swiper/css";
import "swiper/css/pagination";

// Custom Icon for Marker
const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
});

const Home = () => {
  window.scrollTo(0, 0);
  const navigate = useNavigate();
  const {events} = usePublicCampusData();
  const [selectedKegiatan, setSelectedKegiatan] = React.useState(null);

  React.useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 500);
  }, []);

  // Get latest 6 events
  const latestEvents = events
    .sort(
      (a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime()
    )
    .slice(0, 6);

  return (
    <div className="relative isolate overflow-hidden bg-white">
      {/* Hero Section */}
      <Hero />

      {/* Statistics */}
      <Statistics statistics={statistics} />

      {/* Section Peta dan Deskripsi */}
      <div className="flex flex-col md:flex-row items-center gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:mt-10 mb-10">
        {/* Bagian Teks */}
        <div className="md:w-1/2 w-full text-center md:text-left">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Sekilas Tentang Desa Buah Berak
          </h2>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed text-justify">
            Desa Buah Berak merupakan salah satu desa yang berada di wilayah
            Kecamatan Kalianda, Kabupaten Lampung Selatan , Provinsi Lampung.
            Desa ini berdiri sejak tahun 1952 dan telah mengalami berbagai
            perkembangan, baik dari segi infrastruktur maupun kehidupan sosial
            masyarakatnya.
          </p>
          <button
            onClick={() => navigate("/tentang")}
            className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-white font-semibold shadow-sm hover:bg-blue-800 transition-colors"
          >
            Pelajari Selengkapnya
          </button>
        </div>

        {/* Bagian Peta */}
        <div className="md:w-1/2 w-full">
          <MapContainer
            center={[-5.7393443, 105.6030942]}
            zoom={15}
            className="h-[350px] w-full rounded-lg shadow-lg z-0"
            style={{minHeight: "350px", overflow: "hidden"}}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="Balai Desa Buah Berak - Buah Berak"
            />
            <Marker position={[-5.7393443, 105.6030942]} icon={customIcon}>
              <Popup>
                <b>Desa Buah Berak</b>
                <br />
                Balai Desa Buah Berak
                <br />
                <a
                  href="https://maps.app.goo.gl/ZhVMqeYw1BpoYbVN9"
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
      </div>

      {/* Programs */}
      <Programs />

      {/* Latest Activities Section */}
      <div className="py-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4 mt-8">
              Kegiatan Terbaru
            </span>
            <h2 className="text-3xl font-bold text-gray-900">Aktivitas Desa</h2>
            <p className="mt-4 text-lg text-gray-600">
              Berbagai kegiatan terbaru yang dilaksanakan di Desa Buah Berak
            </p>
          </div>

          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{delay: 3000, disableOnInteraction: false}}
            loop={true} // This makes the slider loop
            breakpoints={{
              640: {slidesPerView: 2},
              1024: {slidesPerView: 3},
            }}
            className="pb-12"
          >
            {latestEvents.map((event) => (
              <SwiperSlide key={event._id}>
                <div
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer group"
                  onClick={() => setSelectedKegiatan(event)}
                >
                  <div className="relative">
                    <img
                      src={event.foto}
                      alt={event.nama}
                      className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                        {event.jenis || "Workshop"}
                      </span>
                    </div>
                    {/* Add "New" label */}
                    <div className="absolute top-4 right-4 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      New
                    </div>
                  </div>
                  <div className="p-4 h-full flex flex-col justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {event.nama}
                    </h3>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <Calendar className="h-4 w-4 mr-2" />
                      {event.tanggal}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.lokasi}
                    </div>
                    <div className="mt-4 flex justify-end text-blue-600">
                      Lihat Selengkapnya
                      <ChevronRight className="text-blue-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Home;
