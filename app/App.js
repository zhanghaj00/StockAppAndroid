
import React ,{Component} from 'react';

import {Provider} from 'react-redux';
import configureStore from './store';

import WelcomePage from './pages/WelcomePage';

const store = configureStore();

class App extends Component{


    constructor(props){
        super(props);
        console.log("APP inner");
        this.state = {
            isHelloWorld:true
        }
    }

    render(){
            return (
            <Provider  store ={store} >
                <WelcomePage />
            </Provider>
            )
    }
}

export default App;