import {
  aparaturDesa,
  Achievement,
  Event,
  Partner,
  Testimonial,
  Certification,
} from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3008";
// const API_BASE_URL =
//   import.meta.env.VITE_API_URL || "https://api-buah-berak.garnusa.com";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DEFAULT_TIMEOUT = 30000;

async function fetchAPI<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API fetch error: ", error);
    throw new Error("Failed to fetch data");
  }
}

export const aparaturDesaAPI = {
  getAll: async () => {
    const res = await fetchAPI<{data: aparaturDesa[]}>("/api/aparatur");
    return res.data;
  },
  getById: async (id: string) => {
    const res = await fetchAPI<{data: aparaturDesa}>(`/api/aparatur/${id}`);
    return res.data;
  },
};

export const activityAPI = {
  getAll: async () => {
    const res = await fetchAPI<{data: Achievement[]}>("/api/achievements");
    return res.data;
  },
  getById: async (id: string) => {
    const res = await fetchAPI<{data: Achievement}>(`/api/achievements/${id}`);
    return res.data;
  },
};

export const reportAPI = {
  getAll: async () => {
    const res = await fetchAPI<{data: any[]}>("/api/report");
    return res.data;
  },

  getById: async (id: string) => {
    const res = await fetchAPI<{data: any}>(`/api/report/${id}`);
    return res.data;
  },

  create: async (formData: FormData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/report`, {
        method: "POST",
        body: formData, // jangan pakai JSON
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("API create report error: ", error);
      throw new Error("Failed to create report");
    }
  },
};

export const eventAPI = {
  getAll: async () => {
    const res = await fetchAPI<{data: Event[]}>("/api/events");
    return res.data;
  },
  getById: async (id: string) => {
    const res = await fetchAPI<{data: Event}>(`/api/events/${id}`);
    return res.data;
  },
};

export const partnerAPI = {
  getAll: async () => {
    const res = await fetchAPI<{data: Partner[]}>("/api/partners");
    return res.data;
  },
  getById: async (id: string) => {
    const res = await fetchAPI<{data: Partner}>(`/api/partners/${id}`);
    return res.data;
  },
};

export const testimonialAPI = {
  getAll: async () => {
    const res = await fetchAPI<{data: Testimonial[]}>("/api/testimonials");
    return res.data;
  },
  getById: async (id: string) => {
    const res = await fetchAPI<{data: Testimonial}>(`/api/testimonials/${id}`);
    return res.data;
  },
};

export const hkiAPI = {
  getAll: async () => {
    const res = await fetchAPI<{data: Certification[]}>("/api/hki");
    return res.data;
  },
  getById: async (id: string) => {
    const res = await fetchAPI<{data: Certification}>(`/api/hki/${id}`);
    return res.data;
  },
};

export const patentAPI = {
  getAll: async () => {
    const res = await fetchAPI<{data: Certification[]}>("/api/patents");
    return res.data;
  },
  getById: async (id: string) => {
    const res = await fetchAPI<{data: Certification}>(`/api/patents/${id}`);
    return res.data;
  },
};

export const industrialDesignAPI = {
  getAll: async () => {
    const res = await fetchAPI<{data: Certification[]}>(
      "/api/industrial-designs"
    );
    return res.data;
  },
  getById: async (id: string) => {
    const res = await fetchAPI<{data: Certification}>(
      `/api/industrial-designs/${id}`
    );
    return res.data;
  },
};
