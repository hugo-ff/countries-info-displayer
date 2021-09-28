import { Container, Heading, Text, Link } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { WarningIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import styles from './styles';

const Error = () => (
	<Container maxW="container.lg">
		<styles.Container>
			<WarningIcon w={10} h={10} color="red.500" style={{ marginTop: '5px' }} />
			<styles.ErrorInfo>
				<Heading as="h4" size="md">
					Ups! Unexpected error has ocurred when fetching data from the server
				</Heading>
				<Text fontSize="lg">Please try again!</Text>
				<Link as={ReactRouterLink} to="/" color="teal.500" style={{ marginTop: '15px' }}>
					<ChevronLeftIcon w={5} h={5} color="teal.500" />
					Go to home
				</Link>
			</styles.ErrorInfo>
		</styles.Container>
	</Container>
);

export default Error;
