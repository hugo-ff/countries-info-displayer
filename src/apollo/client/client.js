import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import fetch from 'cross-fetch';

const API_URL = 'https://countries.trevorblades.com/';

const clientProps = {
	link: new HttpLink({ uri: API_URL, fetch }),
	cache: new InMemoryCache(),
};

if (process.env.NODE_ENV === 'test') {
	clientProps.fetch = fetch;
}

export default new ApolloClient(clientProps);
