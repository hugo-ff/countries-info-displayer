import { useQuery } from '@apollo/client';
import { GET_COUNTRIES, GET_CONTINENTS } from '../../../apollo/queries/queries';

const Countries = () => {
	const {
		loading: getCountriesLoading,
		error: getCountriesError,
		data: getCountriesData,
	} = useQuery(GET_COUNTRIES);

	const {
		data: getContinentsData,
		error: getContinentsError,
		loading: getContinentsLoading,
	} = useQuery(GET_CONTINENTS);

	if (getContinentsLoading || getCountriesLoading) return <p>Loading...</p>;
	if (getCountriesError || getContinentsError) return <p>Error</p>;

	const { countries } = getCountriesData || {};
	const renderCountries =
		countries &&
		countries.map(country => {
			const {
				name,
				continent: { name: continentName },
				currency,
				emoji,
			} = country;

			const id = name.toLowerCase().replaceAll(' ', '-');

			return (
				<li key={id} className={`country-card--${id}`}>
					<p>{emoji}</p>
					<div>
						<h2>{name}</h2>
						<h3>{continentName}</h3>
						<h4>{currency}</h4>
					</div>
				</li>
			);
		});

	const { continents } = getContinentsData || {};

	const renderContinents =
		continents &&
		continents.map(continent => {
			const { name, code } = continent;

			return (
				<label htmlFor={code} key={code}>
					<input type="checkbox" id={code} name="continent" />
					{name}
					<span>(numero de paises por continente)</span>
				</label>
			);
		});

	const currencies =
		countries &&
		countries
			.reduce((accum, current) => {
				const { currency } = current;
				return [...accum, currency];
			}, [])
			.filter((value, i, arr) => arr.indexOf(value) === i);

	const renderCurrencyFilter =
		currencies &&
		currencies.map(currency => (
			<label htmlFor={currency} key={currency}>
				<input type="checkbox" id={currency} name="currency" />
				{currency}
			</label>
		));

	return (
		<>
			<div>Currency filter</div>
			<div role="group">{renderCurrencyFilter}</div>
			<div>Continents</div>
			<div role="group">{renderContinents}</div>
			<div>Countries</div>
			<section>
				<ul>{renderCountries}</ul>
			</section>
		</>
	);
};

export default Countries;
