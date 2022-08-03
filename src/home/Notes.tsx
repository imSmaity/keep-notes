import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Note, User } from '../Types';
import { Box, Grid, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import BasicModal from '../components/BasicModal';
import { noteEdit, touch } from '../redux/actions/notesAction';
import PushPinIcon from '@mui/icons-material/PushPin';
import { Container } from '@mui/system';
import icon from '../Assets/note-icon.png';

const AddedNote = ({
	note,
	pIndex,
	index,
}: {
	note: Note;
	pIndex: number;
	index: number;
}) => {
	const [open, setOpen] = useState(false);
	const [isOption, setIsOption] = useState(false);
	const handleOpen = () => setOpen(true);

	const user = useSelector(
		(state: { notesReducer: User }) => state.notesReducer
	);
	const dispatch = useDispatch();

	const deleteNote = (e: any) => {
		const notes = user.notes;
		if (!notes[pIndex]) {
			notes[pIndex - 1].splice(index, 1);
		} else {
			notes[pIndex].splice(index, 1);
		}
		console.log(pIndex, index);

		const flatArray = notes.flat(1);
		const pinedNotes = flatArray.filter((node) => node.pined); //filtered pinedNodes
		const unpinedNotes = flatArray.filter((node) => !node.pined); //filtered unpinedNodes
		const newNotes = pinedNotes.concat(unpinedNotes);
		const structuredArray = (function getPagesStructure(arr: Array<Note>) {
			const newArr = [];
			while (arr.length) newArr.push(arr.splice(0, 6));
			return newArr;
		})(newNotes);

		touch.deleteing(dispatch, { ...user, notes: structuredArray });
		e.stopPropagation();
	};

	const pinedNote = (e: any) => {
		const notes = user.notes;
		notes[pIndex].splice(index, 1);

		const modifyNote = {
			...note,
			id: notes.length + Math.random() + Math.random(),
			pined: Boolean(true),
		};
		const flatArray = notes.flat(1);
		const pinedNotes = flatArray.filter((node) => node.pined); //filtered pinedNodes
		const unpinedNotes = flatArray.filter((node) => !node.pined); //filtered unpinedNodes
		unpinedNotes.unshift(modifyNote); //pined note insert in the array
		const newNotes = pinedNotes.concat(unpinedNotes);
		const structuredArray = (function getPagesStructure(arr: Array<Note>) {
			const newArr = [];
			while (arr.length) newArr.push(arr.splice(0, 6));
			return newArr;
		})(newNotes);

		touch.pin(dispatch, { ...user, notes: structuredArray });
		e.stopPropagation();
	};
	const uppinedNote = (e: any) => {
		const notes = user.notes;
		notes[pIndex].splice(index, 1);

		const modifyNote = {
			...note,
			id: notes.length + Math.random() + Math.random(),
			pined: Boolean(false),
		};
		const flatArray = notes.flat(1);
		const pinedNotes = flatArray.filter((node) => node.pined); //filtered pinedNodes
		const unpinedNotes = flatArray.filter((node) => !node.pined); //filtered unpinedNodes
		unpinedNotes.push(modifyNote); //pined note insert in the array
		const newNotes = pinedNotes.concat(unpinedNotes);
		const structuredArray = (function getPagesStructure(arr: Array<Note>) {
			const newArr = [];
			while (arr.length) newArr.push(arr.splice(0, 6));
			return newArr;
		})(newNotes);

		touch.uppin(dispatch, { ...user, notes: structuredArray });
		e.stopPropagation();
	};

	return (
		<>
			<Grid item lg={4} columnGap={4}>
				<Box
					onClick={handleOpen}
					onMouseOver={() => setIsOption(true)}
					onMouseLeave={() => setIsOption(false)}
					sx={{
						backgroundColor: note.backgroundColor.color,
						boxShadow: isOption ? 4 : 1,
						borderRadius: 2,
						m: 5,
						p: 1,
						border:
							note.backgroundColor.color !== 'white'
								? `1px solid ${note.backgroundColor.color}`
								: `1px solid ${user.theme}`,
					}}>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							visibility: isOption ? '' : 'hidden',
						}}>
						<DeleteIcon onClick={deleteNote} />
						{note.pined ? (
							<PushPinIcon onClick={uppinedNote} />
						) : (
							<PushPinOutlinedIcon onClick={pinedNote} />
						)}
					</Box>

					<Typography
						variant={'h5'}
						component={'h3'}
						sx={{ fontSize: '.9rem', fontWeight: 'bold', p: 0.8, mt: 1 }}>
						{note.title}
					</Typography>
					<Typography
						component={'div'}
						sx={{ fontSize: '.9rem', p: 0.8, mt: -1 }}>
						{note.details}
					</Typography>
					<Typography sx={{ fontSize: '.8rem', color: 'gray', p: 0.8, mb: 2 }}>
						{note.lastEditedNote}
					</Typography>
				</Box>
			</Grid>
			<BasicModal
				open={open}
				setOpen={setOpen}
				note={note}
				index={index}
				pIndex={pIndex}
			/>
		</>
	);
};
const Notes = () => {
	const [pageSize, setPageSize] = useState<number>(0);

	const user = useSelector(
		(state: { notesReducer: User }) => state.notesReducer
	);
	const getCurrentPage = (notes: Array<Array<Note>>, pageSize: number) => {
		if (notes[pageSize] !== undefined) return notes[pageSize];
		if (notes[pageSize - 1] !== undefined) return notes[pageSize - 1];
		return [];
	};
	if (user.notes.length !== 0)
		return (
			<Container maxWidth='lg' sx={{ mt: 1 }}>
				<Grid container>
					{getCurrentPage(user.notes, pageSize).map((note, index) => {
						return (
							<AddedNote
								note={note}
								key={note.id}
								pIndex={pageSize}
								index={index}
							/>
						);
					})}
				</Grid>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
					}}>
					{user.notes.map((note, index) => {
						return (
							<Typography
								key={index}
								component={'div'}
								onClick={() => setPageSize(index)}
								sx={{
									m: 3,
									p: 1,
									border: '1px solid gray',
									borderRadius: 1,
									boxShadow: pageSize === index ? 3 : 2,
									backgroundColor: pageSize === index ? 'lightgray' : 'white',
									fontWeight: pageSize === index ? 'bold' : '',
								}}>
								{index}
							</Typography>
						);
					})}
				</Box>
			</Container>
		);
	return (
		<Box sx={{ position: 'absolute', left: '45%', top: '43%' }}>
			<img src={icon} alt={'...'} style={{ width: '10rem', height: '10rem' }} />
		</Box>
	);
};

export default Notes;
