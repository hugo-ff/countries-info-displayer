import { graphql } from 'msw';

const API_URL = 'https://countries.trevorblades.com/';
const api = graphql.link(API_URL);

const handlers = [
	api.query('countries', (req, res, ctx) => {
		return res(
			ctx.data({
				countries: [
					{
						name: 'Andorra',
						emoji: '🇦🇩',
						currency: 'EUR',
						code: '',
						languages: { name: '', code: '' },
						capital: '',
						continent: {
							name: 'Europe',
						},
					},
					{
						name: 'United Arab Emirates',
						emoji: '🇦🇪',
						currency: 'AED',
						code: '',
						continent: {
							name: 'Asia',
						},
						languages: { name: '', code: '' },
						capital: '',
					},
					{
						name: 'Afghanistan',
						emoji: '🇦🇫',
						currency: 'AFN',
						code: '',
						continent: {
							name: 'Asia',
						},
						languages: { name: '', code: '' },
						capital: '',
					},
					{
						name: 'Antigua and Barbuda',
						emoji: '🇦🇬',
						currency: 'XCD',
						code: '',
						continent: {
							name: 'North America',
						},
						languages: { name: '', code: '' },
						capital: '',
					},
					{
						name: 'Anguilla',
						emoji: '🇦🇮',
						currency: 'XCD',
						code: '',
						continent: {
							name: 'North America',
						},
						languages: { name: '', code: '' },
						capital: '',
					},
				],
			})
		);
	}),
	api.query('continents', (req, res, ctx) => {
		return res(
			ctx.data({
				continents: [
					{ name: 'Africa', code: 'AF' },
					{ name: 'Antarctica', code: 'AN' },
					{ name: 'Asia', code: 'AS' },
					{ name: 'Europe', code: 'EU' },
					{ name: 'North America', code: 'NA' },
					{ name: 'Oceania', code: 'OC' },
					{ name: 'South America', code: 'SA' },
				],
			})
		);
	}),
];

export default handlers;
