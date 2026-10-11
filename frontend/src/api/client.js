import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

let getToken = null;

export function setTokenProvider(provider) {
  getToken = provider;
}

client.interceptors.request.use(async (config) => {
  if (getToken) {
    try {
      const token = await getToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Token olishda xatolik:', error);
    }
  }

  return config;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Server bilan bog‘lanishda xatolik';

    console.error('API xatoligi:', message);

    return Promise.reject(error);
  }
);

export default client;
