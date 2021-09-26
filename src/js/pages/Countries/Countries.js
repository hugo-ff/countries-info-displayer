import { useQuery } from '@apollo/client';
import { GET_COUNTRIES } from 'src/graphql/queries';

const Countries = () => {
	const { loading, error, data } = useQuery(GET_COUNTRIES);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error</p>;

	console.log('data', data);

	return <div>Countries</div>;
};

export default Countries;
