
import {combineReducers} from 'redux'

import NavigaterReducer from './navigator';
import girlpageReducer from './girlPage';

export default combineReducers(
	{
		navigaterstore:NavigaterReducer,
		girlpagestore:girlpageReducer,
	}
)