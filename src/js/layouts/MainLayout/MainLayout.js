import { element } from 'prop-types';
import { ApolloProvider } from '@apollo/client';
import { HashRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import Header from 'components/Header';
import client from 'apollo/client';
import store from '../../redux/store';
import styles from './styles';

const MainLayout = ({ children }) => (
	<HashRouter>
		<ApolloProvider client={client}>
			<ChakraProvider>
				<Provider store={store}>
					<Header />
					<styles.MainLayout>{children}</styles.MainLayout>
				</Provider>
			</ChakraProvider>
		</ApolloProvider>
	</HashRouter>
);

MainLayout.propTypes = {
	children: element.isRequired,
};

export default MainLayout;
