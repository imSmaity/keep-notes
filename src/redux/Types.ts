export type Action = {
	type: string;
	payload: {
		id: string;
		name: string;
		notes: Array<object>;
		lastEditedNote: string;
		theme: string;
		created: string;
	};
};
