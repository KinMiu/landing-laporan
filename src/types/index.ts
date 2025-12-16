export interface aparaturDesa {
  _id: string;
  name: string;
  nidn: string;
  fields: string[];
  position: string;
  email: string;
  foto?: string;
  phone?: string;
  address?: string;
  education?: Education[];
  courses?: string[];
  publications?: Publication[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Education {
  _id?: string;
  degree: string;
  institution: string;
  year: string;
  field?: string;
}

export interface Publication {
  _id?: string;
  title: string;
  link?: string;
  year?: string;
}

export interface Activity {
  _id: string;
  judul: string;
  tahun: string;
  mahasiswa: string[];
  deskripsi: string;
  foto: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Event {
  _id: string;
  nama: string;
  foto: string;
  deskripsi: string;
  tanggal: string;
  lokasi: string;
  jenis: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Partner {
  _id: string;
  name: string;
  logo: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  tahunlulus: string;
  pekerjaan: string;
  perusahaan: string;
  image: string;
  testimoni: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Certification {
  _id: string;
  title: string;
  date: string;
  number: string;
  authors: string[];
  driveUrl: string;
  createdAt?: string;
  updatedAt?: string;
}
