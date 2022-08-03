import {
	ADD_NOTE,
	DELETE_NOTE,
	EDIT_NOTE,
	PIN_NOTE,
	SEARCHED_USER,
	THEME_CHANGE,
	UPPIN_NOTE,
} from '../helper';
import { Action } from '../Types';

const initialValue = () => {
	return {
		_id: '62e7e64a88eb3a461f1dbd61',
		name: 'Keep Notes',
		notes: [[]],
		theme: 'orange',
		created: new Date().toLocaleString(),
	};
};
const notesReducer = (state = initialValue(), action: Action) => {
	if (action.type === SEARCHED_USER) {
		return action.payload;
	} else if (action.type === ADD_NOTE) {
		return action.payload;
	} else if (action.type === EDIT_NOTE) {
		return action.payload;
	} else if (action.type === DELETE_NOTE) {
		return action.payload;
	} else if (action.type === PIN_NOTE) {
		return action.payload;
	} else if (action.type === UPPIN_NOTE) {
		return action.payload;
	} else if (action.type === THEME_CHANGE) {
		return action.payload;
	}
	return state;
};

export default notesReducer;
