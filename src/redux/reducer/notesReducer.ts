import { Action } from '../Types';

const initialValue = () => {
	return {
		id: '10000001',
		name: 'Keep Notes',
		notes: [],
		trash: [],
		lastEditedNote: '',
		theme: 'white',
		created: new Date().toLocaleString(),
	};
};
const notesReducer = (state = initialValue(), action: Action) => {
	if (action.type === 'ADDING') {
		return action.payload;
	} else if (action.type === 'EDIT') {
		return action.payload;
	} else if (action.type === 'DELETE') {
		return action.payload;
	}
	return state;
};

export default notesReducer;
