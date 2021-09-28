import { shape, string, arrayOf } from 'prop-types';
import { Container, Heading } from '@chakra-ui/react';
import validateArray from 'utils';
import styles from './styles';

const CountryCard = ({ countryInfo }) => {
	const { __typename, name, emoji } = countryInfo;

	if (__typename !== 'Country') return false;

	const renderInfo = Object.keys(countryInfo).map((countryData, idx) => {
		if (countryData === '__typename' || countryData === 'name' || countryData === 'emoji')
			return false;

		let value = countryInfo[countryData];

		if (countryData === 'continent') {
			const { name: continentName } = countryInfo[countryData];
			value = continentName;
		}

		if (countryData === 'languages') {
			const { name: languageName } =
				validateArray(countryInfo[countryData]) && countryInfo[countryData][0];
			value = languageName;
		}

		return (
			<styles.InfoKey key={idx.toString()}>
				{countryData}: <styles.InfoValue>{value}</styles.InfoValue>
			</styles.InfoKey>
		);
	});

	return (
		<Container maxW="container.lg" style={{ border: '1px solid #333', padding: '40px 50px' }}>
			<Heading as="h1">
				{name} <styles.CountryFlag>{emoji}</styles.CountryFlag>
			</Heading>
			<styles.CountryInfoContainer>{renderInfo}</styles.CountryInfoContainer>
		</Container>
	);
};

CountryCard.propTypes = {
	countryInfo: shape({
		capital: string,
		code: string,
		continent: shape({ __typename: string, name: string }),
		currency: string,
		emoji: string,
		languages: arrayOf(shape({ __typename: string, name: string, code: string })),
		name: string,
		__typename: string,
	}).isRequired,
};

export default CountryCard;
