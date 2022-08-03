import { Provider } from 'react-redux';
import store from './redux/store';
import Home from './home/home';

const Start = () => {
	return (
		<Provider store={store}>
			<Home />
		</Provider>
	);
};

export default Start;
