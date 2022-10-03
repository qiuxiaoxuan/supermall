import { request } from './request';

// 用iid获取数据
export const getDetial = (iid) => {
  return request({
    url: '/detail',
    params: {
      iid,
    },
  });
};

// 获取详情中的推荐信息
export const getRecommend = () => {
  return request({
    url: '/recommend',
  });
};

// 包含商品展示信息的类
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title; // 商品介绍
    this.desc = itemInfo.desc; //
    this.newPrice = itemInfo.price; // 商品新价格
    this.oldPrice = itemInfo.oldPrice; // 商品原价
    this.discount = itemInfo.discountDesc; // 商品折扣
    this.columns = columns; // 包含商品销量和收藏的对象
    this.services = services;
    this.realPrice = itemInfo.lowNowPrice;
  }
}

// 包含商品参数信息的类
export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}

// 包含商品店铺信息的类
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}
