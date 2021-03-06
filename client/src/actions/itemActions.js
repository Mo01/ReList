import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getItems = () => (dispatch) => {
	dispatch(setItemsLoading());
	axios
		.get('/api/items')
		.then((res) =>
			dispatch({
				type: GET_ITEMS,
				payload: res.data
			})
		)
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const addItem = (item) => (dispatch, getState) => {
	axios
		.post('/api/items', item, tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: ADD_ITEM,
				payload: res.data
			})
		)
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const deleteItem = (id) => (dispatch, getState) => {
	console.log('deleteItem', id);
	axios
		.delete(`/api/items/${id}`, tokenConfig(getState), console.log('getState', getState))
		.then((res) =>
			dispatch({
				type: DELETE_ITEM,
				payload: id
			})
		)
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const updateItem = (id, item) => (dispatch, getState) => {
	console.log('updateItem xx', id, item);
	axios
		.put(`/api/items/${id}`, item, tokenConfig(getState), console.log('put  ', item, 'getState', getState))
		.then((res) => {
			console.log('Finished put', JSON.stringify(res));
			dispatch({
				type: GET_ITEMS,
				payload: res.data
			});
		})
		.catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const setItemsLoading = () => {
	return {
		type: ITEMS_LOADING
	};
};
