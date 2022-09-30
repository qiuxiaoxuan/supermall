// 将首页模块中所有的网络请求抽取出来，将需要获取某一个数据的网络请求封装成一个函数
// 然后再页面中引入并调用这个函数即可，并不需要知道它是怎么去执行的，以后修改和维护也只需要来到这里，方便做统一的管理
// 引入自己封装了axios的request网络请求组件
import { request } from './request';

// 使用分别暴露的方式，引入的时候要使用大括号

// 对首页的轮播图和推荐视图的数据进行请求的函数
export const getHomeMultidata = () => {
  return request({
    url: '/home/multidata',
  });
};

// 对首页的商品信息的数据进行请求的函数  type为商品类型 pop new sell;page为应该请求的数据多少
export const getHomeGoods = (type, page) => {
  return request({
    url: '/home/data',
    params: {
      type,
      page,
    },
  });
};
