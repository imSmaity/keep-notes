import { User } from '../../Types';
import { ADD_NOTE, EDIT_NOTE, DELETE_NOTE } from '../helper';

export const noteAdd = (data: User) => {
	return {
		type: ADD_NOTE,
		payload: data,
	};
};
export const noteEdit = (data: User) => {
	return {
		type: EDIT_NOTE,
		payload: data,
	};
};
export const noteDelete = (data: User) => {
	return {
		type: DELETE_NOTE,
		payload: data,
	};
};
