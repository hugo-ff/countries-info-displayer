import { gql } from '@apollo/client';

export const GET_COUNTRIES = gql`
	query countries($filter: CountryFilterInput) {
		countries(filter: $filter) {
			code
			name
			currency
			languages {
				code
				name
			}
			capital
			emoji
			continent {
				name
			}
		}
	}
`;

export const GET_CONTINENTS = gql`
	query continents($filter: ContinentFilterInput) {
		continents(filter: $filter) {
			code
			name
		}
	}
`;
