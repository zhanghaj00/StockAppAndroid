import React, { Component } from 'react';
import {
  StyleSheet,
  RefreshControl,
  Text,
  Image,
  View,
  TouchableOpacity,
  Platform,
  ProgressBarAndroid as ProgressBar,
} from 'react-native';
import { connect } from 'react-redux';

import ShowPicturePage from './MainPage'; //点击进入图片详情的 先不做
import CustomTitleBarComp from '../comm/CustomTitleBarComp';
import GridViewComp from '../comm/GridViewComp';
import CommonLoadView from '../comm/CommonLoadView';
import ImageView from '../comm/ImageView';
import { FETCH_GIRL_DATA_STATUS } from '../actions/types';
import { fetchGirlList } from '../actions/AppDataApi';
import { showToast } from '../comm/CommonAlert';
import { COMMON_BACKGROUND_COLOR } from '../GlobalConst';



class GirlPage extends Component {

    constructor(props) {
      super(props);
    
      this.isInitLoadData = false;
      this.curPageNo = 1;
      this.isLoadMoreing = false;
      this.onRetry = this._onRetry.bind(this);
    }


       componentDidMount() {
    if (Platform.OS !== 'android') {
      this._fetchData(0);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (Platform.OS !== 'android') return true;

    if (!this.isInitLoadData) {
      this.isInitLoadData = true;
      this._fetchData(0);
      return false;
    }

    if (nextProps.status === FETCH_GIRL_DATA_STATUS.START) {
      return false;
    } else if (nextProps.status === FETCH_GIRL_DATA_STATUS.FAILURE) {
      if (nextProps.opt === 1) {
        // 下拉刷新失败
        showToast('刷新数据失败了...');
        return false;
      } else if (nextProps.opt === 2) {
        // 加载更多失败
        showToast('加载更多数据失败了...');
        this.curPageNo --;
        this.isLoadMoreing = false;
        return false;
      }
    }

    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    // 处理加载更多操作时，在数据加载完成并渲染完界面后，将加载更多的状态重置
    if (prevProps.opt === 2) {
      this.isLoadMoreing = false;
    }
  }


    /**
     * 加载失败后重试
    */
    _onRetry() {
      this.props.dispatch({type: FETCH_GIRL_DATA_STATUS.INITIALIZE});
    // 延迟2秒再调用数据
      setTimeout(() => {
      this._fetchData(0);
      }, 2000)
    }
    /**
    * 加载妹纸列表数据
     */  
    _fetchData(opt) {
      this.curPageNo = opt !== 2 ? 1 : (this.curPageNo + 1);
      this.props.dispatch(fetchGirlList(opt, this.curPageNo));
    }

    /**
   * 加载更多
   */
  _onLoadMore() {
    if (this.isLoadMoreing) {
      return;
    }

    this.isLoadMoreing = true;

    // 延迟1秒再调用数据
    setTimeout(() => {
      this._fetchData(2);
    }, 1000)
  }

    _footerView() {
    return (
      <View style={styles.footerContainer}>
        <ProgressBar styleAttr="Small" />  
        <Text>
          正在加载中...
        </Text>
      </View>
    );
  }

  _renderItem(item, sectionID, rowID) {
    return (
      <TouchableOpacity
        key={`${sectionID}-${rowID}`}
        style={{flex: 1}}
        activeOpacity={0.8}
        onPress={this._onItemViewPress.bind(this, item.url)}>
        <ImageView
          source={{uri: item.url}}
          defaultSource={require('../img/ic_common_load_error.png')}
          resizeMode={Image.resizeMode.cover}
          style={styles.image} >
          <View style={styles.titleContainer}>
            <Text style={styles.title}>via：{item.who}</Text>
          </View>
        </ImageView>
      </TouchableOpacity>
    );
  }

  _onItemViewPress(picUrl) {
    this.props.navigator.push({
      component: MainPage, 
      picUrl: picUrl,
    });
  }
    render() {
    let contentView;
    if (this.props.status === FETCH_GIRL_DATA_STATUS.INITIALIZE) {
      contentView = <CommonLoadView loadState="ing" />;
    } else if (this.props.status === FETCH_GIRL_DATA_STATUS.FAILURE) {
      contentView = <CommonLoadView loadState="error" onRetry={this.onRetry} />
    } else {
      contentView = (
        <GridViewComp
          items={this.props.dataSource}
          itemsPerRow={2}
          renderItem={this._renderItem.bind(this)}
          onEndReachedThreshold={5}
          onEndReached={this.props.isLoadMore ? this._onLoadMore.bind(this) : null}
          renderFooter={this.props.isLoadMore ? this._footerView : null}
          refreshControl={
              <RefreshControl
                  refreshing={this.props.isRefreshing}
                  onRefresh={this._onRefresh.bind(this)}
                  tintColor="#AAAAAA"
                  title="下拉下载"
                  progressBackgroundColor="#FFFFFF"/>}
          />
      );
    }

    return (
      <View style={styles.container}>
        <CustomTitleBarComp  title="妹纸" onLeftBtnClick={this.props.onDrawerMenuToggle} isMainPage={true} />
        {contentView}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COMMON_BACKGROUND_COLOR,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  image: {
    flex: 1,
    height: 180,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },  
  titleContainer: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    height: 30,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 13,
  },
});

function select(store) {
  return {
    status: store.girlpagestore.status,
    dataSource: store.girlpagestore.dataSource,
    isRefreshing: store.girlpagestore.isRefreshing,
    isLoadMore: store.girlpagestore.isLoadMore,
    opt: store.girlpagestore.opt,
  }
}

export default connect(select)(GirlPage);
