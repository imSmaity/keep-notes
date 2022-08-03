import { Box, Button, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { touch } from '../redux/actions/notesAction';
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
		setColor: Function;
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
	const user = useSelector(
		(state: { notesReducer: User }) => state.notesReducer
	);

	return (
		<Container
			maxWidth='sm'
			sx={{
				...styles.emptyNoteContainer,
				border:
					user.theme === 'white'
						? '1px solid white'
						: `1px solid ${user.theme}`,
			}}>
			<Typography onClick={startTyping}>Take a note...</Typography>
		</Container>
	);
};
const NoteWrite = (props: Props) => {
	const { setIsTyping } = props;
	const { isOpenColorPad, setIsOpenColorPad, currColor, setColor } =
		props.color;
	const { currNotes, setCurrNotes } = props.note;

	const dispatch = useDispatch();
	const user = useSelector(
		(state: { notesReducer: User }) => state.notesReducer
	);
	const [error, setError] = useState('');

	const stopTyping = () => {
		setIsTyping(false);
		setIsOpenColorPad(false);
		setColor('white');
	};
	const handleNote = (e: { target: { value: string; name: string } }) => {
		setError('');
		setCurrNotes({ ...currNotes, [e.target.name]: e.target.value });
	};
	const addNote = () => {
		if (currNotes.title || currNotes.details) {
			const notes = user.notes.flat(1);

			const modifyNode = {
				...currNotes,
				id: user.notes.length + Math.random() + Math.random(),
				lastEditedNote: `Last updated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
				backgroundColor: { active: true, color: currColor },
			};

			notes.unshift(modifyNode);
			const pinedNotes = notes.filter((node) => node.pined); //filtered pinedNotes
			const unpinedNotes = notes.filter((node) => !node.pined); //filtered unpinedNotes
			const newNodes = pinedNotes.concat(unpinedNotes);
			const structuredArray = (function getPagesStructure(arr: Array<Note>) {
				const newArr = [];
				while (arr.length) newArr.push(arr.splice(0, 6));
				return newArr;
			})(newNodes);

			touch.add(dispatch, { ...user, notes: structuredArray });
			setIsOpenColorPad(false);
			setIsTyping(false);
			setCurrNotes({
				id: 0,
				title: '',
				details: '',
				tags: [],
				lastEditedNote: '',
				pined: false,
				backgroundColor: { active: false, color: 'white' },
			});
			setColor('white');
		} else {
			setError('Please fill in the blank notes.');
		}
	};

	return (
		<Container
			maxWidth='sm'
			sx={{
				...styles.noteContainer,
				backgroundColor: currColor,
				border:
					currColor !== 'white'
						? `1px solid ${currColor}`
						: `1px solid ${user.theme}`,
			}}>
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
		lastEditedNote: '',
		pined: false,
		backgroundColor: { active: false, color: 'white' },
	});
	const [isOpenColorPad, setIsOpenColorPad] = useState(false);
	const [currColor, setColor] = useState('white');

	return (
		<Box>
			{isTyping ? (
				<>
					<NoteWrite
						setIsTyping={setIsTyping}
						color={{ isOpenColorPad, setIsOpenColorPad, currColor, setColor }}
						note={{ currNotes, setCurrNotes }}
					/>
					{isOpenColorPad && <Colors setColor={setColor} display={'row'} />}
				</>
			) : (
				<EmptyNote setIsTyping={setIsTyping} />
			)}
		</Box>
	);
};

export default TakeANote;
