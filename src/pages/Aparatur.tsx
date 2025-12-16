import React, {useState, useEffect} from "react";
import {aparaturDesaAPI} from "../services/api";
import {aparaturDesa} from "../types";
import AparaturDetail from "../components/AparaturDetail";
import {Mail, BookOpen, GraduationCap} from "lucide-react";
import {IMAGES} from "../assets";

const Aparatur: React.FC = () => {
  const [desa, setDesa] = useState<aparaturDesa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [selectedAparat, setSelectedAparat] = useState<aparaturDesa | null>(
    null
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const data = await aparaturDesaAPI.getAll();
        setDesa(data);
        setError(null);
      } catch (err) {
        setError("Gagal memuat data aparat");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter berdasarkan pencarian dan bidang
  const filteredDesa = desa.filter((f) => {
    const matchesSearch =
      searchTerm === "" ||
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.nidn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesField =
      selectedField === "" || f.fields.includes(selectedField);

    return matchesSearch && matchesField;
  });

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
    <div className="bg-gray-50 min-h-screen pt-16 pb-16 ">
      {/* Header Besar */}
      <div className="text-center pt-12 pb-6 mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          Aparatur Desa Buah Berak
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Tenaga yang Menjalankan Tugas Pemerintahan dan Pelayanan di Tingkat
          Desa.
        </p>
      </div>

      {/* List Aparat */}
      <div className="max-w-7xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-2 justify-items-center">
        {filteredDesa.map((Aparat) => {
          return (
            <div
              key={Aparat._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-70 w-80"
            >
              {/* Foto dan Nama di atas dengan gradient */}
              <div className="relative w-auto aspect-[4/4] overflow-hidden">
                <img
                  src={Aparat.foto}
                  alt={Aparat.name}
                  className="w-[320px] object-cover object-top"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>

                <div className="absolute bottom-4 left-4 font-bold text-2xl text-white drop-shadow">
                  {Aparat.name}
                </div>
              </div>
              {/* Konten Utama */}
              <div className="p-6 flex flex-col gap-2 flex-1">
                <div className="flex items-center gap-2 text-gray-700 text-sm">
                  <p className="text-sm font-medium text-gray-500">
                    Jabatan :{" "}
                  </p>
                  {Aparat.fields && Aparat.fields.length > 0
                    ? Aparat.fields.join(", ")
                    : "-"}
                </div>
                <button
                  className="mt-4 w-full bg-blue-700 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
                  onClick={() => setSelectedAparat(Aparat)}
                >
                  Lihat Detail
                </button>
              </div>
            </div>
          );
        })}
        {filteredDesa.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">
            Tidak ada data aparatur desa.
          </p>
        )}
      </div>

      {/* Aparat Detail Modal */}
      {selectedAparat && (
        <AparaturDetail
          aparat={selectedAparat}
          onClose={() => setSelectedAparat(null)}
        />
      )}
    </div>
  );
};

export default Aparatur;
