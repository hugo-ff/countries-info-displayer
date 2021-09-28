import { useState } from 'react';
import { string } from 'prop-types';
import { useQuery } from '@apollo/client';
import { UnorderedList, Text } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import validateArray from 'utils';
import CountryListItem from 'components/CountryListItem';
import Error from 'components/Error';
import Loading from 'components/Loading';
import { connect } from 'react-redux';
import CurrencyFilter from './components/CurrencyFilter';
import ContinentFilter from './components/ContinentFilter';
import { GET_COUNTRIES } from '../../../apollo/queries/queries';
import styles from './styles';

const Countries = ({ search }) => {
	const [currencyFilter, setCurrencyFilter] = useState([]);
	const [continentFilter, setContinentFilter] = useState('');

	const { loading, error, data } = useQuery(GET_COUNTRIES);

	if (error)
		return (
			<styles.CountriesWrapper>
				<Error />
			</styles.CountriesWrapper>
		);

	const { countries } = data || {};

	const renderCountries =
		validateArray(countries) &&
		countries
			.filter(country => country.name.toLowerCase().startsWith(search.toLowerCase()))
			.filter(country => {
				if (!validateArray(currencyFilter)) return country;
				const { currency: countryCurrency } = country;
				if (countryCurrency && countryCurrency.includes(',')) {
					const currencyArr = countryCurrency.split(',');
					return currencyFilter.find(currency => currencyArr.includes(currency));
				}
				return currencyFilter.find(currency => currency === country.currency);
			})
			.filter(country => {
				const {
					continent: { name: continentName },
				} = country;
				if (!validateArray(continentFilter)) return country;
				return continentFilter.find(continent => continent === continentName);
			})
			.map(country => <CountryListItem countryInfo={country} />);

	return (
		<styles.CountriesWrapper>
			{loading ? (
				<Loading />
			) : (
				<>
					<styles.Container>
						<styles.FiltersContainer>
							<styles.FiltersTitle>
								<styles.FilterIcon />
								Filters
							</styles.FiltersTitle>
							<CurrencyFilter
								setCurrencyFilter={setCurrencyFilter}
								currencyFilter={currencyFilter}
							/>
							<ContinentFilter
								setContinentFilter={setContinentFilter}
								continentFilter={continentFilter}
							/>
						</styles.FiltersContainer>
						<styles.CountriesContainer>
							{renderCountries.length ? (
								<UnorderedList spacing="3" style={{ margin: '0 auto' }}>
									{renderCountries}
								</UnorderedList>
							) : (
								<styles.NotFoundMsg>
									<SearchIcon w={6} h={6} style={{ marginRight: '10px' }} />
									<Text fontSize="2xl">Ups! Country not found. Please try again.</Text>
								</styles.NotFoundMsg>
							)}
						</styles.CountriesContainer>
					</styles.Container>
				</>
			)}
		</styles.CountriesWrapper>
	);
};

Countries.propTypes = {
	search: string,
};

Countries.defaultProps = {
	search: '',
};

const mapStateToProps = ({ search }) => ({
	search: search.search,
});
const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Countries);
