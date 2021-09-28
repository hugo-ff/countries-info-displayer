import types from './types';

export const setSearch = query => ({
	type: types.SET_SEARCH,
	payload: query,
});

export default setSearch;
