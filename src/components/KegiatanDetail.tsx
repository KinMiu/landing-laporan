import React from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, MapPin } from 'lucide-react';
import { Event } from '../types';

interface KegiatanDetailProps {
  kegiatan: Event;
  onClose: () => void;
}

const KegiatanDetail: React.FC<KegiatanDetailProps> = ({ kegiatan, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-lg"
      >
        {/* Header */}
        <div className="relative h-60">
          <img src={kegiatan.foto} alt={kegiatan.nama} className="w-full h-full object-cover rounded-t-2xl" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition"
          >
            <X className="h-6 w-6 text-white" />
          </button>

          {/* Kategori Badge */}
          {kegiatan.jenis && (
            <div className="absolute top-4 left-4">
              <span className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold">
                {kegiatan.jenis}
              </span>
            </div>
          )}

          {/* Judul & Info Dasar */}
          <div className="absolute bottom-4 left-4">
            <h2 className="text-2xl font-bold text-white">{kegiatan.nama}</h2>
            <div className="flex flex-wrap gap-4 text-white/90 text-sm mt-2">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                {kegiatan.tanggal}
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                {kegiatan.lokasi}
              </div>
            </div>
          </div>
        </div>

        {/* Konten */}
        <div className="p-6">
          {/* Deskripsi */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Deskripsi</h3>
            <p className="text-gray-600">{kegiatan.deskripsi}</p>
          </div>

          {/* Overview (Jika Ada) */}
          {kegiatan.detailContent?.overview && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Overview</h3>
              <p className="text-gray-600">{kegiatan.detailContent.overview}</p>
            </div>
          )}

          {/* Sesi (Jika Ada) */}
          {kegiatan.detailContent?.sessions && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Sesi</h3>
              <ul className="space-y-2 text-gray-600">
                {kegiatan.detailContent.sessions.map((session, index) => (
                  <li key={index} className="flex items-center">
                    <div className="h-2 w-2 bg-blue-600 rounded-full mr-3" />
                    {session}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Equipment (Jika Ada) */}
          {kegiatan.detailContent?.equipment && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Peralatan</h3>
              <ul className="space-y-2 text-gray-600">
                {kegiatan.detailContent.equipment.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <div className="h-2 w-2 bg-blue-600 rounded-full mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Link Pendaftaran */}
          {kegiatan.link && (
            <div className="mt-6 text-center">
              <a
                href={kegiatan.link}
                className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Daftar Sekarang
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default KegiatanDetail;
