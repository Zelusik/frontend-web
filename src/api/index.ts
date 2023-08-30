import axios from "axios";
import { getCookie, setCookie } from "utils/cookie";

const client = axios.create({
  baseURL: process.env.BASE_URL,
});

client.interceptors.request.use((config) => {
  const accessToken = getCookie("accessToken");

  if (!accessToken) {
    config.headers["Authorization"] = "";
  } else {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config, response } = error;

    if (response.data.code === 1503 || response.data.code === 1500) {
      const refreshToken = getCookie("refreshToken");
      const originalRequest = config;

      try {
        const { data } = await axios({
          headers: {
            "Content-Type": "application/json",
          },
          method: "post",
          url: `${process.env.BASE_URL}/auth/token`,
          data: {
            refreshToken: refreshToken,
          },
        });

        setCookie("accessToken", data.accessToken, 1);
        setCookie("refreshToken", data.refreshToken, 30);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        return axios(originalRequest);
      } catch (err) {
        window.location.href = "/login";
        return Promise.reject(err);
      }
    } else {
      throw error;
    }
  }
);

export default client;
