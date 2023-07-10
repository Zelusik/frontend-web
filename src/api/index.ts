import { changeAuthState } from "../reducer/slices/auth/authSlice";
import axios from "axios";
import { useAppDispatch } from "hooks/useReduxHooks";
import { getCookie, setCookie } from "utils/cookie";

const client = axios.create({
  baseURL: process.env.BASE_URL,
});

// app render될 때, interceptor
client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config, response } = error;
    // error가 날 경우, throw
    if (response.data.code === 1502) {
      const refreshToken = getCookie("refreshToken");
      const originalRequest = config;
      await axios({
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        url: `${process.env.BASE_URL}/auth/token`,
        data: {
          refreshToken: refreshToken,
        },
      })
        .then(({ data }) => {
          const dispatch = useAppDispatch();
          dispatch(
            changeAuthState({
              type: "accessToken",
              value: data.accessToken,
            })
          );
          dispatch(
            changeAuthState({
              type: "refreshToken",
              value: data.refreshToken,
            })
          );
          setCookie("accessToken", data.accessToken, 1);
          setCookie("refreshToken", data.refreshToken, 30);
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        })
        .catch((err) => {
          console.log("/auth/token err");
          return Promise.reject(err);
        });
      return axios(originalRequest);
    }
  }
);

export default client;
