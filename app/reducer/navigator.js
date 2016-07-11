
import * as TYPES from '../actions/types';

const initState = {
	tab:TYPES.SWITCH_TAB.HOME,
}

 export default function navigator(state = initState,actions){
 		switch(actions.type){
 			case TYPES.SWITCH_FLAG:
 				return {...state,tab:actions.tab,};
 			default:
 				 return state;
 		}
 }
