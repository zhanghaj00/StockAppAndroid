
import React,{Component} from 'react';
import {View,Text,StyleSheet} from 'react-native';


class MainPage extends Component{

    constructor(props){
        super(props);
        console.log("MainPage inner")
    }
    render(){
        return(
            <View style={[styles.height160,styles.row]}>
                <View style={[styles.height160,styles.part_1_left]} >
                    <Text style={[styles.font30]}>左护法</Text>
                </View>
                <View style={[styles.height160,styles.part_1_right]} >
                    <Text style={[styles.font30]}>右护法</Text>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create(
    {
        row:{
            flexDirection:'row',
        },
        font30:{
            fontSize:20,
        },
        height160:{
            height:160,
        },
        part_1_left:{
            flex:1,
            borderWidth:1,
            borderColor:'red'
        },
        part_1_right:{
            flex:2,
            borderWidth:1,
            borderColor:'red'
        }
    }
);


export default MainPage;

