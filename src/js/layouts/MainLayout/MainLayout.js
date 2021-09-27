import { element } from 'prop-types';
import { ApolloProvider } from '@apollo/client';
import { HashRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import client from 'apollo/client';
import styles from './styles';

const MainLayout = ({ children }) => (
	<HashRouter>
		<ApolloProvider client={client}>
			<ChakraProvider>
				<styles.MainLayout>{children}</styles.MainLayout>
			</ChakraProvider>
		</ApolloProvider>
	</HashRouter>
);

MainLayout.propTypes = {
	children: element.isRequired,
};

export default MainLayout;
