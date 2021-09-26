import { element } from 'prop-types';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import styles from './styles';

const API_URL = 'https://countries.trevorblades.com/';

const client = new ApolloClient({
	uri: API_URL,
	cache: new InMemoryCache(),
});

const MainLayout = ({ children }) => (
	<BrowserRouter>
		<ApolloProvider client={client}>
			<ChakraProvider>
				<styles.MainLayout>{children}</styles.MainLayout>
			</ChakraProvider>
		</ApolloProvider>
	</BrowserRouter>
);

MainLayout.propTypes = {
	children: element.isRequired,
};

export default MainLayout;
