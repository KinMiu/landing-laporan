import React, {useState} from "react";
import {
  X,
  Mail,
  GraduationCap,
  Phone,
  MapPin,
  Briefcase,
  Hash,
} from "lucide-react";
import {motion, AnimatePresence} from "framer-motion";
import {aparaturDesa} from "../types";
import {FaAddressCard} from "react-icons/fa";
import {IMAGES} from "../assets";

interface AparaturDetailProps {
  aparat: aparaturDesa;
  onClose: () => void;
}

type TabType = "publikasi" | "hki" | "pengabdian";

interface ImageViewerProps {
  src: string;
  alt: string;
  onClose: () => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({src, alt, onClose}) => (
  <div
    className="fixed inset-0 bg-black/90 flex items-center justify-center z-[10000] p-4"
    onClick={onClose}
  >
    <button onClick={onClose} className="absolute top-4 right-4 text-white">
      <X className="h-6 w-6" />
    </button>
    <img
      src={src}
      alt={alt}
      className="max-h-[90vh] max-w-[90vw] object-contain"
      onClick={(e) => e.stopPropagation()}
    />
  </div>
);

const AparaturDetail = ({aparat, onClose}: AparaturDetailProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("publikasi");
  const [expandedDescriptions, setExpandedDescriptions] = useState<
    Record<string, boolean>
  >({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAllPhotos, setShowAllPhotos] = useState<Record<string, boolean>>(
    {}
  );
  const lastEdu =
    aparat.education && aparat.education.length > 0
      ? aparat.education[aparat.education.length - 1]
      : null;

  const TabButton = ({
    tab,
    label,
    icon: Icon,
  }: {
    tab: TabType;
    label: string;
    icon: React.ElementType;
  }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg transition-all ${
        activeTab === tab
          ? "bg-blue-600 text-white shadow-lg transform scale-105"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const toggleDescription = (id: string) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleShowAllPhotos = (id: string) => {
    setShowAllPhotos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center mt-16 p-4 z-[9999]">
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        exit={{opacity: 0, y: 20}}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-lg"
      >
        {/* Header Modal */}
        <div className="sticky top-0 z-10 bg-white border-b px-6 py-4 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-2xl font-semibold text-gray-900">
            Profil Aparatur
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Profil Atas */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 mb-8">
            <div className="flex flex-col md:flex-row gap-6 mb-8 items-center md:items-start text-white">
              <img
                src={aparat.foto || IMAGES.image19}
                alt={aparat.name}
                className="w-30 md:w-40 rounded-2xl shadow-lg border-2 border-white/20 cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setSelectedImage(aparat.foto || IMAGES.image19)}
              />
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-2xl md:text-3xl font-bold">
                    {aparat.name}
                  </h3>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-sm font-medium">
                    Status : AKTIF
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Hash className="h-4 w-4 opacity-80" />
                  <span className="font-medium">NIK: {aparat.nidn}</span>
                </div>
                {lastEdu && (
                  <div className="flex items-center gap-2 text-sm">
                    <GraduationCap className="h-4 w-4 opacity-80" />
                    <span>{lastEdu.degree}</span>
                  </div>
                )}
                {aparat.fields && aparat.fields.length > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <Briefcase className="h-4 w-4 opacity-80" />
                    <span>{aparat.fields.join(", ")}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Kontak */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <Mail className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-900">{aparat.email}</p>
              </div>
            </div>
            {aparat.phone && (
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <Phone className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Telepon</p>
                  <p className="text-gray-900">{aparat.phone}</p>
                </div>
              </div>
            )}
            {aparat.address && (
              <div className="md:col-span-2 flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <MapPin className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Alamat</p>
                  <p className="text-gray-900">{aparat.address}</p>
                </div>
              </div>
            )}
          </div>

          {/* Riwayat Pendidikan */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-blue-600" />
              Jenjang Pendidikan
            </h4>
            <div className="space-y-3">
              {aparat.education && aparat.education.length > 0 ? (
                aparat.education.map((edu, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-3"
                  >
                    <GraduationCap className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-800">{edu.degree}</span>
                  </div>
                ))
              ) : (
                <div className="text-gray-500">Tidak ada data pendidikan</div>
              )}
            </div>
          </div>

          {/* Mata Kuliah */}
          {aparat.courses && aparat.courses.length > 0 && (
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FaAddressCard className="h-5 w-5 text-blue-600" />
                Alamat
              </h4>
              <div className="space-y-3">
                {aparat.courses.map((course, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-3"
                  >
                    <FaAddressCard className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-800">{course}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Image Viewer Modal */}
      <AnimatePresence>
        {selectedImage && (
          <ImageViewer
            src={selectedImage}
            alt="Preview"
            onClose={() => setSelectedImage(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AparaturDetail;
