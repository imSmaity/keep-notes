import { Container, Typography } from '@mui/material';

const Colors = ({ setColor }: { setColor: Function }) => {
	const colorsList = ['yellow', 'lightgreen'];
	return (
		<Container maxWidth={'sm'}>
			<Typography component={'div'}></Typography>

			{colorsList.map((color: string) => {
				return (
					<Typography
						component={'div'}
						key={color}
						onClick={() => setColor(color)}>
						{color}
					</Typography>
				);
			})}
		</Container>
	);
};

export default Colors;
