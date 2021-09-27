import { element } from 'prop-types';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import client from 'apollo/client';
import styles from './styles';

const MainLayout = ({ children }) => (
	<ApolloProvider client={client}>
		<BrowserRouter>
			<ChakraProvider>
				<styles.MainLayout>{children}</styles.MainLayout>
			</ChakraProvider>
		</BrowserRouter>
	</ApolloProvider>
);

MainLayout.propTypes = {
	children: element.isRequired,
};

export default MainLayout;
