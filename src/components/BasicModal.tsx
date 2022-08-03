import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Note, User } from '../Types';
import { Container, Typography } from '@mui/material';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { useState } from 'react';
import Colors from './Colors';
import { useDispatch, useSelector } from 'react-redux';
import { touch } from '../redux/actions/notesAction';

const style = {
	position: 'absolute' as 'absolute',
	top: '35%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 600,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 2,
	borderRadius: 2,
};

export default function BasicModal({
	open,
	setOpen,
	note,
	index,
	pIndex,
}: {
	open: boolean;
	setOpen: Function;
	note: Note;
	index: number;
	pIndex: number;
}) {
	const [isOpenColorPad, setIsOpenColorPad] = useState(false);
	const [currNotes, setCurrNotes] = useState(note);
	const user = useSelector(
		(state: { notesReducer: User }) => state.notesReducer
	);
	const dispatch = useDispatch();
	const [currColor, setColor] = useState(note.backgroundColor.color);
	const [error, setError] = useState('');

	const handleClose = () => setOpen(false);
	const handleNote = (e: { target: { value: string; name: string } }) => {
		setError('');
		setCurrNotes({ ...currNotes, [e.target.name]: e.target.value });
	};
	const editDone = () => {
		if (currNotes.title || currNotes.details) {
			const modifyNote = {
				...currNotes,
				lastEditedNote: `Last updated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
				backgroundColor: { active: true, color: currColor },
			};

			const notes = user.notes;
			notes[pIndex].splice(index, 1);

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
			touch.edit(dispatch, { ...user, notes: structuredArray });

			setIsOpenColorPad(false);
			handleClose();
		} else {
			setError('Please fill in the blank notes.');
		}
	};
	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<Box
					sx={{
						...style,
						backgroundColor: currColor,
						border:
							currColor !== 'white'
								? `1px solid ${currColor}`
								: `1px solid ${user.theme}`,
					}}>
					<Container maxWidth='sm'>
						<div>
							<input
								type={'text'}
								style={{
									fontSize: '.9rem',
									fontWeight: 'bold',
									border: 'none',
									outline: 'none',
									backgroundColor: currColor,
								}}
								placeholder='Title'
								name={'title'}
								value={currNotes.title}
								onChange={handleNote}
							/>
						</div>
						<div>
							<input
								type={'text'}
								style={{
									fontSize: '.9rem',
									border: 'none',
									outline: 'none',
									backgroundColor: currColor,
								}}
								placeholder='Take a note...'
								name={'details'}
								value={currNotes.details}
								onChange={handleNote}
							/>
						</div>
						<Typography
							sx={{
								color: currColor === 'orange' ? 'white' : 'orange',
							}}>
							{error}
						</Typography>
						<Box sx={{ mt: 4 }}>
							<ColorLensIcon
								onClick={() => setIsOpenColorPad(!isOpenColorPad)}
							/>
							<Button onClick={handleClose}>Close</Button>
							<Button onClick={editDone}>Done</Button>
						</Box>
					</Container>
					<Box sx={{ ml: -40, mt: 1.5 }}>
						{isOpenColorPad && <Colors setColor={setColor} display={'row'} />}
					</Box>
				</Box>
			</Modal>
		</div>
	);
}
