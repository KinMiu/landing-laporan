import React, {useState, useEffect, useRef} from "react";
import {motion} from "framer-motion";
import {activityAPI} from "../services/api";
import {Activity} from "../types";
import {Swiper, SwiperSlide} from "swiper/react";
import {Calendar, ChevronRight, MapPin} from "lucide-react";
import {usePublicCampusData} from "../contexts/PublicCampusDataContext";
import KegiatanDetail from "../components/KegiatanDetail";
import {Autoplay} from "swiper/modules";

const ActivityPage = () => {
  const [activity, setActivity] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [expandedItems, setExpandedItems] = useState<{[key: string]: boolean}>(
    {}
  );
  const {events} = usePublicCampusData();
  const [selectedKegiatan, setSelectedKegiatan] = React.useState(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);

  // Tentukan berapa item per halaman berdasarkan ukuran layar
  const itemsPerPage = {
    mobile: 10,
    tablet: 10,
    desktop: 10,
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
        const data = await activityAPI.getAll();
        console.log(data);
        setActivity(data);
        setError(null);
      } catch (err) {
        setError("Gagal memuat data prestasi");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Memperbarui ukuran layar saat window diresize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Menghitung jumlah item yang ditampilkan per halaman berdasarkan ukuran layar
  const itemsToShow =
    windowWidth < 640
      ? itemsPerPage.mobile
      : windowWidth < 1024
      ? itemsPerPage.tablet
      : itemsPerPage.desktop;

  // Urutkan data berdasarkan tahun terbaru
  const sortedPrestasi = activity.sort(
    (a, b) => new Date(b.tahun) - new Date(a.tahun)
  );

  // Menentukan start dan end index untuk item yang akan ditampilkan
  const indexOfLastItem = currentPage * itemsToShow;
  const indexOfFirstItem = indexOfLastItem - itemsToShow;
  const currentItems = sortedPrestasi.slice(indexOfFirstItem, indexOfLastItem);

  // Menghitung total halaman
  const totalPages = Math.ceil(sortedPrestasi.length / itemsToShow);

  // Fungsi untuk menangani perubahan halaman
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Fungsi untuk toggle deskripsi
  const toggleDescription = (id: string) => {
    setExpandedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }
  const latestEvents = events
    .sort(
      (a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime()
    )
    .slice(0, 6);

  return (
    <div className="pt-16 bg-gray-50 min-h-screen">
      <div className="py-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
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
      {selectedKegiatan && (
        <KegiatanDetail
          kegiatan={selectedKegiatan}
          onClose={() => setSelectedKegiatan(null)}
        />
      )}
    </div>
  );
};

export default ActivityPage;
