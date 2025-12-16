import React, {useState, useRef} from "react";
import {motion} from "framer-motion";
import {reportAPI} from "../services/api";

const Pelaporan = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dusun: "",
    rt: "",
    title: "",
    description: "",
    category: "Lainnya",
  });

  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Kamera
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // ------------------------------------
  // Reverse Geocode
  // ------------------------------------
  const reverseGeocode = async (lat: number, lon: number) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

    try {
      const res = await fetch(url, {
        headers: {"User-Agent": "DesaPelaporApp/1.0"},
      });
      if (!res.ok) return null;
      return res.json();
    } catch {
      return null;
    }
  };

  // ------------------------------------
  // Buka Kamera (Popup)
  // ------------------------------------
  const openCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {facingMode: "environment"},
      });

      setStream(mediaStream);
      dialogRef.current?.showModal();

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }
    } catch (err) {
      alert("Kamera tidak bisa diakses");
    }
  };

  // ------------------------------------
  // Tutup Kamera
  // ------------------------------------
  const closeCamera = () => {
    dialogRef.current?.close();

    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
    }
  };

  // ------------------------------------
  // Ambil Foto
  // ------------------------------------
  const capturePhoto = () => {
    if (!canvasRef.current || !videoRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (ctx) ctx.drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], "photo.jpg", {type: "image/jpeg"});
        setImage(file);
        closeCamera();
      }
    });
  };

  // ------------------------------------
  // Submit Form
  // ------------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    let latitude: number | null = null;
    let longitude: number | null = null;
    let address = "";

    try {
      console.log("Requesting geolocation...");

      const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error("Geolocation not supported"));
          return;
        }

        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000, // ⬅️ PENTING
          maximumAge: 0,
        });
      });

      latitude = pos.coords.latitude;
      longitude = pos.coords.longitude;

      console.log("latitude:", latitude);
      console.log("longitude:", longitude);

      const g = await reverseGeocode(latitude, longitude);

      address =
        g?.address?.road ||
        g?.address?.village ||
        g?.address?.suburb ||
        g?.display_name ||
        "";
    } catch (err: any) {
      return console.error("Geolocation error:", err.message || err);
    }

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([k, v]) => data.append(k, v as string));

      if (latitude) data.append("location[latitude]", String(latitude));
      if (longitude) data.append("location[longitude]", String(longitude));
      if (address) data.append("location[address]", address);

      if (image) data.append("image", image);

      await reportAPI.create(data);

      setSuccess("Laporan berhasil dikirim!");

      // Reset form
      setFormData({
        name: "",
        phone: "",
        dusun: "",
        rt: "",
        title: "",
        description: "",
        category: "Lainnya",
      });

      setImage(null);
    } catch {
      setError("Gagal mengirim laporan");
    }

    setLoading(false);
  };

  // ------------------------------------
  // Render
  // ------------------------------------
  return (
    <div className="pt-20 bg-gray-50 min-h-screen p-4">
      <div className="max-w-3xl mx-auto">
        <motion.h1
          initial={{opacity: 0, y: -20}}
          animate={{opacity: 1, y: 0}}
          className="text-3xl font-bold text-center mb-6"
        >
          Form Pelaporan Desa Buah Berak
        </motion.h1>

        <motion.form
          onSubmit={handleSubmit}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          className="bg-white shadow-lg rounded-xl p-6 space-y-6"
        >
          {success && <p className="text-green-600 text-center">{success}</p>}
          {error && <p className="text-red-600 text-center">{error}</p>}

          {/* ---------------- DATA PELAPOR ---------------- */}
          <h2 className="font-semibold text-lg text-gray-700 border-b pb-2">
            Data Pelapor
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nama Pelapor"
              className="border p-3 rounded-lg"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />

            <input
              type="text"
              placeholder="Nomor Telepon"
              className="border p-3 rounded-lg"
              value={formData.phone}
              onChange={(e) =>
                setFormData({...formData, phone: e.target.value})
              }
              required
            />

            <input
              type="text"
              placeholder="Dusun"
              className="border p-3 rounded-lg"
              value={formData.dusun}
              onChange={(e) =>
                setFormData({...formData, dusun: e.target.value})
              }
              required
            />

            <input
              type="text"
              placeholder="RT"
              className="border p-3 rounded-lg"
              value={formData.rt}
              onChange={(e) => setFormData({...formData, rt: e.target.value})}
              required
            />
          </div>

          {/* ---------------- DETAIL LAPORAN ---------------- */}
          <h2 className="font-semibold text-lg text-gray-700 border-b pb-2 mt-4">
            Detail Laporan
          </h2>

          <input
            type="text"
            placeholder="Judul Laporan"
            className="border p-3 rounded-lg w-full"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />

          <textarea
            placeholder="Deskripsi Laporan"
            className="border p-3 rounded-lg w-full h-32"
            value={formData.description}
            onChange={(e) =>
              setFormData({...formData, description: e.target.value})
            }
            required
          />

          <select
            className="border p-3 rounded-lg w-full"
            value={formData.category}
            onChange={(e) =>
              setFormData({...formData, category: e.target.value})
            }
          >
            <option value="Infrastruktur">Infrastruktur</option>
            <option value="Keamanan">Keamanan</option>
            <option value="Kesehatan">Kesehatan</option>
            <option value="Kebersihan">Kebersihan</option>
            <option value="Sosial">Sosial</option>
            <option value="Bencana">Bencana</option>
            <option value="Lainnya">Lainnya</option>
          </select>

          {/* ---------------- FOTO LAPORAN ---------------- */}
          <div>
            <label className="text-gray-700 font-medium">Foto Laporan</label>

            {!image && (
              <button
                type="button"
                onClick={openCamera}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Buka Kamera
              </button>
            )}

            {image && (
              <div className="mt-3">
                <img
                  src={URL.createObjectURL(image)}
                  className="w-full rounded-lg"
                />
                <button
                  type="button"
                  onClick={openCamera}
                  className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded-lg"
                >
                  Ambil Ulang
                </button>
              </div>
            )}
          </div>

          {/* ---------- POPUP KAMERA ----------- */}
          <dialog
            ref={dialogRef}
            className="rounded-lg p-4 backdrop:bg-black/50 backdrop:backdrop-blur"
          >
            <video ref={videoRef} className="w-full max-w-sm rounded" />

            <div className="flex gap-3 mt-4 justify-center">
              <button
                type="button"
                onClick={capturePhoto}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Ambil Foto
              </button>

              <button
                type="button"
                onClick={closeCamera}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Tutup
              </button>
            </div>

            <canvas ref={canvasRef} className="hidden" />
          </dialog>

          {/* Submit */}
          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            {loading ? "Mengirim..." : "Kirim Laporan"}
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default Pelaporan;
