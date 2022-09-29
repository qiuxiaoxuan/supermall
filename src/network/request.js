// 封装axios，以后修改就只需要修改封装的这个文件，而不是去修改所以依赖于axios的文件
// 引入axios
import axios from 'axios';
export const request = (config) => {
  // 创建一个axios的实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/hy66',
    timeout: 3000,
  });
  // 2.axios的拦截器
  // 请求拦截器
  instance.interceptors.request.use(
    (config) => {
      // 做一些操作后再将config返回出去
      return config;
    },
    (error) => {
      console.log(error);
    }
  );
  // 响应拦截器
  instance.interceptors.response.use(
    (response) => {
      // 做一些处理后将响应数据中的data返回
      return response.data;
    },
    (error) => {
      console.log(error);
    }
  );
  // 3.发送真正的网络请求
  return instance(config); // 因为instance是axios的实例，所以它本身返回的也是一个Promise
};
