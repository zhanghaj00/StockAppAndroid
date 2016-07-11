import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Platform,TouchableNativeFeedback } from 'react-native';
import { SWITCH_TAB } from '../actions/types';



class DrawerMenuComp extends Component {

	 constructor(props){
        super(props);
        console.log("DrawerMenuComp inner");
    }


  _renderDrawerItem(tag, itemText) {
    return (
      <TouchableNativeFeedback onPress={this.props._onTabSelected(tag)}>
        <View style={[styles.drawerItemContainer, this.props.tab === tag && styles.drawerItemContainerSelected]}>
          <Text style={[styles.drawerItemText, this.props.tab === tag && styles.drawerItemTextSelected]}>{itemText}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  }

  render() {
    return (
      <View style={styles.drawerContainer}>
        <View style={styles.drawerHeaderContainer} >
          <Text style={styles.drawerHeaderText1}>这是一个主页</Text>
          <Text style={styles.drawerHeaderText2}>example</Text>
          <Text style={styles.drawerHeaderText3}>分享一些东西</Text>
        </View>
        {this._renderDrawerItem(SWITCH_TAB.HOME, '主页')}
        {this._renderDrawerItem(SWITCH_TAB.GIRL, '妹纸')}
  	  </View>
    );
  }
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  drawerHeaderContainer: {
    height: 150,
    backgroundColor: '#8C978B',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    paddingTop: (Platform.OS === 'android' && Platform.Version < 19) ? 0 : (Platform.OS === 'android' ? 24 : 20),
  },
  drawerHeaderText1: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  drawerHeaderText2: {
    color: '#CCCCCC',
    fontSize: 13,
    alignSelf: 'center',
  },
  drawerHeaderText3: {
    color: '#FFFFFF',
    fontSize: 15,
    marginTop: 10,
  },
  drawerItemContainer: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 25,
  },
  drawerItemContainerSelected: {
    backgroundColor: 'red',
  },
  drawerItemText: {
  	color: '#999999',
  	textAlign: 'center',
    marginLeft: 10,
    fontSize: 16,
  	textAlignVertical: 'center',
  },
  drawerItemTextSelected: {
    color: '#495c73',
  },
});


export default DrawerMenuComp;