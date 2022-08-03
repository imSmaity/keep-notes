import { useDispatch, useSelector } from 'react-redux';
import * as React from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import TakeANote from './TakeANote';
import Notes from './Notes';
import Colors from '../components/Colors';
import { User } from '../Types';
import { touch } from '../redux/actions/notesAction';

const AppTheme = () => {
	const dispatch = useDispatch();
	const user = useSelector(
		(state: { notesReducer: User }) => state.notesReducer
	);
	const [currColor, setColor] = React.useState(user.theme);
	React.useEffect(() => {
		if (user.theme !== currColor)
			touch.themeChangeing(dispatch, { ...user, theme: currColor });
	}, [currColor]);
	return (
		<Box sx={{ marginLeft: '-23rem', mt: 2 }}>
			<Colors setColor={setColor} display={'column'} />
		</Box>
	);
};
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
}));

const Home = () => {
	const [isTyping, setIsTyping] = React.useState(false);
	const [open, setOpen] = React.useState(false);
	const [isOpenColorPad, setIsOpenColorPad] = React.useState(false);
	const user = useSelector(
		(state: { notesReducer: User }) => state.notesReducer
	);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	// const handleDrawerClose = () => {
	// 	setOpen(false);
	// };
	const dispatch = useDispatch();
	React.useEffect(() => {
		touch.searchingUser(dispatch);
	}, []);

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar
				position='fixed'
				sx={{ backgroundColor: user.theme, boxShadow: 0 }}>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						onClick={handleDrawerOpen}
						edge='start'
						sx={{
							marginRight: 5,
							...(open && { display: 'none' }),
						}}></IconButton>
					<Typography
						variant='h6'
						noWrap
						component='div'
						sx={{
							color:
								user.theme === 'white' || user.theme === 'yellow'
									? 'black'
									: 'white',
						}}>
						Take Notes
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer variant='permanent'>
				<DrawerHeader></DrawerHeader>

				<List>
					{[
						// { title: 'Notes', icon: <StickyNote2Icon />, onclick: () => {} },
						{
							title: 'Theme',
							icon: <FormatPaintIcon />,
							onclick: () => setIsOpenColorPad(!isOpenColorPad),
						},
					].map((list, index) => (
						<ListItem
							key={list.title}
							disablePadding
							sx={{ display: 'block' }}
							onClick={list.onclick}>
							<ListItemButton
								sx={{
									minHeight: 48,
									justifyContent: open ? 'initial' : 'center',
									px: 2.5,
								}}>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: open ? 3 : 'auto',
										justifyContent: 'center',
									}}></ListItemIcon>
								{list.icon}
								<ListItemText
									primary={list.title}
									sx={{ opacity: open ? 1 : 0 }}
								/>
							</ListItemButton>
						</ListItem>
					))}
					{!isOpenColorPad && <AppTheme />}
				</List>
			</Drawer>
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					p: 3,
				}}>
				<DrawerHeader />
				<TakeANote typing={{ isTyping, setIsTyping }} />
				<Notes />
			</Box>
		</Box>
	);
};

export default Home;
