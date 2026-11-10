import axios from "axios";

const Apiaxios=axios.create({
    baseURL:"https://adminpanel-8x8v.onrender.com"
})



Apiaxios.interceptors.request.use((config) => {
  console.log(config.method, config.baseURL + config.url);
  return config;
});

export default Apiaxios;