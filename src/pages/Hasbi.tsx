import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';
import {hasbi} from '../data/programData';
import { BookOpen, Users, Trophy, Heart, Search, GraduationCap, Book, Calendar, ChevronRight, ChevronDown, ChevronUp, User, MapPin, Phone } from 'lucide-react';
import KegiatanDetail from '../components/KegiatanDetail';
import { eventAPI } from '../services/api';
import { Event } from '../types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const programs = [
  {
    name: 'Nama Pemilik UMKM',
    description: 'Tubagus Habibi',
    icon: User,
  },
  {
    name: 'Alamat UMKM',
    description: 'Jl. Way Belerang,jl. Veteran Atas, Sumur Kumbang, Kec.Kalianda, kabupaten Lampung Selatan',
    icon: MapPin,
  },
  {
    name: 'Nomor Telepon',
    description: '0813-8771-5916',
    icon: Phone,
  },
  {
    name: 'Tahun Berdiri',
    description: '2020',
    icon: Calendar,
  },
];

const Hasbi = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKurikulum, setSelectedKurikulum] = useState('');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [expandedCourses, setExpandedCourses] = useState<Record<string, boolean>>({});
  const [showAllKegiatan, setShowAllKegiatan] = useState(false);
  const [selectedKegiatan, setSelectedKegiatan] = useState<Event | null>(null);
  const [kegiatan, setKegiatan] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const data = await eventAPI.getAll();
        setKegiatan(data);
        setError(null);
      } catch (err) {
        setError('Gagal memuat data kegiatan');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const displayedKegiatan = showAllKegiatan ? kegiatan : kegiatan.slice(0, 6);

  // Toggle expanded state for a specific curriculum
  const toggleCourseExpansion = (itemId: string) => {
    setExpandedCourses(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
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

  return (
    <div className="py-24 sm:py-32">
      {/* Programs Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-800">PROFIL UMKM</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Kerupuk Tahu Bagus Hasby
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Kerupuk Tahu Bagus Hasby adalah usaha mikro kecil menengah (UMKM) yang bergerak di bidang produksi kerupuk tahu dengan cita rasa yang khas dan berkualitas tinggi. Kami berkomitmen untuk memberikan produk terbaik kepada pelanggan kami.
          </p>
          <button
            onClick={() => window.open('https://visits.id/kerupuktahubagushasby', '_blank')}
            className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-white font-semibold shadow-sm hover:bg-blue-800 transition-colors">
            Website Kerupuk Tahu Hasby
          </button>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
            {programs.map((program) => (
              <motion.div
                key={program.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col rounded-xl bg-white p-8 shadow-lg hover:shadow-xl"
              >
                <dt className="flex items-center gap-x-3 text-lg font-semibold text-gray-900">
                  {program.icon && <program.icon className="h-6 w-6 flex-none text-blue-600" />}
                  {program.name}
                </dt>
                <dd className="mt-4 text-base text-gray-600 leading-relaxed">
                  {program.description}
                </dd>
              </motion.div>
            ))}
          </div>
        </div>
      </div>


      {/* Fasilitas Section with 3D Carousel */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Produk UMKM</h2>
            <p className="mt-4 text-lg text-gray-600">
              Produk yang Tersedia di UMKM Kerupuk Tahu Bagus Hasby
            </p>
          </div>

          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="w-full py-12"
          >
            {hasbi.map((item) => (
              <SwiperSlide
                key={item.id}
                className="w-[300px] sm:w-[350px] bg-white rounded-xl overflow-hidden shadow-lg"
              >
                <img
                  src={item.foto}
                  alt={item.nama}
                  className="w-full h-[250px] object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {item.nama}
                  </h3>
                  <p className="text-gray-600">{item.deskripsi}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Hasbi;