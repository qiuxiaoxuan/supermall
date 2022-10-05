import { request } from './request';

// 获取左侧大分类的信息
export const getCategory = () => {
  return request({
    url: '/category',
  });
};

// 获取每个左侧大分类的具体信息
// maitKey  用于查找不同分类中的上方展示区中小分类的信息的params
export const getSubcategory = (maitKey) => {
  return request({
    url: '/subcategory',
    params: {
      maitKey,
    },
  });
};

// miniWallkey, type 用于查找不同分类中的下方详情的信息的params
export const getCategoryDetail = (miniWallkey, type) => {
  return request({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type,
    },
  });
};
