import * as TYPES from './types';

export function switchTab(tab) {
	return {
    type: TYPES.SWITCH_FLAG,
    tab: tab,
	}
}