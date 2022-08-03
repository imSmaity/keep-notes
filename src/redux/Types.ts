import { Note } from '../Types';

export type Action = {
	type: string;
	payload: Note;
};
