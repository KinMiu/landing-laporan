import React from "react";
import { FaRobot, FaBrain, FaGlobe, FaCode, FaClinicMedical, FaTractor, FaRoad, FaRecycle } from "react-icons/fa";

const programs = [
  {
    id: 1,
    title: "Peningkatan Jalan Produksi dan Usaha Tani",
    description:
      "Pembangunan dan perbaikan jalan untuk mendukung kelancaran produksi hasil pertanian.",
    icon: <FaTractor/>,
  },
  {
    id: 2,
    title: "Pembangunan Sarana Prasarana Jalan",
    description:
      "Penyediaan fasilitas jalan yang memadai untuk menunjang aktivitas masyarakat.",
    icon: <FaRoad />,
  },
  {
    id: 3,
    title: "Pengelolaan Sampah",
    description:
      "Program pengumpulan, pemilahan, dan pengolahan sampah untuk menjaga kebersihan lingkungan.",
    icon: <FaRecycle />,
  },
  {
    id: 4,
    title: "Posyandu",
    description:
      "Pelayanan kesehatan ibu dan anak secara rutin bagi masyarakat sekitar.",
    icon: <FaClinicMedical />,
  },
];

const Programs = () => {
  return (
    <div className="mt-1 max-w-6xl mx-auto px-6">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
        Program Desa
      </h2>
      <p className="text-center text-gray-600 mb-8 max-w-xl mx-auto leading-relaxed">
        Program yang Berfokus Pada Pemberdayaan Masyarakat.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6">
        {programs.map((program) => (
          <div
            key={program.id}
            className="flex flex-col p-6 bg-white rounded-xl shadow-md hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="text-blue-600 text-3xl">{program.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900">
                {program.title}
              </h3>
            </div>
            <p className="mt-3 text-gray-600 text-sm leading-relaxed">
              {program.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Programs;
