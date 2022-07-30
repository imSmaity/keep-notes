import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Note, User } from '../Types';
import { Grid, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import BasicModal from '../components/BasicModal';

const AddedNote = ({ note, key }: { note: Note; key: number }) => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);

	return (
		<>
			<Grid
				item
				lg={4}
				sx={{ backgroundColor: note.backgroundColor.color, mt: 10 }}
				onClick={handleOpen}>
				<PushPinOutlinedIcon />
				<Typography variant={'h5'} component={'h3'}>
					{note.title}
				</Typography>
				<Typography component={'div'}>{note.details}</Typography>
				<DeleteIcon />
			</Grid>
			<BasicModal open={open} setOpen={setOpen} note={note} />
		</>
	);
};
const Notes = () => {
	const [pageSize, setPageSize] = useState<number>(5);
	const user = useSelector(
		(state: { notesReducer: User }) => state.notesReducer
	);

	return (
		<div style={{ height: 400, width: '100%' }}>
			<Grid container spacing={5}>
				{user.notes.map((note) => {
					return <AddedNote note={note} key={note.id} />;
				})}
			</Grid>
		</div>
	);
};

export default Notes;
