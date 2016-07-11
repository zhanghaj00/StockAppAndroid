import {FETCH_GIRL_DATA_STATUS} from './types';

/**
 * 统一获取干货指定分类数据
 * typeObj:  指定Action type对象
 * opt：     0 初始化加载数据，1 下拉刷新，2 加载更多
 * category: 分类名称（如：Android、iOS、福利...）
 * pageNo：  当前加载的页码
 * ext：     扩展字段
 */
function fetchGankCategoryList(typeObj, opt, category, pageNo, ext) {
	return (dispatch) => {
	  dispatch({type: typeObj.START, opt: opt});
	  let reqUrl = `http://gank.io/api/data/${category}/${PAGE_NUM}/${pageNo}`;
	  RLOG('fetchDataList：' + reqUrl);
	  return fetch(reqUrl)
				    .then((response) => response.json())
				    .then(
				    	(responseData) => dispatch({type: typeObj.SUCCESS, opt, ext, data: responseData}),
				    	(error) => dispatch({type: typeObj.FAILURE, opt, ext, error})	
				    );
	};
}
/**
 * 获取妹纸列表数据
 * opt：   0 初始化加载数据，1 下拉刷新，2 加载更多
 * pageNo：当前加载的页码
 */
export function fetchGirlList(opt, pageNo) {
	RLOG('actions -> gankApi -> fetchGirlList >>>>>>>>>>>>>> ');
	return fetchGankCategoryList(FETCH_GIRL_DATA_STATUS, opt, '福利', pageNo);
}