import { element } from 'prop-types';
import { ChakraProvider } from '@chakra-ui/react';
import styles from './styles';

const MainLayout = ({ children }) => (
	<ChakraProvider>
		<styles.MainLayout>{children}</styles.MainLayout>
	</ChakraProvider>
);

MainLayout.propTypes = {
	children: element.isRequired,
};

export default MainLayout;
