import { Link } from 'react-router-dom';
import { ListItem, Container, Heading } from '@chakra-ui/react';
import { string, shape } from 'prop-types';
import styles from './styles';

const CountryListItem = ({ countryInfo }) => {
	const {
		__typename,
		name,
		continent: { name: continentName },
		currency,
		emoji,
		code,
	} = countryInfo || {};

	if (__typename !== 'Country') return false;

	const id = name.toLowerCase().replaceAll(' ', '-');

	return (
		<ListItem key={id} className={`country-card--${id}`} style={{ listStyle: 'none' }}>
			<Link to={`/country/${code.toLowerCase()}`}>
				<Container maxW="container.lg" style={{ border: '1px solid #333', padding: '20px 30px' }}>
					<Heading as="h1" size="md">
						{name} <styles.CountryFlag>{emoji}</styles.CountryFlag>
					</Heading>
					<styles.CountryInfoContainer>
						<styles.InfoKey>
							Continent: <styles.InfoValue>{continentName}</styles.InfoValue>
						</styles.InfoKey>
						<styles.InfoKey>
							Currency: <styles.InfoValue>{currency}</styles.InfoValue>
						</styles.InfoKey>
					</styles.CountryInfoContainer>
				</Container>
			</Link>
		</ListItem>
	);
};

CountryListItem.propTypes = {
	countryInfo: shape({
		code: string,
		continent: shape({ __typename: string, name: string }),
		currency: string,
		emoji: string,
		name: string,
		__typename: string,
	}).isRequired,
};

export default CountryListItem;
