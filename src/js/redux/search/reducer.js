import types from './types';

const initialState = {
	search: '',
};

const search = (state = initialState, { type, payload }) => {
	if (type === types.SET_SEARCH) {
		return {
			...state,
			search: payload,
		};
	}
	return state;
};

export default search;
