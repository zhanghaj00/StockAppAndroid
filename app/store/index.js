
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducer';


const logger = store => next => action => {

    if (typeof action === 'function') {
        console.log('>>>> logger => dispatching a function');
    } else {
        console.log('>>>> logger => dispatching', action);
    }

    let result = next(action);
    console.log('next state', store.getState());
    return result;
}

const createStoreWithMiddleware = applyMiddleware(logger, thunk)(createStore);

export default function configureStore(initialState) {
	console.log("inner  store");
    return createStoreWithMiddleware(reducers, initialState);
}