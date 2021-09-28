import { Text, Link } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { ChevronLeftIcon, SearchIcon } from '@chakra-ui/icons';
import styles from './styles';

const ERROR_MESSAGE = 'Ups! Country not found. Please try again.';

const NotFound = () => {
	return (
		<styles.Container>
			<styles.ErrorInfo>
				<styles.NotFoundMsg>
					<SearchIcon w={6} h={6} style={{ marginRight: '10px' }} />
					<Text fontSize="2xl">{ERROR_MESSAGE}</Text>
				</styles.NotFoundMsg>
				<Link as={ReactRouterLink} to="/" color="teal.500" style={{ marginTop: '15px' }}>
					<ChevronLeftIcon w={5} h={5} color="teal.500" />
					Go to home
				</Link>
			</styles.ErrorInfo>
		</styles.Container>
	);
};

export default NotFound;
