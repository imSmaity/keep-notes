export type Note = {
	id: number;
	title: string;
	details: string;
	tags: Array<string>;
	backgroundColor: { active: boolean; color: string };
};

export type User = {
	id: string;
	name: string;
	notes: Array<Note>;
	trash: Array<Note>;
	lastEditedNote: Array<string>;
	theme: string;
	created: string;
};
