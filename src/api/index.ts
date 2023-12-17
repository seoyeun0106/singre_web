import axios from "axios";

const axiosInterface = axios.create({
  baseURL: "/",
  timeout: 100000,
});

axiosInterface.interceptors.request.use(
  (config) => {
    return Promise.resolve(config);
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInterface.interceptors.response.use(
  (config) => config,
  async function (error) {
    const status = error.response?.status;
    if (status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

const currentTime = new Date().toJSON();

export { axiosInterface, currentTime };
