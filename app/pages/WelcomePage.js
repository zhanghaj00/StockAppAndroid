/*
 * Created by zhanghao on 2016/7/6.
 */
import React,{Component} from 'react';
import {View,StyleSheet,Text,Navigator,DrawerLayoutAndroid} from 'react-native';
import { connect } from 'react-redux';


import {SWITCH_TAB} from '../actions/types';
import { switchTab } from '../actions/navigator';
import DrawerMenuComp from '../comm/DrawerMenu';
import MainPage from './MainPage';
import GirlPage from './GirlPage';
class WelcomePage extends Component{

    constructor(props){
        super(props);

        console.log("WelcomePage inner");
        this.drawerMenuView = this._renderDrawerMenuView.bind(this);

        this.PAGESTUCK = [
            {component:MainPage},
            {component:GirlPage},
        ];
    }
    
    render(){
        
        return(
            <DrawerLayoutAndroid
                ref="drawer"
                drawerWidth={290}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={this.drawerMenuView}>
                <Navigator
                    ref={component =>this.navigator = component}
                    navigator={this.props.navigator}
                    configureScene={(route) => {
                        return Navigator.SceneConfigs.VerticalDownSwipeJump;
                     }}
                    initialRoute={this.PAGESTUCK[0]}
                    initialRouteStack={this.PAGESTUCK}
                    renderScene={this._renderScene.bind(this)}
                />
            </DrawerLayoutAndroid>
        )
    }
    _renderScene(route, navigator) {
        var {component:Component, ...route} = route;
        return <Component navigator={this.props.navigator} {...route}  />;
    }

    _onTabSelected(tab){
        this.refs.drawer.closeDrawer();

        this.props.dispatch(switchTab(tab));
        if(this.props.tab !== tab){
            switch(tab){
                case SWITCH_TAB.HOME:
                    this.navigator.jumpTo(this.PAGESTUCK[0]);
                    break;
                case SWITCH_TAB.GIRL:
                    this.navigator.jumpTo(this.PAGESTUCK[1]);
                    break;
                }
        }
    }

    _renderDrawerMenuView(){
        return <DrawerMenuComp  tab={this.props.tab}  _onTabSelected={(tab)=>this._onTabSelected.bind(this,tab)}/>
    }

}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});

function select(store){
    return{
        tab:store.navigaterstore.tab,
    }
}


export default connect(select)(WelcomePage);