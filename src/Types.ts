export type Note = {
	id: number;
	title: string;
	details: string;
	pined: boolean;
	lastEditedNote: string;
	tags: Array<string>;
	backgroundColor: { active: boolean; color: string };
};

export type User = {
	_id: string;
	name: string;
	notes: Array<Array<Note>>;
	theme: string;
	created: string;
};
