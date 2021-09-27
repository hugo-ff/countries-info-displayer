import { useParams, Link as ReactRouterLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Container, Link } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import validateArray from 'utils';
import Loading from 'components/Loading';
import Error from 'components/Error';
import CountryCard from 'components/CountryCard';
import { GET_COUNTRIES } from '../../../apollo/queries/queries';
import styles from './styles';

const Country = () => {
	const { id } = useParams();

	const queryParams = {
		code: id ? { eq: id.toUpperCase() } : undefined,
	};

	const { loading, error, data } = useQuery(GET_COUNTRIES, {
		variables: queryParams
			? {
					filter: queryParams,
			  }
			: {},
	});

	if (error)
		return (
			<styles.CountryWrapper>
				<Error />
			</styles.CountryWrapper>
		);

	const { countries } = data || {};
	const countryData = validateArray(countries) && countries[0];

	return (
		<styles.CountryWrapper>
			{loading ? (
				<Loading />
			) : (
				<>
					<Container maxW="container.lg">
						<CountryCard countryInfo={countryData} />
						<Link as={ReactRouterLink} to="/" color="teal.500" style={{ lineHeight: '40px' }}>
							Go back to Home
							<ChevronRightIcon w={5} h={5} color="teal.500" />
						</Link>
					</Container>
				</>
			)}
		</styles.CountryWrapper>
	);
};

export default Country;
