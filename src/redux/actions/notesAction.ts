import axios from 'axios';
import { User } from '../../Types';
import {
	ADD_NOTE,
	EDIT_NOTE,
	DELETE_NOTE,
	PIN_NOTE,
	UPPIN_NOTE,
	THEME_CHANGE,
	SERVER_URL,
	SEARCHED_USER,
} from '../helper';

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
export const pinNote = (data: User) => {
	return {
		type: PIN_NOTE,
		payload: data,
	};
};
export const uppinNote = (data: User) => {
	return {
		type: UPPIN_NOTE,
		payload: data,
	};
};
export const themeChange = (data: User) => {
	return {
		type: THEME_CHANGE,
		payload: data,
	};
};
export const getUser = (data: User) => {
	return {
		type: SEARCHED_USER,
		payload: data,
	};
};

export const touch = {
	searchingUser: (dispatch: Function) => {
		console.log('search');
		axios
			.post(SERVER_URL + '/user/read')
			.then((res) => {
				dispatch(getUser(res.data));
			})
			.catch((err) => {
				console.log(err);
			});
	},
	add: (dispatch: Function, data: User) => {
		console.log('add');
		axios
			.put(SERVER_URL + '/user/update', data)
			.then((res) => {
				dispatch(noteAdd(res.data));
			})
			.catch((err) => {
				console.log(err);
			});
	},
	edit: (dispatch: Function, data: User) => {
		console.log('edit');
		axios
			.put(SERVER_URL + '/user/update', data)
			.then((res) => {
				dispatch(noteEdit(res.data));
			})
			.catch((err) => {
				console.log(err);
			});
	},
	deleteing: (dispatch: Function, data: User) => {
		console.log('dele');
		axios
			.put(SERVER_URL + '/user/update', data)
			.then((res) => {
				dispatch(noteDelete(res.data));
			})
			.catch((err) => {
				console.log(err);
			});
	},
	pin: (dispatch: Function, data: User) => {
		console.log('pin');
		axios
			.put(SERVER_URL + '/user/update', data)
			.then((res) => {
				dispatch(pinNote(res.data));
			})
			.catch((err) => {
				console.log(err);
			});
	},
	uppin: (dispatch: Function, data: User) => {
		console.log('uppin');
		axios
			.put(SERVER_URL + '/user/update', data)
			.then((res) => {
				dispatch(uppinNote(res.data));
			})
			.catch((err) => {
				console.log(err);
			});
	},
	themeChangeing: (dispatch: Function, data: User) => {
		console.log('themeCha');
		axios
			.put(SERVER_URL + '/user/update', data)
			.then((res) => {
				dispatch(themeChange(res.data));
			})
			.catch((err) => {
				console.log(err);
			});
	},
};
