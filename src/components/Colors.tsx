import { Container, Typography } from '@mui/material';
import FormatColorResetOutlinedIcon from '@mui/icons-material/FormatColorResetOutlined';

const styles = {
	colorComponent: {
		position: 'absolute',
		borderRadius: '5px',
		display: 'flex',
		justifyContent: 'center',
		marginTop: '-.8rem',
		backgroundColor: 'white',
		ml: 43,
	},
	color: {
		m: 1,
		width: '3rem',
		height: '3rem',
		borderRadius: '50%',
		border: '1px solid gray',
		p: 1,
	},
};
const Colors = ({
	setColor,
	display,
}: {
	setColor: Function;
	display: string;
}) => {
	const colorsList = [
		'lightgray',
		'orange',
		'yellow',
		'lightgreen',
		'lightblue',
	];
	return (
		<Container
			maxWidth={'xs'}
			sx={{
				...styles.colorComponent,
				flexDirection: display,
				border: display === 'row' ? '1px solid gray' : 'none',
				boxShadow: display === 'row' ? 4 : 0,
			}}>
			<Typography
				component={'div'}
				sx={styles.color}
				onClick={() => setColor('white')}>
				<FormatColorResetOutlinedIcon sx={{ width: '2rem', height: '2rem' }} />
			</Typography>

			{colorsList.map((color: string) => {
				return (
					<Typography
						component={'div'}
						key={color}
						onClick={() => setColor(color)}
						sx={{ ...styles.color, backgroundColor: color }}></Typography>
				);
			})}
		</Container>
	);
};

export default Colors;
