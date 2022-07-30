import { Box, Button, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { noteAdd } from '../redux/actions/notesAction';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { Note, User } from '../Types';
import { styles } from './style';
import Colors from '../components/Colors';

interface Props {
	setIsTyping: (T: boolean) => void;
	color: {
		isOpenColorPad: boolean;
		setIsOpenColorPad: (T: boolean) => void;
		currColor: string;
	};
	note: {
		currNotes: Note;
		setCurrNotes: Function;
	};
}
type TakeANoteProps = {
	typing: {
		isTyping: boolean;
		setIsTyping: (T: boolean) => void;
	};
};

const EmptyNote = (props: { setIsTyping: Function }) => {
	const { setIsTyping } = props;
	const startTyping = () => {
		setIsTyping(true);
	};
	return (
		<Container maxWidth='sm' sx={styles.emptyNoteContainer}>
			<Typography onClick={startTyping}>Take a note...</Typography>
		</Container>
	);
};
const NoteWrite = (props: Props) => {
	const { setIsTyping } = props;
	const { isOpenColorPad, setIsOpenColorPad, currColor } = props.color;
	const { currNotes, setCurrNotes } = props.note;

	const dispatch = useDispatch();
	const user = useSelector(
		(state: { notesReducer: User }) => state.notesReducer
	);

	const stopTyping = () => {
		setIsTyping(false);
	};
	const handleNote = (e: { target: { value: string; name: string } }) => {
		setCurrNotes({ ...currNotes, [e.target.name]: e.target.value });
	};
	const addNote = () => {
		const newNotes = user.notes;
		const bgColor =
			currColor !== ''
				? { active: true, color: currColor }
				: currNotes.backgroundColor;
		const modifyNode = {
			...currNotes,
			id: user.notes.length + 1,
			backgroundColor: bgColor,
		};

		newNotes.unshift(modifyNode);

		dispatch(noteAdd({ ...user, notes: newNotes }));
		setIsTyping(false);
	};

	return (
		<Container maxWidth='sm' sx={styles.noteContainer}>
			<div>
				<input
					type={'text'}
					style={{ border: 'none', outline: 'none' }}
					placeholder='Title'
					name={'title'}
					value={currNotes.title}
					onChange={handleNote}
				/>
			</div>
			<div>
				<input
					type={'text'}
					style={{ border: 'none', outline: 'none' }}
					placeholder='Take a note...'
					name={'details'}
					value={currNotes.details}
					onChange={handleNote}
				/>
			</div>
			<Box sx={styles.optionsContainer}>
				<ColorLensIcon onClick={() => setIsOpenColorPad(!isOpenColorPad)} />
				<Button onClick={stopTyping}>Close</Button>
				<Button onClick={addNote}>Add</Button>
			</Box>
		</Container>
	);
};
const TakeANote = ({ typing }: TakeANoteProps) => {
	const { isTyping, setIsTyping } = typing;
	const [currNotes, setCurrNotes] = useState({
		id: 0,
		title: '',
		details: '',
		tags: [],
		backgroundColor: { active: false, color: '' },
	});
	const [isOpenColorPad, setIsOpenColorPad] = useState(false);
	const [currColor, setColor] = useState('');

	return (
		<Box>
			{isTyping ? (
				<>
					<NoteWrite
						setIsTyping={setIsTyping}
						color={{ isOpenColorPad, setIsOpenColorPad, currColor }}
						note={{ currNotes, setCurrNotes }}
					/>
					{isOpenColorPad && <Colors setColor={setColor} />}
				</>
			) : (
				<EmptyNote setIsTyping={setIsTyping} />
			)}
		</Box>
	);
};

export default TakeANote;
