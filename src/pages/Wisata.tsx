import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';
import {wisata} from '../data/programData';
import { BookOpen, Users, Trophy, Heart, Search, GraduationCap, Book, Calendar, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import KegiatanDetail from '../components/KegiatanDetail';
import { eventAPI } from '../services/api';
import { Event } from '../types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { FaChair, FaSwimmingPool, FaToilet, FaUtensils } from 'react-icons/fa';

<div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-800">Wisata</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Way Belerang
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Way Belerang adalah sebuah destinasi wisata alam yang terletak di Desa Buah Berak, Kalianda, Lampung Selatan. Dikenal dengan keindahan alamnya, Way Belerang menawarkan pengalaman wisata yang tak terlupakan bagi para pengunjung. Way Belerang Kalianda berasal dari mata air panas alami di kaki Gunung Rajabasa yang mengandung belerang dan telah dimanfaatkan warga sejak lama untuk pengobatan tradisional. Awalnya berupa aliran alami, pada 1980–1990-an dibuat kolam dan fasilitas pendukung hingga berkembang menjadi objek wisata populer di Lampung Selatan.
          </p>
        </div>

const programs = [
  {
    name: 'Toilet',
    description: 'Tempat bilas yang bersih dan nyaman untuk pengunjung',
    icon: FaToilet,
  },
  {
    name: 'Tempat Duduk',
    description: 'Area istirahat yang teduh dengan tempat duduk yang nyaman',
    icon: FaChair,
  },
  {
    name: 'Kolam Anak',
    description: 'kolam renang yang aman dan menyenangkan untuk anak-anak',
    icon: FaSwimmingPool,
  },
  {
    name: 'Tempat Makan',
    description: 'Tempat makan yang menyediakan berbagai makanan dan minuman',
    icon: FaUtensils,
  },
];

const Wisata = () => {
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
          <h2 className="text-base font-semibold leading-7 text-blue-800">Wisata</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Way Belerang
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Way Belerang adalah sebuah destinasi wisata alam yang terletak di Desa Buah Berak, Kalianda, Lampung Selatan. Dikenal dengan keindahan alamnya, Way Belerang menawarkan pengalaman wisata yang tak terlupakan bagi para pengunjung. Way Belerang Kalianda berasal dari mata air panas alami di kaki Gunung Rajabasa yang mengandung belerang dan telah dimanfaatkan warga sejak lama untuk pengobatan tradisional. Awalnya berupa aliran alami, pada 1980–1990-an dibuat kolam dan fasilitas pendukung hingga berkembang menjadi objek wisata populer di Lampung Selatan.
          </p>
        </div>

        <div className="text-center mb-12">
            <h2 className="mt-20 text-3xl font-bold text-gray-900">Fasilitas Wisata</h2>
            <p className="mt-4 text-lg text-gray-600">
              Fasilitas yang tersedia di wisata Way Belerang
            </p>
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
            {wisata.map((item) => (
              <SwiperSlide
                key={item.id}
                className="w-[300px] sm:w-[450px] bg-white rounded-xl overflow-hidden shadow-lg"
              >
                <img
                  src={item.foto}
                  alt={item.nama}
                  className="w-full h-[350px] object-cover"
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

export default Wisata;