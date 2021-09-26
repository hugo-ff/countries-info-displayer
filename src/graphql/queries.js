import { gql } from '@apollo/client';

export const GET_COUNTRIES = gql`
	query {
		countries {
			code
			name
			currency
			continent {
				name
			}
			languages {
				name
			}
			capital
			emoji
		}
	}
`;

export const GET_CONTINENTS = gql`
	query {
		continents {
			name
		}
	}
`;
