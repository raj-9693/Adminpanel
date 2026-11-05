import axios from "axios";

const Apiaxios=axios.create({
    baseURL:"http://localhost:5000"
})



Apiaxios.interceptors.request.use((config) => {
  console.log(config.method, config.baseURL + config.url);
  return config;
});

export default Apiaxios;